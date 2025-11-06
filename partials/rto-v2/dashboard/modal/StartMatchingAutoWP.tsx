import { Rto } from '@types'
import { Service } from '../components'
import { RtoDashboardBaseModal } from './RtoDashboardBaseModal'
import {
    AlertCircle,
    Building2,
    CheckCircle2,
    GraduationCap,
    Loader2,
    MapPin,
    Search,
    Sparkles,
    Star,
    Zap,
} from 'lucide-react'
import { Badge, Button, Card, GlobalModal, Typography } from '@components'
import { MdCancel } from 'react-icons/md'
import { useState } from 'react'
import { Progressbar } from '@partials/rto-v2/components'

interface PlacementRequest {
    id: string
    student: {
        name: string
        email: string
        phone: string
        avatar?: string
    }
    course: string
    batch: string
    rtoName?: string
    type: any
    status: any
    workplace?: string
    industry?: string
    location?: string
    requestDate: string
    lastUpdated: string
    aiMatchScore?: number
    coordinator?: string
    notes?: string
}

interface AutomationMatchingDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    pendingStudents: PlacementRequest[]
}

interface MatchResult {
    studentId: string
    studentName: string
    workplace?: string
    industry?: string
    location?: string
    matchScore?: number
    status: 'matched' | 'manual'
}

