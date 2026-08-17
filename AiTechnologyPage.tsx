import React, { useState } from 'react';
import { PageId, AiScenario } from '../types';
import { AI_SCENARIOS, TECH_ECOSYSTEM } from '../data/mockData';
import { InteractiveAgeTimeline } from '../components/InteractiveAgeTimeline';
import { 
  Cpu, 
  Sparkles, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Activity, 
  Layers, 
  Eye, 
  Lock, 
  Sliders, 
  FileSearch, 
  GitCommit, 
  MessageSquare, 
  Database,
  MapPin,
  Heart,
  RefreshCw,
  Terminal,
  Search
} from 'lucide-react';

interface AiTechnologyPageProps {
  onNavigate: (page: PageId) => void;
}

export const AiTechnologyPage: React.FC<AiTechnologyPageProps> = ({ onNavigate }) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(AI_SCENARIOS[0].id);

  const currentScenario = AI_SCENARIOS.find(s => s.id === selectedScenarioId) || AI_SCENARIOS[0];

  return (
    <div className="w-full space-y-20 sm:space-y-28 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="pt-8 sm:pt-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
          <Cpu size={14} />
          <span>Contextual NLP & On-Device AI Architecture</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-display font-extrabold text-slate-900 tracking-tight">
          AI That Understands Context, <br className="hidden sm:inline" />
          <span className="text-blue-600">Not Just Keywords.</span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Traditional safety tools rely on rigid keyword blocklists that miss subtle grooming and trigger false alarms on everyday slang. GrowGuard evaluates the full semantic context.
        </p>
      </section>

      {/* 2. SIDE-BY-SIDE PIPELINE COMPARISON: KEYWORD VS CONTEXTUAL */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Traditional Keyword Filtering Pipeline */}
          <div className="bg-slate-100/90 rounded-3xl p-6 sm:p-8 border border-slate-200/90 flex flex-col justify-between space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-500 font-bold uppercase tracking-wider">
                Legacy Architecture
              </span>
              <h3 className="text-xl font-display font-bold text-slate-800">
                Traditional Keyword Filtering
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Matches raw text tokens against a static blacklist dictionary with zero conversational awareness.
              </p>
            </div>

            {/* Stepper Flow */}
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-white border border-slate-200 text-slate-700 flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold">1</span>
                <span>Keyword string scanned in isolation</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200 text-slate-700 flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold">2</span>
                <span>Binary static rule match lookup</span>
              </div>
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-rose-200 flex items-center justify-center text-[10px] font-bold text-rose-800">3</span>
                <span>Crude outcome: Blind pass or total lockout</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 space-y-1">
              <strong className="text-rose-600 block">Critical Flaw:</strong>
              <p>Misses 80%+ of grooming and phishing (which use non-vulgar words) while needlessly blocking innocent homework discussions.</p>
            </div>
          </div>

          {/* GrowGuard Contextual Safety Pipeline */}
          <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-blue-900/60 shadow-2xl flex flex-col justify-between space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-blue-400 font-bold uppercase tracking-wider">
                GrowGuard AI Paradigm
              </span>
              <h3 className="text-xl font-display font-bold text-white">
                Multi-Turn Contextual Analysis
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Evaluates relationship dynamics, behavioral trajectories, URL payloads, and urgency indicators.
              </p>
            </div>

            {/* Stepper Flow */}
            <div className="space-y-2 font-mono text-xs">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">1</span>
                <span>Inbound interaction & sender graph evaluated</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">2</span>
                <span>Multi-turn conversational context & intent parsed</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">3</span>
                <span>Behavioral anomaly & credential risk scoring</span>
              </div>
              <div className="p-2.5 rounded-xl bg-blue-950/80 border border-blue-600/80 text-blue-200 flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-[10px] font-bold">4</span>
                <span>Proportional action: Nudge, isolate link, or alert</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-blue-950/40 border border-blue-800/40 text-xs text-blue-300 space-y-1">
              <strong className="text-emerald-400 block">Core Advantage:</strong>
              <p>Detects subtle manipulative intent before harm occurs, with high fidelity and dramatically fewer false alarms.</p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. FLAGSHIP DARK SECTION: INTERACTIVE SCENARIO ANALYZER */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-800 shadow-2xl">
          
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-10">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
              Interactive Diagnostic Sandbox
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight">
              GrowGuard AI Safety Monitoring in Action
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Select a realistic, non-graphic online threat below to inspect the multi-signal AI reasoning process.
            </p>
          </div>

          {/* Scenario Filter Tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {AI_SCENARIOS.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => setSelectedScenarioId(scenario.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                  selectedScenarioId === scenario.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 ring-2 ring-blue-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {scenario.category}
              </button>
            ))}
          </div>

          {/* Scenario Inspector Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Live Simulated Message Payload (5 Cols) */}
            <div className="lg:col-span-5 bg-slate-900 rounded-3xl p-6 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase">{currentScenario.category}</span>
                  <h4 className="text-sm font-bold text-white">{currentScenario.title}</h4>
                </div>
                <span className="text-[9px] font-mono px-2.5 py-1 rounded-full bg-rose-950 text-rose-300 border border-rose-800">
                  {currentScenario.riskLevel} Threat
                </span>
              </div>

              {/* Message box */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>Sender: {currentScenario.sender}</span>
                  <span>{currentScenario.time}</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 text-xs leading-relaxed font-mono">
                  "{currentScenario.snippet}"
                </div>
              </div>

              {/* Outcome Comparison */}
              <div className="space-y-2.5 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <span className="text-rose-400 font-semibold font-mono text-[10px] block">Traditional Filter Result:</span>
                  <p className="text-slate-400 text-[11px] leading-snug">{currentScenario.traditionalOutcome}</p>
                </div>

                <div className="p-3 rounded-xl bg-blue-950/40 border border-blue-800/60 space-y-1">
                  <span className="text-emerald-400 font-semibold font-mono text-[10px] block">GrowGuard AI Result:</span>
                  <p className="text-blue-200 text-[11px] leading-snug">{currentScenario.growGuardOutcome}</p>
                </div>
              </div>
            </div>

            {/* Right: AI Signal & Reasoning Breakdown (7 Cols) */}
            <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
              
              <div>
                <span className="text-xs font-mono text-blue-400 font-bold uppercase tracking-wider">
                  Evaluated Context Signals
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  Multi-Factor Risk Assessment
                </h3>
              </div>

              {/* Context Signals Grid */}
              <div className="space-y-2.5">
                {currentScenario.contextSignals.map((signal, idx) => (
                  <div 
                    key={idx}
                    className="p-3 rounded-2xl bg-slate-950 border border-slate-800 flex items-start justify-between gap-3 text-xs"
                  >
                    <div>
                      <strong className="text-white block font-medium">{signal.name}</strong>
                      <p className="text-slate-400 text-[11px] mt-0.5">{signal.description}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono shrink-0 ${
                      signal.weight === 'Critical'
                        ? 'bg-rose-950 text-rose-300 border border-rose-800'
                        : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}>
                      {signal.weight} Signal
                    </span>
                  </div>
                ))}
              </div>

              {/* AI Reasoning Text */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
                <span className="text-blue-400 font-bold font-mono text-[11px] block">AI Reasoning Engine:</span>
                <p className="text-slate-300 leading-relaxed">{currentScenario.aiReasoning}</p>
              </div>

              {/* Recommended Action & Parent Digest */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-blue-950/30 border border-blue-800/40 space-y-1">
                  <span className="text-emerald-400 font-semibold font-mono text-[10px] block">On-Device Action:</span>
                  <p className="text-slate-300 text-[11px]">{currentScenario.recommendedAction}</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-indigo-950/30 border border-indigo-800/40 space-y-1">
                  <span className="text-indigo-400 font-semibold font-mono text-[10px] block">Parent Dashboard Notice:</span>
                  <p className="text-slate-300 text-[11px]">{currentScenario.parentDigestNote}</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. INSIDE THE AI DECISION PROCESS */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            System Logic
          </span>
          <h2 className="text-3xl font-display font-bold text-slate-900 mt-2">
            Inside the AI Decision Process
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            How a message moves from sensory input to contextual evaluation and nuanced action.
          </p>
        </div>

        {/* 6-Stage Process Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              step: '01',
              title: 'Sensory Interception',
              desc: 'Inbound message or interaction received by OS accessibility and notification APIs.'
            },
            {
              step: '02',
              title: 'Context Parsing',
              desc: 'Extracts conversational thread history, sender relationship depth, and active time window.'
            },
            {
              step: '03',
              title: 'Transformer NLP',
              desc: 'On-device NPU runs lightweight semantic classifiers for deception, urgency, and coercion.'
            },
            {
              step: '04',
              title: 'Adaptive Calibration',
              desc: 'Adjusts threshold weights according to the user’s age stage (10–17) and trust status.'
            },
            {
              step: '05',
              title: 'Nuanced Resolution',
              desc: 'Selects the least intrusive effective intervention (nudge, quarantine, or guardian alert).'
            },
            {
              step: '06',
              title: 'Digest Synthesis',
              desc: 'Generates non-invasive, plain-language summaries for the GrowGuard Parent Dashboard.'
            }
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-2">
              <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                Stage {item.step}
              </span>
              <h4 className="text-base font-bold text-slate-900 pt-1">{item.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 max-w-3xl mx-auto flex items-start gap-3">
          <AlertTriangle size={18} className="text-amber-700 shrink-0 mt-0.5" />
          <div>
            <strong>Evaluation Safeguards:</strong> A real-world production implementation requires rigorous evaluation against false positives, false negatives, adversarial jailbreaks, and demographic dialect bias before commercial rollout.
          </div>
        </div>
      </section>

      {/* 5. ADAPTIVE AI SENSITIVITY TIMELINE */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            Dynamic Scaling Engine
          </span>
          <h2 className="text-3xl font-display font-bold text-slate-900 mt-2">
            Adaptive AI Sensitivity™ Architecture
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Explore how the AI’s intervention thresholds mathematically adapt across developmental ages 10 to 17.
          </p>
        </div>

        <InteractiveAgeTimeline theme="dark" />
      </section>

      {/* 6. WHAT IS AI VS WHAT IS NOT AI ECOSYSTEM CLARITY TABLE */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-lg shadow-slate-100 space-y-6">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-600">
              Technological Integrity
            </span>
            <h3 className="text-2xl font-display font-bold text-slate-900 mt-1">
              How AI Connects the GrowGuard Ecosystem (And What Isn’t AI)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              We do not claim every feature is AI. True craftsmanship means pairing AI with robust hardware, GPS, cryptography, and kernel architecture.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-mono">
                  <th className="p-3">GrowGuard Feature Name</th>
                  <th className="p-3">Is AI Core?</th>
                  <th className="p-3">Primary Tech Stack</th>
                  <th className="p-3">System Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                {TECH_ECOSYSTEM.map((feat, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 font-semibold text-slate-900">
                      {feat.name}
                    </td>
                    <td className="p-3">
                      {feat.isAi ? (
                        <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-mono text-[10px] font-semibold">
                          AI-Powered
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono text-[10px]">
                          Hardware / OS
                        </span>
                      )}
                    </td>
                    <td className="p-3 font-mono text-[11px] text-slate-500">
                      {feat.techStack}
                    </td>
                    <td className="p-3 text-[11px]">
                      {feat.role}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 7. COMPARISON TABLE: TRADITIONAL CONTROLS VS GROWGUARD */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl space-y-6">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-blue-400">
              Comparative Analysis
            </span>
            <h3 className="text-2xl font-display font-bold text-white mt-1">
              Traditional Parental Controls vs GrowGuard
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900 text-slate-300 font-mono">
                  <th className="p-3">Evaluation Vector</th>
                  <th className="p-3">Legacy Parental Apps</th>
                  <th className="p-3 text-blue-400">GrowGuard OS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-400">
                <tr>
                  <td className="p-3 font-semibold text-slate-200">Analysis Method</td>
                  <td className="p-3">Isolated keyword search & static URL blacklist</td>
                  <td className="p-3 text-slate-200">Multi-turn semantic context & behavioral patterns</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-200">Age Adaptability</td>
                  <td className="p-3">Static settings; requires manual reconfiguration</td>
                  <td className="p-3 text-slate-200">Adaptive AI Sensitivity™ scaling smoothly from age 10 to 17</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-200">Integration Level</td>
                  <td className="p-3">Userland downloadable app (easily bypassed via VPN)</td>
                  <td className="p-3 text-slate-200">Native OS Kernel, Secure Boot & Secure Enclave</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-200">Parent Transparency</td>
                  <td className="p-3">Endless invasive text logs or zero insight</td>
                  <td className="p-3 text-slate-200">AI-synthesized trend digests & plain-language explanations</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-200">Adolescent Autonomy</td>
                  <td className="p-3">Punitive lockouts; fosters covert second devices</td>
                  <td className="p-3 text-slate-200">Trust Mode positive reinforcement & earned independence</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <div className="text-center space-y-4 pt-4">
        <h3 className="text-2xl font-display font-bold text-slate-900">Explore the Research & Prototype</h3>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => {
              onNavigate('prototype');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-xl shadow-blue-600/30 transition-all inline-flex items-center gap-2"
          >
            <span>View Interactive Prototype</span>
            <ArrowRight size={14} />
          </button>
          <button
            onClick={() => {
              onNavigate('research');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-semibold text-xs transition-all"
          >
            <span>Read Research Whitepaper</span>
          </button>
        </div>
      </div>

    </div>
  );
};
