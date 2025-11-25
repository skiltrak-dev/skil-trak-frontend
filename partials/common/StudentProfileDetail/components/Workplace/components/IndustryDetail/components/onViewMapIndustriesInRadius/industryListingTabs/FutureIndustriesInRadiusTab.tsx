import {
    LoadingAnimation,
    NoData,
    PageSize,
    Pagination,
    Typography,
} from '@components'
import { SubAdminApi } from '@queries'
import React, { useEffect, useMemo, useState } from 'react'
import { FutureIndustryInRadiusListCard } from '../industriesListCards'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

export const FutureIndustriesInRadiusTab = ({
    workplaceId,
    courseId,
    setSelectedBox,
}: any) => {
    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(5)
    const [completedPages, setCompletedPages] = useState<Set<number>>(new Set([1])) // Page 1 is always unlocked

    const router = useRouter()

    useEffect(() => {
        setPage(Number(router.query.page || 1))
    }, [router])

    const workplaceCourseIndustries =
        SubAdminApi.Workplace.useWorkplaceListedIndustries(
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

    // Check if current page's industries are all contacted
    useEffect(() => {
        if (workplaceCourseIndustries?.data?.data) {
            const allContactedOnCurrentPage = workplaceCourseIndustries.data.data.every(
                (ind: any) => ind?.studentIndustryContact?.length > 0
            )

            if (allContactedOnCurrentPage) {
                // Mark current page as completed, which unlocks next page
                setCompletedPages(prev => {
                    const updated = new Set(prev)
                    updated.add(page)
                    return updated
                })
            } else {
                // If not all contacted, remove this page from completed
                setCompletedPages(prev => {
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

        console.log('Lock Status:', {
            page,
            previousPage: page - 1,
            previousPageCompleted,
            completedPages: Array.from(completedPages),
            isLocked: !previousPageCompleted
        })

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
            {workplaceCourseIndustries.isLoading ? (
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
                                    {workplaceCourseIndustries?.data?.data?.length ?? 0}
                                </Typography>
                            </div>
                        </div>

                        <Pagination
                            pagination={workplaceCourseIndustries?.data?.pagination}
                            setPage={setPage}
                        />
                    </div>
                    {processedIndustries.map((item: any) => (
                        <div
                            key={`future-${item?.id}`}
                            className="flex items-center justify-between bg-white border rounded-2xl shadow-sm p-4"
                        >
                            <FutureIndustryInRadiusListCard
                                item={item}
                                onSelect={(selected: any) => setSelectedBox(selected)}
                                isLocked={item.isLocked}
                            />
                        </div>
                    ))}
                </>
            ) : (
                !workplaceCourseIndustries.isError && (
                    <NoData text={'No Data found'} />
                )
            )}
        </div>
    )
}