export const mockPlacementRequests: PlacementRequest[] = [
    // Students Need Workplace
    {
        id: '1',
        student: {
            name: 'Sarah Chen',
            email: 'sarah.chen@email.com',
            phone: '+61 412 345 678',
        },
        course: 'CHC33015 - Certificate III in Individual Support',
        batch: 'Batch 2025-A',
        rtoName: 'Melbourne Training Institute',
        type: 'needs_workplace',
        status: 'request_sent',
        requestDate: 'Oct 15, 2025',
        lastUpdated: 'Oct 15, 2025',
        coordinator: 'John Smith',
    },
    {
        id: '2',
        student: {
            name: 'Michael Torres',
            email: 'michael.t@email.com',
            phone: '+61 423 456 789',
        },
        course: 'ICT50220 - Diploma of Information Technology',
        batch: 'Batch 2025-B',
        rtoName: 'Tech Skills Academy',
        type: 'needs_workplace',
        status: 'assigned',
        workplace: 'TechCorp Solutions',
        industry: 'Information Technology',
        location: 'Melbourne CBD',
        aiMatchScore: 95,
        requestDate: 'Oct 12, 2025',
        lastUpdated: 'Oct 16, 2025',
        coordinator: 'Emma Wilson',
    },
    {
        id: '3',
        student: {
            name: 'Emma Williams',
            email: 'emma.w@email.com',
            phone: '+61 434 567 890',
        },
        course: 'SIT50416 - Diploma of Hospitality Management',
        batch: 'Batch 2025-A',
        type: 'needs_workplace',
        status: 'interview',
        workplace: 'Grand Hotel Melbourne',
        industry: 'Hospitality',
        location: 'Melbourne',
        aiMatchScore: 88,
        requestDate: 'Oct 10, 2025',
        lastUpdated: 'Oct 17, 2025',
        coordinator: 'John Smith',
    },
    {
        id: '4',
        student: {
            name: "James O'Connor",
            email: 'james.o@email.com',
            phone: '+61 445 678 901',
        },
        course: 'CHC33015 - Certificate III in Individual Support',
        batch: 'Batch 2025-A',
        type: 'needs_workplace',
        status: 'waiting_student',
        workplace: 'Community Care Hub',
        industry: 'Aged Care',
        location: 'Richmond',
        aiMatchScore: 92,
        requestDate: 'Oct 8, 2025',
        lastUpdated: 'Oct 17, 2025',
        coordinator: 'Emma Wilson',
    },
    {
        id: '5',
        student: {
            name: 'Olivia Martinez',
            email: 'olivia.m@email.com',
            phone: '+61 456 789 012',
        },
        course: 'ICT50220 - Diploma of Information Technology',
        batch: 'Batch 2025-B',
        type: 'needs_workplace',
        status: 'appointment',
        workplace: 'Digital Innovations Ltd',
        industry: 'Information Technology',
        location: 'Docklands',
        aiMatchScore: 90,
        requestDate: 'Oct 5, 2025',
        lastUpdated: 'Oct 18, 2025',
        coordinator: 'John Smith',
    },
    {
        id: '6',
        student: {
            name: 'Lucas Anderson',
            email: 'lucas.a@email.com',
            phone: '+61 467 890 123',
        },
        course: 'CHC33015 - Certificate III in Individual Support',
        batch: 'Batch 2025-C',
        type: 'needs_workplace',
        status: 'agreement_signed',
        workplace: 'Sunrise Aged Care',
        industry: 'Aged Care',
        location: 'Footscray',
        aiMatchScore: 96,
        requestDate: 'Oct 1, 2025',
        lastUpdated: 'Oct 18, 2025',
        coordinator: 'Emma Wilson',
    },
    {
        id: '12',
        student: {
            name: 'Liam Murphy',
            email: 'liam.m@email.com',
            phone: '+61 498 765 432',
        },
        course: 'SIT50416 - Diploma of Hospitality Management',
        batch: 'Batch 2025-B',
        rtoName: 'Hospitality Training College',
        type: 'needs_workplace',
        status: 'request_sent',
        requestDate: 'Oct 20, 2025',
        lastUpdated: 'Oct 20, 2025',
        coordinator: 'John Smith',
    },
    {
        id: '13',
        student: {
            name: 'Mia Thompson',
            email: 'mia.t@email.com',
            phone: '+61 487 654 321',
        },
        course: 'CHC33015 - Certificate III in Individual Support',
        batch: 'Batch 2025-B',
        rtoName: 'Health & Community Care Institute',
        type: 'needs_workplace',
        status: 'request_sent',
        requestDate: 'Oct 19, 2025',
        lastUpdated: 'Oct 19, 2025',
        coordinator: 'Emma Wilson',
    },
    {
        id: '14',
        student: {
            name: 'Noah Jackson',
            email: 'noah.j@email.com',
            phone: '+61 476 543 210',
        },
        course: 'ICT50220 - Diploma of Information Technology',
        batch: 'Batch 2025-C',
        rtoName: 'Tech Skills Academy',
        type: 'needs_workplace',
        status: 'request_sent',
        requestDate: 'Oct 18, 2025',
        lastUpdated: 'Oct 18, 2025',
        coordinator: 'John Smith',
    },

    // Student Provided Workplaces
    {
        id: '7',
        student: {
            name: 'Sophie Taylor',
            email: 'sophie.t@email.com',
            phone: '+61 478 901 234',
        },
        course: 'SIT50416 - Diploma of Hospitality Management',
        batch: 'Batch 2025-A',
        type: 'provided_workplace',
        status: 'waiting_rto',
        workplace: 'Riverside Restaurant',
        industry: 'Hospitality',
        location: 'South Yarra',
        requestDate: 'Oct 14, 2025',
        lastUpdated: 'Oct 18, 2025',
        coordinator: 'John Smith',
        notes: 'Student has family connection to restaurant owner',
    },
    {
        id: '8',
        student: {
            name: 'Daniel Kim',
            email: 'daniel.k@email.com',
            phone: '+61 489 012 345',
        },
        course: 'ICT50220 - Diploma of Information Technology',
        batch: 'Batch 2025-B',
        type: 'provided_workplace',
        status: 'waiting_industry',
        workplace: 'StartupHub Accelerator',
        industry: 'Information Technology',
        location: 'Carlton',
        requestDate: 'Oct 13, 2025',
        lastUpdated: 'Oct 17, 2025',
        coordinator: 'Emma Wilson',
        notes: 'Workplace needs verification of insurance and compliance',
    },
    {
        id: '9',
        student: {
            name: 'Isabella Brown',
            email: 'isabella.b@email.com',
            phone: '+61 490 123 456',
        },
        course: 'CHC33015 - Certificate III in Individual Support',
        batch: 'Batch 2025-A',
        type: 'provided_workplace',
        status: 'agreement_pending',
        workplace: 'Caring Hearts Home Care',
        industry: 'Aged Care',
        location: 'Brunswick',
        requestDate: 'Oct 11, 2025',
        lastUpdated: 'Oct 18, 2025',
        coordinator: 'John Smith',
        notes: 'Eligibility check completed - all documents verified',
    },
    {
        id: '10',
        student: {
            name: 'Ethan Davis',
            email: 'ethan.d@email.com',
            phone: '+61 401 234 567',
        },
        course: 'SIT50416 - Diploma of Hospitality Management',
        batch: 'Batch 2025-C',
        type: 'provided_workplace',
        status: 'placement_started',
        workplace: 'Crown Casino Melbourne',
        industry: 'Hospitality',
        location: 'Southbank',
        requestDate: 'Oct 5, 2025',
        lastUpdated: 'Oct 19, 2025',
        coordinator: 'Emma Wilson',
    },
    {
        id: '11',
        student: {
            name: 'Ava Wilson',
            email: 'ava.w@email.com',
            phone: '+61 412 345 678',
        },
        course: 'ICT50220 - Diploma of Information Technology',
        batch: 'Batch 2025-A',
        type: 'provided_workplace',
        status: 'schedule_completed',
        workplace: 'Google Australia',
        industry: 'Information Technology',
        location: 'Melbourne',
        requestDate: 'Sep 20, 2025',
        lastUpdated: 'Oct 19, 2025',
        coordinator: 'John Smith',
    },
]

