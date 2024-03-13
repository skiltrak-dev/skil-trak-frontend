import {
    ActionButton,
    Badge,
    Card,
    EmptyData,
    InitialAvatar,
    LoadingAnimation,
    Table,
    TableAction,
    TechnicalError,
    Typography,
} from '@components'
import { TalentPoolNotification } from '@partials/common/TalentPool'
import { AcceptModal, CancelModal } from '@partials/student/talentPool'
import { AdminApi } from '@queries'
import { ColumnDef } from '@tanstack/react-table'
import { TalentPoolStatusEnum, isBrowser } from '@utils'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { BsArchiveFill } from 'react-icons/bs'
import { FaEye } from 'react-icons/fa'
import { HiCheckBadge } from 'react-icons/hi2'
import { IoMdEyeOff } from 'react-icons/io'

enum StatusEnum {
    REJECTED = 'rejected',
    CONNECTED = 'connected',
    REQUESTED = 'requested',
    HIRED = 'hired',
}

export const TalentPoolPendingRequests = () => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [view, setView] = useState<boolean>(false)
    const [changeStatusResult, setChangeStatusResult] = useState<any>({})
    const router = useRouter()

    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    useEffect(() => {
        setPage(Number(router.query?.page || 1))
        setItemPerPage(Number(router.query?.pageSize || 50))
    }, [router])

    const { isLoading, isFetching, data, isError, refetch } =
        AdminApi.TalentPool.useTalentPoolRequests(
            {
                search: `status:pending`,
                skip: itemPerPage * page - itemPerPage,
                limit: itemPerPage,
            },
            {
                refetchOnMountOrArgChange: true,
            }
        )

    const onModalCancelClicked = () => {
        setModal(null)
    }

    const onCancelClicked = (industry: any) => {
        setModal(
            <CancelModal
                industry={industry}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }
    const onAcceptClicked = (industry: any) => {
        setModal(
            <AcceptModal
                industry={industry}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }

    const scrollToTop = () => {
        if (isBrowser()) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }

    useEffect(() => {
        if (view) {
            scrollToTop()
        }
    }, [view])
    useEffect(() => {
        const timeout: any = setTimeout(() => {
            setView(false)
        }, 8000)

        return () => clearTimeout(timeout)
    }, [view])

    // const tableActionOptions = (industry: any) => {
    //     return [
    //         {
    //             text: 'View',
    //             onClick: (industry: any) => {
    //                 router.push(
    //                     `/portals/industry/talent-pool/matching-profiles/${industry?.id}`
    //                 )
    //             },
    //             Icon: FaEye,
    //         },
    //         {
    //             text: 'Cancel',
    //             onClick: (industry: any) => onCancelClicked(industry),
    //             Icon: BsArchiveFill,
    //             color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
    //         },
    //         {
    //             text: 'Accept',
    //             onClick: (industry: any) => onAcceptClicked(industry),
    //             Icon: HiCheckBadge,
    //             color: 'text-green-500 hover:bg-green-100 hover:border-green-200',
    //         },
    //     ]
    // }

    const tableActionOptions = (industry: any) => {
        let options = []

        if (industry.request_status === TalentPoolStatusEnum.Requested) {
            options.push(
                {
                    text: 'Accept',
                    onClick: () => onAcceptClicked(industry),
                    Icon: HiCheckBadge,
                    color: 'text-green-500 hover:bg-green-100 hover:border-green-200',
                },
                {
                    text: 'Cancel',
                    onClick: () => onCancelClicked(industry),
                    Icon: BsArchiveFill,
                    color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
                }
            )
        } else if (
            industry.request_status === TalentPoolStatusEnum.Connected ||
            industry.request_status === TalentPoolStatusEnum.Rejected
        ) {
            // do nothing
        }
        // if (industry.request_status === TalentPoolStatusEnum.Requested) {
        //     options.push({
        //         text: 'View',
        //         onClick: () => {
        //             setView(true)
        //         },
        //         Icon: FaEye,
        //     })
        // } else if (industry.request_status === TalentPoolStatusEnum.Connected) {
        //     options.push({
        //         text: 'View',
        //         onClick: () => {
        //             router.push(
        //                 `/portals/student/talent-pool/industry-request/${industry?.request_id}`
        //             )
        //         },
        //         Icon: FaEye,
        //     })
        // }
        options.push({
            text: 'View',
            onClick: () => {
                router.push(
                    `/portals/student/talent-pool/industry-request/${industry?.request_id}`
                )
            },
            Icon: FaEye,
        })

        return options
    }

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'name',
            header: () => <span>Name</span>,
            cell: (info) => {
                return (
                    <div className="flex gap-x-4 items-center">
                        <InitialAvatar
                            imageUrl={`${info?.row?.original?.avatar}`}
                            name={`${info?.row?.original?.name}`}
                        />
                        <Typography variant="muted">
                            {info?.row?.original?.name}
                        </Typography>
                    </div>
                )
            },
        },
        {
            accessorKey: 'email',
            header: () => <span>Email</span>,
            cell: (info) => {
                return (
                    <div className="whitespace-nowrap">
                        {info?.row?.original?.request_status ===
                            TalentPoolStatusEnum.Connected ||
                        info?.row?.original?.request_status ===
                            TalentPoolStatusEnum.Hired ? (
                            <Typography variant="small">
                                {info?.row?.original?.email || 'N/A'}
                            </Typography>
                        ) : (
                            <div className="relative">
                                nothing to show here
                                <div
                                    className={`absolute top-0 left-0 backdrop-blur-sm bg-[#cfcdcd]/20 w-full h-4 rounded-lg z-10`}
                                ></div>
                                <div
                                    onClick={() => setView(true)}
                                    className={`cursor-pointer absolute top-0 left-1/2 z-20 bg-[#24556D] px-1 rounded-md flex items-center justify-center`}
                                    style={{ height: '100%' }}
                                >
                                    <IoMdEyeOff
                                        size={15}
                                        className="text-white"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                )
            },
        },
        {
            accessorKey: 'phone',
            header: () => <span>Phone</span>,
            cell: (info) => {
                return (
                    <div className="whitespace-nowrap">
                        {info.row.original.request_status ===
                            TalentPoolStatusEnum.Connected ||
                        info?.row?.original?.request_status ===
                            TalentPoolStatusEnum.Hired ? (
                            <Typography variant="small">
                                {info?.row?.original?.phonenumber || 'N/A'}
                            </Typography>
                        ) : (
                            <div className="relative">
                                nothing to show here
                                <div
                                    className={`absolute top-0 left-0 backdrop-blur-sm bg-[#cfcdcd]/20 h-4 rounded-lg w-full z-10`}
                                ></div>
                                <div
                                    onClick={() => setView(true)}
                                    className={`cursor-pointer absolute top-0 left-1/2 z-20 bg-[#24556D] px-1 rounded-md flex items-center justify-center`}
                                    style={{ height: '100%' }}
                                >
                                    <IoMdEyeOff
                                        size={15}
                                        className="text-white"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                )
            },
        },
        {
            accessorKey: 'suburb',
            header: () => <span>Suburb</span>,
            cell: (info) => {
                return (
                    <div className="">
                        <Typography variant="small">
                            {info?.row?.original?.suburb}
                        </Typography>
                    </div>
                )
            },
        },
        {
            accessorKey: 'status',
            header: () => <span>Request Status</span>,
            cell: (info) => {
                switch (info?.row?.original?.status) {
                    case TalentPoolStatusEnum.Connected:
                        return <Badge text="Connected" variant="primary" />
                    case TalentPoolStatusEnum.Approved:
                        return <Badge text="Approved" variant="primary" />
                    case TalentPoolStatusEnum.Rejected:
                        return <Badge text="Rejected" variant="error" />
                    case TalentPoolStatusEnum.Hired:
                        return <Badge text="Hired" variant="success" />
                    case TalentPoolStatusEnum.Pending:
                        return <Badge text="Hired" variant="success" />
                    default:
                        return null
                }
            },
        },
        {
            accessorKey: 'action',
            header: () => <span>Action</span>,
            cell: (info: any) => {
                const actions = tableActionOptions(info?.row?.original)
                return (
                    <TableAction
                        options={actions}
                        rowItem={info.row.original}
                    />
                )
            },
        },
    ]

    const quickActionsElements = {
        id: 'id',
        individual: (id: any) => (
            <div className="flex gap-x-2">
                <ActionButton variant="success" onClick={() => {}}>
                    Accept
                </ActionButton>
                <ActionButton variant="error" onClick={() => {}}>
                    Reject
                </ActionButton>
            </div>
        ),
        common: (ids: any[]) => (
            <ActionButton
                onClick={() => {
                    const arrayOfIds = ids.map((id: any) => id?.user.id)
                    // bulkAction({ ids: arrayOfIds, status: 'archived' })
                }}
                variant="error"
            >
                Archive
            </ActionButton>
        ),
    }
    return (
        <>
            {modal && modal}
            {view && (
                <TalentPoolNotification
                    setViewNotification={() => setView(false)}
                    text={
                        'You can view profile and details of industry only when you accept the industry request'
                    }
                />
            )}
            <Card noPadding>
                {isError && <TechnicalError />}
                {isLoading || isFetching ? (
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
                                    <div className="px-6 overflow-x-scroll remove-scrollbar">
                                        {table}
                                    </div>
                                </div>
                            )
                        }}
                    </Table>
                ) : (
                    !isError && (
                        <EmptyData
                            title={'No Active Profiles'}
                            description={'You have no Active Profiles'}
                            height={'50vh'}
                        />
                    )
                )}
            </Card>
        </>
    )
}
