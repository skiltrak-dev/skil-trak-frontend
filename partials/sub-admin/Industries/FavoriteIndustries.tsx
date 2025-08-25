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
    TableActionOption,
    TechnicalError,
    Typography,
    UserCreatedAt,
} from '@components'

import { useGetFavouriteIndustriesQuery } from '@queries'
import { ColumnDef } from '@tanstack/react-table'
import { Industry } from '@types'
import { setLink } from '@utils'
import { MdFavorite } from 'react-icons/md'
import { SubadminProgressIndustryCell } from './components'
import { AddToFavoriteModal } from './modals'

export const FavoriteIndustries = () => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const router = useRouter()
    const [itemPerPage, setItemPerPage] = useState(10)
    const [page, setPage] = useState(1)

    // hooks

    useEffect(() => {
        setPage(Number(router.query.page || 1))
        setItemPerPage(Number(router.query.pageSize || 10))
    }, [router])

    const { isLoading, isFetching, data, isError } =
        useGetFavouriteIndustriesQuery({
            skip: itemPerPage * page - itemPerPage,
            limit: itemPerPage,
        })

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

    const tableActionOptions: TableActionOption<any>[] = [
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
            text: 'Remove Favourite',
            onClick: (industry: Industry) => onAddToFavoriteClicked(industry),
            color: 'text-error',
            Icon: MdFavorite,
        },
    ]

    const Columns: ColumnDef<Industry>[] = [
        {
            header: () => 'Name',
            accessorKey: 'user',
            cell: ({ row }) => (
                <SubadminProgressIndustryCell industry={row.original} />
            ),
        },
        {
            accessorKey: 'abn',
            header: () => <span>ABN</span>,
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
                    <UserCreatedAt createdAt={row?.original?.createdAt} />
                </div>
            ),
        },

        {
            header: () => 'Action',
            accessorKey: 'Action',
            cell: ({ row }) => (
                <TableAction
                    options={tableActionOptions}
                    rowItem={row.original}
                />
            ),
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
                            title={'No Favorite Industries!'}
                            description={
                                'You have not added a Favorite Industries yet'
                            }
                            height={'50vh'}
                        />
                    )
                )}
            </Card>
        </>
    )
}
