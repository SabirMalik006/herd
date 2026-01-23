"use client";

import React, { useState } from 'react';
import Navbar from '@/components/dashboard/Navbar';
import { 
  Search, Filter, Plus, Eye, Edit, Trash2, ChevronDown, X, Download,
  Activity, AlertCircle, FileText
} from 'lucide-react';
import { Space_Grotesk, Inter } from "next/font/google";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300", "500", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function AnimalsManagement() {
  const [isDark, setIsDark] = useState(false); 
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTypeOpen, setFilterTypeOpen] = useState(false);
  const [filterSpeciesOpen, setFilterSpeciesOpen] = useState(false);
  const [filterHealthOpen, setFilterHealthOpen] = useState(false);
  const [filterStatusOpen, setFilterStatusOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedSpecies, setSelectedSpecies] = useState('all');
  const [selectedHealth, setSelectedHealth] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAnimalForm, setShowAnimalForm] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [viewingAnimal, setViewingAnimal] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    animalType: 'Unknown Classification',
    gender: 'Female',
    status: 'Active',
    healthStatus: 'Healthy',
    breed: ''
  });
  const pathname = usePathname();

  // --- ANIMALS DATA WITH STORAGE ---
  const [animals, setAnimals] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('livestockAnimals');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          return parsed.length > 0 ? parsed : [];
        } catch (e) {
          console.error('Error parsing stored animals:', e);
        }
      }
    }
    return [];
  });

  // Save to storage whenever animals change
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('livestockAnimals', JSON.stringify(animals));
    }
  }, [animals]);

  const filteredAnimals = animals.filter(animal => {
    const matchesSearch = animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         animal.breed.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || animal.animalType === selectedType;
    const matchesSpecies = selectedSpecies === 'all' || animal.breed.toLowerCase().includes(selectedSpecies.toLowerCase());
    const matchesHealth = selectedHealth === 'all' || animal.healthStatus === selectedHealth;
    const matchesStatus = selectedStatus === 'all' || animal.status === selectedStatus;
    return matchesSearch && matchesType && matchesSpecies && matchesHealth && matchesStatus;
  });

  // Handle Add/Edit Animal
  const handleOpenForm = (animal = null) => {
    if (animal) {
      setEditingAnimal(animal);
      setFormData({
        name: animal.name,
        dateOfBirth: animal.dateOfBirth,
        animalType: animal.animalType,
        gender: animal.gender,
        status: animal.status,
        healthStatus: animal.healthStatus,
        breed: animal.breed
      });
    } else {
      setEditingAnimal(null);
      setFormData({
        name: '',
        dateOfBirth: '',
        animalType: 'Unknown Classification',
        gender: 'Female',
        status: 'Active',
        healthStatus: 'Healthy',
        breed: ''
      });
    }
    setShowAnimalForm(true);
  };

  const handleCloseForm = () => {
    setShowAnimalForm(false);
    setEditingAnimal(null);
    setFormData({
      name: '',
      dateOfBirth: '',
      animalType: 'Unknown Classification',
      gender: 'Female',
      status: 'Active',
      healthStatus: 'Healthy',
      breed: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingAnimal) {
      // Update existing animal
      setAnimals(animals.map(animal => 
        animal.id === editingAnimal.id 
          ? { ...animal, ...formData }
          : animal
      ));
    } else {
      // Add new animal
      const newAnimal = {
        id: animals.length > 0 ? Math.max(...animals.map(a => a.id)) + 1 : 1,
        ...formData
      };
      setAnimals([newAnimal, ...animals]);
    }
    
    handleCloseForm();
  };

  const handleDelete = (id) => {
    setAnimals(animals.filter(animal => animal.id !== id));
    setDeleteConfirm(null);
  };

  const handleExport = () => {
    const csv = [
      ['Name', 'Date of Birth', 'Animal Type', 'Gender', 'Status', 'Health Status', 'Breed'],
      ...filteredAnimals.map(a => [a.name, a.dateOfBirth, a.animalType, a.gender, a.status, a.healthStatus, a.breed])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'animals-export.csv';
    a.click();
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

      {/* OVERLAY FOR MODALS */}
      {(showAnimalForm || deleteConfirm || viewingAnimal) && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => {
            handleCloseForm();
            setDeleteConfirm(null);
            setViewingAnimal(null);
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
                Animals Management
              </h1>
              <p className="font-medium opacity-60">
                Track and manage your livestock animals, their health status, and breeding information.
              </p>
            </div>
            <div className={`flex p-1 rounded-lg border ${isDark ? 'bg-neutral-900 border-white/5' : 'bg-white border-slate-300 shadow-sm'}`}>
              <Link href="/livestockmanagement/animal/dashboard">
                <button 
                  className={`px-6 py-2 text-xs font-bold rounded-md transition-all ${
                    isActive('/livestockmanagement/animal/dashboard')
                      ? 'bg-green-600 text-white shadow-lg' 
                      : isDark ? 'text-slate-400 hover:bg-white/5' : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  Overview
                </button>
              </Link>
              <Link href="/livestockmanagement/animal/sheds">
                <button 
                  className={`px-6 py-2 text-xs font-bold rounded-md transition-all ${
                    isActive('/livestockmanagement/animal/sheds')
                      ? 'bg-green-600 text-white shadow-lg' 
                      : isDark ? 'text-slate-400 hover:bg-white/5' : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  Sheds
                </button>
              </Link>
              <Link href="/livestockmanagement/animal/animals">
                <button 
                  className={`px-6 py-2 text-xs font-bold rounded-md transition-all ${
                    isActive('/livestockmanagement/animal/animals')
                      ? 'bg-green-600 text-white shadow-lg' 
                      : isDark ? 'text-slate-400 hover:bg-white/5' : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  Animals
                </button>
              </Link>
            </div>
          </div>

          <hr className={isDark ? 'border-white/5' : 'border-slate-300'} />

          {/* HEADER SECTION */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-1 h-4 bg-green-500 rounded-full"></div>
                <h2 className="text-xs font-black uppercase tracking-[0.2em]">Animal Records</h2>
              </div>
              <button className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all duration-200 font-semibold text-sm ${
                isDark 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-green-600 hover:bg-green-700 text-white shadow-sm'
              }`}
              onClick={() => handleOpenForm()}
              >
                <Plus className="w-4 h-4" />
                Add Animal
              </button>
            </div>
          </section>

          {/* SEARCH AND FILTERS */}
          <section className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Search Card */}
              <div className={`relative p-4 rounded-lg border lg:col-span-2 ${
                isDark ? 'bg-neutral-900/50 border-white/5' : 'bg-white border-slate-300 border-b-4 shadow-sm'
              }`}>
                <div className="flex items-center gap-3">
                  <Search className="w-5 h-5 opacity-40" />
                  <input
                    type="text"
                    placeholder="Search animals..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className={`flex-1 bg-transparent outline-none text-sm font-medium ${
                      isDark ? 'placeholder:text-slate-500' : 'placeholder:text-slate-400'
                    }`}
                  />
                </div>
                <CornerBrackets />
              </div>

              {/* Filter by Type */}
              <div className="relative">
                <div className={`relative p-4 rounded-lg border cursor-pointer ${
                  isDark ? 'bg-neutral-900/50 border-white/5' : 'bg-white border-slate-300 border-b-4 shadow-sm'
                }`} onClick={() => setFilterTypeOpen(!filterTypeOpen)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 opacity-40" />
                      <span className="text-sm font-medium">Filter by type</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform ${filterTypeOpen ? 'rotate-180' : ''}`} />
                  </div>
                  <CornerBrackets />
                </div>

                {filterTypeOpen && (
                  <div className={`absolute top-full mt-2 right-0 w-full rounded-lg border shadow-xl overflow-hidden z-20 ${
                    isDark ? 'bg-neutral-900 border-white/5' : 'bg-white border-slate-300'
                  }`}>
                    {['all', 'Unknown Classification', 'Cow', 'Bull', 'Calf'].map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          setSelectedType(type);
                          setFilterTypeOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                          selectedType === type
                            ? 'bg-green-600 text-white'
                            : isDark
                            ? 'hover:bg-white/5'
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        {type === 'all' ? 'All Types' : type}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Filter by Species */}
              <div className="relative">
                <div className={`relative p-4 rounded-lg border cursor-pointer ${
                  isDark ? 'bg-neutral-900/50 border-white/5' : 'bg-white border-slate-300 border-b-4 shadow-sm'
                }`} onClick={() => setFilterSpeciesOpen(!filterSpeciesOpen)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 opacity-40" />
                      <span className="text-sm font-medium">Filter by species</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform ${filterSpeciesOpen ? 'rotate-180' : ''}`} />
                  </div>
                  <CornerBrackets />
                </div>

                {filterSpeciesOpen && (
                  <div className={`absolute top-full mt-2 right-0 w-full rounded-lg border shadow-xl overflow-hidden z-20 ${
                    isDark ? 'bg-neutral-900 border-white/5' : 'bg-white border-slate-300'
                  }`}>
                    {['all', 'Holstein', 'Jersey', 'Angus'].map((species) => (
                      <button
                        key={species}
                        onClick={() => {
                          setSelectedSpecies(species);
                          setFilterSpeciesOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                          selectedSpecies === species
                            ? 'bg-green-600 text-white'
                            : isDark
                            ? 'hover:bg-white/5'
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        {species === 'all' ? 'All Species' : species}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Filter by Health */}
              <div className="relative">
                <div className={`relative p-4 rounded-lg border cursor-pointer ${
                  isDark ? 'bg-neutral-900/50 border-white/5' : 'bg-white border-slate-300 border-b-4 shadow-sm'
                }`} onClick={() => setFilterHealthOpen(!filterHealthOpen)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 opacity-40" />
                      <span className="text-sm font-medium">Filter by Health</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform ${filterHealthOpen ? 'rotate-180' : ''}`} />
                  </div>
                  <CornerBrackets />
                </div>

                {filterHealthOpen && (
                  <div className={`absolute top-full mt-2 right-0 w-full rounded-lg border shadow-xl overflow-hidden z-20 ${
                    isDark ? 'bg-neutral-900 border-white/5' : 'bg-white border-slate-300'
                  }`}>
                    {['all', 'Healthy', 'Sick', 'Treatment'].map((health) => (
                      <button
                        key={health}
                        onClick={() => {
                          setSelectedHealth(health);
                          setFilterHealthOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                          selectedHealth === health
                            ? 'bg-green-600 text-white'
                            : isDark
                            ? 'hover:bg-white/5'
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        {health === 'all' ? 'All Health Status' : health}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Second Row - Status Filter and Actions */}
            <div className="flex flex-col md:flex-row gap-4">
              {/* Filter by Status */}
              <div className="relative md:w-64">
                <div className={`relative p-4 rounded-lg border cursor-pointer ${
                  isDark ? 'bg-neutral-900/50 border-white/5' : 'bg-white border-slate-300 border-b-4 shadow-sm'
                }`} onClick={() => setFilterStatusOpen(!filterStatusOpen)}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 opacity-40" />
                      <span className="text-sm font-medium">Filter by status</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform ${filterStatusOpen ? 'rotate-180' : ''}`} />
                  </div>
                  <CornerBrackets />
                </div>

                {filterStatusOpen && (
                  <div className={`absolute top-full mt-2 right-0 w-full rounded-lg border shadow-xl overflow-hidden z-20 ${
                    isDark ? 'bg-neutral-900 border-white/5' : 'bg-white border-slate-300'
                  }`}>
                    {['all', 'Active', 'Sold', 'Deceased'].map((status) => (
                      <button
                        key={status}
                        onClick={() => {
                          setSelectedStatus(status);
                          setFilterStatusOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-colors ${
                          selectedStatus === status
                            ? 'bg-green-600 text-white'
                            : isDark
                            ? 'hover:bg-white/5'
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        {status === 'all' ? 'All Status' : status}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex-1 flex items-center justify-end gap-3">
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedType('all');
                    setSelectedSpecies('all');
                    setSelectedHealth('all');
                    setSelectedStatus('all');
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all font-semibold text-sm ${
                    isDark 
                      ? 'bg-neutral-800 hover:bg-neutral-700 text-white' 
                      : 'bg-slate-200 hover:bg-slate-300 text-slate-900'
                  }`}
                >
                  <AlertCircle className="w-4 h-4" />
                  Clear Filters
                </button>
                <button 
                  onClick={handleExport}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all font-semibold text-sm ${
                    isDark 
                      ? 'bg-green-600 hover:bg-green-700 text-white' 
                      : 'bg-green-600 hover:bg-green-700 text-white shadow-sm'
                  }`}
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
          </section>

          {/* ANIMALS TABLE */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-amber-500 rounded-full"></div>
              <h2 className="text-xs font-black uppercase tracking-[0.2em]">All Animals</h2>
            </div>
            
            {/* Table Container */}
            <div className={`relative rounded-lg border overflow-hidden ${
              isDark ? 'bg-neutral-900/50 border-white/5' : 'bg-white border-slate-300 border-b-4 shadow-sm'
            }`}>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className={`${isDark ? 'bg-neutral-800/50' : 'bg-slate-100'}`}>
                    <tr>
                      <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest opacity-60">Name</th>
                      <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest opacity-60">Date of Birth</th>
                      <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest opacity-60">Animal Type</th>
                      <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest opacity-60">Gender</th>
                      <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest opacity-60">Status</th>
                      <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest opacity-60">Health Status</th>
                      <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest opacity-60">Breed</th>
                      <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-widest opacity-60">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200/10">
                    {filteredAnimals.map((animal) => (
                      <tr key={animal.id} className={`transition-colors ${
                        isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'
                      }`}>
                        <td className="px-6 py-4">
                          <p className="font-bold">{animal.name}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm opacity-70">{animal.dateOfBirth}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm opacity-70">{animal.animalType}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm opacity-70">{animal.gender}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                            animal.status === 'Active' 
                              ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                              : animal.status === 'Sold'
                              ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                              : 'bg-slate-500/10 text-slate-500 border border-slate-500/20'
                          }`}>
                            {animal.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                            animal.healthStatus === 'Healthy' 
                              ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                              : animal.healthStatus === 'Sick'
                              ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                              : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                          }`}>
                            {animal.healthStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm opacity-70">{animal.breed}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              className={`p-2 rounded transition-colors ${
                                isDark ? 'hover:bg-white/10' : 'hover:bg-slate-100'
                              }`} 
                              title="View Details"
                              onClick={() => setViewingAnimal(animal)}
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button 
                              className={`p-2 rounded transition-colors ${
                                isDark ? 'hover:bg-white/10' : 'hover:bg-slate-100'
                              }`} 
                              title="View Records"
                              onClick={() => alert(`Records for: ${animal.name}`)}
                            >
                              <FileText className="w-4 h-4" />
                            </button>
                            <button 
                              className={`p-2 rounded transition-colors ${
                                isDark ? 'hover:bg-white/10' : 'hover:bg-slate-100'
                              }`} 
                              title="Edit"
                              onClick={() => handleOpenForm(animal)}
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              className={`p-2 rounded transition-colors ${
                                isDark ? 'hover:bg-red-500/20 text-red-400' : 'hover:bg-red-50 text-red-600'
                              }`} 
                              title="Delete"
                              onClick={() => setDeleteConfirm(animal)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty State */}
              {filteredAnimals.length === 0 && (
                <div className="p-12 text-center">
                  <Activity className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <h3 className={`${spaceGrotesk.className} text-xl font-bold mb-2`}>No animals found</h3>
                  <p className="text-sm opacity-60">Try adjusting your search or filter criteria</p>
                </div>
              )}

              <CornerBrackets />
            </div>
          </section>

        </main>
      </div>

      {/* ADD/EDIT ANIMAL FORM SIDEBAR */}
      <div className={`fixed top-0 right-0 h-full w-full md:w-[500px] z-50 transform transition-transform duration-300 ${
        showAnimalForm ? 'translate-x-0' : 'translate-x-full'
      } ${isDark ? 'bg-neutral-900' : 'bg-white'} shadow-2xl overflow-y-auto`}>
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className={`${spaceGrotesk.className} text-2xl font-bold mb-1`}>
                {editingAnimal ? 'Edit Animal' : 'Add New Animal'}
              </h2>
              <p className="text-sm opacity-60">
                {editingAnimal ? 'Update animal information' : 'Register a new animal'}
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
            {/* Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-3 opacity-60">
                Animal Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter animal name"
                className={`w-full px-4 py-3 rounded-lg border outline-none transition-all ${
                  isDark 
                    ? 'bg-neutral-800 border-white/10 focus:border-green-500' 
                    : 'bg-slate-50 border-slate-300 focus:border-green-500'
                }`}
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-3 opacity-60">
                Date of Birth *
              </label>
              <input
                type="date"
                required
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                className={`w-full px-4 py-3 rounded-lg border outline-none transition-all ${
                  isDark 
                    ? 'bg-neutral-800 border-white/10 focus:border-green-500' 
                    : 'bg-slate-50 border-slate-300 focus:border-green-500'
                }`}
              />
            </div>

            {/* Animal Type */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-3 opacity-60">
                Animal Type *
              </label>
              <select
                value={formData.animalType}
                onChange={(e) => setFormData({...formData, animalType: e.target.value})}
                className={`w-full px-4 py-3 rounded-lg border outline-none transition-all ${
                  isDark 
                    ? 'bg-neutral-800 border-white/10 focus:border-green-500' 
                    : 'bg-slate-50 border-slate-300 focus:border-green-500'
                }`}
              >
                <option value="Unknown Classification">Unknown Classification</option>
                <option value="Cow">Cow</option>
                <option value="Bull">Bull</option>
                <option value="Calf">Calf</option>
                <option value="Heifer">Heifer</option>
              </select>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-3 opacity-60">
                Gender *
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({...formData, gender: e.target.value})}
                className={`w-full px-4 py-3 rounded-lg border outline-none transition-all ${
                  isDark 
                    ? 'bg-neutral-800 border-white/10 focus:border-green-500' 
                    : 'bg-slate-50 border-slate-300 focus:border-green-500'
                }`}
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </div>

            {/* Breed */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-3 opacity-60">
                Breed *
              </label>
              <input
                type="text"
                required
                value={formData.breed}
                onChange={(e) => setFormData({...formData, breed: e.target.value})}
                placeholder="Enter breed"
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
                <option value="Active">Active</option>
                <option value="Sold">Sold</option>
                <option value="Deceased">Deceased</option>
              </select>
            </div>

            {/* Health Status */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest mb-3 opacity-60">
                Health Status *
              </label>
              <select
                value={formData.healthStatus}
                onChange={(e) => setFormData({...formData, healthStatus: e.target.value})}
                className={`w-full px-4 py-3 rounded-lg border outline-none transition-all ${
                  isDark 
                    ? 'bg-neutral-800 border-white/10 focus:border-green-500' 
                    : 'bg-slate-50 border-slate-300 focus:border-green-500'
                }`}
              >
                <option value="Healthy">Healthy</option>
                <option value="Sick">Sick</option>
                <option value="Treatment">Treatment</option>
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
                {editingAnimal ? 'Update Animal' : 'Add Animal'}
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
                Delete Animal?
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

      {/* VIEW ANIMAL MODAL */}
      {viewingAnimal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className={`relative max-w-3xl w-full p-8 rounded-xl ${
            isDark ? 'bg-neutral-900' : 'bg-white'
          } shadow-2xl`}>
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className={`${spaceGrotesk.className} text-2xl font-bold mb-1`}>
                    Animal Details
                  </h3>
                  <p className="text-sm opacity-60">Complete information about this animal</p>
                </div>
                <button
                  onClick={() => setViewingAnimal(null)}
                  className={`p-2 rounded-lg transition-colors ${
                    isDark ? 'hover:bg-white/10' : 'hover:bg-slate-100'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-60">
                    Animal Name
                  </label>
                  <p className="text-lg font-bold">{viewingAnimal.name}</p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-60">
                    Date of Birth
                  </label>
                  <p className="text-sm font-medium">{viewingAnimal.dateOfBirth}</p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-60">
                    Animal Type
                  </label>
                  <p className="text-sm font-medium">{viewingAnimal.animalType}</p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-60">
                    Gender
                  </label>
                  <p className="text-sm font-medium">{viewingAnimal.gender}</p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-60">
                    Breed
                  </label>
                  <p className="text-sm font-medium">{viewingAnimal.breed}</p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-60">
                    Status
                  </label>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                    viewingAnimal.status === 'Active' 
                      ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                      : viewingAnimal.status === 'Sold'
                      ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                      : 'bg-slate-500/10 text-slate-500 border border-slate-500/20'
                  }`}>
                    {viewingAnimal.status}
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-60">
                    Health Status
                  </label>
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                    viewingAnimal.healthStatus === 'Healthy' 
                      ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                      : viewingAnimal.healthStatus === 'Sick'
                      ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                      : 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                  }`}>
                    {viewingAnimal.healthStatus}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setViewingAnimal(null)}
                  className={`flex-1 px-6 py-3 rounded-lg font-semibold transition-all ${
                    isDark 
                      ? 'bg-neutral-800 hover:bg-neutral-700' 
                      : 'bg-slate-200 hover:bg-slate-300'
                  }`}
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleOpenForm(viewingAnimal);
                    setViewingAnimal(null);
                  }}
                  className="flex-1 px-6 py-3 rounded-lg font-semibold bg-green-600 hover:bg-green-700 text-white transition-all"
                >
                  Edit Animal
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