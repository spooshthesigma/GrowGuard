import React, { useState } from 'react';
import { PageId } from '../types';

interface SafetyLabPageProps {
  onNavigate: (page: PageId) => void;
}

type RiskLevel = 'Low' | 'Moderate' | 'Elevated' | 'Critical';

type SafetyAction =
  | 'ALLOW'
  | 'NUDGE'
  | 'WARN'
  | 'BLOCK'
  | 'GUARDIAN_ALERT';

interface SafetyAnalysis {
  score: number;
  level: RiskLevel;
  action: SafetyAction;
  signals: string[];
  reasons: string[];
  explanation: string;
}

export const SafetyLabPage: React.FC<SafetyLabPageProps> = ({
  onNavigate
}) => {
  const [message, setMessage] = useState(
    'Send me your password right now or your account will be deleted'
  );

  const [age, setAge] = useState(13);
  const [result, setResult] = useState<SafetyAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const analyse = async () => {
    if (!message.trim()) {
      setError('Please enter a message to analyse.');
      setResult(null);
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('/api/safety-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message,
          age
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || 'Safety analysis failed.'
        );
      }

      setResult(data as SafetyAnalysis);
    } catch (err) {
      console.error('Safety Lab error:', err);

      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong while analysing the message.'
      );
    } finally {
      setLoading(false);
    }
  };

  const getActionLabel = (action: SafetyAction) => {
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

  const getRiskDescription = (level: RiskLevel) => {
    switch (level) {
      case 'Low':
        return 'Little or no significant safety risk detected.';

      case 'Moderate':
        return 'Some safety concerns were detected and may require attention.';

      case 'Elevated':
        return 'A significant safety concern was detected.';

      case 'Critical':
        return 'A severe safety concern was detected and requires strong protection.';

      default:
        return '';
    }
  };

  const getRiskNumberClass = (level: RiskLevel) => {
    switch (level) {
      case 'Low':
        return 'text-emerald-400';

      case 'Moderate':
        return 'text-yellow-400';

      case 'Elevated':
        return 'text-orange-400';

      case 'Critical':
        return 'text-red-400';

      default:
        return 'text-white';
    }
  };

  const getRiskBadgeClass = (level: RiskLevel) => {
    switch (level) {
      case 'Low':
        return 'bg-emerald-950 border-emerald-800 text-emerald-300';

      case 'Moderate':
        return 'bg-yellow-950 border-yellow-800 text-yellow-300';

      case 'Elevated':
        return 'bg-orange-950 border-orange-800 text-orange-300';

      case 'Critical':
        return 'bg-red-950 border-red-800 text-red-300';

      default:
        return 'bg-blue-950 border-blue-800 text-blue-300';
    }
  };

  const getActionClass = (action: SafetyAction) => {
    switch (action) {
      case 'ALLOW':
        return 'bg-emerald-950 border-emerald-800 text-emerald-300';

      case 'NUDGE':
        return 'bg-blue-950 border-blue-800 text-blue-300';

      case 'WARN':
        return 'bg-yellow-950 border-yellow-800 text-yellow-300';

      case 'BLOCK':
        return 'bg-orange-950 border-orange-800 text-orange-300';

      case 'GUARDIAN_ALERT':
        return 'bg-red-950 border-red-800 text-red-300';

      default:
        return 'bg-blue-950 border-blue-800 text-blue-300';
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
            Enter a message and see how GrowGuard's AI evaluates
            its meaning, context and potential safety risks.
            The response also adapts to the user's age.
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
              onChange={(e) => {
                setMessage(e.target.value);
                setError('');
              }}
              rows={6}
              className="w-full bg-slate-950 border border-slate-700 rounded-2xl p-4 text-sm text-white outline-none focus:border-blue-500 transition"
              placeholder="Enter a message to analyse..."
            />

          </div>

          {/* Age */}
          <div>

            <div className="flex items-center justify-between mb-2">

              <label className="text-sm font-semibold">
                User age
              </label>

              <span className="text-blue-400 font-bold text-lg">
                {age}
              </span>

            </div>

            <input
              type="range"
              min="10"
              max="17"
              value={age}
              onChange={(e) => {
                setAge(Number(e.target.value));
                setError('');
              }}
              className="w-full accent-blue-600"
            />

            <div className="flex justify-between text-xs text-slate-600 mt-2">
              <span>10</span>
              <span>11</span>
              <span>12</span>
              <span>13</span>
              <span>14</span>
              <span>15</span>
              <span>16</span>
              <span>17</span>
            </div>

            <p className="text-xs text-slate-500 mt-3">
              Age changes the appropriate level of intervention.
              It does not make a genuinely dangerous message safe.
            </p>

          </div>

          {/* Analyse button */}
          <button
            onClick={analyse}
            disabled={loading}
            className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-400 font-bold transition"
          >
            {loading
              ? 'Analysing with GrowGuard AI...'
              : 'Analyse with GrowGuard AI'}
          </button>

          {/* Error */}
          {error && (
            <div className="bg-red-950/60 border border-red-800 rounded-2xl p-4 text-sm text-red-300">
              <div className="font-bold mb-1">
                Analysis failed
              </div>

              <div>
                {error}
              </div>
            </div>
          )}

        </div>

        {/* Loading */}
        {loading && (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 text-center">

            <div className="text-blue-400 font-bold mb-2">
              GrowGuard AI is analysing the message
            </div>

            <p className="text-slate-500 text-sm">
              Checking meaning, context, severity and age-appropriate
              protection.
            </p>

          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Risk Assessment */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-7">

              <div>

                <span className="text-xs font-mono text-slate-500">
                  AI RISK ASSESSMENT
                </span>

                <div className="flex items-end gap-3 mt-2">

                  <span
                    className={`text-6xl font-bold ${getRiskNumberClass(
                      result.level
                    )}`}
                  >
                    {result.score}
                  </span>

                  <span className="text-slate-400 mb-2">
                    / 100
                  </span>

                </div>

                <div
                  className={`inline-block mt-3 px-3 py-1 rounded-lg border text-sm font-bold ${getRiskBadgeClass(
                    result.level
                  )}`}
                >
                  {result.level} Risk
                </div>

                <p className="text-slate-500 text-sm mt-3">
                  {getRiskDescription(result.level)}
                </p>

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
                        key={`${signal}-${index}`}
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
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-7">

              <div>

                <span className="text-xs font-mono text-slate-500">
                  GROWGUARD DECISION
                </span>

                <div
                  className={`mt-3 inline-block px-4 py-2 rounded-xl border font-bold ${getActionClass(
                    result.action
                  )}`}
                >
                  {getActionLabel(result.action)}
                </div>

              </div>

              {/* Explanation */}
              <div>

                <h3 className="font-bold mb-3">
                  Why?
                </h3>

                <p className="text-slate-400 text-sm leading-relaxed">
                  {result.explanation}
                </p>

              </div>

              {/* Reasons */}
              <div>

                <h3 className="font-bold mb-3">
                  AI Reasoning
                </h3>

                {result.reasons.length === 0 ? (
                  <p className="text-slate-500 text-sm">
                    No additional reasoning was provided.
                  </p>
                ) : (
                  <div className="space-y-2">

                    {result.reasons.map((reason, index) => (
                      <div
                        key={`${reason}-${index}`}
                        className="text-sm text-slate-400 bg-slate-950 rounded-xl p-3"
                      >
                        {reason}
                      </div>
                    ))}

                  </div>
                )}

              </div>

              {/* Age information */}
              <div className="border-t border-slate-800 pt-5">

                <div className="text-xs font-mono text-slate-500 mb-2">
                  AGE-ADAPTIVE PROTECTION
                </div>

                <p className="text-sm text-slate-400 leading-relaxed">
                  This assessment was made for a{' '}
                  <span className="text-white font-semibold">
                    {age}-year-old
                  </span>
                  . GrowGuard keeps the underlying risk assessment
                  focused on the message while adapting the intervention
                  to the user's developmental stage.
                </p>

              </div>

            </div>

          </div>
        )}

        {/* How it works */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">

          <div className="text-xs font-mono text-slate-500 mb-4">
            HOW GROWGUARD AI WORKS
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div className="bg-slate-950 rounded-2xl p-5">

              <div className="text-blue-400 font-bold mb-2">
                01 — Understand
              </div>

              <p className="text-sm text-slate-500 leading-relaxed">
                AI analyses the meaning and context of the message
                rather than relying only on exact keywords.
              </p>

            </div>

            <div className="bg-slate-950 rounded-2xl p-5">

              <div className="text-blue-400 font-bold mb-2">
                02 — Assess
              </div>

              <p className="text-sm text-slate-500 leading-relaxed">
                The system identifies potential safety concerns and
                estimates the severity on a 0–100 scale.
              </p>

            </div>

            <div className="bg-slate-950 rounded-2xl p-5">

              <div className="text-blue-400 font-bold mb-2">
                03 — Adapt
              </div>

              <p className="text-sm text-slate-500 leading-relaxed">
                GrowGuard uses the user's age to determine the
                appropriate level of intervention.
              </p>

            </div>

          </div>

        </div>

        {/* Back */}
        <div className="text-center">

          <button
            onClick={() => onNavigate('home')}
            className="text-slate-500 hover:text-white text-sm transition"
          >
            ← Back to GrowGuard
          </button>

        </div>

      </div>
    </div>
  );
};
