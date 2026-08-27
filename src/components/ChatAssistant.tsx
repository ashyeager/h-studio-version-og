import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, User, Send, X, Sparkles, RefreshCw } from 'lucide-react';
import Markdown from 'react-markdown';

type QuickAction = {
  label: string;
  action: string;
};

const INITIAL_QUICK_ACTIONS: QuickAction[] = [
  { label: '🚀 What does HARIKOS AI do?', action: 'what' },
  { label: '🤖 AI Automation', action: 'automation' },
  { label: '💬 AI Chatbots & Voice Agents', action: 'chatbots' },
  { label: '🌐 Premium Websites', action: 'websites' },
  { label: '💰 Pricing', action: 'pricing' },
  { label: '📂 Our Process', action: 'process' },
  { label: '📞 Contact Us', action: 'contact' },
];

const RESPONSES: Record<string, { text: string; buttons?: QuickAction[] }> = {
  what: {
    text: "HARIKOS helps businesses improve operations through intelligent automation and premium digital experiences.\n\nWe specialize in:\n* AI automation\n* Chatbots\n* Voice assistants\n* Premium websites\n* Workflow optimization\n\nWould you like to learn about one of our services?",
    buttons: [
      { label: '🤖 AI Automation', action: 'automation' },
      { label: '💬 AI Chatbots', action: 'chatbots' },
      { label: '🌐 Websites', action: 'websites' },
    ],
  },
  automation: {
    text: "Our AI Automation services include:\n* Workflow automation\n* CRM automation\n* Internal AI assistants\n* Business process optimization\n\nAutomation should eliminate repetitive work so your team can focus on higher-value tasks.",
    buttons: [
      { label: '💰 Pricing', action: 'pricing' },
      { label: '📞 Contact Us', action: 'contact' },
    ],
  },
  chatbots: {
    text: "Our intelligent conversational systems include:\n* Customer support\n* Lead qualification\n* Appointment booking\n* Business assistants\n* Voice AI\n\nThese are custom-built for each business to ensure the best results.",
    buttons: [
      { label: '📂 Our Process', action: 'process' },
      { label: '📞 Contact Us', action: 'contact' },
    ],
  },
  websites: {
    text: "Our premium digital experiences focus on:\n* Premium landing pages\n* High-performance websites\n* Mobile-first design\n* Conversion-focused user experience\n* Modern interfaces\n\nThe goal is always to convert visitors into customers.",
    buttons: [
      { label: '💰 Pricing', action: 'pricing' },
      { label: '📞 Contact Us', action: 'contact' },
    ],
  },
  pricing: {
    text: "Every project is different depending on your goals and business needs. We usually begin with a discovery conversation before recommending the right solution.",
    buttons: [
      { label: '📂 Our Process', action: 'process' },
      { label: '📞 Contact Us', action: 'contact' },
    ],
  },
  process: {
    text: "1. **Discover**\nUnderstand your business.\n\n2. **Design**\nPlan the right solution.\n\n3. **Build**\nDevelop a focused MVP.\n\n4. **Optimize**\nImprove using real-world feedback.",
    buttons: [
      { label: '🚀 What do you do?', action: 'what' },
      { label: '📞 Contact Us', action: 'contact' },
    ],
  },
  contact: {
    text: "The fastest way to reach HARIKOS AI is through Instagram.\n\n**[@harikos.ai](https://instagram.com/harikos.ai)**",
    buttons: [
      { label: 'Start a Project', action: 'scroll_contact' },
    ],
  },
  unknown: {
    text: "I don't have an answer for that yet, but I'd be happy to point you in the right direction.",
    buttons: INITIAL_QUICK_ACTIONS,
  },
};

const KEYWORDS: { [key: string]: string } = {
  website: 'websites',
  'landing page': 'websites',
  automation: 'automation',
  workflow: 'automation',
  chatbot: 'chatbots',
  voice: 'chatbots',
  agent: 'chatbots',
  pricing: 'pricing',
  cost: 'pricing',
  price: 'pricing',
  contact: 'contact',
  reach: 'contact',
  message: 'contact',
  instagram: 'contact',
  process: 'process',
  how: 'process',
  what: 'what',
  do: 'what',
  services: 'what',
  ai: 'what',
};

