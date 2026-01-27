"use client";

import React, { useState } from 'react';
import Navbar from '@/components/dashboard/Navbar';
import { 
  Heart, Calendar, AlertTriangle, Bell, 
  Activity, TrendingUp
} from 'lucide-react';
import { Space_Grotesk, Inter } from "next/font/google";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300", "500", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function ReproductionDashboard() {
  const [isDark, setIsDark] = useState(false); 
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  // --- REPRODUCTION DATA ---
  const overviewStats = [
    { label: "Active Breeding", value: "0", color: "text-green-500", icon: Heart },
    { label: "Pregnant Animals", value: "0", color: "text-pink-500", icon: Activity },
    { label: "Upcoming Deliveries", value: "0", color: "text-blue-500", icon: Calendar },
    { label: "Dry-Off Alerts", value: "0", color: "text-amber-500", icon: Bell },
  ];

  const CornerBrackets = () => {
    const borderColor = isDark ? "border-green-500/20" : "border-neutral-300";
    return (
      <>
        <div className={`absolute top-0 left-0 w-3 h-3 border-l border-t ${borderColor} transition-all duration-300`} />
        <div className={`absolute top-0 right-0 w-3 h-3 border-r border-t ${borderColor} transition-all duration-300`} />
        <div className={`absolute bottom-0 left-0 w-3 h-3 border-l border-b ${borderColor} transition-all duration-300`} />
        <div className={`absolute bottom-0 right-0 w-3 h-3 border-r border-b ${borderColor} transition-all duration-300`} />
      </>
    );
  };

  const isActive = (path) => pathname === path;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${inter.className} ${
      isDark ? 'bg-neutral-950 text-white' : 'bg-neutral-50 text-neutral-900'
    }`}>
      
      {/* ENHANCED BACKGROUND TEXTURE */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {isDark ? (
          <>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.05]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.03),transparent_70%)]" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-100" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.02),transparent_70%)]" />
          </>
        )}
      </div>

      {/* NAVBAR WITH SIDEBAR */}
      <Navbar 
        isDark={isDark} 
        setIsDark={setIsDark} 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen}
        searchPlaceholder="Search animals..."
      />

      {/* MAIN CONTENT */}
      <div className={`${sidebarOpen ? 'lg:ml-72' : 'ml-0'} transition-all duration-300 relative z-10`}>
        <main className="p-6 lg:p-10 max-w-[1600px] mx-auto space-y-8">
          
          {/* MODERNIZED TITLE & TABS */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </div>
                <span className="font-mono text-[10px] text-green-500/80 uppercase tracking-[0.3em]">
                  [REPRODUCTION_SYSTEM]
                </span>
              </div>
              <h1 className={`${spaceGrotesk.className} text-4xl md:text-5xl font-bold uppercase tracking-tighter leading-[0.9] mb-2`}>
                Reproduction <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Overview</span>
              </h1>
              <p className={`text-sm font-light leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                Monitor breeding, pregnancy, and delivery cycles across your herd.
              </p>
            </div>
            
            {/* Enhanced Tab Navigation */}
            <div className={`flex p-1.5 border backdrop-blur-md ${
              isDark ? 'bg-neutral-900/50 border-white/10' : 'bg-white border-neutral-300 shadow-sm'
            }`}>
              <Link href="/livestockmanagement/reproduction/dashboard">
                <button 
                  className={`cursor-pointer w-[110px] py-2.5 text-[11px] font-bold uppercase tracking-wider transition-all ${
                    isActive('/livestockmanagement/reproduction/dashboard')
                      ? isDark
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                        : 'bg-green-500/10 text-green-700 border border-green-500/30'
                      : isDark 
                        ? 'text-neutral-400 hover:text-green-400 hover:bg-white/5' 
                        : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  Dashboard
                </button>
              </Link>
              <Link href="/livestockmanagement/reproduction/breeding">
                <button 
                  className={`cursor-pointer w-[110px] py-2.5 text-[11px] font-bold uppercase tracking-wider transition-all ${
                    isActive('/livestockmanagement/reproduction/breeding')
                      ? isDark
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                        : 'bg-green-500/10 text-green-700 border border-green-500/30'
                      : isDark 
                        ? 'text-neutral-400 hover:text-green-400 hover:bg-white/5' 
                        : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  Breeding
                </button>
              </Link>
              <Link href="/livestockmanagement/reproduction/pregnancy">
                <button 
                  className={`cursor-pointer w-[110px] py-2.5 text-[11px] font-bold uppercase tracking-wider transition-all ${
                    isActive('/livestockmanagement/reproduction/pregnancy')
                      ? isDark
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                        : 'bg-green-500/10 text-green-700 border border-green-500/30'
                      : isDark 
                        ? 'text-neutral-400 hover:text-green-400 hover:bg-white/5' 
                        : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  Pregnancy
                </button>
              </Link>
              <Link href="/livestockmanagement/reproduction/dryoff">
                <button 
                  className={`cursor-pointer w-[110px] py-2.5 text-[11px] font-bold uppercase tracking-wider transition-all ${
                    isActive('/livestockmanagement/reproduction/dryoff')
                      ? isDark
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                        : 'bg-green-500/10 text-green-700 border border-green-500/30'
                      : isDark 
                        ? 'text-neutral-400 hover:text-green-400 hover:bg-white/5' 
                        : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  Dry-Off
                </button>
              </Link>
            </div>
          </div>

          {/* 1. OVERVIEW STATS */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className={`h-[2px] w-8 ${isDark ? 'bg-green-500/50' : 'bg-green-500'}`} />
              <h2 className={`text-[10px] font-black uppercase tracking-[0.25em] font-mono ${
                isDark ? 'text-neutral-400' : 'text-neutral-500'
              }`}>
                Reproduction Stats
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {overviewStats.map((stat, idx) => (
                <div key={idx} className={`cursor-pointer relative p-6 border transition-all duration-300 hover:-translate-y-1 ${
                  isDark ? 'bg-neutral-900/50 border-white/5 hover:border-green-500/20' : 'bg-white border-neutral-300 hover:border-green-500/30 shadow-sm'
                }`}>
                  <div className="flex justify-between items-start mb-4">
                    <span className={`text-[9px] font-mono font-bold uppercase tracking-[0.25em] ${
                      isDark ? 'text-neutral-500' : 'text-neutral-400'
                    }`}>
                      {stat.label}
                    </span>
                    <div className={`p-2.5 border ${
                      isDark ? 'bg-white/5 border-white/10' : 'bg-neutral-50 border-neutral-200'
                    }`}>
                      <stat.icon className={`w-4 h-4 ${stat.color}`} />
                    </div>
                  </div>
                  <h3 className={`${spaceGrotesk.className} text-4xl font-bold tracking-tight`}>{stat.value}</h3>
                  <CornerBrackets />
                </div>
              ))}
            </div>
          </section>

          {/* 2. IMPORTANT ALERTS */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className={`h-[2px] w-8 ${isDark ? 'bg-amber-500/50' : 'bg-amber-500'}`} />
              <h2 className={`text-[10px] font-black uppercase tracking-[0.25em] font-mono ${
                isDark ? 'text-neutral-400' : 'text-neutral-500'
              }`}>
                Important Alerts
              </h2>
            </div>
            <div className={`relative p-6 border ${
              isDark ? 'bg-neutral-900/50 border-white/5' : 'bg-white border-neutral-300 shadow-sm'
            }`}>
              <div className={`p-4 border-l-4 border-amber-500 ${
                isDark ? 'bg-amber-500/10' : 'bg-amber-50'
              }`}>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                  <div>
                    <h4 className={`font-bold mb-1 ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                      Upcoming Deliveries
                    </h4>
                    <p className={`text-sm ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
                      No animals expected to deliver in the next 30 days.
                    </p>
                  </div>
                </div>
              </div>
              <CornerBrackets />
            </div>
          </section>

          {/* 3. DETAILED SECTIONS */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className={`h-[2px] w-8 ${isDark ? 'bg-blue-500/50' : 'bg-blue-500'}`} />
              <h2 className={`text-[10px] font-black uppercase tracking-[0.25em] font-mono ${
                isDark ? 'text-neutral-400' : 'text-neutral-500'
              }`}>
                Detailed Overview
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Upcoming Deliveries Card */}
              <div className={`relative p-6 border transition-all duration-300 ${
                isDark ? 'bg-neutral-900/50 border-white/5' : 'bg-white border-neutral-300 shadow-sm'
              }`}>
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-2.5 border ${isDark ? 'bg-white/5 border-white/10' : 'bg-neutral-50 border-neutral-200'}`}>
                    <Calendar className="w-5 h-5 text-blue-500" />
                  </div>
                  <span className={`text-[9px] font-mono font-bold px-3 py-1 border ${
                    isDark 
                      ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' 
                      : 'bg-blue-50 text-blue-700 border-blue-200'
                  }`}>
                    Next 30 Days
                  </span>
                </div>
                <div className="mb-4">
                  <span className={`text-[9px] font-mono font-bold uppercase tracking-[0.25em] block mb-2 ${
                    isDark ? 'text-neutral-500' : 'text-neutral-400'
                  }`}>
                    Upcoming Deliveries
                  </span>
                  <h3 className={`${spaceGrotesk.className} text-xl font-bold tracking-tight mb-2`}>
                    Animals expected to deliver soon
                  </h3>
                </div>
                <div className={`text-center py-8 text-sm font-medium ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                  No upcoming deliveries in the next 30 days
                </div>
                <CornerBrackets />
              </div>

              {/* Alerts & Notifications Card */}
              <div className={`relative p-6 border transition-all duration-300 ${
                isDark ? 'bg-neutral-900/50 border-white/5' : 'bg-white border-neutral-300 shadow-sm'
              }`}>
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-2.5 border ${isDark ? 'bg-white/5 border-white/10' : 'bg-neutral-50 border-neutral-200'}`}>
                    <Bell className="w-5 h-5 text-amber-500" />
                  </div>
                  <span className={`text-[9px] font-mono font-bold px-3 py-1 border ${
                    isDark 
                      ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                      : 'bg-green-50 text-green-700 border-green-200'
                  }`}>
                    Active
                  </span>
                </div>
                <div className="mb-4">
                  <span className={`text-[9px] font-mono font-bold uppercase tracking-[0.25em] block mb-2 ${
                    isDark ? 'text-neutral-500' : 'text-neutral-400'
                  }`}>
                    Alerts & Notifications
                  </span>
                  <h3 className={`${spaceGrotesk.className} text-xl font-bold tracking-tight mb-2`}>
                    Important breeding and reproduction alerts
                  </h3>
                </div>
                <div className={`text-center py-8 text-sm font-medium ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                  No active alerts at this time
                </div>
                <CornerBrackets />
              </div>

            </div>
          </section>

        </main>
      </div>
    </div>
  );
}