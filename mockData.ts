import { AgeStageData, AiScenario, PrototypeStep, ResearchTopic } from '../types';

export const AGE_STAGES: AgeStageData[] = [
  {
    age: 10,
    label: 'Age 10 — Early Childhood',
    stageTitle: 'High Protective Shield & Parent Co-Pilot',
    protectionScore: 95,
    independenceScore: 20,
    aiSensitivity: 'Very High',
    parentInvolvement: 'Supervised & Co-Piloted',
    appStorePolicy: 'Strict Whitelist Only',
    trustModeFocus: 'Bedtime habits & healthy routine rewards',
    description: 'Designed for a child receiving their first connected device. The system prioritizes strict guardrails, zero untrusted inbound messages, and continuous parent visibility.',
    keyFeaturesActive: [
      'Strict Safe Zones with instant entry/exit arrival alerts',
      'Curated App Store with manual parent biometric authorization',
      'Bedtime automated screen wind-down and bedtime lock',
      'AI Safety Monitoring configured to proactive warning for any unfamiliar contact',
      'Emergency SOS configured for 1-touch dialling to guardians'
    ]
  },
  {
    age: 11,
    label: 'Age 11 — Primary Transition',
    stageTitle: 'Guided Exploration with Active Boundaries',
    protectionScore: 88,
    independenceScore: 30,
    aiSensitivity: 'High',
    parentInvolvement: 'Supervised & Co-Piloted',
    appStorePolicy: 'Strict Whitelist Only',
    trustModeFocus: 'Bedtime habits & healthy routine rewards',
    description: 'Transitioning toward secondary school. Supports safe school route tracking while keeping social interactions within parent-verified peer circles.',
    keyFeaturesActive: [
      'School route GPS corridor monitoring',
      'Contextual AI alerts on unverified peer requests',
      'Educational app category autonomy during homework hours',
      'Visual Trust Mode badge encouraging consistent sleep schedules'
    ]
  },
  {
    age: 12,
    label: 'Age 12 — Early Adolescent',
    stageTitle: 'Supervised Social Discovery',
    protectionScore: 80,
    independenceScore: 45,
    aiSensitivity: 'High',
    parentInvolvement: 'Proactive Alerts & Approvals',
    appStorePolicy: 'Parent Approval Required',
    trustModeFocus: 'Screen-time balance & digital pauses',
    description: 'Introduction of wider communication with classmates. AI begins identifying peer pressure patterns and deceptive content while reducing trivial notifications to parents.',
    keyFeaturesActive: [
      'AI context checking on external web links & downloads',
      'Parent Dashboard weekly digital wellbeing summaries',
      'Customizable Safe Zones for after-school clubs & friends’ houses',
      'Downtime prompts after 45 minutes of continuous interactive apps'
    ]
  },
  {
    age: 13,
    label: 'Age 13 — Middle Teen Milestone',
    stageTitle: 'Balanced Autonomy with Contextual AI Guardian',
    protectionScore: 70,
    independenceScore: 60,
    aiSensitivity: 'Moderate',
    parentInvolvement: 'Targeted Alerts & Weekly Digest',
    appStorePolicy: 'Age-Tiered Approval',
    trustModeFocus: 'Screen-time balance & digital pauses',
    description: 'The statutory transition age for online services. Shift from blocking to contextual warnings and self-reflection prompts before sending or opening flagged material.',
    keyFeaturesActive: [
      'In-the-moment nudge before clicking suspicious links or sending heated texts',
      'Curated store age-13+ tier accessible with one-tap parent approval push',
      'Trust Mode streak unlocking 15 minutes of flexible weekend screen time',
      'Private browsing alerts reserved only for high-severity threat vectors'
    ]
  },
  {
    age: 14,
    label: 'Age 14 — Identity & Peer Focus',
    stageTitle: 'Dynamic Trust-Building & Smart Filter Scaling',
    protectionScore: 60,
    independenceScore: 70,
    aiSensitivity: 'Moderate',
    parentInvolvement: 'Targeted Alerts & Weekly Digest',
    appStorePolicy: 'Age-Tiered Approval',
    trustModeFocus: 'Self-directed downtime & focus blocks',
    description: 'Young teens develop personal routines. Protection scales back on low-level apps while maintaining rigorous shields against online scams, grooming, and severe cyberbullying.',
    keyFeaturesActive: [
      'AI distinguishes between friendly teen slang and genuine harassment',
      'Self-managed study focus blocks with notification throttling',
      'Parental Dashboard prioritizes trends and serious concerns over micro-logs'
    ]
  },
  {
    age: 15,
    label: 'Age 15 — Maturing Autonomy',
    stageTitle: 'Advisory Mode & Self-Regulation',
    protectionScore: 48,
    independenceScore: 82,
    aiSensitivity: 'Balanced',
    parentInvolvement: 'Advisory & High-Risk Alerts',
    appStorePolicy: 'Age-Tiered Approval',
    trustModeFocus: 'Self-directed downtime & focus blocks',
    description: 'Focus shifts from external limits to internal self-regulation. The system treats the teen as the primary decision-maker, alerting parents only during verified emergencies.',
    keyFeaturesActive: [
      'Teen-facing privacy and security diagnostics hub',
      'Discreet parental notification only if high-confidence scam or safety hazard is verified',
      'Safe Zones switched to check-in reminders rather than passive boundary alerts'
    ]
  },
  {
    age: 16,
    label: 'Age 16 — Near-Adult Independence',
    stageTitle: 'Independent Navigation with Critical Safety Net',
    protectionScore: 35,
    independenceScore: 90,
    aiSensitivity: 'Low-Intervention',
    parentInvolvement: 'Advisory & High-Risk Alerts',
    appStorePolicy: 'Self-Install with Advisory Alerts',
    trustModeFocus: 'Full self-regulation & reflection',
    description: 'Preparing for full independence. Complete app store freedom with passive security scans and emergency fallback infrastructure.',
    keyFeaturesActive: [
      'Self-directed app installations with background malware & phishing scanners',
      'Trust Mode delivers weekly personal screen-time insights directly to the teen',
      'Emergency SOS with direct emergency services dispatch capability and guardian ping'
    ]
  },
  {
    age: 17,
    label: 'Age 17 — Pre-Adulthood Transition',
    stageTitle: 'Full Autonomy & Lifelong Digital Habits',
    protectionScore: 20,
    independenceScore: 98,
    aiSensitivity: 'Low-Intervention',
    parentInvolvement: 'Autonomous with Safety Net',
    appStorePolicy: 'Self-Install with Advisory Alerts',
    trustModeFocus: 'Full self-regulation & reflection',
    description: 'The final step before transitioning into standard OS mode at age 18. Minimal background monitoring focused solely on critical identity theft, emergency SOS, and well-being insights.',
    keyFeaturesActive: [
      'Adult transition export tool for preserving healthy digital wellbeing routines',
      'Emergency SOS active and accessible in 1 gesture',
      'Zero routine parental surveillance; guardian acts as trusted emergency contact'
    ]
  }
];

