import { ReactElement } from 'react'

import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { AllWorkplaces } from '@components/sections'
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

type Props = {}

const Workplace: NextPageWithLayout = (props: Props) => {
    const tabs: TabProps[] = [
        {
            label: 'All',
            href: { pathname: 'workplace', query: { tab: 'all' } },
            element: <AllWorkplaces />,
        },
        {
            label: 'Added By Students',
            href: { pathname: 'workplace', query: { tab: 'student-added' } },
            element: <AllWorkplaces />,
        },
        {
            label: 'My Workplaces',
            href: { pathname: 'workplace', query: { tab: 'my-workplaces' } },
            element: <AllWorkplaces />,
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
  return <SubAdminLayout pageTitle={{ title: "Workplace" }}>{page}</SubAdminLayout>
}

export default Workplace
