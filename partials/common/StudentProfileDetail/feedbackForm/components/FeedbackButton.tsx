import React, { useState } from 'react'

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

    // Case 1: only one course → open modal directly with a button
    if (eligibleCourses.length === 1) {
        return (
            <button
                className="text-xs text-link"
                onClick={() => onPlacementFeedback(eligibleCourses[0].courseId)}
            >
                Feedback for {eligibleCourses[0].courseName}
            </button>
        )
    }

    // Case 2: multiple → select course → open modal directly
    return (
        <select
            value={selectedCourse}
            onChange={(e) => {
                const value = e.target.value
                setSelectedCourse(value) // keep selected value visible
                if (value) {
                    onPlacementFeedback(value) // trigger modal
                }
            }}
            className="text-xs border rounded px-1 py-0.5"
        >
            <option value="" disabled>
                Select a course for feedback
            </option>
            {eligibleCourses.map((course) => (
                <option key={course.courseId} value={course.courseId}>
                    {course.courseName}
                </option>
            ))}
        </select>
    )
}
