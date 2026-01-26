"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/dashboard/Navbar';
import { 
  Power, Plus, Search, X, Edit, Calendar, Trash2
} from 'lucide-react';
import { Space_Grotesk, Inter } from "next/font/google";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300", "500", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function DryOffManagement() {
  const [isDark, setIsDark] = useState(false); 
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dryOffRecords, setDryOffRecords] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const pathname = usePathname();

  const [formData, setFormData] = useState({
    animalName: '',
    animalId: '',
    breed: '',
    expectedCalving: '',
    plannedDryOffDate: '',
    actualDryOffDate: '',
    status: 'Planned',
    lactationEnd: '',
    confirmed: false
  });

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('dryOffRecords');
    if (stored) {
      setDryOffRecords(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage whenever records change
  useEffect(() => {
    localStorage.setItem('dryOffRecords', JSON.stringify(dryOffRecords));
  }, [dryOffRecords]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = () => {
    if (!formData.animalName || !formData.animalId || !formData.expectedCalving || !formData.plannedDryOffDate) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (editingRecord) {
      const updatedRecords = dryOffRecords.map(record => 
        record.id === editingRecord.id 
          ? { ...formData, id: editingRecord.id }
          : record
      );
      setDryOffRecords(updatedRecords);
    } else {
      const newRecord = {
        ...formData,
        id: Date.now()
      };
      setDryOffRecords([...dryOffRecords, newRecord]);
    }
    
    setFormData({
      animalName: '',
      animalId: '',
      breed: '',
      expectedCalving: '',
      plannedDryOffDate: '',
      actualDryOffDate: '',
      status: 'Planned',
      lactationEnd: '',
      confirmed: false
    });
    setEditingRecord(null);
    setShowModal(false);
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setFormData({
      animalName: record.animalName,
      animalId: record.animalId,
      breed: record.breed,
      expectedCalving: record.expectedCalving,
      plannedDryOffDate: record.plannedDryOffDate,
      actualDryOffDate: record.actualDryOffDate,
      status: record.status,
      lactationEnd: record.lactationEnd,
      confirmed: record.confirmed
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this dry-off record?')) {
      const updatedRecords = dryOffRecords.filter(record => record.id !== id);
      setDryOffRecords(updatedRecords);
    }
  };

  const handleAddNew = () => {
    setEditingRecord(null);
    setFormData({
      animalName: '',
      animalId: '',
      breed: '',
      expectedCalving: '',
      plannedDryOffDate: '',
      actualDryOffDate: '',
      status: 'Planned',
      lactationEnd: '',
      confirmed: false
    });
    setShowModal(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const isActive = (path) => pathname === path;

  const filteredRecords = dryOffRecords.filter(record => {
    const matchesSearch = record.animalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.animalId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  // Pagination
  const indexOfLastRecord = currentPage * rowsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - rowsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredRecords.length / rowsPerPage);

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
                Dry-Off Period Management
              </h1>
              <p className="font-medium opacity-60">
                Monitor and manage dry-off periods for pregnant cows
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
              ? 'bg-gradient-to-r from-cyan-900/30 via-neutral-900/50 to-neutral-900/50 border-white/10' 
              : 'bg-gradient-to-r from-cyan-50 via-white to-white border-cyan-200 shadow-sm'
          }`}>
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Power className="w-6 h-6 text-cyan-500" />
                  <h2 className={`${spaceGrotesk.className} text-2xl font-bold text-cyan-600`}>
                    Dry-Off Period Management
                  </h2>
                </div>
                <p className={`${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Monitor and manage dry-off periods for pregnant cows
                </p>
              </div>
              <button 
                onClick={handleAddNew}
                className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-bold text-sm flex items-center gap-2 transition-all shadow-lg hover:shadow-xl"
              >
                <Plus className="w-4 h-4" />
                Add Dry-Off Record
              </button>
            </div>
          </div>

          {/* SEARCH BAR */}
          <div className={`relative ${isDark ? 'bg-neutral-900/50' : 'bg-white'} rounded-lg border ${
            isDark ? 'border-white/5' : 'border-slate-300'
          }`}>
            <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
              isDark ? 'text-slate-400' : 'text-slate-500'
            }`} />
            <input
              type="text"
              placeholder="Search by animal name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-12 pr-4 py-3 rounded-lg bg-transparent ${
                isDark ? 'text-white placeholder-slate-400' : 'text-slate-900 placeholder-slate-500'
              } focus:outline-none`}
            />
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
              <div>Expected Calving</div>
              <div>Planned Dry-Off Date</div>
              <div>Status</div>
              <div>Lactation End</div>
              <div className="text-right">Actions</div>
            </div>

            {/* Table Body */}
            {currentRecords.length === 0 ? (
              <div className={`px-6 py-12 text-center ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                <Power className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p className="text-lg font-semibold mb-2">No dry-off records yet</p>
                <p className="text-sm">Click "Add Dry-Off Record" to start tracking</p>
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
                      <div className="font-semibold">{record.animalName}</div>
                      <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        ID: {record.animalId}
                      </div>
                      {record.breed && (
                        <div className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                          {record.breed}
                        </div>
                      )}
                    </div>

                    {/* Expected Calving */}
                    <div>
                      <div className="text-sm font-medium">{formatDate(record.expectedCalving)}</div>
                      <div className={`text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                        Calving due
                      </div>
                    </div>

                    {/* Planned Dry-Off Date */}
                    <div>
                      <div className={`px-3 py-1 rounded-lg inline-block ${
                        isDark ? 'bg-neutral-800' : 'bg-slate-100'
                      }`}>
                        <div className="text-sm font-medium">{formatDate(record.plannedDryOffDate)}</div>
                      </div>
                      {record.actualDryOffDate && (
                        <div className={`text-xs mt-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                          Actual: {formatDate(record.actualDryOffDate)}
                        </div>
                      )}
                    </div>

                    {/* Status */}
                    <div>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                        record.status === 'Due Now'
                          ? 'bg-red-500/10 text-red-500'
                          : record.status === 'Active'
                          ? 'bg-blue-500/10 text-blue-500'
                          : 'bg-purple-500/10 text-purple-500'
                      }`}>
                        {record.status}
                      </span>
                    </div>

                    {/* Lactation End / Confirmed */}
                    <div>
                      {record.confirmed ? (
                        <div>
                          <div className="flex items-center gap-2 text-sm">
                            <input 
                              type="checkbox" 
                              checked={record.confirmed} 
                              readOnly
                              className="w-4 h-4"
                            />
                            <span className="font-medium">Confirmed</span>
                          </div>
                          {record.lactationEnd && (
                            <div className={`text-xs mt-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                              Ended: {formatDate(record.lactationEnd)}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-sm">
                          <input 
                            type="checkbox" 
                            checked={false} 
                            readOnly
                            className="w-4 h-4"
                          />
                          <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>Confirmed</span>
                        </div>
                      )}
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
                Showing {filteredRecords.length === 0 ? 0 : indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredRecords.length)} of {filteredRecords.length} results
              </div>
              
              <div className="flex items-center gap-4">
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
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
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
                {editingRecord ? 'Edit Dry-Off Record' : 'Add Dry-Off Record'}
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
                    name="animalName"
                    value={formData.animalName}
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
                  <label className="block text-sm font-semibold mb-2">Animal ID</label>
                  <input
                    type="text"
                    name="animalId"
                    value={formData.animalId}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDark 
                        ? 'bg-neutral-800 border-white/10 text-white' 
                        : 'bg-white border-slate-300 text-slate-900'
                    }`}
                    placeholder="Enter ID"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Breed</label>
                <input
                  type="text"
                  name="breed"
                  value={formData.breed}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDark 
                      ? 'bg-neutral-800 border-white/10 text-white' 
                      : 'bg-white border-slate-300 text-slate-900'
                  }`}
                  placeholder="Enter breed"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Expected Calving</label>
                  <input
                    type="date"
                    name="expectedCalving"
                    value={formData.expectedCalving}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDark 
                        ? 'bg-neutral-800 border-white/10 text-white' 
                        : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Planned Dry-Off Date</label>
                  <input
                    type="date"
                    name="plannedDryOffDate"
                    value={formData.plannedDryOffDate}
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
                  <label className="block text-sm font-semibold mb-2">Actual Dry-Off Date</label>
                  <input
                    type="date"
                    name="actualDryOffDate"
                    value={formData.actualDryOffDate}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      isDark 
                        ? 'bg-neutral-800 border-white/10 text-white' 
                        : 'bg-white border-slate-300 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Lactation End</label>
                  <input
                    type="date"
                    name="lactationEnd"
                    value={formData.lactationEnd}
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
                    <option value="Planned">Planned</option>
                    <option value="Active">Active</option>
                    <option value="Due Now">Due Now</option>
                  </select>
                </div>

                <div className="flex items-center pt-8">
                  <input
                    type="checkbox"
                    name="confirmed"
                    checked={formData.confirmed}
                    onChange={handleInputChange}
                    className="w-4 h-4 mr-2"
                  />
                  <label className="text-sm font-semibold">Confirmed</label>
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
                  className="flex-1 px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-bold transition-colors shadow-lg"
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