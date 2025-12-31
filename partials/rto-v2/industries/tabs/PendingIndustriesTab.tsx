import {
    Card,
    EmptyData,
    LoadingAnimation,
    Table,
    TechnicalError,
} from '@components'
import { RtoV2Api } from '@redux'
import { Industry } from '@types'
import React, { useState } from 'react'
import { IndustryFilterBar } from '../component'
import { useYourIndustriesColumns } from '../component/columns/yourIndustriesColumns'

interface PendingIndustriesTabProps {
    searchTerm: string
    courseId: string
    filterStatus: string
    stateFilter: string
    placementReady: string
}

export const PendingIndustriesTab: React.FC<PendingIndustriesTabProps> = ({
    searchTerm,
    courseId,
    filterStatus,
    stateFilter,
    placementReady,
}) => {
    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(50)

    const industries = RtoV2Api.Industries.getAllIndustriesList({
        search: `isInterested:${'pending'}${searchTerm ? `,name:${searchTerm}` : ''
            }${courseId !== 'all' ? `,courseId:${courseId}` : ''}${filterStatus !== 'all' ? `,status:${filterStatus}` : ''
            }${stateFilter !== 'all' ? `,state:${stateFilter}` : ''}${placementReady !== 'all' ? `,placementReady:${placementReady}` : ''
            }`,
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })

    const { getTableConfig, modal } = useYourIndustriesColumns()
    const { columns } = getTableConfig({
        columnKeys: ['name', 'profileCompletion', 'status'],
        actionKeys: ['view'],
    })

    return (
        <div className="space-y-4">
            {modal}

            <Card noPadding>
                {industries?.isError && <TechnicalError />}
                {industries?.isLoading || industries?.isFetching ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : industries &&
                    industries?.data?.data &&
                    industries?.data?.data?.length ? (
                    <Table<Industry>
                        columns={columns as any}
                        data={industries?.data?.data}
                    >
                        {({
                            table,
                            pagination,
                            pageSize,
                            quickActions,
                        }: any) => (
                            <div className="p-6">
                                <div className="mb-4 flex items-center justify-between">
                                    {pageSize &&
                                        pageSize(
                                            itemPerPage,
                                            setItemPerPage,
                                            industries?.data?.data?.length
                                        )}
                                    <div className="flex gap-x-2">
                                        {quickActions}
                                        {pagination &&
                                            pagination(
                                                industries?.data?.pagination,
                                                setPage
                                            )}
                                    </div>
                                </div>
                                <div className="w-full overflow-x-auto remove-scrollbar">
                                    {table}
                                </div>
                            </div>
                        )}
                    </Table>
                ) : (
                    !industries?.isError && (
                        <EmptyData
                            title="No pending industries"
                            description="All industries are either approved or in other status"
                            height="50vh"
                        />
                    )
                )}
            </Card>
        </div>
    )
}
