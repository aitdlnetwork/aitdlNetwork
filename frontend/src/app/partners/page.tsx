"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n/I18nContext';

export default function PartnersPage() {
  const { language } = useI18n();
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const t_local = (en: string, hi: string, sa: string) => {
    if (language === 'hi') return hi;
    if (language === 'sa') return sa;
    return en;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => setFormStatus('success'), 1500);
  };

  return (
    <div className="min-h-screen bg-background-dark pt-32 pb-24 px-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(0,211,211,0.08),transparent_70%)] pointer-events-none"></div>
      <div className="absolute -top-24 -right-24 size-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-[1200px] mx-auto relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Ecosystem Alpha
          </div>
          <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-7xl mb-6 text-gradient leading-tight tracking-tight">
            {t_local('Architect the Future', 'भविष्य का निर्माण करें', 'भविष्यं रचयत')} <br/>
            {t_local('of Sovereign Tech', 'संप्रभु तकनीक का', 'संप्रभु तन्त्रस्य')}
          </h1>
          <p className="text-lg text-slate-400 font-light mb-10 max-w-2xl mx-auto leading-relaxed">
            AITDL Network is expanding. We are seeking technical nodes and commercial partners to deploy indigenous, high-performance digital infrastructure across the Indian subcontinent.
          </p>
        </div>

        {/* Value Props */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            { icon: 'hub', title: 'Sovereign Nodes', desc: 'Deploy local-first infrastructure that guarantees data privacy and high-speed local network performance.' },
            { icon: 'security', title: 'Zero-Trust Security', desc: 'Implement AES-256 encrypted gateways and localized biometric authentication protocols.' },
            { icon: 'language', title: 'Localized Reach', desc: 'Deep integration with regional languages (Hindi, Sanskrit, Marathi) for inclusive digital scaling.' }
          ].map((item, idx) => (
            <div key={idx} className="glass-card p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-3xl">{item.icon}</span>
              </div>
              <h3 className="text-xl font-display font-bold text-white mb-3 tracking-wide">{item.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed font-body">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Dynamic Content: Tiers & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Tiers */}
          <div className="flex flex-col gap-8">
            <h2 className="text-3xl font-display font-bold text-white mb-4">Partnership Tiers</h2>
            {[
              { color: 'text-primary', title: 'Technical Node Partner', desc: 'Certified implementation of LMS and CRM nodes for educational institutions.', points: ['Server Provisioning', 'Local Support', 'Custom Integrations'] },
              { color: 'text-yellow-500', title: 'Strategic Referral Node', desc: 'Earn recurring revenue by expanding the AITDL Network footprint.', points: ['Lead Generation', 'Network Advocacy', 'Commission Structure'] },
              { color: 'text-purple-500', title: 'Enterprise Solutions', desc: 'Large-scale NGO and Government digital transformation projects.', points: ['Co-branding Space', 'Dedicated SA', 'Tender Support'] }
            ].map((tier, idx) => (
              <div key={idx} className="flex gap-6 p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                <div className={`size-2 rounded-full mt-2 ring-4 ring-white/5 bg-current ${tier.color}`}></div>
                <div>
                  <h4 className="font-display font-bold text-lg text-white mb-2">{tier.title}</h4>
                  <p className="text-sm text-slate-400 mb-4">{tier.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {tier.points.map((p, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-500 font-medium">{p}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Lead Form */}
          <div className="glass-card p-8 md:p-10 rounded-3xl border border-primary/20 bg-white/[0.03] shadow-2xl relative overflow-hidden">
            {formStatus === 'success' ? (
              <div className="text-center py-12 animate-fade-in">
                <div className="size-20 rounded-full bg-primary/20 flex items-center justify-center text-primary mx-auto mb-6">
                  <span className="material-symbols-outlined text-4xl">check_circle</span>
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-4">Application Received</h3>
                <p className="text-slate-400 mb-8">An ecosystem representative will reach out to you within 24 standard terminal hours.</p>
                <button onClick={() => setFormStatus('idle')} className="text-primary font-bold hover:underline">Apply for another tier</button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-display font-bold text-white mb-2">Connect with the Network</h3>
                <p className="text-sm text-slate-400 mb-8">Finalize your node status by submitting this brief application.</p>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                      <input required className="bg-white/5 border border-white/10 rounded-xl h-12 px-4 text-sm focus:border-primary/50 text-white outline-none transition-all" placeholder="J. Mallah" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Email Node</label>
                      <input required type="email" className="bg-white/5 border border-white/10 rounded-xl h-12 px-4 text-sm focus:border-primary/50 text-white outline-none transition-all" placeholder="jrm@aitdl.com" />
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Organization / Title</label>
                    <input className="bg-white/5 border border-white/10 rounded-xl h-12 px-4 text-sm focus:border-primary/50 text-white outline-none transition-all" placeholder="Tech Innovations Ltd." />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Collaboration Type</label>
                    <select className="bg-white/5 border border-white/10 rounded-xl h-12 px-4 text-sm focus:border-primary/50 text-white outline-none transition-all appearance-none cursor-pointer">
                      <option className="bg-[#0a0a0a]">Technical Implementation</option>
                      <option className="bg-[#0a0a0a]">Referral Partnership</option>
                      <option className="bg-[#0a0a0a]">Enterprise Collaboration</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Initial Intel / Comments</label>
                    <textarea className="bg-white/5 border border-white/10 rounded-xl h-32 p-4 text-sm focus:border-primary/50 text-white outline-none transition-all resize-none" placeholder="How do you plan to scale with AITDL?" />
                  </div>

                  <button 
                    disabled={formStatus === 'submitting'}
                    className="mt-4 h-14 rounded-xl bg-primary text-background-dark font-display font-bold uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(0,211,211,0.2)]"
                  >
                    {formStatus === 'submitting' ? (
                      <span className="animate-spin border-2 border-background-dark border-t-transparent rounded-full size-5"></span>
                    ) : (
                      <>
                        <span className="material-symbols-outlined">send_and_archive</span>
                        Submit to Core
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
