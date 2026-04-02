import MicroErpClient from './MicroErpClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Micro-ERP & Tools | Sovereign Business Node | AITDL Network',
  description: 'Manage your billing, purchases, and inventory entirely offline for free. Zero cloud fees, total privacy. A sovereign utility by AITDL Network.',
};

export default function MicroErpPage() {
  return <MicroErpClient />;
}
