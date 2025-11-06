import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AddNoteModal } from './components/AddNoteModal'
import { AIQuestionPanel } from './components/AIQuestionPanel'
import { CommandPalette, CommandPaletteHint } from './components/CommandPalette'
import { CreateTicketModal } from './components/CreateTicketModal'
import { EmptySearchState } from './components/EmptySearchState'
import { EnhancedStudentProfile } from './components/EnhancedStudentProfile'
import { FloatingAIButton } from './components/FloatingAIButton'
import { ProfileBreadcrumb } from './components/ProfileBreadcrumb'
import { StudentQuickPreview } from './components/StudentQuickPreview'
import { Student, StudentSearchBar } from './components/StudentSearchBar'
import { SuccessAnimation } from './components/SuccessAnimation'
import { Workplace } from './components/WorkplaceSection'
// import { Button } from './components/ui/button'
// import { Avatar, AvatarImage, AvatarFallback } from './components/ui/avatar'
import { Button } from '@components'
import { ArrowLeft, Sparkles, Zap } from 'lucide-react'

// Mock Students Database
const mockStudents: Student[] = [
    {
        id: '1',
        name: 'Maxwell Jude Ross',
        email: 'maxwell.ross@example.com',
        studentId: 'ST-2024-0847',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maxwell',
        course: 'Certificate III in Community Services',
    },
    {
        id: '2',
        name: 'Sarah Martinez',
        email: 'sarah.martinez@example.com',
        studentId: 'ST-2024-0921',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        course: 'Certificate IV in Business',
    },
    {
        id: '3',
        name: 'James Chen',
        email: 'james.chen@example.com',
        studentId: 'ST-2024-0756',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
        course: 'Diploma of Information Technology',
    },
    {
        id: '4',
        name: 'Emily Thompson',
        email: 'emily.thompson@example.com',
        studentId: 'ST-2024-0834',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
        course: 'Certificate III in Community Services',
    },
    {
        id: '5',
        name: 'David Kumar',
        email: 'david.kumar@example.com',
        studentId: 'ST-2024-0698',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
        course: 'Certificate IV in Project Management',
    },
]

// Mock Workplaces Database - Different scenarios for each student
const mockWorkplaces: Record<string, Workplace[]> = {
    // Scenario 1: Maxwell - No workplace added yet
    '1': [],

    // Scenario 2: Sarah - One workplace added
    '2': [
        {
            id: 'w1',
            organizationName: 'Acme Corp Ltd',
            industry: 'Community Services Provider',
            supervisor: 'Jane Wilson',
            email: 'jane.wilson@acmecorp.com',
            phone: '+61 3 9876 5432',
            address: '123 Main St, Melbourne VIC 3000',
            courses: ['Certificate IV in Business'],
            status: 'active',
            startDate: 'Oct 20, 2024',
            endDate: 'Dec 12, 2024',
            hoursCompleted: 48,
            totalHours: 120,
        },
    ],

    // Scenario 3: James - Multiple workplaces (one completed, one active)
    '3': [
        {
            id: 'w2',
            organizationName: 'TechStart Solutions',
            industry: 'Technology & Software',
            supervisor: 'Michael Brown',
            email: 'm.brown@techstart.com.au',
            phone: '+61 3 8765 4321',
            address: '456 Tech Park, Sydney NSW 2000',
            courses: ['Diploma of Information Technology'],
            status: 'active',
            startDate: 'Sep 15, 2024',
            endDate: 'Nov 30, 2024',
            hoursCompleted: 65,
            totalHours: 120,
        },
        {
            id: 'w3',
            organizationName: 'Digital Innovation Hub',
            industry: 'Education & Training',
            supervisor: 'Lisa Anderson',
            email: 'l.anderson@digihub.edu.au',
            phone: '+61 3 5555 1234',
            address: '789 Innovation Way, Melbourne VIC 3001',
            courses: ['Diploma of Information Technology'],
            status: 'completed',
            startDate: 'Jun 1, 2024',
            endDate: 'Aug 30, 2024',
            hoursCompleted: 120,
            totalHours: 120,
        },
    ],

    // Emily - Multiple workplaces for multiple courses
    '4': [
        {
            id: 'w4',
            organizationName: 'Care Community Services',
            industry: 'Healthcare & Community Services',
            supervisor: 'Patricia Green',
            email: 'p.green@careservices.org.au',
            phone: '+61 3 9999 8888',
            address: '321 Care St, Brisbane QLD 4000',
            courses: ['Certificate III in Community Services'],
            status: 'active',
            startDate: 'Oct 1, 2024',
            endDate: 'Dec 20, 2024',
            hoursCompleted: 35,
            totalHours: 100,
        },
        {
            id: 'w5',
            organizationName: 'Youth Support Network',
            industry: 'Youth & Family Services',
            supervisor: 'Robert Taylor',
            email: 'r.taylor@youthsupport.org.au',
            phone: '+61 3 7777 6666',
            address: '555 Youth Way, Brisbane QLD 4001',
            courses: [
                'Certificate III in Community Services',
                'Certificate IV in Youth Work',
            ],
            status: 'pending',
            startDate: 'Nov 15, 2024',
        },
    ],

    // David - Single workplace
    '5': [
        {
            id: 'w6',
            organizationName: 'Global Projects Inc',
            industry: 'Project Management & Consulting',
            supervisor: 'Amanda White',
            email: 'a.white@globalprojects.com.au',
            phone: '+61 3 4444 3333',
            address: '888 Business Plaza, Perth WA 6000',
            courses: ['Certificate IV in Project Management'],
            status: 'active',
            startDate: 'Sep 1, 2024',
            endDate: 'Nov 30, 2024',
            hoursCompleted: 80,
            totalHours: 120,
        },
    ],
}

