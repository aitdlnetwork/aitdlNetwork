/*
AITDL Network © 2026 | Vikram Samvat 2083
Author: Antigravity AI
*/

import React from 'react';

interface RevenueChartProps {
  data: { month: string; amount: number }[];
  height?: number;
}

export default function RevenueChart({ data, height = 200 }: RevenueChartProps) {
  if (!data || data.length === 0) return null;

  const maxAmount = Math.max(...data.map(d => d.amount));
  const padding = 40;
  const chartWidth = 600;
  const chartHeight = height;
  
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * (chartWidth - padding * 2) + padding;
    const y = chartHeight - (d.amount / maxAmount) * (chartHeight - padding * 2) - padding;
    return { x, y };
  });

  const pathD = `M ${points[0].x} ${points[0].y} ` + 
    points.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ');

  const areaD = `${pathD} L ${points[points.length - 1].x} ${chartHeight - padding} L ${points[0].x} ${chartHeight - padding} Z`;

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex justify-between items-end mb-2">
        <div>
          <h4 className="text-white font-display font-bold text-sm">Revenue Trajectory</h4>
          <p className="text-slate-500 text-[10px] font-body uppercase tracking-widest">Sovereign Node Performance</p>
        </div>
        <div className="text-right">
          <span className="text-[#00FF9D] font-display font-bold text-lg">₹{maxAmount.toLocaleString('en-IN')}</span>
          <p className="text-slate-500 text-[10px] font-body uppercase tracking-widest">Peak Node Yield</p>
        </div>
      </div>
      
      <div className="relative flex-1 min-h-[150px]">
        <svg 
          viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
          className="w-full h-full overflow-visible"
        >
          {/* Grid Lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((p, i) => {
            const y = chartHeight - padding - p * (chartHeight - padding * 2);
            return (
              <line 
                key={i} 
                x1={padding} y1={y} x2={chartWidth - padding} y2={y} 
                stroke="white" strokeOpacity="0.05" strokeWidth="1" 
              />
            );
          })}

          {/* Area Fill */}
          <path 
            d={areaD} 
            fill="url(#revenueGradient)" 
            className="animate-pulse-slow"
          />
          
          {/* Line Path */}
          <path 
            d={pathD} 
            fill="none" 
            stroke="var(--color-primary)" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className="drop-shadow-[0_0_8px_rgba(0,211,211,0.5)]"
          />

          {/* Data Points */}
          {points.map((p, i) => (
            <circle 
              key={i} 
              cx={p.x} cy={p.y} r="4" 
              fill="var(--color-background-dark)" 
              stroke="var(--color-primary)" 
              strokeWidth="2" 
              className="hover:r-6 cursor-pointer transition-all"
            />
          ))}

          {/* Labels */}
          {data.map((d, i) => {
            const x = (i / (data.length - 1)) * (chartWidth - padding * 2) + padding;
            return (
              <text 
                key={i} 
                x={x} y={chartHeight - 10} 
                fill="currentColor" 
                className="text-slate-600 font-mono text-[10px]" 
                textAnchor="middle"
              >
                {d.month}
              </text>
            );
          })}

          <defs>
            <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}
