import { motion } from "motion/react";
import { Settings, Gauge, Fingerprint, CloudLightning, Users, Sparkles } from "lucide-react";

export default function Features() {
  const featureList = [
    {
      icon: Settings,
      title: "Custom Built",
      desc: "Tailored directly to your precise business schemas and legacy software. We write clean, custom hooks rather than wrapping basic automation widgets.",
      size: "md:col-span-3"
    },
    {
      icon: Gauge,
      title: "Fast Deployment",
      desc: "Our pre-built core automation scaffolding means we can test and launch enterprise-grade pipelines in days, not financial quarters.",
      size: "md:col-span-3"
    },
    {
      icon: Fingerprint,
      title: "Secure by Design",
      desc: "Complete end-to-end sandbox storage, real-time sensitive data masking, and dedicated cloud servers keeping your customer information entirely secure.",
      size: "md:col-span-2"
    },
    {
      icon: CloudLightning,
      title: "Scalable Infrastructure",
      desc: "Built on serverless containerized architecture. Automatically handles traffic spikes from 10 concurrent runs to 100,000 without breaking a sweat.",
      size: "md:col-span-2"
    },
    {
      icon: Users,
      title: "Human + AI Fallback",
      desc: "Implement safety guardrails. When an agent detects high-risk actions or low sentiment scores, it effortlessly routes the flow to a human reviewer for signoff.",
      size: "md:col-span-2"
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } 
    }
  };

  return (
    <section id="features" className="relative py-24 md:py-32 px-6 md:px-12 z-10 max-w-7xl mx-auto border-t border-brand-white/[0.05]">
      
      {/* Header */}
      <div className="max-w-2xl mb-16 md:mb-24">
        <span className="font-mono text-xs text-brand-gray-400 uppercase tracking-widest block mb-4">
          [ Core Infrastructure ]
        </span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-brand-white mb-6">
          System properties engineered for high performance.
        </h2>
        <p className="font-sans text-brand-gray-400 font-light leading-relaxed text-sm sm:text-base">
          Our platforms are designed with the strictness of enterprise software. We focus on zero-latency, absolute data isolation, and total system reliability.
        </p>
      </div>

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-6 gap-6"
      >
        {featureList.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={idx}
              variants={itemVariants}
              className={`${feature.size} p-8 rounded-2xl border border-brand-white/[0.05] bg-brand-black/40 backdrop-blur-md relative overflow-hidden group hover:border-brand-white/[0.12] hover:bg-brand-white/[0.01] transition-all duration-300 flex flex-col justify-between min-h-[220px]`}
            >
              {/* Subtle top light effect */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-brand-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="p-3 rounded-xl bg-brand-white/[0.03] border border-brand-white/[0.05] w-fit mb-6">
                <Icon className="w-5 h-5 text-brand-white" />
              </div>

              <div className="space-y-2">
                <h3 className="font-display text-lg font-bold text-brand-white flex items-center gap-2">
                  {feature.title}
                  {idx === 4 && <Sparkles className="w-3.5 h-3.5 text-brand-gray-400 animate-pulse" />}
                </h3>
                <p className="font-sans text-xs sm:text-sm text-brand-gray-400 font-light leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

    </section>
  );
}
