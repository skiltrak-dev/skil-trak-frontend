import { ReactElement, useEffect } from 'react'

import { TabNavigation, TabProps } from '@components'
import { useContextBar, useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import {
    ApprovedIndustry,
    ArchivedIndustry,
    BlockedIndustry,
    PendingIndustry,
    RejectedIndustry,
} from '@partials/admin/industry'
import { AdminApi } from '@queries'

const RtoList: NextPageWithLayout = () => {
    const navBar = useNavbar()
    const contextBar = useContextBar()

    const { isLoading, data } = AdminApi.Industries.useCount()

    useEffect(() => {
        navBar.setTitle('Industries')
        contextBar.hide()
        // contextBar.setContent(<UserProfile />)
    }, [])

    const tabs: TabProps[] = [
        {
            label: 'Pending',
            href: { pathname: 'industry', query: { tab: 'pending' } },
            badge: {
                text: data?.pending,
                loading: isLoading,
            },
            element: <PendingIndustry />,
        },
        {
            label: 'Approved',
            href: { pathname: 'industry', query: { tab: 'approved' } },
            badge: {
                text: data?.approved,
                loading: isLoading,
            },
            element: <ApprovedIndustry />,
        },
        {
            label: 'Rejected',
            href: { pathname: 'industry', query: { tab: 'rejected' } },
            badge: {
                text: data?.rejected,
                loading: isLoading,
            },
            element: <RejectedIndustry />,
        },
        {
            label: 'Blocked',
            href: { pathname: 'industry', query: { tab: 'blocked' } },
            badge: {
                text: data?.blocked,
                loading: isLoading,
            },
            element: <BlockedIndustry />,
        },
        {
            label: 'Archived',
            href: { pathname: 'industry', query: { tab: 'archived' } },
            badge: {
                text: data?.archived,
                loading: isLoading,
            },
            element: <ArchivedIndustry />,
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
