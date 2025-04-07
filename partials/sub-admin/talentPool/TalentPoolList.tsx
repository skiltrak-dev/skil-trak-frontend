import {
    Badge,
    EmptyData,
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

import { IndustryCell } from '@partials/industry'
import { TalentPoolStatusEnum, isBrowser } from '@utils'
import Link from 'next/link'
import { StudentCellInfo } from '../students'

export const TalentPoolList = ({
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

    // const onCancelClicked = (industry: any) => {
    //     setModal(
    //         <DeleteProfileModal
    //             profile={industry}
    //             onCancel={() => onModalCancelClicked()}
    //         />
    //     )
    // }
    // const onAcceptClicked = (industry: any) => {
    //     setModal(
    //         <ApprovedModal
    //             industry={industry}
    //             onCancel={() => onModalCancelClicked()}
    //         />
    //     )
    // }

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
                    router.push(`/portals/sub-admin/talent-pool/${profile?.id}`)
                },
                Icon: FaEye,
            },
            // {
            //     text: 'Archive',
            //     onClick: (profile: any) => onCancelClicked(profile),
            //     Icon: FaFileArchive,
            //     color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
            // },
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
            accessorKey: 'user',
            header: () => <span>Name</span>,
            cell: (info) => (
                <Link
                    href={`/portals/sub-admin/talent-pool/${info?.row?.original?.id}`}
                >
                    <StudentCellInfo student={info?.row?.original?.student} />
                </Link>
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
                            {info?.row?.original?.sector?.name}
                        </Typography>
                    </div>
                )
            },
        },
        {
            accessorKey: 'industry',
            header: () => <span>Industry</span>,
            cell: (info) =>
                info?.row?.original?.connectionRequests &&
                info?.row?.original?.connectionRequests?.length > 0 ? (
                    <IndustryCell
                        industry={
                            info?.row?.original?.connectionRequests?.[0]
                                ?.industry
                        }
                    />
                ) : (
                    <Typography variant="small" medium>
                        N/A
                    </Typography>
                ),
        },
        {
            accessorKey: 'status',
            header: () => <span>Profile Status</span>,
            cell: (info) => {
                switch (info?.row?.original?.status) {
                    case TalentPoolStatusEnum.Requested:
                        return <Badge text="Requested" variant="info" />
                    case TalentPoolStatusEnum.Connected:
                        return <Badge text="Connected" variant="primary" />
                    case TalentPoolStatusEnum.Approved:
                        return <Badge text="Approved" variant="primary" />
                    case TalentPoolStatusEnum.Rejected:
                        return <Badge text="Rejected" variant="error" />
                    case TalentPoolStatusEnum.Hired:
                        return <Badge text="Hired" variant="success" />
                    // case TalentPoolStatusEnum.Pending:
                    //     return <Badge text="Hired" variant="success" />
                    default:
                        return <Badge text="Pending" variant="accent" />
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
