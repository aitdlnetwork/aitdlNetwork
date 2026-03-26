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
           <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-primary/5 border border-primary/20 text-primary/80 font-display font-semibold tracking-wide text-[9px] shadow-sm backdrop-blur-sm">
              Vikram Samvat 2083
            </span>
          </div>
          <p className="text-[9px] text-slate-600 uppercase tracking-[0.3em] font-display">System Status: Active</p>
        </div>

        <div className="flex items-center gap-4 text-slate-600">
          <span className="size-1 rounded-full bg-slate-700"></span>
          <span>v1.6.0 Stable</span>
        </div>
      </div>
    </footer>
  );
}
