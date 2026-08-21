import { GoogleGenAI } from '@google/genai';

type RiskLevel =
  | 'Low'
  | 'Moderate'
  | 'Elevated'
  | 'Critical';

type SafetyAction =
  | 'ALLOW'
  | 'NUDGE'
  | 'WARN'
  | 'BLOCK'
  | 'GUARDIAN_ALERT';

interface AIAnalysis {
  score: number;
  signals: string[];
  reasons: string[];
  explanation: string;
}

/* ============================================================
   BASIC HELPERS
   ============================================================ */

function clampScore(score: number): number {
  return Math.max(0, Math.min(100, Math.round(score)));
}

function getRiskLevel(score: number): RiskLevel {
  if (score >= 75) return 'Critical';
  if (score >= 50) return 'Elevated';
  if (score >= 25) return 'Moderate';
  return 'Low';
}

/* ============================================================
   AGE-ADAPTIVE ACTION
   ============================================================ */

function getAgeAppropriateAction(
  score: number,
  age: number
): SafetyAction {

  if (score >= 90) {
    if (age <= 12) return 'GUARDIAN_ALERT';
    if (age <= 15) return 'BLOCK';
    return 'WARN';
  }

  if (score >= 75) {
    if (age <= 11) return 'GUARDIAN_ALERT';
    if (age <= 14) return 'BLOCK';
    return 'WARN';
  }

  if (score >= 60) {
    if (age <= 12) return 'BLOCK';
    if (age <= 15) return 'WARN';
    return 'NUDGE';
  }

  if (score >= 45) {
    if (age <= 11) return 'BLOCK';
    if (age <= 13) return 'WARN';
    return 'NUDGE';
  }

  if (score >= 25) {
    if (age <= 10) return 'WARN';
    return 'NUDGE';
  }

  return 'ALLOW';
}

/* ============================================================
   AGE EXPLANATION
   ============================================================ */

function getAgeExplanation(age: number): string {
  if (age <= 11) {
    return (
      `The user is ${age}, so GrowGuard applies its strongest ` +
      `age-appropriate protective settings.`
    );
  }

  if (age <= 13) {
    return (
      `The user is ${age}, so GrowGuard applies stronger protective ` +
      `intervention while still allowing appropriate independence.`
    );
  }

  if (age <= 15) {
    return (
      `The user is ${age}, so GrowGuard preserves the seriousness ` +
      `of the risk while allowing more user autonomy where appropriate.`
    );
  }

  return (
    `The user is ${age}, so GrowGuard allows greater independence, ` +
    `but serious safety risks still receive strong intervention.`
  );
}

/* ============================================================
   TEXT NORMALISATION
   ============================================================ */

function normaliseText(message: string): string {
  return message
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim();
}

/* ============================================================
   SAFETY FLOOR
   ============================================================ */

