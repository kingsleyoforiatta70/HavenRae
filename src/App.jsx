import React, { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import WelcomeScreen from './components/WelcomeScreen';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';

function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [user, setUser] = useState(null);

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
            setCurrentScreen('dashboard');
          }}
        />
      )}

      {/* 4. Customer Dashboard Portal */}
      {currentScreen === 'dashboard' && (
        <Dashboard 
          user={user} 
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
