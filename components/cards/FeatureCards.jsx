"use client";
import React, { useState, useEffect } from "react";
import { Package, TrendingUp, Heart, BarChart3, Bell, Users, Check, ChevronLeft, ChevronRight, Activity } from "lucide-react";
import { Space_Grotesk, Inter } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300", "500", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "600"] });

export default function FeatureCards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const brandGreen = "#22c55e";

  const features = [
    {
      icon: Package,
      title: "Inventory Control",
      id: "MOD_01",
      description: "Autonomous supply chain tracking.",
      benefits: ["Real-time Stock", "Auto-reorder Protocols", "Barcode Scanning", "Multi-Depot Sync"],
    },
    {
      icon: TrendingUp,
      title: "Financial Analysis",
      id: "MOD_02",
      description: "Predictive revenue algorithms.",
      benefits: ["P&L Visualization", "Expense Nodes", "Revenue Forecast", "Fiscal Reporting"],
    },
    {
      icon: Heart,
      title: "Animal Health",
      id: "MOD_03",
      description: "Biometric monitoring systems.",
      benefits: ["Vitals Tracking", "Vaccine Schedules", "Vet Logic Integration", "Pathogen Alerts"],
    },
    {
      icon: BarChart3,
      title: "Production Yield",
      id: "MOD_04",
      description: "Output optimization metrics.",
      benefits: ["Yield Analytics", "Efficiency Scoring", "Growth Forecasting", "Resource Mapping"],
    },
    {
      icon: Bell,
      title: "Smart Alerts",
      id: "MOD_05",
      description: "Critical event notification relay.",
      benefits: ["Threshold Triggers", "Task Reminders", "Emergency Override", "Calendar Sync"],
    },
    {
      icon: Users,
      title: "Workforce Ops",
      id: "MOD_06",
      description: "Personnel allocation network.",
      benefits: ["Shift Logic", "Task Assignment", "Performance Metrics", "Payroll Bridge"],
    },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % features.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, features.length]);

  const handleManualNav = (direction) => {
    setIsAutoPlaying(false);
    if (direction === 'prev') {
      setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);
    } else {
      setCurrentIndex((prev) => (prev + 1) % features.length);
    }
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const getCardPosition = (index) => {
    const diff = (index - currentIndex + features.length) % features.length;
    if (diff === 0) return "center";
    if (diff === 1 || diff === -(features.length - 1)) return "right";
    if (diff === features.length - 1 || diff === -1) return "left";
    return "hidden";
  };

  return (
    <div className={`min-h-screen relative overflow-hidden bg-neutral-950 flex flex-col justify-center py-12 ${inter.className}`}>
      
      {/* BACKGROUND: Technical Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-green-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* HEADER SECTION */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-green-500/20 bg-green-500/5 backdrop-blur-sm">
            <Activity className="w-3 h-3 text-green-500" />
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-green-500/80">
              System_Modules
            </span>
          </div>

          <h2 className={`text-4xl md:text-6xl font-bold tracking-tighter text-white ${spaceGrotesk.className}`}>
            OPERATIONAL <span className="text-green-500">NODES</span>
          </h2>
          
          <p className="text-sm md:text-base max-w-lg mx-auto text-neutral-400 font-mono">
            // Select a module to initialize detailed view. <br />
            // All systems nominal.
          </p>
        </div>

        {/* CAROUSEL STAGE */}
        <div className="relative max-w-5xl mx-auto h-[500px] flex items-center justify-center perspective-[1000px]">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const position = getCardPosition(index);
            
            return (
              <div
                key={index}
                className={`absolute transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                  position === "center" ? "z-30 scale-100 opacity-100 translate-x-0" :
                  position === "right" ? "z-20 scale-[0.85] opacity-30 translate-x-[60%] blur-[1px]" :
                  position === "left" ? "z-20 scale-[0.85] opacity-30 -translate-x-[60%] blur-[1px]" :
                  "z-0 scale-50 opacity-0 pointer-events-none"
                }`}
                style={{ width: "100%", maxWidth: "420px" }}
              >
                {/* CARD CONTAINER */}
                <div className={`relative overflow-hidden bg-neutral-900/80 backdrop-blur-xl border border-white/10 p-1 
                  ${position === "center" ? "shadow-[0_0_60px_-15px_rgba(34,197,94,0.3)] border-green-500/30" : ""}`}>
                  
                  {/* CORNER ACCENTS */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-green-500/50" />
                  <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-green-500/50" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-green-500/50" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-green-500/50" />

                  {/* CARD CONTENT */}
                  <div className="bg-neutral-950/50 p-6 space-y-6 h-full relative group">
                    
                    {/* Header Row */}
                    <div className="flex justify-between items-start border-b border-white/5 pb-4">
                      <div className="p-3 bg-white/5 border border-white/10 rounded-sm text-green-400 group-hover:text-green-300 transition-colors">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-[10px] text-green-500/60 tracking-widest">{feature.id}</div>
                        <div className="h-1 w-8 bg-green-500/20 ml-auto mt-1 rounded-full overflow-hidden">
                            <div className="h-full bg-green-500 animate-pulse w-2/3 ml-auto" />
                        </div>
                      </div>
                    </div>

                    {/* Title & Desc */}
                    <div className="space-y-2">
                      <h3 className={`text-2xl font-bold text-white uppercase tracking-tight ${spaceGrotesk.className}`}>
                        {feature.title}
                      </h3>
                      <p className="text-xs text-neutral-400 font-mono">
                        {feature.description}
                      </p>
                    </div>

                    {/* Benefits List */}
                    <div className="space-y-2 pt-2">
                      {feature.benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-3 group/item">
                          <div className="w-1 h-1 bg-green-500 rounded-full group-hover/item:shadow-[0_0_8px_rgba(34,197,94,0.8)] transition-all" />
                          <span className="text-[11px] text-neutral-300 uppercase tracking-wider font-medium">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Action Button */}
                    <button className="w-full mt-4 py-3 border border-green-500/30 text-[10px] font-bold text-green-400 uppercase tracking-[0.2em] hover:bg-green-500 hover:text-black transition-all duration-300">
                      Access Data
                    </button>

                  </div>
                </div>
              </div>
            );
          })}

          {/* Nav Controls */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 md:-px-12 pointer-events-none z-40 max-w-6xl mx-auto">
            <button 
              onClick={() => handleManualNav('prev')}
              className="pointer-events-auto p-3 rounded-full border border-white/10 bg-neutral-900/50 text-white hover:bg-green-500 hover:text-black hover:border-green-500 transition-all backdrop-blur-sm"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={() => handleManualNav('next')}
              className="pointer-events-auto p-3 rounded-full border border-white/10 bg-neutral-900/50 text-white hover:bg-green-500 hover:text-black hover:border-green-500 transition-all backdrop-blur-sm"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Pagination Indicators */}
        <div className="flex justify-center items-center gap-2 mt-12">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => { setCurrentIndex(index); setIsAutoPlaying(false); }}
              className={`h-1 rounded-sm transition-all duration-300 ${
                currentIndex === index 
                  ? "w-8 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" 
                  : "w-2 bg-neutral-800 hover:bg-neutral-600"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}