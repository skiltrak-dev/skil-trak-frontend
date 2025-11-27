import {
    StudentHeader,
    ActionBanner,
    PlacementRequest,
    CourseOverview,
    CourseProgress,
    CurrentStatus,
    WorkplaceBio,
    WorkplaceDetails,
    PlacementWorkflow,
    Communications,
    Schedule,
    Documents,
    Appointments,
    Tickets,
    RtoInfo,
} from './components'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { AllWorkplaces } from './components/AllWorkplaces'
import {
    ConfigTabs,
    EmptyData,
    LoadingAnimation,
    TabConfig,
    TechnicalError,
} from '@components'
import {
    Book,
    Building2,
    CalendarCheck,
    File,
    MessageSquare,
    Ticket,
} from 'lucide-react'
import { useGetSubAdminStudentDetailQuery } from '@queries'
import { useRouter } from 'next/router'

export const RtoStudentDetail = () => {
    const router = useRouter()
    const studentId = Number(router.query?.id)
    const profile = useGetSubAdminStudentDetailQuery(studentId, {
        skip: !studentId,
        refetchOnMountOrArgChange: 30,
    })
    const tabs: TabConfig[] = [
        {
            value: 'overview',
            label: 'Overview',
            icon: Book,
            component: () => (
                <div className="space-y-[19.87px] mt-[19.87px]">
                    <CourseOverview />
                    <CourseProgress />
                    <PlacementRequest />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-[19.87px]">
                        <WorkplaceBio />
                        <CurrentStatus />
                    </div>
                </div>
            ),
        },
        {
            value: 'workplace',
            icon: Building2,
            label: 'Workplace',
            component: () => (
                <div className="space-y-[19.87px] mt-[19.87px]">
                    <AllWorkplaces />
                    {/* <PlacementWorkflow /> */}
                </div>
            ),
        },
        {
            value: 'communications',
            icon: MessageSquare,
            label: 'Communications',
            component: () => (
                <div className="mt-[19.87px]">
                    <Communications />
                </div>
            ),
        },
        {
            value: 'schedule',
            icon: CalendarCheck,
            label: 'Schedule',
            component: () => (
                <div className="mt-[19.87px]">
                    <Schedule
                        selectedCourseId={profile?.data?.courses?.[0]?.id?.toString() || ''}
                    />
                </div>
            ),
        },
        {
            value: 'documents',
            icon: File,
            label: 'Documents',
            component: () => (
                <div className="mt-[19.87px]">
                    <Documents />
                </div>
            ),
        },
        {
            value: 'appointments',
            icon: CalendarCheck,
            label: 'Appointments',
            component: () => (
                <div className="mt-[19.87px]">
                    <Appointments />
                </div>
            ),
        },
        {
            value: 'tickets',
            label: 'Tickets',
            icon: Ticket,
            component: () => (
                <div className="mt-[19.87px]">
                    <Tickets />
                </div>
            ),
        },
    ]

    return (
        <>
            {profile?.isError ? <TechnicalError /> : null}

            {profile?.isLoading || profile?.isFetching ? (
                <LoadingAnimation />
            ) : profile?.data && profile?.isSuccess ? (
                <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
                    {/* Header */}
                    <RtoInfo />

                    <main className="max-w-7xl mx-auto px-[13.25px] sm:px-[19.87px] lg:px-[26.5px] py-[19.87px]">
                        <StudentHeader student={profile?.data} />
                        <ActionBanner />

                        <ConfigTabs
                            tabs={tabs}
                            className="mt-4"
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
