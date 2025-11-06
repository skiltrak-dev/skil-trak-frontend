import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { motion } from 'framer-motion'
import { Student } from './StudentSearchBar'
import { Workplace, WorkplaceSection } from './WorkplaceSection'

import { Badge, Button } from '@components'
import {
    Building2,
    Calendar,
    CheckCircle2,
    Copy,
    FileText,
    Mail,
    Star,
    Target,
    Timer,
    User,
} from 'lucide-react'

interface EnhancedStudentProfileProps {
    student: Student
    workplaces?: Workplace[]
    onCreateTicket: () => void
    onAddNote: () => void
    onAddWorkplace?: () => void
}

export function EnhancedStudentProfile({
    student,
    workplaces = [],
    onCreateTicket,
    onAddNote,
    onAddWorkplace,
}: EnhancedStudentProfileProps) {
    // Mock data - in real app this would come from props/API
    const placementProgress = 40 // 48 of 120 hours
    const daysRemaining = 53
    const upcomingShifts = 2
    const pendingTasks = 1

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(student.email)
        // toast.success('Email copied to clipboard')
    }

    const handleCopyStudentId = () => {
        navigator.clipboard.writeText(student.studentId)
        // toast.success('Student ID copied to clipboard')
    }

    return (
        <div className="space-y-6">
            {/* Hero Card - Student Header */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="relative overflow-hidden rounded-3xl border-2 border-border bg-gradient-to-br from-card via-card to-primaryNew/5 shadow-xl"
            >
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_var(--primaryNew)_0%,_transparent_50%)] opacity-5" />

                <div className="relative p-6 md:p-8">
                    <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                        {/* Left: Student Info */}
                        <div className="flex gap-4 md:gap-6">
                            {/* Avatar */}
                            <motion.div
                                whileHover={{ scale: 1.05, rotate: 5 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <div className="relative">
                                    <Avatar className="h-20 w-20 ring-4 ring-primaryNew/20 ring-offset-4 ring-offset-background md:h-24 md:w-24">
                                        <AvatarImage
                                            src={student.avatar}
                                            alt={student.name}
                                        />
                                        <AvatarFallback className="text-xl md:text-2xl">
                                            {student.name
                                                .split(' ')
                                                .map((n) => n[0])
                                                .join('')
                                                .toUpperCase()
                                                .slice(0, 2)}
                                        </AvatarFallback>
                                    </Avatar>
                                    {/* Status Indicator */}
                                    <div className="absolute -bottom-1 -right-1 rounded-full bg-green-500 p-1 ring-4 ring-background">
                                        <CheckCircle2 className="h-4 w-4 text-white" />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Details */}
                            <div className="space-y-3">
                                <div>
                                    <h2 className="text-2xl md:text-3xl">
                                        {student.name}
                                    </h2>
                                    <div className="mt-1 flex flex-wrap items-center gap-2">
                                        <Badge
                                            variant="secondary"
                                            className="gap-1"
                                            Icon={User}
                                            text="Active Student"
                                        />

                                        <Badge
                                            variant="secondary"
                                            outline
                                            className="gap-1"
                                            text="High Priority"
                                            Icon={() => (
                                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                            )}
                                        />
                                    </div>
                                </div>

                                {/* Quick Info */}
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <Mail className="h-4 w-4" />
                                            <span className="break-all">
                                                {student.email}
                                            </span>
                                        </div>
                                        <Copy
                                            onClick={handleCopyStudentId}
                                            className="h-3 w-3 text-gray-600"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <FileText className="h-4 w-4" />
                                            <span>{student.studentId}</span>
                                        </div>

                                        <Copy
                                            onClick={handleCopyStudentId}
                                            className="h-3 w-3 text-gray-600"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Building2 className="h-4 w-4 flex-shrink-0" />
                                        <span className="break-words">
                                            {student.course}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Quick Actions - Desktop */}
                        <div className="hidden flex-wrap gap-2 md:flex">
                            <Button
                                variant="action"
                                className="gap-2"
                                onClick={onCreateTicket}
                            >
                                <FileText className="h-4 w-4" />
                                Create Ticket
                            </Button>
                            <Button
                                variant="action"
                                className="gap-2"
                                onClick={onAddNote}
                            >
                                <FileText className="h-4 w-4" />
                                Add Note
                            </Button>
                        </div>
                    </div>

                    {/* Quick Stats Bar */}
                    <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
                        <motion.div
                            whileHover={{ scale: 1.05, y: -2 }}
                            className="rounded-xl bg-background/80 p-3 backdrop-blur-sm md:p-4"
                        >
                            <div className="flex items-center gap-2">
                                <div className="rounded-lg bg-primaryNew/10 p-2">
                                    <Target className="h-4 w-4 text-primaryNew" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Progress
                                    </p>
                                    <p className="text-base md:text-lg">
                                        48/120 hrs
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05, y: -2 }}
                            className="rounded-xl bg-background/80 p-3 backdrop-blur-sm md:p-4"
                        >
                            <div className="flex items-center gap-2">
                                <div className="rounded-lg bg-blue-500/10 p-2">
                                    <Calendar className="h-4 w-4 text-blue-500" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Shifts
                                    </p>
                                    <p className="text-base md:text-lg">
                                        {upcomingShifts} upcoming
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05, y: -2 }}
                            className="rounded-xl bg-background/80 p-3 backdrop-blur-sm md:p-4"
                        >
                            <div className="flex items-center gap-2">
                                <div className="rounded-lg bg-primaryNew/10 p-2">
                                    <Timer className="h-4 w-4 text-primaryNew" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Time Left
                                    </p>
                                    <p className="text-base md:text-lg">
                                        {daysRemaining} days
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05, y: -2 }}
                            className="rounded-xl bg-background/80 p-3 backdrop-blur-sm md:p-4"
                        >
                            <div className="flex items-center gap-2">
                                <div className="rounded-lg bg-primaryNew/10 p-2">
                                    <FileText className="h-4 w-4 text-primaryNew" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Pending
                                    </p>
                                    <p className="text-base md:text-lg">
                                        {pendingTasks} task
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>

            {/* Host Organizations / Workplaces */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <WorkplaceSection
                    workplaces={workplaces}
                    onAddWorkplace={onAddWorkplace}
                />
            </motion.div>
        </div>
    )
}
