/*
AITDL Network © 2026 | Vikram Samvat 2083
Designed & Architected by JRM
*/

'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function RoiCalculator() {
  const [students, setStudents] = useState<number>(300);
  const [fee, setFee] = useState<number>(2500);
  const [leakageRate, setLeakageRate] = useState<number>(10);

  // Formulas
  const monthlyRevenue = students * fee;
  const monthlyLeakage = monthlyRevenue * (leakageRate / 100);
  const annualLeakage = monthlyLeakage * 12;
  const adminHoursWasted = Math.round(students * 0.25); // 15 mins per student/month

  return (
    <div className="flex-1 w-full max-w-[1000px] mx-auto px-6 py-12 flex flex-col justify-center z-10 relative animate-fade-in">
      {/* Header */}
      <div className="text-center mb-12 flex flex-col items-center">
        <span className="px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-xs font-display font-bold tracking-wider mb-3">
          FREE B2B TOOL
        </span>
        <h1 className="text-white font-display text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-4 leading-tight text-gradient">
          Institute Fee & ROI Calculator
        </h1>
        <p className="text-slate-400 text-base font-body max-w-lg leading-relaxed">
          Estimate administration hour drains and revenue leakage triggers from manual billing.
        </p>
        <div className="h-1 w-20 bg-primary mt-6 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start mb-16">
        {/* Left Column: Sliders */}
        <div className="lg:col-span-3 glass-card p-6 md:p-8 rounded-2xl border border-white/5 bg-background-dark/30 flex flex-col gap-8 shadow-xl">
          <h3 className="text-white font-display font-bold text-lg border-b border-white/5 pb-4">Adjust Your Metrics</h3>

          {/* Student Count */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-300 font-medium">Total Students</span>
              <span className="text-primary font-bold font-mono text-lg">{students}</span>
            </div>
            <input 
              type="range" 
              min="50" 
              max="2000" 
              step="50" 
              value={students} 
              onChange={(e) => setStudents(Number(e.target.value))}
              className="w-full accent-primary bg-primary/10 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Average Fee */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-300 font-medium">Average Monthly Fee (₹)</span>
              <span className="text-primary font-bold font-mono text-lg">₹{fee.toLocaleString('en-IN')}</span>
            </div>
            <input 
              type="range" 
              min="500" 
              max="10000" 
              step="500" 
              value={fee} 
              onChange={(e) => setFee(Number(e.target.value))}
              className="w-full accent-primary bg-primary/10 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Leakage Rate */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-300 font-medium">Est. Fee Collection Gap (%)</span>
              <span className="text-primary font-bold font-mono text-lg">{leakageRate}%</span>
            </div>
            <input 
              type="range" 
              min="2" 
              max="30" 
              step="1" 
              value={leakageRate} 
              onChange={(e) => setLeakageRate(Number(e.target.value))}
              className="w-full accent-primary bg-primary/10 h-2 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Right Column: Calculations GLow */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="glass-card p-6 rounded-2xl border border-primary/20 bg-primary/5 shadow-[0_0_50px_-12px] shadow-primary/20 flex flex-col items-center text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="text-slate-400 text-xs font-body tracking-wider uppercase mb-1 relative z-10">Est. Annual Revenue Leakage</span>
            <h2 className="text-primary font-display font-black text-4xl md:text-5xl mt-1 tracking-tight drop-shadow-glow relative z-10">
              ₹{annualLeakage.toLocaleString('en-IN')}
            </h2>
            <p className="text-slate-500 text-[11px] mt-2 font-body relative z-10">Computed from late fees and collection slips</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card p-4 rounded-xl border border-white/5 bg-background-dark/20 flex flex-col items-center text-center">
              <span className="text-slate-500 text-[10px] font-body tracking-wider uppercase">Monthly At Risk</span>
              <span className="text-white font-display font-bold text-lg mt-1">₹{monthlyLeakage.toLocaleString('en-IN')}</span>
            </div>
            <div className="glass-card p-4 rounded-xl border border-white/5 bg-background-dark/20 flex flex-col items-center text-center">
              <span className="text-slate-500 text-[10px] font-body tracking-wider uppercase">Admin Hr Wasted</span>
              <span className="text-white font-display font-bold text-lg mt-1">{adminHoursWasted} hrs/mo</span>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 flex flex-col items-center text-center">
            <div className="size-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-2">
              <span className="material-symbols-outlined text-xl">offline_bolt</span>
            </div>
            <span className="text-emerald-400 text-xs font-display font-bold">Recover with AITDL</span>
            <p className="text-slate-400 text-xs font-body mt-1 max-w-xs">
              Our automated setup saves admin hour sinks trigger collection rates over 98.7% statically.
            </p>
            <Link href="/contact" className="btn-primary w-full mt-4 flex items-center justify-center h-10 px-6 rounded-lg bg-primary text-background-dark font-display font-semibold text-[13px] shadow-lg shadow-primary/10">
              Fix This Leakage Today
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
