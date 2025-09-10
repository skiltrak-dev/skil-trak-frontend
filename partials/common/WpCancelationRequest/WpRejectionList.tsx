import {
    Card,
    EmptyData,
    LoadingAnimation,
    Table,
    TechnicalError,
    Typography,
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'

import { AdminApi } from '@queries'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { StudentCellInfo } from '../../admin/student/components'

export const WpRejectionList = () => {
    const router = useRouter()
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 50))
    }, [router])

    const { isLoading, isFetching, data, isError } =
        AdminApi.Workplace.wpRejectionList({
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        })

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'student',
            header: () => <span>Student</span>,
            cell: (info) => (
                <StudentCellInfo student={info.row.original?.student} />
            ),
        },
        {
            accessorKey: 'industry',
            header: () => <span>Industry</span>,
            cell: (info) => (
                <StudentCellInfo student={info.row.original?.industry} />
            ),
        },
        {
            accessorKey: 'cancelledBy',
            header: () => <span>Cancelled By</span>,
            cell: (info) => {
                return (
                    <p className={`capitalize`}>
                        {info.row.original?.ActionedBy?.role}
                    </p>
                )
            },
        },
        {
            accessorKey: 'createdAt',
            header: () => <span>Created At</span>,
            cell: (info) => (
                <>
                    <Typography variant={'small'} color={'text-gray-600'}>
                        <span className="font-semibold whitespace-pre">
                            {moment(info?.row?.original?.createdAt).format(
                                'Do MMM YYYY'
                            )}
                        </span>
                    </Typography>
                    <Typography variant={'small'} color={'text-gray-600'}>
                        <span className="font-semibold whitespace-pre">
                            {moment(info?.row?.original?.createdAt).format(
                                'hh:mm:ss a'
                            )}
                        </span>
                    </Typography>
                </>
            ),
        },
    ]

    return (
        <>
            <div className="flex flex-col gap-y-4 mb-32 px-4">
                <PageHeading
                    title={'Declined Workplaces'}
                    subtitle={'List of Declined Workplaces'}
                />

                <Card noPadding>
                    {isError && <TechnicalError />}
                    {isLoading || isFetching ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : data && data?.data.length ? (
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
                                            className="px-6 overflow-auto remove-scrollbar"
                                            id={'studentScrollId'}
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
                                title={'No Blocked Students!'}
                                description={'You have not blocked Student yet'}
                                height={'50vh'}
                            />
                        )
                    )}
                </Card>
            </div>
        </>
    )
}
