import { ReactElement } from 'react'

import { TabNavigation, TabProps } from '@components'
import { FavoriteJobs, JobContainer } from '@components/sections'
import { StudentLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

type Props = {}

const Jobs: NextPageWithLayout = (props: Props) => {
    const tabs: TabProps[] = [
        {
            label: 'All Jobs',
            href: {
                pathname: 'jobs',
                query: { tab: 'jobs' },
            },

            element: <JobContainer />,
        },
        {
            label: 'Favorite Jobs',
            href: {
                pathname: 'jobs',
                query: { tab: 'favorite', page: 1, pageSize: 50 },
            },

            element: <FavoriteJobs />,
        },
    ]
    return (
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
    )
}
Jobs.getLayout = (page: ReactElement) => {
    return <StudentLayout pageTitle={{ title: 'Jobs' }}>{page}</StudentLayout>
}

export default Jobs
