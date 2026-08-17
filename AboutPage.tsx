import React from 'react';
import { PageId } from '../types';
import { 
  Award, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Lightbulb, 
  Compass, 
  ShieldCheck, 
  Cpu, 
  Users, 
  Calendar, 
  FileText,
  TrendingUp,
  Target,
  ExternalLink,
  Lock
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  onOpenPrivacyModal?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenPrivacyModal }) => {
  return (
    <div className="w-full space-y-20 sm:space-y-28 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="pt-8 sm:pt-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
          <Sparkles size={14} />
          <span>The Story Behind the Concept</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-slate-900 tracking-tight">
          Building Smarter Smartphone Safety
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          GrowGuard began with a simple question: <br className="hidden sm:inline" />
          <span className="font-semibold text-slate-900">“What if a smartphone could adapt to the person using it?”</span>
        </p>
      </section>

      {/* 2. SAMSUNG SOLVE FOR TOMORROW UK JOURNEY */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 lg:p-12 shadow-xl shadow-slate-100 space-y-8">
          
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
              <Award size={14} className="text-amber-600" />
              <span>National Competition Recognition</span>
            </div>
            <h2 className="text-3xl font-display font-bold text-slate-900">
              How GrowGuard Started
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              GrowGuard was developed as an entry for <strong>Samsung Solve for Tomorrow UK</strong>, a national initiative inspiring young innovators to use technology to address critical societal challenges.
            </p>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Through successive phases of empirical research, user interviews, software architecture design, interactive prototyping, and competitive pitching, GrowGuard advanced to the <strong>UK Grand Final</strong>, ultimately finishing as <strong>UK Runner-Up</strong>.
            </p>
          </div>

          {/* Visual Milestone Stepper Timeline */}
          <div className="pt-4">
            <h4 className="text-xs font-bold font-mono uppercase text-slate-500 tracking-wider mb-6">
              The Project Development Milestone Journey:
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
              {[
                { step: '01', title: 'Idea', sub: 'Initial concept sparked by rigid parental apps' },
                { step: '02', title: 'Research', sub: 'Adolescent prefrontal cortex & online harms study' },
                { step: '03', title: 'Development', sub: 'Contextual AI & adaptive sensitivity modeling' },
                { step: '04', title: 'Prototype', sub: 'Interactive 8-stage mobile OS simulation' },
                { step: '05', title: 'Solve for Tomorrow', sub: 'Entry into Samsung UK national programme' },
                { step: '06', title: 'UK Final', sub: 'Selected as top finalist project in London' },
                { step: '07', title: 'Runner-Up 🏆', sub: 'Recognized with national Runner-Up honours' },
              ].map((item, idx) => (
                <div 
                  key={idx}
                  className={`p-4 rounded-2xl border flex flex-col justify-between space-y-2 ${
                    idx === 6 
                      ? 'bg-amber-500/10 border-amber-400 text-amber-950 shadow-md ring-2 ring-amber-400/30' 
                      : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                >
                  <div>
                    <span className="text-[10px] font-mono font-bold text-blue-600 block mb-1">
                      Stage {item.step}
                    </span>
                    <h5 className="font-bold text-sm text-slate-900 font-display">{item.title}</h5>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-500">
            * Note: Samsung Solve for Tomorrow UK provided mentorship and pitch opportunities. GrowGuard is an independent student innovation project and is not owned by or an official product of Samsung Electronics.
          </div>
        </div>
      </section>

      {/* 3. THE PERSON BEHIND GROWGUARD */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-800 shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-8 space-y-5">
              <span className="text-xs font-mono text-blue-400 font-bold uppercase tracking-wider">
                Founder & Project Lead
              </span>

              <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
                The Person Behind GrowGuard
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                GrowGuard was created by a student founder passionate about mathematics, computer science, and practical social problem-solving.
              </p>

              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                Experiencing firsthand how peers reacted to traditional parental control apps — frequently disabling them, acquiring secondary burner phones, or feeling treated like young children at age 16 — sparked a desire to build a system based on respect, developmental science, and progressive trust.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                  <span className="text-xs font-bold text-blue-400 block font-mono">Domain Focus</span>
                  <p className="text-xs text-slate-300 mt-0.5">Applied Math & Systems Engineering</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                  <span className="text-xs font-bold text-emerald-400 block font-mono">Philosophy</span>
                  <p className="text-xs text-slate-300 mt-0.5">Scaffolding, not Surveillance</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800">
                  <span className="text-xs font-bold text-amber-400 block font-mono">Ambition</span>
                  <p className="text-xs text-slate-300 mt-0.5">Reinvent Youth OS Architecture</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 flex flex-col items-center text-center space-y-3">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-xl shadow-blue-600/30 text-2xl font-bold font-display">
                GG
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Student Founder</h4>
                <p className="text-xs text-blue-400 font-mono">Solve for Tomorrow UK Finalist</p>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed pt-1">
                "We don't need stricter locks. We need smartphones smart enough to help young people grow up safely."
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. WHAT WE BELIEVE (3 CORE PRINCIPLES) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Guiding Values
          </span>
          <h2 className="text-3xl font-display font-bold text-slate-900 mt-2">
            What We Believe
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Three foundational principles guiding every architectural decision in GrowGuard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-lg shadow-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-display font-bold text-slate-900">
              1. Safety Should Be Built In
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Young people should not be left alone to navigate predatory algorithms, financial scams, and social manipulation. Safety should be a fundamental property of the operating system, integrated directly into the kernel and hardware.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-lg shadow-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-200">
              <TrendingUp size={24} />
            </div>
            <h3 className="text-xl font-display font-bold text-slate-900">
              2. Protection Should Adapt
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              A 10-year-old child and a 17-year-old young adult have vastly different cognitive, social, and emotional needs. Safety systems must evolve dynamically alongside their maturity rather than enforcing static rules for years.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-lg shadow-slate-100">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
              <Compass size={24} />
            </div>
            <h3 className="text-xl font-display font-bold text-slate-900">
              3. Independence Should Be Earned
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              The goal of technology guardrails is not permanent restriction. By rewarding healthy habits and responsible digital navigation, technology empowers young people to develop lifelong executive self-regulation.
            </p>
          </div>

        </div>
      </section>

      {/* 5. OUR VISION & LOOKING AHEAD */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-800 shadow-2xl space-y-8">
          
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
              Future Trajectory
            </span>
            <h2 className="text-3xl font-display font-bold text-white">
              Our Vision & Looking Ahead
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              GrowGuard represents a long-term vision to rethink mobile operating systems for youth. Rather than downloadable afterthoughts, mobile platforms should natively support adolescent growth.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-blue-400 font-bold">Phase 1</span>
              <h4 className="text-sm font-bold text-white">Longitudinal User Studies</h4>
              <p className="text-xs text-slate-400 leading-snug">
                Conducting controlled testing with diverse family cohorts to validate sensitivity curves.
              </p>
            </div>

            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-indigo-400 font-bold">Phase 2</span>
              <h4 className="text-sm font-bold text-white">On-Device NPU Optimization</h4>
              <p className="text-xs text-slate-400 leading-snug">
                Quantizing transformer safety models for low-power edge execution on mobile chips.
              </p>
            </div>

            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold">Phase 3</span>
              <h4 className="text-sm font-bold text-white">Ethics & Bias Auditing</h4>
              <p className="text-xs text-slate-400 leading-snug">
                Independent child safety and algorithmic fairness reviews across diverse dialects.
              </p>
            </div>

            <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-amber-400 font-bold">Phase 4</span>
              <h4 className="text-sm font-bold text-white">OS Industry Partnerships</h4>
              <p className="text-xs text-slate-400 leading-snug">
                Engaging with mobile hardware OEMs and OS maintainers on kernel integration.
              </p>
            </div>

          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p>
              GrowGuard is committed to open dialogue with researchers, parents, educators, and technology leaders.
            </p>
            {onOpenPrivacyModal && (
              <button
                onClick={onOpenPrivacyModal}
                className="text-blue-400 hover:text-blue-300 font-medium underline flex items-center gap-1 shrink-0"
              >
                <Lock size={12} />
                <span>Review Privacy Charter</span>
              </button>
            )}
          </div>

        </div>
      </section>

      {/* 6. CLOSING TAGLINE & CALL TO ACTION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-6">
        <h3 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
          “A Smartphone That Grows With You.”
        </h3>
        <p className="text-slate-600 text-sm max-w-xl mx-auto">
          Explore the interactive prototype or examine the underlying contextual AI architecture.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={() => {
              onNavigate('prototype');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-xl shadow-blue-600/30 transition-all inline-flex items-center justify-center gap-2"
          >
            <span>Explore Interactive Prototype</span>
            <ArrowRight size={14} />
          </button>

          <button
            onClick={() => {
              onNavigate('ai');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-semibold text-xs transition-all inline-flex items-center justify-center gap-2"
          >
            <span>View AI Technology Specs</span>
          </button>
        </div>
      </section>

    </div>
  );
};
