import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Clock, User, Utensils, Tag, Hospital, FlaskConical, BookOpen, Award } from 'lucide-react';

export interface TimelineItem {
  time: string;
  title: string;
  speaker?: string;
  role?: string;
  type: 'session' | 'break' | 'event' | 'visit' | 'lab';
  domain: 'federated' | 'genai' | 'neuroimaging' | 'voice' | 'oncology' | 'research' | 'fieldvisit' | 'assessment' | 'break' | 'lab';
  color: string;
  tagText: string;
  details?: string;
}

interface DayTimelineProps {
  items: TimelineItem[];
  isActive?: boolean;
  nextActionLabel?: string;
  onNextAction?: () => void;
}

const DayTimeline: React.FC<DayTimelineProps> = ({
  items,
  isActive = false,
  nextActionLabel,
  onNextAction,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const firstNodeRef = useRef<HTMLDivElement>(null);
  const lastNodeRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end 70%'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
  });
  
  const [spineBounds, setSpineBounds] = useState({ top: 28, bottom: 28 });
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const updateBounds = () => {
      try {
        if (firstNodeRef.current && lastNodeRef.current && containerRef.current) {
          const containerRect = containerRef.current.getBoundingClientRect();
          const firstRect = firstNodeRef.current.getBoundingClientRect();
          const lastRect = lastNodeRef.current.getBoundingClientRect();

          const top = (firstRect.top + firstRect.height / 2) - containerRect.top;
          const bottom = containerRect.bottom - (lastRect.top + lastRect.height / 2);

          setSpineBounds({ top, bottom });
        }
      } catch (err) {
        console.warn("Error updating spine bounds:", err);
      }
    };

    updateBounds();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', updateBounds);
    }
    const timer = setTimeout(updateBounds, 150);
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', updateBounds);
      }
      clearTimeout(timer);
    };
  }, [items, isActive]);

  useEffect(() => {
    return scaleY.on('change', (latest: number) => {
      const idx = latest >= 0.9 ? items.length - 1 : latest * (items.length - 0.5);
      setActiveIndex(idx);
    });
  }, [items, scaleY]);

  const activeStyles: Record<string, { card: string; tag: string }> = {
    federated: {
      card: "bg-slate-50/95 border-2 border-[#1D4ED8] shadow-[0_10px_30px_rgba(29,78,216,0.12)] scale-[1.01] opacity-100 z-20 relative",
      tag: "bg-[#1D4ED8] text-white shadow-md border-[#1D4ED8]"
    },
    genai: {
      card: "bg-slate-50/95 border-2 border-[#6366F1] shadow-[0_10px_30px_rgba(99,102,241,0.12)] scale-[1.01] opacity-100 z-20 relative",
      tag: "bg-[#6366F1] text-white shadow-md border-[#6366F1]"
    },
    neuroimaging: {
      card: "bg-slate-50/95 border-2 border-[#8B5CF6] shadow-[0_10px_30px_rgba(139,92,246,0.12)] scale-[1.01] opacity-100 z-20 relative",
      tag: "bg-[#8B5CF6] text-white shadow-md border-[#8B5CF6]"
    },
    voice: {
      card: "bg-slate-50/95 border-2 border-[#0284C7] shadow-[0_10px_30px_rgba(2,132,199,0.12)] scale-[1.01] opacity-100 z-20 relative",
      tag: "bg-[#0284C7] text-white shadow-md border-[#0284C7]"
    },
    oncology: {
      card: "bg-slate-50/95 border-2 border-[#E11D48] shadow-[0_10px_30px_rgba(225,29,72,0.12)] scale-[1.01] opacity-100 z-20 relative",
      tag: "bg-[#E11D48] text-white shadow-md border-[#E11D48]"
    },
    research: {
      card: "bg-slate-50/95 border-2 border-[#059669] shadow-[0_10px_30px_rgba(5,150,105,0.12)] scale-[1.01] opacity-100 z-20 relative",
      tag: "bg-[#059669] text-white shadow-md border-[#059669]"
    },
    fieldvisit: {
      card: "bg-amber-50/95 border-2 border-[#D97706] shadow-[0_10px_30px_rgba(217,119,6,0.15)] scale-[1.01] opacity-100 z-20 relative",
      tag: "bg-[#D97706] text-white shadow-md border-[#D97706]"
    },
    assessment: {
      card: "bg-purple-50/95 border-2 border-[#7C3AED] shadow-[0_10px_30px_rgba(124,58,237,0.15)] scale-[1.01] opacity-100 z-20 relative",
      tag: "bg-[#7C3AED] text-white shadow-md border-[#7C3AED]"
    },
    lab: {
      card: "bg-teal-50/95 border-2 border-[#0D9488] shadow-[0_10px_30px_rgba(13,148,136,0.12)] scale-[1.01] opacity-100 z-20 relative",
      tag: "bg-[#0D9488] text-white shadow-md border-[#0D9488]"
    },
    break: {
      card: "bg-slate-50/90 border-2 border-[#D97706] shadow-[0_8px_20px_rgba(217,119,6,0.10)] scale-[1.01] opacity-100 z-20 relative",
      tag: "bg-[#D97706] text-white shadow-md border-[#D97706]"
    }
  };

  const getIconForType = (item: TimelineItem) => {
    if (item.tagText.includes('Lunch')) return <Utensils className="w-3.5 h-3.5" />;
    if (item.tagText.includes('Hospital') || item.tagText.includes('Visit') || item.domain === 'fieldvisit') return <Hospital className="w-3.5 h-3.5" />;
    if (item.tagText.includes('Lab')) return <FlaskConical className="w-3.5 h-3.5" />;
    if (item.tagText.includes('Article')) return <BookOpen className="w-3.5 h-3.5" />;
    if (item.tagText.includes('Valedictory') || item.tagText.includes('Assessment') || item.tagText.includes('Examination')) return <Award className="w-3.5 h-3.5" />;
    return <Tag className="w-3 h-3" />;
  };

  return (
    <div ref={containerRef} className="w-full px-2 sm:px-6 relative overflow-visible">
      {/* Central spine line running from Node 1 to Node N */}
      <div
        className="absolute md:left-1/2 left-[18px] w-[2px] -translate-x-1/2 pointer-events-none z-10"
        style={{
          top: `${spineBounds.top}px`,
          bottom: `${spineBounds.bottom}px`,
        }}
      >
        <svg className="w-full h-full" preserveAspectRatio="none">
          <line x1="0" y1="0" x2="0" y2="100%" stroke="#E2E8F0" strokeWidth="2" />
          <motion.line
            x1="0"
            y1="0"
            x2="0"
            y2="100%"
            stroke="#1D4ED8"
            strokeWidth="2"
            style={{ pathLength: scaleY }}
          />
        </svg>
      </div>

      <div className="space-y-8 sm:space-y-10 overflow-visible">
        {items.map((item, index) => {
          const isEven = index % 2 === 0;
          const isNodeActive = activeIndex >= index;
          const isFirst = index === 0;
          const isLast = index === items.length - 1;

          const activeStyle = activeStyles[item.domain] || activeStyles.federated;
          const neutralCardStyle = "bg-white/95 backdrop-blur-md border border-slate-200/80 shadow-xs opacity-85 z-20 relative";
          const neutralTagStyle = "bg-slate-100 text-slate-600 border-slate-200";

          return (
            <div
              key={index}
              className="relative w-full min-h-[120px] flex items-center md:block overflow-visible"
            >
              {/* Pulse Ring Node Dot */}
              <div
                ref={isFirst ? firstNodeRef : isLast ? lastNodeRef : undefined}
                className={`absolute md:left-1/2 left-[18px] top-1/2 md:top-[28px] -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full border-4 z-10 opacity-100 transition-all duration-300 ${
                  isNodeActive 
                    ? 'bg-[#1D4ED8] border-blue-200 shadow-md ring-4 ring-blue-500/10' 
                    : 'bg-white border-slate-300 shadow-sm'
                }`}
              />

              {/* Desktop Connectors */}
              {isEven && (
                <div 
                  className="hidden md:block absolute top-[28px] z-0 pointer-events-none"
                  style={{ left: '44%', width: '6%', height: '2px' }}
                >
                  <svg className="w-full h-full" overflow="visible">
                    <line x1="100%" y1="0" x2="0" y2="0" stroke="#E2E8F0" strokeWidth="2" />
                    <motion.line
                      x1="100%"
                      y1="0"
                      x2="0"
                      y2="0"
                      stroke={item.color}
                      strokeWidth="2"
                      animate={{ pathLength: isNodeActive ? 1 : 0 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                    />
                  </svg>
                </div>
              )}

              {!isEven && (
                <div 
                  className="hidden md:block absolute top-[28px] z-0 pointer-events-none"
                  style={{ left: '50%', width: '6%', height: '2px' }}
                >
                  <svg className="w-full h-full" overflow="visible">
                    <line x1="0" y1="0" x2="100%" y2="0" stroke="#E2E8F0" strokeWidth="2" />
                    <motion.line
                      x1="0"
                      y1="0"
                      x2="100%"
                      y2="0"
                      stroke={item.color}
                      strokeWidth="2"
                      animate={{ pathLength: isNodeActive ? 1 : 0 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                    />
                  </svg>
                </div>
              )}

              {/* Mobile Connector */}
              <div className="md:hidden absolute top-1/2 left-[18px] w-[26px] h-[2px] z-0 -translate-y-1/2 pointer-events-none">
                <svg className="w-full h-full" overflow="visible">
                  <line x1="0" y1="0" x2="100%" y2="0" stroke="#E2E8F0" strokeWidth="2" />
                  <motion.line
                    x1="0"
                    y1="0"
                    x2="100%"
                    y2="0"
                    stroke={item.color}
                    strokeWidth="2"
                    animate={{ pathLength: isNodeActive ? 1 : 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                  />
                </svg>
              </div>

              {/* Card Container */}
              <div
                className={`w-full md:w-[44%] pl-11 md:pl-0 transition-all duration-300 relative z-20 ${
                  isEven
                    ? 'md:mr-auto md:text-right text-left'
                    : 'md:ml-auto md:text-left text-left'
                }`}
              >
                <div
                  className={`p-5 sm:p-6 min-h-[120px] rounded-2xl border transition-all duration-500 ${
                    isNodeActive 
                      ? activeStyle.card 
                      : neutralCardStyle
                  }`}
                >
                  {/* Time & Badge */}
                  <div
                    className={`flex flex-col sm:flex-row gap-2 mb-3 pb-2 border-b border-slate-100 ${
                      isEven 
                        ? 'md:flex-row-reverse md:justify-between sm:justify-start'
                        : 'md:justify-between'
                    }`}
                  >
                    <div className={`flex items-center gap-1.5 text-xs font-bold tracking-wide shrink-0 ${isNodeActive ? 'text-slate-800' : 'text-slate-500'}`}>
                      <Clock className="w-4 h-4 text-slate-400" />
                      {item.time}
                    </div>
                    
                    <div>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[9px] font-black tracking-wide uppercase inline-flex items-center gap-1.5 border transition-all duration-300 ${
                          isNodeActive 
                            ? activeStyle.tag 
                            : neutralTagStyle
                        }`}
                      >
                        {getIconForType(item)}
                        {item.tagText}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className={`text-sm sm:text-base font-extrabold leading-snug transition-colors duration-500 ${isNodeActive ? 'text-slate-900' : 'text-slate-700'}`}>
                    {item.title}
                  </h3>

                  {/* Speaker details block */}
                  {item.speaker && (
                    <div
                      className={`flex items-start gap-2.5 p-2.5 rounded-xl border mt-3 text-left transition-colors duration-500 ${
                        isEven ? 'md:flex-row-reverse md:text-right' : ''
                      } ${isNodeActive ? 'bg-slate-50 border-slate-200' : 'bg-slate-50/60 border-slate-150'}`}
                    >
                      <div className="p-1.5 bg-white border border-slate-200 rounded-lg text-primary shrink-0 mt-0.5">
                        <User className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className={`block text-xs font-black transition-colors ${isNodeActive ? 'text-slate-900' : 'text-slate-700'}`}>
                          {item.speaker}
                        </span>
                        {item.role && (
                          <span className={`block text-[10.5px] font-semibold leading-tight mt-0.5 ${isNodeActive ? 'text-slate-600' : 'text-slate-500'}`}>
                            {item.role}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Details text */}
                  {item.details && (
                    <p className={`text-xs font-medium leading-relaxed mt-2.5 transition-colors ${isNodeActive ? 'text-slate-600' : 'text-slate-500'}`}>
                      {item.details}
                    </p>
                  )}

                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Prominent Next Day / Back Navigation CTA */}
      {nextActionLabel && onNextAction && (
        <div className="flex justify-center w-full mt-10">
          <button
            onClick={onNextAction}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0F172A] hover:bg-[#1D4ED8] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-300 active:scale-95 cursor-pointer min-h-[44px]"
          >
            <span>{nextActionLabel}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export const TimelineSection: React.FC = () => {
  const [activeDay, setActiveDay] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const days = [
    { id: 1, label: 'Day 1', date: '07 Dec 2026' },
    { id: 2, label: 'Day 2', date: '08 Dec 2026' },
    { id: 3, label: 'Day 3', date: '09 Dec 2026' },
    { id: 4, label: 'Day 4', date: '10 Dec 2026' },
    { id: 5, label: 'Day 5', date: '11 Dec 2026' },
    { id: 6, label: 'Day 6', date: '12 Dec 2026' },
  ];

  const scheduleData: Record<1 | 2 | 3 | 4 | 5 | 6, TimelineItem[]> = {
    1: [
      {
        time: '09:30 AM – 12:00 PM',
        title: 'Session 1 - "Federated Learning for Privacy-Preserving Biomedical Image Analysis"',
        speaker: 'Dr. R. Murugan',
        role: 'Associate Professor, NIT Puducherry',
        type: 'session',
        domain: 'federated',
        color: '#1D4ED8',
        tagText: 'Keynote • Session 1',
        details: 'Architectures for decentralized healthcare data, differential privacy, secure multi-party computation, and privacy-preserving clinical machine learning.',
      },
      {
        time: '12:00 PM – 01:00 PM',
        title: 'Article Discussion - "DRFL: federated learning in diabetic retinopathy grading using fundus images"',
        speaker: 'Dr. R. Murugan & Participants',
        role: 'IEEE Transactions on Parallel and Distributed Systems, 2023/4/5',
        type: 'session',
        domain: 'federated',
        color: '#0891B2',
        tagText: 'Article Discussion',
        details: 'Critical evaluation of the seminal IEEE TPDS publication on distributed retinal lesion detection across multi-hospital consortia.',
      },
      {
        time: '01:00 PM – 02:00 PM',
        title: 'Lunch Break',
        type: 'break',
        domain: 'break',
        color: '#D97706',
        tagText: 'Lunch Break',
      },
      {
        time: '02:00 PM – 04:30 PM',
        title: 'Session 2 - "Generative AI for Biomedical Imaging: From Data Augmentation to Synthetic Medical Image Generation"',
        speaker: 'Dr. R. Murugan',
        role: 'Associate Professor, NIT Puducherry',
        type: 'session',
        domain: 'genai',
        color: '#6366F1',
        tagText: 'Session 2',
        details: 'Diffusion models, conditional GANs, and synthetic MRI/CT synthesis for addressing severe clinical data scarcity.',
      },
      {
        time: '04:30 PM – 05:30 PM',
        title: 'Hands-on training/Labs',
        type: 'lab',
        domain: 'lab',
        color: '#0D9488',
        tagText: 'Hands-on Lab',
        details: 'Implementation of privacy-preserving model aggregation on clinical image subsets using Google Colab / institutional GPU cluster.',
      },
    ],
    2: [
      {
        time: '09:30 AM – 12:00 PM',
        title: 'Session 3 - "Diagnosis of medical images using machine learning and deep learning"',
        speaker: 'Dr. N. Jagan Mohan',
        role: 'Specialist Data Scientist & Former DRDO Projectee, LTIMindtree',
        type: 'session',
        domain: 'genai',
        color: '#1D4ED8',
        tagText: 'Session 3',
        details: 'State-of-the-art CNN backbones, Vision Transformers (ViTs), and feature attribution maps in clinical radiology and pathology.',
      },
      {
        time: '12:00 PM – 01:00 PM',
        title: 'Article Discussion - "Machine learning techniques for the schizophrenia diagnosis: a comprehensive review and future research directions"',
        speaker: 'Dr. N. Jagan Mohan & Participants',
        role: 'Journal of Ambient Intelligence and Humanized Computing, 2023/5',
        type: 'session',
        domain: 'neuroimaging',
        color: '#0891B2',
        tagText: 'Article Discussion',
        details: 'In-depth review of JAIHC research on functional neuroimaging biomarkers and automated psychiatric anomaly classification.',
      },
      {
        time: '01:00 PM – 02:00 PM',
        title: 'Lunch Break',
        type: 'break',
        domain: 'break',
        color: '#D97706',
        tagText: 'Lunch Break',
      },
      {
        time: '02:00 PM – 04:30 PM',
        title: 'Session 4 - "Step-by-step demonstration of medical image classification through Python programming"',
        speaker: 'Dr. N. Jagan Mohan',
        role: 'Specialist Data Scientist & Former DRDO Projectee, LTIMindtree',
        type: 'session',
        domain: 'genai',
        color: '#1D4ED8',
        tagText: 'Session 4',
        details: 'End-to-end Python pipeline demo for chest X-ray and histopathology classification, transfer learning, and model interpretability (Grad-CAM).',
      },
      {
        time: '04:30 PM – 05:30 PM',
        title: 'Hands-on training/Labs',
        type: 'lab',
        domain: 'lab',
        color: '#0D9488',
        tagText: 'Hands-on Lab',
        details: 'Participants fine-tune deep neural networks on DICOM imaging datasets with real-time accuracy and sensitivity metrics.',
      },
    ],
    3: [
      {
        time: '09:30 AM – 12:00 PM',
        title: "Session 5 - \"Generative adversarial networks for multi-modal image fusion for Alzheimer's disease diagnosis\"",
        speaker: 'Dr. Tripti Goel',
        role: 'Assistant Professor & Former NBRC Scientist, NIT Silchar',
        type: 'session',
        domain: 'neuroimaging',
        color: '#8B5CF6',
        tagText: 'Session 5',
        details: 'Integrating multi-modal MRI and PET imaging using CycleGANs and cross-modal attention mechanisms for early biomarker detection.',
      },
      {
        time: '12:00 PM – 01:00 PM',
        title: 'Article Discussion - "Ensemble deep learning for Alzheimer\'s disease characterization and estimation"',
        speaker: 'Dr. Tripti Goel & Participants',
        role: 'Nature Mental Health, 2024/6',
        type: 'session',
        domain: 'neuroimaging',
        color: '#0891B2',
        tagText: 'Article Discussion',
        details: 'Critical evaluation of ensemble deep neural networks published in Nature Mental Health for neurodegenerative cognitive trajectories.',
      },
      {
        time: '01:00 PM – 02:00 PM',
        title: 'Lunch Break',
        type: 'break',
        domain: 'break',
        color: '#D97706',
        tagText: 'Lunch Break',
      },
      {
        time: '02:00 PM – 04:30 PM',
        title: 'Session 6 - "Role of Diffusion-Weighted Imaging & Susceptibility-Weighted Imaging in Predicting Hemorrhage Progression in Stroke Patients"',
        speaker: 'Dr. Tripti Goel',
        role: 'Assistant Professor & Former NBRC Scientist, NIT Silchar',
        type: 'session',
        domain: 'neuroimaging',
        color: '#8B5CF6',
        tagText: 'Session 6',
        details: 'Diffusion-Weighted Imaging (DWI) and Susceptibility-Weighted Imaging (SWI) analysis for acute ischemic stroke and microbleed tracking.',
      },
      {
        time: '04:30 PM – 05:30 PM',
        title: 'Hands-on training/Labs',
        type: 'lab',
        domain: 'lab',
        color: '#0D9488',
        tagText: 'Hands-on Lab',
        details: 'Hands-on volumetric neuroimaging processing with nibabel, Nilearn, and 3D U-Net architectures for cerebral hemorrhage boundaries.',
      },
    ],
    4: [
      {
        time: '09:30 AM – 12:00 PM',
        title: 'Session 7 - "Voice AI in Healthcare: Transforming Patient Interaction and Clinical Workflow"',
        speaker: 'Mr. A. Surya Prakash',
        role: 'Co-Founder & Director, SpicArts.ai',
        type: 'session',
        domain: 'voice',
        color: '#0284C7',
        tagText: 'Session 7',
        details: 'Automatic speech recognition (ASR), clinical ambient scribing, voice biomarkers for neurological screening, and HIPAA-compliant Conversational AI.',
      },
      {
        time: '12:00 PM – 01:00 PM',
        title: 'Article Discussion - "Bridging communication gaps: the role of voice-enabled AI in medicine"',
        speaker: 'Mr. A. Surya Prakash & Participants',
        role: 'Journal of Ambient Intelligence and Humanized Computing, June 2025',
        type: 'session',
        domain: 'voice',
        color: '#0891B2',
        tagText: 'Article Discussion',
        details: 'Discussion on linguistic features, acoustic vocal biomarkers, and diagnostic voice analysis in telemedicine.',
      },
      {
        time: '01:00 PM – 02:00 PM',
        title: 'Lunch Break',
        type: 'break',
        domain: 'break',
        color: '#D97706',
        tagText: 'Lunch Break',
      },
      {
        time: '02:00 PM – 04:30 PM',
        title: 'Session 8 - "Tech, Touch and Trust: Building holistic ecosystem in oncology through AI"',
        speaker: 'Dr. Rohit Mundhada',
        role: 'Surgical Oncologist, Geetai Nursing Home',
        type: 'session',
        domain: 'oncology',
        color: '#E11D48',
        tagText: 'Session 8',
        details: 'Translational clinical oncological paradigms: intraoperative AI surgical guidance, digital oncology workflows, tumor board decision support, and doctor-patient trust.',
      },
      {
        time: '04:30 PM – 05:30 PM',
        title: 'Hands-on training/Labs',
        type: 'lab',
        domain: 'lab',
        color: '#0D9488',
        tagText: 'Hands-on Lab',
        details: 'Extracting MFCCs, prosodic pitch cues, and running Whisper/wav2vec models for clinical speech transcription and symptom extraction.',
      },
    ],
    5: [
      {
        time: '09:00 AM – 01:00 PM',
        title: 'Industrial visit - Rainbow Institute of Medical Sciences, Amravati',
        role: 'Direct Clinical Observation: Cardiology, Neurology & Oncology Departments',
        type: 'visit',
        domain: 'fieldvisit',
        color: '#D97706',
        tagText: 'Industrial Visit',
        details: 'Comprehensive experiential visit to RIMS multi-speciality tertiary care center. Faculty participants observe live radiological workflows (MRI, CT, Cath Lab), digital telemetry, oncology radiation suites, and hospital management system (HMS) interoperability.',
      },
      {
        time: '01:00 PM – 02:00 PM',
        title: 'Lunch Break',
        type: 'break',
        domain: 'break',
        color: '#D97706',
        tagText: 'Lunch Break',
      },
      {
        time: '02:00 PM – 04:30 PM',
        title: 'Session 9 - "Outcome-Based Research Methodology and Academic Writing"',
        speaker: 'Dr. Rahul Sharma',
        role: 'Assistant Professor, LNMIIT Jaipur & Research Associate at IIT Indore',
        type: 'session',
        domain: 'research',
        color: '#059669',
        tagText: 'Session 9',
        details: 'Crafting high-impact research manuscripts for Q1 IEEE/Springer/Elsevier journals, experimental rigor, reproducibility benchmarks, and funding proposal drafting.',
      },
      {
        time: '04:30 PM – 05:30 PM',
        title: 'Hands-on training/Labs',
        type: 'lab',
        domain: 'lab',
        color: '#0D9488',
        tagText: 'Hands-on Lab',
        details: 'Synthesis of clinical observations from RIMS visit into structured case study reports and collaborative translational research outlines.',
      },
    ],
    6: [
      {
        time: '09:30 AM – 12:00 PM',
        title: 'Session 10 - "AI, Neuro imaging, and Brain Signal Analysis in Alzheimer\'s and Schizophrenia: Engineering the Future of Brain Care"',
        speaker: 'Dr. Sikandar Adwani',
        role: 'Executive Director & Senior Neuro Physician, Radiant Superspeciality Hospital',
        type: 'session',
        domain: 'neuroimaging',
        color: '#7C3AED',
        tagText: 'Session 10',
        details: 'Translating electroencephalogram (EEG) patterns, event-related potentials (ERPs), and neurological imaging into automated differential diagnostics for neurodegenerative pathology.',
      },
      {
        time: '01:00 PM – 02:00 PM',
        title: 'Lunch Break',
        type: 'break',
        domain: 'break',
        color: '#D97706',
        tagText: 'Lunch Break',
      },
      {
        time: '02:00 PM – 04:00 PM',
        title: 'MCQ & Reflection Journal',
        role: 'Mandatory ATAL Academy Certification Examination',
        type: 'event',
        domain: 'assessment',
        color: '#7C3AED',
        tagText: 'Examination',
        details: 'Proctored comprehensive assessment covering AI/ML foundations, biomedical imaging, federated architectures, and hospital field visit observations.',
      },
      {
        time: '04:00 PM – 05:00 PM',
        title: 'Valedictory Session',
        role: 'Presided by SSPM Leadership & E&TC Faculty',
        type: 'event',
        domain: 'assessment',
        color: '#1D4ED8',
        tagText: 'Valedictory',
        details: 'Concluding ceremony, participant reflections, presentation of ATAL Academy certificates to qualified educators, and vote of thanks.',
      },
    ],
  };

  const scrollToSchedule = () => {
    if (typeof document !== 'undefined') {
      const element = document.getElementById('schedule') || containerRef.current;
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleNextDay = (nextDayNum: 1 | 2 | 3 | 4 | 5 | 6) => {
    setActiveDay(nextDayNum);
    scrollToSchedule();
  };

  const handleBackToDay1 = () => {
    setActiveDay(1);
    scrollToSchedule();
  };

  return (
    <section id="schedule" className="scroll-mt-24 py-12 md:py-16 px-4 bg-[#F8FAFC] border-b border-slate-200/60 overflow-hidden">
      <div ref={containerRef} className="max-w-7xl mx-auto flex flex-col items-stretch">
        
        {/* Section Header */}
        <div className="text-center space-y-1 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-primary text-xs font-bold uppercase tracking-wider mb-2">
            Interactive Timeline
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] text-center mb-2">
            6-Day Comprehensive FDP Schedule
          </h2>
          <p className="max-w-2xl mx-auto text-slate-500 text-xs sm:text-sm font-semibold uppercase tracking-wider">
            December 07 – 12, 2026 | Department of E&TC, Sipna SCOET
          </p>
        </div>

        {/* Day Switcher Tabs */}
        <div className="flex justify-center mb-8 w-full">
          <div className="flex overflow-x-auto no-scrollbar items-center sm:justify-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 bg-slate-200/70 rounded-2xl sm:rounded-full max-w-4xl mx-auto w-full shadow-inner px-2 sm:px-3">
            {days.map((day) => (
              <button
                key={day.id}
                onClick={() => setActiveDay(day.id as 1 | 2 | 3 | 4 | 5 | 6)}
                className="relative py-2.5 px-3 sm:px-4 min-h-[44px] shrink-0 rounded-xl sm:rounded-full font-bold text-xs transition-all duration-200 focus:outline-none cursor-pointer flex flex-col items-center justify-center min-w-[70px] sm:min-w-0"
              >
                {activeDay === day.id && (
                  <motion.div
                    layoutId="activeScheduleTab"
                    className="absolute inset-0 bg-white rounded-xl sm:rounded-full shadow-md"
                    transition={{ type: 'spring', duration: 0.5, bounce: 0.15 }}
                  />
                )}
                <span
                  className={`relative z-10 block transition-colors duration-200 uppercase tracking-wider text-[11px] sm:text-xs font-black ${
                    activeDay === day.id ? 'text-[#1D4ED8]' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {day.label}
                </span>
                <span
                  className={`relative z-10 block transition-colors duration-200 text-[9px] sm:text-[10px] font-medium ${
                    activeDay === day.id ? 'text-blue-600 font-bold' : 'text-slate-400'
                  }`}
                >
                  {day.date.split(' ').slice(0, 2).join(' ')}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Height Rendering: active day container wraps height with zero blank gap */}
        <div className="w-full py-4 md:py-6 h-auto min-h-0 transition-all duration-300">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="w-full h-auto"
            >
              <DayTimeline
                items={scheduleData[activeDay]}
                isActive={true}
                nextActionLabel={
                  activeDay === 1
                    ? "Proceed to Day 2 Schedule →"
                    : activeDay === 2
                    ? "Proceed to Day 3 Schedule →"
                    : activeDay === 3
                    ? "Proceed to Day 4 Schedule →"
                    : activeDay === 4
                    ? "Proceed to Day 5 Schedule →"
                    : activeDay === 5
                    ? "Proceed to Day 6 Schedule →"
                    : "← Back to Day 1 Schedule"
                }
                onNextAction={
                  activeDay === 1
                    ? () => handleNextDay(2)
                    : activeDay === 2
                    ? () => handleNextDay(3)
                    : activeDay === 3
                    ? () => handleNextDay(4)
                    : activeDay === 4
                    ? () => handleNextDay(5)
                    : activeDay === 5
                    ? () => handleNextDay(6)
                    : handleBackToDay1
                }
              />
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
