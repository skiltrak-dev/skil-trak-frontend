import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@components/ui/collapsible'
import { motion } from 'framer-motion'
import {
    AlertCircle,
    Award,
    CheckCircle,
    ChevronDown,
    Clock,
    FileText,
    Globe,
    MapPin,
    MoreVertical,
    Settings,
    Sparkles,
    Star,
    Target,
    Users,
} from 'lucide-react'

export const CourseCard = ({
    course,
    isCourseExpanded,
    toggleCourse,
    courseIndex,
}: {
    course: any
    isCourseExpanded: boolean
    toggleCourse: (id: number) => void
    courseIndex: number
}) => {
    return (
        <Collapsible
            key={course.id}
            open={isCourseExpanded}
            onOpenChange={() => toggleCourse(course.id)}
        >
            <motion.div
                initial={{
                    opacity: 0,
                    y: 20,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                transition={{
                    delay: courseIndex * 0.1,
                }}
                className="bg-white rounded-lg border border-[#E2E8F0] overflow-hidden hover:border-[#044866]/30 hover:shadow-xl transition-all duration-500"
            >
                {/* Course Header - Premium */}
                <CollapsibleTrigger>
                    <div className="w-full h-auto p-4 hover:bg-gradient-to-br hover:from-[#FAFBFC] hover:to-white transition-all duration-300 text-left group justify-start">
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
                                            {course.streams.map(
                                                (
                                                    stream: string,
                                                    idx: number
                                                ) => (
                                                    <span
                                                        key={idx}
                                                        className="text-[10px] font-medium px-1.5 py-0.5 bg-gradient-to-br from-[#E8F4F8] to-[#D1E7F0] text-[#044866] rounded"
                                                    >
                                                        {stream}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-center gap-1.5 flex-shrink-0">
                                <motion.div
                                    whileHover={{
                                        scale: 1.05,
                                    }}
                                    whileTap={{
                                        scale: 0.95,
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                    }}
                                    className="p-1.5 rounded-md hover:bg-[#F8FAFB] text-[#64748B] hover:text-[#044866] transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                                >
                                    <MoreVertical className="w-4 h-4" />
                                </motion.div>
                                <motion.div
                                    animate={{
                                        rotate: isCourseExpanded ? 180 : 0,
                                    }}
                                    transition={{
                                        duration: 0.3,
                                    }}
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
                    </div>
                </CollapsibleTrigger>

                {/* Expanded Course Details - Premium Layout */}
                {course.courseHours && (
                    <CollapsibleContent className="overflow-hidden">
                        <motion.div
                            initial={{
                                opacity: 0,
                                y: -10,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            transition={{
                                duration: 0.3,
                            }}
                        >
                            <div className="px-4 pb-4 space-y-3 border-t border-[#E2E8F0] bg-gradient-to-b from-[#FAFBFC] to-white pt-3">
                                {/* Programs and Services - Combined Section */}
                                {(course.programsAndServices ||
                                    course.branchesAndLocations ||
                                    course.activities ||
                                    course.eligibilityNotes) && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: 10,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        transition={{
                                            delay: 0.1,
                                        }}
                                        className="bg-white rounded-xl p-5 border border-[#E2E8F0] shadow-sm"
                                    >
                                        <h6 className="text-sm font-bold text-[#044866] mb-4 flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#E8F4F8] to-[#D1E7F0] flex items-center justify-center">
                                                <Settings className="w-3.5 h-3.5 text-[#044866]" />
                                            </div>
                                            Programs and Services Offered
                                        </h6>

                                        <div className="space-y-4">
                                            {/* Main Programs and Services */}
                                            {course.programsAndServices && (
                                                <div>
                                                    <p className="text-sm text-[#64748B] leading-relaxed">
                                                        {
                                                            course.programsAndServices
                                                        }
                                                    </p>
                                                </div>
                                            )}

                                            {/* Branches and Locations */}
                                            {course.branchesAndLocations && (
                                                <div className="pt-4 border-t border-[#E2E8F0]">
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <MapPin className="w-4 h-4 text-[#044866]" />
                                                        <h6 className="text-sm font-bold text-[#1A2332]">
                                                            Branches & Site
                                                            Locations
                                                        </h6>
                                                    </div>
                                                    <p className="text-sm text-[#64748B] leading-relaxed">
                                                        {
                                                            course.branchesAndLocations
                                                        }
                                                    </p>
                                                </div>
                                            )}

                                            {/* Activities */}
                                            {course.activities && (
                                                <div className="pt-4 border-t border-[#E2E8F0]">
                                                    <h6 className="text-sm font-bold text-[#1A2332] mb-3">
                                                        Activities
                                                    </h6>
                                                    <div className="space-y-3">
                                                        {course.activities.map(
                                                            (
                                                                activity: string,
                                                                idx: number
                                                            ) => (
                                                                <motion.div
                                                                    key={idx}
                                                                    initial={{
                                                                        opacity: 0,
                                                                        x: -10,
                                                                    }}
                                                                    animate={{
                                                                        opacity: 1,
                                                                        x: 0,
                                                                    }}
                                                                    transition={{
                                                                        delay:
                                                                            idx *
                                                                            0.05,
                                                                    }}
                                                                    className="flex items-start gap-3"
                                                                >
                                                                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#D1FAE5] to-[#A7F3D0] flex items-center justify-center flex-shrink-0 mt-0.5">
                                                                        <CheckCircle className="w-4 h-4 text-[#10B981]" />
                                                                    </div>
                                                                    <p className="text-sm text-[#64748B] leading-relaxed flex-1">
                                                                        {
                                                                            activity
                                                                        }
                                                                    </p>
                                                                </motion.div>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Eligibility Notes */}
                                            {course.eligibilityNotes && (
                                                <div className="pt-4 border-t border-[#E2E8F0]">
                                                    <h6 className="text-sm font-bold text-[#1A2332] mb-2">
                                                        Eligibility Notes /
                                                        Justification for{' '}
                                                        {course.code}
                                                    </h6>
                                                    <p className="text-sm text-[#64748B] leading-relaxed">
                                                        {
                                                            course.eligibilityNotes
                                                        }
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Notes Grid - Enhanced */}
                                {(course.coordinatorNote ||
                                    course.hodComment ||
                                    course.note) && (
                                    <div className="grid gap-3">
                                        {course.coordinatorNote && (
                                            <motion.div
                                                initial={{
                                                    opacity: 0,
                                                    x: -10,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    x: 0,
                                                }}
                                                whileHover={{
                                                    scale: 1.01,
                                                }}
                                                className="bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] rounded-xl p-4 border border-[#FDE68A] shadow-sm"
                                            >
                                                <p className="text-xs font-bold text-[#F59E0B] uppercase tracking-wide mb-2 flex items-center gap-2">
                                                    <Sparkles className="w-3.5 h-3.5" />
                                                    SkilTrak Coordinator
                                                </p>
                                                <p className="text-sm text-[#92400E] leading-relaxed">
                                                    {course.coordinatorNote}
                                                </p>
                                            </motion.div>
                                        )}
                                        {course.hodComment && (
                                            <motion.div
                                                initial={{
                                                    opacity: 0,
                                                    x: -10,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    x: 0,
                                                }}
                                                transition={{
                                                    delay: 0.05,
                                                }}
                                                whileHover={{
                                                    scale: 1.01,
                                                }}
                                                className="bg-gradient-to-br from-[#DBEAFE] to-[#BFDBFE] rounded-xl p-4 border border-[#BFDBFE] shadow-sm"
                                            >
                                                <p className="text-xs font-bold text-[#3B82F6] uppercase tracking-wide mb-2 flex items-center gap-2">
                                                    <Award className="w-3.5 h-3.5" />
                                                    HOD Comment
                                                </p>
                                                <p className="text-sm text-[#1E40AF] leading-relaxed">
                                                    {course.hodComment}
                                                </p>
                                            </motion.div>
                                        )}
                                        {course.note && (
                                            <motion.div
                                                initial={{
                                                    opacity: 0,
                                                    x: -10,
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    x: 0,
                                                }}
                                                transition={{
                                                    delay: 0.1,
                                                }}
                                                whileHover={{
                                                    scale: 1.01,
                                                }}
                                                className="bg-gradient-to-br from-[#E0E7FF] to-[#C7D2FE] rounded-xl p-4 border border-[#C7D2FE] shadow-sm"
                                            >
                                                <p className="text-xs font-bold text-[#6366F1] uppercase tracking-wide mb-2 flex items-center gap-2">
                                                    <AlertCircle className="w-3.5 h-3.5" />
                                                    Internal Note
                                                </p>
                                                <p className="text-sm text-[#3730A3] leading-relaxed">
                                                    {course.note}
                                                </p>
                                            </motion.div>
                                        )}
                                    </div>
                                )}

                                {/* Metadata */}
                                {(course.requestedBy ||
                                    course.referenceUrl) && (
                                    <motion.div
                                        initial={{
                                            opacity: 0,
                                            y: 10,
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        transition={{
                                            delay: 0.15,
                                        }}
                                        className="bg-white rounded-xl p-4 border border-[#E2E8F0] shadow-sm"
                                    >
                                        <div className="grid gap-3">
                                            {course.requestedBy && (
                                                <div>
                                                    <p className="text-xs font-bold text-[#64748B] uppercase tracking-wide mb-1">
                                                        Requested By
                                                    </p>
                                                    <p className="text-sm text-[#1A2332]">
                                                        {course.requestedBy}
                                                    </p>
                                                </div>
                                            )}
                                            {course.referenceUrl && (
                                                <div>
                                                    <p className="text-xs font-bold text-[#64748B] uppercase tracking-wide mb-1">
                                                        Reference URL
                                                    </p>
                                                    <a
                                                        href={
                                                            course.referenceUrl
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-sm text-[#044866] hover:text-[#0D5468] underline-offset-2 hover:underline break-all transition-colors inline-flex items-center gap-1.5"
                                                        onClick={(e) =>
                                                            e.stopPropagation()
                                                        }
                                                    >
                                                        <Globe className="w-4 h-4 flex-shrink-0" />
                                                        {course.referenceUrl}
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Action Buttons - Premium Enhanced */}
                                <motion.div
                                    initial={{
                                        opacity: 0,
                                        y: 10,
                                    }}
                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    transition={{
                                        delay: 0.2,
                                    }}
                                    className="grid grid-cols-3 gap-3 pt-2"
                                >
                                    <motion.button
                                        whileHover={{
                                            scale: 1.02,
                                            y: -2,
                                        }}
                                        whileTap={{
                                            scale: 0.98,
                                        }}
                                        className="py-3 bg-gradient-to-br from-[#044866] to-[#0D5468] text-white rounded-xl text-sm font-medium hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        <Sparkles className="w-4 h-4" />
                                        Configure
                                    </motion.button>
                                    <motion.button
                                        whileHover={{
                                            scale: 1.02,
                                            y: -2,
                                        }}
                                        whileTap={{
                                            scale: 0.98,
                                        }}
                                        className="py-3 bg-white border-2 border-[#E2E8F0] text-[#044866] rounded-xl text-sm font-medium hover:border-[#044866] hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        <Users className="w-4 h-4" />
                                        Students
                                    </motion.button>
                                    <motion.button
                                        whileHover={{
                                            scale: 1.02,
                                            y: -2,
                                        }}
                                        whileTap={{
                                            scale: 0.98,
                                        }}
                                        className="py-3 bg-white border-2 border-[#E2E8F0] text-[#64748B] rounded-xl text-sm font-medium hover:border-[#044866] hover:text-[#044866] hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                                    >
                                        <FileText className="w-4 h-4" />
                                        Docs
                                    </motion.button>
                                </motion.div>
                            </div>
                        </motion.div>
                    </CollapsibleContent>
                )}
            </motion.div>
        </Collapsible>
    )
}
