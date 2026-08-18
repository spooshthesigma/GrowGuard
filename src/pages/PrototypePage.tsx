import React, { useState } from 'react';
import { PageId, PrototypeStep } from '../types';
import { PROTOTYPE_STEPS } from '../data/mockData';
import { PhoneMockup, MockupScreenType } from '../components/PhoneMockup';
import { 
  Smartphone, 
  ExternalLink, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  UserCheck, 
  Sliders, 
  MapPin, 
  Heart, 
  TrendingUp, 
  ArrowRight,
  Info,
  Play,
  RotateCcw
} from 'lucide-react';

interface PrototypePageProps {
  onNavigate: (page: PageId) => void;
}

export const PrototypePage: React.FC<PrototypePageProps> = ({ onNavigate }) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [simulatedAge, setSimulatedAge] = useState<number>(13);
  const [showFigmaNotice, setShowFigmaNotice] = useState<boolean>(false);

  const currentStep = PROTOTYPE_STEPS[activeStepIndex];

  const handleNext = () => {
    if (activeStepIndex < PROTOTYPE_STEPS.length - 1) {
      setActiveStepIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (activeStepIndex > 0) {
      setActiveStepIndex(prev => prev - 1);
    }
  };

  return (
    <div className="w-full space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. HERO SECTION & FIGMA LINK INTEGRATION */}
      <section className="pt-8 sm:pt-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
          <Smartphone size={14} />
          <span>Interactive OS Demonstration</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-slate-900 tracking-tight">
          Explore the GrowGuard Prototype
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Follow the complete journey from initial cryptographic parent setup to everyday contextual protection and graduated adolescent independence.
        </p>

        {/* Figma Prototype Integration Launcher Card */}
        <div className="max-w-xl mx-auto bg-slate-900 text-white rounded-3xl p-5 sm:p-6 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-semibold mb-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Samsung Solve for Tomorrow UK Finalist Prototype</span>
            </div>
            <p className="text-sm font-bold text-white">Full High-Fidelity Figma Prototype</p>
            <p className="text-xs text-slate-400 mt-0.5">Explore the end-to-end interactive mobile canvas.</p>
          </div>

          <button
            onClick={() => setShowFigmaNotice(true)}
            className="w-full sm:w-auto px-5 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-blue-600/30"
          >
            <span>Launch Figma Prototype</span>
            <ExternalLink size={13} />
          </button>
        </div>

        {/* Figma URL Notice Modal / Badge */}
        {showFigmaNotice && (
          <div className="max-w-xl mx-auto p-4 rounded-2xl bg-blue-50 border border-blue-200 text-left text-xs text-blue-950 space-y-2 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="font-bold flex items-center gap-1.5 text-blue-700">
                <Info size={14} /> Figma Embed URL Placeholder
              </span>
              <button 
                onClick={() => setShowFigmaNotice(false)}
                className="text-blue-600 hover:text-blue-900 font-semibold text-[11px]"
              >
                Dismiss
              </button>
            </div>
            <p className="text-blue-900">
              The Figma prototype link from the Samsung Solve for Tomorrow UK submission can be connected directly to your public Figma URL in the prototype deployment config:
            </p>
            <div className="p-2 bg-white rounded-lg border border-blue-200 font-mono text-[11px] text-slate-700 select-all overflow-x-auto">
              https://www.figma.com/proto/growguard-solve-for-tomorrow-uk-final
            </div>
          </div>
        )}
      </section>

      {/* 2. PROGRESS STEPPER STRIP */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-6 shadow-sm overflow-x-auto scrollbar-none">
          <div className="flex items-center justify-between min-w-[720px] gap-2">
            {PROTOTYPE_STEPS.map((step, idx) => {
              const isActive = idx === activeStepIndex;
              const isPast = idx < activeStepIndex;

              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`flex-1 flex flex-col items-center text-center p-2 rounded-2xl transition-all ${
                    isActive
                      ? 'bg-blue-50/90 border border-blue-200 shadow-sm'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs mb-1.5 transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30 ring-2 ring-blue-500/20'
                      : isPast
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-500'
                  }`}>
                    {isPast ? '✓' : step.stepNumber}
                  </div>
                  <span className={`text-[11px] font-bold tracking-tight block truncate max-w-[90px] ${
                    isActive ? 'text-blue-600' : 'text-slate-600'
                  }`}>
                    {step.featureName}
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono block">
                    Step {step.stepNumber}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. MAIN INTERACTIVE SIMULATOR STAGE */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 lg:p-12 shadow-xl shadow-slate-200/40">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Step Explainer & Technical Walkthrough (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
                  Step {currentStep.stepNumber} of 8: {currentStep.techType}
                </span>
                <span className="text-xs font-medium text-slate-400 font-mono">
                  {currentStep.featureName}
                </span>
              </div>

              <div>
                <span className="text-xs text-slate-500 font-medium">{currentStep.subtitle}</span>
                <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight mt-0.5">
                  {currentStep.title}
                </h2>
              </div>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {currentStep.description}
              </p>

              {/* Key Technical Takeaways Checklist */}
              <div className="space-y-2.5 pt-2">
                <h4 className="text-xs font-bold font-mono uppercase text-slate-500 tracking-wider">
                  Operating System Architecture Highlights:
                </h4>
                {currentStep.keyTakeaways.map((takeaway, idx) => (
                  <div 
                    key={idx}
                    className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-3 text-xs text-slate-700"
                  >
                    <CheckCircle2 size={16} className="text-blue-600 shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </div>
                ))}
              </div>

              {/* Step Navigation Controls */}
              <div className="pt-4 flex items-center justify-between gap-4 border-t border-slate-100">
                <button
                  onClick={handlePrev}
                  disabled={activeStepIndex === 0}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    activeStepIndex === 0
                      ? 'opacity-40 cursor-not-allowed text-slate-400 bg-slate-100'
                      : 'text-slate-700 bg-slate-100 hover:bg-slate-200'
                  }`}
                >
                  <ChevronLeft size={16} />
                  <span>Previous Step</span>
                </button>

                <span className="text-xs text-slate-400 font-mono font-medium">
                  {activeStepIndex + 1} / {PROTOTYPE_STEPS.length}
                </span>

                <button
                  onClick={handleNext}
                  disabled={activeStepIndex === PROTOTYPE_STEPS.length - 1}
                  className={`px-6 py-2.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    activeStepIndex === PROTOTYPE_STEPS.length - 1
                      ? 'opacity-40 cursor-not-allowed text-slate-400 bg-slate-100'
                      : 'text-white bg-blue-600 hover:bg-blue-500 shadow-md shadow-blue-600/30'
                  }`}
                >
                  <span>Next Step</span>
                  <ChevronRight size={16} />
                </button>
              </div>

            </div>

            {/* Right: Realistic Smartphone Mockup Displaying Active Step (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/20 to-indigo-500/20 rounded-full blur-2xl opacity-60" />
                
                <PhoneMockup 
                  screenType={currentStep.screenType as MockupScreenType}
                  activeAge={activeStepIndex === 1 ? 14 : activeStepIndex === 7 ? 17 : 13}
                  size="md"
                  deviceColor="charcoal"
                />
              </div>

              <div className="mt-4 text-center">
                <span className="text-xs text-slate-500">
                  Interactive simulation of <strong>{currentStep.featureName}</strong>
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. SUMMARY BANNER */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-4 border border-slate-800 shadow-xl">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
            Next: Technical Deep Dive
          </span>
          <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
            Curious about the Contextual AI Engine?
          </h3>
          <p className="text-slate-300 text-sm max-w-2xl mx-auto">
            Discover how GrowGuard AI Safety Monitoring inspects multi-turn conversational patterns, intent velocity, and deception vectors.
          </p>
          <div className="pt-2">
            <button
              onClick={() => {
                onNavigate('ai');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-lg shadow-blue-600/30 transition-all inline-flex items-center gap-2"
            >
              <span>Explore AI Technology Architecture</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
