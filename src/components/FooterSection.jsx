import { ArrowRight, Mail, Phone, MapPin, Globe, Copy } from 'lucide-react';
import { FourPointStar } from './FourPointStar';
import { PORTFOLIO_DATA } from '../data';

export function FooterSection({ onOpenContact, onCopy }) {
  return (
    <footer id="contact" className="relative pt-12 pb-12 px-6 sm:px-10 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        
        {/* Left Column: LET'S WORK TOGETHER */}
        <div className="lg:col-span-4 space-y-4">
          <div className="relative inline-block">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-[0.06em] uppercase text-white leading-tight">
              LET'S WORK<br />TOGETHER
            </h2>
            <FourPointStar className="w-4 h-4 text-brand absolute -right-6 bottom-1.5" />
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed max-w-xs">
            I'm currently open for new projects and collaborations. Let's create something amazing that gets results.
          </p>

          <div className="pt-2 flex items-center gap-4">
            <button
              onClick={onOpenContact}
              className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.18em] uppercase text-brand hover:text-white transition-colors cursor-pointer"
            >
              <span className="w-4 h-4 rounded-full bg-brand/20 border border-brand flex items-center justify-center">
                <ArrowRight className="w-2.5 h-2.5 text-brand" />
              </span>
              <span>AVAILABLE FOR FREELANCE</span>
            </button>
          </div>
        </div>

        {/* Center Column: Interactive Contact Details List */}
        <div className="lg:col-span-4 divide-y divide-white/[0.08] border-y border-white/[0.08] lg:border-y-0">
          
          {/* Email */}
          <div 
            onClick={() => onCopy(PORTFOLIO_DATA.email, "Email")}
            className="py-3 flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-full bg-surface-elevated border border-brand/40 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-colors">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs text-zinc-300 group-hover:text-white transition-colors">
                {PORTFOLIO_DATA.email}
              </span>
            </div>
            <Copy className="w-3.5 h-3.5 text-zinc-600 group-hover:text-brand transition-colors" />
          </div>

          {/* Website */}
          <div 
            onClick={() => onCopy(PORTFOLIO_DATA.website, "Website URL")}
            className="py-3 flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-full bg-surface-elevated border border-brand/40 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-colors">
                <Globe className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs text-zinc-300 group-hover:text-white transition-colors">
                {PORTFOLIO_DATA.website}
              </span>
            </div>
            <Copy className="w-3.5 h-3.5 text-zinc-600 group-hover:text-brand transition-colors" />
          </div>

          {/* Phone */}
          <div 
            onClick={() => onCopy(PORTFOLIO_DATA.phone, "Phone Number")}
            className="py-3 flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-full bg-surface-elevated border border-brand/40 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs text-zinc-300 group-hover:text-white transition-colors">
                {PORTFOLIO_DATA.phone}
              </span>
            </div>
            <Copy className="w-3.5 h-3.5 text-zinc-600 group-hover:text-brand transition-colors" />
          </div>

          {/* Location */}
          <div className="py-3 flex items-center justify-between group">
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-full bg-surface-elevated border border-brand/40 flex items-center justify-center text-brand">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs text-zinc-300">
                {PORTFOLIO_DATA.location}
              </span>
            </div>
          </div>

        </div>

        {/* Right Column: Laptop Showcase */}
        <div className="lg:col-span-4 relative flex items-end justify-center lg:justify-end pt-4 lg:pt-0">
          {/* Subtle red underglow */}
          <div className="absolute -bottom-6 right-8 w-56 h-24 bg-brand/25 blur-2xl rounded-full pointer-events-none" />

          <div className="relative flex items-end gap-3">
            {/* Matte Black Coffee Mug with "R" Logo */}
            <div className="relative w-14 h-16 bg-gradient-to-br from-zinc-800 via-zinc-900 to-black rounded-b-lg rounded-t-sm border border-white/10 shadow-2xl flex items-center justify-center mb-1 shrink-0">
              {/* Mug Handle */}
              <div className="absolute -left-2.5 top-2.5 w-3 h-9 border-2 border-zinc-800 rounded-l-md" />
              <span className="font-serif-editorial text-xs text-zinc-400 font-bold">A</span>
            </div>

            {/* Sleek Laptop Mockup */}
            <div 
              onClick={onOpenContact}
              className="group cursor-pointer relative w-64 sm:w-72"
            >
              {/* Laptop Screen */}
              <div className="relative aspect-[16/10] bg-[#0c0c0c] rounded-t-xl border-[3px] border-zinc-800 p-3.5 overflow-hidden shadow-2xl group-hover:border-brand/60 transition-colors">
                {/* Diagonal Red Graphic Shape Inside Laptop Screen */}
                <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-gradient-to-tl from-brand to-brand-darker transform rotate-12 opacity-90 group-hover:scale-110 transition-transform duration-500" />
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[6px] tracking-widest text-zinc-500 uppercase">
                    <span>AL FAIZ LAB</span>
                    <span className="text-brand">● LIVE</span>
                  </div>
                  <div className="space-y-1 my-auto">
                    <p className="font-display text-sm sm:text-base leading-tight text-white uppercase tracking-wide">
                      ENGINEERING<br />SCALABLE<br />SOFTWARE<br />SOLUTIONS
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-[7px] text-brand font-bold tracking-wider uppercase">
                    <span>START A PROJECT</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </div>
                </div>
              </div>
              {/* Laptop Base Chin */}
              <div className="h-2.5 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 rounded-b-xl mx-[-8px] shadow-xl flex justify-center">
                <div className="w-10 h-1 bg-zinc-900 rounded-b" />
              </div>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}
