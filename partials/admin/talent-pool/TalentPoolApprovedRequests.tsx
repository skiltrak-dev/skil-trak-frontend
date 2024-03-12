import { AdminLayout } from '@layouts'
import { ColumnDef } from '@tanstack/react-table'
import { AppointmentTypeFilterType, NextPageWithLayout, Rpl } from '@types'
import {
    AcceptModal,
    CancelModal,
    TalentPoolStudentProfile,
} from '@partials/student/talentPool'
import { ReactElement, useEffect, useState } from 'react'
import {
    ActionButton,
    AppointmentTypeFilters,
    Card,
    EmptyData,
    Filter,
    InitialAvatar,
    LoadingAnimation,
    Table,
    TableAction,
    TableActionOption,
    TechnicalError,
    Typography,
} from '@components'
import { AdminApi } from '@queries'
import Link from 'next/link'
import { FaEye, FaTrash } from 'react-icons/fa'
import { IoMdEyeOff } from 'react-icons/io'
import { MdEmail, MdPhoneIphone } from 'react-icons/md'
import { useRouter } from 'next/router'
import { BsArchiveFill } from 'react-icons/bs'
import { MdDelete } from "react-icons/md";

import { HiCheckBadge } from 'react-icons/hi2'
import { IoClose } from 'react-icons/io5'
import { TalentPoolNotification } from '@partials/common/TalentPool'
import { TalentPoolStatusEnum, isBrowser } from '@utils'
import { ApprovedModal, DeleteProfileModal } from './modals'

enum StatusEnum {
    REJECTED = 'rejected',
    CONNECTED = 'connected',
    REQUESTED = 'requested',
    HIRED = 'hired',
}

export const TalentPoolApprovedRequests = () => {
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
                search: `status:hired`,
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
            <DeleteProfileModal
                profile={industry}
                onCancel={() => onModalCancelClicked()}
            />
        )
    }
    const onAcceptClicked = (industry: any) => {
        setModal(
            <ApprovedModal
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

    const tableActionOptions = (profile: any) => {
        return [
            {
                text: 'View',
                onClick: (profile: any) => {
                    router.push(
                        `/portals/admin/talent-pool/${profile?.id}`
                    )
                },
                Icon: FaEye,
            },
            {
                text: 'Delete',
                onClick: (profile: any) => onCancelClicked(profile),
                Icon: MdDelete,
                color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
            },
            // {
            //     text: 'Accept',
            //     onClick: (profile: any) => onAcceptClicked(profile),
            //     Icon: HiCheckBadge,
            //     color: 'text-green-500 hover:bg-green-100 hover:border-green-200',
            // },
        ]
    }

    

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'name',
            header: () => <span>Name</span>,
            cell: (info) => {
                return (
                    <div className="flex gap-x-4 items-center">
                        <InitialAvatar
                            imageUrl={`${info?.row?.original?.student?.user?.avatar}`}
                            name={`${info?.row?.original?.student?.user?.name}`}
                        />
                        <Typography variant="muted">
                            {info?.row?.original?.student?.user?.name || 'N/A'}
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
                        <Typography variant="small">
                            {info?.row?.original?.student?.user?.email || 'N/A'}
                        </Typography>
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
                        <Typography variant="small">
                            {info?.row?.original?.student?.phone || 'N/A'}
                        </Typography>
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
                            {info?.row?.original?.student?.suburb || 'N/A'}
                        </Typography>
                    </div>
                )
            },
        },
        {
            accessorKey: 'status',
            header: () => <span>Request Status</span>,
            cell: (info) => {
                return (
                    <div className="">
                        {info?.row?.original?.connectionRequests?.[0]?.status ===
                        TalentPoolStatusEnum.CONNECTED ? (
                            <Typography
                                variant="small"
                                color={'text-green-500'}
                            >
                                Connected
                            </Typography>
                        ) : info?.row?.original?.connectionRequests?.[0]?.status ===
                          TalentPoolStatusEnum.REJECTED ? (
                            <Typography variant="small" color={'text-red-500'}>
                                Rejected
                            </Typography>
                        ) : info?.row?.original?.connectionRequests?.[0]?.status ===
                          TalentPoolStatusEnum.HIRED ? (
                            <Typography
                                variant="small"
                                color={'text-green-500'}
                            >
                                Hired
                            </Typography>
                        ) : (
                            <Typography
                                variant="small"
                                color={'text-yellow-500'}
                            >
                                Pending
                            </Typography>
                        )}
                    </div>
                )
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
