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
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-white/5 mt-auto pt-16 pb-8 px-6 glass-nav border-b-0 border-l-0 border-r-0 rounded-none shadow-none bg-opacity-30 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent pointer-events-none"></div>

      <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10 mb-12">
        {/* Brand/About Column */}
        <div className="flex flex-col gap-4">
          <div className="font-display font-bold text-white tracking-wider flex items-center gap-2">
            <div className="size-5 text-primary">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor"></path>
              </svg>
            </div>
            <span className="text-sm">AITDL NETWORK</span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed max-w-xs font-body">
            Architecting intelligent sovereign infrastructures and secure deep learning pipelines for enterprise scalability.
          </p>
          <div className="flex items-center gap-4 mt-2 text-slate-500">
            <a aria-label="X" className="hover:text-primary transition-colors flex items-center" href="#"><span className="material-symbols-outlined text-[18px]">close</span></a>
            <a aria-label="LinkedIn" className="hover:text-primary transition-colors flex items-center" href="#"><span className="material-symbols-outlined text-[18px]">work</span></a>
            <a aria-label="GitHub" className="hover:text-primary transition-colors flex items-center" href="#"><span className="material-symbols-outlined text-[18px]">code</span></a>
          </div>
        </div>

        {/* Column 2: Core Services */}
        <div className="flex flex-col gap-4">
          <span className="text-white font-display font-semibold text-sm tracking-wide">Core Services</span>
          <ul className="flex flex-col gap-2.5 text-xs text-slate-400 font-body">
            <li><Link href="/services/edtech-ecosystems" className="hover:text-primary transition-colors">AI & ML Pipelines</Link></li>
            <li><Link href="/services/academic-automation" className="hover:text-primary transition-colors">Enterprise Systems</Link></li>
            <li><Link href="/services/pos-retail" className="hover:text-primary transition-colors">Cloud Solutions</Link></li>
            <li><Link href="/services" className="text-primary hover:underline flex items-center gap-1">View All <span className="material-symbols-outlined text-[12px]">east</span></Link></li>
          </ul>
        </div>

        {/* Column 3: Client Office */}
        <div className="flex flex-col gap-4">
          <span className="text-white font-display font-semibold text-sm tracking-wide">Client Office</span>
          <ul className="flex flex-col gap-2.5 text-xs text-slate-400 font-body">
            <li><Link href="/login" className="hover:text-primary transition-colors">Sovereign Login</Link></li>
            <li><Link href="/dashboard" className="hover:text-primary transition-colors">Analytics Workspace</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Request Support</Link></li>
          </ul>
        </div>

        {/* Column 4: Corporate */}
        <div className="flex flex-col gap-4">
          <span className="text-white font-display font-semibold text-sm tracking-wide">Corporate</span>
          <ul className="flex flex-col gap-2.5 text-xs text-slate-400 font-body">
            <li><Link href="/about" className="hover:text-primary transition-colors">Our Mission</Link></li>
            <li><Link href="/portfolio" className="hover:text-primary transition-colors">Deployments</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">Secure Contact</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="w-full max-w-[1200px] mx-auto border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-body text-slate-500">
        <div className="text-center md:text-left leading-relaxed">
          Designed & Architected by <span className="text-slate-400 font-medium">JRM</span><br />
          &copy; {currentYear} AITDL Network | Vikram Samvat 2083
        </div>
        <div className="flex items-center gap-4 text-slate-600">
          <span className="hover:text-slate-400 transition-colors cursor-pointer">Terms</span>
          <span className="hover:text-slate-400 transition-colors cursor-pointer">Privacy</span>
          <span className="size-1 rounded-full bg-slate-700"></span>
          <span>Sovereign Node v1.2</span>
        </div>
      </div>
    </footer>
  );
}
