"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/dashboard/Navbar';
import { 
  Heart, Plus, Search, X, Calendar, Activity, Edit, Trash2
} from 'lucide-react';
import { Space_Grotesk, Inter } from "next/font/google";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["300", "500", "700"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export default function PregnancyTracking() {
  const [isDark, setIsDark] = useState(false); 
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [pregnancyRecords, setPregnancyRecords] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const pathname = usePathname();

  const [formData, setFormData] = useState({
    animalName: '',
    animalId: '',
    breedingDate: '',
    dueDate: '',
    status: 'monitoring',
    method: 'Blood Test',
    veterinarian: '',
    milestones: []
  });

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('pregnancyRecords');
    if (stored) {
      setPregnancyRecords(JSON.parse(stored));
    }
  }, []);

  // Save to localStorage whenever records change
  useEffect(() => {
    localStorage.setItem('pregnancyRecords', JSON.stringify(pregnancyRecords));
  }, [pregnancyRecords]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.animalName || !formData.animalId || !formData.breedingDate || !formData.dueDate) {
      alert('Please fill in all required fields');
      return;
    }
    
    if (editingRecord) {
      const updatedRecords = pregnancyRecords.map(record => 
        record.id === editingRecord.id 
          ? { ...formData, id: editingRecord.id, milestones: record.milestones }
          : record
      );
      setPregnancyRecords(updatedRecords);
    } else {
      const newRecord = {
        ...formData,
        id: Date.now(),
        milestones: [
          { name: 'Pregnancy Confirmation (Day 30)', completed: false },
          { name: 'Fetal Sexing (Day 60)', completed: false },
          { name: 'Nutritional Adjustment (Day 90)', completed: false },
          { name: 'Mid-term Check (Day 150)', completed: false },
          { name: 'Pre-calving Vaccination (Day 210)', completed: false },
          { name: 'Close-up Period (Day 250)', completed: false },
          { name: 'Due Date (Day 280)', completed: false }
        ]
      };
      setPregnancyRecords([...pregnancyRecords, newRecord]);
    }
    
    setFormData({
      animalName: '',
      animalId: '',
      breedingDate: '',
      dueDate: '',
      status: 'monitoring',
      method: 'Blood Test',
      veterinarian: '',
      milestones: []
    });
    setEditingRecord(null);
    setShowModal(false);
  };

  const handleAddNew = () => {
    setEditingRecord(null);
    setFormData({
      animalName: '',
      animalId: '',
      breedingDate: '',
      dueDate: '',
      status: 'monitoring',
      method: 'Blood Test',
      veterinarian: '',
      milestones: []
    });
    setShowModal(true);
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setFormData({
      animalName: record.animalName,
      animalId: record.animalId,
      breedingDate: record.breedingDate,
      dueDate: record.dueDate,
      status: record.status,
      method: record.method,
      veterinarian: record.veterinarian,
      milestones: record.milestones
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this pregnancy record?')) {
      const updatedRecords = pregnancyRecords.filter(record => record.id !== id);
      setPregnancyRecords(updatedRecords);
    }
  };

  const toggleMilestone = (recordId, milestoneIndex) => {
    const updatedRecords = pregnancyRecords.map(record => {
      if (record.id === recordId) {
        const updatedMilestones = [...record.milestones];
        updatedMilestones[milestoneIndex] = {
          ...updatedMilestones[milestoneIndex],
          completed: !updatedMilestones[milestoneIndex].completed
        };
        return { ...record, milestones: updatedMilestones };
      }
      return record;
    });
    setPregnancyRecords(updatedRecords);
  };

  const calculateDaysPregnant = (breedingDate) => {
    if (!breedingDate) return 0;
    const breeding = new Date(breedingDate);
    const today = new Date();
    breeding.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    const diffTime = today - breeding;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const calculateDaysUntilDue = (dueDate) => {
    if (!dueDate) return 0;
    const due = new Date(dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);
    const diffTime = due - today;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getTotalGestationDays = (breedingDate, dueDate) => {
    if (!breedingDate || !dueDate) return 280;
    const breeding = new Date(breedingDate);
    const due = new Date(dueDate);
    breeding.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);
    const diffTime = due - breeding;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(1, diffDays);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getProgressPercentage = (daysPregnant, totalDays) => {
    if (totalDays === 0) return 0;
    return Math.min((daysPregnant / totalDays) * 100, 100);
  };

  const isActive = (path) => pathname === path;

  const filteredRecords = pregnancyRecords.filter(record => {
    const matchesSearch = record.animalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.animalId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || record.status === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

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
                Pregnancy Tracking
              </h1>
              <p className="font-medium opacity-60">
                Monitor pregnancy progress and upcoming milestones
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
              ? 'bg-gradient-to-r from-purple-900/30 via-neutral-900/50 to-neutral-900/50 border-white/10' 
              : 'bg-gradient-to-r from-purple-50 via-white to-white border-purple-200 shadow-sm'
          }`}>
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Activity className="w-6 h-6 text-purple-500" />
                  <h2 className={`${spaceGrotesk.className} text-2xl font-bold text-purple-600`}>
                    Pregnancy Tracking
                  </h2>
                </div>
                <p className={`${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Monitor pregnancy progress and upcoming milestones
                </p>
              </div>
              <button 
                onClick={handleAddNew}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold text-sm flex items-center gap-2 transition-all shadow-lg hover:shadow-xl"
              >
                <Plus className="w-4 h-4" />
                Add Pregnancy Record
              </button>
            </div>
          </div>

          {/* SEARCH & FILTER BAR */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className={`flex-1 relative ${isDark ? 'bg-neutral-900/50' : 'bg-white'} rounded-lg border ${
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
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={`px-6 py-3 rounded-lg border font-medium ${
                isDark 
                  ? 'bg-neutral-900/50 border-white/5 text-white' 
                  : 'bg-white border-slate-300 text-slate-900'
              }`}
            >
              <option value="All Status">All Status</option>
              <option value="monitoring">Monitoring</option>
              <option value="aborted">Aborted</option>
            </select>
          </div>

          {/* PREGNANCY CARDS */}
          {filteredRecords.length === 0 ? (
            <div className={`rounded-lg border p-12 text-center ${
              isDark ? 'bg-neutral-900/50 border-white/5' : 'bg-white border-slate-300 shadow-sm'
            }`}>
              <Activity className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-slate-700' : 'text-slate-300'}`} />
              <p className={`text-lg font-semibold mb-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                No pregnancy records found
              </p>
              <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                Click "Add Pregnancy Record" to start tracking
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredRecords.map((record) => {
                const daysPregnant = calculateDaysPregnant(record.breedingDate);
                const daysUntilDue = calculateDaysUntilDue(record.dueDate);
                const totalGestationDays = getTotalGestationDays(record.breedingDate, record.dueDate);
                const progress = getProgressPercentage(daysPregnant, totalGestationDays);
                
                return (
                  <div 
                    key={record.id}
                    className={`rounded-lg border p-6 ${
                      isDark ? 'bg-neutral-900/50 border-white/5' : 'bg-white border-slate-300 shadow-sm'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-bold">{record.animalName}</h3>
                        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          {record.animalName} • ID: {record.animalId}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        record.status === 'monitoring'
                          ? 'bg-green-500/10 text-green-500'
                          : 'bg-red-500/10 text-red-500'
                      }`}>
                        {record.status}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm font-semibold mb-2">
                        <span>{daysPregnant} days</span>
                        <span>{daysUntilDue >= 0 ? `${daysUntilDue} days` : `${Math.abs(daysUntilDue)} days overdue`}</span>
                      </div>
                      <div className={`h-2 rounded-full ${isDark ? 'bg-neutral-800' : 'bg-slate-200'} overflow-hidden`}>
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            daysUntilDue < 0 
                              ? 'bg-gradient-to-r from-red-500 to-red-600' 
                              : 'bg-gradient-to-r from-purple-500 to-pink-500'
                          }`}
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs mt-1">
                        <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>
                          Breeding: {formatDate(record.breedingDate)}
                        </span>
                        <span className={isDark ? 'text-slate-500' : 'text-slate-400'}>
                          Due: {formatDate(record.dueDate)}
                        </span>
                      </div>
                      <div className={`text-center text-xs mt-1 font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {progress.toFixed(1)}% complete • Day {daysPregnant} of {totalGestationDays}
                      </div>
                    </div>

                    {/* Due Status */}
                    <div className={`text-center py-2 rounded-lg mb-4 ${
                      daysUntilDue === 0 
                        ? isDark ? 'bg-red-500/20 border border-red-500/30' : 'bg-red-100 border border-red-300'
                        : daysUntilDue < 0
                        ? isDark ? 'bg-red-500/20 border border-red-500/30' : 'bg-red-100 border border-red-300'
                        : isDark ? 'bg-neutral-800/50' : 'bg-slate-100'
                    }`}>
                      <p className={`text-sm font-semibold ${
                        daysUntilDue <= 0 ? 'text-red-500' : ''
                      }`}>
                        {daysUntilDue === 0 ? 'Due today' : daysUntilDue > 0 ? `${daysUntilDue} days until due` : `${Math.abs(daysUntilDue)} days overdue`}
                      </p>
                    </div>

                    {/* Milestones */}
                    <div>
                      <h4 className="text-sm font-bold mb-3">Milestones</h4>
                      <div className="flex flex-wrap gap-2">
                        {record.milestones.map((milestone, idx) => (
                          <button
                            key={idx}
                            onClick={() => toggleMilestone(record.id, idx)}
                            className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                              milestone.completed
                                ? 'bg-green-500/20 text-green-500 hover:bg-green-500/30'
                                : isDark 
                                  ? 'bg-neutral-800 text-slate-400 hover:bg-neutral-700'
                                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            {milestone.completed ? '✓ ' : ''}{milestone.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className={`mt-4 pt-4 border-t flex justify-between items-center ${
                      isDark ? 'border-white/5' : 'border-slate-200'
                    }`}>
                      <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        <div>
                          <span className="font-semibold">Method:</span> {record.method}
                        </div>
                        <div>
                          <span className="font-semibold">Vet:</span> {record.veterinarian || 'N/A'}
                        </div>
                      </div>
                      <div className="flex gap-2">
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
                  </div>
                );
              })}
            </div>
          )}

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
                {editingRecord ? 'Edit Pregnancy Record' : 'Add Pregnancy Record'}
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
                  <label className="block text-sm font-semibold mb-2">Due Date</label>
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
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
                  <label className="block text-sm font-semibold mb-2">Method</label>
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
                    <option value="Blood Test">Blood Test</option>
                    <option value="Ultrasound">Ultrasound</option>
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
                    <option value="monitoring">Monitoring</option>
                    <option value="aborted">Aborted</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Veterinarian</label>
                <input
                  type="text"
                  name="veterinarian"
                  value={formData.veterinarian}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 rounded-lg border ${
                    isDark 
                      ? 'bg-neutral-800 border-white/10 text-white' 
                      : 'bg-white border-slate-300 text-slate-900'
                  }`}
                  placeholder="Enter veterinarian name"
                />
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
                  className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold transition-colors shadow-lg"
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