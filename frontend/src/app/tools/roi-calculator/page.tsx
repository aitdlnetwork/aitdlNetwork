'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n/I18nContext';

export default function RoiCalculator() {
  const { language } = useI18n();
  const langKey = language === 'hi' || language === 'sa' ? language : 'en';

  const t = (en: string, hi: string, sa: string) => {
    if (langKey === 'hi') return hi;
    if (langKey === 'sa') return sa;
    return en;
  };

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
          {t("FREE B2B TOOL", "निःशुल्क B2B उपकरण", "निःशुल्क B2B साधनम्")}
        </span>
        <h1 className="text-white font-display text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-4 leading-tight text-gradient">
          {t("Institute Fee & ROI Calculator", "संस्थान शुल्क और आरओआई कैलक्यूलेटर", "संस्थान शुल्क गणकम्")}
        </h1>
        <p className="text-slate-400 text-base font-body max-w-lg leading-relaxed">
          {t("Estimate administration hour drains and revenue leakage triggers from manual billing.", "मैनुअल बिलिंग से प्रशासन के घंटे और राजस्व नुकसान का अनुमान लगाएं।", "शुल्क हानि गणना करोतु।")}
        </p>
        <div className="h-1 w-20 bg-primary mt-6 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start mb-16">
        {/* Left Column: Sliders */}
        <div className="lg:col-span-3 glass-card p-6 md:p-8 rounded-2xl border border-white/5 bg-background-dark/30 flex flex-col gap-8 shadow-xl">
          <h3 className="text-white font-display font-bold text-lg border-b border-white/5 pb-4">
            {t("Adjust Your Metrics", "मेट्रिक्स समायोजित करें", "मेट्रिक्स समायोजनम्")}
          </h3>

          {/* Student Count */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-300 font-medium">{t("Total Students", "कुल छात्र", "कुल छात्राः")}</span>
              <span className="text-primary font-bold font-mono text-lg">{students}</span>
            </div>
            <input 
              type="range" min="50" max="2000" step="50" value={students} 
              onChange={(e) => setStudents(Number(e.target.value))}
              className="w-full accent-primary bg-primary/10 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Average Fee */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-300 font-medium">{t("Average Monthly Fee (₹)", "औसत मासिक शुल्क (₹)", "मासिक शुल्कम् (₹)")}</span>
              <span className="text-primary font-bold font-mono text-lg">₹{fee.toLocaleString('en-IN')}</span>
            </div>
            <input 
              type="range" min="500" max="10000" step="500" value={fee} 
              onChange={(e) => setFee(Number(e.target.value))}
              className="w-full accent-primary bg-primary/10 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Leakage Rate */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-300 font-medium">{t("Est. Fee Collection Gap (%)", "अनुमानित शुल्क संग्रह अंतर (%)", "शुल्क संग्रह अंतर (%)")}</span>
              <span className="text-primary font-bold font-mono text-lg">{leakageRate}%</span>
            </div>
            <input 
              type="range" min="2" max="30" step="1" value={leakageRate} 
              onChange={(e) => setLeakageRate(Number(e.target.value))}
              className="w-full accent-primary bg-primary/10 h-2 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Right Column: Calculations GLow */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="glass-card p-6 rounded-2xl border border-primary/20 bg-primary/5 shadow-[0_0_50px_-12px] shadow-primary/20 flex flex-col items-center text-center relative overflow-hidden group">
            <span className="text-slate-400 text-xs font-body tracking-wider uppercase mb-1 z-10">
              {t("Est. Annual Revenue Leakage", "अनुमानित वार्षिक राजस्व नुकसान", "वार्षिक राजस्व हानि")}
            </span>
            <h2 className="text-primary font-display font-black text-4xl md:text-5xl mt-1 tracking-tight drop-shadow-glow z-10">
              ₹{annualLeakage.toLocaleString('en-IN')}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card p-4 rounded-xl border border-white/5 bg-background-dark/20 flex flex-col items-center text-center">
              <span className="text-slate-500 text-[10px] font-body tracking-wider uppercase">{t("Monthly At Risk", "मासिक जोखिम", "मासिक संकट")}</span>
              <span className="text-white font-display font-bold text-lg mt-1">₹{monthlyLeakage.toLocaleString('en-IN')}</span>
            </div>
            <div className="glass-card p-4 rounded-xl border border-white/5 bg-background-dark/20 flex flex-col items-center text-center">
              <span className="text-slate-500 text-[10px] font-body tracking-wider uppercase">{t("Admin Hr Wasted", "व्यवस्थापक घंटे बर्बाद", "श्रम हानि")}</span>
              <span className="text-white font-display font-bold text-lg mt-1">{adminHoursWasted} {t("hrs/mo", "घंटे/माह", "घंटा/मास")}</span>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 flex flex-col items-center text-center">
            <span className="text-emerald-400 text-xs font-display font-bold">{t("Recover with AITDL", "AITDL के साथ पुनर्प्राप्त करें", "AITDL द्वारा रक्षणम्")}</span>
            <Link href="/contact" className="btn-primary w-full mt-4 flex items-center justify-center h-10 px-6 rounded-lg bg-primary text-background-dark font-display font-semibold text-[13px] shadow-lg shadow-primary/10">
              {t("Fix This Leakage Today", "आज ही इस रिसाव को ठीक करें", "समस्या निवारणम् कुरु")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

