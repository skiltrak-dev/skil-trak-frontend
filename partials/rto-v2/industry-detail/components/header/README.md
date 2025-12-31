# Header Component Structure

## Overview
The Header component has been refactored into a highly modular structure with separate components for each section, types/data files, and modal dialogs following the same pattern as the CoursesModule.

## Directory Structure

```
/components/header/
├── index.ts                          # Central exports file
├── types.ts                          # TypeScript interfaces
├── data.ts                           # Dummy data
│
├── StatusBanner.tsx                  # Premium status banner with progress
├── CompanyAvatar.tsx                 # Company logo avatar
├── CompanyBadges.tsx                 # Badge pills (Verified, Premium, Top Rated)
├── CompanyInfo.tsx                   # Company info container
├── ActionButtons.tsx                 # All action buttons row
├── StatusControls.tsx                # Industry status controls (Hiring, Partner, etc.)
│
├── dropdowns/                        # Dropdown menu components
│   ├── AddMenuDropdown.tsx           # Quick Add menu
│   └── MoreMenuDropdown.tsx          # More options menu
│
└── modals/                           # Modal dialog components
    ├── BranchLocationsDialog.tsx     # Branch locations modal
    ├── EmailVerificationDialog.tsx   # Email verification modal
    ├── SnoozedDatePickerDialog.tsx   # Snoozed date picker
    └── CapacityDatePickerDialog.tsx  # No capacity date picker
```

## Component Hierarchy

```
Header (HeaderRefactored.tsx)
├── StatusBanner
│   ├── Status icon (Ban, XCircle, Clock, Checkmark, Sparkles)
│   ├── Status text
│   └── Progress ring (conditional)
│
├── CompanyInfo
│   ├── CompanyAvatar
│   │   ├── Building icon
│   │   └── Verification checkmark
│   │
│   ├── Company name + trending icon
│   ├── CompanyBadges
│   │   ├── Verified badge (conditional)
│   │   ├── Premium badge (conditional)
│   │   └── Top Rated badge (conditional)
│   │
│   └── Location info
│
├── ActionButtons
│   ├── Email Verification button
│   ├── Edit Profile button
│   ├── Contact & Bio button
│   ├── Branch Locations button
│   ├── Upload button
│   ├── Add button → AddMenuDropdown
│   │   ├── Add Student
│   │   ├── Add Supervisor
│   │   └── Add Document
│   │
│   ├── Courses button
│   ├── Blocked button
│   └── More menu button → MoreMenuDropdown
│       ├── Security section
│       │   ├── Edit Password
│       │   ├── Send Password
│       │   └── View Password
│       │
│       └── Management section
│           ├── Placement Status
│           ├── View Visitors
│           ├── Add RPL
│           └── Industry Gallery
│
├── StatusControls
│   ├── Hiring (Switch toggle)
│   ├── Partner (Switch toggle)
│   ├── Snoozed (Button with date display)
│   └── No Capacity (Button with date display)
│
├── BranchLocationsDialog
│   ├── Summary statistics
│   ├── Branch list
│   │   └── Branch cards (multiple)
│   │       ├── Branch info
│   │       ├── View Details button
│   │       └── Edit Location button
│   │
│   └── Add New Branch button
│
├── EmailVerificationDialog
│   ├── Email display
│   ├── Verification code input
│   ├── Verify button
│   ├── Resend button
│   └── Success state (conditional)
│
├── SnoozedDatePickerDialog
│   ├── Start date input
│   ├── End date input
│   └── Set Dates button
│
└── CapacityDatePickerDialog
    ├── Information box
    ├── Available date input
    ├── Set No Capacity button
    └── Cancel button
```

## Data Structure

### Types (`types.ts`)
- `BadgeState` - Badge visibility state
- `IndustryStatus` - Industry status flags
- `BranchLocation` - Branch location information

### Data (`data.ts`)
- `branchLocations` - Array of branch location objects
- `industryEmail` - Contact email
- `companyName` - Company name
- `companyLocation` - Company location string

## Component Details

### StatusBanner
**Purpose:** Display placement readiness status with animated gradient background
**Features:**
- Dynamic background color based on status (Ready, Blocked, No Capacity, Snoozed)
- Animated shimmer effect
- Circular progress ring (when not in special states)
- Status-specific icons and messages

### CompanyInfo
**Purpose:** Display company information and branding
**Features:**
- Animated avatar with verification badge
- Toggleable company badges
- Location information

### ActionButtons
**Purpose:** Primary action buttons for header interactions
**Features:**
- Email verification button (changes state when verified)
- Profile editing buttons
- Branch locations with count badge
- Add menu with dropdown
- More menu with dropdown
- Blocked status toggle

