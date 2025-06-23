import { Industry } from '@types'
import React from 'react'
import { useCourseManagement } from '../hooks'
import { LoadingAnimation, NoData } from '@components'
import { CourseCard } from '../CourseCard'

export const RenderCourseList = ({ industry }: { industry: Industry }) => {
    const { approvedCourses, computedData, pendingCourses, previousCourses } =
        useCourseManagement()

    if (computedData.hasError) {
        return <NoData text="Something went wrong" />
    }

    if (computedData.isLoading) {
        return <LoadingAnimation height="32" />
    }

    // Handle empty state
    if (approvedCourses.data?.data?.length === 0 && computedData.allEmpty) {
        if (computedData.hasPendingData) {
            return (
                <div className="flex flex-col gap-y-3">
                    {pendingCourses.data?.data?.map((item: any) => (
                        <CourseCard
                            key={item.id}
                            data={item}
                            industry={industry}
                            isPending
                        />
                    ))}
                </div>
            )
        }
        return <NoData text="No Data Found sdffs" />
    }

    // Render approved courses
    if (
        approvedCourses.data?.data?.length > 0 ||
        previousCourses.data?.length > 0
    ) {
        return (
            <div className="flex flex-col gap-y-3">
                {previousCourses.data?.map((item: any) => (
                    <CourseCard key={item.id} data={item} isPreviousCourses />
                ))}
                {approvedCourses.data?.data?.map((item: any) => (
                    <CourseCard key={item.id} data={item} industry={industry} />
                ))}
            </div>
        )
    }

    return <NoData text="No Data Found" />
}
