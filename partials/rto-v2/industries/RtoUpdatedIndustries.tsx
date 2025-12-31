import { ConfigTabs, TabConfig } from '@components'
import { Building2 } from 'lucide-react'
import { useState } from 'react'
import { useDebounce } from '@hooks'
import { IndustryCounts, IndustryFilterBar, IndustryHeader } from './component'
import { AddIndustryModal } from './modals'
import {
    ArchivedIndustries,
    NonPartnerIndustries,
    PendingIndustriesTab,
    SkiltrakNetwork,
    YourPartnerIndustries,
} from './tabs'

export const RtoUpdatedIndustries = () => {
    const [addIndustryOpen, setAddIndustryOpen] = useState(false)
    const [filters, setFilters] = useState({
        searchTerm: '',
        courseId: 'all',
        filterStatus: 'all',
        stateFilter: 'all',
        placementReady: 'all',
    })

    const debouncedSearch = useDebounce(filters.searchTerm, 500)

    const handleFilterChange = (name: string, value: any) => {
        setFilters((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const tabFilters = {
        ...filters,
        searchTerm: debouncedSearch,
    }

    const tabs: TabConfig[] = [
        {
            value: 'non-partner-industries',
            label: 'Non-Partner Industries',
            icon: Building2,
            component: () => <NonPartnerIndustries {...tabFilters} />,
        },
        {
            value: 'partner-industries',
            label: 'Your Partner Industries',
            icon: Building2,
            component: () => <YourPartnerIndustries {...tabFilters} />,
        },
        {
            value: 'pending-industries',
            label: 'Pending Industries',
            icon: Building2,
            component: () => <PendingIndustriesTab {...tabFilters} />,
        },
        {
            value: 'skiltrak-network',
            label: 'Skiltrak Network',
            icon: Building2,
            component: () => <SkiltrakNetwork {...tabFilters} />,
        },
        {
            value: 'archived-industries',
            label: 'Archived Industries',
            icon: Building2,
            component: () => <ArchivedIndustries {...tabFilters} />,
        },
    ]

    return (
        <div className="space-y-4 animate-fade-in">
            <IndustryHeader />
            <IndustryCounts />
            <div className="bg-white p-4 rounded-xl border border-border/50 shadow-sm">
                <IndustryFilterBar
                    {...filters}
                    onFilterChange={handleFilterChange}
                />
            </div>

            {/* <TabNavigation tabs={tabs}>
                {({ header, element }: any) => (
                    <div>
                        <div>{header}</div>
                        <div className="mt-4">{element}</div>
                    </div>
                )}
            </TabNavigation> */}
            <ConfigTabs
                tabs={tabs}
                className="!rounded-none"
                tabsClasses="!rounded-md !p-1"
                tabsTriggerClasses="py-1.5 !rounded-md"
            />

            {addIndustryOpen && (
                <AddIndustryModal onClose={() => setAddIndustryOpen(false)} />
            )}
        </div>
    )
}
