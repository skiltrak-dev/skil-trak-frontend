import {
    Card,
    EmptyData,
    LoadingAnimation,
    Table,
    TableAction,
    Typography,
} from '@components'
import { PageHeading } from '@components/headings'
import { Industry, SubAdmin } from '@types'
import { useRouter } from 'next/router'
import React, { ReactElement, useState } from 'react'
import { IndustryCellInfo } from './components'
//icons
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md'
import { FaEye } from 'react-icons/fa'
import { AddToFavoriteModal } from './modals'
import { getUserCredentials } from '@utils'
import { IndustrySubAdmin } from './AllIndustries'
import { RiLockPasswordFill } from 'react-icons/ri'
import { useActionModal } from '@hooks'
// export interface IndustrySubAdmin extends Industry {
//     subAdmin: SubAdmin[]
// }

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
    const { passwordModal, onViewPassword } = useActionModal()

    const router = useRouter()
    const id = getUserCredentials()?.id
    const isFavorite = (subAdmin: SubAdmin[] | undefined) => {
        return subAdmin?.find((subadmin: any) => subadmin?.user?.id === id)
    }
    const tableActionOptions = (industry: IndustrySubAdmin) => {
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
            accessorKey: 'students',
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
            {passwordModal}
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
                            columns={Columns}
                            data={industry?.data.data}
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
