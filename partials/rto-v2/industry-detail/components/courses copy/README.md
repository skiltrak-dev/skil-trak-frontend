# Courses Module Component Structure

## Overview
The CoursesModule has been refactored into a highly modular structure with separate components for each specific section, types/data files, and modal dialogs.

## Directory Structure

```
/components/courses/
├── index.ts                          # Central exports file
├── types.ts                          # TypeScript interfaces
├── data.ts                           # Dummy data
├── CoursesSearchBar.tsx             # Search functionality
│
├── header/                          # Header section components
│   ├── CoursesHeaderSection.tsx     # Main header container
│   ├── HeaderTitle.tsx              # Title and description
│   ├── HeaderActions.tsx            # Search and Notes buttons
│   ├── CoursesStatisticsGrid.tsx    # Statistics grid container
│   └── StatisticCard.tsx            # Individual statistic card
│
├── modals/                          # Modal dialogs
│   ├── EditSectorMetricsDialog.tsx  # Edit sector metrics modal
│   └── EditCourseCapacityDialog.tsx # Edit course capacity modal
│
├── ESignatureTimeline.tsx           # E-signature workflow timeline
│
├── SupervisorCard.tsx               # Individual supervisor card
├── SupervisorsSection.tsx           # Supervisors section container
│
├── CourseHeader.tsx                 # Course header with badges
├── CourseProgramsServices.tsx       # Programs/services details
├── CourseAgentNote.tsx              # SkilTrak agent note
├── CourseMetadata.tsx               # Course metadata section
├── CourseActionButtons.tsx          # Action buttons
├── CourseDetails.tsx                # Course details container
├── CourseCard.tsx                   # Complete course card
├── CoursesSection.tsx               # Courses section container
│
└── SectorCard.tsx                   # Complete sector card
```

## Component Hierarchy

```
CoursesModule
├── CoursesHeaderSection
│   ├── HeaderTitle
│   ├── HeaderActions
│   ├── CoursesSearchBar
│   └── CoursesStatisticsGrid
│       └── StatisticCard (x4)
│
├── SectorCard (multiple)
│   ├── SectorHeader (from modules)
│   ├── ESignatureTimeline (conditional)
│   ├── SupervisorsSection
│   │   └── SupervisorCard (multiple)
│   └── CoursesSection
│       └── CourseCard (multiple)
│           ├── CourseHeader
│           └── CourseDetails
│               ├── CourseProgramsServices
│               ├── CourseAgentNote
│               ├── CourseMetadata
│               └── CourseActionButtons
│
├── EditSectorMetricsDialog
└── EditCourseCapacityDialog
```

## Data Structure

### Types (`types.ts`)
- `PlacementWorkflow` - Workflow progress tracking
- `Course` - Course information
- `Supervisor` - Supervisor details
- `ESignature` - E-signature status
- `Sector` - Sector container

### Data (`data.ts`)
- `sectors` - Array of sector objects with nested courses and supervisors

## Modal Components

### EditSectorMetricsDialog
- Edit students, capacity, and duration for entire sector
- Visual capacity preview bar
- Proportionally updates all courses in sector

### EditCourseCapacityDialog
- Edit students and capacity for individual course
- Visual capacity preview with available spots
- Updates only the selected course

## Key Features

✅ **Fully Modular** - Each section has its own component
✅ **Type-Safe** - Complete TypeScript interfaces
✅ **Separated Data** - All dummy data in one file
✅ **Modal Dialogs** - Professional editing dialogs with shadcn Dialog
✅ **Header Breakdown** - Header divided into 5 subcomponents
✅ **Clean Imports** - Central index.ts for easy imports
✅ **Exact Design** - All original styling preserved
✅ **Maintainable** - Easy to update individual sections

## Usage Example

```tsx
import { CoursesModule } from './components/modules/CoursesModule';

function App() {
  return <CoursesModule />;
}
```

## Importing Individual Components

```tsx
import { 
  StatisticCard,
  SupervisorCard,
  CourseCard,
  EditSectorMetricsDialog 
} from './components/courses';
```

## Benefits

1. **Easy Maintenance** - Update individual components without affecting others
2. **Reusability** - Components can be used in other parts of the application
3. **Testing** - Each component can be tested independently
4. **Scalability** - Easy to add new features to specific sections
5. **Clean Code** - Better organization and readability
6. **Type Safety** - All props and data structures are typed
