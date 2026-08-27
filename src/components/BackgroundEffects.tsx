import { useEffect, useState } from "react";
import BackgroundMesh from "./BackgroundMesh";

export default function BackgroundEffects() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none bg-[#050505]">
      {/* 1. Living Mesh Simulation */}
      <BackgroundMesh />
      
      {/* Grid Overlay for structure */}
      <style>{`
        .custom-grid-overlay {
          background-size: 24px 24px !important;
          opacity: 0.10 !important;
        }
        @media (min-width: 768px) {
          .custom-grid-overlay {
            background-size: 40px 40px !important;
            opacity: 0.15 !important;
          }
        }
      `}</style>
      <div className="absolute inset-0 grid-bg custom-grid-overlay pointer-events-none" style={{ transform: 'translateZ(0)' }} />
      
      {/* 2. Fine Grain Noise Texture */}
      <div className="absolute inset-0 noise-bg mix-blend-overlay opacity-15 md:opacity-20" />
      
      {/* 3. Subtle edge vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(5,5,5,0.7)_100%)]" />
    </div>
  );
}
