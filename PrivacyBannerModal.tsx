import React from 'react';
import { X, ShieldCheck, Lock, EyeOff, Cpu, RefreshCw, AlertCircle } from 'lucide-react';

interface PrivacyBannerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyBannerModal: React.FC<PrivacyBannerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 text-slate-100 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
          <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
            <ShieldCheck size={20} />
          </div>
          <div>
            <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">Concept Integrity</span>
            <h3 className="text-xl font-display font-bold text-white">Privacy, Security & Ethics Charter</h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="space-y-4 my-6 text-sm text-slate-300 leading-relaxed">
          <p>
            GrowGuard is conceptualized as an operating-system-level architecture. Because modern smartphone safety intersects directly with youth privacy and parental trust, our proposed technology is grounded in six non-negotiable ethical pillars:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            
            <div className="bg-slate-800/60 border border-slate-700/60 p-3.5 rounded-2xl">
              <div className="flex items-center gap-2 text-blue-400 font-semibold mb-1">
                <Cpu size={16} />
                <span>1. On-Device AI Inference</span>
              </div>
              <p className="text-xs text-slate-400">
                Contextual language models run locally using dedicated Neural Processing Units (NPUs). Personal text messages are never transmitted to cloud servers for training.
              </p>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/60 p-3.5 rounded-2xl">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-1">
                <EyeOff size={16} />
                <span>2. Data Minimisation</span>
              </div>
              <p className="text-xs text-slate-400">
                Guardians receive contextual risk summaries, not raw chat transcripts. We protect adolescent conversational dignity while flagging actionable safety concerns.
              </p>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/60 p-3.5 rounded-2xl">
              <div className="flex items-center gap-2 text-amber-400 font-semibold mb-1">
                <RefreshCw size={16} />
                <span>3. False Positive Transparency</span>
              </div>
              <p className="text-xs text-slate-400">
                Youth can view the reasoning behind any flagged interaction and request an immediate contextual review or feedback override.
              </p>
            </div>

            <div className="bg-slate-800/60 border border-slate-700/60 p-3.5 rounded-2xl">
              <div className="flex items-center gap-2 text-indigo-400 font-semibold mb-1">
                <Lock size={16} />
                <span>4. Secure Enclave Isolation</span>
              </div>
              <p className="text-xs text-slate-400">
                Parental biometric keys and cryptographic pairing tokens are locked in tamper-resistant hardware hardware enclaves.
              </p>
            </div>

          </div>

          <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-800/50 text-xs text-blue-200">
            <div className="flex items-start gap-2">
              <AlertCircle size={16} className="text-blue-400 shrink-0 mt-0.5" />
              <p>
                <strong>Academic & Prototype Status:</strong> GrowGuard does not claim that current algorithms eliminate all false positives or negatives. Real-world deployment would require extensive multi-stakeholder auditing, child safety certification, and longitudinal privacy reviews.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
          >
            I Understand
          </button>
        </div>

      </div>
    </div>
  );
};
