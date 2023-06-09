import {
    Card,
    EmptyData,
    LoadingAnimation,
    Table,
    TechnicalError,
} from '@components'
import { useGetAssessmentEvidenceQuery } from '@queries'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useColumns } from './hooks'

export const CompetentAssessment = () => {
    const {columns, modal} = useColumns()
    const router = useRouter()

    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 50))
    }, [router])

    const { isLoading, isError, data } = useGetAssessmentEvidenceQuery({
        search: `result:competent`,
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })

    return (
        <>
        {modal && modal}
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
                                        {pageSize(
                                            itemPerPage,
                                            setItemPerPage,
                                            data?.data?.length
                                        )}
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
                            title={'No Competent AssessmentEvidence!'}
                            description={
                                'There is no Competent Assessment were found'
                            }
                            height={'50vh'}
                        />
                    )
                )}
            </Card>
        </>
    )
}
