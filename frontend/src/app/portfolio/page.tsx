/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com |  https://www.aitdl.in
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

import type { Metadata } from 'next';
import { generateSEO } from '@/lib/seo/seo';
import PortfolioClient from './PortfolioClient';

export const metadata: Metadata = generateSEO({
  title: 'Deployed Projects & Client Systems | AITDL Network Portfolio',
  description: 'View live deployments by AITDL Network — school management systems, coaching software, retail POS and more across India.',
  path: '/portfolio',
});

export default function PortfolioPage() {
  return <PortfolioClient />;
}
