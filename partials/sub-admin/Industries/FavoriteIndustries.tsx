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
    TruncatedTextWithTooltip,
    Typography,
} from '@components'

import { useActionModal } from '@hooks'
import { useGetFavouriteIndustriesQuery } from '@queries'
import { Industry } from '@types'
import { setLink } from '@utils'
import { MdFavorite } from 'react-icons/md'
import { IndustryCellInfo } from './components'
import { AddToFavoriteModal } from './modals'

export const FavoriteIndustries = () => {
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

    const { isLoading, data, isError } = useGetFavouriteIndustriesQuery({
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
        // {
        //     text: 'View Password',
        //     onClick: (industry: Industry) => onViewPassword(industry),
        //     Icon: RiLockPasswordFill,
        // },
    ]

    const Columns = [
        {
            header: () => 'Name',
            accessorKey: 'user',
            sort: true,
            cell: ({ row }: any) => (
                <IndustryCellInfo industry={row.original} call />
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
            cell: ({ row }: any) => (
                <TruncatedTextWithTooltip text={row?.original?.addressLine1} />
            ),
        },
        // {
        //     header: () => 'Enrolled Students',
        //     accessorKey: 'enrolledStudents',
        //     cell: ({ row }: any) => {
        //         const { enrolledStudents } = row.original
        //         return (
        //             <div className="flex justify-center">
        //                 <Typography variant={'muted'} color={'gray'}>
        //                     {enrolledStudents}
        //                 </Typography>
        //             </div>
        //         )
        //     },
        // },
        {
            header: () => 'Contact Person',
            accessorKey: 'contactPersonNumber',
            cell: ({ row }: any) => {
                const { contactPersonNumber } = row.original
                return (
                    <div className="flex justify-center">
                        <Typography variant={'muted'} color={'gray'}>
                            {contactPersonNumber}
                        </Typography>
                    </div>
                )
            },
        },
        {
            header: () => 'Action',
            accessorKey: 'Action',
            cell: ({ row }: any) => {
                return (
                    <TableAction
                        options={tableActionOptions}
                        rowItem={row.original}
                    />
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
