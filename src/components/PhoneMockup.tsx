import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  Heart, 
  Sparkles, 
  AlertTriangle, 
  Lock, 
  Bell, 
  Battery, 
  Wifi, 
  Signal, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Clock,
  Compass,
  Search,
  Download,
  Info,
  Phone,
  UserCheck,
  TrendingUp,
  Activity
} from 'lucide-react';

export type MockupScreenType = 
  | 'os-home'
  | 'parent-verify'
  | 'age-setup'
  | 'ai-chat'
  | 'curated-store'
  | 'geofence-map'
  | 'sos-screen'
  | 'trust-dashboard'
  | 'parent-dashboard'
  | 'graduated-independence';

interface PhoneMockupProps {
  screenType?: MockupScreenType;
  customContent?: React.ReactNode;
  activeAge?: number;
  interactive?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  deviceColor?: 'charcoal' | 'silver' | 'midnight';
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({
  screenType = 'os-home',
  customContent,
  activeAge = 13,
  interactive = false,
  className = '',
  size = 'md',
  deviceColor = 'charcoal'
}) => {
  // Dimensions based on size
  const sizeClasses = {
    sm: 'w-[260px] h-[520px]',
    md: 'w-[310px] h-[620px]',
    lg: 'w-[340px] h-[680px]'
  };

  const getBorderColor = () => {
    switch (deviceColor) {
      case 'silver': return 'border-slate-300 bg-slate-100';
      case 'midnight': return 'border-slate-900 bg-slate-950';
      default: return 'border-slate-800 bg-slate-900';
    }
  };

  return (
    <div className={`relative mx-auto select-none ${className}`}>
      {/* Outer Phone Shell with metallic rim */}
      <div className={`${sizeClasses[size]} relative rounded-[44px] p-[10px] shadow-2xl shadow-slate-950/25 transition-all duration-500 ${getBorderColor()} border-[6px]`}>
        
        {/* Hardware details: Speaker ear slit & power / volume tactile notches */}
        <div className="absolute -left-[9px] top-24 w-[3px] h-9 bg-slate-700 rounded-l" />
        <div className="absolute -left-[9px] top-36 w-[3px] h-12 bg-slate-700 rounded-l" />
        <div className="absolute -right-[9px] top-28 w-[3px] h-14 bg-slate-700 rounded-r" />

        {/* Screen Bezel and Display Area */}
        <div className="w-full h-full bg-[#0B0F19] text-white rounded-[34px] overflow-hidden flex flex-col relative border border-slate-800/80 shadow-inner">
          
          {/* Top Status Bar & Dynamic Island */}
          <div className="w-full px-5 pt-3 pb-1 flex items-center justify-between z-30 text-[11px] font-medium text-slate-300">
            <span className="font-mono">09:41</span>
            
            {/* Dynamic Island / Camera Notch */}
            <div className="h-4 w-20 bg-black rounded-full flex items-center justify-center gap-1.5 px-2 border border-slate-800/60 shadow-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500/80 animate-pulse" />
              <span className="text-[8px] font-mono text-blue-300 font-semibold tracking-wider">GROWGUARD</span>
            </div>

            <div className="flex items-center gap-1.5 text-slate-300">
              <Signal size={11} />
              <Wifi size={11} />
              <Battery size={13} className="text-emerald-400" />
            </div>
          </div>

          {/* OS Main Content Viewport */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-3.5 scrollbar-none flex flex-col text-slate-100">
            {customContent ? (
              customContent
            ) : screenType === 'os-home' ? (
              <HomeScreenView age={activeAge} />
            ) : screenType === 'parent-verify' ? (
              <ParentVerifyScreenView />
            ) : screenType === 'age-setup' ? (
              <AgeSetupScreenView age={activeAge} />
            ) : screenType === 'ai-chat' ? (
              <AiChatScreenView />
            ) : screenType === 'curated-store' ? (
              <CuratedStoreScreenView />
            ) : screenType === 'geofence-map' ? (
              <GeofenceMapScreenView />
            ) : screenType === 'sos-screen' ? (
              <SosScreenView />
            ) : screenType === 'trust-dashboard' ? (
              <TrustDashboardScreenView age={activeAge} />
            ) : screenType === 'parent-dashboard' ? (
              <ParentDashboardScreenView age={activeAge} />
            ) : (
              <GraduatedIndependenceScreenView />
            )}
          </div>

          {/* Bottom Home Indicator Bar */}
          <div className="w-full py-2 flex items-center justify-center bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent">
            <div className="w-28 h-1 bg-slate-500/60 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

/* --- INDIVIDUAL OS SCREEN RENDERERS --- */

const HomeScreenView: React.FC<{ age: number }> = ({ age }) => {
  return (
    <div className="flex flex-col gap-3 py-1 animate-fadeIn">
      {/* GrowGuard Status Banner Header */}
      <div className="bg-gradient-to-r from-blue-950/70 to-slate-900 border border-blue-800/40 rounded-2xl p-3 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <ShieldCheck size={16} />
            </div>
            <div>
              <p className="text-[10px] text-blue-300 font-medium uppercase tracking-wider">GrowGuard OS</p>
              <h4 className="text-xs font-semibold text-white">Age {age} Active Shield</h4>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[9px] font-mono">
            Protected
          </span>
        </div>
      </div>

      {/* Main Widgets Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Trust Mode Widget */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-2.5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-medium">Trust Mode</span>
            <Sparkles size={13} className="text-amber-400" />
          </div>
          <div className="my-1.5">
            <span className="text-lg font-bold text-white tracking-tight">Level {age <= 12 ? '2' : age <= 15 ? '4' : '6'}</span>
            <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(95, age * 5.8)}%` }}
              />
            </div>
          </div>
          <span className="text-[9px] text-slate-400">Streak: 12 days</span>
        </div>

        {/* Screen Time Widget */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-2.5 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-medium">Screen Time</span>
            <Clock size={13} className="text-blue-400" />
          </div>
          <div className="my-1.5">
            <span className="text-lg font-bold text-white tracking-tight">1h 42m</span>
            <p className="text-[9px] text-emerald-400 flex items-center gap-0.5 mt-0.5">
              <CheckCircle2 size={9} /> Healthy balance
            </p>
          </div>
          <span className="text-[9px] text-slate-400">Wind-down at 21:00</span>
        </div>
      </div>

      {/* Safe Zone Live Card */}
      <div className="bg-slate-900/80 border border-slate-800/90 rounded-2xl p-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-emerald-950/60 border border-emerald-700/50 flex items-center justify-center text-emerald-400">
            <MapPin size={14} />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-200">School Safe Zone</p>
            <p className="text-[9px] text-slate-400">Arrived 08:30 • GPS Active</p>
          </div>
        </div>
        <span className="text-[9px] text-slate-400 font-mono">Inside</span>
      </div>

      {/* Recent Contextual Safety Notification */}
      <div className="bg-slate-900/90 border border-amber-900/40 rounded-2xl p-2.5">
        <div className="flex items-center gap-1.5 text-amber-400 text-[10px] font-semibold mb-1">
          <ShieldCheck size={12} />
          <span>AI Safety Check • Clean</span>
        </div>
        <p className="text-[10px] text-slate-300 leading-snug">
          Contextual AI verified 14 inbound messages today. 0 hazards detected.
        </p>
      </div>

      {/* App Icons Dock */}
      <div className="mt-auto pt-2 grid grid-cols-4 gap-2 text-center">
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-900/40">
            <ShieldCheck size={18} />
          </div>
          <span className="text-[9px] text-slate-300">Guard</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-900/40">
            <Sparkles size={18} />
          </div>
          <span className="text-[9px] text-slate-300">Trust</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-900/40">
            <Download size={18} />
          </div>
          <span className="text-[9px] text-slate-300">Apps</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <div className="w-10 h-10 rounded-2xl bg-rose-700 flex items-center justify-center text-white shadow-md shadow-rose-950/40">
            <Heart size={18} />
          </div>
          <span className="text-[9px] text-slate-300">SOS</span>
        </div>
      </div>
    </div>
  );
};

const ParentVerifyScreenView: React.FC = () => {
  return (
    <div className="flex flex-col gap-3 py-1 text-left animate-fadeIn">
      <div className="text-center pt-2 pb-1">
        <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/40 mx-auto flex items-center justify-center text-blue-400 mb-2">
          <UserCheck size={24} />
        </div>
        <h3 className="text-sm font-bold text-white">Parent Verification</h3>
        <p className="text-[10px] text-slate-400 mt-0.5">Step 1 of 3: Secure ID & Face Match</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex flex-col items-center text-center">
        <div className="w-24 h-24 rounded-full border-2 border-dashed border-blue-500/80 flex items-center justify-center relative my-1 bg-slate-950/60">
          <div className="w-20 h-20 rounded-full bg-blue-950/40 flex items-center justify-center text-blue-400">
            <span className="text-[10px] font-mono">Biometric Mesh</span>
          </div>
          <div className="absolute top-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900 animate-ping" />
        </div>
        <span className="text-[10px] font-medium text-emerald-400 mt-1 flex items-center gap-1">
          <CheckCircle2 size={11} /> Live Liveness Verified
        </span>
        <p className="text-[9px] text-slate-400 mt-1">
          Government ID verified with on-device facial biometric enclave.
        </p>
      </div>

      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-2.5 text-[10px] text-slate-300 space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Device ID:</span>
          <span className="font-mono text-white text-[9px]">GG-UK-9082X</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-400">Parent Cryptokey:</span>
          <span className="text-emerald-400 font-mono text-[9px]">Enclave Paired ✓</span>
        </div>
      </div>

      <div className="mt-auto pt-2">
        <button className="w-full py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold shadow-lg shadow-blue-900/50">
          Link Child Device
        </button>
      </div>
    </div>
  );
};

const AgeSetupScreenView: React.FC<{ age: number }> = ({ age }) => {
  return (
    <div className="flex flex-col gap-3 py-1 text-left animate-fadeIn">
      <div className="text-center pt-1">
        <span className="text-[9px] font-mono text-blue-400 font-semibold uppercase tracking-wider">Step 2: Configuration</span>
        <h3 className="text-sm font-bold text-white mt-0.5">Age-Based Protection</h3>
        <p className="text-[10px] text-slate-400">Select age to calibrate starting baseline</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 text-center">
        <span className="text-[10px] text-slate-400">Selected Age</span>
        <div className="text-3xl font-extrabold text-blue-400 my-0.5">{age}</div>
        <span className="text-[10px] font-medium text-slate-300">
          {age <= 12 ? 'Early Discovery Shield' : age <= 15 ? 'Middle Teen Guardian' : 'Independent Navigator'}
        </span>
      </div>

      <div className="space-y-2 text-[10px]">
        <div className="bg-slate-900/90 border border-slate-800/90 rounded-xl p-2 flex items-center justify-between">
          <span className="text-slate-400">AI Sensitivity:</span>
          <span className="font-semibold text-blue-300">{age <= 12 ? 'Very High' : age <= 15 ? 'Moderate' : 'Low-Intervention'}</span>
        </div>
        <div className="bg-slate-900/90 border border-slate-800/90 rounded-xl p-2 flex items-center justify-between">
          <span className="text-slate-400">App Store Approval:</span>
          <span className="font-semibold text-blue-300">{age <= 12 ? 'Parent Approval' : age <= 15 ? 'Tiered Approval' : 'Advisory Scan'}</span>
        </div>
        <div className="bg-slate-900/90 border border-slate-800/90 rounded-xl p-2 flex items-center justify-between">
          <span className="text-slate-400">Safe Zone Alert Mode:</span>
          <span className="font-semibold text-blue-300">{age <= 14 ? 'Automatic Push' : 'Check-In Mode'}</span>
        </div>
      </div>

      <p className="text-[8.5px] text-slate-400 leading-tight">
        * Baseline automatically adjusts as the child matures, while parents can fine-tune preferences at any time.
      </p>

      <button className="w-full mt-auto py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold">
        Confirm Baseline Setup
      </button>
    </div>
  );
};

const AiChatScreenView: React.FC = () => {
  return (
    <div className="flex flex-col gap-2 py-1 text-left h-full animate-fadeIn">
      {/* Chat header */}
      <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
        <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300">
          U#
        </div>
        <div className="flex-1">
          <p className="text-[11px] font-semibold text-white">Unknown Contact</p>
          <p className="text-[8px] text-amber-400">Unverified account • 0 mutuals</p>
        </div>
      </div>

      {/* Message stream */}
      <div className="space-y-2 flex-1 text-[10px]">
        <div className="bg-slate-800/90 rounded-2xl rounded-tl-sm p-2.5 text-slate-200 max-w-[90%]">
          Hey! Enter your password here to claim 5,000 free BattlePass gems before the promo ends: 
          <span className="text-blue-400 underline block mt-1 font-mono text-[9px]">bit.ly/claim-gems-89x</span>
        </div>

        {/* GrowGuard AI Contextual Warning Card */}
        <div className="bg-amber-950/70 border border-amber-500/60 rounded-xl p-2.5 text-amber-100 shadow-md">
          <div className="flex items-center gap-1.5 font-bold text-[10px] text-amber-300">
            <AlertTriangle size={13} />
            <span>GrowGuard AI Safety Alert</span>
          </div>
          <p className="text-[9px] text-amber-200/90 mt-1 leading-snug">
            Context signals detected: <strong>Artificial urgency</strong> + <strong>Credential solicitation</strong> from an unknown contact.
          </p>
          <div className="mt-2 flex gap-1.5">
            <button className="flex-1 py-1 rounded bg-amber-600/40 hover:bg-amber-600/60 text-[9px] font-semibold text-amber-200 border border-amber-500/40">
              Block & Report
            </button>
            <button className="px-2 py-1 rounded bg-slate-800 text-[9px] text-slate-300">
              Why was this flagged?
            </button>
          </div>
        </div>
      </div>

      <div className="pt-1 border-t border-slate-800 flex items-center gap-1 text-[10px] text-slate-400">
        <ShieldCheck size={11} className="text-blue-400" />
        <span>Contextual AI evaluating live thread</span>
      </div>
    </div>
  );
};

const CuratedStoreScreenView: React.FC = () => {
  return (
    <div className="flex flex-col gap-2.5 py-1 text-left animate-fadeIn">
      <div className="flex items-center justify-between pb-1 border-b border-slate-800">
        <h3 className="text-xs font-bold text-white">Curated App Store</h3>
        <span className="text-[9px] px-2 py-0.5 rounded-full bg-blue-900/60 text-blue-300 border border-blue-700">
          Age 13 Tier
        </span>
      </div>

      <div className="space-y-2 text-[10px]">
        {/* App Item 1 - Approved */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center font-bold text-white text-xs">
              Du
            </div>
            <div>
              <p className="font-semibold text-white">Language Master</p>
              <p className="text-[8.5px] text-emerald-400">Age Appropriate • No Ads</p>
            </div>
          </div>
          <span className="px-2 py-1 rounded-lg bg-slate-800 text-[9px] text-slate-300">Installed</span>
        </div>

        {/* App Item 2 - Requires Parent Review */}
        <div className="bg-slate-900 border border-amber-800/40 rounded-xl p-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-xs">
              Sx
            </div>
            <div>
              <p className="font-semibold text-white">Social Nexus</p>
              <p className="text-[8.5px] text-amber-400">AI: Open messaging detected</p>
            </div>
          </div>
          <button className="px-2 py-1 rounded-lg bg-blue-600 text-[9px] font-semibold text-white">
            Ask Parent
          </button>
        </div>

        {/* App Item 3 - Restricted */}
        <div className="bg-slate-900/60 border border-slate-800/60 rounded-xl p-2 flex items-center justify-between opacity-70">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center font-bold text-slate-400 text-xs">
              <Lock size={14} />
            </div>
            <div>
              <p className="font-semibold text-slate-300">Casino Royale 3D</p>
              <p className="text-[8.5px] text-rose-400">Restricted for under 18s</p>
            </div>
          </div>
          <span className="text-[9px] text-rose-400 font-mono">Blocked</span>
        </div>
      </div>

      <div className="bg-blue-950/40 border border-blue-900/50 rounded-xl p-2 text-[9px] text-blue-200 mt-auto">
        <p className="font-semibold flex items-center gap-1">
          <Sparkles size={11} className="text-blue-400" /> AI App Profiling Active
        </p>
        <p className="text-slate-300 mt-0.5">Scans privacy policies, dark patterns, and in-app purchase frequency.</p>
      </div>
    </div>
  );
};

const GeofenceMapScreenView: React.FC = () => {
  return (
    <div className="flex flex-col gap-2 py-1 text-left animate-fadeIn h-full">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-white">Safe Zones (GPS)</h3>
        <span className="text-[9px] text-emerald-400 font-mono flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live Telemetry
        </span>
      </div>

      {/* Simulated Map Visual */}
      <div className="w-full h-36 bg-slate-900 border border-slate-800 rounded-2xl relative overflow-hidden flex items-center justify-center">
        {/* Subtle grid lines */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:12px_12px]" />
        
        {/* Home Safe Zone Circle */}
        <div className="absolute top-4 left-6 w-14 h-14 rounded-full border border-blue-500/50 bg-blue-500/10 flex items-center justify-center">
          <span className="text-[8px] font-semibold text-blue-300">Home</span>
        </div>

        {/* School Safe Zone Circle (Active) */}
        <div className="absolute bottom-4 right-6 w-20 h-20 rounded-full border-2 border-emerald-500/70 bg-emerald-500/20 flex flex-col items-center justify-center animate-pulse">
          <span className="text-[8px] font-bold text-emerald-300">School Zone</span>
          <span className="text-[7px] text-emerald-400 font-mono">Current Location</span>
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-white mt-0.5" />
        </div>

        {/* Route Corridor path */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <path d="M 40 40 Q 80 80 160 100" stroke="#38BDF8" strokeWidth="2" strokeDasharray="3,3" fill="none" opacity="0.6" />
        </svg>
      </div>

      {/* Safe Zone Details List */}
      <div className="space-y-1.5 text-[10px]">
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin size={12} className="text-emerald-400" />
            <div>
              <p className="font-semibold text-white">St. Mary’s Academy</p>
              <p className="text-[8px] text-slate-400">Entered at 08:31 AM</p>
            </div>
          </div>
          <span className="text-[9px] text-emerald-400 font-medium">Inside Safe Zone</span>
        </div>
      </div>

      <p className="text-[8px] text-slate-400 mt-auto">
        * Powered by hardware GPS and cellular geofencing, without sharing continuous visual tracking to third parties.
      </p>
    </div>
  );
};

const SosScreenView: React.FC = () => {
  return (
    <div className="flex flex-col gap-2.5 py-1 text-center animate-fadeIn h-full">
      <div className="w-12 h-12 rounded-full bg-rose-600/20 border-2 border-rose-500/60 mx-auto flex items-center justify-center text-rose-400 my-1">
        <Heart size={22} className="animate-pulse" />
      </div>

      <div>
        <h3 className="text-sm font-bold text-white">Emergency SOS</h3>
        <p className="text-[10px] text-slate-300 mt-0.5">Calm assistance is ready</p>
      </div>

      <div className="bg-rose-950/40 border border-rose-800/60 rounded-2xl p-3 text-left space-y-1.5 text-[10px]">
        <div className="flex items-center justify-between">
          <span className="text-slate-300">Guardian 1 (Mom):</span>
          <span className="text-emerald-400 font-semibold">Priority Dispatch ✓</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-300">Live GPS Coordinates:</span>
          <span className="text-blue-300 font-mono text-[9px]">51.5074° N, 0.1278° W</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-300">Emergency Services:</span>
          <span className="text-slate-200">1-Tap 999/911 Ready</span>
        </div>
      </div>

      <div className="mt-auto space-y-2">
        <button className="w-full py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-950/70 flex items-center justify-center gap-2">
          <Phone size={14} /> Send Location to Trusted Adults
        </button>
        <button className="w-full py-2 rounded-xl bg-slate-800 text-slate-300 text-[10px]">
          Cancel (5s cooldown)
        </button>
      </div>
    </div>
  );
};

const TrustDashboardScreenView: React.FC<{ age: number }> = ({ age }) => {
  return (
    <div className="flex flex-col gap-2.5 py-1 text-left animate-fadeIn">
      <div className="flex items-center justify-between pb-1 border-b border-slate-800">
        <div className="flex items-center gap-1.5">
          <Sparkles size={14} className="text-amber-400" />
          <h3 className="text-xs font-bold text-white">Trust Mode Hub</h3>
        </div>
        <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30">
          Age {age} Level
        </span>
      </div>

      {/* Progress Card */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-950/60 border border-indigo-800/40 rounded-2xl p-3">
        <span className="text-[10px] text-indigo-300">Independence Progress</span>
        <div className="flex items-baseline justify-between my-1">
          <span className="text-2xl font-bold text-white">84%</span>
          <span className="text-[10px] text-emerald-400 font-medium">+15m weekend autonomy</span>
        </div>
        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full rounded-full w-[84%]" />
        </div>
      </div>

      {/* Habit Metrics */}
      <div className="space-y-2 text-[10px]">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={13} className="text-emerald-400" />
            <span className="text-slate-200">Wind-down Bedtime Kept</span>
          </div>
          <span className="text-emerald-400 font-mono text-[9px]">7/7 Days</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={13} className="text-emerald-400" />
            <span className="text-slate-200">Study Focus Mode Used</span>
          </div>
          <span className="text-emerald-400 font-mono text-[9px]">4.5 hrs</span>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={13} className="text-emerald-400" />
            <span className="text-slate-200">Zero Flagged Risky Links</span>
          </div>
          <span className="text-blue-400 font-mono text-[9px]">Excellent</span>
        </div>
      </div>

      <div className="bg-slate-900/60 rounded-xl p-2 text-[8.5px] text-slate-400 mt-auto">
        💡 Trust Mode encourages healthy habits through earned freedom, never punitive lockdown.
      </div>
    </div>
  );
};

const ParentDashboardScreenView: React.FC<{ age: number }> = ({ age }) => {
  return (
    <div className="flex flex-col gap-2 py-1 text-left animate-fadeIn">
      <div className="flex items-center justify-between pb-1 border-b border-slate-800">
        <div>
          <span className="text-[8px] font-mono text-blue-400 font-semibold">GROWGUARD PARENT</span>
          <h3 className="text-xs font-bold text-white">Alex’s Phone (Age {age})</h3>
        </div>
        <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700">
          Sync Active
        </span>
      </div>

      {/* Summary card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2.5 space-y-1.5 text-[10px]">
        <div className="flex items-center justify-between text-slate-300">
          <span>Today’s Screen Time:</span>
          <span className="font-bold text-white">1h 42m</span>
        </div>
        <div className="flex items-center justify-between text-slate-300">
          <span>Safe Zone Status:</span>
          <span className="text-emerald-400 font-medium">At School (08:31)</span>
        </div>
        <div className="flex items-center justify-between text-slate-300">
          <span>Trust Mode Streak:</span>
          <span className="text-amber-400 font-medium">12 Days Clean</span>
        </div>
      </div>

      {/* AI Contextual Insight Panel */}
      <div className="bg-blue-950/60 border border-blue-800/50 rounded-2xl p-2.5 text-[9.5px]">
        <div className="flex items-center gap-1 text-blue-300 font-bold mb-1">
          <Sparkles size={11} />
          <span>AI Context Explanation</span>
        </div>
        <p className="text-slate-200 leading-snug">
          1 external phishing link neutralized on Discord yesterday. User chose to report immediately without opening.
        </p>
      </div>

      {/* Pending Action item */}
      <div className="bg-slate-900 border border-amber-800/50 rounded-xl p-2 flex items-center justify-between text-[10px]">
        <div>
          <p className="font-semibold text-white">App Request: Duolingo Plus</p>
          <p className="text-[8.5px] text-slate-400">Education Category • Safe</p>
        </div>
        <button className="px-2 py-1 rounded bg-blue-600 text-white font-semibold text-[9px]">
          Approve
        </button>
      </div>
    </div>
  );
};

const GraduatedIndependenceScreenView: React.FC = () => {
  return (
    <div className="flex flex-col gap-3 py-1 text-center animate-fadeIn h-full">
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 mx-auto flex items-center justify-center text-white my-1 shadow-lg shadow-blue-900/50">
        <TrendingUp size={24} />
      </div>

      <div>
        <span className="text-[9px] font-mono text-emerald-400 font-semibold">AGE 17 MILESTONE</span>
        <h3 className="text-sm font-bold text-white">Autonomous Navigator</h3>
        <p className="text-[10px] text-slate-400 mt-0.5">Transitioning to adult operating system</p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 text-left space-y-2 text-[10px]">
        <div className="flex items-center justify-between">
          <span className="text-slate-300">Parental Monitoring:</span>
          <span className="text-slate-400 font-mono text-[9px]">Advisory Only</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-300">App Store Freedom:</span>
          <span className="text-emerald-400 font-semibold">Unrestricted</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-slate-300">Emergency SOS:</span>
          <span className="text-emerald-400 font-semibold">Always Armed</span>
        </div>
      </div>

      <div className="bg-emerald-950/40 border border-emerald-800/40 rounded-xl p-2 text-[9px] text-emerald-200 mt-auto">
        🌱 The smartphone that grew with you has equipped you for a safe, self-regulated digital life.
      </div>
    </div>
  );
};
