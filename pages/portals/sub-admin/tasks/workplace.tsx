import { ReactElement } from 'react'

import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { TabNavigation, TabProps } from '@components'

// query
import { useGetSubAdminWorkplacesQuery } from '@queries'

// components
import {
    Button,
    LoadingAnimation,
    TechnicalError,
    EmptyData,
} from '@components'
import {
    MyWorkplaces,
    AllWorkplaces,
    StudentAddedWorkplaces,
} from '@components/sections/subAdmin'

type Props = {}

const Workplace: NextPageWithLayout = (props: Props) => {
    const tabs: TabProps[] = [
        {
            label: 'All Requests',
            href: { pathname: 'workplace', query: { tab: 'all' } },
            element: <AllWorkplaces />,
        },
        {
            label: 'Workplace Provided Requests',
            href: { pathname: 'workplace', query: { tab: 'student-added' } },
            element: <StudentAddedWorkplaces />,
        },
        {
            label: 'My Requests',
            href: { pathname: 'workplace', query: { tab: 'my-workplaces' } },
            element: <MyWorkplaces />,
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
