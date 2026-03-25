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
// Designed & Architected by Jawahar R Mallah

"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n/I18nContext';

export default function Home() {
  const { t } = useI18n();

  return (
    <div className="animate-fade-in relative">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden min-h-[90vh] flex items-center bg-mesh">
        <div className="absolute inset-0 bg-hero-glow pointer-events-none"></div>
        
        <div className="w-full max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* Left Column: Content */}
          <div className="flex flex-col items-start px-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-display font-bold text-[10px] tracking-wider mb-6 animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              {t('hero_badge')}
            </div>

            <h1 className="font-display font-bold text-5xl lg:text-7xl leading-[1.1] tracking-[-0.03em] mb-8 animate-slide-up">
              <span className="text-gradient inline-block">{t('hero_title').split(' & ')[0]}</span><br />
              <span className="text-gradient-primary inline-block">& {t('hero_title').split(' & ')[1]}</span>
            </h1>

            <p className="text-lg lg:text-xl text-text-muted font-light mb-10 max-w-xl leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
              {t('hero_subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto animate-slide-up mb-12" style={{ animationDelay: '0.3s' }}>
              <Link href="/demo" className="btn-primary w-full sm:w-auto flex items-center justify-center h-14 px-10 rounded-xl bg-primary text-background-dark font-display font-bold text-sm tracking-wide">
                  {t('cta_free_demo')}
              </Link>
              <Link href="/login" className="btn-secondary w-full sm:w-auto flex items-center justify-center h-14 px-10 rounded-xl font-display font-bold text-sm tracking-wide">
                  {t('nav_client_portal')}
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-col gap-5 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex flex-wrap items-center gap-8">
                <div className="flex items-center gap-2 text-text-muted">
                  <span className="material-symbols-outlined text-primary text-lg">verified</span>
                  <span className="text-xs font-semibold tracking-wide uppercase">{t('hero_trust_backups')}</span>
                </div>
                <div className="flex items-center gap-2 text-text-muted">
                  <span className="material-symbols-outlined text-primary text-lg">bolt</span>
                  <span className="text-xs font-semibold tracking-wide uppercase">{t('hero_trust_nodes')}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-text-muted">
                <span className="material-symbols-outlined text-primary text-lg">shield</span>
                <span className="text-xs font-semibold tracking-wide uppercase">{t('hero_trust_security')}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Component - Sovereign Dashboard */}
          <div className="relative group perspective-1000 px-4">
            {/* Floating Service Nodes */}
            <div className="absolute -top-12 -left-12 size-20 glass-premium rounded-3xl flex items-center justify-center animate-float z-20 shadow-2xl" style={{ animationDelay: '1s' }}>
              <span className="material-symbols-outlined text-primary text-2xl">school</span>
            </div>
            <div className="absolute top-1/2 -right-12 size-24 glass-premium rounded-full flex items-center justify-center animate-float z-20 shadow-2xl" style={{ animationDelay: '2.5s' }}>
              <span className="material-symbols-outlined text-primary text-4xl">smart_toy</span>
            </div>
            <div className="absolute -bottom-16 left-1/4 size-16 glass-premium rounded-2xl flex items-center justify-center animate-float z-0 shadow-2xl" style={{ animationDelay: '4s' }}>
              <span className="material-symbols-outlined text-primary text-2xl">account_balance_wallet</span>
            </div>

            <div className="relative z-10 animate-float animate-pulse-glow" style={{ animationDuration: '8s' }}>
              <div className="rounded-[3rem] overflow-hidden glass-premium p-3 rotate-y-[-8deg] rotate-x-[4deg] transition-all duration-700 group-hover:rotate-0 group-hover:scale-[1.02] border border-white/10">
                <div className="relative aspect-[4/3] w-full">
                  <Image 
                    src="/images/hero_dashboard.png" 
                    alt="AITDL Sovereign Dashboard"
                    fill
                    className="object-cover rounded-[2.5rem] brightness-90 group-hover:brightness-100 transition-all duration-500"
                    priority
                  />
                  {/* Watermark */}
                  <div className="absolute bottom-6 right-8 text-white/20 font-display font-black text-[10px] tracking-[0.4em] uppercase pointer-events-none z-20 select-none">
                    AITDL NETWORK
                  </div>
                </div>
              </div>
              
              {/* Overlay Content Card */}
              <div className="absolute bottom-10 left-10 right-10 p-6 glass-premium rounded-3xl animate-slide-up border border-white/10" style={{ animationDelay: '0.8s' }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-primary font-display font-bold tracking-widest uppercase">Autonomous Core</span>
                    <span className="text-xs text-white font-medium">Nodes Synchronized</span>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="size-1.5 rounded-full bg-primary animate-pulse"></div>
                    <div className="size-1.5 rounded-full bg-primary/40"></div>
                    <div className="size-1.5 rounded-full bg-primary/40"></div>
                  </div>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary/40 to-primary w-3/4 animate-[shimmer_2s_infinite]"></div>
                </div>
              </div>
            </div>

            {/* Multi-layered Deep Glow */}
            <div className="absolute inset-0 bg-primary/20 blur-[130px] -z-10 rounded-full"></div>
            <div className="absolute inset-[-40px] bg-primary/5 blur-[80px] -z-10 rounded-full animate-pulse-slow"></div>
          </div>
        </div>
      </section>

      {/* Trusted By Banner / Stats */}
      <section className="border-y border-white/5 bg-background-dark/20 py-8 px-6 relative z-10">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex flex-col gap-1">
            <span className="text-primary font-display font-black text-2xl tracking-tight">10,000+</span>
            <span className="text-slate-500 text-[10px] font-body tracking-wider uppercase">{t('stat_students')}</span>
          </div>
          <div className="h-8 w-px bg-white/5 hidden md:block"></div>
          <div className="flex flex-col gap-1">
            <span className="text-primary font-display font-black text-2xl tracking-tight">50+</span>
            <span className="text-slate-500 text-[10px] font-body tracking-wider uppercase">{t('stat_systems')}</span>
          </div>
          <div className="h-8 w-px bg-white/5 hidden md:block"></div>
          <div className="flex flex-col gap-1">
            <span className="text-primary font-display font-black text-2xl tracking-tight">99.9%</span>
            <span className="text-slate-500 text-[10px] font-body tracking-wider uppercase">{t('stat_uptime')}</span>
          </div>
          <div className="h-8 w-px bg-white/5 hidden md:block"></div>
          <div className="flex flex-col md:flex-row items-center gap-3">
            <div className="text-slate-400 text-[10px] font-display font-semibold tracking-wider uppercase">
              {t('stat_trusted_in')}
            </div>
            <div className="flex items-center gap-1 text-slate-300 font-bold text-xs font-sans flex-wrap justify-center md:justify-start">
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">Mumbai</span>
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">Pune</span>
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">Gorakhpur</span>
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">Tier-2 Hubs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve Section */}
      <section className="relative z-10 py-24 px-6 bg-background-dark/50" id="services">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display font-bold text-3xl md:text-4xl mb-4">{t('serve_title')}</h2>
            <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { icon: 'school', title: t('serve_coaching'), desc: t('serve_coaching_desc') },
              { icon: 'account_balance', title: t('serve_schools'), desc: t('serve_schools_desc') },
              { icon: 'shopping_cart', title: t('serve_retail'), desc: t('serve_retail_desc') },
              { icon: 'fitness_center', title: t('serve_gym'), desc: t('serve_gym_desc') },
              { icon: 'terrain', title: t('serve_hiking'), desc: t('serve_hiking_desc') },
              { icon: 'real_estate_agent', title: t('serve_realestate'), desc: t('serve_realestate_desc') },
              { icon: 'diversity_3', title: t('serve_ngo'), desc: t('serve_ngo_desc') },
              { icon: 'psychology', title: t('serve_ai'), desc: t('serve_ai_desc') }
            ].map((item, index) => (
              <div key={index} className="glass-card p-8 rounded-xl flex flex-col items-start gap-4 transition-all hover:border-primary/50 hover:-translate-y-1 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.33%-16px)]">
                <div className="size-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                </div>
                <h3 className="font-display font-bold text-xl">{item.title}</h3>
                <p className="text-text-muted leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link href="/contact" className="btn-primary inline-flex items-center justify-center h-14 px-10 rounded-lg bg-primary text-background-dark font-display font-semibold text-[16px]">
              {t('cta_free_demo')}
            </Link>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp */}
      <a aria-label="Chat on WhatsApp" className="fixed bottom-6 right-6 z-[60] size-14 bg-whatsapp text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300" href="https://wa.me/919323023007">
        <svg className="size-8" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"></path>
        </svg>
      </a>
      {/* Advanced SEO Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "AITDL Network",
              "image": "https://aitdl.in/og-image.png",
              "@id": "https://aitdl.in",
              "url": "https://aitdl.in",
              "telephone": "+91-93230-23007",
              "address": [
                {
                  "@type": "PostalAddress",
                  "streetAddress": "Golghar",
                  "addressLocality": "Gorakhpur",
                  "addressRegion": "UP",
                  "postalCode": "273001",
                  "addressCountry": "IN"
                },
                {
                  "@type": "PostalAddress",
                  "streetAddress": "Andheri East",
                  "addressLocality": "Mumbai",
                  "addressRegion": "Maharashtra",
                  "postalCode": "400069",
                  "addressCountry": "IN"
                }
              ],
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 26.7606,
                "longitude": 83.3731
              },
              "areaServed": ["Gorakhpur", "Mumbai", "Pune", "India"],
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday"
                ],
                "opens": "09:00",
                "closes": "18:00"
              },
              "sameAs": [
                "https://www.linkedin.com/company/aitdlnetwork",
                "https://twitter.com/aitdlnetwork"
              ],
              "founder": {
                "@type": "Person",
                "name": "Jawahar R Mallah",
                "jobTitle": "Lead Architect & Founder"
              }
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What is AITDL Network?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "AITDL Network is an AI-powered software company based in Gorakhpur and Mumbai, providing LMS, coaching management, school ERP, and retail POS solutions."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Does AITDL offer coaching management software in Gorakhpur?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, AITDL provides student management, fee tracking, and online tests for coaching institutes in Gorakhpur with local support."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Is there a free demo available?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, we offer free demos for all our software products at aitdl.in/demo."
                  }
                }
              ]
            }
          ])
        }}
      />
    </div>
  );
}
