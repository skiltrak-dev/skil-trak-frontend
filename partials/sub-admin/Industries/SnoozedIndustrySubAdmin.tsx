import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

// Icons
import { FaEye, FaPencilAlt } from 'react-icons/fa'
import { MdSnooze } from 'react-icons/md'
// components
import {
    Card,
    EmptyData,
    LoadingAnimation,
    Table,
    TableAction,
    TableActionOption,
    TechnicalError,
    Typography,
} from '@components'

import {
    useGetSubAdminIndustriesQuery,
    useGetSnoozedIndustryQuery,
} from '@queries'
import { Industry, SubAdmin, UserStatus } from '@types'
import { IndustryCellInfo } from './components'
import { AddToFavoriteModal, ArchiveModal, BlockModal } from './modals'
import { MdBlock, MdFavorite, MdFavoriteBorder } from 'react-icons/md'
import { getUserCredentials, setLink } from '@utils'
import { RiInboxArchiveFill, RiLockPasswordFill } from 'react-icons/ri'
import { useActionModal } from '@hooks'
import { UnSnoozeIndustryModal } from '@partials/common'

interface IndustrySubAdmin extends Industry {
    subAdmin: SubAdmin[]
    callLog: any
}

export const SnoozedIndustrySubAdmin = () => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const router = useRouter()
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    // hooks
    const { passwordModal, onViewPassword } = useActionModal()

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 50))
    }, [router])

    // const { isLoading, data, isError } = useGetSubAdminIndustriesQuery(
    //     {
    //         search: `status:${UserStatus.Approved}`,
    //         skip: itemPerPage * page - itemPerPage,
    //         limit: itemPerPage,
    //     },
    //     {
    //         refetchOnMountOrArgChange: true,
    //     }
    // )
    const { isLoading, data, isError } = useGetSnoozedIndustryQuery({
        // search: `status:${UserStatus.Approved}`,
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })

    const id = getUserCredentials()?.id

    const onCancelClicked = () => {
        setModal(null)
    }

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

    const isFavorite = (subAdmin: SubAdmin[] | undefined) => {
        return subAdmin?.find((subadmin: any) => subadmin?.user?.id === id)
    }
    const UnSnoozeModal = (industry: IndustrySubAdmin) => {
        setModal(
            <UnSnoozeIndustryModal
                onCancel={onCancelClicked}
                industry={industry}
            />
        )
    }

    const tableActionOptions = (industry: IndustrySubAdmin) => {
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
                text: 'Edit',
                onClick: (industry: Industry) => {
                    router.push(
                        `/portals/sub-admin/users/industries/${industry?.id}/edit-profile`
                    )
                },
                Icon: FaPencilAlt,
            },
            {
                text: `Unsnooze`,
                // onClick: (industry: Industry) => onSnoozedClicked(industry),
                onClick: (industry: any) => {
                    UnSnoozeModal(industry)
                },
                Icon: MdSnooze,
                color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
            },
            {
                text: `${subAdmin ? 'Un Favourite' : 'Add Favourite'}`,
                color: `${subAdmin ? 'text-error' : 'text-primary'}`,
                onClick: (industry: Industry) =>
                    onAddToFavoriteClicked(industry),
                Icon: subAdmin ? MdFavorite : MdFavoriteBorder,
            },
            {
                text: 'View Password',
                onClick: (industry: Industry) => onViewPassword(industry),
                Icon: RiLockPasswordFill,
            },
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

    const Columns = [
        {
            header: () => 'Name',
            accessorKey: 'user',
            sort: true,
            cell: ({ row }: any) => (
                <IndustryCellInfo
                    industry={row.original}
                    isFavorite={isFavorite}
                    call
                />
            ),
        },
        {
            accessorKey: 'abn',
            header: () => <span>ABN</span>,
        },
        {
            header: () => 'Suburb',
            accessorKey: 'suburb',
            cell: ({ row }: any) => {
                const { suburb } = row.original
                return (
                    <Typography variant={'label'} color={'black'}>
                        {suburb}
                    </Typography>
                )
            },
        },
        {
            header: () => 'Address',
            accessorKey: 'address',
            cell: ({ row }: any) => {
                const { addressLine1 } = row.original
                return (
                    <Typography variant={'label'} color={'black'}>
                        {addressLine1}
                    </Typography>
                )
            },
        },
        // {
        //     header: () => 'Enrolled Students',
        //     accessorKey: 'students',
        //     cell: ({ row }: any) => {
        //         const { enrolledStudents } = row.original
        //         return (
        //             <Typography variant={'muted'} color={'gray'}>
        //                 {enrolledStudents}
        //             </Typography>
        //         )
        //     },
        // },
        {
            header: () => 'Contact Person',
            accessorKey: 'contactPersonNumber',
            cell: ({ row }: any) => {
                const { contactPersonNumber, contactPerson } = row.original
                return (
                    <Typography variant={'muted'} color={'gray'}>
                        {contactPersonNumber} {contactPerson}
                    </Typography>
                )
            },
        },
        {
            header: () => 'Snoozed By',
            accessorKey: 'snoozedBy',
            cell: ({ row }: any) => {
                return (
                    <Typography variant={'muted'} color={'gray'}>
                        {row?.original?.snoozedBy?.name || 'N/A'}
                    </Typography>
                )
            },
        },
        {
            header: () => 'Snoozed At',
            accessorKey: 'snoozedAt',
            cell: ({ row }: any) => {
                return (
                    <Typography variant={'muted'} color={'gray'}>
                        {row?.original?.snoozedAt?.slice(0, 10) || 'N/A'}
                    </Typography>
                )
            },
        },
        {
            header: () => 'Snoozed Date',
            accessorKey: 'snoozedDate',
            cell: ({ row }: any) => {
                return (
                    <Typography variant={'muted'} color={'gray'}>
                        {row?.original?.snoozedDate?.slice(0, 10) || 'N/A'}
                    </Typography>
                )
            },
        },
        {
            header: () => 'Action',
            accessorKey: 'Action',
            cell: ({ row }: any) => {
                const actions = tableActionOptions(row.original)
                return <TableAction options={actions} rowItem={row.original} />
            },
        },
    ]

    return (
        <>
            {modal && modal}
            {passwordModal}
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
                            title={'No Snoozed Industry!'}
                            description={
                                'You have not Snoozed any Industry request yet'
                            }
                            height={'50vh'}
                        />
                    )
                )}
            </Card>
        </>
    )
}
