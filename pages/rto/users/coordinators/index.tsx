import { ReactElement } from 'react'
// Layouts
import { RtoLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
//components
import { HelpQuestionSet, ReactTable, Typography } from '@components'
// queries
import { useGetStudentsQuery } from '@queries'
// Link
import Link from 'next/link'
// React icons
import { FaEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'

type Props = {}

const RtoCoordinators: NextPageWithLayout = (props: Props) => {
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
        },
        {
            Header: 'Phone',
            accessor: 'phone',
        },

        {
            Header: 'Action',
            accessor: 'Action',
            Cell: ({  }) => {
                return (
                    <>
                        <div className="flex justify-center items-center gap-x-2">
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
RtoCoordinators.getLayout = (page: ReactElement) => {
    return <RtoLayout title="Coordinators">{page}</RtoLayout>
}

export default RtoCoordinators
