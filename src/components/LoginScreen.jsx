import React, { useState } from 'react';
import { ChevronLeft, Eye, EyeOff, Loader2 } from 'lucide-react';

export default function LoginScreen({ onBack, onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    setLoading(true);

    // Simulate login request against mock credentials
    setTimeout(() => {
      setLoading(false);
      const normalizedEmail = email.toLowerCase().trim();
      if (normalizedEmail === 'client@havenrae.com' && password === 'password123') {
        if (onLoginSuccess) {
          onLoginSuccess({
            name: 'Ama Mensah',
            email: 'client@havenrae.com',
            role: 'client',
            location: 'Airport Residential Area, Accra',
            avatar: '/images/kingsley-hemans-sL_tARoYdu4-unsplash.jpg',
          });
        }
      } else if (normalizedEmail === 'manager@havenrae.com' && password === 'password123') {
        if (onLoginSuccess) {
          onLoginSuccess({
            name: 'Kingsley Hemans',
            email: 'manager@havenrae.com',
            role: 'manager',
            location: 'Head Office, Accra',
            avatar: '/images/kingsley-hemans-sL_tARoYdu4-unsplash.jpg',
          });
        }
      } else {
        setError('Invalid credentials! Hint: client@havenrae.com or manager@havenrae.com (pwd: password123)');
      }
    }, 1200);
  };

  const handleCreateAccount = () => {
    // Interactive feedback
    alert('Create Account flow initiated.');
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-brand-neutral font-inter">
      {/* 1. Living Background image with slow Ken Burns pan animation */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <img
          src="/images/can_you_do_a_loop_video_of_an.png"
          alt="Luxury living room loop"
          className="w-full h-full object-cover scale-105 animate-slow-pan"
        />
        {/* Subtle vignette/dark overlay for contrast and readability */}
        <div className="absolute inset-0 bg-black/30 backdrop-brightness-[0.85]" />
      </div>

      {/* 2. Top Navigation (Back Button) */}
      <button
        onClick={onBack}
        className="absolute top-6 left-6 flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold backdrop-blur-md transition-all duration-300 shadow-md hover:-translate-y-0.5 active:translate-y-0 cursor-pointer z-10"
      >
        <ChevronLeft className="w-5 h-5 text-white" />
        <span>Back to Home</span>
      </button>

      {/* 3. Login Form Card (pixel perfect Figma size, auto scales on mobile) */}
      <form
        onSubmit={handleSubmit}
        className="relative w-[456px] h-[564.5px] bg-white/30 backdrop-blur-xl border border-[#E5E0D9] rounded-[60px] shadow-2xl flex-shrink-0 scale-90 sm:scale-100 transition-transform origin-center z-10"
      >
        {/* Logo / Image Box (Rectangle 6) */}
        <div 
          className="absolute w-[158px] h-[114px] left-[153px] top-[30.25px] bg-cover bg-center rounded-[30px] shadow-lg border border-white/10"
          style={{ backgroundImage: `url('/images/58342df1-6156-4e87-8d0d-348942b7a45f.png')` }}
        />

        {/* Error message slot (positioned dynamically just above inputs) */}
        {error && (
          <div className="absolute top-[138px] left-[28px] right-[28px] text-center text-rose-200 font-semibold text-sm drop-shadow-sm animate-pulse">
            {error}
          </div>
        )}

        {/* Email Input Field (Rectangle 1) */}
        <div className="absolute w-[399px] h-[58px] left-[28px] top-[162.25px]">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full h-full bg-[#d9d9d9]/35 border border-[#1D1818] rounded-[66px] px-6 text-white font-extrabold text-[20px] leading-[24px] placeholder:text-white/60 placeholder:font-extrabold placeholder:text-[20px] placeholder:leading-[24px] outline-none transition-all focus:border-white focus:bg-[#d9d9d9]/45"
            required
          />
        </div>

        {/* Password Input Field (Rectangle 5) */}
        <div className="absolute w-[399px] h-[58px] left-[28px] top-[238.25px]">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full h-full bg-[#d9d9d9]/35 border border-[#1D1818] rounded-[66px] pl-6 pr-14 text-white font-extrabold text-[20px] leading-[24px] placeholder:text-white/60 placeholder:font-extrabold placeholder:text-[20px] placeholder:leading-[24px] outline-none transition-all focus:border-white focus:bg-[#d9d9d9]/45"
            required
          />
          {/* Eye Icon for showing/hiding password */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-5 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        {/* Submit / Login Button (Rectangle 3) */}
        <button
          type="submit"
          disabled={loading}
          className="absolute w-[399px] h-[58px] left-[28px] top-[383.25px] bg-[#327D56]/80 hover:bg-[#327D56] text-white font-extrabold text-[24px] leading-[29px] rounded-[66px] flex items-center justify-center gap-3 transition-all duration-300 active:scale-[0.98] shadow-md cursor-pointer border border-[#327D56]/20 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>Logging in...</span>
            </>
          ) : (
            <span>Login</span>
          )}
        </button>

        {/* Create Account Button (Rectangle 4) */}
        <button
          type="button"
          onClick={handleCreateAccount}
          className="absolute w-[399px] h-[58px] left-[28px] top-[457.25px] border border-[#FADDDD] hover:bg-white/10 text-white font-extrabold text-[24px] leading-[29px] rounded-[66px] flex items-center justify-center transition-all duration-300 active:scale-[0.98] cursor-pointer"
        >
          <span>Create an Account</span>
        </button>
      </form>
    </div>
  );
}
