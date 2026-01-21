"use client";
import React, { useState } from 'react';
import Navbar from '@/components/dashboard/Navbar';
import { 
  Activity, HeartPulse, ThermometerSun, Skull, TrendingUp
} from 'lucide-react';
import { Space_Grotesk, Inter } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300", "500", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function LivestockAnalyticsDashboard() {
  const [isDark, setIsDark] = useState(false); 
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('Overview');

  // --- DATA ---
  const populationStats = [
    { label: "Cows", value: "05", color: "text-emerald-500", icon: Activity },
    { label: "Heifers", value: "00", color: "text-blue-500", icon: Activity },
    { label: "Bulls", value: "03", color: "text-indigo-500", icon: Activity },
    { label: "Weaners", value: "03", color: "text-amber-500", icon: Activity },
    { label: "Calves", value: "02", color: "text-pink-500", icon: Activity },
  ];

  const healthStats = [
    { label: "Healthy", value: "04", color: "bg-green-500", icon: Activity, status: "Optimal" },
    { label: "Sick", value: "06", color: "bg-rose-500", icon: ThermometerSun, status: "Critical" },
    { label: "Treatment", value: "03", color: "bg-amber-500", icon: HeartPulse, status: "Monitoring" },
    { label: "Deceased", value: "02", color: "bg-slate-500", icon: Skull, status: "Archived" },
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
        searchPlaceholder="Search ID, tag..."
      />

      {/* MAIN CONTENT */}
      <div className={`${sidebarOpen ? 'lg:ml-72' : 'ml-0'} transition-all duration-300 relative z-10`}>
        <main className="p-6 lg:p-10 max-w-[1600px] mx-auto space-y-10">
          {/* TITLE & TABS */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className={`${spaceGrotesk.className} text-4xl font-bold mb-2`}>Livestock Analytics</h1>
              <p className="font-medium opacity-60">Real-time monitoring of herd population and health metrics.</p>
            </div>
            <div className={`flex p-1 rounded-lg border ${isDark ? 'bg-neutral-900 border-white/5' : 'bg-white border-slate-300 shadow-sm'}`}>
              {['Overview', 'Sheds', 'Animals'].map((tab) => (
                <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab)} 
                  className={`px-6 py-2 text-xs font-bold rounded-md transition-all ${
                    activeTab === tab 
                      ? 'bg-green-600 text-white shadow-lg' 
                      : isDark ? 'text-slate-400 hover:bg-white/5' : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <hr className={isDark ? 'border-white/5' : 'border-slate-300'} />

          {/* 1. POPULATION STATS */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-green-500 rounded-full"></div>
              <h2 className="text-xs font-black uppercase tracking-[0.2em]">Total Population</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {populationStats.map((stat, idx) => (
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

          {/* 2. HEALTH STATUS */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-red-500 rounded-full"></div>
              <h2 className="text-xs font-black uppercase tracking-[0.2em]">Health Status</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {healthStats.map((stat, idx) => (
                <div key={idx} className={`relative p-6 rounded-lg border transition-all duration-300 ${
                  isDark ? 'bg-neutral-900/50 border-white/5' : 'bg-white border-slate-300 border-b-4 shadow-sm'
                }`}>
                  <div className="flex justify-between items-start mb-6">
                    <div className={`p-2 rounded-md ${isDark ? 'bg-white/5' : 'bg-slate-100'}`}>
                      <stat.icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded border ${
                      isDark ? 'border-white/10' : 'border-slate-300'
                    }`}>
                      {stat.status}
                    </span>
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest block mb-1 opacity-50">
                        {stat.label}
                      </span>
                      <h3 className={`${spaceGrotesk.className} text-4xl font-bold`}>{stat.value}</h3>
                    </div>
                    <div className={`h-1.5 w-12 rounded-full mb-2 ${stat.color}`}></div>
                  </div>
                  <CornerBrackets />
                </div>
              ))}
            </div>
          </section>

          {/* 3. SALES & TRENDS */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-yellow-500 rounded-full"></div>
              <h2 className="text-xs font-black uppercase tracking-[0.2em]">Sales & Trends</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`relative p-6 rounded-lg border ${
                isDark ? 'bg-neutral-900/50 border-white/5' : 'bg-white border-slate-300 border-b-4 shadow-sm'
              }`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-emerald-500/10 rounded">
                    <TrendingUp size={18} className="text-emerald-500" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">
                    Sold This Month
                  </span>
                </div>
                <div className="flex items-baseline gap-3">
                  <h3 className={`${spaceGrotesk.className} text-4xl font-bold`}>12</h3>
                  <span className="text-xs font-bold text-emerald-500">+15% vs last mo.</span>
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