// Mock AI responses based on common questions
const getAIResponse = (question: string, studentName: string): string => {
    const lowerQuestion = question.toLowerCase()

    if (
        lowerQuestion.includes('status') ||
        lowerQuestion.includes('placement')
    ) {
        return `${studentName} is currently in the "Agreement Eligibility Pending" stage. The host site (Acme Corp Ltd) approved the placement agreement on September 28th, but we're waiting for the student to complete their e-signature. Two shifts are already scheduled for next week (Tuesday 14:00-18:00 and Thursday 09:00-17:00). Overall, the placement is on track with no critical blockers.`
    }

    if (lowerQuestion.includes('blocker') || lowerQuestion.includes('issue')) {
        return `The only current blocker is the outstanding student e-signature on the placement agreement. The document was sent on October 1st and expires on October 15th. The host has already approved their portion, so we're just waiting on the student's action. I recommend sending a reminder email and following up with a phone call if there's no response within 48 hours.`
    }

    if (
        lowerQuestion.includes('next action') ||
        lowerQuestion.includes('what should')
    ) {
        return `Here are the recommended next actions:\n\n1. Send an e-sign reminder to ${studentName} (high priority - expires Oct 15)\n2. Confirm onboarding details with the industry partner at Acme Corp\n3. Follow up on the two scheduled shifts for next week to ensure the student is prepared\n4. Schedule a check-in call before the first shift on Tuesday\n\nThe coordinator responsible is Julie Smith.`
    }

    if (
        lowerQuestion.includes('appointment') ||
        lowerQuestion.includes('shift') ||
        lowerQuestion.includes('when')
    ) {
        return `${studentName} has the following upcoming commitments:\n\n• Next shift: Tuesday, October 8th at 14:00-18:00 (4 hours) at Reception Desk\n• Second shift: Thursday, October 10th at 09:00-17:00 (8 hours) at Admin Office\n• Workplace visit: October 15th at 10:00 AM for progress check\n• Student check-in: October 22nd at 2:00 PM (virtual meeting)\n\nBoth shifts will be supervised by Jane Wilson.`
    }

    if (lowerQuestion.includes('agreement') || lowerQuestion.includes('sign')) {
        return `The placement agreement status: The host (Acme Corp Ltd) signed and approved the agreement on September 28th. An e-signature request was sent to ${studentName} on October 1st, but it hasn't been completed yet. The agreement includes placement terms, health & safety acknowledgement, and confidentiality requirements. It expires on October 15th, so action is needed soon.`
    }

    if (
        lowerQuestion.includes('communication') ||
        lowerQuestion.includes('contact')
    ) {
        return `Recent communications with ${studentName}:\n\n• Oct 5: Email reminder sent about pending e-signature (successful)\n• Sep 25: Interview booked confirmation sent (successful)\n• Sep 20: Phone call follow-up - no answer, voicemail left (unsuccessful)\n• Sep 15: Medical clearance certificate received (successful)\n\nLast successful contact was via email on October 5th. The student is marked as "Contactable" with email as the preferred method.`
    }

    // Default response
    return `Based on the current data for ${studentName}, they are progressing well through their Certificate III in Community Services placement at Acme Corp Ltd. The main priority is completing the e-signature on the placement agreement. They have 48 of 120 required hours completed, with 53 days remaining until the placement end date of December 12th. Would you like more specific information about any aspect of their placement?`
}

