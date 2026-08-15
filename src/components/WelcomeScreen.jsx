import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Maximize, 
  Calendar, 
  ShoppingBag,
  ArrowRight
} from 'lucide-react';

export default function WelcomeScreen({ onStart, onLogin }) {
  const workScrollRef = useRef(null);
  const [navVisible, setNavVisible] = useState(true);

  // Auto-hide navbar when scrolling, show when scrolling stops
  useEffect(() => {
    let timeoutId = null;

    const handleScroll = () => {
      // Hide the navbar immediately when scrolling starts
      setNavVisible(false);

      // Clear the previous timeout
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      // Show the navbar again after scrolling stops (250ms of scroll inactivity)
      timeoutId = setTimeout(() => {
        setNavVisible(true);
      }, 250);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Autoplay scrolling for "Our Work" section project cards carousel
  useEffect(() => {
    const timer = setInterval(() => {
      if (workScrollRef.current) {
        const container = workScrollRef.current;
        const cardWidth = 260; // Card width (232px) + gap (28px)
        const maxScroll = container.scrollWidth - container.clientWidth;
        
        if (container.scrollLeft >= maxScroll - 10) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
      }
    }, 3000); // Slide every 3 seconds

    return () => clearInterval(timer);
  }, []);

  // Smooth scroll helper
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const services = [
    {
      icon: <Sparkles className="w-4 h-4 text-white" />,
      title: 'Interior Design',
      desc: 'From the big picture to the little details, we help bring your space together.'
    },
    {
      icon: <Maximize className="w-4 h-4 text-white" />,
      title: 'Space Planning',
      desc: 'Making sure everything has a place and the space actually works for you.'
    },
    {
      icon: <Calendar className="w-4 h-4 text-white" />,
      title: 'Project Management',
      desc: 'Keeping track of the moving parts while your project comes together.'
    },
    {
      icon: <ShoppingBag className="w-4 h-4 text-white" />,
      title: 'Sourcing & Styling',
      desc: 'Finding the pieces, finishes and details that make the space feel complete.'
    }
  ];

  const projects = [
    {
      title: 'Polo Heights',
      location: 'Accra · Residential',
      image: '/images/zac-gudakov-mw_mj-noYHM-unsplash.jpg'
    },
    {
      title: 'Polo Hills',
      location: 'Accra · Residential',
      image: '/images/francesca-tosolini-hCU4fimRW-c-unsplash.jpg'
    },
    {
      title: 'Sky Suites',
      location: 'Labone, Accra',
      image: '/images/6d6c20aaf0a9ec1d83f6064661ddc56c.jpg'
    },
    {
      title: 'Veron Apartments',
      location: 'Accra · Residential',
      image: '/images/spacejoy-9M66C_w_ToM-unsplash.jpg'
    },
    {
      title: 'Swiss Lodge',
      location: 'Accra · Residential',
      image: '/images/backbone-L4iRkKL5dng-unsplash.jpg'
    }
  ];

  return (
    <div className="flex flex-col bg-white min-h-screen font-inter select-none overflow-x-hidden text-[#252320]">
      
      {/* 1. Nav Bar (Figma: height 90px, background #F4F1EC) */}
      <nav className={`w-full h-[90px] flex justify-between items-center px-6 md:px-16 lg:px-[80px] bg-[#F4F1EC] fixed top-0 left-0 right-0 z-50 border-b border-[#2D4A3B]/5 transition-all duration-300 ease-in-out ${
        navVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}>
        
        {/* Brand / Logo (Figma: HavenRae Studios + INTERIOR DESIGN) */}
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex flex-col justify-center cursor-pointer group"
        >
          <span className="font-playfair italic font-normal text-[22px] leading-[110%] text-[#252320] transition-colors group-hover:text-[#2D4A3B]">
            HavenRae Studios
          </span>
          <span className="font-inter font-normal text-[9px] leading-[11px] tracking-[1.5px] text-[#7A7268] mt-[2px]">
            INTERIOR DESIGN
          </span>
        </div>

        {/* Links (Figma: Left 492.5px, Inter 14px) */}
        <div className="hidden md:flex items-center gap-8 lg:gap-[32px]">
          <button 
            onClick={() => scrollToSection('work')} 
            className="font-inter text-[14px] leading-[17px] text-[#252320] hover:text-[#2D4A3B] font-medium transition-colors cursor-pointer"
          >
            Work
          </button>
          <button 
            onClick={() => scrollToSection('services')} 
            className="font-inter text-[14px] leading-[17px] text-[#252320] hover:text-[#2D4A3B] font-medium transition-colors cursor-pointer"
          >
            Services
          </button>
          <button 
            onClick={() => scrollToSection('about')} 
            className="font-inter text-[14px] leading-[17px] text-[#252320] hover:text-[#2D4A3B] font-medium transition-colors cursor-pointer"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('services')} 
            className="font-inter text-[14px] leading-[17px] text-[#252320] hover:text-[#2D4A3B] font-medium transition-colors cursor-pointer"
          >
            Process
          </button>
          <button 
            onClick={() => scrollToSection('footer')} 
            className="font-inter text-[14px] leading-[17px] text-[#252320] hover:text-[#2D4A3B] font-medium transition-colors cursor-pointer"
          >
            Contact
          </button>
        </div>

        {/* Action buttons (Figma: Client Login + Start a Project) */}
        <div className="flex items-center gap-6">
          <button 
            onClick={onLogin}
            className="font-inter text-[14px] leading-[17px] text-[#252320] hover:text-[#2D4A3B] font-medium transition-colors cursor-pointer"
          >
            Client Login
          </button>
          <button 
            onClick={onStart}
            className="w-[140px] h-[42px] bg-[#2D4A3B] text-white font-inter text-[13px] font-medium rounded-[4px] shadow-sm hover:bg-[#2D4A3B]/90 active:scale-98 transition-all cursor-pointer flex items-center justify-center"
          >
            Start a Project
          </button>
        </div>
      </nav>

      {/* Nav Bar Spacer to preserve page layout flow with fixed header */}
      <div className="h-[90px] w-full flex-shrink-0" />

      {/* 2. Hero Section (Figma: height 560px, background unsplash image) */}
      <header 
        className="relative w-full h-[560px] flex items-center bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url('/images/lotus-design-n-print-mIurtZy_5RE-unsplash.jpg')` }}
      >
        {/* Soft elegant vignette overlay to ensure text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F4F1EC]/65 via-[#F4F1EC]/40 to-transparent pointer-events-none" />

        <div className="relative w-full max-w-7xl mx-auto px-6 md:px-16 lg:px-[80px]">
          <div className="max-w-[480px] flex flex-col items-start text-left">
            <span className="font-inter font-medium text-[12px] leading-[15px] tracking-[2px] text-[#252320] uppercase mb-[12px] animate-slide-down">
              INTERIOR DESIGN
            </span>
            <h1 className="font-playfair font-normal text-4xl sm:text-5xl lg:text-[52px] leading-[108%] text-[#252320] mb-[18px] animate-slide-left">
              Spaces that feel like home.
            </h1>
            <p className="font-inter font-normal text-[15px] leading-[18px] text-[#4F4A44] mb-[24px] max-w-[270px] animate-slide-right">
              We design calm, beautiful spaces that feel like you.
            </p>
            <button 
              onClick={onStart}
              className="w-[120px] h-[46px] bg-[#2D4A3B] text-white font-inter text-[14px] font-medium rounded-[4px] shadow-md hover:bg-[#2D4A3B]/90 hover:shadow-lg active:scale-98 transition-all cursor-pointer flex items-center justify-center animate-slide-up"
            >
              Let's talk
            </button>
          </div>
        </div>
      </header>

      {/* 3. About Section (Figma: height 460px, background #FFFFFF) */}
      <section id="about" className="w-full min-h-[460px] py-[60px] md:py-[40px] flex items-center bg-white">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-16 lg:px-[80px] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Frame */}
          <div className="lg:col-span-6 flex flex-col items-start text-left max-w-[440px]">
            <span className="font-inter font-medium text-[11px] leading-[13px] tracking-[1.5px] text-[#7A7268] uppercase mb-[12px]">
              ABOUT HAVENRAE
            </span>
            <h2 className="font-playfair font-normal text-3xl sm:text-[34px] leading-[115%] text-[#252320] mb-[20px]">
              Good design should feel natural.
            </h2>
            <p className="font-inter font-normal text-[14px] leading-[20px] text-[#7A7268] mb-[16px]">
              We believe your space should look good, but more importantly, it should feel good to live in.
            </p>
            <p className="font-inter font-normal text-[14px] leading-[20px] text-[#7A7268] mb-[28px]">
              We work with you to understand what you need, what you like, and what makes sense for your space — then we bring it all together.
            </p>
            <button 
              onClick={() => scrollToSection('services')}
              className="group font-inter font-medium text-[14px] leading-[17px] text-[#252320] flex items-center gap-1 hover:text-[#2D4A3B] transition-colors cursor-pointer"
            >
              <span>More about us</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Right Image (600x380px roughly) */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div 
              className="w-full max-w-[600px] h-[260px] sm:h-[380px] bg-cover bg-center rounded-[4px] shadow-sm hover:shadow-md transition-shadow"
              style={{ backgroundImage: `url('/images/spacejoy-umAXneH4GhA-unsplash.jpg')` }}
            />
          </div>
        </div>
      </section>

      {/* 4. Services Section (Figma: height 390px, background #FFFFFF) */}
      <section id="services" className="w-full min-h-[390px] py-[60px] md:py-[50px] bg-white border-t border-[#F6F4F1]">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-16 lg:px-[80px] flex flex-col items-center">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-[48px]">
            <span className="font-inter font-medium text-[11px] leading-[13px] tracking-[1.5px] text-[#7A7268] uppercase mb-[10px]">
              OUR SERVICES
            </span>
            <h2 className="font-playfair font-normal text-3xl sm:text-[32px] leading-[110%] text-[#252320]">
              How we can help.
            </h2>
          </div>

          {/* Grid Layout (Figma: gap 70px) */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-[70px]">
            {services.map((svc, idx) => (
              <div key={idx} className="flex flex-col items-start text-left group">
                {/* 28x28px green container */}
                <div className="w-[28px] h-[28px] bg-[#2D4A3B] rounded-[6px] flex items-center justify-center mb-[12px] group-hover:scale-105 transition-transform">
                  {svc.icon}
                </div>
                <h3 className="font-inter font-medium text-[15px] leading-[18px] text-[#252320] mb-[10px] group-hover:text-[#2D4A3B] transition-colors">
                  {svc.title}
                </h3>
                <p className="font-inter font-normal text-[13px] leading-[16px] text-[#7A7268]">
                  {svc.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Work Section (Figma: height 542px, background #F6F4F1) */}
      <section id="work" className="w-full min-h-[542px] py-[60px] md:py-[70px] bg-[#F6F4F1] flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 md:px-16 lg:px-[80px] flex flex-col">
          
          {/* Header Row */}
          <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-end mb-[36px] gap-4">
            <div className="flex flex-col items-start text-left">
              <span className="font-inter font-medium text-[11px] leading-[13px] tracking-[1.5px] text-[#7A7268] uppercase mb-[8px]">
                OUR WORK
              </span>
              <h2 className="font-playfair font-normal text-2xl sm:text-[28px] leading-[110%] text-[#252320]">
                A few spaces we've loved working on.
              </h2>
            </div>
            <button 
              onClick={() => scrollToSection('work')}
              className="font-inter font-medium text-[14px] leading-[17px] text-[#252320] hover:text-[#2D4A3B] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>View all work</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Project Slider/Grid (Figma: width of each card 232px, gap 28px) */}
          <div 
            ref={workScrollRef}
            className="w-full flex overflow-x-auto gap-[28px] pb-4 scrollbar-thin scrollbar-thumb-[#2D4A3B]/10 scrollbar-track-transparent scroll-smooth"
          >
            {projects.map((proj, idx) => (
              <div 
                key={idx} 
                className="flex-none w-[232px] flex flex-col group cursor-pointer"
              >
                {/* Image Placeholder Frame (width 232px, height 260px) */}
                <div 
                  className="w-[232px] h-[260px] bg-[#A9967D] rounded-[4px] bg-cover bg-center overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-300 transform group-hover:-translate-y-1"
                  style={{ backgroundImage: `url('${proj.image}')` }}
                />
                
                {/* Details */}
                <h4 className="font-inter font-medium text-[14px] leading-[17px] text-[#252320] mt-[10px] group-hover:text-[#2D4A3B] transition-colors">
                  {proj.title}
                </h4>
                <span className="font-inter font-normal text-[12px] leading-[15px] text-[#7A7268] mt-[4px]">
                  {proj.location}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Final CTA Band (Figma: height 340px, background image) */}
      <section 
        className="relative w-full h-[340px] flex items-center justify-center bg-cover bg-center overflow-hidden"
        style={{ backgroundImage: `url('/images/bailey-alexander-cYeCxtKpTTQ-unsplash.jpg')` }}
      >
        {/* Soft background light/dark tint overlay */}
        <div className="absolute inset-0 bg-[#F4F1EC]/70 backdrop-blur-[1px] pointer-events-none" />

        <div className="relative w-full max-w-xl mx-auto px-6 flex flex-col items-center text-center">
          <span className="font-inter font-medium text-[11px] leading-[13px] tracking-[1.5px] text-[#252320] uppercase mb-[10px]">
            YOUR SPACE, YOUR STORY
          </span>
          <h2 className="font-playfair font-normal text-3xl sm:text-[34px] leading-[115%] text-[#252320] mb-[24px]">
            Let's create something beautiful together.
          </h2>
          <button 
            onClick={onStart}
            className="w-[160px] h-[46px] bg-[#2D4A3B] text-white font-inter text-[14px] font-medium rounded-[4px] shadow-md hover:bg-[#2D4A3B]/90 hover:shadow-lg active:scale-98 transition-all cursor-pointer flex items-center justify-center"
          >
            Start a Project
          </button>
        </div>
      </section>

      {/* 7. Footer Section (Figma: height 243px, background #2D4A3B) */}
      <footer id="footer" className="w-full bg-[#2D4A3B] text-[#CCD9CC] px-6 md:px-16 lg:px-[80px] pt-[56px] pb-[32px] flex flex-col justify-between">
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-[32px]">
          
          {/* Top Row: Brand & Columns */}
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-[80px]">
            
            {/* Brand Block */}
            <div className="flex flex-col items-start gap-[10px] max-w-[300px]">
              <span className="font-inter font-bold text-[20px] leading-[24px] text-white">
                HavenRae
              </span>
              <p className="font-inter font-normal text-[13px] leading-[16px] text-[#CCD9CC]">
                Interior design and project management, in sync.
              </p>
            </div>

            {/* Links Columns Container */}
            <div className="flex flex-wrap gap-8 sm:gap-[60px] lg:gap-[80px]">
              
              {/* Company Column */}
              <div className="flex flex-col items-start gap-[10px] min-w-[64px]">
                <span className="font-inter font-medium text-[14px] leading-[17px] text-white mb-[2px]">
                  Company
                </span>
                <button onClick={() => scrollToSection('about')} className="font-inter font-normal text-[13px] leading-[16px] text-[#CCD9CC] hover:text-white transition-colors cursor-pointer text-left">
                  About
                </button>
                <button onClick={() => scrollToSection('work')} className="font-inter font-normal text-[13px] leading-[16px] text-[#CCD9CC] hover:text-white transition-colors cursor-pointer text-left">
                  Rooms
                </button>
                <button onClick={() => scrollToSection('footer')} className="font-inter font-normal text-[13px] leading-[16px] text-[#CCD9CC] hover:text-white transition-colors cursor-pointer text-left">
                  Contact
                </button>
              </div>

              {/* Support Column */}
              <div className="flex flex-col items-start gap-[10px] min-w-[75px]">
                <span className="font-inter font-medium text-[14px] leading-[17px] text-white mb-[2px]">
                  Support
                </span>
                <span className="font-inter font-normal text-[13px] leading-[16px] text-[#CCD9CC] cursor-pointer hover:text-white transition-colors">
                  FAQ
                </span>
                <button onClick={onStart} className="font-inter font-normal text-[13px] leading-[16px] text-[#CCD9CC] hover:text-white transition-colors cursor-pointer text-left">
                  Get a Quote
                </button>
                <span className="font-inter font-normal text-[13px] leading-[16px] text-[#CCD9CC] cursor-pointer hover:text-white transition-colors">
                  Careers
                </span>
              </div>

              {/* Contact Column */}
              <div className="flex flex-col items-start gap-[10px] min-w-[173px]">
                <span className="font-inter font-medium text-[14px] leading-[17px] text-white mb-[2px]">
                  Contact
                </span>
                <a href="mailto:hello@havenraestudios.com" className="font-inter font-normal text-[13px] leading-[16px] text-[#CCD9CC] hover:text-white transition-colors">
                  hello@havenraestudios.com
                </a>
                <span className="font-inter font-normal text-[13px] leading-[16px] text-[#CCD9CC]">
                  +233 20 000 0000
                </span>
                <span className="font-inter font-normal text-[13px] leading-[16px] text-[#CCD9CC]">
                  Accra, Ghana
                </span>
              </div>

            </div>

          </div>

          {/* Divider */}
          <div className="w-full h-[1px] bg-white/15" />

          {/* Bottom Copyright Row */}
          <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 text-[#CCD9CC]">
            <span className="font-inter font-normal text-[12px] leading-[15px]">
              © 2026 HavenRae Studios. All rights reserved.
            </span>
          </div>

        </div>
      </footer>

    </div>
  );
}
