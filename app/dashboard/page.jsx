"use client";
import React, { useState } from 'react';
import Navbar from '@/components/dashboard/Navbar';
import { 
  Activity, Droplet, TrendingUp, Wallet, PiggyBank, 
  ThermometerSun, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { Space_Grotesk, Inter } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300", "500", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function FarmDashboard() {
  const [isDark, setIsDark] = useState(false); 
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // --- MOCK DATA ---
  const milkProductionData = [
    { day: 'Mon', production: 2.5 }, { day: 'Tue', production: 3.2 },
    { day: 'Wed', production: 2.8 }, { day: 'Thu', production: 3.5 },
    { day: 'Fri', production: 3.0 }, { day: 'Sat', production: 2.9 },
    { day: 'Sun', production: 3.1 },
  ];

  const financialData = [
    { month: 'Jan', revenue: 45, expenses: 32 }, { month: 'Feb', revenue: 52, expenses: 35 },
    { month: 'Mar', revenue: 48, expenses: 33 }, { month: 'Apr', revenue: 61, expenses: 38 },
    { month: 'May', revenue: 55, expenses: 36 }, { month: 'Jun', revenue: 67, expenses: 40 },
  ];

  const stats = [
    { title: 'Total Livestock', value: '13', subtitle: 'Heads', change: '+2', trend: 'up', icon: Activity },
    { title: 'Milk Production', value: '0.00', subtitle: "Gallons Today", change: '0%', trend: 'neutral', icon: Droplet },
    { title: 'Monthly Income', value: 'PKR 0', subtitle: 'Current Month', change: '+12%', trend: 'up', icon: TrendingUp },
    { title: 'Monthly Expenses', value: 'PKR 0', subtitle: 'Current Month', change: '-5%', trend: 'down', icon: Wallet },
    { title: 'Net Profit', value: 'PKR 0', subtitle: 'Current Month', change: '0%', trend: 'neutral', icon: PiggyBank },
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
      <div className="fixed inset-0 pointer-events-none z-0 opacity-100">
          {isDark ? (
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
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
        searchPlaceholder="Search orders..."
      />

      {/* MAIN CONTENT WRAPPER */}
      <div className={`${sidebarOpen ? 'lg:ml-72' : 'ml-0'} transition-all duration-300 relative z-10`}>
        <main className="p-6 lg:p-10 max-w-[1600px] mx-auto space-y-8">
          {/* WELCOME HERO */}
          <div className={`relative overflow-hidden rounded-lg border group ${isDark ? 'border-white/10' : 'border-slate-300 border-b-4 shadow-sm'}`}>
             <div className={`absolute inset-0 bg-gradient-to-r ${isDark ? 'from-green-900/40 via-neutral-900 to-neutral-900' : 'from-slate-100 via-white to-white'}`} />
             <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <h1 className={`${spaceGrotesk.className} text-4xl md:text-5xl font-bold mb-3`}>Good Morning, Musa</h1>
                    <p className="opacity-70 max-w-xl font-medium">
                        Farm operations are running smoothly. You have <span className="text-green-600 font-bold">3 pending tasks</span> today.
                    </p>
                </div>
                <div className={`flex items-center gap-4 px-6 py-3 rounded-lg border backdrop-blur-md ${isDark ? 'bg-black/20 border-white/10' : 'bg-white/60 border-slate-300 shadow-sm'}`}>
                    <ThermometerSun className="w-8 h-8 text-amber-500" />
                    <div>
                        <span className={`block text-2xl font-bold ${spaceGrotesk.className}`}>24°C</span>
                        <span className="text-[10px] uppercase tracking-wider font-bold opacity-60">Islamabad</span>
                    </div>
                </div>
             </div>
             <CornerBrackets />
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {stats.map((stat, idx) => (
              <div key={idx} className={`relative p-6 rounded-lg border transition-all hover:-translate-y-1 ${isDark ? 'bg-neutral-900/50 border-white/5' : 'bg-white border-slate-300 border-b-4 shadow-sm'}`}>
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-2 rounded-md ${isDark ? 'bg-white/5' : 'bg-slate-100 text-slate-600'}`}><stat.icon className="w-4 h-4" /></div>
                  <div className={`text-[10px] py-0.5 px-1.5 rounded font-bold flex items-center gap-0.5 ${stat.change.includes('+') ? 'bg-green-500/10 text-green-600' : 'bg-neutral-500/10 text-neutral-600'}`}>
                    {stat.change} {stat.change !== '0%' && (stat.change.includes('+') ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />)}
                  </div>
                </div>
                <h3 className={`${spaceGrotesk.className} text-3xl font-bold mb-1`}>{stat.value}</h3>
                <p className="text-[10px] uppercase tracking-widest font-bold opacity-50 mb-1">{stat.title}</p>
                <p className="text-xs opacity-50">{stat.subtitle}</p>
              </div>
            ))}
          </div>

          {/* CHARTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className={`rounded-lg border p-6 relative ${isDark ? 'bg-neutral-900/30 border-white/5' : 'bg-white border-slate-300 border-b-4 shadow-sm'}`}>
                <h3 className={`${spaceGrotesk.className} text-lg font-bold mb-6`}>Milk Production</h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={milkProductionData}>
                            <defs><linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22c55e" stopOpacity={0.2}/><stop offset="95%" stopColor="#22c55e" stopOpacity={0}/></linearGradient></defs>
                            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#333" : "#e2e8f0"} vertical={false} />
                            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: isDark ? '#9ca3af' : '#64748b', fontSize: 10, fontWeight: 700 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: isDark ? '#9ca3af' : '#64748b', fontSize: 10, fontWeight: 700 }} />
                            <Tooltip contentStyle={{ backgroundColor: isDark ? '#171717' : '#fff', borderRadius: '4px' }} />
                            <Area type="monotone" dataKey="production" stroke="#22c55e" strokeWidth={3} fill="url(#colorProd)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <CornerBrackets />
            </div>

            <div className={`rounded-lg border p-6 relative ${isDark ? 'bg-neutral-900/30 border-white/5' : 'bg-white border-slate-300 border-b-4 shadow-sm'}`}>
                <h3 className={`${spaceGrotesk.className} text-lg font-bold mb-6`}>Finance Overview</h3>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={financialData}>
                            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#333" : "#e2e8f0"} vertical={false} />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: isDark ? '#9ca3af' : '#64748b', fontSize: 10, fontWeight: 700 }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fill: isDark ? '#9ca3af' : '#64748b', fontSize: 10, fontWeight: 700 }} />
                            <Tooltip contentStyle={{ backgroundColor: isDark ? '#171717' : '#fff', borderRadius: '4px' }} />
                            <Line type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={3} dot={{r: 4}} />
                            <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={3} dot={{r: 4}} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <CornerBrackets />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}