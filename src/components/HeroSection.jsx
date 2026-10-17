import { useState } from 'react';
import { Globe } from 'lucide-react';
import { FourPointStar } from './FourPointStar';
import { PORTFOLIO_DATA } from '../data';

export function HeroSection() {
  const [lensPos, setLensPos] = useState({ x: 0, y: 0, isHovered: false });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setLensPos({ x, y, isHovered: true });
  };

  const handleMouseLeave = () => {
    setLensPos(prev => ({ ...prev, isHovered: false }));
  };

  return (
    <section className="relative pt-2 pb-12 sm:pb-16 px-6 sm:px-10 border-b border-white/[0.08] overflow-hidden">
      
      {/* Ambient Glow Behind Portrait */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 w-[360px] sm:w-[540px] h-[360px] sm:h-[540px] bg-brand/20 rounded-full blur-[130px] pointer-events-none animate-pulse-glow" />

      {/* GIANT BACKGROUND "PORTFOLIO" TEXT */}
      <div className="relative z-0 select-none pointer-events-none w-full text-center mt-1 sm:mt-2">
        <h1 className="font-display portfolio-giant-text text-[23.5vw] xl:text-[305px] tracking-[-0.02em] uppercase w-full leading-none">
          PORTFOLIO
        </h1>
      </div>

      {/* Foreground Grid Content Overlapping the Giant Text */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end -mt-[14vw] sm:-mt-[210px] xl:-mt-[250px]">
        
        {/* Left Column: Intro, Name, Role, Bio */}
        <div className="lg:col-span-4 space-y-4 sm:space-y-5 order-2 lg:order-1 pt-4 lg:pt-0">
          <div>
            <p className="font-script text-3xl sm:text-4xl text-zinc-200 -mb-2 ml-1 transform -rotate-2">
              {PORTFOLIO_DATA.greeting}
            </p>
            <h2 className="font-display text-5xl sm:text-6xl xl:text-[76px] text-white leading-[0.9] tracking-tight uppercase">
              AL FAIZ<br />AKBAR THAIB
            </h2>
          </div>

          <div className="space-y-2.5">
            <h3 className="text-brand font-extrabold text-sm sm:text-base tracking-[0.08em] uppercase leading-snug">
              {PORTFOLIO_DATA.role}
            </h3>
            <p className="text-zinc-400 text-xs sm:text-[13px] leading-relaxed max-w-sm font-normal">
              {PORTFOLIO_DATA.bio}
            </p>
          </div>

          <div className="pt-2 flex items-center gap-2.5 text-[11px] tracking-[0.16em] text-zinc-300 uppercase font-semibold">
            <span className="w-5 h-5 rounded-full bg-brand/20 border border-brand/50 flex items-center justify-center text-brand">
              <Globe className="w-3 h-3" />
            </span>
            <span>AVAILABLE WORLDWIDE</span>
          </div>
        </div>

        {/* Center Column: Portrait with Interactive Ultraman Tiga Morph/Hover Reveal */}
        <div className="lg:col-span-5 flex flex-col items-center justify-end relative order-1 lg:order-2">
          <div 
            id="hero-portrait-container"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-[300px] sm:w-[380px] md:w-[420px] lg:w-[460px] aspect-[9/14] flex items-end justify-center cursor-crosshair select-none group"
          >
            {/* Dynamic Ambient Glow Behind Portrait */}
            <div className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] rounded-full blur-[100px] pointer-events-none scale-110 transition-colors duration-700 ${
              lensPos.isHovered
                ? 'bg-cyan-500/25'
                : 'bg-brand/35 animate-pulse-glow'
            }`} />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-52 h-52 bg-brand-darker/40 rounded-full blur-[70px] pointer-events-none" />

            {/* BASE LAYER: User Portrait (Al Faiz Akbar Thaib) - Body parts under hover disappear completely */}
            <div 
              className="relative z-10 w-full h-full flex items-end justify-center pointer-events-none transition-opacity duration-200"
              style={{
                maskImage: lensPos.isHovered 
                  ? `radial-gradient(circle 220px at ${lensPos.x}px ${lensPos.y}px, transparent 0%, transparent 60%, rgba(0,0,0,0.4) 80%, black 100%)`
                  : 'none',
                WebkitMaskImage: lensPos.isHovered 
                  ? `radial-gradient(circle 220px at ${lensPos.x}px ${lensPos.y}px, transparent 0%, transparent 60%, rgba(0,0,0,0.4) 80%, black 100%)`
                  : 'none',
              }}
            >
              <img 
                src="/portrait_hero_final.png" 
                alt="Al Faiz Akbar Thaib Portrait"
                className="w-full h-full object-contain object-bottom drop-shadow-[0_20px_45px_rgba(0,0,0,0.9)] filter contrast-[1.05] brightness-[1.03]"
              />
            </div>

            {/* OVERLAY LAYER: Ultraman Tiga in Synchronized Pose (100% Solid Full Coverage, No Ghosting) */}
            <div 
              className="absolute inset-0 z-20 w-full h-full flex items-end justify-center pointer-events-none transition-opacity duration-200"
              style={{
                opacity: lensPos.isHovered ? 1 : 0,
                maskImage: `radial-gradient(circle 220px at ${lensPos.x}px ${lensPos.y}px, black 0%, black 60%, rgba(0,0,0,0.6) 80%, transparent 100%)`,
                WebkitMaskImage: `radial-gradient(circle 220px at ${lensPos.x}px ${lensPos.y}px, black 0%, black 60%, rgba(0,0,0,0.6) 80%, transparent 100%)`,
              }}
            >
              <img 
                src="/ultraman_hero_aligned.png" 
                alt="Ultraman Tiga Synchronized Pose"
                className="w-full h-full object-contain object-bottom filter brightness-[1.05] contrast-[1.06]"
              />
            </div>

          </div>
        </div>

        {/* Right Column: Tagline Badge & Experience Metrics */}
        <div className="lg:col-span-3 flex flex-col justify-between space-y-8 order-3">
          
          {/* Floating Sparkle Tagline */}
          <div className="flex items-center gap-3.5 bg-black/50 lg:bg-transparent p-3 lg:p-0 rounded-xl border border-white/5 lg:border-none">
            <div className="relative shrink-0 w-10 h-10 rounded-full border border-white/25 flex items-center justify-center">
              <div className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center">
                <FourPointStar className="w-3 h-3 text-white" />
              </div>
            </div>
            <p className="text-xs text-zinc-300 leading-snug max-w-[150px]">
              {PORTFOLIO_DATA.tagline}
            </p>
          </div>

          {/* Stats List with Dividers */}
          <div className="divide-y divide-white/10 border-t border-white/10 w-full lg:max-w-[210px] ml-auto">
            {PORTFOLIO_DATA.stats.map((stat, idx) => (
              <div key={idx} className="py-3.5 flex items-center justify-between gap-4 group">
                <span className="font-display text-3xl sm:text-4xl text-brand tracking-tight group-hover:scale-105 transition-transform">
                  {stat.value}
                </span>
                <span className="text-[10px] tracking-[0.16em] text-zinc-400 uppercase whitespace-pre-line text-right leading-tight font-medium">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
