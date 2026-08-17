import React from 'react';
import { PageId } from '../types';
import { Logo } from './Logo';
import { Award, ShieldCheck, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenPrivacyModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPrivacyModal }) => {
  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#0F131A] text-slate-400 border-t border-slate-800 text-xs py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pb-8 border-b border-slate-800/80">
          
          {/* Brand & Concept summary (5 Cols) */}
          <div className="md:col-span-5 space-y-3">
            <Logo variant="white" size="md" showTagline={true} />
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              A proposed smartphone operating system and integrated safety system designed specifically for young people under 18. Developed around developmental neuroscience, contextual AI safety monitoring, and graduated independence.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 text-[11px]">
              <Award size={14} className="text-amber-400 shrink-0" />
              <span>Samsung Solve for Tomorrow UK — UK Runner-Up</span>
            </div>
          </div>

          {/* Page Links (4 Cols) */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider mb-2.5 font-mono">Architecture</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => handleNav('home')} className="hover:text-white transition-colors">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('product')} className="hover:text-white transition-colors">
                    Product Systems
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('ai')} className="hover:text-white transition-colors">
                    AI Technology
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider mb-2.5 font-mono">Evaluation</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => handleNav('prototype')} className="hover:text-white transition-colors">
                    Interactive Prototype
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('research')} className="hover:text-white transition-colors">
                    Neuroscience Research
                  </button>
                </li>
                <li>
                  <button onClick={() => handleNav('about')} className="hover:text-white transition-colors">
                    About the Project
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Ethics & Integrity (3 Cols) */}
          <div className="md:col-span-3 space-y-2.5">
            <h4 className="font-semibold text-slate-200 text-xs uppercase tracking-wider font-mono">Privacy & Ethics</h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              GrowGuard is an academic and prototype technology concept. Real-world implementation requires strict data minimization and on-device processing.
            </p>
            <button
              onClick={onOpenPrivacyModal}
              className="inline-flex items-center gap-1.5 text-blue-400 hover:text-blue-300 font-medium text-xs pt-1 group"
            >
              <ShieldCheck size={14} />
              <span>Read Privacy & Ethics Manifesto</span>
              <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} GrowGuard Project. Technology Concept & Operating System Architecture.</p>
          <div className="flex items-center gap-4">
            <span>Adaptive AI Sensitivity™</span>
            <span>GrowGuard AI Safety Monitoring</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
