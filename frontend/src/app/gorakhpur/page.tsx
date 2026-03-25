/*
Ganitsutram | AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com |  https://www.aitdl.in
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

import type { Metadata } from 'next';
import React from 'react';
import GorakhpurClient from './GorakhpurClient';

export const metadata: Metadata = {
  title: 'Coaching Institute Software in Gorakhpur | LMS & POS — AITDL',
  description: 'AITDL provides specialized institute management software, school ERP, and POS billing for coaching centres and retailers in Gorakhpur and Golghar.',
  keywords: ['coaching software Gorakhpur', 'LMS Gorakhpur', 'POS billing Gorakhpur', 'school ERP UP'],
};

export default function GorakhpurPage() {
  return <GorakhpurClient />;
}
