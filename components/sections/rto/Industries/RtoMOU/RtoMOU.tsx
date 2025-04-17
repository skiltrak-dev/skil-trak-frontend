import {
    Button,
    Card,
    EmptyData,
    InitialAvatar,
    LoadingAnimation,
    Table,
    TableAction,
    TechnicalError,
    Typography,
} from '@components'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import {
    useCancelMOUByRTOMutation,
    useGetRtoMOUListQuery,
    useRejectMOUByRTOMutation,
} from '@queries'

// utils
import { userStatus } from '@utils'

export const RtoMOUContainer = () => {
    const router = useRouter()

    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    useEffect(() => {
        setPage(Number(router.query?.page || 1))
        setItemPerPage(Number(router.query?.pageSize || 50))
    }, [router])

    const { data, isLoading, isError } = useGetRtoMOUListQuery({
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })

    const [cancelMouByRto, cancelMouByRtoResult] = useCancelMOUByRTOMutation()
    const [rejectMouByRto, rejectMouByRtoResult] = useRejectMOUByRTOMutation()
    const columns = [
        {
            header: () => 'Name',
            accessorKey: 'user',
            sort: true,
            cell: ({ row }: any) => {
                const {
                    user: { name, email, avatar },
                } = row.original
                return (
                    <div className="flex items-center relative">
                        <div className="flex items-center gap-x-2">
                            <InitialAvatar name={name} imageUrl={avatar} />
                            <div>
                                <Typography color={'black'}>
                                    {' '}
                                    {name}{' '}
                                </Typography>
                                <Typography variant={'muted'} color={'gray'}>
                                    {email}
                                </Typography>
                            </div>
                        </div>
                    </div>
                )
            },
        },
        {
            header: () => 'ABN',
            accessorKey: 'abn',
        },
        {
            header: () => 'Phone',
            accessorKey: 'phoneNumber',
        },
        {
            header: () => 'Status',
            accessorKey: 'user.status',
            cell: ({ row }: any) => {
                const { mous } = row.original
                const mou = mous[0] || {}
                const status = () => {
                    if (
                        mou.status === userStatus.PENDING &&
                        mou.initiatedBy === 'rto'
                    ) {
                        return (
                            <span className="font-semibold text-info whitespace-pre">
                                Initiated
                            </span>
                        )
                    }
                    if (
                        mou.status === userStatus.PENDING &&
                        mou.initiatedBy === 'industry'
                    ) {
                        return (
                            <span className="font-semibold text-primary whitespace-pre">
                                Requested
                            </span>
                        )
                    }
                    if (mou.status === 'signed') {
                        return (
                            <span className="font-semibold text-success whitespace-pre">
                                Signed
                            </span>
                        )
                    }
                    if (mou.status === 'cancelled') {
                        return (
                            <span className="font-semibold text-error whitespace-pre">
                                Cancelled
                            </span>
                        )
                    }
                    if (mou.status === userStatus.REJECTED) {
                        return (
                            <span className="font-semibold text-error whitespace-pre">
                                Rejected
                            </span>
                        )
                    }

                    // action Return
                    return (
                        <span className="font-semibold text-black whitespace-pre">
                            Not Initiated
                        </span>
                    )
                }

                // Cell Return
                return status()
            },
            disableFilters: true,
        },
        {
            header: () => 'Action',
            accessorKey: 'Action',
            cell: ({ row }: any) => {
                const { mous, id } = row.original
                const mou = mous[0] || {}
                const actions = () => {
                    if (
                        mou.status === userStatus.PENDING &&
                        mou.initiatedBy === 'rto'
                    ) {
                        return (
                            <TableAction
                                rowItem={row}
                                options={[
                                    {
                                        text: 'View',
                                        onClick: () => {
                                            router.push(
                                                `/portals/rto/industries/mous/${mou?.id}`
                                            )
                                        },
                                        Icon: '',
                                    },
                                    {
                                        text: 'Cancel',
                                        onClick: async () => {
                                            await cancelMouByRto(mou.id)
                                        },
                                        Icon: '',
                                    },
                                ]}
                            />
                        )
                    }
                    if (
                        mou.status === userStatus.PENDING &&
                        mou.initiatedBy === 'industry'
                    ) {
                        return (
                            <TableAction
                                rowItem={row}
                                options={[
                                    {
                                        text: 'Sign',
                                        onClick: () => {
                                            router.push(
                                                `/portals/rto/industries/mous/${mou.id}`
                                            )
                                        },
                                        Icon: '',
                                    },
                                    {
                                        text: 'Reject',
                                        onClick: async () => {
                                            await rejectMouByRto(mou.id)
                                        },
                                    },
                                ]}
                            />
                        )
                    }
                    if (mou.status === 'signed') {
                        return (
                            <TableAction
                                rowItem={row}
                                options={[
                                    {
                                        text: 'View',
                                        onClick: () => {
                                            router.push(
                                                `/portals/rto/industries/mous/${mou.id}`
                                            )
                                        },
                                        Icon: '',
                                    },
                                    {
                                        text: (
                                            <a
                                                href={`${process.env.NEXT_PUBLIC_END_POINT}industries/mou/download/${mou.id}`}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                Download
                                            </a>
                                        ),
                                        onClick: () => {},
                                    },
                                    {
                                        text: 'Cancel',
                                        onClick: async () => {
                                            await cancelMouByRto(mou.id)
                                        },
                                    },
                                ]}
                            />
                        )
                    }
                    if (mou.status === 'cancelled') {
                        return <span className="text-error">Cancelled</span>
                    }
                    if (mou.status === userStatus.REJECTED) {
                        return <span className="text-error">Rejected</span>
                    }
                    // action Return
                    return (
                        <Button
                            onClick={() =>
                                router.push(
                                    `/portals/rto/industries/mous/${id}`
                                )
                            }
                            variant={'secondary'}
                            text={'Sign'}
                        />
                    )
                }

                // Cell Return
                return actions()
            },
        },
    ]
    return (
        <div>
            <Card noPadding>
                {isError && <TechnicalError />}
                {isLoading ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : data && data?.data.length ? (
                    <Table columns={columns} data={data?.data}>
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
                                            data?.data.length
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
                            title={'No Industries!'}
                            description={
                                'There is no any approved industry yet'
                            }
                            height={'50vh'}
                        />
                    )
                )}
            </Card>
        </div>
    )
}
