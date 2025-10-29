import React from 'react'
import { ActionRequiredHeader } from '../components'
import { FileText } from 'lucide-react'
import { SubmissionsRequiringReview } from './SubmissionsRequiringReview'
import { TabNavigation, TabProps } from '@components'
import { ReviewCompleted } from './ReviewCompleted'
import { RtoApi } from '@queries'

export const Submissions = () => {
    const count = RtoApi.Submissions.getRtoSubmissionsCount()

    const tabs: TabProps[] = [
        {
            label: 'Submissions Requiring Review',
            href: {
                pathname: 'submissions',
                query: {
                    tab: 'submissions-requiring-review',
                    page: 1,
                    pageSize: 50,
                },
            },
            badge: {
                text: count.data?.pending,
                loading: count?.isLoading,
            },
            element: <SubmissionsRequiringReview />,
        },
        {
            label: 'Review Completed',
            href: {
                pathname: 'submissions',
                query: {
                    tab: 'review-completed',
                    page: 1,
                    pageSize: 50,
                },
            },
            badge: {
                text: count.data?.competent,
                loading: count?.isLoading,
            },
            element: <ReviewCompleted />,
        },
    ]
    return (
        <div>
            {' '}
            <ActionRequiredHeader
                icon={FileText}
                title="Student Submissions"
                description="Review placement completion reports and assessment portfolios"
                urgentCount={count.data?.pending}
                urgentLabel="Pending"
                warningMessage="<strong>Action Required:</strong> Student submissions contain placement completion reports and assessment evidence that require coordinator review and approval before final grades can be assigned."
                gradientFrom="primary"
                gradientTo="primaryNew"
                iconGradient="from-primary to-primary-light"
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
