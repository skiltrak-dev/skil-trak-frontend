import { ReactElement, useEffect } from 'react'

import { TabNavigation, TabProps } from '@components'
import { useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import {
    ApprovedRto,
    ArchivedRto,
    BlockedRto,
    PendingRto,
    RejectedRto,
} from '@partials'
import { AdminApi } from '@queries'
import { NextPageWithLayout } from '@types'

const RtoList: NextPageWithLayout = () => {
    const navBar = useNavbar()

    const { isLoading, data } = AdminApi.Rtos.useCountQuery()

    useEffect(() => {
        navBar.setTitle('RTO')
    }, [])

    const tabs: TabProps[] = [
        {
            label: 'Pending',
            href: { pathname: 'rto', query: { tab: 'pending' } },
            badge: {
                text: data?.pending,
                loading: isLoading,
            },
            element: <PendingRto />,
        },
        {
            label: 'Approved',
            href: { pathname: 'rto', query: { tab: 'approved' } },
            badge: {
                text: data?.approved,
                loading: isLoading,
            },
            element: <ApprovedRto />,
        },
        {
            label: 'Rejected',
            href: { pathname: 'rto', query: { tab: 'rejected' } },
            badge: {
                text: data?.rejected,
                loading: isLoading,
            },
            element: <RejectedRto />,
        },
        {
            label: 'Blocked',
            href: { pathname: 'rto', query: { tab: 'blocked' } },
            badge: {
                text: data?.blocked,
                loading: isLoading,
            },
            element: <BlockedRto />,
        },
        {
            label: 'Archived',
            href: { pathname: 'rto', query: { tab: 'archived' } },
            badge: {
                text: data?.archived,
                loading: isLoading,
            },
            element: <ArchivedRto />,
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

RtoList.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default RtoList
