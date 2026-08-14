import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  Layers, 
  Users, 
  LogOut, 
  DollarSign, 
  Clock, 
  User, 
  CheckCircle2, 
  MessageSquare, 
  ChevronRight, 
  Sparkles,
  ArrowRight,
  TrendingUp,
  FileText,
  Sliders,
  AlertCircle
} from 'lucide-react';

const DESIGNERS = ['Kofi Asante', 'Abena Osei', 'Kwame Bako', 'Unassigned'];

export default function ManagerDashboard({ user, onLogout, projects, setProjects, designs, setDesigns }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editForm, setEditForm] = useState({
    status: '',
    designer: '',
    progress: 0,
    milestone: ''
  });

  // Analytics
  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.status !== 'Completed');
  const activeCount = activeProjects.length;
  const unassignedCount = projects.filter(p => p.designer === 'Unassigned' || !p.designer).length;
  
  const totalSystemBudget = projects.reduce((sum, p) => sum + p.budget, 0);
  const totalSystemSpent = projects.reduce((sum, p) => sum + p.spent, 0);
  
  const averageProgress = totalProjects > 0 
    ? Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / totalProjects) 
    : 0;

  // Open inline edit panel
  const handleEditClick = (project) => {
    setEditingProjectId(project.id);
    setEditForm({
      status: project.status,
      designer: project.designer || 'Unassigned',
      progress: project.progress,
      milestone: project.milestone || ''
    });
  };

  const handleEditSave = (projectId) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        // Adjust spent dynamically if progress changes to 100%
        let updatedSpent = p.spent;
        if (editForm.status === 'Completed') {
          updatedSpent = p.budget; // mark fully spent
        }
        return {
          ...p,
          status: editForm.status,
          designer: editForm.designer,
          progress: Number(editForm.progress),
          milestone: editForm.milestone,
          spent: updatedSpent
        };
      }
      return p;
    }));
    setEditingProjectId(null);
  };

  // Direct assign helper in the overview alert card
  const handleDirectAssign = (projectId, designerName) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        return { 
          ...p, 
          designer: designerName, 
          status: p.status === 'Consulting' ? 'In Design' : p.status 
        };
      }
      return p;
    }));
  };

  return (
    <div className="flex min-h-screen bg-[#F6F2EC] text-[#2D4A3B]">
      
      {/* 1. Sidebar Panel */}
      <aside className="w-80 bg-[#1B3125] text-white flex flex-col justify-between p-6 border-r border-[#E6E0D9]/20 sticky top-0 h-screen select-none">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10 pl-2">
            <span className="font-bold text-2xl tracking-tight text-[#28AB67]">HavenRae</span>
            <span className="text-[10px] bg-[#C1633B] text-white px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">Ops</span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2">
            <button
              onClick={() => { setActiveTab('overview'); setEditingProjectId(null); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all cursor-pointer ${
                activeTab === 'overview' 
                  ? 'bg-[#C1633B] text-white shadow-lg shadow-[#C1633B]/20 scale-102' 
                  : 'hover:bg-white/10 text-white/70 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Operations Summary</span>
            </button>

            <button
              onClick={() => { setActiveTab('projects'); setEditingProjectId(null); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all cursor-pointer ${
                activeTab === 'projects' 
                  ? 'bg-[#C1633B] text-white shadow-lg shadow-[#C1633B]/20 scale-102' 
                  : 'hover:bg-white/10 text-white/70 hover:text-white'
              }`}
            >
              <Briefcase className="w-5 h-5" />
              <div className="w-full flex justify-between items-center">
                <span>Projects Directory</span>
                {unassignedCount > 0 && (
                  <span className="text-xs bg-amber-500 text-white font-bold px-2 py-0.5 rounded-full">
                    {unassignedCount} New
                  </span>
                )}
              </div>
            </button>

            <button
              onClick={() => { setActiveTab('designs'); setEditingProjectId(null); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all cursor-pointer ${
                activeTab === 'designs' 
                  ? 'bg-[#C1633B] text-white shadow-lg shadow-[#C1633B]/20 scale-102' 
                  : 'hover:bg-white/10 text-white/70 hover:text-white'
              }`}
            >
              <Layers className="w-5 h-5" />
              <span>Designs Tracker</span>
            </button>

            <button
              onClick={() => { setActiveTab('clients'); setEditingProjectId(null); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all cursor-pointer ${
                activeTab === 'clients' 
                  ? 'bg-[#C1633B] text-white shadow-lg shadow-[#C1633B]/20 scale-102' 
                  : 'hover:bg-white/10 text-white/70 hover:text-white'
              }`}
            >
              <Users className="w-5 h-5" />
              <span>Client Registry</span>
            </button>
          </nav>
        </div>

        {/* Manager Profile Card & Logout */}
        <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
          <div className="flex items-center gap-3 px-2">
            <img 
              src={user?.avatar || '/images/kingsley-hemans-sL_tARoYdu4-unsplash.jpg'} 
              alt={user?.name} 
              className="w-12 h-12 rounded-full border-2 border-[#C1633B] object-cover"
            />
            <div className="flex flex-col text-left">
              <span className="font-bold text-[15px] leading-tight">{user?.name || 'Angel Sharon'}</span>
              <span className="text-xs text-white/60 truncate max-w-[130px]">Operations Manager</span>
            </div>
          </div>
          
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium text-rose-300 hover:text-rose-100 hover:bg-rose-950/20 transition-all cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* 2. Main Content View Area */}
      <main className="flex-1 min-h-screen flex flex-col p-8 lg:p-12 overflow-y-auto">
        
        {/* Header bar */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-[#E6E0D9] pb-6 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-[#2D4A3B] flex items-center gap-2">
              Manager Panel: {user?.name || 'Angel'} <Sparkles className="w-5 h-5 text-[#C1633B]" />
            </h1>
            <p className="text-[#7A7268] text-sm mt-1">{user?.location || 'Head Office, Accra'}</p>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-[#7A7268] uppercase tracking-wider block">Operational Status</span>
            <span className="text-xs font-bold bg-[#28AB67]/10 text-[#28AB67] px-2.5 py-1 rounded-full inline-block mt-1">System Healthy</span>
          </div>
        </header>

        {/* ---------------- OVERVIEW TAB ---------------- */}
        {activeTab === 'overview' && (
          <div className="flex flex-col gap-8 animate-fade-in text-left">
            
            {/* Stat Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-white border border-[#E6E0D9] rounded-2xl p-6 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-extrabold text-[#7A7268] uppercase tracking-wider block">Active Contracts</span>
                  <h3 className="text-3xl font-extrabold mt-2 text-[#2D4A3B]">{activeCount}</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#C1633B]/10 flex items-center justify-center text-[#C1633B]">
                  <Briefcase className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white border border-[#E6E0D9] rounded-2xl p-6 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-extrabold text-[#7A7268] uppercase tracking-wider block">Pipeline Value</span>
                  <h3 className="text-2xl font-extrabold mt-2 text-[#2D4A3B]">GH₵ {totalSystemBudget.toLocaleString()}</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#28AB67]/10 flex items-center justify-center text-[#28AB67]">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white border border-[#E6E0D9] rounded-2xl p-6 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-extrabold text-[#7A7268] uppercase tracking-wider block">Unassigned Orders</span>
                  <h3 className={`text-3xl font-extrabold mt-2 ${unassignedCount > 0 ? 'text-amber-600' : 'text-[#2D4A3B]'}`}>{unassignedCount}</h3>
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${unassignedCount > 0 ? 'bg-amber-100 text-amber-600' : 'bg-[#E6E0D9]/40 text-[#7A7268]'}`}>
                  <AlertCircle className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white border border-[#E6E0D9] rounded-2xl p-6 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-extrabold text-[#7A7268] uppercase tracking-wider block">Average Progress</span>
                  <h3 className="text-3xl font-extrabold mt-2 text-[#2D4A3B]">{averageProgress}%</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#28AB67]/10 flex items-center justify-center text-[#28AB67]">
                  <Sliders className="w-6 h-6" />
                </div>
              </div>

            </div>

            {/* Unassigned incoming queue */}
            {projects.filter(p => p.designer === 'Unassigned' || !p.designer).length > 0 && (
              <div className="bg-white border border-amber-200 rounded-2xl p-6 shadow-sm bg-amber-50/20">
                <h3 className="text-base font-bold text-amber-800 flex items-center gap-2 mb-4">
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  <span>Unassigned Renovations Pending Designer Allocation</span>
                </h3>
                <div className="flex flex-col gap-4">
                  {projects.filter(p => p.designer === 'Unassigned' || !p.designer).map((proj) => (
                    <div 
                      key={proj.id} 
                      className="bg-white border border-[#E6E0D9] p-4 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-amber-400 transition-colors"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold bg-[#F6F2EC] px-2 py-0.5 rounded text-[#2D4A3B]">{proj.id}</span>
                          <span className="text-xs text-[#7A7268]">Ordered: {proj.date}</span>
                        </div>
                        <h4 className="font-bold text-sm">{proj.roomType} • Style: {proj.style}</h4>
                        <p className="text-xs text-[#7A7268] mt-0.5">Budget Allocation: <strong>GH₵ {proj.budget.toLocaleString()}</strong></p>
                      </div>
                      
                      {/* Interactive direct assignment dropdown */}
                      <div className="flex items-center gap-2 w-full md:w-auto">
                        <label className="text-xs font-bold text-[#7A7268] whitespace-nowrap">Assign Staff:</label>
                        <select
                          onChange={(e) => handleDirectAssign(proj.id, e.target.value)}
                          defaultValue="Unassigned"
                          className="bg-white border border-[#E6E0D9] rounded-lg text-xs font-semibold px-3 py-1.5 focus:border-[#28AB67] outline-none"
                        >
                          <option value="Unassigned">Select Designer...</option>
                          {DESIGNERS.filter(d => d !== 'Unassigned').map(d => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Row: Operations Logs & Designer Load Status */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Operations Activity Log */}
              <div className="bg-white border border-[#E6E0D9] rounded-2xl p-6 shadow-sm lg:col-span-2 text-left">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#C1633B]" />
                  <span>Operations System Logs</span>
                </h3>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4 items-start pb-4 border-b border-[#F6F2EC]">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-sm text-[#2D4A3B]">Client sign-off received</span>
                      <p className="text-xs text-[#7A7268] mt-0.5">Client Ama Mensah approved accent wall rendering for Cozy Bedroom refresh.</p>
                      <span className="text-[10px] text-[#7A7268] block mt-1">Aug 14, 2026 at 11:32 AM</span>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start pb-4 border-b border-[#F6F2EC]">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0 mt-0.5">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-sm text-[#2D4A3B]">New client contract logged</span>
                      <p className="text-xs text-[#7A7268] mt-0.5">Renovation code HR-2026-001 opened for Modern Living Room.</p>
                      <span className="text-[10px] text-[#7A7268] block mt-1">Aug 01, 2026</span>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 flex-shrink-0 mt-0.5">
                      <AlertCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-sm text-[#2D4A3B]">Audit: System Sync Completed</span>
                      <p className="text-xs text-[#7A7268] mt-0.5">All local client folders synchronized with main project registers.</p>
                      <span className="text-[10px] text-[#7A7268] block mt-1">Jul 28, 2026</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Designer load status widget */}
              <div className="bg-white border border-[#E6E0D9] rounded-2xl p-6 shadow-sm text-left flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold mb-4">Designer Workload</h3>
                  
                  <div className="flex flex-col gap-4">
                    {DESIGNERS.filter(d => d !== 'Unassigned').map(d => {
                      const loadCount = projects.filter(p => p.designer === d && p.status !== 'Completed').length;
                      return (
                        <div key={d} className="flex flex-col">
                          <div className="flex justify-between items-center mb-1 text-xs">
                            <span className="font-bold">{d}</span>
                            <span className="font-semibold text-[#C1633B]">{loadCount} active projects</span>
                          </div>
                          <div className="w-full h-1.5 bg-[#F6F2EC] rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${loadCount >= 3 ? 'bg-amber-500' : 'bg-[#28AB67]'}`}
                              style={{ width: `${Math.min(loadCount * 33, 100)}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <button
                  onClick={() => setActiveTab('projects')}
                  className="w-full mt-6 py-2.5 bg-[#C1633B] hover:bg-[#C1633B]/90 text-white rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Manage Projects</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        )}

        {/* ---------------- PROJECTS DIRECTORY TAB ---------------- */}
        {activeTab === 'projects' && (
          <div className="flex flex-col gap-6 animate-fade-in text-left">
            <div>
              <h2 className="text-2xl font-bold">Client Projects & Operations Directory</h2>
              <p className="text-sm text-[#7A7268] mt-1">Supervise progress, reassign designers, write active milestone descriptions, and change status.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              
              {/* Project Card Register */}
              {projects.map((proj) => {
                const isEditing = editingProjectId === proj.id;
                
                return (
                  <div 
                    key={proj.id} 
                    className={`bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-200 ${
                      isEditing ? 'border-[#C1633B] ring-1 ring-[#C1633B]/30' : 'border-[#E6E0D9]'
                    }`}
                  >
                    
                    {/* View State */}
                    {!isEditing ? (
                      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
                        {/* Info details */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <span className="text-xs bg-[#2D4A3B]/10 text-[#2D4A3B] font-bold px-2.5 py-0.5 rounded-full">
                              {proj.id}
                            </span>
                            <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold border ${
                              proj.status === 'Completed' 
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                                : proj.status === 'In Design'
                                ? 'bg-blue-50 text-blue-700 border-blue-200'
                                : 'bg-amber-50 text-amber-700 border-amber-200'
                            }`}>
                              {proj.status}
                            </span>
                            <span className="text-xs text-[#7A7268]">Ordered {proj.date}</span>
                          </div>
                          <h3 className="text-xl font-bold">{proj.roomType}</h3>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4 pt-4 border-t border-[#F6F2EC] text-xs">
                            <div>
                              <span className="text-[#7A7268] block">Lead Designer</span>
                              <strong className="text-[#2D4A3B] text-sm">{proj.designer}</strong>
                            </div>
                            <div>
                              <span className="text-[#7A7268] block">Style Theme</span>
                              <strong className="text-[#2D4A3B] text-sm">{proj.style}</strong>
                            </div>
                            <div>
                              <span className="text-[#7A7268] block">Current Milestone</span>
                              <strong className="text-[#C1633B] text-sm truncate block">{proj.milestone}</strong>
                            </div>
                          </div>
                        </div>

                        {/* Progress display */}
                        <div className="w-full lg:w-48">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs font-bold text-[#7A7268]">Progress</span>
                            <span className="text-xs font-bold text-[#2D4A3B]">{proj.progress}%</span>
                          </div>
                          <div className="w-full h-2 bg-[#F6F2EC] rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${proj.progress === 100 ? 'bg-emerald-500' : 'bg-[#C1633B]'}`} 
                              style={{ width: `${proj.progress}%` }}
                            />
                          </div>
                          <span className="text-[10px] text-[#7A7268] font-semibold mt-1 block">Timeline: {proj.timeline}</span>
                        </div>

                        {/* Financial figures */}
                        <div className="w-full lg:w-48 bg-[#F6F2EC]/40 p-4 rounded-xl border border-[#E6E0D9]/50 flex justify-between items-center">
                          <div className="text-left">
                            <span className="text-[10px] font-extrabold text-[#7A7268] uppercase block">Budget</span>
                            <strong className="text-sm font-bold">GH₵ {proj.budget.toLocaleString()}</strong>
                          </div>
                          <button
                            onClick={() => handleEditClick(proj)}
                            className="px-4 py-2 border border-[#C1633B] hover:bg-[#C1633B] hover:text-white text-[#C1633B] font-bold text-xs rounded-xl transition-all cursor-pointer"
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    ) : (
                      
                      // Interactive Editing Block
                      <div className="flex flex-col gap-6">
                        <div className="flex justify-between items-center border-b border-[#F6F2EC] pb-3">
                          <h4 className="font-bold text-base text-[#C1633B]">Editing Project {proj.id} • {proj.roomType}</h4>
                          <span className="text-xs text-[#7A7268]">Double-check parameters before saving</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                          {/* Designer Selector */}
                          <div className="flex flex-col gap-1.5 text-left">
                            <label className="text-xs font-bold text-[#7A7268]">Lead Staff Designer</label>
                            <select
                              value={editForm.designer}
                              onChange={(e) => setEditForm(prev => ({ ...prev, designer: e.target.value }))}
                              className="bg-white border border-[#E6E0D9] p-2 rounded-xl text-sm font-semibold outline-none focus:border-[#C1633B]"
                            >
                              {DESIGNERS.map(d => (
                                <option key={d} value={d}>{d}</option>
                              ))}
                            </select>
                          </div>

                          {/* Status Selector */}
                          <div className="flex flex-col gap-1.5 text-left">
                            <label className="text-xs font-bold text-[#7A7268]">Project Status</label>
                            <select
                              value={editForm.status}
                              onChange={(e) => {
                                const newStatus = e.target.value;
                                setEditForm(prev => ({ 
                                  ...prev, 
                                  status: newStatus,
                                  progress: newStatus === 'Completed' ? 100 : prev.progress
                                }));
                              }}
                              className="bg-white border border-[#E6E0D9] p-2 rounded-xl text-sm font-semibold outline-none focus:border-[#C1633B]"
                            >
                              <option value="Consulting">Consulting</option>
                              <option value="In Design">In Design</option>
                              <option value="Managing">Managing</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </div>

                          {/* Progress Slider */}
                          <div className="flex flex-col gap-1.5 text-left">
                            <div className="flex justify-between items-center">
                              <label className="text-xs font-bold text-[#7A7268]">Renovation Progress</label>
                              <span className="text-xs font-bold text-[#C1633B]">{editForm.progress}%</span>
                            </div>
                            <div className="flex items-center gap-3 h-full">
                              <input 
                                type="range" 
                                min="0" 
                                max="100" 
                                step="5"
                                value={editForm.progress}
                                onChange={(e) => setEditForm(prev => ({ ...prev, progress: Number(e.target.value) }))}
                                className="w-full accent-[#C1633B] bg-[#F6F2EC] rounded-lg h-2 cursor-pointer"
                              />
                            </div>
                          </div>

                          {/* Milestone input */}
                          <div className="flex flex-col gap-1.5 text-left">
                            <label className="text-xs font-bold text-[#7A7268]">Next Active Milestone Description</label>
                            <input
                              type="text"
                              value={editForm.milestone}
                              onChange={(e) => setEditForm(prev => ({ ...prev, milestone: e.target.value }))}
                              placeholder="E.g., Procurement stage"
                              className="bg-white border border-[#E6E0D9] p-2 rounded-xl text-sm font-medium outline-none focus:border-[#C1633B]"
                            />
                          </div>
                        </div>

                        {/* Save Action Buttons */}
                        <div className="flex justify-end gap-2 border-t border-[#F6F2EC] pt-4 mt-2">
                          <button
                            onClick={() => setEditingProjectId(null)}
                            className="px-5 py-2 border border-[#E6E0D9] hover:bg-[#F6F2EC]/30 rounded-xl text-xs font-bold text-[#7A7268] cursor-pointer"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleEditSave(proj.id)}
                            className="px-5 py-2 bg-[#C1633B] hover:bg-[#C1633B]/90 text-white rounded-xl text-xs font-bold cursor-pointer"
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        )}

        {/* ---------------- DESIGNS TRACKER TAB ---------------- */}
        {activeTab === 'designs' && (
          <div className="flex flex-col gap-6 animate-fade-in text-left">
            <div>
              <h2 className="text-2xl font-bold">Central Designs File Tracker</h2>
              <p className="text-sm text-[#7A7268] mt-1">Supervise and monitor design file statuses submitted by lead designers to clients.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {designs.map((design) => (
                <div key={design.id} className="bg-white border border-[#E6E0D9] rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
                  <div className="h-[200px]">
                    <img 
                      src={design.image} 
                      alt={design.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[11px] font-extrabold text-[#7A7268] uppercase tracking-wider">{design.project}</span>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                          design.status === 'Approved' 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}>{design.status}</span>
                      </div>
                      <h4 className="font-bold text-sm leading-snug">{design.name}</h4>
                      <span className="text-xs text-[#7A7268] block mt-1">Uploaded {design.date}</span>
                    </div>

                    <div className="mt-4 pt-4 border-t border-[#F6F2EC] flex justify-between text-xs text-[#7A7268]">
                      <span>Code: <strong>{design.id}</strong></span>
                      <span>Owner: <strong>Ama Mensah</strong></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- CLIENT REGISTRY TAB ---------------- */}
        {activeTab === 'clients' && (
          <div className="flex flex-col gap-6 animate-fade-in text-left">
            <div>
              <h2 className="text-2xl font-bold">Client Register & Financial Commitments</h2>
              <p className="text-sm text-[#7A7268] mt-1">Review registered clients, their physical project locations, active folders, and total budget pipeline.</p>
            </div>

            <div className="bg-white border border-[#E6E0D9] rounded-2xl overflow-hidden shadow-sm">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#2D4A3B]/5 border-b border-[#E6E0D9] text-xs font-bold text-[#7A7268] uppercase tracking-wider">
                    <th className="px-6 py-4">Client Name</th>
                    <th className="px-6 py-4">Email</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4 text-center">Active Projects</th>
                    <th className="px-6 py-4 text-right">Pipeline Budget</th>
                    <th className="px-6 py-4 text-right">Settled Invoices</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6E0D9] text-sm">
                  
                  {/* Client Row: Ama Mensah */}
                  <tr className="hover:bg-[#F6F2EC]/20 transition-colors">
                    <td className="px-6 py-4 font-bold flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#28AB67] text-white flex items-center justify-center font-bold text-xs">
                        AM
                      </div>
                      <span>Ama Mensah</span>
                    </td>
                    <td className="px-6 py-4 text-[#7A7268]">client@havenrae.com</td>
                    <td className="px-6 py-4 font-medium">Airport Residential Area, Accra</td>
                    <td className="px-6 py-4 text-center font-bold">{projects.length}</td>
                    <td className="px-6 py-4 text-right font-bold">GH₵ {totalSystemBudget.toLocaleString()}</td>
                    <td className="px-6 py-4 text-right font-bold text-[#28AB67]">GH₵ {totalSystemSpent.toLocaleString()}</td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
