import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Building2,
    GraduationCap,
    FileText,
    CheckCircle2,
    Clock,
    AlertCircle,
    ArrowLeft,
    ArrowRight,
    Save,
    Users,
    Briefcase,
    MapPinned,
    RefreshCw,
    XCircle,
    Eye,
    Send,
    UserCheck,
    CalendarCheck,
    FileCheck,
    Play,
    CheckSquare,
    BookOpen,
    Upload,
    ThumbsUp,
    ThumbsDown,
    MessageSquare,
    FileSignature,
    ClipboardCheck,
    Archive,
    Download,
    ListChecks,
    Bell,
    Settings,
    ChevronRight,
    Sparkles,
    Shield,
    Target,
    Zap,
    TrendingUp,
    Award,
    Info,
    History,
    Plus,
    Flag,
    Pause,
    Ban,
    StopCircle,
} from 'lucide-react'
import { Card, Badge, Button, InitialAvatar, Typography } from '@components'
import { TextInput } from '@components/inputs/TextInput'
import { Select } from '@components/inputs/Select'
import { TextArea } from '@components/inputs/TextArea'
import { Checkbox } from '@components/inputs/Checkbox'
import { Checkbox as UICheckbox } from '@components/ui/checkbox'
import { LinearProgress } from '@components/LinearProgress/LinearProgress'
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from '@components/ui/accordion'
import { Separator } from '@components/ui/separator'
import { ScrollArea } from '@components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from '@components/ui/tooltip'
import { GlobalModal } from '@components/Modal/GlobalModal'
import { Table } from '@components/Table/Table'
import { TableAction } from '@components/Table/components/TableAction'
import { MdCancel } from 'react-icons/md'
import { FindWorkplaceSection } from './components/FindWorkplaceSection'
import { CleanHeader } from './components/CleanHeader'
import {
    AppointmentModal,
    AgreementModal,
    ScheduleModal,
    RejectionModal,
    StatusNotesModal,
    PlacementProgramsModal,
    CancelRequestModal,
    ManualNoteModal,
    QuickActionsModal,
    ProvidedWorkplaceModal,
    ProofUploadModal,
} from './modal'
import { FormProvider, useForm } from 'react-hook-form'
import { Progressbar } from '../components'

interface StatusNote {
    status: string
    note: string
    timestamp: string
    user: string
}

