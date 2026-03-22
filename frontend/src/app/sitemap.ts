// AITDL Network © 2026 | Vikram Samvat 2083
// Designed & Architected by JRM
// Auto-generated sitemap for Google indexing

import { MetadataRoute } from 'next';
import { SEO_CONFIG } from '@/lib/seo/config';

const BASE = SEO_CONFIG.siteUrl;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/services`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/portfolio`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ];

  // Dynamic service pages
  const serviceSlugs = [
    'edtech-ecosystems',
    'pos-retail',
    'academic-automation',
    'enterprise-cloud',
    'real-estate-erp',
    'ngo-society',
    'adaptive-ai',
    'healthcare-clinic',
  ];

  const servicePages: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${BASE}/services/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.85,
  }));

  return [...staticPages, ...servicePages];
}
