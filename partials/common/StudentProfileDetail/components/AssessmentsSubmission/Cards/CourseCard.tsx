import { ActionButton, Typography } from '@components'
import React from 'react'
import { CourseDate, CourseSubmisstionBadge, CourseTime } from '../components'
import { Result } from '@constants'
import { Course } from '@types'
import { getCourseResult } from '@utils'

export const CourseCard = ({
    course,
    active,
    onClick,
}: {
    course: Course
    active?: boolean
    onClick: () => void
}) => {
    const result = getCourseResult(course?.results)
    return (
        <div
            onClick={onClick}
            className={`w-full ${
                active
                    ? 'bg-primaryNew'
                    : 'bg-white border border-secondary-dark'
            }  rounded-md  cursor-pointer grid grid-cols-7`}
        >
            <div className="col-span-4 p-4 border-r">
                <div className="flex flex-col gap-y-1">
                    <Typography
                        variant="small"
                        medium
                        color={active ? 'text-white' : '#77757F'}
                    >
                        Course
                    </Typography>
                    <Typography
                        variant="small"
                        normal
                        color={active ? 'text-white' : '#77757F'}
                    >
                        {course?.code} - {course?.title}
                    </Typography>
                </div>

                <div className="mt-3">
                    <CourseSubmisstionBadge
                        result={result}
                        resultLength={course?.results?.length}
                    />
                </div>
            </div>

            {/*  */}
            <div className="col-span-3 flex justify-center items-center">
                <CourseDate course={course} active={active as boolean} />
            </div>
        </div>
    )
}
