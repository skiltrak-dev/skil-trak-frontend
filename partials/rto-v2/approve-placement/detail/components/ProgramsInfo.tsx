import { Badge, Card, LoadingAnimation, NoData } from '@components'
import { RtoV2Api } from '@queries'
import { RtoApprovalWorkplaceRequest } from '@types'
import {
    GraduationCap,
    BookOpen,
    Users,
    Calendar,
    CheckCircle2,
} from 'lucide-react'

export function ProgramsInfo({
    approval,
}: {
    approval: RtoApprovalWorkplaceRequest
}) {
    const course = approval?.workplaceRequest?.courses?.[0]
    const getWpPrograms = RtoV2Api.ApprovalRequest.getWpPrograms(
        {
            courseId: Number(course?.id),
            industryId: approval?.industry?.id,
        },
        {
            skip: !approval,
        }
    )
    const qualifications = [
        {
            id: 1,
            name: 'CHC33015 - Certificate III in Individual Support',
            skillSets: ['Ageing', 'Disability', 'Home and Community'],
            units: [
                'CHCCCS015 - Provide individualised support',
                'CHCCCS023 - Support independence and wellbeing',
                'CHCCOM005 - Communicate and work in health or community services',
                'CHCDIV001 - Work with diverse people',
            ],
            deliveryMode: 'Workplace-based',
            placementLength: '120 hours',
            capacity: '4-6 students per semester',
        },
        {
            id: 2,
            name: 'CHC43015 - Certificate IV in Ageing Support',
            skillSets: ['Ageing Support', 'Person-Centred Practice'],
            units: [
                'CHCAGE001 - Facilitate the empowerment of older people',
                'CHCAGE005 - Provide support to people living with dementia',
                'CHCCCS011 - Meet personal support needs',
            ],
            deliveryMode: 'Blended (workplace + online supervision)',
            placementLength: '160 hours',
            capacity: '2-4 students per semester',
        },
    ]

    console.log({ course })

    return (
        <div className="space-y-6">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border-2 border-indigo-100 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-500/30 animate-scale-in">
                        <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-indigo-900 mb-2">
                            Program Verified & Supported
                        </h3>
                        <p className="text-sm text-indigo-800 leading-relaxed">
                            qualification programs confirmed with verified
                            capacity and unit support through SkilTrak's
                            internal verification process.
                        </p>
                    </div>
                </div>
            </div>

            {getWpPrograms.isError && (
                <NoData simple isError text="There is some technical error!" />
            )}
            {getWpPrograms.isLoading ? (
                <LoadingAnimation size={70} />
            ) : getWpPrograms?.isSuccess &&
              getWpPrograms?.data &&
              getWpPrograms?.data?.length ? (
                <Card className="border-2 border-slate-100 hover:shadow-lg hover:border-[#044866]/20 transition-all space-y-2">
                    <div className="bg-gradient-to-r from-[#044866]/5 to-transparent p-3">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#044866] rounded-lg flex items-center justify-center flex-shrink-0 shadow-md">
                                <GraduationCap className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex-1">
                                <div className="text-[#044866]">
                                    {course?.title}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        {/* Units of Competency */}
                        <div className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-[#0D5468]" />
                            <h4 className="text-slate-900">Programs</h4>
                        </div>
                        <div className="space-y-2">
                            {getWpPrograms?.data?.map((getWpProgram) => (
                                <div
                                    key={getWpProgram?.id}
                                    className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-2"
                                >
                                    <div
                                        key={getWpProgram?.id}
                                        className="flex items-start gap-2 "
                                    >
                                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-sm text-slate-700">
                                            {getWpProgram?.courseProgram?.title}
                                        </span>
                                    </div>

                                    {/*  */}
                                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                                        <div className="flex items-center gap-2 mb-2">
                                            <BookOpen className="w-4 h-4 text-blue-600" />
                                            <div className="text-xs text-blue-900">
                                                Delivery Mode
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-x-2">
                                            {getWpProgram?.deliveryMode?.map(
                                                (mode) => (
                                                    <Badge
                                                        variant="primaryNew"
                                                        text={mode}
                                                    />
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Placement Details Grid */}
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                            <div className="flex items-center gap-2 mb-2">
                                <Calendar className="w-4 h-4 text-purple-600" />
                                <div className="text-xs text-purple-900">
                                    Placement Length
                                </div>
                            </div>
                            <div className="text-sm text-purple-700">
                                {course?.hours}
                            </div>
                        </div>

                        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                            <div className="flex items-center gap-2 mb-2">
                                <Users className="w-4 h-4 text-emerald-600" />
                                <div className="text-xs text-emerald-900">
                                    Capacity
                                </div>
                            </div>
                            <div className="text-sm text-emerald-700">
                                {
                                    approval?.industry
                                        ?.industrySectorCapacity?.[0]?.capacity
                                }
                            </div>
                        </div>
                    </div>
                </Card>
            ) : (
                getWpPrograms.isSuccess && (
                    <NoData simple text="No program was found!" />
                )
            )}

            <Card className="bg-blue-50 border-2 border-blue-200">
                <p className="text-sm text-blue-900 leading-relaxed">
                    This program information is drawn from SkilTrak's
                    discussions with the employer and internal verification
                    process. It supports your assessment of whether the site can
                    effectively support your learners in line with their
                    qualification requirements.
                </p>
            </Card>
        </div>
    )
}
