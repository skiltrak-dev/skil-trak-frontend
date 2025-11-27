import React, { useState } from 'react'

// components
import { Badge, Button, Card, Typography } from '@components'
// shadcn ui
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@components/ui/tooltip'
import { AnimatePresence, motion } from 'framer-motion'
import {
    AlertCircle,
    Award,
    Briefcase,
    Building2,
    Calendar,
    CalendarCheck,
    CheckCircle2,
    CheckSquare,
    ChevronRight,
    ClipboardCheck,
    Clock,
    Download,
    Eye,
    FileCheck,
    FileSignature,
    FileText,
    Flag,
    GraduationCap,
    Info,
    ListChecks,
    Mail,
    MapPin,
    MapPinned,
    MessageSquare,
    Phone,
    Play,
    Shield,
    Sparkles,
    Target,
    ThumbsDown,
    ThumbsUp,
    TrendingUp,
    Upload,
    User,
    XCircle,
    Zap
} from 'lucide-react'

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

export const WorkplaceProgressbar = ({ currentStatus }: any) => {
    const [workplaceType, setWorkplaceType] = useState<
        'needs' | 'provided' | null
    >(null)
    const workflowStages =
        workplaceType === 'provided'
            ? providedWorkplaceStages
            : needsWorkplaceStages
    const getCurrentStageIndex = () => {
        const stage = workflowStages.find((s) => s.name === currentStatus)
        return stage ? stage.id - 1 : 0
    }

    return (
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
                        className={`${workplaceType === 'provided'
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
                        width: `${((getCurrentStageIndex() + 1) /
                            workflowStages.length) *
                            100
                            }%`,
                    }}
                    transition={{
                        duration: 0.8,
                        ease: 'easeOut',
                    }}
                    className={`absolute inset-y-0 left-0 ${workplaceType === 'provided'
                        ? 'bg-gradient-to-r from-purple-500 to-indigo-500'
                        : 'bg-gradient-to-r from-[#044866] to-[#0D5468]'
                        } rounded-full`}
                />
            </div>

            {/* Stages */}
            <div className="grid grid-cols-6 lg:grid-cols-12 gap-2 mt-4">
                {workflowStages?.map((stage, index) => {
                    const isActive =
                        index === getCurrentStageIndex()
                    const isCompleted =
                        index < getCurrentStageIndex()

                    return (
                        <TooltipProvider key={index}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <div
                                        className={`flex flex-col items-center gap-1.5 p-2 rounded-lg transition-all cursor-pointer ${isActive
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
                                            className={`w-8 h-8 rounded-full flex items-center justify-center ${isActive
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
                                            className={`text-xs text-center font-medium hidden lg:block ${isActive
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
    )
}
