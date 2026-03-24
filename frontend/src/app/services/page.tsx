/*
  AITDL Network © 2026 | Vikram Samvat 2083
  Designed & Architected by JRM
*/

'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import { useI18n } from '@/lib/i18n/I18nContext';

/* ── Data ── */
const categoriesData: Record<string, { label: string; icon: string; services: any[] }[]> = {
  en: [
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
  ],
  hi: [
    {
      label: "शिक्षा",
      icon: "school",
      services: [
        { title: "एडेक इकोसिस्टम", desc: "स्कूलों और कोचिंग सेंटरों के लिए एलएमएस, वर्चुअल क्लासरूम, शुल्क स्वचालन और छात्र प्रबंधन।", icon: "school", link: "/services/edtech-ecosystems", badge: "लोकप्रिय" },
        { title: "शैक्षणिक स्वचालन", desc: "कागज रहित प्रवेश, डिजिटल मार्क-शीट, पुस्तकालय और प्रमाणपत्र प्रबंधन।", icon: "settings_suggest", link: "/services/academic-automation", badge: "" },
        { title: "एडेप्टिव एआई लर्निंग", desc: "छात्रों के लिए व्यक्तिगत अध्ययन मार्ग और स्मार्ट क्विज़।", icon: "psychology", link: "/services/adaptive-ai", badge: "एआई ऑपरेटेड" }
      ]
    },
    {
      label: "वाणिज्य",
      icon: "payments",
      services: [
        { title: "नैक्स्ट-जेन पीओएस", desc: "खुदरा और रेस्तरां के लिए बारकोड बिलिंग, लाइव इन्वेंट्री और जीएसटी चालान।", icon: "payments", link: "/services/pos-retail", badge: "लोकप्रिय" },
        { title: "रियल एस्टेट ईआरपी", desc: "किरायेदार पोर्टल, स्वचालित किराया संग्रह और टिकटिंग ढांचा।", icon: "real_estate_agent", link: "/services/real-estate-erp", badge: "" }
      ]
    },
    {
      label: "स्वास्थ्य देखभाल",
      icon: "local_hospital",
      services: [
        { title: "क्लिनिक प्रबंधन", desc: "क्लिनिकों और अस्पतालों के लिए डिजिटल ओपीडी, फार्मेसी बिलिंग और व्हाट्सएप रिपोर्ट संक्रमण।", icon: "local_hospital", link: "/services/healthcare-clinic", badge: "नया" }
      ]
    },
    {
      label: "एनजीओ और सोसाइटी",
      icon: "diversity_3",
      services: [
        { title: "एनजीओ प्रबंधन", desc: "ऑनलाइन रखरखाव बिलिंग, धन उगाहने की ट्रैकिंग और सदस्य पोर्टल।", icon: "diversity_3", link: "/services/ngo-society", badge: "" }
      ]
    },
    {
      label: "इन्फ्रास्ट्रक्चर",
      icon: "cloud",
      services: [
        { title: "एंटरप्राइज क्लाउड", desc: "स्वायत्त होस्टिंग, डब्ल्यूएएफ फ़ायरवॉल और किसी भी वेब पोर्टल के लिए सुरक्षित बैकअप।", icon: "cloud", link: "/services/enterprise-cloud", badge: "" }
      ]
    }
  ],
  sa: [
    {
      label: "शिक्षणम्",
      icon: "school",
      services: [
        { title: "विद्या तन्त्रम्", desc: "विद्यालय कोचिंग संस्था प्रबन्धनार्थं एलएमएस व्यवस्था।", icon: "school", link: "/services/edtech-ecosystems", badge: "प्रसिद्धम्" },
        { title: "विद्या स्वचालनम्", desc: "कागदरहित प्रवेशः, डिजिटल मार्क-शीट प्रमाण-पत्र प्रबन्धनम्।", icon: "settings_suggest", link: "/services/academic-automation", badge: "" },
        { title: "विवेक एआई पठनम्", desc: "स्व-पठनार्थं एआई तन्त्रम्।", icon: "psychology", link: "/services/adaptive-ai", badge: "एआई तन्त्रम्" }
      ]
    },
    {
      label: "विक्रय व्यापारम्",
      icon: "payments",
      services: [
        { title: "पीओएस बिलिंग", desc: "विक्रय प्रबन्धनार्थं तन्त्रम् जीएसटी स्वचालनम्।", icon: "payments", link: "/services/pos-retail", badge: "प्रसिद्धम्" },
        { title: "रियल एस्टेट संपत्तिः", desc: "किरायेदार पोर्टल व्यवस्थापनम्।", icon: "real_estate_agent", link: "/services/real-estate-erp", badge: "" }
      ]
    },
    {
      label: "चिकित्सालयम्",
      icon: "local_hospital",
      services: [
        { title: "क्लिनिक प्रबन्धनम्", desc: "डिजिटल ओपीडी फार्मसी बिलिंग व्यवस्था।", icon: "local_hospital", link: "/services/healthcare-clinic", badge: "नूतनम्" }
      ]
    },
    {
      label: "एनजीओ सोसायट्यः",
      icon: "diversity_3",
      services: [
        { title: "एनजीओ प्रबन्धनम्", desc: "दान प्रबन्धनं सदस्य पोर्टल व्यवस्था।", icon: "diversity_3", link: "/services/ngo-society", badge: "" }
      ]
    },
    {
      label: "इन्फ्रास्ट्रक्चर",
      icon: "cloud",
      services: [
        { title: "मेघ समाधानम्", desc: "सर्वभौम तन्त्र व्यवस्थापनम् स्वायत्त स्वचालनम्।", icon: "cloud", link: "/services/enterprise-cloud", badge: "" }
      ]
    }
  ]
};