export const AI_SCENARIOS: AiScenario[] = [
  {
    id: 'phishing-coins',
    category: 'Phishing Scam',
    title: 'Deceptive Gaming Currency Lure',
    snippet: 'Hey! Enter your account password here to claim 5,000 free BattlePass gems before the promo ends in 10 mins: bit.ly/claim-gems-89x',
    sender: 'Unknown Discord contact (User#9942)',
    time: 'Yesterday at 17:42',
    riskLevel: 'Critical',
    riskScore: 94,
    traditionalOutcome: 'Missed or Allowed: Simple keyword filter saw words "claim" and "gems" which are common in regular gaming chats.',
    growGuardOutcome: 'Flagged with Contextual Warning: AI detected newly contacted stranger, high artificial urgency, credential-harvesting request, and an obfuscated redirection URL.',
    contextSignals: [
      { name: 'Contact History', description: 'Zero previous interaction history; account created 2 hours ago', weight: 'High' },
      { name: 'Deceptive Urgency', description: '"Before the promo ends in 10 mins" triggers psychological scarcity flag', weight: 'Medium' },
      { name: 'Credential Harvesting', description: 'Request explicitly asks for account login credentials', weight: 'Critical' },
      { name: 'Suspicious Domain', description: 'Shortened URL redirects to unverified third-party spoofing portal', weight: 'Critical' }
    ],
    aiReasoning: 'While individual words like "free" or "gems" are benign, the combination of a zero-reputation sender, an obfuscated link, time pressure, and a direct request for login credentials matches high-probability phishing.',
    recommendedAction: 'Display non-intrusive safety banner on child device explaining the scam pattern; isolate link preview; log incident to GrowGuard Parent Dashboard.',
    parentDigestNote: 'Phishing attempt intercepted on gaming messaging app. Link blocked from auto-opening; advisory warning shown to user.'
  },
  {
    id: 'cyberbullying-exclusion',
    category: 'Cyberbullying',
    title: 'Persistent Group Chat Exclusion Pattern',
    snippet: 'Everyone make sure nobody tells Alex about Friday after school, nobody wants them there anyway lol',
    sender: 'School Group Chat (6 participants)',
    time: 'Today at 15:18',
    riskLevel: 'Elevated',
    riskScore: 78,
    traditionalOutcome: 'Missed: Contains no profanity, vulgarity, or prohibited slurs; passes standard text filters.',
    growGuardOutcome: 'Contextual Pattern Flag: AI correlates message against 4 previous exclusionary remarks across the past 72 hours, identifying an escalating harassment pattern.',
    contextSignals: [
      { name: 'Multi-Day Temporal Correlation', description: '3rd targeted exclusionary remark aimed at the same individual this week', weight: 'High' },
      { name: 'Social Group Dynamics', description: 'Directive issued to multiple group members simultaneously', weight: 'Medium' },
      { name: 'Tone & Intent Analysis', description: 'Deliberate social isolation phrasing without overt profanity', weight: 'High' }
    ],
    aiReasoning: 'Standard filters rely on explicit offensive keywords. GrowGuard evaluates sentiment trajectory across conversational threads, recognising covert social alienation tactics.',
    recommendedAction: 'Provide empathetic in-app wellbeing check-in to child; prompt support resources; summarize trend for parent without violating conversational dignity.',
    parentDigestNote: 'Wellbeing notice: Persistent exclusionary dynamic detected across school group chat. Consider a gentle check-in.'
  },
  {
    id: 'suspicious-link-location',
    category: 'Suspicious Link',
    title: 'Unsolicited File with Location Probe',
    snippet: 'Check out this photo from the park earlier: http://geotag-verify.app/view?img=8812 - allow GPS to see who is nearby',
    sender: 'Direct message from non-contact',
    time: '2 days ago',
    riskLevel: 'Critical',
    riskScore: 91,
    traditionalOutcome: 'Allowed: Phrased like a friendly photo link; passes generic URL checks.',
    growGuardOutcome: 'Proactive Quarantine: AI identified unauthorized location permission solicitation wrapped inside a media viewing lure from an unsaved sender.',
    contextSignals: [
      { name: 'Sender Trust Tier', description: 'Sender not found in device address book or mutual contact graph', weight: 'High' },
      { name: 'Permission Escalation', description: 'Web page requests background geolocation permissions under false pretenses', weight: 'Critical' },
      { name: 'Media Lure Pattern', description: 'Classic social engineering structure: curiosity hook leading to sensor probe', weight: 'High' }
    ],
    aiReasoning: 'Unsolicited links that mandate hardware sensor access (GPS/Camera) from unverified senders represent an elevated child safety hazard.',
    recommendedAction: 'Quarantine link preview; disable one-tap location grant; prompt user with safe browsing explanation.',
    parentDigestNote: 'Location-probing link from unknown contact blocked from accessing device location services.'
  },
  {
    id: 'social-manipulation-coercion',
    category: 'Social Manipulation',
    title: 'Boundary Testing & Secrecy Solicitation',
    snippet: 'You do not need to tell your parents about our project meetup, it is better if it is just our secret ok?',
    sender: 'Online gaming forum connection',
    time: '3 days ago',
    riskLevel: 'Elevated',
    riskScore: 86,
    traditionalOutcome: 'Missed: Contains benign words ("parents", "project", "meetup", "secret").',
    growGuardOutcome: 'Intervention Prompt: AI identifies classic isolation phrases ("do not tell your parents", "our secret") from an online acquaintance.',
    contextSignals: [
      { name: 'Secrecy Mandate', description: 'Explicit request to withhold information from guardians', weight: 'Critical' },
      { name: 'In-Person Escalation', description: 'Proposing offline meeting ("project meetup") with non-local contact', weight: 'High' },
      { name: 'Relationship Velocity', description: 'Sudden pivot from casual gameplay to private physical meeting requests', weight: 'High' }
    ],
    aiReasoning: 'Requests for secrecy combined with offline meeting proposals represent established grooming indicators that keyword matchers cannot comprehend.',
    recommendedAction: 'Trigger immediate calm safety banner; provide guidance on trusted adults; notify Parent Dashboard with high priority explanation.',
    parentDigestNote: 'High Priority Alert: Secrecy solicitation and meeting request detected from unverified online connection.'
  },
  {
    id: 'impersonation-clone',
    category: 'Account Impersonation',
    title: 'Duplicate Contact Identity Probe',
    snippet: 'Hey! My old phone broke, this is Sam’s new account. Can you send me the passcode sent to your phone so I can verify my WhatsApp?',
    sender: 'New number displaying contact name "Sam"',
    time: 'Last week',
    riskLevel: 'Critical',
    riskScore: 96,
    traditionalOutcome: 'Allowed: Phrased as a typical technical emergency between friends.',
    growGuardOutcome: 'Identity Verification Check: OS cross-references active contact records, noticing legitimate contact "Sam" is active on a different verified device.',
    contextSignals: [
      { name: 'Contact Graph Conflict', description: 'Existing verified contact for "Sam" currently active on verified SIM', weight: 'Critical' },
      { name: '2FA Verification Lure', description: 'Request for one-time verification SMS passcode', weight: 'Critical' },
      { name: 'Account Takeover Pattern', description: 'Recognized SIM-swap / WhatsApp takeover protocol vector', weight: 'Critical' }
    ],
    aiReasoning: 'The combination of contact impersonation with a request for multi-factor authentication codes is an unmistakable sign of account hijacking.',
    recommendedAction: 'Block copy/forwarding of OTP codes; notify user of suspected impersonation; recommend calling the real contact directly.',
    parentDigestNote: 'Account takeover attempt blocked: Suspicious number attempted to harvest 2FA authorization codes under a cloned name.'
  }
];

