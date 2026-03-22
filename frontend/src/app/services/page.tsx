/*
  AITDL Network © 2026 | Vikram Samvat 2083
  Designed & Architected by JRM
*/

'use client';

import React, { useState } from 'react';
import Link from 'next/link';

/* ── Data ── */
const categories = [
  {
    label: "Education",
    icon: "school",
    services: [
      { title: "EdTech Ecosystems", desc: "LMS, virtual classrooms, fee automation, and student management for schools & coaching centres.", icon: "school", link: "/services/edtech-ecosystems", badge: "Most Popular" },
      { title: "Academic Automation", desc: "Paperless admissions, digital mark-sheets, library & certificate management.", icon: "settings_suggest", link: "/services/academic-automation", badge: "" },
      { title: "Adaptive AI Learning", desc: "Personalised AI study plans, adaptive quizzes, and weakness detection for students.", icon: "psychology", link: "/services/adaptive-ai", badge: "AI Powered" }
    ]
  },
  {
    label: "Commerce",
    icon: "payments",
    services: [
      { title: "Next-Gen POS & Retail", desc: "Barcode billing, live inventory, GST invoicing, and customer loyalty for retail & restaurants.", icon: "payments", link: "/services/pos-retail", badge: "Most Popular" },
      { title: "Real Estate ERP", desc: "Tenant portals, automated rent collection, maintenance ticketing, and property analytics.", icon: "real_estate_agent", link: "/services/real-estate-erp", badge: "" }
    ]
  },
  {
    label: "Healthcare",
    icon: "local_hospital",
    services: [
      { title: "Healthcare & Clinic Management", desc: "Digital OPD, pharmacy billing, WhatsApp lab reports, and ABHA integration for clinics & hospitals.", icon: "local_hospital", link: "/services/healthcare-clinic", badge: "New" }
    ]
  },
  {
    label: "NGO & Society",
    icon: "diversity_3",
    services: [
      { title: "NGO & Society Management", desc: "Online maintenance billing, donor tracking, digital voting, and member portals for RWAs & NGOs.", icon: "diversity_3", link: "/services/ngo-society", badge: "" }
    ]
  },
  {
    label: "Infrastructure",
    icon: "cloud",
    services: [
      { title: "Enterprise Cloud Infra", desc: "99.99% uptime hosting, WAF firewall, auto-scaling, and encrypted backups for any web portal.", icon: "cloud", link: "/services/enterprise-cloud", badge: "" }
    ]
  }
];

/* ── Coming Soon entries (no dedicated page yet) ── */
const comingSoon = [
  { title: "Transport & Fleet Management", icon: "local_shipping", eta: "Q3 2026" },
  { title: "Hotel & Guest House ERP", icon: "hotel", eta: "Q3 2026" },
  { title: "Construction Project Tracking", icon: "engineering", eta: "Q4 2026" },
  { title: "Agriculture & Kisan Management", icon: "agri", eta: "Q4 2026" },
  { title: "CA / Tax Practice Software", icon: "calculate", eta: "Q1 2027" },
  { title: "Event & Catering Management", icon: "celebration", eta: "Q1 2027" },
  { title: "Salon & Wellness ERP", icon: "content_cut", eta: "Q2 2027" },
  { title: "Religious Trust Portal", icon: "temple_hindu", eta: "Q2 2027" }
];

export default function Services() {
  const [activeTab, setActiveTab] = useState(0);

  const current = categories[activeTab];

  return (
    <div className="flex-1 w-full max-w-[1200px] mx-auto px-6 py-16 md:py-24 z-10 relative animate-fade-in">

      {/* Ambient glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 hidden md:block">
        <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] mix-blend-screen opacity-60" />
        <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] bg-[#00FF9D]/5 rounded-full blur-[100px] mix-blend-screen opacity-50" />
      </div>

      {/* ── Header ── */}
      <div className="mb-12 text-center md:text-left">
        <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-white mb-4 tracking-tight">
          Specialized Solutions
        </h1>
        <p className="text-muted text-lg md:text-xl max-w-2xl font-body leading-relaxed">
          Industry-specific software built for Indian businesses — education, healthcare, retail, and beyond.
        </p>
      </div>

      {/* ── Category Tabs ── */}
      <div className="flex flex-wrap gap-2 mb-10">
        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => setActiveTab(i)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-display font-bold transition-all duration-200 ${
              activeTab === i
                ? 'bg-primary text-background-dark shadow-glow'
                : 'bg-white/5 text-muted hover:bg-white/10 border border-white/10'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>

      {/* ── Active Category Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20 min-h-[260px]">
        {current.services.map((svc, i) => (
          <div
            key={i}
            className="glass-card rounded-xl p-8 flex flex-col relative overflow-hidden group transition-all duration-300 hover:border-primary/50 hover:-translate-y-1"
          >
            {svc.badge && (
              <span className={`absolute top-4 right-4 text-[10px] font-display font-bold px-2 py-0.5 rounded-full border ${
                svc.badge === 'New' ? 'border-green-500/40 text-green-400 bg-green-500/10' :
                svc.badge === 'AI Powered' ? 'border-purple-400/40 text-purple-300 bg-purple-500/10' :
                'border-primary/40 text-primary bg-primary/10'
              }`}>{svc.badge}</span>
            )}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
              <span className="material-symbols-outlined text-[28px]">{svc.icon}</span>
            </div>
            <h3 className="font-display font-bold text-xl md:text-2xl text-white mb-3 tracking-tight">{svc.title}</h3>
            <p className="text-muted text-sm md:text-base leading-relaxed mb-6 font-body flex-grow">{svc.desc}</p>
            <Link
              href={svc.link}
              className="inline-flex items-center font-display font-bold text-sm text-primary hover:text-primary/80 transition-all duration-300 group-hover:translate-x-1 mt-auto"
            >
              Explore Product
              <span className="material-symbols-outlined ml-2 text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
        ))}
      </div>

      {/* ── Coming Soon Roadmap ── */}
      <div className="border-t border-white/10 pt-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-white font-display font-bold text-2xl md:text-3xl">Coming Soon</h2>
            <p className="text-muted text-sm mt-1 font-body">Our product roadmap — built for India's next growth verticals.</p>
          </div>
          <Link href="/contact" className="text-primary text-sm font-display font-bold hover:underline flex items-center gap-1">
            Request early access <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {comingSoon.map((item, i) => (
            <div key={i} className="glass-card rounded-xl p-5 flex flex-col gap-3 opacity-70 hover:opacity-100 transition-opacity border border-dashed border-white/10 hover:border-primary/30">
              <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-muted">
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              </div>
              <p className="text-white text-sm font-display font-semibold leading-snug">{item.title}</p>
              <span className="text-xs text-muted font-mono">{item.eta}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
