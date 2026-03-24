/*
Ganitsutram | AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com |  https://www.aitdl.in
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

// AITDL Network © 2026 | Vikram Samvat 2083
// Designed & Architected by JRM

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

const projectData: Record<string, { 
  title: string; 
  category: string; 
  description: string; 
  challenge: string; 
  solution: string; 
  tags: string[]; 
  image: string;
  results: string[];
  features: string[];
}> = {
  "crm-dashboard": {
    title: "CRM Dashboard",
    category: "React / Node",
    description: "An enterprise-grade customer relationship management system with live analytics and automated lead tracking.",
    challenge: "Managing sales pipelines with legacy tools led to high lead leakage and delayed response times for representatives.",
    solution: "We designed a unified dashboard utilizing WebSockets for live feed updates, modular reporting structures, and automated follow-up triggers.",
    tags: ["React", "Node.js", "WebSockets", "Material UI"],
    image: "/images/portfolio_crm.png",
    results: [
      "No more lead leakages on support desk triggers",
      "Response times dropped from 24h setup to 1h average",
      "Unified pipeline analytics transparency boost",
      "SSO Securely federated backups synchronization loads",
      "Enterprise latency drop to sub-10ms latency buffers"
    ],
    features: [
      "Live lead tracker overview charts boards",
      "Offline compatibility synchronization",
      "Dynamic follow-up pipeline trigger loops",
      "Role-based node access controls setups",
      "Daily automated audit reports dispatch triggers",
      "Interactive analytics dashboard funnel streams"
    ]
  },
  "ai-chatbot": {
    title: "AI Chatbot System",
    category: "OpenAI / Python",
    description: "An intelligent support automated agent providing real-time queries answering with NLP tuning.",
    challenge: "Handling 10,000+ support tickets monthly with manually managed support desks creates unsustainable overhead costs.",
    solution: "Leveraged OpenAI LLM sets coupled with Pinecone vector DB queries for addressing domain-matched company document context reads fully automated.",
    tags: ["Python", "LangChain", "OpenAI", "Pinecone"],
    image: "/images/portfolio_chatbot.png",
    results: [
      "Supports 85% tickets resolution without human loop intervention",
      "Decreased support desk overhead dispatch costs by 50%",
      "Available 24/7 coverage sub-second query latency",
      "Multi-language sovereign model fallback support setup",
      "Zero-downtime scalability setups address allocations"
    ],
    features: [
      "RAG indexed company documentation vaults triggers",
      "Auto human-takeover ticket fallback loop dispatch",
      "Continuous NLP tuning triggers feedback dataset framing",
      "Continuous NLP tuning vectors synchronization setups",
      "Voice-to-text streams address allocations sets",
      "Fallback human routing automation dispatch triggers"
    ]
  },
  "business-website": {
    title: "Business Website",
    category: "Next.js / Tailwind",
    description: "High-conversion SEO optimized corporate workspace tailored for branding excellence.",
    challenge: "Original static pages loaded slowly and failed to rank across SERP results, missing organic client acquisitions effectively.",
    solution: "Built on Next.js setup combining Static Route generations for speed rendering coupled with Server-Side rendering for dynamic feeds hydration correctly.",
    tags: ["Next.js", "Tailwind CSS", "SEO", "Vercel"],
    image: "/images/portfolio_business.png",
    results: [
      "Lighthouse speeds performance benchmarks hit 98% avg scores",
      "Organic SEO traffic traffic multipliers up +200%",
      "Faster viewport hydrate times scale globally",
      "+200% Organic traffic trigger multipliers transparent",
      "100% Core Web Vitals score frames optimization rates"
    ],
    features: [
      "Static pages generation fallback configurations setup",
      "Tailwind pure speed layout triggers hydration framework",
      "Clean metadata tagging support index correctly",
      "A/B variant tests setup triggers dispatch pipelines",
      "CDN edge optimization static routers allocation",
      "Adaptive layout caching setups optimization setups"
    ]
  }
};

export async function generateStaticParams() {
  return [
    { slug: 'crm-dashboard' },
    { slug: 'ai-chatbot' },
    { slug: 'business-website' },
  ];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

import PortfolioPageClient from './PortfolioPageClient';

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  return <PortfolioPageClient slug={slug} />;
}

