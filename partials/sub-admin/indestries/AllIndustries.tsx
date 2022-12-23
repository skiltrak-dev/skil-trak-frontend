import { useState, ReactElement } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

// Icons
import { FaEye, FaPhoneSquareAlt, FaEnvelope } from 'react-icons/fa'

// components
import {
    Card,
    TableActionOption,
    Typography,
    TableAction,
    LoadingAnimation,
    Table,
    EmptyData,
} from '@components'

import { Industry } from '@types'
import { useGetSubAdminIndustriesQuery } from '@queries'
import { TechnicalError } from '@components/ActionAnimations/TechnicalError'
import { IndustryCellInfo } from './components'

export const AllIndustries = () => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const router = useRouter()
    const [itemPerPage, setItemPerPage] = useState(5)
    const [page, setPage] = useState(1)

    const { isLoading, data } = useGetSubAdminIndustriesQuery({
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })
    const tableActionOptions: TableActionOption[] = [
        {
            text: 'View',
            onClick: (industry: Industry) => {
                router.push(
                    `/portals/sub-admin/users/industries/${industry.id}`
                )
            },
            Icon: FaEye,
        },
    ]

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
            header: () => 'Student Capacity',
            accessorKey: 'studentCapacity',
            cell: ({ row }: any) => {
                const { studentCapacity } = row.original
                return (
                    <Typography variant={'muted'} color={'gray'}>
                        {studentCapacity}
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
                return (
                    <TableAction options={tableActionOptions} rowItem={row} />
                )
            },
        },
    ]

    return (
        <Card noPadding>
            {isLoading ? (
                <LoadingAnimation height="h-[60vh]" />
            ) : data && data?.data.length ? (
                <Table
                    columns={Columns}
                    data={data.data}
                    // quickActions={quickActionsElements}
                    enableRowSelection
                >
                    {({ table, pagination, pageSize, quickActions }: any) => {
                        return (
                            <div>
                                <div className="p-6 mb-2 flex justify-between">
                                    {pageSize(itemPerPage, setItemPerPage)}
                                    <div className="flex gap-x-2">
                                        {quickActions}
                                        {pagination(data?.pagination, setPage)}
                                    </div>
                                </div>
                                <div className="px-6">{table}</div>
                            </div>
                        )
                    }}
                </Table>
            ) : (
                <EmptyData
                    title={'No Approved Industry!'}
                    description={
                        'You have not approved any Industry request yet'
                    }
                    height={'50vh'}
                />
            )}
        </Card>
    )
}
