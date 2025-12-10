import { TabNavigation, TabProps } from '@components'
import { RtoApi } from '@queries'
import { School } from 'lucide-react'
import { ActionRequiredHeader } from '../components'
import { ApprovedPlacement } from './ApprovedPlacement'
import { PendingPlacement } from './PendingPlacement'
import { RejectedPlacement } from './RejectedPlacement'

export const RtoWpApprovalPlacements = () => {
    const count = RtoApi.Workplace.wpApprovalRequestCount()

    const tabs: TabProps[] = [
        {
            label: 'Pending',
            href: {
                pathname: 'approve-placement',
                query: { tab: 'pending' },
            },
            badge: {
                text: count?.data?.pending,
                loading: count.isLoading,
            },
            element: <PendingPlacement />,
        },
        {
            label: 'Approved',
            href: {
                pathname: 'approve-placement',
                query: { tab: 'approved' },
            },
            badge: {
                text: count?.data?.approved,
                loading: count.isLoading,
            },
            element: <ApprovedPlacement />,
        },
        {
            label: 'Rejected',
            href: {
                pathname: 'approve-placement',
                query: { tab: 'rejected' },
            },
            badge: {
                text: count?.data?.rejected,
                loading: count.isLoading,
            },
            element: <RejectedPlacement />,
        },
    ]
    return (
        <div>
            <ActionRequiredHeader
                icon={School}
                title="Placement Approvals"
                description="Review student-approved placements and verify workplace eligibility"
                urgentCount={count?.data?.pending || 0}
                urgentLabel="Waiting For RTO Approval"
                warningMessage="<strong>Your Task:</strong> Students have already approved these placements. Review workplace eligibility and course requirements before sending to industry for interview arrangement."
                gradientFrom="primaryNew"
                gradientTo="primaryNew"
                iconGradient="from-primaryNew to-primaryNew"
            />

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
