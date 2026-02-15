"use client";
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Sun, Moon, Bell, LogOut, Upload, Trash2,
  Home, Milk, Package, DollarSign, Users, CreditCard,
  Activity, ChevronRight, ChevronDown, ChevronLeft, Zap
} from 'lucide-react';
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300", "500", "700"] });

export default function Navbar({ 
  isDark, 
  setIsDark, 
  sidebarOpen, 
  setSidebarOpen
}) {
  const pathname = usePathname();
  const [livestockExpanded, setLivestockExpanded] = useState(true);
  const [milkExpanded, setMilkExpanded] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const fileInputRef = useRef(null);
  const profileMenuRef = useRef(null);

  // Load theme preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('themeMode');
    if (savedTheme !== null) {
      setIsDark(savedTheme === 'dark');
    }
  }, [setIsDark]);

  // Save theme preference whenever it changes
  useEffect(() => {
    localStorage.setItem('themeMode', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    const savedPhoto = localStorage.getItem('profilePhoto');
    if (savedPhoto) {
      setProfilePhoto(savedPhoto);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setProfilePhoto(base64String);
        localStorage.setItem('profilePhoto', base64String);
      };
      reader.readAsDataURL(file);
    }
    setShowProfileMenu(false);
  };

  const handleRemovePhoto = () => {
    setProfilePhoto(null);
    localStorage.removeItem('profilePhoto');
    setShowProfileMenu(false);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    setShowProfileMenu(false);
  };

  const menuItems = [
    { 
      section: 'OVERVIEW', 
      items: [
        { name: 'Dashboard', icon: Home, route: '/dashboard' }
      ]
    },
    { 
      section: 'FARM OPS', 
      items: [
        { 
          name: 'Livestock Management', 
          icon: Activity, 
          type: 'collapsible',
          expandedState: livestockExpanded,
          setExpandedState: setLivestockExpanded,
          children: [
            { name: 'Animals', route: '/livestockmanagement/animal/dashboard' },
            { name: 'Species Management', route: '/livestockmanagement/species' },
            { name: 'Health & Vaccination', route: '/livestockmanagement/health/veterinarians' },
            { name: 'Reproduction', route: '/livestockmanagement/reproduction/dashboard' }
          ]
        },
        { 
          name: 'Milk Management', 
          icon: Milk, 
          type: 'collapsible',
          expandedState: milkExpanded,
          setExpandedState: setMilkExpanded,
          children: [
            { name: 'Sales Overview', route: '/milk-management/sales-overview' },
            { name: 'Milk Production', route: '/milk-management/production/dashboard' },
            { name: 'Sales', route: '/milk-management/sales/dashboard' },
            { name: 'One Time Cash Sales', route: '/milk-management/otcs/dashboard' }
          ]
        },
        { name: 'Inventory', icon: Package, route: '/inventory' },
        { name: 'Finances', icon: DollarSign, route: '/finances' },
        { name: 'Staff', icon: Users, route: '/staff' },
      ]
    },
    { 
      section: 'RELATIONSHIPS', 
      items: [
        { name: 'Customers', icon: Users, route: '/customers' }
      ]
    },
    { 
      section: 'SYSTEM', 
      items: [
        { name: 'Subscription', icon: CreditCard, route: '/subscription' }
      ]
    }
  ];

  return (
    <>
      {/* MODERNIZED SIDEBAR */}
      <aside className={`fixed left-0 top-0 h-full ${sidebarOpen ? 'w-72' : 'w-20'} border-r transition-all duration-300 z-50 flex flex-col ${
        isDark 
          ? 'bg-neutral-950 border-white/10' 
          : 'bg-white border-neutral-200'
      }`}>
        
        {/* Logo Section */}
        <div className={`h-20 flex-shrink-0 flex items-center ${sidebarOpen ? 'px-6' : 'px-0 justify-center'} border-b relative ${
          isDark ? 'border-white/10' : 'border-neutral-200'
        }`}>
          <Link href={'/'}>
            <div className="flex items-center gap-3">
              {sidebarOpen ? (
                <img src='/erp-logo.png' alt="ERP Logo" className='cursor-pointer h-28 w-auto object-contain' />
              ) : (
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg ${
                  isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700'
                }`}>
                  F
                </div>
              )}
            </div>
          </Link>
          
          {sidebarOpen && (
            <div className={`absolute bottom-0 left-0 h-[2px] bg-green-500 ${
              isDark ? 'shadow-[0_0_10px_rgba(34,197,94,0.5)]' : ''
            }`} 
            style={{ 
              width: '40%',
              animation: 'slideAccent 3s ease-in-out infinite'
            }} />
          )}
        </div>

        {/* Navigation Menu */}
        <div className={`flex-1 overflow-y-auto py-6 ${sidebarOpen ? 'px-4' : 'px-2'} space-y-8 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-700 [&::-webkit-scrollbar-thumb]:rounded-full`}>
          {menuItems.map((section, idx) => (
            <div key={idx}>
              {sidebarOpen && (
                <div className="flex items-center gap-2 mb-4 pl-3">
                  <div className={`h-[1px] w-3 ${isDark ? 'bg-green-500/30' : 'bg-green-500/50'}`} />
                  <h3 className={`text-[9px] font-black uppercase tracking-[0.25em] font-mono ${
                    isDark ? 'text-neutral-600' : 'text-neutral-400'
                  }`}>
                    {section.section}
                  </h3>
                </div>
              )}
              
              <div className="space-y-1">
                {section.items.map((item, i) => {
                  const isActive = pathname === item.route || (item.children && item.children.some(child => pathname === child.route));
                  
                  return (
                    <div key={i}>
                      {item.type === 'collapsible' ? (
                        sidebarOpen ? (
                          <button
                            onClick={() => item.setExpandedState(!item.expandedState)}
                            className={`group cursor-pointer w-full flex items-center justify-between px-3 py-3 transition-all relative ${
                              isActive
                                ? isDark 
                                  ? 'bg-green-500/10 text-green-400' 
                                  : 'bg-green-50 text-green-700' 
                                : isDark 
                                  ? 'text-neutral-400 hover:text-green-400 hover:bg-white/5' 
                                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                            }`}
                          >
                            {isActive && (
                              <div className={`absolute left-0 top-0 bottom-0 w-[2px] ${
                                isDark ? 'bg-green-400' : 'bg-green-600'
                              }`} />
                            )}
                            
                            <div className="flex items-center gap-3">
                              <item.icon className={`w-4 h-4 transition-transform ${
                                isActive ? 'scale-110' : 'group-hover:scale-110'
                              }`} />
                              <span className="text-[12px] font-bold tracking-wide">{item.name}</span>
                            </div>
                            <div className="transition-transform duration-200">
                              {item.expandedState ? (
                                <ChevronDown className="w-3 h-3 opacity-50" />
                              ) : (
                                <ChevronRight className="w-3 h-3 opacity-50" />
                              )}
                            </div>
                          </button>
                        ) : (
                          <Link
                            href={item.children[0].route}
                            className={`group w-full flex items-center justify-center py-3 transition-all relative ${
                              isActive
                                ? isDark 
                                  ? 'bg-green-500/10 text-green-400' 
                                  : 'bg-green-50 text-green-700'
                                : isDark 
                                  ? 'text-neutral-400 hover:text-green-400 hover:bg-white/5' 
                                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                            }`}
                            title={item.name}
                          >
                            {isActive && (
                              <div className={`absolute left-0 top-0 bottom-0 w-[2px] ${
                                isDark ? 'bg-green-400' : 'bg-green-600'
                              }`} />
                            )}
                            <item.icon className={`w-5 h-5 transition-transform ${
                              isActive ? 'scale-110' : 'group-hover:scale-110'
                            }`} />
                          </Link>
                        )
                      ) : (
                        <Link
                          href={item.route || '#'}
                          className={`group w-full flex items-center ${sidebarOpen ? 'justify-between px-3' : 'justify-center'} py-3 transition-all relative ${
                            isActive
                              ? isDark 
                                ? 'bg-green-500/10 text-green-400' 
                                : 'bg-green-50 text-green-700'
                              : isDark 
                                ? 'text-neutral-400 hover:text-green-400 hover:bg-white/5' 
                                : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                          }`}
                          title={!sidebarOpen ? item.name : ''}
                        >
                          {isActive && (
                            <div className={`absolute left-0 top-0 bottom-0 w-[2px] ${
                              isDark ? 'bg-green-400' : 'bg-green-600'
                            }`} />
                          )}
                          
                          {sidebarOpen ? (
                            <div className="flex items-center gap-3">
                              <item.icon className={`w-4 h-4 transition-transform ${
                                isActive ? 'scale-110' : 'group-hover:scale-110'
                              }`} />
                              <span className="text-[12px] font-bold tracking-wide">{item.name}</span>
                            </div>
                          ) : (
                            <item.icon className={`w-5 h-5 transition-transform ${
                              isActive ? 'scale-110' : 'group-hover:scale-110'
                            }`} />
                          )}
                        </Link>
                      )}

                      {sidebarOpen && item.type === 'collapsible' && item.expandedState && item.children && (
                        <div className={`mt-1 ml-6 pl-4 border-l space-y-1 ${
                          isDark ? 'border-white/10' : 'border-neutral-200'
                        }`}>
                          {item.children.map((subItem, subIdx) => {
                            const isSubActive = pathname === subItem.route;
                            return (
                              <Link
                                key={subIdx}
                                href={subItem.route}
                                className={`block w-full text-left px-3 py-2.5 text-[11px] font-bold transition-all relative ${
                                  isSubActive
                                    ? isDark
                                      ? 'text-green-400 bg-green-500/5'
                                      : 'text-green-600 bg-green-50'
                                    : isDark 
                                      ? 'text-neutral-500 hover:text-green-400 hover:bg-white/5' 
                                      : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'
                                }`}
                              >
                                {isSubActive && (
                                  <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full ${
                                    isDark ? 'bg-green-400' : 'bg-green-600'
                                  }`} />
                                )}
                                {subItem.name}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {sidebarOpen && (
          <div className={`p-6 border-t flex-shrink-0 ${
            isDark ? 'border-white/10' : 'border-neutral-200'
          }`}>
            <div className={`relative overflow-hidden p-5 border group/sub ${
              isDark 
                ? 'bg-gradient-to-br from-green-900/20 to-green-900/5 border-green-500/20' 
                : 'bg-gradient-to-br from-green-50 to-white border-green-200'
            }`}>
              <div className={`absolute top-0 left-0 w-2 h-2 border-l border-t ${
                isDark ? 'border-green-500/30' : 'border-green-400'
              }`} />
              <div className={`absolute bottom-0 right-0 w-2 h-2 border-r border-b ${
                isDark ? 'border-green-500/30' : 'border-green-400'
              }`} />
              
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className={`w-3 h-3 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                    <p className={`text-xs font-bold uppercase tracking-wider ${
                      isDark ? 'text-green-400' : 'text-green-700'
                    }`}>Pro Plan</p>
                  </div>
                  <p className={`text-[10px] font-mono ${
                    isDark ? 'text-neutral-500' : 'text-neutral-500'
                  }`}>Valid until Dec 2024</p>
                </div>
                <div className={`px-2 py-0.5 border text-[8px] font-mono font-bold ${
                  isDark
                    ? 'bg-green-500/10 border-green-500/20 text-green-400'
                    : 'bg-green-100 border-green-300 text-green-700'
                }`}>
                  ACTIVE
                </div>
              </div>
              
              <button className={`w-full text-[10px] font-bold uppercase tracking-widest py-2 border transition-all ${
                isDark
                  ? 'border-green-500/30 text-green-400 hover:bg-green-500/10'
                  : 'border-green-300 text-green-700 hover:bg-green-100'
              }`}>
                Manage Plan
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* Enhanced Arrow Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`fixed top-24 ${sidebarOpen ? 'left-[17.5rem]' : 'left-16'} z-50 p-2.5 border transition-all duration-300 shadow-lg hover:scale-110 backdrop-blur-md ${
          isDark 
            ? 'bg-neutral-900/80 border-green-500/20 hover:border-green-500/50 text-green-400' 
            : 'bg-white/90 border-neutral-300 hover:border-green-500 text-neutral-700 hover:text-green-600'
        }`}
        aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {sidebarOpen ? (
          <ChevronLeft className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
      </button>

      {/* MODERNIZED TOP NAVBAR */}
      <header className={`sticky top-0 z-40 h-20 border-b backdrop-blur-xl ${
        isDark 
          ? 'bg-neutral-950/90 border-white/10' 
          : 'bg-white/90 border-neutral-200'
      }`}>
        <div className="h-full px-6 lg:px-10 flex items-center justify-between">
          
          <div className="flex items-center gap-4">
          </div>

          <div className="flex items-center gap-6 ml-auto">
            
            <div className={`flex items-center gap-2 border-l pl-6 ${
              isDark ? 'border-white/10' : 'border-neutral-200'
            }`}>
              <button 
                onClick={() => setIsDark(!isDark)}
                className={`p-2.5 cursor-pointer border transition-all hover:scale-105 ${
                  isDark 
                    ? 'hover:bg-white/5 border-white/10 hover:border-white/20' 
                    : 'hover:bg-neutral-50 border-neutral-200 hover:border-neutral-300'
                }`}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              
              <button 
                className={`p-2.5 border cursor-pointer transition-all relative hover:scale-105 ${
                  isDark 
                    ? 'hover:bg-white/5 border-white/10 hover:border-white/20' 
                    : 'hover:bg-neutral-50 border-neutral-200 hover:border-neutral-300'
                }`}
                aria-label="Notifications"
              >
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
              </button>
            </div>
            
            <div className={`flex items-center gap-3 pl-4 border-l relative ${
              isDark ? 'border-white/10' : 'border-neutral-200'
            }`} ref={profileMenuRef}>
              <div className="text-right hidden cursor-pointer md:block">
                <p className={`text-sm font-bold ${spaceGrotesk.className} tracking-tight`}>Hamza</p>
                <p className={`text-[9px] uppercase font-mono tracking-[0.2em] font-bold ${
                  isDark ? 'text-neutral-600' : 'text-neutral-400'
                }`}>
                  Manager
                </p>
              </div>
              
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className={`relative cursor-pointer w-10 h-10 border-2 overflow-hidden flex items-center justify-center font-bold text-sm transition-all hover:scale-105 ${
                  showProfileMenu 
                    ? isDark
                      ? 'border-green-400 ring-2 ring-green-400/20'
                      : 'border-green-600 ring-2 ring-green-600/20'
                    : isDark
                      ? 'border-green-500/30 hover:border-green-500/50'
                      : 'border-green-500/50 hover:border-green-600'
                } ${isDark ? 'bg-gradient-to-br from-green-600/20 to-green-900/20 text-green-400' : 'bg-gradient-to-br from-green-50 to-green-100 text-green-700'}`}
              >
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  'H'
                )}
              </button>

              {showProfileMenu && (
                <div className={`absolute right-0 top-full mt-3 w-64 border backdrop-blur-xl overflow-hidden ${
                  isDark 
                    ? 'bg-neutral-900/95 border-white/10 shadow-2xl' 
                    : 'bg-white/95 border-neutral-200 shadow-xl'
                }`}>
                  <div className={`p-4 border-b ${isDark ? 'border-white/10' : 'border-neutral-200'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 border-2 overflow-hidden flex items-center justify-center font-bold ${
                        isDark
                          ? 'border-green-500/30 bg-gradient-to-br from-green-600/20 to-green-900/20 text-green-400'
                          : 'border-green-500/50 bg-gradient-to-br from-green-50 to-green-100 text-green-700'
                      }`}>
                        {profilePhoto ? (
                          <img src={profilePhoto} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          'H'
                        )}
                      </div>
                      <div>
                        <p className={`font-bold text-sm ${spaceGrotesk.className}`}>Hamza</p>
                        <p className={`text-[10px] font-mono uppercase tracking-wider ${
                          isDark ? 'text-neutral-500' : 'text-neutral-400'
                        }`}>Manager</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className={`w-full cursor-pointer flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all ${
                        isDark 
                          ? 'hover:bg-white/5 text-neutral-300' 
                          : 'hover:bg-neutral-50 text-neutral-700'
                      }`}
                    >
                      <Upload size={16} />
                      {profilePhoto ? 'Change Photo' : 'Upload Photo'}
                    </button>

                    {profilePhoto && (
                      <button
                        onClick={handleRemovePhoto}
                        className={`w-full cursor-pointer flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all ${
                          isDark 
                            ? 'hover:bg-red-500/10 text-red-400' 
                            : 'hover:bg-red-50 text-red-600'
                        }`}
                      >
                        <Trash2 size={16} />
                        Remove Photo
                      </button>
                    )}

                    <div className={`my-2 border-t ${isDark ? 'border-white/10' : 'border-neutral-200'}`} />

                    <button
                      onClick={handleLogout}
                      className={`w-full cursor-pointer flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all ${
                        isDark 
                          ? 'hover:bg-red-500/10 text-red-400' 
                          : 'hover:bg-red-50 text-red-600'
                      }`}
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
            </div>
          </div>
        </div>
      </header>

      <style jsx global>{`
        @keyframes slideAccent {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(150%); }
        }
      `}</style>
    </>
  );
}