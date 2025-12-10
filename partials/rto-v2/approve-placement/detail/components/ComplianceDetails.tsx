import { Card } from '@components'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@components/ui'
import { RtoApprovalWorkplaceRequest } from '@types'
import { CheckCircle2 } from 'lucide-react'
import { HighlightedTasks } from './HighlightedTasks'
import { RtoChecklistDetail } from './RtoChecklistDetail'
import { SkiltrakChecklistDetail } from './SkiltrakChecklistDetail'

export function ComplianceDetails({
    approval,
}: {
    approval: RtoApprovalWorkplaceRequest
}) {
    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-br from-emerald-50 via-blue-50 to-emerald-50 p-4 rounded-2xl border-2 border-emerald-200 hover:shadow-xl transition-all relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl"></div>
                <div className="flex items-start gap-4 relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl shadow-emerald-500/30 animate-scale-in">
                        <CheckCircle2 className="w-7 h-7 text-white" />
                    </div>
                    <div className="space-y-1.5">
                        <h3 className="text-emerald-900">
                            All Compliance Verified
                        </h3>
                        <p className="text-sm text-emerald-800 leading-relaxed">
                            This workplace has completed and signed all required
                            checklists. Documentation is based on
                            training.gov.au requirements and Reviewed with our
                            compliance partners.
                        </p>
                    </div>
                </div>
            </div>

            {/*  */}
            <HighlightedTasks
                rtoUserId={approval?.student?.rto?.user?.id}
                coursesId={Number(approval?.workplaceRequest?.courses?.[0]?.id)}
            />

            <SkiltrakChecklistDetail
                industryUserId={approval?.industry?.user?.id}
                industryName={approval?.industry?.user?.name}
                courseId={Number(approval?.workplaceRequest?.courses?.[0]?.id)}
            />

            <RtoChecklistDetail
                courseId={Number(approval?.workplaceRequest?.courses?.[0]?.id)}
                studentId={Number(approval?.student?.id)}
                industryUserId={Number(approval?.industry?.user?.id)}
            />

            <Card className="bg-blue-50 border-2 border-blue-200 !py-1">
                <div>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="info" className="border-none">
                            <AccordionTrigger className="text-blue-900 hover:no-underline">
                                About These Checklists
                            </AccordionTrigger>
                            <AccordionContent className="text-sm text-blue-800 space-y-2 pt-2">
                                <p>
                                    These checklists are completed and signed by
                                    the industry partner as part of SkilTrak's
                                    comprehensive onboarding and eligibility
                                    verification process.
                                </p>
                                <p>
                                    The Highlighted Tasks and SkilTrak Facility
                                    Checklist are based on requirements from
                                    training.gov.au and have been Reviewed with
                                    our compliance partners.
                                </p>
                                <p>
                                    The RTO Facility Checklist is sent to the
                                    host employer when "Waiting for RTO" status
                                    is activated, providing RTO-specific
                                    confirmation of the workplace environment.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </Card>
        </div>
    )
}
