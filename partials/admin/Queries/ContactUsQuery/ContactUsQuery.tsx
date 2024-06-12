import {
    Button,
    Card,
    EmptyData,
    InitialAvatar,
    LoadingAnimation,
    Table,
    TableChildrenProps,
    TechnicalError,
    Typography,
} from '@components'
import { PageHeading } from '@components/headings'
import { ColumnDef } from '@tanstack/react-table'
import { FaPhone } from 'react-icons/fa'

import { CommonApi } from '@queries'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { MdEmail } from 'react-icons/md'

// hooks
import { ErrorBoundary } from '@components/ErrorBoundary/ErrorBoundary'
import { ContactUsQueryModal } from './modals'
import { ellipsisText } from '@utils'

export const ContactUsQuery = () => {
    const router = useRouter()

    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [modal, setModal] = useState<ReactElement | null>(null)

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 50))
    }, [router])

    // hooks

    const { isLoading, isFetching, data, isError, refetch } =
        CommonApi.WorkBased.useContactUsQueries(
            {
                skip: itemPerPage * page - itemPerPage,
                limit: itemPerPage,
            },
            { refetchOnMountOrArgChange: true }
        )
    const onCancelModal = () => setModal(null)

    const onContactModal = (workBase: any) =>
        setModal(
            <ContactUsQueryModal onCancel={onCancelModal} workBase={workBase} />
        )

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'name',
            cell: (info) => {
                const userDetail = info.row?.original
                return (
                    <div className="flex items-center gap-x-2 cursor-pointer">
                        <div className="">
                            <ErrorBoundary>
                                {info.row?.original?.name && (
                                    <InitialAvatar
                                        name={info.row?.original?.name}
                                    />
                                )}
                            </ErrorBoundary>
                        </div>
                        <div>
                            <p className="font-semibold">
                                {userDetail?.email || 'N/A'}
                            </p>
                        </div>
                    </div>
                )
            },
            header: () => <span>User</span>,
        },
        {
            accessorKey: 'phone',
            header: () => <span>Phone</span>,
            cell: (info) =>
                info.row.original?.phone ? (
                    <Typography medium variant="small">
                        <span className="whitespace-pre">
                            {info.row.original?.phone}
                        </span>
                    </Typography>
                ) : (
                    '---'
                ),
        },
        {
            accessorKey: 'subject',
            header: () => <span>Subject</span>,
        },
        {
            accessorKey: 'message',
            cell: (info) => {
                return (
                    <div
                        title={info?.row?.original?.message}
                        className="flex items-center gap-x-2 cursor-pointer"
                    >
                        {ellipsisText(info?.row?.original?.message, 50) ||
                            'N/A'}
                    </div>
                )
            },
            header: () => <span>Message</span>,
        },
        {
            accessorKey: 'createdAt',
            cell: (info) => {
                return (
                    <div className="flex items-center gap-x-2 ">
                        {(info?.row?.original?.createdAt &&
                            info?.row?.original?.createdAt?.slice(0, 10)) ||
                            'NA'}
                    </div>
                )
            },
            header: () => <span>Created At</span>,
        },

        {
            accessorKey: 'Action',
            header: () => <span>Action</span>,
            cell: (info) => (
                <Button
                    text={info.row?.original?.isRead ? 'Contacted' : 'Contact'}
                    onClick={() => {
                        if (!info.row?.original?.isRead) {
                            onContactModal(info.row?.original)
                        }
                    }}
                    variant={info.row?.original?.isRead ? 'info' : 'primary'}
                />
            ),
        },
    ]

    return (
        <>
            {modal}
            <div className="flex flex-col gap-y-4 px-4">
                <div className="flex">
                    <PageHeading
                        title={'Contact Us Queries'}
                        subtitle={'List of Contact Us Queries'}
                    />
                </div>
                <Card noPadding>
                    {isError && <TechnicalError />}
                    {isLoading || isFetching ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : data?.data && data?.data?.length ? (
                        <Table columns={columns} data={data?.data}>
                            {({
                                table,
                                pagination,
                                pageSize,
                                quickActions,
                            }: TableChildrenProps) => {
                                return (
                                    <div>
                                        <div className="p-6 mb-2 flex justify-between">
                                            {pageSize
                                                ? pageSize(
                                                      itemPerPage,
                                                      setItemPerPage,
                                                      data?.data?.length
                                                  )
                                                : null}
                                            <div className="flex gap-x-2">
                                                {quickActions}
                                                {pagination
                                                    ? pagination(
                                                          data?.pagination,
                                                          setPage
                                                      )
                                                    : null}
                                            </div>
                                        </div>
                                        <div className="overflow-x-auto remove-scrollbar">
                                            <div
                                                className="px-6 w-full"
                                                id={'studentScrollId'}
                                            >
                                                {table}
                                            </div>
                                        </div>
                                        {data?.data?.length > 10 && (
                                            <div className="p-6 mb-2 flex justify-between">
                                                {pageSize
                                                    ? pageSize(
                                                          itemPerPage,
                                                          setItemPerPage,
                                                          data?.data?.length
                                                      )
                                                    : null}
                                                <div className="flex gap-x-2">
                                                    {quickActions}
                                                    {pagination
                                                        ? pagination(
                                                              data?.pagination,
                                                              setPage
                                                          )
                                                        : null}
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
                                title={'No Contact Us Queries!'}
                                description={
                                    'There is no Contact Us Queries Yet'
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
