import React from 'react';
import { Check, GraduationCap, Award, Users, Stethoscope } from 'lucide-react';
import sipnaGate from '../assets/sipna-gate.png';

export const AboutSection: React.FC = () => {
  const fdpObjectives = [
    'To develop advanced competency in Artificial Intelligence (AI), Machine Learning (ML), and Deep Learning (DL) for solving complex biomedical engineering and healthcare problems, aligned with national digital health initiatives and NEP-2020 guidelines, thereby strengthening technical expertise and analytical capabilities.',
    'To build in-depth understanding of intelligent medical data analytics and imaging techniques for enabling early diagnosis, precision healthcare, and efficient clinical decision support systems addressing real-world healthcare challenges.',
    'To provide comprehensive exposure to emerging healthcare technologies, including IoT-enabled systems, wearable devices, smart sensors, and edge/cloud-based medical platforms with strong industry relevance and practical applicability.',
    'To promote multidisciplinary research, innovation, and curriculum enhancement by enabling the design and implementation of AI-driven healthcare solutions with significant societal impact and translational potential in biomedical engineering domains.',
  ];

  return (
    <section 
      id="about" 
      className="scroll-mt-24 relative py-12 md:py-16 px-4 bg-[#E5DFD0] text-slate-900 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/10 border border-slate-900/15 text-slate-900 text-xs font-black uppercase tracking-wider backdrop-blur-md">
            Institutional Context & Scheme
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            About the Program & Host Department
          </h2>
        </div>

        {/* 2-Column Bento Grid Split 7-5 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch space-y-6 lg:space-y-0">
          
          {/* Tile 1: Luminous Warm Frosted Glass Card (Left Panel - 7 Columns) */}
          <div className="lg:col-span-7 bg-white/70 backdrop-blur-2xl border border-white/80 rounded-2xl p-6 md:p-8 shadow-[0_20px_40px_rgba(15,23,42,0.06)] flex flex-col justify-between space-y-6 text-slate-900">
            <div className="space-y-6">
              
              {/* ATAL Scheme Detail */}
              <div className="space-y-3">
                <h3 className="text-base md:text-lg font-black text-[#0F172A] flex items-center gap-2 border-b border-slate-900/10 pb-3">
                  <GraduationCap className="w-5.5 h-5.5 text-blue-700" />
                  About AICTE ATAL Academy
                </h3>
                
                {/* Topic Badges */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="px-3 py-1 text-[9px] font-black uppercase tracking-wider rounded-full bg-amber-500/15 text-amber-900 border border-amber-600/30 shadow-xs backdrop-blur-md">
                    Frontier AI/ML
                  </span>
                  <span className="px-3 py-1 text-[9px] font-black uppercase tracking-wider rounded-full bg-amber-500/15 text-amber-900 border border-amber-600/30 shadow-xs backdrop-blur-md">
                    Biomedical Imaging
                  </span>
                  <span className="px-3 py-1 text-[9px] font-black uppercase tracking-wider rounded-full bg-amber-500/15 text-amber-900 border border-amber-600/30 shadow-xs backdrop-blur-md">
                    NEP-2020 Aligned
                  </span>
                  <span className="px-3 py-1 text-[9px] font-black uppercase tracking-wider rounded-full bg-amber-500/15 text-amber-900 border border-amber-600/30 shadow-xs backdrop-blur-md">
                    Clinical Innovation
                  </span>
                </div>

                <p className="text-xs md:text-sm text-slate-700 leading-relaxed text-justify">
                  AICTE Training and Learning (ATAL) Academy was established by the Ministry of Education & All India Council for Technical Education (AICTE) to drive faculty development, research excellence, and ICT adoption across frontier disciplines. ATAL programs empower educators to build practical knowledge, bridge academia with industry benchmarks, and nurture innovation-led pedagogy in cutting-edge domains.
                </p>
              </div>

              {/* 4 Core Objectives */}
              <div className="space-y-4 border-t border-slate-900/10 pt-4">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-600 flex items-center gap-1.5">
                  <Stethoscope className="w-4 h-4 text-blue-700" />
                  Core FDP Objectives
                </h4>
                
                <ul className="grid grid-cols-1 gap-3">
                  {fdpObjectives.map((obj, index) => (
                    <li key={index} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-700 leading-relaxed">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5 text-emerald-700" strokeWidth={3} />
                      </div>
                      <span className="font-medium">{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Target Audience ("Who Can Participate") */}
              <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200/80 space-y-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-primary flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Target Audience (Who Can Participate)
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Faculty members of AICTE-approved institutions, research scholars, and postgraduate (PG) scholars specializing in Electronics, Biomedical, Computer Science, IT, Data Science, and allied healthcare technology disciplines.
                </p>
              </div>

            </div>
          </div>

          {/* Tile 2: E&TC Credentials & Gate Photo Card (Right Panel - 5 Columns, Reverse Stacked) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* E&TC Department & Campus Credentials */}
            <div className="bg-white/60 backdrop-blur-xl border border-white/80 p-6 rounded-2xl shadow-md space-y-4">
              <h4 className="text-base md:text-lg font-black text-[#0F172A] flex items-center gap-2 border-b border-slate-900/10 pb-3">
                <Award className="w-5 h-5 text-blue-700" />
                Department & Campus Credentials
              </h4>
              
              <div className="space-y-3 text-xs md:text-sm text-slate-700 leading-relaxed text-justify">
                <p>
                  <strong>Sipna College of Engineering & Technology (SCOET), Amravati</strong> is an Autonomous institute affiliated with Sant Gadge Baba Amravati University (SGBAU). Accredited by NAAC with Grade <strong>'A+'</strong>, ISO 9001:2015 certified, and an esteemed Mentee Institute of <strong>COEP Technological University</strong> under the Margadarshan scheme. SCOET proudly hosts Vidarbha's first DGCA-authorized Remote Pilot Training Organisation (RPTO).
                </p>
                <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-1.5 text-xs text-slate-800">
                  <span className="font-extrabold text-[#92400E] block uppercase tracking-wide">
                    Department of Electronics & Telecommunication Engineering (E&TC)
                  </span>
                  <p>
                    Established in 1999, the E&TC Department holds continuous <strong>NBA accreditation for 4 consecutive terms</strong>. The department maintains an intake of 120 for B.Tech and 18 for M.Tech, powered by 31 dedicated faculty members (including 23 Ph.D. holders) and 16 state-of-the-art research laboratories—featuring an AICTE MODROB laboratory and an industry Center of Excellence established with PugArch Technologies.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Sub-Panel: Gate/Campus Photo Card */}
            <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(15,23,42,0.1)] border border-white/60 group cursor-pointer aspect-[1/1] w-full flex flex-col justify-end flex-1">
              <img
                src={sipnaGate}
                alt="Sipna Campus Entrance Gate"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108 pointer-events-none"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              
              <div className="bg-gradient-to-t from-slate-900 via-slate-950/40 to-transparent p-6 flex flex-col justify-end absolute inset-0 transition-opacity duration-300 z-10">
                <h4 className="text-lg font-bold text-white mb-1">
                  Sipna College of Engineering & Technology
                </h4>
                <p className="text-xs font-semibold text-amber-300 tracking-wide uppercase mb-2">
                  UGC Autonomous | NAAC 'A+' Grade | NBA Accredited (4 Consecutive Terms)
                </p>
                <p className="text-xs text-slate-200 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 opacity-0 group-hover:opacity-100">
                  Vidarbha's First DGCA-Authorized RPTO • Mentee Institute of COEP Tech University
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};