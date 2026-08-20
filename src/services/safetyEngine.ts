export type RiskLevel =
  | 'Low'
  | 'Moderate'
  | 'Elevated'
  | 'Critical';

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
  keywords: string[];
}

/*
 * ============================================================
 * GROWGUARD SAFETY ENGINE
 * ============================================================
 *
 * This is a prototype safety-analysis engine for GrowGuard.
 *
 * The engine is intentionally structured into several stages:
 *
 * 1. Normalise the message
 * 2. Detect individual safety signals
 * 3. Detect contextual combinations
 * 4. Calculate the underlying message risk
 * 5. Apply age-adaptive protection
 * 6. Determine the final risk level
 * 7. Determine the appropriate intervention
 * 8. Generate an explanation
 *
 * IMPORTANT DESIGN PRINCIPLE:
 *
 * The danger of the MESSAGE and the level of PROTECTION are
 * related, but they are not the same thing.
 *
 * A message can be dangerous regardless of the user's age.
 *
 * Age changes how strongly GrowGuard responds to that danger.
 *
 * Therefore:
 *
 *                    MESSAGE
 *                       ↓
 *                BASE RISK SCORE
 *                       ↓
 *                AGE ADAPTATION
 *                       ↓
 *                FINAL RISK SCORE
 *                       ↓
 *              RISK + INTERVENTION
 *
 * Younger users receive stronger protection from the same
 * underlying safety risk.
 *
 * This is a prototype rules engine. A production GrowGuard
 * system would use trained AI models, contextual analysis,
 * behavioural signals and additional safety systems.
 *
 * ============================================================
 */


/* ============================================================
 * SIGNAL DEFINITIONS
 * ============================================================
 *
 * Each signal represents a type of safety concern.
 *
 * Points describe the approximate contribution of that signal
 * to the underlying risk of the message.
 *
 * These points are NOT the age adjustment.
 *
 * Age is handled separately later.
 * ============================================================
 */