export const StudentAISearch = () => {
    const [darkMode, setDarkMode] = useState(false)
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)
    const [previewStudent, setPreviewStudent] = useState<Student | null>(null)
    const [recentStudents, setRecentStudents] = useState<Student[]>([])
    const [aiAnswer, setAiAnswer] = useState<string>('')
    const [isAiLoading, setIsAiLoading] = useState(false)
    const [isTicketModalOpen, setIsTicketModalOpen] = useState(false)
    const [isNoteModalOpen, setIsNoteModalOpen] = useState(false)
    const [showSuccessAnimation, setShowSuccessAnimation] = useState(false)
    const [successAnimationType, setSuccessAnimationType] = useState<
        'ticket' | 'note'
    >('ticket')
    const [successMessage, setSuccessMessage] = useState('')
    const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [showEmptyState, setShowEmptyState] = useState(false)

    const searchInputRef = useRef<HTMLInputElement>(null)
    const aiPanelRef = useRef<HTMLDivElement>(null)

    // Load recent students from localStorage
    useEffect(() => {
        const stored = localStorage.getItem('recentStudents')
        if (stored) {
            try {
                setRecentStudents(JSON.parse(stored))
            } catch (e) {
                console.error('Failed to load recent students', e)
            }
        }
    }, [])

    // Save recent students to localStorage
    const addToRecentStudents = useCallback((student: Student) => {
        setRecentStudents((prev) => {
            const filtered = prev.filter((s) => s.id !== student.id)
            const updated = [student, ...filtered].slice(0, 5)
            localStorage.setItem('recentStudents', JSON.stringify(updated))
            return updated
        })
    }, [])

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Esc to go back
            if (e.key === 'Escape' && selectedStudent) {
                handleCloseStudent()
            }
            // Focus search on "/"
            if (e.key === '/' && !selectedStudent && !commandPaletteOpen) {
                e.preventDefault()
                searchInputRef.current?.focus()
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [selectedStudent, commandPaletteOpen])

    const toggleDarkMode = useCallback(() => {
        setDarkMode((prev) => !prev)
        document.documentElement.classList.toggle('dark')
    }, [])

    const handleSelectStudent = useCallback((student: Student) => {
        setPreviewStudent(student)
        setShowEmptyState(false)
    }, [])

    const handleSearchChange = useCallback(
        (query: string) => {
            setSearchQuery(query)

            // Check if search has no results after a short delay
            if (query.length > 2) {
                const hasResults = mockStudents.some(
                    (student) =>
                        student.name
                            .toLowerCase()
                            .includes(query.toLowerCase()) ||
                        student.email
                            .toLowerCase()
                            .includes(query.toLowerCase()) ||
                        student.studentId
                            .toLowerCase()
                            .includes(query.toLowerCase())
                )

                // Show empty state after typing stops
                const timeoutId = setTimeout(() => {
                    if (!hasResults && query === searchQuery) {
                        setShowEmptyState(true)
                        // toast.error('No students found', {
                        //     description: `No matches for "${query}". Try different keywords.`,
                        //     duration: 3000,
                        // })
                    } else {
                        setShowEmptyState(false)
                    }
                }, 800)

                return () => clearTimeout(timeoutId)
            } else {
                setShowEmptyState(false)
            }
        },
        [searchQuery]
    )

    const handleConfirmStudent = useCallback(() => {
        if (!previewStudent) return

        setSelectedStudent(previewStudent)
        setPreviewStudent(null)
        setAiAnswer('')
        addToRecentStudents(previewStudent)

        // toast.success('Student profile loaded', {
        //     description: `Viewing ${previewStudent.name}'s profile`,
        //     duration: 2000,
        // })
    }, [previewStudent, addToRecentStudents])

    const handleCloseStudent = useCallback(() => {
        setSelectedStudent(null)
        setPreviewStudent(null)
        setAiAnswer('')
    }, [])

    const handleAskQuestion = useCallback(
        (question: string) => {
            if (!selectedStudent) return

            setIsAiLoading(true)
            setAiAnswer('')

            // Simulate AI processing with realistic delay
            setTimeout(() => {
                const response = getAIResponse(question, selectedStudent.name)
                setAiAnswer(response)
                setIsAiLoading(false)
            }, 1500)
        },
        [selectedStudent]
    )

    const handleCreateTicket = useCallback(() => {
        setIsTicketModalOpen(true)
    }, [])

    const handleAddNote = useCallback(() => {
        setIsNoteModalOpen(true)
    }, [])

    const handleTicketSubmit = useCallback(
        (ticket: {
            title: string
            description: string
            priority: string
            category: string
            assignee: string
        }) => {
            console.log('Ticket created:', ticket)

            setSuccessAnimationType('ticket')
            setSuccessMessage(`Ticket "${ticket.title}" created!`)
            setShowSuccessAnimation(true)
        },
        []
    )

    const handleNoteSubmit = useCallback(
        (note: { content: string; category: string; isPinned: boolean }) => {
            console.log('Note added:', note)

            setSuccessAnimationType('note')
            setSuccessMessage(
                note.isPinned
                    ? 'Note pinned to profile!'
                    : 'Note added to profile!'
            )
            setShowSuccessAnimation(true)
        },
        []
    )

    const handleAnimationComplete = useCallback(() => {
        setShowSuccessAnimation(false)

        // if (successAnimationType === 'ticket') {
        //     toast.success('Ticket created successfully!', {
        //         description: 'The ticket has been created and assigned.',
        //     })
        // } else {
        //     toast.success('Note added to student profile!', {
        //         description: 'Note saved successfully.',
        //     })
        // }
    }, [successAnimationType])

    const scrollToAIPanel = useCallback(() => {
        aiPanelRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
        })
    }, [])

    const handleClearSearch = useCallback(() => {
        setSearchQuery('')
        setShowEmptyState(false)
        searchInputRef.current?.focus()
    }, [])

    const handleRequestHelp = useCallback(() => {
        // toast.info('Help requested', {
        //     description: 'A support coordinator will contact you shortly.',
        // })
    }, [])

    const handleAddWorkplace = useCallback(() => {
        // toast.success('Add workplace', {
        //     description: 'Opening workplace placement form...',
        //     duration: 2000,
        // })
    }, [])

    return (
        <div className={`relative z-30 bg-background`}>
            {/* Floating Actions */}
            <div className="fixed right-8 top-8 z-50 flex gap-2">
                {selectedStudent && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            variant="action"
                            className="h-12 w-12 rounded-full shadow-lg backdrop-blur-sm"
                            onClick={handleCloseStudent}
                            aria-label="Back to search"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </motion.div>
                )}
            </div>

            {/* Main Content */}
            <div className="mx-auto max-w-7xl">
                <AnimatePresence mode="wait">
                    {!selectedStudent ? (
                        /* Initial Search State */
                        <motion.div
                            key="search"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col items-center justify-center"
                        >
                            <div className="w-full space-y-4 text-center">
                                {/* Hero Section */}
                                {/* <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                    className="space-y-4"
                                >
                                    <motion.div
                                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 px-4 py-2 text-sm text-primary"
                                        animate={{
                                            boxShadow: [
                                                '0 0 0 0 rgba(99, 102, 241, 0)',
                                                '0 0 0 8px rgba(99, 102, 241, 0.1)',
                                                '0 0 0 0 rgba(99, 102, 241, 0)',
                                            ],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                        }}
                                    >
                                        <Sparkles className="h-4 w-4" />
                                        <span>AI Powered Intelligence</span>
                                    </motion.div>

                                    <h1 className="bg-gradient-to-br from-foreground via-foreground/90 to-foreground/70 bg-clip-text text-5xl text-transparent">
                                        Student Search & Insights
                                    </h1>

                                    <p className="text-xl text-muted-foreground">
                                        Find students instantly and get
                                        AI-powered placement insights
                                    </p>
                                </motion.div> */}

                                {/* Search Bar */}
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <StudentSearchBar
                                        students={mockStudents}
                                        onSelectStudent={handleSelectStudent}
                                        onSearchChange={(query: string) => {
                                            setPreviewStudent(null)
                                            handleSearchChange(query)
                                        }}
                                        ref={searchInputRef}
                                    />
                                </motion.div>

                                {/* Quick Preview */}
                                <AnimatePresence mode="wait">
                                    {previewStudent && (
                                        <motion.div
                                            initial={{
                                                opacity: 0,
                                                scale: 0.95,
                                            }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <StudentQuickPreview
                                                student={previewStudent}
                                                onSelect={handleConfirmStudent}
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Empty State - No Results */}
                                <AnimatePresence mode="wait">
                                    {showEmptyState && !previewStudent && (
                                        <motion.div>
                                            <EmptySearchState
                                                searchQuery={searchQuery}
                                                students={mockStudents}
                                                onClearSearch={
                                                    handleClearSearch
                                                }
                                                onRequestHelp={
                                                    handleRequestHelp
                                                }
                                                onSelectStudent={
                                                    handleSelectStudent
                                                }
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Helper Content */}
                                {/* {!previewStudent && !showEmptyState && (
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="space-y-6 pt-4"
                                    >
                                        <p className="text-sm text-muted-foreground">
                                            Search by student name, ID, or email
                                            to get started
                                        </p>

                                        {recentStudents.length > 0 && (
                                            <div className="mx-auto max-w-2xl">
                                                <div className="mb-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                                                    <Zap className="h-3 w-3" />
                                                    <span>Recent Students</span>
                                                </div>
                                                <div className="flex flex-wrap justify-center gap-2">
                                                    {recentStudents.map(
                                                        (student) => (
                                                            <motion.button
                                                                key={student.id}
                                                                onClick={() =>
                                                                    handleSelectStudent(
                                                                        student
                                                                    )
                                                                }
                                                                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm transition-all hover:border-primary hover:bg-primary/5 hover:text-primary"
                                                                whileHover={{
                                                                    scale: 1.05,
                                                                    y: -2,
                                                                }}
                                                                whileTap={{
                                                                    scale: 0.95,
                                                                }}
                                                            >
                                                                <Avatar className="h-6 w-6">
                                                                    <AvatarImage
                                                                        src={
                                                                            student.avatar
                                                                        }
                                                                        alt={
                                                                            student.name
                                                                        }
                                                                    />
                                                                    <AvatarFallback className="text-xs">
                                                                        {student.name
                                                                            .split(
                                                                                ' '
                                                                            )
                                                                            .map(
                                                                                (
                                                                                    n
                                                                                ) =>
                                                                                    n[0]
                                                                            )
                                                                            .join(
                                                                                ''
                                                                            )
                                                                            .toUpperCase()
                                                                            .slice(
                                                                                0,
                                                                                2
                                                                            )}
                                                                    </AvatarFallback>
                                                                </Avatar>
                                                                <span>
                                                                    {
                                                                        student.name
                                                                    }
                                                                </span>
                                                            </motion.button>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        <div className="mx-auto max-w-2xl">
                                            <p className="mb-3 text-xs text-muted-foreground">
                                                {recentStudents.length > 0
                                                    ? 'Or try searching for:'
                                                    : 'Try searching for:'}
                                            </p>
                                            <div className="flex flex-wrap justify-center gap-2">
                                                {mockStudents
                                                    .filter(
                                                        (s) =>
                                                            !recentStudents.find(
                                                                (r) =>
                                                                    r.id ===
                                                                    s.id
                                                            )
                                                    )
                                                    .slice(0, 5)
                                                    .map((student) => (
                                                        <motion.button
                                                            key={student.id}
                                                            onClick={() =>
                                                                handleSelectStudent(
                                                                    student
                                                                )
                                                            }
                                                            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm transition-all hover:border-primary hover:bg-primary/5 hover:text-primary"
                                                            whileHover={{
                                                                scale: 1.05,
                                                                y: -2,
                                                            }}
                                                            whileTap={{
                                                                scale: 0.95,
                                                            }}
                                                        >
                                                            <Avatar className="h-6 w-6">
                                                                <AvatarImage
                                                                    src={
                                                                        student.avatar
                                                                    }
                                                                    alt={
                                                                        student.name
                                                                    }
                                                                />
                                                                <AvatarFallback className="text-xs">
                                                                    {student.name
                                                                        .split(
                                                                            ' '
                                                                        )
                                                                        .map(
                                                                            (
                                                                                n
                                                                            ) =>
                                                                                n[0]
                                                                        )
                                                                        .join(
                                                                            ''
                                                                        )
                                                                        .toUpperCase()
                                                                        .slice(
                                                                            0,
                                                                            2
                                                                        )}
                                                                </AvatarFallback>
                                                            </Avatar>
                                                            <span>
                                                                {student.name}
                                                            </span>
                                                        </motion.button>
                                                    ))}
                                            </div>
                                        </div>

                                        <CommandPaletteHint />
                                    </motion.div>
                                )} */}
                            </div>
                        </motion.div>
                    ) : (
                        /* Student Selected State */
                        <motion.div
                            key="student"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-8"
                        >
                            {/* Header */}
                            <div className="text-center">
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                    className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 px-4 py-2 text-sm text-primary"
                                >
                                    <Sparkles className="h-4 w-4" />
                                    <span>AI Powered Student Insights</span>
                                </motion.div>
                                <motion.h1
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-4xl"
                                >
                                    Student Profile
                                </motion.h1>
                            </div>
                            {/* Enhanced Profile & AI Panel */}
                            <div className="grid grid-cols-1 gap-8 ">
                                {/* Main Profile - 2 columns */}
                                <div className="xl:col-span-2">
                                    <EnhancedStudentProfile
                                        student={selectedStudent}
                                        workplaces={
                                            mockWorkplaces[
                                                selectedStudent.id
                                            ] || []
                                        }
                                        onCreateTicket={handleCreateTicket}
                                        onAddNote={handleAddNote}
                                        onAddWorkplace={handleAddWorkplace}
                                    />
                                </div>

                                {/* AI Panel - 1 column, sticky on larger screens */}
                                <div className="xl:col-span-1" ref={aiPanelRef}>
                                    <div className="sticky top-8">
                                        <AIQuestionPanel
                                            onAskQuestion={handleAskQuestion}
                                            isLoading={isAiLoading}
                                            answer={aiAnswer}
                                            onCreateTicket={handleCreateTicket}
                                            onAddNote={handleAddNote}
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Floating AI Button - Mobile only */}
                            <div className="xl:hidden">
                                <FloatingAIButton
                                    onClick={scrollToAIPanel}
                                    hasUnreadAnswer={!!aiAnswer && !isAiLoading}
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Command Palette */}
            <CommandPalette
                open={commandPaletteOpen}
                onOpenChange={setCommandPaletteOpen}
                students={mockStudents}
                recentStudents={recentStudents}
                onSelectStudent={(student) => {
                    handleSelectStudent(student)
                    setTimeout(handleConfirmStudent, 100)
                }}
            />

            {/* Modals */}
            {selectedStudent && (
                <>
                    <CreateTicketModal
                        isOpen={isTicketModalOpen}
                        onClose={() => setIsTicketModalOpen(false)}
                        onSubmit={handleTicketSubmit}
                        studentName={selectedStudent.name}
                    />

                    <AddNoteModal
                        isOpen={isNoteModalOpen}
                        onClose={() => setIsNoteModalOpen(false)}
                        onSubmit={handleNoteSubmit}
                        studentName={selectedStudent.name}
                    />
                </>
            )}

            {/* Success Animation */}
            <SuccessAnimation
                show={showSuccessAnimation}
                onComplete={handleAnimationComplete}
                type={successAnimationType}
                message={successMessage}
            />
        </div>
    )
}
