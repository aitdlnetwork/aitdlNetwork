"use client";

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

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SEOHead from '@/components/SEOHead';

const blogPosts = [
  {
    slug: "choosing-lms-coaching-up",
    title: "Best LMS for Coaching Institutes in Uttar Pradesh: 2026 Guide",
    category: "EdTech",
    date: "March 24, 2026",
    readTime: "7 min read",
    description: "A comprehensive strategic blueprint for educational leadership in Gorakhpur and Lucknow to navigate the digital frontier securely and efficiently.",
    icon: "school",
    image: "/images/blog-lms-up.png"
  },
  {
    slug: "best-coaching-institute-software-gorakhpur",
    title: "Best Coaching Institute Software in Gorakhpur (2026): A Complete Guide",
    category: "EdTech",
    date: "March 25, 2026",
    readTime: "9 min read",
    description: "Discover how AITDL Network empowers institutes near Golghar and Civil Lines to automate fees, attendance and student records with sovereign local nodes.",
    icon: "location_on",
    image: "/images/blog-gorakhpur-edtech.png"
  },
  {
    slug: "gst-pos-retail-checklist",
    title: "GST Billing Software Checklist for Indian Retailers Using POS",
    category: "Retail",
    date: "March 23, 2026",
    readTime: "6 min read",
    description: "How to architecture absolute barcode billing nodes compliant with Indian GST laws maintaining inventory sync safeguards statically and securely.",
    icon: "shopping_cart",
    image: "/images/blog-gst-pos.png"
  },
  {
    slug: "sovereign-ai-enterprise-security",
    title: "What Is Local AI Software & Why Indian Businesses Need It in 2026",
    category: "AI & Security",
    date: "March 22, 2026",
    readTime: "8 min read",
    description: "An deep-dive exploration of data sandboxing and sovereign deep learning pipelines for secure enterprise knowledge architecture in the Indian context.",
    icon: "psychology",
    image: "/images/blog-sovereign-ai.png"
  }
];

export default function BlogConfig() {
  const pathname = usePathname();
  return (
    <div className="min-h-screen pt-32 pb-24 bg-mesh relative overflow-hidden">
      <SEOHead path={pathname} />
      <div className="absolute inset-0 bg-hero-glow pointer-events-none"></div>

      <div className="w-full max-w-[1200px] mx-auto px-6 relative z-10 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-display font-black text-[10px] tracking-[0.2em] uppercase mb-8">
            <span className="size-2 rounded-full bg-primary animate-pulse"></span>
            KNOWLEDGE HUB
          </div>
          <h1 className="font-display font-bold text-5xl md:text-7xl text-white mb-8 tracking-tight leading-[1.1]">
            <span className="text-gradient inline-block">Sovereign Insights</span> <br />
            <span className="text-gradient-primary inline-block">& Product Strategy</span>
          </h1>
          <p className="text-slate-400 text-xl font-body max-w-2xl leading-relaxed">
            Deep technical explores into edtech scalability, retail automation, and sovereign security nodes for the Indian digital frontier.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20">
          {blogPosts.map((post, idx) => (
            <Link 
              key={idx} 
              href={`/blog/${post.slug}`} 
              className="glass-premium rounded-[2.5rem] border border-white/5 bg-background-dark/30 flex flex-col group hover:border-primary/40 transition-all duration-700 animate-slide-up overflow-hidden"
              style={{ animationDelay: `${idx * 0.15}s` }}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700"></div>
                
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20">
                  <span className="px-3 py-1 rounded-full bg-background-dark/80 backdrop-blur-md border border-white/10 text-primary text-[10px] font-display font-black tracking-widest uppercase">
                    {post.category}
                  </span>
                  <div className="size-10 rounded-xl bg-primary/20 backdrop-blur-md flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-background-dark transition-all duration-500">
                    <span className="material-symbols-outlined text-2xl">{post.icon}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-8 flex flex-col justify-between flex-1">
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-slate-500 font-display font-bold text-[10px] tracking-widest uppercase">
                    <span>{post.date}</span>
                    <span className="size-1 rounded-full bg-slate-700"></span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="text-white font-display font-bold text-2xl leading-tight group-hover:text-primary transition-colors duration-500">
                    {post.title}
                  </h2>
                  <p className="text-slate-400 text-sm font-body leading-relaxed line-clamp-3">
                    {post.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className="text-white font-display font-black text-[11px] tracking-[0.2em] uppercase group-hover:text-primary transition-colors">
                    Access Post
                  </span>
                  <div className="size-12 rounded-2xl bg-white/5 flex items-center justify-center text-white border border-white/10 group-hover:bg-primary group-hover:text-background-dark group-hover:border-primary transition-all duration-500 -rotate-45 group-hover:rotate-0">
                    <span className="material-symbols-outlined">east</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