const SIGNALS: Signal[] = [

  /* ----------------------------------------------------------
   * DIRECT THREAT
   * ---------------------------------------------------------- */

  {
    name: 'Direct threat',

    points: 70,

    reason:
      'The message contains language indicating a direct threat of serious harm.',

    keywords: [
      'i will kill you',
      "i'll kill you",
      'i am going to kill you',
      "i'm going to kill you",
      'i will murder you',
      "i'll murder you",
      'i am going to murder you',
      "i'm going to murder you",
      'kill you',
      'murder you',
      'i will hurt you',
      "i'll hurt you",
      'i am going to hurt you',
      "i'm going to hurt you",
      'hurt you badly',
      'you will get hurt',
      'you are going to get hurt'
    ]
  },


  /* ----------------------------------------------------------
   * BLACKMAIL / EXTORTION
   * ---------------------------------------------------------- */

  {
    name: 'Blackmail or extortion',

    points: 55,

    reason:
      'The message uses a threat, secret or coercive demand to pressure another person into doing something.',

    keywords: [
      'give me or else',
      'pay me or else',
      'send me or else',
      'give me money or else',
      'give me £',
      'give me $',
      'give me money',
      'send me money',
      'pay me',
      'or i will tell everyone',
      "or i'll tell everyone",
      'or i will tell everyone your secret',
      "or i'll tell everyone your secret",
      'or i will expose you',
      "or i'll expose you",
      'i will expose you',
      "i'll expose you",
      'i will reveal your secret',
      "i'll reveal your secret",
      'i will tell everyone your secret',
      "i'll tell everyone your secret",
      'tell everyone your secret',
      'darkest secret',
      'give me what i want or else',
      'do this or i will expose you',
      'do this or i will tell everyone'
    ]
  },


  /* ----------------------------------------------------------
   * CREDENTIAL REQUEST
   * ---------------------------------------------------------- */

  {
    name: 'Credential request',

    points: 35,

    reason:
      'The message asks for a password, passcode, verification code, login information or other credentials.',

    keywords: [
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
      'one time password',
      'one-time password',
      'username and password',
      'login details',
      'account details'
    ]
  },


  /* ----------------------------------------------------------
   * SUSPICIOUS LINK
   * ---------------------------------------------------------- */

  {
    name: 'Suspicious link',

    points: 25,

    reason:
      'The message contains a link or directs the user towards a potentially unsafe website.',

    keywords: [
      'http://',
      'https://',
      'bit.ly',
      'tinyurl',
      'click this link',
      'click the link',
      'open this link',
      'open the link',
      'tap this link',
      'visit this link',
      'go to this website'
    ]
  },


  /* ----------------------------------------------------------
   * ARTIFICIAL URGENCY
   * ---------------------------------------------------------- */

  {
    name: 'Artificial urgency',

    points: 15,

    reason:
      'The message creates pressure to act immediately instead of giving the user time to think or verify the request.',

    keywords: [
      'urgent',
      'right now',
      'immediately',
      '10 mins',
      '10 minutes',
      '5 mins',
      '5 minutes',
      'before it ends',
      'act now',
      'hurry',
      'quickly',
      'do it now',
      'you have no time',
      'last chance',
      'expires soon',
      'before your account is deleted',
      'your account will be deleted',
      'account will be closed'
    ]
  },


  /* ----------------------------------------------------------
   * SECRECY
   * ---------------------------------------------------------- */

  {
    name: 'Secrecy request',

    points: 25,

    reason:
      'The message encourages the young person to hide information or an interaction from a trusted adult or other people.',

    keywords: [
      'dont tell your parents',
      "don't tell your parents",
      'dont tell your mum',
      "don't tell your mum",
      'dont tell your dad',
      "don't tell your dad",
      'dont tell anyone',
      "don't tell anyone",
      'dont tell anybody',
      "don't tell anybody",
      'keep this secret',
      'keep it secret',
      'our secret',
      'this is our secret',
      'keep this between us',
      'no one can know',
      'nobody can know',
      'hide this from your parents',
      'hide this from your mum',
      'hide this from your dad'
    ]
  },


  /* ----------------------------------------------------------
   * UNKNOWN CONTACT
   * ---------------------------------------------------------- */

  {
    name: 'Unknown contact',

    points: 15,

    reason:
      'The message suggests interaction with someone whose identity or relationship with the user may not be trusted.',

    keywords: [
      'new account',
      'new number',
      'someone you met online',
      'online friend',
      'stranger',
      'someone online',
      'person online',
      'random person',
      'someone i met'
    ]
  },


  /* ----------------------------------------------------------
   * LOCATION REQUEST
   * ---------------------------------------------------------- */

  {
    name: 'Location request',

    points: 25,

    reason:
  "The message asks for the user's location, address or other information that could reveal where they are.",
    keywords: [
      'send me your location',
      'share your location',
      'allow gps',
      'turn on location',
      'where are you',
      'where do you live',
      'what is your address',
      'send your address',
      'give me your address',
      'home address',
      'live location',
      'send live location'
    ]
  },


  /* ----------------------------------------------------------
   * PAYMENT REQUEST
   * ---------------------------------------------------------- */

  {
    name: 'Payment request',

    points: 25,

    reason:
      'The message asks for money, payment details, financial information or a financial transaction.',

    keywords: [
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
      'payment details',
      'send £',
      'send $',
      'give me £',
      'give me $',
      'transfer money'
    ]
  },


  /* ----------------------------------------------------------
   * SUSPICIOUS DOWNLOAD
   * ---------------------------------------------------------- */

  {
    name: 'Suspicious download',

    points: 20,

    reason:
      'The message encourages downloading or installing an unknown file, application or executable.',

    keywords: [
      'download this',
      'download the file',
      'install this',
      'install the app',
      '.apk',
      '.exe',
      '.zip',
      'unknown file',
      'open this file',
      'run this file'
    ]
  },


  /* ----------------------------------------------------------
   * PERSONAL INFORMATION
   * ---------------------------------------------------------- */

  {
    name: 'Personal information request',

    points: 25,

    reason:
      'The message requests personal information that could put the user or their privacy at risk.',

    keywords: [
      'full name',
      'date of birth',
      'birthday',
      'school name',
      'school address',
      'phone number',
      'mobile number',
      'email address',
      'home address',
      'where do you go to school',
      'send me a photo of yourself',
      'send me your photo',
      'personal information',
      'personal details'
    ]
  },


  /* ----------------------------------------------------------
   * OFFLINE MEETING
   * ---------------------------------------------------------- */

  {
    name: 'Offline meeting request',

    points: 35,

    reason:
      'The message proposes meeting someone offline, which can require additional safety consideration for a young user.',

    keywords: [
      'meet me',
      'meet up',
      'meetup',
      'come over',
      'come to my house',
      'come to my place',
      'where should we meet',
      'lets meet',
      "let's meet",
      'meet in person',
      'meet outside',
      'meet after school'
    ]
  },


  /* ----------------------------------------------------------
   * HARASSMENT / BULLYING
   * ---------------------------------------------------------- */

  {
    name: 'Harassment or bullying',

    points: 30,

    reason:
      'The message contains language that may be intended to intimidate, humiliate or repeatedly target another person.',

    keywords: [
      'everyone hates you',
      'nobody likes you',
      'you are pathetic',
      "you're pathetic",
      'you are worthless',
      "you're worthless",
      'you are a loser',
      "you're a loser",
      'i will embarrass you',
      "i'll embarrass you",
      'everyone will laugh at you',
      'i will post this everywhere',
      "i'll post this everywhere",
      'i will ruin you',
      "i'll ruin you"
    ]
  },


  /* ----------------------------------------------------------
   * MANIPULATION / COERCION
   * ---------------------------------------------------------- */

  {
    name: 'Manipulation or coercion',

    points: 25,

    reason:
      'The message uses pressure, intimidation or manipulation to make the recipient do something against their wishes.',

    keywords: [
      'you have to do this',
      'you must do this',
      'you better do this',
      'do what i say',
      'if you dont',
      "if you don't",
      'or else',
      'you have no choice',
      'you have to',
      'you must',
      'prove that you trust me',
      'if you really trusted me'
    ]
  }
];


