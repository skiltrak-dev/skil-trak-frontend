import {
    Badge,
    EmptyData,
    InitialAvatar,
    LoadingAnimation,
    Table,
    TableAction,
    TechnicalError,
    Typography,
} from '@components'
import { ColumnDef } from '@tanstack/react-table'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'
import { FaEye } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

import { TalentPoolNotification } from '@partials/common/TalentPool'
import { TalentPoolStatusEnum, isBrowser } from '@utils'
import { ApprovedModal, DeleteProfileModal } from './modals'

export const FilteredTalentPoolRequests = ({
    talentPoolData,
    setPage,
    itemPerPage,
    setItemPerPage,
}: {
    setPage: any
    itemPerPage: any
    setItemPerPage: any
    talentPoolData: any
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [view, setView] = useState<boolean>(false)
    const router = useRouter()

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
                    router.push(`/portals/admin/talent-pool/${profile?.id}`)
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
            accessorKey: 'suburb',
            header: () => <span>Name</span>,
            cell: (info) => (
                <div className="flex items-center gap-x-2">
                    {info?.row?.original?.student?.user?.name ? (
                        <InitialAvatar
                            name={info?.row?.original?.student?.user?.name}
                        />
                    ) : null}
                    <Typography variant="small" medium>
                        {info?.row?.original?.student?.user?.name || 'N/A'}
                    </Typography>
                </div>
            ),
        },
        {
            accessorKey: 'email',
            header: () => <span>Email</span>,
            cell: (info) => (
                <div className="">
                    <Typography variant="small" medium>
                        {info?.row?.original?.student?.user?.email || 'N/A'}
                    </Typography>
                </div>
            ),
        },
        {
            accessorKey: 'phone',
            header: () => <span>Phone</span>,
            cell: (info) => (
                <div className="">
                    <Typography variant="small" medium>
                        {info?.row?.original?.student?.phone || 'N/A'}
                    </Typography>
                </div>
            ),
        },
        {
            accessorKey: 'suburb',
            header: () => <span>Suburb</span>,
            cell: (info) => (
                <div className="">
                    <Typography variant="small" medium>
                        {info?.row?.original?.student?.suburb || 'N/A'}
                    </Typography>
                </div>
            ),
        },
        {
            accessorKey: 'sector',
            header: () => <span>Sector</span>,
            cell: (info) => {
                return (
                    <div>
                        <Typography variant="small" medium>
                            {info.row.original?.sector?.name}
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
            <div>
                {talentPoolData.isError && <TechnicalError />}
                {talentPoolData.isLoading || talentPoolData.isFetching ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : talentPoolData.data &&
                  talentPoolData?.data?.data?.length ? (
                    <Table columns={columns} data={talentPoolData?.data?.data}>
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
                                            talentPoolData?.data?.data?.length
                                        )}
                                        <div className="flex gap-x-2">
                                            {quickActions}
                                            {pagination(
                                                talentPoolData?.data
                                                    ?.pagination,
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
                    !talentPoolData.isError && (
                        <EmptyData
                            title={'No Active Profiles'}
                            description={'You have no Active Profiles'}
                            height={'50vh'}
                        />
                    )
                )}
            </div>
        </>
    )
}
