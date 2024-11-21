import { SubAdminApi } from '@queries'
import { SectorCardHeader } from './SectorCardHeader'

import { useState } from 'react'
import { useRouter } from 'next/router'
import { LoadingAnimation, NoData, Typography } from '@components'
import { CourseCard } from './CourseCard'

export const CourseManagement = () => {
    // Call api here
    const [itemPerPage, setItemPerPage] = useState<any>(50)
    const [page, setPage] = useState(1)
    const router = useRouter()

    const { data, isLoading, isError, isFetching } =
        SubAdminApi.Industry.useIndustryRequestedCourses(
            {
                id: router.query.id,
                params: {
                    search: `status:approved`,
                    skip: itemPerPage * page - itemPerPage,
                    limit: itemPerPage,
                },
            },
            {
                skip: !router.query.id,
                refetchOnMountOrArgChange: true,
            }
        )

    const industryPreviousCourses =
        SubAdminApi.Industry.usePreviousIndustryCourses(router.query.id, {
            skip: !router.query.id,
        })
        
    return (
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
    )
}
