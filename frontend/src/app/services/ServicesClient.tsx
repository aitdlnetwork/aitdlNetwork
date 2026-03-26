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
import { usePathname } from 'next/navigation';
import SEOHead from '@/components/SEOHead';

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
  const pathname = usePathname();
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
    <div className="min-h-screen pt-32 pb-24 bg-mesh relative overflow-hidden">
      <SEOHead path={pathname} />
      <div className="absolute inset-0 bg-hero-glow pointer-events-none"></div>

      <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10 animate-fade-in">
        {/* ── Header ── */}
        <div className="mb-20 text-center md:text-left max-w-5xl">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-display font-black text-[10px] tracking-[0.2em] uppercase mb-8">
            <span className="size-2 rounded-full bg-primary animate-pulse"></span>
            SOVEREIGN ECOSYSTEM
          </div>
          <h1 className="font-display font-bold text-6xl md:text-8xl text-white mb-8 tracking-tight leading-[1.05]">
            <span className="text-gradient inline-block">{t("Specialized", "विशेषज्ञ", "विशेषज्ञ")}</span> <br />
            <span className="text-gradient-primary inline-block font-black tracking-tighter">{t("Sovereign Node Solutions", "संप्रभु समाधान", "संप्रभु समाधानम्")}</span>
          </h1>
          <p className="text-slate-400 text-xl font-body leading-relaxed border-l-2 border-primary/20 pl-8 max-w-2xl">
            {t(
              "Enterprise-grade software nodes architected for the Indian digital frontier — from educational institutes to retail powerhouses.",
              "भारतीय व्यवसायों के लिए निर्मित उत्पाद - शिक्षा, स्वास्थ्य देखभाल और खुदरा।",
              "भारतीय व्यवसायार्थं निर्मितं तन्त्रम् - शिक्षणम्, चिकित्सालयम् विक्रय व्यवस्था च।"
            )}
          </p>
        </div>

        {/* ── Category Tabs ── */}
        <div className="flex flex-wrap gap-4 mb-16">
          {categories.map((cat, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`flex items-center gap-4 px-8 py-4 rounded-2xl text-[10px] font-display font-black tracking-[0.2em] uppercase transition-all duration-700 border ${
                activeTab === i
                  ? 'bg-primary text-background-dark border-primary shadow-[0_20px_40px_rgba(13,227,242,0.25)] scale-105'
                  : 'bg-white/5 text-slate-500 hover:bg-white/10 border-white/10 hover:border-primary/40 hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[24px]">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* ── Active Category Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-32 min-h-[400px]">
          {current.services.map((svc: any, i: number) => (
            <div
              key={i}
              className="glass-premium rounded-[3rem] p-12 flex flex-col relative overflow-hidden group transition-all duration-700 hover:translate-y-[-16px] animate-slide-up border border-white/5 hover:border-primary/40 hover:shadow-[0_40px_80px_rgba(0,0,0,0.4)]"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {svc.badge && (
                <div className="absolute top-8 right-8 z-20">
                  <span className={`text-[9px] font-display font-black tracking-[0.2em] uppercase px-4 py-1.5 rounded-full border ${
                    svc.badge === 'New' || svc.badge === 'नया' || svc.badge === 'नूतनम्' ? 'border-green-500/40 text-green-400 bg-green-500/10' :
                    svc.badge === 'AI Powered' || svc.badge === 'एआई ऑपरेटेड' || svc.badge === 'एआई तन्त्रम्' ? 'border-purple-400/40 text-purple-300 bg-purple-500/10 shadow-[0_0_20px_rgba(168,85,247,0.2)]' :
                    'border-primary/40 text-primary bg-primary/10 shadow-[0_0_20px_rgba(13,227,242,0.2)]'
                  }`}>{svc.badge}</span>
                </div>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
              
              <div className="w-20 h-20 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center text-primary mb-10 group-hover:scale-110 group-hover:bg-primary group-hover:text-background-dark transition-all duration-700 shadow-2xl relative">
                <div className="absolute inset-0 bg-primary/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                <span className="material-symbols-outlined text-5xl relative z-10">{svc.icon}</span>
              </div>
              
              <h3 className="font-display font-bold text-4xl text-white mb-6 tracking-tight group-hover:text-primary transition-colors leading-[1.1]">{svc.title}</h3>
              <p className="text-slate-400 text-lg md:text-xl leading-relaxed mb-12 font-body flex-grow group-hover:text-slate-200 transition-colors">{svc.desc}</p>
              
              <Link
                href={svc.link}
                className="inline-flex items-center gap-4 font-display font-black text-xs tracking-[0.2em] uppercase text-primary hover:text-white transition-all duration-500 group/link bg-primary/5 hover:bg-primary/20 w-fit px-8 py-4 rounded-2xl border border-primary/10"
              >
                <span>{t("Initialize Node", "उत्पाद देखें", "उत्पाद पश्यन्तु")}</span>
                <div className="size-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center group-hover/link:bg-primary group-hover/link:text-background-dark transition-all duration-500">
                  <span className="material-symbols-outlined text-sm font-bold">east</span>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* ── Coming Soon Roadmap ── */}
        <div className="glass-card rounded-[3rem] p-12 md:p-20 border border-white/5 bg-background-dark/30 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 font-display font-bold text-[10px] tracking-wider uppercase mb-4">
                {t("Future Roadmap", "भविष्य का रोडमैप", "भविष्यस्य रेखाचित्रम्")}
              </div>
              <h2 className="text-white font-display font-bold text-4xl md:text-5xl tracking-tight">
                {t("Coming Soon", "जल्द आ रहा है", "शीघ्रमागच्छति")}
              </h2>
              <p className="text-slate-400 text-lg mt-4 font-body max-w-xl">
                {t(
                  "Our product roadmap — built for India's next growth verticals.",
                  "हमारा उत्पाद रोडमैप — भारत के विकास कार्यक्षेत्रों के लिए निर्मित।",
                  "अस्माकं नग्न चित्रम् — भारतस्य नूतन विकासाय।"
                )}
              </p>
            </div>
            <Link href="/contact" className="px-8 py-4 rounded-xl bg-primary/10 border border-primary/20 text-primary font-display font-bold text-sm tracking-widest uppercase hover:bg-primary hover:text-background-dark transition-all shadow-glow">
              {t("Request early access", "जल्दी पहुंच का अनुरोध करें", "शीघ्र प्रवेशार्थं अनुरोधः")}
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {comingSoon.map((item: any, i: number) => (
              <div key={i} className="glass-premium rounded-2xl p-8 flex flex-col gap-6 opacity-80 hover:opacity-100 transition-all duration-500 border border-white/5 hover:border-primary/40 group/item">
                <div className="size-12 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 group-hover/item:text-primary transition-colors">
                  <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                </div>
                <div>
                  <p className="text-white text-lg font-display font-bold leading-tight group-hover/item:text-primary transition-colors">{item.title}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <span className="size-1.5 rounded-full bg-primary animate-pulse"></span>
                    <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">{item.eta}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SoftwareApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "AITDL LMS & Coaching Management Suite",
            "applicationCategory": "EducationalApplication",
            "operatingSystem": "Web, Android, iOS",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "INR",
              "description": "Free demo available. Contact for pricing."
            },
            "provider": {
              "@type": "Organization",
              "name": "AITDL Network",
              "url": "https://aitdl.in"
            },
            "featureList": [
              "Student Management System",
              "Automated Fee Collection",
              "Online Tests & Quizzes",
              "AI-powered Learning Paths",
              "GST-ready POS Billing",
              "Attendance Tracking"
            ]
          })
        }}
      />
    </div>
  );
}