export const PROTOTYPE_STEPS: PrototypeStep[] = [
  {
    id: 'step-1',
    stepNumber: 1,
    title: 'Parent Verification & Device Pairing',
    subtitle: 'Secure Onboarding Protocol',
    featureName: 'Parent Verification',
    techType: 'Biometrics & Identity',
    description: 'The onboarding journey begins on the guardian’s device. To prevent unauthorized device bypass or fraudulent account creation, the parent completes secure ID verification and live facial recognition before linking the child’s smartphone.',
    keyTakeaways: [
      'Live liveness detection prevents photo/video spoofing',
      'Encrypted cryptographic pairing between Parent Dashboard and child OS',
      'Zero public cloud storage of biometric facial vectors (on-device Secure Enclave)'
    ],
    screenType: 'parent-verify'
  },
  {
    id: 'step-2',
    stepNumber: 2,
    title: 'Age-Based Baseline Protection Setup',
    subtitle: 'Initial Developmental Calibration',
    featureName: 'Age-Based Protection',
    techType: 'Adaptive Framework',
    description: 'During initial setup, the parent enters the young person’s age. GrowGuard automatically configures appropriate baseline parameters for app store access, AI sensitivity, geofencing perimeters, and communication boundaries.',
    keyTakeaways: [
      'Calibrated against adolescent development milestones (ages 10 to 17)',
      'Customizable starting profiles that adapt as the child matures',
      'Provides a baseline framework rather than rigid, permanent restrictions'
    ],
    screenType: 'age-setup'
  },
  {
    id: 'step-3',
    stepNumber: 3,
    title: 'GrowGuard AI Safety Monitoring',
    subtitle: 'Context-Aware Digital Shield',
    featureName: 'GrowGuard AI Safety Monitoring',
    techType: 'AI Technology',
    description: 'In daily messaging and social apps, the contextual AI monitors incoming and outgoing interactions. Instead of blindly blocking keywords, it evaluates conversation history, sender reputation, and behavioral indicators.',
    keyTakeaways: [
      'Distinguishes harmless youth slang from genuine malicious intent',
      'Nuanced response spectrum: subtle warnings, reflection prompts, or guardian escalations',
      'Privacy-first on-device lightweight language models prevent invasive cloud eavesdropping'
    ],
    screenType: 'ai-chat'
  },
  {
    id: 'step-4',
    stepNumber: 4,
    title: 'Curated App Store with Smart Insights',
    subtitle: 'Safe Marketplace Ecosystem',
    featureName: 'Curated App Store',
    techType: 'AI Technology',
    description: 'Young people browse a marketplace where applications are categorized as Approved, Age-Appropriate, Requires Parent Review, or Restricted. AI assists parents by analyzing app privacy policies, monetization traps, and content risks.',
    keyTakeaways: [
      'Instant one-tap parent approval requests sent to Parent Dashboard',
      'AI-generated plain-language summaries of in-app purchasing and data collection',
      'Parents retain ultimate authority over app permissions and installations'
    ],
    screenType: 'curated-store'
  },
  {
    id: 'step-5',
    stepNumber: 5,
    title: 'Safe Zones (Geofencing)',
    subtitle: 'Real-World Physical Location Safety',
    featureName: 'Safe Zones (Geofencing)',
    techType: 'GPS & Geofencing',
    description: 'Parents define trusted geographic perimeters such as Home, School, Sports Club, or Library. When the smartphone arrives at or departs from designated boundaries, battery-efficient geofencing alerts are dispatched.',
    keyTakeaways: [
      'Relies purely on high-precision GPS, Wi-Fi triangulation, and geofencing hardware (not AI)',
      'Configurable time-based rules (e.g. notify if departure occurs during school hours)',
      'Respects privacy by focusing on perimeter transitions rather than constant visual tracking'
    ],
    screenType: 'geofence-map'
  },
  {
    id: 'step-6',
    stepNumber: 6,
    title: 'Emergency SOS Protocol',
    subtitle: 'Calm, Instant Emergency Dispatch',
    featureName: 'Emergency SOS',
    techType: 'Emergency Protocol',
    description: 'A discreet physical trigger (e.g. 5 rapid power-button clicks) activates a calm emergency interface. It automatically shares live coordinates with trusted guardians and initiates priority emergency routing.',
    keyTakeaways: [
      'High-reliability emergency cellular and satellite handshake fallback',
      'Calm UI avoids panic-inducing audio or jarring strobe animations',
      'Continuous live beacon broadcasting with battery reserve preservation'
    ],
    screenType: 'sos-screen'
  },
  {
    id: 'step-7',
    stepNumber: 7,
    title: 'Trust Mode & Digital Wellbeing',
    subtitle: 'Earned Independence System',
    featureName: 'Trust Mode',
    techType: 'Adaptive Framework',
    description: 'A dedicated wellbeing hub where young people see their progress toward earned independence. Responsible digital habits, balanced screen time, and adherence to sleep schedules unlock greater device autonomy.',
    keyTakeaways: [
      'Gamified positive reinforcement replaces punitive screen time cutoffs',
      'AI assists in evaluating long-term trends without algorithmic moralizing',
      'Empowers teens to build lifelong self-regulation and healthy digital habits'
    ],
    screenType: 'trust-dashboard'
  },
  {
    id: 'step-8',
    stepNumber: 8,
    title: 'Graduated Independence (Ages 16–17)',
    subtitle: 'Transitioning to Adulthood',
    featureName: 'Adaptive AI Sensitivity™',
    techType: 'OS Integration',
    description: 'As the teenager approaches adulthood, GrowGuard smoothly reduces interventions. The operating system shifts from guardian oversight to personal digital wellness coaching, preparing them for an unmonitored digital life.',
    keyTakeaways: [
      'Gradual de-escalation of parental monitoring based on age and trust milestones',
      'Preservation of core emergency fallback and scam detection capabilities',
      'Fulfills the core promise: a smartphone operating system that truly grows with you'
    ],
    screenType: 'graduated-independence'
  }
];

