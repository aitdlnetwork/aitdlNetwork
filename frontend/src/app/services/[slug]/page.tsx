/*
Ganitsutram | AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com |  https://www.aitdl.in
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

// AITDL Network © 2026 | Vikram Samvat 2083
// Server component — handles generateMetadata for SEO, renders client UI

import type { Metadata } from 'next';
import { generateSEO } from '@/lib/seo/seo';
import ServicePageClient from './ServicePageClient';

/* ── Per-slug SEO metadata map ── */
const slugMeta: Record<string, { title: string; description: string }> = {
  "edtech-ecosystems": {
    title: "LMS & Student Management Software for Coaching Institutes | AITDL",
    description: "Manage students, fees, batches & attendance with AITDL's LMS. Built for coaching centres and schools in Gorakhpur, Mumbai & Pune. Free demo available.",
  },
  "pos-retail": {
    title: "GST Billing Software Checklist for Indian Retailers Using POS | AITDL",
    description: "Fast barcode billing, GST invoicing, live inventory sync, and customer loyalty management system for Indian retailers and restaurants.",
  },
  "academic-automation": {
    title: "School Automation Software — Digital Admissions & Mark-sheets | AITDL",
    description: "Go paperless with AITDL's academic automation — digital admissions, automated mark-sheets, library & certificate management for schools across India.",
  },
  "enterprise-cloud": {
    title: "Enterprise Cloud Hosting & Infrastructure | AITDL Network",
    description: "99.99% uptime cloud hosting with WAF firewall, auto-scaling, encrypted backups, and CDN delivery for Indian portals.",
  },
  "real-estate-erp": {
    title: "Real Estate & Property Management ERP | AITDL Network",
    description: "Tenant portals, online rent collection, maintenance ticketing, and lease management system for property owners and builders in India.",
  },
  "ngo-society": {
    title: "NGO & Housing Society Management Software | AITDL Network",
    description: "Online maintenance billing, donor CRM, digital voting, and member portals for RWAs, NGOs, and housing societies in India.",
  },
  "adaptive-ai": {
    title: "AI-Powered Adaptive Learning Software for Students | AITDL",
    description: "Personalised AI study plans, smart quizzes & weakness detection for students. AITDL's adaptive learning system helps coaching institutes improve results.",
  },
  "healthcare-clinic": {
    title: "Clinic & Healthcare Management Software India | AITDL Network",
    description: "Digital OPD, pharmacy billing, WhatsApp lab reports, ABHA integration, and appointment booking for clinics and hospitals in India.",
  },
  "gym-fitness": {
    title: "Gym & Fitness Management Software | AITDL Network",
    description: "Membership management, automated fee alerts, attendance tracking, and trainer scheduling software for gyms and fitness centers in India.",
  },
  "hiking-trekking": {
    title: "Hiking, Trekking & Tour Booking Software | AITDL Network",
    description: "Online booking management, equipment rental inventory, safety alerts, and guide allocation system for outdoor adventure operators in India.",
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const meta = slugMeta[slug];

  if (!meta) {
    return generateSEO({
      title: `${slug.replace(/-/g, ' ')} | AITDL Network`,
      description: 'Explore this solution from AITDL Network — smart software for Indian businesses.',
      path: `/services/${slug}`,
    });
  }

  return generateSEO({
    title: meta.title,
    description: meta.description,
    path: `/services/${slug}`,
  });
}

export async function generateStaticParams() {
  return Object.keys(slugMeta).map((slug) => ({ slug }));
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  return <ServicePageClient slug={slug} />;
}
