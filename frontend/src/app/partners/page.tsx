/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

import type { Metadata } from 'next';
import { generateSEO } from '@/lib/seo/seo';
import PartnersClient from './PartnersClient';

export const metadata: Metadata = generateSEO({
  title: "Partner with AITDL — Global EdTech & Software Distribution",
  description: "Join AITDL Network's global partner program. Become a technical, referral or enterprise partner for next-gen school ERP and business software.",
  path: "/partners",
  keywords: ["software partnership India", "edtech reseller", "school ERP distributor", "AITDL partners"]
});

export default function PartnersPage() {
  return <PartnersClient />;
}
