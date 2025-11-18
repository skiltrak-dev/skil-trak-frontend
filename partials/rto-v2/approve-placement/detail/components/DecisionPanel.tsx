import { Button, Card } from '@components'
import { CheckCircle2, XCircle, Info } from 'lucide-react'

interface DecisionPanelProps {
    status: 'waiting' | 'approved' | 'rejected'
    onApprove: () => void
    onReject: () => void
}

export function DecisionPanel({
    status,
    onApprove,
    onReject,
}: DecisionPanelProps) {
    const quickChecks = [
        { label: 'Compliance', icon: CheckCircle2 },
        { label: 'Supervisors', icon: CheckCircle2 },
        { label: 'Capacity', icon: CheckCircle2 },
        { label: 'Requirements', icon: CheckCircle2 },
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
                                <span className="text-sm">Complete</span>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

            {/* Decision Actions */}
            {status === 'waiting' && (
                <Card className="shadow-xl border-2 border-[#F7A619] bg-gradient-to-br from-white via-[#F7A619]/5 to-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#F7A619]/10 rounded-full blur-3xl"></div>
                    <div className="pb-4 relative">
                        <div className="text-[#044866] flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#F7A619] to-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-[#F7A619]/30 animate-pulse">
                                <Info className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <div>Make Your Decision</div>
                                <p className="text-xs text-slate-600 font-normal mt-0.5">
                                    Review complete - ready for approval
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4 relative">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
                            <p className="text-sm text-slate-700 leading-relaxed">
                                All verification checks are complete. Review the
                                workplace information and make your decision
                                below.
                            </p>
                        </div>

                        <Button
                            onClick={onApprove}
                            variant="success"
                            className="h-12"
                            fullWidth
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                            <CheckCircle2 className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                            <span>Approve Workplace</span>
                        </Button>

                        <Button
                            onClick={onReject}
                            variant="error"
                            outline
                            className="w-full border-2 border-red-300 text-red-700 hover:bg-red-50 hover:border-red-400 h-12 transition-all group"
                        >
                            <XCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                            Reject Workplace
                        </Button>

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
                                        If rejected, this workplace will{' '}
                                        <strong>not appear in future</strong>{' '}
                                        for any of your students.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-xl border-2 border-blue-200">
                            <h4 className="text-sm text-blue-900 mb-3 flex items-center gap-2">
                                <Info className="w-4 h-4" />
                                What happens next?
                            </h4>
                            <ul className="text-sm text-blue-800 space-y-2">
                                <li className="flex items-start gap-2">
                                    <CheckCircle2 className="w-4 h-4 mt-0.5 text-emerald-600 flex-shrink-0" />
                                    <span>
                                        <strong>If approved:</strong> Proceeds
                                        to Industry Confirmation
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
                                        You'll receive status updates via email
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Card>
            )}

            {status === 'approved' && (
                <Card className="shadow-xl border-2 border-emerald-400 bg-gradient-to-br from-emerald-50 via-emerald-100/30 to-white animate-scale-in overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent"></div>
                    <div className="pt-8 pb-8 relative">
                        <div className="text-center space-y-4">
                            <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto animate-scale-in shadow-2xl shadow-emerald-500/40">
                                <CheckCircle2 className="w-10 h-10 text-white" />
                            </div>
                            <div>
                                <h3 className="text-emerald-900 mb-2">
                                    Workplace Approved!
                                </h3>
                                <p className="text-sm text-emerald-800 leading-relaxed max-w-xs mx-auto">
                                    This placement will now proceed to Industry
                                    Confirmation for final acceptance.
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>
            )}

            {status === 'rejected' && (
                <Card className="shadow-xl border-2 border-red-400 bg-gradient-to-br from-red-50 via-red-100/30 to-white animate-scale-in overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent"></div>
                    <div className="pt-8 pb-8 relative">
                        <div className="text-center space-y-4">
                            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto animate-scale-in shadow-2xl shadow-red-500/40">
                                <XCircle className="w-10 h-10 text-white" />
                            </div>
                            <div>
                                <h3 className="text-red-900 mb-2">
                                    Workplace Rejected
                                </h3>
                                <p className="text-sm text-red-800 leading-relaxed max-w-xs mx-auto">
                                    SkilTrak has been notified and will search
                                    for an alternative placement option.
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>
            )}

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
