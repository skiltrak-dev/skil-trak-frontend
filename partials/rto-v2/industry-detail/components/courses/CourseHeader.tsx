import {
    Star,
    Clock,
    CheckCircle,
    X,
    MoreVertical,
    ChevronDown,
    Target,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@components'
import { Course } from './types'

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
    return (
        <Button
            variant="action"
            className="w-full h-auto p-4 hover:bg-gradient-to-br hover:from-[#FAFBFC] hover:to-white transition-all duration-300 text-left group justify-start"
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
                    {/* Facility Checklist */}
                    <div
                        className="flex flex-col gap-1 mr-2"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="text-[8px] font-bold text-[#64748B] uppercase tracking-wide mb-0.5">
                            Facility Checklist
                        </div>
                        <div className="flex items-center gap-1">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onUpdateFacilityChecklistStatus(
                                        course.id,
                                        'approved'
                                    )
                                }}
                                className={`p-1 rounded transition-all ${
                                    course.facilityChecklistStatus ===
                                    'approved'
                                        ? 'bg-gradient-to-br from-[#D1FAE5] to-[#A7F3D0] text-[#065F46]'
                                        : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFB]'
                                }`}
                            >
                                <CheckCircle className="w-3 h-3" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onUpdateFacilityChecklistStatus(
                                        course.id,
                                        'rejected'
                                    )
                                }}
                                className={`p-1 rounded transition-all ${
                                    course.facilityChecklistStatus ===
                                    'rejected'
                                        ? 'bg-gradient-to-br from-[#FEE2E2] to-[#FECACA] text-[#DC2626]'
                                        : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFB]'
                                }`}
                            >
                                <X className="w-3 h-3" />
                            </motion.button>
                        </div>
                    </div>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                            e.stopPropagation()
                        }}
                        className="p-1.5 rounded-md hover:bg-[#F8FAFB] text-[#64748B] hover:text-[#044866] transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                    >
                        <MoreVertical className="w-4 h-4" />
                    </motion.div>
                    <motion.div
                        animate={{ rotate: isCourseExpanded ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                            isCourseExpanded
                                ? 'bg-gradient-to-br from-[#044866] to-[#0D5468] text-white shadow-lg'
                                : 'bg-[#F8FAFB] text-[#64748B] group-hover:bg-[#E8F4F8]'
                        }`}
                    >
                        <ChevronDown className="w-4 h-4" />
                    </motion.div>
                </div>
            </div>
        </Button>
    )
}
