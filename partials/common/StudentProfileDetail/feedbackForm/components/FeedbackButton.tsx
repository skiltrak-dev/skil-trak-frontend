import { ellipsisText } from '@utils'
import React, { useState, useEffect } from 'react'

type Course = {
    courseId: string
    courseName: string
}

interface Props {
    eligibleCourses: Course[]
    onPlacementFeedback: (courseId: string) => void
}

export const FeedbackButton = ({
    eligibleCourses,
    onPlacementFeedback,
}: Props) => {
    const [selectedCourse, setSelectedCourse] = useState<string>('')

    if (!eligibleCourses || eligibleCourses.length === 0) return null
   

    if (eligibleCourses.length === 1) {
        return (
            <button
                className="text-xs text-link"
                onClick={() => onPlacementFeedback(eligibleCourses[0].courseId)}
            >
                Feedback for {ellipsisText(eligibleCourses[0].courseName, 15)}
            </button>
        )
    }

    const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        if (value) {
            setSelectedCourse(value)
            onPlacementFeedback(value)
        }
    }

    return (
        <select
            value={selectedCourse}
            onChange={handleCourseChange}
            className="text-xs border rounded px-1 py-0.5"
        >
            <option value="" disabled>
                Select a course for feedback
            </option>
            {eligibleCourses.map((course) => (
                <option key={course?.courseId} value={course?.courseId}>
                    {course?.courseName}
                </option>
            ))}
        </select>
    )
}
