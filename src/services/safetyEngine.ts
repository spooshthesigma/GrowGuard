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
    name: 'Threat',
    points: 30,
    reason:
      'The message uses a threat to pressure the recipient into doing something.'
  },
  {
    name: 'Blackmail or coercion',
    points: 35,
    reason:
      'The message threatens a consequence unless the recipient complies with a demand.'
  },
  {
    name: 'Financial extortion',
    points: 30,
    reason:
      'The message demands money or financial information using pressure or a threat.'
  },
  {
    name: 'Private information threat',
    points: 30,
    reason:
      'The message threatens to reveal private, embarrassing, or sensitive information.'
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
    'otherwise'
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
    'buy this gift card',
    'give me money',
    'give me £',
    'give me $',
    'send me £',
    'send me $',
    'pay up',
    'transfer the money'
  ],

  'Suspicious download': [
    'download this',
    'install this',
    '.apk',
    '.exe',
    'unknown file'
  ],

  'Threat': [
    'or else i will',
    'or else i’ll',
    'or else ill',
    'i will tell everyone',
    "i'll tell everyone",
    'i will expose you',
    "i'll expose you",
    'i will reveal',
    "i'll reveal",
    'i will post your',
    "i'll post your",
    'i will share your',
    "i'll share your",
    'everyone will know',
    'you will regret it',
    'youll regret it',
    "you'll regret it"
  ],

  'Blackmail or coercion': [
    'or else',
    'unless you',
    'if you dont',
    "if you don't",
    'if you do not',
    'do this or',
    'give me or',
    'pay me or',
    'otherwise i will',
    "otherwise i'll",
    'otherwise ill',
    'unless you give',
    'unless you pay'
  ],

  'Financial extortion': [
    'give me £',
    'give me $',
    'give me money',
    'send me £',
    'send me $',
    'send me money',
    'pay me',
    'pay up',
    'transfer me',
    'transfer the money',
    'give me the money'
  ],

  'Private information threat': [
    'your darkest secret',
    'your secret',
    'your private information',
    'your private messages',
    'your photos',
    'your pictures',
    'your embarrassing secret',
    'everyone will know',
    'tell everyone your secret',
    'post your secret'
  ]
};

function containsAny(text: string, phrases: string[]): boolean {
  return phrases.some((phrase) => text.includes(phrase));
}

/*
 * AGE-ADAPTIVE RISK
 *
 * The base score represents the danger detected in the message.
 *
 * The age adjustment changes the displayed score according to the
 * user's developmental stage.
 *
 * IMPORTANT:
 * A high-risk message remains high-risk at every age.
 *
 * Age also affects the intervention separately, so younger users
 * can receive stronger protection even when the numerical score
 * is similar.
 */
function applyAgeAdjustment(baseScore: number, age: number): number {
  let adjustment = 0;

  if (age <= 7) {
    adjustment = -6;
  } else if (age <= 9) {
    adjustment = -5;
  } else if (age <= 11) {
    adjustment = -3;
  } else if (age <= 13) {
    adjustment = -1;
  } else if (age <= 15) {
    adjustment = 1;
  } else {
    adjustment = 3;
  }

  /*
   * Never allow age adjustment to turn a genuinely dangerous
   * message into a low-risk result.
   */
  if (baseScore >= 75) {
    return Math.max(75, Math.min(baseScore + adjustment, 100));
  }

  return Math.max(0, Math.min(baseScore + adjustment, 100));
}

function getRiskLevel(score: number): RiskLevel {
  if (score >= 75) return 'Critical';
  if (score >= 50) return 'Elevated';
  if (score >= 25) return 'Moderate';
  return 'Low';
}

function getAction(score: number, age: number): SafetyAction {
  /*
   * The score represents risk.
   * Age controls the level of intervention.
   *
   * Younger users receive stronger intervention.
   * Older teenagers receive more autonomy where appropriate.
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
    return age <= 11 ? 'WARN' : 'NUDGE';
  }

  return 'ALLOW';
}

export function analyzeMessage(
  message: string,
  age: number
): SafetyAnalysis {
  const text = message.toLowerCase().trim();

  let baseScore = 0;

  const reasons: string[] = [];
  const signals: string[] = [];

  /*
   * STEP 1
   *
   * Detect individual safety signals.
   */

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
   *
   * Detect combinations of signals.
   *
   * These combinations are important because several weak
   * indicators together can represent a much more serious event.
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

  const hasThreat = containsAny(
    text,
    KEYWORDS['Threat']
  );

  const hasBlackmail = containsAny(
    text,
    KEYWORDS['Blackmail or coercion']
  );

  const hasPayment = containsAny(
    text,
    KEYWORDS['Payment request']
  );

  const hasExtortion = containsAny(
    text,
    KEYWORDS['Financial extortion']
  );

  const hasPrivateInformationThreat = containsAny(
    text,
    KEYWORDS['Private information threat']
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
   * Threat + payment
   *
   * This is a particularly important combination because it can
   * indicate financial extortion.
   */

  if (hasThreat && (hasPayment || hasExtortion)) {
    baseScore += 25;

    signals.push('Threat + financial demand combination');

    reasons.push(
      'A financial demand combined with a threat is a strong indicator of coercion or extortion.'
    );
  }

  /*
   * Blackmail + private information
   */

  if (hasBlackmail && hasPrivateInformationThreat) {
    baseScore += 25;

    signals.push('Blackmail + private information combination');

    reasons.push(
      'A threat to reveal private information unless the recipient complies is a strong blackmail indicator.'
    );
  }

  /*
   * Threat + blackmail + financial demand
   *
   * This catches messages such as:
   *
   * "Give me £200 or I'll tell everyone your secret."
   */

  if (
    hasThreat &&
    hasBlackmail &&
    (hasPayment || hasExtortion)
  ) {
    baseScore += 30;

    signals.push('High-confidence extortion pattern');

    reasons.push(
      'The message combines a demand for money with coercion and a threat, indicating a high-confidence extortion pattern.'
    );
  }

  /*
   * STEP 3
   *
   * Cap the underlying risk at 100.
   */

  baseScore = Math.min(baseScore, 100);

  /*
   * STEP 4
   *
   * Apply age adaptation.
   */

  const score = applyAgeAdjustment(baseScore, age);

  /*
   * Explain the age adaptation.
   */

  if (baseScore > 0 && score !== baseScore) {
    if (score < baseScore) {
      reasons.push(
        `The age-adaptive model adjusted the score for a ${age}-year-old user while keeping the underlying safety risk visible.`
      );
    } else {
      reasons.push(
        `The age-adaptive model increased the assessment for a ${age}-year-old user.`
      );
    }

    signals.push('Age-adaptive assessment');
  }

  /*
   * STEP 5
   *
   * Determine the final risk level.
   */

  const level = getRiskLevel(score);

  /*
   * STEP 6
   *
   * Determine the appropriate intervention.
   */

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
