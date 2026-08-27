import React from "react";
import { Terminal, Mail, Linkedin, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScrollToId = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <footer className="relative bg-brand-black border-t border-brand-white/[0.05] z-10 py-16 md:py-24 overflow-hidden">
      
      {/* Light accent glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-brand-white/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">
        
        {/* Left branding */}
        <div className="md:col-span-5 space-y-6">
          <a href="#" onClick={handleLogoClick} className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-brand-white flex items-center justify-center transition-transform group-hover:rotate-6">
              <Terminal className="w-4 h-4 text-brand-black" />
            </div>
            <span className="font-display font-bold tracking-widest text-lg text-brand-white">
              HARIKOS
            </span>
          </a>
          <p className="font-sans text-sm text-brand-gray-400 font-light max-w-sm leading-relaxed">
            Premium Web & AI Automation Studio. We build immersive 3D landing pages and custom AI workflow systems for high-performance enterprises.
          </p>
          
          <div className="flex items-center gap-3.5 pt-2">
            {[
              { icon: Mail, href: "mailto:harikoshq@gmail.com", label: "Email" },
              { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
              { icon: Instagram, href: "https://instagram.com/harikos.ai", label: "Instagram" },
              { icon: Twitter, href: "https://x.com/harikos.ai", label: "X / Twitter" }
            ].map((social, idx) => {
              const Icon = social.icon;
              return (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-brand-white/[0.04] bg-brand-white/[0.02] text-brand-gray-400 hover:text-brand-white hover:border-brand-white/15 transition-all"
                  aria-label={social.label}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Middle Column: Capabilities */}
        <div className="col-span-6 md:col-span-3 space-y-4">
          <h4 className="font-mono text-[10px] text-brand-gray-500 uppercase tracking-widest">
            CAPABILITIES
          </h4>
          <ul className="space-y-2.5">
            {[
              "Premium Landing Pages",
              "AI Agents",
              "Workflow Automation",
              "Customer Support AI",
              "Lead Qualification",
              "Internal AI Systems"
            ].map((srv) => (
              <li key={srv}>
                <a
                  href="#services"
                  onClick={(e) => handleScrollToId(e, "#services")}
                  className="text-xs text-brand-gray-400 hover:text-brand-white font-light transition-colors"
                >
                  {srv}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: Studio */}
        <div className="col-span-6 md:col-span-4 space-y-4">
          <h4 className="font-mono text-[10px] text-brand-gray-500 uppercase tracking-widest">
            STUDIO
          </h4>
          <ul className="space-y-2.5">
            {[
              { label: "Why HARIKOS", href: "#why-harikos" },
              { label: "Engineering Process", href: "#process" },
              { label: "Our Vision", href: "#vision" },
              { label: "Inquire Capability", href: "#contact" }
            ].map((lnk) => (
              <li key={lnk.label}>
                <a
                  href={lnk.href}
                  onClick={(e) => handleScrollToId(e, lnk.href)}
                  className="text-xs text-brand-gray-400 hover:text-brand-white font-light transition-colors"
                >
                  {lnk.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Sub-footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-brand-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-brand-gray-500">
        <p className="font-sans">
          © {currentYear} HARIKOS
        </p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-brand-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-brand-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-brand-white transition-colors">Security Compliance</a>
        </div>
      </div>

    </footer>
  );
}
