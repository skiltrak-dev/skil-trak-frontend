import { ReactElement, useEffect } from 'react'
// Layouts
import { RtoLayout } from '@layouts'
//Types
import { NextPageWithLayout } from '@types'
// components
import { Button, HelpQuestionSet, ReactTable, RtoContextBarData, SidebarCalendar, Typography } from '@components'
// Link
import Link from 'next/link'
import { useGetIndustriesListQuery } from '@queries'
import Image from 'next/image'
import { useContextBar } from '@hooks'    

type Props = {}

const RtoMoUs: NextPageWithLayout = (props: Props) => {
    const { setContent } = useContextBar()
    useEffect(() => {
        setContent(
            <>
                <Button variant={'dark'} text={'My Schedule'} />
                <SidebarCalendar />
                <RtoContextBarData />
            </>
        )
    }, [setContent])
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
            Header: 'Name',
            accessor: 'name',
            sort: true,
            Cell: ({ row }: any) => {
                const { businessName, imageUrl } = row.original

                return (
                    <Link
                        href={`/jobs/job-detail/${row.original.id}`}
                        className="flex items-center justify-center gap-x-2 relative "
                    >
                        <a className="flex items-center gap-x-4">
                            <div className="">
                            </div>
                            <div className="flex items-center justify-center gap-x-2">
                                <div className='flex items-center gap-x-2 '>
                                    <Image
                                        className="rounded-full w-7 h-7"
                                        src={'https://images.unsplash.com/photo-1664575602276-acd073f104c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'}
                                        alt={businessName}
                                        width={50}
                                        height={50}
                                    />
                                </div>
                                <Typography variant='subtitle' color={'black'}>
                                    {businessName}
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
            Cell: ({ row }: any) => {
                const {
                    user: { email },
                } = row.original
                return (
                    <div className="flex items-center justify-center">
                        <Typography color={'black'} variant={'muted'}>
                            {email}
                        </Typography>
                    </div>
                )
            },
        },
        {
            Header: 'Phone',
            accessor: 'phoneNumber',
            Cell: ({ row }: any) => {
                const { phoneNumber } = row.original
                return (
                    <div className="flex items-center justify-center">
                        <Typography color={'black'}>{phoneNumber}</Typography>
                    </div>
                )
            },
        },
        {
            Header: 'Contact Person',
            accessor: 'contactPerson',
            Cell: ({ row }: any) => {
                const { contactPerson } = row.original
                return (
                    <div className="flex items-center justify-center">
                        <Typography color={'black'}>{contactPerson}</Typography>
                    </div>
                )
            },
        },

        {
            Header: 'Action',
            accessor: 'Action',
            Cell: ({ }) => {
                return (
                    <>
                        <div className="flex justify-center">
                            <Button variant="info" text="Unselect" />
                        </div>
                    </>
                )
            },
        },
    ]
    return (
        <>
            <ReactTable
                action={useGetIndustriesListQuery}
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
RtoMoUs.getLayout = (page: ReactElement) => {
    return <RtoLayout title="MoUs">{page}</RtoLayout>
}

export default RtoMoUs
