import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

// Icons
import { FaEye, FaEnvelope } from 'react-icons/fa'

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

import { Student } from '@types'
import { useState } from 'react'
import { useGetSubAdminStudentsQuery } from '@queries'
import { TechnicalError } from '@components/ActionAnimations/TechnicalError'

export const AllStudents = () => {
    const router = useRouter()

    const [filterAction, setFilterAction] = useState(null)
    const [itemPerPage, setItemPerPage] = useState(5)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState({})
    const { isLoading, data, isError } = useGetSubAdminStudentsQuery({
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })
    const tableActionOptions: TableActionOption[] = [
        {
            text: 'View',
            onClick: (student: Student) => {
                router.push(
                    `/portals/sub-admin/users/students/${student.id}?tab=overview`
                )
            },
            Icon: FaEye,
        },
        // {
        //     text: 'Delete',
        //     onClick: (student: Student) => onBlockClicked(student),
        //     Icon: MdBlock,
        //     color: 'text-red-500 hover:bg-red-100 hover:border-red-200',
        // },
    ]

    const Columns = [
        {
            header: () => 'Name',
            accessorKey: 'user',
            sort: true,
            cell: ({ row }: any) => {
                const {
                    phone,
                    workplace,
                    industries,
                    user: { name, email, image },
                } = row.original

                return (
                    <div className="flex items-center relative">
                        <div className="flex items-center gap-x-2">
                            <Image
                                className="rounded-full w-7 h-7"
                                src={
                                    'https://images.unsplash.com/photo-1664575602276-acd073f104c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80' ||
                                    ' '
                                }
                                alt={''}
                                width={50}
                                height={50}
                            />
                            <Link
                                href={`/portals/sub-admin/users/students/${row.original.id}?tab=overview`}
                            >
                                <a>
                                    <div className="flex items-center gap-x-2">
                                        <Typography variant={'muted'}>
                                            {phone}
                                        </Typography>
                                        <div className="flex items-center gap-x-2 ">
                                            <div
                                                className={`w-1 h-1 rounded-full ${
                                                    industries === null
                                                        ? 'bg-red-400'
                                                        : 'bg-green-400'
                                                } `}
                                            ></div>
                                            <Typography
                                                variant="muted"
                                                color="text-green-400"
                                            >
                                                Completed
                                            </Typography>
                                        </div>
                                    </div>
                                    <Typography color={'black'}>
                                        {name}
                                    </Typography>
                                    <div className="flex items-center gap-x-2">
                                        <FaEnvelope />
                                        <Typography
                                            variant={'muted'}
                                            color={'gray'}
                                        >
                                            {email}
                                        </Typography>
                                    </div>
                                </a>
                            </Link>
                        </div>
                    </div>
                )
            },
        },
        // {
        //     header:() => 'Type',
        //     accessorKey: 'employmentType',
        //     cell: ({ row }) => {
        //         const { employmentType } = row.original
        //         switch (employmentType) {
        //             case 'fullTime':
        //                 return 'Full Time'

        //             case 'partTime':
        //                 return 'Part Time'

        //             default:
        //                 return 'Temporary'
        //         }
        //     },
        //     disableFilters: true,
        // },
        {
            header: () => 'Phone #',
            accessorKey: 'phone',
            cell: ({ row }: any) => {
                const { phone } = row.original
                return (
                    <div className="flex justify-center">
                        <Typography variant={'muted'} color={'gray'}>
                            {phone}
                        </Typography>
                    </div>
                )
            },
        },

        {
            header: () => 'Address',
            accessorKey: 'address',
            cell: ({ row }: any) => {
                const { address, city, state, zipCode } = row.original
                return (
                    <div className="flex justify-center">
                        <Typography color={'black'}>{address}</Typography>
                        <Typography color={'black'}>{state}</Typography>
                    </div>
                )
            },
        },
        {
            header: () => 'RTO Name',
            accessorKey: 'rto',
            cell({ row }: any) {
                const { rto } = row.original

                return (
                    <div className="flex justify-center">
                        <Typography variant="body" color={'black'}>
                            {rto.user.name}
                        </Typography>
                    </div>
                )
            },
        },
        {
            header: () => 'Progress',
            accessorKey: 'progress',
            cell: ({}) => {
                return (
                    <div className="flex justify-center">
                        <Typography variant="muted" color="text-blue-400">
                            Request
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
                    <TableAction options={tableActionOptions} rowItem={row} />
                )
            },
        },
    ]
    return (
        <div>
            {isError && <TechnicalError />}
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
                            title={'No Students'}
                            description={
                                'You have not approved any Student yet'
                            }
                            height={'50vh'}
                        />
                    )
                )}
            </Card>
        </div>
    )
}
