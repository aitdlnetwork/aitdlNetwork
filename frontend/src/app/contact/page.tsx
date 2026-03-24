/*
AITDL Network
Artificial Intelligence Technology & Deep Learning

Designed & Architected by JRM

Contact:
aitdl.com
aitdlnetwork@outlook.com
jawahar.mallah@gmail.com

Copyright © AITDL Network 2026 | Vikram Samvat 2083
*/

// AITDL Network © 2026 | Vikram Samvat 2083
// Designed & Architected by JRM

"use client";

import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', project: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Dynamic WhatsApp Pre-fill Link forwarding for static setup
    const message = `Hi AITDL Network,%0A%0AI would like to request a demo.%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Message:* ${formData.project}`;
    const whatsappUrl = `https://wa.me/919323023007?text=${message}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Auto-redirect to WhatsApp for direct chat after feedback
      window.open(whatsappUrl, '_blank');
    }, 1000);
  };

  return (
    <div className="flex-1 w-full max-w-[1200px] mx-auto px-6 py-12 flex flex-col justify-center z-10 relative animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left Side */}
        <div className="flex flex-col gap-10">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Get a Free Demo for Your Coaching Institute or Business
            </h1>
            <p className="text-slate-400 font-body text-lg max-w-md">
              Transform your operations with enterprise-grade AI. Let's build your custom solution today.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <a className="w-full rounded-xl p-6 flex items-center justify-between bg-[#00FF9D]/10 border border-[#00FF9D]/30 transition-all hover:bg-[#00FF9D]/20 group relative overflow-hidden" href="https://wa.me/919323023007" target="_blank" rel="noreferrer">
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-14 h-14 rounded-lg bg-[#00FF9D] flex items-center justify-center text-black shadow-lg">
                  <span className="material-symbols-outlined scale-125">chat</span>
                </div>
                <div className="text-left">
                  <h2 className="text-[#00FF9D] text-xl font-bold leading-tight">Primary Support</h2>
                  <p className="text-slate-200 text-sm font-body font-medium">Immediate response • +91 93230 23007</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#00FF9D] group-hover:translate-x-2 transition-transform relative z-10 text-3xl">arrow_forward</span>
            </a>

            <a className="w-full rounded-xl p-6 flex items-center justify-between bg-primary/10 border border-primary/30 transition-all hover:bg-primary/20 group relative overflow-hidden" href="https://wa.me/919324117007" target="_blank" rel="noreferrer">
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-14 h-14 rounded-lg bg-primary/20 flex items-center justify-center text-primary shadow-lg">
                  <span className="material-symbols-outlined scale-125">chat</span>
                </div>
                <div className="text-left">
                  <h2 className="text-primary text-xl font-bold leading-tight">Chat with Pushpa</h2>
                  <p className="text-slate-200 text-sm font-body font-medium">Secondary Support • +91 93241 17007</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-primary group-hover:translate-x-2 transition-transform relative z-10 text-3xl">arrow_forward</span>
            </a>

            <a className="w-full rounded-xl p-6 flex items-center justify-between bg-emerald-500/10 border border-emerald-500/30 transition-all hover:bg-emerald-500/20 group relative overflow-hidden" href="tel:+919323023007">
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-lg">
                  <span className="material-symbols-outlined">call</span>
                </div>
                <div className="text-left">
                  <p className="text-xs text-slate-400 uppercase tracking-widest mb-0.5 font-body">Direct Voice Line</p>
                  <h2 className="text-white text-lg font-mono font-medium tracking-tight">+91 93230 23007</h2>
                </div>
              </div>
              <span className="material-symbols-outlined text-emerald-400 group-hover:translate-x-2 transition-transform relative z-10 text-2xl">arrow_forward</span>
            </a>
            
            <div className="glass-card rounded-xl p-6 flex items-center gap-4 transition-all hover:border-primary/50 group">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">mail_outline</span>
              </div>
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-widest mb-1 font-body">Official Inquiries</p>
                <h2 className="text-white text-lg font-mono font-medium tracking-tight">contact@aitdl.com</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="glass-card rounded-2xl p-8 lg:p-10 border-t-2 border-t-primary/20 relative overflow-hidden">
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center text-center py-12 animate-fade-in gap-4">
              <div className="size-16 rounded-full bg-[#00FF9D]/10 text-[#00FF9D] flex items-center justify-center mb-2">
                <span className="material-symbols-outlined text-4xl">check_circle</span>
              </div>
              <h3 className="text-white font-display font-bold text-2xl">Request Initiated!</h3>
              <p className="text-slate-400 text-sm max-w-sm mb-4">Redirecting you to WhatsApp to connect with our descriptive sales board instantly.</p>
              <button onClick={() => setIsSuccess(false)} className="text-xs text-primary underline">Fill form again</button>
            </div>
          ) : (
            <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
              <div className="relative group">
                <input 
                  className="peer w-full bg-transparent border-0 border-b border-slate-600 px-0 py-3 text-white font-body focus:ring-0 focus:border-primary placeholder-transparent transition-colors" 
                  id="name" 
                  placeholder="Name" 
                  required 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <label className="absolute left-0 top-3 text-slate-400 font-body transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary cursor-text" htmlFor="name">Your Name</label>
              </div>
              <div className="relative group">
                <input 
                  className="peer w-full bg-transparent border-0 border-b border-slate-600 px-0 py-3 text-white font-body focus:ring-0 focus:border-primary placeholder-transparent transition-colors" 
                  id="email" 
                  placeholder="Email" 
                  required 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                <label className="absolute left-0 top-3 text-slate-400 font-body transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary cursor-text" htmlFor="email">Business Email</label>
              </div>
              <div className="relative group mt-2">
                <textarea 
                  className="peer w-full bg-transparent border-0 border-b border-slate-600 px-0 py-3 text-white font-body focus:ring-0 focus:border-primary placeholder-transparent transition-colors resize-none" 
                  id="project" 
                  placeholder="Tell us about your business" 
                  required 
                  rows={4}
                  value={formData.project}
                  onChange={(e) => setFormData({ ...formData, project: e.target.value })}
                ></textarea>
                <label className="absolute left-0 top-3 text-slate-400 font-body transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-primary cursor-text" htmlFor="project">How can we help you?</label>
              </div>
              <div className="space-y-4">
                <button 
                  className="w-full bg-primary text-black font-bold py-4 rounded-lg tracking-wide uppercase text-sm hover:bg-primary/90 flex items-center justify-center gap-2 transition-all group disabled:opacity-50" 
                  type="submit"
                  disabled={isSubmitting}
                >
                  <span>{isSubmitting ? 'INITIALIZING...' : 'INITIALIZE DEMO'}</span>
                  <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">bolt</span>
                </button>
                <p className="text-[10px] text-center text-slate-500 uppercase tracking-widest font-medium">Built for Indian businesses • Engineered for Global Scale</p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
