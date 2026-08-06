import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  DollarSign, 
  LayoutDashboard, 
  Tag, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Minus 
} from 'lucide-react';

export default function WelcomeScreen({ onStart, onLogin }) {
  // FAQ accordion state
  const [activeFaq, setActiveFaq] = useState(null);

  // Featured Rooms scroll container reference
  const scrollContainerRef = useRef(null);

  // Autoplay scrolling for Featured Room Styles carousel
  useEffect(() => {
    const timer = setInterval(() => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const cardWidth = 376; // Card width + gap
        const maxScroll = container.scrollWidth - container.clientWidth;
        
        if (container.scrollLeft >= maxScroll - 10) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: cardWidth, behavior: 'smooth' });
        }
      }
    }, 3500); // Slide every 3.5 seconds

    return () => clearInterval(timer);
  }, []);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const scrollRooms = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 376; // Card width + gap
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const valueProps = [
    {
      icon: <Sparkles className="w-6 h-6 text-brand-green" />,
      title: 'Vetted Designers',
      desc: 'Work with curated interior design professionals.'
    },
    {
      icon: <DollarSign className="w-6 h-6 text-brand-green" />,
      title: 'Real-Time Budget Tracking',
      desc: 'Know exactly where your money is going, always.'
    },
    {
      icon: <LayoutDashboard className="w-6 h-6 text-brand-green" />,
      title: 'One Dashboard',
      desc: 'Manage timelines, vendors, and approvals in one place.'
    },
    {
      icon: <Tag className="w-6 h-6 text-brand-green" />,
      title: 'Transparent Pricing',
      desc: 'No hidden fees, ever.'
    }
  ];

  const steps = [
    { num: '1', title: 'Consult', desc: 'Tell us your style, budget, and goals.' },
    { num: '2', title: 'Design', desc: 'Our designers create a custom plan for your space.' },
    { num: '3', title: 'Manage', desc: 'Track progress, budget, and vendors in real time.' },
    { num: '4', title: 'Move In', desc: 'Enjoy your beautifully transformed space.' }
  ];

  const rooms = [
    {
      title: 'Modern Living Room',
      desc: 'Warm neutrals with statement lighting',
      price: 'GH₵ 8,500',
      image: '/images/zac-gudakov-mw_mj-noYHM-unsplash.jpg'
    },
    {
      title: 'Cozy Bedroom Refresh',
      desc: 'Soft textures for a calming retreat',
      price: 'GH₵ 6,200',
      image: '/images/francesca-tosolini-hCU4fimRW-c-unsplash.jpg'
    },
    {
      title: 'Minimalist Dining Space',
      desc: 'Clean lines, functional elegance',
      price: 'GH₵ 7,800',
      image: '/images/05af4de52377ab03f19bf1975e1008a6.jpg'
    },
    {
      title: 'Scandinavian Home Office',
      desc: 'Light wood tones, calm and focused',
      price: 'GH₵ 5,400',
      image: '/images/1d75a4c2d8399c66739b5b8cdd013740.jpg'
    },
    {
      title: 'Industrial Loft Kitchen',
      desc: 'Exposed textures, bold contrasts',
      price: 'GH₵ 9,200',
      image: '/images/37fbb069879224390a583b6fe85cbd10.jpg'
    },
    {
      title: 'Coastal Bathroom Retreat',
      desc: 'Airy blues, natural stone finishes',
      price: 'GH₵ 4,800',
      image: '/images/backbone-L4iRkKL5dng-unsplash.jpg'
    },
    {
      title: 'Home Cinema',
      desc: 'Layered textiles, earthy warmth',
      price: 'GH₵ 45,600',
      image: '/images/c47facdd0a24620eba0ce8ae0709b8de.jpg'
    },
    {
      title: 'Contemporary Home Bar',
      desc: 'Sleek surfaces, ambient mood lighting',
      price: 'GH₵ 6,900',
      image: '/images/6d6c20aaf0a9ec1d83f6064661ddc56c.jpg'
    },
    {
      title: 'Classic Family Room',
      desc: 'Timeless comfort, rich wood accents',
      price: 'GH₵ 7,100',
      image: '/images/spacejoy-9M66C_w_ToM-unsplash.jpg'
    },
    {
      title: 'Zen Meditation Corner',
      desc: 'Muted tones, natural light focus',
      price: 'GH₵ 3,200',
      image: '/images/4dced6b6d357b6526832f8c57311e011.jpg'
    }
  ];

  const testimonials = [
    {
      quote: '“HavenRae completely transformed our living room, and the project management tools kept us in the loop the entire time.”',
      author: 'Ama K.',
      location: 'Accra'
    },
    {
      quote: '“I loved being able to track budget and timeline in real time. No surprises along the way.”',
      author: 'Kwame O.',
      location: 'Accra'
    },
    {
      quote: '“Our designer understood our style immediately. The whole process felt effortless.”',
      author: 'Efua T.',
      location: 'Kumasi'
    }
  ];

  const faqs = [
    {
      q: 'How long does a typical project take?',
      a: 'Most projects take 4–8 weeks from consultation to completion, depending on scope.'
    },
    {
      q: 'Do I need to be local to Accra?',
      a: 'We currently serve clients across Ghana, with design consultations available remotely.'
    },
    {
      q: "What's included in the price?",
      a: 'Design, project management, and vendor coordination. Materials and labor are quoted separately.'
    },
    {
      q: 'Can I track progress myself?',
      a: 'Yes, every client gets access to a live project dashboard.'
    },
    {
      q: 'How do I get a quote?',
      a: "Reach out via the contact details in the footer, or use the quote form in the hero section, and we'll respond within 24 hours."
    }
  ];

  return (
    <div className="flex flex-col bg-white min-h-screen font-inter select-none">
      
      {/* 1. Nav Bar */}
      <nav className="w-full flex justify-between items-center px-6 md:px-20 py-6 border-b border-brand-neutral/50 sticky top-0 bg-white/95 backdrop-blur-md z-50">
        <span 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-bold text-2xl text-brand-green cursor-pointer tracking-tight"
        >
          HavenRae
        </span>
        <div className="flex items-center gap-4">
          <button 
            onClick={onLogin}
            className="px-4 py-2 font-medium text-[15px] text-brand-green hover:opacity-80 transition-opacity cursor-pointer"
          >
            Log In
          </button>
          <button 
            onClick={onStart}
            className="px-[22px] py-[10px] bg-brand-green text-white font-medium text-[15px] rounded-lg shadow-sm hover:bg-brand-green/90 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <header 
        className="relative w-full h-[650px] md:h-[800px] flex items-center bg-cover bg-center"
        style={{ backgroundImage: `url('/images/0d37f9116388a6b2640baf4768c7c8ef.jpg')` }}
      >
        {/* Shadow Overlay for Readability */}
        <div className="absolute inset-0 bg-black/45" />

        <div className="relative w-full max-w-7xl mx-auto px-6 md:px-20 flex items-center">
          <div className="max-w-[540px] text-left">
            <span className="block text-[13px] font-extrabold text-[#F9F7F4] tracking-[0.15em] mb-4 uppercase animate-slide-down">
              Interior Design, Organized
            </span>
            <h1 
              className="text-4xl md:text-5xl lg:text-[50px] font-bold text-[#28AB67] leading-[1.2] mb-6 drop-shadow-sm animate-slide-left"
              style={{ animationDelay: '0.4s' }}
            >
              Welcome to HavenRae
            </h1>
            <p 
              className="text-base md:text-[18px] italic font-semibold text-white/90 leading-relaxed max-w-[460px] drop-shadow-sm animate-slide-right"
              style={{ animationDelay: '0.8s' }}
            >
              One place to manage every HavenRae project - schedules, budgets, suppliers, and design files, all in sync with your team.
            </p>
            <div 
              className="mt-8 flex gap-4 animate-slide-up"
              style={{ animationDelay: '1.2s' }}
            >
              <button 
                onClick={onStart}
                className="px-6 py-3 bg-[#28AB67] hover:bg-[#28AB67]/90 text-white font-semibold rounded-lg shadow-md transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                Start Renovation
              </button>
              <button 
                onClick={() => {
                  const element = document.getElementById('how-it-works');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg backdrop-blur-sm border border-white/20 transition-all cursor-pointer"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 3. Value Props Section */}
      <section className="w-full py-20 px-6 md:px-20 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-[34px] font-bold text-brand-green mb-3">
            Why HavenRae
          </h2>
          <p className="text-brand-gray text-base md:text-[16px] max-w-xl mx-auto mb-16">
            Everything you need for a beautifully managed renovation.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {valueProps.map((prop, idx) => (
              <div 
                key={idx} 
                className="flex flex-col items-center p-6 rounded-2xl border border-brand-neutral/20 bg-brand-neutral/10 hover:bg-brand-neutral/30 hover:border-brand-green/20 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-[#EDE1DA] rounded-full flex items-center justify-center mb-5 shadow-inner">
                  {prop.icon}
                </div>
                <h3 className="text-lg font-bold text-brand-green mb-3">
                  {prop.title}
                </h3>
                <p className="text-sm text-brand-gray text-center leading-relaxed">
                  {prop.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. How It Works Section */}
      <section id="how-it-works" className="w-full py-20 px-6 md:px-20 bg-brand-neutral">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-[34px] font-bold text-brand-green mb-3">
            How It Works
          </h2>
          <p className="text-brand-gray text-base md:text-[16px] max-w-xl mx-auto mb-16">
            From concept to move-in, in four simple steps.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center relative group">
                {/* Number Badge */}
                <div className="w-11 h-11 bg-[#C1633B] text-white font-bold text-lg rounded-full flex items-center justify-center mb-5 shadow-md transform group-hover:scale-110 transition-transform duration-300">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold text-brand-green mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-brand-gray text-center leading-relaxed max-w-[260px]">
                  {step.desc}
                </p>

                {/* Connecting Lines for Desktop */}
                {idx < 3 && (
                  <div className="hidden lg:block absolute top-5 left-[60%] w-full h-[2px] bg-[#C1633B]/20 -z-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Featured Room Styles */}
      <section className="w-full py-20 bg-white relative">
        <div className="max-w-7xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-[34px] font-bold text-brand-green mb-3">
            Featured Room Styles
          </h2>
          <p className="text-brand-gray text-base md:text-[16px] max-w-xl mx-auto mb-12">
            A few of our recent transformations, with starting prices.
          </p>
        </div>

        {/* Carousel Navigation Buttons */}
        <div className="absolute top-24 md:top-28 right-6 md:right-24 flex gap-2">
          <button 
            onClick={() => scrollRooms('left')}
            className="w-10 h-10 border border-brand-neutral bg-white hover:bg-brand-neutral/30 rounded-full flex items-center justify-center text-brand-green transition-all shadow-sm cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => scrollRooms('right')}
            className="w-10 h-10 border border-brand-neutral bg-white hover:bg-brand-neutral/30 rounded-full flex items-center justify-center text-brand-green transition-all shadow-sm cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Horizontal Slider Wrapper */}
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto gap-8 px-6 md:px-20 py-4 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {rooms.map((room, idx) => (
            <div 
              key={idx} 
              className="flex-none w-[340px] bg-white border border-[#E6E0D9] rounded-2xl p-0 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 snap-start"
            >
              {/* Room Card Image */}
              <div 
                className="w-full h-[260px] bg-cover bg-center rounded-t-2xl relative"
                style={{ backgroundImage: `url('${room.image}')` }}
              />

              {/* Card Description */}
              <div className="flex flex-col gap-2 p-5 text-left bg-white">
                <h4 className="text-xl font-bold text-brand-green leading-snug">
                  {room.title}
                </h4>
                <p className="text-[15px] text-brand-gray font-normal leading-relaxed h-[36px] overflow-hidden">
                  {room.desc}
                </p>
                <span className="text-[17px] font-semibold text-[#C1633B] mt-2 block">
                  From {room.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Testimonials Section */}
      <section className="w-full py-20 px-6 md:px-20 bg-white border-t border-brand-neutral/30">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-[34px] font-bold text-brand-green mb-3">
            What Our Clients Say
          </h2>
          <p className="text-brand-gray text-base md:text-[16px] max-w-xl mx-auto mb-16">
            Real feedback from real transformations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, idx) => (
              <div 
                key={idx} 
                className="flex flex-col justify-between items-start p-8 rounded-2xl border border-[#E5E0D9] bg-white hover:border-[#C1633B]/30 hover:shadow-md transition-all duration-300"
              >
                <p className="text-[15px] text-brand-gray text-left leading-relaxed italic mb-8">
                  {test.quote}
                </p>
                <div className="flex flex-col items-start gap-1">
                  <span className="font-bold text-[15px] text-brand-green">
                    {test.author}
                  </span>
                  <span className="text-[13px] text-brand-gray">
                    {test.location}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ Section */}
      <section className="w-full py-20 px-6 md:px-20 bg-white border-t border-brand-neutral/30">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="text-3xl md:text-[34px] font-bold text-brand-green mb-16 text-center">
            Frequently Asked Questions
          </h2>

          <div className="w-full max-w-3xl flex flex-col gap-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="flex flex-col text-left border-b border-[#E5E0D9] pb-6">
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="flex justify-between items-center w-full font-bold text-base md:text-[17px] text-brand-green hover:opacity-85 transition-opacity cursor-pointer py-2 focus:outline-none"
                >
                  <span>{faq.q}</span>
                  <span className="text-brand-green ml-4">
                    {activeFaq === idx ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </span>
                </button>

                <div 
                  className={`overflow-hidden transition-all duration-350 ease-in-out ${
                    activeFaq === idx ? 'max-h-[100px] mt-3 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-[15px] text-brand-gray leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Final CTA Band */}
      <section className="w-full py-20 px-6 md:px-20 bg-brand-green text-center text-white relative overflow-hidden">
        {/* Subtle glowing ring background decoration */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full border border-white/5 pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full border border-white/5 pointer-events-none" />

        <div className="max-w-4xl mx-auto flex flex-col items-center relative z-10">
          <h2 className="text-3xl md:text-[32px] font-bold text-white mb-4">
            Ready to Transform Your Space?
          </h2>
          <p className="text-base md:text-[16px] text-[#D4DDD8] max-w-[600px] mb-8 leading-relaxed">
            Get started today and see what HavenRae can do for your next project.
          </p>
          <button 
            onClick={onStart}
            className="px-8 py-4 bg-[#C1633B] hover:bg-[#C1633B]/90 text-white font-medium text-[16px] rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* 9. Footer Section */}
      <footer className="w-full bg-brand-green text-[#CCD9CC] px-6 md:px-20 pt-16 pb-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          
          {/* Main Footer Links & Directory */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            
            {/* Branding Column */}
            <div className="md:col-span-6 flex flex-col items-start gap-4">
              <span className="font-bold text-xl text-white">
                HavenRae
              </span>
              <p className="text-sm font-normal max-w-[300px] leading-relaxed">
                Interior design and project management, in sync.
              </p>
            </div>

            {/* Links Columns */}
            <div className="md:col-span-2 flex flex-col items-start gap-4">
              <span className="font-medium text-sm text-white uppercase tracking-wider">
                Company
              </span>
              <ul className="flex flex-col gap-3 text-sm">
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#rooms" className="hover:text-white transition-colors">Rooms</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div className="md:col-span-2 flex flex-col items-start gap-4">
              <span className="font-medium text-sm text-white uppercase tracking-wider">
                Support
              </span>
              <ul className="flex flex-col gap-3 text-sm">
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#quote" className="hover:text-white transition-colors">Get a Quote</a></li>
                <li><a href="#careers" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>

            <div className="md:col-span-2 flex flex-col items-start gap-4">
              <span className="font-medium text-sm text-white uppercase tracking-wider">
                Contact
              </span>
              <ul className="flex flex-col gap-3 text-sm text-left">
                <li><a href="mailto:hello@havenraestudios.com" className="hover:text-white transition-colors">hello@havenraestudios.com</a></li>
                <li><span className="block">+233 20 000 0000</span></li>
                <li><span className="block font-light">Accra, Ghana</span></li>
              </ul>
            </div>
            
          </div>

          {/* Divider */}
          <div className="w-full h-[1px] bg-white/15" />

          {/* Copyright Row */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-light">
            <span>© 2026 HavenRae Studios. All rights reserved.</span>
            <div className="flex gap-6">
              <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
          
        </div>
      </footer>

    </div>
  );
}
