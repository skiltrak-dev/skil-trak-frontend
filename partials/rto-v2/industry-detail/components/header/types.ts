export interface BadgeState {
  verified: boolean;
  premium: boolean;
  topRated: boolean;
}

export interface IndustryStatus {
  hiring: boolean;
  partner: boolean;
  nonPartner: boolean;
  snoozed: boolean;
  blocked: boolean;
  noCapacity: boolean;
}

export interface BranchLocation {
  name: string;
  address: string;
  status: 'Primary' | 'Active';
  students: number;
}
