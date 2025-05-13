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
    TechnicalError,
    TruncatedTextWithTooltip,
    Typography,
    UserCreatedAt,
} from '@components'

import { useGetSubAdminIndustriesQuery } from '@queries'
import { ColumnDef } from '@tanstack/react-table'
import { Industry, SubAdmin, UserStatus } from '@types'
import { ellipsisText, getUserCredentials, setLink } from '@utils'
import { MdBlock, MdFavorite, MdFavoriteBorder } from 'react-icons/md'
import { RiInboxArchiveFill } from 'react-icons/ri'
import { IndustryCellInfo } from './components'
import { AddToFavoriteModal, ArchiveModal, BlockModal } from './modals'
import { FaArrowUp } from 'react-icons/fa'

export const AllIndustries = ({ isHod }: { isHod?: boolean }) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const router = useRouter()
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    const subadminId = getUserCredentials()?.id

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 50))
    }, [router])

    const { isLoading, data, isError } = useGetSubAdminIndustriesQuery(
        {
            search: `status:${UserStatus.Approved}`,
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        },
        {
            refetchOnMountOrArgChange: true,
        }
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
            // sort: true,
            cell: ({ row }: any) => {
                return (
                    <div className="">
                        <IndustryCellInfo
                            industry={row.original}
                            isFavorite={row?.original?.favoriteBy}
                            call
                        />
                    </div>
                )
            },
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
            header: () => <span>Bookmarked By</span>,
            cell: ({ row }) => (
                <div>
                    <Typography variant="label">
                        {row?.original?.favoriteBy
                            ? row?.original?.favoriteBy?.user?.name
                            : '---'}
                    </Typography>
                </div>
            ),
        },
        {
            accessorKey: 'channel',
            header: () => <span>Registered By</span>,
            cell: ({ row }) => (
                <div>
                    {row?.original?.createdBy !== null ? (
                        <div className="bg-emerald-200 text-emerald-600 rounded-md px-2 py-0.5 inline-flex items-center gap-x-1">
                            {/* <FaArrowUp /> */}
                            <p className="text-x whitespace-nowrap">
                                {ellipsisText(
                                    row.original?.createdBy?.name,
                                    10
                                )}
                            </p>
                        </div>
                    ) : (
                        <div className="inline-flex items-center gap-x-1 bg-blue-200 text-blue-600 rounded-md px-2 py-0.5">
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
                {isLoading ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : data && data?.data.length ? (
                    <Table
                        columns={Columns?.filter((c: any) => c?.header) as any}
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
