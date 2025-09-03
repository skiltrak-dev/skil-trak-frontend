import { LoadingAnimation } from '@components'
import { SubAdminApi } from '@queries'
import { Industry } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { InitiateIndustryEsignModal } from '../../modal'
import { CourseCard } from './CourseCard'

export const PendingCourses = ({ industry }: { industry: Industry }) => {
    const router = useRouter()

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
