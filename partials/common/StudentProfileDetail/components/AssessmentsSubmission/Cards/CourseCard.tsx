import { ActionButton, AuthorizedUserComponent, Typography } from '@components'
import React from 'react'
import { CourseDate, CourseSubmisstionBadge, CourseTime } from '../components'
import { Result, UserRoles } from '@constants'
import { Course } from '@types'
import { getCourseResult } from '@utils'
import { Waypoint } from 'react-waypoint'
import classNames from 'classnames'

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

    const getResultBadge = () => {
        switch (result?.result) {
            case Result.Competent:
                return 'Competent'

            case Result.NotCompetent:
                return 'Not Competent'
            case Result.ReOpened:
                return 'Re-Opened'
            case Result.Pending:
                return 'Submitted'
            default:
                return result?.result
        }
    }

    const statusClasses = classNames({
        'bg-primary': result?.result === Result.Pending || !result,
        'bg-success': result?.result === Result.Competent,
        'bg-error-dark': result?.result === Result.NotCompetent,
    })
    return (
        <div
            onClick={onClick}
            className={`w-full ${
                active
                    ? 'bg-primaryNew'
                    : 'bg-white border border-secondary-dark'
            }  rounded-md h-[71px] cursor-pointer grid grid-cols-2 relative overflow-hidden`}
        >
            <div className="p-4 relative">
                {result?.result && (
                    <div
                        className={`w-32 h-7 ${statusClasses}  flex justify-center items-center absolute top-0 right-0`}
                    >
                        <Typography
                            variant="small"
                            medium
                            uppercase
                            color="text-white"
                        >
                            {getResultBadge()}
                        </Typography>
                    </div>
                )}
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
            </div>
            {/*  */}
            <AuthorizedUserComponent
                roles={[UserRoles.ADMIN, UserRoles.SUBADMIN, UserRoles.RTO]}
            >
                <div className="border-l flex justify-center items-center">
                    <CourseDate course={course} active={active as boolean} />
                </div>
            </AuthorizedUserComponent>
        </div>
    )
}
