/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Antigravity AI
*/

import React, { useState } from 'react';

interface ProfileProps {
  user: {
    name: string;
    email: string;
    role: string;
    avatar_url?: string;
  };
}

export default function ProfileView({ user }: ProfileProps) {
  const [rotating, setRotating] = useState(false);
  const [rotated, setRotated] = useState(false);

  const rotateKey = async () => {
    setRotating(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    setRotating(false);
    setRotated(true);
    setTimeout(() => setRotated(false), 3000);
  };
  return (
    <div className="glass-card p-6 rounded-xl border border-white/5 bg-background-dark/30 flex flex-col gap-6 animate-fade-in">
      <div className="flex items-center gap-4 border-b border-white/5 pb-5">
        <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold font-display border border-primary/20">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="text-white font-display text-xl font-bold tracking-tight">{user.name}</h2>
          <p className="text-slate-400 text-sm font-body">{user.email}</p>
          <span className="inline-block mt-1 text-[10px] uppercase tracking-wider font-bold bg-primary/20 text-primary px-2.5 py-1 rounded-full border border-primary/30">
            • {user.role} account
          </span>
        </div>
      </div>
      
      <div className="flex flex-col gap-4">
        <h3 className="text-slate-300 font-display text-xs font-bold uppercase tracking-widest">Sovereign Asset Node</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div className="border border-white/5 p-4 rounded-xl bg-white/5 flex flex-col gap-1 hover:bg-white/10 transition-all cursor-pointer">
            <span className="text-slate-500 font-body text-xs">Authorized Clearance</span>
            <span className="text-white font-medium font-display tracking-wide">{user.role.toUpperCase()}</span>
          </div>
          <div className="border border-white/5 p-4 rounded-xl bg-white/5 flex flex-col gap-1 hover:bg-white/10 transition-all cursor-pointer">
            <span className="text-slate-500 font-body text-xs">Node CID Identifier</span>
            <span className="text-white font-mono text-xs tracking-tight text-primary-light">AITDL-NODE-SEC-2083</span>
          </div>
        </div>

        <button 
          onClick={rotateKey}
          disabled={rotating}
          className={`w-full p-3 rounded-lg border transition-all duration-300 text-center mt-2 text-xs font-medium font-display ${
            rotated 
              ? 'bg-[#00FF9D]/10 border-[#00FF9D]/30 text-[#00FF9D]' 
              : 'border-primary/10 hover:border-primary/40 bg-primary/5 text-primary'
          }`}
        >
          {rotating ? 'Generating New Cipher Seed...' : rotated ? 'Cipher Key Successfully Rotated' : 'Request Cipher Key Rotation'}
        </button>
      </div>
    </div>
  );
}
