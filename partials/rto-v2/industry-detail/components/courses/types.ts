import { LucideIcon } from 'lucide-react';

export interface PlacementWorkflow {
  currentStep: number;
  totalSteps: number;
  status: string;
  completedSteps: number;
  remainingSteps: number;
  placementSchedule: number;
}

export interface Course {
  id: number;
  code: string;
  name: string;
  programs: string[];
  deliveryModes: string[];
  status: string;
  students: number;
  capacity: number;
  duration: string;
  rating?: number;
  courseHours?: number;
  streams?: string[];
  placementWorkflow?: PlacementWorkflow;
  programsAndServices?: string;
  branchesAndLocations?: string;
  activities?: string[];
  eligibilityNotes?: string;
  agentNote?: string;
  requestedBy?: string;
  referenceUrl?: string;
  facilityChecklistStatus?: 'pending' | 'approved' | 'rejected';
}

export interface Supervisor {
  name: string;
  title: string;
  role: string;
  experience: number;
  description: string;
  phone: string;
  email: string;
}

export interface ESignature {
  status: 'sent' | 'signed' | 'approved' | 'pending';
  sentDate: string;
  sentBy: string;
  signedDate: string | null;
  signedBy: string | null;
  approvedDate: string | null;
  approvedBy: string | null;
  documentUrl: string;
}

export interface Sector {
  id: number;
  name: string;
  icon: string;
  color: string;
  eSignature?: ESignature;
  supervisors: Supervisor[];
  courses: Course[];
}
