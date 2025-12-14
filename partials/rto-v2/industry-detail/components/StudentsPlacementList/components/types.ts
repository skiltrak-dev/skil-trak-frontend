export interface WorkflowStep {
  name: string;
  status: 'completed' | 'in-progress' | 'pending';
  date?: string;
}

export interface Student {
  id: string;
  name: string;
  course: string;
  company: string;
  progress: number;
  completedSteps: number;
  totalSteps: number;
  workflow: WorkflowStep[];
}

export const students: Student[] = [
  {
    id: '1',
    name: 'Sarah Mitchell',
    course: 'CHC33021 - Certificate III in Individual Support',
    company: 'TechCorp Healthcare',
    progress: 75,
    completedSteps: 6,
    totalSteps: 8,
    workflow: [
      { name: 'Student Added', status: 'completed', date: 'Sep 10, 2025' },
      { name: 'Request Generated', status: 'completed', date: 'Sep 10, 2025' },
      { name: 'RTO Approval', status: 'completed', date: 'Sep 10, 2025' },
      { name: 'Workplace Confirmed', status: 'completed', date: 'Sep 10, 2025' },
      { name: 'Agreement Signed', status: 'completed', date: 'Sep 10, 2025' },
      { name: 'Orientation Scheduled', status: 'completed', date: 'Sep 10, 2025' },
      { name: 'Complete Orientation', status: 'in-progress', date: undefined },
      { name: 'Begin Placement Hours', status: 'pending', date: undefined }
    ]
  },
  {
    id: '2',
    name: 'James Rodriguez',
    course: 'SIT30821 - Certificate III in Commercial Cookery',
    company: 'Gourmet Bistro Sydney',
    progress: 50,
    completedSteps: 4,
    totalSteps: 8,
    workflow: [
      { name: 'Student Added', status: 'completed', date: 'Sep 15, 2025' },
      { name: 'Request Generated', status: 'completed', date: 'Sep 15, 2025' },
      { name: 'RTO Approval', status: 'completed', date: 'Sep 16, 2025' },
      { name: 'Workplace Confirmed', status: 'completed', date: 'Sep 17, 2025' },
      { name: 'Agreement Signed', status: 'in-progress', date: undefined },
      { name: 'Orientation Scheduled', status: 'pending', date: undefined },
      { name: 'Complete Orientation', status: 'pending', date: undefined },
      { name: 'Begin Placement Hours', status: 'pending', date: undefined }
    ]
  },
  {
    id: '3',
    name: 'Emily Chen',
    course: 'ICT50220 - Diploma of Information Technology',
    company: 'TechCorp Healthcare',
    progress: 87.5,
    completedSteps: 7,
    totalSteps: 8,
    workflow: [
      { name: 'Student Added', status: 'completed', date: 'Aug 28, 2025' },
      { name: 'Request Generated', status: 'completed', date: 'Aug 28, 2025' },
      { name: 'RTO Approval', status: 'completed', date: 'Aug 29, 2025' },
      { name: 'Workplace Confirmed', status: 'completed', date: 'Aug 30, 2025' },
      { name: 'Agreement Signed', status: 'completed', date: 'Sep 1, 2025' },
      { name: 'Orientation Scheduled', status: 'completed', date: 'Sep 3, 2025' },
      { name: 'Complete Orientation', status: 'completed', date: 'Sep 5, 2025' },
      { name: 'Begin Placement Hours', status: 'in-progress', date: undefined }
    ]
  },
  {
    id: '4',
    name: 'Michael Thompson',
    course: 'BSB50120 - Diploma of Business',
    company: 'TechCorp Healthcare',
    progress: 37.5,
    completedSteps: 3,
    totalSteps: 8,
    workflow: [
      { name: 'Student Added', status: 'completed', date: 'Sep 20, 2025' },
      { name: 'Request Generated', status: 'completed', date: 'Sep 20, 2025' },
      { name: 'RTO Approval', status: 'completed', date: 'Sep 21, 2025' },
      { name: 'Workplace Confirmed', status: 'in-progress', date: undefined },
      { name: 'Agreement Signed', status: 'pending', date: undefined },
      { name: 'Orientation Scheduled', status: 'pending', date: undefined },
      { name: 'Complete Orientation', status: 'pending', date: undefined },
      { name: 'Begin Placement Hours', status: 'pending', date: undefined }
    ]
  }
];
