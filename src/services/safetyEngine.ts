export type RiskLevel = 'Low' | 'Moderate' | 'Elevated' | 'Critical';

export type SafetyAction =
  | 'ALLOW'
  | 'NUDGE'
  | 'WARN'
  | 'BLOCK'
  | 'GUARDIAN_ALERT';

export interface SafetyAnalysis {
  score: number;
  level: RiskLevel;
  action: SafetyAction;
  reasons: string[];
  signals: string[];
  explanation: string;
}

interface Signal {
  name: string;
  points: number;
  reason: string;
}

const SIGNALS: Signal[] = [
  {
    name: 'Credential request',
    points: 35,
    reason:
      'The message asks for a password, passcode, verification code, or other credentials.'
  },
  {
    name: 'Suspicious link',
    points: 25,
    reason:
      'The message contains a link that may require additional verification.'
  },
  {
    name: 'Artificial urgency',
    points: 15,
    reason:
      'The message creates pressure to act immediately.'
  },
  {
    name: 'Secrecy request',
    points: 25,
    reason:
      'The message encourages the young person to hide something from a trusted adult.'
  },
  {
    name: 'Unknown contact',
    points: 15,
    reason:
      'The message suggests interaction with someone who may not be a trusted contact.'
  },
  {
    name: 'Location request',
    points: 25,
    reason:
      'The message asks for location access or information.'
  },
  {
    name: 'Payment request',
    points: 25,
    reason:
      'The message asks for money, payment details, or financial information.'
  },
  {
    name: 'Suspicious download',
    points: 20,
    reason:
      'The message encourages downloading an unknown file or application.'
  },
  {
    name: 'Threat or blackmail',
    points: 30,
    reason:
      'The message uses threats, blackmail, or consequences to pressure the recipient.'
  }
];

const KEYWORDS: Record<string, string[]> = {
  'Credential request': [
    'password',
    'passcode',
    'verification code',
    'otp',
    'login',
    'sign in',
    'account code'
  ],

  'Suspicious link': [
    'http://',
    'https://',
    'bit.ly',
    'tinyurl',
    'click this link',
    'open this link'
  ],

  'Artificial urgency': [
    'urgent',
    'right now',
    'immediately',
    '10 mins',
    '10 minutes',
    'before it ends',
    'act now',
    'hurry',
    'or else',
    'otherwise',
    'if you dont',
    "if you don't"
  ],

  'Secrecy request': [
    'dont tell your parents',
    "don't tell your parents",
    'keep this secret',
    'our secret',
    'dont tell anyone',
    "don't tell anyone",
    'keep this between us',
    'darkest secret',
    'secret'
  ],

  'Unknown contact': [
    'new account',
    'new number',
    'someone you met online',
    'online friend',
    'stranger'
  ],

  'Location request': [
    'send me your location',
    'share your location',
    'allow gps',
    'turn on location',
    'where are you'
  ],

  'Payment request': [
    'send money',
    'pay me',
    'bank details',
    'card number',
    'credit card',
    'buy this gift card',
    'give me money',
    'give me £',
    'give me $',
    'send me £',
    'send me $',
    'give me 200 pounds',
    'give me 200 pound',
    'send me 200 pounds',
    'send me 200 pound'
  ],

  'Suspicious download': [
    'download this',
    'install this',
    '.apk',
    '.exe',
    'unknown file'
  ],

  'Threat or blackmail': [
    'or else',
    'otherwise',
    'darkest secret',
    'tell everyone',
    'tell everybody',
    'expose you',
    'expose your',
    'blackmail',
    'unless you',
    'if you dont',
    "if you don't",
    'i will tell everyone',
    'i will tell everybody'
  ]
};

function containsAny(text: string, phrases: string[]): boolean {
  return phrases.some((phrase) => text.includes(phrase));
}

/*
 * Determines the inherent danger of the message.
 *
 * This is calculated BEFORE age is considered.
 */
function getRiskLevel(score: number): RiskLevel {
  if (score >= 75) return 'Critical';
  if (score >= 50) return 'Elevated';
  if (score >= 25) return 'Moderate';
  return 'Low';
}

/*
 * Age-adaptive scoring.
 *
 * The underlying danger of the message is calculated first.
 * Younger users receive a higher final risk score because
 * the same safety threat can be more significant for them.
 *
 * 7 years old  = +25%
 * 9 years old  = +20%
 * 11 years old = +15%
 * 13 years old = +10%
 * 15 years old = +5%
 * 16–17        = no adjustment
 *
 * The final score is always capped at 100.
 */
function applyAgeAdjustment(baseScore: number, age: number): number {
  const ageMultiplier =
    age <= 7 ? 1.25 :
    age <= 9 ? 1.20 :
    age <= 11 ? 1.15 :
    age <= 13 ? 1.10 :
    age <= 15 ? 1.05 :
    1.00;

  return Math.min(
    Math.round(baseScore * ageMultiplier),
    100
  );
}

/*
 * Determines what GrowGuard should actually do.
 *
 * Age affects intervention as well as the final score.
 */
