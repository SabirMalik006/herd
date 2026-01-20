"use client";
import React, { useState } from 'react';
import { 
  Menu, X, Sun, Moon, Bell, ChevronRight, 
  Home, Milk, Package, DollarSign, Users, CreditCard,
  TrendingUp, Droplet, ThermometerSun,
  Activity, PiggyBank, Wallet, Sprout, Search
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { Space_Grotesk, Inter } from "next/font/google";

// Setup Fonts
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300", "500", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });

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
    { title: 'Total Livestock', value: '13', subtitle: 'Heads', change: '+2', icon: Activity },
    { title: 'Milk Production', value: '0.00', subtitle: "Gallons Today", change: '0%', icon: Droplet },
    { title: 'Monthly Income', value: 'PKR 0', subtitle: 'Current Month', change: '+12%', icon: TrendingUp },
    { title: 'Monthly Expenses', value: 'PKR 0', subtitle: 'Current Month', change: '-5%', icon: Wallet },
    { title: 'Net Profit', value: 'PKR 0', subtitle: 'Current Month', change: '0%', icon: PiggyBank },
  ];

  const menuItems = [
    { section: 'OVERVIEW', items: [
      { name: 'Dashboard', icon: Home, active: true }
    ]},
    { section: 'FARM OPS', items: [
      { name: 'Livestock', icon: Activity, hasSubmenu: true },
      { name: 'Milk Records', icon: Milk, hasSubmenu: true },
      { name: 'Inventory', icon: Package, hasSubmenu: true },
      { name: 'Finances', icon: DollarSign, hasSubmenu: true },
      { name: 'Staff', icon: Users, hasSubmenu: true },
    ]},
    { section: 'RELATIONSHIPS', items: [
      { name: 'Customers', icon: Users, hasSubmenu: true }
    ]},
    { section: 'SYSTEM', items: [
      { name: 'Subscription', icon: CreditCard, hasSubmenu: true }
    ]}
  ];

  // Helper: Visual Corner Brackets
  const CornerBrackets = ({ color }) => {
    const borderColor = color || (isDark ? "border-green-500/30" : "border-neutral-400/50");
    return (
      <>
        <div className={`absolute top-0 left-0 w-3 h-3 border-l border-t ${borderColor}`} />
        <div className={`absolute top-0 right-0 w-3 h-3 border-r border-t ${borderColor}`} />
        <div className={`absolute bottom-0 left-0 w-3 h-3 border-l border-b ${borderColor}`} />
        <div className={`absolute bottom-0 right-0 w-3 h-3 border-r border-b ${borderColor}`} />
      </>
    );
  };

  return (
    <div className={`min-h-screen ${isDark ? 'bg-neutral-950 text-white' : 'bg-neutral-50 text-neutral-900'} transition-colors duration-300 ${inter.className}`}>
      
      {/* BACKGROUND TEXTURE */}
      <div className={`fixed inset-0 pointer-events-none z-0 opacity-[0.03] ${isDark ? 'bg-[url("/grid-pattern-white.svg")]' : 'bg-[url("/grid-pattern-black.svg")]'}`} 
           style={{ backgroundSize: '30px 30px', backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)' }}>
      </div>

      {/* SIDEBAR */}
      <aside className={`fixed left-0 top-0 h-full ${sidebarOpen ? 'w-72' : 'w-0'} ${isDark ? 'bg-neutral-950 border-white/5' : 'bg-white border-neutral-200'} border-r transition-all duration-300 overflow-hidden z-50 flex flex-col shadow-xl lg:shadow-none`}>
        
        {/* Sidebar Header */}
        <div className={`h-20 flex-shrink-0 flex items-center px-8 border-b ${isDark ? 'border-white/5' : 'border-neutral-100'}`}>
           <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded bg-gradient-to-br from-green-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-green-900/20">
               <Sprout className="w-5 h-5 text-white" />
             </div>
             <span className={`${spaceGrotesk.className} text-xl font-bold tracking-tight`}>
               Agri<span className="text-green-600">Herd</span>
             </span>
           </div>
           <button onClick={() => setSidebarOpen(false)} className="lg:hidden ml-auto">
             <X className={`w-5 h-5 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`} />
           </button>
        </div>

        {/* Sidebar Nav - SCROLLBAR HIDDEN HERE */}
        <div className="flex-1 overflow-y-auto py-8 px-4 space-y-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {menuItems.map((section, idx) => (
            <div key={idx}>
              <h3 className={`text-[11px] font-bold ${isDark ? 'text-neutral-500' : 'text-neutral-800'} uppercase tracking-[0.2em] mb-4 pl-3 font-mono`}>
                {section.section}
              </h3>
              <div className="space-y-1">
                {section.items.map((item, i) => (
                  <button
                    key={i}
                    className={`group w-full flex items-center justify-between px-3 py-2.5 rounded-sm transition-all border border-transparent ${
                      item.active 
                        ? isDark 
                          ? 'bg-white/5 border-white/5 text-green-400' 
                          : 'bg-green-50 border-green-200 text-green-700'
                        : isDark 
                          ? 'text-neutral-400 hover:text-white hover:bg-white/5' 
                          : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className={`w-4 h-4 ${item.active ? 'text-green-500' : isDark ? 'opacity-70' : 'opacity-100 text-neutral-500 group-hover:text-neutral-900'}`} />
                      <span className="text-[13px] font-semibold tracking-wide">{item.name}</span>
                    </div>
                    {item.hasSubmenu && <ChevronRight className="w-3 h-3 opacity-50" />}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className={`p-6 border-t flex-shrink-0 ${isDark ? 'border-white/5' : 'border-neutral-200'}`}>
            <div className={`rounded-lg p-4 ${isDark ? 'bg-gradient-to-br from-green-900/20 to-emerald-900/10 border border-green-500/20' : 'bg-green-50 border border-green-200'}`}>
                <p className={`text-xs font-bold mb-1 ${isDark ? 'text-green-400' : 'text-green-800'}`}>Pro Plan Active</p>
                <p className={`text-[10px] ${isDark ? 'text-neutral-400' : 'text-neutral-600 font-medium'}`}>Valid until Dec 2024</p>
            </div>
        </div>
      </aside>

      {/* MAIN CONTENT WRAPPER */}
      <div className={`${sidebarOpen ? 'lg:ml-72' : 'ml-0'} transition-all duration-300 relative z-10`}>
        
        {/* HEADER */}
        <header className={`sticky top-0 z-40 h-20 ${isDark ? 'bg-neutral-950/80 border-white/5' : 'bg-white/90 border-neutral-200'} backdrop-blur-xl border-b`}>
          <div className="h-full px-6 lg:px-10 flex items-center justify-between">
            
            {/* Left: Menu & Search */}
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(!sidebarOpen)} className={`p-2 rounded-md ${isDark ? 'hover:bg-white/5 text-white' : 'hover:bg-neutral-100 text-neutral-900'}`}>
                <Menu className="w-5 h-5" />
              </button>
              
              <div className={`hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full border ${isDark ? 'bg-white/5 border-white/10' : 'bg-neutral-100 border-neutral-200'} w-64`}>
                <Search className={`w-4 h-4 ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`} />
                <input 
                  type="text" 
                  placeholder="Search livestock, orders..." 
                  className={`bg-transparent border-none outline-none text-xs w-full font-medium ${isDark ? 'text-white placeholder:text-neutral-600' : 'text-neutral-900 placeholder:text-neutral-500'}`} 
                />
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-6">
              <div className="hidden xl:flex items-center gap-2 font-mono text-[9px] text-green-600 uppercase tracking-widest px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                </span>
                SYS_ONLINE
              </div>

              <div className={`flex items-center gap-3 border-l pl-6 ${isDark ? 'border-white/10' : 'border-neutral-200'}`}>
                  <button onClick={() => setIsDark(!isDark)} className={`p-2 transition-transform hover:scale-110 ${isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-black'}`}>
                    {isDark ? <Sun size={18} /> : <Moon size={18} />}
                  </button>
                  <button className={`p-2 relative transition-transform hover:scale-110 ${isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-black'}`}>
                    <Bell size={18} />
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                  </button>
              </div>

              {/* Profile */}
              <div className="flex items-center gap-3 pl-2">
                <div className="text-right hidden md:block">
                  <p className={`text-sm font-bold leading-none ${isDark ? 'text-white' : 'text-neutral-900'}`}>Musa</p>
                  <p className={`text-[10px] mt-1 uppercase tracking-wider ${isDark ? 'text-neutral-500' : 'text-neutral-600 font-semibold'}`}>Manager</p>
                </div>
                <div className="w-9 h-9 rounded bg-white flex items-center justify-center border-2 border-green-500 overflow-hidden">
                    <div className="w-full h-full bg-neutral-200" /> 
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* DASHBOARD CONTENT */}
        <main className="p-6 lg:p-10 max-w-[1600px] mx-auto space-y-8">
          
          {/* WELCOME HERO */}
          <div className={`relative overflow-hidden rounded-xl border group ${isDark ? 'border-white/10' : 'border-neutral-200'}`}>
             {/* Gradient Background */}
             <div className={`absolute inset-0 bg-gradient-to-r ${isDark ? 'from-green-900/40 via-neutral-900 to-neutral-900' : 'from-green-50 via-white to-white'}`} />
             
             {/* Decorative Grid on Hero */}
             <div className="absolute inset-0 opacity-[0.05] bg-[size:20px_20px] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]" />

             <div className="relative z-10 p-8 md:p-10 flex flex-col md:flex-row justify-between items-end gap-6">
                <div>
                    <h1 className={`${spaceGrotesk.className} text-4xl md:text-5xl font-bold mb-3 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                        Good Morning, Musa
                    </h1>
                    <p className={`${isDark ? 'text-neutral-400' : 'text-neutral-700'} max-w-xl font-medium`}>
                        Farm operations are running smoothly. You have <span className="text-green-600 font-bold">3 pending tasks</span> for the livestock sector today.
                    </p>
                </div>
                
                {/* Weather Widget */}
                <div className={`flex items-center gap-4 px-6 py-3 rounded-lg border backdrop-blur-md ${isDark ? 'bg-black/20 border-white/10' : 'bg-white/60 border-neutral-200 shadow-sm'}`}>
                    <ThermometerSun className="w-8 h-8 text-yellow-500" />
                    <div>
                        <span className={`block text-2xl font-bold leading-none ${spaceGrotesk.className} ${isDark ? 'text-white' : 'text-neutral-900'}`}>24°C</span>
                        <span className={`text-[10px] uppercase tracking-wider font-semibold ${isDark ? 'text-white/60' : 'text-neutral-600'}`}>Sunny • Islamabad</span>
                    </div>
                </div>
             </div>
             
             <CornerBrackets />
          </div>

          {/* KPI STATS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {stats.map((stat, idx) => (
              <div key={idx} className={`relative p-6 rounded-lg border transition-all duration-300 group hover:-translate-y-1 ${
                isDark ? 'bg-neutral-900/50 border-white/5 hover:border-green-500/30' : 'bg-white border-neutral-200 hover:border-green-500/50 shadow-sm'
              }`}>
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-2 rounded-md ${isDark ? 'bg-white/5 text-neutral-400' : 'bg-neutral-100 text-neutral-600'} group-hover:text-green-600 transition-colors`}>
                    <stat.icon className="w-4 h-4" />
                  </div>
                  <span className={`text-[10px] font-mono py-0.5 px-1.5 rounded font-bold ${
                    stat.change.includes('+') 
                      ? 'bg-green-500/10 text-green-600' 
                      : stat.change === '0%' ? 'bg-neutral-500/10 text-neutral-600' : 'bg-red-500/10 text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                
                <h3 className={`${spaceGrotesk.className} text-2xl font-bold mb-1 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                    {stat.value}
                </h3>
                <p className={`text-[10px] uppercase tracking-widest font-bold mb-1 ${isDark ? 'text-neutral-500' : 'text-neutral-600'}`}>{stat.title}</p>
                <p className={`text-xs ${isDark ? 'text-neutral-600' : 'text-neutral-500'}`}>{stat.subtitle}</p>

                {/* Animated Bottom Line */}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-green-500 transition-all duration-500 group-hover:w-full" />
              </div>
            ))}
          </div>

          {/* CHARTS SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Chart 1 */}
            <div className={`rounded-xl border p-6 relative ${isDark ? 'bg-neutral-900/30 border-white/5' : 'bg-white border-neutral-200 shadow-sm'}`}>
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className={`${spaceGrotesk.className} text-lg font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>Milk Production</h3>
                        <p className={`text-xs uppercase tracking-widest font-semibold ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>Weekly Overview</p>
                    </div>
                    <button className={`p-1.5 rounded border ${isDark ? 'border-white/10 hover:bg-white/5 text-white' : 'border-neutral-200 hover:bg-neutral-50 text-neutral-700'}`}>
                        <TrendingUp className="w-4 h-4 opacity-70" />
                    </button>
                </div>
                
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={milkProductionData}>
                            <defs>
                                <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.2}/>
                                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#333" : "#e5e5e5"} vertical={false} />
                            <XAxis 
                                dataKey="day" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: isDark ? '#9ca3af' : '#4b5563', fontSize: 10, fontWeight: 600 }} 
                                dy={10}
                            />
                            <YAxis 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: isDark ? '#9ca3af' : '#4b5563', fontSize: 10, fontWeight: 600 }} 
                            />
                            <Tooltip 
                                contentStyle={{ 
                                    backgroundColor: isDark ? '#171717' : '#fff', 
                                    borderColor: isDark ? '#333' : '#e5e5e5',
                                    borderRadius: '8px',
                                    fontSize: '12px',
                                    color: isDark ? '#fff' : '#000',
                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                }}
                                itemStyle={{ color: isDark ? '#fff' : '#000' }}
                            />
                            <Area type="monotone" dataKey="production" stroke="#22c55e" strokeWidth={3} fillOpacity={1} fill="url(#colorProd)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <CornerBrackets />
            </div>

            {/* Chart 2 */}
            <div className={`rounded-xl border p-6 relative ${isDark ? 'bg-neutral-900/30 border-white/5' : 'bg-white border-neutral-200 shadow-sm'}`}>
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h3 className={`${spaceGrotesk.className} text-lg font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>Finance Overview</h3>
                        <p className={`text-xs uppercase tracking-widest font-semibold ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>Revenue vs Expenses</p>
                    </div>
                    <div className="flex gap-2">
                        <span className={`flex items-center gap-1 text-[10px] uppercase font-bold ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}><div className="w-2 h-2 rounded-full bg-green-500"></div> Rev</span>
                        <span className={`flex items-center gap-1 text-[10px] uppercase font-bold ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}><div className="w-2 h-2 rounded-full bg-red-500"></div> Exp</span>
                    </div>
                </div>

                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={financialData}>
                            <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#333" : "#e5e5e5"} vertical={false} />
                            <XAxis 
                                dataKey="month" 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: isDark ? '#9ca3af' : '#4b5563', fontSize: 10, fontWeight: 600 }} 
                                dy={10}
                            />
                            <YAxis 
                                axisLine={false} 
                                tickLine={false} 
                                tick={{ fill: isDark ? '#9ca3af' : '#4b5563', fontSize: 10, fontWeight: 600 }} 
                            />
                            <Tooltip 
                                contentStyle={{ 
                                    backgroundColor: isDark ? '#171717' : '#fff', 
                                    borderColor: isDark ? '#333' : '#e5e5e5',
                                    borderRadius: '8px',
                                    fontSize: '12px',
                                    color: isDark ? '#fff' : '#000',
                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                }} 
                            />
                            <Line type="monotone" dataKey="revenue" stroke="#22c55e" strokeWidth={3} dot={{r: 4, fill: isDark ? '#171717' : '#fff', strokeWidth: 2}} activeDot={{r: 6}} />
                            <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={3} dot={{r: 4, fill: isDark ? '#171717' : '#fff', strokeWidth: 2}} />
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