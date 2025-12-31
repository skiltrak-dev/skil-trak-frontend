import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

// Icons
import { FaEye, FaPencilAlt } from 'react-icons/fa'

// components
import {
    ActionButton,
    Card,
    EmptyData,
    LoadingAnimation,
    Table,
    TableAction,
    TechnicalError,
    TruncatedTextWithTooltip,
    Typography,
} from '@components'

import { useActionModal } from '@hooks'
import { SubAdminApi, useGetSubAdminIndustriesQuery } from '@queries'
import { Industry, SubAdmin, UserStatus } from '@types'
import { getUserCredentials, setLink } from '@utils'
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md'
import { IndustryCellInfo } from './components'
import { AcceptModal, AddToFavoriteModal, RejectModal } from './modals'

export const PendingIndustries = () => {
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

    const { isLoading, data, isError } = useGetSubAdminIndustriesQuery({
        search: `status:${UserStatus.Pending}`,
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })

    const id = getUserCredentials()?.id

    const onCancelClicked = () => {
        setModal(null)
    }

    const onAcceptClicked = (industry: Industry) => {
        setModal(<AcceptModal industry={industry} onCancel={onCancelClicked} />)
    }

    const onRejectClicked = (industry: Industry) => {
        setModal(<RejectModal industry={industry} onCancel={onCancelClicked} />)
    }

    const onAddToFavoriteClicked = (industry: Industry) => {
        setModal(
            <AddToFavoriteModal
                industry={industry}
                onCancel={onCancelClicked}
            />
        )
    }

    const isFavorite = (subAdmin: SubAdmin[] | undefined) => {
        return subAdmin?.find((subadmin: any) => subadmin?.user?.id === id)
    }

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
                text: 'Edit',
                onClick: (industry: Industry) => {
                    router.push(
                        `/portals/sub-admin/users/industries/${industry?.id}/edit-profile`
                    )
                },
                Icon: FaPencilAlt,
            },
            {
                text: `${subAdmin ? 'Un Favourite' : 'Add Favourite'}`,
                color: `${subAdmin ? 'text-error' : 'text-primary'}`,
                onClick: (industry: Industry) =>
                    onAddToFavoriteClicked(industry),
                Icon: subAdmin ? MdFavorite : MdFavoriteBorder,
            },
            {
                text: 'Accept',
                onClick: (industry: Industry) => onAcceptClicked(industry),
            },
            {
                text: 'Reject',
                onClick: (industry: Industry) => onRejectClicked(industry),
            },
            // {
            //     text: 'View Password',
            //     onClick: (industry: Industry) => onViewPassword(industry),
            //     Icon: RiLockPasswordFill,
            // },
        ]
    }

    const Columns = [
        {
            header: () => 'Name',
            accessorKey: 'user',
            sort: true,
            cell: ({ row }: any) => (
                <IndustryCellInfo industry={row.original} />
            ),
        },
        {
            accessorKey: 'abn',
            header: () => <span>ABN</span>,
        },
        // {
        //     header: () => 'Suburb',
        //     accessorKey: 'suburb',
        //     cell: ({ row }: any) => {
        //         const { suburb } = row.original
        //         return (
        //             <Typography variant={'label'} color={'black'}>
        //                 {suburb}
        //             </Typography>
        //         )
        //     },
        // },
        // {
        //     header: () => 'Address',
        //     accessorKey: 'address',
        //     cell: ({ row }: any) => (
        //         <TruncatedTextWithTooltip text={row?.original?.addressLine1} />
        //     ),
        // },
        {
            header: () => 'Contact Person',
            accessorKey: 'contactPersonNumber',
            cell: ({ row }: any) => {
                const { contactPersonNumber } = row.original
                return (
                    <Typography variant={'muted'} color={'gray'}>
                        {contactPersonNumber}
                    </Typography>
                )
            },
        },
        {
            header: () => 'Action',
            accessorKey: 'Action',
            cell: ({ row }: any) => {
                const actions = tableActionOptions(row.original)
                return (
                    <div className="flex gap-x-1 items-center">
                        <ActionButton
                            variant="success"
                            onClick={() => onAcceptClicked(row.original)}
                        >
                            Accept
                        </ActionButton>
                        <ActionButton
                            variant="error"
                            onClick={() => onRejectClicked(row.original)}
                        >
                            Reject
                        </ActionButton>

                        <TableAction options={actions} rowItem={row.original} />
                    </div>
                )
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