function getSafetyFloor(
  message: string
): {
  minimumScore: number;
  signals: string[];
  reasons: string[];
} {

  const text = normaliseText(message);

  let minimumScore = 0;

  const signals: string[] = [];
  const reasons: string[] = [];

  /* DIRECT THREATS */

  const directThreatPatterns = [
    'i will kill you',
    "i'll kill you",
    'i am going to kill you',
    "i'm going to kill you",
    'i will murder you',
    "i'll murder you",
    'i am going to murder you',
    "i'm going to murder you",
    'i will hurt you',
    "i'll hurt you",
    'i am going to hurt you',
    "i'm going to hurt you",
    'you will die',
    'you are going to die',
    'kill you',
    'murder you'
  ];

  if (
    directThreatPatterns.some(
      phrase => text.includes(phrase)
    )
  ) {
    minimumScore = Math.max(minimumScore, 85);

    signals.push('Direct threat');

    reasons.push(
      'The message contains language indicating a direct threat of serious harm.'
    );
  }

  /* BLACKMAIL / EXTORTION */

  const blackmailIndicators = [
    'give me £',
    'give me $',
    'give me money',
    'send me money',
    'pay me',
    'or i will tell everyone',
    "or i'll tell everyone",
    'or i will expose you',
    "or i'll expose you",
    'i will expose you',
    "i'll expose you",
    'tell everyone your secret',
    "i'll tell everyone your secret",
    'darkest secret',
    'give me what i want or else'
  ];

  const hasBlackmail =
    blackmailIndicators.some(
      phrase => text.includes(phrase)
    );

  const hasCoercion =
    text.includes('or else') ||
    text.includes('if you do not') ||
    text.includes("if you don't");

  if (hasBlackmail && hasCoercion) {
    minimumScore = Math.max(minimumScore, 75);

    signals.push('Blackmail or extortion');

    reasons.push(
      'The message uses coercion or a threat to force the recipient to provide something or take an action.'
    );
  }

  /* STALKING / SURVEILLANCE */

  const stalkingIndicators = [
    'i am watching you',
    "i'm watching you",
    'i watch you every day',
    'i know where you live',
    'i know your address',
    'i know exactly where you live',
    'i know where your bedroom is',
    'i know where your bedroom window is',
    'i am following you',
    "i'm following you",
    'i follow you every day',
    'i know where you go'
  ];

  if (
    stalkingIndicators.some(
      phrase => text.includes(phrase)
    )
  ) {
    minimumScore = Math.max(minimumScore, 80);

    signals.push('Stalking or surveillance');

    reasons.push(
      'The message indicates surveillance, tracking or knowledge of the recipient’s whereabouts.'
    );
  }

  /* LOCATION + THREAT */

  const locationIndicators = [
    'your address',
    'where you live',
    'your house',
    'your home',
    'your bedroom',
    'your bedroom window',
    'maple street',
    'your location'
  ];

  const threatIndicators = [
    'watch your back',
    'i am coming over',
    "i'm coming over",
    'you better watch',
    'you cannot stop me',
    "you can't stop me",
    'you will regret it'
  ];

  const hasLocation =
    locationIndicators.some(
      phrase => text.includes(phrase)
    );

  const hasThreateningLanguage =
    threatIndicators.some(
      phrase => text.includes(phrase)
    );

  if (hasLocation && hasThreateningLanguage) {
    minimumScore = Math.max(minimumScore, 85);

    signals.push('Location + threatening behaviour');

    reasons.push(
      'The message combines knowledge of the recipient’s location with threatening language.'
    );
  }

  /* FAKE EMERGENCY / POLICE */

  const emergencyIndicators = [
    'fake emergency',
    'fake police call',
    'call the police',
    'calling the police',
    'police right now',
    'raid your house',
    'raid your home',
    'fake emergency call'
  ];

  if (
    emergencyIndicators.some(
      phrase => text.includes(phrase)
    )
  ) {
    minimumScore = Math.max(minimumScore, 70);

    signals.push(
      'Threat of emergency-service misuse'
    );

    reasons.push(
      'The message threatens or describes misuse of emergency or police services against the recipient.'
    );
  }

  /* FINANCIAL SCAM */

  const financialIndicators = [
    'credit card number',
    'debit card number',
    'bank details',
    'bank account',
    'payment details'
  ];

  const scamIndicators = [
    'lawsuit',
    'you are being sued',
    'your parents are being sued',
    'pay to cancel',
    'cancel the lawsuit',
    'send your parents'
  ];

  const hasFinancialRequest =
    financialIndicators.some(
      phrase => text.includes(phrase)
    );

  const hasScamThreat =
    scamIndicators.some(
      phrase => text.includes(phrase)
    );

  if (hasFinancialRequest && hasScamThreat) {
    minimumScore = Math.max(minimumScore, 75);

    signals.push('Financial scam or phishing');

    reasons.push(
      'The message combines a financial demand with a threatening or deceptive claim.'
    );
  }

  /* SERIOUS BULLYING */

  const severeBullyingIndicators = [
    'everyone at school hates you',
    'stay home',
    'we are going to make your life',
    'you will not have a single friend',
    'you won’t have a single friend',
    'i will ruin your life',
    'i will destroy your reputation',
    'everyone will hate you'
  ];

  if (
    severeBullyingIndicators.some(
      phrase => text.includes(phrase)
    )
  ) {
    minimumScore = Math.max(minimumScore, 55);

    signals.push(
      'Serious bullying or harassment'
    );

    reasons.push(
      'The message appears designed to intimidate, isolate or seriously distress the recipient.'
    );
  }

  return {
    minimumScore,
    signals,
    reasons
  };
}

