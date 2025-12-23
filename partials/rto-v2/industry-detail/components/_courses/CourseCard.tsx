import { motion } from 'framer-motion'
import {
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
} from '@components/ui/collapsible'
import { Course } from './types'
import { CourseHeader } from './CourseHeader'
import { CourseDetails } from './CourseDetails'

interface CourseCardProps {
    course: Course
    courseIndex: number
    isCourseExpanded: boolean
    onToggleCourse: (courseId: number) => void
    onUpdateFacilityChecklistStatus: (
        courseId: number,
        status: 'approved' | 'rejected' | 'pending'
    ) => void
    onConfirmTask?: (
        courseId: number,
        taskId: number,
        method: 'industry' | 'sourcing' | 'direct'
    ) => void
}

export function CourseCard({
    course,
    courseIndex,
    isCourseExpanded,
    onToggleCourse,
    onUpdateFacilityChecklistStatus,
    onConfirmTask,
}: CourseCardProps) {
    return (
        <Collapsible
            key={course.id}
            open={isCourseExpanded}
            onOpenChange={() => onToggleCourse(course.id)}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: courseIndex * 0.1 }}
                className="bg-white rounded-lg border border-[#E2E8F0] overflow-hidden hover:border-[#044866]/30 hover:shadow-xl transition-all duration-500"
            >
                {/* Course Header - Premium */}
                <CollapsibleTrigger className="w-full">
                    <CourseHeader
                        course={course}
                        isCourseExpanded={isCourseExpanded}
                        onUpdateFacilityChecklistStatus={
                            onUpdateFacilityChecklistStatus
                        }
                    />
                </CollapsibleTrigger>

                {/* Expanded Course Details - Premium Layout */}
                {course.courseHours && (
                    <CollapsibleContent className="overflow-hidden">
                        <CourseDetails
                            course={course}
                            onConfirmTask={onConfirmTask}
                        />
                    </CollapsibleContent>
                )}
            </motion.div>
        </Collapsible>
    )
}
