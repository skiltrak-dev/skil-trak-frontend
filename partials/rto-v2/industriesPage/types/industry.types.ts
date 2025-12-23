// Types for Industries feature
export interface SectorCapacity {
  sector: string;
  current: number;
  total: number;
  percentage: number;
}

export interface ActivityLogEntry {
  date: string;
  user: string;
  action: string;
}

export interface Industry {
  id: string;
  name: string;
  location: string;
  sector: string;
  status: string; // "listed_not_signed_up" | "signed_up_non_partner" | "partner" | "active" | "pending_setup" | "pending_verification"
  placementsActive: number;
  placementsTotal: number;
  complianceScore: number;
  lastInteraction: string;
  contactPerson?: string;
  contactEmail?: string;
  contactPhone?: string;
  abn?: string;
  dateSignedUp?: string;
  workplaceType?: string;
  notes: string[];
  activityLog: ActivityLogEntry[];
  isFavourite?: boolean;
  sectorCapacities?: SectorCapacity[];
  addedBy?: string;
  addedDate?: string;
  lastContact?: string;
  placementReady?: boolean;
  whsCompleted?: boolean;
  childSafetyCompleted?: boolean;
  supervisorVerified?: boolean;
  // New fields for the updated system
  isPartner?: boolean; // Partner Status (TRUE/FALSE)
  source?: string; // "Recruit Now (Industry Readiness Table)" | "Manual" | "Import" | etc.
  state?: string; // For assignment rules (NSW, VIC, QLD, etc.)
  primaryAgent?: string; // Primary Owner (required)
  backupAgent?: string; // Backup Agent (optional)
  assignmentDate?: string; // When the industry was assigned
  partnerReadinessChecklist?: PartnerReadinessChecklistData; // Partner Readiness Checklist
  courseStreams?: string[]; // Selected course streams for this industry
}

export interface PartnerReadinessChecklistData {
  contactVerified: boolean;
  placementCapacityConfirmed: boolean;
  complianceDocuments: boolean;
  placementRolesConfirmed: boolean;
  availabilityWindowsSet: boolean;
  coursesApproved: boolean;
  automationEligibility: boolean;
}

export type NetworkType = 'private' | 'shared' | null;
export type SharedNetworkRadius = '50km' | 'australia-wide' | null;
export type TabValue = "listed-not-signed-up" | "industry-readiness" | "your-industries" | "pending" | "shared-network" | "archived";

export interface IndustryStats {
  total: number;
  ready: number;
  pending: number;
  archived: number;
  totalPlacements: number;
  capacity: number;
  listedNotSignedUp: number;
  industryReadiness: number;
  partners: number;
}
