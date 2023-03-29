import { Card } from '@components/cards'
import { Typography } from '@components/Typography'
import React, { useEffect, useState } from 'react'
import { FaBook } from 'react-icons/fa'
import { Course } from './Course'

// query
import { SubAdminApi } from '@queries'
import { LoadingAnimation, NoData } from '@components'

export const Courses = ({ id }: { id: number }) => {
    const courses = SubAdminApi.Student.useCourses(id, {
        skip: !id,
        refetchOnMountOrArgChange: true,
    })

    return (
        <>
            {courses.isLoading ? (
                <LoadingAnimation />
            ) : (
                <Card>
                    <div className="flex items-center gap-x-2">
                        <div className="bg-gray-100 p-2 rounded-full">
                            <FaBook className="text-xl text-red-500" />
                        </div>
                        <Typography variant={'label'}>
                            <span className="font-semibold">
                                My Sector {'&'} Courses
                            </span>
                        </Typography>
                    </div>

                    {/*  */}
                    {courses?.data && courses?.data?.length > 0 ? (
                        courses?.data?.map((course: any) => (
                            <div key={course?.id}>
                                <div className="mt-2">
                                    <Typography
                                        variant={'small'}
                                        color={'text-gray-500'}
                                    >
                                        Sector
                                    </Typography>
                                    <Typography
                                        variant={'label'}
                                        color={'text-gray-700'}
                                    >
                                        {course?.sector?.name}
                                    </Typography>
                                </div>

                                {/*  */}
                                <div className="mt-2 flex flex-col gap-y-1">
                                    <Course
                                        key={course.id}
                                        studentId={id}
                                        course={course}
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="mt-3">
                            <NoData text={'No Courses Assigned'} />
                        </div>
                    )}
                </Card>
            )}
        </>
    )
}
