import {
    NoData,
    PageSize,
    Pagination,
    Typography,
    LoadingAnimation,
} from '@components'
import { SubAdminApi } from '@queries'
import React, { useState } from 'react'
import { IndustryInRadiusListCard } from '../industriesListCards'

export const SignedUpIndustriesInRadiusTab = ({
    workplaceId,
    courseId,
    setSelectedBox,
}: any) => {
    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(5)

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
            {workplaceCourseIndustries?.isLoading ? (
                <LoadingAnimation />
            ) : workplaceCourseIndustries?.data?.inds?.data &&
              workplaceCourseIndustries?.data?.inds?.data?.length > 0 ? (
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
                                    {workplaceCourseIndustries?.data?.inds?.data
                                        ?.length ?? 0}{' '}
                                </Typography>
                            </div>
                        </div>

                        <Pagination
                            pagination={
                                workplaceCourseIndustries?.data?.inds
                                    ?.pagination
                            }
                            setPage={setPage}
                        />
                    </div>
                    {workplaceCourseIndustries?.data?.inds?.data?.map(
                        (item: any) => (
                            <>
                                {/* <div
                                    key={item?.id}
                                    className="flex items-center justify-between bg-white border rounded-2xl shadow-sm p-4"
                                >
                                </div> */}
                                <IndustryInRadiusListCard
                                    item={item}
                                    onSelect={(selected: any) =>
                                        setSelectedBox(selected)
                                    }
                                />
                                {item?.locations?.length > 0 &&
                                    item?.locations?.map((branch: any) => (
                                        <IndustryInRadiusListCard
                                            item={{ ...item, ...branch }}
                                            onSelect={setSelectedBox}
                                            branch
                                        />
                                    ))}
                            </>
                        )
                    )}
                </>
            ) : (
                !workplaceCourseIndustries.isError && (
                    <NoData text="No Industry Found" />
                )
            )}
        </div>
    )
}
