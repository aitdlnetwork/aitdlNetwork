/*
Ganitsutram | AITDL Network © 2026 | Vikram Samvat 2083
Author: Jawahar R Mallah
Website: https://www.aitdl.com |  https://www.aitdl.in
Contact: aitdlnetwork@outlook.com | jawahar.mallah@gmail.com
*/

// AITDL Network © 2026 | Vikram Samvat 2083
// Designed & Architected by JRM

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate direct forward to dashboard statically
    setTimeout(() => {
      router.push('/dashboard');
    }, 1200);
  };

  return (
    <div className="flex-1 w-full flex items-center justify-center px-6 py-12 z-10 relative animate-fade-in min-h-[70vh]">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none"></div>

      <div className="glass-card w-full max-w-md p-8 rounded-2xl border border-white/5 bg-background-dark/40 flex flex-col gap-6 backdrop-blur-md relative">
        <div className="flex flex-col gap-2 text-center mb-2">
          <h1 className="text-white font-display text-2xl font-bold tracking-tight">Client Node Entrance</h1>
          <p className="text-slate-400 text-sm font-body">Sign in with sovereign infrastructure keys</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-slate-300 text-xs font-display font-medium px-1">Email Node Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white text-sm font-body placeholder-slate-600 focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between px-1">
              <label className="text-slate-300 text-xs font-display font-medium">Access Cipher</label>
              <button type="button" className="text-primary text-[11px] font-medium hover:underline">Forgot?</button>
            </div>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white text-sm font-body placeholder-slate-600 focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full h-12 rounded-xl bg-primary text-background-dark font-display font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary-light transition-all duration-200 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="size-5 border-2 border-background-dark/30 border-t-background-dark rounded-full animate-spin"></span>
            ) : (
              <>Initialize Access <span className="material-symbols-outlined text-[18px]">lock_open</span></>
            )}
          </button>
        </form>

        <div className="border-t border-white/5 pt-4 text-center">
          <p className="text-slate-500 text-xs">
            Direct Mock Access:  
            <button onClick={() => router.push('/dashboard')} className="text-primary font-medium hover:underline ml-1">
              Bypass Auth Pipeline
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
