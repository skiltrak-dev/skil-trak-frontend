import { ReactElement } from 'react'

//components
import { TabNavigation, TabProps } from '@components'

// query
import { SubAdminApi } from '@queries'

// hooks

//Layouts
import { SubAdminLayout } from '@layouts'
import {
    ApprovedPlacement,
    PendingWpRequest,
    RejectedPlacementRequest,
} from '@partials/sub-admin/wp-approval-request'

type Props = {}

const filterKeys = [
    'nowp',
    'name',
    'email',
    'phone',
    'rtoId',
    'suburb',
    'status',
    'courseId',
    'completed',
    'studentId',
    'industryId',
    'currentStatus',
    'flagged',
    'snoozed',
    'nonContactable',
    'coordinator',
    'subadminId',
]

export const RtoWpApprovalRequest = () => {
    const count = SubAdminApi.Workplace.useRtoWpApprovalRequestCount()
    interface SubadminTabProps extends TabProps {
        isAssociatedWithRto?: boolean
    }
    const tabs: SubadminTabProps[] = [
        {
            label: 'Pending Workplace Approval Request',
            badge: {
                text: count?.data?.pending,
                loading: count.isLoading,
            },
            href: {
                pathname: 'wp-approval-request',
                query: { tab: 'pending' },
            },
            element: <PendingWpRequest />,
            isAssociatedWithRto: true,
        },
        {
            label: 'Approved Workplace Request',
            badge: {
                text: count?.data?.approved,
                loading: count.isLoading,
            },
            href: {
                pathname: 'wp-approval-request',
                query: { tab: 'approved' },
            },
            element: <ApprovedPlacement />,
            isAssociatedWithRto: true,
        },
        {
            label: 'Rejected Workplace Request',
            badge: {
                text: count?.data?.rejected,
                loading: count.isLoading,
            },
            href: {
                pathname: 'wp-approval-request',
                query: { tab: 'rejected' },
            },
            element: <RejectedPlacementRequest />,
            isAssociatedWithRto: true,
        },
    ]

    return (
        <>
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
        </>
    )
}

RtoWpApprovalRequest.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout pageTitle={{ title: 'Rto Wp Approval Request' }}>
            {page}
        </SubAdminLayout>
    )
}

export default RtoWpApprovalRequest
