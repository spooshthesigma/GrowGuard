import React, { useState } from 'react';
import { PageId } from '../types';
import { PhoneMockup } from '../components/PhoneMockup';
import { InteractiveAgeTimeline } from '../components/InteractiveAgeTimeline';
import { 
  ShieldCheck, 
  Sparkles, 
  MapPin, 
  Heart, 
  Lock, 
  ArrowRight, 
  AlertTriangle, 
  Sliders, 
  Layers, 
  Cpu, 
  CheckCircle2, 
  Clock, 
  Activity, 
  MessageSquare, 
  Compass, 
  Award,
  ChevronRight,
  TrendingUp,
  Smartphone,
  Eye,
  AlertCircle
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [activeEcosystemNode, setActiveEcosystemNode] = useState<string>('ai-monitoring');

  return (
    <div className="w-full space-y-20 sm:space-y-28 md:space-y-36 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-8 sm:pt-14 md:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Recognition Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-slate-900 text-slate-200 border border-slate-800 shadow-xs">
            <Award size={14} className="text-amber-400" />
            <span>Samsung Solve for Tomorrow UK — UK Runner-Up</span>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-slate-900 leading-[1.08]">
            A Smartphone That <br className="hidden sm:inline" />
            <span className="text-blue-600">
              Grows With You.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            GrowGuard is an operating system and integrated safety system designed specifically for young people under 18 — providing stronger protection when they are younger and gradually unlocking independence as they mature.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                onNavigate('product');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm tracking-tight shadow-md shadow-blue-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 group"
            >
              <span>Explore GrowGuard</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                onNavigate('prototype');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm tracking-tight border border-slate-200 shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <Smartphone size={16} className="text-slate-500" />
              <span>View Interactive Prototype</span>
            </button>
          </div>
        </div>

        {/* Large Central Smartphone Stage with Floating Context Cards */}
        <div className="mt-14 sm:mt-18 relative flex items-center justify-center">
          
          {/* Ambient Lighting Backdrop */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[480px] h-[340px] sm:h-[480px] bg-blue-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />

          {/* Central Hero Phone Mockup */}
          <div className="relative z-10">
            <PhoneMockup screenType="os-home" activeAge={13} size="lg" deviceColor="charcoal" />
          </div>

          {/* Floating Feature Badges around Phone (Hidden on small mobile, elegant on tablet/desktop) */}
          
          {/* Card 1: AI Safety Monitoring (Top Left) */}
          <div className="hidden md:flex absolute top-12 left-6 lg:left-16 xl:left-24 bg-white/95 backdrop-blur-md border border-slate-100 p-3.5 rounded-2xl shadow-lg shadow-slate-900/5 max-w-[210px] items-start gap-3 z-20">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
              <Sparkles size={16} />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-wider block">AI Safety</span>
              <p className="text-xs font-bold text-slate-900">Contextual Analysis</p>
              <p className="text-[10px] text-slate-500 leading-tight mt-0.5">Evaluates threat patterns, not just keywords.</p>
            </div>
          </div>

          {/* Card 2: Safe Zones Active (Top Right) */}
          <div className="hidden md:flex absolute top-16 right-6 lg:right-16 xl:right-24 bg-white/95 backdrop-blur-md border border-slate-100 p-3.5 rounded-2xl shadow-lg shadow-slate-900/5 max-w-[200px] items-start gap-3 z-20">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100">
              <MapPin size={16} />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-wider block">GPS Hardware</span>
              <p className="text-xs font-bold text-slate-900">Safe Zones Active</p>
              <p className="text-[10px] text-slate-500 leading-tight mt-0.5">School arrival confirmed via geofence.</p>
            </div>
          </div>

          {/* Card 3: Trust Mode (Bottom Left) */}
          <div className="hidden md:flex absolute bottom-16 left-4 lg:left-12 xl:left-20 bg-white/95 backdrop-blur-md border border-slate-100 p-3.5 rounded-2xl shadow-lg shadow-slate-900/5 max-w-[210px] items-start gap-3 z-20">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-100">
              <TrendingUp size={16} />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-amber-600 uppercase tracking-wider block">Earned Freedom</span>
              <p className="text-xs font-bold text-slate-900">Trust Mode</p>
              <p className="text-[10px] text-slate-500 leading-tight mt-0.5">12-day streak unlocked 15m weekend autonomy.</p>
            </div>
          </div>

          {/* Card 4: Protection Level (Bottom Right) */}
          <div className="hidden md:flex absolute bottom-12 right-4 lg:right-12 xl:right-20 bg-white/95 backdrop-blur-md border border-slate-100 p-3.5 rounded-2xl shadow-lg shadow-slate-900/5 max-w-[200px] items-start gap-3 z-20">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 border border-indigo-100">
              <Sliders size={16} />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-indigo-600 uppercase tracking-wider block">Adaptive</span>
              <p className="text-xs font-bold text-slate-900">Age 13 Baseline</p>
              <p className="text-[10px] text-slate-500 leading-tight mt-0.5">Calibrated balance of protection & guidance.</p>
            </div>
          </div>

        </div>
      </section>

      {/* 2. THE PROBLEM SECTION (3 Visual Stories) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-3.5 py-1 rounded-full border border-rose-100">
            Current Challenges
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
            Smartphones Give Kids Adult Power — Without Adaptive Guardrails.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Young people are handed powerful digital devices, yet the safety systems around them remain rigid, easy to bypass, or oblivious to developmental maturity.
          </p>
        </div>

        {/* 3 Visual Problem Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Story 1: Harmful Online Content & Deception */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-slate-200 transition-all group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600">
                <AlertTriangle size={20} />
              </div>
              <div>
                <span className="text-xs font-mono text-rose-600 font-semibold uppercase tracking-wider">Problem 01</span>
                <h3 className="text-lg font-display font-bold text-slate-900 mt-1">Harmful Content & Subtle Deception</h3>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Scams, grooming, and cyberbullying rarely use explicit keywords. They leverage social pressure, urgency, and deceptive links that pass traditional keyword filters undetected.
              </p>
            </div>

            {/* Visual Representation: Suspicious Message simulation */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <div className="bg-slate-900 rounded-xl p-3 text-[11px] text-slate-300 font-mono space-y-1.5 border border-slate-800">
                <div className="flex items-center justify-between text-[9px] text-slate-400">
                  <span>Inbound Discord DM</span>
                  <span className="text-rose-400 font-semibold">Dictionary Pass</span>
                </div>
                <div className="bg-slate-800 p-2 rounded-lg text-slate-200 text-[10px] leading-snug">
                  "Click here for free gems: link.xyz (no swear words, passes rule-based filters)"
                </div>
                <div className="text-[9px] text-rose-400 flex items-center gap-1 pt-0.5">
                  <AlertCircle size={10} /> Traditional filters miss contextual threat
                </div>
              </div>
            </div>
          </div>

          {/* Story 2: Excessive Engagement Loops */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-slate-200 transition-all group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                <Clock size={20} />
              </div>
              <div>
                <span className="text-xs font-mono text-amber-600 font-semibold uppercase tracking-wider">Problem 02</span>
                <h3 className="text-lg font-display font-bold text-slate-900 mt-1">Engagement Traps & Screen Fatigue</h3>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Infinite feeds, algorithmic autoplay, and variable reward notifications exploit the developing prefrontal cortex, making self-regulation difficult late at night.
              </p>
            </div>

            {/* Visual Representation: Notification Surge simulation */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <div className="bg-slate-900 rounded-xl p-3 text-[11px] space-y-2 border border-slate-800">
                <div className="bg-slate-800/90 rounded-lg p-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                    <span className="text-slate-200 text-[10px]">Shorts: 32 unread streaks</span>
                  </div>
                  <span className="text-[9px] text-slate-400 font-mono">01:14 AM</span>
                </div>
                <div className="bg-slate-800/90 rounded-lg p-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-indigo-400" />
                    <span className="text-slate-200 text-[10px]">Game: Bonus ends in 5m</span>
                  </div>
                  <span className="text-[9px] text-slate-400 font-mono">01:22 AM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Story 3: Rigid & Bypassable Parental Controls */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-slate-200 transition-all group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600">
                <Lock size={20} />
              </div>
              <div>
                <span className="text-xs font-mono text-indigo-600 font-semibold uppercase tracking-wider">Problem 03</span>
                <h3 className="text-lg font-display font-bold text-slate-900 mt-1">Rigid Apps & Friction</h3>
              </div>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                Downloadable parental control apps are easily bypassed with VPNs, treat 10-year-olds the same as 17-year-olds, and create conflict rather than fostering trust.
              </p>
            </div>

            {/* Visual Representation: Locked App bypass dilemma */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <div className="bg-slate-900 rounded-xl p-3 text-[11px] text-slate-300 font-mono space-y-2 border border-slate-800">
                <div className="flex items-center justify-between text-[9px] text-slate-400">
                  <span>Third-Party App Status</span>
                  <span className="text-amber-400">Userland Process</span>
                </div>
                <div className="bg-slate-800 p-2 rounded-lg text-slate-200 text-[10px]">
                  Status: Bypassed via secondary guest profile / VPN toggle
                </div>
                <div className="text-[9px] text-slate-400 flex items-center gap-1">
                  🔒 Lacks Kernel OS-level enforcement
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. "GROWING UP SHOULD MEAN GROWING FREEDOM" TIMELINE */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Core Philosophy
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mt-2 tracking-tight">
            Growing Up Should Mean Growing Freedom.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
            The goal of smartphone safety is not to keep children restricted forever, but to empower them with scaffolding that gradually hands back independence as they mature.
          </p>
        </div>

        {/* Interactive Dynamic Age Timeline Component */}
        <InteractiveAgeTimeline />
      </section>

      {/* 4. "ONE SYSTEM. DESIGNED TO GROW." CONNECTED ECOSYSTEM */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            Connected Architecture
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mt-2 tracking-tight">
            One System. Designed to Grow.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
            GrowGuard is not a disconnected assortment of apps. It is a unified operating system where contextual AI collaborates with GPS, biometric verification, and emergency infrastructure.
          </p>
        </div>

        {/* Interactive Ecosystem Hub */}
        <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
          
          {/* Subtle tech grid background */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left/Center: Visual Node Map (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center p-4">
              
              {/* Central Core AI Hub */}
              <div 
                onClick={() => setActiveEcosystemNode('ai-monitoring')}
                className={`cursor-pointer p-5 rounded-3xl border-2 transition-all duration-300 flex flex-col items-center text-center max-w-xs shadow-2xl ${
                  activeEcosystemNode === 'ai-monitoring'
                    ? 'bg-blue-600/30 border-blue-500 scale-105 ring-4 ring-blue-500/20'
                    : 'bg-slate-900/90 border-slate-700 hover:border-slate-500'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/40 mb-2">
                  <Sparkles size={24} />
                </div>
                <span className="text-[10px] font-mono text-blue-300 font-bold uppercase tracking-wider">Central Engine</span>
                <h4 className="text-base font-display font-bold text-white">GrowGuard AI Safety Monitoring</h4>
                <span className="text-[10px] text-slate-400 mt-1">Multi-turn Contextual NLP</span>
              </div>

              {/* Surrounding Connected Capability Nodes */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full mt-6">
                
                {/* Node: Adaptive AI Sensitivity™ */}
                <button
                  onClick={() => setActiveEcosystemNode('adaptive-sensitivity')}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    activeEcosystemNode === 'adaptive-sensitivity'
                      ? 'bg-indigo-950/80 border-indigo-500 ring-2 ring-indigo-500/30'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs mb-1">
                    <Sliders size={14} />
                    <span>Adaptive AI</span>
                  </div>
                  <p className="text-[10px] text-slate-300">Age 10–17 dynamic scaling</p>
                </button>

                {/* Node: Parent Dashboard */}
                <button
                  onClick={() => setActiveEcosystemNode('parent-dashboard')}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    activeEcosystemNode === 'parent-dashboard'
                      ? 'bg-blue-950/80 border-blue-500 ring-2 ring-blue-500/30'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2 text-blue-400 font-semibold text-xs mb-1">
                    <Eye size={14} />
                    <span>Parent Dashboard</span>
                  </div>
                  <p className="text-[10px] text-slate-300">AI-synthesized insights</p>
                </button>

                {/* Node: Curated App Store */}
                <button
                  onClick={() => setActiveEcosystemNode('curated-store')}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    activeEcosystemNode === 'curated-store'
                      ? 'bg-emerald-950/80 border-emerald-500 ring-2 ring-emerald-500/30'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs mb-1">
                    <Layers size={14} />
                    <span>Curated App Store</span>
                  </div>
                  <p className="text-[10px] text-slate-300">AI-assisted privacy checks</p>
                </button>

                {/* Node: Safe Zones (Geofencing) */}
                <button
                  onClick={() => setActiveEcosystemNode('safe-zones')}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    activeEcosystemNode === 'safe-zones'
                      ? 'bg-teal-950/80 border-teal-500 ring-2 ring-teal-500/30'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2 text-teal-400 font-semibold text-xs mb-1">
                    <MapPin size={14} />
                    <span>Safe Zones (GPS)</span>
                  </div>
                  <p className="text-[10px] text-slate-300">Hardware GPS boundaries</p>
                </button>

                {/* Node: Emergency SOS */}
                <button
                  onClick={() => setActiveEcosystemNode('emergency-sos')}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    activeEcosystemNode === 'emergency-sos'
                      ? 'bg-rose-950/80 border-rose-500 ring-2 ring-rose-500/30'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs mb-1">
                    <Heart size={14} />
                    <span>Emergency SOS</span>
                  </div>
                  <p className="text-[10px] text-slate-300">Priority guardian link</p>
                </button>

                {/* Node: Trust Mode */}
                <button
                  onClick={() => setActiveEcosystemNode('trust-mode')}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    activeEcosystemNode === 'trust-mode'
                      ? 'bg-amber-950/80 border-amber-500 ring-2 ring-amber-500/30'
                      : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs mb-1">
                    <TrendingUp size={14} />
                    <span>Trust Mode</span>
                  </div>
                  <p className="text-[10px] text-slate-300">Earned autonomy habit hub</p>
                </button>

              </div>
            </div>

            {/* Right: Active Capability Deep Dive Panel (5 Cols) */}
            <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-blue-400 uppercase tracking-wider font-semibold">
                  Ecosystem Node Inspector
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-blue-950 text-blue-300 border border-blue-800">
                  {activeEcosystemNode === 'safe-zones' || activeEcosystemNode === 'emergency-sos' ? 'GPS & Hardware' : 'Contextual AI & OS'}
                </span>
              </div>

              {activeEcosystemNode === 'ai-monitoring' && (
                <div className="space-y-3">
                  <h4 className="text-lg font-display font-bold text-white">GrowGuard AI Safety Monitoring</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Evaluates multi-turn conversations, sudden behavioral shifts, and deceptive lures. Distinguishes everyday youth banter from genuine harassment or financial coercion.
                  </p>
                  <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-xs space-y-1.5">
                    <span className="text-blue-400 font-semibold block">Underlying Technology:</span>
                    <p className="text-slate-400 text-[11px]">On-device Transformer NLP & semantic context classifiers.</p>
                  </div>
                </div>
              )}

              {activeEcosystemNode === 'adaptive-sensitivity' && (
                <div className="space-y-3">
                  <h4 className="text-lg font-display font-bold text-white">Adaptive AI Sensitivity™</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Dynamically tunes alert thresholds and parental involvement levels. Ensures a 10-year-old receives tight guardrails while a 17-year-old experiences near-adult autonomy.
                  </p>
                  <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-xs space-y-1.5">
                    <span className="text-indigo-400 font-semibold block">Underlying Technology:</span>
                    <p className="text-slate-400 text-[11px]">Developmental heuristic models & calibrated sensitivity scaling.</p>
                  </div>
                </div>
              )}

              {activeEcosystemNode === 'parent-dashboard' && (
                <div className="space-y-3">
                  <h4 className="text-lg font-display font-bold text-white">GrowGuard Parent Dashboard</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Delivers high-level trend syntheses, safe zone notifications, and one-tap app approvals, translating complex technical alerts into understandable parent context.
                  </p>
                  <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-xs space-y-1.5">
                    <span className="text-blue-400 font-semibold block">Underlying Technology:</span>
                    <p className="text-slate-400 text-[11px]">Encrypted device pairing + AI explanation summaries.</p>
                  </div>
                </div>
              )}

              {activeEcosystemNode === 'curated-store' && (
                <div className="space-y-3">
                  <h4 className="text-lg font-display font-bold text-white">Curated App Store</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Categorizes marketplace applications. AI evaluates dark patterns, privacy permissions, and monetization risks to empower parental approval decisions.
                  </p>
                  <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-xs space-y-1.5">
                    <span className="text-emerald-400 font-semibold block">Underlying Technology:</span>
                    <p className="text-slate-400 text-[11px]">OS App Manifest Profiling + Static Permission Analysis.</p>
                  </div>
                </div>
              )}

              {activeEcosystemNode === 'safe-zones' && (
                <div className="space-y-3">
                  <h4 className="text-lg font-display font-bold text-white">Safe Zones (Geofencing)</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Provides peace of mind through physical boundary notifications when entering or leaving school, home, or activity centers.
                  </p>
                  <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-xs space-y-1.5">
                    <span className="text-teal-400 font-semibold block">Underlying Technology:</span>
                    <p className="text-slate-400 text-[11px]">Multi-constellation GNSS & low-power cellular geofencing (Not AI).</p>
                  </div>
                </div>
              )}

              {activeEcosystemNode === 'emergency-sos' && (
                <div className="space-y-3">
                  <h4 className="text-lg font-display font-bold text-white">Emergency SOS</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Discreet 5-click physical button triggers calm priority location broadcasting to guardians and optional direct emergency response routing.
                  </p>
                  <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-xs space-y-1.5">
                    <span className="text-rose-400 font-semibold block">Underlying Technology:</span>
                    <p className="text-slate-400 text-[11px]">Kernel-level hardware interrupts & emergency telecom relays.</p>
                  </div>
                </div>
              )}

              {activeEcosystemNode === 'trust-mode' && (
                <div className="space-y-3">
                  <h4 className="text-lg font-display font-bold text-white">Trust Mode</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Incentivizes healthy sleep routines and self-directed screen downtime with earned autonomy rewards, creating sustainable lifelong digital habits.
                  </p>
                  <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 text-xs space-y-1.5">
                    <span className="text-amber-400 font-semibold block">Underlying Technology:</span>
                    <p className="text-slate-400 text-[11px]">Behavioral routine tracking & streak gamification engine.</p>
                  </div>
                </div>
              )}

              <button
                onClick={() => {
                  onNavigate('product');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full mt-2 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700 transition-colors"
              >
                <span>Read Full Product Specs</span>
                <ChevronRight size={14} />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 5. PREMIUM DARK CLOSING STATEMENT SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-br from-slate-900 via-[#0B0E14] to-blue-950 text-white rounded-3xl p-8 sm:p-14 md:p-16 border border-slate-800 text-center relative overflow-hidden shadow-2xl">
          
          <div className="max-w-3xl mx-auto space-y-6 relative z-10">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
              The Next Evolution in Youth Mobile Technology
            </span>

            <h2 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight">
              “Your phone should grow with you.”
            </h2>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
              Explore how GrowGuard transforms smartphone protection from a punitive barrier into a supportive, developmental partner.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() => {
                  onNavigate('product');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm tracking-tight shadow-xl shadow-blue-600/40 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Explore Full Product Architecture</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  onNavigate('prototype');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-800/80 hover:bg-slate-800 text-slate-200 font-semibold text-sm tracking-tight border border-slate-700 shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Launch Interactive Prototype</span>
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
