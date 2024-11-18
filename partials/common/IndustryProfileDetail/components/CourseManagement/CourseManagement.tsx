import { SubAdminApi } from '@queries'
import { SectorCardHeader } from './SectorCardHeader'

import { useState } from 'react'
import { useRouter } from 'next/router'
import { LoadingAnimation, NoData, Typography } from '@components'
import { IndustryRequestApproved } from './IndustryRequestApproved/IndustryRequestApproved'
import { IoCheckmarkDoneOutline } from 'react-icons/io5'
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
    const onIndustryAcceptanceCourses =
        SubAdminApi.Industry.useIndustryCoursesOnAcceptance(
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

    return (
        <div className="p-6">
            <SectorCardHeader />
            {(isError || onIndustryAcceptanceCourses.isError) && (
                <NoData text={'Something went wrong'} />
            )}
            <div className="max-h-[450px] overflow-auto custom-scrollbar">
                {isLoading || onIndustryAcceptanceCourses.isLoading ? (
                    <LoadingAnimation height="32" />
                ) : data?.data?.length > 0 ||
                  onIndustryAcceptanceCourses?.data?.data?.length > 0 ? (
                    <>
                        {data?.data?.map((item: any) => (
                            <CourseCard key={item.id} data={item} />
                        ))}
                        {onIndustryAcceptanceCourses?.data?.data?.map(
                            (item: any) => (
                                <CourseCard
                                    key={item.id}
                                    data={item}
                                    isIndustryAcceptance={true}
                                />
                            )
                        )}
                    </>
                ) : (
                    (!isError || !onIndustryAcceptanceCourses.isError) && (
                        <NoData text={'No Data Found'} />
                    )
                )}
            </div>
        </div>
    )
}
