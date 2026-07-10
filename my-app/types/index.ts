export type UserRole = "consumer" | "company" | "validator";

export type ProductStatus = "draft" | "pending" | "more_evidence_required" | "approved" | "rejected";

export interface Evidence {
  id: string;
  type: string;
  title: string;
  sourceUrl?: string;
  filename?: string;
  verified?: boolean;
}

export interface ScoreBreakdown {
  lifespan: number;
  warranty: number;
  repairability: number;
  replacementParts: number;
  materials: number;
  sustainability: number;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  company?: string;
  category: string;
  description: string;
  price?: number;
  imageUrls: string[];
  visual: string;
  visualTone: string;
  officialUrl: string;
  expectedLifespanYears?: number;
  warrantyYears?: number;
  warrantyUrl?: string;
  repairPolicyUrl?: string;
  repairAvailable: boolean;
  replacementPartsAvailable: boolean;
  materials: string[];
  certifications: string[];
  longevityScore?: number;
  repairabilityScore?: number;
  sustainabilityScore?: number;
  evidenceConfidence?: "Low" | "Medium" | "High";
  scoreBreakdown?: ScoreBreakdown;
  evidence: Evidence[];
  status: ProductStatus;
  submittedAt?: string;
  statusReason?: string;
}

export type SubmissionFormData = {
  brand: string;
  name: string;
  category: string;
  description: string;
  officialUrl: string;
  price: string;
  lifespan: string;
  warranty: string;
  warrantyUrl: string;
  repairPolicyUrl: string;
  repairAvailable: boolean;
  replacementPartsAvailable: boolean;
  materials: string;
  certifications: string;
  claims: string;
  imageFilename: string;
  evidenceFilename: string;
  evidenceType: string;
  evidenceUrl: string;
};
