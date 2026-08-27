import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  Sparkles, 
  Cpu, 
  Play, 
  CheckCircle2, 
  ShieldCheck, 
  Mail, 
  Database, 
  Send, 
  Zap, 
  Loader2, 
  Workflow, 
  Globe, 
  UserCheck, 
  CreditCard, 
  ChevronRight, 
  Activity, 
  Terminal,
  Check
} from "lucide-react";
import OrbCanvas from "./OrbCanvas";
import MagneticButton from "./MagneticButton";

interface HeroProps {
  onBookCallClick: () => void;
}

interface Step {
  id: number;
  label: string;
  title: string;
  desc: string;
  detail: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface WorkflowTemplate {
  id: string;
  title: string;
  tag: string;
  description: string;
  savedTime: string;
  icon: React.ComponentType<{ className?: string }>;
  steps: Step[];
}

export default function Hero({ onBookCallClick }: HeroProps) {
  // Define our 3 elite automation pipelines
  const workflows: WorkflowTemplate[] = [
    {
      id: "support",
      title: "Support Auto-Pilot",
      tag: "Customer Service AI",
      description: "Intercepts incoming client inquiries, extracts billing or account intent, matches company database vectors, and securely drafts an accurate email reply.",
      savedTime: "35 mins saved / run",
      icon: Mail,
      steps: [
        { id: 0, label: "INGRESS", title: "Inbox Monitor", desc: "Detects incoming support emails", detail: "Billing dispute email received from enterprise account.", icon: InboxIcon },
        { id: 1, label: "ANALYSIS", title: "Semantic Extractor", desc: "Identifies query intent & sentiment", detail: "Extracted intent: 'Double subscription charge'. Sentiment: Neutral-Anxious.", icon: Cpu },
        { id: 2, label: "KNOWLEDGE", title: "Vector Lookup", desc: "Queries company knowledge base", detail: "Retrieved billing guideline policy document with 98.7% semantic match.", icon: Database },
        { id: 3, label: "SYNTHESIS", title: "Intelligent Draft", desc: "Formulates natural, safe reply", detail: "Formulated client response adhering strictly to compliance templates.", icon: Sparkles },
        { id: 4, label: "DISPATCH", title: "Secure Relay", desc: "Sends response & logs update", detail: "Email sent cleanly. Transaction logged to CRM and alerts posted to #support.", icon: Send }
      ]
    },
    {
      id: "leads",
      title: "Lead Qualification Pipeline",
      tag: "CRM Orchestration",
      description: "Detects new marketing sign-ups, scrapes target company details, qualifies criteria against enterprise client criteria, and schedules sync calls.",
      savedTime: "18 mins saved / run",
      icon: UserCheck,
      steps: [
        { id: 0, label: "INGRESS", title: "Form Captured", desc: "Detects active sign-up events", detail: "New inbound inquiry recorded from marketing capture form.", icon: Globe },
        { id: 1, label: "ENRICH", title: "Profile Scraper", desc: "Assembles company tech-stack", detail: "Retrieved employee count (450), funding tier, and software landscape.", icon: Activity },
        { id: 2, label: "ICP AUDIT", title: "Account Validation", desc: "Verifies target criteria match", detail: "Verified account qualifies for Tier-1 Enterprise. ICP score: 9.8/10.", icon: ShieldCheck },
        { id: 3, label: "CRM SYNC", title: "HubSpot Write", desc: "Creates records and logs context", detail: "Inserted company parameters into Sales Hub. Created deal record.", icon: Database },
        { id: 4, label: "BOOKING", title: "Calendar dispatch", desc: "Sends scheduling link", detail: "Sent smart calendar link. Target contact opened invitation.", icon: Send }
      ]
    },
    {
      id: "ledger",
      title: "Operations & Ledger Sync",
      tag: "ERP Automation",
      description: "Triggered on client invoice settlement. Automatically records transaction lines, configures custom client portal workspaces, and dispatches custom onboarding.",
      savedTime: "50 mins saved / run",
      icon: CreditCard,
      steps: [
        { id: 0, label: "SETTLEMENT", title: "Payment Event", desc: "Listens to payment webhook", detail: "Verified payment success event: Invoice #HK-2901 ($12,500.00).", icon: CreditCard },
        { id: 1, label: "ERP SYNC", title: "Ledger Update", desc: "Synchronizes transaction logs", detail: "Posted corresponding credit/debit transaction lines in QuickBooks ledger.", icon: Database },
        { id: 2, label: "WORKSPACE", title: "Portal Provision", desc: "Assembles private cloud workspace", detail: "Created secure client container directory and initiated shared directory structure.", icon: WorkflowIcon },
        { id: 3, label: "DOCUMENTS", title: "Brief Builder", desc: "Prepares onboarding brief", detail: "Assembled personalized project brief summarizing initial timelines.", icon: Sparkles },
        { id: 4, label: "ONBOARDING", title: "Kit Dispatch", desc: "Dispatches starter packages", detail: "Mailed setup instructions. Systems online. Client invited to portal.", icon: Send }
      ]
    }
  ];

  const [activeWorkflowIdx, setActiveWorkflowIdx] = useState(0);
  const [currentStep, setCurrentStep] = useState<number>(-1); // -1 = Idle, 0-4 = active step
  const [simulationStatus, setSimulationStatus] = useState<"idle" | "running" | "completed">("idle");
  const [simulationLogs, setSimulationLogs] = useState<string[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const logsEndRef = useRef<HTMLDivElement>(null);

  const activeWorkflow = workflows[activeWorkflowIdx];

  // Auto scroll to services
  const handleExploreClick = () => {
    const servicesSection = document.getElementById("services");
    if (servicesSection) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = servicesSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Run the step-by-step visual automation simulation
  const handleRunSimulation = () => {
    if (simulationStatus === "running") return;

    setSimulationStatus("running");
    setCurrentStep(0);
    setSimulationLogs([`[INITIALIZING] Starting ${activeWorkflow.title} thread...`]);

    if (intervalRef.current) clearInterval(intervalRef.current);

    let step = 0;
    const runStep = () => {
      const stepData = activeWorkflow.steps[step];
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      
      setSimulationLogs(prev => [
        ...prev, 
        `[${timestamp}] [${stepData.label}] ${stepData.title} -> ${stepData.detail}`
      ]);

      if (step < 4) {
        step++;
        setCurrentStep(step);
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setSimulationStatus("completed");
        setSimulationLogs(prev => [
          ...prev,
          `[SUCCESS] Workflow execution finalized successfully in 1.48 seconds.`
        ]);
      }
    };

    // Run first step immediately
    runStep();

    intervalRef.current = setInterval(() => {
      runStep();
    }, 1600);
  };

  // Stop simulation when swapping workflows
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setSimulationStatus("idle");
    setCurrentStep(-1);
    setSimulationLogs([]);
  }, [activeWorkflowIdx]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [simulationLogs]);

  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 md:pt-40 md:pb-28 flex flex-col items-center justify-center px-6 md:px-12 z-10 overflow-hidden">
      {/* Visual Accent: Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-brand-white/15 to-transparent" />

      {/* Hero Asymmetric Layout Split */}
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center mb-16">
        
        {/* Left Side: Premium Copy & Actions */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Animated Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-brand-white/[0.08] bg-brand-white/[0.03] backdrop-blur-xl mb-8 group hover:border-brand-white/15 transition-colors cursor-pointer"
            onClick={onBookCallClick}
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-gray-300 group-hover:text-brand-white transition-colors animate-pulse" />
            <span className="font-mono text-xs text-brand-gray-300 group-hover:text-brand-white transition-colors tracking-wide">
              AI Automation & Premium 3D Landing Pages
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
          </motion.div>

          {/* Hero Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-brand-white leading-[1.08] mb-6 max-w-2xl"
          >
            We build intelligent systems and <br />
            <span className="bg-gradient-to-b from-brand-white via-brand-white to-brand-gray-500 bg-clip-text text-transparent">
              premium digital experiences.
            </span>
          </motion.h1>

          {/* Hero Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="font-sans text-base sm:text-lg text-brand-gray-400 font-light max-w-xl leading-relaxed mb-10"
          >
            HARIKOS AI helps ambitious businesses grow through custom automation systems, high-performance websites, and digital experiences designed to create measurable impact.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <MagneticButton
              onClick={onBookCallClick}
              className="w-full sm:w-auto relative inline-flex items-center justify-center px-8 py-4 text-base font-medium text-brand-black bg-brand-white rounded-full overflow-hidden transition-all duration-300 hover:bg-brand-gray-300 shadow-[0_4px_20px_rgba(255,255,255,0.15)] group cursor-pointer"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </MagneticButton>
            
            <MagneticButton
              onClick={handleExploreClick}
              className="w-full sm:w-auto relative inline-flex items-center justify-center px-8 py-4 text-base font-medium text-brand-white bg-brand-black border border-brand-white/[0.08] hover:border-brand-white/[0.2] rounded-full transition-all duration-300 hover:bg-brand-white/[0.08] cursor-pointer"
            >
              Explore Our Services
            </MagneticButton>
          </motion.div>
        </div>

        {/* Right Side: Premium 3D Interactive Orb */}
        <div className="flex w-full lg:col-span-5 justify-center lg:justify-end mt-12 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            className="relative w-full flex justify-center lg:justify-end"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] md:w-[350px] md:h-[350px] bg-cyan-900/10 blur-[120px] rounded-full mix-blend-screen animate-pulse-glow" />
            <OrbCanvas />
          </motion.div>
        </div>
      </div>

      {/* Interactive HARIKOS AI Automation Board */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        className="w-full max-w-5xl mx-auto rounded-xl border border-brand-white/[0.08] bg-brand-black/40 backdrop-blur-xl overflow-hidden shadow-2xl relative group hover:border-brand-white/[0.15] transition-all duration-500"
      >
        {/* Board Tab Headers */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between border-b border-brand-white/[0.08] bg-brand-black/60">
          
          <div className="flex items-center gap-2 px-5 py-3 border-b md:border-b-0 border-brand-white/[0.08]">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-wider text-brand-gray-300 flex items-center gap-1.5 font-medium">
              <Terminal className="w-4 h-4 text-brand-gray-400" /> HARIKOS AI Automation Sandbox
            </span>
          </div>

          <div className="flex overflow-x-auto p-1.5 gap-1 select-none custom-scrollbar">
            {workflows.map((wf, idx) => {
              const WfIcon = wf.icon;
              return (
                <button 
                  key={wf.id}
                  onClick={() => setActiveWorkflowIdx(idx)}
                  className={`flex items-center gap-2 font-mono text-[11px] px-3.5 py-2 rounded-lg transition-all cursor-pointer ${
                    activeWorkflowIdx === idx 
                      ? "bg-brand-white/10 text-brand-white border border-brand-white/[0.12] font-semibold" 
                      : "text-brand-gray-400 hover:text-brand-gray-200 border border-transparent"
                  }`}
                >
                  <WfIcon className="w-3.5 h-3.5" />
                  <span>{wf.title}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Selected Workflow Description Row */}
        <div className="p-6 border-b border-brand-white/[0.06] bg-brand-white/[0.01] grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
          <div className="md:col-span-3 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider uppercase bg-brand-white/[0.08] text-brand-gray-300">
                {activeWorkflow.tag}
              </span>
              <span className="text-xs text-brand-gray-500 font-mono">• Active Pipeline</span>
            </div>
            <p className="font-sans text-sm text-brand-gray-300 font-light leading-relaxed">
              {activeWorkflow.description}
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end justify-center bg-brand-white/[0.02] border border-brand-white/[0.04] p-4 rounded-lg">
            <span className="font-mono text-[10px] text-brand-gray-500 uppercase tracking-wide">SAVINGS MULTIPLIER</span>
            <span className="font-display font-bold text-lg text-emerald-400 mt-1">{activeWorkflow.savedTime}</span>
          </div>
        </div>

        {/* Visual Pipeline Showcase */}
        <div className="p-6 md:p-8 bg-brand-black/20 space-y-8">
          
          <div className="relative">
            {/* Horizontal line background connecting steps (Desktop only) */}
            <div className="absolute top-[28px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-brand-white/10 to-transparent hidden md:block" />

            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4 relative z-10">
              {activeWorkflow.steps.map((step, idx) => {
                const StepIcon = step.icon;
                const isStepCompleted = currentStep > idx || simulationStatus === "completed";
                const isStepActive = currentStep === idx && simulationStatus === "running";

                return (
                  <div 
                    key={step.id} 
                    className={`p-4 rounded-xl border transition-all duration-300 flex flex-col items-center text-center relative ${
                      isStepActive 
                        ? "border-emerald-500/40 bg-emerald-500/[0.03] shadow-[0_0_15px_rgba(16,185,129,0.08)]" 
                        : isStepCompleted 
                          ? "border-brand-white/20 bg-brand-white/[0.02]" 
                          : "border-brand-white/[0.04] bg-brand-black/40 opacity-55"
                    }`}
                  >
                    {/* Node circular visual */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-300 mb-3 ${
                      isStepActive 
                        ? "bg-emerald-500 border-emerald-400 text-brand-black scale-110 animate-pulse" 
                        : isStepCompleted 
                          ? "bg-brand-white border-brand-white text-brand-black" 
                          : "bg-brand-white/[0.02] border-brand-white/10 text-brand-gray-400"
                    }`}>
                      {isStepCompleted ? (
                        <Check className="w-5 h-5 stroke-[2.5]" />
                      ) : isStepActive ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <StepIcon className="w-4.5 h-4.5" />
                      )}
                    </div>

                    <span className="font-mono text-[9px] text-brand-gray-500 tracking-wider mb-1">
                      STEP 0{idx + 1} • {step.label}
                    </span>
                    <h4 className="font-sans font-medium text-xs text-brand-white">
                      {step.title}
                    </h4>
                    <p className="font-sans text-[10px] text-brand-gray-400 leading-normal mt-1 max-w-[130px]">
                      {step.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Trigger & Terminal Output Console */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Control Sidebar */}
            <div className="lg:col-span-4 flex flex-col justify-between p-5 rounded-xl border border-brand-white/[0.06] bg-brand-white/[0.02] space-y-4">
              <div className="space-y-2">
                <h4 className="font-mono text-[10px] text-brand-gray-400 uppercase tracking-wider font-medium">Pipeline Controls</h4>
                <p className="text-xs text-brand-gray-400 font-light leading-relaxed">
                  Click below to trigger a live execution and observe the AI Agent's real-time action sequence and decision parameters.
                </p>
              </div>

              <button
                onClick={handleRunSimulation}
                disabled={simulationStatus === "running"}
                className={`w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg text-xs font-mono uppercase font-semibold border transition-all cursor-pointer ${
                  simulationStatus === "running"
                    ? "bg-brand-white/5 border-brand-white/10 text-brand-gray-500 cursor-not-allowed"
                    : "bg-brand-white border-brand-white text-brand-black hover:bg-brand-gray-100 hover:scale-[1.01] active:scale-[0.99] shadow-[0_0_15px_rgba(255,255,255,0.06)]"
                }`}
              >
                {simulationStatus === "running" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Executing pipeline...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Execute Automation Flow</span>
                  </>
                )}
              </button>
            </div>

            {/* Simulated Live Console Output */}
            <div className="lg:col-span-8 p-5 rounded-xl border border-brand-white/[0.06] bg-brand-black/80 flex flex-col justify-between min-h-[160px]">
              <div className="space-y-2 font-mono text-[11px] text-brand-gray-300 leading-relaxed max-h-[140px] overflow-y-auto custom-scrollbar">
                <div className="text-brand-gray-500 border-b border-brand-white/[0.04] pb-1.5 flex justify-between items-center">
                  <span>LIVE TRANSACTION FEED</span>
                  <span className="text-[9px] text-emerald-400 font-semibold animate-pulse">● SYSTEMS OPERATIONAL</span>
                </div>
                
                {simulationLogs.length === 0 ? (
                  <p className="text-brand-gray-600 italic">Waiting for pipeline execution...</p>
                ) : (
                  <div className="space-y-1.5">
                    {simulationLogs.map((log, index) => {
                      const isInit = log.includes("[INITIALIZING]");
                      const isSuccess = log.includes("[SUCCESS]");
                      return (
                        <div key={index} className="flex items-start gap-1.5">
                          <span className="text-brand-gray-600 select-none">›</span>
                          <span className={isInit ? "text-brand-gray-400" : isSuccess ? "text-emerald-400 font-semibold" : "text-brand-gray-200"}>
                            {log}
                          </span>
                        </div>
                      );
                    })}
                    <div ref={logsEndRef} />
                  </div>
                )}
              </div>

              {/* Status footer inside console */}
              <div className="mt-4 pt-3 border-t border-brand-white/[0.04] flex flex-col sm:flex-row justify-between items-center text-brand-gray-500 text-[10px] gap-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Uptime: 99.998% | Compliance: SOC2 Certified
                </span>
                <span className="font-mono text-brand-gray-400">
                  Ref: HK-AUTOMATION-PROD
                </span>
              </div>
            </div>

          </div>

        </div>
      </motion.div>
    </section>
  );
}

// Inline fallback icons for safety & simplicity
function InboxIcon(props: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={props.className}
    >
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  );
}

function WorkflowIcon(props: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={props.className}
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}
