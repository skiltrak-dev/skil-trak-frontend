import { ReactElement } from 'react'

import { RtoLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { HelpQuestionSet, ReactTable, Typography } from '@components'
import { useGetStudentsQuery } from '@queries'
import Link from 'next/link'
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

type Props = {}

const RtoAdmins: NextPageWithLayout = (props: Props) => {
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
    const Columns = [
        {
            Header: 'Job Title',
            accessor: 'title',
            sort: true,
            Cell: ({ row }:any) => {
                const { title, industry } = row.original
                return (
                    <Link
                        href={`/jobs/job-detail/${row.original.id}`}
                        className="flex items-center gap-x-2 relative"
                    >
                        <a>
                            {' '}
                            <div className="absolute top-1">
                                {/* <SimpleCheckbox /> */}
                            </div>
                            <div>
                                <Typography color={'black'}>
                                    {' '}
                                    {title}{' '}
                                </Typography>
                                <Typography variant={'muted'} color={'gray'}>
                                    {industry?.user?.name}
                                </Typography>
                            </div>
                        </a>
                    </Link>
                )
            },
        },
        {
            Header: 'Email',
            accessor: 'email',
            Cell: ({ row }:any) => {
                const { email } = row.original
                return (
                    <div className='flex items-center justify-center'>
                        <Typography color={'black'} variant={'tableCell'}>
                            {email}
                        </Typography>
                    </div>
                )
            },
        },
        {
            Header: 'Phone',
            accessor: 'phone',
            Cell: ({ row }:any) => {
                const { phone } = row.original
                return (
                    <div className="flex items-center justify-center">
                        <Typography variant={'tableCell'}>{phone}</Typography>
                    </div>
                )
            },
        },

        {
            Header: 'Action',
            accessor: 'Action',
            Cell: ({  }) => {
                return (
                    <>
                        <div className="flex justify-center items-center gap-x-4">
                            <FaEdit className="text-[#686DE0] cursor-pointer" />
                            <MdDelete className="text-red-400 cursor-pointer" />
                        </div>
                    </>
                )
            },
        },
    ]
    return (
        <>
            <ReactTable
                action={useGetStudentsQuery}
                Columns={Columns}
                querySort={'title'}
                pagination
                pagesize
            />
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
RtoAdmins.getLayout = (page: ReactElement) => {
    return <RtoLayout title="Admins">{page}</RtoLayout>
}

export default RtoAdmins
