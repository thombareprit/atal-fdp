import React, { useState } from 'react';
import { Landmark, CalendarRange, GraduationCap, CheckSquare, Download, ArrowUpRight, FileText, Calendar } from 'lucide-react';

export const RegistrationSection: React.FC = () => {
  const [downloadingBrochure, setDownloadingBrochure] = useState(false);
  const [downloadingTimetable, setDownloadingTimetable] = useState(false);

  // Directly downloads documents with cross-platform anchor click helper
  const handleDownload = (url: string, filename: string, type: 'brochure' | 'timetable') => {
    if (type === 'brochure') setDownloadingBrochure(true);
    if (type === 'timetable') setDownloadingTimetable(true);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    link.setAttribute('target', '_blank');
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      if (type === 'brochure') setDownloadingBrochure(false);
      if (type === 'timetable') setDownloadingTimetable(false);
    }, 600);
  };

  return (
    <section id="registration" className="scroll-mt-24 py-12 md:py-16 px-4 bg-canvas border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-primary text-xs font-bold uppercase tracking-wider">
            Registration & Certification
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Registration Guidelines & Criteria
          </h2>
          <p className="max-w-3xl mx-auto text-slate-600 text-sm sm:text-base font-semibold">
            Participate in this fully sponsored academic program under AICTE ATAL Academy. Review mandatory criteria and apply below.
          </p>
        </div>

        {/* 4-Card Executive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">

          {/* Card 1: Registration Fees */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-premium flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#D97706] flex items-center justify-center border border-amber-100">
                <Landmark className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="block text-[11px] font-black text-slate-400 tracking-widest uppercase">
                  Registration Fees
                </span>
                <h3 className="text-lg font-black text-[#D97706] uppercase tracking-tight">
                  NO REGISTRATION FEE
                </h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Fully sponsored under AICTE ATAL Academy.
                </p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
                Note: No TA/DA or accommodation provided.
              </p>
            </div>
          </div>

          {/* Card 2: ATAL Certification Standards */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-premium flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-primary flex items-center justify-center border border-blue-100">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="block text-[11px] font-black text-slate-400 tracking-widest uppercase">
                  ATAL Standards
                </span>
                <h3 className="text-lg font-black text-slate-900 tracking-tight">
                  Mandatory Criteria
                </h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Mandated by AICTE ATAL Academy for digital certificates:
                </p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Minimum 80% Attendance & Exam Score</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Article Summary Submission</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Industrial Visit Report</span>
              </div>
            </div>
          </div>

          {/* Card 3: Important Dates */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-premium flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                <CalendarRange className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="block text-[11px] font-black text-slate-400 tracking-widest uppercase">
                  Important Dates
                </span>
                <h3 className="text-lg font-black text-slate-900 tracking-tight">
                  Program Schedule
                </h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Apply early on the ATAL portal to confirm your seat.
                </p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 space-y-3 text-xs font-semibold text-slate-700">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-normal">Initiation:</span>
                <span className="text-emerald-700 font-bold">Open on ATAL Portal</span>
              </div>
              <div className="flex justify-between items-center border-t border-slate-50 pt-2">
                <span className="text-slate-500 font-normal">Duration:</span>
                <span className="text-[#1D4ED8] font-bold">December 07 – 12, 2026</span>
              </div>
            </div>
          </div>

          {/* Card 4: Action Links & Document Downloads */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-premium flex flex-col justify-between hover:-translate-y-1.5 transition-all duration-300">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                <ArrowUpRight className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="block text-[11px] font-black text-slate-400 tracking-widest uppercase">
                  Sign Up & Downloads
                </span>
                <h3 className="text-lg font-black text-slate-900 tracking-tight">
                  ATAL Portal Enrollment
                </h3>
                <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                  Application No: <strong className="text-slate-900">1775875503</strong>
                </p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 space-y-2.5">
              <a
                href="https://atalacademy.aicte.gov.in/login"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 min-h-[44px] bg-[#E36414] hover:bg-[#C25512] text-white font-bold text-xs rounded-xl shadow-sm transition-all duration-200 cursor-pointer"
              >
                <span>Register on ATAL Portal</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              {/* Document Download 1: Brochure */}
              <button
                onClick={() =>
                  handleDownload(
                    '/SIPNA-ATAL-FDP-Brochure.pdf',
                    'AICTE_ATAL_Biomedical_AI_FDP_Brochure.pdf',
                    'brochure'
                  )
                }
                disabled={downloadingBrochure}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 min-h-[44px] border border-slate-200 hover:border-slate-350 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl transition-all duration-200 disabled:opacity-50 cursor-pointer"
              >
                {downloadingBrochure ? (
                  <Download className="w-4 h-4 animate-bounce text-primary" />
                ) : (
                  <FileText className="w-4 h-4 text-primary" />
                )}
                <span>{downloadingBrochure ? 'Downloading Brochure...' : 'Download Brochure'}</span>
              </button>

              {/* Document Download 2: Detailed Timetable */}
              <button
                onClick={() =>
                  handleDownload(
                    '/SIPNA-ATAL-FDP-Timetable.pdf',
                    'AICTE_ATAL_Biomedical_AI_FDP_Timetable.pdf',
                    'timetable'
                  )
                }
                disabled={downloadingTimetable}
                className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 min-h-[44px] border border-slate-200 hover:border-slate-350 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl transition-all duration-200 disabled:opacity-50 cursor-pointer"
              >
                {downloadingTimetable ? (
                  <Download className="w-4 h-4 animate-bounce text-emerald-600" />
                ) : (
                  <Calendar className="w-4 h-4 text-emerald-600" />
                )}
                <span>{downloadingTimetable ? 'Downloading Timetable...' : 'Download Detailed Timetable'}</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};