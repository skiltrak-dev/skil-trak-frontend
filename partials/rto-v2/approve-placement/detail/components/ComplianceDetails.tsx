import { Badge, Button, Card } from '@components'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@components/ui'
import {
    CheckCircle2,
    FileCheck,
    ShieldCheck,
    ClipboardCheck,
    FileText,
    Download,
    ExternalLink,
} from 'lucide-react'

export function ComplianceDetails() {
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
            <div className="bg-gradient-to-br from-emerald-50 via-blue-50 to-emerald-50 p-6 md:p-8 rounded-2xl border-2 border-emerald-200 hover:shadow-xl transition-all relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl"></div>
                <div className="flex items-start gap-4 relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl shadow-emerald-500/30 animate-scale-in">
                        <CheckCircle2 className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-emerald-900 mb-2">
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

            {checklists.map((checklist, index) => {
                const Icon = checklist.icon
                const colors = getColorClasses(checklist.color)

                return (
                    <Card
                        key={index}
                        className={`border-2 ${colors.border} hover:shadow-lg transition-all`}
                    >
                        <div>
                            <div className="flex items-start justify-between">
                                <div className="flex items-start gap-3 flex-1">
                                    <div
                                        className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
                                    >
                                        <Icon
                                            className={`w-5 h-5 ${colors.text}`}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-slate-900 mb-2">
                                            {checklist.title}
                                        </div>
                                        <Badge
                                            Icon={CheckCircle2}
                                            text="Signed & Complete"
                                            className={colors.badge}
                                        ></Badge>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            {checklist.items.length > 0 && (
                                <div className="space-y-2.5">
                                    {checklist.items.map((item, itemIndex) => (
                                        <div
                                            key={itemIndex}
                                            className="flex items-start gap-3"
                                        >
                                            <CheckCircle2
                                                className={`w-4 h-4 ${colors.text} mt-0.5 flex-shrink-0`}
                                            />
                                            <span className="text-sm text-slate-700">
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div
                                className={`${
                                    colors.bg
                                } p-4 rounded-lg border ${colors.border} ${
                                    checklist.items.length > 0 ? 'mt-4' : ''
                                }`}
                            >
                                <div className="grid md:grid-cols-3 gap-3 text-sm">
                                    <div>
                                        <div className="text-xs text-slate-600 mb-1">
                                            Signed By
                                        </div>
                                        <div className={colors.text}>
                                            {checklist.signedBy}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-600 mb-1">
                                            Date
                                        </div>
                                        <div className={colors.text}>
                                            {checklist.signedDate}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-slate-600 mb-1">
                                            Version
                                        </div>
                                        <div className={colors.text}>
                                            {checklist.version}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {checklist.hasDocument && (
                                <div className="mt-4 p-5 bg-gradient-to-br from-slate-50 to-white rounded-xl border-2 border-slate-200 hover:border-[#044866]/30 hover:shadow-md transition-all group">
                                    <div className="flex items-center justify-between gap-4 flex-wrap">
                                        <div className="flex items-center gap-4 flex-1 min-w-0">
                                            <div className="w-12 h-12 bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                                                <FileText className="w-6 h-6 text-slate-600" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="text-sm text-slate-900 truncate mb-1">
                                                    {checklist.documentName}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-slate-500">
                                                    <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded">
                                                        PDF
                                                    </span>
                                                    <span>
                                                        Available for review
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 flex-shrink-0">
                                            <Button
                                                outline
                                                variant="primaryNew"
                                            >
                                                <ExternalLink className="w-3.5 h-3.5" />
                                                View
                                            </Button>
                                            <Button variant="primaryNew">
                                                <Download className="w-3.5 h-3.5" />
                                                Download
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Card>
                )
            })}

            <Card className="bg-blue-50 border-2 border-blue-200">
                <div className="pt-5">
                    <Accordion type="single" collapsible>
                        <AccordionItem value="info" className="border-none">
                            <AccordionTrigger className="text-blue-900 hover:no-underline py-2">
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
