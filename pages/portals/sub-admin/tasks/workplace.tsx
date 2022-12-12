import { ReactElement } from 'react'

import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { TabNavigation, TabProps } from '@components'

// query
import { useGetSubAdminWorkplacesQuery } from '@queries'

// components
import {
    MyWorkplaces,
    AllWorkplaces,
    CancelledWorkplaces,
    StudentAddedWorkplaces,
} from '@partials/sub-admin'

type Props = {}

const Workplace: NextPageWithLayout = (props: Props) => {
    const tabs: TabProps[] = [
        {
            label: 'All Requests',
            href: { pathname: 'workplace', query: { tab: 'all' } },
            element: <AllWorkplaces />,
        },
        {
            label: 'My Requests',
            href: { pathname: 'workplace', query: { tab: 'my-workplaces' } },
            element: <MyWorkplaces />,
        },
        {
            label: 'Student Provided Requests',
            href: { pathname: 'workplace', query: { tab: 'student-added' } },
            element: <StudentAddedWorkplaces />,
        },
        {
            label: 'Cancelled Requests',
            href: { pathname: 'workplace', query: { tab: 'cancelled' } },
            element: <CancelledWorkplaces />,
        },
        {
            label: 'No Industries Available Requests',
            href: { pathname: 'workplace', query: { tab: 'cancelled' } },
            element: 'Under Construction',
        },
    ]

    return (
        <>
            <div>
                <TabNavigation tabs={tabs}>
                    {({ header, element }: any) => {
                        return (
                            <div>
                                <div>{header}</div>
                                <div className="mt-3">{element}</div>
                            </div>
                        )
                    }}
                </TabNavigation>
            </div>
        </>
    )
}
Workplace.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout pageTitle={{ title: 'Workplace' }}>
            {page}
        </SubAdminLayout>
    )
}

export default Workplace
