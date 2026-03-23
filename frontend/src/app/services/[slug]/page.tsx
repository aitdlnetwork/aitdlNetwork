// AITDL Network © 2026 | Vikram Samvat 2083
// Server component — handles generateMetadata for SEO, renders client UI

import type { Metadata } from 'next';
import { generateSEO } from '@/lib/seo/seo';
import ServicePageClient from './ServicePageClient';

/* ── Per-slug SEO metadata map ── */
const slugMeta: Record<string, { title: string; description: string }> = {
  "edtech-ecosystems": {
    title: "EdTech LMS & Education Management | AITDL Network",
    description: "Comprehensive LMS, virtual classrooms, automated fee collection, and student management software for schools and coaching institutes in India.",
  },
  "pos-retail": {
    title: "Next-Gen POS & Retail Billing Software | AITDL Network",
    description: "Fast barcode billing, GST invoicing, live inventory sync, and customer loyalty management system for Indian retailers and restaurants.",
  },
  "academic-automation": {
    title: "Academic Automation – Admissions & Exams | AITDL Network",
    description: "Paperless digital admission forms, auto mark-sheets, library management, and timetable generator for schools and colleges.",
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
    title: "Adaptive AI Self-Learning Platform for Students | AITDL Network",
    description: "AI-powered personalised study plans, adaptive quiz engine, and weakness detection for students and self-learners in India.",
  },
  "healthcare-clinic": {
    title: "Clinic & Healthcare Management Software India | AITDL Network",
    description: "Digital OPD, pharmacy billing, WhatsApp lab reports, ABHA integration, and appointment booking for clinics and hospitals in India.",
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

export default function ServicePage() {
  return <ServicePageClient />;
}