export const RESEARCH_TOPICS: ResearchTopic[] = [
  {
    id: 'brain-development',
    title: 'Adolescent Neurodevelopment & Prefrontal Cortex Maturation',
    subtitle: 'Why fixed safety rules fail developing minds',
    category: 'Neurodevelopment',
    summary: 'The adolescent brain is undergoing profound structural synaptic pruning and myelination, particularly in the prefrontal cortex which governs executive function, impulse control, and long-term risk assessment.',
    scientificInsight: 'Neuroscientific consensus (Casey et al., Steinberg) demonstrates that socioemotional neural circuits (the limbic system) mature faster than cognitive control systems (prefrontal cortex). This creates heightened sensitivity to immediate peer feedback, sensation-seeking, and digital dopamine loops.',
    growGuardSolution: 'Rather than treating young people as adults who lack discipline or children who require total lockdown, GrowGuard provides scaffolding: strong external impulse buffers at age 10 that gradually hand control back as neural pathways mature.',
    tags: ['Prefrontal Cortex', 'Executive Function', 'Limbic System', 'Developmental Scaffolding']
  },
  {
    id: 'harmful-content',
    title: 'Contextual Vulnerability in Online Harm & Manipulation',
    subtitle: 'The inadequacy of dictionary-based content filtering',
    category: 'Content Safety',
    summary: 'Online risks targeting adolescents rarely conform to vulgar keyword lists. Grooming, financial sextortion, and cyberbullying rely on social engineering, peer pressure, and ambiguous phrasing.',
    scientificInsight: 'Research from online safety bodies (e.g. Internet Watch Foundation, UK Safer Internet Centre) reveals that over 80% of predatory coercion and peer harassment occurs using standard, non-explicit vocabulary that evades keyword blocklists.',
    growGuardSolution: 'GrowGuard AI Safety Monitoring inspects multi-turn conversational context, sudden changes in relationship velocity, isolation demands, and obfuscated redirects to detect threats before damage occurs.',
    tags: ['Social Engineering', 'Contextual Semantics', 'Peer Harassment', 'Multi-Turn NLP']
  },
  {
    id: 'persuasive-design',
    title: 'Persuasive Technology & Engagement Architecture',
    subtitle: 'Counteracting variable rewards, infinite scroll, and algorithmic nudges',
    category: 'Persuasive Design',
    summary: 'Modern smartphone applications leverage B.F. Skinner variable ratio reward schedules, autoplay mechanisms, and social friction to maximize screen time at the expense of adolescent sleep and mental health.',
    scientificInsight: 'Studies in digital ergonomics (Center for Humane Technology, Twenge et al.) link excessive nocturnal smartphone usage with reduced REM sleep, disrupted circadian rhythms, and increased depressive symptoms among teenagers.',
    growGuardSolution: 'Trust Mode provides visual friction against infinite loops, gradual screen desaturation at scheduled wind-down windows, and positive reinforcement for self-directed digital pauses.',
    tags: ['Variable Reward Loops', 'Circadian Rhythms', 'Digital Ergonomics', 'Habit Formation']
  },
  {
    id: 'parental-controls',
    title: 'The "Cat-and-Mouse" Dilemma of Third-Party Parental Apps',
    subtitle: 'Why downloadable apps get bypassed and breed resentment',
    category: 'Parental Control Systems',
    summary: 'Traditional parental control apps suffer from fundamental structural flaws: they run as userland processes that are easily circumvented via VPNs, dual profiles, or simple uninstallation.',
    scientificInsight: 'Family tech dynamic surveys (Pew Research, UK Ofcom) show that overt surveillance apps damage parent-child trust and incentivize teenagers to acquire clandestine second devices or bypass techniques.',
    growGuardSolution: 'By integrating safety directly into the operating system kernel and Secure Enclave, GrowGuard provides tamper-resistant security paired with transparent trust metrics that celebrate growing autonomy.',
    tags: ['OS Architecture', 'Parent-Child Trust', 'Tamper Resistance', 'System-Level Policy']
  }
];

