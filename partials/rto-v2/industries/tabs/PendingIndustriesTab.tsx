import {
    Card,
    EmptyData,
    LoadingAnimation,
    Table,
    TechnicalError,
} from '@components'
import { RtoV2Api } from '@redux'
import { Industry } from '@types'
import { useState } from 'react'
import { IndustryFilterBar } from '../component'
import { useYourIndustriesColumns } from '../component/columns/yourIndustriesColumns'

export const PendingIndustriesTab = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [filterSector, setFilterSector] = useState('all')
    const [filterStatus, setFilterStatus] = useState('all')

    const [page, setPage] = useState(1)
    const [itemPerPage, setItemPerPage] = useState(50)

    const industries = RtoV2Api.Industries.getAllIndustriesList({
        search: `status:pending`,
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })

    const { getTableConfig, modal } = useYourIndustriesColumns()
    const { columns } = getTableConfig({
        columnKeys: ['name', 'profileCompletion', 'status'],
        actionKeys: ['view', 'sendReminder', 'approveCourses', 'delete'],
    })

    return (
        <div className="space-y-4">
            {modal}
            <IndustryFilterBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                filterSector={filterSector}
                onSectorChange={(option: any) =>
                    setFilterSector(option?.value || 'all')
                }
                filterStatus={filterStatus}
                onStatusChange={(option: any) =>
                    setFilterStatus(option?.value || 'all')
                }
            />

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
