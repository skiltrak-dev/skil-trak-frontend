import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

// Icons
import { FaEnvelope, FaEye } from 'react-icons/fa'

// components
import {
    Card,
    EmptyData,
    InitialAvatar,
    LoadingAnimation,
    PlacementTableCell,
    Table,
    TableAction,
    TableActionOption,
    Typography,
} from '@components'

import { TechnicalError } from '@components/ActionAnimations/TechnicalError'
import { useGetSubAdminStudentsQuery } from '@queries'
import { Student } from '@types'
import { useState } from 'react'

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
                    studentId,
                    user: { name, email, avatar },
                } = row.original

                return (
                    <div className="flex items-center relative">
                        <div className="flex items-center gap-x-2">
                            <div>
                                {avatar ? (
                                    <Image
                                        className="rounded-full w-7 h-7"
                                        src={avatar}
                                        alt={''}
                                        width={50}
                                        height={50}
                                    />
                                ) : (
                                    <InitialAvatar name={name} />
                                )}
                            </div>

                            <Link
                                href={`/portals/sub-admin/users/students/${row.original.id}?tab=overview`}
                            >
                                <a>
                                    <div className="flex items-center gap-x-2">
                                        <p className={'text-xs text-gray-500'}>
                                            {studentId}
                                        </p>
                                        {/* <div className="flex items-center gap-x-2 ">
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
                                        </div> */}
                                    </div>
                                    <p className="text-gray-800 font-medium">
                                        {name}
                                    </p>
                                    <div className="flex items-center gap-x-2 text-sm">
                                        <span className="text-gray-400">
                                            <FaEnvelope />
                                        </span>
                                        <p className="text-gray-500">{email}</p>
                                    </div>
                                </a>
                            </Link>
                        </div>
                    </div>
                )
            },
        },
        {
            header: () => 'Phone #',
            accessorKey: 'phone',
            cell: ({ row }: any) => {
                const { phone } = row.original
                return <p className="text-sm">{phone}</p>
            },
        },

        {
            header: () => 'Address',
            accessorKey: 'address',
            cell: ({ row }: any) => {
                const { state, suburb } = row.original
                return (
                    <p className="text-sm">
                        {suburb}, {state}
                    </p>
                )
            },
        },
        {
            header: () => 'RTO Name',
            accessorKey: 'rto',
            cell({ row }: any) {
                const { rto } = row.original

                return (
                    <div className="flex gap-x-2 items-center">
                        <InitialAvatar name={rto.user.name} small />
                        {rto.user.name}
                    </div>
                )
            },
        },
        {
            header: () => 'Progress',
            accessorKey: 'progress',
            cell: ({ row }: any) => {
                return (
                    <div className="flex justify-center">
                        <PlacementTableCell request={row.original.workplace}/>
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
