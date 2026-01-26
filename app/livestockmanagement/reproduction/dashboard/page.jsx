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
    const borderColor = isDark ? "border-green-500/30" : "border-slate-800";
    return (
      <>
        <div className={`absolute top-0 left-0 w-2 h-2 border-l-2 border-t-2 ${borderColor}`} />
        <div className={`absolute top-0 right-0 w-2 h-2 border-r-2 border-t-2 ${borderColor}`} />
        <div className={`absolute bottom-0 left-0 w-2 h-2 border-l-2 border-b-2 ${borderColor}`} />
        <div className={`absolute bottom-0 right-0 w-2 h-2 border-r-2 border-b-2 ${borderColor}`} />
      </>
    );
  };

  const isActive = (path) => pathname === path;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${inter.className} ${
      isDark ? 'bg-neutral-950 text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* BACKGROUND TEXTURE */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {isDark ? (
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
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
        <main className="p-6 lg:p-10 max-w-[1600px] mx-auto space-y-10">
          
          {/* TITLE & TABS */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className={`${spaceGrotesk.className} text-4xl font-bold mb-2`}>
                Reproduction Overview
              </h1>
              <p className="font-medium opacity-60">
                Monitor breeding, pregnancy, and delivery cycles across your herd.
              </p>
            </div>
            <div className={`flex p-1 rounded-lg border ${isDark ? 'bg-neutral-900 border-white/5' : 'bg-white border-slate-300 shadow-sm'}`}>
              <Link href="/livestockmanagement/reproduction/dashboard">
                <button 
                  className={`px-6 py-2 text-xs font-bold rounded-md transition-all ${
                    isActive('/livestockmanagement/reproduction/dashboard')
                      ? 'bg-green-600 text-white shadow-lg' 
                      : isDark ? 'text-slate-400 hover:bg-white/5' : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  Dashboard
                </button>
              </Link>
              <Link href="/livestockmanagement/reproduction/breeding">
                <button 
                  className={`px-6 py-2 text-xs font-bold rounded-md transition-all ${
                    isActive('/livestockmanagement/reproduction/breeding')
                      ? 'bg-green-600 text-white shadow-lg' 
                      : isDark ? 'text-slate-400 hover:bg-white/5' : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  Breeding
                </button>
              </Link>
              <Link href="/livestockmanagement/reproduction/pregnancy">
                <button 
                  className={`px-6 py-2 text-xs font-bold rounded-md transition-all ${
                    isActive('/livestockmanagement/reproduction/pregnancy')
                      ? 'bg-green-600 text-white shadow-lg' 
                      : isDark ? 'text-slate-400 hover:bg-white/5' : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  Pregnancy
                </button>
              </Link>
              <Link href="/livestockmanagement/reproduction/dryoff">
                <button 
                  className={`px-6 py-2 text-xs font-bold rounded-md transition-all ${
                    isActive('/livestockmanagement/reproduction/dryoff')
                      ? 'bg-green-600 text-white shadow-lg' 
                      : isDark ? 'text-slate-400 hover:bg-white/5' : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  Dry-Off
                </button>
              </Link>
            </div>
          </div>

          <hr className={isDark ? 'border-white/5' : 'border-slate-300'} />

          {/* 1. OVERVIEW STATS */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-green-500 rounded-full"></div>
              <h2 className="text-xs font-black uppercase tracking-[0.2em]">Reproduction Stats</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {overviewStats.map((stat, idx) => (
                <div key={idx} className={`relative p-6 rounded-lg border transition-all duration-300 hover:-translate-y-1 ${
                  isDark ? 'bg-neutral-900/50 border-white/5' : 'bg-white border-slate-300 border-b-4 hover:border-green-600 shadow-sm'
                }`}>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">{stat.label}</span>
                    <stat.icon className={`w-4 h-4 ${stat.color} opacity-80`} />
                  </div>
                  <h3 className={`${spaceGrotesk.className} text-4xl font-bold`}>{stat.value}</h3>
                  <CornerBrackets />
                </div>
              ))}
            </div>
          </section>

          {/* 2. IMPORTANT ALERTS */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-amber-500 rounded-full"></div>
              <h2 className="text-xs font-black uppercase tracking-[0.2em]">Important Alerts</h2>
            </div>
            <div className={`relative p-6 rounded-lg border ${
              isDark ? 'bg-neutral-900/50 border-white/5' : 'bg-white border-slate-300 border-b-4 shadow-sm'
            }`}>
              <div className={`p-4 rounded-lg border-l-4 border-amber-500 ${
                isDark ? 'bg-amber-500/10' : 'bg-amber-50'
              }`}>
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-amber-600 mb-1">Upcoming Deliveries</h4>
                    <p className={`text-sm ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
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
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-blue-500 rounded-full"></div>
              <h2 className="text-xs font-black uppercase tracking-[0.2em]">Detailed Overview</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Upcoming Deliveries Card */}
              <div className={`relative p-6 rounded-lg border transition-all duration-300 ${
                isDark ? 'bg-neutral-900/50 border-white/5' : 'bg-white border-slate-300 border-b-4 shadow-sm'
              }`}>
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-2 rounded-md ${isDark ? 'bg-white/5' : 'bg-slate-100'}`}>
                    <Calendar className="w-5 h-5 text-blue-500" />
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded border ${
                    isDark ? 'border-white/10' : 'border-slate-300'
                  }`}>
                    Next 30 Days
                  </span>
                </div>
                <div className="mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest block mb-1 opacity-50">
                    Upcoming Deliveries
                  </span>
                  <h3 className={`${spaceGrotesk.className} text-2xl font-bold mb-2`}>
                    Animals expected to deliver soon
                  </h3>
                </div>
                <div className={`text-center py-8 text-sm ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                  No upcoming deliveries in the next 30 days
                </div>
                <CornerBrackets />
              </div>

              {/* Alerts & Notifications Card */}
              <div className={`relative p-6 rounded-lg border transition-all duration-300 ${
                isDark ? 'bg-neutral-900/50 border-white/5' : 'bg-white border-slate-300 border-b-4 shadow-sm'
              }`}>
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-2 rounded-md ${isDark ? 'bg-white/5' : 'bg-slate-100'}`}>
                    <Bell className="w-5 h-5 text-amber-500" />
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded border ${
                    isDark ? 'border-white/10' : 'border-slate-300'
                  }`}>
                    Active
                  </span>
                </div>
                <div className="mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest block mb-1 opacity-50">
                    Alerts & Notifications
                  </span>
                  <h3 className={`${spaceGrotesk.className} text-2xl font-bold mb-2`}>
                    Important breeding and reproduction alerts
                  </h3>
                </div>
                <div className={`text-center py-8 text-sm ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
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