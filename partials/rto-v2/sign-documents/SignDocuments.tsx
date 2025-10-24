import React from 'react'
import { ActionRequiredHeader } from '../components'
import { AlertCircle, CheckCircle2, FileSignature } from 'lucide-react'
import { CountCard } from '../cards/CountCard'
import { PendingEsignDocuments, SignedEsignDocuments } from './components'
import { TabNavigation, TabProps } from '@components'

export const SignDocuments = () => {
    const tabs: TabProps[] = [
        {
            label: 'Pending',
            href: { pathname: 'sign-documents', query: { tab: 'pending' } },
            element: <PendingEsignDocuments />,
        },
        {
            label: 'Signed',
            href: { pathname: 'sign-documents', query: { tab: 'signed' } },
            element: <SignedEsignDocuments />,
        },
    ]
    return (
        <div className="space-y-4">
            <ActionRequiredHeader
                icon={FileSignature}
                title="E-Sign Documents Required"
                description="Sign urgent documents before Monday to proceed with student placements"
                urgentCount={1}
                urgentLabel={`Urgent (Due in 2 days)`}
                pendingCount={22}
                pendingLabel="Pending"
                actionButton={{
                    label: 'Sign All Documents',
                    icon: CheckCircle2,
                }}
                warningMessage="<strong>Important:</strong> All documents must be electronically signed before placements can commence. Documents use secure e-signature technology compliant with Australian regulations."
                gradientFrom="primary"
                gradientTo="primary-light"
                iconGradient="from-red-400 to-red-600"
            />
            <div className="grid grid-cols-3">
                <CountCard
                    stat={{
                        label: 'Critical Priority',
                        value: 3,
                        icon: AlertCircle,
                        iconColor: 'text-red-400',
                        iconBgColor:
                            'bg-gradient-to-br from-red-400/10 to-red-400/5',
                        valueColor: 'text-red-400',
                        highlight: true,
                    }}
                />
            </div>

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
