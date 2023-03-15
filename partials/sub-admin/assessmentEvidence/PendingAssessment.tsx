import {
    Card,
    EmptyData,
    LoadingAnimation,
    Table,
    TechnicalError,
} from '@components'
import { useGetAssessmentEvidenceQuery } from '@queries'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { useColumns } from './hooks'
import { useJoyRide } from '@hooks'
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

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 50))
    }, [router])

    // WORKPLACE JOY RIDE - Start
    const joyride = useJoyRide()

    useEffect(() => {
        if (joyride.state.tourActive) {
            setTimeout(() => {
                joyride.setState({ ...joyride.state, run: true, stepIndex: 1 })
            }, 1200)
        }
    }, [])

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
                                    <div
                                        id="assessment-submission"
                                        className="px-6"
                                    >
                                        {table}
                                    </div>
                                </div>
                            )
                        }}
                    </Table>
                ) : (
                    !isError && (
                        <EmptyData
                            title={'No Pending Assessment Evidence!'}
                            description={
                                'There is no Pending Assessment were found'
                            }
                            height={'50vh'}
                        />
                    )
                )}
            </Card>
        </div>
    )
}
