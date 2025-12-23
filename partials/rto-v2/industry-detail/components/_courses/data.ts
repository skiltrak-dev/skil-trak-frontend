import { Sector } from './types';

export const sectors: Sector[] = [
  {
    id: 1,
    name: 'Health & Community Services',
    icon: '🏥',
    color: 'from-[#044866] to-[#0D5468]',
    eSignature: {
      status: 'approved',
      sentDate: '2024-11-15',
      sentBy: 'Jessica Williams - Program Coordinator',
      signedDate: '2024-11-18',
      signedBy: 'Sarah Mitchell - Clinical Manager',
      approvedDate: '2024-11-20',
      approvedBy: 'Dr. Robert Chen - Head of Department',
      documentUrl: '/documents/facility-checklist-health-services.pdf'
    },
    supervisors: [
      { 
        name: 'Sarah Johnson', 
        title: 'Registered Nurse, Bachelor of Nursing',
        role: 'Senior Manager',
        experience: 12,
        description: 'Specialized in aged care and disability support with extensive experience in student mentoring and clinical supervision.',
        phone: '+61 2 9876 5432', 
        email: 'sarah.j@techcorp.com.au' 
      },
      { 
        name: 'Michael Chen', 
        title: 'Certificate IV in Training and Assessment',
        role: 'Clinical Supervisor',
        experience: 8,
        description: 'Expert in disability services and community care programs. Passionate about developing future healthcare professionals.',
        phone: '+61 2 9876 5433', 
        email: 'michael.c@techcorp.com.au' 
      }
    ],
    courses: [
      {
        id: 1,
        code: 'CHC33021',
        name: 'Certificate III in Individual Support',
        programs: ['Ageing', 'Disability', 'Home and Community'],
        deliveryModes: ['Face-to-face', 'Blended', 'Online'],
        status: 'Active',
        students: 45,
        capacity: 60,
        duration: '12 months',
        rating: 4.8,
        courseHours: 520,
        streams: ['Ageing Support', 'Disability Support', 'Home & Community Care'],
        placementWorkflow: {
          currentStep: 4,
          totalSteps: 8,
          status: 'In Progress',
          completedSteps: 4,
          remainingSteps: 3,
          placementSchedule: 65
        },
        programsAndServices: 'Based on publicly available information and a signed facility checklist, TechCorp Healthcare provides comprehensive aged care and disability support services. The organization offers a range of services including: Standard care programs aligned with NDIS guidelines and aged care quality standards. Specialist services such as physiotherapy, occupational therapy, and recreational activities. Support programs for clients with diverse care needs including dementia care and complex care requirements.',
        branchesAndLocations: 'TechCorp Healthcare operates from a single primary location in Sydney, NSW with satellite service delivery across the Greater Sydney metropolitan area.',
        activities: [
          'Assisting care coordinators in the delivery of person-centered support plans',
          'Working with individual clients on daily living activities and personal care',
          'Supporting the preparation of care resources and activity programs',
          'Contributing to the health, safety, and wellbeing of clients',
          'Assisting clients with additional needs within community and residential settings'
        ],
        eligibilityNotes: 'The workplace is approved. TechCorp Healthcare\'s core business as an aged care and disability support provider directly aligns with the vocational outcomes of the CHC33021 qualification. The industry has signed the facility checklist, confirming the environment is a suitable setting for a student to engage in a range of support tasks and demonstrate the required competencies for the Certificate III level.',
        agentNote: 'Outstanding placement partner - verified for comprehensive student support with excellent mentoring framework and proven track record',
        requestedBy: 'Sarah Mitchell - Clinical Manager',
        referenceUrl: 'https://techcorphealthcare.com.au',
        facilityChecklistStatus: 'pending',
        highlightedTasks: [
          {
            id: 1,
            description: 'Conduct initial patient assessments and vital signs monitoring',
            confirmationMethod: 'direct',
            confirmed: false
          },
          {
            id: 2,
            description: 'Assist with personal care activities including bathing and dressing',
            confirmationMethod: 'industry',
            confirmed: false
          },
          {
            id: 3,
            description: 'Administer medications under supervision of registered nurse',
            confirmationMethod: 'sourcing',
            confirmed: false
          },
          {
            id: 4,
            description: 'Document patient care activities in electronic health records',
            confirmationMethod: 'direct',
            confirmed: false
          },
          {
            id: 5,
            description: 'Participate in care planning meetings with multidisciplinary team',
            confirmationMethod: 'industry',
            confirmed: true,
            confirmedBy: 'Sarah Mitchell',
            confirmedAt: 'Nov 20, 2024'
          },
          {
            id: 6,
            description: 'Respond to emergency situations following facility protocols',
            confirmationMethod: 'direct',
            confirmed: false
          },
          {
            id: 7,
            description: 'Maintain infection control standards and hygiene practices',
            confirmationMethod: 'sourcing',
            confirmed: false
          }
        ]
      },
      {
        id: 2,
        code: 'CHC43121',
        name: 'Certificate IV in Disability',
        programs: ['Disability Support'],
        deliveryModes: ['Face-to-face', 'Blended'],
        status: 'Active',
        students: 28,
        capacity: 40,
        duration: '18 months',
        rating: 4.9,
        courseHours: 780,
        streams: ['Complex Care', 'Community Participation', 'Behavioural Support'],
        placementWorkflow: {
          currentStep: 6,
          totalSteps: 8,
          status: 'In Progress',
          completedSteps: 6,
          remainingSteps: 2,
          placementSchedule: 82
        },
        programsAndServices: 'TechCorp Healthcare specializes in disability support services registered with NDIS. The organization provides: Evidence-based support programs for clients with complex disabilities. Specialist services including behavior support, therapy assistance, and community access programs. Comprehensive support for participants across all disability types and age groups.',
        branchesAndLocations: 'Operating from Sydney headquarters with outreach services to Western Sydney, Northern Beaches, and Sutherland Shire regions.',
        activities: [
          'Implementing individualized support plans under supervision',
          'Facilitating community participation and social inclusion activities',
          'Supporting clients with complex care needs and behaviors of concern',
          'Coordinating with allied health professionals and support teams',
          'Maintaining documentation and reporting in compliance with NDIS standards'
        ],
        eligibilityNotes: 'The workplace is approved. TechCorp Healthcare demonstrates extensive experience in disability support service delivery aligned with CHC43121 vocational outcomes. The signed facility checklist confirms appropriate supervision structures and diverse client base suitable for Certificate IV competency development.',
        agentNote: 'Exceptional facility with NDIS expertise - approved for advanced level placements with comprehensive supervision framework',
        requestedBy: 'David Chen - NDIS Coordinator',
        referenceUrl: 'https://techcorphealthcare.com.au/disability-services',
        facilityChecklistStatus: 'approved'
      }
    ]
  },
  {
    id: 2,
    name: 'Hospitality & Tourism',
    icon: '👨‍🍳',
    color: 'from-[#F7A619] to-[#EA580C]',
    supervisors: [
      { 
        name: 'Emma Williams', 
        title: 'Trade Certificate III & IV in Commercial Cookery',
        role: 'Head Chef',
        experience: 15,
        description: 'Award-winning chef with international experience in fine dining and commercial kitchens. Committed to culinary education excellence.',
        phone: '+61 2 9876 5434', 
        email: 'emma.w@techcorp.com.au' 
      }
    ],
    courses: [
      {
        id: 3,
        code: 'SIT30821',
        name: 'Certificate III in Commercial Cookery',
        programs: ['Commercial Cookery'],
        deliveryModes: ['Face-to-face'],
        status: 'Pending Setup',
        students: 12,
        capacity: 30,
        duration: '24 months',
        rating: 4.6,
        placementWorkflow: {
          currentStep: 2,
          totalSteps: 8,
          status: 'In Progress',
          completedSteps: 2,
          remainingSteps: 6,
          placementSchedule: 28
        }
      }
    ]
  },
  {
    id: 3,
    name: 'Technology & IT',
    icon: '💻',
    color: 'from-[#8B5CF6] to-[#7C3AED]',
    eSignature: {
      status: 'signed',
      sentDate: '2024-11-25',
      sentBy: 'Jessica Williams - Program Coordinator',
      signedDate: '2024-11-28',
      signedBy: 'James Anderson - IT Manager',
      approvedDate: null,
      approvedBy: null,
      documentUrl: '/documents/facility-checklist-technology-it.pdf'
    },
    supervisors: [
      { 
        name: 'James Anderson', 
        title: 'Bachelor of IT, Cisco Certified Network Professional',
        role: 'IT Manager',
        experience: 10,
        description: 'Senior systems architect with expertise in network infrastructure and cybersecurity. Dedicated to nurturing the next generation of IT professionals.',
        phone: '+61 2 9876 5435', 
        email: 'james.a@techcorp.com.au' 
      },
      { 
        name: 'Lisa Wong', 
        title: 'Master of Computer Science',
        role: 'Senior Developer',
        experience: 7,
        description: 'Full-stack developer specializing in cloud technologies and agile methodologies. Passionate about teaching modern software development practices.',
        phone: '+61 2 9876 5436', 
        email: 'lisa.w@techcorp.com.au' 
      }
    ],
    courses: [
      {
        id: 4,
        code: 'ICT30120',
        name: 'Certificate III in Information Technology',
        programs: ['Software Development', 'Network Administration'],
        deliveryModes: ['Face-to-face', 'Online', 'Blended'],
        status: 'Active',
        students: 35,
        capacity: 50,
        duration: '18 months',
        rating: 4.7,
        courseHours: 650,
        streams: ['Software Development', 'Network Infrastructure', 'Cybersecurity'],
        placementWorkflow: {
          currentStep: 5,
          totalSteps: 8,
          status: 'In Progress',
          completedSteps: 5,
          remainingSteps: 3,
          placementSchedule: 73
        },
        programsAndServices: 'TechCorp is a leading technology solutions provider specializing in enterprise software development, network infrastructure management, and cybersecurity services. The organization delivers: Custom software development and cloud solutions for enterprise clients. Network infrastructure design, implementation, and management services. Cybersecurity consultation, penetration testing, and security monitoring services.',
        branchesAndLocations: 'TechCorp operates from modern offices in Sydney CBD with additional tech hubs in Parramatta and North Sydney.',
        activities: [
          'Assisting development teams with software coding and testing under supervision',
          'Supporting network infrastructure projects and system administration tasks',
          'Contributing to cybersecurity assessments and security documentation',
          'Participating in agile development sprints and team collaboration',
          'Learning industry-standard tools, frameworks, and development methodologies'
        ],
        eligibilityNotes: 'The workplace is approved. TechCorp\'s core business in software development and IT infrastructure aligns perfectly with the ICT30120 qualification outcomes. The facility checklist confirms appropriate technical resources, qualified supervision, and diverse project opportunities suitable for Certificate III competency development.',
        agentNote: 'Premier technology partner - validated for cutting-edge training opportunities with industry-leading mentorship programs',
        requestedBy: 'James Anderson - IT Manager',
        referenceUrl: 'https://techcorp.com.au',
        facilityChecklistStatus: 'pending'
      }
    ]
  }
];