import { SubAdminApi, useGetSubAdminIndustryProfileQuery } from '@queries'
import { useRouter } from 'next/router'
import React from 'react'
import { CourseCard } from './CourseCard'
import { LoadingAnimation } from '@components'

export const PendingCourses = () => {
    const router = useRouter()
    const id = router.query.id
    const industry = useGetSubAdminIndustryProfileQuery(Number(id), {
        skip: !id,
        // refetchOnMountOrArgChange: true,
    })

    const pendingCourses = SubAdminApi.Industry.useIndustryRequestedCourses(
        {
            id: Number(router.query.id),
            params: {
                search: `status:pending`,
                skip: 50 * 1 - 50,
                limit: 50,
            },
        },
        {
            skip: !router.query.id,
            refetchOnMountOrArgChange: true,
        }
    )
    return (
        <div>
            {pendingCourses.isLoading ? (
                <LoadingAnimation height="32" />
            ) : (
                <>
                    {pendingCourses?.data?.data?.length > 0 && (
                        <div className="flex flex-col gap-y-3">
                            {pendingCourses?.data?.data?.map((item: any) => (
                                <CourseCard
                                    key={item?.id}
                                    data={item}
                                    industry={industry}
                                    isPending
                                />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
