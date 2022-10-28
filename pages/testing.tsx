import { useRouter } from 'next/router'

import { ReactElement } from 'react'

import { StudentLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { ReactTable, Typography } from '@components'

import { useGetJobsQuery } from '@queries'
import Link from 'next/link'

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
    return (
        <>
            <ReactTable
                action={useGetJobsQuery}
                Columns={Columns}
                querySort={'title'}
                pagination
                pagesize
            />
        </>
    )
}
Testing.getLayout = (page: ReactElement) => {
    return <StudentLayout title="Workplace">{page}</StudentLayout>
}

export default Testing
