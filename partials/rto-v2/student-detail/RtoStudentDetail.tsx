import {
    Appointments,
    Communications,
    RtoInfo,
    Schedule,
    StudentAssessmentDocuments,
    StudentHeader,
    StudentInfoMessage,
    StudentOverview,
    Tickets,
} from './components'

import {
    ConfigTabs,
    EmptyData,
    LoadingAnimation,
    TabConfig,
    TechnicalError,
} from '@components'
import { useGetSubAdminStudentDetailQuery } from '@queries'
import { setStudentDetail } from '@redux'
import { Student } from '@types'
import {
    Book,
    Building2,
    CalendarCheck,
    File,
    MessageSquare,
    Ticket,
} from 'lucide-react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { AllWorkplaces } from './components/AllWorkplaces/AllWorkplaces'

export const RtoStudentDetail = () => {
    const router = useRouter()

    const dispatch = useDispatch()

    const studentId = Number(router.query?.id)
    const profile = useGetSubAdminStudentDetailQuery(studentId, {
        skip: !studentId,
        refetchOnMountOrArgChange: 30,
    })

    useEffect(() => {
        if (profile?.data) {
            dispatch(setStudentDetail(profile?.data))
        }
    }, [profile?.data])

    const tabs: TabConfig[] = [
        {
            value: 'overview',
            label: 'Overview',
            icon: Book,
            // component: () => (
            //     <div className="space-y-[19.87px] mt-[19.87px]">
            //         <CourseOverview />
            //         <CourseProgress />
            //         <PlacementRequest />
            //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-[19.87px]">
            //             <WorkplaceBio />
            //             <CurrentStatus />
            //         </div>
            //     </div>
            // ),
            component: () => <StudentOverview />,
        },
        {
            value: 'workplace',
            icon: Building2,
            label: 'Workplace',
            component: () => <AllWorkplaces studentId={studentId} />,
        },
        {
            value: 'communications',
            icon: MessageSquare,
            label: 'Communications',
            component: () => (
                <Communications student={profile?.data as Student} />
            ),
        },
        {
            label: 'Schedule',
            value: 'schedule',
            icon: CalendarCheck,
            component: () => (
                <Schedule
                    selectedCourseId={
                        profile?.data?.courses?.[0]?.id?.toString() || ''
                    }
                />
            ),
        },
        {
            icon: File,
            value: 'documents',
            label: 'Documents',
            component: () => (
                <StudentAssessmentDocuments
                    student={profile?.data as Student}
                />
            ),
        },
        {
            value: 'appointments',
            icon: CalendarCheck,
            label: 'Appointments',
            component: () => (
                <Appointments student={profile?.data as Student} />
            ),
        },
        {
            value: 'tickets',
            label: 'Tickets',
            icon: Ticket,
            component: () => (
                <div>
                    <Tickets student={profile?.data as Student} />
                </div>
            ),
        },
    ]

    return (
        <>
            {profile?.isError ? <TechnicalError /> : null}

            {profile?.isLoading ? (
                <LoadingAnimation />
            ) : profile?.data && profile?.isSuccess ? (
                <div className="bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
                    {/* Header */}
                    <RtoInfo />

                    <main className="w-full mx-auto px-[13.25px] sm:px-[19.87px] lg:px-[26.5px] py-[19.87px] space-y-4">
                        <StudentHeader student={profile?.data} />
                        <StudentInfoMessage
                            studentUserId={profile?.data?.user?.id}
                        />

                        <ConfigTabs
                            tabs={tabs}
                            tabsClasses="bg-white"
                            tabsTriggerClasses="!py-2 data-[state=active]:!bg-primaryNew data-[state=active]:!text-white !text-[13px]"
                        />
                    </main>
                </div>
            ) : profile?.isSuccess ? (
                <EmptyData />
            ) : null}
        </>
    )
}
