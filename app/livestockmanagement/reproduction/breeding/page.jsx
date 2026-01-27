"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/dashboard/Navbar';
import { 
  Heart, Edit, Trash2, Plus, X
} from 'lucide-react';
import { Space_Grotesk, Inter } from "next/font/google";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300", "500", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function BreedingRecords() {
  const [isDark, setIsDark] = useState(false); 
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const pathname = usePathname();

  // --- BREEDING DATA FROM LOCAL STORAGE ---
  const [breedingRecords, setBreedingRecords] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [formData, setFormData] = useState({
    animal: '',
    tag: '',
    breedingDate: '',
    expectedDelivery: '',
    method: 'Natural Breeding',
    status: 'Pending'
  });

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('breedingRecords');
    if (stored) {
      setBreedingRecords(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage whenever records change
  useEffect(() => {
    localStorage.setItem('breedingRecords', JSON.stringify(breedingRecords));
  }, [breedingRecords]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.animal || !formData.tag || !formData.breedingDate || !formData.expectedDelivery) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (editingRecord) {
      const updatedRecords = breedingRecords.map(record => 
        record.id === editingRecord.id 
          ? { ...formData, id: editingRecord.id }
          : record
      );
      setBreedingRecords(updatedRecords);
    } else {
      const newRecord = {
        ...formData,
        id: Date.now()
      };
      setBreedingRecords([...breedingRecords, newRecord]);
    }
    
    setFormData({
      animal: '',
      tag: '',
      breedingDate: '',
      expectedDelivery: '',
      method: 'Natural Breeding',
      status: 'Pending'
    });
    setEditingRecord(null);
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this breeding record?')) {
      const updatedRecords = breedingRecords.filter(record => record.id !== id);
      setBreedingRecords(updatedRecords);
    }
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setFormData({
      animal: record.animal,
      tag: record.tag,
      breedingDate: record.breedingDate,
      expectedDelivery: record.expectedDelivery,
      method: record.method,
      status: record.status
    });
    setShowModal(true);
  };

  const handleAddNew = () => {
    setEditingRecord(null);
    setFormData({
      animal: '',
      tag: '',
      breedingDate: '',
      expectedDelivery: '',
      method: 'Natural Breeding',
      status: 'Pending'
    });
    setShowModal(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

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

  // Pagination
  const indexOfLastRecord = currentPage * rowsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - rowsPerPage;
  const currentRecords = breedingRecords.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(breedingRecords.length / rowsPerPage);

  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const goToPrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

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
                  [BREEDING_RECORDS]
                </span>
              </div>
              <h1 className={`${spaceGrotesk.className} text-4xl md:text-5xl font-bold uppercase tracking-tighter leading-[0.9] mb-2`}>
                Breeding <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Records</span>
              </h1>
              <p className={`text-sm font-light leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                View and manage all breeding events and their outcomes
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

          {/* HEADER CARD */}
          <div className={`relative border p-8 overflow-hidden ${
            isDark 
              ? 'bg-neutral-900/30 border-white/5' 
              : 'bg-white border-neutral-300 shadow-sm'
          }`}>
            {/* Background gradient */}
            <div className={`absolute inset-0 ${
              isDark 
                ? 'bg-gradient-to-br from-pink-900/20 via-transparent to-transparent' 
                : 'bg-gradient-to-br from-pink-50/50 via-transparent to-transparent'
            }`} />
            
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2.5 border ${
                    isDark ? 'bg-white/5 border-white/10' : 'bg-neutral-50 border-neutral-200'
                  }`}>
                    <Heart className="w-5 h-5 text-pink-500" />
                  </div>
                  <h2 className={`${spaceGrotesk.className} text-2xl font-bold uppercase tracking-tight ${
                    isDark ? 'text-pink-400' : 'text-pink-600'
                  }`}>
                    Breeding Records
                  </h2>
                </div>
                <p className={`text-sm ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
                  View and manage all breeding events and their outcomes
                </p>
              </div>
              <button 
                onClick={handleAddNew}
                className={`cursor-pointer px-6 py-3 border font-bold text-[11px] uppercase tracking-widest flex items-center gap-2 transition-all ${
                  isDark 
                    ? 'bg-pink-600 hover:bg-pink-700 text-white border-pink-600' 
                    : 'bg-pink-600 hover:bg-pink-700 text-white border-pink-600 shadow-sm'
                }`}
              >
                <Plus className="w-4 h-4" />
                Log New Breeding
              </button>
            </div>
            <CornerBrackets />
          </div>

          {/* TABLE */}
          <div className={`relative border overflow-hidden ${
            isDark ? 'bg-neutral-900/30 border-white/5' : 'bg-white border-neutral-300 shadow-sm'
          }`}>
            {/* Table Header */}
            <div className={`grid grid-cols-6 gap-4 px-6 py-4 border-b ${
              isDark ? 'bg-neutral-900/50 border-white/5' : 'bg-neutral-50 border-neutral-200'
            }`}>
              <div className={`text-[9px] font-mono font-black uppercase tracking-[0.25em] ${
                isDark ? 'text-neutral-500' : 'text-neutral-400'
              }`}>
                Animal
              </div>
              <div className={`text-[9px] font-mono font-black uppercase tracking-[0.25em] ${
                isDark ? 'text-neutral-500' : 'text-neutral-400'
              }`}>
                Breeding Date
              </div>
              <div className={`text-[9px] font-mono font-black uppercase tracking-[0.25em] ${
                isDark ? 'text-neutral-500' : 'text-neutral-400'
              }`}>
                Expected Delivery
              </div>
              <div className={`text-[9px] font-mono font-black uppercase tracking-[0.25em] ${
                isDark ? 'text-neutral-500' : 'text-neutral-400'
              }`}>
                Method
              </div>
              <div className={`text-[9px] font-mono font-black uppercase tracking-[0.25em] ${
                isDark ? 'text-neutral-500' : 'text-neutral-400'
              }`}>
                Status
              </div>
              <div className={`text-[9px] font-mono font-black uppercase tracking-[0.25em] text-right ${
                isDark ? 'text-neutral-500' : 'text-neutral-400'
              }`}>
                Actions
              </div>
            </div>

            {/* Table Body */}
            {currentRecords.length === 0 ? (
              <div className={`px-6 py-12 text-center ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                <Heart className={`w-12 h-12 mx-auto mb-4 ${isDark ? 'text-neutral-800' : 'text-neutral-200'}`} />
                <p className={`${spaceGrotesk.className} text-lg font-bold mb-2 uppercase tracking-tight`}>
                  No breeding records yet
                </p>
                <p className="text-sm font-medium">Click "Log New Breeding" to add your first record</p>
              </div>
            ) : (
              <div className={`divide-y ${isDark ? 'divide-white/5' : 'divide-neutral-200'}`}>
                {currentRecords.map((record) => (
                  <div 
                    key={record.id} 
                    className={`grid grid-cols-6 gap-4 px-6 py-4 items-center transition-colors ${
                      isDark ? 'hover:bg-white/5' : 'hover:bg-neutral-50'
                    }`}
                  >
                    {/* Animal */}
                    <div>
                      <div className={`font-bold ${spaceGrotesk.className}`}>{record.animal}</div>
                      <div className={`text-xs font-medium ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                        {record.tag}
                      </div>
                    </div>

                    {/* Breeding Date */}
                    <div className={`text-sm font-medium ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
                      {formatDate(record.breedingDate)}
                    </div>

                    {/* Expected Delivery */}
                    <div className={`text-sm font-medium ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
                      {formatDate(record.expectedDelivery)}
                    </div>

                    {/* Method */}
                    <div className={`text-sm font-medium ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
                      {record.method}
                    </div>

                    {/* Status */}
                    <div>
                      <span className={`inline-flex items-center px-3 py-1 border text-[10px] font-bold font-mono uppercase tracking-wider ${
                        record.status === 'Confirmed'
                          ? isDark
                            ? 'bg-green-500/10 text-green-400 border-green-500/20'
                            : 'bg-green-50 text-green-700 border-green-200'
                          : isDark
                            ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                            : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                      }`}>
                        {record.status}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-1 justify-end">
                      <button 
                        onClick={() => handleEdit(record)}
                        className={`cursor-pointer p-2.5 border transition-colors ${
                          isDark 
                            ? 'hover:bg-white/10 border-white/10 hover:border-white/20' 
                            : 'hover:bg-neutral-50 border-neutral-200 hover:border-neutral-300'
                        }`}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(record.id)}
                        className={`cursor-pointer p-2.5 border transition-colors ${
                          isDark 
                            ? 'hover:bg-red-500/20 text-red-400 border-white/10 hover:border-red-500/20' 
                            : 'hover:bg-red-50 text-red-600 border-neutral-200 hover:border-red-200'
                        }`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            <div className={`px-6 py-4 border-t flex items-center justify-between ${
              isDark ? 'border-white/5 bg-neutral-900/50' : 'border-neutral-200 bg-neutral-50'
            }`}>
              <div className={`text-sm font-medium ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                Showing {breedingRecords.length === 0 ? 0 : indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, breedingRecords.length)} of {breedingRecords.length} results
              </div>
              
              <div className="flex items-center gap-4">
                {/* Pagination Buttons */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={goToFirstPage}
                    disabled={currentPage === 1}
                    className={`cursor-pointer px-3 py-2 border font-bold transition-colors ${
                      currentPage === 1 
                        ? 'opacity-50 cursor-not-allowed' 
                        : isDark 
                          ? 'hover:bg-white/5 border-white/10 hover:border-white/20' 
                          : 'hover:bg-neutral-50 border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    «
                  </button>
                  <button 
                    onClick={goToPrevPage}
                    disabled={currentPage === 1}
                    className={`cursor-pointer px-3 py-2 border font-bold transition-colors ${
                      currentPage === 1 
                        ? 'opacity-50 cursor-not-allowed' 
                        : isDark 
                          ? 'hover:bg-white/5 border-white/10 hover:border-white/20' 
                          : 'hover:bg-neutral-50 border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    ‹
                  </button>
                  <button 
                    className={`cursor-pointer px-4 py-2 border font-bold ${
                      isDark 
                        ? 'bg-green-600 text-white border-green-600' 
                        : 'bg-green-600 text-white border-green-600'
                    }`}
                  >
                    {currentPage}
                  </button>
                  <button 
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className={`cursor-pointer px-3 py-2 border font-bold transition-colors ${
                      currentPage === totalPages || totalPages === 0
                        ? 'opacity-50 cursor-not-allowed' 
                        : isDark 
                          ? 'hover:bg-white/5 border-white/10 hover:border-white/20' 
                          : 'hover:bg-neutral-50 border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    ›
                  </button>
                  <button 
                    onClick={goToLastPage}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className={`cursor-pointer px-3 py-2 border font-bold transition-colors ${
                      currentPage === totalPages || totalPages === 0
                        ? 'opacity-50 cursor-not-allowed' 
                        : isDark 
                          ? 'hover:bg-white/5 border-white/10 hover:border-white/20' 
                          : 'hover:bg-neutral-50 border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    »
                  </button>
                </div>

                {/* Rows per page */}
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-medium ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    Rows per page
                  </span>
                  <select 
                    value={rowsPerPage}
                    onChange={(e) => {
                      setRowsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className={`px-3 py-1.5 border text-sm font-medium ${
                      isDark 
                        ? 'bg-neutral-900 border-white/10 text-white' 
                        : 'bg-white border-neutral-300 text-neutral-900'
                    }`}
                  >
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </div>
              </div>
            </div>
            <CornerBrackets />
          </div>

        </main>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-2xl border ${
            isDark ? 'bg-neutral-900 border-white/10' : 'bg-white border-neutral-300'
          } shadow-2xl max-h-[90vh] overflow-y-auto`}>
            {/* Modal Header */}
            <div className={`flex items-center justify-between p-6 border-b ${
              isDark ? 'border-white/10' : 'border-neutral-200'
            }`}>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className={`h-[2px] w-6 ${isDark ? 'bg-pink-500' : 'bg-pink-600'}`} />
                  <span className={`text-[9px] font-mono font-bold uppercase tracking-[0.3em] ${
                    isDark ? 'text-pink-400' : 'text-pink-600'
                  }`}>
                    {editingRecord ? 'EDIT_MODE' : 'CREATE_MODE'}
                  </span>
                </div>
                <h2 className={`${spaceGrotesk.className} text-2xl font-bold uppercase tracking-tight`}>
                  {editingRecord ? 'Edit Breeding Record' : 'Log New Breeding'}
                </h2>
              </div>
              <button 
                onClick={() => {
                  setShowModal(false);
                  setEditingRecord(null);
                }}
                className={`cursor-pointer p-2.5 border transition-colors ${
                  isDark 
                    ? 'hover:bg-white/10 border-white/10 hover:border-white/20' 
                    : 'hover:bg-neutral-50 border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-[9px] font-mono font-bold uppercase tracking-[0.25em] mb-3 ${
                    isDark ? 'text-neutral-500' : 'text-neutral-400'
                  }`}>
                    Animal Name
                  </label>
                  <input
                    type="text"
                    name="animal"
                    value={formData.animal}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3.5 border outline-none transition-all font-medium ${
                      isDark 
                        ? 'bg-neutral-900 border-white/10 focus:border-pink-500 placeholder:text-neutral-600' 
                        : 'bg-neutral-50 border-neutral-300 focus:border-pink-500 placeholder:text-neutral-400'
                    }`}
                    placeholder="Enter animal name"
                  />
                </div>

                <div>
                  <label className={`block text-[9px] font-mono font-bold uppercase tracking-[0.25em] mb-3 ${
                    isDark ? 'text-neutral-500' : 'text-neutral-400'
                  }`}>
                    Tag/ID
                  </label>
                  <input
                    type="text"
                    name="tag"
                    value={formData.tag}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3.5 border outline-none transition-all font-medium ${
                      isDark 
                        ? 'bg-neutral-900 border-white/10 focus:border-pink-500 placeholder:text-neutral-600' 
                        : 'bg-neutral-50 border-neutral-300 focus:border-pink-500 placeholder:text-neutral-400'
                    }`}
                    placeholder="Enter tag/ID"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-[9px] font-mono font-bold uppercase tracking-[0.25em] mb-3 ${
                    isDark ? 'text-neutral-500' : 'text-neutral-400'
                  }`}>
                    Breeding Date
                  </label>
                  <input
                    type="date"
                    name="breedingDate"
                    value={formData.breedingDate}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3.5 border outline-none transition-all font-medium ${
                      isDark 
                        ? 'bg-neutral-900 border-white/10 focus:border-pink-500' 
                        : 'bg-neutral-50 border-neutral-300 focus:border-pink-500'
                    }`}
                  />
                </div>

                <div>
                  <label className={`block text-[9px] font-mono font-bold uppercase tracking-[0.25em] mb-3 ${
                    isDark ? 'text-neutral-500' : 'text-neutral-400'
                  }`}>
                    Expected Delivery
                  </label>
                  <input
                    type="date"
                    name="expectedDelivery"
                    value={formData.expectedDelivery}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3.5 border outline-none transition-all font-medium ${
                      isDark 
                        ? 'bg-neutral-900 border-white/10 focus:border-pink-500' 
                        : 'bg-neutral-50 border-neutral-300 focus:border-pink-500'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-[9px] font-mono font-bold uppercase tracking-[0.25em] mb-3 ${
                    isDark ? 'text-neutral-500' : 'text-neutral-400'
                  }`}>
                    Breeding Method
                  </label>
                  <select
                    name="method"
                    value={formData.method}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3.5 border outline-none transition-all font-medium ${
                      isDark 
                        ? 'bg-neutral-900 border-white/10 focus:border-pink-500' 
                        : 'bg-neutral-50 border-neutral-300 focus:border-pink-500'
                    }`}
                  >
                    <option value="Natural Breeding">Natural Breeding</option>
                    <option value="Artificial Insemination">Artificial Insemination</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-[9px] font-mono font-bold uppercase tracking-[0.25em] mb-3 ${
                    isDark ? 'text-neutral-500' : 'text-neutral-400'
                  }`}>
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3.5 border outline-none transition-all font-medium ${
                      isDark 
                        ? 'bg-neutral-900 border-white/10 focus:border-pink-500' 
                        : 'bg-neutral-50 border-neutral-300 focus:border-pink-500'
                    }`}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                  </select>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingRecord(null);
                  }}
                  className={`cursor-pointer flex-1 px-6 py-3.5 border font-bold text-[11px] uppercase tracking-widest transition-all ${
                    isDark 
                      ? 'bg-neutral-800 hover:bg-neutral-700 border-neutral-700' 
                      : 'bg-white hover:bg-neutral-50 border-neutral-300'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="cursor-pointer flex-1 px-6 py-3.5 border font-bold text-[11px] uppercase tracking-widest bg-pink-600 hover:bg-pink-700 text-white border-pink-600 transition-all"
                >
                  {editingRecord ? 'Update' : 'Add Record'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}