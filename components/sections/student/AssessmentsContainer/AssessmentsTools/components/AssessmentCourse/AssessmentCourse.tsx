import { Typography } from '@components/Typography'
import { useState } from 'react'

type AssessmentCourseProps = {
    code: string
    name: string
    selected: number
    id: number
}

export const AssessmentCourse = ({
    code,
    name,
    selected,
    id,
}: AssessmentCourseProps) => {
    return (
        <div>
            <div
                className={`${
                    id === selected ? 'bg-red-100' : 'bg-white'
                } border-gray-200 rounded cursor-pointer p-2`}
            >
                <Typography variant="muted" color="text-black">
                    {code}
                </Typography>
                <Typography variant="tableCell" color="text-black">
                    {name}
                </Typography>
            </div>
        </div>
    )
}
