import {
    CheckCircle,
    Clock,
    DollarSign,
    MapPin,
    Settings,
    Users,
} from 'lucide-react'
import { RtoDashboardBaseModal } from './RtoDashboardBaseModal'
import { Badge } from '@components'

interface FeatureDetailsModalProps {
    isOpen: boolean
    onClose: () => void
    featureId: string
}

const featureDetailsContent: Record<string, any> = {
    'expert-consultation': {
        title: 'Expert Industry Consultation',
        subtitle:
            'Professional guidance from industry experts arranged by SkilTrak',
        description:
            'Get targeted insights and practical advice from practitioners who work in your sector.',
        sections: [
            {
                title: "Who it's for",
                icon: Users,
                content:
                    'Registered Training Organisations (RTOs) seeking expert input for course design, assessment validation, industry engagement, trainer PD, or cohort briefings aligned to current industry practice.',
            },
            {
                title: "What's included",
                icon: CheckCircle,
                items: [
                    'Industry expert consultant matched to your sector and specific course/units of competency.',
                    'Pre-session scoping call to confirm objectives, context and evidence needs.',
                    'Consultation session (remote or on-site where available).',
                    'Action notes or key recommendations following the session (where provided by the consultant).',
                ],
            },
            {
                title: 'Optional add‑ons',
                icon: Settings,
                items: [
                    'Panel consult with two or more experts.',
                    'Document review (curriculum/assessment instruments) prior to the session.',
                    'Follow-up workshop with trainers for implementation.',
                ],
            },
            {
                title: 'How it works (SkilTrak‑matched)',
                icon: Clock,
                steps: [
                    'Send Enquiry with your RTO requirements: sector, course/units of competency, consultation objectives, preferred dates & times, location(s)/time zones, expected attendees, and any add-ons.',
                    'We match you with a best-fit industry expert based on your requirements (sector, course, learner level, locations, scope, and timelines).',
                    'Receive proposal with expert profile, session outline, availability and pricing.',
                    'Confirm booking and receive the join link/on-site details and a short run-sheet.',
                ],
            },
            {
                title: 'Matching criteria',
                icon: CheckCircle,
                items: [
                    {
                        subtitle: 'Sector',
                        description:
                            'e.g., Health, Community Services, Construction, Engineering, Hospitality, Emergency Response, Business',
                    },
                    {
                        subtitle: 'Course & units',
                        description:
                            'map discussion to Training Package outcomes',
                    },
                    {
                        subtitle: 'Scope',
                        description:
                            'curriculum alignment, assessment review, industry trends, PD focus',
                    },
                    {
                        subtitle: 'Locations & time zones',
                        description: 'single or multi-campus coordination',
                    },
                ],
            },
            {
                title: 'Pricing',
                icon: DollarSign,
                content:
                    '$150 – $300 per hour (minimum 2-hour booking).\n\nFinal cost depends on seniority of expert, preparation time and add-ons. Series/retainer options available.',
            },
            {
                title: 'Availability',
                icon: MapPin,
                content:
                    "Remote consults nationwide; on-site availability in selected regions via the SkilTrak network. Share your times, locations and scope, and we'll line up the best-fit expert.",
            },
        ],
    },
    'mou-legal': {
        title: 'MOU & Legal Services',
        subtitle:
            'Professional legal and MOU documentation arranged by SkilTrak',
        description:
            'Streamline partnerships with industry through clear, fit-for-purpose agreements.',
        sections: [
            {
                title: "Who it's for",
                icon: Users,
                content:
                    'Registered Training Organisations (RTOs) formalising arrangements with industry partners for placements, simulations, guest speakers, resource sharing or co-delivery.',
            },
            {
                title: "What's included",
                icon: CheckCircle,
                items: [
                    'MOU drafting or review tailored to your sector and engagement model.',
                    'Template customisation (roles, responsibilities, insurances, IP/branding, data handling).',
                    'Scope alignment to your course/units of competency and delivery plan.',
                    'Negotiation support to reconcile partner clauses and timelines.',
                    'Final document pack (PDF + editable file) ready for e-signature.',
                ],
            },
            {
                title: 'Optional add‑ons',
                icon: Settings,
                items: [
                    'Ancillary documents: NDAs, service schedules, placement agreements, statement of work.',
                    'Policy mapping: WHS, safeguarding, privacy/data sharing guidance.',
                    'Rapid turnaround or after-hours review windows.',
                ],
            },
            {
                title: 'How it works (SkilTrak‑matched)',
                icon: Clock,
                steps: [
                    'Send Enquiry with your RTO requirements: sector, course/units, partner type, purpose of the agreement, preferred timeframes, and any internal templates you use.',
                    'We match you with a suitable legal partner based on your requirements (sector, agreement type, jurisdiction, timelines).',
                    'Receive proposal with scope, deliverables, turnaround, and pricing.',
                    'Confirm and collaborate through tracked drafts until sign-off.',
                ],
            },
            {
                title: 'Typical inclusions',
                icon: CheckCircle,
                items: [
                    'Roles & responsibilities',
                    'Insurance and risk allocation',
                    'Confidentiality and IP usage',
                    'Branding & communications',
                    'Data sharing and records access',
                    'Term, termination and review cycle',
                ],
            },
            {
                title: 'Pricing',
                icon: DollarSign,
                content:
                    "Provided upon request. Final cost varies by scope, complexity, number of parties and urgency. We'll provide a fixed-fee quote before work begins.",
            },
            {
                title: 'Availability',
                icon: MapPin,
                content:
                    "National coverage via the SkilTrak network. Share your timelines and jurisdiction, and we'll present best-fit options.",
            },
        ],
    },
    'webinar-platform': {
        title: 'Professional Industry Speaker (Webinar)',
        subtitle:
            'Host expert-led webinars with speakers from the SkilTrak Industry Network',
        description:
            'Bring real-world insights to your cohorts with practitioners who work in the field.',
        sections: [
            {
                title: "Who it's for",
                icon: Users,
                content:
                    'Registered Training Organisations (RTOs) seeking subject-matter experts to deliver webinars for training delivery, assessment briefings, guest lectures and industry engagement.',
            },
            {
                title: "What's included",
                icon: CheckCircle,
                items: [
                    'Industry expert speaker matched to your sector and specific course/units of competency.',
                    'Session delivery via your preferred platform (or our hosted link).',
                    'Preparation call to align outcomes, audience level and examples.',
                    'Q&A segment connecting learners with current industry practice.',
                    'Post-session resources (slides or summary notes) where provided by the speaker.',
                ],
            },
            {
                title: 'Optional add‑ons',
                icon: Settings,
                items: [
                    'Moderator/producer to manage flow, time and Q&A.',
                    'Branded materials (title slide, registration page, follow-up email template).',
                    'Attendance report and simple feedback form.',
                    'Panel format with two or more experts.',
                ],
            },
            {
                title: 'How it works (SkilTrak-matched)',
                icon: Clock,
                steps: [
                    'Send Enquiry with your RTO requirements: sector, specific course/units of competency, preferred dates & times, locations/time zones, expected headcount, delivery platform, and any add-ons.',
                    'We match you with a speaker from our industry network based on your requirements (sector, course, learner level, locations, scale, accessibility/LLN needs).',
                    'Receive proposal with speaker profile, session outline, availability and pricing.',
                    'Confirm booking and receive the join link/instructions and a short run-sheet.',
                ],
            },
            {
                title: 'Matching criteria',
                icon: CheckCircle,
                items: [
                    {
                        subtitle: 'Sector',
                        description:
                            'e.g., Health, Community Services, Construction, Engineering, Hospitality, Emergency Response, Business',
                    },
                    {
                        subtitle: 'Course & units',
                        description:
                            'align talk content to Training Package outcomes',
                    },
                    {
                        subtitle: 'Audience profile',
                        description:
                            'cohort size, baseline knowledge, assessment timelines',
                    },
                    {
                        subtitle: 'Locations & time zones',
                        description: 'schedule for multi-campus delivery',
                    },
                    {
                        subtitle: 'Delivery preferences',
                        description:
                            'your platform vs hosted link; interactive vs presentation-led',
                    },
                ],
            },
            {
                title: 'Pricing',
                icon: DollarSign,
                content:
                    '$100 – $400 (typical range by duration, seniority of speaker, preparation required and add-ons).\nSeries pricing available for term-long programs.',
            },
            {
                title: 'Availability & Scale',
                icon: MapPin,
                content:
                    "From small cohort briefings to larger cross-campus sessions. Tell us your times, locations and headcount, and we'll line up the best-fit speaker.",
            },
        ],
    },
    'simulation-tools': {
        title: 'Advanced Simulation Tools',
        subtitle:
            'Access cutting‑edge simulation rooms across the SkilTrak Industry Network',
        description:
            'Give your learners real‑world practice in safe, fully equipped environments aligned to current industry standards.',
        sections: [
            {
                title: "Who it's for",
                icon: Users,
                content:
                    'Registered Training Organisations (RTOs) delivering competency‑based training and assessment that benefits from realistic, hands‑on simulation (e.g., health, community services, construction, engineering, hospitality, emergency response).',
            },
            {
                title: "What's included",
                icon: CheckCircle,
                items: [
                    {
                        subtitle:
                            'Industry‑grade simulation rooms matched to your units of competency',
                        description:
                            '(e.g., clinical ward/aged‑care bays, workshop floors, construction mock‑ups, hospitality service areas, incident response spaces).',
                    },
                    {
                        subtitle: 'Advanced tools & equipment',
                        description:
                            'manikins & patient monitors, test rigs and benches, PPE, calibrated instruments, mobile AV kits for observation/recording, and scenario props.',
                    },
                    {
                        subtitle: 'Software & digital tools',
                        description:
                            'scenario playback, incident logging, assessment checklists, and digital evidence capture compatible with common LMS/e‑portfolio systems.',
                    },
                    {
                        subtitle: 'On‑site induction & safety brief',
                        description: 'for trainers and learners.',
                    },
                    {
                        subtitle: 'Basic consumables',
                        description:
                            '(standard PPE, wipes, markers, tape) with optional top‑ups.',
                    },
                ],
            },
            {
                title: 'Optional add‑ons',
                icon: Settings,
                items: [
                    'Qualified session facilitators/assessors familiar with current Training Packages.',
                    'Role‑players/standardised participants for communication & teamwork scenarios.',
                    'Bespoke scenarios mapped to your assessment instruments.',
                    'Extra consumables or specialised equipment on request.',
                ],
            },
            {
                title: 'How it works (SkilTrak‑matched)',
                icon: Clock,
                steps: [
                    'Send Enquiry with course/units of competency, preferred locations, cohort size, dates, and any add‑ons.',
                    'We match you with suitable industry partners/venues from the SkilTrak network based on your course, locations, timing, capacity, and other requirements.',
                    'Receive proposal including room details, equipment list, availability, and pricing.',
                    'Confirm booking and receive arrival details and induction information.',
                ],
            },
            {
                title: 'Pricing',
                icon: DollarSign,
                content:
                    '$50 – $90 (typical hourly rate per room)\nFinal rate depends on room type, equipment level, add‑ons, and peak/off‑peak times. Day and multi‑day packages are available. Education discounts may apply for block bookings.',
            },
            {
                title: 'Availability & Locations',
                icon: MapPin,
                content:
                    "SkilTrak partners operate in multiple regions. Share your preferred location(s) and dates and we'll present the best‑fit options.",
            },
        ],
    },
    // Default fallback for other features
    default: {
        title: 'Feature Details',
        subtitle: 'Coming Soon',
        description:
            'Detailed information for this feature will be available soon.',
        sections: [],
    },
}

