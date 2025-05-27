import { TabNavigation, TabProps } from '@components'

import { BlackListIndustries } from './BlackListIndustries'
import { RtoWpApproval } from './RtoWpApproval'

export const RtoWpApprovalLists = () => {
    const tabs: TabProps[] = [
        {
            label: 'Wp Approval Request',
            href: {
                pathname: 'wp-approval-request',
                query: { tab: 'approval-list', page: 1, pageSize: 50 },
            },

            element: <RtoWpApproval />,
        },
        {
            label: 'Black List Industries',
            href: {
                pathname: 'wp-approval-request',
                query: { tab: 'black-list', page: 1, pageSize: 50 },
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
