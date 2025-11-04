import { Card, TabNavigation, TabProps } from '@components'
import { RtoLayoutV2 } from '@layouts'
import {
    PlacementRequestStats,
    StudentProvidedWorkplaceTab,
    StudentsNeedWorkplaceTab,
} from '@partials'
import { ActionRequiredHeader, Title } from '@partials/rto-v2/components'
import { RtoV2Api } from '@queries'
import {
    Briefcase,
    ClipboardCheck,
    Play,
    Sparkles,
    TrendingUp,
    User,
    Users,
} from 'lucide-react'
import { ReactElement } from 'react'

export const Appointments = () => {
    const tabs: TabProps[] = [
        {
            label: 'Upcoming Appointments',
            href: {
                pathname: 'appointments',
                query: { tab: 'upcoming' },
            },
            element: <>Upcoming Appointments</>,
        },
        {
            label: 'Past Appointments',
            href: {
                pathname: 'appointments',
                query: { tab: 'past' },
            },
            element: <>Past Appointments</>,
        },
    ]
    const count = RtoV2Api.PlacementRequests.useStudentPlacementRequestStats()

    return (
        <div className="">
            <ActionRequiredHeader
                icon={Briefcase}
                title="Student Placement Requests"
                description="Manage student placement requests, workplace matching, and eligibility verification"
                pendingLabel="High Priority"
                gradientFrom="[#044866]"
                gradientTo="[#044866]"
                iconGradient="from[#044866] to-[#044866]"
            />

            <PlacementRequestStats
                totalRequests={count?.data?.all || 0}
                needsWorkplaceCount={count?.data?.requested || 0}
                providedWorkplaceCount={count?.data?.provided || 0}
            // activePlacementsCount={10}
            />

            <Card
                noPadding
                className="border border-border/50 shadow-premium-lg"
            >
                <div className="border-b p-6">
                    <Title Icon={Briefcase} title="Placement Requests" />
                </div>

                <TabNavigation tabs={tabs}>
                    {({ header, element }: any) => (
                        <div>
                            <div>{header}</div>
                            <div className="p-4">{element}</div>
                        </div>
                    )}
                </TabNavigation>
            </Card>
        </div>
    )
}

Appointments.getLayout = (page: ReactElement) => {
    return <RtoLayoutV2>{page}</RtoLayoutV2>
}

export default Appointments
