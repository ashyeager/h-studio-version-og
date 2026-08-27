import { motion } from "motion/react";
import { Bot, GitBranch, MessageSquareCode, UserCheck, Layers, ArrowUpRight, Box } from "lucide-react";

interface ServicesProps {
  onServiceClick: (serviceName: string) => void;
}

export default function Services({ onServiceClick }: ServicesProps) {
  const servicesList = [
    {
      id: "ai-automation",
      icon: GitBranch,
      title: "AI Automation Systems",
      desc: "Help businesses automate repetitive workflows and operations. From CRM integrations to internal AI assistants, we build systems that save time and reduce manual work.",
      accent: "from-brand-white/10 to-transparent",
      tag: "Business Systems"
    },
    {
      id: "ai-agents",
      icon: MessageSquareCode,
      title: "AI Agents & Voice Assistants",
      desc: "Build intelligent conversational systems. We create AI customer support, AI receptionists, and voice assistants that provide 24/7 service and better customer experiences.",
      accent: "from-brand-white/10 to-transparent",
      tag: "Conversational AI"
    },
    {
      id: "premium-digital",
      icon: Box,
      title: "Premium Digital Experiences",
      desc: "Design and develop premium websites and landing pages that convert visitors into customers. We focus on performance, visual hierarchy, and brand trust to improve your online presence.",
      accent: "from-brand-white/10 to-transparent",
      tag: "Web Experience"
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } 
    }
  };

  return (
    <section id="services" className="relative py-24 md:py-32 px-6 md:px-12 z-10 max-w-7xl mx-auto border-t border-brand-white/[0.05]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Title block */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 md:mb-24">
          <div className="max-w-xl">
            <span className="font-mono text-xs text-brand-gray-400 uppercase tracking-widest block mb-4">
              [ Core Capabilities ]
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-brand-white">
              Engineering the future of digital presence and corporate efficiency.
            </h2>
          </div>
          <p className="font-sans text-brand-gray-400 max-w-sm font-light text-sm md:text-base leading-relaxed">
            We operate at the intersection of premium design and autonomous logic. From immersive landing pages to bespoke AI workflows, we build systems that perform.
          </p>
        </motion.div>

        {/* Services Grid (Bento Layout) */}
        <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {servicesList.map((service, index) => {
            const Icon = service.icon;
            
            // Layout: Row 1 has 2 items (col-span-3 each). Row 2 has 2 items (col-span-3 each). Row 3 has 2 items (col-span-3 each).
            // Or maybe a 3x2 layout: 3 columns of col-span-2. Let's do all col-span-2 for a 3-column grid on desktop!
            const gridClass = "md:col-span-3 lg:col-span-2";
            
            return (
              <motion.div
                key={service.id}
                variants={itemVariants}
              onClick={() => onServiceClick(service.title)}
              className={`${gridClass} relative p-8 md:p-10 rounded-2xl border border-brand-white/[0.06] bg-brand-black/30 backdrop-blur-xl overflow-hidden group hover:border-brand-white/[0.15] hover:bg-brand-white/[0.01] transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[320px]`}
            >
              {/* Corner Glow Overlay */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-radial-gradient from-brand-white/[0.02] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Service Header */}
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="p-3 rounded-xl bg-brand-white/[0.04] border border-brand-white/[0.06] group-hover:bg-brand-white group-hover:border-brand-white transition-all duration-300">
                    <Icon className="w-5 h-5 text-brand-white group-hover:text-brand-black transition-colors" />
                  </div>
                  <span className="font-mono text-[10px] text-brand-gray-500 bg-brand-white/[0.03] px-2.5 py-1 rounded-full border border-brand-white/[0.04]">
                    {service.tag}
                  </span>
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-brand-white mb-4 group-hover:text-brand-gray-200 transition-colors">
                  {service.title}
                </h3>
                
                <p className="font-sans text-brand-gray-400 text-sm leading-relaxed font-light">
                  {service.desc}
                </p>
              </div>

              {/* Action trigger */}
              <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-brand-gray-500 group-hover:text-brand-white transition-colors mt-8 pt-4 border-t border-brand-white/[0.03]">
                <span>INQUIRE CAPABILITY</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </motion.div>
          );
        })}
        </motion.div>
      </motion.div>
    </section>
  );
}