/* ============================================================
   SAFE JSON EXTRACTION
   ============================================================ */

function extractJson(
  text: string
): AIAnalysis | null {

  try {
    let cleaned = text.trim();

    cleaned = cleaned
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/i, '')
      .replace(/\s*```$/i, '')
      .trim();

    const firstBrace = cleaned.indexOf('{');
    const lastBrace = cleaned.lastIndexOf('}');

    if (
      firstBrace !== -1 &&
      lastBrace !== -1 &&
      lastBrace > firstBrace
    ) {
      cleaned = cleaned.slice(
        firstBrace,
        lastBrace + 1
      );
    }

    const parsed = JSON.parse(cleaned);

    if (
      typeof parsed.score !== 'number' ||
      !Array.isArray(parsed.signals) ||
      !Array.isArray(parsed.reasons) ||
      typeof parsed.explanation !== 'string'
    ) {
      return null;
    }

    return {
      score: clampScore(parsed.score),
      signals: parsed.signals.map(String),
      reasons: parsed.reasons.map(String),
      explanation: parsed.explanation.trim()
    };

  } catch {
    return null;
  }
}

/* ============================================================
   MAIN VERCEL SERVER FUNCTION
   ============================================================ */

export default async function handler(
  req: any,
  res: any
) {

  /* METHOD CHECK */

  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed'
    });
  }

  try {

    /* READ REQUEST */

    const {
      message,
      age
    } = req.body ?? {};

    /* VALIDATE MESSAGE */

    if (
      typeof message !== 'string' ||
      !message.trim()
    ) {
      return res.status(400).json({
        error: 'A message is required.'
      });
    }

    /* VALIDATE AGE */

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

    const safeAge = Math.round(age);

    /* ========================================================
       GET GEMINI API KEY
       ======================================================== */

    const apiKey =
      process.env.GEMINI_API_KEY;

    if (
      !apiKey ||
      !apiKey.trim()
    ) {
      console.error(
        'GEMINI_API_KEY is missing from the Vercel server environment.'
      );

      return res.status(500).json({
        error:
          'GEMINI_API_KEY is not configured on the server. Check Vercel Environment Variables.'
      });
    }

    /* ========================================================
       CREATE GEMINI CLIENT
       ======================================================== */

    const ai = new GoogleGenAI({
      apiKey: apiKey.trim()
    });

    /* ========================================================
       SAFETY FLOOR
       ======================================================== */

    const safetyFloor =
      getSafetyFloor(message);

    /* ========================================================
       GEMINI PROMPT
       ======================================================== */

    const prompt = `
You are the AI safety-analysis system inside GrowGuard.

GrowGuard is an age-adaptive smartphone safety system for
young people.

Your job is to assess the ACTUAL SAFETY RISK of the message.

Do NOT simply search for keywords.

Understand:

- meaning
- context
- intent
- threats
- coercion
- manipulation
- intimidation
- stalking
- bullying
- harassment
- blackmail
- extortion
- scams
- phishing
- dangerous meetings
- requests for location
- requests for personal information
- requests for credentials
- attempts to obtain financial information
- reputation attacks
- threats to spread private information
- threats involving police or emergency services
- suspicious downloads
- other serious digital-safety risks

USER AGE:

${safeAge}

MESSAGE:

"""
${message}
"""

CRITICAL SCORING RULE:

The score represents the danger of the MESSAGE ITSELF.

Age must NOT make a dangerous message safer.

A serious threat must receive a high score regardless of
whether the user is 10, 14 or 17.

Age is handled separately by GrowGuard when deciding
the appropriate intervention.

SCORING:

0-19
No meaningful safety concern.

20-39
Limited or moderate concern.

40-59
Meaningful safety concern.

60-74
High safety concern.

75-89
Very high safety concern.

90-100
Severe or highly credible safety concern.

SERIOUS EXAMPLES:

A direct threat of serious physical harm should normally be
at least 80/100.

A serious stalking or surveillance message should normally
be at least 75/100.

A serious blackmail or extortion message should normally
be at least 70/100.

A combination of threats and sensitive personal information
should normally be very high risk.

A financial phishing attempt using a threatening fake legal
claim should normally be high risk.

IMPORTANT:

Do NOT invent facts.

Do NOT assume someone is dangerous merely because a harmless
word appears.

Analyse the entire message.

Return ONLY valid JSON.

Use EXACTLY this structure:

{
  "score": number,
  "signals": ["signal 1", "signal 2"],
  "reasons": ["reason 1", "reason 2"],
  "explanation": "short explanation"
}

The score must be an integer from 0 to 100.
`;

    /* ========================================================
       CALL GEMINI
       ======================================================== */

    let response;

    try {

      response =
        await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt
        });

    } catch (geminiError) {

      console.error(
        'Gemini API error:',
        geminiError
      );

      const message =
        geminiError instanceof Error
          ? geminiError.message
          : String(geminiError);

      return res.status(500).json({
        error:
          `Gemini API error: ${message}`
      });
    }

    /* ========================================================
       GET RESPONSE TEXT
       ======================================================== */

    const responseText =
      response.text ?? '';

    console.log(
      'Gemini response received.'
    );

    /* ========================================================
       PARSE RESPONSE
       ======================================================== */

    const aiResult =
      extractJson(responseText);

    if (!aiResult) {

      console.error(
        'Gemini returned invalid JSON:',
        responseText
      );

      return res.status(500).json({
        error:
          'Gemini returned an invalid safety analysis.'
      });
    }

    /* ========================================================
       COMBINE GEMINI + SAFETY FLOOR
       ======================================================== */

    const finalScore =
      clampScore(
        Math.max(
          aiResult.score,
          safetyFloor.minimumScore
        )
      );

    /* ========================================================
       RISK LEVEL
       ======================================================== */

    const finalLevel =
      getRiskLevel(finalScore);

    /* ========================================================
       AGE-ADAPTIVE ACTION
       ======================================================== */

    const finalAction =
      getAgeAppropriateAction(
        finalScore,
        safeAge
      );

    /* ========================================================
       COMBINE SIGNALS
       ======================================================== */

    const combinedSignals =
      Array.from(
        new Set([
          ...safetyFloor.signals,
          ...aiResult.signals
        ])
      );

    /* ========================================================
       COMBINE REASONS
       ======================================================== */

    const combinedReasons =
      Array.from(
        new Set([
          ...safetyFloor.reasons,
          ...aiResult.reasons,
          getAgeExplanation(safeAge)
        ])
      );

    /* ========================================================
       FINAL EXPLANATION
       ======================================================== */

    const explanation =
      `${aiResult.explanation} ` +
      `GrowGuard assessed the message at ${finalScore}/100. ` +
      `${getAgeExplanation(safeAge)}`;

    /* ========================================================
       RETURN RESULT
       ======================================================== */

    return res.status(200).json({

      score: finalScore,

      level: finalLevel,

      action: finalAction,

      signals: combinedSignals,

      reasons: combinedReasons,

      explanation

    });

  } catch (error) {

    /* ========================================================
       ACTUAL ERROR REPORTING
       ======================================================== */

    console.error(
      'Safety analysis error:',
      error
    );

    const errorMessage =
      error instanceof Error
        ? error.message
        : String(error);

    return res.status(500).json({

      error:
        `Safety analysis failed: ${errorMessage}`

    });
  }
}
