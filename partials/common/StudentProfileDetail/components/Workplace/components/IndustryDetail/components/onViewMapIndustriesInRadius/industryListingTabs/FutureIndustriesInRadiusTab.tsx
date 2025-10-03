import {
    LoadingAnimation,
    NoData,
    PageSize,
    Pagination,
    Typography,
} from '@components'
import { SubAdminApi } from '@queries'
import React, { useEffect, useState } from 'react'
import { FutureIndustryInRadiusListCard } from '../industriesListCards'
import { useRouter } from 'next/router'

export const FutureIndustriesInRadiusTab = ({
    workplaceId,
    courseId,
    setSelectedBox,
}: any) => {
    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(5)
    const router = useRouter()
    useEffect(() => {
        setPage(Number(router.query.page || 1))
        // setItemPerPage(Number(router.query.pageSize || 5))
    }, [router])
    const workplaceCourseIndustries =
        SubAdminApi.Workplace.useWorkplaceCourseIndustries(
            {
                id: courseId,
                wpId: workplaceId,
                params: {
                    skip: itemPerPage * page - itemPerPage,
                    limit: itemPerPage,
                },
            },
            { skip: !courseId && !workplaceId, refetchOnMountOrArgChange: true }
        )
    return (
        <div className="h-[25rem] overflow-auto remove-scrollbar space-y-4">
            {workplaceCourseIndustries?.isError ? (
                <NoData isError text="there is some technical issue!" />
            ) : null}
            {workplaceCourseIndustries.isLoading ? (
                <LoadingAnimation />
            ) : workplaceCourseIndustries?.data?.listing?.data &&
              workplaceCourseIndustries?.data?.listing?.data?.length > 0 ? (
                <>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-x-2">
                            <PageSize
                                itemPerPage={itemPerPage}
                                setItemPerPage={setItemPerPage}
                            />
                            <div className="bg-gray-100 rounded-md p-2 flex items-center gap-1">
                                <Typography
                                    variant="muted"
                                    color="text-gray-500"
                                >
                                    Records
                                </Typography>
                                <Typography
                                    variant="muted"
                                    color="text-gray-500"
                                >
                                    {workplaceCourseIndustries?.data?.listing
                                        ?.data?.length ?? 0}{' '}
                                </Typography>
                            </div>
                        </div>

                        <Pagination
                            pagination={
                                workplaceCourseIndustries?.data?.listing
                                    ?.pagination
                            }
                            setPage={setPage}
                        />
                    </div>
                    {workplaceCourseIndustries?.data?.listing?.data?.map(
                        (item: any) => (
                            <div
                                key={`future-${item?.id}`}
                                className="flex items-center justify-between bg-white border rounded-2xl shadow-sm p-4"
                            >
                                <FutureIndustryInRadiusListCard
                                    item={item}
                                    onSelect={(selected: any) =>
                                        setSelectedBox(selected)
                                    }
                                />
                            </div>
                        )
                    )}
                </>
            ) : (
                !workplaceCourseIndustries.isError && (
                    <NoData text={'No Data found'} />
                )
            )}
        </div>
    )
}
