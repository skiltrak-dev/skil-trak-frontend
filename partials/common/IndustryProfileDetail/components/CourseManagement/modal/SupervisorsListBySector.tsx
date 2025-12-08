import {
    ActionButton,
    AuthorizedUserComponent,
    Badge,
    Card,
    EmptyData,
    InitialAvatar,
    NoData,
    Typography,
} from '@components'
import { UserRoles } from '@constants'
import { useContextBar } from '@hooks'
import { SupervisorQualification } from '@partials/common/IndustrySupervisor'
import { AddSupervisor } from '@partials/common/IndustrySupervisor/form'
import Image from 'next/image'
import { useState } from 'react'
import { MdModeEdit } from 'react-icons/md'
import { GraduationCap, Briefcase, User, Mail, Phone } from 'lucide-react'

export const SupervisorsListBySector = ({
    sector,
    industry,
    onCloseModal,
    getSupervisorBySector,
}: any) => {
    const [isAddSupervisor, setIsAddSupervisor] = useState(false)
    const contextBar = useContextBar()

    const supervisors = getSupervisorBySector?.data

    if (isAddSupervisor) {
        return <AddSupervisor industry={industry} sector={sector} />
    }

    return (
        <>
            <div className="flex justify-between items-center pt-7 pb-3">
                <div className="bg-gradient-to-r from-slate-50 to-white">
                    <Typography
                        variant="title"
                        semibold
                        className="text-[#044866]"
                    >
                        Supervisors
                    </Typography>
                </div>

                <div>
                    <ActionButton
                        variant="dark"
                        text="Add Supervisor"
                        onClick={() => setIsAddSupervisor(true)}
                    />
                </div>
            </div>

            {getSupervisorBySector?.isError ? (
                <NoData isError text={'There is some technical issue!'} />
            ) : null}

            {supervisors &&
            supervisors?.length > 0 &&
            getSupervisorBySector?.isSuccess ? (
                <div className="h-auto bg-gradient-to-br from-blue-50 to-indigo-100 w-[600px]">
                    <div className="container mx-auto p-2">
                        <div className=" space-y-2">
                            {supervisors?.map((supervisor: any) => {
                                const qualificationLevel =
                                    SupervisorQualification?.find(
                                        (level) =>
                                            level.value === supervisor?.level
                                    )
                                return (
                                    <Card className="relative border-2 border-slate-100 hover:border-[#044866]/20 hover:shadow-xl transition-all group">
                                        {/* Edit Button */}
                                        <div className="absolute top-4 right-4 z-10">
                                            <AuthorizedUserComponent
                                                roles={[
                                                    UserRoles.ADMIN,
                                                    UserRoles.SUBADMIN,
                                                ]}
                                                isAssociatedWithRto={false}
                                            >
                                                <ActionButton
                                                    variant="info"
                                                    Icon={MdModeEdit}
                                                    onClick={() => {
                                                        contextBar.setTitle(
                                                            'Edit Supervisor'
                                                        )
                                                        contextBar.show()
                                                        contextBar.setContent(
                                                            <AddSupervisor
                                                                edit
                                                                sector={sector}
                                                                industry={
                                                                    industry
                                                                }
                                                                initialValues={
                                                                    supervisor
                                                                }
                                                            />
                                                        )
                                                        onCloseModal()
                                                    }}
                                                />
                                            </AuthorizedUserComponent>
                                        </div>

                                        {/* Header Section */}
                                        <div className="bg-gradient-to-r from-slate-50 to-white">
                                            <div className="flex items-start gap-[0.88rem]">
                                                {supervisor?.name && (
                                                    <InitialAvatar
                                                        name={supervisor.name}
                                                        large
                                                    />
                                                )}
                                                <div className="flex-1">
                                                    <div className="text-[#044866] mb-[0.22rem] text-[0.88em] font-semibold">
                                                        {supervisor?.name}
                                                    </div>
                                                    <p className="text-[0.77em] text-slate-600">
                                                        {supervisor?.title ||
                                                            'Industry Supervisor'}
                                                    </p>
                                                    <Badge
                                                        text={`${
                                                            supervisor?.experience ||
                                                            '---'
                                                        }`}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-2 pt-[1.1rem]">
                                            {/* Qualifications */}
                                            <div>
                                                <div className="flex items-center gap-[0.44rem] mb-[0.66rem]">
                                                    <GraduationCap className="w-[0.88rem] h-[0.88rem] text-[#0D5468]" />
                                                    <h4 className="text-slate-900 text-[0.88em] font-semibold">
                                                        Qualifications
                                                    </h4>
                                                </div>
                                                <div className="flex flex-wrap gap-[0.44rem] text-[0.88em]">
                                                    {qualificationLevel?.label ||
                                                        '--'}
                                                </div>
                                            </div>

                                            {/* Experience */}
                                            <div className="bg-slate-50 p-[0.88rem] rounded-lg border border-slate-100">
                                                <div className="flex items-center gap-[0.44rem] mb-[0.44rem]">
                                                    <Briefcase className="w-[0.88rem] h-[0.88rem] text-[#0D5468]" />
                                                    <h4 className="text-slate-900 text-[0.88em] font-semibold">
                                                        Experience & Expertise
                                                    </h4>
                                                </div>
                                                <p className="text-[0.77em] text-slate-700 leading-relaxed">
                                                    {supervisor?.description ||
                                                        supervisor?.title ||
                                                        'Experienced industry professional providing guidance and supervision.'}
                                                </p>
                                            </div>

                                            {/* Supervision Approach */}
                                            <div className="bg-purple-50 p-[0.88rem] rounded-lg border border-purple-100">
                                                <div className="flex items-center gap-[0.44rem] mb-[0.44rem]">
                                                    <User className="w-[0.88rem] h-[0.88rem] text-purple-600" />
                                                    <h4 className="text-purple-900 text-[0.88em] font-semibold">
                                                        Supervision Approach
                                                    </h4>
                                                </div>
                                                <p className="text-[0.77em] text-purple-800">
                                                    Direct supervision with
                                                    regular feedback sessions
                                                </p>
                                            </div>

                                            {/* Contact Information */}
                                            <div className="pt-[0.88rem] border-t border-slate-100">
                                                <h4 className="text-slate-900 mb-[0.66rem] text-[0.77em] font-semibold">
                                                    Contact Information
                                                </h4>
                                                <div className="space-y-[0.44rem]">
                                                    <div className="flex items-center gap-[0.66rem]">
                                                        <Mail className="w-[0.88rem] h-[0.88rem] text-slate-400" />
                                                        <a
                                                            href={`mailto:${
                                                                supervisor?.email ||
                                                                industry?.user
                                                                    ?.email
                                                            }`}
                                                            className="text-[0.77em] text-[#044866] hover:underline"
                                                        >
                                                            {supervisor?.email ||
                                                                industry?.user
                                                                    ?.email ||
                                                                '--'}
                                                        </a>
                                                    </div>
                                                    <div className="flex items-center gap-[0.66rem]">
                                                        <Phone className="w-[0.88rem] h-[0.88rem] text-slate-400" />
                                                        <span className="text-[0.77em] text-slate-700">
                                                            {supervisor?.phone ||
                                                                industry?.contactPersonNumber ||
                                                                '--'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <p className="text-[0.66em] text-slate-500 mt-[0.66rem] italic">
                                                    Available for coordination
                                                    once placement commences
                                                </p>
                                            </div>
                                        </div>
                                    </Card>
                                )
                            })}
                        </div>
                    </div>
                </div>
            ) : getSupervisorBySector?.isSuccess ? (
                <EmptyData />
            ) : null}
        </>
    )
}
