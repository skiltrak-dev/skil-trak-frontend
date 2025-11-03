import { TabNavigation, TabProps } from '@components'
import { RtoLayoutV2 } from '@layouts'
import { PlacementRequestStats, StudentProvidedWorkplaceTab, StudentsNeedWorkplaceTab } from '@partials'
import { ActionRequiredHeader } from '@partials/rto-v2/components'
import { RtoV2Api } from '@queries'
import { Briefcase, ClipboardCheck, Play, Sparkles, TrendingUp, User, Users } from 'lucide-react'
import { ReactElement } from 'react'

export const PlacementRequests = () => {
    const tabs: TabProps[] = [
        {
            label: 'Student Need Workplace',
            href: { pathname: 'placement-requests', query: { tab: 'student-need-wp' } },
            element: <StudentsNeedWorkplaceTab />,
        },
        {
            label: 'Student Provided Workplace',
            href: {
                pathname: 'placement-requests',
                query: { tab: 'student-provided-wp' },
            },
            element: <StudentProvidedWorkplaceTab />,
        },
    ]
    const count = RtoV2Api.PlacementRequests.useStudentPlacementRequestStats()
    const stats = [
        {
            label: "Total Requests",
            value: count?.data?.all || 0,
            icon: Users,
            gradient: "from-primary/15 via-primary/10 to-primary/5",
            iconBg: "from-primary to-[#044866]",
            iconColor: "text-primary",
            ringColor: "ring-primary/20",
        },
        {
            label: "Need Workplace",
            value: count?.data?.requested || 0,
            icon: Sparkles,
            gradient: "from-[#F7A619]/15 via-[#F7A619]/10 to-[#F7A619]/5",
            iconBg: "from-[#F7A619] to-[#F7A619]",
            iconColor: "text-[#F7A619]",
            ringColor: "ring-[#F7A619]/20",
        },
        {
            label: "Provided Workplace",
            value: count?.data?.provided || 0,
            icon: ClipboardCheck,
            gradient: "from-secondary/15 via-secondary/10 to-secondary/5",
            iconBg: "from-secondary to-[#0D5468]",
            iconColor: "text-secondary",
            ringColor: "ring-secondary/20",
        },
        // {
        //     label: "Active Placements",
        //     value: 7,
        //     icon: Play,
        //     gradient: "from-success/15 via-success/10 to-success/5",
        //     iconBg: "from-success to-emerald-600",
        //     iconColor: "text-success",
        //     ringColor: "ring-success/20",
        // },
    ];
    return (
        <div className="">
            <ActionRequiredHeader
                icon={Briefcase}
                title="Student Placement Requests"
                description="Manage student placement requests, workplace matching, and eligibility verification"
                // urgentCount={criticalCount}
                // urgentLabel="Critical Issue(s)"
                // pendingCount={highCount}
                pendingLabel="High Priority"
                // warningMessage="<strong>Urgent:</strong> These issues are blocking student placements and require immediate coordinator intervention. Delays in resolution may impact student progress and compliance timelines."
                gradientFrom="[#044866]"
                gradientTo="[#044866]"
                iconGradient="from[#044866] to-[#044866]"
            />
            {/* <div className="relative">
                <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-primaryNew/5 via-[#F7A619]/5 to-secondaryNew/5 rounded-full blur-3xl pointer-events-none" />

                <div className="relative flex items-start justify-between">
                    <div className="space-y-3">
                        <div className="flex items-center gap-4">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-primaryNew to-secondaryNew rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
                                <div className="relative h-16 w-16 rounded-2xl bg-gradient-to-br from-primaryNew via-primaryNew to-secondaryNew flex items-center justify-center shadow-premium group-hover:shadow-premium-lg transition-all group-hover:scale-105">
                                    <Briefcase className="h-8 w-8 text-white" strokeWidth={2.5} />
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-white/0 via-white/10 to-white/30" />
                                </div>
                            </div>

                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-400 via-gray-400 to-gray-400/70 bg-clip-text mb-1">
                                    Student Placement Requests
                                </h1>
                                <p className="text-gray-500 font-medium">
                                    Manage student placement requests, workplace matching, and eligibility verification
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <PlacementRequestStats
                totalRequests={count?.data?.all || 0}
                needsWorkplaceCount={count?.data?.requested || 0}
                providedWorkplaceCount={count?.data?.provided || 0}
            // activePlacementsCount={10}
            />
            <TabNavigation tabs={tabs}>
                {({ header, element }: any) => (
                    <div>
                        <div>{header}</div>
                        <div className="p-4">{element}</div>
                    </div>
                )}
            </TabNavigation>
        </div>
    )
}

PlacementRequests.getLayout = (page: ReactElement) => {
    return <RtoLayoutV2>{page}</RtoLayoutV2>
}

export default PlacementRequests