export const PlacementRequestDetail = () => {
    const [currentStatus, setCurrentStatus] = useState<string>('Student Added')
    const [workplaceType, setWorkplaceType] = useState<
        'needs' | 'provided' | null
    >(null)
    const [isWorkflowOpen, setIsWorkflowOpen] = useState(false)
    const [showAppointmentDialog, setShowAppointmentDialog] = useState(false)
    const [showAgreementDialog, setShowAgreementDialog] = useState(false)
    const [showScheduleDialog, setShowScheduleDialog] = useState(false)
    const [showRejectionDialog, setShowRejectionDialog] = useState(false)
    const [showStatusNotesDialog, setShowStatusNotesDialog] = useState(false)
    const [showPlacementReqDialog, setShowPlacementReqDialog] = useState(false)
    const [showFindWorkplaceSection, setShowFindWorkplaceSection] =
        useState(false)
    const [showProvidedWorkplaceDialog, setShowProvidedWorkplaceDialog] =
        useState(false)
    const [showProofUploadDialog, setShowProofUploadDialog] = useState(false)
    const [appointmentDate, setAppointmentDate] = useState('')
    const [rejectionReason, setRejectionReason] = useState('')
    const [selectedIndustry, setSelectedIndustry] = useState(
        "St Vincent's Hospital"
    )
    const [scheduleStartDate, setScheduleStartDate] = useState('')
    const [scheduleEndDate, setScheduleEndDate] = useState('')
    const [pendingStatus, setPendingStatus] = useState<string>('')
    const [statusNote, setStatusNote] = useState('')
    const [statusNotes, setStatusNotes] = useState<StatusNote[]>([
        {
            status: 'Student Added',
            note: 'Initial student profile created in the system',
            timestamp: '7 Nov 2025, 9:00 AM',
            user: 'Lena',
        },
    ])
    const [selectedRequirements, setSelectedRequirements] = useState<string[]>([
        'acute-care',
    ])
    const [showStudentDetails, setShowStudentDetails] = useState(false)
    const [verifiedPreferences, setVerifiedPreferences] = useState<number[]>([])
    const [recentlyVerified, setRecentlyVerified] = useState<number[]>([])
    const [abnSearch, setAbnSearch] = useState('')
    const [industryFound, setIndustryFound] = useState<boolean | null>(null)
    const [proofFile, setProofFile] = useState<File | null>(null)
    const [proofSkipped, setProofSkipped] = useState(false)

    // New Industry Form State
    const [newIndustryForm, setNewIndustryForm] = useState({
        industryName: '',
        abn: '',
        businessAddress: '',
        website: '',
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        offeredCourses: 'cert3-nursing',
        additionalInfo: '',
    })
    const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})
    const [isCancelled, setIsCancelled] = useState(false)
    const [isPlacementStarted, setIsPlacementStarted] = useState(false)
    const [showCancelDialog, setShowCancelDialog] = useState(false)
    const [cancellationReason, setCancellationReason] = useState('')
    const [confirmedTasks, setConfirmedTasks] = useState<{
        [key: number]: { date: string; person: string }
    }>({})
    const [confirmedRtoReqs, setConfirmedRtoReqs] = useState<{
        [key: number]: { date: string; person: string }
    }>({})

    // Manual Notes & Quick Actions
    const [manualNotes, setManualNotes] = useState<
        { note: string; timestamp: string; user: string }[]
    >([])
    const [newManualNote, setNewManualNote] = useState('')
    const [showManualNoteDialog, setShowManualNoteDialog] = useState(false)
    const [appointmentMissed, setAppointmentMissed] = useState(false)
    const [requestCreatedTime] = useState(new Date('2025-11-19T10:00:00')) // Simulated creation time
    const [showQuickActionsDialog, setShowQuickActionsDialog] = useState(false)
    const [selectedQuickAction, setSelectedQuickAction] = useState<string>('')
    const [quickActionReason, setQuickActionReason] = useState('')

    // Sticky scroll state
    const leftPanelRef = useRef<HTMLDivElement>(null)
    const rightPanelRef = useRef<HTMLDivElement>(null)
    const [leftPanelSticky, setLeftPanelSticky] = useState(false)
    const [rightPanelSticky, setRightPanelSticky] = useState(false)

    // Workflow for students who need a workplace
    const needsWorkplaceStages = [
        { id: 1, name: 'Student Added', icon: User, color: '#6b7280' },
        { id: 2, name: 'Request Generated', icon: FileText, color: '#044866' },
        { id: 3, name: 'Waiting for Student', icon: User, color: '#044866' },
        { id: 4, name: 'Waiting for RTO', icon: Clock, color: '#044866' },
        {
            id: 5,
            name: 'Waiting for Industry',
            icon: Building2,
            color: '#044866',
        },
        { id: 6, name: 'Appointment', icon: CalendarCheck, color: '#0D5468' },
        { id: 7, name: 'Agreement Pending', icon: FileText, color: '#0D5468' },
        { id: 8, name: 'Agreement Signed', icon: FileCheck, color: '#0D5468' },
        { id: 9, name: 'Placement Started', icon: Play, color: '#10b981' },
        {
            id: 10,
            name: 'Schedule Completed',
            icon: CheckSquare,
            color: '#10b981',
        },
        { id: 11, name: 'Completed', icon: CheckCircle2, color: '#059669' },
    ]

    // Workflow for students with provided workplace
    const providedWorkplaceStages = [
        { id: 1, name: 'Student Added', icon: User, color: '#6b7280' },
        {
            id: 2,
            name: 'Provided Workplace Request',
            icon: Briefcase,
            color: '#044866',
        },
        {
            id: 3,
            name: 'Industry Eligibility Pending',
            icon: Shield,
            color: '#044866',
        },
        {
            id: 4,
            name: 'Waiting for Industry',
            icon: Building2,
            color: '#044866',
        },
        {
            id: 5,
            name: 'Agreement and Eligibility Pending',
            icon: FileText,
            color: '#0D5468',
        },
        {
            id: 6,
            name: 'Agreement and Eligibility Signed',
            icon: FileCheck,
            color: '#0D5468',
        },
        { id: 7, name: 'Placement Started', icon: Play, color: '#10b981' },
        {
            id: 8,
            name: 'Schedule Completed',
            icon: CheckSquare,
            color: '#10b981',
        },
        { id: 9, name: 'Completed', icon: CheckCircle2, color: '#059669' },
    ]

    const workflowStages =
        workplaceType === 'provided'
            ? providedWorkplaceStages
            : needsWorkplaceStages

    const getCurrentStageIndex = () => {
        const stage = workflowStages.find((s) => s.name === currentStatus)
        return stage ? stage.id - 1 : 0
    }

    const complianceChecks = [
        {
            name: 'Police Check',
            status: 'verified',
            expiry: '12/31/2025',
            icon: CheckCircle2,
            color: 'text-emerald-600',
        },
        {
            name: 'NDIS Check',
            status: 'pending',
            expiry: 'Pending',
            icon: Clock,
            color: 'text-amber-600',
        },
        {
            name: 'Working with Children',
            status: 'verified',
            expiry: '10/12/2025',
            icon: CheckCircle2,
            color: 'text-emerald-600',
        },
    ]

    const placementRequirements = [
        { id: 'acute-care', category: 'Acute Care', completed: 28, total: 40 },
        {
            id: 'community',
            category: 'Community Health',
            completed: 15,
            total: 40,
        },
        { id: 'emergency', category: 'Emergency', completed: 0, total: 40 },
    ]

    const highlightedTasks = [
        'Conduct initial patient assessments and vital signs monitoring',
        'Assist with personal care activities including bathing and dressing',
        'Administer medications under supervision of registered nurse',
        'Document patient care activities in electronic health records',
        'Participate in care planning meetings with multidisciplinary team',
        'Respond to emergency situations following facility protocols',
        'Maintain infection control standards and hygiene practices',
        'Communicate effectively with patients, families, and healthcare team',
    ]

    const rtoExtraRequirements = [
        'Complete minimum 120 hours of supervised clinical practice',
        'Submit weekly reflection journals',
        'Obtain supervisor signature on competency assessment forms',
        'Attend mid-placement review meeting',
        'Complete incident reporting training module',
        'Provide evidence of current first aid certification',
    ]

    const studentPreferences = [
        {
            id: 1,
            question: 'Preferred workplace location?',
            answer: 'Within 15km of home (Melbourne CBD area)',
            category: 'Location & Accessibility',
        },
        {
            id: 2,
            question: 'Preferred commute method?',
            answer: 'Public Transport (Train/Tram)',
            category: 'Location & Accessibility',
        },
        {
            id: 3,
            question: 'Access to own transport?',
            answer: 'No, relies on public transport',
            category: 'Location & Accessibility',
        },
        {
            id: 4,
            question: 'Willing to work in regional areas?',
            answer: 'No, prefer metro Melbourne',
            category: 'Location & Accessibility',
        },
        {
            id: 5,
            question: 'Availability for placement?',
            answer: 'Monday to Friday, 8:00 AM - 4:00 PM',
            category: 'Schedule & Availability',
        },
        {
            id: 6,
            question: 'Preferred shift type?',
            answer: 'Day shifts (morning/afternoon)',
            category: 'Schedule & Availability',
        },
        {
            id: 7,
            question: 'Flexibility for weekend work?',
            answer: 'Available for occasional weekend shifts if needed',
            category: 'Schedule & Availability',
        },
        {
            id: 8,
            question: 'Current employment status?',
            answer: 'Part-time employed (evenings only)',
            category: 'Schedule & Availability',
        },
        {
            id: 9,
            question: 'Desired workplace type?',
            answer: 'Hospital - Aged Care Unit',
            category: 'Workplace Preferences',
        },
        {
            id: 10,
            question: 'Preferred facility size?',
            answer: 'Medium to large facility (50+ beds)',
            category: 'Workplace Preferences',
        },
        {
            id: 11,
            question: 'Special interests in aged care?',
            answer: 'Activities and recreation therapy',
            category: 'Workplace Preferences',
        },
        {
            id: 12,
            question: 'Any specific learning objectives?',
            answer: 'Gain experience in dementia care and palliative care',
            category: 'Learning & Development',
        },
        {
            id: 13,
            question: 'Previous healthcare experience?',
            answer: 'Yes, 6 months as healthcare assistant',
            category: 'Learning & Development',
        },
        {
            id: 14,
            question: 'Career goals post-qualification?',
            answer: 'Work in residential aged care facility',
            category: 'Learning & Development',
        },
        {
            id: 15,
            question: 'Technology proficiency level?',
            answer: 'Advanced - comfortable with electronic health records',
            category: 'Skills & Capabilities',
        },
        {
            id: 16,
            question: 'Language skills?',
            answer: 'English (Native), Mandarin (Conversational)',
            category: 'Skills & Capabilities',
        },
        {
            id: 17,
            question: 'Any medical conditions to consider?',
            answer: 'None',
            category: 'Health & Wellbeing',
        },
        {
            id: 18,
            question: 'Any allergies or dietary requirements?',
            answer: 'No allergies',
            category: 'Health & Wellbeing',
        },
        {
            id: 19,
            question: 'Cultural considerations?',
            answer: 'Respectful of diverse backgrounds, no restrictions',
            category: 'Additional Information',
        },
        {
            id: 20,
            question: 'Join Talent Pool for future opportunities?',
            answer: 'Yes, opted in',
            category: 'Additional Information',
        },
    ]

    const requestStatusChange = (newStatus: string) => {
        setPendingStatus(newStatus)
        setStatusNote('')
        setShowStatusNotesDialog(true)
    }

    const confirmStatusChange = () => {
        if (!statusNote.trim()) {
            // Please add a status check note before proceeding
            return
        }

        const now = new Date()
        const timestamp = now.toLocaleString('en-AU', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })

        const newNote: StatusNote = {
            status: pendingStatus,
            note: statusNote,
            timestamp: timestamp,
            user: 'Lena',
        }

        setStatusNotes([newNote, ...statusNotes])
        setCurrentStatus(pendingStatus)

        // Auto-verify preferences based on workflow stage
        autoVerifyPreferences(pendingStatus)

        setShowStatusNotesDialog(false)
        setStatusNote('')
        // Status updated to: ${pendingStatus}
    }

    const autoVerifyPreferences = (status: string) => {
        let prefsToVerify: number[] = []
        let message = ''

        switch (status) {
            case 'Request Generated':
                // Verify basic student information preferences
                prefsToVerify = [13, 17, 18, 19, 20] // Previous experience, medical, allergies, cultural, talent pool
                message = '5 basic preferences auto-verified'
                break

            case 'Waiting for RTO':
                // Industry matched - verify location and workplace preferences
                prefsToVerify = [1, 2, 3, 4, 9, 10] // Location, commute, transport, regional, workplace type, facility size
                message = '6 location & workplace preferences auto-verified'
                break

            case 'Waiting for Student':
                // Student reviewing - verify learning objectives
                prefsToVerify = [11, 12, 14] // Special interests, learning objectives, career goals
                message = '3 learning preferences auto-verified'
                break

            case 'Appointment':
                // Appointment booked - verify availability and schedule
                prefsToVerify = [5, 6, 7, 8] // Availability, shift type, weekend flexibility, employment status
                message = '4 schedule preferences auto-verified'
                break

            case 'Agreement Signed':
                // Agreement signed - verify skills and capabilities
                prefsToVerify = [15, 16] // Technology proficiency, language skills
                message = '2 skill preferences auto-verified'
                break

            case 'Placement Started':
                // All preferences should be verified by now
                prefsToVerify = [
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                    18, 19, 20,
                ]
                message = 'All preferences verified - placement active'
                break

            case 'Completed':
                // Ensure everything is verified
                prefsToVerify = [
                    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
                    18, 19, 20,
                ]
                message = 'All preferences confirmed - placement completed'
                break
        }

        if (prefsToVerify.length > 0) {
            setVerifiedPreferences((prev) => {
                const newPrefs = [...new Set([...prev, ...prefsToVerify])]
                const newlyAdded = prefsToVerify.filter(
                    (p) => !prev.includes(p)
                )

                if (newlyAdded.length > 0) {
                    // Track recently verified for animation
                    setRecentlyVerified(newlyAdded)

                    // Clear recently verified after animation
                    setTimeout(() => {
                        setRecentlyVerified([])
                    }, 3000)

                    // ${newlyAdded.length} new preference(s) matched with workplace
                }

                return newPrefs
            })
        }
    }

    const handleRunAutomation = () => {
        // Running automated industry matching...
        setTimeout(() => {
            requestStatusChange('Waiting for Student')
        }, 2000)
    }

    const handleFindManually = () => {
        setShowFindWorkplaceSection(!showFindWorkplaceSection)
    }

    const handleSelectWorkplaceType = (type: 'needs' | 'provided') => {
        setWorkplaceType(type)
        if (type === 'needs') {
            requestStatusChange('Request Generated')
        } else {
            // For provided workplace, move to the new status and show dialog
            setPendingStatus('Provided Workplace Request')
            setStatusNote(
                'Student has provided workplace - searching for industry'
            )
            setShowStatusNotesDialog(true)
        }
    }

    const handleSearchIndustry = () => {
        // Simulate search - in real app this would call an API
        setTimeout(() => {
            // For demo, randomly decide if industry is found
            const found = abnSearch.length > 5 // Simple logic for demo
            setIndustryFound(found)

            // If not found, pre-fill ABN in the form
            if (!found) {
                setNewIndustryForm((prev) => ({
                    ...prev,
                    abn: formatABN(abnSearch),
                }))
            }

            // Keep the dialog open to show results inline
            // If found, user can click "Continue to Proof Upload"
            // If not found, form will appear inline
        }, 1000)
    }

    const handleSubmitProof = () => {
        const wasSkipped = proofSkipped
        setShowProofUploadDialog(false)
        setShowProvidedWorkplaceDialog(false)
        setProofSkipped(false)

        if (wasSkipped && proofFile) {
            // Proof of employment uploaded successfully
        }

        // Only change status if we're not in a later stage (i.e., this is initial upload)
        if (!wasSkipped) {
            if (industryFound) {
                // Skip to Waiting for Industry (existing industry)
                requestStatusChange('Waiting for Industry')
            } else {
                // Go to Industry Eligibility Pending (new industry)
                requestStatusChange('Industry Eligibility Pending')
            }
        }
    }

    const handleSkipProof = () => {
        setShowProofUploadDialog(false)
        setShowProvidedWorkplaceDialog(false)
        setProofSkipped(true)

        // Proof of employment can be uploaded later

        if (industryFound) {
            // Skip to Waiting for Industry (existing industry)
            requestStatusChange('Waiting for Industry')
        } else {
            // Go to Industry Eligibility Pending (new industry)
            requestStatusChange('Industry Eligibility Pending')
        }
    }

    // Form validation functions
    const validateForm = () => {
        const errors: { [key: string]: string } = {}

        if (!newIndustryForm.industryName.trim()) {
            errors.industryName = 'Industry name is required'
        }

        if (!newIndustryForm.abn.trim()) {
            errors.abn = 'ABN is required'
        } else {
            const abnDigits = newIndustryForm.abn.replace(/\s/g, '')
            if (!/^\d{11}$/.test(abnDigits)) {
                errors.abn = 'Invalid ABN format (should be 11 digits)'
            }
        }

        if (!newIndustryForm.businessAddress.trim()) {
            errors.businessAddress = 'Business address is required'
        }

        if (!newIndustryForm.contactName.trim()) {
            errors.contactName = 'Contact person name is required'
        }

        if (!newIndustryForm.contactPhone.trim()) {
            errors.contactPhone = 'Contact phone is required'
        } else if (!/^[\d\s\(\)\+\-]+$/.test(newIndustryForm.contactPhone)) {
            errors.contactPhone = 'Invalid phone number format'
        }

        if (!newIndustryForm.contactEmail.trim()) {
            errors.contactEmail = 'Contact email is required'
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newIndustryForm.contactEmail)
        ) {
            errors.contactEmail = 'Invalid email format'
        }

        if (
            newIndustryForm.website &&
            !/^https?:\/\/.+/.test(newIndustryForm.website)
        ) {
            errors.website = 'Website must start with http:// or https://'
        }

        setFormErrors(errors)
        return Object.keys(errors).length === 0
    }

    const formatABN = (value: string) => {
        const digits = value.replace(/\D/g, '').slice(0, 11)
        if (digits.length <= 2) return digits
        if (digits.length <= 5)
            return `${digits.slice(0, 2)} ${digits.slice(2)}`
        if (digits.length <= 8)
            return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(
                5
            )}`
        return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(
            5,
            8
        )} ${digits.slice(8)}`
    }

    const updateFormField = (field: string, value: string) => {
        setNewIndustryForm((prev) => ({ ...prev, [field]: value }))
        // Clear error when user starts typing
        if (formErrors[field]) {
            setFormErrors((prev) => {
                const newErrors = { ...prev }
                delete newErrors[field]
                return newErrors
            })
        }
    }

    const handleSubmitNewIndustry = () => {
        if (!validateForm()) {
            const errorCount = Object.keys(formErrors).length
            // Form validation failed - Please correct errors before submitting
            return
        }

        // Industry details submitted for HOD review

        setShowProvidedWorkplaceDialog(false)
        setShowProofUploadDialog(true)
        setIndustryFound(false)
    }

    const handleHODApproveIndustry = () => {
        requestStatusChange('Waiting for Industry')
    }

    const handleHODRejectIndustry = () => {
        // Industry rejected by HOD
        setCurrentStatus('Student Added')
        setWorkplaceType(null)
    }

    const handleRTOApprove = () => {
        requestStatusChange('Waiting for Industry')
    }

    const handleStudentApprove = () => {
        requestStatusChange('Waiting for RTO')
    }

    const handleStudentReject = () => {
        setShowRejectionDialog(true)
    }

    const handleSubmitRejection = () => {
        setShowRejectionDialog(false)
        requestStatusChange('Request Generated')
    }

    // Manual Notes Handler
    const handleAddManualNote = () => {
        if (!newManualNote.trim()) {
            // Please enter a note
            return
        }

        const note = {
            status: 'Manual Note',
            note: newManualNote,
            timestamp: new Date().toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
            }),
            user: 'Lena',
        }

        setStatusNotes((prev) => [note, ...prev])
        setNewManualNote('')
        setShowManualNoteDialog(false)

        // Note added successfully
    }

    // Appointment Missed Handler
    const handleMarkAppointmentMissed = () => {
        setAppointmentMissed(true)
        setShowAppointmentDialog(false)

        // Add note to status notes
        const missedNote = {
            status: 'Appointment Missed',
            note: 'Student did not attend scheduled appointment. Follow-up action required.',
            timestamp: new Date().toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
            }),
            user: 'Lena',
        }

        setStatusNotes((prev) => [missedNote, ...prev])

        // Student flagged for missed appointment - Coordinator has been notified
    }

    // Check if cancellation is within 48 hours
    const canCancelRequest = () => {
        const now = new Date()
        const hoursSinceCreation =
            (now.getTime() - requestCreatedTime.getTime()) / (1000 * 60 * 60)
        return hoursSinceCreation <= 48
    }

    // Quick Actions Handler
    const handleQuickAction = (action: string) => {
        setSelectedQuickAction(action)
        setShowQuickActionsDialog(true)
    }

    const handleSubmitQuickAction = () => {
        if (!quickActionReason.trim()) {
            // Please provide a reason
            return
        }

        const actionNote = {
            status: selectedQuickAction,
            note: quickActionReason,
            timestamp: new Date().toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
            }),
            user: 'Lena',
        }

        setStatusNotes((prev) => [actionNote, ...prev])

        // Update status based on action
        if (selectedQuickAction === 'On Hold') {
            setCurrentStatus('On Hold')
            // Placement put on hold
        } else if (selectedQuickAction === 'Cancelled') {
            setIsCancelled(true)
            setCurrentStatus('Cancelled')
            // Placement cancelled
        } else if (selectedQuickAction === 'Terminated') {
            setCurrentStatus('Terminated')
            // Placement terminated
        }

        setShowQuickActionsDialog(false)
        setQuickActionReason('')
        setSelectedQuickAction('')
    }

    const handleIndustryApprove = () => {
        setShowAppointmentDialog(true)
        requestStatusChange('Appointment')
    }

    const handleBookAppointment = () => {
        if (!appointmentDate) {
            // Please select an appointment date
            return
        }
        setShowAppointmentDialog(false)
        // Appointment scheduled for ${appointmentDate}
    }

    const handleAppointmentSuccessful = () => {
        requestStatusChange('Agreement Pending')
    }

    const handleAgreementSigned = () => {
        setShowAgreementDialog(false)
        requestStatusChange('Agreement Signed')
    }

    const handleScheduleConfirmed = () => {
        if (!scheduleStartDate || !scheduleEndDate) {
            // Please select start and end dates
            return
        }
        setShowScheduleDialog(false)
        requestStatusChange('Placement Started')
        // Trigger placement started state
        setTimeout(() => handleStartPlacement(), 500)
    }

    const handleCompleteSchedule = () => {
        requestStatusChange('Schedule Completed')
    }

    const handleMarkCompleted = () => {
        requestStatusChange('Completed')
    }

    const toggleRequirement = (id: string) => {
        setSelectedRequirements((prev) =>
            prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
        )
    }

    const togglePreferenceVerification = (id: number) => {
        setVerifiedPreferences((prev) =>
            prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
        )

        if (!verifiedPreferences.includes(id)) {
            // Preference verified and matched
        }
    }

    const confirmTaskWithWorkplace = (taskIndex: number) => {
        const now = new Date()
        const dateStamp = now.toLocaleString('en-AU', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })

        setConfirmedTasks((prev) => ({
            ...prev,
            [taskIndex]: {
                date: dateStamp,
                person: 'Lena Rodriguez',
            },
        }))

        // Task confirmed with workplace
    }

    const confirmRtoReqWithWorkplace = (reqIndex: number) => {
        const now = new Date()
        const dateStamp = now.toLocaleString('en-AU', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })

        setConfirmedRtoReqs((prev) => ({
            ...prev,
            [reqIndex]: {
                date: dateStamp,
                person: 'Lena Rodriguez',
            },
        }))

        // Requirement confirmed with workplace
    }

    const handleCancelRequest = () => {
        if (!cancellationReason.trim()) {
            // Please provide a reason for cancellation
            return
        }

        setIsCancelled(true)
        setShowCancelDialog(false)

        const cancelNote: StatusNote = {
            status: 'Request Cancelled',
            note: `Placement request cancelled. Reason: ${cancellationReason}`,
            timestamp: new Date().toLocaleString('en-AU', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            }),
            user: 'Lena',
        }

        setStatusNotes((prev) => [...prev, cancelNote])

        // Placement request has been cancelled - All workflow actions are now disabled
    }

    const handleStartPlacement = () => {
        setIsPlacementStarted(true)

        const startNote: StatusNote = {
            status: 'Placement Started',
            note: 'Student has commenced workplace placement',
            timestamp: new Date().toLocaleString('en-AU', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            }),
            user: 'Lena',
        }

        setStatusNotes((prev) => [...prev, startNote])

        // Placement has started - Student is now active in workplace
    }

    const getStatusActions = () => {
        // If cancelled or placement started, show appropriate message
        if (isCancelled) {
            return (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                >
                    <div className="relative overflow-hidden p-6 bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-200 rounded-xl">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-200/30 rounded-full -mr-16 -mt-16" />
                        <div className="relative flex items-start gap-3">
                            <div className="p-2 bg-white rounded-lg shadow-sm">
                                <XCircle className="h-6 w-6 text-red-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-red-900 font-semibold text-lg">
                                    Placement Request Cancelled
                                </p>
                                <p className="text-red-700 text-sm mt-2">
                                    This placement request has been cancelled
                                    and no further actions can be performed.
                                </p>
                                <div className="mt-3 p-3 bg-white/60 rounded-lg border border-red-200">
                                    <p className="text-red-800 text-xs font-medium">
                                        Reason:
                                    </p>
                                    <p className="text-red-700 text-sm mt-1">
                                        {cancellationReason}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )
        }

        if (isPlacementStarted) {
            return (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                >
                    <div className="relative overflow-hidden p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-green-200/30 rounded-full -mr-16 -mt-16" />
                        <div className="relative flex items-start gap-3">
                            <div className="p-2 bg-white rounded-lg shadow-sm">
                                <Play className="h-6 w-6 text-green-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-green-900 font-semibold text-lg">
                                    Placement In Progress
                                </p>
                                <p className="text-green-700 text-sm mt-2">
                                    Student is currently active in their
                                    workplace placement. All setup actions are
                                    complete.
                                </p>
                                <div className="mt-3 flex items-center gap-2">
                                    <Badge
                                        className="bg-green-100 text-green-700 border-green-200"
                                        text="Active Placement"
                                        Icon={Clock}
                                        variant="success"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )
        }

        switch (currentStatus) {
            case 'Student Added':
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3"
                    >
                        <div className="relative overflow-hidden p-4 bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-200/30 rounded-full -mr-16 -mt-16" />
                            <div className="relative flex items-start gap-3">
                                <div className="p-2 bg-white rounded-lg shadow-sm">
                                    <User className="h-5 w-5 text-slate-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-slate-900 font-medium">
                                        Student Profile Created
                                    </p>
                                    <p className="text-slate-600 text-sm mt-1">
                                        Select workplace type to begin the
                                        placement process.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {!workplaceType ? (
                            <div className="space-y-2">
                                <Typography
                                    variant="label"
                                    className="text-slate-700 font-medium"
                                >
                                    Select Workplace Type
                                </Typography>
                                <div className="grid grid-cols-2 gap-3">
                                    <Button
                                        outline
                                        variant="secondary"
                                        className="h-auto py-4 flex-col gap-2 border-2 hover:border-[#044866] hover:bg-[#044866]/5"
                                        onClick={() =>
                                            handleSelectWorkplaceType('needs')
                                        }
                                    >
                                        <FileText className="h-6 w-6 text-[#044866]" />
                                        <div className="text-center">
                                            <div className="font-medium text-slate-900">
                                                Student Needs Workplace
                                            </div>
                                            <div className="text-xs text-slate-500 mt-1">
                                                Auto-match or manual search
                                            </div>
                                        </div>
                                    </Button>
                                    <Button
                                        outline
                                        variant="secondary"
                                        className="h-auto py-4 flex-col gap-2 border-2 hover:border-[#044866] hover:bg-[#044866]/5"
                                        onClick={() =>
                                            handleSelectWorkplaceType(
                                                'provided'
                                            )
                                        }
                                    >
                                        <Briefcase className="h-6 w-6 text-[#044866]" />
                                        <div className="text-center">
                                            <div className="font-medium text-slate-900">
                                                Provided Workplace
                                            </div>
                                            <div className="text-xs text-slate-500 mt-1">
                                                Student has employment
                                            </div>
                                        </div>
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                                    <span className="text-emerald-700 text-sm font-medium">
                                        {workplaceType === 'needs'
                                            ? 'Student Needs Workplace'
                                            : 'Provided Workplace'}{' '}
                                        Selected
                                    </span>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )

            case 'Request Generated':
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3"
                    >
                        <div className="relative overflow-hidden p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border border-[#044866]/20 rounded-xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#044866]/5 rounded-full -mr-16 -mt-16" />
                            <div className="relative flex items-start gap-3">
                                <div className="p-2 bg-white rounded-lg shadow-sm">
                                    <FileText className="h-5 w-5 text-[#044866]" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-[#044866] font-medium">
                                        Workplace Request Created
                                    </p>
                                    <p className="text-[#0D5468] text-sm mt-1">
                                        Choose how to find a suitable industry
                                        placement.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <Button
                            className="w-full bg-gradient-to-r from-[#044866] via-[#0D5468] to-[#044866] hover:from-[#0D5468] hover:via-[#044866] hover:to-[#0D5468] text-white shadow-xl shadow-[#044866]/30 h-12 text-base font-semibold transition-all duration-500 hover:shadow-2xl hover:shadow-[#044866]/40 hover:-translate-y-0.5"
                            onClick={handleRunAutomation}
                        >
                            <Sparkles className="mr-2 h-5 w-5 animate-pulse" />{' '}
                            Re-Run Automation
                        </Button>
                    </motion.div>
                )

            case 'Waiting for RTO':
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3"
                    >
                        <div className="relative overflow-hidden p-4 bg-gradient-to-br from-amber-50 to-orange-50 border border-[#F7A619]/30 rounded-xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#F7A619]/10 rounded-full -mr-16 -mt-16" />
                            <div className="relative flex items-start gap-3">
                                <div className="p-2 bg-white rounded-lg shadow-sm">
                                    <Clock className="h-5 w-5 text-[#F7A619]" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-amber-900 font-medium">
                                        Awaiting RTO Approval
                                    </p>
                                    <p className="text-amber-700 text-sm mt-1">
                                        Industry: {selectedIndustry}
                                    </p>
                                    <p className="text-amber-600 text-xs mt-1">
                                        Request pending review
                                    </p>
                                </div>
                            </div>
                        </div>
                        <Button
                            className="w-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:via-teal-600 hover:to-emerald-600 text-white shadow-xl shadow-emerald-500/30 h-12 text-base font-semibold transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/40 hover:-translate-y-0.5"
                            onClick={handleRTOApprove}
                        >
                            <ThumbsUp className="mr-2 h-5 w-5" /> RTO Approve
                        </Button>
                        <Button
                            outline
                            variant="error"
                            className="w-full border-2 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 h-12 text-base font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-red-200"
                            onClick={() =>
                                requestStatusChange('Request Generated')
                            }
                            Icon={ThumbsDown}
                            text="RTO Reject"
                        />
                    </motion.div>
                )

            case 'Waiting for Student':
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3"
                    >
                        <div className="relative overflow-hidden p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border border-[#044866]/20 rounded-xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#044866]/5 rounded-full -mr-16 -mt-16" />
                            <div className="relative flex items-start gap-3">
                                <div className="p-2 bg-white rounded-lg shadow-sm">
                                    <User className="h-5 w-5 text-[#044866]" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-[#044866] font-medium">
                                        Awaiting Student Approval
                                    </p>
                                    <p className="text-[#0D5468] text-sm mt-1">
                                        Industry: {selectedIndustry}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <Button
                            className="w-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 hover:from-emerald-600 hover:via-teal-600 hover:to-emerald-600 text-white shadow-xl shadow-emerald-500/30 h-12 text-base font-semibold transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/40 hover:-translate-y-0.5"
                            onClick={handleStudentApprove}
                        >
                            <ThumbsUp className="mr-2 h-5 w-5" /> Student
                            Approves
                        </Button>
                        <Button
                            outline
                            variant="error"
                            className="w-full border-2 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 h-12 text-base font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-red-200"
                            onClick={handleStudentReject}
                            Icon={ThumbsDown}
                            text="Student Rejects"
                        />
                    </motion.div>
                )

            case 'Waiting for Industry':
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3"
                    >
                        <div className="relative overflow-hidden p-4 bg-gradient-to-br from-violet-50 to-purple-50 border border-violet-200 rounded-xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-violet-200/30 rounded-full -mr-16 -mt-16" />
                            <div className="relative flex items-start gap-3">
                                <div className="p-2 bg-white rounded-lg shadow-sm">
                                    <Building2 className="h-5 w-5 text-violet-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-violet-900 font-medium">
                                        Awaiting Industry Confirmation
                                    </p>
                                    <p className="text-violet-700 text-sm mt-1">
                                        Industry: {selectedIndustry}
                                    </p>
                                </div>
                            </div>
                        </div>
                        {proofSkipped && workplaceType === 'provided' && (
                            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                                <div className="flex items-start gap-2">
                                    <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                                    <div className="flex-1">
                                        <p className="text-amber-900 font-medium text-sm">
                                            Proof of Employment Pending
                                        </p>
                                        <p className="text-amber-700 text-xs mt-1">
                                            Upload required before final
                                            approval
                                        </p>
                                    </div>
                                    <Button
                                        outline
                                        variant="secondary"
                                        className="h-7 text-xs border-amber-300 text-amber-700 hover:bg-amber-100"
                                        onClick={() => {
                                            setShowProofUploadDialog(true)
                                        }}
                                        Icon={Upload}
                                        text="Upload Now"
                                    />
                                </div>
                            </div>
                        )}
                        <Button
                            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-white shadow-lg shadow-emerald-600/20 h-11"
                            onClick={handleIndustryApprove}
                        >
                            <ThumbsUp className="mr-2 h-4 w-4" /> Industry
                            Approves
                        </Button>
                        <Button
                            outline
                            variant="error"
                            className="w-full border-2 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 h-11"
                            onClick={() => setShowRejectionDialog(true)}
                            Icon={ThumbsDown}
                            text="Industry Rejects"
                        />
                    </motion.div>
                )

            case 'Appointment':
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3"
                    >
                        <div className="relative overflow-hidden p-4 bg-gradient-to-br from-indigo-50 to-blue-50 border border-[#0D5468]/20 rounded-xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0D5468]/5 rounded-full -mr-16 -mt-16" />
                            <div className="relative flex items-start gap-3">
                                <div className="p-2 bg-white rounded-lg shadow-sm">
                                    <CalendarCheck className="h-5 w-5 text-[#0D5468]" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-[#0D5468] font-medium">
                                        Appointment Stage
                                    </p>
                                    {appointmentDate && (
                                        <p className="text-[#0D5468] text-sm mt-1">
                                            Scheduled: {appointmentDate}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        {!appointmentDate ? (
                            <Button
                                className="w-full bg-gradient-to-r from-[#0D5468] to-[#044866] hover:from-[#044866] hover:to-[#0D5468] text-white shadow-lg shadow-[#0D5468]/20 h-11"
                                onClick={() => setShowAppointmentDialog(true)}
                            >
                                <Calendar className="mr-2 h-4 w-4" /> Book
                                Appointment
                            </Button>
                        ) : (
                            <>
                                <Button
                                    className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-white shadow-lg shadow-emerald-600/20 h-11"
                                    onClick={handleAppointmentSuccessful}
                                >
                                    <CheckCircle2 className="mr-2 h-4 w-4" />{' '}
                                    Mark Successful
                                </Button>
                                <Button
                                    outline
                                    variant="secondary"
                                    className="w-full border-2 border-slate-200 hover:border-slate-300 h-11"
                                    onClick={() =>
                                        setShowAppointmentDialog(true)
                                    }
                                    Icon={Calendar}
                                    text="Book Appointment"
                                />
                                <Button
                                    outline
                                    variant="secondary"
                                    className="w-full border-2 border-slate-200 hover:border-slate-300 h-11"
                                    onClick={() =>
                                        setShowAppointmentDialog(true)
                                    }
                                    Icon={Calendar}
                                    text="Reschedule"
                                />
                            </>
                        )}
                    </motion.div>
                )

            case 'Agreement Pending':
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3"
                    >
                        <div className="relative overflow-hidden p-4 bg-gradient-to-br from-indigo-50 to-purple-50 border border-[#0D5468]/20 rounded-xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0D5468]/5 rounded-full -mr-16 -mt-16" />
                            <div className="relative flex items-start gap-3">
                                <div className="p-2 bg-white rounded-lg shadow-sm">
                                    <FileSignature className="h-5 w-5 text-[#0D5468]" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-[#0D5468] font-medium">
                                        Agreement & Eligibility Pending
                                    </p>
                                    <p className="text-[#0D5468] text-sm mt-1">
                                        Generate or upload placement agreement
                                    </p>
                                </div>
                            </div>
                        </div>
                        <Button
                            className="w-full bg-gradient-to-r from-[#0D5468] to-[#044866] hover:from-[#044866] hover:to-[#0D5468] text-white shadow-lg shadow-[#0D5468]/20 h-11"
                            onClick={() => setShowAgreementDialog(true)}
                        >
                            <FileSignature className="mr-2 h-4 w-4" /> Generate
                            Agreement
                        </Button>
                        <Button
                            outline
                            variant="success"
                            className="w-full border-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-300 h-11"
                            onClick={handleAgreementSigned}
                            text="Mark as Signed"
                            Icon={CheckCircle2}
                        />
                    </motion.div>
                )

            case 'Agreement Signed':
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3"
                    >
                        <div className="relative overflow-hidden p-4 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/30 rounded-full -mr-16 -mt-16" />
                            <div className="relative flex items-start gap-3">
                                <div className="p-2 bg-white rounded-lg shadow-sm">
                                    <FileCheck className="h-5 w-5 text-emerald-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-emerald-900 font-medium">
                                        Agreement Signed
                                    </p>
                                    <p className="text-emerald-700 text-sm mt-1">
                                        Confirm schedule to proceed
                                    </p>
                                </div>
                            </div>
                        </div>
                        <Button
                            className="w-full bg-gradient-to-r from-[#044866] to-[#0D5468] hover:from-[#0D5468] hover:to-[#044866] text-white shadow-lg shadow-[#044866]/20 h-11"
                            onClick={() => setShowScheduleDialog(true)}
                        >
                            <CalendarCheck className="mr-2 h-4 w-4" /> Confirm
                            Schedule
                        </Button>
                    </motion.div>
                )

            case 'Placement Started':
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3"
                    >
                        <div className="relative overflow-hidden p-4 bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-200 rounded-xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/30 rounded-full -mr-16 -mt-16" />
                            <div className="relative flex items-start gap-3">
                                <div className="p-2 bg-white rounded-lg shadow-sm">
                                    <Play className="h-5 w-5 text-emerald-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-emerald-900 font-medium">
                                        Placement In Progress
                                    </p>
                                    <p className="text-emerald-700 text-sm mt-1">
                                        Student is actively working
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border border-[#044866]/20 rounded-xl space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="h-4 w-4 text-[#044866]" />
                                    <span className="text-[#044866] font-medium text-sm">
                                        Placement Progress
                                    </span>
                                </div>
                                <span className="text-[#0D5468] text-sm font-medium">
                                    30%
                                </span>
                            </div>
                            <Progressbar value={30} size="sm" />
                            <div className="flex items-center justify-between text-xs text-slate-600">
                                <span>12 of 40 days completed</span>
                                <span>28 days remaining</span>
                            </div>
                        </div>
                        <Button
                            className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-white shadow-lg shadow-emerald-600/20 h-11"
                            onClick={handleCompleteSchedule}
                        >
                            <CheckCircle2 className="mr-2 h-4 w-4" /> Mark
                            Schedule Completed
                        </Button>
                    </motion.div>
                )

            case 'Schedule Completed':
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3"
                    >
                        <div className="relative overflow-hidden p-4 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-200/30 rounded-full -mr-16 -mt-16" />
                            <div className="relative flex items-start gap-3">
                                <div className="p-2 bg-white rounded-lg shadow-sm">
                                    <CheckSquare className="h-5 w-5 text-emerald-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-emerald-900 font-medium">
                                        Schedule Completed
                                    </p>
                                    <p className="text-emerald-700 text-sm mt-1">
                                        Collect documents and feedback
                                    </p>
                                </div>
                            </div>
                        </div>
                        <Button
                            className="w-full bg-gradient-to-r from-[#044866] to-[#0D5468] hover:from-[#0D5468] hover:to-[#044866] text-white shadow-lg shadow-[#044866]/20 h-11"
                            onClick={handleMarkCompleted}
                        >
                            <Award className="mr-2 h-4 w-4" /> Mark as Completed
                        </Button>
                    </motion.div>
                )

            case 'Completed':
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3"
                    >
                        <div className="relative overflow-hidden p-5 bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 border-2 border-emerald-300 rounded-xl">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-300/20 rounded-full -mr-20 -mt-20" />
                            <div className="relative flex items-start gap-3">
                                <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-lg">
                                    <Award className="h-6 w-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-emerald-900 font-semibold text-lg">
                                        Placement Completed!
                                    </p>
                                    <p className="text-emerald-700 text-sm mt-1">
                                        All requirements successfully met
                                    </p>
                                </div>
                            </div>
                        </div>
                        <Button
                            outline
                            variant="secondary"
                            className="w-full border-2 border-slate-200 hover:border-slate-300 h-11"
                            Icon={Download}
                            text="Download Certificate"
                        />
                    </motion.div>
                )

            case 'Provided Workplace Request':
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3"
                    >
                        <div className="relative overflow-hidden p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border border-[#044866]/20 rounded-xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#044866]/5 rounded-full -mr-16 -mt-16" />
                            <div className="relative flex items-start gap-3">
                                <div className="p-2 bg-white rounded-lg shadow-sm">
                                    <Briefcase className="h-5 w-5 text-[#044866]" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-[#044866] font-medium">
                                        Provided Workplace Request Created
                                    </p>
                                    <p className="text-[#0D5468] text-sm mt-1">
                                        Search for industry and upload proof of
                                        employment.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <Button
                            className="w-full bg-gradient-to-r from-[#044866] to-[#0D5468] hover:from-[#0D5468] hover:to-[#044866] text-white shadow-lg shadow-[#044866]/20 h-11"
                            onClick={() => setShowProvidedWorkplaceDialog(true)}
                        >
                            <Building2 className="mr-2 h-4 w-4" /> Search for
                            Industry
                        </Button>
                    </motion.div>
                )

            case 'Industry Eligibility Pending':
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3"
                    >
                        <div className="relative overflow-hidden p-4 bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/30 rounded-full -mr-16 -mt-16" />
                            <div className="relative flex items-start gap-3">
                                <div className="p-2 bg-white rounded-lg shadow-sm">
                                    <Shield className="h-5 w-5 text-amber-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-amber-900 font-medium">
                                        HOD Review Required
                                    </p>
                                    <p className="text-amber-700 text-sm mt-1">
                                        Awaiting HOD approval for new industry
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <Button
                                className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-600 text-white shadow-lg shadow-emerald-600/20 h-10"
                                onClick={handleHODApproveIndustry}
                            >
                                <ThumbsUp className="mr-2 h-4 w-4" /> Approve
                            </Button>
                            <Button
                                outline
                                variant="error"
                                className="border-2 border-red-200 hover:border-red-300 hover:bg-red-50 text-red-700 h-10"
                                onClick={handleHODRejectIndustry}
                                Icon={ThumbsDown}
                                text="Reject"
                            />
                        </div>
                    </motion.div>
                )

            case 'Agreement and Eligibility Pending':
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3"
                    >
                        <div className="relative overflow-hidden p-4 bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-200 rounded-xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200/30 rounded-full -mr-16 -mt-16" />
                            <div className="relative flex items-start gap-3">
                                <div className="p-2 bg-white rounded-lg shadow-sm">
                                    <FileText className="h-5 w-5 text-purple-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-purple-900 font-medium">
                                        Agreement & Eligibility Pending
                                    </p>
                                    <p className="text-purple-700 text-sm mt-1">
                                        Generate and review placement agreement
                                    </p>
                                </div>
                            </div>
                        </div>
                        {proofSkipped && workplaceType === 'provided' && (
                            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                                <div className="flex items-start gap-2">
                                    <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                                    <div className="flex-1">
                                        <p className="text-amber-900 font-medium text-sm">
                                            Proof of Employment Pending
                                        </p>
                                        <p className="text-amber-700 text-xs mt-1">
                                            Upload required before final
                                            approval
                                        </p>
                                    </div>
                                    <Button
                                        outline
                                        className="h-7 text-xs border-amber-300 text-amber-700 hover:bg-amber-100"
                                        onClick={() => {
                                            setShowProofUploadDialog(true)
                                        }}
                                    >
                                        <Upload className="h-3 w-3 mr-1" />{' '}
                                        Upload
                                    </Button>
                                </div>
                            </div>
                        )}
                        <Button
                            className="w-full bg-gradient-to-r from-[#044866] via-[#0D5468] to-[#044866] hover:from-[#0D5468] hover:via-[#044866] hover:to-[#0D5468] text-white shadow-xl shadow-[#044866]/30 h-12 text-base font-semibold transition-all duration-500 hover:shadow-2xl hover:shadow-[#044866]/40 hover:-translate-y-0.5"
                            onClick={() => setShowAgreementDialog(true)}
                        >
                            <FileSignature className="mr-2 h-5 w-5" /> Generate
                            Agreement
                        </Button>
                    </motion.div>
                )

            case 'Agreement and Eligibility Signed':
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3"
                    >
                        <div className="relative overflow-hidden p-4 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-green-200/30 rounded-full -mr-16 -mt-16" />
                            <div className="relative flex items-start gap-3">
                                <div className="p-2 bg-white rounded-lg shadow-sm">
                                    <FileCheck className="h-5 w-5 text-green-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-green-900 font-medium">
                                        Agreement Signed
                                    </p>
                                    <p className="text-green-700 text-sm mt-1">
                                        Ready to start placement
                                    </p>
                                </div>
                            </div>
                        </div>
                        {proofSkipped && workplaceType === 'provided' && (
                            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                                <div className="flex items-start gap-2">
                                    <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                                    <div className="flex-1">
                                        <p className="text-amber-900 font-medium text-sm">
                                            Proof of Employment Pending
                                        </p>
                                        <p className="text-amber-700 text-xs mt-1">
                                            Upload required for final records
                                        </p>
                                    </div>
                                    <Button
                                        outline
                                        className="h-7 text-xs border-amber-300 text-amber-700 hover:bg-amber-100"
                                        onClick={() => {
                                            setShowProofUploadDialog(true)
                                        }}
                                    >
                                        <Upload className="h-3 w-3 mr-1" />{' '}
                                        Upload
                                    </Button>
                                </div>
                            </div>
                        )}
                        <Button
                            className="w-full bg-gradient-to-r from-[#044866] via-[#0D5468] to-[#044866] hover:from-[#0D5468] hover:via-[#044866] hover:to-[#0D5468] text-white shadow-xl shadow-[#044866]/30 h-12 text-base font-semibold transition-all duration-500 hover:shadow-2xl hover:shadow-[#044866]/40 hover:-translate-y-0.5"
                            onClick={() => setShowScheduleDialog(true)}
                        >
                            <CalendarCheck className="mr-2 h-5 w-5" /> Add
                            Placement Schedule
                        </Button>
                    </motion.div>
                )

            default:
                return null
        }
    }

    const showIndustryDetails = [
        'Waiting for RTO',
        'Waiting for Student',
        'Waiting for Industry',
        'Appointment',
        'Agreement Pending',
        'Agreement Signed',
        'Agreement and Eligibility Pending',
        'Agreement and Eligibility Signed',
        'Placement Started',
        'Schedule Completed',
        'Completed',
    ].includes(currentStatus)

    // Sticky scroll detection
    useEffect(() => {
        const handleScroll = () => {
            if (!leftPanelRef.current || !rightPanelRef.current) return

            const leftHeight = leftPanelRef.current.offsetHeight
            const rightHeight = rightPanelRef.current.offsetHeight
            const scrollTop = window.scrollY
            const windowHeight = window.innerHeight
            const headerHeight = 80 // Approximate header height

            // Calculate when each panel should become sticky
            const leftBottomReached =
                scrollTop + windowHeight >= leftHeight + headerHeight
            const rightBottomReached =
                scrollTop + windowHeight >= rightHeight + headerHeight

            // If left is shorter, make it sticky when it reaches bottom while right is still scrolling
            if (leftHeight < rightHeight) {
                setLeftPanelSticky(leftBottomReached && !rightBottomReached)
                setRightPanelSticky(false)
            }
            // If right is shorter, make it sticky when it reaches bottom while left is still scrolling
            else if (rightHeight < leftHeight) {
                setRightPanelSticky(rightBottomReached && !leftBottomReached)
                setLeftPanelSticky(false)
            }
            // If they're equal height, neither should be sticky
            else {
                setLeftPanelSticky(false)
                setRightPanelSticky(false)
            }
        }

        window.addEventListener('scroll', handleScroll)
        window.addEventListener('resize', handleScroll)

        // Initial check
        handleScroll()

        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleScroll)
        }
    }, [workplaceType, currentStatus]) // Re-run when content might change

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100/50">
            {/* Clean Modern Header */}
            <CleanHeader
                isCancelled={isCancelled}
                isPlacementStarted={isPlacementStarted}
                workplaceType={workplaceType}
                canCancelRequest={canCancelRequest}
                handleQuickAction={handleQuickAction}
                setShowCancelDialog={setShowCancelDialog}
                setShowManualNoteDialog={setShowManualNoteDialog}
                isWorkflowOpen={isWorkflowOpen}
                setIsWorkflowOpen={setIsWorkflowOpen}
                workflowStages={workflowStages}
                currentStatus={currentStatus}
                getCurrentStageIndex={getCurrentStageIndex}
            />

            {/* Premium Workflow Tracker */}
            <div className="px-8 py-8 bg-gradient-to-b from-white/80 via-white/70 to-white/60 backdrop-blur-xl border-b border-slate-200/80 shadow-inner">
                <div className="max-w-[1900px] mx-auto">
                    {/* Enhanced Header Section */}
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-5">
                            <div className="relative">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#044866] via-[#0D5468] to-[#044866] flex items-center justify-center text-white shadow-lg ring-4 ring-white ring-offset-2 ring-offset-slate-100">
                                    <span className="text-base font-bold">
                                        LR
                                    </span>
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-sm"></div>
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <p className="text-lg font-bold text-slate-900">
                                        Lena Rodriguez
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Workflow Progress */}
                            {workplaceType && (
                                <div className="flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-[#044866]/5 to-[#0D5468]/5 rounded-xl border border-[#044866]/20">
                                    <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#044866] to-[#0D5468] flex items-center justify-center">
                                            <span className="text-white font-bold text-sm">
                                                {getCurrentStageIndex() + 1}/
                                                {workflowStages.length}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-500 font-medium">
                                                Current Stage
                                            </p>
                                            <p className="font-semibold text-[#044866] text-sm">
                                                {currentStatus}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Time Stats */}
                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                <Clock className="h-4 w-4" />
                                <span>Last updated: 2 hours ago</span>
                            </div>
                        </div>
                    </div>

                    {/* Workflow Progress Bar */}
                    {workplaceType && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 mb-8"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <Badge
                                        Icon={Briefcase}
                                        text={
                                            workplaceType === 'provided'
                                                ? 'Provided Workplace'
                                                : 'Needs Workplace'
                                        }
                                        className={`${
                                            workplaceType === 'provided'
                                                ? 'bg-gradient-to-r from-purple-500 to-indigo-500 shadow-purple-500/30'
                                                : 'bg-gradient-to-r from-[#044866] to-[#0D5468] shadow-[#044866]/30'
                                        } text-white border-0 shadow-lg px-3 py-1.5`}
                                    ></Badge>
                                    <span className="text-sm text-slate-600">
                                        Stage {getCurrentStageIndex() + 1} of{' '}
                                        {workflowStages.length}
                                    </span>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="relative h-2 bg-slate-100 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{
                                        width: `${
                                            ((getCurrentStageIndex() + 1) /
                                                workflowStages.length) *
                                            100
                                        }%`,
                                    }}
                                    transition={{
                                        duration: 0.8,
                                        ease: 'easeOut',
                                    }}
                                    className={`absolute inset-y-0 left-0 ${
                                        workplaceType === 'provided'
                                            ? 'bg-gradient-to-r from-purple-500 to-indigo-500'
                                            : 'bg-gradient-to-r from-[#044866] to-[#0D5468]'
                                    } rounded-full`}
                                />
                            </div>

                            {/* Stages */}
                            <div className="grid grid-cols-6 lg:grid-cols-12 gap-2 mt-4">
                                {workflowStages.map((stage, index) => {
                                    const isActive =
                                        index === getCurrentStageIndex()
                                    const isCompleted =
                                        index < getCurrentStageIndex()

                                    return (
                                        <TooltipProvider key={index}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div
                                                        className={`flex flex-col items-center gap-1.5 p-2 rounded-lg transition-all cursor-pointer ${
                                                            isActive
                                                                ? workplaceType ===
                                                                  'provided'
                                                                    ? 'bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-300'
                                                                    : 'bg-gradient-to-br from-[#044866]/5 to-[#0D5468]/5 border-2 border-[#044866]/30'
                                                                : isCompleted
                                                                ? 'bg-emerald-50 border border-emerald-200'
                                                                : 'bg-slate-50 border border-slate-200'
                                                        }`}
                                                    >
                                                        <div
                                                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                                                isActive
                                                                    ? workplaceType ===
                                                                      'provided'
                                                                        ? 'bg-gradient-to-br from-purple-500 to-indigo-500 text-white'
                                                                        : 'bg-gradient-to-br from-[#044866] to-[#0D5468] text-white'
                                                                    : isCompleted
                                                                    ? 'bg-emerald-500 text-white'
                                                                    : 'bg-slate-300 text-white'
                                                            }`}
                                                        >
                                                            {isCompleted ? (
                                                                <CheckCircle2 className="h-4 w-4" />
                                                            ) : (
                                                                <span className="text-xs font-bold">
                                                                    {index + 1}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <span
                                                            className={`text-xs text-center font-medium hidden lg:block ${
                                                                isActive
                                                                    ? workplaceType ===
                                                                      'provided'
                                                                        ? 'text-purple-700'
                                                                        : 'text-[#044866]'
                                                                    : isCompleted
                                                                    ? 'text-emerald-700'
                                                                    : 'text-slate-500'
                                                            }`}
                                                        >
                                                            {stage.name
                                                                .split(' ')
                                                                .slice(0, 2)
                                                                .join(' ')}
                                                        </span>
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p className="font-semibold">
                                                        {stage.name}
                                                    </p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    )
                                })}
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="px-8 py-8">
                <div className="max-w-[1900px] mx-auto">
                    <div className="grid grid-cols-2 gap-10">
                        {/* Left Panel - Student Information */}
                        <motion.div
                            ref={leftPanelRef}
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            className={`space-y-7 ${
                                leftPanelSticky
                                    ? 'sticky top-24 self-start'
                                    : ''
                            }`}
                        >
                            {/* Premium Quick Summary Card */}
                            <Card
                                noPadding
                                className="group border-0 shadow-2xl shadow-slate-300/30 overflow-hidden bg-gradient-to-br from-white via-blue-50/50 to-indigo-50/50 backdrop-blur-sm hover:shadow-3xl hover:shadow-slate-300/40 transition-all duration-500 hover:-translate-y-1"
                            >
                                <div className="relative p-6">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#044866]/10 via-[#0D5468]/5 to-transparent rounded-full -mr-32 -mt-32 blur-3xl group-hover:scale-110 transition-transform duration-700" />

                                    <div className="relative flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#044866] via-[#0D5468] to-[#044866] flex items-center justify-center text-white shadow-xl ring-4 ring-white ring-offset-2 ring-offset-blue-50/50">
                                                    <User className="h-7 w-7" />
                                                </div>
                                                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-3 border-white flex items-center justify-center shadow-md">
                                                    <CheckCircle2 className="h-3 w-3 text-white" />
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-[#044866] text-xl font-bold">
                                                    Sarah Johnson
                                                </h3>
                                                <p className="text-slate-500 text-sm mt-0.5 flex items-center gap-1.5">
                                                    <span className="w-1 h-1 rounded-full bg-slate-400"></span>
                                                    STU-2024-1089
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <Badge
                                                text="Active"
                                                className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 shadow-lg shadow-emerald-500/30 px-3 py-1.5"
                                            />
                                            {appointmentMissed && (
                                                <motion.div
                                                    initial={{
                                                        opacity: 0,
                                                        scale: 0.9,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        scale: 1,
                                                    }}
                                                    className="flex items-center gap-1.5 px-2 py-1 bg-red-100 border border-red-300 rounded-lg"
                                                >
                                                    <Flag className="h-3 w-3 text-red-600" />
                                                    <span className="text-xs font-medium text-red-700">
                                                        Appointment Missed
                                                    </span>
                                                </motion.div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="relative grid grid-cols-2 gap-3 mb-4">
                                        <div className="flex items-center gap-3 p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-sm hover:shadow-md hover:border-[#044866]/20 transition-all duration-300">
                                            <div className="p-2 bg-gradient-to-br from-[#044866]/10 to-[#0D5468]/10 rounded-lg">
                                                <Calendar className="h-4 w-4 text-[#044866]" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500 font-medium">
                                                    Age
                                                </p>
                                                <p className="text-sm text-slate-900 font-semibold">
                                                    22 years
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 p-3 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-sm hover:shadow-md hover:border-[#044866]/20 transition-all duration-300">
                                            <div className="p-2 bg-gradient-to-br from-[#044866]/10 to-[#0D5468]/10 rounded-lg">
                                                <Phone className="h-4 w-4 text-[#044866]" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-slate-500 font-medium">
                                                    Phone
                                                </p>
                                                <p className="text-sm text-slate-900 font-semibold">
                                                    ***-6789
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="relative space-y-2">
                                        <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200">
                                            <Briefcase className="h-3.5 w-3.5 text-[#044866]" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[10px] text-slate-500">
                                                    Sector
                                                </p>
                                                <p className="text-xs text-slate-900 font-medium truncate">
                                                    Ageing Support
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-slate-200">
                                            <GraduationCap className="h-3.5 w-3.5 text-[#044866]" />
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[10px] text-slate-500">
                                                    Course
                                                </p>
                                                <p className="text-xs text-slate-900 font-medium truncate">
                                                    CHC43015 – Cert IV Ageing
                                                    Support
                                                </p>
                                            </div>
                                        </div>

                                        <div className="p-3 bg-gradient-to-br from-white to-blue-50/50 rounded-lg border border-[#044866]/20">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-1.5">
                                                    <ListChecks className="h-3.5 w-3.5 text-[#044866]" />
                                                    <p className="text-xs text-[#044866] font-medium">
                                                        Requirements
                                                    </p>
                                                </div>
                                                <Badge
                                                    text={selectedRequirements.length.toString()}
                                                    className="bg-[#044866]/10 text-[#044866] border-0 text-[10px] px-1.5 py-0"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                {placementRequirements
                                                    .filter((req) =>
                                                        selectedRequirements.includes(
                                                            req.id
                                                        )
                                                    )
                                                    .map((req) => (
                                                        <div
                                                            key={req.id}
                                                            className="flex items-center justify-between text-[10px]"
                                                        >
                                                            <span className="text-slate-700">
                                                                {req.category}
                                                            </span>
                                                            <span className="text-slate-900 font-semibold">
                                                                {req.completed}/
                                                                {req.total}h
                                                            </span>
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* Collapsible Student Details */}
                            <Card
                                noPadding
                                className="border-0 shadow-xl overflow-hidden"
                            >
                                <Button
                                    variant="action"
                                    className="w-full p-4 hover:bg-slate-50 rounded-none border-0"
                                    onClick={() =>
                                        setShowStudentDetails(
                                            !showStudentDetails
                                        )
                                    }
                                >
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex items-center gap-2.5 text-[#044866]">
                                            <User className="h-4 w-4" />
                                            <h3 className="font-semibold text-sm">
                                                Complete Student Information
                                            </h3>
                                        </div>
                                        <motion.div
                                            animate={{
                                                rotate: showStudentDetails
                                                    ? 180
                                                    : 0,
                                            }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <ChevronRight className="h-4 w-4 text-slate-500 rotate-90" />
                                        </motion.div>
                                    </div>
                                </Button>

                                <AnimatePresence>
                                    {showStudentDetails && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{
                                                height: 'auto',
                                                opacity: 1,
                                            }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="p-5 pt-0 border-t border-slate-100">
                                                <Tabs
                                                    defaultValue="basic"
                                                    className="w-full"
                                                >
                                                    <TabsList className="grid w-full grid-cols-2 mb-4">
                                                        <TabsTrigger
                                                            value="basic"
                                                            className="text-xs"
                                                        >
                                                            Basic Info
                                                        </TabsTrigger>
                                                        <TabsTrigger
                                                            value="contact"
                                                            className="text-xs"
                                                        >
                                                            Contact & Address
                                                        </TabsTrigger>
                                                    </TabsList>
                                                    <TabsContent
                                                        value="basic"
                                                        className="space-y-3"
                                                    >
                                                        <div className="grid grid-cols-2 gap-3">
                                                            <div>
                                                                <Typography
                                                                    variant="label"
                                                                    className="text-[10px] text-slate-600"
                                                                >
                                                                    First Name
                                                                </Typography>
                                                                <TextInput
                                                                    name="firstName"
                                                                    defaultValue="Sarah"
                                                                    className="mt-1 bg-slate-50 border-slate-200 h-9 text-sm"
                                                                    disabled
                                                                />
                                                            </div>
                                                            <div>
                                                                <Typography
                                                                    variant="label"
                                                                    className="text-[10px] text-slate-600"
                                                                >
                                                                    Family Name
                                                                </Typography>
                                                                <TextInput
                                                                    name="familyName"
                                                                    defaultValue="Johnson"
                                                                    className="mt-1 bg-slate-50 border-slate-200 h-9 text-sm"
                                                                    disabled
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="grid grid-cols-3 gap-3">
                                                            <div>
                                                                <Typography
                                                                    variant="label"
                                                                    className="text-[10px] text-slate-600"
                                                                >
                                                                    Student ID
                                                                </Typography>
                                                                <TextInput
                                                                    name="studentId"
                                                                    defaultValue="STU-2024-1089"
                                                                    className="mt-1 bg-slate-50 border-slate-200 h-9 text-sm"
                                                                    disabled
                                                                />
                                                            </div>
                                                            <div>
                                                                <Typography
                                                                    variant="label"
                                                                    className="text-[10px] text-slate-600"
                                                                >
                                                                    Batch
                                                                </Typography>
                                                                <TextInput
                                                                    name="batch"
                                                                    defaultValue="2024-A"
                                                                    className="mt-1 bg-slate-50 border-slate-200 h-9 text-sm"
                                                                    disabled
                                                                />
                                                            </div>
                                                            <div>
                                                                <Typography
                                                                    variant="label"
                                                                    className="text-[10px] text-slate-600"
                                                                >
                                                                    Age
                                                                </Typography>
                                                                <TextInput
                                                                    name="age"
                                                                    defaultValue="22"
                                                                    className="mt-1 bg-slate-50 border-slate-200 h-9 text-sm"
                                                                    disabled
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-3">
                                                            <div>
                                                                <Typography
                                                                    variant="label"
                                                                    className="text-[10px] text-slate-600"
                                                                >
                                                                    RTO
                                                                </Typography>
                                                                <TextInput
                                                                    name="rto"
                                                                    defaultValue="AIBT Global"
                                                                    className="mt-1 bg-slate-50 border-slate-200 h-9 text-sm"
                                                                    disabled
                                                                />
                                                            </div>
                                                            <div>
                                                                <Typography
                                                                    variant="label"
                                                                    className="text-[10px] text-slate-600"
                                                                >
                                                                    Student Type
                                                                </Typography>
                                                                <div className="mt-1">
                                                                    <Badge
                                                                        text="Domestic"
                                                                        className="bg-[#044866]/10 text-[#044866] border-[#044866]/20 text-xs"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </TabsContent>
                                                    <TabsContent
                                                        value="contact"
                                                        className="space-y-3"
                                                    >
                                                        <div className="grid grid-cols-2 gap-3">
                                                            <div>
                                                                <Typography
                                                                    variant="label"
                                                                    className="text-[10px] text-slate-600"
                                                                >
                                                                    Phone
                                                                </Typography>
                                                                <div className="flex mt-1">
                                                                    <div className="flex items-center px-2 bg-slate-100 border border-r-0 border-slate-200 rounded-l-lg">
                                                                        <Phone className="h-3.5 w-3.5 text-slate-500" />
                                                                    </div>
                                                                    <TextInput
                                                                        name="phone"
                                                                        defaultValue="+61 423 456 789"
                                                                        className="rounded-l-none bg-slate-50 border-slate-200 h-9 text-sm"
                                                                        disabled
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <Typography
                                                                    variant="label"
                                                                    className="text-[10px] text-slate-600"
                                                                >
                                                                    Email
                                                                </Typography>
                                                                <div className="flex mt-1">
                                                                    <div className="flex items-center px-2 bg-slate-100 border border-r-0 border-slate-200 rounded-l-lg">
                                                                        <Mail className="h-3.5 w-3.5 text-slate-500" />
                                                                    </div>
                                                                    <TextInput
                                                                        name="email"
                                                                        type="email"
                                                                        defaultValue="sarah.j@email.com"
                                                                        className="rounded-l-none bg-slate-50 border-slate-200 h-9 text-sm"
                                                                        disabled
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <Typography
                                                                variant="label"
                                                                className="text-[10px] text-slate-600"
                                                            >
                                                                Primary Address
                                                            </Typography>
                                                            <div className="flex mt-1">
                                                                <div className="flex items-center px-2 bg-slate-100 border border-r-0 border-slate-200 rounded-l-lg">
                                                                    <MapPin className="h-3.5 w-3.5 text-slate-500" />
                                                                </div>
                                                                <TextInput
                                                                    name="address"
                                                                    defaultValue="45 Collins Street, Melbourne VIC 3000"
                                                                    className="rounded-l-none bg-slate-50 border-slate-200 h-9 text-sm"
                                                                    disabled
                                                                />
                                                            </div>
                                                        </div>
                                                    </TabsContent>
                                                </Tabs>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Card>

                            {/* Enhanced Compliance Checks */}
                            <Card
                                noPadding
                                className="border-0 shadow-xl overflow-hidden"
                            >
                                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-4">
                                    <div className="flex items-center gap-2.5 text-white">
                                        <Shield className="h-5 w-5" />
                                        <h3 className="font-semibold">
                                            Compliance Checks
                                        </h3>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="space-y-3">
                                        {complianceChecks.map(
                                            (check, index) => {
                                                const Icon = check.icon
                                                return (
                                                    <motion.div
                                                        key={index}
                                                        initial={{
                                                            opacity: 0,
                                                            x: -20,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            x: 0,
                                                        }}
                                                        transition={{
                                                            delay: index * 0.1,
                                                        }}
                                                        className="flex items-center justify-between p-4 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-xl border border-slate-200 hover:shadow-md transition-all"
                                                    >
                                                        <div className="flex items-center gap-3">
                                                            <div
                                                                className={`p-2 rounded-lg ${
                                                                    check.status ===
                                                                    'verified'
                                                                        ? 'bg-emerald-100'
                                                                        : 'bg-amber-100'
                                                                }`}
                                                            >
                                                                <Icon
                                                                    className={`h-5 w-5 ${check.color}`}
                                                                />
                                                            </div>
                                                            <div>
                                                                <p className="text-slate-900 font-medium">
                                                                    {check.name}
                                                                </p>
                                                                <p className="text-slate-600 text-xs mt-0.5">
                                                                    Expiry:{' '}
                                                                    {
                                                                        check.expiry
                                                                    }
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <Badge
                                                            text={
                                                                check.status ===
                                                                'verified'
                                                                    ? 'Verified'
                                                                    : 'Pending'
                                                            }
                                                            className={
                                                                check.status ===
                                                                'verified'
                                                                    ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                                                                    : 'bg-amber-100 text-amber-700 border-amber-200'
                                                            }
                                                        />
                                                    </motion.div>
                                                )
                                            }
                                        )}
                                    </div>
                                </div>
                            </Card>

                            {/* Enhanced Placement Programs */}
                            <Card
                                noPadding
                                className="border-0 shadow-xl overflow-hidden"
                            >
                                <div className="bg-gradient-to-r from-[#0D5468] to-[#044866] px-5 py-4">
                                    <div className="flex items-center justify-between text-white">
                                        <div className="flex items-center gap-2.5">
                                            <GraduationCap className="h-5 w-5" />
                                            <h3 className="font-semibold">
                                                Placement Programs
                                            </h3>
                                        </div>
                                        <Badge
                                            text={`${selectedRequirements.length} / ${placementRequirements.length}`}
                                            className="bg-white/20 text-white border-0"
                                        />
                                    </div>
                                </div>

                                <div className="p-6 space-y-4">
                                    <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
                                        <Info className="h-4 w-4 text-blue-600" />
                                        <p className="text-blue-900 text-sm">
                                            Select one or multiple requirements
                                            for this request
                                        </p>
                                    </div>

                                    <div className="space-y-3">
                                        {placementRequirements.map((req) => {
                                            const progress =
                                                (req.completed / req.total) *
                                                100
                                            return (
                                                <motion.div
                                                    key={req.id}
                                                    whileHover={{ scale: 1.01 }}
                                                    className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                                                        selectedRequirements.includes(
                                                            req.id
                                                        )
                                                            ? 'border-[#044866] bg-gradient-to-br from-[#044866]/5 to-[#044866]/10 shadow-md'
                                                            : 'border-slate-200 hover:border-slate-300 bg-white hover:shadow-sm'
                                                    }`}
                                                    onClick={() =>
                                                        toggleRequirement(
                                                            req.id
                                                        )
                                                    }
                                                >
                                                    <div className="flex items-start gap-3 mb-3">
                                                        <UICheckbox
                                                            checked={selectedRequirements.includes(
                                                                req.id
                                                            )}
                                                            className="mt-1"
                                                            onClick={(e) =>
                                                                e.stopPropagation()
                                                            }
                                                            onCheckedChange={() =>
                                                                toggleRequirement(
                                                                    req.id
                                                                )
                                                            }
                                                        />
                                                        <div className="flex-1">
                                                            <div className="flex items-center justify-between mb-1">
                                                                <p className="text-slate-900 font-semibold">
                                                                    {
                                                                        req.category
                                                                    }
                                                                </p>
                                                                <Badge
                                                                    outline
                                                                    text={`${req.completed} / ${req.total}`}
                                                                    className={`text-xs px-2 py-0.5 ${
                                                                        selectedRequirements.includes(
                                                                            req.id
                                                                        )
                                                                            ? 'border-[#044866] text-[#044866] bg-[#044866]/5'
                                                                            : 'border-slate-300 text-slate-600'
                                                                    }`}
                                                                />
                                                            </div>

                                                            <div className="space-y-1.5">
                                                                <div className="flex items-center justify-between text-xs">
                                                                    <span className="text-slate-600">
                                                                        Progress
                                                                    </span>
                                                                    <span className="font-medium text-slate-700">
                                                                        {Math.round(
                                                                            progress
                                                                        )}
                                                                        %
                                                                    </span>
                                                                </div>
                                                                <div className="relative h-2 bg-slate-200 rounded-full overflow-hidden">
                                                                    <motion.div
                                                                        initial={{
                                                                            width: 0,
                                                                        }}
                                                                        animate={{
                                                                            width: `${progress}%`,
                                                                        }}
                                                                        transition={{
                                                                            duration: 0.8,
                                                                            ease: 'easeOut',
                                                                        }}
                                                                        className={`h-full rounded-full ${
                                                                            progress ===
                                                                            100
                                                                                ? 'bg-gradient-to-r from-emerald-500 to-teal-500'
                                                                                : progress >=
                                                                                  50
                                                                                ? 'bg-gradient-to-r from-[#044866] to-[#0D5468]'
                                                                                : 'bg-gradient-to-r from-amber-400 to-amber-500'
                                                                        }`}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )
                                        })}
                                    </div>

                                    <Button
                                        outline
                                        variant="primaryNew"
                                        className="w-full border-2 border-[#044866]/20 text-[#044866] hover:bg-[#044866]/5 hover:border-[#044866]/40 h-10"
                                        onClick={() =>
                                            setShowPlacementReqDialog(true)
                                        }
                                        text="Add Placement Requirements"
                                    />
                                    <Button
                                        outline
                                        variant="secondary"
                                        Icon={Eye}
                                        text="View Full Requirements"
                                    />
                                </div>
                            </Card>

                            {/* Enhanced Student Preferences - Interactive Checklist */}
                            <Card
                                noPadding
                                className="border-0 shadow-xl overflow-hidden"
                            >
                                <div className="bg-gradient-to-r from-[#0D5468] to-[#044866] px-5 py-4">
                                    <div className="flex items-center justify-between text-white">
                                        <div className="flex items-center gap-2.5">
                                            <Briefcase className="h-5 w-5" />
                                            <div>
                                                <h3 className="font-semibold">
                                                    Student Workplace
                                                    Preferences
                                                </h3>
                                                <p className="text-white/80 text-xs mt-0.5">
                                                    Track preference matching
                                                    progress
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold">
                                                {verifiedPreferences.length}/20
                                            </div>
                                            <div className="text-xs text-white/80">
                                                Verified
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <Progressbar
                                            value={
                                                (verifiedPreferences.length /
                                                    20) *
                                                100
                                            }
                                            className="h-2 bg-white/20"
                                        />
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="space-y-3 mb-4">
                                        <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-[#044866]/20">
                                            <Sparkles className="h-4 w-4 text-[#044866] shrink-0" />
                                            <div className="flex-1">
                                                <p className="text-[#044866] text-sm font-medium">
                                                    Automatic Preference
                                                    Matching
                                                </p>
                                                <p className="text-[#0D5468] text-xs mt-0.5">
                                                    Preferences auto-verify as
                                                    you progress through the
                                                    workflow stages
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-lg border border-[#F7A619]/30">
                                            <Info className="h-4 w-4 text-[#F7A619] shrink-0" />
                                            <p className="text-amber-900 text-sm">
                                                You can also manually
                                                tick/untick preferences at any
                                                time
                                            </p>
                                        </div>
                                    </div>

                                    <Tabs defaultValue="all" className="w-full">
                                        <TabsList className="grid w-full grid-cols-4 mb-4">
                                            <TabsTrigger
                                                value="all"
                                                className="text-xs"
                                            >
                                                All ({studentPreferences.length}
                                                )
                                            </TabsTrigger>
                                            <TabsTrigger
                                                value="verified"
                                                className="text-xs"
                                            >
                                                Verified (
                                                {verifiedPreferences.length})
                                            </TabsTrigger>
                                            <TabsTrigger
                                                value="pending"
                                                className="text-xs"
                                            >
                                                Pending (
                                                {20 -
                                                    verifiedPreferences.length}
                                                )
                                            </TabsTrigger>
                                            <TabsTrigger
                                                value="guide"
                                                className="text-xs"
                                            >
                                                <Sparkles className="h-3 w-3 mr-1" />
                                                Guide
                                            </TabsTrigger>
                                        </TabsList>

                                        <TabsContent
                                            value="all"
                                            className="space-y-4"
                                        >
                                            {[
                                                'Location & Accessibility',
                                                'Schedule & Availability',
                                                'Workplace Preferences',
                                                'Learning & Development',
                                                'Skills & Capabilities',
                                                'Health & Wellbeing',
                                                'Additional Information',
                                            ].map((category) => {
                                                const categoryPrefs =
                                                    studentPreferences.filter(
                                                        (p) =>
                                                            p.category ===
                                                            category
                                                    )
                                                const categoryVerified =
                                                    categoryPrefs.filter((p) =>
                                                        verifiedPreferences.includes(
                                                            p.id
                                                        )
                                                    ).length

                                                return (
                                                    <Accordion
                                                        key={category}
                                                        type="single"
                                                        collapsible
                                                    >
                                                        <AccordionItem
                                                            value={category}
                                                            className="border-slate-200"
                                                        >
                                                            <AccordionTrigger className="hover:no-underline py-3 hover:bg-slate-50 px-3 rounded-lg transition-colors">
                                                                <div className="flex items-center justify-between w-full pr-3">
                                                                    <span className="text-slate-900 font-medium text-sm">
                                                                        {
                                                                            category
                                                                        }
                                                                    </span>
                                                                    <div className="flex items-center gap-2">
                                                                        <Badge
                                                                            text={`${categoryVerified}/${categoryPrefs.length}`}
                                                                            className={
                                                                                categoryVerified ===
                                                                                categoryPrefs.length
                                                                                    ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                                                                                    : 'bg-slate-100 text-slate-700 border-slate-200'
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </AccordionTrigger>
                                                            <AccordionContent>
                                                                <div className="space-y-2 pt-3">
                                                                    {categoryPrefs.map(
                                                                        (
                                                                            pref
                                                                        ) => {
                                                                            const isVerified =
                                                                                verifiedPreferences.includes(
                                                                                    pref.id
                                                                                )
                                                                            const isRecentlyVerified =
                                                                                recentlyVerified.includes(
                                                                                    pref.id
                                                                                )
                                                                            return (
                                                                                <motion.div
                                                                                    key={
                                                                                        pref.id
                                                                                    }
                                                                                    initial={{
                                                                                        opacity: 0,
                                                                                        x: -10,
                                                                                    }}
                                                                                    animate={{
                                                                                        opacity: 1,
                                                                                        x: 0,
                                                                                        scale: isRecentlyVerified
                                                                                            ? [
                                                                                                  1,
                                                                                                  1.02,
                                                                                                  1,
                                                                                              ]
                                                                                            : 1,
                                                                                    }}
                                                                                    transition={{
                                                                                        scale: {
                                                                                            duration: 0.5,
                                                                                            repeat: isRecentlyVerified
                                                                                                ? 2
                                                                                                : 0,
                                                                                        },
                                                                                    }}
                                                                                    className={`p-4 rounded-lg border-2 transition-all cursor-pointer relative overflow-hidden ${
                                                                                        isVerified
                                                                                            ? 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-300 shadow-sm'
                                                                                            : 'bg-gradient-to-br from-slate-50 to-slate-100/50 border-slate-200 hover:border-slate-300 hover:shadow-sm'
                                                                                    }`}
                                                                                    onClick={() =>
                                                                                        togglePreferenceVerification(
                                                                                            pref.id
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    {isRecentlyVerified && (
                                                                                        <motion.div
                                                                                            initial={{
                                                                                                opacity: 0,
                                                                                            }}
                                                                                            animate={{
                                                                                                opacity:
                                                                                                    [
                                                                                                        0,
                                                                                                        1,
                                                                                                        0,
                                                                                                    ],
                                                                                            }}
                                                                                            transition={{
                                                                                                duration: 2,
                                                                                                repeat: 1,
                                                                                            }}
                                                                                            className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-teal-400/20 to-emerald-400/20 pointer-events-none"
                                                                                        />
                                                                                    )}
                                                                                    <div className="flex items-start gap-3 relative z-10">
                                                                                        <UICheckbox
                                                                                            checked={
                                                                                                isVerified
                                                                                            }
                                                                                            className="mt-1"
                                                                                            onCheckedChange={() =>
                                                                                                togglePreferenceVerification(
                                                                                                    pref.id
                                                                                                )
                                                                                            }
                                                                                        />
                                                                                        <div className="flex-1">
                                                                                            <div className="flex items-start gap-2 mb-2">
                                                                                                <Badge
                                                                                                    text={`#${pref.id}`}
                                                                                                    className={
                                                                                                        isVerified
                                                                                                            ? 'bg-emerald-600 text-white border-0'
                                                                                                            : 'bg-[#044866] text-white border-0'
                                                                                                    }
                                                                                                />
                                                                                                <p className="text-slate-600 text-xs font-medium flex-1">
                                                                                                    {
                                                                                                        pref.question
                                                                                                    }
                                                                                                </p>
                                                                                                {isRecentlyVerified && (
                                                                                                    <motion.div
                                                                                                        initial={{
                                                                                                            scale: 0,
                                                                                                        }}
                                                                                                        animate={{
                                                                                                            scale: [
                                                                                                                0,
                                                                                                                1.2,
                                                                                                                1,
                                                                                                            ],
                                                                                                        }}
                                                                                                        className="shrink-0"
                                                                                                    >
                                                                                                        <Badge
                                                                                                            text="NEW"
                                                                                                            className="bg-[#F7A619] text-white border-0 text-[10px] px-2"
                                                                                                        />
                                                                                                    </motion.div>
                                                                                                )}
                                                                                            </div>
                                                                                            <p
                                                                                                className={`text-sm ml-0 ${
                                                                                                    isVerified
                                                                                                        ? 'text-emerald-900 font-medium'
                                                                                                        : 'text-slate-900'
                                                                                                }`}
                                                                                            >
                                                                                                {
                                                                                                    pref.answer
                                                                                                }
                                                                                            </p>
                                                                                            {isVerified && (
                                                                                                <motion.div
                                                                                                    initial={{
                                                                                                        opacity: 0,
                                                                                                        y: -5,
                                                                                                    }}
                                                                                                    animate={{
                                                                                                        opacity: 1,
                                                                                                        y: 0,
                                                                                                    }}
                                                                                                    className="flex items-center gap-1.5 mt-2 text-emerald-700"
                                                                                                >
                                                                                                    <CheckCircle2 className="h-3.5 w-3.5" />
                                                                                                    <span className="text-xs font-medium">
                                                                                                        {isRecentlyVerified
                                                                                                            ? 'Auto-verified'
                                                                                                            : 'Verified & Matched'}
                                                                                                    </span>
                                                                                                </motion.div>
                                                                                            )}
                                                                                        </div>
                                                                                    </div>
                                                                                </motion.div>
                                                                            )
                                                                        }
                                                                    )}
                                                                </div>
                                                            </AccordionContent>
                                                        </AccordionItem>
                                                    </Accordion>
                                                )
                                            })}
                                        </TabsContent>

                                        <TabsContent value="verified">
                                            <div className="space-y-2">
                                                {studentPreferences
                                                    .filter((p) =>
                                                        verifiedPreferences.includes(
                                                            p.id
                                                        )
                                                    )
                                                    .map((pref) => (
                                                        <motion.div
                                                            key={pref.id}
                                                            initial={{
                                                                opacity: 0,
                                                                scale: 0.95,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                                scale: 1,
                                                            }}
                                                            className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg border-2 border-emerald-300 shadow-sm cursor-pointer"
                                                            onClick={() =>
                                                                togglePreferenceVerification(
                                                                    pref.id
                                                                )
                                                            }
                                                        >
                                                            <div className="flex items-start gap-3">
                                                                <UICheckbox
                                                                    checked={
                                                                        true
                                                                    }
                                                                    className="mt-1"
                                                                    disabled
                                                                />
                                                                <div className="flex-1">
                                                                    <div className="flex items-start gap-2 mb-2">
                                                                        <Badge
                                                                            text={`#${pref.id}`}
                                                                            className="bg-emerald-600 text-white border-0 text-xs shrink-0"
                                                                        />
                                                                        <div className="flex-1">
                                                                            <p className="text-slate-600 text-xs font-medium mb-1">
                                                                                {
                                                                                    pref.question
                                                                                }
                                                                            </p>
                                                                            <Badge
                                                                                text={
                                                                                    pref.category
                                                                                }
                                                                                className="bg-emerald-100 text-emerald-700 border-emerald-200 text-[10px]"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <p className="text-sm text-emerald-900 font-medium">
                                                                        {
                                                                            pref.answer
                                                                        }
                                                                    </p>
                                                                    <div className="flex items-center gap-1.5 mt-2 text-emerald-700">
                                                                        <CheckCircle2 className="h-3.5 w-3.5" />
                                                                        <span className="text-xs font-medium">
                                                                            Verified
                                                                            &
                                                                            Matched
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                {verifiedPreferences.length ===
                                                    0 && (
                                                    <div className="text-center py-8 text-slate-500">
                                                        <Clock className="h-12 w-12 mx-auto mb-3 opacity-50" />
                                                        <p className="text-sm">
                                                            No preferences
                                                            verified yet
                                                        </p>
                                                        <p className="text-xs mt-1">
                                                            Start ticking off
                                                            preferences as they
                                                            are matched
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </TabsContent>

                                        <TabsContent value="pending">
                                            <div className="space-y-2">
                                                {studentPreferences
                                                    .filter(
                                                        (p) =>
                                                            !verifiedPreferences.includes(
                                                                p.id
                                                            )
                                                    )
                                                    .map((pref) => (
                                                        <motion.div
                                                            key={pref.id}
                                                            initial={{
                                                                opacity: 0,
                                                                scale: 0.95,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                                scale: 1,
                                                            }}
                                                            className="p-4 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-lg border-2 border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer"
                                                            onClick={() =>
                                                                togglePreferenceVerification(
                                                                    pref.id
                                                                )
                                                            }
                                                        >
                                                            <div className="flex items-start gap-3">
                                                                <UICheckbox
                                                                    checked={
                                                                        false
                                                                    }
                                                                    className="mt-1"
                                                                    disabled
                                                                />
                                                                <div className="flex-1">
                                                                    <div className="flex items-start gap-2 mb-2">
                                                                        <Badge
                                                                            text={`#${pref.id}`}
                                                                            className="bg-[#044866] text-white border-0 text-xs shrink-0"
                                                                        />
                                                                        <div className="flex-1">
                                                                            <p className="text-slate-600 text-xs font-medium mb-1">
                                                                                {
                                                                                    pref.question
                                                                                }
                                                                            </p>
                                                                            <Badge
                                                                                text={
                                                                                    pref.category
                                                                                }
                                                                                className="bg-slate-100 text-slate-700 border-slate-200 text-[10px]"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <p className="text-sm text-slate-900">
                                                                        {
                                                                            pref.answer
                                                                        }
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    ))}
                                                {verifiedPreferences.length ===
                                                    20 && (
                                                    <div className="text-center py-8 text-emerald-600">
                                                        <Award className="h-12 w-12 mx-auto mb-3" />
                                                        <p className="text-sm font-medium">
                                                            All preferences
                                                            verified!
                                                        </p>
                                                        <p className="text-xs mt-1">
                                                            Perfect workplace
                                                            match achieved
                                                        </p>
                                                    </div>
                                                )}
                                            </div>
                                        </TabsContent>

                                        <TabsContent value="guide">
                                            <div className="space-y-4">
                                                <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-[#044866]/20 rounded-xl">
                                                    <div className="flex items-start gap-3 mb-3">
                                                        <Sparkles className="h-5 w-5 text-[#044866] shrink-0 mt-0.5" />
                                                        <div>
                                                            <h4 className="text-[#044866] font-semibold mb-1">
                                                                Auto-Verification
                                                                Guide
                                                            </h4>
                                                            <p className="text-[#0D5468] text-sm">
                                                                Preferences are
                                                                automatically
                                                                verified as you
                                                                progress through
                                                                workflow stages
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-3">
                                                    <div className="p-4 bg-white rounded-lg border-2 border-slate-200">
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                                                                <FileText className="h-4 w-4 text-slate-600" />
                                                            </div>
                                                            <div className="flex-1">
                                                                <h5 className="text-slate-900 font-semibold text-sm">
                                                                    Request
                                                                    Generated
                                                                </h5>
                                                                <p className="text-slate-600 text-xs">
                                                                    5
                                                                    preferences
                                                                    verified
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="text-xs text-slate-700 space-y-1">
                                                            <p>
                                                                • Previous
                                                                healthcare
                                                                experience
                                                            </p>
                                                            <p>
                                                                • Medical
                                                                conditions
                                                            </p>
                                                            <p>
                                                                • Allergies &
                                                                dietary
                                                                requirements
                                                            </p>
                                                            <p>
                                                                • Cultural
                                                                considerations
                                                            </p>
                                                            <p>
                                                                • Talent pool
                                                                enrollment
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="p-4 bg-white rounded-lg border-2 border-[#044866]/20">
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <div className="w-8 h-8 rounded-lg bg-[#044866]/10 flex items-center justify-center">
                                                                <Building2 className="h-4 w-4 text-[#044866]" />
                                                            </div>
                                                            <div className="flex-1">
                                                                <h5 className="text-[#044866] font-semibold text-sm">
                                                                    Waiting for
                                                                    Student
                                                                </h5>
                                                                <p className="text-[#0D5468] text-xs">
                                                                    3
                                                                    preferences
                                                                    verified
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="text-xs text-slate-700 space-y-1">
                                                            <p>
                                                                • Special
                                                                interests in
                                                                aged care
                                                            </p>
                                                            <p>
                                                                • Specific
                                                                learning
                                                                objectives
                                                            </p>
                                                            <p>
                                                                • Career goals
                                                                post-qualification
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="p-4 bg-white rounded-lg border-2 border-slate-200">
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                                                                <User className="h-4 w-4 text-slate-600" />
                                                            </div>
                                                            <div className="flex-1">
                                                                <h5 className="text-slate-900 font-semibold text-sm">
                                                                    Waiting for
                                                                    RTO
                                                                </h5>
                                                                <p className="text-slate-600 text-xs">
                                                                    6
                                                                    preferences
                                                                    verified
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="text-xs text-slate-700 space-y-1">
                                                            <p>
                                                                • Preferred
                                                                workplace
                                                                location
                                                            </p>
                                                            <p>
                                                                • Preferred
                                                                commute method
                                                            </p>
                                                            <p>
                                                                • Access to own
                                                                transport
                                                            </p>
                                                            <p>
                                                                • Regional area
                                                                willingness
                                                            </p>
                                                            <p>
                                                                • Desired
                                                                workplace type
                                                            </p>
                                                            <p>
                                                                • Preferred
                                                                facility size
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="p-4 bg-white rounded-lg border-2 border-[#0D5468]/20">
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <div className="w-8 h-8 rounded-lg bg-[#0D5468]/10 flex items-center justify-center">
                                                                <CalendarCheck className="h-4 w-4 text-[#0D5468]" />
                                                            </div>
                                                            <div className="flex-1">
                                                                <h5 className="text-[#0D5468] font-semibold text-sm">
                                                                    Appointment
                                                                </h5>
                                                                <p className="text-[#0D5468] text-xs">
                                                                    4
                                                                    preferences
                                                                    verified
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="text-xs text-slate-700 space-y-1">
                                                            <p>
                                                                • Availability
                                                                for placement
                                                            </p>
                                                            <p>
                                                                • Preferred
                                                                shift type
                                                            </p>
                                                            <p>
                                                                • Flexibility
                                                                for weekend work
                                                            </p>
                                                            <p>
                                                                • Current
                                                                employment
                                                                status
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="p-4 bg-white rounded-lg border-2 border-emerald-200">
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                                                                <FileCheck className="h-4 w-4 text-emerald-600" />
                                                            </div>
                                                            <div className="flex-1">
                                                                <h5 className="text-emerald-900 font-semibold text-sm">
                                                                    Agreement
                                                                    Signed
                                                                </h5>
                                                                <p className="text-emerald-700 text-xs">
                                                                    2
                                                                    preferences
                                                                    verified
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="text-xs text-slate-700 space-y-1">
                                                            <p>
                                                                • Technology
                                                                proficiency
                                                                level
                                                            </p>
                                                            <p>
                                                                • Language
                                                                skills
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg border-2 border-emerald-300">
                                                        <div className="flex items-center gap-2 mb-3">
                                                            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                                                                <Award className="h-4 w-4 text-white" />
                                                            </div>
                                                            <div className="flex-1">
                                                                <h5 className="text-emerald-900 font-semibold text-sm">
                                                                    Placement
                                                                    Started /
                                                                    Completed
                                                                </h5>
                                                                <p className="text-emerald-700 text-xs">
                                                                    All 20
                                                                    preferences
                                                                    verified
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <p className="text-xs text-emerald-800">
                                                            All student
                                                            workplace
                                                            preferences
                                                            confirmed and
                                                            matched with the
                                                            placement facility
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </TabsContent>
                                    </Tabs>
                                </div>
                            </Card>
                        </motion.div>

                        {/* Right Panel - Enhanced Industry Workflow */}
                        <motion.div
                            ref={rightPanelRef}
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            className={`space-y-7 ${
                                rightPanelSticky
                                    ? 'sticky top-24 self-start'
                                    : ''
                            }`}
                        >
                            {/* Industry Match Validation - Shown from workflow start through completion */}
                            {((workplaceType === 'needs' &&
                                currentStatus !== 'Student Added') ||
                                (workplaceType === 'provided' &&
                                    ![
                                        'Student Added',
                                        'Provided Workplace Request',
                                    ].includes(currentStatus))) && (
                                <Card
                                    noPadding
                                    className="border-0 shadow-2xl shadow-emerald-200/50 overflow-hidden hover:shadow-3xl transition-shadow duration-500"
                                >
                                    <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 px-6 py-5 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
                                        <div className="relative flex items-center gap-3 text-white">
                                            <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                                                <CheckCircle2 className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-lg">
                                                    Industry Match Validation
                                                </h3>
                                                <p className="text-white/90 text-sm mt-0.5">
                                                    19 criteria automatically
                                                    validated
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-5">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className="text-sm text-slate-700">
                                                Match Score
                                            </span>
                                            <Badge
                                                text={'18/19 Criteria Met'}
                                                className="bg-emerald-100 text-emerald-700 border-emerald-200"
                                            ></Badge>
                                        </div>
                                        <Progressbar
                                            value={94.7}
                                            className="h-3"
                                        />
                                        <p className="text-xs text-slate-500 mt-2">
                                            Excellent match based on location,
                                            availability, and learning
                                            objectives
                                        </p>
                                    </div>
                                </Card>
                            )}

                            {/* Enhanced Industry Details */}
                            {showIndustryDetails && (
                                <Card
                                    noPadding
                                    className="border-0 shadow-xl overflow-hidden"
                                >
                                    <div className="bg-gradient-to-r from-[#044866] to-[#0D5468] px-5 py-4">
                                        <div className="flex items-center gap-2.5 text-white">
                                            <Building2 className="h-5 w-5" />
                                            <h3 className="font-semibold">
                                                Matched Industry
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex items-center gap-4 mb-5">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#044866] to-[#0D5468] flex items-center justify-center shadow-lg">
                                                <Building2 className="h-6 w-6 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-[#044866] font-semibold text-lg">
                                                    {selectedIndustry}
                                                </h4>
                                                <p className="text-slate-600 text-sm">
                                                    Verified Industry Partner
                                                </p>
                                            </div>
                                            {workplaceType === 'provided' && (
                                                <div>
                                                    {proofSkipped ? (
                                                        <Badge
                                                            text="Proof Pending"
                                                            Icon={AlertCircle}
                                                            outline
                                                            className="border-amber-300 text-amber-700 bg-amber-50"
                                                        />
                                                    ) : (
                                                        <Badge
                                                            text="Proof Verified"
                                                            Icon={FileCheck}
                                                            className="bg-emerald-100 text-emerald-700 border-emerald-200"
                                                        />
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        <Separator className="my-4" />

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-3 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-lg">
                                                <p className="text-slate-600 text-xs mb-1">
                                                    Location
                                                </p>
                                                <p className="text-slate-900 font-medium">
                                                    Fitzroy, VIC 3065
                                                </p>
                                            </div>
                                            <div className="p-3 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-lg">
                                                <p className="text-slate-600 text-xs mb-1">
                                                    Distance
                                                </p>
                                                <p className="text-slate-900 font-medium">
                                                    8.5 km
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-4 space-y-3">
                                            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200">
                                                <User className="h-4 w-4 text-[#044866]" />
                                                <div>
                                                    <p className="text-slate-600 text-xs">
                                                        Contact Person
                                                    </p>
                                                    <p className="text-slate-900 font-medium text-sm">
                                                        Dr. Michael Chen
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200">
                                                <Mail className="h-4 w-4 text-[#044866]" />
                                                <div>
                                                    <p className="text-slate-600 text-xs">
                                                        Email
                                                    </p>
                                                    <p className="text-slate-900 font-medium text-sm">
                                                        m.chen@svh.org.au
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            )}

                            {/* Premium Current Actions Card */}
                            <Card
                                noPadding
                                className="border-0 shadow-2xl shadow-slate-200/50 overflow-hidden hover:shadow-3xl transition-shadow duration-500"
                            >
                                <div className="bg-gradient-to-r from-[#0D5468] via-[#044866] to-[#0D5468] px-6 py-5 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
                                    <div className="relative flex items-center gap-3 text-white">
                                        <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                                            <Target className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg">
                                                Current Stage Actions
                                            </h3>
                                            <p className="text-white/80 text-sm">
                                                Take action to progress
                                                placement
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-7">{getStatusActions()}</div>
                            </Card>

                            {/* Find Workplace Section - Only shown when Request Generated */}
                            {currentStatus === 'Request Generated' && (
                                <FindWorkplaceSection
                                    isExpanded={showFindWorkplaceSection}
                                    onToggle={() =>
                                        setShowFindWorkplaceSection(
                                            !showFindWorkplaceSection
                                        )
                                    }
                                />
                            )}

                            {/* Enhanced Highlighted Tasks */}
                            <Card
                                noPadding
                                className="border-0 shadow-xl overflow-hidden"
                            >
                                <div className="bg-gradient-to-r from-[#F7A619] to-[#F7A619]/80 px-5 py-4">
                                    <div className="flex items-center gap-2.5 text-white">
                                        <Zap className="h-5 w-5" />
                                        <h3 className="font-semibold">
                                            Highlighted Tasks
                                        </h3>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="space-y-3">
                                        {highlightedTasks.map((task, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{
                                                    delay: index * 0.05,
                                                }}
                                                className="flex flex-col gap-3 p-4 rounded-lg border border-slate-200 hover:border-[#F7A619]/30 hover:bg-orange-50/30 transition-all"
                                            >
                                                <div className="flex items-start gap-3">
                                                    <div className="p-1 bg-[#F7A619]/10 rounded-lg flex-shrink-0 mt-0.5">
                                                        <ChevronRight className="h-4 w-4 text-[#F7A619]" />
                                                    </div>
                                                    <span className="text-slate-700 text-sm leading-relaxed flex-1">
                                                        {task}
                                                    </span>
                                                </div>

                                                {confirmedTasks[index] ? (
                                                    <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-200">
                                                        <CheckCircle2 className="h-3.5 w-3.5" />
                                                        <span className="font-medium">
                                                            Confirmed
                                                        </span>
                                                        <span className="text-slate-500 mx-1">
                                                            •
                                                        </span>
                                                        <span className="text-slate-600">
                                                            {
                                                                confirmedTasks[
                                                                    index
                                                                ].date
                                                            }
                                                        </span>
                                                        <span className="text-slate-500 mx-1">
                                                            •
                                                        </span>
                                                        <span className="text-slate-600">
                                                            {
                                                                confirmedTasks[
                                                                    index
                                                                ].person
                                                            }
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <Button
                                                        outline
                                                        variant="primary"
                                                        className="w-full h-9 border-[#F7A619]/30 text-[#F7A619] hover:bg-[#F7A619] hover:text-white hover:border-[#F7A619]"
                                                        onClick={() =>
                                                            confirmTaskWithWorkplace(
                                                                index
                                                            )
                                                        }
                                                        Icon={CheckCircle2}
                                                        text="Confirm with Workplace"
                                                    />
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </Card>

                            {/* Enhanced RTO Requirements */}
                            <Card
                                noPadding
                                className="border-0 shadow-xl overflow-hidden"
                            >
                                <div className="bg-gradient-to-r from-violet-600 to-purple-600 px-5 py-4">
                                    <div className="flex items-center gap-2.5 text-white">
                                        <ClipboardCheck className="h-5 w-5" />
                                        <h3 className="font-semibold">
                                            RTO Extra Requirements
                                        </h3>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="space-y-3">
                                        {rtoExtraRequirements.map(
                                            (req, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{
                                                        opacity: 0,
                                                        x: -20,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        x: 0,
                                                    }}
                                                    transition={{
                                                        delay: index * 0.05,
                                                    }}
                                                    className="flex flex-col gap-3 p-4 rounded-lg border border-slate-200 hover:border-violet-300 hover:bg-violet-50/30 transition-all"
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <div className="p-1 bg-violet-100 rounded-lg flex-shrink-0 mt-0.5">
                                                            <CheckCircle2 className="h-4 w-4 text-violet-600" />
                                                        </div>
                                                        <span className="text-slate-700 text-sm leading-relaxed flex-1">
                                                            {req}
                                                        </span>
                                                    </div>

                                                    {confirmedRtoReqs[index] ? (
                                                        <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-200">
                                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                                            <span className="font-medium">
                                                                Confirmed
                                                            </span>
                                                            <span className="text-slate-500 mx-1">
                                                                •
                                                            </span>
                                                            <span className="text-slate-600">
                                                                {
                                                                    confirmedRtoReqs[
                                                                        index
                                                                    ].date
                                                                }
                                                            </span>
                                                            <span className="text-slate-500 mx-1">
                                                                •
                                                            </span>
                                                            <span className="text-slate-600">
                                                                {
                                                                    confirmedRtoReqs[
                                                                        index
                                                                    ].person
                                                                }
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        <Button
                                                            outline
                                                            variant="primary"
                                                            className="w-full h-9 border-violet-300 text-violet-600 hover:bg-violet-600 hover:text-white hover:border-violet-600"
                                                            onClick={() =>
                                                                confirmRtoReqWithWorkplace(
                                                                    index
                                                                )
                                                            }
                                                            Icon={CheckCircle2}
                                                            text="Confirm with Workplace"
                                                        />
                                                    )}
                                                </motion.div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </Card>

                            {/* Enhanced Status Notes */}
                            <Card
                                noPadding
                                className="border-0 shadow-xl overflow-hidden"
                            >
                                <div className="bg-gradient-to-r from-[#044866] to-[#0D5468] px-5 py-4">
                                    <div className="flex items-center gap-2.5 text-white">
                                        <ClipboardCheck className="h-5 w-5" />
                                        <h3 className="font-semibold">
                                            Status Check Notes
                                        </h3>
                                    </div>
                                    <p className="text-white/80 text-xs mt-1">
                                        Complete audit trail of status changes
                                    </p>
                                </div>

                                <div className="p-6">
                                    <ScrollArea className="max-h-96">
                                        <div className="space-y-3 pr-3">
                                            {statusNotes.map((note, index) => {
                                                const isManualNote =
                                                    note.status ===
                                                    'Manual Note'
                                                const isQuickAction = [
                                                    'On Hold',
                                                    'Cancelled',
                                                    'Terminated',
                                                ].includes(note.status)
                                                const isAppointmentMissed =
                                                    note.status ===
                                                    'Appointment Missed'

                                                return (
                                                    <motion.div
                                                        key={index}
                                                        initial={{
                                                            opacity: 0,
                                                            x: -20,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            x: 0,
                                                        }}
                                                        transition={{
                                                            delay: index * 0.05,
                                                        }}
                                                        className={`relative p-4 rounded-xl border-l-4 shadow-sm hover:shadow-md transition-all ${
                                                            isManualNote
                                                                ? 'bg-gradient-to-br from-blue-50 to-indigo-50/50 border-blue-500'
                                                                : isAppointmentMissed
                                                                ? 'bg-gradient-to-br from-red-50 to-rose-50/50 border-red-500'
                                                                : isQuickAction
                                                                ? 'bg-gradient-to-br from-amber-50 to-orange-50/50 border-amber-500'
                                                                : 'bg-gradient-to-br from-slate-50 to-blue-50/50 border-[#044866]'
                                                        }`}
                                                    >
                                                        <div className="flex items-start justify-between mb-3">
                                                            <Badge
                                                                text={
                                                                    note.status
                                                                }
                                                                Icon={
                                                                    isManualNote
                                                                        ? MessageSquare
                                                                        : isAppointmentMissed
                                                                        ? Flag
                                                                        : undefined
                                                                }
                                                                className={`border-0 shadow-sm ${
                                                                    isManualNote
                                                                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                                                                        : isAppointmentMissed
                                                                        ? 'bg-gradient-to-r from-red-500 to-rose-500 text-white'
                                                                        : isQuickAction
                                                                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white'
                                                                        : 'bg-gradient-to-r from-[#044866] to-[#0D5468] text-white'
                                                                }`}
                                                            />
                                                            <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                                                                <Clock className="h-3 w-3" />
                                                                {note.timestamp}
                                                            </div>
                                                        </div>
                                                        <p className="text-slate-900 text-sm leading-relaxed">
                                                            {note.note}
                                                        </p>
                                                        <div
                                                            className={`flex items-center gap-2 mt-3 pt-3 border-t ${
                                                                isManualNote
                                                                    ? 'border-blue-200'
                                                                    : isAppointmentMissed
                                                                    ? 'border-red-200'
                                                                    : isQuickAction
                                                                    ? 'border-amber-200'
                                                                    : 'border-slate-200'
                                                            }`}
                                                        >
                                                            <div
                                                                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                                                    isManualNote
                                                                        ? 'bg-blue-500/10'
                                                                        : isAppointmentMissed
                                                                        ? 'bg-red-500/10'
                                                                        : isQuickAction
                                                                        ? 'bg-amber-500/10'
                                                                        : 'bg-[#044866]/10'
                                                                }`}
                                                            >
                                                                <User
                                                                    className={`h-3 w-3 ${
                                                                        isManualNote
                                                                            ? 'text-blue-600'
                                                                            : isAppointmentMissed
                                                                            ? 'text-red-600'
                                                                            : isQuickAction
                                                                            ? 'text-amber-600'
                                                                            : 'text-[#044866]'
                                                                    }`}
                                                                />
                                                            </div>
                                                            <span className="text-slate-600 text-xs">
                                                                By:{' '}
                                                                <span className="font-medium text-slate-900">
                                                                    {note.user}
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </motion.div>
                                                )
                                            })}
                                        </div>
                                    </ScrollArea>
                                </div>
                            </Card>
                        </motion.div>

                        {/* Right Panel - Industry Information & Workflow */}
                        <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            className="space-y-7"
                        >
                            {showIndustryDetails && (
                                <>
                                    {/* Industry Match Card */}
                                    <Card
                                        noPadding
                                        className="border-0 shadow-xl overflow-hidden bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/30 backdrop-blur-sm"
                                    >
                                        <div className="relative p-5">
                                            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#0D5468]/10 to-transparent rounded-full -mr-24 -mt-24" />

                                            <div className="relative">
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0D5468] to-[#044866] flex items-center justify-center text-white shadow-lg ring-2 ring-white">
                                                            <Building2 className="h-5 w-5" />
                                                        </div>
                                                        <div>
                                                            <h3 className="text-[#044866] font-semibold">
                                                                St Vincent's
                                                                Hospital
                                                            </h3>
                                                            <p className="text-slate-600 text-xs">
                                                                Aged Care Unit,
                                                                Fitzroy
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <Badge
                                                        text="Matched"
                                                        className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 shadow-sm"
                                                    />
                                                </div>

                                                {/* Distance Section */}
                                                <div className="p-4 bg-white rounded-xl border border-slate-200 mb-3">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div className="flex items-center gap-2">
                                                            <MapPin className="h-4 w-4 text-[#F7A619]" />
                                                            <span className="text-slate-900 font-semibold">
                                                                Distance
                                                            </span>
                                                        </div>
                                                        <span className="text-[#044866] font-bold text-lg">
                                                            8.5 km
                                                        </span>
                                                    </div>
                                                    <Button
                                                        className="w-full bg-gradient-to-r from-[#F7A619] to-[#F7A619]/90 hover:from-[#F7A619]/90 hover:to-[#F7A619] text-white h-10"
                                                        onClick={() => {
                                                            // Opening map view...
                                                            // Map functionality would go here
                                                        }}
                                                    >
                                                        <MapPinned className="h-4 w-4 mr-2" />
                                                        View Map
                                                    </Button>
                                                    <p className="text-xs text-slate-500 mt-2 text-center">
                                                        41 Victoria Parade,
                                                        Fitzroy VIC 3065
                                                    </p>
                                                </div>

                                                {/* Contact Information */}
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-slate-200">
                                                        <User className="h-4 w-4 text-[#044866]" />
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-[10px] text-slate-500">
                                                                Contact Person
                                                            </p>
                                                            <p className="text-xs text-slate-900 font-medium truncate">
                                                                Margaret Chen
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-slate-200">
                                                        <Phone className="h-4 w-4 text-[#044866]" />
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-[10px] text-slate-500">
                                                                Phone
                                                            </p>
                                                            <p className="text-xs text-slate-900 font-medium">
                                                                03 9288 2211
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="flex items-center gap-2 p-3 bg-white rounded-lg border border-slate-200">
                                                        <Mail className="h-4 w-4 text-[#044866]" />
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-[10px] text-slate-500">
                                                                Email
                                                            </p>
                                                            <p className="text-xs text-slate-900 font-medium truncate">
                                                                placements@svhm.org.au
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>

                                    {/* Quick Actions */}
                                    <Card
                                        noPadding
                                        className="border-0 shadow-xl overflow-hidden"
                                    >
                                        <div className="bg-gradient-to-r from-[#044866] to-[#0D5468] px-5 py-4">
                                            <div className="flex items-center gap-2.5 text-white">
                                                <Zap className="h-5 w-5" />
                                                <h3 className="font-semibold">
                                                    Quick Actions
                                                </h3>
                                            </div>
                                        </div>

                                        <div className="p-5 space-y-3">
                                            <Button
                                                outline
                                                className="w-full border-2 border-[#044866]/20 hover:border-[#044866] hover:bg-[#044866]/5 h-11"
                                                onClick={() => {
                                                    // Switching to student profile...
                                                    // Navigation functionality would go here
                                                }}
                                            >
                                                <User className="h-4 w-4 mr-2" />
                                                Switch to Student Profile
                                            </Button>

                                            <Button
                                                outline
                                                variant="secondary"
                                                className="w-full border-2 border-slate-200 hover:border-slate-300 h-11"
                                                Icon={Mail}
                                                text="Email All Parties"
                                            />
                                        </div>
                                    </Card>
                                </>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Appointment Modal */}
            <AppointmentModal
                open={showAppointmentDialog}
                onClose={() => setShowAppointmentDialog(false)}
                appointmentDate={appointmentDate}
                onAppointmentDateChange={setAppointmentDate}
                onConfirm={handleBookAppointment}
            />

            {/* Agreement Modal */}
            <AgreementModal
                open={showAgreementDialog}
                onClose={() => setShowAgreementDialog(false)}
                onConfirm={handleAgreementSigned}
            />

            {/* Schedule Modal */}
            <ScheduleModal
                open={showScheduleDialog}
                onClose={() => setShowScheduleDialog(false)}
                startDate={scheduleStartDate}
                endDate={scheduleEndDate}
                onStartDateChange={setScheduleStartDate}
                onEndDateChange={setScheduleEndDate}
                onConfirm={handleScheduleConfirmed}
            />

            {/* Rejection Modal */}
            <RejectionModal
                open={showRejectionDialog}
                onClose={() => setShowRejectionDialog(false)}
                reason={rejectionReason}
                onReasonChange={setRejectionReason}
                onConfirm={handleSubmitRejection}
            />

            {/* Status Notes Modal */}
            <StatusNotesModal
                open={showStatusNotesDialog}
                onClose={() => setShowStatusNotesDialog(false)}
                currentStatus={currentStatus}
                pendingStatus={pendingStatus}
                note={statusNote}
                onNoteChange={setStatusNote}
                onConfirm={confirmStatusChange}
            />

            {/* Placement Programs Modal */}
            <PlacementProgramsModal
                open={showPlacementReqDialog}
                onClose={() => setShowPlacementReqDialog(false)}
                placementRequirements={placementRequirements}
                selectedRequirements={selectedRequirements}
            />

            {/* Provided Workplace Search Modal */}
            <ProvidedWorkplaceModal
                open={showProvidedWorkplaceDialog}
                onClose={() => {
                    setShowProvidedWorkplaceDialog(false)
                    setIndustryFound(null)
                    setAbnSearch('')
                    setNewIndustryForm({
                        industryName: '',
                        abn: '',
                        businessAddress: '',
                        website: '',
                        contactName: '',
                        contactPhone: '',
                        contactEmail: '',
                        offeredCourses: 'cert3-nursing',
                        additionalInfo: '',
                    })
                    setFormErrors({})
                }}
                abnSearch={abnSearch}
                onAbnSearchChange={setAbnSearch}
                industryFound={industryFound}
                onIndustryFoundChange={setIndustryFound}
                newIndustryForm={newIndustryForm}
                onNewIndustryFormChange={setNewIndustryForm}
                formErrors={formErrors}
                onFormErrorsChange={setFormErrors}
                onSearch={handleSearchIndustry}
                onSubmitNewIndustry={handleSubmitNewIndustry}
                onContinueToProof={() => {
                    setShowProvidedWorkplaceDialog(false)
                    setShowProofUploadDialog(true)
                }}
                formatABN={formatABN}
            />

            {/* Proof of Employment Upload Modal */}
            <ProofUploadModal
                open={showProofUploadDialog}
                onClose={() => {
                    setShowProofUploadDialog(false)
                    setProofFile(null)
                }}
                proofFile={proofFile}
                onProofFileChange={setProofFile}
                onSubmit={handleSubmitProof}
                onSkip={handleSkipProof}
            />

            {/* Cancel Request Modal */}
            <CancelRequestModal
                open={showCancelDialog}
                onClose={() => {
                    setShowCancelDialog(false)
                    setCancellationReason('')
                }}
                cancellationReason={cancellationReason}
                onCancellationReasonChange={setCancellationReason}
                onConfirm={handleCancelRequest}
            />

            {/* Manual Note Modal */}
            <ManualNoteModal
                open={showManualNoteDialog}
                onClose={() => {
                    setShowManualNoteDialog(false)
                    setNewManualNote('')
                }}
                note={newManualNote}
                onNoteChange={setNewManualNote}
                onConfirm={handleAddManualNote}
            />

            {/* Quick Actions Modal */}
            <QuickActionsModal
                open={showQuickActionsDialog}
                onClose={() => {
                    setShowQuickActionsDialog(false)
                    setQuickActionReason('')
                    setSelectedQuickAction('')
                }}
                selectedAction={selectedQuickAction}
                reason={quickActionReason}
                onReasonChange={setQuickActionReason}
                onConfirm={handleSubmitQuickAction}
            />
        </div>
    )
}