export const ACADEMIC_REFERENCES = [
  {
    citation: 'Casey, B. J., Jones, R. M., & Somerville, L. H. (2011). Braking and Accelerating of the Adolescent Brain. Journal of Research on Adolescence, 21(1), 21-33.',
    relevance: 'Provides foundational neuroimaging evidence regarding the asynchronous maturation of prefrontal executive control versus limbic reward systems.'
  },
  {
    citation: 'Steinberg, L. (2008). A Social Neuroscience Perspective on Adolescent Risk-Taking. Developmental Review, 28(1), 78-106.',
    relevance: 'Demonstrates why adolescent decision-making is uniquely vulnerable in emotionally charged and peer-influenced digital environments.'
  },
  {
    citation: 'Livingstone, S., & Stoilova, M. (2021). The 4Cs: Classifying Online Risk to Children. CO:RE - Children Online: Research and Evidence.',
    relevance: 'Informs GrowGuard’s classification framework across Content, Contact, Conduct, and Contract risks.'
  },
  {
    citation: 'Ofcom (2024). Children and Parents: Media Use and Attitudes Report 2024. Office of Communications UK.',
    relevance: 'Supplies authentic demographic insights on smartphone ownership ages, bypass habits, and family mediation strategies.'
  },
  {
    citation: 'Center for Humane Technology (2022). Principles of Humane Technology: Moving Beyond Engagement Maximization.',
    relevance: 'Underpins Trust Mode’s ethical interaction design and cognitive scaffolding principles.'
  }
];

