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
import { StudentAssessments } from './components'
import { Typography } from '@components'
import { IndustryResponse } from './components'

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

    useEffect(() => {
        if (profile?.isSuccess && profile?.data) {
            contextBar.show(false)
            contextBar.setContent(
                <IndustryStudentProfileCB profile={profile?.data} />
            )
        }
    }, [profile])

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
        <div className="flex flex-col gap-y-3">
            <div className="flex items-center gap-x-2.5">
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
            </div>
            <div
                className={`${activeBorder(ProfileIds['Assessment Evidence'])}`}
                id={`student-profile-${ProfileIds['Assessment Evidence']}`}
            >
                {isAssessment === AssessmentEnum['Student Submissions'] ? (
                    <StudentAssessments profile={profile?.data} />
                ) : (
                    <IndustryResponse profile={profile?.data} />
                )}
            </div>
            <div
                className={`h-[500px] overflow-hidden grid grid-cols-2 gap-x-3 `}
            >
                <div
                    id={`student-profile-${ProfileIds.Appointments}`}
                    className={`${
                        selectedId === ProfileIds.Appointments
                            ? 'border-2 border-primary'
                            : ''
                    }`}
                >
                    <Appointments user={profile?.data?.user} />
                </div>
                <div
                    id={`student-profile-${ProfileIds.Notes}`}
                    className={`${activeBorder(ProfileIds.Notes)}`}
                >
                    <Notes userId={profile?.data?.user?.id} />
                </div>
            </div>
            <StudentSchedule
                workplace={profile?.data}
                student={profile?.data?.student}
                course={profile?.data?.courses?.[0]}
            />
        </div>
    )
}
