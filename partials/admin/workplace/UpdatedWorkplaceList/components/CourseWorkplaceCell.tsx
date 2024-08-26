import { Typography } from '@components'
import { Course } from '@types'
import { ellipsisText } from '@utils'
import React from 'react'

export const CourseWorkplaceCell = ({ course }: { course: Course }) => {
    return (
        <div
            title={course?.title}
            className="flex items-center gap-x-2 cursor-pointer"
        >
            <Typography variant="small" medium>
                {course?.code ?? 'N/A'}
            </Typography>
            -
            <Typography variant="small" medium>
                {ellipsisText(course?.title, 15) ?? 'N/A'}
            </Typography>
        </div>
    )
}
