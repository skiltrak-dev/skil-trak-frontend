import { NoData, Typography } from '@components'
import { CourseList } from '@partials/common/courseList'
import { Course } from '@types'
import { getSectors } from '@utils'
import React, { Fragment } from 'react'

export const IndustrySectors = ({ courses }: { courses: Course[] }) => {
    const sectorsWithCourses = getSectors(courses)

    return (
        <div>
            {/* Eligible Sectors */}
            <div className="mt-4">
                <Typography variant={'small'} color={'text-gray-500'}>
                    Eligible Sectors
                </Typography>

                {sectorsWithCourses ? (
                    Object.keys(sectorsWithCourses).map((sector) => {
                        return (
                            <Fragment key={sector}>
                                <Typography
                                    variant={'label'}
                                    color={'text-black'}
                                >
                                    {sector}
                                </Typography>

                                <CourseList
                                    courses={
                                        (sectorsWithCourses as any)[sector]
                                    }
                                />
                            </Fragment>
                        )
                    })
                ) : (
                    <NoData text={'No Sectors Assigned'} />
                )}
            </div>
        </div>
    )
}
