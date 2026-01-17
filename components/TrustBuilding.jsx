"use client";
import React, { useState, useEffect } from "react";
import { Users, TrendingUp, Shield, Activity, Target, Zap } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export default function AgriTrustSection() {
  const { isDark } = useTheme();
  const [animatedStats, setAnimatedStats] = useState({});

  useEffect(() => {
    const stats = [52000, 42.5, 100, 99.98];
    stats.forEach((target, idx) => {
      let current = 0;
      const duration = 1500; // 1.5 seconds
      const steps = 60;
      const increment = target / steps;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setAnimatedStats(prev => ({ 
          ...prev, 
          [idx]: target % 1 === 0 ? Math.floor(current) : current.toFixed(2) 
        }));
      }, duration / steps);
    });
  }, []);

  const trustCards = [
    { id: "LOG-001", icon: Users, title: "Livestock Managed", stat: animatedStats[0] || 0, suffix: "+", detail: "Real-time biometric tracking" },
    { id: "LOG-002", icon: TrendingUp, title: "Avg. Efficiency", stat: animatedStats[1] || 0, suffix: "%", detail: "Optimized resource allocation" },
    { id: "LOG-003", icon: Shield, title: "Data Integrity", stat: animatedStats[2] || 0, suffix: "%", detail: "End-to-end node encryption" },
    { id: "LOG-004", icon: Activity, title: "Network Uptime", stat: animatedStats[3] || 0, suffix: "%", detail: "Redundant server architecture" },
  ];

  const themeBorder = isDark ? "border-white/10" : "border-neutral-200";

  return (
    <section className={`relative w-full flex flex-col lg:flex-row min-h-[80vh] border-t ${themeBorder} ${isDark ? "bg-[#050505]" : "bg-white"}`}>
      
      {/* --- LEFT SIDE: THE DATA HUB --- */}
      <div className={`w-full lg:w-3/5 p-8 md:p-16 lg:p-24 border-r ${themeBorder} z-10`}>
        
        {/* Technical Header */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-12 bg-green-500"></div>
            <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-green-500 font-bold">
              Infrastructure Validation // V.04
            </span>
          </div>
          
          <h2 className={`text-6xl md:text-8xl font-bold uppercase tracking-tighter leading-[0.85] mb-8 ${isDark ? "text-white" : "text-black"}`}>
            Proven <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-600">At Scale.</span>
          </h2>
          
          <p className={`text-xl leading-relaxed max-w-lg font-light ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
            Our ERP infrastructure manages complex biological assets with <span className="text-green-500 font-medium italic">military-grade precision</span> and zero-latency reporting.
          </p>
        </div>

        {/* Stats Grid - Modern Brutalist */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-800/20 border border-neutral-800/20">
          {trustCards.map((card, idx) => (
            <div key={idx} className={`p-10 relative overflow-hidden group transition-all duration-500 ${isDark ? "bg-[#0a0a0a] hover:bg-neutral-900" : "bg-white hover:bg-neutral-50"}`}>
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-100 transition-opacity">
                 <card.icon className="w-5 h-5 text-green-500" />
              </div>

              <div className="relative z-10">
                <span className="font-mono text-[10px] text-neutral-500 block mb-6 tracking-widest">
                  {card.id}
                </span>
                <div className="flex items-baseline gap-1 mb-2">
                    <span className={`text-5xl md:text-6xl font-bold tracking-tighter ${isDark ? "text-white" : "text-black"}`}>
                        {Number(card.stat).toLocaleString()}
                    </span>
                    <span className="text-2xl text-green-500 font-bold">{card.suffix}</span>
                </div>
                <h3 className={`text-xs font-bold uppercase tracking-widest mb-1 ${isDark ? "text-white" : "text-black"}`}>
                  {card.title}
                </h3>
                <p className="text-[10px] uppercase tracking-wider text-neutral-500">
                  {card.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- RIGHT SIDE: CINEMATIC VISUALS --- */}
      <div className="w-full lg:w-2/5 flex flex-col relative overflow-hidden">
        
        {/* Panel 1 */}
        <div className="flex-1 relative group overflow-hidden border-b border-white/10">
          <img 
            src="https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=2000" 
            alt="Hardware"
            className="absolute inset-0 w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 scale-110 group-hover:scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
          
          <div className="absolute bottom-8 left-8 flex items-center gap-4">
             <div className="p-3 backdrop-blur-md bg-black/40 border border-white/10">
                <Target className="w-5 h-5 text-green-400" />
             </div>
             <div>
                <p className="text-[9px] font-mono text-green-400 uppercase tracking-widest">Figure 01.A</p>
                <p className="text-xs font-bold text-white uppercase tracking-wider">Precision Telemetry</p>
             </div>
          </div>
        </div>

        {/* Panel 2 */}
        <div className="flex-1 relative group overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000" 
            alt="Field Data"
            className="absolute inset-0 w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 scale-110 group-hover:scale-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

          <div className="absolute bottom-8 left-8 flex items-center gap-4">
             <div className="p-3 backdrop-blur-md bg-black/40 border border-white/10">
                <Zap className="w-5 h-5 text-green-400" />
             </div>
             <div>
                <p className="text-[9px] font-mono text-green-400 uppercase tracking-widest">Figure 01.B</p>
                <p className="text-xs font-bold text-white uppercase tracking-wider">Operational Integrity</p>
             </div>
          </div>
        </div>

        {/* Scanning Line Animation */}
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
            <div className="w-full h-[2px] bg-green-500/30 blur-sm absolute top-0 animate-scan"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(0vh); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        .animate-scan {
          animation: scan 4s linear infinite;
        }
      `}</style>
    </section>
  );
}