import { GlobalModal } from '@components/Modal/GlobalModal'
import { Button, Badge, Typography } from '@components'
import { Progressbar } from '../../components'
import { ScrollArea } from '@components/ui/scroll-area'
import { Separator } from '@components/ui/separator'
import {
    ListChecks,
    Info,
    Target,
    Award,
    CheckCircle2,
} from 'lucide-react'
import { MdCancel } from 'react-icons/md'

interface PlacementRequirement {
    id: string
    category: string
    completed: number
    total: number
}

interface PlacementProgramsModalProps {
    open: boolean
    onClose: () => void
    placementRequirements: PlacementRequirement[]
    selectedRequirements: string[]
}

export function PlacementProgramsModal({
    open,
    onClose,
    placementRequirements,
    selectedRequirements,
}: PlacementProgramsModalProps) {
    if (!open) return null

    return (
        <GlobalModal onCancel={onClose} className="sm:max-w-[800px] max-h-[90vh]">
            <div className="p-6 flex flex-col max-h-[90vh]">
                <div className="flex items-center justify-between mb-4 pb-4 border-b">
                    <div>
                        <Typography variant="h3" className="text-[#044866] flex items-center gap-2">
                            <ListChecks className="h-6 w-6" />
                            Placement Programs Details
                        </Typography>
                        <Typography variant="small" className="text-gray-600 mt-1">
                            Complete breakdown of all placement programs and
                            guidelines
                        </Typography>
                    </div>
                    <MdCancel
                        onClick={onClose}
                        className="transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90"
                    />
                </div>

                <ScrollArea className="flex-1 pr-4">
                    <div className="space-y-6 py-4">
                        {/* Overview Section */}
                        <div className="p-5 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-[#044866]/20 rounded-xl">
                            <div className="flex items-start gap-3 mb-4">
                                <div className="p-2 bg-[#044866]/10 rounded-lg">
                                    <Info className="h-5 w-5 text-[#044866]" />
                                </div>
                                <div>
                                    <Typography variant="h4" className="text-[#044866] font-semibold mb-2">
                                        Overview
                                    </Typography>
                                    <Typography variant="small" className="text-slate-700 leading-relaxed">
                                        The Certificate IV in Ageing Support
                                        requires students to complete a
                                        minimum of{' '}
                                        <strong>120 hours</strong> of
                                        supervised practical placement
                                        across various aged care settings.
                                        This hands-on experience is
                                        essential for developing competency
                                        in providing person-centered care to
                                        older Australians.
                                    </Typography>
                                </div>
                            </div>

                            <Separator className="my-4" />

                            <div className="space-y-3">
                                <Typography variant="small" className="text-slate-700 leading-relaxed">
                                    Students must demonstrate proficiency in
                                    core competencies including: conducting
                                    comprehensive assessments, implementing
                                    individualized care plans, maintaining
                                    accurate documentation, adhering to
                                    infection control protocols, and
                                    effectively communicating with
                                    residents, families, and
                                    multidisciplinary healthcare teams.
                                    Placements are designed to expose
                                    students to diverse aged care
                                    environments to build versatile
                                    skillsets applicable across acute care
                                    hospitals, community health centers, and
                                    residential aged care facilities.
                                </Typography>

                                <Typography variant="small" className="text-slate-700 leading-relaxed">
                                    Each placement category serves a
                                    specific learning purpose.{' '}
                                    <strong>Acute Care</strong> placements
                                    focus on managing complex medical
                                    conditions and rapid assessment skills
                                    in hospital settings.{' '}
                                    <strong>Community Health</strong>{' '}
                                    placements emphasize home-based care
                                    delivery, client independence, and
                                    community resource navigation.{' '}
                                    <strong>Emergency</strong> placements
                                    develop critical thinking and crisis
                                    response capabilities in high-pressure
                                    environments.
                                </Typography>

                                <Typography variant="small" className="text-slate-700 leading-relaxed">
                                    Throughout the placement, students are
                                    supervised by qualified assessors who
                                    evaluate performance against national
                                    competency standards. Regular feedback
                                    sessions, reflection journals, and
                                    competency-based assessments ensure
                                    students meet all requirements before
                                    progressing to full qualification.
                                    Students must maintain professional
                                    conduct, punctuality, appropriate dress
                                    standards, and demonstrate respect for
                                    client dignity and confidentiality at
                                    all times.
                                </Typography>
                            </div>
                        </div>

                        {/* Requirements Breakdown */}
                        <div>
                            <Typography variant="h4" className="text-[#044866] font-semibold mb-4 flex items-center gap-2">
                                <Target className="h-5 w-5" />
                                Category Breakdown
                            </Typography>

                            <div className="space-y-4">
                                {placementRequirements.map((req) => (
                                    <div
                                        key={req.id}
                                        className="p-5 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-xl border border-slate-200 hover:shadow-md transition-all"
                                    >
                                        <div className="flex items-center justify-between mb-4">
                                            <Typography variant="h4" className="text-[#044866] font-semibold">
                                                {req.category}
                                            </Typography>
                                            <Badge
                                                text={selectedRequirements.includes(req.id) ? 'Selected' : 'Not Selected'}
                                                variant={selectedRequirements.includes(req.id) ? 'primaryNew' : 'muted'}
                                                className={
                                                    selectedRequirements.includes(req.id)
                                                        ? 'bg-gradient-to-r from-[#044866] to-[#0D5468] text-white border-0'
                                                        : 'bg-slate-200 text-slate-700'
                                                }
                                            />
                                        </div>

                                        <div className="space-y-3 mb-4">
                                            <div className="flex justify-between items-center">
                                                <Typography variant="small" className="text-slate-600">
                                                    Progress
                                                </Typography>
                                                <Typography variant="small" className="font-semibold text-slate-900">
                                                    {req.completed} /{' '}
                                                    {req.total} Hours
                                                </Typography>
                                            </div>
                                            <Progressbar
                                                value={
                                                    (req.completed /
                                                        req.total) *
                                                    100
                                                }
                                                size="sm"
                                            />
                                            <div className="flex items-center justify-between">
                                                <Typography variant="xs" className="text-slate-600">
                                                    {req.total -
                                                        req.completed}{' '}
                                                    hours remaining
                                                </Typography>
                                                <Typography variant="xs" className="font-semibold text-[#044866]">
                                                    {Math.round(
                                                        (req.completed /
                                                            req.total) *
                                                        100
                                                    )}
                                                    % Complete
                                                </Typography>
                                            </div>
                                        </div>

                                        <Separator className="my-3" />

                                        {/* Category-specific descriptions */}
                                        <div className="space-y-2">
                                            {req.id === 'acute-care' && (
                                                <div className="text-sm text-slate-700 space-y-2">
                                                    <Typography variant="small" className="leading-relaxed">
                                                        <strong>
                                                            Acute Care
                                                            placements
                                                        </strong>{' '}
                                                        provide exposure to
                                                        fast-paced hospital
                                                        environments where
                                                        students learn to
                                                        manage elderly
                                                        patients with acute
                                                        medical conditions,
                                                        post-operative care
                                                        needs, and complex
                                                        comorbidities
                                                        requiring intensive
                                                        monitoring.
                                                    </Typography>
                                                    <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 ml-2">
                                                        <li>
                                                            Hospital ward
                                                            rotations in
                                                            geriatric and
                                                            rehabilitation
                                                            units
                                                        </li>
                                                        <li>
                                                            Vital signs
                                                            monitoring and
                                                            deterioration
                                                            recognition
                                                        </li>
                                                        <li>
                                                            Medication
                                                            administration
                                                            under RN
                                                            supervision
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                            {req.id === 'community' && (
                                                <div className="text-sm text-slate-700 space-y-2">
                                                    <Typography variant="small" className="leading-relaxed">
                                                        <strong>
                                                            Community Health
                                                            placements
                                                        </strong>{' '}
                                                        focus on home-based
                                                        care delivery,
                                                        enabling students to
                                                        support older adults
                                                        to age in place with
                                                        dignity while
                                                        maintaining
                                                        independence and
                                                        community
                                                        connections.
                                                    </Typography>
                                                    <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 ml-2">
                                                        <li>
                                                            Home visits and
                                                            in-home support
                                                            services
                                                        </li>
                                                        <li>
                                                            Chronic disease
                                                            management and
                                                            health promotion
                                                        </li>
                                                        <li>
                                                            Collaboration
                                                            with allied
                                                            health
                                                            professionals
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                            {req.id === 'emergency' && (
                                                <div className="text-sm text-slate-700 space-y-2">
                                                    <Typography variant="small" className="leading-relaxed">
                                                        <strong>
                                                            Emergency
                                                            placements
                                                        </strong>{' '}
                                                        develop critical
                                                        assessment skills
                                                        and the ability to
                                                        respond effectively
                                                        to urgent situations
                                                        involving elderly
                                                        patients presenting
                                                        with falls, acute
                                                        confusion, or sudden
                                                        health
                                                        deterioration.
                                                    </Typography>
                                                    <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 ml-2">
                                                        <li>
                                                            Emergency
                                                            department
                                                            triage and
                                                            assessment
                                                        </li>
                                                        <li>
                                                            Crisis
                                                            intervention and
                                                            rapid response
                                                            protocols
                                                        </li>
                                                        <li>
                                                            Family support
                                                            during acute
                                                            care episodes
                                                        </li>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Assessment Criteria */}
                        <div className="p-5 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl">
                            <div className="flex items-start gap-3">
                                <div className="p-2 bg-emerald-100 rounded-lg">
                                    <Award className="h-5 w-5 text-emerald-600" />
                                </div>
                                <div>
                                    <Typography variant="h4" className="text-emerald-900 font-semibold mb-2">
                                        Assessment & Evaluation
                                    </Typography>
                                    <Typography variant="small" className="text-emerald-800 leading-relaxed">
                                        Students are assessed through direct
                                        observation, competency checklists,
                                        reflective practice journals, and
                                        supervisor evaluations. Successful
                                        completion requires demonstration of
                                        all required competencies to
                                        industry standards as outlined in
                                        the training package. Final sign-off
                                        must be completed by a qualified
                                        assessor before certification.
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollArea>

                <div className="flex justify-end pt-4 border-t mt-4">
                    <Button
                        variant="primaryNew"
                        onClick={onClose}
                        Icon={CheckCircle2}
                        text="Close"
                    />
                </div>
            </div>
        </GlobalModal>
    )
}

