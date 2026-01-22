"use client";
import React, { useState } from "react";
import { 
  Zap, Crown, Sparkles, 
  Shield, Activity, 
  Cpu, ChevronRight, Box
} from "lucide-react";
import { Space_Grotesk, Inter } from "next/font/google";
import { useTheme } from "@/context/ThemeContext";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300", "500", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "600"] });

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const { isDark } = useTheme();

 const plans = [
    {
      id: "UNIT_ALPHA",
      name: "Starter",
      icon: Zap,
      description: "Perfect for individuals and small projects",
      monthlyPrice: "29",
      annualPrice: "24",
      specs: [
        { label: "Core Features", val: "ACCESS" },
        { label: "Email Support", val: "INCLUDED" },
        { label: "Team Members", val: "UP_TO_5" },
        { label: "Storage", val: "10_GB" }
      ],
      highlight: false
    },
    {
      id: "UNIT_BETA",
      name: "Professional",
      icon: Crown,
      description: "Most popular for growing teams",
      monthlyPrice: "79",
      annualPrice: "64",
      specs: [
        { label: "All Starter", val: "PLUS" },
        { label: "Priority Support", val: "24/7" },
        { label: "Team Members", val: "UNLIMITED" },
        { label: "Storage", val: "100_GB" }
      ],
      highlight: true
    },
    {
      id: "UNIT_GAMMA",
      name: "Enterprise",
      icon: Sparkles,
      description: "Ultimate power for large organizations",
      monthlyPrice: "149",
      annualPrice: "119",
      specs: [
        { label: "All Professional", val: "PLUS" },
        { label: "Account Manager", val: "DEDICATED" },
        { label: "Integrations", val: "CUSTOM_API" },
        { label: "Storage", val: "UNLIMITED" }
      ],
      highlight: false
    },
  ];

  return (
    <div className={`relative min-h-screen overflow-hidden border-t py-24 px-6 lg:px-12 ${inter.className} ${
      isDark 
        ? "border-white/5 bg-neutral-950"
        : "border-neutral-200 bg-white"
    }`}>
      
      {/* Background Grid & Glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] ${
          isDark ? "" : "opacity-30"
        }`} />
        <div className={`absolute top-0 right-0 w-[500px] h-[500px] blur-[100px] rounded-full ${
          isDark ? "bg-green-900/10" : "bg-green-900/5"
        }`} />
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
            <h2 className={`text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-[0.9] ${spaceGrotesk.className} ${
              isDark ? "text-white" : "text-black"
            }`}>
              Scalable <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-green-700">Infrastructure.</span>
            </h2>
          </div>
          
          {/* Billing Switcher (Toggle Switch Style) */}
          <div className={`flex items-center gap-4 p-1 rounded-lg border backdrop-blur-md ${
            isDark
              ? "bg-neutral-900/50 border-white/10"
              : "bg-white/50 border-neutral-200"
          }`}>
             <button 
               onClick={() => setIsAnnual(false)}
               className={`px-6 py-3 text-[10px] font-bold uppercase tracking-widest transition-all rounded-md ${
                 !isAnnual 
                   ? "bg-green-500 text-black shadow-[0_0_15px_rgba(34,197,94,0.4)]" 
                   : isDark
                     ? "text-neutral-400 hover:text-white"
                     : "text-neutral-500 hover:text-black"
               }`}
             >
               Monthly_Log
             </button>
             <button 
               onClick={() => setIsAnnual(true)}
               className={`px-6 py-3 text-[10px] font-bold uppercase tracking-widest transition-all rounded-md ${
                 isAnnual 
                   ? "bg-green-500 text-black shadow-[0_0_15px_rgba(34,197,94,0.4)]" 
                   : isDark
                     ? "text-neutral-400 hover:text-white"
                     : "text-neutral-500 hover:text-black"
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
              className={`relative group transition-all duration-500 border rounded-xl overflow-hidden ${
                plan.highlight 
                  ? isDark
                    ? "bg-neutral-900/60 border-green-500/50 shadow-[0_0_40px_-10px_rgba(34,197,94,0.15)] transform md:-translate-y-4"
                    : "bg-white border-green-500/60 shadow-[0_0_40px_-10px_rgba(34,197,94,0.25)] transform md:-translate-y-4"
                  : isDark
                    ? "bg-neutral-900/20 border-white/5 hover:border-white/20"
                    : "bg-white border-neutral-200 hover:border-neutral-300"
              }`}
            >
              {/* Badge for Popular */}
              {plan.highlight && (
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-50" />
              )}

              {/* Technical Corner Markers */}
              <div className={`absolute top-2 left-2 w-2 h-2 border-l border-t transition-colors ${
                isDark
                  ? "border-white/10 group-hover:border-green-500/50"
                  : "border-neutral-200 group-hover:border-green-500/50"
              }`} />
              <div className={`absolute bottom-2 right-2 w-2 h-2 border-r border-b transition-colors ${
                isDark
                  ? "border-white/10 group-hover:border-green-500/50"
                  : "border-neutral-200 group-hover:border-green-500/50"
              }`} />

              <div className="p-8 h-full flex flex-col">
                <div className="flex justify-between items-start mb-8">
                  <span className={`font-mono text-[9px] border px-2 py-1 rounded ${
                    isDark
                      ? "text-green-500/50 border-green-500/20"
                      : "text-green-600/70 border-green-500/30"
                  }`}>
                    {plan.id}
                  </span>
                  <div className={`p-2 rounded-lg ${
                    plan.highlight 
                      ? "bg-green-500/20 text-green-400" 
                      : isDark
                        ? "bg-white/5 text-neutral-400"
                        : "bg-neutral-100 text-neutral-500"
                  }`}>
                    <plan.icon className="w-5 h-5" />
                  </div>
                </div>
                
                <h3 className={`text-3xl font-bold uppercase tracking-tight mb-2 ${spaceGrotesk.className} ${
                  isDark ? "text-white" : "text-black"
                }`}>
                  {plan.name}
                </h3>
                <p className={`text-xs font-mono min-h-[40px] mb-8 leading-relaxed ${
                  isDark ? "text-neutral-400" : "text-neutral-600"
                }`}>
                  {plan.description}
                </p>

                <div className={`mb-8 p-4 rounded border ${
                  isDark
                    ? "bg-black/40 border-white/5"
                    : "bg-neutral-50 border-neutral-200"
                }`}>
                  <span className={`font-mono text-[10px] block mb-1 ${
                    isDark ? "text-neutral-500" : "text-neutral-400"
                  }`}>CAPITAL_REQ // MONTHLY</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm font-bold text-green-500">$</span>
                    <span className={`text-5xl font-bold tracking-tighter ${spaceGrotesk.className} ${
                      isDark ? "text-white" : "text-black"
                    }`}>
                      {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span className={`text-[10px] font-mono ${
                      isDark ? "text-neutral-500" : "text-neutral-400"
                    }`}>/mo</span>
                  </div>
                </div>

                {/* Technical Specs Table */}
                <div className="space-y-3 mb-8 flex-1">
                  {plan.specs.map((spec, sIdx) => (
                    <div key={sIdx} className={`flex justify-between items-center border-b pb-2 last:border-0 group/line ${
                      isDark ? "border-white/5" : "border-neutral-200"
                    }`}>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${
                        isDark ? "text-neutral-500" : "text-neutral-400"
                      }`}>{spec.label}</span>
                      <span className={`font-mono text-[11px] ${
                        plan.highlight 
                          ? "text-green-400" 
                          : isDark
                            ? "text-neutral-300"
                            : "text-neutral-600"
                      }`}>
                        {spec.val}
                      </span>
                    </div>
                  ))}
                </div>

                <button className={`w-full py-4 text-[10px] font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 relative overflow-hidden group/btn rounded ${
                  plan.highlight 
                    ? "bg-green-500 text-black hover:bg-green-400" 
                    : isDark
                      ? "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                      : "bg-neutral-100 text-black border border-neutral-200 hover:bg-neutral-200"
                }`}>
                  <span className="relative z-10">Initialize</span>
                  <ChevronRight className="w-3 h-3 relative z-10 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* --- SYSTEM TRUST BAR --- */}
        <div className={`mt-24 rounded-2xl border backdrop-blur-sm p-1 ${
          isDark
            ? "bg-neutral-900/30 border-white/5"
            : "bg-white/50 border-neutral-200"
        }`}>
          <div className={`grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x ${
            isDark ? "divide-white/5" : "divide-neutral-200"
          }`}>
            {[
                { icon: Shield, label: "Encryption_Std", val: "AES_256_GCM" },
                { icon: Activity, label: "SLA_Guarantee", val: "99.99_PCT" },
                { icon: Cpu, label: "Interface_Type", val: "REST_/_GRPC" }
            ].map((item, i) => (
                <div key={i} className={`p-6 flex flex-col items-center justify-center gap-2 transition-colors ${
                  isDark ? "hover:bg-white/[0.02]" : "hover:bg-neutral-50"
                }`}>
                    <item.icon className="w-5 h-5 text-green-500/50 mb-1" />
                    <div className={`text-[9px] font-bold uppercase tracking-[0.3em] ${
                      isDark ? "text-neutral-500" : "text-neutral-400"
                    }`}>{item.label}</div>
                    <div className={`text-sm font-mono font-bold ${
                      isDark ? "text-white" : "text-black"
                    }`}>{item.val}</div>
                </div>
            ))}
          </div>
        </div>

        {/* --- BOTTOM METADATA --- */}
        <div className="mt-12 text-center">
            <p className={`font-mono text-[9px] uppercase tracking-[0.3em] ${
              isDark ? "text-neutral-600" : "text-neutral-400"
            }`}>
                // System_Status: Operational // Region: Global_South_1
            </p>
        </div>
      </div>
    </div>
  );
}