### StatusControls
**Purpose:** Industry status toggles and controls
**Features:**
- Hiring toggle (Switch component)
- Partner toggle (Switch component)
- Snoozed button (opens date picker)
- No Capacity button (opens date picker)
- Active state indicators
- Date display for active states

### Dropdowns
**AddMenuDropdown:**
- Quick add functionality
- Navigate to different tabs
- Student, Supervisor, Document options

**MoreMenuDropdown:**
- Security options (password management)
- Management options (placement, visitors, RPL, gallery)

### Modals
All modals use shadcn Dialog component with:
- Gradient header backgrounds
- Consistent styling
- Smooth animations
- Action buttons

## Key Features

✅ **Fully Modular** - Each section has its own component
✅ **Type-Safe** - Complete TypeScript interfaces
✅ **Separated Data** - All dummy data in one file
✅ **Modal Dialogs** - Professional shadcn/ui dialogs
✅ **Dropdown Menus** - Smooth animated dropdowns
✅ **State Management** - Centralized state in main Header
✅ **Exact Design** - All original styling preserved
✅ **Maintainable** - Easy to update individual sections

## Usage Example

### Using the Refactored Header

```tsx
import { HeaderRefactored } from './components/HeaderRefactored';

function App() {
  return <HeaderRefactored />;
}
```

### Using Individual Components

```tsx
import { 
  StatusBanner,
  CompanyBadges,
  BranchLocationsDialog 
} from './components/header';

// Use StatusBanner independently
<StatusBanner
  industryStatus={status}
  profileCompletion={85}
  isPlacementReady={true}
  snoozedStartDate=""
  snoozedEndDate=""
  capacityAvailableDate=""
/>

// Use badges independently
<CompanyBadges
  badges={badgeState}
  onToggleBadge={handleToggle}
/>
```

## State Management

### Main State (in HeaderRefactored):
- `showMenu` - More menu visibility
- `showBranchLocations` - Branch locations modal
- `showContactBioModal` - Contact bio modal
- `showEditProfileModal` - Edit profile modal
- `showAddMenu` - Add menu dropdown
- `emailVerified` - Email verification status
- `showEmailVerificationModal` - Email verification modal
- `showSnoozedDatePicker` - Snoozed date picker modal
- `snoozedStartDate` - Snooze start date
- `snoozedEndDate` - Snooze end date
- `showCapacityDatePicker` - Capacity date picker modal
- `capacityAvailableDate` - Capacity available date
- `profileCompletion` - Profile completion percentage
- `badges` - Badge visibility state
- `industryStatus` - Industry status flags

### Event Handlers:
- `toggleStatus()` - Toggle industry status flags
- `toggleBadge()` - Toggle badge visibility
- `handleSnoozedClick()` - Handle snoozed button click
- `handleSnoozedConfirm()` - Confirm snooze dates
- `handleCapacityConfirm()` - Confirm capacity date

## Benefits

1. **Easy Maintenance** - Update individual components without affecting others
2. **Reusability** - Components can be used in other parts of the application
3. **Testing** - Each component can be tested independently
4. **Scalability** - Easy to add new features to specific sections
5. **Clean Code** - Better organization and readability
6. **Type Safety** - All props and data structures are typed
7. **Consistency** - Follows the same pattern as CoursesModule

## File Count

📊 **Total Files Created: 20+**

- Core Files: 3 (index.ts, types.ts, data.ts)
- Section Components: 6 (StatusBanner, CompanyInfo, CompanyAvatar, CompanyBadges, ActionButtons, StatusControls)
- Dropdown Components: 2 (AddMenuDropdown, MoreMenuDropdown)
- Modal Components: 4 (BranchLocations, EmailVerification, SnoozedDatePicker, CapacityDatePicker)
- Main Component: 1 (HeaderRefactored.tsx)
- Documentation: 2 (README.md, plus this file)

## Design System

### Colors:
- **Primary:** `#044866`, `#0D5468`
- **Secondary:** `#F7A619`
- **Success:** `#10B981`
- **Error:** `#EF4444`, `#DC2626`
- **Warning:** `#F7A619`, `#EA580C`
- **Purple:** `#8B5CF6`, `#7C3AED`
- **Text:** `#1A2332` (dark), `#64748B` (muted)
- **Background:** `#F8FAFB`, `#E8F4F8`
- **Border:** `#E2E8F0`

### Animations:
- **Gradient shimmer** on status banner
- **Hover effects** on buttons and cards
- **Scale animations** on button clicks
- **Fade-in animations** on dropdowns and modals
- **Smooth transitions** throughout

## Migration Note

The original `Header.tsx` remains unchanged. The new `HeaderRefactored.tsx` is a complete refactored version with the exact same functionality but better structure. To use the refactored version:

1. Replace `<Header />` with `<HeaderRefactored />`
2. All functionality remains identical
3. All styling is preserved
4. All interactions work the same way
