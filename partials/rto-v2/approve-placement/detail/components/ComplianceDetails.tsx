import { Badge, Button, Card } from '@components'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@components/ui'
import { RtoV2Api } from '@queries'
import { RtoApprovalWorkplaceRequest } from '@types'
import {
    CheckCircle2,
    FileCheck,
    ShieldCheck,
    ClipboardCheck,
    FileText,
    Download,
    ExternalLink,
} from 'lucide-react'
import { HighlightedTasks } from './HighlightedTasks'
import { RtoChecklistDetail } from './RtoChecklistDetail'
import { SkiltrakChecklistDetail } from './SkiltrakChecklistDetail'

export function ComplianceDetails({
    approval,
}: {
    approval: RtoApprovalWorkplaceRequest
}) {
    const checklists = [
        {
            title: 'Highlighted Tasks',
            icon: FileCheck,
            color: 'emerald',
            items: [
                'Provide appropriate tasks aligned to relevant units',
                'Maintain adequate supervision for students',
                'Support student learning per qualification requirements',
                'Provide access to necessary equipment and resources',
                'Allow participation in relevant work activities',
                'Facilitate required client interactions',
            ],
            signedBy: 'Sarah Mitchell, Manager',
            signedDate: '15 October 2025',
            version: 'v2.1 (TGA aligned, SKG reviewed)',
        },
        {
            title: 'SkilTrak Facility Checklist',
            icon: ShieldCheck,
            color: 'blue',
            items: [],
            signedBy: 'Sarah Mitchell, Manager',
            signedDate: '15 October 2025',
            version: 'v2.1',
            hasDocument: true,
            documentName: 'SkilTrak_Facility_Checklist_SunnydaleCC.pdf',
        },
        {
            title: 'RTO Facility Checklist',
            icon: ClipboardCheck,
            color: 'purple',
            items: [
                'Confirmed suitable physical environment',
                'Verified access to required client groups',
                'Confirmed ability to provide mandated tasks',
                'Verified supervision arrangements meet RTO requirements',
                'Confirmed understanding of placement expectations',
                'Agreed to RTO monitoring processes',
            ],
            signedBy: 'Sarah Mitchell, Manager',
            signedDate: '18 October 2025',
            version: 'Open College Schedule 4',
            hasDocument: true,
            documentName: 'RTO_Facility_Checklist_SunnydaleCC.pdf',
        },
    ]

    const getColorClasses = (color: string) => {
        const colors: Record<
            string,
            { bg: string; text: string; border: string; badge: string }
        > = {
            emerald: {
                bg: 'bg-emerald-50',
                text: 'text-emerald-700',
                border: 'border-emerald-200',
                badge: 'bg-emerald-100 text-emerald-700',
            },
            blue: {
                bg: 'bg-blue-50',
                text: 'text-blue-700',
                border: 'border-blue-200',
                badge: 'bg-blue-100 text-blue-700',
            },
            purple: {
                bg: 'bg-purple-50',
                text: 'text-purple-700',
                border: 'border-purple-200',
                badge: 'bg-purple-100 text-purple-700',
            },
        }
        return colors[color]
    }

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
                            training.gov.au requirements and reviewed with SKG
                            Consulting.
                        </p>
                    </div>
                </div>
            </div>

            {/*  */}
            <HighlightedTasks
                industry={approval?.industry}
                coursesId={Number(approval?.workplaceRequest?.courses?.[0]?.id)}
            />

            <SkiltrakChecklistDetail
                industryUserId={approval?.industry?.user?.id}
                courseId={Number(approval?.workplaceRequest?.courses?.[0]?.id)}
            />

            <RtoChecklistDetail
                coursesId={Number(approval?.workplaceRequest?.courses?.[0]?.id)}
            />

            <Card className="bg-blue-50 border-2 border-blue-200">
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
                                    training.gov.au and have been reviewed with
                                    SkilTrak's compliance partner, SKG
                                    Consulting.
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
