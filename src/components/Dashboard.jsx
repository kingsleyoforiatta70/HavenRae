import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  Layers, 
  PlusCircle, 
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
  FileText
} from 'lucide-react';

const INITIAL_PROJECTS = [
  {
    id: 'HR-2026-001',
    roomType: 'Modern Living Room',
    style: 'Contemporary Minimalist',
    status: 'In Design',
    progress: 45,
    budget: 45000,
    spent: 18500,
    date: '2026-08-01',
    milestone: '3D Render Review',
    designer: 'Kofi Asante',
    timeline: 'Aug 1 - Sep 15'
  },
  {
    id: 'HR-2026-002',
    roomType: 'Cozy Bedroom Refresh',
    style: 'Warm Organic Modern',
    status: 'Completed',
    progress: 100,
    budget: 25000,
    spent: 24200,
    date: '2026-06-12',
    milestone: 'Final Handover',
    designer: 'Abena Osei',
    timeline: 'Jun 12 - Jul 10'
  }
];

const INITIAL_DESIGNS = [
  {
    id: 'DSN-301',
    project: 'Modern Living Room',
    name: 'Layout Option A (Open Concept)',
    image: '/images/zac-gudakov-mw_mj-noYHM-unsplash.jpg',
    status: 'Pending Approval',
    date: '2026-08-10'
  },
  {
    id: 'DSN-302',
    project: 'Modern Living Room',
    name: 'Lighting Plan (Warm Ambient)',
    image: '/images/6d6c20aaf0a9ec1d83f6064661ddc56c.jpg',
    status: 'Pending Approval',
    date: '2026-08-12'
  },
  {
    id: 'DSN-303',
    project: 'Cozy Bedroom Refresh',
    name: 'Accent Wall & Textiles Selection',
    image: '/images/francesca-tosolini-hCU4fimRW-c-unsplash.jpg',
    status: 'Approved',
    date: '2026-06-20'
  }
];

