import React, { useState } from 'react';
import { analyzeMessage, SafetyAnalysis } from '../services/safetyEngine';
import { PageId } from '../types';

interface SafetyLabPageProps {
  onNavigate: (page: PageId) => void;
}

export const SafetyLabPage: React.FC<SafetyLabPageProps> = ({ onNavigate }) => {
  const [message, setMessage] = useState(
    'Send me your password right now or your account will be deleted'
  );

  const [age, setAge] = useState(13);
  const [result, setResult] = useState<SafetyAnalysis | null>(null);

  const analyse = () => {
    setResult(analyzeMessage(message, age));
  };

  const getActionLabel = (action: string) => {
    switch (action) {
      case 'ALLOW':
        return 'ALLOW';
      case 'NUDGE':
        return 'NUDGE USER';
      case 'WARN':
        return 'SHOW WARNING';
      case 'BLOCK':
        return 'BLOCK ACTION';
      case 'GUARDIAN_ALERT':
        return 'ALERT GUARDIAN';
      default:
        return action;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 py-12">
      <div className="max-w-5xl mx-auto space-y-10">

        {/* Header */}
        <div className="text-center space-y-4">
          <span className="inline-block px-3 py-1 rounded-full bg-blue-950 text-blue-300 border border-blue-800 text-xs font-mono">
            GROWGUARD SAFETY LAB
          </span>

          <h1 className="text-4xl sm:text-6xl font-bold">
            Test the Safety Engine
          </h1>

          <p className="text-slate-400 max-w-2xl mx-auto">
            Enter a message and see how GrowGuard evaluates potential
            safety signals and changes its response according to age.
          </p>
        </div>

        {/* Input */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">

          <div>
            <label className="block text-sm font-semibold mb-2">
              Message
            </label>

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              className="w-full bg-slate-950 border border-slate-700 rounded-2xl p-4 text-sm text-white outline-none focus:border-blue-500"
              placeholder="Enter a message to analyse..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              User age: {age}
            </label>

            <input
              type="range"
              min="10"
              max="17"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <button
            onClick={analyse}
            className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 font-bold transition"
          >
            Analyse with GrowGuard
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Risk */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">

              <div>
                <span className="text-xs font-mono text-slate-500">
                  RISK ASSESSMENT
                </span>

                <div className="flex items-end gap-3 mt-2">
                  <span className="text-6xl font-bold">
                    {result.score}
                  </span>

                  <span className="text-slate-400 mb-2">
                    / 100
                  </span>
                </div>

                <div className="text-blue-400 font-bold mt-2">
                  {result.level} Risk
                </div>
              </div>

              {/* Signals */}
              <div>
                <h3 className="font-bold mb-3">
                  Detected Signals
                </h3>

                {result.signals.length === 0 ? (
                  <p className="text-slate-500 text-sm">
                    No significant safety signals detected.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {result.signals.map((signal, index) => (
                      <div
                        key={index}
                        className="bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm"
                      >
                        {signal}
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* Decision */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">

              <div>
                <span className="text-xs font-mono text-slate-500">
                  GROWGUARD DECISION
                </span>

                <div className="mt-3 inline-block px-4 py-2 rounded-xl bg-blue-950 border border-blue-800 text-blue-300 font-bold">
                  {getActionLabel(result.action)}
                </div>
              </div>

              <div>
                <h3 className="font-bold mb-3">
                  Why?
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed">
                  {result.explanation}
                </p>
              </div>

              <div>
                <h3 className="font-bold mb-3">
                  Reasoning Signals
                </h3>

                <div className="space-y-2">
                  {result.reasons.map((reason, index) => (
                    <div
                      key={index}
                      className="text-sm text-slate-400 bg-slate-950 rounded-xl p-3"
                    >
                      {reason}
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* Back */}
        <div className="text-center">
          <button
            onClick={() => onNavigate('home')}
            className="text-slate-500 hover:text-white text-sm"
          >
            ← Back to GrowGuard
          </button>
        </div>

      </div>
    </div>
  );
};
