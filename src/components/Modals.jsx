import { useState } from 'react';
import { X, Check, ArrowRight, Send } from 'lucide-react';
import { FourPointStar } from './FourPointStar';
import { PORTFOLIO_DATA } from '../data';

/* ============= PROJECT DETAIL MODAL ============= */
export function ProjectModal({ project, onClose, onOpenContact }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-surface-card border border-white/15 rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(255,94,0,0.25)]">
        
        {/* Modal Top Image Header */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-black">
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface-card via-surface-card/40 to-transparent" />
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 border border-white/20 text-white hover:bg-brand hover:border-brand flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase bg-brand text-white px-2.5 py-1 rounded">
                {project.category}
              </span>
              <h3 className="font-display text-3xl sm:text-4xl text-white uppercase mt-2">
                {project.id} — {project.title}
              </h3>
            </div>
            <span className="text-xs text-zinc-400 font-mono">{project.year}</span>
          </div>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <p className="text-sm text-zinc-300 leading-relaxed">
            {project.description}
          </p>

          <div className="space-y-2.5">
            <h4 className="text-[11px] font-bold tracking-[0.18em] text-brand uppercase">
              SCOPE & DELIVERABLES
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.deliverables.map((item, i) => (
                <span 
                  key={i}
                  className="text-xs bg-white/5 border border-white/10 text-zinc-200 px-3 py-1.5 rounded-md"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-zinc-500 block">CLIENT</span>
              <span className="text-xs font-semibold text-white">{project.client}</span>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className="bg-brand hover:bg-brand-dark text-white text-xs font-bold tracking-[0.15em] uppercase px-5 py-3 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
            >
              <span>INQUIRE SIMILAR PROJECT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

/* ============= CONTACT MODAL ============= */
export function ContactModal({ isOpen, onClose }) {
  const [contactForm, setContactForm] = useState({ name: "", email: "", projectType: "Website Design", message: "" });
  const [formSubmitted, setFormSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      onClose();
      setContactForm({ name: "", email: "", projectType: "Website Design", message: "" });
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-lg bg-[#0d0d0d] border border-white/15 rounded-2xl p-6 sm:p-8 shadow-[0_0_80px_rgba(255,94,0,0.3)]">
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-brand text-zinc-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {formSubmitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-brand/20 border border-brand text-brand flex items-center justify-center mx-auto">
              <Check className="w-7 h-7" />
            </div>
            <h3 className="font-display text-3xl uppercase text-white tracking-wide">
              MESSAGE RECEIVED!
            </h3>
            <p className="text-xs text-zinc-400 max-w-xs mx-auto leading-relaxed">
              Thank you for reaching out. {PORTFOLIO_DATA.nickname || "Al Faiz"} will review your project brief and respond within 24 hours.
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-1 mb-6">
              <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-brand uppercase">
                <FourPointStar className="w-3 h-3" />
                <span>AVAILABLE FOR FREELANCE & COLLABORATION</span>
              </div>
              <h3 className="font-display text-3xl text-white uppercase tracking-wide">
                LET'S START A PROJECT
              </h3>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold tracking-[0.16em] text-zinc-400 uppercase mb-1.5">
                  YOUR NAME
                </label>
                <input 
                  type="text" 
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                  placeholder="John Doe"
                  className="w-full bg-surface-input border border-white/10 focus:border-brand rounded-lg px-3.5 py-2.5 text-xs text-white outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-[0.16em] text-zinc-400 uppercase mb-1.5">
                  EMAIL ADDRESS
                </label>
                <input 
                  type="email" 
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                  placeholder="john@company.com"
                  className="w-full bg-surface-input border border-white/10 focus:border-brand rounded-lg px-3.5 py-2.5 text-xs text-white outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-[0.16em] text-zinc-400 uppercase mb-1.5">
                  SERVICE NEEDED
                </label>
                <select 
                  value={contactForm.projectType}
                  onChange={(e) => setContactForm({...contactForm, projectType: e.target.value})}
                  className="w-full bg-surface-input border border-white/10 focus:border-brand rounded-lg px-3.5 py-2.5 text-xs text-white outline-none transition-colors"
                >
                  <option>Web Application (Laravel / React)</option>
                  <option>Mobile App Development (Flutter)</option>
                  <option>Robotic Process Automation (UiPath)</option>
                  <option>Database & REST API Integration</option>
                  <option>Full-Stack Custom Development</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold tracking-[0.16em] text-zinc-400 uppercase mb-1.5">
                  PROJECT DETAILS
                </label>
                <textarea 
                  rows={3}
                  required
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  placeholder="Tell me about your system requirements, timeline, and goals..."
                  className="w-full bg-surface-input border border-white/10 focus:border-brand rounded-lg px-3.5 py-2.5 text-xs text-white outline-none transition-colors resize-none"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-brand hover:bg-brand-dark text-white font-bold text-xs tracking-[0.18em] uppercase py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>SEND INQUIRY</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

/* ============= ALL PROJECTS MODAL ============= */
export function AllProjectsModal({ isOpen, onClose, onSelectProject }) {
  if (!isOpen) return null;

  const allProjects = PORTFOLIO_DATA.projects;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-3xl bg-[#0d0d0d] border border-white/15 rounded-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-brand uppercase">ARCHIVE (2022 — 2025)</p>
            <h3 className="font-display text-3xl text-white uppercase mt-1">ALL SELECTED WORKS</h3>
          </div>
          <button 
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-brand text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="divide-y divide-white/10 my-4">
          {allProjects.map((proj) => (
            <div 
              key={proj.id}
              onClick={() => {
                onClose();
                onSelectProject(proj);
              }}
              className="py-4 flex items-center justify-between hover:bg-white/[0.02] px-3 rounded-lg transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <span className="font-display text-2xl text-brand">{proj.id}</span>
                <div>
                  <h4 className="text-sm font-bold text-white group-hover:text-brand transition-colors uppercase tracking-wider">
                    {proj.title}
                  </h4>
                  <p className="text-[11px] text-zinc-500 uppercase tracking-widest">{proj.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-zinc-500 font-mono">{proj.year}</span>
                <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-brand group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
