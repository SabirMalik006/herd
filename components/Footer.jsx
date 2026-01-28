"use client";
import React from "react";
import { Space_Grotesk, Inter } from "next/font/google";
import { Terminal, Cpu, Globe, ArrowRight, ShieldCheck, Heart, Binary } from "lucide-react";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "600"] });

export default function Footer() {
  return (
    <footer className={`bg-[#050505] border-t border-white/5 pt-24 ${inter.className}`}>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* --- MAIN SYSTEM GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-l border-t border-white/5">
          
          {/* Brand Module */}
          <div className="p-10 border-r border-b border-white/5 relative group">
            {/* Structural Corner Decor */}
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-green-500/30 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="mb-8">
              <h2 className={`${spaceGrotesk.className} text-3xl font-bold uppercase tracking-tighter leading-none text-white`}>
                HERD<span className="text-green-500">ERP</span>
                <span className="block text-[9px] tracking-[0.5em] text-green-500/50 mt-2 font-mono font-bold">
                  // LIVESTOCK_PLATFORM
                </span>
              </h2>
            </div>
            <p className="text-[11px] uppercase tracking-tight leading-relaxed mb-8 font-medium text-neutral-500">
              Modern livestock management software helping farmers track herd health, optimize breeding, and increase farm profitability worldwide.
            </p>
            <div className="flex gap-3">
                {[Globe, Terminal, ShieldCheck].map((Icon, i) => (
                    <div key={i} className="w-9 h-9 border border-white/10 flex items-center justify-center transition-all cursor-pointer hover:bg-green-500 hover:text-black">
                        <Icon className="w-4 h-4" />
                    </div>
                ))}
            </div>
          </div>

          {/* Directory Column 1 */}
          <div className="p-10 border-r border-b border-white/5 relative">
             <h3 className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-green-500/60 mb-10">
               01 // Platform
             </h3>
             <ul className="space-y-4">
                {["Features", "Pricing Plans", "Integrations", "API Docs", "System Status"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[11px] uppercase font-bold tracking-widest transition-all flex items-center gap-3 group text-white/50 hover:text-green-400">
                      <span className="text-[8px] opacity-0 group-hover:opacity-100 transition-opacity text-green-500">▶</span>
                      {link}
                    </a>
                  </li>
                ))}
             </ul>
          </div>

          {/* Directory Column 2 */}
          <div className="p-10 border-r border-b border-white/5">
             <h3 className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-green-500/60 mb-10">
               02 // Solutions
             </h3>
             <ul className="space-y-4">
                {["Herd Management", "Farm Analytics", "Milk Tracking", "Inventory", "Health Reports"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[11px] uppercase font-bold tracking-widest transition-all flex items-center gap-3 group text-white/50 hover:text-green-400">
                      <span className="text-[8px] opacity-0 group-hover:opacity-100 transition-opacity text-green-500">▶</span>
                      {link}
                    </a>
                  </li>
                ))}
             </ul>
          </div>

          {/* Directory Column 3 */}
          <div className="p-10 border-r border-b border-white/5">
             <h3 className="font-mono text-[9px] font-bold uppercase tracking-[0.3em] text-green-500/60 mb-10">
               03 // Support
             </h3>
             <ul className="space-y-4">
                {["Contact Support", "Documentation", "What's New", "Resources", "Security"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-[11px] uppercase font-bold tracking-widest transition-all flex items-center gap-3 group text-white/50 hover:text-green-400">
                      <span className="text-[8px] opacity-0 group-hover:opacity-100 transition-opacity text-green-500">▶</span>
                      {link}
                    </a>
                  </li>
                ))}
             </ul>
          </div>
        </div>

        {/* --- SUBSCRIPTION TERMINAL --- */}
        <div className="grid lg:grid-cols-2 border-l border-r border-b border-white/5 bg-neutral-900/10">
            <div className="p-10 border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                    <Binary className="w-4 h-4 text-green-500" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-green-500/70 font-bold">Newsletter</span>
                </div>
                <h3 className={`${spaceGrotesk.className} text-3xl font-bold uppercase tracking-tighter text-white`}>
                    Built for Livestock Farmers. <br/>Trusted in the Field.
                </h3>
            </div>
            
            <div className="p-10 flex items-center">
                <div className="flex w-full group relative">
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 text-green-500 font-mono text-sm leading-none">{`>`}</span>
                    <input 
                        type="email" 
                        placeholder="your@email.com"
                        className="w-full bg-transparent border-b border-white/10 pl-6 p-4 font-mono text-[11px] uppercase tracking-[0.2em] focus:outline-none focus:border-green-400 text-white transition-colors"
                    />
                    <button className="px-10 border-b border-white/10 transition-all flex items-center justify-center gap-3 group/btn hover:bg-green-500 hover:text-black">
                        <span className="font-bold uppercase text-[10px] tracking-widest">Execute</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>

        {/* --- SYSTEM METADATA --- */}
        <div className="flex flex-col md:flex-row justify-between items-center py-12 gap-8">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-10 gap-y-4 font-mono text-[9px] uppercase tracking-[0.2em] font-bold">
                <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                    <span className="text-white">System: Operational</span>
                </div>
                <span className="text-neutral-500">Network_Latency: 14ms</span>
                <span className="text-neutral-500">Build: 4.0.1-STABLE</span>
                <span className="flex items-center gap-1 text-neutral-500">
                    Dev by <Heart className="w-2 h-2 text-green-500 fill-current" /> Earth Scan Systems
                </span>
            </div>

            <div className="flex gap-8">
                {["Privacy", "Terms", "Compliance"].map((item) => (
                    <a key={item} href="#" className="text-[9px] font-bold uppercase tracking-[0.3em] transition-all text-neutral-600 hover:text-green-400">
                        {item}
                    </a>
                ))}
            </div>
        </div>
      </div>

      {/* Progress Line */}
      <div className="h-[2px] w-full bg-white/5 overflow-hidden">
          <div className="h-full w-1/4 bg-green-500 animate-progress"></div>
      </div>

      <style jsx>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        .animate-progress {
          animation: progress 3s linear infinite;
        }
      `}</style>
    </footer>
  );
}