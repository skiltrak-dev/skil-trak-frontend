import { ReactElement, useState } from 'react'
// Layouts
import { RtoLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
//components
import {
    Card,
    HelpQuestionSet,
    ReactTable,
    TableAction,
    Table,
    EmptyData,
    TechnicalError,
    LoadingAnimation,
} from '@components'
// Links
import Link from 'next/link'
// Queries
import { useGetRTOWorkplacesQuery } from '@queries'
// Next Image
import Image from 'next/image'
import { AnyObject } from 'yup/lib/object'
import { ColumnDef } from '@tanstack/react-table'
import { IndustryCell } from '@partials/admin/industry/components'
import { useRouter } from 'next/router'
import { MdEmail, MdPhoneIphone } from 'react-icons/md'
import { StudentCellInfo } from '@partials/rto/student/components'

type Props = {}

const RtoWorkplaces: NextPageWithLayout = (props: Props) => {
    const router = useRouter()
    const [itemPerPage, setItemPerPage] = useState(50)
    const [page, setPage] = useState(1)
    const { isLoading, data, isError } = useGetRTOWorkplacesQuery({
        skip: itemPerPage * page - itemPerPage,
        limit: itemPerPage,
    })
    const RelatedQuestions = [
        {
            text: `I have a workplace. What next?`,
            link: '#',
        },
        {
            text: `I don't have a workplace. What should I do?`,
            link: '#',
        },
        {
            text: `I want to book an appointment`,
            link: '#',
        },
        {
            text: `I want to look for a job`,
            link: '#',
        },
    ]

    const OtherQuestions = [
        {
            text: `I have a workplace. What next?`,
            link: '#',
        },
        {
            text: `I don't have a workplace. What should I do?`,
            link: '#',
        },
        {
            text: `I want to book an appointment`,
            link: '#',
        },
        {
            text: `I want to look for a job`,
            link: '#',
        },
    ]
    const columns: ColumnDef<any>[] = [
        {
            header: () => 'Name',
            accessorKey: 'name',
            cell: ({ row }: any) => {
                const {
                    industry: {
                        phoneNumber,
                        user: { name, email, avatar },
                    },
                } = row.original

                return (
                    <Link
                        legacyBehavior
                        href={`/portals/rto/industries/workplaces/${row?.original?.id}`}
                    >
                        <a className="flex items-center gap-x-2">
                            <div className="shadow-inner-image rounded-full relative">
                                <img
                                    src={
                                        avatar ||
                                        `https://picsum.photos/64/${
                                            64 + row.original.id
                                        }`
                                    }
                                    className="w-10 h-10 rounded-full"
                                />
                            </div>
                            <div>
                                <p className="font-semibold">{name}</p>
                                <div className="font-medium text-xs text-gray-500">
                                    <p className="flex items-center gap-x-1">
                                        <span>
                                            <MdEmail />
                                        </span>
                                        {email}
                                    </p>
                                    <p className="flex items-center gap-x-1">
                                        <span>
                                            <MdPhoneIphone />
                                        </span>
                                        {phoneNumber}
                                    </p>
                                </div>
                            </div>
                        </a>
                    </Link>
                )
            },
        },
        {
            header: () => 'Abn',
            accessorKey: 'industry.abn',
        },
        {
            header: () => 'Student',
            accessorKey: 'workplaceRequest.student.user.name',
            cell: ({ row }: any) => (
                <StudentCellInfo
                    student={row.original?.workplaceRequest?.student}
                />
            ),
        },
        {
            header: () => 'Address',
            accessorKey: 'industry.abn',
            cell: ({ row }) => {
                const { addressLine1, addressLine2 } = row.original.industry
                return `${addressLine1} ${addressLine2}`
            },
        },
        {
            header: () => 'Action',
            accessorKey: 'Action',
            cell: ({ row }: any) => {
                return (
                    <TableAction
                        rowItem={row.original}
                        options={[
                            {
                                text: 'View',
                                onClick: () => {
                                    router.push(
                                        `/portals/rto/industries/workplaces/${row.original.id}`
                                    )
                                },
                                Icon: '',
                            },
                        ]}
                    />
                )
            },
        },
    ]
    return (
        <>
            {/* TODO Workplace list is not getting */}
            <Card noPadding>
                {isError && <TechnicalError />}
                {isLoading ? (
                    <LoadingAnimation height="h-[60vh]" />
                ) : data && data?.data?.length ? (
                    <Table<any>
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
                            title={'No Workplaces!'}
                            description={
                                'it seems that there is no workplace request'
                            }
                            height={'50vh'}
                        />
                    )
                )}
            </Card>
            <div className="mt-6 flex justify-between">
                {/* Related Questions */}
                <HelpQuestionSet
                    title={'What you want to do here?'}
                    questions={RelatedQuestions}
                />

                {/* Other Questions */}
                <HelpQuestionSet
                    title={'What else you want to do?'}
                    questions={OtherQuestions}
                />
            </div>
        </>
    )
}
RtoWorkplaces.getLayout = (page: ReactElement) => {
    return (
        <RtoLayout
            pageTitle={{
                title: 'Workplaces',
            }}
        >
            {page}
        </RtoLayout>
    )
}

export default RtoWorkplaces
