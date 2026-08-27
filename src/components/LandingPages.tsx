import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Layout, Box, Zap, Target, ExternalLink } from "lucide-react";

const features = [
  {
    title: "Custom Design",
    desc: "Every website is designed specifically for your brand.",
    icon: Layout,
  },
  {
    title: "Interactive 3D",
    desc: "Immersive 3D visuals that create memorable first impressions.",
    icon: Box,
  },
  {
    title: "Lightning Fast",
    desc: "Optimized for speed, SEO, accessibility, and every device.",
    icon: Zap,
  },
  {
    title: "Conversion Focused",
    desc: "Designed to turn visitors into customers.",
    icon: Target,
  },
];

export default function LandingPages() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={containerRef} className="py-24 md:py-32 relative z-10 border-t border-brand-white/[0.04]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Header section */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-white/5 border border-brand-white/10 mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
            <span className="font-mono text-[10px] text-brand-gray-300 uppercase tracking-wider">Premium Web Experiences</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-3xl md:text-5xl font-bold tracking-tight text-brand-white mb-6"
          >
            Premium Landing Pages <br className="hidden md:block" />
            <span className="text-brand-gray-500">That Convert.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-brand-gray-400 text-base md:text-lg max-w-2xl leading-relaxed"
          >
            We create beautiful, lightning-fast landing pages that combine premium design, immersive 3D experiences, and conversion-focused strategy to help businesses stand out and generate more customers.
          </motion.p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Interactive Showcase Mockup */}
          <motion.div 
            style={{ y }}
            className="lg:col-span-8 relative group"
          >
            <div className="relative rounded-2xl overflow-hidden border border-brand-white/[0.08] bg-[#0a0a0a] shadow-2xl">
              {/* Browser Header */}
              <div className="h-8 border-b border-brand-white/[0.08] bg-[#0f0f0f] flex items-center px-4 gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-white/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-white/20" />
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-white/20" />
                </div>
                <div className="mx-auto h-4 w-48 bg-brand-white/[0.03] rounded-md flex items-center justify-center">
                   <span className="text-[9px] font-mono text-brand-gray-600">acme-corp.app</span>
                </div>
              </div>
              
              {/* Browser Content - Premium Mockup */}
              <div className="relative aspect-[16/10] bg-gradient-to-br from-[#050505] to-[#111] overflow-hidden group">
                
                {/* 3D Wireframe/Grid placeholder inside mockup */}
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#050505_100%)]" />

                {/* Simulated content layout */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                  <div className="flex justify-between items-center opacity-40">
                     <div className="w-24 h-4 bg-brand-white/20 rounded" />
                     <div className="flex gap-4">
                        <div className="w-12 h-3 bg-brand-white/10 rounded" />
                        <div className="w-12 h-3 bg-brand-white/10 rounded" />
                     </div>
                  </div>

                  <div className="max-w-md space-y-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-white/10 to-transparent border border-brand-white/10 backdrop-blur-md flex items-center justify-center">
                       <Box className="w-8 h-8 text-brand-white/60" />
                    </div>
                    <div className="h-8 w-3/4 bg-brand-white/30 rounded-lg" />
                    <div className="h-4 w-full bg-brand-white/10 rounded" />
                    <div className="h-4 w-5/6 bg-brand-white/10 rounded" />
                    <div className="flex gap-4 pt-4">
                      <div className="px-6 py-2.5 rounded-full bg-brand-white/90 text-brand-black text-xs font-medium">Get Started</div>
                      <div className="px-6 py-2.5 rounded-full border border-brand-white/20 text-brand-white/80 text-xs font-medium">Learn More</div>
                    </div>
                  </div>

                  {/* Floating glass card */}
                  <div className="absolute right-8 bottom-12 w-64 p-4 rounded-xl bg-brand-white/[0.02] border border-brand-white/[0.08] backdrop-blur-md shadow-2xl transform transition-transform duration-700 group-hover:-translate-y-4 group-hover:bg-brand-white/[0.04]">
                     <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full bg-brand-white/10" />
                        <div className="space-y-1.5">
                           <div className="w-20 h-2 bg-brand-white/30 rounded" />
                           <div className="w-12 h-2 bg-brand-white/10 rounded" />
                        </div>
                     </div>
                     <div className="w-full h-16 bg-brand-white/5 rounded-lg border border-brand-white/[0.04]" />
                  </div>
                </div>

                {/* Overlay hover effect */}
                <div className="absolute inset-0 bg-brand-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                   <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-brand-white/10 border border-brand-white/20 text-brand-white text-xs font-mono backdrop-blur-md">
                     <ExternalLink className="w-3.5 h-3.5" /> Interactive Preview
                   </span>
                </div>
              </div>
            </div>
            
            {/* Ambient shadow behind mockup */}
            <div className="absolute -inset-4 bg-brand-white/5 blur-3xl -z-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          </motion.div>

          {/* Features List */}
          <div className="lg:col-span-4 space-y-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div 
                  key={feature.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex gap-4 group"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-white/[0.02] border border-brand-white/[0.06] flex items-center justify-center group-hover:bg-brand-white/[0.06] group-hover:border-brand-white/[0.1] transition-colors duration-300">
                    <Icon className="w-5 h-5 text-brand-gray-400 group-hover:text-brand-white transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="text-brand-white font-medium mb-1 group-hover:text-cyan-50 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-brand-gray-400 leading-relaxed group-hover:text-brand-gray-300 transition-colors">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
