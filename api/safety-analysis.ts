import { GoogleGenAI } from '@google/genai';

type RiskLevel = 'Low' | 'Moderate' | 'Elevated' | 'Critical';

type SafetyAction =
  | 'ALLOW'
  | 'NUDGE'
  | 'WARN'
  | 'BLOCK'
  | 'GUARDIAN_ALERT';

interface AIAnalysis {
  score: number;
  level: RiskLevel;
  action: SafetyAction;
  signals: string[];
  reasons: string[];
  explanation: string;
}

function clampScore(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)));
}

function getRiskLevel(score: number): RiskLevel {
  if (score >= 75) return 'Critical';
  if (score >= 50) return 'Elevated';
  if (score >= 25) return 'Moderate';
  return 'Low';
}

function getAgeSensitivity(age: number): string {
  if (age <= 11) {
    return `
The user is a young child.

Use strong protective intervention when the message represents a
meaningful safety risk. A child may have less ability to recognise
manipulation, threats, coercion, scams, or dangerous contact.

Do NOT make a dangerous message less serious simply because the user
is young.
`;
  }

  if (age <= 13) {
    return `
The user is a younger teenager.

Use stronger protective intervention for serious threats, coercion,
manipulation, bullying, dangerous contact, scams, or requests for
sensitive information.

The underlying danger of the message must remain independent of age.
`;
  }

  if (age <= 15) {
    return `
The user is a mid-teenager.

Preserve the full seriousness of genuine threats, coercion,
blackmail, stalking, dangerous contact, or other significant risks.

Age may influence the intervention, but must not artificially make
the underlying message safer.
`;
  }

  return `
The user is an older teenager.

Assess the message on its actual content and context first.
Age can influence the intervention and level of autonomy, but a
genuine threat or serious safety risk must still receive a high
risk score.
`;
}

function getAgeAppropriateAction(
  score: number,
  age: number
): SafetyAction {
  /*
   * IMPORTANT:
   *
   * The score represents the danger of the MESSAGE.
   * Age does not reduce that score.
   *
   * Age only changes how GrowGuard responds.
   */

  if (score >= 85) {
    return 'GUARDIAN_ALERT';
  }

  if (score >= 70) {
    return age <= 12 ? 'BLOCK' : 'WARN';
  }

  if (score >= 50) {
    return age <= 13 ? 'WARN' : 'NUDGE';
  }

  if (score >= 30) {
    return age <= 11 ? 'WARN' : 'NUDGE';
  }

  return 'ALLOW';
}

function extractJson(text: string): AIAnalysis | null {
  try {
    const cleaned = text
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();

    const parsed = JSON.parse(cleaned);

    if (
      typeof parsed.score !== 'number' ||
      !Array.isArray(parsed.signals) ||
      !Array.isArray(parsed.reasons) ||
      typeof parsed.explanation !== 'string'
    ) {
      return null;
    }

    const score = clampScore(parsed.score);

    return {
      score,
      level: getRiskLevel(score),
      action: getAgeAppropriateAction(score, 13),
      signals: parsed.signals.map(String),
      reasons: parsed.reasons.map(String),
      explanation: parsed.explanation
    };
  } catch {
    return null;
  }
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed'
    });
  }

  try {
    const { message, age } = req.body ?? {};

    if (typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({
        error: 'A message is required.'
      });
    }

    if (
      typeof age !== 'number' ||
      !Number.isFinite(age) ||
      age < 10 ||
      age > 17
    ) {
      return res.status(400).json({
        error: 'Age must be a number between 10 and 17.'
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: 'GEMINI_API_KEY is not configured on the server.'
      });
    }

    const ai = new GoogleGenAI({
      apiKey
    });

    const prompt = `
You are the safety-analysis system inside GrowGuard,
an age-adaptive smartphone safety system for young people.

Analyse the following message for safety risk.

USER AGE:
${age}

MESSAGE:
"""
${message}
"""

IMPORTANT PRINCIPLES:

1. Analyse meaning and context, NOT just exact keywords.

2. Recognise many forms of harmful behaviour, including:
   - physical threats
   - threats of violence
   - stalking or surveillance
   - intimidation
   - bullying
   - coercion
   - blackmail
   - extortion
   - manipulation
   - grooming indicators
   - requests for location or personal information
   - dangerous meetings
   - harassment
   - reputation attacks
   - threats to spread rumours or private information
   - fake emergency or police threats
   - phishing
   - credential theft
   - financial scams
   - suspicious downloads
   - other serious digital-safety risks

3. Do NOT require a keyword to identify a risk.

4. Understand paraphrases and indirect language.

5. A serious threat remains serious regardless of the user's age.

6. The SCORE represents the danger of the message itself.

7. Do NOT lower the score simply because the user is older.

8. Age affects the appropriate intervention, not whether a genuinely
dangerous message is dangerous.

9. Consider the surrounding meaning of the whole message.

10. Do not invent facts that are not present.

Return ONLY valid JSON in exactly this structure:

{
  "score": number,
  "signals": ["signal 1", "signal 2"],
  "reasons": ["reason 1", "reason 2"],
  "explanation": "short explanation"
}

SCORING GUIDE:

0-19:
No meaningful safety concern or very minor concern.

20-39:
Some concern, but relatively limited risk.

40-59:
Meaningful safety concern requiring attention.

60-74:
High safety concern.

75-89:
Very high safety concern.

90-100:
Severe or highly credible safety concern.

Examples of severe situations include credible threats of violence,
serious stalking, coercion involving significant danger, or highly
serious attempts to obtain sensitive information.

The score should reflect the actual message, not merely whether it
contains a particular word.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt
    });

    const responseText = response.text ?? '';

    const aiResult = extractJson(responseText);

    if (!aiResult) {
      return res.status(500).json({
        error: 'The AI returned an invalid safety analysis.'
      });
    }

    /*
     * The AI determines the danger score.
     * GrowGuard determines the age-appropriate action.
     */

    const finalScore = clampScore(aiResult.score);
    const finalLevel = getRiskLevel(finalScore);
    const finalAction = getAgeAppropriateAction(finalScore, age);

    const ageNote = getAgeSensitivity(age);

    return res.status(200).json({
      score: finalScore,
      level: finalLevel,
      action: finalAction,
      signals: aiResult.signals,
      reasons: [
        ...aiResult.reasons,
        `GrowGuard applied age-adaptive protection for a ${age}-year-old user.`
      ],
      explanation:
        aiResult.explanation +
        ' ' +
        ageNote.trim()
    });
  } catch (error) {
    console.error('Safety analysis error:', error);

    return res.status(500).json({
      error: 'Safety analysis failed.'
    });
  }
}
