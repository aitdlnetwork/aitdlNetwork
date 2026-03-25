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
    title: "Best LMS for Coaching Institutes in Uttar Pradesh: 2026 Guide",
    category: "EdTech",
    date: "March 24, 2026",
    readTime: "7 min read",
    description: "A comprehensive strategic blueprint for educational leadership in Gorakhpur and Lucknow to navigate the digital frontier securely and efficiently.",
    icon: "school"
  },
  {
    slug: "best-coaching-institute-software-gorakhpur",
    title: "Best Coaching Institute Software in Gorakhpur (2026): A Complete Guide",
    category: "EdTech",
    date: "March 25, 2026",
    readTime: "9 min read",
    description: "Discover how AITDL Network empowers institutes near Golghar and Civil Lines to automate fees, attendance and student records with sovereign local nodes.",
    icon: "location_on"
  },
  {
    slug: "gst-pos-retail-checklist",
    title: "GST Billing Software Checklist for Indian Retailers Using POS",
    category: "Retail",
    date: "March 23, 2026",
    readTime: "6 min read",
    description: "How to architecture absolute barcode billing nodes compliant with Indian GST laws maintaining inventory sync safeguards statically and securely.",
    icon: "shopping_cart"
  },
  {
    slug: "sovereign-ai-enterprise-security",
    title: "What Is Local AI Software & Why Indian Businesses Need It in 2026",
    category: "AI & Security",
    date: "March 22, 2026",
    readTime: "8 min read",
    description: "An deep-dive exploration of data sandboxing and sovereign deep learning pipelines for secure enterprise knowledge architecture in the Indian context.",
    icon: "psychology"
  }
];

import { Metadata } from 'next';
import { generateSEO } from '@/lib/seo/seo';

export const metadata: Metadata = generateSEO({
  title: "EdTech & Business Software Insights — AITDL Knowledge Centre",
  description: "Expert guides on school ERP, coaching software, GST billing & AI in education. Practical tips for institutes and businesses across India.",
  path: "/blog",
  keywords: ["edtech software blog India", "coaching software guide", "school ERP tips", "GST billing India"]
});

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
