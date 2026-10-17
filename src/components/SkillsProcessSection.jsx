import { useState } from 'react';
import { Search, Lightbulb, PenTool, Code, Send } from 'lucide-react';
import { FourPointStar } from './FourPointStar';
import { PORTFOLIO_DATA } from '../data';

const ICON_MAP = {
  Search,
  Lightbulb,
  PenTool,
  Code,
  Send
};

export function SkillsProcessSection() {
  const [activeProcess, setActiveProcess] = useState("01");
  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <section id="skills" className="grid grid-cols-1 lg:grid-cols-12 border-b border-white/[0.08]">
      
      {/* Column 1: EDUCATION & SKILLS (5 cols) */}
      <div className="lg:col-span-5 p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-white/[0.08] flex flex-col justify-between space-y-8">
        <div className="space-y-6">
          <h2 className="text-base sm:text-lg font-extrabold tracking-[0.12em] uppercase text-white">
            EDUCATION & SKILLS
          </h2>

          {/* Education Block */}
          <div className="space-y-4">
            <p className="text-[11px] font-bold tracking-[0.18em] text-brand uppercase">
              EDUCATION
            </p>

            <div className="divide-y divide-white/[0.08]">
              {PORTFOLIO_DATA.education.map((edu, index) => (
                <div key={index} className="py-3.5 first:pt-0 last:pb-0 group">
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="text-xs sm:text-[13px] font-bold text-white group-hover:text-brand transition-colors">
                      {edu.degree}
                    </h4>
                    <span className="text-[10px] font-semibold tracking-wider text-brand whitespace-nowrap">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 mt-1">{edu.school}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills Block */}
        <div className="space-y-4 pt-2 border-t border-white/[0.08]">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold tracking-[0.18em] text-brand uppercase">
              SKILLS
            </p>
            {hoveredSkill && (
              <span className="text-[10px] tracking-widest text-zinc-400 uppercase animate-fade-in">
                Proficiency: <strong className="text-brand">{hoveredSkill.level}</strong>
              </span>
            )}
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {PORTFOLIO_DATA.skills.map((skill, idx) => (
              <button
                key={idx}
                onMouseEnter={() => setHoveredSkill(skill)}
                onMouseLeave={() => setHoveredSkill(null)}
                className="px-2 py-2 text-[9px] sm:text-[10px] tracking-[0.12em] font-semibold uppercase text-zinc-300 bg-surface-skill border border-white/10 rounded hover:border-brand hover:text-white hover:bg-brand/10 transition-all text-center truncate cursor-pointer"
              >
                {skill.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Column 2: WORK PROCESS (4 cols) */}
      <div id="process" className="lg:col-span-4 p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-white/[0.08]">
        <h2 className="text-base sm:text-lg font-extrabold tracking-[0.12em] uppercase text-white mb-7">
          WORK PROCESS
        </h2>

        <div className="relative space-y-6">
          {PORTFOLIO_DATA.workProcess.map((item, index) => {
            const IconComponent = ICON_MAP[item.iconName];
            const isActive = activeProcess === item.step;
            return (
              <div 
                key={item.step}
                onMouseEnter={() => setActiveProcess(item.step)}
                onClick={() => setActiveProcess(item.step)}
                className="relative flex items-start gap-4 group cursor-pointer"
              >
                {/* Vertical Connecting Line between icons */}
                {index !== PORTFOLIO_DATA.workProcess.length - 1 && (
                  <div className="absolute left-[46px] top-9 bottom-[-24px] w-[1px] bg-gradient-to-b from-brand/60 to-white/10" />
                )}

                {/* Step Number */}
                <span className={`font-display text-lg w-6 pt-1 transition-colors ${
                  isActive ? 'text-brand' : 'text-brand/70'
                }`}>
                  {item.step}
                </span>

                {/* Circular Icon Node */}
                <div className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 shrink-0 ${
                  isActive 
                    ? 'bg-brand/20 border-brand text-white shadow-[0_0_20px_rgba(255,94,0,0.4)]' 
                    : 'bg-[#121212] border-white/15 text-zinc-400 group-hover:border-brand/60'
                }`}>
                  {IconComponent && <IconComponent className="w-4 h-4" />}
                </div>

                {/* Step Title & Description */}
                <div className="space-y-1 pt-0.5">
                  <h4 className="text-xs font-extrabold tracking-[0.14em] text-brand uppercase">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-zinc-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Column 3: WARM ACCENT QUOTE PANEL (3 cols) */}
      <div className="lg:col-span-3 relative p-7 sm:p-9 flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#381604] via-[#1c0c03] to-[#0a0502]">
        {/* Ambient Orange Glow */}
        <div className="absolute -right-12 -top-12 w-44 h-44 bg-brand/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-12 bottom-0 w-44 h-44 bg-brand/15 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-5">
          {/* Giant Quote Mark */}
          <span className="font-display text-6xl text-brand leading-none block select-none">
            &ldquo;
          </span>

          <p className="text-base sm:text-lg text-zinc-100 font-normal leading-snug -mt-4">
            Great software combines clean architecture with effortless user experience.
          </p>

          {/* Handwritten Signature */}
          <div className="pt-2">
            <p className="font-script text-4xl text-zinc-200 tracking-wide transform -rotate-3">
              {PORTFOLIO_DATA.nickname || "Al Faiz"}
            </p>
          </div>
        </div>

        <div className="relative z-10 pt-12 space-y-3">
          <p className="text-[10px] font-bold tracking-[0.18em] text-zinc-300 uppercase leading-relaxed">
            LET'S CREATE<br />
            SOMETHING GREAT<br />
            TOGETHER.
          </p>
          <FourPointStar className="w-3.5 h-3.5 text-brand" />
        </div>
      </div>

    </section>
  );
}
