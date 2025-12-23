# CoursesModule Component Map

## 📦 Main Module
**File:** `/components/modules/CoursesModule.tsx`
- Main orchestrator component
- Manages all state (expanded items, editing dialogs, data)
- Renders header and sector cards
- Controls modal dialogs

---

## 🎯 Data & Types

### `/components/courses/types.ts`
Defines TypeScript interfaces:
- `PlacementWorkflow` - Course placement progress
- `HighlightedTask` - Task confirmation tracking
- `Course` - Course details and metadata
- `Supervisor` - Supervisor information
- `ESignature` - E-signature workflow status
- `Sector` - Sector container with courses and supervisors

### `/components/courses/data.ts`
Contains all dummy data:
- 3 Sectors (Health, Hospitality, Technology)
- 4 Courses total
- 5 Supervisors total
- E-signature data for 2 sectors

---

## 📋 Header Components

### 1. `CoursesHeaderSection` (Container)
**Path:** `/components/courses/header/CoursesHeaderSection.tsx`
**Purpose:** Main header wrapper with gradient background
**Children:**
- HeaderTitle
- HeaderActions
- CoursesSearchBar
- CoursesStatisticsGrid

### 2. `HeaderTitle`
**Path:** `/components/courses/header/HeaderTitle.tsx`
**Purpose:** Display icon, title, and subtitle

### 3. `HeaderActions`
**Path:** `/components/courses/header/HeaderActions.tsx`
**Purpose:** Search toggle and Notes buttons

### 4. `CoursesSearchBar`
**Path:** `/components/courses/CoursesSearchBar.tsx`
**Purpose:** Animated search input field

### 5. `CoursesStatisticsGrid`
**Path:** `/components/courses/header/CoursesStatisticsGrid.tsx`
**Purpose:** 2x2 grid of statistics
**Children:** 4x StatisticCard

### 6. `StatisticCard`
**Path:** `/components/courses/header/StatisticCard.tsx`
**Purpose:** Individual statistic display
**Shows:** Icon, value, label, trend indicator

---

## 🏢 Sector Components

### `SectorCard`
**Path:** `/components/courses/SectorCard.tsx`
**Purpose:** Complete sector display with collapsible content
**Contains:**
- SectorHeader (from `/components/modules/SectorHeader.tsx`)
- ESignatureTimeline (conditional)
- SupervisorsSection
- CoursesSection

---

## ✍️ E-Signature Component

### `ESignatureTimeline`
**Path:** `/components/courses/ESignatureTimeline.tsx`
**Purpose:** Display signature workflow
**Shows:**
- Sent status (date, person)
- Signed status (date, person)
- Approved status (date, person, document link)

---

## 👥 Supervisor Components

### 1. `SupervisorsSection` (Container)
**Path:** `/components/courses/SupervisorsSection.tsx`
**Purpose:** Section header with "Add Supervisor" button
**Children:** Multiple SupervisorCard

### 2. `SupervisorCard`
**Path:** `/components/courses/SupervisorCard.tsx`
**Purpose:** Individual supervisor display
**Shows:**
- Avatar with initials
- Name, role, experience badge
- Qualifications card
- Description
- Contact information (phone, email)
- Edit button (on hover)

---

## 📚 Course Components

### 1. `CoursesSection` (Container)
**Path:** `/components/courses/CoursesSection.tsx`
**Purpose:** Section header with "Add Course" button
**Children:** Multiple CourseCard

### 2. `CourseCard` (Container)
**Path:** `/components/courses/CourseCard.tsx`
**Purpose:** Complete course with collapsible details
**Children:**
- CourseHeader (always visible)
- CourseDetails (collapsible)

### 3. `CourseHeader`
**Path:** `/components/courses/CourseHeader.tsx`
**Purpose:** Course summary and controls
**Shows:**
- Course code badge
- Status badge
- Rating (if available)
- Course hours badge
- Course name
- Programs list
- Streams tags
- Facility checklist controls (approve/reject)
- More options button
- Expand/collapse button

### 4. `CourseDetails` (Container)
**Path:** `/components/courses/CourseDetails.tsx`
**Purpose:** Organizes course detail sections
**Children:**
- HighlightedTasks (if tasks exist)
- CourseProgramsServices
- CourseAgentNote
- CourseMetadata
- CourseActionButtons

### 5. `HighlightedTasks`
**Path:** `/components/courses/HighlightedTasks.tsx`
**Purpose:** Display and manage task confirmations
**Shows:**
- Golden header with "Highlighted Tasks" title
- List of tasks requiring confirmation
- Confirmation method options (Industry Email, Sourcing Team, Workplace)
- Confirmed tasks with confirmation details
- Toast notification on confirmation
**Features:**
- Expandable task items
- Multiple confirmation methods
- Visual confirmation status (checkmark icon)
- Confirmed by and date display
- Smooth animations

