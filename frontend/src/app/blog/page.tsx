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

const blogPosts = [
  {
    slug: "choosing-lms-coaching-up",
    title: "Selecting the Right LMS for Institutions in Uttar Pradesh",
    category: "EdTech",
    date: "March 24, 2026",
    readTime: "5 min read",
    description: "An absolute guide for coaching guides and institutions in Gorakhpur and Lucknow looking to digitize fee collection and student tracking safely.",
    icon: "school"
  },
  {
    slug: "gst-pos-retail-checklist",
    title: "GST Invoicing Checklist in POS for Indian Retailers",
    category: "Retail",
    date: "March 23, 2026",
    readTime: "4 min read",
    description: "How to configure absolute barcode billing nodes compliant with Indian GST laws maintaining inventory sync safeguards statically.",
    icon: "shopping_cart"
  },
  {
    slug: "sovereign-ai-enterprise-security",
    title: "Why Sovereign AI Nodes Matter for Enterprise Security",
    category: "AI & Security",
    date: "March 22, 2026",
    readTime: "6 min read",
    description: "Understanding data sandboxing and sovereign deep learning pipelines for secure enterprise knowledge architecture structures safely.",
    icon: "psychology"
  }
];

export default function BlogConfig() {
  return (
    <div className="flex-1 w-full max-w-[1200px] mx-auto px-6 py-12 flex flex-col justify-center z-10 relative animate-fade-in">
      {/* Header */}
      <div className="text-center mb-16 flex flex-col items-center">
        <span className="px-3 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary text-xs font-display font-bold tracking-wider mb-3">
          KNOWLEDGE CENTER
        </span>
        <h1 className="text-white font-display text-4xl md:text-5xl font-bold font-heading mb-4 leading-tight">
          Insights & Product Strategy
        </h1>
        <p className="text-muted text-lg font-body max-w-xl leading-relaxed">
          Deep dives into local enterprise scalability multipliers and smart software architectures.
        </p>
        <div className="h-1 w-20 bg-primary mt-6 rounded-full"></div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {blogPosts.map((post, idx) => (
          <Link key={idx} href={`/blog/${post.slug}`} className="glass-card p-6 rounded-2xl border border-white/5 bg-background-dark/20 flex flex-col justify-between hover:border-primary/40 transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex flex-col gap-4 relative z-10">
              <div className="flex items-center justify-between">
                <span className="px-2 py-1 rounded bg-primary/10 border border-primary/20 text-primary text-[10px] font-display font-semibold">
                  {post.category}
                </span>
                <span className="text-slate-500 text-[10px] font-body flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">schedule</span>
                  {post.readTime}
                </span>
              </div>

              <div className="flex items-center gap-3 mt-1">
                <div className="size-10 rounded-lg bg-white/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined">{post.icon}</span>
                </div>
                <h2 className="text-white font-display font-bold text-lg leading-snug group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
              </div>

              <p className="text-slate-400 text-sm font-body leading-relaxed line-clamp-3">
                {post.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-slate-500 text-xs font-body relative z-10">
              <span>{post.date}</span>
              <span className="text-primary font-display font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read More <span className="material-symbols-outlined text-[14px]">east</span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
