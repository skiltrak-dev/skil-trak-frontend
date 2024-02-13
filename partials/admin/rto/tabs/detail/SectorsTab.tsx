import React from 'react'

// hooks
import { useContextBar } from '@hooks'

// components
import { ContextBarLoading, EmptyData, NoData, Typography } from '@components'
import { SectorCard } from '@partials/admin/components'

// hooks
import { useGetSectors } from '@hooks'
import { CourseList } from '@partials/common'

const getSectors = (courses: any) => {
    if (!courses) return {}
    const sectors = {}
    courses.forEach((c: any) => {
        if ((sectors as any)[c.sector.name]) {
            ;(sectors as any)[c.sector.name].push(c)
        } else {
            ;(sectors as any)[c.sector.name] = []
            ;(sectors as any)[c.sector.name].push(c)
        }
    })
    return sectors
}

export const SectorsTab = ({ rto }: any) => {
    const { isVisible } = useContextBar()
    const sectors = useGetSectors({
        data: rto?.data?.courses,
        isSuccess: rto?.isSuccess,
    })

    const sectorsWithCourses = getSectors(rto?.data?.courses)

    return (
        <>
            {rto.isLoading ? (
                <ContextBarLoading />
            ) : rto.data?.courses?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.keys(sectorsWithCourses).map((sector) => {
                        return (
                            <div className="py-2 px-4 bg-white rounded-lg shadow-md">
                                <div className=" pb-3">
                                    <Typography
                                        variant={'muted'}
                                        color={'text-gray-400'}
                                    >
                                        Sector Name
                                    </Typography>
                                    <Typography variant={'label'}>
                                        <span className="break-all">
                                            {sector}
                                        </span>
                                    </Typography>
                                </div>

                                <span className="block">
                                    <Typography
                                        variant={'muted'}
                                        color={'text-gray-400'}
                                    >
                                        Courses
                                    </Typography>
                                </span>

                                <CourseList
                                    courses={
                                        (sectorsWithCourses as any)[sector]
                                    }
                                />
                            </div>
                        )
                    })}
                </div>
            ) : (
                <NoData text={'No Courses Assigned'} />
            )}
        </>
    )
}
