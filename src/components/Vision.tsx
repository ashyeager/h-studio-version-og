import { motion } from "motion/react";
import { Sparkles, Milestone, ArrowRight } from "lucide-react";
import AICoreCanvas from "./AICoreCanvas";

export default function Vision() {
  return (
    <section id="vision" className="relative py-32 md:py-48 px-6 md:px-12 z-10 max-w-7xl mx-auto border-t border-brand-white/[0.05] overflow-hidden flex flex-col lg:flex-row items-center gap-16">
      
      {/* Editorial Decorative Background Details */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full bg-cyan-900/[0.03] blur-[120px] pointer-events-none select-none" />
      
      {/* Left side text content */}
      <div className="flex-1 flex flex-col items-start text-left relative space-y-12">
        
        {/* Decorative Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-white/[0.08] bg-brand-white/[0.02]"
        >
          <Milestone className="w-3.5 h-3.5 text-brand-gray-400" />
          <span className="font-mono text-[10px] text-brand-gray-300 uppercase tracking-widest">
            THE HARIKOS MANIFESTO
          </span>
        </motion.div>

        {/* Statement Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-brand-white leading-[1.2]"
        >
          Technology should create <span className="font-bold">leverage.</span>
        </motion.h2>

        {/* Core Vision Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="max-w-2xl text-brand-gray-400 font-light leading-relaxed text-base sm:text-lg space-y-6"
        >
          <p>
            Businesses lose valuable time through inefficient processes and disconnected customer experiences.
          </p>
          <p className="text-sm sm:text-base">
            HARIKOS identifies opportunities, designs practical solutions, and builds systems that help companies operate smarter and grow faster.
          </p>
        </motion.div>

        {/* Highlighted Metric Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="p-8 md:p-12 rounded-2xl border border-brand-white/[0.06] bg-brand-black/60 backdrop-blur-xl max-w-xl w-full grid grid-cols-2 gap-8 divide-x divide-brand-white/[0.06]"
        >
          <div className="space-y-1">
            <span className="font-display text-4xl sm:text-5xl font-extrabold text-brand-white">10x</span>
            <p className="font-mono text-[10px] text-brand-gray-400 uppercase tracking-wider">OP-SPEED INCREASE</p>
          </div>
          <div className="space-y-1 pl-8">
            <span className="font-display text-4xl sm:text-5xl font-extrabold text-brand-white">94%</span>
            <p className="font-mono text-[10px] text-brand-gray-400 uppercase tracking-wider">LABOR EFFICIENCY</p>
          </div>
        </motion.div>
        
      </div>

      {/* Right side interactive 3D asset */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.4 }}
        className="w-full lg:w-1/2 h-[400px] lg:h-[600px] relative rounded-3xl border border-brand-white/[0.05] bg-brand-black/20 backdrop-blur-md overflow-hidden"
      >
        {/* Subtle radial glow behind the core */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[80%] h-[80%] rounded-full bg-cyan-900/[0.05] blur-[80px]" />
        </div>
        <AICoreCanvas />
      </motion.div>

    </section>
  );
}
