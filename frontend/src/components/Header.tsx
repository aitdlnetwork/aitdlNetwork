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
import React, { useState } from 'react';
import Link from 'next/link';
import { useI18n, Language } from '@/lib/i18n/I18nContext';
import { useAccessibility } from '@/lib/accessibility/AccessibilityContext';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { language, setLanguage } = useI18n();
  const { fontSize, setFontSize } = useAccessibility();

  const langLabels: Record<Language, { label: string; flag: string }> = {
    en: { label: "EN", flag: "🇬🇧" },
    hi: { label: "हिन्दी", flag: "🇮🇳" },
    sa: { label: "संस्कृतम्", flag: "🔱" }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav h-[72px] transition-all duration-300">
      <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="size-8 text-primary transition-transform group-hover:scale-105">
            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor"></path>
            </svg>
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-text-primary">AITDL Network</span>
        </Link>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/services" className="text-xs font-medium text-text-muted hover:text-primary transition-colors">Services</Link>
          <Link href="/portfolio" className="text-xs font-medium text-text-muted hover:text-primary transition-colors">Portfolio</Link>
          <Link href="/about" className="text-xs font-medium text-text-muted hover:text-primary transition-colors">About</Link>
          <Link href="/login" className="text-xs font-medium text-text-muted hover:text-primary transition-colors">Portal</Link>
          <Link href="/contact" className="text-xs font-medium text-text-muted hover:text-primary transition-colors">Contact</Link>

          {/* Font Sizer */}
          <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg p-0.5">
            <button onClick={() => setFontSize('sm')} className={`px-2 py-1 rounded-md text-[10px] font-bold transition-all ${fontSize === 'sm' ? 'bg-primary text-background-dark' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>A-</button>
            <button onClick={() => setFontSize('md')} className={`px-2 py-1 rounded-md text-[11px] font-bold transition-all ${fontSize === 'md' ? 'bg-primary text-background-dark' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>A</button>
            <button onClick={() => setFontSize('lg')} className={`px-2 py-1 rounded-md text-[12px] font-bold transition-all ${fontSize === 'lg' ? 'bg-primary text-background-dark' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>A+</button>
          </div>

          {/* Lang Switcher */}
          <div className="relative">
            <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-display font-bold hover:bg-white/10 transition-all">
              <span>{langLabels[language].flag}</span>
              <span>{langLabels[language].label}</span>
              <span className="material-symbols-outlined text-[14px]">arrow_drop_down</span>
            </button>
            {isLangOpen && (
              <div className="absolute top-10 right-0 glass-nav border border-white/10 shadow-xl rounded-xl py-2 w-32 flex flex-col z-50 animate-fade-in">
                {(Object.keys(langLabels) as Language[]).map((lang) => (
                  <button key={lang} onClick={() => { setLanguage(lang); setIsLangOpen(false); }} className={`flex items-center gap-2 px-4 py-2 text-xs font-display text-left hover:bg-primary/10 transition-colors ${language === lang ? 'text-primary font-bold' : 'text-slate-300'}`}>
                    <span>{langLabels[lang].flag}</span>
                    <span>{langLabels[lang].label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <Link href="/demo" className="btn-primary flex items-center justify-center h-9 px-4 rounded-lg bg-primary text-background-dark font-display font-semibold text-[13px]">Demo</Link>
        </div>
        
        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-text-muted hover:text-primary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="material-symbols-outlined">
            {isMobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>
      
      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-[72px] left-0 right-0 glass-nav border-t border-white/5 py-4 px-6 flex flex-col gap-4 shadow-xl">
          {/* Mobile Accessibility Switcher */}
          <div className="flex items-center justify-between gap-4 border-t border-white/5 pt-4 mt-1">
            <span className="text-xs text-slate-400 font-medium">Text Size</span>
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg p-0.5">
              <button onClick={() => { setFontSize('sm'); setIsMobileMenuOpen(false); }} className={`px-3 py-1 rounded-md text-[11px] font-bold transition-all ${fontSize === 'sm' ? 'bg-primary text-background-dark' : 'text-slate-400'}`}>A-</button>
              <button onClick={() => { setFontSize('md'); setIsMobileMenuOpen(false); }} className={`px-3 py-1 rounded-md text-[12px] font-bold transition-all ${fontSize === 'md' ? 'bg-primary text-background-dark' : 'text-slate-400'}`}>A</button>
              <button onClick={() => { setFontSize('lg'); setIsMobileMenuOpen(false); }} className={`px-3 py-1 rounded-md text-[14px] font-bold transition-all ${fontSize === 'lg' ? 'bg-primary text-background-dark' : 'text-slate-400'}`}>A+</button>
            </div>
          </div>

          {/* Mobile Lang Switcher */}
          <div className="flex items-center gap-2 border-t border-white/5 pt-4 mt-2">
            {(Object.keys(langLabels) as Language[]).map((lang) => (
              <button key={lang} onClick={() => { setLanguage(lang); setIsMobileMenuOpen(false); }} className={`flex-1 flex items-center justify-center gap-1.5 p-2 rounded-lg border ${language === lang ? 'border-primary/40 bg-primary/10 text-primary' : 'border-white/5 bg-white/5 text-slate-300'} text-xs font-display font-medium transition-all`}>
                <span>{langLabels[lang].flag}</span>
                <span>{langLabels[lang].label}</span>
              </button>
            ))}
          </div>

          <Link href="/demo" onClick={() => setIsMobileMenuOpen(false)} className="btn-primary flex items-center justify-center h-12 w-full rounded-lg bg-primary text-background-dark font-display font-semibold text-[15px]">Get Free Demo</Link>
        </div>
      )}
    </nav>
  );
}
