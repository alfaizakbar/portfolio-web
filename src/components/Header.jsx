import { Plus } from 'lucide-react';
import { FourPointStar } from './FourPointStar';
import { PORTFOLIO_DATA } from '../data';

export function Header({ onOpenContact, onNavigate, currentPath = '/' }) {
  const isAddPage = currentPath === '/add';

  return (
    <header className="relative z-20 flex items-center justify-between px-6 sm:px-10 pt-6 pb-2 text-[10px] sm:text-xs tracking-[0.2em] uppercase">
      {/* Brand / Role click back to home if on add page */}
      <div 
        onClick={() => { if (onNavigate) onNavigate('/'); }}
        className="leading-tight cursor-pointer group"
      >
        <p className="text-brand font-bold group-hover:text-white transition-colors">
          {PORTFOLIO_DATA.roleHeaderTop}
        </p>
        <p className="text-zinc-400 font-medium">
          {PORTFOLIO_DATA.roleHeaderSub}
        </p>
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex items-center gap-7 text-[11px] text-zinc-400 font-medium">
        {isAddPage ? (
          <>
            <a 
              href="/" 
              onClick={(e) => { 
                e.preventDefault(); 
                if (onNavigate) onNavigate('/'); 
              }}
              className="hover:text-white transition-colors duration-300"
            >
              PORTFOLIO HOME
            </a>
            <span className="text-brand font-bold">
              ● ADD PROJECT STUDIO
            </span>
          </>
        ) : (
          <>
            <a href="#projects" className="hover:text-white transition-colors duration-300">PROJECTS</a>
            <a href="#skills" className="hover:text-white transition-colors duration-300">EDUCATION & SKILLS</a>
            <a href="#process" className="hover:text-white transition-colors duration-300">PROCESS</a>
            <a href="#contact" className="hover:text-white transition-colors duration-300">CONTACT</a>
          </>
        )}
      </nav>

      {/* Right Actions: Add Project Button + Available for Freelance */}
      <div className="flex items-center gap-3 sm:gap-4">
        {!isAddPage ? (
          <a
            href="/add"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate('/add');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-brand/50 bg-brand/10 hover:bg-brand text-brand hover:text-white text-[10px] font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(255,94,0,0.2)]"
          >
            <Plus className="w-3 h-3" />
            <span>ADD WORK</span>
          </a>
        ) : (
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              if (onNavigate) onNavigate('/');
            }}
            className="px-3 py-1.5 rounded-full border border-white/20 hover:border-brand text-zinc-300 hover:text-white text-[10px] font-bold tracking-widest uppercase transition-all cursor-pointer"
          >
            VIEW SITE
          </a>
        )}

        <button 
          onClick={onOpenContact}
          className="group flex items-center gap-2 text-zinc-300 hover:text-white transition-colors cursor-pointer"
        >
          <span className="font-semibold tracking-[0.18em] hidden lg:inline">AVAILABLE FOR FREELANCE</span>
          <FourPointStar className="w-3.5 h-3.5 text-brand group-hover:rotate-90 transition-transform duration-300" />
        </button>
      </div>
    </header>
  );
}
