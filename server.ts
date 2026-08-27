import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import * as dotenv from "dotenv";
import { requireAuth, AuthRequest } from "./src/middleware/auth.ts";
import { getOrCreateUser } from "./src/db/users.ts";
import { createContactRequest } from "./src/db/contactRequests.ts";
import { adminAuth, adminDb } from "./src/lib/firebase-admin.ts";
import compression from "compression";
import { Resend } from "resend";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy'); // Use real key if available

async function startServer() {
  const app = express();
  const PORT = 3000;
  
  app.use(compression());
  app.use(express.json());

  // Contact form submission
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, business, email, service, message } = req.body;
      if (!name || !business || !email || !service || !message) {
        return res.status(400).json({ error: "All fields are required" });
      }
      
      const request = await createContactRequest({ name, business, email, service, message });
      
      // Automatically sign them up for Firebase Auth
      try {
        await adminAuth.createUser({
          email,
          displayName: name,
        });
      } catch (authError: any) {
        // Ignore if user already exists, log other errors
        if (authError.code !== 'auth/email-already-exists') {
          console.error('Error creating Firebase user:', authError);
        }
      }

      res.json({ success: true, request });
    } catch (error) {
      console.error('Error saving contact request:', error);
      res.status(500).json({ error: 'Failed to save request' });
    }
  });

  // Project Inquiry submission
  app.post("/api/leads", async (req, res) => {
    try {
      const { name, email, company, industry, service, goal, budget, message, userId } = req.body;

      if (!name || !email || !company || !industry || !service || !goal || !message) {
        return res.status(400).json({ error: "All required fields must be provided" });
      }

      const leadData = {
        name,
        email,
        company,
        industry,
        service,
        goal,
        budget: budget || null,
        message,
        userId: userId || null,
        status: "New",
        createdAt: new Date(),
      };

      // Store in Firebase leads collection
      const leadRef = await adminDb.collection("leads").add(leadData);

      // If user is logged in, attach to user profile
      if (userId) {
        await adminDb
          .collection("users")
          .doc(userId)
          .collection("projects")
          .doc(leadRef.id)
          .set({ ...leadData, leadId: leadRef.id });
      }

      // Send email to admin
      if (process.env.RESEND_API_KEY) {
        await resend.emails.send({
          from: "HARIKOS AI <inquiries@harikos.ai>", // This needs to be a verified domain in Resend
          to: "admin@harikos.ai", // Should be the HARIKOS admin email
          subject: "New HARIKOS Project Inquiry",
          html: `
            <h3>New project request received.</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Industry:</strong> ${industry}</p>
            <p><strong>Service:</strong> ${service}</p>
            <p><strong>Goal:</strong> ${goal}</p>
            <p><strong>Budget:</strong> ${budget || 'Not specified'}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br/>')}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
          `,
        });

        // Send confirmation email to client
        await resend.emails.send({
          from: "HARIKOS AI <inquiries@harikos.ai>",
          to: email,
          subject: "Your HARIKOS project inquiry has been received",
          html: `
            <p>Hello ${name},</p>
            <p>Thank you for contacting HARIKOS AI.</p>
            <p>We have received your project request and will review your goals.</p>
            <p>Our team will get back to you shortly.</p>
            <p>For faster communication:<br/>
            Instagram: @harikos.ai</p>
            <p>HARIKOS AI</p>
          `,
        });
      }

      res.json({ success: true, leadId: leadRef.id });
    } catch (error) {
      console.error('Error processing lead:', error);
      res.status(500).json({ error: 'Failed to process project inquiry' });
    }
  });

  // Auth sync route
  app.post("/api/auth/sync", requireAuth as any, async (req: AuthRequest, res: express.Response) => {
    try {
      if (!req.user || !req.user.uid) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      
      const email = req.user.email || '';
      const user = await getOrCreateUser(req.user.uid, email);
      res.json({ success: true, user });
    } catch (error) {
      console.error('Error syncing user:', error);
      res.status(500).json({ error: 'Failed to sync user' });
    }
  });



  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
