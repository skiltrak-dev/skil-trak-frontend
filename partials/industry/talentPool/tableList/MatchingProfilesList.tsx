import { ReactElement, useEffect, useState } from 'react'
import {
    ActionButton,
    Badge,
    Button,
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
import {
    TalentPoolProfileIndustryStatus,
    TalentPoolProfileStatus,
    TalentPoolStatusEnum,
    isBrowser,
} from '@utils'
import { FaEye } from 'react-icons/fa'
import { IoMdEyeOff } from 'react-icons/io'
import { TalentPoolNotification } from '@partials/common/TalentPool'
import Link from 'next/link'
import { OptionType } from '@types'
import { TalentPoolDropdown } from '@partials/admin'

export const MatchingProfilesList = () => {
    const [selectedTalentPool, setSelectedTalentPool] =
        useState<TalentPoolProfileStatus>(TalentPoolProfileStatus.All)
    const [selectedSector, setSelectedSector] = useState<OptionType | null>(
        null
    )
    const [modal, setModal] = useState<ReactElement | null>(null)
    const getSectors = AuthApi.useSectors({})
    const router = useRouter()
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const [view, setView] = useState<boolean>(false)
    const [readTalentPoolCount, readTalentPoolCountResult] =
        IndustryApi.TalentPool.useReadTalentPoolProfileCount()

    const sectorOptions = getSectors.data?.map((sector: any) => ({
        label: `${sector?.code} - ${sector?.name}`,
        value: sector.id,
    }))
    useEffect(() => {
        readTalentPoolCount()
    }, [])
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

    // useEffect(() => {
    //     setPage(Number(router.query?.page || 1))
    //     setItemPerPage(Number(router.query?.pageSize || 50))
    // }, [router])

    const { isLoading, isFetching, data, isError, refetch } =
        IndustryApi.TalentPool.useMatchingProfilesList(
            {
                search: `${JSON.stringify({
                    status:
                        selectedTalentPool !== TalentPoolProfileStatus.All
                            ? selectedTalentPool
                            : null,
                    sectorId: selectedSector?.value,
                })
                    .replaceAll('{', '')
                    .replaceAll('}', '')
                    .replaceAll('"', '')
                    .trim()}`,
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

    const tableActionOptions = (student: any) => {
        return [
            {
                text: 'View',
                onClick: (student: any) => {
                    router.push(`/portals/industry/talent-pool/${student?.id}`)
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
                        {(info?.row?.original?.connectionRequests &&
                            info?.row?.original?.connectionRequests.length >
                                0 &&
                            info?.row?.original?.connectionRequests?.[0]
                                ?.status === 'connected') ||
                        info?.row?.original?.connectionRequests?.[0]?.status ===
                            'hired' ? (
                            <Typography variant="small">
                                {info?.row?.original?.student?.user?.email ||
                                    'N/A'}
                            </Typography>
                        ) : (
                            <div className="relative select-none cursor-not-allowed">
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
                        {(info?.row?.original?.connectionRequests &&
                            info?.row?.original?.connectionRequests.length >
                                0 &&
                            info?.row?.original?.connectionRequests?.[0]
                                ?.status === 'connected') ||
                        info?.row?.original?.connectionRequests?.[0]?.status ===
                            'hired' ? (
                            <Typography variant="small">
                                {info?.row?.original?.student?.phone}
                            </Typography>
                        ) : (
                            <div className="relative select-none cursor-not-allowed">
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
            accessorKey: 'connectionRequests',
            header: () => <span>Request Status</span>,
            cell: (info) => {
                switch (info?.row?.original?.connectionRequests?.[0]?.status) {
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
                    case TalentPoolStatusEnum.Pending:
                        return <Badge text="Pending" variant="success" />
                    default:
                        return (
                            <Badge text="Not Requested" variant="secondary" />
                        )
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

            <div className="flex justify-end mb-5">
                <Button
                    text={'View Hired Students'}
                    onClick={() =>
                        router.push(
                            `/portals/industry/talent-pool/hired-profiles`
                        )
                    }
                />
            </div>

            <Card noPadding>
                <div className="flex items-center justify-between border-b border-secondary-dark p-3.5">
                    <Typography variant="subtitle">
                        Matching Profiles
                    </Typography>
                    <div className="flex items-center gap-x-5">
                        <TalentPoolDropdown
                            title="Sector"
                            selected={
                                selectedSector?.label || 'Search by sector...'
                            }
                            onClear={() => {
                                setSelectedSector(null)
                            }}
                            dropDown={() => (
                                <div>
                                    {sectorOptions?.map(
                                        (sector: OptionType) => (
                                            <div
                                                key={Number(sector.value)}
                                                onClick={() => {
                                                    setSelectedSector(sector)
                                                }}
                                                className="hover:bg-gray-200 py-2 border-b border-secondary-dark px-2 cursor-pointer"
                                            >
                                                <Typography variant="small">
                                                    {sector?.label}
                                                </Typography>
                                            </div>
                                        )
                                    )}
                                </div>
                            )}
                        />
                        <TalentPoolDropdown
                            title="Showing Results"
                            selected={selectedTalentPool?.toLocaleUpperCase()}
                            dropDown={() => {
                                return (
                                    <div>
                                        {Object.entries(
                                            TalentPoolProfileIndustryStatus
                                        )?.map(([key, value]: any) => (
                                            <div
                                                key={key}
                                                onClick={() => {
                                                    setSelectedTalentPool(value)
                                                }}
                                                className={`${
                                                    key === selectedTalentPool
                                                        ? 'bg-gray-200'
                                                        : ''
                                                } hover:bg-gray-200 py-2 border-b border-secondary-dark px-2 cursor-pointer`}
                                            >
                                                <Typography variant="small">
                                                    {key}
                                                </Typography>
                                            </div>
                                        ))}
                                    </div>
                                )
                            }}
                        />
                    </div>
                </div>
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
                            title={'Apologies!'}
                            description={
                                "No listings are available for your selected option at the moment. We're actively seeking updates. Thank you for your patience."
                            }
                            height={'50vh'}
                        />
                    )
                )}
            </Card>
        </div>
    )
}
