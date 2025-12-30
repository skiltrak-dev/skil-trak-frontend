import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

// Icons
import { FaEye, FaPencilAlt } from 'react-icons/fa'

// components
import {
    Card,
    EmptyData,
    LoadingAnimation,
    Table,
    TableAction,
    TableChildrenProps,
    TechnicalError,
    Typography,
    UserCreatedAt,
} from '@components'

import { useGetSubAdminIndustriesQuery } from '@queries'
import { ColumnDef } from '@tanstack/react-table'
import { Industry, SubAdmin, UserStatus } from '@types'
import { ellipsisText, getUserCredentials, setLink } from '@utils'
import { MdBlock, MdFavorite, MdFavoriteBorder } from 'react-icons/md'
import { RiInboxArchiveFill } from 'react-icons/ri'
import { SubadminProgressIndustryCell } from './components'
import { AddToFavoriteModal, ArchiveModal, BlockModal } from './modals'

export const AllIndustries = ({ isHod }: { isHod?: boolean }) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const router = useRouter()
    const [itemPerPage, setItemPerPage] = useState(30)
    const [page, setPage] = useState(1)
    const [isRouting, setIsRouting] = useState(true)

    const subadminId = getUserCredentials()?.id

    useEffect(() => {
        if (!isRouting) return
        const newPage = Number(router.query.page)
        const newItemPerPage = Number(router.query.pageSize)
        if (router.query.page) {
            setPage(newPage)
        }
        if (router.query.pageSize) {
            setItemPerPage(newItemPerPage)
        }
    }, [router])

    const { isLoading, isFetching, data, isError } =
        useGetSubAdminIndustriesQuery(
            {
                search: `status:${UserStatus.Approved}`,
                skip: itemPerPage * page - itemPerPage,
                limit: itemPerPage,
            },
            {
                refetchOnMountOrArgChange: true,
            }
        )

    const hasCourseApproved =
        data?.data &&
        data?.data?.length > 0 &&
        data?.data?.filter(
            (item: any) =>
                item.hasOwnProperty(item?.hasCourseApproved) &&
                !item?.hasCourseApproved
        )

    // 1- get api to retrieve the remaining industry courses on sector base
    // 2- If the coordinator already/approved sent the request to HOD for course approval, remove it from the above get api
    // 3-
    // useDepartmentApprovedIndustryList
    // const { isLoading, data, isError } =
    //     CommonApi.FindWorkplace.useDepartmentApprovedIndustryList(
    //         {
    //             // search: `status:${UserStatus.Approved}`,
    //             skip: itemPerPage * page - itemPerPage,
    //             limit: itemPerPage,
    //         },
    //         {
    //             refetchOnMountOrArgChange: true,
    //         }
    //     )
    const id = getUserCredentials()?.id

    const onCancelClicked = () => setModal(null)

    const onAddToFavoriteClicked = (industry: Industry) => {
        setModal(
            <AddToFavoriteModal
                industry={industry}
                onCancel={onCancelClicked}
            />
        )
    }

    const onBlockClicked = (industry: Industry) => {
        setModal(<BlockModal industry={industry} onCancel={onCancelClicked} />)
    }

    const onArchiveClicked = (industry: Industry) => {
        setModal(
            <ArchiveModal industry={industry} onCancel={onCancelClicked} />
        )
    }

    const isFavorite = (subAdmin: SubAdmin[] | undefined) =>
        subAdmin?.find((subadmin: any) => subadmin?.user?.id === id)

    const tableActionOptions = (industry: Industry) => {
        const subAdmin = isFavorite(industry?.subAdmin)

        return [
            {
                text: 'View',
                onClick: (industry: Industry) => {
                    router.push(
                        `/portals/sub-admin/users/industries/${industry.id}`
                    )
                    setLink('subadmin-industries', router)
                },
                Icon: FaEye,
            },
            {
                text: 'View Old Profile',
                onClick: (industry: Industry) => {
                    router.push(
                        `/portals/sub-admin/users/industries/${industry.id}/old-detail`
                    )
                    setLink('subadmin-industries', router)
                },
                Icon: FaEye,
            },
            {
                ...(isHod
                    ? {
                          text: 'Edit',
                          onClick: (industry: Industry) => {
                              router.push(
                                  `/portals/sub-admin/users/industries/${industry?.id}/edit-profile`
                              )
                          },
                          Icon: FaPencilAlt,
                      }
                    : {}),
            },

            {
                text: `${
                    industry?.favoriteBy &&
                    industry?.favoriteBy?.user?.id === subadminId
                        ? 'Un Favourite'
                        : 'Add Favourite'
                }`,
                color: `${
                    industry?.subAdmin && industry?.subAdmin?.length > 0
                        ? 'text-error'
                        : 'text-primary'
                }`,
                onClick: (industry: Industry) =>
                    onAddToFavoriteClicked(industry),
                Icon: subAdmin ? MdFavorite : MdFavoriteBorder,
            },
            // {
            //     text: 'View Password',
            //     onClick: (industry: Industry) => onViewPassword(industry),
            //     Icon: RiLockPasswordFill,
            // },
            {
                text: `Block`,
                color: 'text-error',
                onClick: (industry: Industry) => onBlockClicked(industry),
                Icon: MdBlock,
            },
            {
                text: 'Archive',
                color: 'text-primary',
                onClick: (industry: Industry) => onArchiveClicked(industry),
                Icon: RiInboxArchiveFill,
            },
        ]
    }

    const Columns: ColumnDef<Industry>[] = [
        {
            header: () => 'Business Name',
            accessorKey: 'user',
            cell: ({ row }) => (
                <SubadminProgressIndustryCell industry={row.original} />
            ),
        },
        {
            accessorKey: 'abn',
            header: () => <span>ABN Number</span>,
        },
        {
            header: () => 'Students',
            accessorKey: 'students',
            cell: ({ row }) => {
                const { enrolledStudents } = row.original
                return (
                    <Typography variant={'muted'} color={'gray'} center>
                        {enrolledStudents}
                    </Typography>
                )
            },
        },

        {
            header: () => 'Contact Person',
            accessorKey: 'contactPersonNumber',
            cell: ({ row }) => {
                const { contactPersonNumber, contactPerson } = row.original
                return (
                    <Typography variant={'muted'} color={'gray'}>
                        {contactPersonNumber} {contactPerson}
                    </Typography>
                )
            },
        },
        {
            accessorKey: 'favouriteBy',
            header: () => <span>Favorite By</span>,
            cell: ({ row }) => {
                const userName = row?.original?.favoriteBy?.user?.name
                return (
                    <div className="flex items-center">
                        {userName ? (
                            <div className="relative px-3 py-1 bg-orange-100 text-orange-600  rounded-tl-lg rounded-br-lg clip-path-bookmark">
                                {userName}
                            </div>
                        ) : (
                            <span className="text-gray-400">—</span>
                        )}
                    </div>
                )
            },
        },
        {
            accessorKey: 'channel',
            header: () => <span>Registered By</span>,
            cell: ({ row }) => (
                <div>
                    {row?.original?.createdBy !== null ? (
                        <div className="bg-emerald-100 text-emerald-600 rounded-md px-2 py-0.5 flex items-center gap-x-1">
                            {/* <FaArrowUp /> */}
                            <p className="text-xs whitespace-nowrap">
                                {ellipsisText(
                                    row.original?.createdBy?.name,
                                    10
                                )}
                            </p>
                        </div>
                    ) : (
                        <div className="flex items-center gap-x-1 bg-blue-100 text-blue-600 rounded-md px-2 py-0.5">
                            {/* <FaArrowUp /> */}

                            <p className="text-xs">{row?.original?.channel}</p>
                        </div>
                    )}
                    <UserCreatedAt createdAt={row?.original?.createdAt} />
                </div>
            ),
        },
        {
            header: () => 'Manage',
            accessorKey: 'Action',
            cell: ({ row }) => {
                const actions = tableActionOptions(row.original)
                return <TableAction options={actions} rowItem={row.original} />
            },
        },
    ]

    return (
        <>
            {modal}
            <Card noPadding>
                {isError && <TechnicalError />}
                {isLoading || isFetching ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : data && data?.data.length ? (
                    <Table
                        columns={Columns?.filter((c: any) => c?.header) as any}
                        data={data.data}
                        // quickActions={quickActionsElements}
                        enableRowSelection
                        hasCourseApproved={hasCourseApproved}
                    >
                        {({
                            table,
                            pagination,
                            pageSize,
                            quickActions,
                        }: TableChildrenProps) => {
                            return (
                                <div>
                                    <div className="p-6 mb-2 flex justify-between">
                                        {pageSize &&
                                            pageSize(
                                                itemPerPage,
                                                (e) => {
                                                    setItemPerPage(e)
                                                    setIsRouting(false)
                                                },
                                                data?.data.length
                                            )}
                                        <div className="flex gap-x-2">
                                            {quickActions}
                                            {pagination &&
                                                pagination(
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
                            title={'No Approved Industry!'}
                            description={
                                'You have not approved any Industry request yet'
                            }
                            height={'50vh'}
                        />
                    )
                )}
            </Card>
        </>
    )
}
