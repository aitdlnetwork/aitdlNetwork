/*
Ganitsutram | AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com |  https://www.aitdl.in
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useI18n, Language } from '@/lib/i18n/I18nContext';
import { useAccessibility } from '@/lib/accessibility/AccessibilityContext';
import { createClient } from '@/utils/supabase/client';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrolledMore, setIsScrolledMore] = useState(false);
  const { language, setLanguage, t } = useI18n();
  const { fontSize, setFontSize } = useAccessibility();
  const [session, setSession] = useState<any>(null);
  const pathname = usePathname();

  const langLabels: Record<Language, { label: string; flag: string }> = {
    en: { label: "EN", flag: "🇬🇧" },
    hi: { label: "हिन्दी", flag: "🇮🇳" },
    sa: { label: "संस्कृतम्", flag: "🔱" }
  };

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      setIsScrolledMore(window.scrollY > 120);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  React.useEffect(() => {
    const supabase = createClient();
    if (!supabase) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const navLinkClass = "text-[11px] font-bold tracking-widest uppercase text-text-muted hover:text-primary transition-all relative group py-2";
  const navLinkUnderline = "absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full";

  return (
    <nav 
      aria-label="Main navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? `h-[64px] border-b border-white/10 shadow-2xl ${isScrolledMore ? 'bg-background-dark/80 backdrop-blur-[32px]' : 'bg-background-dark/40 backdrop-blur-[20px]'}` 
        : 'h-[80px] bg-transparent'
    }`}>
      <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo & Node Status */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="size-8 text-primary transition-all duration-500 group-hover:scale-110 group-hover:rotate-[10deg] drop-shadow-[0_0_8px_rgba(13,227,242,0.4)]">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z" fill="currentColor"></path>
              </svg>
            </div>
            <span className="font-display font-black text-xl tracking-tight text-white uppercase group-hover:text-primary transition-colors duration-300">AITDL</span>
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/services" className={`${navLinkClass} ${pathname === '/services' ? 'text-primary' : ''}`}>
            {t('nav_services')}
            <span className={`${navLinkUnderline} ${pathname === '/services' ? 'w-full' : ''}`}></span>
          </Link>
          <Link href="/portfolio" className={`${navLinkClass} ${pathname === '/portfolio' ? 'text-primary' : ''}`}>
            {t('nav_portfolio')}
            <span className={`${navLinkUnderline} ${pathname === '/portfolio' ? 'w-full' : ''}`}></span>
          </Link>
          <Link href="/micro-erp" className={`${navLinkClass} ${pathname.startsWith('/micro-erp') ? 'text-primary' : ''}`}>
            Micro-ERP & Tools
            <span className={`${navLinkUnderline} ${pathname.startsWith('/micro-erp') ? 'w-full' : ''}`}></span>
          </Link>
          <Link href="/about" className={`${navLinkClass} ${pathname === '/about' ? 'text-primary' : ''}`}>
            {t('nav_about')}
            <span className={`${navLinkUnderline} ${pathname === '/about' ? 'w-full' : ''}`}></span>
          </Link>
          <Link href="/contact" className={`${navLinkClass} ${pathname === '/contact' ? 'text-primary' : ''}`}>
            {t('nav_contact')}
            <span className={`${navLinkUnderline} ${pathname === '/contact' ? 'w-full' : ''}`}></span>
          </Link>
          
          <Link href="/search" aria-label="Search" className="text-text-muted hover:text-primary transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </Link>

          <div className="h-4 w-px bg-white/10 mx-2"></div>

          {/* Accessibility & Lang */}
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-white/5 border border-white/10 rounded-lg overflow-hidden font-display text-[9px] font-black tracking-widest uppercase">
              <button 
                onClick={() => setFontSize('sm')}
                className={`px-2 py-1.5 transition-colors border-r border-white/10 ${fontSize === 'sm' ? 'bg-primary text-background-dark' : 'text-slate-400 hover:text-primary'}`}
                aria-label="Small font"
              >
                A-
              </button>
              <button 
                onClick={() => setFontSize('md')}
                className={`px-2 py-1.5 transition-colors border-r border-white/10 ${fontSize === 'md' ? 'bg-primary text-background-dark' : 'text-slate-400 hover:text-primary'}`}
                aria-label="Medium font"
              >
                A
              </button>
              <button 
                onClick={() => setFontSize('lg')}
                className={`px-2 py-1.5 transition-colors ${fontSize === 'lg' ? 'bg-primary text-background-dark' : 'text-slate-400 hover:text-primary'}`}
                aria-label="Large font"
              >
                A+
              </button>
            </div>

            <div className="flex items-center bg-white/5 border border-white/10 rounded-lg overflow-hidden font-display text-[9px] font-black tracking-widest uppercase">
              {(Object.keys(langLabels) as Language[]).map((lang, idx) => (
                <button 
                  key={lang} 
                  onClick={() => setLanguage(lang)} 
                  className={`px-3 py-1.5 transition-colors ${idx < Object.keys(langLabels).length - 1 ? 'border-r border-white/10' : ''} ${language === lang ? 'bg-primary text-background-dark' : 'text-slate-400 hover:text-primary'}`}
                  aria-label={`Switch to ${langLabels[lang].label}`}
                >
                  {langLabels[lang].label === 'संस्कृतम्' ? 'SA' : lang.toUpperCase()}
                </button>
              ))}
            </div>

            <Link href="/login" className="px-5 py-2 rounded-lg bg-primary/10 border border-primary/20 text-primary font-display font-black text-[10px] hover:bg-primary hover:text-background-dark transition-all uppercase tracking-widest flex items-center gap-2 shadow-[0_0_15px_rgba(13,227,242,0.1)] animate-portal-glow">
              <span className="material-symbols-outlined text-[14px]">
                {session ? 'dashboard' : 'login'}
              </span>
              {session ? t('nav_dashboard') : 'Portal'}
            </Link>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          aria-label="Toggle mobile menu"
          className="md:hidden text-text-muted hover:text-primary transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className="material-symbols-outlined text-3xl">
            {isMobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>
      
      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-nav border-t border-white/5 py-8 px-6 flex flex-col gap-6 shadow-2xl animate-slide-up">
          <div className="flex flex-col gap-4">
            <Link href="/services" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-display font-bold text-white">{t('nav_services')}</Link>
            <Link href="/portfolio" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-display font-bold text-white">{t('nav_portfolio')}</Link>
            <Link href="/micro-erp" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-display font-bold text-primary">Micro-ERP & Tools</Link>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-display font-bold text-white">{t('nav_about')}</Link>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-display font-bold text-white">{t('nav_contact')}</Link>
          </div>

          <div className="h-px w-full bg-white/5"></div>

          <div className="h-px w-full bg-white/5"></div>

          {/* Mobile Accessibility Selection */}
          <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] font-display font-black tracking-widest text-slate-500 uppercase">Text Scale</span>
            <div className="flex items-center bg-background-dark/50 rounded-lg overflow-hidden border border-white/10 font-display text-[10px] font-black tracking-widest uppercase">
              <button 
                onClick={() => setFontSize('sm')}
                className={`px-4 py-2 transition-colors border-r border-white/10 ${fontSize === 'sm' ? 'bg-primary text-background-dark' : 'text-slate-400'}`}
                aria-label="Small font"
              >
                A-
              </button>
              <button 
                onClick={() => setFontSize('md')}
                className={`px-4 py-2 transition-colors border-r border-white/10 ${fontSize === 'md' ? 'bg-primary text-background-dark' : 'text-slate-400'}`}
                aria-label="Medium font"
              >
                A
              </button>
              <button 
                onClick={() => setFontSize('lg')}
                className={`px-4 py-2 transition-colors ${fontSize === 'lg' ? 'bg-primary text-background-dark' : 'text-slate-400'}`}
                aria-label="Large font"
              >
                A+
              </button>
            </div>
          </div>

          {/* Mobile Lang Selection */}
          <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] font-display font-black tracking-widest text-slate-500 uppercase">System Language</span>
            <div className="flex items-center bg-background-dark/50 rounded-lg overflow-hidden border border-white/10 font-display text-[10px] font-black tracking-widest uppercase">
              {(Object.keys(langLabels) as Language[]).map((lang, idx) => (
                <button 
                  key={lang} 
                  onClick={() => { setLanguage(lang); setIsMobileMenuOpen(false); }} 
                  className={`px-4 py-2 transition-colors ${idx < Object.keys(langLabels).length - 1 ? 'border-r border-white/10' : ''} ${language === lang ? 'bg-primary text-background-dark' : 'text-slate-400'}`}
                >
                  {langLabels[lang].label === 'संस्कृतम्' ? 'SA' : lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="btn-primary flex items-center justify-center h-14 w-full rounded-xl bg-primary text-background-dark font-display font-bold text-sm tracking-widest uppercase">
            <span className="material-symbols-outlined mr-2">{session ? 'dashboard' : 'login'}</span>
            {session ? t('nav_dashboard') : 'Client Portal'}
          </Link>
        </div>
      )}
    </nav>
  );
}
