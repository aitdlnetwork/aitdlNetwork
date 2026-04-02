/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

"use client";

import dynamic from 'next/dynamic';

const MicroErpApp = dynamic(() => import('./MicroErpShell'), { 
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-[#0b0c16] flex flex-col items-center justify-center text-slate-400 font-display uppercase tracking-widest">
      <div className="size-16 border-t-2 border-primary border-solid rounded-full animate-spin mb-6"></div>
      Loading Sovereign Engine...
    </div>
  )
});

export default function MicroErpClient() {
  return <MicroErpApp />;
}