const pendingStudents = mockPlacementRequests.filter(
    (request) =>
        request.type === 'needs_workplace' && request.status === 'request_sent'
)

export const StartMatchingAutoWP = ({ onCancel }: { onCancel: () => void }) => {
    const [isRunning, setIsRunning] = useState(false)
    const [loadingProgress, setLoadingProgress] = useState(0)
    const [matchResults, setMatchResults] = useState<MatchResult[]>([])
    const [currentMatchingIndex, setCurrentMatchingIndex] = useState(-1)

    // Mock workplaces for matching
    const mockWorkplaces = [
        {
            name: 'Sunrise Aged Care Center',
            industry: 'Aged Care',
            location: 'Melbourne CBD',
            score: 96,
        },
        {
            name: 'TechCorp Solutions',
            industry: 'Information Technology',
            location: 'Docklands',
            score: 94,
        },
        {
            name: 'Grand Hotel Melbourne',
            industry: 'Hospitality',
            location: 'South Yarra',
            score: 92,
        },
        {
            name: 'Community Care Hub',
            industry: 'Aged Care',
            location: 'Richmond',
            score: 90,
        },
        {
            name: 'Digital Innovations Ltd',
            industry: 'Information Technology',
            location: 'Carlton',
            score: 88,
        },
    ]

    const handleRunAutomation = async () => {
        setIsRunning(true)
        setLoadingProgress(0)
        setMatchResults([])
        setCurrentMatchingIndex(-1)

        // Loading phase - 10 seconds with progress
        const loadingInterval = setInterval(() => {
            setLoadingProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(loadingInterval)
                    return 100
                }
                return prev + 2 // 50 increments over ~10 seconds (200ms each)
            })
        }, 200)

        // Wait for 10 seconds
        await new Promise((resolve) => setTimeout(resolve, 10000))

        // Start matching students one by one
        for (let i = 0; i < pendingStudents.length; i++) {
            setCurrentMatchingIndex(i)
            await new Promise((resolve) => setTimeout(resolve, 1500)) // 1.5s per student

            const student = pendingStudents[i]

            // 80% chance of finding a match
            const foundMatch = Math.random() > 0.2

            if (foundMatch) {
                const workplace = mockWorkplaces[i % mockWorkplaces.length]
                setMatchResults((prev) => [
                    ...prev,
                    {
                        studentId: student.id,
                        studentName: student.student.name,
                        workplace: workplace.name,
                        industry: workplace.industry,
                        location: workplace.location,
                        matchScore: workplace.score - i * 2, // Slightly decrease score for variety
                        status: 'matched',
                    },
                ])
            } else {
                setMatchResults((prev) => [
                    ...prev,
                    {
                        studentId: student.id,
                        studentName: student.student.name,
                        status: 'manual',
                    },
                ])
            }
        }

        setIsRunning(false)
        setCurrentMatchingIndex(-1)
    }

    const handleReset = () => {
        setMatchResults([])
        setLoadingProgress(0)
        setCurrentMatchingIndex(-1)
    }
    return (
        <GlobalModal className="!overflow-hidden !max-w-3xl">
            <MdCancel
                onClick={() => {
                    if (onCancel) {
                        onCancel()
                    }
                }}
                className="z-30 transition-all duration-500 text-gray-200 hover:text-gray-100 text-3xl cursor-pointer hover:rotate-90 absolute top-2 right-2"
            />
            <div
                className={
                    'relative px-6 pt-6 pb-4 overflow-hidden border-b bg-gradient-to-br from-primary/5 via-accent/5 to-transparent'
                }
            >
                <div className="relative">
                    <div className="flex items-start gap-4">
                        <div className="h-14 w-14 rounded-2xl bg-primary backdrop-blur-md flex items-center justify-center shadow-premium border border-white/30 shrink-0">
                            <Zap
                                className="h-7 w-7 text-white"
                                strokeWidth={2.5}
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                                <Typography className="text-primaryNew text-xl">
                                    Automation Matching
                                </Typography>
                            </div>
                            <Typography className="text-primaryNew text-sm leading-relaxed">
                                Run automation to match students with eligible
                                workplaces
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-[70vh] overflow-auto custom-scrollbar p-4">
                <div className="space-y-6">
                    {/* Students Pending Assignment */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold flex items-center gap-2">
                                <Badge
                                    text={pendingStudents.length + ''}
                                ></Badge>
                                Students with Workplace Pending Status
                            </h3>
                            {matchResults.length === 0 && !isRunning && (
                                <Button
                                    onClick={handleRunAutomation}
                                    Icon={Zap}
                                    text="Run Automation"
                                />
                            )}
                            {matchResults.length > 0 && !isRunning && (
                                <Button
                                    onClick={handleReset}
                                    variant="primaryNew"
                                    outline
                                    className="gap-2"
                                    Icon={Sparkles}
                                    text="Run Again"
                                />
                            )}
                        </div>

                        {/* Students List */}
                        <div className="space-y-3">
                            {pendingStudents.map((student, index) => {
                                const matchResult = matchResults.find(
                                    (r) => r.studentId === student.id
                                )
                                const isCurrentlyMatching =
                                    currentMatchingIndex === index

                                return (
                                    <Card
                                        key={student.id}
                                        className={`border transition-all ${
                                            matchResult
                                                ? matchResult.status ===
                                                  'matched'
                                                    ? 'border-success/40 bg-success/5'
                                                    : 'border-orange-400/40 bg-orange-50/50'
                                                : isCurrentlyMatching
                                                ? 'border-accent/40 bg-accent/5 shadow-lg'
                                                : 'border-border/60'
                                        }`}
                                    >
                                        <div className="p-4">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <h4 className="font-semibold">
                                                            {
                                                                student.student
                                                                    .name
                                                            }
                                                        </h4>
                                                        {isCurrentlyMatching && (
                                                            <Badge
                                                                Icon={() => (
                                                                    <Loader2 className="h-3 w-3 animate-spin" />
                                                                )}
                                                                className="bg-accent text-white border-0 gap-1.5 animate-pulse"
                                                                text="Matching..."
                                                            />
                                                        )}
                                                        {matchResult &&
                                                            matchResult.status ===
                                                                'matched' && (
                                                                <Badge
                                                                    Icon={
                                                                        CheckCircle2
                                                                    }
                                                                    text={
                                                                        'Match Found'
                                                                    }
                                                                    variant="success"
                                                                />
                                                            )}
                                                        {matchResult &&
                                                            matchResult.status ===
                                                                'manual' && (
                                                                <Badge
                                                                    text="Use Manual Finder"
                                                                    variant="primary"
                                                                    Icon={
                                                                        AlertCircle
                                                                    }
                                                                />
                                                            )}
                                                    </div>
                                                    <p className="text-sm text-muted-foreground mb-1">
                                                        {student.course}
                                                    </p>
                                                    <div className="flex items-center gap-3 text-xs">
                                                        <span className="text-muted-foreground">
                                                            Batch:{' '}
                                                            {student.batch}
                                                        </span>
                                                        {student.rtoName && (
                                                            <>
                                                                <span className="text-muted-foreground/40">
                                                                    •
                                                                </span>
                                                                <div className="flex items-center gap-1.5">
                                                                    <GraduationCap className="h-3.5 w-3.5 text-primary" />
                                                                    <span className="font-medium text-primary">
                                                                        {
                                                                            student.rtoName
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </>
                                                        )}
                                                    </div>

                                                    {/* Match Result Details */}
                                                    {matchResult &&
                                                        matchResult.status ===
                                                            'matched' && (
                                                            <div className="mt-3 p-3 rounded-lg bg-success/10 border border-success/20">
                                                                <div className="space-y-2">
                                                                    <div className="flex items-start gap-2">
                                                                        <Building2 className="h-4 w-4 text-success shrink-0 mt-0.5" />
                                                                        <div className="flex-1 min-w-0">
                                                                            <p className="text-sm font-semibold text-success">
                                                                                {
                                                                                    matchResult.workplace
                                                                                }
                                                                            </p>
                                                                            <p className="text-xs text-muted-foreground">
                                                                                {
                                                                                    matchResult.industry
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex items-center justify-between">
                                                                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                                                            <MapPin className="h-3 w-3" />
                                                                            {
                                                                                matchResult.location
                                                                            }
                                                                        </div>
                                                                        <div className="flex items-center gap-1.5">
                                                                            <Star className="h-3.5 w-3.5 text-accent fill-accent" />
                                                                            <span className="text-sm font-bold text-accent">
                                                                                {
                                                                                    matchResult.matchScore
                                                                                }

                                                                                %
                                                                                Match
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}

                                                    {matchResult &&
                                                        matchResult.status ===
                                                            'manual' && (
                                                            <div className="mt-3 p-3 rounded-lg bg-orange-50 border border-orange-200">
                                                                <div className="flex items-start gap-2">
                                                                    <Search className="h-4 w-4 text-orange-600 shrink-0 mt-0.5" />
                                                                    <div className="flex-1">
                                                                        <p className="text-sm font-semibold text-orange-900">
                                                                            No
                                                                            automatic
                                                                            match
                                                                            found
                                                                        </p>
                                                                        <p className="text-xs text-orange-700 mt-1">
                                                                            Please
                                                                            use
                                                                            manual
                                                                            finder
                                                                            to
                                                                            search
                                                                            for
                                                                            suitable
                                                                            workplaces
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                )
                            })}
                        </div>
                    </div>

                    {/* Loading Phase */}
                    {isRunning && loadingProgress < 100 && (
                        <Card className="border-accent/40 bg-gradient-to-br from-accent/5 to-transparent">
                            <div className="p-6">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Loader2 className="h-5 w-5 text-accent animate-spin" />
                                        <div className="flex-1">
                                            <p className="font-semibold text-accent">
                                                Analyzing student profiles and
                                                workplace data...
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                This may take up to 10 seconds
                                            </p>
                                        </div>
                                    </div>
                                    <Progressbar
                                        value={loadingProgress}
                                        size="xs"
                                        animated
                                        variant="primaryNew"
                                    />
                                    <p className="text-xs text-center text-muted-foreground">
                                        {loadingProgress}% Complete
                                    </p>
                                </div>
                            </div>
                        </Card>
                    )}

                    {/* Summary */}
                    {matchResults.length > 0 && !isRunning && (
                        <Card className="border-primary/40 bg-gradient-to-br from-primary/5 to-transparent">
                            <div className="p-6">
                                <h3 className="font-semibold mb-3 flex items-center gap-2">
                                    <Sparkles className="h-4 w-4 text-primary" />
                                    Matching Summary
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 rounded-lg bg-success/10 border border-success/20">
                                        <p className="text-2xl font-bold text-success">
                                            {
                                                matchResults.filter(
                                                    (r) =>
                                                        r.status === 'matched'
                                                ).length
                                            }
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Automatic Matches
                                        </p>
                                    </div>
                                    <div className="p-3 rounded-lg bg-orange-50 border border-orange-200">
                                        <p className="text-2xl font-bold text-orange-600">
                                            {
                                                matchResults.filter(
                                                    (r) => r.status === 'manual'
                                                ).length
                                            }
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Requires Manual Finder
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    )}
                </div>
            </div>
        </GlobalModal>
    )
}