type Message = {
  id: string;
  role: 'user' | 'model';
  text: string;
  buttons?: QuickAction[];
};

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: 'init-1',
          role: 'model',
          text: "Hi! I'm the HARIKOS Assistant.\n\nI can help you learn about our services, pricing, process, or direct you to the best next step.",
          buttons: INITIAL_QUICK_ACTIONS,
        },
      ]);
    }
  }, [messages.length]);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleAction = (action: string, label?: string) => {
    if (action === 'scroll_contact') {
      setIsOpen(false);
      if (window.location.pathname !== '/') {
        window.location.href = '/#contact';
      } else {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.location.hash = '#contact';
        }
      }
      return;
    }

    if (label) {
      appendUserMessage(label);
    }
    triggerResponse(action);
  };

  const appendUserMessage = (text: string) => {
    setMessages((prev) => [
      ...prev.map(m => ({ ...m, buttons: [] })), // Remove buttons from previous messages
      { id: Date.now().toString(), role: 'user', text },
    ]);
  };

  const triggerResponse = (actionOrKey: string) => {
    setIsTyping(true);
    
    // Determine response
    let responseData = RESPONSES[actionOrKey];
    if (!responseData) {
      responseData = RESPONSES['unknown'];
    }

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'model',
          text: responseData.text,
          buttons: responseData.buttons,
        },
      ]);
    }, 1000); // 1 second typing delay
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isTyping) return;
    
    const text = chatInput.trim();
    appendUserMessage(text);
    setChatInput('');
    
    const lowerText = text.toLowerCase();
    
    // Find matching keyword
    let matchedAction = 'unknown';
    for (const [keyword, action] of Object.entries(KEYWORDS)) {
      if (lowerText.includes(keyword)) {
        matchedAction = action;
        break;
      }
    }
    
    triggerResponse(matchedAction);
  };

  const startOver = () => {
    setMessages([
      {
        id: Date.now().toString(),
        role: 'model',
        text: "Hi! I'm the HARIKOS Assistant.\n\nI can help you learn about our services, pricing, process, or direct you to the best next step.",
        buttons: INITIAL_QUICK_ACTIONS,
      },
    ]);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 w-[360px] sm:w-[400px] h-[550px] max-h-[85vh] z-50 flex flex-col bg-brand-black border border-brand-white/[0.1] rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-brand-white/[0.05] bg-brand-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-white text-brand-black flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-display text-brand-white flex items-center gap-2">
                    HARIKOS AI 
                    <Sparkles className="w-3 h-3 text-brand-gray-400 animate-pulse" />
                  </h3>
                  <p className="text-[10px] font-mono text-brand-gray-500">SYSTEM ONLINE</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={startOver}
                  title="Start Over"
                  className="p-2 rounded-full hover:bg-brand-white/[0.1] transition-colors text-brand-gray-400 hover:text-brand-white"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-brand-white/[0.1] transition-colors text-brand-gray-400 hover:text-brand-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col gap-3 ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`flex gap-3 max-w-[90%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-6 h-6 mt-1 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'user' ? 'bg-brand-white text-brand-black' : 'bg-brand-white/[0.1] text-brand-white'}`}>
                      {msg.role === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                    </div>
                    <div className={`p-3.5 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-brand-white text-brand-black rounded-tr-sm' : 'bg-brand-white/[0.05] border border-brand-white/[0.05] text-brand-gray-200 rounded-tl-sm'}`}>
                      {msg.role === 'user' ? (
                        msg.text
                      ) : (
                        <div className="markdown-body">
                          <Markdown>{msg.text}</Markdown>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Quick Action Buttons for the last message */}
                  {msg.buttons && msg.buttons.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex flex-wrap gap-2 pl-9"
                    >
                      {msg.buttons.map((btn, i) => (
                        <button
                          key={i}
                          onClick={() => handleAction(btn.action, btn.label)}
                          className="px-3 py-1.5 bg-brand-white/[0.03] hover:bg-brand-white/[0.08] border border-brand-white/[0.1] rounded-full text-xs text-brand-gray-300 transition-colors text-left"
                        >
                          {btn.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3 flex-row max-w-[85%]">
                  <div className="w-6 h-6 mt-1 rounded-full flex-shrink-0 flex items-center justify-center bg-brand-white/[0.1] text-brand-white">
                    <Bot className="w-3 h-3" />
                  </div>
                  <div className="p-3.5 rounded-2xl text-sm leading-relaxed bg-brand-white/[0.05] border border-brand-white/[0.05] text-brand-gray-300 rounded-tl-sm flex items-center gap-1.5 h-11">
                    <motion.div 
                      className="w-1.5 h-1.5 bg-brand-gray-400 rounded-full"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div 
                      className="w-1.5 h-1.5 bg-brand-gray-400 rounded-full"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div 
                      className="w-1.5 h-1.5 bg-brand-gray-400 rounded-full"
                      animate={{ y: [0, -3, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-brand-white/[0.05] bg-brand-black">
              <form onSubmit={handleChatSubmit} className="flex gap-2">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Message AI..." 
                  className="flex-1 bg-brand-white/[0.05] border border-brand-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-brand-white placeholder:text-brand-gray-500 focus:outline-none focus:border-brand-white/30 transition-all"
                />
                <button 
                  type="submit" 
                  disabled={isTyping || !chatInput.trim()}
                  className="w-10 h-10 bg-brand-white text-brand-black rounded-xl hover:bg-brand-gray-300 transition-colors flex items-center justify-center disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 h-14 px-5 rounded-full bg-brand-white text-brand-black shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-shadow flex items-center justify-center gap-2 cursor-pointer group"
        aria-label="Toggle AI Assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative flex items-center gap-2"
            >
              <Bot className="w-5 h-5" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider">Assistant</span>
              {/* Pulse effect */}
              <div className="absolute inset-0 rounded-full animate-ping bg-brand-white opacity-20" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
