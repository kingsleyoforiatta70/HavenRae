import React, { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import WelcomeScreen from './components/WelcomeScreen';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import ManagerDashboard from './components/ManagerDashboard';

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

function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [designs, setDesigns] = useState(INITIAL_DESIGNS);

  return (
    <div className="w-full h-full min-h-screen bg-brand-neutral">
      {/* 1. Splash Screen */}
      {currentScreen === 'splash' && (
        <SplashScreen onTransition={() => setCurrentScreen('welcome')} />
      )}

      {/* 2. Welcome Screen (Landing Page) */}
      {currentScreen === 'welcome' && (
        <WelcomeScreen 
          onStart={() => setCurrentScreen('login')} 
          onLogin={() => setCurrentScreen('login')} 
        />
      )}

      {/* 3. Login Screen (Figma Specified Layout) */}
      {currentScreen === 'login' && (
        <LoginScreen 
          onBack={() => setCurrentScreen('welcome')} 
          onLoginSuccess={(userData) => {
            setUser(userData);
            if (userData.role === 'manager') {
              setCurrentScreen('manager-dashboard');
            } else {
              setCurrentScreen('dashboard');
            }
          }}
        />
      )}

      {/* 4. Customer Dashboard Portal */}
      {currentScreen === 'dashboard' && (
        <Dashboard 
          user={user} 
          projects={projects}
          setProjects={setProjects}
          designs={designs}
          setDesigns={setDesigns}
          onLogout={() => {
            setUser(null);
            setCurrentScreen('welcome');
          }} 
        />
      )}

      {/* 5. Operation Manager Dashboard Portal */}
      {currentScreen === 'manager-dashboard' && (
        <ManagerDashboard 
          user={user} 
          projects={projects}
          setProjects={setProjects}
          designs={designs}
          setDesigns={setDesigns}
          onLogout={() => {
            setUser(null);
            setCurrentScreen('welcome');
          }} 
        />
      )}
    </div>
  );
}

export default App;
