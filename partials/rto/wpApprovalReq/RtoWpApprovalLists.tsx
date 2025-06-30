import { TabNavigation, TabProps } from '@components'

import { BlackListIndustries } from './BlackListIndustries'
import { RtoWpApproval } from './RtoWpApproval'
import { RtoApi } from '@queries'

export const RtoWpApprovalLists = () => {
    const count = RtoApi.Workplace.wpApprovalRequestCount()

    const tabs: TabProps[] = [
        {
            label: 'Wp Approval Request',
            href: {
                pathname: 'wp-approval-request',
                query: { tab: 'approval-list', page: 1, pageSize: 50 },
            },
            badge: {
                text: count?.data?.pendingRequests,
                loading: count.isLoading,
            },
            element: <RtoWpApproval />,
        },
        {
            label: 'Blacklist Industries',
            href: {
                pathname: 'wp-approval-request',
                query: { tab: 'black-list', page: 1, pageSize: 50 },
            },
            badge: {
                text: count?.data?.blacklistedIndustries,
                loading: count.isLoading,
            },
            element: <BlackListIndustries />,
        },
    ]

    return (
        <>
            <div className="flex flex-col gap-y-4 mb-32">
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
        </>
    )
}
