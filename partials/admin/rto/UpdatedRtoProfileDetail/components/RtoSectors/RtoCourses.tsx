import { Typography } from '@components'
import { Course } from '@types'
import React from 'react'

export const RtoCourses = ({
    sector,
    courses,
}: {
    sector: string
    courses: Course[]
}) => {
    return (
        <div className="border border-primaryNew rounded-md overflow-hidden">
            <div className={'bg-primaryNew px-3.5 py-4'}>
                <Typography variant="label" color="text-white">
                    {sector}
                </Typography>
            </div>
            {courses?.map((course: Course, i: number) => (
                <div
                    className={`${
                        i !== courses?.length - 1
                            ? 'border-b border-primaryNew'
                            : ''
                    } px-3.5 py-2.5`}
                >
                    <Typography variant="small" medium>
                        Course
                    </Typography>
                    <Typography variant="small" normal>
                        {course?.code} - {course?.title}
                    </Typography>
                </div>
            ))}
        </div>
    )
}
