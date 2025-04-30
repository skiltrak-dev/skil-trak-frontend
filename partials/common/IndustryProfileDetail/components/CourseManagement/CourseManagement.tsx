import { useState } from 'react'
import { SubAdminApi } from '@queries'
import { useRouter } from 'next/router'
import { SectorCardHeader } from './SectorCardHeader'

import { CourseCard } from './CourseCard'
import { Waypoint } from 'react-waypoint'
import { LoadingAnimation, NoData } from '@components'

export const CourseManagement = () => {
    // Call api here
    const router = useRouter()
    const [isEntered, setIsEntered] = useState<boolean>(false)

    const { data, isLoading, isError, isFetching } =
        SubAdminApi.Industry.useIndustryRequestedCourses(
            {
                id: router.query.id,
                params: {
                    search: `status:approved`,
                    skip: 50 * 1 - 50,
                    limit: 50,
                },
            },
            {
                skip: !router.query.id || !isEntered,
                refetchOnMountOrArgChange: true,
            }
        )

    const industryPreviousCourses =
        SubAdminApi.Industry.usePreviousIndustryCourses(router.query.id, {
            skip: !router.query.id,
        })

    return (
        <Waypoint
            onEnter={() => setIsEntered(true)}
            onLeave={() => setIsEntered(false)}
        >
            <div className="p-6">
                <SectorCardHeader />
                {(isError || industryPreviousCourses.isError) && (
                    <NoData text={'Something went wrong'} />
                )}
                <div className="max-h-[380px] min-h-[370px] overflow-auto custom-scrollbar">
                    {isLoading || industryPreviousCourses.isLoading ? (
                        <LoadingAnimation height="32" />
                    ) : data?.data?.length > 0 ||
                      industryPreviousCourses?.data?.length > 0 ? (
                        <>
                            {industryPreviousCourses?.data?.map((item: any) => (
                                <CourseCard
                                    key={item.id}
                                    data={item}
                                    isPreviousCourses={true}
                                />
                            ))}
                            {data?.data?.map((item: any) => (
                                <CourseCard key={item?.id} data={item} />
                            ))}
                        </>
                    ) : (
                        !isError &&
                        !industryPreviousCourses.isError && (
                            <NoData text={'No Data Found'} />
                        )
                    )}
                </div>
            </div>
        </Waypoint>
    )
}
