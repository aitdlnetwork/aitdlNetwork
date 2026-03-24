/*
Ganitsutram | AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com |  https://www.aitdl.in
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

/*
AITDL Network © 2026 | Vikram Samvat 2083
Designed & Architected by JRM
*/

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n/I18nContext';

export default function AttendanceCalculator() {
  const { language } = useI18n();
  const langKey = language === 'hi' || language === 'sa' ? language : 'en';

  const t = (en: string, hi: string, sa: string) => {
    if (langKey === 'hi') return hi;
    if (langKey === 'sa') return sa;
    return en;
  };

  const [total, setTotal] = useState<number>(40);
  const [attended, setAttended] = useState<number>(25);

  const currentPercentage = total > 0 ? (attended / total) * 100 : 0;
  
  let statusText = t("Short Attendance", "कम उपस्थिति", "न्यून उपस्थिति");
  let statusColor = "text-rose-400";
  let glowColor = "shadow-rose-500/20";
  let detailText = "";

  if (currentPercentage >= 75) {
    const bunkable = Math.floor((attended - 0.75 * total) / 0.75);
    statusText = t("Safe!", "सुरक्षित!", "सुरक्षितम्!");
    statusColor = "text-emerald-400";
    glowColor = "shadow-emerald-500/20";
    detailText = bunkable > 0 
      ? t(`You can safely miss ${bunkable} more classes.`, `आप सुरक्षित रूप से ${bunkable} और कक्षाएं छोड़ सकते हैं।`, `भवन्तः ${bunkable} कक्षाः सुरक्षितरूपेण त्यक्तुं शक्नुवन्ति।`)
      : t(`You are exactly at 75%. You cannot miss any more classes!`, `आप ठीक 75% पर हैं। आप और कक्षाएं नहीं छोड़ सकते!`, `भवन्तः ठीक 75% अस्ति। कक्षा त्यागं न कुर्वन्तु!`);
  } else {
    const required = Math.ceil((0.75 * total - attended) / 0.25);
    statusText = t("In Danger", "खतरे में", "संकटग्रस्तम्");
    statusColor = "text-rose-400";
    glowColor = "shadow-rose-500/20";
    detailText = t(`You must attend ${required} more classes consecutively.`, `आपको लगातार ${required} और कक्षाओं में भाग लेना चाहिए।`, `भवन्तः लगातार ${required} कक्षाः उपस्थितः भवितुं अर्हन्ति।`);
  }

  const handleAttendedChange = (val: number) => {
    if (val <= total) setAttended(val);
  };

  const handleTotalChange = (val: number) => {
    setTotal(val);
    if (attended > val) setAttended(val);
  };

  return (
    <div className="flex-1 w-full max-w-[800px] mx-auto px-6 py-12 flex flex-col justify-center z-10 relative animate-fade-in">
      <div className="text-center mb-12 flex flex-col items-center">
        <span className="px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-xs font-display font-bold tracking-wider mb-3">
          {t("STUDENT ENGAGEMENT TOOL", "छात्र जुड़ाव उपकरण", "छात्र प्रबन्धनम् साधनम्")}
        </span>
        <h1 className="text-white font-display text-3xl md:text-4xl lg:text-5xl font-bold font-heading mb-4 leading-tight text-gradient">
          {t("75% Attendance & Bunk Calculator", "75% उपस्थिति और बंक कैलक्यूलेटर", "75% उपस्थिति गणकम्")}
        </h1>
        <p className="text-slate-400 text-base font-body max-w-lg leading-relaxed">
          {t("Quickly calculate attendance percentages and see skip safe limits.", "जल्दी से उपस्थिति प्रतिशत की गणना करें और अपनी सुरक्षित सीमाएं देखें।", "कक्षा उपस्थिति गणना करोतु।")}
        </p>
        <div className="h-1 w-20 bg-primary mt-6 rounded-full"></div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-16">
        {/* Left Column: Sliders */}
        <div className="glass-card p-6 rounded-2xl border border-white/5 bg-background-dark/30 flex flex-col gap-8 shadow-xl">
          <h3 className="text-white font-display font-bold text-base border-b border-white/5 pb-4">
            {t("Adjust Class Metrics", "क्लास मेट्रिक्स समायोजित करें", "कक्षा मेट्रिक्स समायोजनम्")}
          </h3>

          {/* Total Classes */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-300 font-medium">{t("Total Classes Conducted", "कुल कक्षाएं आयोजित की गईं", "कुल संचालित कक्षाः")}</span>
              <span className="text-white font-bold font-mono text-lg">{total}</span>
            </div>
            <input 
              type="range" min="10" max="200" step="1" value={total} 
              onChange={(e) => handleTotalChange(Number(e.target.value))}
              className="w-full accent-primary bg-primary/10 h-2 rounded-lg cursor-pointer"
            />
          </div>

          {/* Attended Classes */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-300 font-medium">{t("Classes Attended", "उपस्थित कक्षाएं", "उपस्थित कक्षाः")}</span>
              <span className="text-primary font-bold font-mono text-lg">{attended}</span>
            </div>
            <input 
              type="range" min="0" max={total} step="1" value={attended} 
              onChange={(e) => handleAttendedChange(Number(e.target.value))}
              className="w-full accent-primary bg-primary/10 h-2 rounded-lg cursor-pointer"
            />
          </div>
        </div>

        {/* Right Column: Verdict */}
        <div className="flex flex-col gap-6 h-full justify-center">
          <div className={`glass-card p-6 rounded-2xl border ${currentPercentage >= 75 ? 'border-emerald-500/20 bg-emerald-500/5' : 'border-rose-500/20 bg-rose-500/5'} shadow-[0_0_40px_-12px] ${glowColor} flex flex-col items-center text-center transition-all duration-300`}>
            <span className="text-slate-400 text-xs font-body tracking-wider uppercase mb-1">
              {t("Your Attendance", "आपकी उपस्थिति", "भवतः उपस्थिति")}
            </span>
            <h2 className={`${statusColor} font-display font-black text-5xl md:text-6xl mt-1 tracking-tight drop-shadow-glow`}>
              {currentPercentage.toFixed(1)}%
            </h2>
            <div className={`mt-3 px-3 py-1 rounded-full text-xs font-bold font-display uppercase tracking-wider ${currentPercentage >= 75 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'}`}>
              {statusText}
            </div>
            <p className="text-slate-300 text-sm font-body mt-4 leading-relaxed max-w-xs">
              {detailText}
            </p>
          </div>
        </div>
      </div>

      {/* CTA Back to LMS */}
      <div className="text-center">
        <p className="text-slate-500 text-xs font-body mb-3">{t("Tired of manual tracking?", "मैनुअल ट्रैकिंग से थक गए?", "श्रम निवारणार्थं")}</p>
        <Link href="/services/academic-automation" className="btn-secondary px-6 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white font-display font-semibold text-xs inline-flex items-center gap-2 hover:border-primary/40 transition-all">
          {t("Explore Academic Automation", "अकादमिक स्वचालन का अन्वेषण करें", "स्वचालनम् अन्वेषणं कुर्वन्तु")} <span className="material-symbols-outlined text-[16px] text-primary">east</span>
        </Link>
      </div>
    </div>
  );
}

