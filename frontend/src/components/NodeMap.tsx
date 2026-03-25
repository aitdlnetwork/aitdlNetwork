/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n/I18nContext';

interface NodePoint {
  id: string;
  name: string;
  location: string;
  top: string;
  left: string;
  details: string;
  hindiDetails: string;
}

const nodes: NodePoint[] = [
  {
    id: 'gkp',
    name: 'Gorakhpur Node',
    location: 'Golghar, Gorakhpur',
    top: '36%',
    left: '63%',
    details: '21+ Years Engineering Legacy | EdTech Central Hub',
    hindiDetails: '21+ वर्षों की इंजीनियरिंग विरासत | एडटेक केंद्रीय हब'
  },
  {
    id: 'mum',
    name: 'Mumbai Node',
    location: 'Andheri East, Mumbai',
    top: '66%',
    left: '24%',
    details: 'Financial Tech & Enterprise SaaS Node',
    hindiDetails: 'फिनटेक और एंटरप्राइज साॅस नोड'
  }
];

export default function NodeMap() {
  const { language } = useI18n();
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <div className="relative w-full aspect-[16/10] max-w-4xl mx-auto glass-premium rounded-[3rem] overflow-hidden border border-white/10 group cursor-crosshair">
       {/* Background Map Image */}
      <Image 
        src="/images/india-map.png" 
        alt="Regional Node Map" 
        fill 
        className="object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-1000"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent"></div>

      {/* Nodes Overlay */}
      <div className="absolute inset-0 z-10">
        {nodes.map((node) => (
          <div 
            key={node.id}
            className="absolute group/node"
            style={{ top: node.top, left: node.left }}
            onMouseEnter={() => setActiveNode(node.id)}
            onMouseLeave={() => setActiveNode(null)}
          >
            {/* Pulse Indicator */}
            <div className="relative">
               <div className="absolute inset-0 size-4 bg-primary rounded-full animate-ping opacity-20"></div>
               <div className="size-4 bg-primary rounded-full shadow-[0_0_15px_rgba(13,227,242,0.8)] border-2 border-white/20 relative z-10 transition-transform duration-500 group-hover/node:scale-150"></div>
            </div>

            {/* Tooltip */}
            <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-64 glass-premium p-4 rounded-2xl border border-white/20 transition-all duration-500 ${activeNode === node.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
              <div className="flex flex-col gap-1">
                <span className="text-primary font-display font-black text-[9px] tracking-[0.2em] uppercase">SYSTEMS ACTIVE</span>
                <h4 className="text-white font-display font-bold text-sm tracking-tight">{node.name}</h4>
                <p className="text-slate-400 text-[10px] font-body mb-2">{node.location}</p>
                <div className="h-px w-full bg-white/10 mb-2"></div>
                <p className="text-white/80 text-[10px] font-body leading-relaxed">
                  {language === 'hi' ? node.hindiDetails : node.details}
                </p>
                <div className="mt-2 flex items-center gap-2">
                   <span className="size-1 rounded-full bg-[#00FF9D]"></span>
                   <span className="text-[8px] font-display font-black text-[#00FF9D] uppercase tracking-[0.1em]">Verification Level 4 Passed</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Map Meta Labels */}
      <div className="absolute top-10 left-10 flex flex-col gap-2 pointer-events-none">
        <h3 className="text-white font-display font-black text-xs tracking-[0.3em] uppercase opacity-40">NATIONAL INFRASTRUCTURE</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-primary animate-pulse-subtle"></span>
            <span className="text-[9px] font-display font-black text-slate-500 uppercase tracking-widest">2 PRIMARY NODES</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[#00FF9D]"></span>
            <span className="text-[9px] font-display font-black text-slate-500 uppercase tracking-widest">UPTIME 99.9%</span>
          </div>
        </div>
      </div>

      {/* Watermark */}
      <div className="absolute bottom-6 right-8 text-white/20 font-display font-black text-xs tracking-[0.5em] uppercase pointer-events-none z-20 select-none">
        AITDL NETWORK
      </div>
    </div>
  );
}
