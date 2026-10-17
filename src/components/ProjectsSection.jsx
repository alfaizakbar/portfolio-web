import { ArrowRight, ExternalLink } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data';

export function ProjectsSection({ onSelectProject, onShowAllProjects }) {
  return (
    <section id="projects" className="py-12 sm:py-14 px-6 sm:px-10 border-b border-white/[0.08]">
      
      {/* Section Header with Horizontal Line */}
      <div className="flex items-center justify-between gap-6 mb-9">
        <h2 className="text-base sm:text-lg font-extrabold tracking-[0.12em] uppercase text-white whitespace-nowrap">
          SELECTED PROJECTS
        </h2>
        <div className="h-[1px] bg-white/10 flex-grow hidden sm:block" />
        <button 
          onClick={onShowAllProjects}
          className="group flex items-center gap-3 text-[11px] tracking-[0.18em] text-zinc-400 hover:text-white uppercase font-semibold whitespace-nowrap transition-colors cursor-pointer"
        >
          <span>VIEW ALL PROJECTS</span>
          <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-brand group-hover:translate-x-1 transition-all" />
        </button>
      </div>

      {/* 3-Column Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PORTFOLIO_DATA.projects.slice(0, 3).map((project) => (
          <div 
            key={project.id}
            onClick={() => onSelectProject(project)}
            className="group cursor-pointer flex flex-col justify-between"
          >
            {/* Website Mockup Frame */}
            <div className="relative aspect-[16/10] rounded-lg overflow-hidden border bg-surface-card border-white/10 text-white transition-all duration-500 group-hover:border-brand/60 group-hover:shadow-[0_10px_40px_-10px_rgba(255,94,0,0.3)]">
              
              {/* Mini Mockup Top Navbar */}
              <div className="relative z-20 flex items-center justify-between px-4 py-2.5 text-[7px] tracking-[0.2em] uppercase font-bold text-zinc-400 bg-black/40 backdrop-blur-sm border-b border-white/5">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/80" />
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500/80" />
                  <span className="ml-2 text-zinc-300 truncate max-w-[110px]">{project.tag || project.category}</span>
                </div>
                <div className="flex items-center gap-2 opacity-75 text-[6.5px]">
                  <span>OVERVIEW</span>
                  <span>STACK</span>
                </div>
              </div>

              {/* Card Background Image & Custom Layout Overlay */}
              <div className="relative h-full w-full flex items-center px-5 pb-6">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="absolute right-0 top-0 w-3/5 h-full object-cover object-center opacity-75 group-hover:scale-105 group-hover:opacity-90 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c0e] via-[#0c0c0e]/85 to-transparent" />
                <div className="relative z-10 space-y-1.5 max-w-[62%]">
                  <p className="font-display text-lg sm:text-xl tracking-wide text-white leading-tight whitespace-pre-line uppercase">
                    {project.heroTitle}
                  </p>
                  <p className="text-[8.5px] tracking-[0.22em] text-brand font-bold uppercase">
                    {project.heroSubtitle}
                  </p>
                  <p className="text-[7.5px] tracking-[0.16em] text-zinc-400 pt-1 uppercase">
                    {project.heroDesc}
                  </p>
                </div>
              </div>

              {/* Hover Quick View Pill */}
              <div className="absolute bottom-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity bg-brand text-white text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded flex items-center gap-1 shadow-lg">
                <span>VIEW CASE STUDY</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </div>
            </div>

            {/* Project Number, Title & Arrow Footer */}
            <div className="pt-4 pb-1 flex items-center justify-between border-b border-white/[0.07] group-hover:border-brand/50 transition-colors">
              <div className="flex items-baseline gap-3.5">
                <span className="font-display text-2xl sm:text-3xl text-brand leading-none">
                  {project.id}
                </span>
                <div>
                  <h3 className="text-xs font-bold tracking-[0.14em] text-white uppercase group-hover:text-brand transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-[10px] tracking-[0.12em] text-zinc-500 uppercase mt-0.5">
                    {project.category}
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