export default function Dashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [designs, setDesigns] = useState(INITIAL_DESIGNS);

  // New Order Form States
  const [newOrderStep, setNewOrderStep] = useState(1);
  const [formData, setFormData] = useState({
    roomType: 'Living Room',
    style: 'Modern Minimalist',
    budget: 35000,
    timeline: '4-6 Weeks',
    notes: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Stats Calculations
  const activeProjectsCount = projects.filter(p => p.status !== 'Completed').length;
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
  const totalSpent = projects.reduce((sum, p) => sum + p.spent, 0);
  const pendingDesignsCount = designs.filter(d => d.status === 'Pending Approval').length;

  const handleApproveDesign = (id) => {
    setDesigns(prev => prev.map(d => d.id === id ? { ...d, status: 'Approved' } : d));
  };

  const handleRequestChanges = (id) => {
    const feedback = prompt('Please enter your revision notes:');
    if (feedback) {
      setDesigns(prev => prev.map(d => d.id === id ? { ...d, status: 'Revisions Requested' } : d));
      alert('Your revision notes have been submitted to the designer.');
    }
  };

  const handleFormChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    setNewOrderStep(5); // Success state

    // Simulate database update
    setTimeout(() => {
      const newProject = {
        id: `HR-2026-00${projects.length + 1}`,
        roomType: formData.roomType,
        style: formData.style,
        status: 'Consulting',
        progress: 10,
        budget: Number(formData.budget),
        spent: 0,
        date: new Date().toISOString().split('T')[0],
        milestone: 'Initial Consultation scheduled',
        designer: 'Unassigned',
        timeline: formData.timeline
      };

      setProjects(prev => [newProject, ...prev]);
      setFormSubmitted(true);
    }, 1000);
  };

  const resetOrderForm = () => {
    setFormData({
      roomType: 'Living Room',
      style: 'Modern Minimalist',
      budget: 35000,
      timeline: '4-6 Weeks',
      notes: ''
    });
    setNewOrderStep(1);
    setFormSubmitted(false);
    setActiveTab('projects');
  };

  return (
    <div className="flex min-h-screen bg-[#F6F2EC] text-[#2D4A3B]">
      
      {/* 1. Sidebar Panel */}
      <aside className="w-80 bg-[#2D4A3B] text-white flex flex-col justify-between p-6 border-r border-[#E6E0D9]/20 sticky top-0 h-screen select-none">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10 pl-2">
            <span className="font-bold text-2xl tracking-tight text-[#28AB67]">HavenRae</span>
            <span className="text-[10px] bg-white/10 text-white/80 px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">Client</span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-2">
            <button
              onClick={() => { setActiveTab('overview'); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all cursor-pointer ${
                activeTab === 'overview' 
                  ? 'bg-[#28AB67] text-white shadow-lg shadow-[#28AB67]/20 scale-102' 
                  : 'hover:bg-white/10 text-white/70 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => { setActiveTab('projects'); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all cursor-pointer ${
                activeTab === 'projects' 
                  ? 'bg-[#28AB67] text-white shadow-lg shadow-[#28AB67]/20 scale-102' 
                  : 'hover:bg-white/10 text-white/70 hover:text-white'
              }`}
            >
              <Briefcase className="w-5 h-5" />
              <span>My Projects</span>
            </button>

            <button
              onClick={() => { setActiveTab('designs'); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all cursor-pointer ${
                activeTab === 'designs' 
                  ? 'bg-[#28AB67] text-white shadow-lg shadow-[#28AB67]/20 scale-102' 
                  : 'hover:bg-white/10 text-white/70 hover:text-white'
              }`}
            >
              <Layers className="w-5 h-5" />
              <div className="w-full flex justify-between items-center">
                <span>Design Board</span>
                {pendingDesignsCount > 0 && (
                  <span className="text-xs bg-[#C1633B] text-white font-bold px-2 py-0.5 rounded-full">
                    {pendingDesignsCount}
                  </span>
                )}
              </div>
            </button>

            <button
              onClick={() => { setActiveTab('new-order'); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all cursor-pointer ${
                activeTab === 'new-order' 
                  ? 'bg-[#28AB67] text-white shadow-lg shadow-[#28AB67]/20 scale-102' 
                  : 'hover:bg-white/10 text-white/70 hover:text-white'
              }`}
            >
              <PlusCircle className="w-5 h-5" />
              <span>Place New Order</span>
            </button>
          </nav>
        </div>

        {/* Client Profile Card & Logout */}
        <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
          <div className="flex items-center gap-3 px-2">
            <img 
              src={user?.avatar || '/images/kingsley-hemans-sL_tARoYdu4-unsplash.jpg'} 
              alt={user?.name} 
              className="w-12 h-12 rounded-full border-2 border-[#28AB67] object-cover"
            />
            <div className="flex flex-col text-left">
              <span className="font-bold text-[15px] leading-tight">{user?.name || 'Ama Mensah'}</span>
              <span className="text-xs text-white/60 truncate max-w-[130px]">{user?.email || 'client@havenrae.com'}</span>
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
            <h1 className="text-3xl font-extrabold tracking-tight capitalize text-[#2D4A3B] flex items-center gap-2">
              Welcome back, {user?.name.split(' ')[0] || 'Ama'} <Sparkles className="w-5 h-5 text-[#C1633B] animate-pulse" />
            </h1>
            <p className="text-[#7A7268] text-sm mt-1">{user?.location || 'Airport Residential Area, Accra'}</p>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-[#7A7268] uppercase tracking-wider block">Local Date</span>
            <span className="text-[15px] font-bold text-[#2D4A3B]">Friday, August 14, 2026</span>
          </div>
        </header>

        {/* ---------------- OVERVIEW TAB ---------------- */}
        {activeTab === 'overview' && (
          <div className="flex flex-col gap-8 animate-fade-in">
            {/* 4 Metrics Cards row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-white border border-[#E6E0D9] rounded-2xl p-6 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                <div className="text-left">
                  <span className="text-xs font-extrabold text-[#7A7268] uppercase tracking-widest">Active Renovations</span>
                  <h3 className="text-3xl font-extrabold mt-2 text-[#2D4A3B]">{activeProjectsCount}</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#28AB67]/10 flex items-center justify-center text-[#28AB67]">
                  <Briefcase className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white border border-[#E6E0D9] rounded-2xl p-6 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                <div className="text-left">
                  <span className="text-xs font-extrabold text-[#7A7268] uppercase tracking-widest">Allocated Budget</span>
                  <h3 className="text-2xl font-extrabold mt-2 text-[#2D4A3B]">GH₵ {totalBudget.toLocaleString()}</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#C1633B]/10 flex items-center justify-center text-[#C1633B]">
                  <DollarSign className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white border border-[#E6E0D9] rounded-2xl p-6 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                <div className="text-left">
                  <span className="text-xs font-extrabold text-[#7A7268] uppercase tracking-widest">Total Spent</span>
                  <h3 className="text-2xl font-extrabold mt-2 text-[#28AB67]">GH₵ {totalSpent.toLocaleString()}</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#28AB67]/10 flex items-center justify-center text-[#28AB67]">
                  <TrendingUp className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white border border-[#E6E0D9] rounded-2xl p-6 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
                <div className="text-left">
                  <span className="text-xs font-extrabold text-[#7A7268] uppercase tracking-widest">Pending Designs</span>
                  <h3 className="text-3xl font-extrabold mt-2 text-[#C1633B]">{pendingDesignsCount}</h3>
                </div>
                <div className="w-12 h-12 rounded-full bg-[#C1633B]/10 flex items-center justify-center text-[#C1633B]">
                  <Layers className="w-6 h-6" />
                </div>
              </div>

            </div>

            {/* Active Project Timeline */}
            <div className="bg-white border border-[#E6E0D9] rounded-2xl p-8 shadow-sm text-left">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-[#C1633B] rounded-full animate-ping"></span>
                  <h2 className="text-xl font-bold">Active Project Tracker</h2>
                </div>
                <span className="text-xs bg-[#2D4A3B]/5 border border-[#2D4A3B]/15 text-[#2D4A3B] px-3 py-1 rounded-full font-bold">
                  ID: {projects[0]?.id || 'N/A'}
                </span>
              </div>

              {projects[0] ? (
                <>
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
                    <div>
                      <h3 className="text-2xl font-bold text-[#2D4A3B]">{projects[0].roomType}</h3>
                      <p className="text-sm text-[#7A7268] mt-1">Style: <strong className="text-[#2D4A3B]">{projects[0].style}</strong> • Designer: <strong className="text-[#2D4A3B]">{projects[0].designer}</strong></p>
                    </div>
                    <div className="text-left lg:text-right">
                      <span className="text-xs text-[#7A7268] block">Next Milestone</span>
                      <span className="text-base font-bold text-[#C1633B]">{projects[0].milestone}</span>
                    </div>
                  </div>

                  {/* Visual Stepper */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative mt-4">
                    {/* Connecting bar */}
                    <div className="hidden md:block absolute top-5 left-[12%] right-[12%] h-[3px] bg-[#E6E0D9] z-0">
                      <div 
                        className="h-full bg-[#28AB67] transition-all duration-500" 
                        style={{ 
                          width: projects[0].status === 'Consulting' ? '0%' : 
                                 projects[0].status === 'In Design' ? '33%' : 
                                 projects[0].status === 'Managing' ? '66%' : '100%'
                        }}
                      />
                    </div>

                    {/* Step 1 */}
                    <div className="flex md:flex-col items-center md:text-center gap-4 md:gap-3 relative z-10">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 ${
                        projects[0].progress >= 10 
                          ? 'bg-[#28AB67] border-[#28AB67] text-white shadow-md' 
                          : 'bg-white border-[#E6E0D9] text-[#7A7268]'
                      }`}>
                        1
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">Consultation</h4>
                        <p className="text-xs text-[#7A7268]">Introductory Call</p>
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex md:flex-col items-center md:text-center gap-4 md:gap-3 relative z-10">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 ${
                        projects[0].progress >= 30 
                          ? 'bg-[#28AB67] border-[#28AB67] text-white shadow-md' 
                          : 'bg-white border-[#E6E0D9] text-[#7A7268]'
                      }`}>
                        2
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">Design Selection</h4>
                        <p className="text-xs text-[#7A7268]">3D Renders & Plan</p>
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex md:flex-col items-center md:text-center gap-4 md:gap-3 relative z-10">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 ${
                        projects[0].progress >= 70 
                          ? 'bg-[#28AB67] border-[#28AB67] text-white shadow-md' 
                          : 'bg-white border-[#E6E0D9] text-[#7A7268]'
                      }`}>
                        3
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">Procure & Build</h4>
                        <p className="text-xs text-[#7A7268]">Schedules & Assembly</p>
                      </div>
                    </div>

                    {/* Step 4 */}
                    <div className="flex md:flex-col items-center md:text-center gap-4 md:gap-3 relative z-10">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 ${
                        projects[0].progress === 100 
                          ? 'bg-[#28AB67] border-[#28AB67] text-white shadow-md' 
                          : 'bg-white border-[#E6E0D9] text-[#7A7268]'
                      }`}>
                        4
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">Handover</h4>
                        <p className="text-xs text-[#7A7268]">Final walkthrough</p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="py-8 text-center text-[#7A7268]">
                  No active projects found. Go to "Place New Order" tab to begin!
                </div>
              )}
            </div>

            {/* Bottom Overview Row (Recent Activity & Designer Note) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Activity log */}
              <div className="bg-white border border-[#E6E0D9] rounded-2xl p-6 shadow-sm lg:col-span-2 text-left">
                <h3 className="text-lg font-bold mb-4">Project Activity Log</h3>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4 items-start pb-4 border-b border-[#F6F2EC]">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 flex-shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-sm text-[#2D4A3B]">Layout rendering uploaded</span>
                      <p className="text-xs text-[#7A7268] mt-0.5">Your designer Kofi Asante uploaded 2 new concepts in Design Board</p>
                      <span className="text-[10px] text-[#7A7268] block mt-1">Aug 12, 2026</span>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start pb-4 border-b border-[#F6F2EC]">
                    <div className="w-8 h-8 rounded-full bg-[#C1633B]/10 flex items-center justify-center text-[#C1633B] flex-shrink-0 mt-0.5">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-sm text-[#2D4A3B]">Initial Consultation Completed</span>
                      <p className="text-xs text-[#7A7268] mt-0.5">Discussed floorplan configurations, budget scopes and design directions.</p>
                      <span className="text-[10px] text-[#7A7268] block mt-1">Aug 03, 2026</span>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-8 h-8 rounded-full bg-[#28AB67]/10 flex items-center justify-center text-[#28AB67] flex-shrink-0 mt-0.5">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-bold text-sm text-[#2D4A3B]">Project Initiated</span>
                      <p className="text-xs text-[#7A7268] mt-0.5">Renovation order placed successfully and team assigned.</p>
                      <span className="text-[10px] text-[#7A7268] block mt-1">Aug 01, 2026</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Communication Widget */}
              <div className="bg-white border border-[#E6E0D9] rounded-2xl p-6 shadow-sm text-left flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-[#28AB67]" />
                    <span>Your Lead Designer</span>
                  </h3>
                  <div className="flex items-center gap-3 mt-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#2D4A3B] text-white flex items-center justify-center font-bold text-lg">
                      KA
                    </div>
                    <div>
                      <span className="font-bold block">Kofi Asante</span>
                      <span className="text-xs text-[#7A7268]">Senior Interior Stylist</span>
                    </div>
                  </div>
                  <p className="text-sm italic text-[#7A7268] leading-relaxed">
                    "I am currently fine-tuning your materials list for the living room layout. Feel free to review the layout plan on your Design Board."
                  </p>
                </div>
                <button
                  onClick={() => { setActiveTab('designs'); }}
                  className="w-full mt-6 py-2.5 bg-[#2D4A3B] hover:bg-[#2D4A3B]/90 text-white rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Go to Design Board</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ---------------- MY PROJECTS / ORDERS TAB ---------------- */}
        {activeTab === 'projects' && (
          <div className="flex flex-col gap-6 animate-fade-in text-left">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-2xl font-bold">Your Project Orders</h2>
              <button
                onClick={() => { setActiveTab('new-order'); }}
                className="px-4 py-2 bg-[#28AB67] text-white text-sm font-semibold rounded-xl hover:bg-[#28AB67]/90 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>New Project Order</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {projects.map((proj, idx) => (
                <div 
                  key={idx}
                  className="bg-white border border-[#E6E0D9] rounded-2xl p-6 lg:p-8 shadow-sm flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 hover:shadow-md transition-shadow"
                >
                  {/* Left Metadata */}
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
                      <span className="text-xs text-[#7A7268]">Placed on {proj.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-[#2D4A3B]">{proj.roomType}</h3>
                    <p className="text-sm text-[#7A7268] mt-1">
                      Theme: <strong className="text-[#2D4A3B]">{proj.style}</strong> • Lead: <strong className="text-[#2D4A3B]">{proj.designer}</strong>
                    </p>
                    <p className="text-xs text-[#7A7268] mt-2">Timeline: {proj.timeline}</p>
                  </div>

                  {/* Progress Indicator */}
                  <div className="w-full lg:w-48">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-[#7A7268]">Progress</span>
                      <span className="text-xs font-bold text-[#2D4A3B]">{proj.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-[#F6F2EC] rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${proj.progress === 100 ? 'bg-emerald-500' : 'bg-[#28AB67]'}`} 
                        style={{ width: `${proj.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Budget details */}
                  <div className="grid grid-cols-2 gap-4 w-full lg:w-72 bg-[#F6F2EC]/40 border border-[#E6E0D9]/50 p-4 rounded-xl">
                    <div className="text-left">
                      <span className="text-[10px] font-extrabold text-[#7A7268] uppercase tracking-wider block">Budget</span>
                      <span className="font-bold text-sm">GH₵ {proj.budget.toLocaleString()}</span>
                    </div>
                    <div className="text-left">
                      <span className="text-[10px] font-extrabold text-[#7A7268] uppercase tracking-wider block">Spent</span>
                      <span className="font-bold text-sm text-[#28AB67]">GH₵ {proj.spent.toLocaleString()}</span>
                    </div>
                    <div className="col-span-2 text-left pt-2 border-t border-[#E6E0D9]/50">
                      <span className="text-[10px] font-extrabold text-[#7A7268] uppercase tracking-wider block">Next Milestone</span>
                      <span className="font-bold text-xs text-[#C1633B] truncate block">{proj.milestone}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- DESIGN BOARD TAB ---------------- */}
        {activeTab === 'designs' && (
          <div className="flex flex-col gap-6 animate-fade-in text-left">
            <div>
              <h2 className="text-2xl font-bold">Interactive Design Board</h2>
              <p className="text-sm text-[#7A7268] mt-1">Review, comment on, and approve renders and design files from your designer.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {designs.map((design, idx) => (
                <div 
                  key={idx} 
                  className="bg-white border border-[#E6E0D9] rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-all duration-300"
                >
                  {/* Preview Image */}
                  <div className="h-[220px] bg-cover bg-center border-b border-[#E6E0D9] relative group">
                    <img 
                      src={design.image} 
                      alt={design.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-xs bg-black/60 px-3 py-1 rounded-full backdrop-blur-sm">View Full Screen</span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-extrabold text-[#7A7268] uppercase tracking-wider">
                          {design.project}
                        </span>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                          design.status === 'Approved' 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                            : design.status === 'Revisions Requested'
                            ? 'bg-rose-50 text-rose-700 border-rose-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse'
                        }`}>
                          {design.status}
                        </span>
                      </div>
                      <h4 className="font-bold text-base text-[#2D4A3B] leading-snug">
                        {design.name}
                      </h4>
                      <span className="text-xs text-[#7A7268] block mt-2">Shared on {design.date}</span>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2 mt-6 pt-4 border-t border-[#F6F2EC]">
                      {design.status !== 'Approved' ? (
                        <>
                          <button
                            onClick={() => handleRequestChanges(design.id)}
                            className="flex-1 py-2 border border-[#E6E0D9] hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 rounded-xl text-xs font-semibold text-[#7A7268] transition-colors cursor-pointer"
                          >
                            Request Changes
                          </button>
                          <button
                            onClick={() => handleApproveDesign(design.id)}
                            className="flex-1 py-2 bg-[#28AB67] hover:bg-[#28AB67]/90 text-white rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Approve Design</span>
                          </button>
                        </>
                      ) : (
                        <div className="w-full py-2 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Approved & Signed Off</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------------- PLACE NEW ORDER TAB (MULTI-STEP FORM) ---------------- */}
        {activeTab === 'new-order' && (
          <div className="flex flex-col items-center justify-center flex-1 max-w-2xl mx-auto w-full text-left py-4 animate-fade-in">
            
            {/* Steps indicator */}
            {newOrderStep < 5 && (
              <div className="w-full mb-8 flex justify-between items-center select-none">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center flex-1 last:flex-none">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-all ${
                      newOrderStep === step 
                        ? 'bg-[#28AB67] border-[#28AB67] text-white shadow-lg shadow-[#28AB67]/20 scale-110' 
                        : newOrderStep > step 
                        ? 'bg-[#2D4A3B] border-[#2D4A3B] text-white' 
                        : 'bg-white border-[#E6E0D9] text-[#7A7268]'
                    }`}>
                      {step}
                    </div>
                    {step < 4 && (
                      <div className={`h-[2px] flex-1 mx-3 ${
                        newOrderStep > step ? 'bg-[#2D4A3B]' : 'bg-[#E6E0D9]'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Interactive Form Card */}
            <div className="bg-white border border-[#E6E0D9] rounded-3xl p-8 lg:p-10 shadow-sm w-full">
              
              {/* STEP 1: Select Room Type */}
              {newOrderStep === 1 && (
                <div>
                  <h3 className="text-xl font-bold mb-1">Which room type are we renovating?</h3>
                  <p className="text-sm text-[#7A7268] mb-6">Select the space you'd like our design team to focus on.</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {['Living Room', 'Bedroom', 'Kitchen', 'Home Office', 'Dining Space', 'Bathroom', 'Home Cinema', 'Custom Space'].map((room) => (
                      <button
                        key={room}
                        type="button"
                        onClick={() => handleFormChange('roomType', room)}
                        className={`p-4 rounded-2xl border text-left font-bold text-sm transition-all flex items-center justify-between cursor-pointer ${
                          formData.roomType === room 
                            ? 'border-[#28AB67] bg-[#28AB67]/5 text-[#28AB67]' 
                            : 'border-[#E6E0D9] hover:bg-[#F6F2EC]/30 hover:border-[#7A7268]/50'
                        }`}
                      >
                        <span>{room}</span>
                        {formData.roomType === room && <CheckCircle2 className="w-4 h-4 text-[#28AB67]" />}
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-end mt-8">
                    <button
                      onClick={() => setNewOrderStep(2)}
                      className="px-6 py-2.5 bg-[#28AB67] hover:bg-[#28AB67]/90 text-white rounded-xl font-bold text-sm flex items-center gap-2 cursor-pointer transition-all hover:translate-x-0.5"
                    >
                      <span>Continue</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: Select Style Preference */}
              {newOrderStep === 2 && (
                <div>
                  <h3 className="text-xl font-bold mb-1">Select your design style</h3>
                  <p className="text-sm text-[#7A7268] mb-6">Choose a stylistic direction that speaks to your aesthetic preferences.</p>
                  
                  <div className="flex flex-col gap-3">
                    {[
                      { name: 'Contemporary Minimalist', desc: 'Clean lines, neutral palette, and sleek, functional furnishings.' },
                      { name: 'Warm Organic Modern', desc: 'Natural wood tones, rich textures, and cozy, earthy accents.' },
                      { name: 'Scandinavian Hygge', desc: 'Light, bright, airy space with functional layouts and soft linens.' },
                      { name: 'Industrial Loft', desc: 'Exposed structural elements, steel accents, and dark contrasts.' },
                      { name: 'Classic Family Traditional', desc: 'Timeless comfort, symmetrical structures, and refined elegance.' }
                    ].map((style) => (
                      <button
                        key={style.name}
                        type="button"
                        onClick={() => handleFormChange('style', style.name)}
                        className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                          formData.style === style.name 
                            ? 'border-[#28AB67] bg-[#28AB67]/5' 
                            : 'border-[#E6E0D9] hover:bg-[#F6F2EC]/30 hover:border-[#7A7268]/50'
                        }`}
                      >
                        <div className="flex justify-between items-center font-bold text-sm">
                          <span className={formData.style === style.name ? 'text-[#28AB67]' : ''}>{style.name}</span>
                          {formData.style === style.name && <CheckCircle2 className="w-4 h-4 text-[#28AB67]" />}
                        </div>
                        <p className="text-xs text-[#7A7268] mt-1 font-normal leading-relaxed">{style.desc}</p>
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-between mt-8">
                    <button
                      onClick={() => setNewOrderStep(1)}
                      className="px-6 py-2.5 border border-[#E6E0D9] hover:bg-[#F6F2EC]/30 rounded-xl font-semibold text-sm cursor-pointer text-[#7A7268]"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setNewOrderStep(3)}
                      className="px-6 py-2.5 bg-[#28AB67] hover:bg-[#28AB67]/90 text-white rounded-xl font-bold text-sm flex items-center gap-2 cursor-pointer transition-all hover:translate-x-0.5"
                    >
                      <span>Continue</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: Budget and Timeline */}
              {newOrderStep === 3 && (
                <div>
                  <h3 className="text-xl font-bold mb-1">Set your budget & timeline</h3>
                  <p className="text-sm text-[#7A7268] mb-8">This helps us allocate appropriate resources and curate builders.</p>
                  
                  {/* Budget Slider */}
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-bold">Estimated Budget Range</label>
                      <span className="font-extrabold text-base text-[#28AB67]">GH₵ {Number(formData.budget).toLocaleString()}</span>
                    </div>
                    <input 
                      type="range" 
                      min="5000" 
                      max="150000" 
                      step="5000"
                      value={formData.budget}
                      onChange={(e) => handleFormChange('budget', e.target.value)}
                      className="w-full accent-[#28AB67] bg-[#F6F2EC] rounded-lg h-2 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-[#7A7268] font-bold mt-1 uppercase tracking-wider">
                      <span>GH₵ 5,000</span>
                      <span>GH₵ 75,000</span>
                      <span>GH₵ 150,000+</span>
                    </div>
                  </div>

                  {/* Timeline Selection */}
                  <div>
                    <label className="text-sm font-bold block mb-3">Target Completion Timeline</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['2-4 Weeks', '4-6 Weeks', '6-10 Weeks'].map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => handleFormChange('timeline', time)}
                          className={`py-3 rounded-xl border text-center font-bold text-xs transition-all cursor-pointer ${
                            formData.timeline === time 
                              ? 'border-[#28AB67] bg-[#28AB67]/5 text-[#28AB67]' 
                              : 'border-[#E6E0D9] hover:bg-[#F6F2EC]/30 hover:border-[#7A7268]/50'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between mt-10">
                    <button
                      onClick={() => setNewOrderStep(2)}
                      className="px-6 py-2.5 border border-[#E6E0D9] hover:bg-[#F6F2EC]/30 rounded-xl font-semibold text-sm cursor-pointer text-[#7A7268]"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setNewOrderStep(4)}
                      className="px-6 py-2.5 bg-[#28AB67] hover:bg-[#28AB67]/90 text-white rounded-xl font-bold text-sm flex items-center gap-2 cursor-pointer transition-all hover:translate-x-0.5"
                    >
                      <span>Continue</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: Review and Requirements */}
              {newOrderStep === 4 && (
                <form onSubmit={handleOrderSubmit}>
                  <h3 className="text-xl font-bold mb-1">Additional requirements</h3>
                  <p className="text-sm text-[#7A7268] mb-6">Tell us about specific items, colors, or structural notes for the project.</p>
                  
                  <div className="mb-6">
                    <textarea
                      rows="4"
                      value={formData.notes}
                      onChange={(e) => handleFormChange('notes', e.target.value)}
                      placeholder="E.g., I want warm ambient track lights, a green accent wall behind the TV, and storage shelves for vinyl records..."
                      className="w-full p-4 rounded-xl border border-[#E6E0D9] outline-none text-sm transition-all focus:border-[#28AB67] resize-none"
                    />
                  </div>

                  {/* Summary Box */}
                  <div className="bg-[#F6F2EC] p-5 rounded-2xl mb-8 border border-[#E6E0D9]/50">
                    <h4 className="font-bold text-xs text-[#7A7268] uppercase tracking-wider mb-2">Order Summary</h4>
                    <ul className="text-xs flex flex-col gap-2 font-medium">
                      <li>• Room: <strong className="text-[#2D4A3B]">{formData.roomType}</strong></li>
                      <li>• Style Theme: <strong className="text-[#2D4A3B]">{formData.style}</strong></li>
                      <li>• Budget Range: <strong className="text-[#2D4A3B]">GH₵ {Number(formData.budget).toLocaleString()}</strong></li>
                      <li>• Targeted Timeline: <strong className="text-[#2D4A3B]">{formData.timeline}</strong></li>
                    </ul>
                  </div>

                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={() => setNewOrderStep(3)}
                      className="px-6 py-2.5 border border-[#E6E0D9] hover:bg-[#F6F2EC]/30 rounded-xl font-semibold text-sm cursor-pointer text-[#7A7268]"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-[#28AB67] hover:bg-[#28AB67]/90 text-white rounded-xl font-bold text-sm flex items-center gap-2 cursor-pointer transition-all hover:scale-102"
                    >
                      <span>Submit Renovation Order</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 5: Success Loading & Handshake */}
              {newOrderStep === 5 && (
                <div className="text-center py-10 flex flex-col items-center">
                  {!formSubmitted ? (
                    <>
                      <div className="w-16 h-16 border-4 border-[#28AB67]/30 border-t-[#28AB67] rounded-full animate-spin mb-6" />
                      <h3 className="text-xl font-bold">Registering your order...</h3>
                      <p className="text-sm text-[#7A7268] mt-2">Setting up your dashboard workspace and scheduling the designer...</p>
                    </>
                  ) : (
                    <div className="animate-scale-in">
                      <div className="w-16 h-16 bg-[#28AB67] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#28AB67]/20 mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <h3 className="text-2xl font-bold text-[#2D4A3B]">Order Placed Successfully!</h3>
                      <p className="text-sm text-[#7A7268] max-w-sm mt-3 leading-relaxed mx-auto">
                        Your project workspace is ready. Kofi Asante from our design office will review your space requirements shortly!
                      </p>
                      
                      <button
                        onClick={resetOrderForm}
                        className="mt-8 px-6 py-3 bg-[#2D4A3B] hover:bg-[#2D4A3B]/90 text-white rounded-xl font-bold text-sm transition-all cursor-pointer inline-flex items-center gap-2 shadow-sm"
                      >
                        <span>View My Project Panel</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        )}

      </main>
    </div>
  );
}
