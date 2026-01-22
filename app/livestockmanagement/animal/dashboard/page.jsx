"use client";

import React, { useState } from 'react';
import Navbar from '@/components/dashboard/Navbar';
import { 
  Activity, HeartPulse, ThermometerSun, Skull, TrendingUp,
  Home, Search, Filter, Plus, Eye, Edit, Trash2, ChevronDown, X
} from 'lucide-react';
import { Space_Grotesk, Inter } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300", "500", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function LivestockDashboard() {
  const [isDark, setIsDark] = useState(false); 
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('Overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showShedForm, setShowShedForm] = useState(false);
  const [editingShed, setEditingShed] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [viewingShed, setViewingShed] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    capacity: '',
    status: 'active'
  });

  // --- LIVESTOCK DATA ---
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

  // Initial sheds data
  const initialSheds = [
    { 
      id: 1,
      name: "Langosh, Durgan and Heller", 
      capacity: 317, 
      status: "active", 
      createdDate: "2025-09-16 08:58:15" 
    },
    { 
      id: 2,
      name: "Bashirian, Gleichner and Schroeder", 
      capacity: 323, 
      status: "active", 
      createdDate: "2025-09-16 08:41:12" 
    },
    { 
      id: 3,
      name: "Crona - Kuphal", 
      capacity: 111, 
      status: "active", 
      createdDate: "2025-09-12 05:04:05" 
    },
    { 
      id: 4,
      name: "Ernser, Breitenberg and Lesch", 
      capacity: 299, 
      status: "active", 
      createdDate: "2025-09-10 11:01:02" 
    },
    { 
      id: 5,
      name: "Auto Shed", 
      capacity: 10, 
      status: "active", 
      createdDate: "2025-08-13 08:49:19" 
    },
  ];

  // --- SHEDS DATA WITH STORAGE ---
  const [sheds, setSheds] = useState(() => {
    // Load from storage on mount
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('livestockSheds');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {
          console.error('Error parsing stored sheds:', e);
        }
      }
    }
    return initialSheds;
  });

  // Save to storage whenever sheds change
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('livestockSheds', JSON.stringify(sheds));
    }
  }, [sheds]);

  const filteredSheds = sheds.filter(shed => {
    const matchesSearch = shed.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || shed.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  // Handle Add/Edit Shed
  const handleOpenForm = (shed = null) => {
    if (shed) {
      setEditingShed(shed);
      setFormData({
        name: shed.name,
        capacity: shed.capacity.toString(),
        status: shed.status
      });
    } else {
      setEditingShed(null);
      setFormData({
        name: '',
        capacity: '',
        status: 'active'
      });
    }
    setShowShedForm(true);
  };

  const handleCloseForm = () => {
    setShowShedForm(false);
    setEditingShed(null);
    setFormData({
      name: '',
      capacity: '',
      status: 'active'
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingShed) {
      // Update existing shed
      setSheds(sheds.map(shed => 
        shed.id === editingShed.id 
          ? { 
              ...shed, 
              name: formData.name, 
              capacity: parseInt(formData.capacity),
              status: formData.status
            }
          : shed
      ));
    } else {
      // Add new shed
      const newShed = {
        id: Math.max(...sheds.map(s => s.id)) + 1,
        name: formData.name,
        capacity: parseInt(formData.capacity),
        status: formData.status,
        createdDate: new Date().toISOString().slice(0, 19).replace('T', ' ')
      };
      setSheds([newShed, ...sheds]);
    }
    
    handleCloseForm();
  };

  const handleDelete = (id) => {
    setSheds(sheds.filter(shed => shed.id !== id));
    setDeleteConfirm(null);
  };

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

      {/* OVERLAY FOR MODALS */}
      {(showShedForm || deleteConfirm) && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => {
            handleCloseForm();
            setDeleteConfirm(null);
          }}
        ></div>
      )}

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
              <h1 className={`${spaceGrotesk.className} text-4xl font-bold mb-2`}>
                {activeTab === 'Sheds' ? 'Shed Management' : 'Livestock Analytics'}
              </h1>
              <p className="font-medium opacity-60">
                {activeTab === 'Sheds' 
                  ? 'Manage farm buildings, sheds, and field locations for housing your livestock.' 
                  : 'Real-time monitoring of herd population and health metrics.'}
              </p>
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

          {/* CONDITIONAL RENDERING BASED ON ACTIVE TAB */}
          {activeTab === 'Overview' && (
            <>
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
            </>
          )}

          {/* SHEDS TAB CONTENT */}
          {activeTab === 'Sheds' && (
            <>
              {/* HEADER SECTION */}
              <section className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-4 bg-green-500 rounded-full"></div>
                    <h2 className="text-xs font-black uppercase tracking-[0.2em]">Shed Locations</h2>
                  </div>
                  <button className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200 font-semibold text-sm ${
                    isDark 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-green-600 hover:bg-green-700 text-white shadow-sm'
                  }`}
                  onClick={() => handleOpenForm()}
                  >
                    <Plus className="w-4 h-4" />
                    Add Shed
                  </button>
                </div>
              </section>

              {/* SEARCH AND FILTER BAR */}
              <section className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Search Card */}
                  <div className={`relative p-6 rounded-lg border ${
                    isDark ? 'bg-neutral-900/50 border-white/5' : 'bg-white border-slate-300 border-b-4 shadow-sm'
                  }`}>
                    <div className="flex items-center gap-3">
                      <Search className="w-5 h-5 opacity-40" />
                      <input
                        type="text"
                        placeholder="Search sheds..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={`flex-1 bg-transparent outline-none text-sm font-medium ${
                          isDark ? 'placeholder:text-slate-500' : 'placeholder:text-slate-400'
                        }`}
                      />
                    </div>
                    <CornerBrackets />
                  </div>

                  {/* Filter Card */}
                  <div className="relative">
                    <div className={`relative p-6 rounded-lg border cursor-pointer ${
                      isDark ? 'bg-neutral-900/50 border-white/5' : 'bg-white border-slate-300 border-b-4 shadow-sm'
                    }`} onClick={() => setFilterOpen(!filterOpen)}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Filter className="w-5 h-5 opacity-40" />
                          <span className="text-sm font-medium">Filter by status</span>
                        </div>
                        <ChevronDown className={`w-4 h-4 transition-transform ${filterOpen ? 'rotate-180' : ''}`} />
                      </div>
                      <CornerBrackets />
                    </div>

                    {filterOpen && (
                      <div className={`absolute top-full mt-2 right-0 w-full rounded-lg border shadow-xl overflow-hidden z-20 ${
                        isDark ? 'bg-neutral-900 border-white/5' : 'bg-white border-slate-300'
                      }`}>
                        {['all', 'active', 'inactive', 'maintenance'].map((status) => (
                          <button
                            key={status}
                            onClick={() => {
                              setSelectedStatus(status);
                              setFilterOpen(false);
                            }}
                            className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                              selectedStatus === status
                                ? 'bg-green-600 text-white'
                                : isDark
                                ? 'hover:bg-white/5'
                                : 'hover:bg-slate-50'
                            }`}
                          >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* SHEDS TABLE */}
              <section className="space-y-6">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-4 bg-amber-500 rounded-full"></div>
                  <h2 className="text-xs font-black uppercase tracking-[0.2em]">All Sheds</h2>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {filteredSheds.map((shed) => (
                    <div key={shed.id} className={`relative p-6 rounded-lg border transition-all duration-300 hover:-translate-y-1 ${
                      isDark ? 'bg-neutral-900/50 border-white/5' : 'bg-white border-slate-300 border-b-4 hover:border-green-600 shadow-sm'
                    }`}>
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        {/* Name */}
                        <div className="md:col-span-4">
                          <span className="text-[10px] font-bold uppercase tracking-widest block mb-1 opacity-50">
                            Shed Name
                          </span>
                          <h3 className="text-lg font-bold">{shed.name}</h3>
                        </div>

                        {/* Capacity */}
                        <div className="md:col-span-2">
                          <span className="text-[10px] font-bold uppercase tracking-widest block mb-1 opacity-50">
                            Capacity
                          </span>
                          <p className={`${spaceGrotesk.className} text-2xl font-bold text-green-500`}>
                            {shed.capacity}
                          </p>
                        </div>

                        {/* Status */}
                        <div className="md:col-span-2">
                          <span className="text-[10px] font-bold uppercase tracking-widest block mb-1 opacity-50">
                            Status
                          </span>
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-green-500/10 text-green-500 border border-green-500/20">
                            {shed.status}
                          </span>
                        </div>

                        {/* Created Date */}
                        <div className="md:col-span-3">
                          <span className="text-[10px] font-bold uppercase tracking-widest block mb-1 opacity-50">
                            Created Date
                          </span>
                          <p className="text-sm font-medium opacity-70">{shed.createdDate}</p>
                        </div>

                        {/* Actions */}
                        <div className="md:col-span-1 flex items-center justify-end gap-2">
                          <button 
                            className={`p-2 rounded transition-colors ${
                              isDark ? 'hover:bg-white/10' : 'hover:bg-slate-100'
                            }`} 
                            title="View"
                            onClick={() => alert(`Viewing shed: ${shed.name}`)}
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            className={`p-2 rounded transition-colors ${
                              isDark ? 'hover:bg-white/10' : 'hover:bg-slate-100'
                            }`} 
                            title="Edit"
                            onClick={() => handleOpenForm(shed)}
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            className={`p-2 rounded transition-colors ${
                              isDark ? 'hover:bg-red-500/20 text-red-400' : 'hover:bg-red-50 text-red-600'
                            }`} 
                            title="Delete"
                            onClick={() => setDeleteConfirm(shed)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <CornerBrackets />
                    </div>
                  ))}
                </div>

                {/* Empty State */}
                {filteredSheds.length === 0 && (
                  <div className={`relative p-12 rounded-lg border text-center ${
                    isDark ? 'bg-neutral-900/50 border-white/5' : 'bg-white border-slate-300 border-b-4 shadow-sm'
                  }`}>
                    <Home className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <h3 className={`${spaceGrotesk.className} text-xl font-bold mb-2`}>No sheds found</h3>
                    <p className="text-sm opacity-60">Try adjusting your search or filter criteria</p>
                    <CornerBrackets />
                  </div>
                )}
              </section>
            </>
          )}

          {/* ANIMALS TAB CONTENT */}
          {activeTab === 'Animals' && (
            <div className="text-center py-20">
              <Activity className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <h3 className={`${spaceGrotesk.className} text-2xl font-bold mb-2`}>Animals Management</h3>
              <p className="opacity-60">This section is coming soon...</p>
            </div>
          )}

        </main>
      </div>

      {/* ADD/EDIT SHED FORM SIDEBAR */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-[500px] z-50 transform transition-transform duration-300 ${
        showShedForm ? 'translate-x-0' : 'translate-x-full'
      } ${isDark ? 'bg-neutral-900' : 'bg-white'} shadow-2xl overflow-y-auto`}>
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className={`${spaceGrotesk.className} text-2xl font-bold mb-1`}>
                {editingShed ? 'Edit Shed' : 'Add New Shed'}
              </h2>
              <p className="text-sm opacity-60">
                {editingShed ? 'Update shed information' : 'Create a new shed location'}
              </p>
            </div>
            <button
              onClick={handleCloseForm}
              className={`p-2 rounded-lg transition-colors ${
                isDark ? 'hover:bg-white/10' : 'hover:bg-slate-100'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Shed Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-3 opacity-60">
                Shed Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter shed name"
                className={`w-full px-4 py-3 rounded-lg border outline-none transition-all ${
                  isDark 
                    ? 'bg-neutral-800 border-white/10 focus:border-green-500' 
                    : 'bg-slate-50 border-slate-300 focus:border-green-500'
                }`}
              />
            </div>

            {/* Capacity */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-3 opacity-60">
                Capacity *
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.capacity}
                onChange={(e) => setFormData({...formData, capacity: e.target.value})}
                placeholder="Enter capacity"
                className={`w-full px-4 py-3 rounded-lg border outline-none transition-all ${
                  isDark 
                    ? 'bg-neutral-800 border-white/10 focus:border-green-500' 
                    : 'bg-slate-50 border-slate-300 focus:border-green-500'
                }`}
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-3 opacity-60">
                Status *
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({...formData, status: e.target.value})}
                className={`w-full px-4 py-3 rounded-lg border outline-none transition-all ${
                  isDark 
                    ? 'bg-neutral-800 border-white/10 focus:border-green-500' 
                    : 'bg-slate-50 border-slate-300 focus:border-green-500'
                }`}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleCloseForm}
                className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
                  isDark 
                    ? 'bg-neutral-800 hover:bg-neutral-700' 
                    : 'bg-slate-200 hover:bg-slate-300'
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 rounded-lg font-semibold bg-green-600 hover:bg-green-700 text-white transition-all"
              >
                {editingShed ? 'Update Shed' : 'Add Shed'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirm && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className={`relative max-w-md w-full p-8 rounded-xl ${
            isDark ? 'bg-neutral-900' : 'bg-white'
          } shadow-2xl`}>
            <div className="text-center">
              <div className={`inline-flex p-4 rounded-full mb-4 ${
                isDark ? 'bg-red-500/10' : 'bg-red-50'
              }`}>
                <Trash2 className="w-8 h-8 text-red-500" />
              </div>
              <h3 className={`${spaceGrotesk.className} text-xl font-bold mb-2`}>
                Delete Shed?
              </h3>
              <p className="text-sm opacity-60 mb-6">
                Are you sure you want to delete "{deleteConfirm.name}"? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
                    isDark 
                      ? 'bg-neutral-800 hover:bg-neutral-700' 
                      : 'bg-slate-200 hover:bg-slate-300'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirm.id)}
                  className="flex-1 px-6 py-3 rounded-lg font-semibold bg-red-600 hover:bg-red-700 text-white transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
            <CornerBrackets />
          </div>
        </div>
      )}
    </div>
  );
}