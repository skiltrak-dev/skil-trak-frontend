import {
    ConfigTabs,
    Filter,
    SubAdminIndustryFilter,
    TabConfig,
} from '@components'
import {
    Archive,
    Building2,
    CalendarClock,
    History,
    Moon,
    ShieldAlert,
    UserMinus,
} from 'lucide-react'
import { useState } from 'react'
import { IndustryCounts, IndustryHeader } from './components'
import {
    ArchivedIndustries,
    BlockedIndustries,
    FilteredIndustries,
    MonthlyCallsIndustries,
    NonPartnerIndustries,
    RejectedIndustries,
    SnoozedIndustries,
    YourPartnerIndustries,
} from './tabs'
//Layouts
import { SubadminIndustryFilter } from '@types'
import { removeEmptyValues } from '@utils'
import { SubAdminApi } from '@redux'

const filterKeys = [
    'name',
    'email',
    'phone',
    'address',
    'suburb',
    'state',
    'abn',
    'courseId',
    'isHiring',
    'isPartner',
    'subAdminId',
    'feature',
]

export const SubAdminUpdatedIndustries = () => {
    const [filterAction, setFilterAction] = useState(null)
    const [filter, setFilter] = useState<SubadminIndustryFilter>(
        {} as SubadminIndustryFilter
    )

    const count = SubAdminApi.Industry.getAllSubAdminIndustriesCount()

    const baseFilter = {
        ...filter,
    }

    const isFiltering = Object.keys(removeEmptyValues(filter)).length > 0

    const tabs: TabConfig[] = [
        {
            value: 'partner-industries',
            label: 'Partners',
            icon: Building2,
            count: count.data?.partnerIndustries,
            component: () => <YourPartnerIndustries baseFilter={baseFilter} />,
        },
        {
            value: 'non-partner-industries',
            label: 'Non-Partners',
            icon: Building2,
            count: count.data?.nonPartnerIndustries,
            component: () => <NonPartnerIndustries baseFilter={baseFilter} />,
        },
        {
            value: 'monthly-calls',
            label: 'Monthly Calls',
            icon: CalendarClock,
            count: count.data?.monthlyCalled,
            component: () => <MonthlyCallsIndustries baseFilter={baseFilter} />,
        },
        {
            value: 'snoozed-industries',
            label: 'Snoozed',
            icon: Moon,
            count: count.data?.snoozedIndustries,
            component: () => <SnoozedIndustries baseFilter={baseFilter} />,
        },
        {
            value: 'blocked-industries',
            label: 'Blocked',
            icon: ShieldAlert,
            count: count.data?.blockedIndustries,
            component: () => <BlockedIndustries baseFilter={baseFilter} />,
        },
        {
            value: 'rejected-industries',
            label: 'Rejected',
            icon: UserMinus,
            count: count.data?.rejectedIndustries,
            component: () => <RejectedIndustries baseFilter={baseFilter} />,
        },
        {
            value: 'archived-industries',
            label: 'Archived',
            icon: Archive,
            count: count.data?.archivedIndustries,
            component: () => <ArchivedIndustries baseFilter={baseFilter} />,
        },
    ]

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            {/* <IndustryHeader />
            <IndustryCounts /> */}

            <div className="bg-white rounded-2xl border border-border/50 shadow-premium-sm overflow-hidden">
                <div className="bg-slate-50/50 px-6 py-4 border-b border-border/50 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-slate-800">
                            Industry Directory
                        </h2>
                        <p className="text-sm text-muted-foreground">
                            {isFiltering
                                ? 'Showing search results for active filters'
                                : 'Browse and manage your industry partnerships'}
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        {filterAction}
                    </div>
                </div>

                <div className="px-4">
                    <Filter<SubadminIndustryFilter>
                        component={SubAdminIndustryFilter}
                        initialValues={filter}
                        setFilterAction={setFilterAction}
                        setFilter={setFilter}
                        filterKeys={filterKeys}
                    />
                </div>

                <div className="px-6 pb-6">
                    {isFiltering ? (
                        <div className="mt-4">
                            <FilteredIndustries baseFilter={baseFilter} />
                        </div>
                    ) : (
                        <div className="mt-4">
                            <ConfigTabs
                                tabs={tabs}
                                className="!rounded-none border-none shadow-none"
                                tabsClasses="!w-ful inline-flex h-10 items-center justify-center rounded-lg  p-1 text-muted-foreground"
                                tabsTriggerClasses="inline-flex items-center justify-center white-space-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