/* ── Coming Soon entries (no dedicated page yet) ── */
const comingSoonData: Record<string, { title: string; icon: string; eta: string }[]> = {
  en: [
    { title: "Transport & Fleet Management", icon: "local_shipping", eta: "Q3 2026" },
    { title: "Hotel & Guest House ERP", icon: "hotel", eta: "Q3 2026" },
    { title: "Construction Project Tracking", icon: "engineering", eta: "Q4 2026" },
    { title: "Agriculture & Kisan Management", icon: "agriculture", eta: "Q4 2026" }
  ],
  hi: [
    { title: "परिवहन प्रबंधन", icon: "local_shipping", eta: "Q3 2026" },
    { title: "होटल और गेस्ट हाउस ईआरपी", icon: "hotel", eta: "Q3 2026" },
    { title: "निर्माण परियोजना ट्रैकिंग", icon: "engineering", eta: "Q4 2026" },
    { title: "कृषि एवं किसान प्रबंधन", icon: "agriculture", eta: "Q4 2026" }
  ],
  sa: [
    { title: "परिवहन प्रबन्धनम्", icon: "local_shipping", eta: "Q3 2026" },
    { title: "होटल व्यवस्थित ईआरपी", icon: "hotel", eta: "Q3 2026" },
    { title: "निर्माण कार्य ट्रैकिंग", icon: "engineering", eta: "Q4 2026" },
    { title: "कृषि किसान प्रबन्धनम्", icon: "agriculture", eta: "Q4 2026" }
  ]
};

export default function Services() {
  const { language } = useI18n();
  const [activeTab, setActiveTab] = useState(0);

  const langKey = language === 'hi' || language === 'sa' ? language : 'en';
  const categories = categoriesData[langKey];
  const comingSoon = comingSoonData[langKey];
  const current = categories[activeTab];

  const t = (en: string, hi: string, sa: string) => {
    if (langKey === 'hi') return hi;
    if (langKey === 'sa') return sa;
    return en;
  };

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
          {t("Specialized Solutions", "विशेषज्ञ समाधान", "विशेषज्ञ समाधानम्")}
        </h1>
        <p className="text-muted text-lg md:text-xl max-w-2xl font-body leading-relaxed">
          {t(
            "Industry-specific software built for Indian businesses — education, healthcare, retail, and beyond.",
            "भारतीय व्यवसायों के लिए निर्मित उत्पाद - शिक्षा, स्वास्थ्य देखभाल और खुदरा।",
            "भारतीय व्यवसायार्थं निर्मितं तन्त्रम् - शिक्षणम्, चिकित्सालयम् विक्रय व्यवस्था च।"
          )}
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
        {current.services.map((svc: any, i: number) => (
          <div
            key={i}
            className="glass-card rounded-xl p-8 flex flex-col relative overflow-hidden group transition-all duration-300 hover:border-primary/50 hover:-translate-y-1"
          >
            {svc.badge && (
              <span className={`absolute top-4 right-4 text-[10px] font-display font-bold px-2 py-0.5 rounded-full border ${
                svc.badge === 'New' || svc.badge === 'नया' || svc.badge === 'नूतनम्' ? 'border-green-500/40 text-green-400 bg-green-500/10' :
                svc.badge === 'AI Powered' || svc.badge === 'एआई ऑपरेटेड' ? 'border-purple-400/40 text-purple-300 bg-purple-500/10' :
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
              {t("Explore Product", "उत्पाद देखें", "उत्पाद पश्यन्तु")}
              <span className="material-symbols-outlined ml-2 text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
            </Link>
          </div>
        ))}
      </div>

      {/* ── Coming Soon Roadmap ── */}
      <div className="border-t border-white/10 pt-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-white font-display font-bold text-2xl md:text-3xl">
              {t("Coming Soon", "जल्द आ रहा है", "शीघ्रमागच्छति")}
            </h2>
            <p className="text-muted text-sm mt-1 font-body">
              {t(
                "Our product roadmap — built for India's next growth verticals.",
                "हमारा उत्पाद रोडमैप — भारत के विकास कार्यक्षेत्रों के लिए निर्मित।",
                "अस्माकं नग्न चित्रम् — भारतस्य नूतन विकासाय।"
              )}
            </p>
          </div>
          <Link href="/contact" className="text-primary text-sm font-display font-bold hover:underline flex items-center gap-1">
            {t("Request early access", "जल्दी पहुंच का अनुरोध करें", "शीघ्र प्रवेशार्थं अनुरोधः")} <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {comingSoon.map((item: any, i: number) => (
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