export const TECH_ECOSYSTEM = [
  {
    name: 'GrowGuard AI Safety Monitoring',
    category: 'Core AI System',
    isAi: true,
    techStack: 'On-device NLP & Transformer-based Context Classifiers',
    role: 'Analyzes multi-turn conversations, links, and behavioral anomalies for online risk patterns.'
  },
  {
    name: 'Adaptive AI Sensitivity™',
    category: 'Core AI System',
    isAi: true,
    techStack: 'Dynamic Parameter Tuning & Developmental Heuristics',
    role: 'Adjusts threshold sensitivity and notification intensity proportionally according to age (10–17).'
  },
  {
    name: 'GrowGuard Parent Dashboard',
    category: 'Hybrid System (AI + Cloud Sync)',
    isAi: true,
    techStack: 'Secure Web / Mobile App + AI Synthesis Summaries',
    role: 'Presents clear safety trends, alerts, approvals, and AI-generated plain-language explanations.'
  },
  {
    name: 'Curated App Store',
    category: 'Hybrid System (AI + Storefront)',
    isAi: true,
    techStack: 'OS Market Infrastructure + AI Content/Permission Profiling',
    role: 'Categorizes applications by developmental safety; AI flags monetization & privacy risks for parent approval.'
  },
  {
    name: 'Trust Mode',
    category: 'Hybrid System (Behavioral + AI)',
    isAi: true,
    techStack: 'OS Wellbeing Engine + AI Long-Term Habit Pattern Analysis',
    role: 'Tracks healthy usage habits and calculates earned autonomy milestones without moralistic scoring.'
  },
  {
    name: 'Parent Verification',
    category: 'Biometrics & Cryptography (Not AI)',
    isAi: false,
    techStack: 'Secure Enclave Biometrics & Government ID Liveness Verification',
    role: 'Ensures cryptographic proof of adult guardianship and device pairing during initial provisioning.'
  },
  {
    name: 'Safe Zones (Geofencing)',
    category: 'Location & Telemetry (Not AI)',
    isAi: false,
    techStack: 'Multi-Constellation GNSS, Cell Tower Triangulation & Geofence Hardware API',
    role: 'Monitors arrivals and departures at designated perimeters (Home, School, Sports Clubs).'
  },
  {
    name: 'Emergency SOS',
    category: 'Emergency Telecom (Not AI)',
    isAi: false,
    techStack: 'Hardware Interrupts, Direct E911/999 Routing & Satellite Beacon',
    role: 'Instantly broadcasts live coordinates to guardians and dispatches emergency assistance.'
  },
  {
    name: 'Operating System Integration',
    category: 'Kernel & Architecture (Not AI)',
    isAi: false,
    techStack: 'Customized Mobile OS Kernel, Secure Boot & Tamper-Proof Permissions',
    role: 'Embeds safety controls at the kernel level so they cannot be bypassed by uninstallation or VPNs.'
  }
];
