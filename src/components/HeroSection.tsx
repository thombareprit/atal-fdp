import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { ArrowUpRight, Calendar, Sparkles } from 'lucide-react';
import sipnaLogo from '../assets/sipna-logo.png';
import naacLogo from '../assets/naac-logo.png';
import nbaLogo from '../assets/nba-logo.svg';
import aicteLogo from '../assets/aicte-logo.png';
import sipnaBuilding from '../assets/sipna-building.svg';

export const HeroSection: React.FC = () => {
  const { scrollY } = useScroll();
  const [isScrolledPastHero, setIsScrolledPastHero] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // 3D physics tilt motion values with dampening springs
  const xVal = useMotionValue(0.5);
  const yVal = useMotionValue(0.5);

  const xSpring = useSpring(xVal, { stiffness: 150, damping: 20 });
  const ySpring = useSpring(yVal, { stiffness: 150, damping: 20 });

  // Map to rotations dampened strictly to max +-2.5 degrees
  const rotateX = useTransform(ySpring, [0, 1], [2.5, -2.5]);
  const rotateY = useTransform(xSpring, [0, 1], [-2.5, 2.5]);

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      setIsScrolledPastHero(latest > 110);
    });
  }, [scrollY]);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Set normalized values for 3D tilt transformation
    xVal.set(mouseX / width);
    yVal.set(mouseY / height);
    
    // Set pixel coordinates for spotlight cursor background
    setMousePos({ x: mouseX, y: mouseY });
  };

  const handleMouseLeave = () => {
    xVal.set(0.5);
    yVal.set(0.5);
  };

  const handleScrollToTimeline = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (typeof document !== 'undefined') {
      const element = document.querySelector('#schedule');
      if (element && typeof window !== 'undefined' && document.body) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }
  };

  const specifications = [
    { key: 'FDP Dates', value: '07th December – 12th December 2026' },
    { key: 'Application ID', value: '1775875503' },
    { key: 'Conduct Mode', value: 'Offline (Hands-on Labs + Hospital Visit)' },
    { key: 'Department', value: 'Electronics & Telecommunication Engineering' },
    { key: 'Certification', value: 'ATAL Academy (Min 80% Attendance, Test Score & Report)' },
  ];

  return (
    <section className="relative overflow-hidden bg-[#F8FAFC] min-h-screen pt-4 pb-16 px-4">
      {/* Layer 1 (Background Asset Layer) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img 
          src={sipnaBuilding} 
          alt="Sipna Building Background" 
          className="w-full h-full object-cover object-center opacity-[0.8] contrast-125 scale-105 transition-transform duration-1000"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {/* Layer 2 (Soft Gradient Color Tint Overlay) */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-[#F8FAFC]/90 via-[#F8FAFC]/80 to-[#F8FAFC] backdrop-blur-[2px]" />

      {/* Layer 3 (Hero Content Wrapper) */}
      <div className="relative z-10 max-w-7xl mx-auto space-y-8 sm:px-6 lg:px-8">
        
        {/* 1. Centered Institutional Crest Header */}
        <div className="w-full max-w-5xl mx-auto text-center pt-8 pb-6 flex flex-col items-center justify-center border-b border-slate-200/60 mb-8">
          
          {/* Logo container preventing layout shifting when morphing logo docks into Navbar */}
          <div className="h-16 lg:h-20 flex items-center justify-center mb-3">
            {/* Desktop: Shared layout continuous flight */}
            {!isScrolledPastHero && (
              <motion.div
                layoutId="sipna-flying-logo"
                transition={{
                  type: "spring",
                  stiffness: 180,
                  damping: 24,
                  mass: 0.8
                }}
                className="hidden md:flex justify-center"
              >
                <img
                  src={sipnaLogo}
                  alt="Sipna Logo"
                  className="h-16 lg:h-20 w-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </motion.div>
            )}

            {/* Mobile: In-place soft transition in hero crest */}
            <div className="flex md:hidden justify-center">
              <motion.img
                src={sipnaLogo}
                alt="Sipna Logo"
                className="h-16 w-auto object-contain"
                animate={{ opacity: isScrolledPastHero ? 0.35 : 1, scale: isScrolledPastHero ? 0.95 : 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </div>

          <span className="text-[0.75rem] font-bold tracking-[0.2em] text-slate-500 uppercase mb-1">
            SIPNA SHIKSHAN PRASARAK MANDAL'S
          </span>
          <h1 className="text-lg sm:text-2xl md:text-3xl font-black text-[#0F172A] tracking-tight uppercase leading-snug max-w-3xl mx-auto">
            SIPNA COLLEGE OF ENGINEERING & TECHNOLOGY, AMRAVATI
          </h1>
          <span className="text-xs sm:text-sm font-extrabold text-red-600 tracking-wide mt-1">
            ESTD - 1999 | An Autonomous Institute
          </span>
          <span className="text-sm sm:text-base md:text-lg font-black text-[#1D4ED8] tracking-wide uppercase leading-tight mt-1 mb-2">
            DEPARTMENT OF ELECTRONICS & TELECOMMUNICATION ENGINEERING
          </span>
          <div className="flex items-center justify-center gap-4 sm:gap-6 my-2">
            <img 
              src={naacLogo} 
              alt="NAAC Grade A+" 
              className="h-8 sm:h-10 md:h-12 w-auto object-contain" 
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <span className="h-6 w-px bg-slate-300" />
            <img 
              src={nbaLogo} 
              alt="NBA Accredited (4 Consecutive Terms)" 
              className="h-8 sm:h-10 md:h-12 w-auto object-contain" 
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>
          <p className="text-[11px] sm:text-xs font-semibold text-slate-600 text-center max-w-2xl mx-auto leading-normal">
            Accredited by NAAC with Grade A+ | NBA Accredited (4 Consecutive Terms) | Approved by AICTE
          </p>
        </div>

        {/* 2. Hero Grid Structure (2-Column Layout) */}
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column (7 Columns) */}
          <div className="lg:col-span-7 space-y-7">
            
            {/* Interactive Sponsor Box with gold fill transition */}
            <div className="flex items-center gap-5 p-4 md:p-5 rounded-2xl bg-amber-500/15 border-2 border-amber-500/40 shadow-lg shadow-amber-500/10 mb-6 transition-all duration-300 hover:bg-amber-500/20 hover:border-amber-500/60 hover:scale-[1.01] cursor-default">
              <img
                src={aicteLogo}
                alt="AICTE ATAL Logo"
                className="h-16 md:h-20 w-auto object-contain shrink-0 filter drop-shadow-md"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
              <div>
                <span className="text-sm sm:text-lg md:text-xl font-black tracking-wider text-[#92400E] uppercase block">
                  AICTE ATAL SPONSORED SIX DAYS OFFLINE FDP
                </span>
                <span className="text-xs md:text-sm font-extrabold text-slate-800 tracking-wide block mt-1">
                  Application No: 1775875503 • Offline Mode • 7th Dec – 12th Dec 2026
                </span>
              </div>
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-black md:font-extrabold text-[#0F172A] leading-tight mb-4 tracking-tight">
              Artificial Intelligence in Biomedical Engineering:{' '}
              <span className="text-[#1D4ED8] bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-600">
                Advancing Next-Generation Healthcare Systems
              </span>
            </h2>

            {/* Sub-copy */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6 max-w-2xl font-semibold">
              Empowering academicians, clinical specialists, and research scholars with AI/ML foundations, federated learning, neuroimaging, and precision healthcare technologies aligned with NEP-2020.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-2">
              <a
                href="https://atalacademy.aicte.gov.in/login"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#E36414] hover:bg-[#AE4C0F] text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-orange-600/20 transition-all hover:scale-[1.02] cursor-pointer inline-flex items-center justify-center gap-2 min-h-[44px]"
              >
                <span>Register on ATAL Portal</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <button
                onClick={handleScrollToTimeline}
                className="border-2 border-slate-300 hover:border-slate-800 text-slate-800 font-bold px-7 py-3.5 rounded-xl transition-all hover:bg-slate-100 cursor-pointer inline-flex items-center justify-center gap-2 min-h-[44px]"
              >
                <Calendar className="w-4 h-4" />
                <span>Explore 6-Day Schedule</span>
              </button>
            </div>

          </div>

          {/* Right Column: Subtle 3D Tilt + Spotlight Specifications Card (5 Columns) */}
          <div className="lg:col-span-5 w-full max-w-md mx-auto mt-6 lg:mt-0 h-full [perspective:1000px]">
            <motion.div
              style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleMouseLeave}
              className="relative bg-white border border-slate-200 rounded-2xl p-6 shadow-premium shadow-xl transition-shadow duration-350 hover:shadow-lg overflow-hidden cursor-default"
            >
              {/* Radial Cursor Spotlight Layer */}
              <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{
                  background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(29, 78, 216, 0.08), transparent 40%)`,
                }}
              />

              <div style={{ transform: 'translateZ(10px)' }} className="relative z-10 space-y-4">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
                      FDP Specifications
                    </h3>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-primary border border-blue-200">
                      AICTE ATAL
                    </span>
                  </div>
                </div>

                <div className="space-y-6 pt-2">
                  {specifications.map((cred, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-3 pb-3 border-b border-slate-50 last:border-b-0 last:pb-0">
                      <div className="col-span-5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                        {cred.key}
                      </div>
                      <div className="col-span-7 text-xs sm:text-sm font-bold text-[#0F172A] leading-normal">
                        {cred.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};
