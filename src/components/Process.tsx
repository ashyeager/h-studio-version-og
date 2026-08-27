import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Compass, Cpu, Rocket, LineChart, ChevronRight } from "lucide-react";

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: "01",
      icon: Search,
      phase: "Discover",
      tagline: "Bottleneck Analysis",
      desc: "We identify the business bottleneck, opportunity, and desired outcome.",
      deliverable: "Clear Problem Definition & Objective Mapping"
    },
    {
      num: "02",
      icon: Compass,
      phase: "Design",
      tagline: "Architectural Schematic",
      desc: "We create a strategy and system designed around the actual problem.",
      deliverable: "System Design Blueprint & Workflow Map"
    },
    {
      num: "03",
      icon: Cpu,
      phase: "Build",
      tagline: "Bespoke System Engineering",
      desc: "We develop a focused MVP that delivers value quickly.",
      deliverable: "Functional System MVP & Core Infrastructure"
    },
    {
      num: "04",
      icon: LineChart,
      phase: "Improve",
      tagline: "Continuous Reinforcement",
      desc: "We analyze results and continuously optimize the system.",
      deliverable: "Performance Analytics & Ongoing Optimization"
    }
  ];

  return (
    <section id="process" className="relative py-24 md:py-32 px-6 md:px-12 z-10 max-w-7xl mx-auto border-t border-brand-white/[0.05]">
      
      {/* Title */}
      <div className="max-w-2xl mb-16 md:mb-24">
        <span className="font-mono text-xs text-brand-gray-400 uppercase tracking-widest block mb-4">
          [ Engineering Workflow ]
        </span>
        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-brand-white mb-6">
          Our path to absolute automation.
        </h2>
        <p className="font-sans text-brand-gray-400 font-light leading-relaxed text-sm sm:text-base">
          Building bespoke high-performance AI workforce pipelines requires structural rigor. We follow a meticulous four-phase process to ensure custom-built systems deploy flawlessly.
        </p>
      </div>

      {/* Interactive Desktop Timeline Grid */}
      <div className="hidden lg:grid grid-cols-4 gap-6 mb-12 relative">
        {/* Animated glow trail connecting steps */}
        <div className="absolute top-[34px] left-10 right-10 h-[1px] bg-brand-white/10 z-0" />
        <motion.div 
          className="absolute top-[34px] left-10 h-[1.5px] bg-brand-white z-0"
          initial={{ width: "0%" }}
          whileInView={{ width: `${(activeStep / 3) * 100}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />

        {steps.map((step, idx) => {
          const StepIcon = step.icon;
          const isActive = idx === activeStep;
          const isCompleted = idx < activeStep;

          return (
            <div 
              key={idx} 
              onClick={() => setActiveStep(idx)}
              className="relative z-10 cursor-pointer group flex flex-col items-center text-center"
            >
              {/* Step Icon Button */}
              <div 
                className={`w-16 h-16 rounded-full flex items-center justify-center border transition-all duration-300 ${
                  isActive 
                    ? "bg-brand-white border-brand-white text-brand-black shadow-[0_0_20px_rgba(255,255,255,0.25)]" 
                    : isCompleted
                      ? "bg-brand-black border-brand-white text-brand-white"
                      : "bg-brand-black border-brand-white/10 text-brand-gray-500 hover:border-brand-white/30 hover:text-brand-gray-300"
                }`}
              >
                <StepIcon className="w-5 h-5" />
              </div>

              {/* Phase name & step number */}
              <span className="font-mono text-[10px] text-brand-gray-500 mt-4 tracking-wider uppercase block">
                PHASE {step.num}
              </span>
              <h3 className={`font-display text-lg font-bold mt-1 transition-colors ${isActive ? "text-brand-white" : "text-brand-gray-400 group-hover:text-brand-gray-200"}`}>
                {step.phase}
              </h3>
            </div>
          );
        })}
      </div>

      {/* Desktop Active Card Detail Viewer */}
      <div className="hidden lg:block">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
            className="p-10 rounded-2xl border border-brand-white/[0.06] bg-brand-black/40 backdrop-blur-xl grid grid-cols-12 gap-8 items-center"
          >
            <div className="col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-white/[0.08] bg-brand-white/[0.02]">
                <span className="font-mono text-[10px] text-brand-gray-300 uppercase tracking-wider">{steps[activeStep].tagline}</span>
              </div>
              <h4 className="font-display text-3xl font-bold text-brand-white">
                Phase {steps[activeStep].num}: {steps[activeStep].phase}
              </h4>
              <p className="font-sans text-brand-gray-400 font-light leading-relaxed text-base">
                {steps[activeStep].desc}
              </p>
            </div>
            
            <div className="col-span-5 p-6 rounded-xl border border-brand-white/[0.04] bg-brand-white/[0.01] space-y-3">
              <span className="font-mono text-[9px] text-brand-gray-500 uppercase tracking-widest block">CORE DELIVERABLE</span>
              <p className="font-display text-lg font-medium text-brand-white">
                {steps[activeStep].deliverable}
              </p>
              <div className="flex items-center gap-1.5 text-xs font-mono text-brand-gray-400 pt-3 border-t border-brand-white/[0.03]">
                <span>Phase completed signoff</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Mobile/Tablet Timeline Layout (Staked) */}
      <div className="lg:hidden space-y-6">
        {steps.map((step, idx) => {
          const StepIcon = step.icon;
          return (
            <div 
              key={idx}
              className="p-8 rounded-2xl border border-brand-white/[0.05] bg-brand-black/40 backdrop-blur-xl flex flex-col md:flex-row gap-6 items-start"
            >
              {/* Badge & Icon */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-brand-white/10 bg-brand-black flex items-center justify-center text-brand-white">
                  <StepIcon className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-mono text-[10px] text-brand-gray-500 uppercase tracking-wider block">PHASE {step.num}</span>
                  <h3 className="font-display text-xl font-bold text-brand-white">{step.phase}</h3>
                </div>
              </div>

              {/* Desc */}
              <div className="flex-1 space-y-3 md:mt-2">
                <p className="font-mono text-xs text-brand-gray-400">{step.tagline}</p>
                <p className="font-sans text-sm text-brand-gray-400 font-light leading-relaxed">{step.desc}</p>
                <div className="p-4 rounded-xl border border-brand-white/[0.04] bg-brand-white/[0.01] mt-3">
                  <span className="font-mono text-[9px] text-brand-gray-500 uppercase tracking-widest block mb-1">DELIVERABLE</span>
                  <p className="font-display text-sm font-medium text-brand-white">{step.deliverable}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
