import { Button, Card } from '@components'
import { RtoV2Api } from '@queries'
import { RtoApprovalWorkplaceRequest } from '@types'
import { CheckCircle2, Info, XCircle } from 'lucide-react'
import { DecisionActions } from './DecisionActions'

interface DecisionPanelProps {
    approval: RtoApprovalWorkplaceRequest
}

export function DecisionPanel({ approval }: DecisionPanelProps) {
    const quickReviewRequest = RtoV2Api.ApprovalRequest.quickReviewRequest(
        {
            industryId: approval.industry?.user?.id,
            courseId: approval.workplaceRequest?.courses?.[0]?.id ?? 0,
        },
        {
            skip:
                !approval.industry?.user?.id ||
                !approval.workplaceRequest?.courses?.[0]?.id,
        }
    )

    const check = (value: boolean) => {
        return value ? CheckCircle2 : XCircle
    }

    const quickChecks = [
        // {
        //     label: 'Compliance',
        //     icon: quickReviewRequest?.data?.compliance ? CheckCircle2 : XCircle,
        // },
        {
            label: 'Compliance',
            icon: check(quickReviewRequest?.data?.compliance || false),
            key: quickReviewRequest?.data?.compliance,
        },
        {
            label: 'Supervisors',
            icon: check(quickReviewRequest?.data?.supervisor || false),
            key: quickReviewRequest?.data?.supervisor,
        },
        {
            label: 'Capacity',
            icon: check(quickReviewRequest?.data?.sectorCapacity || false),
            key: quickReviewRequest?.data?.sectorCapacity,
        },
    ]

    return (
        <div className="space-y-5">
            {/* Quick Stats */}
            <Card className="shadow-xl border-2 border-[#044866]/10 hover:shadow-2xl transition-all hover:border-[#044866]/20">
                <div className="pb-4 bg-gradient-to-br from-slate-50 to-white">
                    <div className="text-[#044866] flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#044866] rounded-lg flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-white" />
                        </div>
                        Quick Review
                    </div>
                    <p className="text-xs text-slate-600 mt-1">
                        All requirements verified
                    </p>
                </div>
                <div className="space-y-2.5">
                    {quickChecks.map((check, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-3.5 bg-gradient-to-r from-emerald-50 to-emerald-50/50 rounded-lg hover:from-emerald-100 hover:to-emerald-100/50 transition-all border border-emerald-200 group"
                        >
                            <span className="text-sm text-slate-700">
                                {check.label}
                            </span>
                            <div className="flex items-center gap-1.5 text-emerald-700">
                                <check.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                <span className="text-sm">
                                    {check?.key ? '' : 'Not'} Complete
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
            {/* Decision Actions */}
            <DecisionActions approval={approval} />

            {/* Support Info */}
            <Card className="bg-gradient-to-br from-slate-50 to-slate-100/50 border-2 border-slate-200 hover:shadow-lg transition-shadow">
                <div className="pt-6 pb-6">
                    <div className="text-center space-y-3">
                        <div className="w-12 h-12 bg-[#044866] rounded-full flex items-center justify-center mx-auto">
                            <Info className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h4 className="text-sm text-slate-900 mb-1.5">
                                Need Help?
                            </h4>
                            <p className="text-xs text-slate-600 leading-relaxed">
                                Contact SkilTrak support for clarification about
                                any information in this profile.
                            </p>
                        </div>
                        <Button variant="primaryNew" outline>
                            Contact Support
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    )
}
