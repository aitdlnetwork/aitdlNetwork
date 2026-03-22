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

import React from 'react';

export default function Contact() {
  return (
    <div className="flex-1 w-full max-w-[1200px] mx-auto px-6 py-12 flex flex-col justify-center z-10 relative">
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
            <a className="w-full rounded-xl p-6 flex items-center justify-between bg-[#00FF9D]/10 border border-[#00FF9D]/30 transition-all hover:bg-[#00FF9D]/20 group relative overflow-hidden" href="https://wa.me/910000000000" target="_blank" rel="noreferrer">
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-14 h-14 rounded-lg bg-[#00FF9D] flex items-center justify-center text-black shadow-lg">
                  <span className="material-symbols-outlined scale-125">chat</span>
                </div>
                <div className="text-left">
                  <h2 className="text-[#00FF9D] text-xl font-bold leading-tight">Chat on WhatsApp</h2>
                  <p className="text-slate-200 text-sm font-body font-medium">Immediate response • +91 [Your Number]</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#00FF9D] group-hover:translate-x-2 transition-transform relative z-10 text-3xl">arrow_forward</span>
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
        <div className="glass-card rounded-2xl p-8 lg:p-10 border-t-2 border-t-primary/20">
          <form className="flex flex-col gap-8">
            <div className="relative group">
              <input className="peer w-full bg-transparent border-0 border-b border-slate-600 px-0 py-3 text-white font-body focus:ring-0 focus:border-primary placeholder-transparent transition-colors" id="name" placeholder="Name" required type="text" />
              <label className="absolute left-0 top-3 text-slate-400 font-body transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary cursor-text" htmlFor="name">Your Name</label>
            </div>
            <div className="relative group">
              <input className="peer w-full bg-transparent border-0 border-b border-slate-600 px-0 py-3 text-white font-body focus:ring-0 focus:border-primary placeholder-transparent transition-colors" id="email" placeholder="Email" required type="email" />
              <label className="absolute left-0 top-3 text-slate-400 font-body transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary cursor-text" htmlFor="email">Business Email</label>
            </div>
            <div className="relative group mt-2">
              <textarea className="peer w-full bg-transparent border-0 border-b border-slate-600 px-0 py-3 text-white font-body focus:ring-0 focus:border-primary placeholder-transparent transition-colors resize-none" id="project" placeholder="Tell us about your business" required rows={4}></textarea>
              <label className="absolute left-0 top-3 text-slate-400 font-body transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-3 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-primary cursor-text" htmlFor="project">How can we help you?</label>
            </div>
            <div className="space-y-4">
              <button className="w-full bg-primary text-black font-bold py-4 rounded-lg tracking-wide uppercase text-sm hover:bg-primary/90 flex items-center justify-center gap-2 transition-all group" type="button">
                <span>INITIALIZE DEMO</span>
                <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">bolt</span>
              </button>
              <p className="text-[10px] text-center text-slate-500 uppercase tracking-widest font-medium">Built for Indian businesses • Engineered for Global Scale</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
