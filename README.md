# Harikos AI - Landing Page

A premium, production-ready landing page for **Harikos AI**—an AI Automation Studio building custom AI Agents and Workflow Automation systems for modern businesses.

## Tech Stack

*   **Frontend**: React, Vite
*   **Styling**: Tailwind CSS
*   **Animations**: Framer Motion
*   **3D Assets**: Three.js, React Three Fiber
*   **Backend API**: Express.js (Node.js)
*   **Database**: Postgres (Drizzle ORM)
*   **Authentication**: Firebase

## Local Setup Instructions

1.  **Clone the repository**

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables**
    Rename `.env.example` to `.env` and fill in your credentials.
    ```bash
    cp .env.example .env
    ```

4.  **Run Development Server**
    ```bash
    npm run dev
    ```
    The application will run at `http://localhost:3000`.

## Production Deployment

### Building for Production
To create a production build, run:
```bash
npm run build
```

This will build the Vite React app into the `dist` directory and compile the Express server into `dist/server.cjs`.

### Standard Node.js Hosting (Render, Railway, Heroku, DigitalOcean)
Since this project uses an Express backend for the API (`/api/chat`, `/api/contact`), it is recommended to deploy it on a platform that supports running Node.js servers natively.

1.  Set your environment variables on the host.
2.  Set the start command to:
    ```bash
    npm start
    ```

### Vercel / Netlify Deployment
Configuration files (`vercel.json` and `netlify.toml`) are included for single-page application (SPA) routing.
*Note: If you deploy purely as a static SPA on Vercel/Netlify, the Express backend (`server.ts`) will not be executed. For full functionality (Contact Form, AI Chat), either deploy the `server.ts` API separately or use a Node.js-compatible host.*
