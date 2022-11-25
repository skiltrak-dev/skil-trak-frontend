import { ReactElement, useEffect } from 'react'

import { TabNavigation, TabProps, Button } from '@components'
import { useContextBar, useNavbar } from '@hooks'
import { AdminLayout } from '@layouts'
import {
    ApprovedSubAdmin,
    ArchivedSubAdmin,
    BlockedSubAdmin,
    PendingSubAdmin,
    RejectedSubAdmin,
} from '@partials/admin/sub-admin'
import { AdminApi } from '@queries'
import { NextPageWithLayout } from '@types'
import { useRouter } from 'next/router'

const SubAdminList: NextPageWithLayout = () => {
    const router = useRouter()
    const navBar = useNavbar()
    const contextBar = useContextBar()

    const { isLoading, data } = AdminApi.SubAdmins.useCountQuery()
    console.log('count sub admins', data)

    useEffect(() => {
        navBar.setTitle('Sub-Admins')
        contextBar.hide()
    }, [])

    const tabs: TabProps[] = [
        {
            label: 'Pending',
            href: { pathname: 'sub-admin', query: { tab: 'pending' } },
            badge: {
                text: data?.pending,
                loading: isLoading,
            },
            element: <PendingSubAdmin />,
        },
        {
            label: 'Approved',
            href: { pathname: 'sub-admin', query: { tab: 'approved' } },
            badge: {
                text: data?.approved,
                loading: isLoading,
            },
            element: <ApprovedSubAdmin />,
        },
        {
            label: 'Rejected',
            href: { pathname: 'sub-admin', query: { tab: 'rejected' } },
            badge: {
                text: data?.rejected,
                loading: isLoading,
            },
            element: <RejectedSubAdmin />,
        },
        {
            label: 'Blocked',
            href: { pathname: 'sub-admin', query: { tab: 'blocked' } },
            badge: {
                text: data?.blocked,
                loading: isLoading,
            },
            element: <BlockedSubAdmin />,
        },
        {
            label: 'Archived',
            href: { pathname: 'sub-admin', query: { tab: 'archived' } },
            badge: {
                text: data?.archived,
                loading: isLoading,
            },
            element: <ArchivedSubAdmin />,
        },
    ]

    return (
        <div>
            <TabNavigation tabs={tabs}>
                {({ header, element }: any) => {
                    return (
                        <div>
                            <div className="flex items-end justify-between">
                                <div>{header}</div>
                                <div className="px-6">  
                                <Button
                                    text={'Add Sub Admin'}
                                    variant={'primary'}
                                    onClick={()=>{
                                        router.push('/portals/admin/sub-admin/form')
                                    }}
                                />
                                </div>
                            </div>
                            <div className="p-4">{element}</div>
                        </div>
                    )
                }}
            </TabNavigation>
        </div>
    )
}

SubAdminList.getLayout = (page: ReactElement) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default SubAdminList
