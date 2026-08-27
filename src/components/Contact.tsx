import React, { useState } from 'react';
import { Instagram, Send, Check, ArrowRight } from 'lucide-react';
import { useUserAuth } from '../contexts/UserAuthContext';
import { Link } from 'react-router-dom';

export default function Contact() {
  const { user } = useUserAuth();
  
  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    company: '',
    industry: '',
    service: '',
    goal: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userId: user ? user.uid : null,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      setIsSuccess(true);
      setFormData({
        name: user?.displayName || '',
        email: user?.email || '',
        company: '',
        industry: '',
        service: '',
        goal: '',
        budget: '',
        message: ''
      });
    } catch (error) {
      console.error("Error submitting inquiry: ", error);
      alert("Failed to submit inquiry. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-32 md:py-48 px-6 md:px-12 z-10 max-w-7xl mx-auto border-t border-brand-white/[0.05] overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full bg-cyan-900/[0.02] blur-[120px] pointer-events-none select-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 relative items-start">
        
        {/* Left column */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-8 sticky top-32">
          <div className="space-y-6">
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-light tracking-tight text-brand-white leading-[1.1]">
              Start a <br className="hidden lg:block" />
              <span className="font-bold">Project.</span>
            </h2>
            <p className="text-brand-gray-400 font-light text-lg leading-relaxed">
              Tell us about your business and what you're looking to achieve. We'll get back to you within 24 hours to discuss how HARIKOS can help.
            </p>
          </div>
          
          <div className="pt-8 border-t border-brand-white/10 space-y-6">
             <div>
                <p className="text-sm font-medium text-brand-white mb-1">Prefer direct messaging?</p>
                <p className="text-sm text-brand-gray-500 mb-4">The fastest way to reach us is through Instagram.</p>
                <a 
                  href="https://instagram.com/harikos.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand-white font-medium hover:text-brand-gray-300 transition-colors group"
                >
                  Message @harikos.ai
                  <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
             </div>
          </div>
        </div>

        {/* Right column: Inquiry Form */}
        <div className="lg:col-span-7 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-white/[0.05] to-transparent rounded-3xl -m-px" />
          <div className="relative bg-[#050505]/60 backdrop-blur-2xl border border-brand-white/[0.1] rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-900/[0.02] blur-3xl rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            
            {isSuccess ? (
              <div className="flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-display text-brand-white mb-2">Your project request has been received.</h3>
                <p className="text-brand-gray-400 max-w-sm mx-auto text-lg mb-8">
                  Your next step is a discovery conversation. Our team will contact you shortly.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 w-full">
                  <a 
                    href="https://instagram.com/harikos.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3.5 bg-brand-white text-brand-black text-sm font-semibold tracking-wide rounded-xl hover:bg-brand-gray-300 transition-colors inline-flex items-center justify-center gap-2"
                  >
                    Visit Instagram @harikos.ai
                  </a>
                  <Link 
                    to="/"
                    onClick={() => {
                      setIsSuccess(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="px-8 py-3.5 bg-transparent border border-brand-white/20 text-brand-white text-sm font-medium rounded-xl hover:bg-brand-white/5 transition-colors inline-flex items-center justify-center gap-2"
                  >
                    Return Home
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-medium text-brand-white border-b border-brand-white/10 pb-2 mb-4">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-brand-gray-500 uppercase tracking-widest pl-1">Full Name</label>
                      <input 
                        type="text" 
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-brand-white/[0.02] border border-brand-white/[0.06] rounded-xl px-4 py-3.5 text-sm text-brand-white focus:outline-none focus:border-brand-white/30 focus:bg-brand-white/[0.04] transition-all" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-brand-gray-500 uppercase tracking-widest pl-1">Email</label>
                      <input 
                        type="email" 
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-brand-white/[0.02] border border-brand-white/[0.06] rounded-xl px-4 py-3.5 text-sm text-brand-white focus:outline-none focus:border-brand-white/30 focus:bg-brand-white/[0.04] transition-all" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-brand-gray-500 uppercase tracking-widest pl-1">Company Name</label>
                    <input 
                      type="text" 
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full bg-brand-white/[0.02] border border-brand-white/[0.06] rounded-xl px-4 py-3.5 text-sm text-brand-white focus:outline-none focus:border-brand-white/30 focus:bg-brand-white/[0.04] transition-all" 
                    />
                  </div>
                </div>

                <div className="space-y-4 mt-8 pt-4">
                  <h3 className="text-xl font-medium text-brand-white border-b border-brand-white/10 pb-2 mb-4">Business Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-brand-gray-500 uppercase tracking-widest pl-1">Industry</label>
                      <select 
                        name="industry"
                        required
                        value={formData.industry}
                        onChange={handleChange}
                        className="w-full bg-brand-white/[0.02] border border-brand-white/[0.06] rounded-xl px-4 py-3.5 text-sm text-brand-white focus:outline-none focus:border-brand-white/30 focus:bg-brand-white/[0.04] transition-all appearance-none" 
                      >
                        <option value="" disabled className="bg-brand-black text-brand-gray-500">Select industry</option>
                        <option value="Real Estate" className="bg-brand-black">Real Estate</option>
                        <option value="Restaurant / Hospitality" className="bg-brand-black">Restaurant / Hospitality</option>
                        <option value="Healthcare" className="bg-brand-black">Healthcare</option>
                        <option value="Startup" className="bg-brand-black">Startup</option>
                        <option value="Professional Services" className="bg-brand-black">Professional Services</option>
                        <option value="Other" className="bg-brand-black">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-brand-gray-500 uppercase tracking-widest pl-1">Service Needed</label>
                      <select 
                        name="service"
                        required
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full bg-brand-white/[0.02] border border-brand-white/[0.06] rounded-xl px-4 py-3.5 text-sm text-brand-white focus:outline-none focus:border-brand-white/30 focus:bg-brand-white/[0.04] transition-all appearance-none" 
                      >
                        <option value="" disabled className="bg-brand-black text-brand-gray-500">Select a service</option>
                        <option value="AI Automation Systems" className="bg-brand-black">AI Automation Systems</option>
                        <option value="AI Chatbots & Voice Agents" className="bg-brand-black">AI Chatbots & Voice Agents</option>
                        <option value="Premium Website / Landing Page" className="bg-brand-black">Premium Website / Landing Page</option>
                        <option value="Custom Digital Experience" className="bg-brand-black">Custom Digital Experience</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-brand-gray-500 uppercase tracking-widest pl-1">Business Goal</label>
                      <select 
                        name="goal"
                        required
                        value={formData.goal}
                        onChange={handleChange}
                        className="w-full bg-brand-white/[0.02] border border-brand-white/[0.06] rounded-xl px-4 py-3.5 text-sm text-brand-white focus:outline-none focus:border-brand-white/30 focus:bg-brand-white/[0.04] transition-all appearance-none" 
                      >
                        <option value="" disabled className="bg-brand-black text-brand-gray-500">Select a goal</option>
                        <option value="Generate more leads" className="bg-brand-black">Generate more leads</option>
                        <option value="Save time through automation" className="bg-brand-black">Save time through automation</option>
                        <option value="Improve customer experience" className="bg-brand-black">Improve customer experience</option>
                        <option value="Build stronger online presence" className="bg-brand-black">Build stronger online presence</option>
                        <option value="Other" className="bg-brand-black">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-brand-gray-500 uppercase tracking-widest pl-1">Budget Range (Optional)</label>
                      <select 
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full bg-brand-white/[0.02] border border-brand-white/[0.06] rounded-xl px-4 py-3.5 text-sm text-brand-white focus:outline-none focus:border-brand-white/30 focus:bg-brand-white/[0.04] transition-all appearance-none" 
                      >
                        <option value="" disabled className="bg-brand-black text-brand-gray-500">Select a budget</option>
                        <option value="Under $500" className="bg-brand-black">Under $500</option>
                        <option value="$500-$2000" className="bg-brand-black">$500-$2000</option>
                        <option value="$2000+" className="bg-brand-black">$2000+</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <label className="text-[10px] font-mono text-brand-gray-500 uppercase tracking-widest pl-1">Project Description</label>
                    <textarea 
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell us about your business, challenges, and goals."
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full bg-brand-white/[0.02] border border-brand-white/[0.06] rounded-xl px-4 py-3.5 text-sm text-brand-white focus:outline-none focus:border-brand-white/30 focus:bg-brand-white/[0.04] transition-all resize-none placeholder-brand-gray-600" 
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-brand-white text-brand-black font-semibold tracking-wide rounded-xl hover:bg-brand-gray-300 transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-brand-black/30 border-t-brand-black rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <span>Submit Project Inquiry</span>
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                  {user && (
                    <p className="text-center text-xs text-brand-gray-500 mt-4">
                      This inquiry will be attached to your account ({user.email}).
                    </p>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