### 6. `CourseProgramsServices`
**Path:** `/components/courses/CourseProgramsServices.tsx`
**Purpose:** Detailed course information
**Shows:**
- Programs and services description
- Branches and locations
- Activities list (with checkmarks)
- Eligibility notes

### 7. `CourseAgentNote`
**Path:** `/components/courses/CourseAgentNote.tsx`
**Purpose:** SkilTrak agent note highlight
**Shows:** Special highlighted note with Sparkles icon

### 8. `CourseMetadata`
**Path:** `/components/courses/CourseMetadata.tsx`
**Purpose:** Course metadata information
**Shows:**
- Requested by person
- Reference URL (clickable)

### 9. `CourseActionButtons`
**Path:** `/components/courses/CourseActionButtons.tsx`
**Purpose:** Action buttons row
**Shows:** Configure, Students, Docs buttons

---

## 🔧 Modal Components

### 1. `EditSectorMetricsDialog`
**Path:** `/components/courses/modals/EditSectorMetricsDialog.tsx`
**Purpose:** Edit sector-wide metrics
**Features:**
- Students input field
- Capacity input field
- Duration input field
- Live capacity preview bar
- Save/Cancel buttons
**Effect:** Proportionally updates all courses in sector

### 2. `EditCourseCapacityDialog`
**Path:** `/components/courses/modals/EditCourseCapacityDialog.tsx`
**Purpose:** Edit individual course capacity
**Features:**
- Current students input
- Maximum capacity input
- Live capacity preview bar
- Available spots calculation
- Save/Cancel buttons
**Effect:** Updates only selected course

---

## 🔄 State Flow

### Main State (in CoursesModule):
- `expandedSectors` - Which sectors are expanded
- `expandedCourses` - Which courses are expanded
- `expandedESignatures` - Which e-signature timelines are shown
- `coursesData` - All sector/course/supervisor data
- `searchQuery` - Search input value
- `showSearch` - Search bar visibility
- `editingSector` - Currently editing sector (for modal)
- `editingCourse` - Currently editing course (for modal)

### Event Handlers:
- `toggleSector()` - Expand/collapse sector
- `toggleCourse()` - Expand/collapse course
- `toggleESignature()` - Show/hide e-signature timeline
- `startEditingSectorMetrics()` - Open sector edit dialog
- `saveSectorMetrics()` - Save sector changes
- `startEditingCourseCapacity()` - Open course edit dialog
- `saveCourseCapacity()` - Save course changes
- `updateFacilityChecklistStatus()` - Update facility checklist status
- `confirmTask()` - Confirm a highlighted task via industry/sourcing/direct method

---

## 🎨 Design System

### Colors:
- **Primary:** `#044866`, `#0D5468`
- **Secondary:** `#F7A619`
- **Success:** `#10B981`
- **Error:** `#DC2626`
- **Text:** `#1A2332` (dark), `#64748B` (muted)
- **Background:** `#F8FAFB`, `#E8F4F8`
- **Border:** `#E2E8F0`

### Animations:
- **Motion library:** All animations use `motion/react`
- **Hover effects:** Scale, translate-y, shadow changes
- **Collapsible:** Height animations
- **Transitions:** 300-500ms duration

---

## 📦 Component Reusability

All components are designed to be reusable:

```tsx
// Use statistics card anywhere
import { StatisticCard } from '@/components/courses';

<StatisticCard
  icon={BookOpen}
  iconBgColor="from-[#E8F4F8] to-[#D1E7F0]"
  trendIcon={TrendingUp}
  trendColor="text-[#10B981]"
  value={42}
  label="Total Items"
/>
```

```tsx
// Use supervisor card independently
import { SupervisorCard } from '@/components/courses';

<SupervisorCard 
  supervisor={supervisorData} 
  index={0} 
/>
```

```tsx
// Use modals anywhere
import { EditSectorMetricsDialog } from '@/components/courses';

<EditSectorMetricsDialog
  open={isOpen}
  sector={currentSector}
  onOpenChange={setIsOpen}
  onSave={handleSave}
/>
```

---

## 📊 Statistics Calculation

Calculated in `CoursesModule`:
- `totalCourses` - Sum of courses across all sectors
- `totalStudents` - Sum of students across all courses
- `totalCapacity` - Sum of capacity across all courses
- `overallCapacity` - Percentage (students / capacity * 100)

---

## ✨ Key Features

1. **Exact Design Match** - All original styling preserved
2. **Fully Modular** - 30+ separate component files
3. **Type-Safe** - Complete TypeScript coverage
4. **Modal Dialogs** - Professional editing experience
5. **Animations** - Smooth transitions and interactions
6. **Responsive** - Works on all screen sizes
7. **Maintainable** - Easy to update individual sections
8. **Documented** - Complete README and component map