import React from 'react'
import { Card } from '@components'
import { PlacementActions } from './PlacementActions'
import { Info, XCircle, CheckCircle2 } from 'lucide-react'
import { RtoApprovalWorkplaceRequest } from '@types'

type StatusConfig = {
    icon: React.ComponentType<{ className?: string }>
    iconBg: string
    iconShadow: string
    borderColor: string
    bgGradient: string
    title: string
    message: string
    subtitle?: string
    showActions?: boolean
    showWarning?: boolean
    showNextSteps?: boolean
    centered?: boolean
    accentGradient?: string
    textColor?: string
    messageColor?: string
}

const STATUS_CONFIG: Record<string, StatusConfig> = {
    pending: {
        icon: Info,
        iconBg: 'from-[#F7A619] to-amber-500',
        iconShadow: 'shadow-[#F7A619]/30',
        borderColor: 'border-[#F7A619]',
        bgGradient: 'from-white via-[#F7A619]/5 to-white',
        title: 'Make Your Decision',
        subtitle: 'Review complete - ready for approval',
        message:
            'All verification checks are complete. Review the workplace information and make your decision below.',
        showActions: true,
        showWarning: true,
        showNextSteps: true,
    },
    approved: {
        icon: CheckCircle2,
        iconBg: 'from-emerald-500 to-emerald-600',
        iconShadow: 'shadow-emerald-500/40',
        borderColor: 'border-emerald-400',
        bgGradient: 'from-emerald-50 via-emerald-100/30 to-white',
        accentGradient: 'from-emerald-500/10',
        title: 'Workplace Approved!',
        message:
            'This placement will now proceed to Industry Confirmation for final acceptance.',
        centered: true,
    },
    rejected: {
        icon: XCircle,
        iconBg: 'from-red-500 to-red-600',
        iconShadow: 'shadow-red-500/40',
        borderColor: 'border-red-400',
        bgGradient: 'from-red-50 via-red-100/30 to-white',
        accentGradient: 'from-red-500/10',
        title: 'Workplace Rejected',
        message:
            'SkilTrak has been notified and will search for an alternative placement option.',
        centered: true,
    },
}

export const DecisionActions = ({
    approval,
}: {
    approval: RtoApprovalWorkplaceRequest
}) => {
    const config = STATUS_CONFIG[approval?.rtoApprovalStatus]
    if (!config) return null

    const Icon = config.icon

    return (
        <Card
            className={`shadow-xl border-2 ${
                config.borderColor
            } bg-gradient-to-br ${config.bgGradient} overflow-hidden relative ${
                config?.centered ? 'animate-scale-in' : ''
            }`}
        >
            {config?.accentGradient && (
                <div
                    className={`absolute inset-0 bg-gradient-to-br ${config?.accentGradient} to-transparent`}
                ></div>
            )}

            {!config?.centered && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#F7A619]/10 rounded-full blur-3xl"></div>
            )}

            <div
                className={`relative ${
                    config?.centered ? 'pt-8 pb-8' : 'pb-4'
                }`}
            >
                {config?.centered ? (
                    <div className="text-center space-y-4">
                        <div
                            className={`w-20 h-20 bg-gradient-to-br ${config?.iconBg} rounded-2xl flex items-center justify-center mx-auto animate-scale-in shadow-2xl ${config?.iconShadow}`}
                        >
                            <Icon className="w-10 h-10 text-white" />
                        </div>
                        <div>
                            <h3
                                className={`mb-2 ${
                                    status === 'approved'
                                        ? 'text-emerald-900'
                                        : 'text-red-900'
                                }`}
                            >
                                {config?.title}
                            </h3>
                            <p
                                className={`text-sm leading-relaxed max-w-xs mx-auto ${
                                    status === 'approved'
                                        ? 'text-emerald-800'
                                        : 'text-red-800'
                                }`}
                            >
                                {config?.message}
                            </p>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="text-[#044866] flex items-center gap-3">
                            <div
                                className={`w-10 h-10 bg-gradient-to-br ${config?.iconBg} rounded-xl flex items-center justify-center shadow-lg ${config?.iconShadow} animate-pulse`}
                            >
                                <Icon className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <div>{config?.title}</div>
                                <p className="text-xs text-slate-600 font-normal mt-0.5">
                                    {config?.subtitle}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4 relative mt-4">
                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                                <p className="text-sm text-slate-700 leading-relaxed">
                                    {config?.message}
                                </p>
                            </div>

                            {config?.showActions && (
                                <PlacementActions approval={approval} />
                            )}

                            {config?.showWarning && (
                                <>
                                    <div className="w-full h-[1px] my-4" />
                                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-xl border-2 border-amber-300 mb-4">
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <XCircle className="w-4 h-4 text-white" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm text-amber-900 mb-1">
                                                    Important: Rejection Impact
                                                </h4>
                                                <p className="text-sm text-amber-800 leading-relaxed">
                                                    If rejected, this workplace
                                                    will{' '}
                                                    <strong>
                                                        not appear in future
                                                    </strong>{' '}
                                                    for any of your students.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            {config?.showNextSteps && (
                                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border-2 border-blue-200">
                                    <h4 className="text-sm text-blue-900 mb-3 flex items-center gap-2">
                                        <Info className="w-4 h-4" />
                                        What happens next?
                                    </h4>
                                    <ul className="text-sm text-blue-800 space-y-2">
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-600 flex-shrink-0" />
                                            <span>
                                                <strong>If approved:</strong>{' '}
                                                Proceeds to Industry
                                                Confirmation
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <XCircle className="w-4 h-4 mt-0.5 text-red-600 flex-shrink-0" />
                                            <span>
                                                <strong>If rejected:</strong>{' '}
                                                Alternative search initiated
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <Info className="w-4 h-4 mt-0.5 text-blue-600 flex-shrink-0" />
                                            <span>
                                                You'll receive status updates
                                                via email
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>
        </Card>
    )
}
