import React, { useState, useRef } from 'react';
import { MapPin, GraduationCap } from 'lucide-react';
import muruganImg from '../assets/speakers/murugan.jpeg';
import jaganMohanImg from '../assets/speakers/jagan-mohan.jpeg';
import triptiGoelImg from '../assets/speakers/tripti-goel.jpeg';
import suryaPrakashImg from '../assets/speakers/surya-prakash.jpeg';
import rohitMundhadaImg from '../assets/speakers/rohit-mundhada.jpeg';
import rahulSharmaImg from '../assets/speakers/rahul-sharma.jpeg';
import sikandarAdwaniImg from '../assets/speakers/sikandar-adwani.jpeg';

interface Speaker {
  name: string;
  tag: string;
  role: string;
  credentials: string;
  image: string;
}

export const SpeakersSection: React.FC = () => {
  const [activeSpotlightIdx, setActiveSpotlightIdx] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const speakers: Speaker[] = [
    {
      name: 'Dr. R. Murugan',
      tag: 'Keynote • Federated Learning',
      role: 'Associate Professor, NIT Puducherry',
      credentials: 'Experience: 17 Years',
      image: muruganImg,
    },
    {
      name: 'Dr. Tripti Goel',
      tag: 'Neuroimaging & GANs',
      role: 'Former Senior Scientist NBRC & Assistant Professor, NIT Silchar',
      credentials: 'Experience: 18 Years',
      image: triptiGoelImg,
    },
    {
      name: 'Dr. Sikandar Adwani',
      tag: 'Neuroscience & Brain Care',
      role: 'Senior Neuro Physician, Radiant Superspeciality Hospital, Amravati',
      credentials: 'Experience: 16 Years',
      image: sikandarAdwaniImg,
    },
    {
      name: 'Dr. Rohit Mundhada',
      tag: 'Clinical Oncology',
      role: 'Surgical Oncologist, Geetai Nursing Home, Amravati',
      credentials: 'Experience: 10 Years',
      image: rohitMundhadaImg,
    },
    {
      name: 'Dr. N. Jagan Mohan',
      tag: 'Medical Imaging & GenAI',
      role: 'Former DRDO Projectee & Specialist Data Scientist, LTIMindtree',
      credentials: 'Experience: 14 Years',
      image: jaganMohanImg,
    },
    {
      name: 'Dr. Rahul Sharma',
      tag: 'Research Methodology',
      role: 'Assistant Professor, LNMIIT Jaipur & Research Associate at IIT Indore',
      credentials: 'Experience: 10 Years',
      image: rahulSharmaImg,
    },
    {
      name: 'Mr. A. Surya Prakash',
      tag: 'Voice AI & Healthcare',
      role: 'Co-Founder & Director, SpicArts.ai',
      credentials: 'Experience: 12 Years',
      image: suryaPrakashImg,
    },
  ];

  const handleCarouselScroll = () => {
    if (carouselRef.current) {
      const { scrollLeft, clientWidth } = carouselRef.current;
      const index = Math.round(scrollLeft / (clientWidth * 0.85));
      setActiveIndex(Math.min(Math.max(index, 0), speakers.length - 1));
    }
  };

  const scrollToSpeaker = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.clientWidth * 0.85;
      carouselRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth',
      });
      setActiveIndex(index);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setActiveSpotlightIdx(index);
  };

  const handleMouseLeave = () => {
    setActiveSpotlightIdx(null);
  };

  const renderCard = (speaker: Speaker, index: number) => {
    return (
      <div
        onMouseMove={(e) => handleMouseMove(e, index)}
        onMouseLeave={handleMouseLeave}
        className="bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-4 md:p-5 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between group h-full w-full relative overflow-hidden cursor-default"
      >
        {/* Spotlight Overlay */}
        {activeSpotlightIdx === index && (
          <div
            className="absolute inset-0 pointer-events-none z-5 transition-opacity duration-300"
            style={{
              background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(29,78,216,0.08), transparent 60%)`,
            }}
          />
        )}

        <div className="relative z-10 flex flex-col">
          {/* Image Container - STRICT 3:4 aspect ratio with object-top */}
          <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden mb-3 bg-slate-900 border border-slate-200/80 shadow-inner">
            <img
              src={speaker.image}
              alt={speaker.name}
              className="w-full h-full object-cover object-top filter transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            {/* Domain Badge */}
            <span className="bg-slate-900/90 backdrop-blur-md text-amber-300 border border-white/20 text-[9px] md:text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full absolute bottom-2 left-2 z-10 shadow-sm">
              {speaker.tag}
            </span>
          </div>

          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-black text-[#0F172A] tracking-tight group-hover:text-blue-700 transition-colors">
              {speaker.name}
            </h3>
            <div className="flex gap-1.5 text-xs font-semibold text-slate-700 items-start mt-0.5 leading-snug">
              <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
              <span>{speaker.role}</span>
            </div>
          </div>
        </div>

        {/* Credentials */}
        <div className="relative z-10 mt-3 border-t border-slate-100 pt-2 flex gap-1.5 text-[11px] md:text-xs text-slate-500 leading-relaxed font-normal">
          <GraduationCap className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span>{speaker.credentials}</span>
        </div>
      </div>
    );
  };

  return (
    <section 
      id="speakers" 
      className="scroll-mt-24 py-12 md:py-16 bg-slate-50/50 border-b border-slate-200/60 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Header Row */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 md:mb-10 gap-3">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-primary text-xs font-black uppercase tracking-wider mb-2">
              Resource Persons
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
              Distinguished Speakers & Experts
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 font-semibold max-w-md">
            Leading researchers, clinical oncologists, neurosurgeons, and data science pioneers across premier institutions.
          </p>
        </div>

        {/* Mobile Horizontal Carousel & Desktop 4 (top) + 3 (centered bottom) Balanced Layout */}
        <div
          ref={carouselRef}
          onScroll={handleCarouselScroll}
          className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 px-2 no-scrollbar md:flex-wrap md:overflow-visible md:justify-center md:gap-6 md:pb-0 md:px-0 max-w-7xl mx-auto"
        >
          {speakers.map((speaker, idx) => (
            <div
              key={speaker.name}
              className="min-w-[85vw] max-w-[90vw] sm:min-w-[320px] md:min-w-0 md:w-[calc(50%-1rem)] lg:w-[calc(25%-1.25rem)] snap-center shrink-0 md:shrink flex"
            >
              {renderCard(speaker, idx)}
            </div>
          ))}
        </div>

        {/* Active Carousel Glowing Indicator Dots (Mobile Viewport) */}
        <div className="flex md:hidden justify-center items-center gap-2 mt-4">
          {speakers.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToSpeaker(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? 'w-7 bg-[#1D4ED8] shadow-[0_0_10px_rgba(29,78,216,0.6)]'
                  : 'w-2 bg-slate-300'
              }`}
              aria-label={`Go to speaker ${index + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
