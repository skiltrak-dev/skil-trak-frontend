import { TabNavigation, TabProps } from '@components'
import { SubAdminLayout } from '@layouts'
import {
    IndustryPartnerRemovalRequest,
    IndustrySnoozeRemovalRequest,
    StudentFlaggedRequest,
    StudentNotContactableRequest,
    StudentSnoozeRemovalRequest,
} from '@partials/sub-admin/ManagerApprovalList'
import { NextPageWithLayout } from '@types'
import React, { ReactElement } from 'react'
import { SubAdminApi } from '@queries'

const ManagerApprovalList: NextPageWithLayout = () => {
    const count = SubAdminApi.Industry.removalRequestCount()
    const studentActionsCount =
        SubAdminApi.Industry.studentActionsRequestCount()

    const tabs: TabProps[] = [
        {
            label: 'Industry Remove Partner Requests',
            href: {
                pathname: 'manager-approval-list',
                query: {
                    page: 1,
                    pageSize: 50,
                    tab: 'remove-partner-requests',
                },
            },
            badge: {
                text: count?.data?.partnerCount,
                loading: count?.isLoading,
            },
            element: <IndustryPartnerRemovalRequest />,
        },
        {
            label: 'Industry Snooze Requests',
            href: {
                pathname: 'manager-approval-list',
                query: {
                    page: 1,
                    pageSize: 50,
                    tab: 'industry-snooze-requests',
                },
            },
            badge: {
                text: count?.data?.snoozedCount,
                loading: count?.isLoading,
            },
            element: <IndustrySnoozeRemovalRequest />,
        },
        {
            label: 'Student Snooze Requests',
            href: {
                pathname: 'manager-approval-list',
                query: {
                    page: 1,
                    pageSize: 50,
                    tab: 'student-snooze-requests',
                },
            },
            badge: {
                text: studentActionsCount?.data?.snoozed,
                loading: studentActionsCount?.isLoading,
            },
            element: <StudentSnoozeRemovalRequest />,
        },
        {
            label: 'Student Not-Contactable Requests',
            href: {
                pathname: 'manager-approval-list',
                query: {
                    page: 1,
                    pageSize: 50,
                    tab: 'student-not-contactable-requests',
                },
            },
            badge: {
                text: studentActionsCount?.data?.nonContactable,
                loading: studentActionsCount?.isLoading,
            },
            element: <StudentNotContactableRequest />,
        },
        {
            label: 'Student Flagged Requests',
            href: {
                pathname: 'manager-approval-list',
                query: {
                    page: 1,
                    pageSize: 50,
                    tab: 'student-flagged-requests',
                },
            },
            badge: {
                text: studentActionsCount?.data?.flagged,
                loading: studentActionsCount?.isLoading,
            },
            element: <StudentFlaggedRequest />,
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

ManagerApprovalList.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout
            pageTitle={{ title: 'Workplace Cancellation Requests' }}
        >
            {page}
        </SubAdminLayout>
    )
}

export default ManagerApprovalList
