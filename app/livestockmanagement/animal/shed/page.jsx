"use client";
import React, { useState } from 'react';
import Navbar from '@/components/dashboard/Navbar'; 
import { 
  Plus, Search, Filter, Eye, Edit3, Trash2, MapPin, LayoutDashboard, Activity
} from 'lucide-react';
import { Space_Grotesk, Inter } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300", "500", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function ShedManagementPage() {
  const [isDark, setIsDark] = useState(true); 
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('Sheds');

  // --- UI HELPER: CORNER BRACKETS ---
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

  const shedData = [
    { name: "Langosh, Durgan and Heller", capacity: 317, status: "active", date: "2025-09-16 08:58:15" },
    { name: "Bashirian, Gleichner and Schroeder", capacity: 323, status: "active", date: "2025-09-16 08:41:12" },
    { name: "Crona - Kuphal", capacity: 111, status: "active", date: "2025-09-12 05:04:05" },
    { name: "Ernser, Breitenberg and Lesch", capacity: 299, status: "active", date: "2025-09-10 11:01:02" },
    { name: "Auto Shed", capacity: 10, status: "active", date: "2025-08-13 08:49:19" },
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${inter.className} ${
      isDark ? 'bg-neutral-950 text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* BACKGROUND TEXTURE */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className={`absolute inset-0 ${isDark ? "bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" : "bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"}`}></div>
      </div>

      <Navbar 
        isDark={isDark} setIsDark={setIsDark} 
        sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} 
        searchPlaceholder="Search sheds..." 
      />

      <div className={`${sidebarOpen ? 'lg:ml-72' : 'ml-0'} transition-all duration-300 relative z-10`}>
        <main className="p-6 lg:p-10 max-w-[1600px] mx-auto space-y-10">
          
          {/* HEADER SECTION: TITLE ON LEFT, TABS ON RIGHT */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className={`${spaceGrotesk.className} text-4xl font-bold mb-2 tracking-tight`}>
                Shed Management
              </h1>
              <p className="font-medium opacity-60">
                Detailed status and monitoring of farm building locations.
              </p>
            </div>

            {/* SMALL NAV BAR ON RIGHT */}
            <div className={`flex p-1 rounded-lg border ${isDark ? 'bg-neutral-900 border-white/5' : 'bg-white border-slate-300 shadow-sm'}`}>
              {[
                { id: 'Overview', icon: LayoutDashboard, label: 'Dashboard' },
                { id: 'Sheds', icon: MapPin, label: 'Sheds' },
                { id: 'Animals', icon: Activity, label: 'Animals' }
              ].map((tab) => (
                <button 
                  key={tab.id} 
                  onClick={() => setActiveTab(tab.id)} 
                  className={`flex items-center gap-2 px-6 py-2 text-xs font-bold rounded-md transition-all ${
                    activeTab === tab.id 
                      ? 'bg-green-600 text-white shadow-lg' 
                      : isDark ? 'text-slate-400 hover:bg-white/5' : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  <tab.icon size={14} />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <hr className={isDark ? 'border-white/5' : 'border-slate-300'} />

          {/* TABLE ACTIONS: SEARCH, FILTER, ADD */}
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={18} />
              <input 
                type="text" 
                placeholder="Search by shed name or ID..." 
                className={`w-full pl-12 pr-4 py-3.5 rounded-xl border outline-none transition-all ${
                  isDark ? 'bg-neutral-900/50 border-white/5 focus:border-green-500/50 text-white' : 'bg-white border-slate-200 focus:border-green-600 text-slate-900 shadow-sm'
                }`}
              />
            </div>
            
            <div className="flex gap-3 w-full lg:w-auto">
              <button className={`flex flex-1 lg:flex-none items-center gap-2 px-6 py-3.5 rounded-xl border font-bold text-[10px] uppercase tracking-widest transition-all justify-center ${
                isDark ? 'bg-neutral-900/50 border-white/5 hover:bg-white/5' : 'bg-white border-slate-200 hover:bg-slate-50 shadow-sm'
              }`}>
                <Filter size={16} /> Filter
              </button>
              
              <button className="flex flex-1 lg:flex-none items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3.5 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-green-900/20 justify-center">
                <Plus size={16} /> Add Shed
              </button>
            </div>
          </div>

          {/* SHED DATA TABLE */}
          <div className={`relative rounded-xl border overflow-hidden ${
            isDark ? 'bg-neutral-900/40 border-white/5' : 'bg-white border-slate-200 shadow-sm'
          }`}>
            <CornerBrackets />
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className={`text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ${
                    isDark ? 'bg-white/5' : 'bg-slate-50'
                  }`}>
                    <th className="px-8 py-5">Shed Name</th>
                    <th className="px-8 py-5 text-center">Capacity</th>
                    <th className="px-8 py-5 text-center">Status</th>
                    <th className="px-8 py-5">Created Date</th>
                    <th className="px-8 py-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300/10">
                  {shedData.map((shed, i) => (
                    <tr key={i} className={`group transition-all ${isDark ? 'hover:bg-white/[0.02]' : 'hover:bg-slate-50'}`}>
                      <td className="px-8 py-6">
                        <span className="font-bold text-sm tracking-tight">{shed.name}</span>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className={`font-mono text-xs px-3 py-1 rounded-md ${isDark ? 'bg-black/40 text-slate-400' : 'bg-slate-100 text-slate-600'}`}>
                          {shed.capacity}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-center">
                        <span className="inline-block px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-widest border border-emerald-500/20">
                          {shed.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 font-mono text-[11px] opacity-50 tracking-wider">
                        {shed.date}
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center justify-end gap-2">
                          <button className={`p-2 rounded-lg transition-all ${isDark ? 'bg-white/5 hover:bg-blue-500/20 text-blue-400' : 'bg-slate-100 hover:bg-blue-50 text-blue-600'}`}>
                            <Eye size={16} />
                          </button>
                          <button className={`p-2 rounded-lg transition-all ${isDark ? 'bg-white/5 hover:bg-amber-500/20 text-amber-400' : 'bg-slate-100 hover:bg-amber-50 text-amber-600'}`}>
                            <Edit3 size={16} />
                          </button>
                          <button className={`p-2 rounded-lg transition-all ${isDark ? 'bg-white/5 hover:bg-rose-500/20 text-rose-400' : 'bg-slate-100 hover:bg-rose-50 text-rose-600'}`}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-between items-center opacity-30 text-[9px] font-bold uppercase tracking-[0.3em] pt-4">
            <p>System Online: Farm Management</p>
            <p>© Outscalers Registry 2025</p>
          </div>
        </main>
      </div>
    </div>
  );
}