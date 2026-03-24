// AITDL Network © 2026 | Vikram Samvat 2083
// Designed & Architected by JRM

import React from 'react';

export default function PrivacyPolicy() {
  const sections = [
    {
      title: "1. Data Collection Node",
      content: "We collect metadata and diagnostic node streams purely for edge latency optimizations and transparent continuous delivery synchronization setups."
    },
    {
      title: "2. Encryption Standards",
      content: "All client buffers and network packets are encrypted utilizing absolute AES-256 standard vaults locally complied with sovereign standards setup guidelines."
    },
    {
      title: "3. Retainment Policy",
      content: "Metadata log frames are recycled every 24 hours unless configured explicitly for long-term analytics dashboards node allocations setup."
    }
  ];

  return (
    <div className="flex-1 w-full max-w-[800px] mx-auto px-6 py-12 flex flex-col justify-center z-10 relative animate-fade-in mb-12">
      <div className="flex flex-col gap-4 mb-10">
        <h1 className="text-white font-display text-3xl md:text-4xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="text-slate-400 text-sm font-body">Last updated: March 2026 | Vikram Samvat 2083</p>
      </div>

      <div className="flex flex-col gap-8">
        {sections.map((sec, idx) => (
          <div key={idx} className="glass-card p-6 md:p-8 rounded-xl border border-white/5 bg-background-dark/30 flex flex-col gap-3">
            <h2 className="text-white font-display font-semibold text-lg md:text-xl">{sec.title}</h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed font-body">
              {sec.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
