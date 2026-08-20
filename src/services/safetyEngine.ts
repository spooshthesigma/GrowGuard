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
      'The message asks for a password, passcode, verification code, or other account credentials.'
  },
  {
    name: 'Suspicious link',
    points: 25,
    reason:
      'The message contains a potentially suspicious link or encourages the user to click an unknown link.'
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
      'The message encourages the young person to hide an interaction or information from a trusted adult.'
  },
  {
    name: 'Unknown contact',
    points: 15,
    reason:
      'The message suggests interaction with someone who may not be a trusted contact.'
  },
  {
    name: 'Location request',
    points: 30,
    reason:
      'The message asks for location information or access to live location.'
  },
  {
    name: 'Personal information request',
    points: 25,
    reason:
      'The message requests potentially sensitive personal information.'
  },
  {
    name: 'Payment request',
    points: 30,
    reason:
      'The message asks for money, payment details, banking information, or financial information.'
  },
  {
    name: 'Suspicious download',
    points: 25,
    reason:
      'The message encourages downloading or installing an unknown file or application.'
  },
  {
    name: 'Threat',
    points: 60,
    reason:
      'The message contains a threat of physical harm or violence.'
  },
  {
    name: 'Blackmail or extortion',
    points: 50,
    reason:
      'The message demands something while threatening a consequence if the demand is not followed.'
  },
  {
    name: 'Cyberbullying or harassment',
    points: 30,
    reason:
      'The message contains targeted harassment, intimidation, or bullying.'
  },
  {
    name: 'Dangerous activity',
    points: 35,
    reason:
      'The message encourages participation in an activity that could put the young person at risk.'
  },
  {
    name: 'Impersonation',
    points: 30,
    reason:
      'The message may be pretending to represent another person, organisation, or service.'
  },
  {
    name: 'Social manipulation',
    points: 20,
    reason:
      'The message uses psychological pressure, fear, guilt, or manipulation to influence the user.'
  }
];

const KEYWORDS: Record<string, string[]> = {
  'Credential request': [
    'password',
    'passcode',
    'verification code',
    'verification number',
    'otp',
    'login',
    'log in',
    'sign in',
    'account code',
    'security code',
    'pin number'
  ],

  'Suspicious link': [
    'http://',
    'https://',
    'bit.ly',
    'tinyurl',
    'click this link',
    'click the link',
    'open this link',
    'tap this link',
    'verify here'
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
    'do it now',
    'last chance',
    'you have no time'
  ],

  'Secrecy request': [
    'dont tell your parents',
    "don't tell your parents",
    'dont tell your mum',
    "don't tell your mum",
    'dont tell your dad',
    "don't tell your dad",
    'keep this secret',
    'our secret',
    'dont tell anyone',
    "don't tell anyone",
    'keep this between us',
    'promise you wont tell',
    "promise you won't tell"
  ],

  'Unknown contact': [
    'new account',
    'new number',
    'someone you met online',
    'online friend',
    'stranger',
    'someone online',
    'person online'
  ],

  'Location request': [
    'send me your location',
    'share your location',
    'share live location',
    'send your live location',
    'allow gps',
    'turn on location',
    'where are you',
    'what is your address',
    'send your address'
  ],

  'Personal information request': [
    'what school do you go to',
    'where do you live',
    'give me your address',
    'send your phone number',
    'give me your phone number',
    'what is your full name',
    'send me your details',
    'personal information',
    'send your id'
  ],

  'Payment request': [
    'send money',
    'give me money',
    'pay me',
    'bank details',
    'bank account',
    'card number',
    'credit card',
    'debit card',
    'buy this gift card',
    'gift card',
    'give me £',
    'give me $',
    'give me €',
    'transfer money',
    'send £',
    'send $',
    'send €'
  ],

  'Suspicious download': [
    'download this',
    'download the file',
    'install this',
    'install the app',
    '.apk',
    '.exe',
    'unknown file',
    'open this file'
  ],

  'Threat': [
    'i will kill you',
    "i'll kill you",
    'i am going to kill you',
    "i'm going to kill you",
    'kill you',
    'hurt you',
    "i'll hurt you",
    'i will hurt you',
    'attack you',
    'beat you up',
    'come after you',
    'you will regret it',
    'you are dead'
  ],

  'Blackmail or extortion': [
    'give me or else',
    'pay me or else',
    'send me or else',
    'give me money or',
    'pay me or',
    'send me money or',
    'give me £ or',
    'give me $ or',
    'give me € or',
    'or i will tell everyone',
    'or ill tell everyone',
    "or i'll tell everyone",
    'or i will expose you',
    'or ill expose you',
    "or i'll expose you",
    'unless you give me',
    'unless you pay me',
    'unless you send me',
    'give me what i want or',
    'do this or everyone will know'
  ],

  'Cyberbullying or harassment': [
    'loser',
    'idiot',
    'shut up',
    'nobody likes you',
    'everyone hates you',
    'you are worthless',
    'you are pathetic',
    'leave school',
    'kill yourself',
    'go away forever',
    'i will embarrass you',
    'everyone will laugh at you'
  ],

  'Dangerous activity': [
    'dangerous challenge',
    'dangerous prank',
    'do something dangerous',
    'try this challenge',
    'dont tell anyone about this challenge',
    'climb onto',
    'jump from',
    'take this challenge'
  ],

  'Impersonation': [
    'i am your teacher',
    'i am your parent',
    'i am your bank',
    'i am from the bank',
    'this is the police',
    'official account',
    'security team',
    'account security'
  ],

  'Social manipulation': [
    'if you really cared',
    'prove you trust me',
    'prove you love me',
    'you have to do this',
    'you owe me',
    'everyone else does it',
    'you will be sorry',
    'you will regret it',
    'i will be angry',
    'dont disappoint me',
    "don't disappoint me"
  ]
};

