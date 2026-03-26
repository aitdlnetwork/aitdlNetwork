/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com |  https://www.aitdl.in
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

import type { Metadata } from 'next';
import { generateSEO } from '@/lib/seo/seo';
import BlogClient from './BlogClient';

export const metadata: Metadata = generateSEO({
  title: 'EdTech & Business Software Insights | AITDL Network Blog',
  description: 'Deep dives into school software selection, GST billing for Indian retailers, and sovereign AI infrastructure for enterprise growth.',
  path: '/blog',
});

export default function BlogPage() {
  return <BlogClient />;
}