function getAction(score: number, age: number): SafetyAction {
  /*
   * Extremely high risk.
   */
  if (score >= 90) {
    return 'GUARDIAN_ALERT';
  }

  /*
   * Critical / very high risk.
   */
  if (score >= 75) {
    if (age <= 10) return 'GUARDIAN_ALERT';
    if (age <= 13) return 'BLOCK';
    if (age <= 15) return 'WARN';

    return 'NUDGE';
  }

  /*
   * Elevated risk.
   */
  if (score >= 50) {
    if (age <= 10) return 'BLOCK';
    if (age <= 13) return 'WARN';
    if (age <= 15) return 'WARN';

    return 'NUDGE';
  }

  /*
   * Moderate risk.
   */
  if (score >= 25) {
    if (age <= 10) return 'WARN';
    if (age <= 13) return 'WARN';

    return 'NUDGE';
  }

  /*
   * Low risk.
   */
  if (score >= 15) {
    if (age <= 10) return 'WARN';

    return 'NUDGE';
  }

  return 'ALLOW';
}

export function analyzeMessage(
  message: string,
  age: number
): SafetyAnalysis {
  const text = message.toLowerCase();

  /*
   * STEP 1
   * Calculate the underlying risk of the message.
   */
  let baseScore = 0;

  const reasons: string[] = [];
  const signals: string[] = [];

  SIGNALS.forEach((signal) => {
    const phrases = KEYWORDS[signal.name];

    if (containsAny(text, phrases)) {
      baseScore += signal.points;

      signals.push(signal.name);
      reasons.push(signal.reason);
    }
  });

  /*
   * STEP 2
   * Detect combinations of dangerous signals.
   */

  const hasCredentialRequest = containsAny(
    text,
    KEYWORDS['Credential request']
  );

  const hasUrgency = containsAny(
    text,
    KEYWORDS['Artificial urgency']
  );

  const hasLink = containsAny(
    text,
    KEYWORDS['Suspicious link']
  );

  const hasSecrecy = containsAny(
    text,
    KEYWORDS['Secrecy request']
  );

  const hasPayment = containsAny(
    text,
    KEYWORDS['Payment request']
  );

  const hasThreat = containsAny(
    text,
    KEYWORDS['Threat or blackmail']
  );

  /*
   * Credential + urgency
   */
  if (hasCredentialRequest && hasUrgency) {
    baseScore += 15;

    signals.push('Credential + urgency combination');

    reasons.push(
      'A credential request combined with time pressure is a strong social-engineering indicator.'
    );
  }

  /*
   * Link + credential
   */
  if (hasLink && hasCredentialRequest) {
    baseScore += 20;

    signals.push('Link + credential combination');

    reasons.push(
      'A link combined with a request for credentials can indicate a phishing attempt.'
    );
  }

  /*
   * Secrecy + meeting
   */
  if (
    hasSecrecy &&
    containsAny(text, [
      'meetup',
      'meet me',
      'meet up',
      'come over'
    ])
  ) {
    baseScore += 25;

    signals.push('Secrecy + meeting combination');

    reasons.push(
      'A secrecy request combined with an offline meeting proposal requires additional safety attention.'
    );
  }

  /*
   * Payment + urgency
   */
  if (hasPayment && hasUrgency) {
    baseScore += 15;

    signals.push('Payment + urgency combination');

    reasons.push(
      'A payment request combined with time pressure is a strong manipulation indicator.'
    );
  }

  /*
   * Payment + threat / blackmail
   */
  if (hasPayment && hasThreat) {
    baseScore += 20;

    signals.push('Payment + threat combination');

    reasons.push(
      'A demand for money combined with a threat or blackmail attempt represents a significant manipulation risk.'
    );
  }

  /*
   * Threat + secrecy
   */
  if (hasThreat && hasSecrecy) {
    baseScore += 15;

    signals.push('Threat + secrecy combination');

    reasons.push(
      'Threatening someone while using secrecy or personal information increases the safety risk.'
    );
  }

  /*
   * Keep the underlying score between 0 and 100.
   */
  baseScore = Math.min(baseScore, 100);

  /*
   * STEP 3
   * Apply age-adaptive scoring.
   *
   * IMPORTANT:
   * The same message can therefore have different
   * scores for different ages.
   */
  const score = applyAgeAdjustment(
    baseScore,
    age
  );

  /*
   * Add an explanation of the age adjustment.
   */
  if (score !== baseScore) {
    reasons.push(
      `Age-adaptive protection adjusted the risk assessment for a ${age}-year-old user because younger users may require stronger protection from the same safety threat.`
    );

    signals.push('Age-adaptive protection');
  }

  /*
   * STEP 4
   * Determine the final risk level.
   */
  const level = getRiskLevel(score);

  /*
   * STEP 5
   * Determine the appropriate GrowGuard response.
   */
  const action = getAction(score, age);

  /*
   * STEP 6
   * Explain the decision.
   */
  let explanation = '';

  switch (action) {
    case 'ALLOW':
      explanation =
        'The message presents a relatively low safety risk. GrowGuard allows the interaction normally while continuing to monitor for additional signals.';
      break;

    case 'NUDGE':
      explanation =
        `The message presents some safety risk. For a ${age}-year-old user, GrowGuard provides a subtle warning or reminder while preserving independence.`;
      break;

    case 'WARN':
      explanation =
        `The message presents a meaningful safety risk. For a ${age}-year-old user, GrowGuard shows a stronger warning and encourages the user to reconsider the interaction.`;
      break;

    case 'BLOCK':
      explanation =
        `The message presents a high safety risk for a ${age}-year-old user. GrowGuard prevents the risky action and explains why.`;
      break;

    case 'GUARDIAN_ALERT':
      explanation =
        `The message presents a very high safety risk for a ${age}-year-old user. GrowGuard escalates the event to the trusted guardian because stronger protection is appropriate at this age.`;
      break;
  }

  return {
    score,
    level,
    action,
    reasons,
    signals,
    explanation
  };
}
