import React from 'react'
import { SubAdminApi } from '@queries'
import { MyWorkplaces } from './MyWorkplaces'
import { AllWorkplaces } from './AllWorkplaces'
import { TabNavigation, TabProps } from '@components'
import { PlacementStartedWorkplaces } from './PlacementStartedWorkplaces'

export const NeedWorkplaces = () => {
    const count = SubAdminApi.Workplace.count()

    const tabs: TabProps[] = [
        {
            label: 'Coordinator Not Assigned',
            href: {
                pathname: 'workplace',
                query: { tab: 'all', subTab: 'case-officer-not-assigned' },
            },
            badge: {
                text: count?.data?.all,
                loading: count?.isLoading,
            },
            element: <AllWorkplaces />,
        },
        {
            label: 'Agreement And Eligibilitys',
            href: {
                pathname: 'workplace',
                query: {
                    tab: 'all',
                    subTab: 'agreement',
                },
            },
            badge: {
                text: count?.data?.all,
                loading: count?.isLoading,
            },
            element: <MyWorkplaces />,
        },
        {
            label: 'Placement Started Workplaces',
            badge: {
                text: count?.data?.placementStarted,
                loading: count?.isLoading,
            },
            href: {
                pathname: 'workplace',
                query: { tab: 'all', subTab: 'placement' },
            },
            element: <PlacementStartedWorkplaces />,
        },
    ]
    return (
        <div>
            <TabNavigation tabs={tabs} subTab>
                {({ header, element }: any) => (
                    <div>
                        <div>{header}</div>
                        <div className="mt-3">{element}</div>
                    </div>
                )}
            </TabNavigation>
        </div>
    )
}
