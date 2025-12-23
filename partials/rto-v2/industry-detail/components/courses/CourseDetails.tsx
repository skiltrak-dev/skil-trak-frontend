import { motion } from 'framer-motion'
import { CourseProgramsServices } from './CourseProgramsServices'
import { CourseAgentNote } from './CourseAgentNote'
import { CourseMetadata } from './CourseMetadata'
import { CourseActionButtons } from './CourseActionButtons'
import { HighlightedTasks } from './HighlightedTasks'
import { Course } from '@types'

interface CourseDetailsProps {
    course: Course
    onConfirmTask?: (
        courseId: number,
        taskId: number,
        method: 'industry' | 'sourcing' | 'direct'
    ) => void
}

export function CourseDetails({ course, onConfirmTask }: CourseDetailsProps) {
    const handleConfirmTask = (
        taskId: number,
        method: 'industry' | 'sourcing' | 'direct'
    ) => {
        if (onConfirmTask) {
            onConfirmTask(course.id, taskId, method)
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="px-4 pb-4 space-y-3 border-t border-[#E2E8F0] bg-gradient-to-b from-[#FAFBFC] to-white pt-3">
                {/* Programs and Services - Combined Section */}
                <CourseProgramsServices course={course} />

                {/* SkilTrak Agent Note */}
                {course.agentNote && (
                    <CourseAgentNote agentNote={course.agentNote} />
                )}

                {/* Metadata */}
                <CourseMetadata
                    requestedBy={course.requestedBy}
                    referenceUrl={course.referenceUrl}
                />

                {/* Highlighted Tasks */}
                {course.highlightedTasks &&
                    course.highlightedTasks.length > 0 && (
                        <HighlightedTasks
                            tasks={course.highlightedTasks}
                            onConfirmTask={handleConfirmTask}
                        />
                    )}

                {/* Action Buttons - Premium Enhanced */}
                <CourseActionButtons />
            </div>
        </motion.div>
    )
}
