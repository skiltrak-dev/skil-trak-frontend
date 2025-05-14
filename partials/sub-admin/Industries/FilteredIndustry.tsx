import {
    Badge,
    Card,
    EmptyData,
    LoadingAnimation,
    Table,
    TableAction,
    TruncatedTextWithTooltip,
    Typography,
    UserCreatedAt,
} from '@components'
import { PageHeading } from '@components/headings'
import { Industry, SubAdmin, UserStatus } from '@types'
import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'
import { IndustryCellInfo, IndustryCellInfoProgressbar } from './components'
//icons
import { getUserCredentials } from '@utils'
import { FaEye, FaPencilAlt } from 'react-icons/fa'
import { MdBlock, MdFavorite, MdFavoriteBorder } from 'react-icons/md'
import { AddToFavoriteModal, ArchiveModal, BlockModal } from './modals'
import { SubAdminApi } from '@queries'
import { RiInboxArchiveFill } from 'react-icons/ri'
import { ColumnDef } from '@tanstack/react-table'

export const FilteredIndustry = ({
    industry,
    setPage,
    itemPerPage,
    setItemPerPage,
}: {
    industry: any
    setPage: any
    itemPerPage: any
    setItemPerPage: any
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    // hooks

    const router = useRouter()
    const id = getUserCredentials()?.id
    const isFavorite = (subAdmin: SubAdmin[] | undefined) => {
        return subAdmin?.find((subadmin: SubAdmin) => subadmin?.user?.id === id)
    }

    const onCancelClicked = () => setModal(null)

    const onBlockClicked = (industry: Industry) => {
        setModal(<BlockModal industry={industry} onCancel={onCancelClicked} />)
    }

    const onArchiveClicked = (industry: Industry) => {
        setModal(
            <ArchiveModal industry={industry} onCancel={onCancelClicked} />
        )
    }

    const tableActionOptions = (industry: Industry) => {
        const onCancelClicked = () => {
            setModal(null)
        }
        const subAdmin = isFavorite(industry?.subAdmin)
        const onAddToFavoriteClicked = (industry: Industry) => {
            setModal(
                <AddToFavoriteModal
                    industry={industry}
                    onCancel={onCancelClicked}
                />
            )
        }
        return [
            {
                text: 'View',
                onClick: (industry: Industry) => {
                    router.push(
                        `/portals/sub-admin/users/industries/${industry.id}`
                    )
                },
                Icon: FaEye,
            },
            {
                text: 'Old Profile',
                onClick: (industry: Industry) => {
                    router.push(
                        `/portals/sub-admin/users/industries/${industry.id}/detail`
                    )
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
                text: `${
                    industry?.favoriteBy &&
                    industry?.favoriteBy?.user?.id === id
                        ? 'Un Favourite'
                        : 'Add Favourite'
                }`,
                color: `${subAdmin ? 'text-error' : 'text-primary'}`,
                onClick: (industry: Industry) =>
                    onAddToFavoriteClicked(industry),
                Icon: subAdmin ? MdFavorite : MdFavoriteBorder,
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
    const Columns: ColumnDef<Industry>[] = [
        {
            header: () => 'Name',
            accessorKey: 'user',
            // sort: true,
            cell: ({ row }: any) => (
                <div className="flex gap-x-2">
                    <IndustryCellInfoProgressbar
                        industry={row.original}
                        isFavorite={row.original?.favoriteBy}
                        call
                    />
                </div>
            ),
        },
        {
            accessorKey: 'abn',
            header: () => <span>ABN</span>,
        },
        {
            header: () => 'Address',
            accessorKey: 'address',
            cell: ({ row }) => (
                <TruncatedTextWithTooltip text={row?.original?.addressLine1} />
            ),
        },
        {
            header: () => 'Enrolled Students',
            accessorKey: 'students',
            cell: ({ row }) => {
                const { enrolledStudents } = row.original
                return (
                    <Typography variant={'muted'} color={'gray'}>
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
            header: () => <span>Favourite By</span>,
            cell: ({ row }) => (
                <div>
                    <Typography variant="label">
                        {row?.original?.favoriteBy?.user?.name}
                    </Typography>
                </div>
            ),
        },
        {
            accessorKey: 'createdBy',
            header: () => <span>Created By</span>,
            cell: ({ row }) => (
                <div>
                    {row?.original?.createdBy !== null ? (
                        <p>{row?.original?.createdBy?.name}</p>
                    ) : (
                        <p>{row?.original?.channel}</p>
                    )}
                </div>
            ),
        },
        {
            accessorKey: 'createdAt',
            header: () => <span>Created At</span>,
            cell: ({ row }) => (
                <UserCreatedAt createdAt={row?.original?.createdAt} />
            ),
        },
        {
            header: () => 'Status',
            accessorKey: 'user.status',
            cell: ({ row }) => (
                <Badge
                    text={row.original?.user?.status}
                    variant={
                        [UserStatus.Blocked, UserStatus.Rejected].includes(
                            row.original?.user?.status
                        )
                            ? 'error'
                            : 'primary'
                    }
                />
            ),
        },
        {
            header: () => 'Action',
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
            <div className="flex flex-col gap-y-4 p-4">
                <PageHeading
                    title={'Filtered Industries'}
                    subtitle={'List of Filtered Industries'}
                />

                <Card noPadding>
                    {industry?.isLoading || industry?.isFetching ? (
                        <LoadingAnimation height="h-[60vh]" />
                    ) : industry?.data && industry?.data?.data.length ? (
                        <Table
                            columns={
                                Columns?.filter((c: any) => c?.header) as any
                            }
                            data={industry?.data?.data}
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
                                                industry.data?.data?.length
                                            )}
                                            <div className="flex gap-x-2">
                                                {quickActions}
                                                {pagination(
                                                    industry?.data?.pagination,
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
                        <EmptyData
                            title={'No Industries in your Search!'}
                            description={'No Industries in your Search yet'}
                            height={'50vh'}
                        />
                    )}
                </Card>
            </div>
        </>
    )
}
