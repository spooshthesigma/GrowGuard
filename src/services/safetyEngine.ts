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
    reason: 'The message asks for a password, passcode, verification code, or other credentials.'
  },
  {
    name: 'Suspicious link',
    points: 25,
    reason: 'The message contains a link that may require additional verification.'
  },
  {
    name: 'Artificial urgency',
    points: 15,
    reason: 'The message creates pressure to act immediately.'
  },
  {
    name: 'Secrecy request',
    points: 25,
    reason: 'The message encourages the young person to hide something from a trusted adult.'
  },
  {
    name: 'Unknown contact',
    points: 15,
    reason: 'The message suggests interaction with someone who may not be a trusted contact.'
  },
  {
    name: 'Location request',
    points: 25,
    reason: 'The message asks for location access or information.'
  },
  {
    name: 'Payment request',
    points: 25,
    reason: 'The message asks for money, payment details, or financial information.'
  },
  {
    name: 'Suspicious download',
    points: 20,
    reason: 'The message encourages downloading an unknown file or application.'
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
    'hurry'
  ],

  'Secrecy request': [
    'dont tell your parents',
    "don't tell your parents",
    'keep this secret',
    'our secret',
    'dont tell anyone',
    "don't tell anyone",
    'keep this between us'
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
    'buy this gift card'
  ],

  'Suspicious download': [
    'download this',
    'install this',
    '.apk',
    '.exe',
    'unknown file'
  ]
};

function containsAny(text: string, phrases: string[]): boolean {
  return phrases.some((phrase) => text.includes(phrase));
}

function getRiskLevel(score: number): RiskLevel {
  if (score >= 75) return 'Critical';
  if (score >= 50) return 'Elevated';
  if (score >= 25) return 'Moderate';
  return 'Low';
}

function getAction(score: number, age: number): SafetyAction {
  /*
   * Younger users receive stronger intervention.
   * Older teenagers receive more warnings and fewer automatic blocks.
   */

  if (score >= 85) {
    return 'GUARDIAN_ALERT';
  }

  if (score >= 65) {
    return age <= 12 ? 'BLOCK' : 'WARN';
  }

  if (score >= 40) {
    return age <= 13 ? 'WARN' : 'NUDGE';
  }

  if (score >= 20) {
    return 'NUDGE';
  }

  return 'ALLOW';
}

export function analyzeMessage(
  message: string,
  age: number
): SafetyAnalysis {
  const text = message.toLowerCase();

  let score = 0;
  const reasons: string[] = [];
  const signals: string[] = [];

  SIGNALS.forEach((signal) => {
    const phrases = KEYWORDS[signal.name];

    if (containsAny(text, phrases)) {
      score += signal.points;
      signals.push(signal.name);
      reasons.push(signal.reason);
    }
  });

  /*
   * Extra contextual combinations.
   * A real GrowGuard model would learn these relationships rather than
   * relying on simple rules.
   */

  const hasCredentialRequest = containsAny(text, KEYWORDS['Credential request']);
  const hasUrgency = containsAny(text, KEYWORDS['Artificial urgency']);
  const hasLink = containsAny(text, KEYWORDS['Suspicious link']);
  const hasSecrecy = containsAny(text, KEYWORDS['Secrecy request']);

  if (hasCredentialRequest && hasUrgency) {
    score += 15;
    signals.push('Credential + urgency combination');
    reasons.push(
      'A credential request combined with time pressure is a strong social-engineering indicator.'
    );
  }

  if (hasLink && hasCredentialRequest) {
    score += 20;
    signals.push('Link + credential combination');
    reasons.push(
      'A link combined with a request for credentials can indicate a phishing attempt.'
    );
  }

  if (hasSecrecy && containsAny(text, ['meetup', 'meet me', 'meet up', 'come over'])) {
    score += 25;
    signals.push('Secrecy + meeting combination');
    reasons.push(
      'A secrecy request combined with an offline meeting proposal requires additional safety attention.'
    );
  }

  score = Math.min(score, 100);

  const level = getRiskLevel(score);
  const action = getAction(score, age);

  let explanation = '';

  switch (action) {
    case 'ALLOW':
      explanation =
        'No significant safety indicators were detected. GrowGuard allows the interaction normally.';
      break;

    case 'NUDGE':
      explanation =
        'Some safety indicators were detected. GrowGuard gives the young person a subtle reminder without interrupting the interaction.';
      break;

    case 'WARN':
      explanation =
        'Several safety indicators were detected. GrowGuard presents a clear warning and encourages the young person to reconsider the interaction.';
      break;

    case 'BLOCK':
      explanation =
        'The interaction presents a significant safety risk for this age group. GrowGuard prevents the risky action and explains why.';
      break;

    case 'GUARDIAN_ALERT':
      explanation =
        'A high-confidence safety risk was detected. GrowGuard escalates the event to the trusted guardian while providing an explanation.';
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
