/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com |  https://www.aitdl.in
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

import type { Metadata } from 'next';
import { generateSEO } from '@/lib/seo/seo';
import ServicesClient from './ServicesClient';

export const metadata: Metadata = generateSEO({
  title: 'EdTech LMS, School Software & POS Solutions | AITDL Network',
  description: "Explore AITDL Network's full suite: EdTech ecosystems, coaching LMS, POS billing, gym management, NGO portals and adaptive AI learning for Indian businesses.",
  path: '/services',
});

export default function ServicesPage() {
  return <ServicesClient />;
}
