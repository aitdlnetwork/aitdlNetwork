/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

import type { Metadata } from 'next';
import { generateSEO } from '@/lib/seo/seo';
import AboutClient from './AboutClient';

export const metadata: Metadata = generateSEO({
  title: "About AITDL Network — EdTech & Business Software Company India",
  description: "AITDL Network builds smart ERP, LMS & POS software for education and business. Trusted by 50+ live deployments across Mumbai, Pune and Gorakhpur.",
  path: "/about",
  keywords: ["edtech software company India", "institute management company", "software for schools India", "AITDL about"]
});

export default function AboutPage() {
  return <AboutClient />;
}
