import { useRouter } from 'next/router'

import { ReactElement } from 'react'

import { StudentLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { Card, ReactTable, Typography } from '@components'

import { useGetJobsQuery } from '@queries'
import Link from 'next/link'
import {
    NotesCard,
    ScheduleCard,
    StudentProfileCoursesCard,
} from '@components/sections/subAdmin/components'
import { TabNavigation, TabProps } from '@components/TabNavigation'
import { SettingCard } from '@components/sections/subAdmin/components/SettingCard'
import { FutureCandidates } from '@components/sections/industry/FutureCandidates'

type Props = {}

const Testing: NextPageWithLayout = (props: Props) => {
    const router = useRouter()
    const TableActionOption = (row: any) => {
        const actions = [
            {
                text: 'View',
                action: () => {},
                color: '',
            },
            {
                text: 'Edit',
                action: () => {},
                color: '',
            },
            {
                text: 'Delete',
                action: () => {},
                color: '',
            },
        ]
        return actions
    }

    const Columns = [
        {
            Header: 'Job Title',
            accessor: 'title',
            sort: true,
            Cell: ({ row }: any) => {
                const { title, industry } = row.original
                return (
                    <Link href={`/jobs/job-detail/${row.original.id}`}>
                        <a className="flex items-center gap-x-2 relative">
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
            Header: 'Type',
            accessor: 'employmentType',
            Cell: ({ row }) => {
                const { employmentType } = row.original
                switch (employmentType) {
                    case 'fullTime':
                        return 'Full Time'

                    case 'partTime':
                        return 'Part Time'

                    default:
                        return 'Temporary'
                }
            },
            disableFilters: true,
        },
        {
            Header: 'Phone',
            accessor: 'phone',
        },
        {
            Header: 'Status',
            accessor: 'isActive',
            disableFilters: true,
            Cell: ({ row }) => {
                const { isActive } = row.original
                return isActive ? 'Approved' : 'Pending'
            },
        },
        {
            Header: 'Action',
            accessor: 'Action',
            Cell: ({ row }) => {
                const action = TableActionOption(row.original)
                return 'Action'
            },
        },
    ]

    const tabs: TabProps[] = [
        {
            label: 'Pending',
            href: { pathname: 'testing', query: { tab: 'pending' } },
            badge: { text: '05', color: 'text-blue-500' },
            element: <div>Pending RTOs</div>,
        },
        {
            label: 'Approved',
            href: { pathname: 'testing', query: { tab: 'approved' } },
            badge: { text: '99+', color: 'text-error-500' },
            element: <div>Approved RTOs</div>,
        },
        {
            label: 'Rejected',
            href: { pathname: 'testing', query: { tab: 'rejected' } },
            element: <div>Rejected RTOs</div>,
        },
        {
            label: 'Blocked',
            href: { pathname: 'testing', query: { tab: 'blocked' } },
            element: <div>Blocked RTOs</div>,
        },
        {
            label: 'Archived',
            href: { pathname: 'testing', query: { tab: 'archived' } },
            element: <div>Archived RTOs</div>,
        },
    ]
    return (
        <div className="flex flex-col gap-y-3">
            <FutureCandidates />
            <SettingCard />
            <Card>
                <div className="flex flex-col gap-y-2">
                    {[
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday',
                        'Saturday',
                        'Sunday',
                    ].map((day, i) => (
                        <ScheduleCard key={day} day={day} />
                    ))}
                </div>
            </Card>
            <Card>
                <StudentProfileCoursesCard />
            </Card>
            <Card>
                <TabNavigation tabs={tabs}>
                    {({ header, element }: any) => {
                        return (
                            <div>
                                <div>{header}</div>
                                <div>{element}</div>
                            </div>
                        )
                    }}
                </TabNavigation>
            </Card>
            <Card>
                <div className="flex flex-col gap-y-3 my-2">
                    <NotesCard />
                    <div className="flex items-center justify-between gap-x-2">
                        <NotesCard pinnedNote />
                        <NotesCard pinnedNote />
                        <NotesCard pinnedNote />
                    </div>
                </div>
            </Card>
            <ReactTable
                action={useGetJobsQuery}
                Columns={Columns}
                querySort={'title'}
                pagination
                pagesize
            />
        </div>
    )
}
Testing.getLayout = (page: ReactElement) => {
    return <StudentLayout title="Workplace">{page}</StudentLayout>
}

export default Testing
