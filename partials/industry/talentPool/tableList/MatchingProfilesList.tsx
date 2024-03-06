import { ReactElement, useEffect, useState } from 'react'
import {
    ActionButton,
    Card,
    EmptyData,
    InitialAvatar,
    LoadingAnimation,
    Select,
    Table,
    TableAction,
    TechnicalError,
    Typography,
} from '@components'
import { AuthApi, IndustryApi, commonApi } from '@queries'
import { ColumnDef } from '@tanstack/react-table'
import { useRouter } from 'next/router'
import { isBrowser } from '@utils'
import { FaEye } from 'react-icons/fa'
import { IoMdEyeOff } from 'react-icons/io'
import { TalentPoolNotification } from '@partials/common/TalentPool'

export const MatchingProfilesList = () => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [sectorId, setSectorId] = useState<any>({})
    const getSectors = AuthApi.useSectors({})
    const router = useRouter()
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [view, setView] = useState<boolean>(false)

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
        }, 10000)

        return () => clearTimeout(timeout)
    }, [view])

    const sectorOptions = getSectors.data?.map((sector: any) => ({
        label: sector.name,
        value: sector.id,
    }))

    // useEffect(() => {
    //     setPage(Number(router.query?.page || 1))
    //     setItemPerPage(Number(router.query?.pageSize || 50))
    // }, [router])

    const { isLoading, isFetching, data, isError, refetch } =
        IndustryApi.TalentPool.useMatchingProfilesList(
            {
                // search: `sectorId: ${sectorId}`,
                skip: itemPerPage * page - itemPerPage,
                limit: itemPerPage,
            },
            {
                refetchOnMountOrArgChange: true,
            }
        )
    const [bulkAction, resultBulkAction] = commonApi.useBulkStatusMutation()

    // useEffect(() => {
    //     if (changeStatusResult.isSuccess) {
    //         refetch()
    //     }
    // }, [changeStatusResult])

    const onModalCancelClicked = () => {
        setModal(null)
    }

    const tableActionOptions = (student: any) => {
        return [
            {
                text: 'View',
                onClick: (student: any) => {
                    router.push(
                        `/portals/industry/talent-pool/matching-profiles/${student?.id}`
                    )
                },
                Icon: FaEye,
            },

            // {
            //     text: 'Edit',
            //     onClick: (subadmin: SubAdmin) => {
            //         onEditSubAdmin(subadmin)
            //     },
            //     Icon: FaEdit,
            // },
            // {
            //     text: 'View Password',
            //     onClick: (subAdmin: SubAdmin) => onViewPassword(subAdmin),
            //     Icon: RiLockPasswordFill,
            // },
            // {
            //     ...(role === UserRoles.ADMIN
            //         ? {
            //               text: `${
            //                   !subAdmin?.canAdmin
            //                       ? 'Allow as Admin'
            //                       : 'Remove As Admin'
            //               }`,
            //               onClick: (subAdmin: SubAdmin) =>
            //                   onMakeAsAdminClicked(subAdmin),
            //               Icon: MdAdminPanelSettings,
            //           }
            //         : {}),
            // },
            // {
            //     text: `${
            //         !subAdmin?.allowAutoAssignment
            //             ? 'Allow Auto Assignment'
            //             : 'Remove Auto Assignment'
            //     }`,
            //     onClick: (subAdmin: SubAdmin) =>
            //         onAutoAssignWorkplace(subAdmin),
            //     Icon: MdOutlineAssignmentReturn,
            // },
            // {
            //     text: 'Block',
            //     onClick: (subAdmin: SubAdmin) => onBlockedClicked(subAdmin),
            //     Icon: BsArchiveFill,
            //     color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
            // },
            // {
            //     text: 'Archive',
            //     onClick: (subAdmin: any) => onArchivedClicked(subAdmin),
            //     Icon: BsArchiveFill,
            //     color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
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
                            {info?.row?.original?.student?.user?.name}
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
                        {info?.row?.original?.connectionRequests &&
                        info?.row?.original?.connectionRequests.length > 0 &&
                        info?.row?.original?.connectionRequests?.[0].status ===
                            'connected' ? (
                            <Typography variant="small">
                                {info?.row?.original?.student?.user?.email ||
                                    'N/A'}
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
                        {info?.row?.original?.connectionRequests &&
                        info?.row?.original?.connectionRequests.length > 0 &&
                        info?.row?.original?.connectionRequests?.[0]?.status ===
                            'connected' ? (
                            <Typography variant="small">
                                {info?.row?.original?.student?.phone}
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
            accessorKey: 'suburb',
            header: () => <span>Suburb</span>,
            cell: (info) => {
                return (
                    <div className="">
                        <Typography variant="small">
                            {info?.row?.original?.student?.suburb}
                        </Typography>
                    </div>
                )
            },
        },
        {
            accessorKey: 'connectionRequests',
            header: () => <span>Request Status</span>,
            cell: (info) => {
                return (
                    <div className="">
                        {info?.row?.original?.connectionRequests &&
                        info?.row?.original?.connectionRequests?.length > 0 &&
                        info?.row?.original?.connectionRequests?.[0]?.status ===
                            'connected' ? (
                            <Typography
                                variant="small"
                                color={'text-green-500'}
                            >
                                Connected
                            </Typography>
                        ) : info?.row?.original?.connectionRequests?.[0]
                              ?.status === 'rejected' ? (
                            <Typography variant="small" color={'text-red-500'}>
                                Rejected
                            </Typography>
                        ) : info?.row?.original?.connectionRequests?.[0]
                              ?.status === 'requested' ? (
                            <Typography variant="small" color={'text-red-500'}>
                                Requested
                            </Typography>
                        ) : (
                            <Typography variant="small">
                                Not Requested
                            </Typography>
                        )}
                    </div>
                )
            },
        },
        // {
        //     accessorKey: 'createdBy.role',
        //     header: () => <span>Created By</span>,
        //     cell: (info) =>
        //         info.row.original?.createdBy?.role === UserRoles.RTO ? (
        //             <>
        //                 <RtoCellInfo
        //                     rto={
        //                         {
        //                             id: info.row.original?.createdBy?.rto?.id,
        //                             user: info.row.original?.createdBy as User,
        //                         } as Rto
        //                     }
        //                     short
        //                 />
        //                 <Typography variant={'small'} uppercase>
        //                     <span className="font-semibold">
        //                         {info.row.original?.createdBy?.role}
        //                     </span>
        //                 </Typography>
        //             </>
        //         ) : (
        //             <Typography variant={'small'} uppercase>
        //                 <span className="font-semibold">
        //                     {info.row.original?.createdBy?.role}
        //                 </span>
        //             </Typography>
        //         ),
        //     // cell: (info) => (
        //     //     <Typography variant={'small'} uppercase>
        //     //         <span className="font-semibold">
        //     //             {info.row.original?.createdBy?.role}
        //     //         </span>
        //     //     </Typography>
        //     // ),
        // },
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
                {/* <ActionButton variant="success" onClick={() => {}}>
                    Accept
                </ActionButton>
                <ActionButton variant="error" onClick={() => {}}>
                    Reject
                </ActionButton> */}
            </div>
        ),
        // common: (ids: any[]) => (
        //     <ActionButton
        //         onClick={() => {
        //             const arrayOfIds = ids.map((id: any) => id?.user.id)
        //             bulkAction({ ids: arrayOfIds, status: 'archived' })
        //         }}
        //         variant="error"
        //     >
        //         Archive
        //     </ActionButton>
        // ),
    }

    return (
        <div>
            {view && (
                <TalentPoolNotification
                    setViewNotification={() => setView(false)}
                    text={
                        'You can view profile and details of student only when your request is connected'
                    }
                />
            )}
            {/* <div className="flex justify-end">
                <Select
                    label={'Search by Sectors'}
                    name={'sectorId'}
                    options={sectorOptions}
                    placeholder={'Select Sectors...'}
                    onChange={(e: any) => {
                        setSectorId(e)
                    }}
                    loading={getSectors.isLoading}
                    disabled={getSectors.isLoading}
                    onlyValue
                />
            </div> */}
            <Card noPadding>
                {isError && <TechnicalError />}
                {isLoading || isFetching ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : data && data?.data.length ? (
                    <Table
                        columns={columns}
                        data={data.data}
                        quickActions={quickActionsElements}
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
        </div>
    )
}
