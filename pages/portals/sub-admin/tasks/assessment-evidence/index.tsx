import { ReactElement } from 'react'
import Link from 'next/link'
//Layouts
import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { TabsView } from '@components/sections/rto'
//components
import { ReactTable, Typography } from '@components'
// queries
import { useGetAssessmentEvidenceQuery } from '@queries'
import { FaEnvelope, FaPhoneSquareAlt } from 'react-icons/fa'
import Image from 'next/image'

type Props = {}

const AssessmentEvidence: NextPageWithLayout = (props: Props) => {
    const Columns = [
        {
            Header: 'Name',
            accessor: 'user',
            sort: true,
            Cell: ({ row }: any) => {
                const {
                    courses,
                    id,
                    user: { name, email, image },
                } = row.original
                const course = courses[0]
                console.log('row', row.original)

                return (
                    <div className="flex items-center relative">
                        <Link
                            href={`/portals/sub-admin/tasks/assessment-evidence/${id}/${course.id}`}
                        >
                            <a>
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
                                    <div>
                                        <Typography
                                            variant={'small'}
                                            color={'text-gray-800'}
                                        >
                                            {id}
                                        </Typography>
                                        <Typography variant={'label'}>
                                            {name}
                                        </Typography>
                                        <Typography
                                            variant={'small'}
                                            color={'text-gray-500'}
                                        >
                                            {email}
                                        </Typography>
                                    </div>
                                </div>
                            </a>
                        </Link>
                    </div>
                )
            },
        },
        {
            Header: 'Course',
            accessor: 'course',
            Cell: ({ row }: any) => {
                const { courses } = row.original
                const course = courses[0]
                return (
                    <div className="flex flex-col justify-center">
                        <Typography variant={'small'} color={'text-gray-500'}>
                            {course?.sector?.name}
                        </Typography>
                        <Typography variant={'label'}>
                            {course?.title}
                        </Typography>
                    </div>
                )
            },
        },
        {
            Header: 'RTO Name',
            accessor: 'rto',
            Cell: ({ row }: any) => {
                const {
                    rto: {
                        user: { name },
                    },
                } = row.original
                return (
                    <div className="flex justify-center gap-x-2">
                        <Typography variant={'label'}>{name}</Typography>
                    </div>
                )
            },
        },
        {
            Header: 'Result',
            accessor: 'studentCapacity',
            Cell: ({ row }: any) => {
                const { studentCapacity } = row.original
                return (
                    <div className="flex justify-center">
                        <Typography variant={'muted'} color={'gray'}>
                            {studentCapacity}
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

    return (
        <>
            <ReactTable
                action={useGetAssessmentEvidenceQuery}
                Columns={Columns}
                querySort={'title'}
                pagination
                pagesize
            />
        </>
    )
}
AssessmentEvidence.getLayout = (page: ReactElement) => {
    return <SubAdminLayout title="AssessmentEvidence">{page}</SubAdminLayout>
}

export default AssessmentEvidence
