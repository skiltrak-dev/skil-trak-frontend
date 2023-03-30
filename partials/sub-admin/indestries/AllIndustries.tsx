import { useRouter } from 'next/router'
import { ReactElement, useState } from 'react'

// Icons
import { FaEye } from 'react-icons/fa'

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

import { useGetSubAdminIndustriesQuery } from '@queries'
import { Industry, SubAdmin } from '@types'
import { IndustryCellInfo } from './components'
import { AddToFavoriteModal } from './modals'
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md'
import { getUserCredentials, setLink } from '@utils'
import { RiLockPasswordFill } from 'react-icons/ri'
import { useActionModal } from '@hooks'

export interface IndustrySubAdmin extends Industry {
    subAdmin: SubAdmin[]
}

export const AllIndustries = () => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const router = useRouter()
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)

    // hooks
    const { passwordModal, onViewPassword } = useActionModal()

    const { isLoading, data, isError } = useGetSubAdminIndustriesQuery({
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

    const isFavorite = (subAdmin: SubAdmin[] | undefined) => {
        return subAdmin?.find((subadmin: any) => subadmin?.user?.id === id)
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
                />
            ),
        },
        {
            accessorKey: 'abn',
            header: () => <span>ABN</span>,
        },
        {
            header: () => 'Address',
            accessorKey: 'address',
            cell: ({ row }: any) => {
                const { addressLine1, addressLine2 } = row.original
                return (
                    <Typography variant={'label'} color={'black'}>
                        {addressLine1}, {addressLine2}
                    </Typography>
                )
            },
        },
        {
            header: () => 'Enrolled Students',
            accessorKey: 'enrolledStudents',
            cell: ({ row }: any) => {
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
                                        {pageSize(itemPerPage, setItemPerPage)}
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
