import { AnimatePresence, motion } from 'framer-motion'
import {
    AlertCircle,
    BookOpen,
    CheckCircle2,
    ChevronDown,
    Sparkles,
    UserCheck,
    Users,
} from 'lucide-react'
import { useState } from 'react'
import { CourseCard } from './CourseCard'
import { SupervisorsModal } from './modals/SupervisorsModal'
import { Sector } from './types'

interface SectorCardProps {
    sector: Sector
    sectorIndex: number
    isExpanded: boolean
    expandedCourses: number[]
    expandedESignatures: number[]
    onToggleSector: (sectorId: number) => void
    onToggleCourse: (courseId: number) => void
    onToggleESignature: (sectorId: number) => void
    onStartEditingSectorMetrics: (sectorId: number) => void
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

export function SectorCard({
    sector,
    sectorIndex,
    isExpanded,
    expandedCourses,
    expandedESignatures,
    onToggleSector,
    onToggleCourse,
    onToggleESignature,
    onStartEditingSectorMetrics,
    onUpdateFacilityChecklistStatus,
    onConfirmTask,
    onStartApprovingFacilityChecklist,
}: SectorCardProps) {
    const [showSupervisorsModal, setShowSupervisorsModal] = useState(false)

    // Calculate sector statistics
    const totalStudents = sector.courses.reduce((sum, c) => sum + c.students, 0)
    const totalCapacity = sector.courses.reduce((sum, c) => sum + c.capacity, 0)
    const utilizationRate = Math.round((totalStudents / totalCapacity) * 100)

    // Calculate approval status
    const approvedCourses = sector.courses.filter(
        (c) => c.courseApprovalStatus === 'approved'
    ).length
    const pendingApprovalCourses = sector.courses.filter(
        (c) =>
            c.facilityChecklistStatus === 'signed' &&
            c.courseApprovalStatus !== 'approved'
    ).length
    const hasPendingActions = pendingApprovalCourses > 0
    const sectorApproved = approvedCourses > 0

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectorIndex * 0.1 }}
            className={`rounded-2xl border-2 overflow-hidden transition-all duration-300 ${
                sectorApproved
                    ? 'bg-gradient-to-br from-[#10B981]/5 via-white to-[#059669]/5 border-[#10B981]/30 shadow-lg shadow-[#10B981]/10'
                    : hasPendingActions
                    ? 'bg-gradient-to-br from-[#F7A619]/5 via-white to-[#EA580C]/5 border-[#F7A619]/40 shadow-lg shadow-[#F7A619]/10'
                    : 'bg-white border-[#E2E8F0] hover:shadow-xl hover:border-[#044866]/20'
            }`}
        >
            {/* Sector Header */}
            <div
                onClick={() => onToggleSector(sector.id)}
                className="cursor-pointer p-5 relative"
            >
                {/* Status Indicator Strip */}
                <div
                    className={`absolute top-0 left-0 right-0 h-1 ${
                        sectorApproved
                            ? 'bg-gradient-to-r from-[#10B981] via-[#059669] to-[#10B981]'
                            : hasPendingActions
                            ? 'bg-gradient-to-r from-[#F7A619] via-[#EA580C] to-[#F7A619]'
                            : 'bg-gradient-to-r from-[#044866] via-[#0D5468] to-[#044866]'
                    }`}
                />

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                        {/* Sector Icon */}
                        <div
                            className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-lg relative ${
                                sectorApproved
                                    ? 'bg-gradient-to-br from-[#10B981] to-[#059669]'
                                    : hasPendingActions
                                    ? 'bg-gradient-to-br from-[#F7A619] to-[#EA580C]'
                                    : `bg-gradient-to-br ${sector.color}`
                            }`}
                        >
                            <span className="drop-shadow-lg">
                                {sector.icon}
                            </span>
                            {sectorApproved && (
                                <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                                    <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                                </div>
                            )}
                            {hasPendingActions && (
                                <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md animate-pulse">
                                    <AlertCircle className="w-4 h-4 text-[#F7A619]" />
                                </div>
                            )}
                        </div>

                        {/* Sector Info */}
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="text-lg font-bold text-[#1A2332]">
                                    {sector.name}
                                </h3>
                                {sectorApproved && (
                                    <>
                                        <div className="px-2.5 py-1 bg-gradient-to-r from-[#10B981] to-[#059669] text-white rounded-full text-[10px] font-bold flex items-center gap-1 shadow-md">
                                            <CheckCircle2 className="w-3 h-3" />
                                            APPROVED
                                        </div>
                                        {/* View Supervisors Button */}
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setShowSupervisorsModal(true)
                                            }}
                                            className="px-2.5 py-1 bg-gradient-to-br from-[#044866] to-[#0D5468] text-white rounded-full text-[10px] font-bold flex items-center gap-1 shadow-md hover:shadow-lg transition-all"
                                            title="View Supervisors"
                                        >
                                            <UserCheck className="w-3 h-3" />
                                            {sector.supervisors.length}{' '}
                                            {sector.supervisors.length === 1
                                                ? 'Supervisor'
                                                : 'Supervisors'}
                                        </motion.button>
                                    </>
                                )}
                                {hasPendingActions && !sectorApproved && (
                                    <div className="px-2.5 py-1 bg-gradient-to-r from-[#F7A619] to-[#EA580C] text-white rounded-full text-[10px] font-bold flex items-center gap-1 shadow-md animate-pulse">
                                        <AlertCircle className="w-3 h-3" />
                                        {pendingApprovalCourses} PENDING
                                        APPROVAL
                                    </div>
                                )}
                            </div>

                            {/* Metrics */}
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-1.5">
                                    <div
                                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                            sectorApproved
                                                ? 'bg-[#10B981]/10'
                                                : 'bg-[#044866]/10'
                                        }`}
                                    >
                                        <BookOpen
                                            className={`w-4 h-4 ${
                                                sectorApproved
                                                    ? 'text-[#10B981]'
                                                    : 'text-[#044866]'
                                            }`}
                                        />
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#64748B]">
                                            Courses
                                        </p>
                                        <p className="text-sm font-bold text-[#1A2332]">
                                            {sector.courses.length}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1.5">
                                    <div
                                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                            sectorApproved
                                                ? 'bg-[#10B981]/10'
                                                : 'bg-[#044866]/10'
                                        }`}
                                    >
                                        <Users
                                            className={`w-4 h-4 ${
                                                sectorApproved
                                                    ? 'text-[#10B981]'
                                                    : 'text-[#044866]'
                                            }`}
                                        />
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#64748B]">
                                            Students
                                        </p>
                                        <p className="text-sm font-bold text-[#1A2332]">
                                            {totalStudents}/{totalCapacity}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1.5">
                                    <div
                                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                            utilizationRate >= 80
                                                ? 'bg-[#10B981]/10'
                                                : utilizationRate >= 50
                                                ? 'bg-[#F7A619]/10'
                                                : 'bg-[#64748B]/10'
                                        }`}
                                    >
                                        <Sparkles
                                            className={`w-4 h-4 ${
                                                utilizationRate >= 80
                                                    ? 'text-[#10B981]'
                                                    : utilizationRate >= 50
                                                    ? 'text-[#F7A619]'
                                                    : 'text-[#64748B]'
                                            }`}
                                        />
                                    </div>
                                    <div>
                                        <p className="text-xs text-[#64748B]">
                                            Utilization
                                        </p>
                                        <p className="text-sm font-bold text-[#1A2332]">
                                            {utilizationRate}%
                                        </p>
                                    </div>
                                </div>

                                {approvedCourses > 0 && (
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-8 h-8 rounded-lg bg-[#10B981]/10 flex items-center justify-center">
                                            <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-[#64748B]">
                                                Approved
                                            </p>
                                            <p className="text-sm font-bold text-[#10B981]">
                                                {approvedCourses}/
                                                {sector.courses.length}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Expand Button */}
                        <motion.button
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                                sectorApproved
                                    ? 'bg-[#10B981]/10 hover:bg-[#10B981]/20 text-[#10B981]'
                                    : hasPendingActions
                                    ? 'bg-[#F7A619]/10 hover:bg-[#F7A619]/20 text-[#F7A619]'
                                    : 'bg-[#F8FAFB] hover:bg-[#E8F4F8] text-[#044866]'
                            }`}
                        >
                            <ChevronDown className="w-5 h-5" />
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Courses List */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="px-5 pb-5 space-y-3">
                            {sector.courses.map((course, courseIndex) => (
                                <CourseCard
                                    key={course.id}
                                    course={course}
                                    courseIndex={courseIndex}
                                    sectorId={sector.id}
                                    isExpanded={expandedCourses.includes(
                                        course.id
                                    )}
                                    isESignatureExpanded={expandedESignatures.includes(
                                        sector.id
                                    )}
                                    onToggleCourse={onToggleCourse}
                                    onToggleESignature={onToggleESignature}
                                    onUpdateFacilityChecklistStatus={
                                        onUpdateFacilityChecklistStatus
                                    }
                                    onConfirmTask={onConfirmTask}
                                    onStartApprovingFacilityChecklist={
                                        onStartApprovingFacilityChecklist
                                    }
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Supervisors Modal */}
            <SupervisorsModal
                isOpen={showSupervisorsModal}
                onClose={() => setShowSupervisorsModal(false)}
                supervisors={sector.supervisors}
                sectorName={sector.name}
            />
        </motion.div>
    )
}
