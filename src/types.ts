export type PageId = 'home' | 'product' | 'research' | 'prototype' | 'ai' | 'safety' | 'about';

export interface AgeStageData {
  age: number;
  label: string;
  stageTitle: string;
  protectionScore: number; // 0 - 100
  independenceScore: number; // 0 - 100
  aiSensitivity: 'Very High' | 'High' | 'Moderate' | 'Balanced' | 'Low-Intervention';
  parentInvolvement: 'Supervised & Co-Piloted' | 'Proactive Alerts & Approvals' | 'Targeted Alerts & Weekly Digest' | 'Advisory & High-Risk Alerts' | 'Autonomous with Safety Net';
  appStorePolicy: 'Strict Whitelist Only' | 'Parent Approval Required' | 'Age-Tiered Approval' | 'Self-Install with Advisory Alerts';
  trustModeFocus: 'Bedtime habits & healthy routine rewards' | 'Screen-time balance & digital pauses' | 'Self-directed downtime & focus blocks' | 'Full self-regulation & reflection';
  description: string;
  keyFeaturesActive: string[];
}

export interface AiScenario {
  id: string;
  category: 'Phishing Scam' | 'Cyberbullying' | 'Suspicious Link' | 'Social Manipulation' | 'Account Impersonation';
  title: string;
  snippet: string;
  sender: string;
  time: string;
  riskLevel: 'Low' | 'Moderate' | 'Elevated' | 'Critical';
  riskScore: number; // 0 to 100
  traditionalOutcome: string;
  growGuardOutcome: string;
  contextSignals: {
    name: string;
    description: string;
    weight: 'High' | 'Medium' | 'Critical';
  }[];
  aiReasoning: string;
  recommendedAction: string;
  parentDigestNote: string;
}

export interface PrototypeStep {
  id: string;
  stepNumber: number;
  title: string;
  subtitle: string;
  featureName: string;
  techType: 'AI Technology' | 'Biometrics & Identity' | 'GPS & Geofencing' | 'Emergency Protocol' | 'OS Integration' | 'Adaptive Framework';
  description: string;
  keyTakeaways: string[];
  screenType: 'parent-verify' | 'age-setup' | 'ai-chat' | 'curated-store' | 'geofence-map' | 'sos-screen' | 'trust-dashboard' | 'graduated-independence';
}

export interface ResearchTopic {
  id: string;
  title: string;
  subtitle: string;
  category: 'Neurodevelopment' | 'Content Safety' | 'Persuasive Design' | 'Parental Control Systems';
  summary: string;
  scientificInsight: string;
  growGuardSolution: string;
  tags: string[];
}
