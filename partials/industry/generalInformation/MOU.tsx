import React, { createContext, useEffect, ReactElement, useState } from 'react'
import { useRouter } from 'next/router'

// components
import {
    Card,
    Button,
    ReactTable,
    Typography,
    BackButton,
    TableAction,
    Filter,
    LoadingAnimation,
    TechnicalError,
    EmptyData,
    Table,
} from '@components'
import { MOUCell, MOUFilter } from './components'

// Context
import { useContextBar } from '@hooks'

// colors
import { getThemeColors } from '@theme'
const Colors = getThemeColors()

// redux query
import {
    useGetIndustryMOUQuery,
    useCancelIndustryMOUMutation,
    useRejectIndustryMOUMutation,
} from '@queries'

// functions
import { userStatus } from '@utils'

export const SelectRtoData = createContext(null)

export const MoUContainer = () => {
    const router = useRouter()
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState({})
    const [filterActionButton, setFilterActionButton] = useState(null)
    const [modal, setModal] = useState<ReactElement | null>(null)

    // query
    const { data, isLoading, isError } = useGetIndustryMOUQuery({
        search: `${JSON.stringify(filter)
            .replaceAll('{', '')
            .replaceAll('}', '')
            .replaceAll('"', '')
            .trim()}`,
        sort: '-title',
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })

    // Redux Query
    const [cancelMou, cancelMouData] = useCancelIndustryMOUMutation()
    const [rejectMou, rejectMouData] = useRejectIndustryMOUMutation()

    const { setContent } = useContextBar()
    // useEffect(() => {
    //   setContent(
    //     <>
    //       <RightSidebarData />
    //     </>
    //   )
    // }, [setContent])
    //
    const Columns = [
        {
            header: () => 'Name',
            accessorKey: 'user',
            cell: ({ row }: any) => <MOUCell mou={row.original.user} />,
        },
        {
            header: () => 'Code',
            accessorKey: 'rtoCode',
        },
        {
            header: () => 'Phone',
            accessorKey: 'phone',
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
                        mou.initiatedBy === 'industry'
                    ) {
                        return (
                            <span className="font-semibold text-info whitespace-pre">
                                Initiated
                            </span>
                        )
                    }
                    if (
                        mou.status === userStatus.PENDING &&
                        mou.initiatedBy === 'rto'
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
                        mou.initiatedBy === 'industry'
                    ) {
                        return (
                            <TableAction
                                rowItem={row.original}
                                options={[
                                    {
                                        text: 'View',
                                        onClick: () => {
                                            router.push(
                                                `/portals/industry/general-information/mou/${mou.id}`
                                            )
                                        },
                                        Icon: '',
                                    },
                                    {
                                        text: 'Cancel',
                                        onClick: async () => {
                                            await cancelMou(mou.id)
                                        },
                                        Icon: '',
                                    },
                                ]}
                            />
                        )
                    }
                    if (
                        mou.status === userStatus.PENDING &&
                        mou.initiatedBy === 'rto'
                    ) {
                        return (
                            <TableAction
                                rowItem={row.original}
                                options={[
                                    {
                                        text: 'Sign',
                                        onClick: () => {
                                            router.push(
                                                `/portals/industry/general-information/mou/${mou.id}`
                                            )
                                        },
                                        Icon: '',
                                    },
                                    {
                                        text: 'Reject',
                                        onClick: async () => {
                                            await rejectMou(mou.id)
                                        },
                                    },
                                ]}
                            />
                        )
                    }
                    if (mou.status === 'signed') {
                        return (
                            <TableAction
                                rowItem={row.original}
                                options={[
                                    {
                                        text: 'View',
                                        onClick: () => {
                                            router.push(
                                                `/portals/industry/general-information/mou/${mou.id}`
                                            )
                                        },
                                        Icon: '',
                                    },
                                    {
                                        text: (
                                            <a
                                                href={`${process.env.NEXT_PUBLIC_END_POINT}/industries/mou/download/${mou.id}`}
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
                                            await cancelMou(mou.id)
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
                                    `/portals/industry/general-information/mou/${id}`
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

    const filterInitialValues = {
        name: '',
        email: '',
        rtoCode: '',
        status: '',
    }
    return (
        <div>
            <BackButton text={'Back To MoU Instructions'} />

            {/* Title */}
            <div className="flex md:gap-x-2 gap-x-4 justify-between items-center py-4">
                <div>
                    <Typography variant={'title'}>All MOU</Typography>
                    <Typography variant={'muted'} color={'gray'}>
                        You can find all RTOs here as well as requests
                    </Typography>
                </div>
                <div className="flex items-center gap-x-2">
                    {filterActionButton}
                    <Button variant={'dark'} text={'Archived'} />
                </div>
            </div>

            {/* Filter */}
            <Filter
                component={MOUFilter}
                setFilter={setFilter}
                setFilterAction={setFilterActionButton}
                initialValues={filter}
            />

            {/* Data */}

            <Card noPadding>
                {isError && <TechnicalError />}
                {isLoading ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : data && data?.data.length ? (
                    <Table
                        columns={Columns}
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
                            title={'No RTO,s were found!'}
                            description={'You have not approved RTO,s yet'}
                            height={'50vh'}
                        />
                    )
                )}
            </Card>
        </div>
    )
}