function containsAny(text: string, phrases: string[]): boolean {
  return phrases.some((phrase) => text.includes(phrase));
}

/*
 * Age adaptation
 *
 * The underlying danger of a message is calculated first.
 * Age then changes how strongly GrowGuard assesses that danger.
 *
 * Younger users receive stronger protection.
 *
 * 7 years  = +25%
 * 8-9      = +20%
 * 10-11    = +15%
 * 12-13    = +10%
 * 14-15    = +5%
 * 16-17    = +0%
 *
 * This means:
 *
 * Same message
 * ↓
 * Same underlying danger
 * ↓
 * Different age-adjusted score
 *
 * A serious threat remains serious at every age.
 */

function applyAgeAdjustment(baseScore: number, age: number): number {
  let multiplier: number;

  if (age <= 7) {
    multiplier = 1.25;
  } else if (age <= 9) {
    multiplier = 1.20;
  } else if (age <= 11) {
    multiplier = 1.15;
  } else if (age <= 13) {
    multiplier = 1.10;
  } else if (age <= 15) {
    multiplier = 1.05;
  } else {
    multiplier = 1.0;
  }

  return Math.min(Math.round(baseScore * multiplier), 100);
}

function getRiskLevel(score: number): RiskLevel {
  if (score >= 75) return 'Critical';
  if (score >= 50) return 'Elevated';
  if (score >= 25) return 'Moderate';

  return 'Low';
}

/*
 * Age also affects the intervention.
 *
 * Younger users receive stronger intervention
 * at the same underlying risk.
 */

