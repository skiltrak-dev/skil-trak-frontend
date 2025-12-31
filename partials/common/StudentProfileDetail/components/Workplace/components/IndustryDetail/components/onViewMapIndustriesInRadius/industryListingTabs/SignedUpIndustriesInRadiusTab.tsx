import {
    NoData,
    PageSize,
    Pagination,
    Typography,
    LoadingAnimation,
} from '@components'
import { SubAdminApi } from '@queries'
import React, { useState, useMemo, useEffect } from 'react'
import { IndustryInRadiusListCard } from '../industriesListCards'

export const SignedUpIndustriesInRadiusTab = ({
    courseId,
    workplaceId,
    setSelectedBox,
}: any) => {
    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(5)
    const [completedPages, setCompletedPages] = useState<Set<number>>(
        new Set([1])
    ) // Page 1 is always unlocked

    // Current page data with server-side pagination
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
            {
                skip: !courseId && !workplaceId,
                refetchOnMountOrArgChange: 30,
            }
        )

    // Check if current page's industries are all contacted
    useEffect(() => {
        if (workplaceCourseIndustries?.data?.data) {
            const allContactedOnCurrentPage =
                workplaceCourseIndustries.data.data.every(
                    (ind: any) => ind?.studentIndustryContact?.length > 0
                )

            if (allContactedOnCurrentPage) {
                // Mark current page as completed, which unlocks next page
                setCompletedPages((prev) => {
                    const updated = new Set(prev)
                    updated.add(page)
                    return updated
                })
            } else {
                // If not all contacted, remove this page from completed
                setCompletedPages((prev) => {
                    const updated = new Set(prev)
                    updated.delete(page)
                    return updated
                })
            }
        }
    }, [workplaceCourseIndustries?.data?.data, page])

    // Check if current page is locked
    const isLocked = useMemo(() => {
        // Page 1 is always unlocked
        if (page === 1) return false

        // Current page is unlocked if previous page is completed
        const previousPageCompleted = completedPages.has(page - 1)

        return !previousPageCompleted
    }, [page, completedPages])

    // Add isLocked to each industry
    const processedIndustries = useMemo(() => {
        if (!workplaceCourseIndustries?.data?.data) return []

        return workplaceCourseIndustries.data.data.map((industry: any) => ({
            ...industry,
            isLocked,
        }))
    }, [workplaceCourseIndustries?.data?.data, isLocked])

    return (
        <div className="h-[25rem] overflow-auto remove-scrollbar space-y-4">
            {workplaceCourseIndustries?.isError ? (
                <NoData isError text="there is some technical issue!" />
            ) : null}

            {workplaceCourseIndustries?.isLoading ? (
                <LoadingAnimation />
            ) : processedIndustries.length > 0 ? (
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
                                    {workplaceCourseIndustries?.data?.data
                                        ?.length ?? 0}
                                </Typography>
                            </div>
                        </div>
                        <Pagination
                            pagination={
                                workplaceCourseIndustries?.data?.pagination
                            }
                            setPage={setPage}
                        />
                    </div>

                    {processedIndustries.map((item: any) => (
                        <React.Fragment key={item?.id}>
                            <IndustryInRadiusListCard
                                item={item}
                                onSelect={(selected: any) =>
                                    setSelectedBox(selected)
                                }
                                isLocked={item.isLocked}
                            />
                            {item?.locations?.length > 0 &&
                                item?.locations?.map((branch: any) => (
                                    <IndustryInRadiusListCard
                                        key={`${item?.id}-${branch?.id}`}
                                        item={{ ...item, ...branch }}
                                        onSelect={setSelectedBox}
                                        branch
                                        isLocked={item.isLocked}
                                    />
                                ))}
                        </React.Fragment>
                    ))}
                </>
            ) : (
                !workplaceCourseIndustries.isError && (
                    <NoData text="No Industry Found" />
                )
            )}
        </div>
    )
}
