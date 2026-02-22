"use client";
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/dashboard/Navbar';
import axios from 'axios';
import Cookies from 'js-cookie';
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

// API Base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
const DASHBOARD_API = `${API_BASE_URL}/dashboard`;

// Helper to get headers with token
const getHeaders = () => ({
  Authorization: `Bearer ${Cookies.get('accessToken')}`
});

export default function FarmDashboard() {
  const [isDark, setIsDark] = useState(false); 
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({ name: 'Farmer' }); // ✅ User state
  const [stats, setStats] = useState({
    totalLivestock: 0,
    milkProductionToday: 0,
    monthlyIncome: 0,
    monthlyExpenses: 0,
    netProfit: 0,
    change: {
      livestock: '0',
      milk: '0',
      income: '+0',
      expenses: '-0',
      profit: '+0'
    }
  });
  const [milkProductionData, setMilkProductionData] = useState([]);
  const [financeData, setFinanceData] = useState([]);
  
  // ✅ Fetch user profile from backend
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/me`, {
        withCredentials: true,
        headers: getHeaders()
      });
      
      if (response.data?.success) {
        setUser({
          name: response.data.data.name || 'Farmer'
        });
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };
  
  // Fetch all dashboard data
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch all data in parallel
      const [statsRes, milkRes, financeRes] = await Promise.all([
        axios.get(`${DASHBOARD_API}/stats`, {
          withCredentials: true,
          headers: getHeaders()
        }),
        axios.get(`${DASHBOARD_API}/milk-production`, {
          withCredentials: true,
          headers: getHeaders()
        }),
        axios.get(`${DASHBOARD_API}/finance`, {
          withCredentials: true,
          headers: getHeaders()
        })
      ]);
      
      if (statsRes.data?.success) {
        setStats(statsRes.data.data);
      }
      
      if (milkRes.data?.success) {
        setMilkProductionData(milkRes.data.data);
      }
      
      if (financeRes.data?.success) {
        setFinanceData(financeRes.data.data);
      }
      
    } catch (error) {
      console.error("❌ Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };
  
  // ✅ Initial data fetch
  useEffect(() => {
    fetchUserProfile();    // Pehle user profile fetch karo
    fetchDashboardData();  // Phir dashboard data fetch karo
  }, []);

  // Format stats for display
  const formattedStats = [
    { 
      title: 'Total Livestock', 
      value: stats.totalLivestock.toString(), 
      subtitle: 'Heads', 
      change: stats.change.livestock, 
      trend: stats.change.livestock.includes('+') ? 'up' : stats.change.livestock.includes('-') ? 'down' : 'neutral', 
      icon: Activity 
    },
    { 
      title: 'Milk Production', 
      value: stats.milkProductionToday.toFixed(2), 
      subtitle: "Gallons Today", 
      change: stats.change.milk, 
      trend: stats.change.milk.includes('+') ? 'up' : stats.change.milk.includes('-') ? 'down' : 'neutral', 
      icon: Droplet 
    },
    { 
      title: 'Monthly Income', 
      value: `PKR ${stats.monthlyIncome.toLocaleString()}`, 
      subtitle: 'Current Month', 
      change: stats.change.income, 
      trend: stats.change.income.includes('+') ? 'up' : 'down', 
      icon: TrendingUp 
    },
    { 
      title: 'Monthly Expenses', 
      value: `PKR ${stats.monthlyExpenses.toLocaleString()}`, 
      subtitle: 'Current Month', 
      change: stats.change.expenses, 
      trend: stats.change.expenses.includes('-') ? 'down' : 'up', 
      icon: Wallet 
    },
    { 
      title: 'Net Profit', 
      value: `PKR ${stats.netProfit.toLocaleString()}`, 
      subtitle: 'Current Month', 
      change: stats.change.profit, 
      trend: stats.netProfit > 0 ? 'up' : stats.netProfit < 0 ? 'down' : 'neutral', 
      icon: PiggyBank 
    },
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

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`px-4 py-3 border backdrop-blur-md ${
          isDark 
            ? 'bg-neutral-900/95 border-white/10' 
            : 'bg-white/95 border-neutral-200 shadow-lg'
        }`}>
          <p className={`text-[10px] font-mono uppercase tracking-widest mb-2 ${
            isDark ? 'text-neutral-400' : 'text-neutral-500'
          }`}>{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className={`text-sm font-bold ${spaceGrotesk.className}`} style={{ color: entry.color }}>
              {entry.name}: {entry.value} {entry.name === 'production' ? 'gallons' : 'k PKR'}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

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
        searchPlaceholder="Search orders..."
      />

      {/* MAIN CONTENT WRAPPER */}
      <div className={`${sidebarOpen ? 'ml-72' : 'ml-20'} transition-all duration-300 relative z-10`}>
        <main className="p-6 lg:p-10 max-w-[1600px] mx-auto space-y-8">
          
          {/* MODERNIZED WELCOME HERO - With Real User Name */}
          <div className={`relative overflow-hidden border group ${
            isDark 
              ? 'border-white/10 bg-neutral-900/30' 
              : 'border-neutral-300 bg-white'
          }`}>
             <div className={`absolute inset-0 ${
               isDark 
                 ? 'bg-gradient-to-br from-green-900/20 via-transparent to-transparent' 
                 : 'bg-gradient-to-br from-green-50/50 via-transparent to-transparent'
             }`} />
             
             {/* Scan line effect */}
             <div className={`absolute top-0 left-0 w-full h-[2px] bg-green-500/30 ${
               isDark ? 'shadow-[0_0_15px_rgba(34,197,94,0.5)]' : ''
             }`} 
             style={{
               animation: 'scanLine 8s ease-in-out infinite'
             }} />
             
             <div className="relative z-10 p-8 md:p-12 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                      </div>
                      <span className="font-mono text-[10px] text-green-500/80 uppercase tracking-[0.3em]">
                        [SYSTEM_ACTIVE] // {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    
                    <h1 className={`${spaceGrotesk.className} text-4xl md:text-6xl font-bold uppercase tracking-tighter leading-[0.9] mb-4`}>
                      Good Morning, <br/>
                      {/* ✅ Real user name show hoga, agar nahi to 'Farmer' show hoga */}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
                        {user.name}
                      </span>
                    </h1>
                    
                    <p className={`text-sm max-w-xl font-light leading-relaxed ${
                      isDark ? 'text-neutral-400' : 'text-neutral-600'
                    }`}>
                      Farm operations are running smoothly. {loading && <span className="text-green-500 ml-2">SYNCING...</span>}
                    </p>
                </div>
                
                {/* Weather Widget */}
                <div className={`relative cursor-pointer overflow-hidden border backdrop-blur-md group/weather ${
                  isDark 
                    ? 'bg-neutral-900/50 border-white/10' 
                    : 'bg-white border-neutral-300 shadow-sm'
                }`}>
                    <div className={`absolute inset-0 ${
                      isDark
                        ? 'bg-gradient-to-br from-amber-900/10 via-transparent to-transparent'
                        : 'bg-gradient-to-br from-amber-50/50 via-transparent to-transparent'
                    }`} />
                    
                    <div className="relative z-10 px-8 py-6">
                      <div className="flex items-center gap-2 mb-3">
                        <ThermometerSun className={`w-4 h-4 ${
                          isDark ? 'text-amber-400' : 'text-amber-500'
                        }`} />
                        <span className={`text-[9px] font-mono uppercase tracking-[0.3em] ${
                          isDark ? 'text-neutral-500' : 'text-neutral-400'
                        }`}>
                          WEATHER
                        </span>
                      </div>
                      
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className={`text-5xl font-bold ${spaceGrotesk.className} tracking-tighter`}>24°</span>
                        <span className={`text-lg font-bold ${spaceGrotesk.className} ${
                          isDark ? 'text-neutral-600' : 'text-neutral-400'
                        }`}>C</span>
                      </div>
                      
                      <div className={`text-xs font-bold mb-1 ${
                        isDark ? 'text-neutral-400' : 'text-neutral-600'
                      }`}>
                        Islamabad, PK
                      </div>
                      
                      <div className={`flex items-center gap-2 text-[9px] font-mono font-bold ${
                        isDark ? 'text-green-400/70' : 'text-green-600/70'
                      }`}>
                        <div className="flex items-center gap-1">
                          <div className={`w-1.5 h-1.5 rounded-full ${
                            isDark ? 'bg-amber-400' : 'bg-amber-500'
                          }`} />
                          <span>CLEAR</span>
                        </div>
                        <span className={isDark ? 'text-neutral-700' : 'text-neutral-300'}>|</span>
                        <span>UV: 5</span>
                      </div>
                    </div>
                    
                    {/* Corner brackets */}
                    <div className={`absolute top-0 left-0 w-3 h-3 border-l border-t transition-all ${
                      isDark ? 'border-amber-500/20 group-hover/weather:border-amber-500/40' : 'border-amber-500/30 group-hover/weather:border-amber-500/50'
                    }`} />
                    <div className={`absolute bottom-0 right-0 w-3 h-3 border-r border-b transition-all ${
                      isDark ? 'border-amber-500/20 group-hover/weather:border-amber-500/40' : 'border-amber-500/30 group-hover/weather:border-amber-500/50'
                    }`} />
                </div>
             </div>
             <CornerBrackets />
          </div>

          {/* ENHANCED STATS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
            {formattedStats.map((stat, idx) => (
              <div key={idx} className={`relative p-6 border transition-all hover:-translate-y-1 overflow-hidden group/card ${
                isDark 
                  ? 'bg-neutral-900/50 border-white/5 hover:border-green-500/20' 
                  : 'bg-white border-neutral-300 hover:border-green-500/30 shadow-sm'
              }`}>
                {/* Animated border glow on hover */}
                <div className={`absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 ${
                  isDark 
                    ? 'bg-gradient-to-br from-green-500/5 via-transparent to-transparent' 
                    : 'bg-gradient-to-br from-green-50 via-transparent to-transparent'
                }`} />
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-5">
                    <div className={`p-2.5 border ${
                      isDark 
                        ? 'bg-white/5 border-white/10' 
                        : 'bg-neutral-50 border-neutral-200'
                    }`}>
                      <stat.icon className={`w-4 h-4 ${
                        isDark ? 'text-green-400' : 'text-green-600'
                      }`} />
                    </div>
                    <div className={`text-[9px] py-1 px-2 font-bold font-mono flex items-center gap-1 border ${
                      stat.change.includes('+') 
                        ? isDark 
                          ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                          : 'bg-green-50 text-green-600 border-green-200'
                        : stat.change.includes('-')
                          ? isDark
                            ? 'bg-red-500/10 text-red-400 border-red-500/20'
                            : 'bg-red-50 text-red-600 border-red-200'
                          : isDark
                            ? 'bg-neutral-500/10 text-neutral-400 border-neutral-500/20'
                            : 'bg-neutral-100 text-neutral-600 border-neutral-200'
                    }`}>
                      {stat.change} 
                      {stat.change !== '0' && stat.change !== '0%' && (
                        stat.trend === 'up' ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className={`${spaceGrotesk.className} text-3xl font-bold tracking-tight`}>
                      {loading ? '...' : stat.value}
                    </h3>
                    <p className={`text-[10px] uppercase tracking-[0.2em] font-bold font-mono ${
                      isDark ? 'text-neutral-500' : 'text-neutral-400'
                    }`}>{stat.title}</p>
                    <p className={`text-xs ${isDark ? 'text-neutral-600' : 'text-neutral-500'}`}>
                      {stat.subtitle}
                    </p>
                  </div>
                </div>
                
                {/* Bottom accent line */}
                <div className={`absolute bottom-0 left-0 h-[2px] w-0 group-hover/card:w-full transition-all duration-500 ease-out ${
                  isDark ? 'bg-green-500' : 'bg-green-600'
                }`} />
                
                {/* Corner brackets on hover */}
                <div className={`absolute top-0 left-0 w-2 h-2 border-l border-t border-green-500/0 group-hover/card:border-green-500/50 transition-all duration-300`} />
                <div className={`absolute bottom-0 right-0 w-2 h-2 border-r border-b border-green-500/0 group-hover/card:border-green-500/50 transition-all duration-300`} />
              </div>
            ))}
          </div>

          {/* MODERNIZED CHARTS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Milk Production Chart */}
            <div className={`border p-8 relative overflow-hidden group/chart ${
              isDark 
                ? 'bg-neutral-900/30 border-white/5' 
                : 'bg-white border-neutral-300 shadow-sm'
            }`}>
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Droplet className={`w-4 h-4 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                      <span className="font-mono text-[9px] text-green-500/70 uppercase tracking-[0.3em]">
                        PRODUCTION_LOG
                      </span>
                    </div>
                    <h3 className={`${spaceGrotesk.className} text-xl font-bold uppercase tracking-tight`}>
                      Milk Production
                    </h3>
                    <p className={`text-xs mt-1 ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                      Weekly Overview
                    </p>
                  </div>
                  <div className={`px-3 py-1 border text-[9px] font-mono font-bold ${
                    isDark 
                      ? 'bg-green-500/10 border-green-500/20 text-green-400' 
                      : 'bg-green-50 border-green-200 text-green-600'
                  }`}>
                    {loading ? 'LOADING...' : 'ACTIVE'}
                  </div>
                </div>

                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={milkProductionData.length > 0 ? milkProductionData : [
                          { day: 'Mon', production: 0 },
                          { day: 'Tue', production: 0 },
                          { day: 'Wed', production: 0 },
                          { day: 'Thu', production: 0 },
                          { day: 'Fri', production: 0 },
                          { day: 'Sat', production: 0 },
                          { day: 'Sun', production: 0 }
                        ]}>
                            <defs>
                              <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#22c55e" stopOpacity={isDark ? 0.3 : 0.2}/>
                                <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid 
                              strokeDasharray="3 3" 
                              stroke={isDark ? "#262626" : "#e5e7eb"} 
                              vertical={false} 
                            />
                            <XAxis 
                              dataKey="day" 
                              axisLine={false} 
                              tickLine={false} 
                              tick={{ 
                                fill: isDark ? '#737373' : '#64748b', 
                                fontSize: 11, 
                                fontWeight: 600,
                                fontFamily: 'monospace'
                              }} 
                            />
                            <YAxis 
                              axisLine={false} 
                              tickLine={false} 
                              tick={{ 
                                fill: isDark ? '#737373' : '#64748b', 
                                fontSize: 11, 
                                fontWeight: 600,
                                fontFamily: 'monospace'
                              }} 
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Area 
                              type="monotone" 
                              dataKey="production" 
                              stroke="#22c55e" 
                              strokeWidth={2.5} 
                              fill="url(#colorProd)" 
                              dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                              activeDot={{ r: 6, strokeWidth: 0 }}
                              name="production"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <CornerBrackets />
            </div>

            {/* Finance Chart */}
            <div className={`border p-8 relative overflow-hidden group/chart ${
              isDark 
                ? 'bg-neutral-900/30 border-white/5' 
                : 'bg-white border-neutral-300 shadow-sm'
            }`}>
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className={`w-4 h-4 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                      <span className="font-mono text-[9px] text-green-500/70 uppercase tracking-[0.3em]">
                        FINANCIAL_DATA
                      </span>
                    </div>
                    <h3 className={`${spaceGrotesk.className} text-xl font-bold uppercase tracking-tight`}>
                      Finance Overview
                    </h3>
                    <p className={`text-xs mt-1 ${isDark ? 'text-neutral-500' : 'text-neutral-400'}`}>
                      6 Month Trend
                    </p>
                  </div>
                  
                  {/* Legend */}
                  <div className="flex gap-4 text-[9px] font-mono font-bold">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-[2px] bg-green-500" />
                      <span className={isDark ? 'text-neutral-400' : 'text-neutral-500'}>Revenue</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-[2px] bg-red-500" />
                      <span className={isDark ? 'text-neutral-400' : 'text-neutral-500'}>Expenses</span>
                    </div>
                  </div>
                </div>

                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={financeData.length > 0 ? financeData : [
                          { month: 'Jan', revenue: 0, expenses: 0 },
                          { month: 'Feb', revenue: 0, expenses: 0 },
                          { month: 'Mar', revenue: 0, expenses: 0 },
                          { month: 'Apr', revenue: 0, expenses: 0 },
                          { month: 'May', revenue: 0, expenses: 0 },
                          { month: 'Jun', revenue: 0, expenses: 0 }
                        ]}>
                            <CartesianGrid 
                              strokeDasharray="3 3" 
                              stroke={isDark ? "#262626" : "#e5e7eb"} 
                              vertical={false} 
                            />
                            <XAxis 
                              dataKey="month" 
                              axisLine={false} 
                              tickLine={false} 
                              tick={{ 
                                fill: isDark ? '#737373' : '#64748b', 
                                fontSize: 11, 
                                fontWeight: 600,
                                fontFamily: 'monospace'
                              }} 
                            />
                            <YAxis 
                              axisLine={false} 
                              tickLine={false} 
                              tick={{ 
                                fill: isDark ? '#737373' : '#64748b', 
                                fontSize: 11, 
                                fontWeight: 600,
                                fontFamily: 'monospace'
                              }} 
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Line 
                              type="monotone" 
                              dataKey="revenue" 
                              stroke="#22c55e" 
                              strokeWidth={2.5} 
                              dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                              activeDot={{ r: 6, strokeWidth: 0 }}
                              name="Revenue"
                            />
                            <Line 
                              type="monotone" 
                              dataKey="expenses" 
                              stroke="#ef4444" 
                              strokeWidth={2.5} 
                              dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                              activeDot={{ r: 6, strokeWidth: 0 }}
                              name="Expenses"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <CornerBrackets />
            </div>
          </div>
        </main>
      </div>

      {/* Scan line animation */}
      <style jsx global>{`
        @keyframes scanLine {
          0%, 100% { transform: translateY(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(500px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}