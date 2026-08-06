import React, { useEffect } from 'react';

/**
 * SplashScreen Component
 * Displays the HavenRae brand name, subtitle, and an animated loading indicator.
 * Automatically triggers a callback after a set duration to simulate app loading.
 * 
 * @param {Object} props
 * @param {Function} props.onTransition - Callback to navigate to the next screen (Welcome/Login)
 */
export default function SplashScreen({ onTransition }) {
  useEffect(() => {
    // Automatically transition to the next screen after 3 seconds
    const timer = setTimeout(() => {
      if (onTransition) {
        onTransition();
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [onTransition]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-brand-neutral select-none px-6">
      {/* Branding Container */}
      <div className="text-center animate-fade-in">
        <h1 
          className="font-inter font-bold text-brand-green tracking-tight leading-none mb-3"
          style={{ fontSize: 'clamp(3rem, 8vw, 4rem)' }} // Responsive sizing around the 64px Figma value
        >
          HavenRae
        </h1>
        <p className="font-inter font-normal text-brand-gray text-lg sm:text-xl tracking-wider uppercase mb-8">
          Project Management Platform
        </p>
      </div>

      {/* Loading Dots Indicator */}
      <div className="flex items-center gap-[10px] w-[70px] h-[10px] justify-center">
        <div className="w-[10px] h-[10px] rounded-full dot-animate" style={{ animationDelay: '0s' }} />
        <div className="w-[10px] h-[10px] rounded-full dot-animate" style={{ animationDelay: '0.4s' }} />
        <div className="w-[10px] h-[10px] rounded-full dot-animate" style={{ animationDelay: '0.8s' }} />
        <div className="w-[10px] h-[10px] rounded-full dot-animate" style={{ animationDelay: '1.2s' }} />
      </div>
    </div>
  );
}
