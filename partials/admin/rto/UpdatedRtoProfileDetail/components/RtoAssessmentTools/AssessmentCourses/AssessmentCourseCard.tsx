import { Typography } from '@components'
import { Course } from '@types'
import React from 'react'
import { HiOutlineDocumentText } from 'react-icons/hi'

export const AssessmentCourseCard = ({
    course,
    active,
    onClick,
}: {
    course: Course
    active: boolean
    onClick: () => void
}) => {
    return (
        <div
            onClick={() => onClick()}
            className={`${
                active ? 'bg-primaryNew' : 'bg-white'
            } flex items-center gap-x-2 border-[#6B7280] rounded cursor-pointer p-2 border  shadow-[0px_1px_16px_0px_rgba(0,0,0,0.10)]`}
        >
            <HiOutlineDocumentText
                className={active ? 'text-white' : 'text-[#374151]'}
                size={19}
            />
            <div>
                <Typography
                    variant="muted"
                    color={active ? 'text-white' : 'text-[#374151]'}
                >
                    {course?.code}
                </Typography>
                <Typography
                    variant="tableCell"
                    color={active ? 'text-white' : 'text-[#374151]'}
                >
                    {course?.title}
                </Typography>
            </div>
        </div>
    )
}
