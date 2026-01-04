// Project Types
export interface Project {
  id: string;
  personalInfo: PersonalInfo;
  projectIdea: ProjectIdea;
  targetMarket: TargetMarket;
  resources: Resources;
  createdAt: Date;
  updatedAt: Date;
  currentStep: number;
  completed: boolean;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface ProjectIdea {
  name: string;
  description: string;
  sector: string;
  innovation: string;
}

export interface TargetMarket {
  targetClients: string;
  competition: string;
  positioning: string;
}

export interface Resources {
  team: string;
  initialBudget: number;
  materialNeeds: string;
}

// Legal Status Types
export interface LegalStatus {
  id: string;
  name: string;
  shortName: string;
  description: string;
  minCapital: number;
  maxAssociates: number;
  socialChargesRate: number;
  taxationType: string;
  liability: string;
  advantages: string[];
  disadvantages: string[];
  bestFor: string[];
}

// Financing Types
export interface FinancingAid {
  id: string;
  name: string;
  type: 'subvention' | 'pret' | 'garantie' | 'exoneration';
  provider: string;
  amount: { min: number; max: number };
  eligibility: string[];
  sectors: string[];
  region: string;
  description: string;
  link: string;
}

// Administrative Steps
export interface AdminStep {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'completed';
  documents: string[];
  links: { label: string; url: string }[];
  estimatedDuration: string;
  order: number;
}

// Resources
export interface Resource {
  id: string;
  title: string;
  type: 'article' | 'template' | 'video' | 'guide';
  category: string;
  description: string;
  downloadUrl?: string;
  externalUrl?: string;
  tags: string[];
}

// FAQ
export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

// Testimonials
export interface Testimonial {
  id: string;
  name: string;
  company: string;
  sector: string;
  quote: string;
  image?: string;
  rating: number;
}
