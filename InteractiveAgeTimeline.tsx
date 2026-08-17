import React, { useState } from 'react';
import { AGE_STAGES } from '../data/mockData';
import { 
  ShieldCheck, 
  Sparkles, 
  Users, 
  Download, 
  Compass, 
  ChevronRight, 
  TrendingUp, 
  CheckCircle2,
  Lock,
  ArrowRight
} from 'lucide-react';
import { PhoneMockup } from './PhoneMockup';

interface InteractiveAgeTimelineProps {
  onExplorePrototype?: (age: number) => void;
  showPhonePreview?: boolean;
  theme?: 'light' | 'dark';
}

export const InteractiveAgeTimeline: React.FC<InteractiveAgeTimelineProps> = ({
  onExplorePrototype,
  showPhonePreview = true,
  theme = 'light'
}) => {
  const [selectedAge, setSelectedAge] = useState<number>(13);
  const currentStage = AGE_STAGES.find(s => s.age === selectedAge) || AGE_STAGES[3];

  const isDark = theme === 'dark';

  return (
    <div className={`w-full rounded-2xl p-6 sm:p-8 md:p-10 transition-all duration-300 ${
      isDark 
        ? 'bg-slate-950 border border-slate-800 text-slate-100 shadow-xl' 
        : 'bg-white border border-slate-100 text-slate-900 shadow-xs'
    }`}>
      {/* Header with Title & Core Philosophy */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800 mb-2.5">
            <TrendingUp size={13} />
            <span>Adaptive AI Sensitivity™ Architecture</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-display font-bold tracking-tight">
            Protection Scales Down. Freedom Scales Up.
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-1 max-w-2xl">
            Select an age below to observe how GrowGuard dynamically shifts its protective parameters from hands-on guardianship at age 10 to autonomous self-regulation by age 17.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs text-slate-400 dark:text-slate-400 block font-medium">Selected Age</span>
            <span className="text-2xl sm:text-3xl font-extrabold font-display text-blue-600 dark:text-blue-400">
              Age {selectedAge}
            </span>
          </div>
        </div>
      </div>

      {/* Age Selector Stepper Bar */}
      <div className="my-8">
        <div className="relative">
          {/* Track background */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-2 bg-slate-100 dark:bg-slate-800 rounded-full" />
          
          {/* Filled active progress bar */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 left-0 h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 rounded-full transition-all duration-300"
            style={{ width: `${((selectedAge - 10) / (17 - 10)) * 100}%` }}
          />

          {/* Stepper Buttons */}
          <div className="relative flex justify-between items-center z-10">
            {AGE_STAGES.map((stage) => {
              const isSelected = stage.age === selectedAge;
              const isPassed = stage.age < selectedAge;

              return (
                <button
                  key={stage.age}
                  onClick={() => setSelectedAge(stage.age)}
                  className={`group flex flex-col items-center focus:outline-none transition-all duration-200`}
                  title={`View Age ${stage.age} Profile`}
                >
                  <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-300 border-2 ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-600 scale-110 shadow-lg shadow-blue-500/40 ring-4 ring-blue-500/20'
                      : isPassed
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : isDark
                      ? 'bg-slate-800 text-slate-400 border-slate-700 hover:border-slate-500'
                      : 'bg-white text-slate-600 border-slate-300 hover:border-slate-400 shadow-sm'
                  }`}>
                    {stage.age}
                  </div>
                  <span className={`text-[10px] sm:text-xs font-semibold mt-2 tracking-tight transition-colors hidden sm:block ${
                    isSelected
                      ? 'text-blue-600 dark:text-blue-400 font-bold'
                      : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300'
                  }`}>
                    {stage.age === 10 ? 'Start' : stage.age === 17 ? 'Adulthood' : `Age ${stage.age}`}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content Grid: Detailed Metrics & Live Phone Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mt-6">
        
        {/* Left / Middle: Dynamic Metrics & Stage Description (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Stage Card Header */}
          <div className={`p-5 rounded-2xl border transition-all duration-300 ${
            isDark ? 'bg-slate-800/60 border-slate-700' : 'bg-slate-50/90 border-slate-200/80'
          }`}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 font-mono">
                {currentStage.label}
              </span>
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-100/80 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300">
                Phase {selectedAge <= 12 ? '1: Scaffolding' : selectedAge <= 15 ? '2: Discovery' : '3: Transition'}
              </span>
            </div>
            <h4 className="text-xl font-display font-bold text-slate-900 dark:text-white mt-1">
              {currentStage.stageTitle}
            </h4>
            <p className="text-slate-600 dark:text-slate-300 text-sm mt-2 leading-relaxed">
              {currentStage.description}
            </p>
          </div>

          {/* Dual Balance Meters: Protection vs Independence */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Protection Level Bar */}
            <div className={`p-4 rounded-2xl border ${
              isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-white border-slate-200/70 shadow-sm'
            }`}>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-blue-600" /> Protective Guardrails
                </span>
                <span className="font-bold font-mono text-blue-600 dark:text-blue-400">{currentStage.protectionScore}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-600 h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${currentStage.protectionScore}%` }}
                />
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
                {currentStage.protectionScore >= 80 ? 'Heavy barrier protection' : currentStage.protectionScore >= 50 ? 'Contextual advisory filters' : 'Emergency net only'}
              </span>
            </div>

            {/* Independence Level Bar */}
            <div className={`p-4 rounded-2xl border ${
              isDark ? 'bg-slate-800/40 border-slate-800' : 'bg-white border-slate-200/70 shadow-sm'
            }`}>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Compass size={14} className="text-emerald-500" /> Digital Independence
                </span>
                <span className="font-bold font-mono text-emerald-600 dark:text-emerald-400">{currentStage.independenceScore}%</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${currentStage.independenceScore}%` }}
                />
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
                {currentStage.independenceScore <= 30 ? 'Co-piloted device usage' : currentStage.independenceScore <= 70 ? 'Guided self-management' : 'Near-adult autonomy'}
              </span>
            </div>
          </div>

          {/* Key Parameter Breakdown List */}
          <div className="space-y-2.5 text-xs sm:text-sm">
            <div className={`p-3 rounded-xl border flex items-center justify-between ${
              isDark ? 'bg-slate-800/30 border-slate-800' : 'bg-slate-50 border-slate-200/60'
            }`}>
              <span className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
                <Sparkles size={15} className="text-blue-500" /> AI Safety Sensitivity:
              </span>
              <span className="font-semibold text-slate-900 dark:text-white">{currentStage.aiSensitivity}</span>
            </div>

            <div className={`p-3 rounded-xl border flex items-center justify-between ${
              isDark ? 'bg-slate-800/30 border-slate-800' : 'bg-slate-50 border-slate-200/60'
            }`}>
              <span className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
                <Users size={15} className="text-indigo-500" /> Guardian Notification Model:
              </span>
              <span className="font-semibold text-slate-900 dark:text-white">{currentStage.parentInvolvement}</span>
            </div>

            <div className={`p-3 rounded-xl border flex items-center justify-between ${
              isDark ? 'bg-slate-800/30 border-slate-800' : 'bg-slate-50 border-slate-200/60'
            }`}>
              <span className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
                <Download size={15} className="text-emerald-500" /> Curated App Store Access:
              </span>
              <span className="font-semibold text-slate-900 dark:text-white">{currentStage.appStorePolicy}</span>
            </div>
          </div>

          {/* Active Features Checklist */}
          <div className="pt-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Active System Capabilities at Age {selectedAge}:
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {currentStage.keyFeaturesActive.map((feature, idx) => (
                <div 
                  key={idx}
                  className={`p-2.5 rounded-lg border text-xs flex items-start gap-2 ${
                    isDark ? 'bg-slate-800/50 border-slate-700/60 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  <CheckCircle2 size={13} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Realistic Phone Mockup Displaying Age Calibration (5 Cols) */}
        {showPhonePreview && (
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative group">
              {/* Subtle back ambient glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/20 to-indigo-600/20 rounded-full blur-2xl opacity-60 group-hover:opacity-100 transition-opacity" />
              
              <PhoneMockup 
                screenType={selectedAge <= 12 ? 'os-home' : selectedAge <= 15 ? 'trust-dashboard' : 'graduated-independence'}
                activeAge={selectedAge}
                size="md"
              />
            </div>
            
            <div className="mt-4 text-center">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Displaying simulated GrowGuard OS viewport for <strong>Age {selectedAge}</strong>
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Footer Note on Scientific Developmental Calibration */}
      <div className="mt-8 pt-4 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
        <p>
          * Proposed developmental stages based on adolescent executive function research. Real-world commercialization would involve continuous family customization.
        </p>
      </div>
    </div>
  );
};
