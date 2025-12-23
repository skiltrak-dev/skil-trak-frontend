import { motion, AnimatePresence } from 'framer-motion'
import {
    ChevronDown,
    Users,
    Clock,
    Star,
    AlertCircle,
    CheckCircle2,
    FileCheck,
    UserCheck,
    Sparkles,
    AlertTriangle,
    Download,
    Eye,
    Zap,
    ChevronRight,
    Calendar,
    User,
} from 'lucide-react'
import { Course } from './types'
import { Button } from '@components'
import { useState } from 'react'
import { TaskConfirmationModal } from './modals/TaskConfirmationModal'

interface CourseCardProps {
    course: Course
    courseIndex: number
    sectorId?: number
    isExpanded: boolean
    isESignatureExpanded?: boolean
    onToggleCourse: (courseId: number) => void
    onToggleESignature?: (sectorId: number) => void
    onUpdateFacilityChecklistStatus: (
        courseId: number,
        status: 'approved' | 'rejected' | 'pending'
    ) => void
    onConfirmTask: (
        courseId: number,
        taskId: number,
        method: 'industry' | 'sourcing' | 'direct'
    ) => void
    onStartApprovingFacilityChecklist?: (
        courseId: number,
        sectorId: number
    ) => void
}

export function CourseCard({
    course,
    courseIndex,
    sectorId,
    isExpanded,
    isESignatureExpanded,
    onToggleCourse,
    onToggleESignature,
    onUpdateFacilityChecklistStatus,
    onConfirmTask,
    onStartApprovingFacilityChecklist,
}: CourseCardProps) {
    const [confirmingTask, setConfirmingTask] = useState<number | null>(null)

    const utilizationRate = Math.round(
        (course.students / course.capacity) * 100
    )
    const isApproved = course.courseApprovalStatus === 'approved'
    const needsApproval =
        course.facilityChecklistStatus === 'signed' && !isApproved
    const isPending =
        course.facilityChecklistStatus === 'pending' ||
        !course.facilityChecklistStatus
    const isRejected = course.facilityChecklistStatus === 'rejected'
    const hasSupervisor = course.supervisorAdded === true

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: courseIndex * 0.05 }}
            className={`rounded-xl overflow-hidden transition-all duration-300 ${isApproved
                ? 'bg-gradient-to-br from-[#10B981]/10 via-white to-[#059669]/10 border-2 border-[#10B981]/30 shadow-lg'
                : needsApproval
                    ? 'bg-gradient-to-br from-[#F7A619]/10 via-white to-[#EA580C]/10 border-2 border-[#F7A619]/40 shadow-lg animate-pulse-slow'
                    : isRejected
                        ? 'bg-gradient-to-br from-[#EF4444]/5 via-white to-[#DC2626]/5 border-2 border-[#EF4444]/30'
                        : 'bg-white border border-[#E2E8F0] hover:shadow-md hover:border-[#044866]/20'
                }`}
        >
            {/* Course Header */}
            <div className="p-4">
                <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1">
                        {/* Course Title & Code */}
                        <div className="flex items-center gap-2 mb-2">
                            <div
                                className={`px-2 py-1 rounded-md text-[10px] font-bold ${isApproved
                                    ? 'bg-[#10B981]/20 text-[#10B981]'
                                    : 'bg-[#044866]/10 text-[#044866]'
                                    }`}
                            >
                                {course.code}
                            </div>
                            {isApproved && (
                                <div className="px-2 py-1 bg-gradient-to-r from-[#10B981] to-[#059669] text-white rounded-md text-[10px] font-bold flex items-center gap-1 shadow-md">
                                    <CheckCircle2 className="w-3 h-3" />
                                    FULLY APPROVED
                                </div>
                            )}
                            {needsApproval && (
                                <div className="px-2 py-1 bg-gradient-to-r from-[#F7A619] to-[#EA580C] text-white rounded-md text-[10px] font-bold flex items-center gap-1 shadow-md animate-pulse">
                                    <AlertCircle className="w-3 h-3" />
                                    ACTION REQUIRED
                                </div>
                            )}
                            {isRejected && (
                                <div className="px-2 py-1 bg-gradient-to-r from-[#EF4444] to-[#DC2626] text-white rounded-md text-[10px] font-bold flex items-center gap-1">
                                    <AlertTriangle className="w-3 h-3" />
                                    CHANGES REQUESTED
                                </div>
                            )}
                        </div>

                        <h4 className="text-sm font-bold text-[#1A2332] mb-2">
                            {course.name}
                        </h4>

                        {/* Workflow Status Indicators */}
                        <div className="flex items-center gap-2 flex-wrap">
                            {/* Facility Checklist Status */}
                            <div
                                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-medium ${isApproved
                                    ? 'bg-[#10B981]/10 text-[#10B981]'
                                    : needsApproval
                                        ? 'bg-[#F7A619]/20 text-[#F7A619]'
                                        : isRejected
                                            ? 'bg-[#EF4444]/10 text-[#EF4444]'
                                            : 'bg-[#64748B]/10 text-[#64748B]'
                                    }`}
                            >
                                <FileCheck className="w-3 h-3" />
                                {isApproved && 'Checklist Approved'}
                                {needsApproval && 'Pending Your Approval'}
                                {isRejected && 'Checklist Rejected'}
                                {isPending && 'Awaiting E-Signature'}
                            </div>

                            {/* Supervisor Status */}
                            <div
                                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-medium ${hasSupervisor
                                    ? 'bg-[#10B981]/10 text-[#10B981]'
                                    : 'bg-[#64748B]/10 text-[#64748B]'
                                    }`}
                            >
                                <UserCheck className="w-3 h-3" />
                                {hasSupervisor
                                    ? 'Supervisor Added'
                                    : 'Supervisor Pending'}
                            </div>

                            {/* Programs */}
                            {course.programs && course.programs.length > 0 && (
                                <div className="flex items-center gap-1 flex-wrap">
                                    {course.programs
                                        .slice(0, 2)
                                        .map((program, idx) => (
                                            <div
                                                key={idx}
                                                className="px-2 py-1 bg-[#E8F4F8] text-[#044866] rounded-md text-[10px] font-medium"
                                            >
                                                {program}
                                            </div>
                                        ))}
                                    {course.programs.length > 2 && (
                                        <div className="px-2 py-1 bg-[#E8F4F8] text-[#044866] rounded-md text-[10px] font-medium">
                                            +{course.programs.length - 2} more
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Expand Button */}
                    <motion.button
                        onClick={() => onToggleCourse(course.id)}
                        animate={{ rotate: isExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${isApproved
                            ? 'bg-[#10B981]/10 hover:bg-[#10B981]/20 text-[#10B981]'
                            : needsApproval
                                ? 'bg-[#F7A619]/10 hover:bg-[#F7A619]/20 text-[#F7A619]'
                                : 'bg-[#F8FAFB] hover:bg-[#E8F4F8] text-[#044866]'
                            }`}
                    >
                        <ChevronDown className="w-4 h-4" />
                    </motion.button>
                </div>

                {/* Action Button for Approval */}
                {needsApproval && onStartApprovingFacilityChecklist && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-r from-[#F7A619]/10 to-[#EA580C]/10 border border-[#F7A619]/30 rounded-lg p-3"
                    >
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-[#F7A619] to-[#EA580C] rounded-lg flex items-center justify-center">
                                    <AlertCircle className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-[#1A2332]">
                                        Facility Checklist Ready for Review
                                    </p>
                                    <p className="text-[10px] text-[#64748B]">
                                        Industry partner signed on{' '}
                                        {course.facilityChecklistSignedDate ||
                                            'recently'}
                                    </p>
                                </div>
                            </div>
                            <Button
                                onClick={() =>
                                    onStartApprovingFacilityChecklist(
                                        course.id,
                                        sectorId!
                                    )
                                }
                                className="bg-gradient-to-r from-[#F7A619] to-[#EA580C] hover:from-[#EA580C] hover:to-[#D97706] text-white text-xs h-9 px-4 gap-2 shadow-lg shadow-[#F7A619]/30"
                            >
                                <FileCheck className="w-3.5 h-3.5" />
                                Review & Approve
                            </Button>
                        </div>
                    </motion.div>
                )}

                {/* Success Banner for Approved Courses */}
                {isApproved && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gradient-to-r from-[#10B981]/10 to-[#059669]/10 border border-[#10B981]/30 rounded-lg p-3 flex items-center gap-2"
                    >
                        <div className="w-8 h-8 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-lg flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                            <p className="text-xs font-bold text-[#10B981]">
                                Course Fully Approved & Active
                            </p>
                            <p className="text-[10px] text-[#059669]">
                                {course.facilityChecklistApprovedDate && (
                                    <>
                                        Approved on{' '}
                                        {course.facilityChecklistApprovedDate}
                                        {course.facilityChecklistApprovedBy &&
                                            ` by ${course.facilityChecklistApprovedBy}`}
                                    </>
                                )}
                                {!course.facilityChecklistApprovedDate &&
                                    'Facility checklist approved'}
                                {' • Supervisor assigned'}
                            </p>
                        </div>
                    </motion.div>
                )}

                {/* Rejected Status */}
                {isRejected && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gradient-to-r from-[#EF4444]/10 to-[#DC2626]/10 border border-[#EF4444]/30 rounded-lg p-3"
                    >
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-[#EF4444] to-[#DC2626] rounded-lg flex items-center justify-center">
                                    <AlertTriangle className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-[#EF4444]">
                                        Changes Requested
                                    </p>
                                    <p className="text-[10px] text-[#DC2626]">
                                        Facility checklist requires
                                        modifications
                                    </p>
                                </div>
                            </div>
                            <Button
                                variant="primaryNew"
                                outline
                                className="border-[#EF4444]/30 text-[#EF4444] hover:bg-[#EF4444]/10 text-xs h-9 px-4"
                            >
                                Contact Industry
                            </Button>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Expanded Details */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden border-t border-[#E2E8F0]"
                    >
                        <div className="p-4 bg-[#F8FAFB] space-y-4">
                            {/* Programs & Services */}
                            {course.programsAndServices && (
                                <div>
                                    <h5 className="text-xs font-bold text-[#1A2332] mb-2">
                                        Programs & Services
                                    </h5>
                                    <p className="text-[10px] text-[#64748B] leading-relaxed">
                                        {course.programsAndServices}
                                    </p>
                                </div>
                            )}

                            {/* Highlighted Tasks */}
                            {course.highlightedTasks &&
                                course.highlightedTasks.length > 0 && (
                                    <div>
                                        {/* Header */}
                                        <div className="bg-gradient-to-r from-[#F7A619] to-[#EA580C] rounded-t-xl px-4 py-3 flex items-center gap-2 shadow-lg">
                                            <Zap
                                                className="w-4 h-4 text-white"
                                                fill="white"
                                            />
                                            <h5 className="text-sm font-bold text-white">
                                                Highlighted Tasks
                                            </h5>
                                        </div>

                                        {/* Tasks List */}
                                        <div className="bg-white rounded-b-xl border-2 border-[#E2E8F0] border-t-0">
                                            <div className="p-4 space-y-3">
                                                {course.highlightedTasks.map(
                                                    (task, taskIdx) => (
                                                        <motion.div
                                                            key={task.id}
                                                            initial={{
                                                                opacity: 0,
                                                                x: -20,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                                x: 0,
                                                            }}
                                                            transition={{
                                                                delay:
                                                                    taskIdx *
                                                                    0.1,
                                                            }}
                                                            className="bg-gradient-to-br from-[#FAFBFC] to-white rounded-lg border border-[#E2E8F0] overflow-hidden hover:shadow-md transition-all"
                                                        >
                                                            {/* Task Description */}
                                                            <div className="p-3 flex items-start gap-2">
                                                                <ChevronRight className="w-4 h-4 text-[#F7A619] flex-shrink-0 mt-0.5" />
                                                                <p className="text-xs text-[#1A2332] flex-1">
                                                                    {
                                                                        task.description
                                                                    }
                                                                </p>
                                                            </div>

                                                            {/* Confirmation Status/Button */}
                                                            {task.confirmed ? (
                                                                <div className="px-3 pb-3">
                                                                    <div className="bg-gradient-to-br from-[#10B981]/10 to-[#059669]/5 border border-[#10B981]/20 rounded-lg p-2.5">
                                                                        <div className="flex items-center gap-2 mb-2">
                                                                            <CheckCircle2
                                                                                className="w-3.5 h-3.5 text-[#10B981]"
                                                                                fill="currentColor"
                                                                            />
                                                                            <span className="text-[10px] font-bold text-[#10B981] uppercase tracking-wide">
                                                                                Confirmed
                                                                            </span>
                                                                        </div>
                                                                        <div className="flex items-center gap-3 text-[9px] text-[#059669]">
                                                                            <div className="flex items-center gap-1">
                                                                                <User className="w-3 h-3" />
                                                                                <span>
                                                                                    {
                                                                                        task.confirmedBy
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                            <div className="flex items-center gap-1">
                                                                                <Calendar className="w-3 h-3" />
                                                                                <span>
                                                                                    {
                                                                                        task.confirmedAt
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className="px-3 pb-3">
                                                                    <motion.button
                                                                        whileHover={{
                                                                            scale: 1.02,
                                                                        }}
                                                                        whileTap={{
                                                                            scale: 0.98,
                                                                        }}
                                                                        onClick={() =>
                                                                            setConfirmingTask(
                                                                                task.id
                                                                            )
                                                                        }
                                                                        className="w-full bg-gradient-to-r from-[#F7A619]/10 to-[#EA580C]/10 hover:from-[#F7A619]/20 hover:to-[#EA580C]/20 border-2 border-[#F7A619]/30 hover:border-[#F7A619] rounded-lg px-3 py-2 flex items-center justify-center gap-2 transition-all"
                                                                    >
                                                                        <CheckCircle2 className="w-3.5 h-3.5 text-[#F7A619]" />
                                                                        <span className="text-xs font-bold text-[#F7A619]">
                                                                            Confirm
                                                                            with
                                                                            Workplace
                                                                        </span>
                                                                    </motion.button>
                                                                </div>
                                                            )}
                                                        </motion.div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                            {/* Activities */}
                            {course.activities &&
                                course.activities.length > 0 && (
                                    <div>
                                        <h5 className="text-xs font-bold text-[#1A2332] mb-2">
                                            Student Activities
                                        </h5>
                                        <ul className="space-y-1.5">
                                            {course.activities.map(
                                                (activity, idx) => (
                                                    <li
                                                        key={idx}
                                                        className="flex items-start gap-2 text-[10px] text-[#64748B]"
                                                    >
                                                        <div className="w-1.5 h-1.5 rounded-full bg-[#044866] mt-1 flex-shrink-0" />
                                                        <span>{activity}</span>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                )}

                            {/* Document Actions (if signed or approved) */}
                            {(needsApproval || isApproved) && (
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="primaryNew"
                                        outline
                                        className="text-xs h-8 gap-2"
                                    >
                                        <Eye className="w-3 h-3" />
                                        View Checklist
                                    </Button>
                                    <Button
                                        variant="primaryNew"
                                        outline
                                        className="text-xs h-8 gap-2"
                                    >
                                        <Download className="w-3 h-3" />
                                        Download PDF
                                    </Button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Task Confirmation Modal */}
            {confirmingTask !== null && (
                <TaskConfirmationModal
                    isOpen={true}
                    onClose={() => setConfirmingTask(null)}
                    taskDescription={
                        course.highlightedTasks?.find(
                            (t) => t.id === confirmingTask
                        )?.description || ''
                    }
                    onConfirm={(method) => {
                        onConfirmTask(course.id, confirmingTask, method)
                        setConfirmingTask(null)
                    }}
                />
            )}
        </motion.div>
    )
}