function getAction(
  score: number,
  age: number
): SafetyAction {
  if (score >= 85) {
    return 'GUARDIAN_ALERT';
  }

  if (score >= 65) {
    return age <= 12 ? 'BLOCK' : 'WARN';
  }

  if (score >= 45) {
    return age <= 13 ? 'WARN' : 'NUDGE';
  }

  if (score >= 25) {
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
   * Detect individual signals.
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
   * Detect combinations of signals.
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

  const hasPayment = containsAny(
    text,
    KEYWORDS['Payment request']
  );

  const hasBlackmail = containsAny(
    text,
    KEYWORDS['Blackmail or extortion']
  );

  const hasUnknownContact = containsAny(
    text,
    KEYWORDS['Unknown contact']
  );

  const hasLocation = containsAny(
    text,
    KEYWORDS['Location request']
  );

  /*
   * Credential + urgency
   */

  if (hasCredentialRequest && hasUrgency) {
    baseScore += 15;

    signals.push('Credential + urgency');

    reasons.push(
      'A credential request combined with time pressure is a strong social-engineering indicator.'
    );
  }

  /*
   * Link + credentials
   */

  if (hasLink && hasCredentialRequest) {
    baseScore += 20;

    signals.push('Link + credential request');

    reasons.push(
      'A suspicious link combined with a credential request can indicate phishing.'
    );
  }

  /*
   * Secrecy + unknown contact
   */

  if (hasSecrecy && hasUnknownContact) {
    baseScore += 25;

    signals.push('Secrecy + unknown contact');

    reasons.push(
      'Secrecy combined with an unknown contact increases the safety concern.'
    );
  }

  /*
   * Secrecy + meeting
   */

  if (
    hasSecrecy &&
    containsAny(text, [
      'meet me',
      'meet up',
      'meetup',
      'come over',
      'come to my house'
    ])
  ) {
    baseScore += 30;

    signals.push('Secrecy + meeting');

    reasons.push(
      'A secret meeting proposal requires additional safety attention.'
    );
  }

  /*
   * Unknown contact + location
   */

  if (hasUnknownContact && hasLocation) {
    baseScore += 30;

    signals.push('Unknown contact + location');

    reasons.push(
      'An unknown contact requesting location information is a significant safety concern.'
    );
  }

  /*
   * Threat + payment
   */

  if (hasThreat && hasPayment) {
    baseScore += 30;

    signals.push('Threat + payment demand');

    reasons.push(
      'A threat combined with a demand for money represents a serious safety risk.'
    );
  }

  /*
   * Threat + blackmail
   */

  if (hasThreat && hasBlackmail) {
    baseScore += 30;

    signals.push('Threat + blackmail');

    reasons.push(
      'A threat combined with blackmail or extortion substantially increases the safety risk.'
    );
  }

  /*
   * Blackmail + payment
   */

  if (hasBlackmail && hasPayment) {
    baseScore += 20;

    signals.push('Blackmail + payment');

    reasons.push(
      'A financial demand backed by a threatened consequence is a strong extortion indicator.'
    );
  }

  /*
   * Blackmail + urgency
   */

  if (hasBlackmail && hasUrgency) {
    baseScore += 15;

    signals.push('Blackmail + urgency');

    reasons.push(
      'An extortion demand combined with immediate pressure increases the risk.'
    );
  }

  /*
   * Credential + impersonation
   */

  if (
    hasCredentialRequest &&
    containsAny(text, KEYWORDS['Impersonation'])
  ) {
    baseScore += 25;

    signals.push('Credential + impersonation');

    reasons.push(
      'A credential request combined with possible impersonation can indicate an account scam.'
    );
  }

  /*
   * Keep base risk between 0 and 100.
   */

  baseScore = Math.min(baseScore, 100);

  /*
   * STEP 3
   * Apply age adaptation.
   */

  const score = applyAgeAdjustment(
    baseScore,
    age
  );

  /*
   * Explain age adaptation.
   */

  if (baseScore > 0 && age < 17) {
    reasons.push(
      `GrowGuard increased the assessment for a ${age}-year-old because younger users receive stronger protection from the same safety risk.`
    );

    signals.push('Age-adaptive protection');
  }

  /*
   * STEP 4
   * Determine risk level.
   */

  const level = getRiskLevel(score);

  /*
   * STEP 5
   * Determine GrowGuard action.
   */

  const action = getAction(
    score,
    age
  );

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
