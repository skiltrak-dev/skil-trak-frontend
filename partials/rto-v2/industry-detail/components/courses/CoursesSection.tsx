import { BookOpen, Plus } from 'lucide-react'
import { motion } from 'framer-motion'
import { Course } from './types'
import { CourseCard } from './CourseCard'

interface CoursesSectionProps {
    courses: Course[]
    expandedCourses: number[]
    onToggleCourse: (courseId: number) => void
    onUpdateFacilityChecklistStatus: (
        courseId: number,
        status: 'approved' | 'rejected' | 'pending'
    ) => void
}

export function CoursesSection({
    courses,
    expandedCourses,
    onToggleCourse,
    onUpdateFacilityChecklistStatus,
}: CoursesSectionProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] flex items-center justify-center shadow-md">
                        <BookOpen className="w-3.5 h-3.5 text-white" />
                    </div>
                    <h4 className="text-xs font-bold text-[#1A2332]">
                        Courses & Programs
                    </h4>
                    <span className="px-1.5 py-0.5 bg-[#E0E7FF] text-[#6366F1] rounded-full text-[10px] font-medium">
                        {courses.length}
                    </span>
                </div>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-xs font-medium text-[#044866] hover:text-[#0D5468] transition-colors flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-[#E8F4F8]"
                >
                    <Plus className="w-3.5 h-3.5" />
                    Add Course
                </motion.button>
            </div>

            <div className="grid gap-3">
                {courses.map((course, courseIndex) => {
                    const isCourseExpanded = expandedCourses.includes(course.id)

                    return (
                        <CourseCard
                            key={course.id}
                            course={course}
                            courseIndex={courseIndex}
                            isCourseExpanded={isCourseExpanded}
                            onToggleCourse={onToggleCourse}
                            onUpdateFacilityChecklistStatus={
                                onUpdateFacilityChecklistStatus
                            }
                        />
                    )
                })}
            </div>
        </motion.div>
    )
}
