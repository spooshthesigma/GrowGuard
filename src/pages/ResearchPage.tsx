import React, { useState } from 'react';
import { PageId } from '../types';
import { RESEARCH_TOPICS, ACADEMIC_REFERENCES } from '../data/mockData';
import { 
  BookOpen, 
  Brain, 
  ShieldAlert, 
  Clock, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  Activity,
  Sliders,
  MapPin,
  Heart,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  FileText
} from 'lucide-react';

interface ResearchPageProps {
  onNavigate: (page: PageId) => void;
}

export const ResearchPage: React.FC<ResearchPageProps> = ({ onNavigate }) => {
  const [selectedMapping, setSelectedMapping] = useState<string>('neuro');
  const [expandedCitation, setExpandedCitation] = useState<number | null>(null);

  return (
    <div className="w-full space-y-20 sm:space-y-28 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="pt-8 sm:pt-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
          <BookOpen size={14} />
          <span>Evidence-Based Design Whitepaper</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-slate-900 tracking-tight">
          The Research Behind GrowGuard
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          How developmental neuroscience, behavioral psychology, and digital safety research informed our adaptive operating system architecture.
        </p>
      </section>

      {/* 2. NEURODEVELOPMENT & PREFRONTAL CORTEX DEEP DIVE */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 lg:p-12 shadow-xl shadow-slate-200/50">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Scientific Narrative (7 Cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                <Brain size={14} />
                <span>Developmental Neuroscience</span>
              </div>

              <h2 className="text-3xl font-display font-bold text-slate-900 tracking-tight">
                Adolescent Brain Development & Prefrontal Cortex Maturation
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                A common misconception is that teenagers simply "lack self-control." Neurodevelopmental science reveals a much more nuanced reality: during adolescence, brain regions mature asynchronously.
              </p>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-700">
                  The Dual-Systems Developmental Model (Steinberg, Casey et al.)
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  The <strong>socioemotional system</strong> (limbic system & amygdala) matures rapidly during early puberty, generating heightened sensitivity to peer approval, social rewards, and emotional stimuli.
                </p>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Conversely, the <strong>cognitive control system</strong> (prefrontal cortex), responsible for impulse regulation, long-term planning, and risk calculation, undergoes gradual synaptic remodeling until roughly age 25.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-900 space-y-1">
                <span className="font-bold flex items-center gap-1.5 text-blue-700">
                  <Sparkles size={14} /> The GrowGuard Rationale:
                </span>
                <p>
                  Because cognitive impulse control is developing gradually, technology should provide <strong>external cognitive scaffolding</strong> at younger ages that gracefully steps back as the prefrontal cortex matures.
                </p>
              </div>
            </div>

            {/* Right: Interactive Brain Anatomy Diagram (5 Cols) */}
            <div className="lg:col-span-5 bg-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col items-center text-center relative overflow-hidden">
              <span className="text-[10px] font-mono text-blue-400 uppercase tracking-wider font-semibold">
                Anatomical Maturation Timeline
              </span>
              
              {/* Stylized Vector Brain Diagram */}
              <div className="my-6 relative w-48 h-48 flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  {/* Outer Brain Contour */}
                  <path
                    d="M 50 110 C 30 90, 40 40, 90 35 C 130 30, 170 60, 165 110 C 160 145, 130 165, 95 160 C 60 155, 45 130, 50 110 Z"
                    fill="#1E293B"
                    stroke="#475569"
                    strokeWidth="2"
                  />
                  
                  {/* Highlighted Prefrontal Cortex (Frontal lobe - Left front) */}
                  <path
                    d="M 50 110 C 40 85, 55 45, 90 35 C 80 75, 75 115, 65 130 Z"
                    fill="#2563EB"
                    opacity="0.8"
                    className="animate-pulse"
                  />

                  {/* Highlighted Limbic / Amygdala Area (Center/Core) */}
                  <circle cx="110" cy="100" r="18" fill="#F59E0B" opacity="0.85" />
                </svg>

                {/* Annotation Labels */}
                <div className="absolute top-2 left-0 bg-blue-900/90 text-blue-200 border border-blue-500/50 px-2 py-0.5 rounded text-[9px] font-mono">
                  Prefrontal Cortex (Slow Maturation)
                </div>
                <div className="absolute bottom-2 right-0 bg-amber-900/90 text-amber-200 border border-amber-500/50 px-2 py-0.5 rounded text-[9px] font-mono">
                  Limbic Core (Early Surge)
                </div>
              </div>

              <div className="w-full space-y-2 text-left text-xs">
                <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-300">Ages 10–12:</span>
                  <span className="text-blue-400 font-mono text-[11px]">Heavy Scaffolding</span>
                </div>
                <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-300">Ages 13–15:</span>
                  <span className="text-indigo-400 font-mono text-[11px]">Contextual Nudges</span>
                </div>
                <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-300">Ages 16–17:</span>
                  <span className="text-emerald-400 font-mono text-[11px]">Autonomous Habits</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. CORE RESEARCH TOPIC CARDS */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Key Investigations
          </span>
          <h2 className="text-3xl font-display font-bold text-slate-900 mt-2">
            The Three Critical Empirical Problem Domains
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RESEARCH_TOPICS.filter(t => t.id !== 'brain-development').map((topic) => (
            <div 
              key={topic.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-7 flex flex-col justify-between shadow-lg shadow-slate-100 space-y-4"
            >
              <div className="space-y-3">
                <span className="text-xs font-mono text-blue-600 font-bold uppercase tracking-wider">
                  {topic.category}
                </span>
                <h3 className="text-xl font-display font-bold text-slate-900 leading-snug">
                  {topic.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {topic.subtitle}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed pt-1">
                  {topic.scientificInsight}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2">
                <span className="text-[11px] font-bold text-slate-900 block font-mono">
                  GrowGuard Application:
                </span>
                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                  {topic.growGuardSolution}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {topic.tags.map((tag, idx) => (
                    <span key={idx} className="text-[9px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. INTERACTIVE "RESEARCH TO DESIGN" MAPPING MATRIX */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl">
          
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
              Interactive Translation Matrix
            </span>
            <h2 className="text-3xl font-display font-bold text-white tracking-tight">
              From Research Findings to GrowGuard Features
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Click any empirical finding to observe how academic evidence was directly translated into our operating system capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left: Research Findings Selector (5 Cols) */}
            <div className="lg:col-span-5 space-y-2.5">
              {[
                { id: 'neuro', label: '1. Asynchronous Brain Maturation', icon: Brain, target: 'Adaptive AI Sensitivity™' },
                { id: 'context', label: '2. Deceptive & Non-Explicit Harms', icon: ShieldAlert, target: 'GrowGuard AI Safety Monitoring' },
                { id: 'habits', label: '3. Persuasive Feeds & Sleep Disruption', icon: Clock, target: 'Trust Mode & Digital Habit Scaffolding' },
                { id: 'gps', label: '4. Physical Transit & Safety Anxieties', icon: MapPin, target: 'Safe Zones (Geofencing Hardware)' },
                { id: 'sos', label: '5. Acute Distress & Panic Scenarios', icon: Heart, target: 'Emergency SOS Protocol' },
                { id: 'kernel', label: '6. Bypass Vulnerability of Userland Apps', icon: Lock, target: 'Operating System Integration' },
              ].map((item) => {
                const Icon = item.icon;
                const isSelected = selectedMapping === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedMapping(item.id)}
                    className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-blue-600/20 border-blue-500 text-white shadow-md shadow-blue-500/10 ring-2 ring-blue-500/20'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-850 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon size={16} className={isSelected ? 'text-blue-400' : 'text-slate-400'} />
                      <span className="text-xs font-semibold">{item.label}</span>
                    </div>
                    <ChevronRight size={14} className={isSelected ? 'text-blue-400' : 'text-slate-600'} />
                  </button>
                );
              })}
            </div>

            {/* Right: Direct Architecture Output (7 Cols) */}
            <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-4">
              
              {selectedMapping === 'neuro' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-indigo-400 font-bold uppercase">Architecture Mapping</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-indigo-950 text-indigo-300 border border-indigo-800">
                      Core Framework
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-display text-white">
                    Adaptive AI Sensitivity™ & Age-Based Protection
                  </h3>
                  <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                    <p>
                      <strong>Empirical Finding:</strong> Casey et al. and Steinberg demonstrate that the prefrontal cortex develops throughout adolescence until the mid-twenties. Fixed restriction levels fail because they either infantilize 17-year-olds or overwhelm 10-year-olds.
                    </p>
                    <p>
                      <strong>GrowGuard Solution:</strong> An algorithmically tuned sensitivity curve that steps down parental interventions and steps up personal autonomy automatically across ages 10 to 17.
                    </p>
                  </div>
                </div>
              )}

              {selectedMapping === 'context' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-blue-400 font-bold uppercase">Architecture Mapping</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-blue-950 text-blue-300 border border-blue-800">
                      Contextual AI
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-display text-white">
                    GrowGuard AI Safety Monitoring
                  </h3>
                  <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                    <p>
                      <strong>Empirical Finding:</strong> UK Safer Internet Centre and Livingstone & Stoilova show that severe threats like phishing and social manipulation rely on standard conversational phrasing rather than obvious blacklist terms.
                    </p>
                    <p>
                      <strong>GrowGuard Solution:</strong> Multi-turn semantic context evaluation running on-device, looking at relationship velocity, artificial urgency, and credential requests.
                    </p>
                  </div>
                </div>
              )}

              {selectedMapping === 'habits' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-amber-400 font-bold uppercase">Architecture Mapping</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-amber-950 text-amber-300 border border-amber-800">
                      Behavioral Wellbeing
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-display text-white">
                    Trust Mode
                  </h3>
                  <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                    <p>
                      <strong>Empirical Finding:</strong> Center for Humane Technology research indicates that punitive lockouts trigger frustration and covert bypass habits, while positive habit formation builds durable executive self-regulation.
                    </p>
                    <p>
                      <strong>GrowGuard Solution:</strong> Earned independence rewards for maintaining sleep schedules, study blocks, and balanced device usage.
                    </p>
                  </div>
                </div>
              )}

              {selectedMapping === 'gps' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-teal-400 font-bold uppercase">Architecture Mapping</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-teal-950 text-teal-300 border border-teal-800">
                      Hardware Telemetry
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-display text-white">
                    Safe Zones (Geofencing)
                  </h3>
                  <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                    <p>
                      <strong>Empirical Finding:</strong> Family media surveys show that physical transit between school and home is the primary reason parents buy a young person their first phone.
                    </p>
                    <p>
                      <strong>GrowGuard Solution:</strong> Low-power GNSS hardware geofencing alerts parents upon perimeter arrival without continuous intrusive visual tracking.
                    </p>
                  </div>
                </div>
              )}

              {selectedMapping === 'sos' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-rose-400 font-bold uppercase">Architecture Mapping</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-rose-950 text-rose-300 border border-rose-800">
                      Emergency Telecom
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-display text-white">
                    Emergency SOS Protocol
                  </h3>
                  <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                    <p>
                      <strong>Empirical Finding:</strong> High-stress emergency moments impair fine-motor phone navigation. Overly complex emergency screens increase panic.
                    </p>
                    <p>
                      <strong>GrowGuard Solution:</strong> Instant 5-tap physical trigger activating a calm interface with direct priority guardian and emergency service dispatch.
                    </p>
                  </div>
                </div>
              )}

              {selectedMapping === 'kernel' && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-indigo-400 font-bold uppercase">Architecture Mapping</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-indigo-950 text-indigo-300 border border-indigo-800">
                      System Architecture
                    </span>
                  </div>
                  <h3 className="text-xl font-bold font-display text-white">
                    Operating System Integration
                  </h3>
                  <div className="space-y-2 text-xs text-slate-300 leading-relaxed">
                    <p>
                      <strong>Empirical Finding:</strong> Over 40% of tech-literate adolescents report bypassing userland parental control apps within 60 days via VPN toggling or secondary user profiles.
                    </p>
                    <p>
                      <strong>GrowGuard Solution:</strong> Hardware-level secure boot and kernel permission sandboxing that cannot be killed by process termination or guest logins.
                    </p>
                  </div>
                </div>
              )}

            </div>

          </div>
        </div>
      </section>

      {/* 5. ACADEMIC REFERENCES & BIBLIOGRAPHY */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-lg shadow-slate-100">
          <div className="flex items-center gap-3 pb-6 border-b border-slate-200">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-200">
              <FileText size={20} />
            </div>
            <div>
              <h3 className="text-2xl font-display font-bold text-slate-900">
                Academic & Industry References
              </h3>
              <p className="text-xs text-slate-500">
                Verified peer-reviewed studies and official regulatory reports informing the GrowGuard concept.
              </p>
            </div>
          </div>

          <div className="space-y-4 mt-6">
            {ACADEMIC_REFERENCES.map((ref, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="text-xs font-mono font-medium text-slate-800 leading-relaxed">
                    [{idx + 1}] {ref.citation}
                  </p>
                </div>
                <p className="text-xs text-slate-600 bg-white p-3 rounded-xl border border-slate-200/60 leading-relaxed">
                  <strong>Relevance to GrowGuard:</strong> {ref.relevance}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="text-center space-y-4 pt-4">
        <h3 className="text-2xl font-display font-bold text-slate-900">Explore the Functional Prototype</h3>
        <button
          onClick={() => {
            onNavigate('prototype');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-xl shadow-blue-600/30 transition-all inline-flex items-center gap-2"
        >
          <span>View Interactive Prototype Walkthrough</span>
          <ArrowRight size={16} />
        </button>
      </div>

    </div>
  );
};
