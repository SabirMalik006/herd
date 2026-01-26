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
                Breeding Records
              </h1>
              <p className="font-medium opacity-60">
                View and manage all breeding events and their outcomes
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

          {/* HEADER CARD */}
          <div className={`rounded-lg border p-8 ${
            isDark 
              ? 'bg-gradient-to-r from-pink-900/30 via-neutral-900/50 to-neutral-900/50 border-white/10' 
              : 'bg-gradient-to-r from-pink-50 via-white to-white border-pink-200 shadow-sm'
          }`}>
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Heart className="w-6 h-6 text-pink-500" />
                  <h2 className={`${spaceGrotesk.className} text-2xl font-bold text-pink-600`}>
                    Breeding Records
                  </h2>
                </div>
                <p className={`${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  View and manage all breeding events and their outcomes
                </p>
              </div>
              <button 
                onClick={handleAddNew}
                className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-bold text-sm flex items-center gap-2 transition-all shadow-lg hover:shadow-xl"
              >
                <Plus className="w-4 h-4" />
                Log New Breeding
              </button>
            </div>
          </div>

          {/* TABLE */}
          <div className={`rounded-lg border overflow-hidden ${
            isDark ? 'bg-neutral-900/50 border-white/5' : 'bg-white border-slate-300 border-b-4 shadow-sm'
          }`}>
            {/* Table Header */}
            <div className={`grid grid-cols-6 gap-4 px-6 py-4 font-bold text-xs uppercase tracking-wider ${
              isDark ? 'bg-neutral-900 text-slate-400' : 'bg-slate-100 text-slate-600'
            }`}>
              <div>Animal</div>
              <div>Breeding Date</div>
              <div>Expected Delivery</div>
              <div>Method</div>
              <div>Status</div>
              <div className="text-right">Actions</div>
            </div>

            {/* Table Body */}
            {currentRecords.length === 0 ? (
              <div className={`px-6 py-12 text-center ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                <Heart className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p className="text-lg font-semibold mb-2">No breeding records yet</p>
                <p className="text-sm">Click "Log New Breeding" to add your first record</p>
              </div>
            ) : (
              <div className={`divide-y ${isDark ? 'divide-white/5' : 'divide-slate-200'}`}>
                {currentRecords.map((record) => (
                  <div 
                    key={record.id} 
                    className={`grid grid-cols-6 gap-4 px-6 py-4 items-center transition-colors ${
                      isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'
                    }`}
                  >
                    {/* Animal */}
                    <div>
                      <div className="font-semibold">{record.animal}</div>
                      <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {record.tag}
                      </div>
                    </div>

                    {/* Breeding Date */}
                    <div className="text-sm">{formatDate(record.breedingDate)}</div>

                    {/* Expected Delivery */}
                    <div className="text-sm">{formatDate(record.expectedDelivery)}</div>

                    {/* Method */}
                    <div className="text-sm">{record.method}</div>

                    {/* Status */}
                    <div>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                        record.status === 'Confirmed'
                          ? 'bg-green-500/10 text-green-500'
                          : 'bg-yellow-500/10 text-yellow-500'
                      }`}>
                        {record.status}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 justify-end">
                      <button 
                        onClick={() => handleEdit(record)}
                        className={`p-2 rounded-lg transition-colors ${
                          isDark ? 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-400' : 'bg-blue-100 hover:bg-blue-200 text-blue-600'
                        }`}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(record.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          isDark ? 'bg-red-500/10 hover:bg-red-500/20 text-red-400' : 'bg-red-100 hover:bg-red-200 text-red-600'
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
              isDark ? 'border-white/5 bg-neutral-900/50' : 'border-slate-200 bg-slate-50'
            }`}>
              <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Showing {breedingRecords.length === 0 ? 0 : indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, breedingRecords.length)} of {breedingRecords.length} results
              </div>
              
              <div className="flex items-center gap-4">
                {/* Pagination Buttons */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={goToFirstPage}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-lg transition-colors ${
                      currentPage === 1 
                        ? 'opacity-50 cursor-not-allowed' 
                        : isDark ? 'hover:bg-white/5 text-slate-400' : 'hover:bg-slate-200 text-slate-600'
                    }`}
                  >
                    «
                  </button>
                  <button 
                    onClick={goToPrevPage}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-lg transition-colors ${
                      currentPage === 1 
                        ? 'opacity-50 cursor-not-allowed' 
                        : isDark ? 'hover:bg-white/5 text-slate-400' : 'hover:bg-slate-200 text-slate-600'
                    }`}
                  >
                    ‹
                  </button>
                  <button 
                    className={`px-4 py-2 rounded-lg font-bold ${
                      isDark ? 'bg-green-600 text-white' : 'bg-slate-900 text-white'
                    }`}
                  >
                    {currentPage}
                  </button>
                  <button 
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className={`p-2 rounded-lg transition-colors ${
                      currentPage === totalPages || totalPages === 0
                        ? 'opacity-50 cursor-not-allowed' 
                        : isDark ? 'hover:bg-white/5 text-slate-400' : 'hover:bg-slate-200 text-slate-600'
                    }`}
                  >
                    ›
                  </button>
                  <button 
                    onClick={goToLastPage}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className={`p-2 rounded-lg transition-colors ${
                      currentPage === totalPages || totalPages === 0
                        ? 'opacity-50 cursor-not-allowed' 
                        : isDark ? 'hover:bg-white/5 text-slate-400' : 'hover:bg-slate-200 text-slate-600'
                    }`}
                  >
                    »
                  </button>
                </div>

                {/* Rows per page */}
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Rows per page
                  </span>
                  <select 
                    value={rowsPerPage}
                    onChange={(e) => {
                      setRowsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className={`px-3 py-1.5 rounded-lg border text-sm font-medium ${
                      isDark 
                        ? 'bg-neutral-900 border-white/10 text-white' 
                        : 'bg-white border-slate-300 text-slate-900'
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
          </div>

        </main>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className={`w-full max-w-2xl rounded-xl border ${
            isDark ? 'bg-neutral-900 border-white/10' : 'bg-white border-slate-200'
          } shadow-2xl max-h-[90vh] overflow-y-auto`}>
            {/* Modal Header */}
            <div className={`flex items-center justify-between p-6 border-b ${
              isDark ? 'border-white/10' : 'border-slate-200'
            }`}>
              <h2 className={`${spaceGrotesk.className} text-2xl font-bold`}>
                {editingRecord ? 'Edit Breeding Record' : 'Log New Breeding'}
              </h2>
              <button 
                onClick={() => {
                  setShowModal(false);
                  setEditingRecord(null);
                }}
                className={`p-2 rounded-lg transition-colors ${
                  isDark ? 'hover:bg-white/5' : 'hover:bg-slate-100'
                }`}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Animal Name</label>
                  <input
                    type="text"
                    name="animal"
                    value={formData.animal}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDark 
                        ? 'bg-neutral-800 border-white/10 text-white' 
                        : 'bg-white border-slate-300 text-slate-900'
                    }`}
                    placeholder="Enter animal name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Tag/ID</label>
                  <input
                    type="text"
                    name="tag"
                    value={formData.tag}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDark 
                        ? 'bg-neutral-800 border-white/10 text-white' 
                        : 'bg-white border-slate-300 text-slate-900'
                    }`}
                    placeholder="Enter tag/ID"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Breeding Date</label>
                  <input
                    type="date"
                    name="breedingDate"
                    value={formData.breedingDate}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDark 
                        ? 'bg-neutral-800 border-white/10 text-white' 
                        : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Expected Delivery</label>
                  <input
                    type="date"
                    name="expectedDelivery"
                    value={formData.expectedDelivery}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDark 
                        ? 'bg-neutral-800 border-white/10 text-white' 
                        : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Breeding Method</label>
                  <select
                    name="method"
                    value={formData.method}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDark 
                        ? 'bg-neutral-800 border-white/10 text-white' 
                        : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  >
                    <option value="Natural Breeding">Natural Breeding</option>
                    <option value="Artificial Insemination">Artificial Insemination</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDark 
                        ? 'bg-neutral-800 border-white/10 text-white' 
                        : 'bg-white border-slate-300 text-slate-900'
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
                  className={`flex-1 px-6 py-3 rounded-lg font-bold transition-colors ${
                    isDark 
                      ? 'bg-neutral-800 hover:bg-neutral-700 text-white' 
                      : 'bg-slate-200 hover:bg-slate-300 text-slate-900'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex-1 px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-bold transition-colors shadow-lg"
                >
                  {editingRecord ? 'Update Record' : 'Add Record'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}