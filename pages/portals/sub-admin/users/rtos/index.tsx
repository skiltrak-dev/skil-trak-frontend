import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

// Link
import Link from 'next/link'
// image
import Image from 'next/image'
//Layouts
import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { TabsView } from '@components/sections/rto'
import { FaEdit, FaEye, FaFileExport, FaFilter } from 'react-icons/fa'

//components
import {
    Card,
    Table,
    Button,
    EmptyData,
    Typography,
    TableAction,
    TechnicalError,
    SidebarCalendar,
    LoadingAnimation,
    TableActionOption,
    RtoContextBarData,
} from '@components'
// queries
import { useGetSubAdminRtosQuery } from '@queries'
// icons
import { FaEnvelope, FaPhoneSquareAlt } from 'react-icons/fa'
import { useContextBar } from '@hooks'

import { Rto } from '@types'

const RTOs: NextPageWithLayout = () => {
    const { setContent } = useContextBar()
    const router = useRouter()
    const [filterAction, setFilterAction] = useState(null)
    const [itemPerPage, setItemPerPage] = useState(5)
    const [page, setPage] = useState(1)
    const [filter, setFilter] = useState({})
    const { isLoading, data, isError } = useGetSubAdminRtosQuery({
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })
    useEffect(() => {
        setContent(
            <>
                <Button variant={'dark'} text={'My Schedule'} />
                <SidebarCalendar />
                <RtoContextBarData />
            </>
        )
    }, [setContent])

    const tableActionOptions: TableActionOption[] = [
        {
            text: 'View',
            onClick: (rto: Rto) => {
                router.push(`/portals/sub-admin/users/rtos/${rto.id}`)
            },
            Icon: FaEye,
        },
    ]

    const Columns = [
        {
            header: () => 'Name',
            accessorKey: 'user',
            sort: true,
            cell: ({ row }: any) => {
                const {
                    phone,
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
                                href={`/portals/sub-admin/users/rtos/${row.original.id}?tab=overview`}
                            >
                                <a>
                                    <Typography color={'black'}>
                                        {' '}
                                        {name} {/* name */}
                                    </Typography>
                                    <div className="flex items-center gap-x-2">
                                        <FaPhoneSquareAlt className="text-gray" />
                                        <Typography variant={'muted'}>
                                            {phone}
                                        </Typography>
                                    </div>
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
        {
            header: () => 'Package',
            accessorKey: 'package',
            cell: ({ row }: any) => {
                // const {package}:any = row.original
                return (
                    <div className="flex justify-center">
                        <Typography variant={'muted'} color={'gray'}>
                            {row?.original?.package?.name}
                        </Typography>
                    </div>
                )
            },
        },
        {
            header: () => 'Code',
            accessorKey: 'code',
            cell: ({ row }: any) => {
                const { rtoCode } = row.original
                return (
                    <div className="flex justify-center">
                        <Typography variant={'muted'} color={'gray'}>
                            {rtoCode}
                        </Typography>
                    </div>
                )
            },
        },
        {
            header: () => 'Students',
            accessorKey: 'students',
            cell: ({ row }: any) => {
                const { students } = row.original
                return (
                    <div className="flex justify-center">
                        <Typography variant={'muted'} color={'gray'}>
                            150
                        </Typography>
                    </div>
                )
            },
        },
        {
            header: () => 'Courses',
            accessorKey: 'courses',
            cell: ({ row }: any) => {
                return (
                    <div className="flex justify-center">
                        <Typography variant={'muted'} color="text-blue-400">
                            View
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
                    <div>
                        <Typography color={'black'}>{address}</Typography>
                        <Typography color={'black'}>{state}</Typography>
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
        <>
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
RTOs.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout pageTitle={{ title: 'RTOs', backTitle: 'Users' }}>
            {page}
        </SubAdminLayout>
    )
}

export default RTOs
