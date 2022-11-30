import { ReactElement } from 'react'
import Link from 'next/link'
//Layouts
import { RtoLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { TabsView } from '@components/sections/rto'
//components
import { ReactTable, Typography, TabProps, TabNavigation } from '@components'
import { FaEnvelope, FaPhoneSquareAlt } from 'react-icons/fa'
import Image from 'next/image'
import {
    ApprovedStudent,
    PendingStudent,
    RejectedStudent,
    BlockedStudent,
    ArchivedStudent,
} from '@partials/rto/student'

type Props = {}

const RtoStudents: NextPageWithLayout = (props: Props) => {
    const tabs: TabProps[] = [
        {
            label: 'Pending',
            href: { pathname: 'students', query: { tab: 'pending' } },
            element: <PendingStudent />,
        },
        {
            label: 'Approved',
            href: { pathname: 'students', query: { tab: 'approved' } },
            element: <ApprovedStudent />,
        },
        {
            label: 'Rejected',
            href: { pathname: 'students', query: { tab: 'rejected' } },
            element: <RejectedStudent />,
        },
        {
            label: 'Blocked',
            href: { pathname: 'students', query: { tab: 'blocked' } },
            element: <BlockedStudent />,
        },
        {
            label: 'Archived',
            href: { pathname: 'students', query: { tab: 'archived' } },
            element: <ArchivedStudent />,
        },
    ]
    const Columns = [
        {
            Header: 'Name',
            accessor: 'user',
            sort: true,
            Cell: ({ row }: any) => {
                const {
                    zipCode,
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
                            <Link href={`/rto/profile/${row.original.id}`}>
                                <div>
                                    <div className="flex items-center gap-x-2">
                                        <Typography variant={'muted'}>
                                            {zipCode}
                                        </Typography>
                                    </div>
                                    <Typography color={'black'}>
                                        {' '}
                                        {name}{' '}
                                    </Typography>
                                    <div className="flex items-center gap-x-2">
                                        <Typography
                                            variant={'muted'}
                                            color={'gray'}
                                        >
                                            {email}
                                        </Typography>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                )
            },
        },
        // {
        //     Header: 'Type',
        //     accessor: 'employmentType',
        //     Cell: ({ row }) => {
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
            Header: 'Phone',
            accessor: 'phone',
        },
        {
            Header: 'Address',
            accessor: 'address',
            Cell: ({ row }: any) => {
                const { address, city, state, zipCode } = row.original
                return (
                    <div>
                        <Typography color={'black'}>{address}</Typography>
                        <Typography color={'black'}>
                            {city} {state}, {zipCode}
                        </Typography>
                    </div>
                )
            },
        },
        // {
        //     Header: 'Status',
        //     accessor: 'isActive',
        //     disableFilters: true,
        //     Cell: ({ row }) => {
        //         const { isActive } = row.original
        //         return isActive ? 'Approved' : 'Pending'
        //     },
        // },
        {
            Header: 'Sectors',
            accessor: 'sectors',
            Cell: ({}: any) => {
                return (
                    <div className="flex justify-center">
                        <Typography variant="muted" color="text-blue-400">
                            View
                        </Typography>
                    </div>
                )
            },
        },
        {
            Header: 'Progress',
            accessor: 'progress',
            Cell: ({}) => {
                return (
                    <div className="flex justify-center">
                        <Typography variant="muted" color="text-[#BADC58]">
                            Placement Started
                        </Typography>
                    </div>
                )
            },
        },
        {
            Header: 'Action',
            accessor: 'Action',
            Cell: ({}) => {
                return (
                    <div className="flex justify-center">
                        <Typography variant="muted" color="text-blue-400">
                            More
                        </Typography>
                    </div>
                )
            },
        },
    ]
    // console.log("useGetStudentsQuery", useGetStudentsQuery());

    return (
        <>
            <div>
                <TabNavigation tabs={tabs}>
                    {({ header, element }: any) => {
                        return (
                            <div>
                                <div>{header}</div>
                                <div className="p-4">{element}</div>
                            </div>
                        )
                    }}
                </TabNavigation>
            </div>
        </>
    )
}
RtoStudents.getLayout = (page: ReactElement) => {
    return <RtoLayout title="Students">{page}</RtoLayout>
}

export default RtoStudents
