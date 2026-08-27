import { motion } from "motion/react";
import DnaCanvas from "./DnaCanvas";
import { Dna } from "lucide-react";

export default function DnaSection() {
  return (
    <section id="dna-section" className="relative py-24 md:py-32 px-6 md:px-12 z-10 max-w-7xl mx-auto border-t border-brand-white/[0.05] overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full bg-brand-white/[0.015] blur-[120px] pointer-events-none select-none" />

      <div className="flex flex-col lg:flex-row items-center gap-16 relative">
        
        {/* Left side: Text Content */}
        <div className="flex-1 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-white/[0.08] bg-brand-white/[0.02]"
          >
            <Dna className="w-3.5 h-3.5 text-brand-gray-400" />
            <span className="font-mono text-[10px] text-brand-gray-300 uppercase tracking-widest">
              Core Architecture
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-brand-white leading-tight"
          >
            The DNA of modern enterprise automation.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-brand-gray-400 font-light leading-relaxed text-base sm:text-lg max-w-xl"
          >
            Every workflow we design is rooted in robust, fundamental principles. 
            We build modular, resilient architectures that adapt naturally to 
            your evolving business needs—much like organic structures, but 
            engineered for absolute precision.
          </motion.p>
        </div>

        {/* Right side: 3D DNA Asset */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="w-full lg:w-1/2 h-[400px] lg:h-[600px] relative rounded-3xl border border-brand-white/[0.05] bg-brand-white/[0.02] backdrop-blur-md overflow-hidden"
        >
          {/* Subtle radial glow behind the DNA */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[80%] h-[80%] rounded-full bg-brand-white/[0.03] blur-[80px]" />
          </div>
          <DnaCanvas />
        </motion.div>

      </div>
    </section>
  );
}
