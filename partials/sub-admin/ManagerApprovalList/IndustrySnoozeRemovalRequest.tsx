import {
    Card,
    EmptyData,
    LoadingAnimation,
    Table,
    TechnicalError,
    Typography,
} from '@components'

import { SubAdminApi } from '@queries'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { IndustryRequestsActions } from './enum'
import { useIndustryColumns } from './hooks'

export const IndustrySnoozeRemovalRequest = () => {
    const router = useRouter()

    const { columns, modal } = useIndustryColumns()

    const [itemPerPage, setItemPerPage] = useState(20)
    const [page, setPage] = useState(1)

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 20))
    }, [router])

    const { isLoading, isFetching, data, isError, isSuccess } =
        SubAdminApi.Industry.removePartnerIndustryReq(
            {
                skip: itemPerPage * page - itemPerPage,
                limit: itemPerPage,
                search: `action:${IndustryRequestsActions.Snoozed}`,
            },
            {
                refetchOnMountOrArgChange: 30,
            }
        )

    columns.splice(3, 0, {
        accessorKey: 'snoozedDate',
        header: () => <span>Snoozed Date</span>,
        cell: ({ row }) => (
            <Typography variant={'xxs'} color={'text-gray-700'} medium>
                <span className="whitespace-pre">
                    {moment(row?.original?.snoozedDate).format('Do MMM YYYY')}
                </span>
            </Typography>
        ),
    })

    return (
        <>
            {modal}
            <div className="flex flex-col gap-y-4 mb-32">
                <Card noPadding>
                    {isError && <TechnicalError />}
                    {isLoading || isFetching ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : data && data?.data.length && isSuccess ? (
                        <Table columns={columns} data={data.data}>
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
                                        <div
                                            className="px-6"
                                            id={'studentScrollId'}
                                        >
                                            {table}
                                        </div>
                                        {data?.data?.length > 10 && (
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
                                        )}
                                    </div>
                                )
                            }}
                        </Table>
                    ) : (
                        !isError && (
                            <EmptyData
                                title={'No Pending Student!'}
                                description={
                                    'You have no pending Student request yet'
                                }
                                height={'50vh'}
                            />
                        )
                    )}
                </Card>
            </div>
        </>
    )
}
