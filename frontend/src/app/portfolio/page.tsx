// AITDL Network © 2026 | Vikram Samvat 2083
// Designed & Architected by JRM

import React from 'react';
import Link from 'next/link';

export default function Portfolio() {
  const projects = [
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
  ];

  return (
    <div className="flex-1 w-full max-w-[1200px] mx-auto px-6 py-12 flex flex-col justify-center z-10 relative animate-fade-in">
      <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-20 mb-12">
        {/* About Section */}
        <div className="flex flex-col gap-6 max-w-2xl">
          <h1 className="text-white font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
            AI-First. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-muted">Future-Ready.</span>
          </h1>
          <p className="text-muted text-lg md:text-xl font-body leading-relaxed max-w-xl">
            We architect and deploy scalable, intelligent systems. Our mission is to transform complex enterprise challenges into elegant, automated solutions leveraging cutting-edge deep learning and modern software practices.
          </p>
          <div className="flex items-center gap-4 mt-4">
            <div className="h-[1px] w-12 bg-primary/50"></div>
            <span className="text-primary font-display text-sm tracking-widest uppercase">Select Deployments</span>
          </div>
        </div>
      </div>

      {/* Portfolio Carousel Container */}
      <div className="relative w-full pb-10">
        <div className="absolute right-0 top-0 bottom-10 w-24 bg-gradient-to-l from-background-dark to-transparent z-20 pointer-events-none hidden md:block"></div>
        
        <div className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory gap-6 md:gap-8 pb-8 py-4">
          {projects.map((project, index) => (
            <Link 
              key={index} 
              href={`/portfolio/${project.slug}`}
              className="group snap-start flex-none w-[320px] md:w-[400px] flex flex-col gap-5 glass-card rounded-xl p-4 md:p-5 transition-all duration-300 hover:border-primary/50 cursor-pointer relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <div className="w-full aspect-video rounded-lg overflow-hidden bg-[#111827] relative border border-white/5">
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105" style={{backgroundImage: `url('${project.image}')`}}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent opacity-60"></div>
              </div>
              <div className="flex flex-col gap-2 z-10">
                <h3 className="text-white font-display text-xl font-bold leading-tight group-hover:text-primary transition-colors">{project.title}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-xs font-display font-bold tracking-wide">{project.category}</span>
                  <span className="material-symbols-outlined text-muted group-hover:text-primary transition-colors text-xl">arrow_outward</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
