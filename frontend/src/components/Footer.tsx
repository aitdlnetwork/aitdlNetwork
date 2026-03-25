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
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background-dark/50 to-background-dark pointer-events-none"></div>

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
            {t('footer_tagline')}
          </p>
        </div>

        {/* Column 2: Core Services */}
        <div className="flex flex-col gap-4">
          <span className="text-white font-display font-semibold text-sm tracking-wide">{t('footer_col_services')}</span>
          <ul className="flex flex-col gap-2.5 text-xs text-slate-400 font-body">
            <li><Link href="/services/edtech-ecosystems" className="hover:text-primary transition-colors">{t('footer_link_aiml')}</Link></li>
            <li><Link href="/services/academic-automation" className="hover:text-primary transition-colors">{t('footer_link_enterprise')}</Link></li>
            <li><Link href="/services/pos-retail" className="hover:text-primary transition-colors">{t('footer_link_cloud')}</Link></li>
            <li><Link href="/services" className="text-primary hover:underline flex items-center gap-1">{t('footer_link_viewall')} <span className="material-symbols-outlined text-[12px]">east</span></Link></li>
          </ul>
        </div>

        {/* Column 3: Client Office */}
        <div className="flex flex-col gap-4">
          <span className="text-white font-display font-semibold text-sm tracking-wide">{t('footer_col_office')}</span>
          <ul className="flex flex-col gap-2.5 text-xs text-slate-400 font-body">
            <li><Link href="/login" className="hover:text-primary transition-colors">{t('footer_link_login')}</Link></li>
            <li><Link href="/dashboard" className="hover:text-primary transition-colors">{t('footer_link_analytics')}</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors">{t('footer_link_support')}</Link></li>
            <li>
              <Link href="/partners" className="group flex items-center gap-2 hover:text-primary transition-colors">
                {t('footer_link_partners')}
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold uppercase tracking-tighter">
                  {t('footer_connect_btn')}
                </span>
              </Link>
            </li>
          </ul>
        </div>        {/* Column 4: Corporate */}
        <div className="flex flex-col gap-4">
          <span className="text-white font-display font-semibold text-sm tracking-wide">{t('footer_col_corporate')}</span>
          <ul className="flex flex-col gap-2.5 text-xs text-slate-400 font-body">
            <li><Link href="/about" className="hover:text-primary transition-colors">{t('footer_link_mission')}</Link></li>
            <li><Link href="/founders" className="hover:text-primary transition-colors">{t('footer_link_founders')}</Link></li>
            <li><Link href="/blog" className="hover:text-primary transition-colors">{t('footer_link_knowledge')}</Link></li>
            <li><Link href="/gorakhpur" className="hover:text-primary transition-colors">{t('footer_link_gorakhpur')}</Link></li>
          </ul>
        </div>

        {/* Column 5: Regional Nodes (Physical Addresses for GBP) */}
        <div className="flex flex-col gap-4">
          <span className="text-white font-display font-semibold text-sm tracking-wide">{t('footer_col_nodes')}</span>
          <div className="flex flex-col gap-4 text-[10px] text-slate-400 font-body">
            <div className="flex gap-2">
              <span className="material-symbols-outlined text-sm text-primary">location_on</span>
              <div>
                <span className="text-white font-semibold">Gorakhpur</span><br />
                {t('footer_addr_gorakhpur')}
              </div>
            </div>
            <div className="flex gap-2">
              <span className="material-symbols-outlined text-sm text-primary">location_on</span>
              <div>
                <span className="text-white font-semibold">Mumbai</span><br />
                {t('footer_addr_mumbai')}
              </div>
            </div>
          </div>
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

      {/* Bottom Copyright Bar */}
      <div className="w-full max-w-[1200px] mx-auto border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] font-body text-slate-500">
        <div className="text-center md:text-left leading-relaxed">
          {t('footer_designed_by')}<br />
          &copy; {currentYear} AITDL Network
        </div>

        {/* Center: Vikram Samvat Badge */}
        <div className="flex items-center justify-center">
          <span className="px-2.5 py-1 rounded-full bg-primary/5 border border-primary/20 text-primary/80 font-display font-semibold tracking-wide text-[9px] shadow-sm backdrop-blur-sm">
            Vikram Samvat 2083
          </span>
        </div>

        <div className="flex items-center gap-4 text-slate-600">
          <Link href="/terms" className="hover:text-slate-400 transition-colors">{t('footer_terms')}</Link>
          <Link href="/privacy" className="hover:text-slate-400 transition-colors">{t('footer_privacy')}</Link>
          <span className="size-1 rounded-full bg-slate-700"></span>
          <span>{t('footer_sovereign_version')}</span>
        </div>
      </div>
    </footer>
  );
}
