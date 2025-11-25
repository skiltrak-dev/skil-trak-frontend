import {
    Badge,
    Card,
    EmptyData,
    InitialAvatar,
    LoadingAnimation,
    TechnicalError,
} from '@components'
import { SupervisorQualification } from '@partials/common'
import { RtoV2Api } from '@queries'
import { RtoApprovalWorkplaceRequest } from '@types'
import { User, GraduationCap, Briefcase, Mail, Phone } from 'lucide-react'

export function SupervisorInfo({
    approval,
}: {
    approval: RtoApprovalWorkplaceRequest
}) {
    const supervisors = RtoV2Api.ApprovalRequest.approvalRequestSupervisors(
        {
            industryId: approval?.industry?.id,
            courseId: approval?.workplaceRequest?.courses?.[0]?.id ?? 0,
        },
        {
            skip:
                !approval?.industry?.id ||
                !approval?.workplaceRequest?.courses?.[0]?.id,
        }
    )

    console.log({ supervisors })

    const qualificationLevel = (level: any) =>
        SupervisorQualification?.find((l) => l?.value === level)?.label

    return (
        <>
            {supervisors.isError && <TechnicalError />}
            {supervisors.isLoading ? (
                <LoadingAnimation height="h-[60vh]" />
            ) : supervisors?.data &&
              supervisors?.data?.length > 0 &&
              supervisors?.isSuccess ? (
                <div className="space-y-[1.32rem]">
                    {supervisors?.data?.map((supervisor: any) => (
                        <Card
                            key={supervisor?.id}
                            className="border-2 border-slate-100 hover:border-[#044866]/20 hover:shadow-xl transition-all group"
                        >
                            <div className="bg-gradient-to-r from-slate-50 to-white">
                                <div className="flex items-start gap-[0.88rem]">
                                    {supervisor?.name && (
                                        <InitialAvatar
                                            name={supervisor?.name}
                                            large
                                        />
                                    )}
                                    <div className="flex-1">
                                        <div className="text-[#044866] mb-[0.22rem] text-[0.88em]">
                                            {supervisor?.name}
                                        </div>
                                        <p className="text-[0.77em] text-slate-600">
                                            {supervisor?.role}
                                        </p>
                                        <Badge
                                            text={`${supervisor.experience} years of experience`}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 pt-[1.1rem]">
                                {/* Qualifications */}
                                <div>
                                    <div className="flex items-center gap-[0.44rem] mb-[0.66rem]">
                                        <GraduationCap className="w-[0.88rem] h-[0.88rem] text-[#0D5468]" />
                                        <h4 className="text-slate-900 text-[0.88em]">
                                            Qualifications
                                        </h4>
                                    </div>
                                    <div className="flex flex-wrap gap-[0.44rem] text-[0.88em]">
                                        {qualificationLevel(
                                            supervisor?.level
                                        ) || '--'}
                                    </div>
                                </div>

                                {/* Experience */}
                                <div className="bg-slate-50 p-[0.88rem] rounded-lg border border-slate-100">
                                    <div className="flex items-center gap-[0.44rem] mb-[0.44rem]">
                                        <Briefcase className="w-[0.88rem] h-[0.88rem] text-[#0D5468]" />
                                        <h4 className="text-slate-900 text-[0.88em]">
                                            Experience & Expertise
                                        </h4>
                                    </div>
                                    <p className="text-[0.77em] text-slate-700 leading-relaxed">
                                        {supervisor?.description || '--'}
                                    </p>
                                </div>

                                {/* Supervision Approach */}
                                <div className="bg-purple-50 p-[0.88rem] rounded-lg border border-purple-100">
                                    <div className="flex items-center gap-[0.44rem] mb-[0.44rem]">
                                        <User className="w-[0.88rem] h-[0.88rem] text-purple-600" />
                                        <h4 className="text-purple-900 text-[0.88em]">
                                            Supervision Approach
                                        </h4>
                                    </div>
                                    <p className="text-[0.77em] text-purple-800">
                                        Direct supervision with regular feedback
                                        sessions
                                    </p>
                                </div>

                                {/* Contact Information */}
                                <div className="pt-[0.88rem] border-t border-slate-100">
                                    <h4 className="text-slate-900 mb-[0.66rem] text-[0.77em]">
                                        Contact Information
                                    </h4>
                                    <div className="space-y-[0.44rem]">
                                        <div className="flex items-center gap-[0.66rem]">
                                            <Mail className="w-[0.88rem] h-[0.88rem] text-slate-400" />
                                            <a
                                                href={`mailto:${supervisor?.email}`}
                                                className="text-[0.77em] text-[#044866] hover:underline"
                                            >
                                                {supervisor?.email ||
                                                    approval?.industry?.user
                                                        ?.email ||
                                                    '--'}
                                            </a>
                                        </div>
                                        <div className="flex items-center gap-[0.66rem]">
                                            <Phone className="w-[0.88rem] h-[0.88rem] text-slate-400" />
                                            <span className="text-[0.77em] text-slate-700">
                                                {approval?.industry
                                                    ?.contactPersonNumber ||
                                                    '--'}
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-[0.66em] text-slate-500 mt-[0.66rem] italic">
                                        Available for coordination once
                                        placement commences
                                    </p>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            ) : (
                supervisors?.isSuccess && (
                    <EmptyData
                        title={'No Approved Student!'}
                        description={
                            'You have not approved any Student request yet'
                        }
                        height={'50vh'}
                    />
                )
            )}
        </>
    )
}
