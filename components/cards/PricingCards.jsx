"use client";
import React, { useState } from "react";
import { 
  Zap, Crown, Sparkles, 
  Shield, Activity, 
  Cpu, ChevronRight, Box
} from "lucide-react";
import { Space_Grotesk, Inter } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300", "500", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "600"] });

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      id: "UNIT_ALPHA",
      name: "Starter",
      icon: Zap,
      description: "Baseline telemetry for independent operations.",
      monthlyPrice: "29",
      annualPrice: "24",
      specs: [
        { label: "Active Nodes", val: "05" },
        { label: "Data Retention", val: "30_DAYS" },
        { label: "Bandwidth", val: "10_GB" },
        { label: "Support", val: "STD_TIER" }
      ],
      highlight: false
    },
    {
      id: "UNIT_BETA",
      name: "Professional",
      icon: Crown,
      description: "High-fidelity monitoring for scaling sectors.",
      monthlyPrice: "79",
      annualPrice: "64",
      specs: [
        { label: "Active Nodes", val: "UNLIMITED" },
        { label: "Data Retention", val: "365_DAYS" },
        { label: "Bandwidth", val: "100_GB" },
        { label: "Support", val: "PRIORITY_LINK" }
      ],
      highlight: true
    },
    {
      id: "UNIT_GAMMA",
      name: "Enterprise",
      icon: Sparkles,
      description: "Full-stack infrastructure for global combines.",
      monthlyPrice: "149",
      annualPrice: "119",
      specs: [
        { label: "Active Nodes", val: "GLOBAL" },
        { label: "Data Retention", val: "PERMANENT" },
        { label: "Bandwidth", val: "MAX_THROUGHPUT" },
        { label: "Support", val: "DEDICATED_OPS" }
      ],
      highlight: false
    },
  ];

  return (
    <div className={`relative min-h-screen overflow-hidden border-t border-white/5 bg-neutral-950 py-24 px-6 lg:px-12 ${inter.className}`}>
      
      {/* Background Grid & Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-900/10 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* --- INDUSTRIAL HEADER --- */}
        <div className="flex flex-col lg:flex-row items-end justify-between mb-24 gap-8">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-3">
              <Box className="w-4 h-4 text-green-500" />
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-green-500/80">
                Resource_Allocation_Protocol
              </span>
            </div>
            <h2 className={`text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-[0.9] text-white ${spaceGrotesk.className}`}>
              Scalable <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-700">Infrastructure.</span>
            </h2>
          </div>
          
          {/* Billing Switcher (Toggle Switch Style) */}
          <div className="flex items-center gap-4 bg-neutral-900/50 p-1 rounded-lg border border-white/10 backdrop-blur-md">
             <button 
               onClick={() => setIsAnnual(false)}
               className={`px-6 py-3 text-[10px] font-bold uppercase tracking-widest transition-all rounded-md ${
                 !isAnnual 
                   ? "bg-green-500 text-black shadow-[0_0_15px_rgba(34,197,94,0.4)]" 
                   : "text-neutral-400 hover:text-white"
               }`}
             >
               Monthly_Log
             </button>
             <button 
               onClick={() => setIsAnnual(true)}
               className={`px-6 py-3 text-[10px] font-bold uppercase tracking-widest transition-all rounded-md ${
                 isAnnual 
                   ? "bg-green-500 text-black shadow-[0_0_15px_rgba(34,197,94,0.4)]" 
                   : "text-neutral-400 hover:text-white"
               }`}
             >
               Annual_Log <span className="text-[9px] opacity-60 ml-1">[-20%]</span>
             </button>
          </div>
        </div>

        {/* --- PRICING GRID --- */}
        <div className="grid lg:grid-cols-3 gap-6">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative group transition-all duration-500 border rounded-xl overflow-hidden
                ${plan.highlight 
                  ? "bg-neutral-900/60 border-green-500/50 shadow-[0_0_40px_-10px_rgba(34,197,94,0.15)] transform md:-translate-y-4" 
                  : "bg-neutral-900/20 border-white/5 hover:border-white/20"
                }`}
            >
              {/* Badge for Popular */}
              {plan.highlight && (
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50" />
              )}

              {/* Technical Corner Markers */}
              <div className="absolute top-2 left-2 w-2 h-2 border-l border-t border-white/10 group-hover:border-green-500/50 transition-colors" />
              <div className="absolute bottom-2 right-2 w-2 h-2 border-r border-b border-white/10 group-hover:border-green-500/50 transition-colors" />

              <div className="p-8 h-full flex flex-col">
                <div className="flex justify-between items-start mb-8">
                  <span className="font-mono text-[9px] text-green-500/50 border border-green-500/20 px-2 py-1 rounded">
                    {plan.id}
                  </span>
                  <div className={`p-2 rounded-lg ${plan.highlight ? "bg-green-500/20 text-green-400" : "bg-white/5 text-neutral-400"}`}>
                    <plan.icon className="w-5 h-5" />
                  </div>
                </div>
                
                <h3 className={`text-3xl font-bold uppercase tracking-tight text-white mb-2 ${spaceGrotesk.className}`}>
                  {plan.name}
                </h3>
                <p className="text-xs text-neutral-400 font-mono min-h-[40px] mb-8 leading-relaxed">
                  {plan.description}
                </p>

                <div className="mb-8 p-4 bg-black/40 rounded border border-white/5">
                  <span className="font-mono text-[10px] text-neutral-500 block mb-1">CAPITAL_REQ // MONTHLY</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm font-bold text-green-500">$</span>
                    <span className={`text-5xl font-bold tracking-tighter text-white ${spaceGrotesk.className}`}>
                      {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-[10px] text-neutral-500 font-mono">/mo</span>
                  </div>
                </div>

                {/* Technical Specs Table */}
                <div className="space-y-3 mb-8 flex-1">
                  {plan.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0 group/line">
                      <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">{spec.label}</span>
                      <span className={`font-mono text-[11px] ${plan.highlight ? "text-green-400" : "text-neutral-300"}`}>
                        {spec.val}
                      </span>
                    </div>
                  ))}
                </div>

                <button className={`w-full py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 relative overflow-hidden group/btn rounded ${
                  plan.highlight 
                    ? "bg-green-500 text-black hover:bg-green-400" 
                    : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                }`}>
                  <span className="relative z-10">Initialize</span>
                  <ChevronRight className="w-3 h-3 relative z-10 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* --- SYSTEM TRUST BAR --- */}
        <div className="mt-24 rounded-2xl bg-neutral-900/30 border border-white/5 backdrop-blur-sm p-1">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/5">
            {[
                { icon: Shield, label: "Encryption_Std", val: "AES_256_GCM" },
                { icon: Activity, label: "SLA_Guarantee", val: "99.99_PCT" },
                { icon: Cpu, label: "Interface_Type", val: "REST_/_GRPC" }
            ].map((item, i) => (
                <div key={i} className="p-6 flex flex-col items-center justify-center gap-2 hover:bg-white/[0.02] transition-colors">
                    <item.icon className="w-5 h-5 text-green-500/50 mb-1" />
                    <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-neutral-500">{item.label}</div>
                    <div className={`text-sm font-mono font-bold text-white`}>{item.val}</div>
                </div>
            ))}
          </div>
        </div>

        {/* --- BOTTOM METADATA --- */}
        <div className="mt-12 text-center">
            <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-neutral-600">
                // System_Status: Operational // Region: Global_South_1
            </p>
        </div>
      </div>
    </div>
  );
}