/* ============================================================
 * HELPER FUNCTIONS
 * ============================================================ */


/*
 * Checks whether at least one phrase appears in the message.
 */
function containsAny(
  text: string,
  phrases: string[]
): boolean {
  return phrases.some((phrase) =>
    text.includes(phrase)
  );
}


/*
 * Counts how many times a particular set of phrases
 * appears in the message.
 *
 * This is intentionally simple for the prototype.
 */
function countMatches(
  text: string,
  phrases: string[]
): number {

  let count = 0;

  phrases.forEach((phrase) => {
    if (text.includes(phrase)) {
      count++;
    }
  });

  return count;
}


/*
 * Normalises common variations in text.
 *
 * This makes the prototype slightly more tolerant of
 * punctuation and spacing differences.
 */
function normaliseText(
  message: string
): string {

  return message
    .toLowerCase()
    .replace(/[!?.,;:()[\]{}]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}


/* ============================================================
 * SIGNAL DETECTION
 * ============================================================ */

function detectSignals(
  text: string
): {
  score: number;
  signals: string[];
  reasons: string[];
} {

  let score = 0;

  const signals: string[] = [];
  const reasons: string[] = [];

  SIGNALS.forEach((signal) => {

    if (
      containsAny(
        text,
        signal.keywords
      )
    ) {

      score += signal.points;

      signals.push(
        signal.name
      );

      reasons.push(
        signal.reason
      );
    }
  });

  return {
    score,
    signals,
    reasons
  };
}


/* ============================================================
 * CONTEXTUAL ANALYSIS
 * ============================================================
 *
 * A real AI safety system should not simply count individual
 * keywords.
 *
 * Context matters.
 *
 * These prototype rules demonstrate that concept.
 * ============================================================ */

function applyCombinationRules(
  text: string,
  currentScore: number,
  signals: string[],
  reasons: string[]
): number {

  let score = currentScore;


  const hasThreat =
    signals.includes(
      'Direct threat'
    );


  const hasBlackmail =
    signals.includes(
      'Blackmail or extortion'
    );


  const hasCredentials =
    signals.includes(
      'Credential request'
    );


  const hasUrgency =
    signals.includes(
      'Artificial urgency'
    );


  const hasLink =
    signals.includes(
      'Suspicious link'
    );


  const hasSecrecy =
    signals.includes(
      'Secrecy request'
    );


  const hasPayment =
    signals.includes(
      'Payment request'
    );


  const hasLocation =
    signals.includes(
      'Location request'
    );


  const hasMeeting =
    signals.includes(
      'Offline meeting request'
    );


  const hasUnknownContact =
    signals.includes(
      'Unknown contact'
    );


  const hasPersonalInfo =
    signals.includes(
      'Personal information request'
    );


  /* ----------------------------------------------------------
   * CREDENTIAL + URGENCY
   * ---------------------------------------------------------- */

  if (
    hasCredentials &&
    hasUrgency
  ) {

    score += 15;

    signals.push(
      'Credential + urgency combination'
    );

    reasons.push(
      'A credential request combined with time pressure is a strong social-engineering indicator.'
    );
  }


  /* ----------------------------------------------------------
   * LINK + CREDENTIAL
   * ---------------------------------------------------------- */

  if (
    hasLink &&
    hasCredentials
  ) {

    score += 20;

    signals.push(
      'Link + credential combination'
    );

    reasons.push(
      'A link combined with a request for credentials can indicate a phishing attempt.'
    );
  }


  /* ----------------------------------------------------------
   * SECRECY + MEETING
   * ---------------------------------------------------------- */

  if (
    hasSecrecy &&
    hasMeeting
  ) {

    score += 30;

    signals.push(
      'Secrecy + meeting combination'
    );

    reasons.push(
      'A secrecy request combined with an offline meeting proposal requires additional safety attention.'
    );
  }


  /* ----------------------------------------------------------
   * UNKNOWN CONTACT + MEETING
   * ---------------------------------------------------------- */

  if (
    hasUnknownContact &&
    hasMeeting
  ) {

    score += 25;

    signals.push(
      'Unknown contact + meeting combination'
    );

    reasons.push(
      'An offline meeting involving an unknown or online contact creates additional safety risk.'
    );
  }


  /* ----------------------------------------------------------
   * LOCATION + MEETING
   * ---------------------------------------------------------- */

  if (
    hasLocation &&
    hasMeeting
  ) {

    score += 25;

    signals.push(
      'Location + meeting combination'
    );

    reasons.push(
      'A request for location information combined with a meeting proposal requires additional caution.'
    );
  }


  /* ----------------------------------------------------------
   * PERSONAL INFORMATION + UNKNOWN CONTACT
   * ---------------------------------------------------------- */

  if (
    hasPersonalInfo &&
    hasUnknownContact
  ) {

    score += 20;

    signals.push(
      'Personal information + unknown contact'
    );

    reasons.push(
      'A request for personal information from an unfamiliar contact increases privacy and safety concerns.'
    );
  }


  /* ----------------------------------------------------------
   * PAYMENT + BLACKMAIL
   * ---------------------------------------------------------- */

  if (
    hasPayment &&
    hasBlackmail
  ) {

    score += 25;

    signals.push(
      'Payment + blackmail combination'
    );

    reasons.push(
      'A financial demand combined with coercive or threatening language is a strong extortion indicator.'
    );
  }


  /* ----------------------------------------------------------
   * THREAT + URGENCY
   * ---------------------------------------------------------- */

  if (
    hasThreat &&
    hasUrgency
  ) {

    score += 15;

    signals.push(
      'Threat + urgency combination'
    );

    reasons.push(
      'A serious threat combined with immediate pressure increases the safety concern.'
    );
  }


  /* ----------------------------------------------------------
   * SECRECY + UNKNOWN CONTACT
   * ---------------------------------------------------------- */

  if (
    hasSecrecy &&
    hasUnknownContact
  ) {

    score += 25;

    signals.push(
      'Secrecy + unknown contact combination'
    );

    reasons.push(
      'Requests for secrecy involving an unfamiliar contact are treated as a stronger safety concern.'
    );
  }


  /* ----------------------------------------------------------
   * THREAT + BLACKMAIL
   * ---------------------------------------------------------- */

  if (
    hasThreat &&
    hasBlackmail
  ) {

    score += 20;

    signals.push(
      'Threat + blackmail combination'
    );

    reasons.push(
      'A direct threat combined with coercive demands represents a particularly serious safety signal.'
    );
  }


  return score;
}


/* ============================================================
 * AGE ADAPTIVE PROTECTION
 * ============================================================
 *
 * This is the MOST IMPORTANT part for your GrowGuard demo.
 *
 * We deliberately separate:
 *
 *     BASE SCORE
 *          ↓
 *     AGE ADJUSTMENT
 *          ↓
 *     FINAL SCORE
 *
 * The base score represents the danger of the message.
 *
 * The age adjustment represents how much additional protection
 * GrowGuard applies because of the user's age.
 *
 * Younger user = stronger protection.
 *
 * Older user = less amplification.
 *
 * IMPORTANT:
 *
 * Age NEVER reduces the base danger.
 *
 * Therefore a dangerous message remains dangerous at 17.
 *
 * Example:
 *
 * Base score = 60
 *
 * Age 7  → 69
 * Age 10 → 68
 * Age 13 → 65
 * Age 15 → 63
 * Age 17 → 60
 *
 * This demonstrates adaptive protection without pretending
 * that the message itself became safer.
 * ============================================================ */

function getAgeMultiplier(
  age: number
): number {

  if (age <= 7) {
    return 1.15;
  }

  if (age === 8) {
    return 1.15;
  }

  if (age === 9) {
    return 1.14;
  }

  if (age === 10) {
    return 1.13;
  }

  if (age === 11) {
    return 1.12;
  }

  if (age === 12) {
    return 1.11;
  }

  if (age === 13) {
    return 1.09;
  }

  if (age === 14) {
    return 1.07;
  }

  if (age === 15) {
    return 1.05;
  }

  if (age === 16) {
    return 1.02;
  }

  return 1.00;
}


function applyAgeAdjustment(
  baseScore: number,
  age: number
): number {

  const multiplier =
    getAgeMultiplier(age);

  return Math.min(
    Math.round(
      baseScore * multiplier
    ),
    100
  );
}


/* ============================================================
 * RISK LEVEL
 * ============================================================ */

function getRiskLevel(
  score: number
): RiskLevel {

  if (score >= 75) {
    return 'Critical';
  }

  if (score >= 50) {
    return 'Elevated';
  }

  if (score >= 25) {
    return 'Moderate';
  }

  return 'Low';
}


/* ============================================================
 * SERIOUS-SIGNAL CHECK
 * ============================================================
 *
 * Some signals are important enough that the action should not
 * depend only on a generic score threshold.
 * ============================================================ */

function isSeriousSignal(
  signals: string[]
): boolean {

  return (
    signals.includes(
      'Direct threat'
    ) ||
    signals.includes(
      'Blackmail or extortion'
    )
  );
}


/* ============================================================
 * ACTION DECISION
 * ============================================================
 *
 * The action depends on:
 *
 * - final risk score
 * - user's age
 * - type of safety concern
 *
 * The purpose is NOT simply:
 *
 *     score > X = block
 *
 * Instead GrowGuard demonstrates adaptive intervention.
 *
 * A 7-year-old can receive stronger intervention than a
 * 17-year-old facing the same underlying risk.
 * ============================================================ */

function getAction(
  score: number,
  age: number,
  signals: string[]
): SafetyAction {

  const serious =
    isSeriousSignal(
      signals
    );


  /* ----------------------------------------------------------
   * EXTREMELY HIGH RISK
   * ---------------------------------------------------------- */

  if (score >= 90) {
    return 'GUARDIAN_ALERT';
  }


  /* ----------------------------------------------------------
   * SERIOUS THREATS / BLACKMAIL
   * ----------------------------------------------------------
   *
   * These must never fall through to NUDGE.
   * ---------------------------------------------------------- */

  if (serious) {

    if (age <= 11) {
      return 'GUARDIAN_ALERT';
    }

    if (age <= 13) {
      return 'BLOCK';
    }

    if (age <= 15) {
      return 'WARN';
    }

    return 'WARN';
  }


  /* ----------------------------------------------------------
   * VERY HIGH NORMAL RISK
   * ---------------------------------------------------------- */

  if (score >= 75) {

    if (age <= 12) {
      return 'GUARDIAN_ALERT';
    }

    if (age <= 14) {
      return 'BLOCK';
    }

    return 'WARN';
  }


  /* ----------------------------------------------------------
   * HIGH RISK
   * ---------------------------------------------------------- */

  if (score >= 60) {

    if (age <= 12) {
      return 'BLOCK';
    }

    if (age <= 15) {
      return 'WARN';
    }

    return 'NUDGE';
  }


  /* ----------------------------------------------------------
   * MODERATE-HIGH RISK
   * ---------------------------------------------------------- */

  if (score >= 45) {

    if (age <= 11) {
      return 'BLOCK';
    }

    if (age <= 13) {
      return 'WARN';
    }

    return 'NUDGE';
  }


  /* ----------------------------------------------------------
   * MODERATE RISK
   * ---------------------------------------------------------- */

  if (score >= 25) {

    if (age <= 10) {
      return 'WARN';
    }

    return 'NUDGE';
  }


  /* ----------------------------------------------------------
   * LOW RISK
   * ---------------------------------------------------------- */

  return 'ALLOW';
}


/* ============================================================
 * EXPLANATION GENERATOR
 * ============================================================ */

function generateExplanation(
  action: SafetyAction,
  age: number,
  score: number,
  baseScore: number,
  signals: string[]
): string {

  const serious =
    isSeriousSignal(
      signals
    );


  /*
   * Serious situations get a more specific explanation.
   */

  if (
    serious &&
    action === 'GUARDIAN_ALERT'
  ) {

    return (
      `GrowGuard detected a serious safety signal and calculated ` +
      `a ${score}/100 risk for a ${age}-year-old user. ` +
      `Because the situation involves a direct threat or coercive ` +
      `behaviour and the user is in a younger age group, GrowGuard ` +
      `escalates the event to the trusted guardian.`
    );
  }


  if (
    serious &&
    action === 'BLOCK'
  ) {

    return (
      `GrowGuard detected a serious safety signal and calculated ` +
      `a ${score}/100 risk. Because the user is ${age}, GrowGuard ` +
      `uses stronger intervention and blocks the risky interaction.`
    );
  }


  if (
    serious &&
    action === 'WARN'
  ) {

    return (
      `GrowGuard detected a serious safety signal and calculated ` +
      `a ${score}/100 risk. The underlying message remains serious, ` +
      `but GrowGuard uses a warning-based intervention for this age group.`
    );
  }


  switch (action) {

    case 'ALLOW':

      return (
        `GrowGuard detected no significant safety indicators. ` +
        `The message has an assessed risk of ${score}/100 and ` +
        `can be allowed normally.`
      );


    case 'NUDGE':

      return (
        `GrowGuard detected some safety indicators and calculated ` +
        `a ${score}/100 risk for a ${age}-year-old user. ` +
        `The system provides a subtle safety reminder without ` +
        `automatically interrupting the interaction.`
      );


    case 'WARN':

      return (
        `GrowGuard detected several safety indicators and calculated ` +
        `a ${score}/100 risk for a ${age}-year-old user. ` +
        `The system presents a clear warning so the young person ` +
        `has an opportunity to reconsider the interaction.`
      );


    case 'BLOCK':

      return (
        `GrowGuard calculated a ${score}/100 risk for a ` +
        `${age}-year-old user. The combination of risk signals is ` +
        `strong enough that the risky action should be prevented.`
      );


    case 'GUARDIAN_ALERT':

      return (
        `GrowGuard calculated a ${score}/100 risk and determined ` +
        `that the situation requires guardian involvement.`
      );


    default:

      return (
        `GrowGuard assessed this interaction using its safety engine.`
      );
  }
}


/* ============================================================
 * MAIN ANALYSIS FUNCTION
 * ============================================================ */

export function analyzeMessage(
  message: string,
  age: number
): SafetyAnalysis {

  /*
   * ----------------------------------------------------------
   * STEP 1 — NORMALISE INPUT
   * ----------------------------------------------------------
   */

  const text =
    normaliseText(
      message
    );


  /*
   * ----------------------------------------------------------
   * STEP 2 — VALIDATE AGE
   * ----------------------------------------------------------
   *
   * The Safety Lab currently supports ages 10–17,
   * but the engine remains safe if another value is supplied.
   * ----------------------------------------------------------
   */

  const safeAge =
    Math.max(
      10,
      Math.min(
        17,
        Math.round(age)
      )
    );


  /*
   * ----------------------------------------------------------
   * STEP 3 — DETECT INDIVIDUAL SIGNALS
   * ----------------------------------------------------------
   */

  const detected =
    detectSignals(
      text
    );


  let baseScore =
    detected.score;


  const signals =
    [...detected.signals];


  const reasons =
    [...detected.reasons];


  /*
   * ----------------------------------------------------------
   * STEP 4 — CONTEXTUAL ANALYSIS
   * ----------------------------------------------------------
   */

  baseScore =
    applyCombinationRules(
      text,
      baseScore,
      signals,
      reasons
    );


  /*
   * ----------------------------------------------------------
   * STEP 5 — KEEP BASE SCORE WITHIN 0–100
   * ----------------------------------------------------------
   */

  baseScore =
    Math.min(
      Math.max(
        baseScore,
        0
      ),
      100
    );


  /*
   * ----------------------------------------------------------
   * STEP 6 — AGE ADAPTATION
   * ----------------------------------------------------------
   *
   * This is where GrowGuard's adaptive concept happens.
   *
   * The base danger is preserved.
   *
   * Younger users receive stronger protection.
   * ----------------------------------------------------------
   */

  const score =
    applyAgeAdjustment(
      baseScore,
      safeAge
    );


  /*
   * ----------------------------------------------------------
   * STEP 7 — EXPLAIN AGE ADAPTATION
   * ----------------------------------------------------------
   */

  if (
    baseScore > 0 &&
    score !== baseScore
  ) {

    const multiplier =
      getAgeMultiplier(
        safeAge
      );


    const percentage =
      Math.round(
        (multiplier - 1) * 100
      );


    reasons.push(
      `Age-adaptive protection increased the assessment by approximately ${percentage}% for a ${safeAge}-year-old user.`
    );


    signals.push(
      'Age-adaptive protection'
    );
  }


  /*
   * ----------------------------------------------------------
   * STEP 8 — DETERMINE RISK LEVEL
   * ----------------------------------------------------------
   */

  const level =
    getRiskLevel(
      score
    );


  /*
   * ----------------------------------------------------------
   * STEP 9 — DETERMINE INTERVENTION
   * ----------------------------------------------------------
   */

  const action =
    getAction(
      score,
      safeAge,
      signals
    );


  /*
   * ----------------------------------------------------------
   * STEP 10 — GENERATE EXPLANATION
   * ----------------------------------------------------------
   */

  const explanation =
    generateExplanation(
      action,
      safeAge,
      score,
      baseScore,
      signals
    );


  /*
   * ----------------------------------------------------------
   * STEP 11 — RETURN COMPLETE RESULT
   * ----------------------------------------------------------
   */

  return {
    score,
    level,
    action,
    reasons,
    signals,
    explanation
  };
}


/* ============================================================
 * END OF GROWGUARD SAFETY ENGINE
 * ============================================================
 */
