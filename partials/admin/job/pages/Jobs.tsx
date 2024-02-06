import { TabNavigation, TabProps } from '@components'

import { useContextBar } from '@hooks'
import { useEffect } from 'react'
import { ActiveJobs } from './ActiveJobs'
import { ExpiredJobs } from './ExpiredJobs'

export const Jobs = () => {
    const contextBar = useContextBar()

    useEffect(() => {
        contextBar.hide()
    }, [])

    const tabs: TabProps[] = [
        {
            label: 'Active Jobs',
            href: { pathname: 'jobs', query: { tab: 'active' } },

            element: <ActiveJobs />,
        },
        {
            label: 'Expired Jobs',
            href: { pathname: 'jobs', query: { tab: 'expired' } },
            element: <ExpiredJobs />,
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
