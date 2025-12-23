import {
    Star,
    Clock,
    CheckCircle,
    X,
    MoreVertical,
    ChevronDown,
    Target,
    FileText,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Course } from './types'
import { useState } from 'react'
import { FacilityChecklistDialog } from './modals/FacilityChecklistDialog'

interface CourseHeaderProps {
    course: Course
    isCourseExpanded: boolean
    onUpdateFacilityChecklistStatus: (
        courseId: number,
        status: 'approved' | 'rejected' | 'pending'
    ) => void
}

export function CourseHeader({
    course,
    isCourseExpanded,
    onUpdateFacilityChecklistStatus,
}: CourseHeaderProps) {
    const [isChecklistOpen, setIsChecklistOpen] = useState(false)

    // Determine background color based on approval status
    const getBackgroundColor = () => {
        if (
            !course.facilityChecklistStatus ||
            course.facilityChecklistStatus === 'pending'
        ) {
            return 'bg-gradient-to-br from-[#FEE2E2] to-[#FECACA]' // Red
        }
        if (course.facilityChecklistStatus === 'approved') {
            return 'bg-gradient-to-br from-[#D1FAE5] to-[#A7F3D0]' // Green
        }
        return 'bg-gradient-to-br from-[#FEE2E2] to-[#FECACA]' // Red for rejected
    }

    const handleApprove = (courseId: number) => {
        onUpdateFacilityChecklistStatus(courseId, 'approved')
    }

    const handleReject = (courseId: number) => {
        onUpdateFacilityChecklistStatus(courseId, 'rejected')
    }

    return (
        <>
            <div
                className={`w-full h-auto p-4 hover:opacity-95 transition-all duration-300 text-left group ${getBackgroundColor()}`}
            >
                {/* Top Row - Title & Badges */}
                <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                            <span className="text-xs font-mono font-bold bg-gradient-to-br from-[#044866] to-[#0D5468] text-white px-2.5 py-1 rounded-md shadow-md">
                                {course.code}
                            </span>
                            <span
                                className={`text-xs font-medium px-2.5 py-1 rounded-md shadow-sm ${
                                    course.status === 'Active'
                                        ? 'bg-gradient-to-br from-[#D1FAE5] to-[#A7F3D0] text-[#065F46]'
                                        : 'bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] text-[#92400E]'
                                }`}
                            >
                                {course.status}
                            </span>
                            {course.rating && (
                                <div className="flex items-center gap-1 bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] px-2.5 py-1 rounded-md shadow-sm">
                                    <Star className="w-3 h-3 fill-[#F7A619] text-[#F7A619]" />
                                    <span className="text-xs font-bold text-[#92400E]">
                                        {course.rating}
                                    </span>
                                </div>
                            )}
                            {course.courseHours && (
                                <div className="flex items-center gap-1 bg-gradient-to-br from-[#E8F4F8] to-[#D1E7F0] px-2.5 py-1 rounded-md shadow-sm">
                                    <Clock className="w-3 h-3 text-[#044866]" />
                                    <span className="text-xs font-bold text-[#044866]">
                                        {course.courseHours} hrs
                                    </span>
                                </div>
                            )}
                            {/* Approval Status Badge */}
                            {course.facilityChecklistStatus === 'approved' && (
                                <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-md shadow-sm border border-[#10B981]">
                                    <CheckCircle
                                        className="w-3 h-3 text-[#10B981]"
                                        fill="currentColor"
                                    />
                                    <span className="text-xs font-bold text-[#065F46]">
                                        Approved
                                    </span>
                                </div>
                            )}
                            {course.facilityChecklistStatus === 'rejected' && (
                                <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-md shadow-sm border border-[#DC2626]">
                                    <X className="w-3 h-3 text-[#DC2626]" />
                                    <span className="text-xs font-bold text-[#991B1B]">
                                        Rejected
                                    </span>
                                </div>
                            )}
                        </div>
                        <h5 className="font-bold text-[#1A2332] mb-1.5 text-sm">
                            {course.name}
                        </h5>
                        {course.programs && (
                            <p className="text-xs text-[#64748B]">
                                {course.programs.join(' • ')}
                            </p>
                        )}

                        {/* Streams - Prominent Display */}
                        {course.streams && (
                            <div className="mt-2">
                                <div className="flex items-center gap-1.5 mb-1.5">
                                    <Target className="w-3 h-3 text-[#044866]" />
                                    <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wide">
                                        Streams
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                    {course.streams.map((stream, idx) => (
                                        <span
                                            key={idx}
                                            className="text-[10px] font-medium px-1.5 py-0.5 bg-gradient-to-br from-[#E8F4F8] to-[#D1E7F0] text-[#044866] rounded"
                                        >
                                            {stream}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                        {/* Facility Checklist Button - Opens Modal */}
                        <motion.div
                            onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                setIsChecklistOpen(true)
                            }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-br from-[#044866] to-[#0D5468] hover:from-[#0D5468] hover:to-[#044866] text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-white/20 cursor-pointer"
                        >
                            <FileText className="w-3.5 h-3.5" />
                            <span className="text-[10px] font-bold uppercase tracking-wide">
                                Facility Checklist
                            </span>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => {
                                e.stopPropagation()
                            }}
                            className="p-1.5 rounded-md hover:bg-white/50 text-[#64748B] hover:text-[#044866] transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                        >
                            <MoreVertical className="w-4 h-4" />
                        </motion.div>
                        <motion.div
                            animate={{ rotate: isCourseExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                                isCourseExpanded
                                    ? 'bg-gradient-to-br from-[#044866] to-[#0D5468] text-white shadow-lg'
                                    : 'bg-white/50 text-[#64748B] group-hover:bg-white/70'
                            }`}
                        >
                            <ChevronDown className="w-4 h-4" />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Facility Checklist Modal */}
            <FacilityChecklistDialog
                course={course}
                isOpen={isChecklistOpen}
                onClose={() => setIsChecklistOpen(false)}
                onApprove={handleApprove}
                onReject={handleReject}
            />
        </>
    )
}
