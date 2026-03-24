/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n/I18nContext';

const foundersData: Record<string, {
  name: string;
  role: string;
  bio: string;
  image: string;
  tags: string[];
}[]> = {
  en: [
    {
      name: "Pushpa Devi",
      role: "Co-Founder & Director of Operations",
      bio: "Pushpa Devi guides AITDL’s strategic corporate vision. She oversees administrative absolute transparency, corporate logistics compliance, and absolute workspace efficiency enabling absolute engineering focus Node.",
      image: "/images/avatar_pushpadevi.png",
      tags: ["Corporate Strategy", "Operations", "Governance"]
    },
    {
      name: "Jawahar R Mallah",
      role: "Founder & Lead Architect",
      bio: "A software technologist with 19+ years of deep engineering experience (2007–present), Jawahar has architected enterprise-grade systems across POS, ERP, and Accounting. His parallel study of Educational Software mirrors ancient algorithmic sutras computationally optimal for tomorrow's continuous AI Node.",
      image: "/images/avatar_jrm.png",
      tags: ["Software Architect", "Vedic Algorithms", "Distributed Systems"]
    }
  ],
  hi: [
    {
      name: "पुष्पा देवी",
      role: "सह-संस्थापक और संचालन निदेशक",
      bio: "पुष्पा देवी एआई टीडीएल के रणनीतिक कॉर्पोरेट दृष्टिकोण का मार्गदर्शन करती हैं। वह प्रशासनिक पूर्ण पारदर्शिता, कॉर्पोरेट लॉजिस्टिक्स अनुपालन और कार्यक्षेत्र दक्षता की देखरेख करती हैं।",
      image: "/images/avatar_pushpadevi.png",
      tags: ["कॉर्पोरेट रणनीति", "संचालन", "शासन"]
    },
    {
      name: "जवाहर आर मल्लाह",
      role: "संस्थापक और प्रमुख आर्किटेक्ट",
      bio: "19+ वर्षों के गहरे इंजीनियरिंग अनुभव वाले सॉफ्टवेयर प्रौद्योगिकीविद्, जवाहर ने उन्नत सिस्टम डिजाइन किए हैं। संस्थापक के रूप में, उनका अध्ययन प्राचीन एल्गोरिदम को भविष्य की एआई के लिए इष्टतम मानता है।",
      image: "/images/avatar_jrm.png",
      tags: ["सॉफ्टवेयर आर्किटेक्ट", "वैदिक एल्गोरिदम", "प्रणाली"]
    }
  ],
  sa: [
    {
      name: "पुष्पा देवी",
      role: "सह-संस्थापक प्रचालन निदेशक च",
      bio: "पुष्पा देवी महोदया व्यवस्थायाः विजन निर्देशयति। सा प्रशासनिक पारदर्शिता प्रबन्धनम् करोतु।",
      image: "/images/avatar_pushpadevi.png",
      tags: ["प्रबन्धनम्", "संचालन", "शासन"]
    },
    {
      name: "जवाहर आर मल्लाह",
      role: "संस्थापक प्रमुख वास्तुकार च",
      bio: "19+ वर्षाणां अनुभवयुक्तः तन्त्रज्ञान विशेषज्ञः, जवाहर महोदयः उन्नत व्यवस्था प्रबन्धनम् कृतवान्।",
      image: "/images/avatar_jrm.png",
      tags: ["तन्त्रज्ञा", "वैदिक एल्गोरिदम", "व्यवस्था"]
    }
  ]
};

export default function Founders() {
  const { language } = useI18n();
  const langKey = language === 'hi' || language === 'sa' ? language : 'en';
  const founders = foundersData[langKey] || foundersData['en'];

  const t = (en: string, hi: string, sa: string) => {
    if (langKey === 'hi') return hi;
    if (langKey === 'sa') return sa;
    return en;
  };

  return (
    <div className="flex-1 w-full max-w-[1200px] mx-auto px-6 py-12 flex flex-col justify-center z-10 relative animate-fade-in">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none"></div>

      {/* Header */}
      <div className="text-center mb-16 flex flex-col items-center">
        <span className="px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-xs font-display font-bold tracking-wider mb-3">
          {t("OUR LEADERSHIP", "हमारा नेतृत्व", "अस्माकं नेतृत्वम्")}
        </span>
        <h1 className="text-white font-display text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-4 leading-tight text-gradient">
          {t("Meet the Visionaries", "दूरदर्शी लोगों से मिलें", "द्रष्टारः मिलन्तु")}
        </h1>
        <p className="text-slate-400 text-base font-body max-w-lg leading-relaxed">
          {t("The minds driving administration absolute transparency and deep engineering absolute excellence.", "प्रशासन की पूर्ण पारदर्शिता और गहरे इंजीनियरिंग की उत्कृष्टता को बढ़ावा देने वाले दिमाग।", "व्यवस्था प्रबन्धनम् उत्तमं कुर्वन्ति।")}
        </p>
        <div className="h-1 w-20 bg-primary mt-6 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch mb-12">
        {founders.map((founder, idx) => (
          <div key={idx} className="glass-card p-8 rounded-2xl border-t-2 border-t-primary/20 bg-background-dark/50 flex flex-col items-center text-center gap-6 hover:border-primary/40 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none"></div>
            
            <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 relative group-hover:scale-105 transition-transform duration-300">
              <Image 
                src={founder.image} 
                alt={founder.name} 
                fill 
                className="object-cover"
              />
            </div>

            <div className="flex flex-col gap-3 z-10">
              <div>
                <span className="px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-[11px] font-display font-bold tracking-wide">
                  {founder.role}
                </span>
                <h2 className="text-white font-display text-2xl md:text-3xl font-bold mt-2">
                  {founder.name}
                </h2>
              </div>
              
              <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-md font-body">
                {founder.bio}
              </p>

              <div className="flex flex-wrap gap-2 mt-2 justify-center">
                {founder.tags.map((tag, i) => (
                  <span key={i} className="px-2 py-1 rounded bg-white/5 border border-white/5 text-slate-400 text-xs font-mono">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Corporate Mission CTA */}
      <div className="glass-card p-8 rounded-xl border border-white/5 bg-background-dark/30 text-center mb-12 flex flex-col items-center gap-4">
        <h3 className="font-display font-bold text-xl text-white">
          {t("Guarding Core Operations with Adaptive Sovereignty", "रूपांतरण के साथ मुख्य संचालन की रक्षा", "कार्य प्रबन्धनम् सुरक्षा")}
        </h3>
        <p className="text-slate-400 text-sm font-body max-w-xl">
          {t("AITDL is driven by an absolute commitment towards fully transparent enterprise delivery setups engineered securely.", "AITDL पूरी तरह से पारदर्शी एंटरप्राइज डिलीवरी सेटअप के लिए समर्पित है जो सुरक्षित रूप से डिजाइन किए गए हैं।", "AITDL पारदर्शी प्रबन्धनार्थं कटिबद्ध अस्ति।")}
        </p>
        <Link href="/about" className="btn-secondary px-6 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white font-display font-semibold text-xs inline-flex items-center gap-2 hover:border-primary/40 transition-all mt-2">
          {t("Back to About", "के बारे में वापस", "प्रति गमनम्")}
        </Link>
      </div>
    </div>
  );
}
