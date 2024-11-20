import { LoadingAnimation, NoData, Typography } from '@components'
import React, { useState } from 'react'
import { TextInfo } from '../TextInfo'
import { useRouter } from 'next/router'
import { SubAdminApi } from '@queries'
import { CourseRequestRejected, IndustryRequestRejected } from './components'

export const RejectedSectorModal = () => {
    const [itemPerPage, setItemPerPage] = useState<any>(50)
    const [page, setPage] = useState(1)
    const router = useRouter()
    const { data, isLoading, isError, isFetching } =
        SubAdminApi.Industry.useIndustryRequestedCourses(
            {
                id: router.query.id,
                params: {
                    search: `status:rejected`,
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
                    search: `status:rejected`,
                    skip: itemPerPage * page - itemPerPage,
                    limit: itemPerPage,
                },
            },
            {
                skip: !router.query.id,
                refetchOnMountOrArgChange: true,
            }
        )

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString()
    }

    return (
        <div className="min-w-96">
            <Typography variant="h4">Rejected Course(s)</Typography>

            <div className="flex flex-col gap-y-4 w-full mt-4">
                {isError && onIndustryAcceptanceCourses.isError && (
                    <NoData text="Something went wrong" />
                )}
                {isLoading ? (
                    <LoadingAnimation height="h-20" />
                ) : data?.data?.length > 0 ? (
                    <>
                        {/* <IndustryRequestRejected
                            data={onIndustryAcceptanceCourses?.data?.data}
                            formatDate={formatDate}
                        /> */}
                        <CourseRequestRejected
                            data={data?.data || []}
                            formatDate={formatDate}
                        />
                    </>
                ) : (
                    !isError && (
                        <NoData text="No Data found" />
                    )
                )}
                {/* {onIndustryAcceptanceCourses.isError && (
                    <NoData text="Something went wrong" />
                )}
                {onIndustryAcceptanceCourses.isLoading ? (
                    <LoadingAnimation height="h-20" />
                ) : onIndustryAcceptanceCourses?.data?.data?.length > 0 ? (
                    <>
                        <IndustryRequestRejected
                            data={onIndustryAcceptanceCourses?.data?.data}
                            formatDate={formatDate}
                        />
                    </>
                ) : (
                    !onIndustryAcceptanceCourses.isError && (
                        <NoData text="No Course Request Data found" />
                    )
                )} */}
            </div>
        </div>
    )
}
