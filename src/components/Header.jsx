import { Globe } from 'lucide-react';
import { FourPointStar } from './FourPointStar';
import { PORTFOLIO_DATA } from '../data';

export function Header({ onOpenContact }) {
  return (
    <header className="relative z-20 flex items-center justify-between px-6 sm:px-10 pt-6 pb-2 text-[10px] sm:text-xs tracking-[0.2em] uppercase">
      <div className="leading-tight">
        <p className="text-brand font-bold">{PORTFOLIO_DATA.roleHeaderTop}</p>
        <p className="text-zinc-400 font-medium">{PORTFOLIO_DATA.roleHeaderSub}</p>
      </div>

      <nav className="hidden md:flex items-center gap-8 text-[11px] text-zinc-400 font-medium">
        <a href="#projects" className="hover:text-white transition-colors duration-300">PROJECTS</a>
        <a href="#skills" className="hover:text-white transition-colors duration-300">EDUCATION & SKILLS</a>
        <a href="#process" className="hover:text-white transition-colors duration-300">PROCESS</a>
        <a href="#contact" className="hover:text-white transition-colors duration-300">CONTACT</a>
      </nav>

      <button 
        onClick={onOpenContact}
        className="group flex items-center gap-2.5 text-zinc-300 hover:text-white transition-colors cursor-pointer"
      >
        <span className="font-semibold tracking-[0.18em] hidden sm:inline">AVAILABLE FOR FREELANCE</span>
        <FourPointStar className="w-3.5 h-3.5 text-brand group-hover:rotate-90 transition-transform duration-300" />
      </button>
    </header>
  );
}
