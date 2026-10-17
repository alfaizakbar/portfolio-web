import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';

import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsProcessSection } from './components/SkillsProcessSection';
import { FooterSection } from './components/FooterSection';
import { ProjectModal, ContactModal, AllProjectsModal } from './components/Modals';

export default function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [copiedText, setCopiedText] = useState("");
  const [showAllProjectsModal, setShowAllProjectsModal] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(""), 2500);
  };

  return (
    <div className="min-h-screen bg-surface-alt text-white font-sans overflow-x-hidden relative">

      {/* Interactive Ambient Cursor Spotlight */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-500 hidden lg:block"
        style={{
          background: `radial-gradient(550px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 94, 0, 0.055), transparent 70%)`
        }}
      />

      {/* Toast Notification for Copy */}
      {copiedText && (
        <div className="fixed bottom-6 right-6 z-50 bg-surface-elevated border border-brand/60 text-white px-4 py-3 rounded-lg shadow-2xl flex items-center gap-2.5 animate-slide-up">
          <Check className="w-4 h-4 text-brand" />
          <span className="text-xs tracking-wider uppercase font-semibold">{copiedText} Copied to clipboard!</span>
        </div>
      )}

      {/* Main Container Poster Wrapper */}
      <div className="max-w-[1280px] mx-auto bg-surface border-x border-white/[0.07] shadow-[0_0_120px_rgba(0,0,0,0.9)] relative overflow-hidden">
        
        <Header onOpenContact={() => setIsContactModalOpen(true)} />
        
        <HeroSection />
        
        <ProjectsSection 
          onSelectProject={setSelectedProject}
          onShowAllProjects={() => setShowAllProjectsModal(true)}
        />
        
        <SkillsProcessSection />
        
        <FooterSection 
          onOpenContact={() => setIsContactModalOpen(true)}
          onCopy={handleCopy}
        />

      </div>

      {/* Modals */}
      <ProjectModal 
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenContact={() => setIsContactModalOpen(true)}
      />

      <ContactModal 
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      <AllProjectsModal 
        isOpen={showAllProjectsModal}
        onClose={() => setShowAllProjectsModal(false)}
        onSelectProject={setSelectedProject}
      />

    </div>
  );
}