export const ServicesFeaturesModal = ({
    onCancel,
    featureId = 'default',
}: {
    featureId:
        | 'expert-consultation'
        | 'mou-legal'
        | 'webinar-platform'
        | 'simulation-tools'
        | 'default'
    onCancel: () => void
}) => {
    const details = featureDetailsContent[featureId]

    return (
        <RtoDashboardBaseModal
            onCancel={onCancel}
            title={details?.title}
            description={details?.subtitle}
        >
            {details.sections.map((section: any, index: number) => {
                const SectionIcon = section.icon
                return (
                    <div key={index} className="space-y-3">
                        <div className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-[#044866]/10">
                                <SectionIcon className="h-5 w-5 text-[#044866]" />
                            </div>
                            <h3 className="text-[#262626]">{section.title}</h3>
                        </div>

                        {section.content && (
                            <p className="text-[#262626] whitespace-pre-line pl-11">
                                {section.content}
                            </p>
                        )}

                        {section.items && Array.isArray(section.items) && (
                            <ul className="space-y-3 pl-11">
                                {section.items.map(
                                    (item: any, itemIndex: number) => (
                                        <li
                                            key={itemIndex}
                                            className="flex gap-2"
                                        >
                                            <span className="text-[#044866] mt-1">
                                                •
                                            </span>
                                            <div className="flex-1">
                                                {typeof item === 'string' ? (
                                                    <p className="text-[#262626]">
                                                        {item}
                                                    </p>
                                                ) : (
                                                    <>
                                                        <p className="text-[#262626]">
                                                            {item.subtitle}
                                                        </p>
                                                        {item.description && (
                                                            <p className="text-[#8c8c8c] text-sm mt-1">
                                                                {
                                                                    item.description
                                                                }
                                                            </p>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </li>
                                    )
                                )}
                            </ul>
                        )}

                        {section.steps && (
                            <ol className="space-y-3 pl-11">
                                {section.steps.map(
                                    (step: string, stepIndex: number) => (
                                        <li
                                            key={stepIndex}
                                            className="flex gap-3"
                                        >
                                            <Badge
                                                text={`${stepIndex + 1}`}
                                                className="bg-[#044866] hover:bg-[#044866]/90 h-6 w-6 p-0 flex items-center justify-center shrink-0"
                                            />

                                            <p className="text-[#262626] flex-1">
                                                {step}
                                            </p>
                                        </li>
                                    )
                                )}
                            </ol>
                        )}
                    </div>
                )
            })}
        </RtoDashboardBaseModal>
    )
}
