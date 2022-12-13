import { ReactElement, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
//Layouts
import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout, Student } from '@types'

import { TabsView } from '@components/sections/rto'
//components
import {
    Card,
    Table,
    ReactTable,
    Typography,
    EmptyData,
    TechnicalError,
    LoadingAnimation,
    TableActionOption,
    TableAction,
} from '@components'
// queries
import { useGetAssessmentEvidenceQuery } from '@queries'
import { FaEnvelope, FaEye, FaPhoneSquareAlt } from 'react-icons/fa'
import Image from 'next/image'

type Props = {}

const AssessmentEvidence: NextPageWithLayout = (props: Props) => {
    const router = useRouter()

    const [itemPerPage, setItemPerPage] = useState(5)
    const [page, setPage] = useState(1)

    const { isLoading, isError, data } = useGetAssessmentEvidenceQuery({
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })

    const tableActionOptions: TableActionOption[] = [
        {
            text: 'View',
            onClick: (student: Student) => {
                const {
                    courses,
                    id,
                    user: { id: userId },
                } = student
                const course = courses[0]
                router.push(
                    `/portals/sub-admin/tasks/assessment-evidence/${id}/${userId}/${course.id}`
                )
            },
            Icon: FaEye,
        },
    ]

    const columns = [
        {
            header: () => 'Name',
            accessorKey: 'user',
            sort: true,
            cell: ({ row }: any) => {
                const {
                    courses,
                    id,
                    user: { id: userId, name, email, image },
                } = row.original
                const course = courses[0]

                return (
                    <div className="flex items-center relative">
                        <Link
                            href={`/portals/sub-admin/tasks/assessment-evidence/${id}/${userId}/${course.id}`}
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
            header: () => 'Course',
            accessorKey: 'course',
            cell: ({ row }: any) => {
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
            header: () => 'RTO Name',
            accessorKey: 'rto',
            cell: ({ row }: any) => {
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
            header: () => 'Result',
            accessorKey: 'studentCapacity',
            cell: ({ row }: any) => {
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
            {/* <ReactTable
                action={useGetAssessmentEvidenceQuery}
                Columns={Columns}
                querySort={'title'}
                pagination
                pagesize
            /> */}
            <Card noPadding>
                {isError && <TechnicalError />}
                {isLoading ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : data && data?.data.length ? (
                    <Table
                        columns={columns}
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
                            title={'No Pending RTO!'}
                            description={'You have no pending RTO request yet'}
                            height={'50vh'}
                        />
                    )
                )}
            </Card>
        </>
    )
}
AssessmentEvidence.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout
            pageTitle={{
                title: 'AssessmentEvidence',
                navigateBack: true,
                backTitle: 'Back',
            }}
        >
            {page}
        </SubAdminLayout>
    )
}

export default AssessmentEvidence
