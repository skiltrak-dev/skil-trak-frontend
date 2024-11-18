// CourseTooltip.tsx
import { Typography } from '@components'
import React from 'react'

interface CourseTooltipProps {
    course: {
        sector?: {
            name: string
            code: string
        }
        title: string
        code: string
        id: string
    }
}

export const CourseTooltip = ({ course }: CourseTooltipProps) => (
    <div key={course.id} className="group relative mb-2">
        <div className="size-2 bg-gray-500 rounded-full cursor-pointer"></div>
        <div className="invisible group-hover:visible transform -translate-x-1/2 absolute left-1/2 top-2 bottom-full mb-2 z-10">
            <div className="bg-white border rounded-md px-2 py-1 shadow-lg whitespace-nowrap">
                <Typography variant="small" center>
                    {course?.sector?.name} - {course?.sector?.code}
                </Typography>
                <Typography variant="small">
                    {course?.title} - {course?.code}
                </Typography>
            </div>
        </div>
    </div>
)
