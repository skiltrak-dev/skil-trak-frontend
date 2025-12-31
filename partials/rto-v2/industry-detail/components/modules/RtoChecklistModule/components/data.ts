import { ChecklistItem } from './types';

export const checklistItems: ChecklistItem[] = [
  {
    id: '1',
    title: 'Public Liability Insurance',
    category: 'Insurance & Compliance',
    status: 'completed',
    dueDate: '2024-12-15',
    description: 'Current certificate of currency uploaded'
  },
  {
    id: '2',
    title: 'Workers Compensation',
    category: 'Insurance & Compliance',
    status: 'completed',
    dueDate: '2024-12-20',
    description: 'Active policy confirmation'
  },
  {
    id: '3',
    title: 'Supervisor Qualifications',
    category: 'Workplace Requirements',
    status: 'pending',
    dueDate: '2024-12-25',
    description: 'Verification of supervisor credentials'
  },
  {
    id: '4',
    title: 'Safety Induction Materials',
    category: 'Workplace Requirements',
    status: 'completed',
    description: 'Workplace safety procedures documented'
  },
  {
    id: '5',
    title: 'Placement Agreement',
    category: 'Documentation',
    status: 'required',
    dueDate: '2024-12-18',
    description: 'Signed placement agreement required'
  },
  {
    id: '6',
    title: 'Student Assessment Forms',
    category: 'Documentation',
    status: 'pending',
    dueDate: '2024-12-30',
    description: 'Templates for student evaluation'
  }
];
