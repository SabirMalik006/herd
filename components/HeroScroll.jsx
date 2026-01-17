"use client";
import { ContainerScroll } from "./ui/ContainerScroll";
import { Space_Grotesk, Inter } from "next/font/google";
import { Terminal, Activity, Crosshair, Box, ShieldCheck, Zap, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300", "500", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "600"] });

export default function HeroScroll() {
  return (
    <div className={`flex flex-col overflow-hidden relative bg-neutral-950 pt-20 pb-32 ${inter.className}`}>
      
      {/* LAYERED BACKGROUND DEPTH */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Subtle Motion Grid */}
        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        {/* Radial Spotlight Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.05),transparent_70%)]" />
      </div>

      <ContainerScroll
        titleComponent={
          <div className="flex flex-col items-center text-center space-y-6 mb-16 px-4">

            <h2 className={`${spaceGrotesk.className} text-6xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tighter leading-[0.8] text-white`}>
              The Central <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-green-300 via-green-500 to-emerald-800">
                Command.
              </span>
            </h2>

            <div className="flex flex-col md:flex-row items-center gap-6 max-w-3xl">
                <div className="h-[1px] w-12 bg-green-500/50 hidden md:block" />
                <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed tracking-wide text-center">
                  Synchronize your entire herd operation. Track movement, 
                  biometrics, and yield metrics within a single high-fidelity environment 
                  engineered for total agricultural oversight.
                </p>
                <div className="h-[1px] w-12 bg-green-500/50 hidden md:block" />
            </div>

            <div className="flex flex-wrap gap-4 justify-center items-center pt-4">
              <button className="group relative px-10 py-4 bg-green-600 text-white font-bold text-[11px] tracking-widest uppercase overflow-hidden transition-all hover:bg-green-500 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)]">
                <span className="relative z-10">Launch Console</span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
              </button>
              
              <button className="px-10 py-4 text-[11px] font-bold uppercase tracking-widest border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 transition-all backdrop-blur-sm">
                System Documentation
              </button>
            </div>
          </div>
        }
      >
        <div className="relative w-full h-full group bg-neutral-950 overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          
          {/* DASHBOARD CONTENT WITH SCANNING EFFECT */}
          <div className="relative overflow-hidden h-full">
            <img
              src="/overview.png"
              alt="AgriHerd Dashboard"
              className="mx-auto rounded-none object-cover h-full object-left-top transition-all duration-1000 opacity-60 grayscale-[0.4] group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.02]"
              draggable={false}
            />
            {/* Moving Scanning Line */}
            <motion.div 
              animate={{ top: ["-10%", "110%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 w-full h-[2px] bg-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.5)] z-30"
            />
          </div>

          {/* FLOATING HUD OVERLAYS */}
          
          {/* Top Left: Telemetry */}
          <div className="absolute top-6 left-6 flex flex-col gap-2 z-40">
            <div className="flex items-center gap-2 bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1.5">
              <Activity className="w-3 h-3 text-green-500 animate-pulse" />
              <span className="text-[9px] font-mono text-white/90 uppercase tracking-widest">Live_Feed // 124.5 FPS</span>
            </div>
            <div className="flex items-center gap-2 bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1.5">
              <ShieldCheck className="w-3 h-3 text-blue-400" />
              <span className="text-[9px] font-mono text-white/90 uppercase tracking-widest">Protocol: Encrypted</span>
            </div>
          </div>

          {/* Top Right: System Metrics */}
          <div className="absolute top-6 right-6 hidden md:flex flex-col items-end gap-2 z-40">
            <div className="bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1.5 flex items-center gap-4">
               <div className="flex flex-col items-end">
                  <span className="text-[8px] text-neutral-500 font-mono uppercase">Node_Stability</span>
                  <span className="text-[10px] text-green-400 font-mono">99.98%</span>
               </div>
               <BarChart3 className="w-4 h-4 text-neutral-400" />
            </div>
          </div>

          {/* Bottom Left: Terminal Log */}
          <div className="absolute bottom-6 left-6 hidden lg:block z-40">
            <div className="bg-black/90 backdrop-blur-xl border border-white/5 p-4 w-64 font-mono text-[9px] text-neutral-500">
               <div className="flex items-center justify-between mb-2 border-b border-white/10 pb-1">
                  <span className="text-white/40 uppercase tracking-tighter">System_Log</span>
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
                  </div>
               </div>
               <p className="text-green-500/70">{`> AUTHENTICATING...`}</p>
               <p>{`> DEPLOYING_VISUAL_ASSETS`}</p>
               <p>{`> SYNCING_HERD_TELEMETRY_ID_042`}</p>
               <p className="animate-pulse">{`> STATUS: READY`}</p>
            </div>
          </div>

          {/* Bottom Right: Coordinates */}
          <div className="absolute bottom-6 right-6 z-40">
             <div className="bg-neutral-900/80 backdrop-blur-md border border-green-500/20 px-3 py-2 flex items-center gap-3">
                <Crosshair className="w-4 h-4 text-green-500" />
                <div className="flex flex-col">
                   <span className="text-[8px] font-mono text-neutral-400 uppercase tracking-widest">Global_Pos</span>
                   <span className="text-[10px] font-mono text-white leading-none">40.7128° N, 74.0060° W</span>
                </div>
             </div>
          </div>

          {/* Decorative Corner Framing */}
          <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-green-500/30 z-20 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-green-500/30 z-20 pointer-events-none" />
        </div>
      </ContainerScroll>

      {/* Background Glow Overlay */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-green-900/10 blur-[120px] pointer-events-none" />
    </div>
  );
}