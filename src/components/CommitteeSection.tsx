import React from 'react';
import { Phone, Mail, ShieldCheck } from 'lucide-react';
import jagdishGuptaImg from '../assets/committee/jagdish-gupta.jpg';
import sanjayKherdeImg from '../assets/committee/sanjay-kherde.jpg';
import vishwasGaikwadImg from '../assets/committee/vishwas-gaikwad.jpeg';
import ujwalRamekarImg from '../assets/committee/ujwal-ramekar.jpeg';
import nikeshGadareImg from '../assets/committee/nikesh-gadare.jpeg';

interface CommitteeMember {
  role: string;
  name: string;
  designation: string;
  image: string;
  phone?: string;
}

export const CommitteeSection: React.FC = () => {
  const leadership: CommitteeMember[] = [
    {
      role: 'Patron',
      name: "Hon'ble Shri Jagdishji Gupta",
      designation: 'President, Sipna Shikshan Prasarak Mandal, Amravati',
      image: jagdishGuptaImg,
    },
    {
      role: 'Organizing Chair',
      name: 'Dr. Sanjay M. Kherde',
      designation: 'Principal, Sipna College of Engineering & Technology',
      image: sanjayKherdeImg,
    },
    {
      role: 'Convener',
      name: 'Dr. Vishwas T. Gaikwad',
      designation: 'Head, Department of Electronics & Telecommunication Engineering',
      image: vishwasGaikwadImg,
    },
  ];

  const coordinators: CommitteeMember[] = [
    {
      role: 'FDP Coordinator',
      name: 'Prof. Ujwal V. Ramekar',
      designation: 'Assistant Professor, Dept. of E&TC',
      phone: '+91 7709077187',
      image: ujwalRamekarImg,
    },
    {
      role: 'FDP Co-Coordinator',
      name: 'Dr. Nikesh T. Gadare',
      designation: 'Assistant Professor, Dept. of E&TC',
      phone: '+91 9096310166',
      image: nikeshGadareImg,
    },
  ];

  return (
    <section id="committee" className="scroll-mt-24 py-12 md:py-16 bg-canvas border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-primary text-xs font-bold uppercase tracking-wider">
            Organizing Committee
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Leadership & Administration
          </h2>
          <p className="max-w-2xl mx-auto text-slate-600 text-sm font-medium">
            Governed by institutional leadership and spearheaded by the Department of Electronics & Telecommunication Engineering.
          </p>
        </div>

        {/* Top Row (Leadership): 3 Balanced Cards Centered */}
        <div className="space-y-4">
          <h3 className="text-xs font-black text-slate-400 tracking-widest uppercase text-center">
            Institutional Leadership
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-sm md:max-w-5xl mx-auto">
            {leadership.map((leader) => (
              <div
                key={leader.role}
                className="p-4 sm:p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200 shadow-sm flex flex-col items-center text-center justify-between hover:-translate-y-1 hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex flex-col items-center w-full">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto rounded-full object-cover object-top border-2 border-slate-100 shadow-inner mb-3 select-none group-hover:border-[#1D4ED8] transition-colors duration-300"
                    loading="lazy"
                  />
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-50 text-primary border border-blue-200 text-[10px] font-black tracking-wider uppercase mb-1.5">
                    {leader.role}
                  </span>
                  <h4 className="text-sm sm:text-base font-black text-slate-900 tracking-tight text-center leading-snug group-hover:text-primary transition-colors duration-200">
                    {leader.name}
                  </h4>
                  <p className="text-[11px] sm:text-xs font-semibold text-slate-600 text-center mt-1 leading-normal">
                    {leader.designation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row (Execution): 2 Balanced Cards Centered */}
        <div className="space-y-4 pt-2">
          <h3 className="text-xs font-black text-slate-400 tracking-widest uppercase text-center">
            Program Coordinators
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 max-w-sm md:max-w-2xl mx-auto mt-2 md:mt-4">
            {coordinators.map((coord) => (
              <div
                key={coord.role}
                className="p-4 sm:p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200 shadow-sm flex flex-col items-center text-center justify-between hover:-translate-y-1 hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex flex-col items-center w-full">
                  <img
                    src={coord.image}
                    alt={coord.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto rounded-full object-cover object-top border-2 border-slate-100 shadow-inner mb-3 select-none group-hover:border-[#1D4ED8] transition-colors duration-300"
                    loading="lazy"
                  />
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-black tracking-wider uppercase mb-1.5">
                    {coord.role}
                  </span>
                  <h4 className="text-sm sm:text-base font-black text-slate-900 tracking-tight text-center leading-snug group-hover:text-primary transition-colors duration-200">
                    {coord.name}
                  </h4>
                  <p className="text-[11px] sm:text-xs font-semibold text-slate-600 text-center mt-1 leading-normal">
                    {coord.designation}
                  </p>
                </div>

                {/* Mobile Contact with minimum 44px touch target - Personal email strictly omitted */}
                {coord.phone && (
                  <div className="w-full border-t border-slate-100 pt-3 mt-3">
                    <a
                      href={`tel:${coord.phone.replace(/\s+/g, '')}`}
                      className="min-h-[44px] text-[11px] font-bold text-blue-700 hover:text-blue-800 text-center flex items-center justify-center gap-1.5 transition-colors active:scale-95"
                    >
                      <Phone className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>Mobile: {coord.phone}</span>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Official Communications Desk Card */}
        <div className="max-w-3xl mx-auto rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-amber-400 text-xs font-black uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>Official Communication Desk</span>
            </div>
            <h4 className="text-lg sm:text-xl font-black text-white">
              Official Desk: atalfdp_extc@sipnaengg.ac.in
            </h4>
            <p className="text-xs text-slate-300 font-medium">
              Have queries or need official assistance? Connect directly with the FDP coordination secretariat.
            </p>
          </div>

          <a
            href="mailto:atalfdp_extc@sipnaengg.ac.in"
            className="shrink-0 bg-white hover:bg-slate-100 text-slate-900 font-bold px-6 py-3 rounded-xl transition-all shadow-md inline-flex items-center gap-2 text-xs uppercase tracking-wider min-h-[44px]"
          >
            <Mail className="w-4 h-4 text-primary" />
            <span>Contact Desk</span>
          </a>
        </div>

      </div>
    </section>
  );
};
