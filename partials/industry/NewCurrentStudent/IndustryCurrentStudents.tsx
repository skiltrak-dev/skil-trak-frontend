import { Card, EmptyData, LoadingAnimation, TechnicalError } from '@components'
import { Notes, ProfileAppointments } from '@partials/common'
import { IndustryApi } from '@queries'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { StudentSchedule } from '../currentStudents/tabs/detail/StudentSchedule'
import { IndustryStudentProfileDetail, StudentAssessments } from './components'

export const IndustryCurrentStudents = () => {
    const router = useRouter()
    const [selectedId, setSelectedId] = useState<string>('')

    const profile = IndustryApi.Workplace.useWorkplaceDetail(
        Number(router.query.id),
        { skip: !router.query.id }
    )

    enum ProfileIds {
        Workplace = 'workplace',
        Notes = 'notes',
        'Assessment Evidence' = 'assessments',
        Mails = 'mails',
        'All Communications' = 'allCommunication',
        Appointments = 'appointments',
        Tickets = 'tickets',
        Schedule = 'schedule',
    }

    const activeBorder = (key: ProfileIds) =>
        selectedId === key ? 'border-2 border-primary rounded-xl' : ''

    return (
        <>
            {profile?.isError ? <TechnicalError /> : null}
            {profile?.isLoading ? (
                <LoadingAnimation />
            ) : profile?.data && profile?.isSuccess ? (
                <div className="flex flex-col gap-y-5 w-full">
                    <IndustryStudentProfileDetail data={profile} />
                    {/* <div className="flex items-center gap-x-2.5">
                {Object.entries(AssessmentEnum).map(([key, value]: any) => (
                    <div
                        className={`w-48 py-3 flex justify-center rounded-md shadow-md bold cursor-pointer ${
                            isAssessment === value
                                ? 'bg-primaryNew text-white'
                                : 'bg-white border border-primaryNew'
                        }`}
                        onClick={() => {
                            setIsAssessment(value)
                        }}
                    >
                        <Typography
                            variant="small"
                            center
                            color={`${
                                isAssessment === value
                                    ? 'text-white'
                                    : 'text-primaryNew'
                            }`}
                            semibold
                        >
                            {key}{' '}
                        </Typography>
                    </div>
                ))}
            </div> */}
                    <div className="flex items-start gap-x-6 w-full">
                        {/* <div
                    className={`${activeBorder(
                        ProfileIds['Assessment Evidence']
                    )}`}
                    id={`student-profile-${ProfileIds['Assessment Evidence']}`}
                >
                    {isAssessment === AssessmentEnum['Student Submissions'] ? (
                        <StudentAssessments profile={profile?.data} />
                    ) 
                    : (
                        <IndustryResponse profile={profile?.data} />
                    )}
                </div> */}
                        <div className="w-2/3 overflow-auto custom-scrollbar h-[31rem]">
                            <StudentAssessments profile={profile?.data} />
                        </div>
                        <div
                            id={`student-profile-${ProfileIds.Notes}`}
                            className={`${activeBorder(
                                ProfileIds.Notes
                            )} w-1/3`}
                        >
                            <Notes userId={profile?.data?.student?.user?.id} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 w-full">
                        <div className="lg:col-span-2">
                            <Card noPadding>
                                <StudentSchedule
                                    workplace={profile?.data}
                                    student={profile?.data?.student}
                                    course={profile?.data?.courses?.[0]}
                                />
                            </Card>
                        </div>

                        <div
                            id={`student-profile-${ProfileIds.Appointments}`}
                            className={`${
                                selectedId === ProfileIds.Appointments
                                    ? 'border-2 border-primary'
                                    : ''
                            } h-[inherit] `}
                        >
                            <ProfileAppointments
                                userId={profile?.data?.student?.user?.id}
                                link={'/portals/industry/students/appointments'}
                            />
                        </div>
                    </div>
                </div>
            ) : profile?.isSuccess ? (
                <EmptyData
                    title="No Student!"
                    description="No Student was found!"
                />
            ) : null}
        </>
    )
}
