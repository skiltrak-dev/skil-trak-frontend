import { ReactElement, useEffect } from 'react'
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
    Button,
    ReactTable,
    RtoContextBarData,
    SidebarCalendar,
    Typography,
    TableActionOption,
    TableAction,
} from '@components'
// queries
import { useGetSubAdminRtosQuery } from '@queries'
// icons
import { FaEnvelope, FaPhoneSquareAlt } from 'react-icons/fa'
import { useContextBar } from '@hooks'
import { useRouter } from 'next/router'

import { Rto } from '@types'

type Props = {}

const RTOs: NextPageWithLayout = (props: Props) => {
    const { setContent } = useContextBar()
    const router = useRouter()
    useEffect(() => {
        setContent(
            <>
                <Button variant={'dark'} text={'My Schedule'} />
                <SidebarCalendar />
                <RtoContextBarData />
            </>
        )
    }, [setContent])
    const { data, error, isLoading } = useGetSubAdminRtosQuery()

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
            Header: 'Name',
            accessor: 'user',
            sort: true,
            Cell: ({ row }: any) => {
                const {
                    phone,
                    user: { name, email, image },
                } = row.original
                // console.log('row', row.original)

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
            Header: 'Package',
            accessor: 'package',
            Cell: ({ row }: any) => {
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
            Header: 'Code',
            accessor: 'code',
            Cell: ({ row }: any) => {
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
            Header: 'Students',
            accessor: 'students',
            Cell: ({ row }: any) => {
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
            Header: 'Courses',
            accessor: 'courses',
            Cell: ({ row }: any) => {
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
            Header: 'Address',
            accessor: 'address',
            Cell: ({ row }: any) => {
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
            Header: 'Action',
            accessor: 'Action',
            Cell: ({ row }: any) => {
                return (
                    <TableAction options={tableActionOptions} rowItem={row} />
                )
            },
        },
    ]
    // console.log("useGetSubAdminRtosQuery", useGetSubAdminRtosQuery());

    return (
        <>
            <ReactTable
                action={useGetSubAdminRtosQuery}
                Columns={Columns}
                querySort={'title'}
                pagination
                pagesize
            />
        </>
    )
}
RTOs.getLayout = (page: ReactElement) => {
    return <SubAdminLayout title="RTOs">{page}</SubAdminLayout>
}

export default RTOs
