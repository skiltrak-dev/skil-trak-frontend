import { useContextBar } from '@hooks'
import { IndustryApi } from '@queries'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { IndustryStudentProfileCB } from './ContextBar'
import { StudentSchedule } from '../currentStudents/tabs/detail/StudentSchedule'
import {
    Appointments,
    Notes,
} from '@partials/common/StudentProfileDetail/components'
import { IndustryStudentProfileDetail, StudentAssessments } from './components'
import { Card, Typography } from '@components'
import { IndustryResponse } from './components'
import { ProfileAppointments } from '@partials/common'

enum AssessmentEnum {
    'Student Submissions' = 'assessment',
    'Student Industry Response' = 'response',
}

export const IndustryCurrentStudents = () => {
    const router = useRouter()
    const [selectedId, setSelectedId] = useState<string>('')

    const [isAssessment, setIsAssessment] = useState<AssessmentEnum>(
        AssessmentEnum['Student Submissions']
    )

    const contextBar = useContextBar()

    const profile = IndustryApi.Workplace.useWorkplaceDetail(
        Number(router.query.id),
        { skip: !router.query.id }
    )

    // useEffect(() => {
    //     if (profile?.isSuccess && profile?.data) {
    //         contextBar.show(false)
    //         contextBar.setContent(
    //             <IndustryStudentProfileCB profile={profile?.data} />
    //         )
    //     }
    // }, [profile])
    // profile={profile?.data}

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
                    className={`${activeBorder(ProfileIds.Notes)} w-1/3`}
                >
                    <Notes userId={profile?.data?.student?.user?.id} />
                </div>
            </div>
            <div className="flex items-start gap-x-5 w-full">
                <div className="w-1/2">
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
                    } h-[inherit] w-1/2`}
                >
                    {/* <Appointments user={profile?.data?.user} /> */}
                    <ProfileAppointments
                        userId={profile?.data?.student?.user?.id}
                        link={'/portals/industry/students/appointments'}
                    />
                </div>
            </div>
        </div>
    )
}
