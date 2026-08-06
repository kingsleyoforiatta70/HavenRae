import React, { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import WelcomeScreen from './components/WelcomeScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');

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

      {/* 3. Login Screen (Placeholder until Figma specs are provided) */}
      {currentScreen === 'login' && (
        <div className="flex flex-col items-center justify-center min-h-screen bg-brand-neutral p-6">
          <div className="text-center max-w-md p-8 bg-white/60 backdrop-blur-md rounded-2xl border border-brand-green/10 shadow-lg animate-fade-in">
            <h2 className="text-3xl font-bold font-inter text-brand-green mb-4">
              Login Screen
            </h2>
            <p className="text-brand-gray font-inter mb-6">
              Awaiting your Figma login screen specifications to implement the step-by-step form layout.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => setCurrentScreen('welcome')}
                className="px-6 py-2 border border-brand-green text-brand-green hover:bg-brand-green/5 rounded-lg font-semibold transition-colors cursor-pointer"
              >
                Back to Home
              </button>
              <button
                onClick={() => setCurrentScreen('splash')}
                className="px-6 py-2 bg-brand-green text-brand-neutral rounded-lg font-semibold hover:bg-brand-green/90 transition-colors shadow-sm cursor-pointer"
              >
                Replay Splash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
