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
} from './components'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs'
import { AllWorkplaces } from './components/AllWorkplaces'

export const RtoStudentDetail = () => {
    const tabs = [
        {
            value: 'overview',
            label: 'Overview',
            content: (
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
            label: 'Workplace',
            content: (
                <div className="space-y-[19.87px] mt-[19.87px]">
                    <AllWorkplaces />
                    {/* <PlacementWorkflow /> */}
                </div>
            ),
        },
        {
            value: 'communications',
            label: 'Communications',
            content: (
                <div className="mt-[19.87px]">
                    <Communications />
                </div>
            ),
        },
        {
            value: 'schedule',
            label: 'Schedule',
            content: (
                <div className="mt-[19.87px]">
                    <Schedule />
                </div>
            ),
        },
        {
            value: 'documents',
            label: 'Documents',
            content: (
                <div className="mt-[19.87px]">
                    <Documents />
                </div>
            ),
        },
        {
            value: 'appointments',
            label: 'Appointments',
            content: (
                <div className="mt-[19.87px]">
                    <Appointments />
                </div>
            ),
        },
        {
            value: 'tickets',
            label: 'Tickets',
            content: (
                <div className="mt-[19.87px]">
                    <Tickets />
                </div>
            ),
        },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-[13.25px] sm:px-[19.87px] lg:px-[26.5px] py-[13.25px]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-[9.94px]">
                            <div className="w-[33.12px] h-[33.12px] rounded-xl bg-gradient-to-br from-[#044866] to-[#0D5468] flex items-center justify-center shadow-lg shadow-[#044866]/20">
                                <span className="text-white text-[14.9px]">
                                    📚
                                </span>
                            </div>
                            <div>
                                <h1 className="text-slate-900 text-[19.87px]">
                                    ITEC International
                                </h1>
                                <p className="text-slate-600 text-[11.59px] mt-[1.66px]">
                                    Training & Education Counsel
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-[9.94px]">
                            <div className="text-right">
                                <p className="text-[11.59px] text-slate-600">
                                    Coordinator
                                </p>
                                <p className="text-slate-900 text-[13.25px]">
                                    Daniel
                                </p>
                            </div>
                            <div className="w-[33.12px] h-[33.12px] rounded-xl bg-gradient-to-br from-[#044866] to-[#0D5468] flex items-center justify-center text-white shadow-lg shadow-[#044866]/20 ring-2 ring-white text-[13.25px]">
                                DC
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-[13.25px] sm:px-[19.87px] lg:px-[26.5px] py-[19.87px]">
                <StudentHeader />
                <ActionBanner />

                <Tabs defaultValue={tabs[0].value} className="mt-[19.87px]">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-200/60 shadow-xl shadow-slate-200/50 p-[6.62px] mb-[19.87px]">
                        <TabsList className="grid w-full grid-cols-7 gap-[6.62px] bg-transparent p-0">
                            {tabs.map((tab) => (
                                <TabsTrigger
                                    key={tab.value}
                                    value={tab.value}
                                    className="relative rounded-xl px-[13.25px] py-[9.94px] text-[11.59px] transition-all data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#044866] data-[state=active]:to-[#0D5468] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-[#044866]/30 hover:bg-slate-50 flex items-center justify-center gap-[6.62px] group"
                                >
                                    <div className="w-[6.62px] h-[6.62px] rounded-full bg-emerald-500 group-data-[state=active]:bg-white opacity-0 group-data-[state=active]:opacity-100 transition-opacity"></div>
                                    {tab.label}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                    </div>
                    {tabs.map((tab) => (
                        <TabsContent key={tab.value} value={tab.value}>
                            {tab.content}
                        </TabsContent>
                    ))}
                </Tabs>
            </main>
        </div>
    )
}
