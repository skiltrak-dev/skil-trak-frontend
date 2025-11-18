import { Badge, Card } from '@components'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@components/ui'
import {
    CheckCircle2,
    ClipboardList,
    Info,
    Video,
    Calendar,
    Users,
} from 'lucide-react'

export function PlacementDetails() {
    const placements = [
        {
            qualification: 'CHC33015 - Certificate III in Individual Support',
            units: [
                {
                    code: 'CHCCCS015',
                    name: 'Provide individualised support',
                    requirements: [
                        'Access to at least 3 different clients with varying support needs',
                        'Opportunity to develop and implement individualised support plans',
                        'Exposure to person-centred practice approaches',
                        'Access to relevant documentation and care planning systems',
                    ],
                },
                {
                    code: 'CHCCCS023',
                    name: 'Support independence and wellbeing',
                    requirements: [
                        'Access to clients requiring independence and wellbeing support',
                        'Opportunity to facilitate client choice and decision-making',
                        'Exposure to wellness and reablement approaches',
                        'Access to community participation activities',
                    ],
                },
            ],
        },
        {
            qualification: 'CHC43015 - Certificate IV in Ageing Support',
            units: [
                {
                    code: 'CHCAGE001',
                    name: 'Facilitate the empowerment of older people',
                    requirements: [
                        'Access to older clients (65+ years)',
                        'Opportunity to support client empowerment and rights',
                        'Exposure to aged care service delivery models',
                        'Access to advocacy and support planning processes',
                    ],
                },
                {
                    code: 'CHCAGE005',
                    name: 'Provide support to people living with dementia',
                    requirements: [
                        'Access to at least 2 clients living with dementia',
                        'Exposure to different stages of dementia progression',
                        'Opportunity to apply dementia-enabling environments',
                        'Access to person-centred dementia care approaches',
                    ],
                },
            ],
        },
    ]

    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-50 p-6 md:p-8 rounded-2xl border-2 border-blue-200 hover:shadow-xl transition-all relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="flex items-start gap-4 relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl shadow-blue-500/30 animate-scale-in">
                        <ClipboardList className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-blue-900 mb-2">
                            Placement Requirements Verified
                        </h3>
                        <p className="text-sm text-blue-800 leading-relaxed">
                            All mandatory unit requirements have been confirmed
                            with the industry partner. Tasks aligned to
                            training.gov.au competencies.
                        </p>
                    </div>
                </div>
            </div>

            {/* Placement Logistics Card */}
            <Card className="border-2 border-[#044866]/20 hover:shadow-xl hover:border-[#044866]/30 transition-all overflow-hidden">
                <div className="bg-gradient-to-r from-[#044866]/5 via-[#0D5468]/5 to-transparent pb-6">
                    <div className="text-[#044866] flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#044866] rounded-xl flex items-center justify-center shadow-md">
                            <Info className="w-5 h-5 text-white" />
                        </div>
                        Placement Logistics
                    </div>
                    <p className="text-sm text-slate-600 mt-2 ml-13">
                        Key operational information for placement planning
                    </p>
                </div>
                <div className="pt-6">
                    <div className="grid sm:grid-cols-3 gap-4 md:gap-6 mb-6">
                        <div className="flex flex-col gap-3 p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl border-2 border-blue-200 hover:shadow-md transition-all group">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                                <Video className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <div className="text-xs text-blue-700 mb-1.5">
                                    Delivery Mode
                                </div>
                                <div className="text-base text-blue-900">
                                    Face to Face
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 p-4 bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl border-2 border-emerald-200 hover:shadow-md transition-all group">
                            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                                <Calendar className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <div className="text-xs text-emerald-700 mb-1.5">
                                    Typical Length
                                </div>
                                <div className="text-base text-emerald-900">
                                    8-12 weeks
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 p-4 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl border-2 border-purple-200 hover:shadow-md transition-all group">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/30 group-hover:scale-110 transition-transform">
                                <Users className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <div className="text-xs text-purple-700 mb-1.5">
                                    Student Capacity
                                </div>
                                <div className="text-base text-purple-900">
                                    2-4 concurrent
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-xl border-2 border-blue-200">
                        <div className="flex items-start gap-3">
                            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm text-blue-900 leading-relaxed">
                                    <strong>Information Source:</strong> This
                                    information is drawn from our discussions
                                    with the employer and our internal
                                    verification process, and supports your
                                    judgement on whether the site can support
                                    your learners in line with their enrolment.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            {placements.map((placement, index) => (
                <Card
                    key={index}
                    className="border-2 border-[#044866]/10 hover:shadow-lg hover:border-[#044866]/20 transition-all"
                >
                    <div className="bg-gradient-to-r from-[#044866]/5 to-transparent">
                        <div className="text-[#044866] flex items-center gap-2">
                            <ClipboardList className="w-5 h-5" />
                            {placement.qualification}
                        </div>
                    </div>
                    <div className="pt-5">
                        <Accordion
                            type="single"
                            collapsible
                            className="w-full space-y-3"
                        >
                            {placement.units.map((unit, unitIndex) => (
                                <AccordionItem
                                    key={unitIndex}
                                    value={`unit-${index}-${unitIndex}`}
                                    className="border-2 border-slate-100 rounded-lg px-4"
                                >
                                    <AccordionTrigger className="hover:no-underline py-4">
                                        <div className="flex items-center gap-3">
                                            <Badge
                                                text={unit.code}
                                                className="bg-[#0D5468] text-white"
                                            ></Badge>
                                            <span className="text-left">
                                                {unit.name}
                                            </span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-4">
                                        <div className="mt-2 space-y-3">
                                            <p className="text-sm text-slate-600 mb-3">
                                                Mandatory placement requirements
                                                confirmed with industry:
                                            </p>
                                            {unit.requirements.map(
                                                (req, reqIndex) => (
                                                    <div
                                                        key={reqIndex}
                                                        className="flex items-start gap-3 bg-emerald-50 p-3 rounded-lg border border-emerald-100"
                                                    >
                                                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                                                        <span className="text-sm text-slate-700">
                                                            {req}
                                                        </span>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>

                        <div className="mt-6 bg-slate-50 p-5 rounded-lg border-2 border-slate-100">
                            <h4 className="text-sm text-slate-900 mb-4 flex items-center gap-2">
                                <Info className="w-4 h-4 text-[#F7A619]" />
                                Two-Stage Confirmation Process
                            </h4>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                                        ✓
                                    </div>
                                    <div>
                                        <div className="text-sm text-slate-900">
                                            Stage 1: Initial Verification
                                        </div>
                                        <div className="text-xs text-slate-600 mt-0.5">
                                            SkilTrak confirmed capacity and
                                            requirements during workplace option
                                            verification
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                                        2
                                    </div>
                                    <div>
                                        <div className="text-sm text-slate-900">
                                            Stage 2: Student-Specific
                                            Confirmation
                                        </div>
                                        <div className="text-xs text-slate-600 mt-0.5">
                                            After RTO and student approval,
                                            industry confirms student-specific
                                            placement tasks
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    )
}
