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

    const extraHours = course?.extraHours

    const getWpPrograms = RtoV2Api.ApprovalRequest.getWpPrograms(
        {
            courseId: Number(course?.id),
            industryId: approval?.industry?.id,
        },
        {
            skip: !approval,
        }
    )

    const placementDetails = [
        {
            label: 'Placement Hours',
            value:
                extraHours && extraHours?.length > 0
                    ? extraHours[0]?.hours
                    : course?.hours,
            icon: Calendar,
            bgColor: 'bg-purple-50',
            borderColor: 'border-purple-100',
            iconColor: 'text-purple-600',
            textColor: 'text-purple-900',
            valueColor: 'text-purple-700',
        },
        {
            label: 'Capacity',
            value: approval?.industry?.industrySectorCapacity?.[0]?.capacity,
            icon: Users,
            bgColor: 'bg-emerald-50',
            borderColor: 'border-emerald-100',
            iconColor: 'text-emerald-600',
            textColor: 'text-emerald-900',
            valueColor: 'text-emerald-700',
        },
    ]

    return (
        <div className="space-y-[21px]">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-[21px] rounded-lg border-[1.76px] border-indigo-100 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-[14px]">
                    <div className="w-[42px] h-[42px] bg-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-md shadow-indigo-500/30 animate-scale-in">
                        <GraduationCap className="w-[21px] h-[21px] text-white" />
                    </div>
                    <div>
                        <h3 className="text-indigo-900 mb-1.5">
                            Stream (Blocks) Verified & Supported
                        </h3>
                        <p className="text-[12.3px] text-indigo-800 leading-relaxed">
                            qualification Stream (Blocks) confirmed with
                            verified capacity and unit support through
                            SkilTrak's internal verification process.
                        </p>
                    </div>
                </div>
            </div>

            {getWpPrograms.isError && (
                <NoData simple isError text="There is some technical error!" />
            )}
            {getWpPrograms.isLoading ? (
                <LoadingAnimation size={62} />
            ) : getWpPrograms?.isSuccess &&
              getWpPrograms?.data &&
              getWpPrograms?.data?.length ? (
                <Card className="border-[1.76px] border-slate-100 hover:shadow-md hover:border-[#044866]/20 transition-all space-y-1.5">
                    <div className="bg-gradient-to-r from-[#044866]/5 to-transparent p-[10.5px]">
                        <div className="flex items-center gap-[10.5px]">
                            <div className="w-[35px] h-[35px] bg-[#044866] rounded-md flex items-center justify-center flex-shrink-0 shadow-sm">
                                <GraduationCap className="w-[17.6px] h-[17.6px] text-white" />
                            </div>
                            <div className="flex-1">
                                <div className="text-[#044866]">
                                    {course?.title}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        {/* Units of Competency */}
                        <div className="flex items-center gap-1.5">
                            <BookOpen className="w-[14px] h-[14px] text-[#0D5468]" />
                            <h4 className="text-slate-900">Stream (Blocks)</h4>
                        </div>
                        <div className="space-y-1.5">
                            {getWpPrograms?.data?.map((getWpProgram) => (
                                <div
                                    key={getWpProgram?.id}
                                    className="bg-slate-50 p-[10.5px] rounded-md border border-slate-100 space-y-1.5"
                                >
                                    <div
                                        key={getWpProgram?.id}
                                        className="flex items-start gap-1.5 "
                                    >
                                        <CheckCircle2 className="w-[14px] h-[14px] text-emerald-600 mt-0.5 flex-shrink-0" />
                                        <span className="text-[12.3px] text-slate-700">
                                            {getWpProgram?.courseProgram?.title}
                                        </span>
                                    </div>

                                    {/*  */}
                                    <div className="bg-blue-50 p-[10.5px] rounded-md border border-blue-100">
                                        <div className="flex items-center gap-1.5 mb-1.5">
                                            <BookOpen className="w-[14px] h-[14px] text-blue-600" />
                                            <div className="text-[10.5px] text-blue-900">
                                                Delivery Mode
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-x-1.5">
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
                    <div className="grid grid-cols-2 gap-[14px] pt-[14px] border-t border-slate-100">
                        {placementDetails.map((detail, index) => {
                            const Icon = detail.icon
                            return (
                                <div
                                    key={index}
                                    className={`${detail.bgColor} p-[14px] rounded-md border ${detail.borderColor}`}
                                >
                                    <div className="flex items-center gap-1.5 mb-1.5">
                                        <Icon
                                            className={`w-[14px] h-[14px] ${detail.iconColor}`}
                                        />
                                        <div
                                            className={`text-[10.5px] ${detail.textColor}`}
                                        >
                                            {detail.label}
                                        </div>
                                    </div>
                                    <div
                                        className={`text-[12.3px] ${detail.valueColor}`}
                                    >
                                        {detail.value}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </Card>
            ) : (
                getWpPrograms.isSuccess && (
                    <NoData simple text="No Stream (Blocks) was found!" />
                )
            )}

            <Card className="bg-blue-50 border-[1.76px] border-blue-200">
                <p className="text-[12.3px] text-blue-900 leading-relaxed">
                    This Stream (Blocks) information is drawn from SkilTrak's
                    discussions with the employer and internal verification
                    process. It supports your assessment of whether the site can
                    effectively support your learners in line with their
                    qualification requirements.
                </p>
            </Card>
        </div>
    )
}
