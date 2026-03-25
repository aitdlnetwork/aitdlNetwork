/*
Ganitsutram | AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com |  https://www.aitdl.in
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

// AITDL Network © 2026 | Vikram Samvat 2083
// Designed & Architected by JRM

'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n/I18nContext';

export default function TermsConditions() {
  const { language } = useI18n();

  const sectionsData: Record<string, { title: string; content: string }[]> = {
    en: [
      {
        title: "1. Workspace Guidelines",
        content: "By accessing AITDL nodes, you agree to comply with sovereign infrastructure guidelines and zero-trust verification procedures framing network stability."
      },
      {
        title: "2. SLA & Node Access",
        content: "SaaS dashboards operations loads are provided 'as-is' unless backed by explicitly signed Enterprise SLA support vouchers describing throughput setups."
      },
      {
        title: "3. Local Governance",
        content: "Any disputes arising out of edge delivery configurations shall be settled under the local jurisdiction of node-aligned support directories setups."
      }
    ],
    hi: [
      {
        title: "1. कार्यक्षेत्र दिशानिर्देश",
        content: "एआई टीडीएल नोड्स तक पहुंचकर, आप संप्रभु बुनियादी ढांचे के दिशानिर्देशों और नेटवर्क स्थिरता को नियंत्रित करने वाली जीरो-ट्रस्ट सत्यापन प्रक्रियाओं का पालन करने के लिए सहमत होते हैं।"
      },
      {
        title: "2. एसएलए और नोड एक्सेस",
        content: "सास डैशबोर्ड संचालन लोड 'जैसा है' वैसा ही प्रदान किया जाता है जब तक कि थ्रूपुट सेटअप का वर्णन करने वाले स्पष्ट रूप से हस्ताक्षरित एंटरप्राइज एसएलए समर्थन वाउचर द्वारा समर्थित न हो।"
      },
      {
        title: "3. स्थानीय शासन",
        content: "एज डिलीवरी कॉन्फ़िगरेशन से उत्पन्न होने वाले किसी भी विवाद को नोड-संरेखित समर्थन निर्देशिका सेटअप के स्थानीय अधिकार क्षेत्र में सुलझाया जाएगा।"
      }
    ],
    sa: [
      {
        title: "१. कार्यक्षेत्र नियमाः",
        content: "एआई टीडीएल नोड्स इत्यस्य उपयोगं कृत्वा भवान् संप्रभु संरचना नियमानुपालने सहमतः भवति।"
      },
      {
        title: "२. नियत समय सीमा (SLA)",
        content: "सास डैशबोर्ड व्यवस्था यथास्थिति अस्ति।"
      },
      {
        title: "३. स्थानीय प्रशासनम्",
        content: "यः कोऽपि विवादः स्थानीय अधिकार क्षेत्रे समाधानं भविष्यति।"
      }
    ]
  };

  const t = (en: string, hi: string, sa: string) => {
    if (language === 'hi') return hi;
    if (language === 'sa') return sa;
    return en;
  };

  const sections = sectionsData[language as keyof typeof sectionsData] || sectionsData.en;

  return (
    <div className="flex-1 w-full max-w-[800px] mx-auto px-6 py-12 flex flex-col justify-center z-10 relative animate-fade-in mb-12">
      <div className="flex flex-col gap-4 mb-10">
        <h1 className="text-white font-display text-3xl md:text-4xl font-bold tracking-tight">
          {t("Terms & Conditions", "नियम और शर्तें", "नियमाः आवश्यकाः च")}
        </h1>
        <p className="text-slate-400 text-sm font-body">
          {t("Last updated: March 2026 | Vikram Samvat 2083", "अंतिम अपडेट: मार्च 2026 | विक्रम संवत 2083", "अंतिम परिवर्तनम्: मार्च २०२६ | विक्रम संवत् २०८३")}
        </p>
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
