import React from 'react';
import { Landmark, Mail, Phone, ArrowUp, Info } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer className="bg-navy text-slate-300 pt-16 pb-8 border-t border-slate-800">
      {/*
        Website Designed & Developed by:
        Prit Thombare (thombarepritnilesh@gmail.com)
      */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          
          {/* Column 1: Brand & Description */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5 text-white">
              <div className="p-2 bg-primary/20 rounded-lg text-primary">
                <Landmark className="w-5 h-5" />
              </div>
              <div className="leading-tight">
                <span className="font-extrabold tracking-tight text-base uppercase block">
                  Sipna SCOET, Amravati
                </span>
                <span className="text-[10px] font-black text-slate-400 tracking-wider">
                  DEPT. OF ELECTRONICS & TELECOMMUNICATION ENGINEERING
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-medium">
              Autonomous engineering institute accredited with NAAC 'A+' and NBA (4 Consecutive Terms). Driving educational and research excellence under the AICTE ATAL Academy Faculty Development Program.
            </p>
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-800/40 border border-slate-800 text-[11px] text-slate-400 font-semibold leading-normal">
              <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>
                Application No: 1775875503 | Conduct Mode: Offline (Hands-on Labs + Hospital Visit at RIMS). Minimum 80% attendance required for ATAL certification.
              </span>
            </div>
          </div>

          {/* Column 2: Navigation Links Map */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-black text-slate-400 tracking-widest uppercase">
              Quick Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm">
              <a href="#about" className="hover:text-white transition-colors">About</a>
              <a href="#speakers" className="hover:text-white transition-colors">Speakers</a>
              <a href="#schedule" className="hover:text-white transition-colors">Schedule</a>
              <a href="#committee" className="hover:text-white transition-colors">Committee</a>
              <a href="#venue" className="hover:text-white transition-colors">Venue</a>
              <a href="#registration" className="hover:text-white transition-colors">Registration</a>
            </div>
          </div>

          {/* Column 3: Contact & Info */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-black text-slate-400 tracking-widest uppercase">
              FDP Secretariat Desk
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4.5 h-4.5 text-slate-500 shrink-0 mt-1" />
                <div>
                  <span className="block text-base md:text-lg font-black text-white">Prof. Ujwal V. Ramekar</span>
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">FDP Coordinator (E&TC)</span>
                  <span className="block text-sm md:text-base font-semibold text-slate-200 tracking-wide">+91 7709077187</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4.5 h-4.5 text-slate-500 shrink-0 mt-1" />
                <div>
                  <span className="block text-base md:text-lg font-black text-white">Dr. Nikesh T. Gadare</span>
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">FDP Co-Coordinator (E&TC)</span>
                  <span className="block text-sm md:text-base font-semibold text-slate-200 tracking-wide">+91 9096310166</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5 border-t border-slate-800 pt-3">
                <Mail className="w-4.5 h-4.5 text-slate-500 shrink-0" />
                <a href="mailto:atalfdp_extc@sipnaengg.ac.in" className="text-xs hover:text-white transition-colors font-bold overflow-hidden text-ellipsis whitespace-nowrap">
                  atalfdp_extc@sipnaengg.ac.in
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright row */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 gap-4 text-xs font-semibold text-slate-500 text-center">
          <div>
            &copy; {new Date().getFullYear()} Department of Electronics & Telecommunication Engineering, Sipna SCOET, Amravati.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 cursor-default select-none">AICTE ATAL Sponsored</span>
            <button
              onClick={scrollToTop}
              className="p-2 min-h-[44px] px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg border border-slate-700 transition-colors inline-flex items-center gap-1 cursor-pointer"
              title="Scroll to Top"
            >
              Scroll Top
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Developer Attribution */}
        <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-2 text-center select-none">
          Designed &amp; Developed by{' '}
          <a
            href="https://thombareprit.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-300 transition-colors underline decoration-slate-600"
          >
            Prit Thombare
          </a>
        </p>

      </div>
    </footer>
  );
};
