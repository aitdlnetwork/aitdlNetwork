/*
Ganitsutram | AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com |  https://www.aitdl.in
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

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

import React from 'react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n/I18nContext';

export default function Footer() {
  const { t, language } = useI18n();
  const currentYear = new Date().getFullYear();

  const t_local = (en: string, hi: string, sa: string) => {
    if (language === 'hi') return hi;
    if (language === 'sa') return sa;
    return en;
  };

  return (

    <footer className="w-full border-t border-white/5 mt-auto pt-24 pb-12 px-6 bg-mesh relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-dark/50 to-background-dark pointer-events-none"></div>      <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 relative z-10 mb-12">
        {/* Column 1: Company */}
        <div className="flex flex-col gap-4">
          <span className="text-white font-display font-semibold text-sm tracking-wide">Company</span>
          <ul className="flex flex-col gap-2.5 text-xs text-slate-400 font-body">
            <li><Link href="/about" className="hover:text-primary transition-colors">{t('nav_about')}</Link></li>
            <li><Link href="/founders" className="hover:text-primary transition-colors">{t('footer_link_founders')}</Link></li>
            <li><Link href="/blog" className="hover:text-primary transition-colors">{t('footer_link_knowledge')}</Link></li>
            <li><Link href="/gorakhpur" className="hover:text-primary transition-colors">{t('footer_link_gorakhpur')}</Link></li>
          </ul>
        </div>

        {/* Column 2: Services */}
        <div className="flex flex-col gap-4">
          <span className="text-white font-display font-semibold text-sm tracking-wide">Services</span>
          <ul className="flex flex-col gap-2.5 text-xs text-slate-400 font-body">
            <li><Link href="/services/edtech-ecosystems" className="hover:text-primary transition-colors">{t('footer_link_aiml')}</Link></li>
            <li><Link href="/services/academic-automation" className="hover:text-primary transition-colors">{t('footer_link_enterprise')}</Link></li>
            <li><Link href="/services/pos-retail" className="hover:text-primary transition-colors">{t('footer_link_cloud')}</Link></li>
            <li><Link href="/services" className="text-primary hover:underline flex items-center gap-1">{t('footer_link_viewall')} <span className="material-symbols-outlined text-[12px]">east</span></Link></li>
          </ul>
        </div>

        {/* Column 3: Portal */}
        <div className="flex flex-col gap-4">
          <span className="text-white font-display font-semibold text-sm tracking-wide">Portal</span>
          <ul className="flex flex-col gap-2.5 text-xs text-slate-400 font-body">
            <li><Link href="/login" className="hover:text-primary transition-colors">{t('footer_link_login')}</Link></li>
            <li><Link href="/dashboard" className="hover:text-primary transition-colors">{t('footer_link_analytics')}</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">{t('footer_link_support')}</Link></li>
            <li><Link href="/partners" className="hover:text-primary transition-colors">{t('footer_link_partners')}</Link></li>
          </ul>
        </div>

        {/* Column 4: Legal */}
        <div className="flex flex-col gap-4">
          <span className="text-white font-display font-semibold text-sm tracking-wide">Legal</span>
          <ul className="flex flex-col gap-2.5 text-xs text-slate-400 font-body">
            <li><Link href="/terms" className="hover:text-primary transition-colors">{t('footer_terms')}</Link></li>
            <li><Link href="/privacy" className="hover:text-primary transition-colors">{t('footer_privacy')}</Link></li>
            <li className="mt-4">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-2 text-primary hover:text-white transition-colors group"
              >
                <span className="text-[10px] font-display font-bold uppercase tracking-widest text-primary group-hover:text-white transition-colors">Back to top</span>
                <span className="material-symbols-outlined text-sm">north</span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Enterprise Security & Trust Section */}
      <div className="w-full max-w-[1200px] mx-auto mb-6 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-white/5 pt-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 text-slate-500 font-display text-[9px] tracking-[0.2em] uppercase">
            <span className="opacity-60">{t('footer_secure_transactions')}</span>
            <div className="flex items-center gap-2 ml-2">
              <span className="px-2.5 py-1 rounded bg-primary/10 border border-primary/30 text-primary font-black text-[9px] shadow-[0_0_15px_rgba(var(--primary-rgb),0.1)]">UPI</span>
              <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-slate-300 font-bold text-[9px]">PCI-DSS</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] text-slate-400 font-display">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
            <span className="material-symbols-outlined text-sm text-primary">verified_user</span>
            <span className="tracking-tight">{t('footer_encrypted_server')}</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
            <span className="material-symbols-outlined text-sm text-primary">security</span>
            <span className="tracking-tight uppercase">AES-256 Bit Security</span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1200px] mx-auto border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-body text-slate-500">
        <div className="text-center md:text-left leading-relaxed">
          Artificial Intelligence Technology & Deep Learning<br />
          &copy; {currentYear} AITDL Network
        </div>

        {/* Center: Brand Identity */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-full bg-primary/5 border border-primary/20 text-primary/80 font-display font-semibold tracking-wide text-[9px] shadow-sm backdrop-blur-sm">
              Vikram Samvat 2083
            </span>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:border-primary/30 transition-all cursor-default group">
              <span className="size-1.5 rounded-full bg-primary animate-pulse-subtle shadow-[0_0_8px_rgba(13,227,242,0.6)]"></span>
              <span className="text-[9px] font-display font-black tracking-[0.2em] text-slate-500 uppercase">
                gorakhpur-sys-01: <span className="text-primary opacity-80 group-hover:opacity-100 transition-opacity">active</span>
              </span>
            </div>
          </div>
          <p className="text-[9px] text-slate-600 uppercase tracking-[0.3em] font-display">Sovereign Node Status</p>
        </div>

        <div className="flex items-center gap-6">
          <Link 
            href="https://x.com/aitdlnetwork" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 group transition-all"
          >
            <div className="size-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-all">
              <svg className="size-4 text-slate-400 group-hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>
            <span className="text-[10px] font-display font-black tracking-widest text-slate-500 group-hover:text-primary transition-colors uppercase">@aitdlnetwork</span>
          </Link>
          <Link 
            href="https://www.youtube.com/@aitdlnetwork" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 group transition-all"
          >
            <div className="size-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#FF0000]/50 group-hover:bg-[#FF0000]/10 transition-all">
              <svg className="size-4 text-slate-400 group-hover:text-[#FF0000] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </div>
            <span className="text-[10px] font-display font-black tracking-widest text-slate-500 group-hover:text-[#FF0000] transition-colors uppercase">YouTube</span>
          </Link>
          <Link 
            href="https://www.linkedin.com/in/aitdlnetwork/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 group transition-all"
          >
            <div className="size-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#0077B5]/50 group-hover:bg-[#0077B5]/10 transition-all">
              <svg className="size-4 text-slate-400 group-hover:text-[#0077B5] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </div>
            <span className="text-[10px] font-display font-black tracking-widest text-slate-500 group-hover:text-[#0077B5] transition-colors uppercase">LinkedIn</span>
          </Link>
          <div className="flex items-center gap-4 text-slate-600">
            <span className="size-1 rounded-full bg-slate-700"></span>
            <span>v1.6.0 Stable</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
