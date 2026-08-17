import React, { useState } from 'react';
import { PageId } from '../types';
import { PhoneMockup, MockupScreenType } from '../components/PhoneMockup';
import { 
  ShieldCheck, 
  Sparkles, 
  MapPin, 
  Heart, 
  Lock, 
  UserCheck, 
  Sliders, 
  Layers, 
  Eye, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  ChevronRight,
  Cpu,
  Smartphone,
  Info,
  Clock,
  Download,
  Fingerprint,
  Radio,
  FileCheck
} from 'lucide-react';

interface ProductPageProps {
  onNavigate: (page: PageId) => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<string>('parent-verify');
  const [selectedAgeTier, setSelectedAgeTier] = useState<'younger' | 'middle' | 'older'>('middle');

  return (
    <div className="w-full space-y-20 sm:space-y-28 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="pt-8 sm:pt-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 shadow-sm">
          <Layers size={14} />
          <span>Complete System Architecture</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-slate-900 tracking-tight">
          How GrowGuard Works
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          A connected operating system engineered around the gradual, natural development of young people — from cryptographic onboarding to everyday contextual protection.
        </p>

        {/* Quick jump navigation pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 max-w-4xl mx-auto">
          {[
            { id: 'parent-verify', label: 'Parent Verification' },
            { id: 'age-based', label: 'Age-Based Protection' },
            { id: 'ai-monitoring', label: 'AI Safety Monitoring' },
            { id: 'curated-store', label: 'Curated App Store' },
            { id: 'safe-zones', label: 'Safe Zones (GPS)' },
            { id: 'emergency-sos', label: 'Emergency SOS' },
            { id: 'trust-mode', label: 'Trust Mode' },
            { id: 'parent-dashboard', label: 'Parent Dashboard' },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200/80"
            >
              {item.label}
            </a>
          ))}
        </div>
      </section>

      {/* 2. CORE CAPABILITIES BREAKDOWN */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* FEATURE 1: PARENT VERIFICATION */}
        <section id="parent-verify" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center scroll-mt-24">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              <UserCheck size={14} />
              <span>Identity & Biometrics (Not AI)</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
              Parent Verification
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Standard parental control apps suffer from unauthorized child bypasses and fraudulent setups. GrowGuard establishes trust at the hardware root through cryptographically verified adult guardianship.
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
                <CheckCircle2 size={18} className="text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Government ID & Live Liveness Check</h4>
                  <p className="text-xs text-slate-600 mt-0.5">3D facial depth mapping prevents static photo spoofing during initial setup.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
                <CheckCircle2 size={18} className="text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Secure Enclave Device Pairing</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Generates non-exportable asymmetric keypairs stored in device hardware.</p>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500">
              * Note: Concept prototype specification. Commercial deployment requires identity provider integrations and compliance auditing.
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <PhoneMockup screenType="parent-verify" size="md" deviceColor="charcoal" />
          </div>
        </section>

        {/* FEATURE 2: AGE-BASED PROTECTION */}
        <section id="age-based" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center scroll-mt-24">
          <div className="lg:col-span-6 order-2 lg:order-1 flex justify-center">
            <PhoneMockup 
              screenType="age-setup" 
              activeAge={selectedAgeTier === 'younger' ? 11 : selectedAgeTier === 'middle' ? 14 : 17} 
              size="md" 
              deviceColor="charcoal" 
            />
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
              <Sliders size={14} />
              <span>Developmental Calibration Framework</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
              Age-Based Protection
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              When a parent configures GrowGuard, selecting the child's age establishes an initial baseline of protection. Rather than a rigid lock, it serves as a dynamic starting foundation.
            </p>

            {/* Age Tier Selector Switcher */}
            <div className="flex rounded-2xl bg-slate-100 p-1.5 border border-slate-200">
              <button
                onClick={() => setSelectedAgeTier('younger')}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedAgeTier === 'younger' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Ages 10–12
              </button>
              <button
                onClick={() => setSelectedAgeTier('middle')}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedAgeTier === 'middle' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Ages 13–15
              </button>
              <button
                onClick={() => setSelectedAgeTier('older')}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedAgeTier === 'older' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Ages 16–17
              </button>
            </div>

            {/* Tier Parameter Comparison Box */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <h4 className="text-sm font-bold text-slate-900 font-display">
                {selectedAgeTier === 'younger' && 'Early Discovery Tier (Ages 10–12)'}
                {selectedAgeTier === 'middle' && 'Middle Teen Guardian Tier (Ages 13–15)'}
                {selectedAgeTier === 'older' && 'Independent Navigator Tier (Ages 16–17)'}
              </h4>
              
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span><strong>AI Intervention:</strong> {selectedAgeTier === 'younger' ? 'High sensitivity, proactive alerts' : selectedAgeTier === 'middle' ? 'Moderate, contextual nudges' : 'Low-intervention, critical fallback'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span><strong>App Marketplace:</strong> {selectedAgeTier === 'younger' ? 'Parent approval required for all installs' : selectedAgeTier === 'middle' ? 'Age-tiered approval with AI risk digests' : 'Self-installation with passive security scan'}</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  <span><strong>Parent Visibility:</strong> {selectedAgeTier === 'younger' ? 'Real-time arrival & screen milestones' : selectedAgeTier === 'middle' ? 'Weekly wellbeing digest & high-risk flags' : 'Emergency alerts & autonomy metrics'}</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FEATURE 3: GROWGUARD AI SAFETY MONITORING */}
        <section id="ai-monitoring" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center scroll-mt-24">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              <Sparkles size={14} />
              <span>Core Contextual AI</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
              GrowGuard AI Safety Monitoring
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Traditional parental control filters look for blacklisted words. If a predator avoids profanity, the filter does nothing. GrowGuard evaluates the <em>context</em> — sender history, urgency, isolation tactics, and behavioral patterns.
            </p>

            <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Evaluated Response Spectrum</span>
                <span className="text-emerald-400 font-mono">Nuanced Resolution</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Rather than treating every flag as an instant catastrophic shutdown, GrowGuard chooses from a spectrum of actions: in-the-moment educational nudges, link quarantines, or guardian escalations.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-800 block">Multi-Turn Memory</span>
                <p className="text-slate-500 text-[11px] mt-0.5">Detects escalating harassment across several days.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="font-bold text-slate-800 block">On-Device Privacy</span>
                <p className="text-slate-500 text-[11px] mt-0.5">Runs on local NPU hardware without cloud eavesdropping.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <PhoneMockup screenType="ai-chat" size="md" deviceColor="charcoal" />
          </div>
        </section>

        {/* FEATURE 4: CURATED APP STORE */}
        <section id="curated-store" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center scroll-mt-24">
          <div className="lg:col-span-6 order-2 lg:order-1 flex justify-center">
            <PhoneMockup screenType="curated-store" size="md" deviceColor="charcoal" />
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Download size={14} />
              <span>AI-Assisted Marketplace</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
              Curated App Store
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Applications are organized into distinct developmental tiers. While AI assists by analyzing privacy policies, intrusive monetization, and algorithmic loops, parents maintain final approval.
            </p>

            <div className="space-y-2.5 text-xs">
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <div>
                    <strong className="text-slate-900">Approved & Age-Appropriate</strong>
                    <p className="text-slate-500 text-[11px]">Instant download for verified educational and creative tools.</p>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <div>
                    <strong className="text-slate-900">Requires Parent Review</strong>
                    <p className="text-slate-500 text-[11px]">One-tap notification with AI summary of in-app purchasing and chat features.</p>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <div>
                    <strong className="text-slate-900">Restricted Category</strong>
                    <p className="text-slate-500 text-[11px]">Casino, unmonitored adult forums, and predatory microtransactions filtered.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURE 5: SAFE ZONES (GEOFENCING) */}
        <section id="safe-zones" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center scroll-mt-24">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-700 border border-teal-200">
              <MapPin size={14} />
              <span>GPS & Geofencing Hardware (Not AI)</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
              Safe Zones (Geofencing)
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Safe Zones rely directly on low-power GNSS hardware and cellular triangulation — not AI prediction. Parents define trusted boundaries (Home, School, Sports Practice) and receive instant arrival and departure notifications.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                <h4 className="text-xs font-bold text-slate-900">Perimeter Transition Events</h4>
                <p className="text-xs text-slate-600">Dispatches notification on crossing designated safe radii.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1">
                <h4 className="text-xs font-bold text-slate-900">Privacy-First Telemetry</h4>
                <p className="text-xs text-slate-600">Avoids creepy constant breadcrumb tracking; focuses on arrival confirmation.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <PhoneMockup screenType="geofence-map" size="md" deviceColor="charcoal" />
          </div>
        </section>

        {/* FEATURE 6: EMERGENCY SOS */}
        <section id="emergency-sos" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center scroll-mt-24">
          <div className="lg:col-span-6 order-2 lg:order-1 flex justify-center">
            <PhoneMockup screenType="sos-screen" size="md" deviceColor="charcoal" />
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
              <Heart size={14} />
              <span>Emergency Telecommunications (Not AI)</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
              Emergency SOS
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              When an urgent situation occurs, children need a clear, non-frightening way to reach help. A simple hardware gesture opens an emergency hub that broadcasts coordinates to guardians and coordinates emergency services.
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
                <CheckCircle2 size={18} className="text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Calm Visual Interface</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Designed to provide reassurance without panic-inducing loud sirens or flashing strobes.</p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-start gap-3">
                <CheckCircle2 size={18} className="text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Priority Guardian Link</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Overrides silent/Do Not Disturb modes on parent devices with high-priority dispatch.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURE 7: TRUST MODE */}
        <section id="trust-mode" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center scroll-mt-24">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
              <TrendingUp size={14} />
              <span>Earned Independence Engine</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
              Trust Mode
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Instead of treating young people as perpetual rule-breakers, Trust Mode operates on positive reinforcement. Consistent adherence to bedtime wind-downs, focus blocks, and safe browsing unlocks greater device autonomy.
            </p>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
              <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider font-mono">Habit & Autonomy Scaffolding</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                AI assists by evaluating long-term habit consistency without making moral judgements. This teaches youth self-regulation before they transition into an unmonitored adult device.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <PhoneMockup screenType="trust-dashboard" activeAge={13} size="md" deviceColor="charcoal" />
          </div>
        </section>

        {/* FEATURE 8: GROWGUARD PARENT DASHBOARD */}
        <section id="parent-dashboard" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center scroll-mt-24">
          <div className="lg:col-span-6 order-2 lg:order-1 flex justify-center">
            <PhoneMockup screenType="parent-dashboard" activeAge={13} size="md" deviceColor="charcoal" />
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              <Eye size={14} />
              <span>Parent Management & AI Summaries</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 tracking-tight">
              GrowGuard Parent Dashboard
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Parents should not have to read endless chat transcripts to know if their child is safe. The Parent Dashboard synthesizes trends, highlights key alerts, and provides plain-language AI explanations for why an event was flagged.
            </p>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <span className="font-bold text-slate-900 block">Plain-Language Explanations</span>
                <p className="text-slate-600 mt-0.5">Explains the contextual logic behind alerts rather than displaying cryptic risk codes.</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                <span className="font-bold text-slate-900 block">One-Tap Approvals</span>
                <p className="text-slate-600 mt-0.5">App install requests, bedtime extensions, and safe zone adjustments handled with single-tap biometrics.</p>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* 3. "BUILT INTO THE PHONE" (OS-LEVEL INTEGRATION ARCHITECTURE) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-14 border border-slate-800 shadow-2xl relative overflow-hidden">
          
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
              Underlying System Engineering
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
              Built Into the Phone — Not Just Another App
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Why GrowGuard must be an operating-system-level architecture rather than a downloadable app from an app store.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            
            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
                <Lock size={20} />
              </div>
              <h4 className="text-base font-bold text-white">Tamper-Proof Kernel Enforcement</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                App-based parental controls run in user space and are easily killed, disabled by VPNs, or uninstalled. OS integration binds policies directly to the hardware kernel.
              </p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <Cpu size={20} />
              </div>
              <h4 className="text-base font-bold text-white">Dedicated NPU Acceleration</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Local on-device language models run with zero battery penalty by leveraging the mobile SoC's Neural Processing Unit without streaming personal messages to remote servers.
              </p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-2xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
                <Fingerprint size={20} />
              </div>
              <h4 className="text-base font-bold text-white">Secure Enclave Isolation</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Parent verification tokens and biometric keys reside in isolated hardware enclaves, preventing malware tampering or unauthorized device resetting.
              </p>
            </div>

          </div>

          <div className="mt-10 p-4 rounded-2xl bg-blue-950/40 border border-blue-800/50 text-xs text-blue-200 text-center max-w-2xl mx-auto">
            💡 Real-world implementation requires collaboration with mobile chip manufacturers, operating system maintainers, and child safety researchers.
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="text-center space-y-4 pt-4">
        <h3 className="text-2xl font-display font-bold text-slate-900">Experience the Prototype in Action</h3>
        <button
          onClick={() => {
            onNavigate('prototype');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-xl shadow-blue-600/30 transition-all inline-flex items-center gap-2"
        >
          <span>Step Through the 8-Stage Prototype</span>
          <ArrowRight size={16} />
        </button>
      </div>

    </div>
  );
};
