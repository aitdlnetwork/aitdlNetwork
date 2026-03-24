/*
Ganitsutram | AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com |  https://www.aitdl.in
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

// AITDL Network © 2026 | Vikram Samvat 2083
// Services section layout — provides SEO metadata for the client-side services page

import type { Metadata } from 'next';
import { generateSEO } from '@/lib/seo/seo';

export const metadata: Metadata = generateSEO({
  title: 'Our Solutions | AITDL Network',
  description: 'Explore AITDL software solutions — LMS, POS, Healthcare, NGO, Real Estate, and AI learning platforms built for Indian businesses.',
  path: '/services',
  keywords: ['LMS software', 'POS system India', 'clinic management software', 'NGO ERP', 'school ERP India', 'real estate management software'],
});

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
