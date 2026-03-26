/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

'use client';

import React from 'react';
import Link from 'next/link';
import { useI18n } from '@/lib/i18n/I18nContext';
import { usePathname } from 'next/navigation';
import SEOHead from '@/components/SEOHead';

const projectsData: Record<string, { title: string; category: string; image: string; slug: string }[]> = {
  en: [
    {
      title: "CRM Dashboard",
      category: "React / Node",
      image: "/images/portfolio_crm.png",
      slug: "crm-dashboard"
    },
    {
      title: "AI Chatbot System",
      category: "OpenAI / Python",
      image: "/images/portfolio_chatbot.png",
      slug: "ai-chatbot"
    },
    {
      title: "Business Website",
      category: "Next.js / Tailwind",
      image: "/images/portfolio_business.png",
      slug: "business-website"
    }
  ],
  hi: [
    {
      title: "सीआरएम डैशबोर्ड",
      category: "रिएक्ट / नोड",
      image: "/images/portfolio_crm.png",
      slug: "crm-dashboard"
    },
    {
      title: "एआई चैटबॉट सिस्टम",
      category: "ओपनएआई / पायथन",
      image: "/images/portfolio_chatbot.png",
      slug: "ai-chatbot"
    },
    {
      title: "व्यापार वेबसाइट",
      category: "नेक्स्ट.जेएस / टेलविंड",
      image: "/images/portfolio_business.png",
      slug: "business-website"
    }
  ],
  sa: [
    {
      title: "सीआरएम डैशबोर्ड",
      category: "React / Node",
      image: "/images/portfolio_crm.png",
      slug: "crm-dashboard"
    },
    {
      title: "एआई सम्भाषण तन्त्रम्",
      category: "OpenAI / Python",
      image: "/images/portfolio_chatbot.png",
      slug: "ai-chatbot"
    },
    {
      title: "व्यापार जालपृष्ठम्",
      category: "Next.js / Tailwind",
      image: "/images/portfolio_business.png",
      slug: "business-website"
    }
  ]
};

export default function Portfolio() {
  const { language } = useI18n();
  const pathname = usePathname();
  const langKey = language === 'hi' || language === 'sa' ? language : 'en';
  const projects = projectsData[langKey];

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
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-20 mb-20 items-end">
          {/* Header Section */}
          <div className="flex flex-col gap-8 max-w-3xl">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-display font-black text-[10px] tracking-[0.2em] uppercase w-fit">
              <span className="size-2 rounded-full bg-primary animate-pulse"></span>
              PROJECT DEPLOYMENTS
            </div>
            <h1 className="text-white font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1]">
              <span className="text-gradient inline-block">{t("AI-First.", "एआई-प्रथम.", "एआई-प्रथम.")}</span> <br/>
              <span className="text-gradient-primary inline-block font-black tracking-tighter">{t("Future-Ready.", "भविष्य सज्ज.", "भविष्यस्य सज्जः.")}</span>
            </h1>
            <p className="text-slate-400 text-xl font-body leading-relaxed max-w-xl border-l-2 border-primary/20 pl-8">
              {t(
                "We architect and deploy scalable, intelligent systems. Our mission is to transform complex enterprise challenges into elegant, automated solutions leveraging cutting-edge deep learning.",
                "हम स्केलेबल, बुद्धिमान सिस्टम डिजाइन और तैनात करते हैं। हमारा मिशन जटिल उद्यम चुनौतियों को सुरुचिपूर्ण, स्वचालित समाधानों में बदलना है।",
                "वयं स्केलेबल, बुद्धिमान प्रबन्धयामः। अस्माकं लक्ष्यं समाधानम्।"
              )}
            </p>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
          {projects.map((project, index) => (
            <Link 
              key={index} 
              href={`/portfolio/${project.slug}`}
              className="glass-premium rounded-[3rem] border border-white/5 bg-background-dark/30 flex flex-col group hover:border-primary/40 transition-all duration-700 animate-slide-up overflow-hidden"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700"></div>
                
                <div className="absolute top-8 left-8 right-8 flex items-center justify-between z-20">
                  <span className="px-3 py-1 rounded-full bg-background-dark/80 backdrop-blur-md border border-white/10 text-primary text-[10px] font-display font-black tracking-widest uppercase">
                    {project.category}
                  </span>
                  <div className="size-10 rounded-xl bg-primary/20 backdrop-blur-md flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background-dark transition-all duration-500">
                    <span className="material-symbols-outlined text-2xl">arrow_outward</span>
                  </div>
                </div>
              </div>

              <div className="p-10 flex flex-col justify-between flex-1">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 text-slate-500 font-display font-black text-[9px] tracking-[0.2em] uppercase">
                    <span className="size-1.5 rounded-full bg-primary/40"></span>
                    CORPORATE DEPLOYMENT
                  </div>
                  <h3 className="text-white font-display text-3xl font-bold leading-tight group-hover:text-primary transition-colors duration-500">
                    {project.title}
                  </h3>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-slate-500 font-display font-bold text-[10px] tracking-widest uppercase group-hover:text-white transition-colors">
                    Explore Node
                  </span>
                  <div className="h-0.5 w-12 bg-white/5 group-hover:w-20 group-hover:bg-primary transition-all duration-500 rounded-full"></div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
