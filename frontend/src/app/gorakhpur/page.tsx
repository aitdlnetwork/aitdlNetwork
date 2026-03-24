/*
AITDL Network © 2026 | Vikram Samvat 2083
Designed & Architected by JRM
*/

import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Smart Software & LMS in Gorakhpur | AITDL Network',
  description: 'LMS, POS Billing, Coaching Management, and Enterprise AI solutions designed for institutions and businesses in Gorakhpur, Golghar, and UP.',
  keywords: ['LMS Gorakhpur', 'Coaching software Golghar', 'POS billing Gorakhpur', 'School management UP'],
};

export default function GorakhpurPage() {
  const localServices = [
    { icon: 'school', title: 'Coaching Management', desc: 'Secure student portal, automated fee tracking, and online tests for institutions near Golghar and Deoria Road.' },
    { icon: 'shopping_cart', title: 'Retail POS Billing', desc: 'Fast barcode billing and GST ready invoicing for retail counters in Civil Lines and local hubs.' },
    { icon: 'account_balance', title: 'School ERP & LMS', desc: 'Enterprise learning architecture and parent-teacher communication portals statically setup.' }
  ];

  return (
    <div className="flex-1 w-full max-w-[1200px] mx-auto px-6 py-12 flex flex-col justify-center z-10 relative animate-fade-in">
      {/* LocalBusiness Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "AITDL Network - Software & LMS Gorakhpur",
            "description": "Smart Software, LMS, and POS billing solutions for institutions and businesses in Gorakhpur, Uttar Pradesh.",
            "url": "https://aitdlnetwork.com/gorakhpur",
            "telephone": "+919323023007",
            "priceRange": "Price on Request",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Gorakhpur",
              "addressRegion": "Uttar Pradesh",
              "addressCountry": "IN"
            },
            "serviceArea": {
              "@type": "GeoCircle",
              "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": "26.7606",
                "longitude": "83.3731"
              },
              "radius": "50000"
            }
          })
        }}
      />

      {/* Hero */}
      <div className="text-center mb-16 flex flex-col items-center">
        <span className="px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-xs font-display font-bold tracking-wider mb-3">
          LOCAL NODE: GORAKHPUR (U.P.)
        </span>
        <h1 className="text-white font-display text-4xl md:text-5xl font-bold font-heading mb-4 leading-tight max-w-2xl text-gradient">
          Smart Software Solutions for Gorakhpur
        </h1>
        <p className="text-muted text-lg font-body max-w-xl leading-relaxed">
          Sovereign LMS, POS Billing, and coaching management setups designed targeting institutional efficiency around Golghar and Civil Lines.
        </p>
        <div className="flex items-center gap-4 mt-8 flex-wrap justify-center">
          <Link href="/contact" className="btn-primary flex items-center justify-center h-12 px-8 rounded-lg bg-primary text-background-dark font-display font-semibold text-[14px]">
            Get Local Demo
          </Link>
          <a href="tel:+919323023007" className="btn-secondary flex items-center gap-2 h-12 px-6 rounded-lg bg-white/5 font-display font-semibold text-[14px] border border-white/10 hover:border-primary/30 transition-all">
            <span className="material-symbols-outlined text-primary">call</span> +91 93230 23007
          </a>
        </div>
      </div>

      {/* Local Solutions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {localServices.map((service, idx) => (
          <div key={idx} className="glass-card p-6 rounded-2xl border border-white/5 bg-background-dark/20 flex flex-col gap-4">
            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-2xl">{service.icon}</span>
            </div>
            <h3 className="text-white font-display font-bold text-lg">{service.title}</h3>
            <p className="text-slate-400 text-sm font-body leading-relaxed">{service.desc}</p>
          </div>
        ))}
      </div>

      {/* Bottom CTA for Services redirection */}
      <div className="text-center">
        <Link href="/services" className="text-primary font-display font-bold flex items-center justify-center gap-1 hover:underline">
          View All Enterprise Services <span className="material-symbols-outlined text-[16px]">east</span>
        </Link>
      </div>
    </div>
  );
}
