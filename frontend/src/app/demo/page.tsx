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

export default function DemoOnboarding() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Form states mockup
  const [formData, setFormData] = useState({
    businessName: '',
    nodeRegion: 'US-East',
    throughput: 'Standard'
  });

  const handleNext = () => {
    if (step < 3) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep(prev => prev + 1);
      }, 1000);
    } else {
      setLoading(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    }
  };

  return (
    <div className="flex-1 w-full flex items-center justify-center px-6 py-12 z-10 relative animate-fade-in min-h-[75vh]">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none"></div>

      <div className="glass-card w-full max-w-xl p-8 rounded-2xl border border-white/5 bg-background-dark/40 flex flex-col gap-6 backdrop-blur-md relative">
        
        {/* Progress Bar Steps */}
        <div className="flex items-center justify-between mb-4 relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/5 -translate-y-1/2 z-0"></div>
          <div className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 z-0 transition-all duration-300" style={{ width: `${((step - 1) / 2) * 100}%` }}></div>
          
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex flex-col items-center gap-1 z-10">
              <div className={`size-8 rounded-full flex items-center justify-center font-display font-bold text-sm border-2 transition-all ${step >= num ? 'bg-primary text-background-dark border-primary' : 'bg-background-dark/80 text-slate-500 border-white/10'}`}>
                {num}
              </div>
              <span className={`text-[10px] font-display font-medium tracking-wider uppercase ${step >= num ? 'text-primary' : 'text-slate-600'}`}>
                {num === 1 ? 'Nodes' : num === 2 ? 'Compute' : 'Launch'}
              </span>
            </div>
          ))}
        </div>

        {/* Content Section */}
        <div className="flex flex-col gap-5 min-h-[160px]">
          {step === 1 && (
            <div className="flex flex-col gap-4 animate-fade-in">
              <h2 className="text-white font-display text-xl font-bold">Configure Node Endpoints</h2>
              <p className="text-slate-400 text-xs font-body">Define your initial infrastructure variables statically.</p>
              
              <div className="flex flex-col gap-1.5">
                <label className="text-slate-300 text-xs font-display font-medium px-1">Organization Node ID</label>
                <input 
                  type="text" 
                  placeholder="e.g., Enterprise Core"
                  value={formData.businessName}
                  onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                  className="w-full h-12 rounded-xl bg-white/5 border border-white/10 px-4 text-white text-sm font-body focus:outline-none focus:border-primary/50"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-4 animate-fade-in">
              <h2 className="text-white font-display text-xl font-bold">Select Compute Capacity</h2>
              <p className="text-slate-400 text-xs font-body">Scale throughput resources triggers allocates statically.</p>
              
              <div className="grid grid-cols-2 gap-4">
                {['Standard', 'Enterprise'].map((type) => (
                  <button 
                    key={type}
                    onClick={() => setFormData({...formData, throughput: type})}
                    className={`p-4 rounded-xl border flex flex-col gap-1 text-left transition-all ${formData.throughput === type ? 'border-primary bg-primary/10' : 'border-white/10 bg-white/5 hover:border-white/20'}`}
                  >
                    <span className="text-white font-display font-bold text-sm">{type} Buffer</span>
                    <span className="text-slate-400 text-[11px] font-body">{type === 'Standard' ? 'Multi-tenant node queries' : 'Sovereign dedicated stream allocation'}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col gap-4 animate-fade-in text-center items-center justify-center py-4">
              <div className="size-16 rounded-full bg-[#00FF9D]/10 flex items-center justify-center text-[#00FF9D] mb-2 animate-bounce">
                <span className="material-symbols-outlined text-3xl">verified</span>
              </div>
              <h2 className="text-white font-display text-xl font-bold">Node Forward Configuration Ready</h2>
              <p className="text-slate-400 text-xs font-body max-w-sm">Initialization variables complete. Secure forwarded triggers loop ready to dispatch to analytics dashboards.</p>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center gap-4 border-t border-white/5 pt-4">
          {step > 1 && (
            <button 
              onClick={() => setStep(prev => prev - 1)} 
              disabled={loading}
              className="px-6 h-12 rounded-xl border border-white/10 text-slate-300 font-display font-bold text-sm hover:bg-white/5 disabled:opacity-50"
            >
              Back
            </button>
          )}
          <button 
            onClick={handleNext} 
            disabled={loading || (step === 1 && !formData.businessName)}
            className="flex-1 h-12 rounded-xl bg-primary text-background-dark font-display font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary-light transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="size-5 border-2 border-background-dark/30 border-t-background-dark rounded-full animate-spin"></span>
            ) : (
              step === 3 ? 'Initialize Dashboard' : 'Next Configuration'
            )}
            <span className="material-symbols-outlined text-[18px]">{step === 3 ? 'rocket_launch' : 'east'}</span>
          </button>
        </div>

        {/* Watermark */}
        <div className="absolute bottom-6 right-8 text-white/10 font-display font-black text-[9px] tracking-[0.4em] uppercase pointer-events-none z-20 select-none">
          AITDL NETWORK
        </div>
      </div>
    </div>
  );
}
