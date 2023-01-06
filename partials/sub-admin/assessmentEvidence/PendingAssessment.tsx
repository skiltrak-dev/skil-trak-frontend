import {
    Card,
    EmptyData,
    LoadingAnimation,
    Table, TechnicalError
} from '@components'
import { useGetAssessmentEvidenceQuery } from '@queries'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useColumns } from './hooks'

export const PendingAssessment = () => {
    const columns = useColumns()
    const router = useRouter()

    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    const { isLoading, isError, data } = useGetAssessmentEvidenceQuery({
        search: `result:pending`,
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })

    return (
        <div>
            <Card noPadding>
                {isError && <TechnicalError />}
                {isLoading ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : data && data?.data.length ? (
                    <Table
                        columns={columns}
                        data={data.data}
                        // quickActions={quickActionsElements}
                        enableRowSelection
                    >
                        {({
                            table,
                            pagination,
                            pageSize,
                            quickActions,
                        }: any) => {
                            return (
                                <div>
                                    <div className="p-6 mb-2 flex justify-between">
                                        {pageSize(itemPerPage, setItemPerPage)}
                                        <div className="flex gap-x-2">
                                            {quickActions}
                                            {pagination(
                                                data?.pagination,
                                                setPage
                                            )}
                                        </div>
                                    </div>
                                    <div className="px-6">{table}</div>
                                </div>
                            )
                        }}
                    </Table>
                ) : (
                    !isError && (
                        <EmptyData
                            title={'No AssessmentEvidence!'}
                            description={'You have no Assessment found yet'}
                            height={'50vh'}
                        />
                    )
                )}
            </Card>
        </div>
    )
}
