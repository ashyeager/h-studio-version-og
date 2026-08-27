import { motion } from "motion/react";
import { Check, X, Shield, Zap, Sparkles, Code, Scale } from "lucide-react";

export default function WhyHarikos() {
  const pillars = [
    {
      icon: Code,
      title: "Bespoke System Architecture",
      desc: "We do not sell pre-built templates or rigid SaaS subscriptions. Our systems are built from scratch, fully aligned with your exact database parameters, workflows, and company culture."
    },
    {
      icon: Shield,
      title: "Enterprise-Grade Security",
      desc: "Your data is completely sandboxed. We implement strict PII scrubbing, encrypted pipeline handshakes, and strict compliance layers so that your company secrets stay yours."
    },
    {
      icon: Zap,
      title: "Rapid Deployment Cycles",
      desc: "Our pre-engineered foundational modules allow us to build custom agent networks and launch production-ready workflow pipelines in weeks rather than fiscal quarters."
    },
    {
      icon: Scale,
      title: "Elastic Scalability",
      desc: "All HARIKOS systems are deployed on modern serverless containers. Whether processing 100 tasks or 10 million, our pipelines scale dynamically without human intervention."
    }
  ];

  return (
    <section id="why-harikos" className="relative py-24 md:py-32 px-6 md:px-12 z-10 max-w-7xl mx-auto border-t border-brand-white/[0.05]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Left: Sticky Brand Pitch & Comparison */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-8">
          <div>
            <span className="font-mono text-xs text-brand-gray-400 uppercase tracking-widest block mb-4">
              [ Core Comparison ]
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-brand-white mb-6">
              Engineered as a premium technology partner.
            </h2>
            <p className="font-sans text-brand-gray-400 font-light leading-relaxed text-sm sm:text-base">
              The market is saturated with copy-paste AI consultancies that stitch generic APIs. HARIKOS was founded to build deep, industrial-grade, secure automation engines for companies with rigorous requirements.
            </p>
          </div>

          {/* Comparison Card */}
          <div className="rounded-xl border border-brand-white/[0.06] bg-brand-black/40 backdrop-blur-md overflow-hidden p-6 space-y-4">
            <h3 className="font-display font-medium text-brand-white text-sm tracking-wide">
              METHODOLOGY COMPARISON
            </h3>
            
            <div className="space-y-3.5">
              <div className="grid grid-cols-12 gap-2 text-[11px] font-mono text-brand-gray-500 uppercase tracking-wider pb-1 border-b border-brand-white/[0.04]">
                <div className="col-span-6">Metric</div>
                <div className="col-span-3 text-center">Others</div>
                <div className="col-span-3 text-center text-brand-white">HARIKOS</div>
              </div>

              {[
                { metric: "Code Ownership", others: "No (SaaS lock-in)", harikos: "100% IP Ownership" },
                { metric: "API Security", others: "Shared Endpoints", harikos: "Dedicated Sandbox" },
                { metric: "Implementation", others: "Generic prompts", harikos: "Bespoke Orchestration" },
                { metric: "Success Rate", others: "70% (Instability)", harikos: "99.8% QA Guardrails" },
                { metric: "Integrations", others: "Zapier delays", harikos: "Native Coded SDKs" }
              ].map((row, idx) => (
                <div key={idx} className="grid grid-cols-12 gap-2 text-xs py-1 border-b border-brand-white/[0.02]">
                  <div className="col-span-6 text-brand-gray-400">{row.metric}</div>
                  <div className="col-span-3 text-center text-brand-gray-600 flex items-center justify-center gap-1">
                    <X className="w-3 h-3 text-red-500/50" />
                    <span className="hidden sm:inline">{row.others.split(" ")[0]}</span>
                  </div>
                  <div className="col-span-3 text-center text-brand-white font-medium flex items-center justify-center gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="hidden sm:inline">{row.harikos.split(" ")[0]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Architectural Pillars */}
        <div className="lg:col-span-7 space-y-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="p-8 rounded-2xl border border-brand-white/[0.05] bg-brand-black/40 backdrop-blur-md flex gap-6 hover:border-brand-white/[0.1] hover:bg-brand-white/[0.01] transition-all duration-300"
              >
                <div className="flex-shrink-0 mt-1">
                  <div className="p-3 rounded-xl bg-brand-white/[0.03] border border-brand-white/[0.05]">
                    <Icon className="w-5 h-5 text-brand-white" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-display text-lg sm:text-xl font-bold text-brand-white">
                    {pillar.title}
                  </h3>
                  <p className="font-sans text-sm text-brand-gray-400 font-light leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
