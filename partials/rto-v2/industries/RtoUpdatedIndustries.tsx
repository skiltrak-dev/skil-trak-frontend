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
    const [searchTerm, setSearchTerm] = useState('')
    const [courseId, setCourseId] = useState('all')
    const [filterStatus, setFilterStatus] = useState('all')
    const [stateFilter, setStateFilter] = useState('all')

    const debouncedSearch = useDebounce(searchTerm, 500)

    const filters = {
        searchTerm: debouncedSearch,
        courseId,
        filterStatus,
        stateFilter,
    }

    const tabs: TabConfig[] = [
        {
            value: 'non-partner-industries',
            label: 'Non-Partner Industries',
            icon: Building2,
            component: () => <NonPartnerIndustries {...filters} />,
        },
        {
            value: 'partner-industries',
            label: 'Your Partner Industries',
            icon: Building2,
            component: () => <YourPartnerIndustries {...filters} />,
        },
        {
            value: 'pending-industries',
            label: 'Pending Industries',
            icon: Building2,
            component: () => <PendingIndustriesTab {...filters} />,
        },
        {
            value: 'skiltrak-network',
            label: 'Skiltrak Network',
            icon: Building2,
            component: () => <SkiltrakNetwork {...filters} />,
        },
        {
            value: 'archived-industries',
            label: 'Archived Industries',
            icon: Building2,
            component: () => <ArchivedIndustries {...filters} />,
        },
    ]

    return (
        <div className="space-y-4 animate-fade-in">
            <IndustryHeader />
            <IndustryCounts />
            <div className="bg-white p-4 rounded-xl border border-border/50 shadow-sm">
                <IndustryFilterBar
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    courseId={courseId}
                    onCourseChange={(option: any) =>
                        setCourseId(option?.value || 'all')
                    }
                    filterStatus={filterStatus}
                    onStatusChange={(option: any) =>
                        setFilterStatus(option?.value || 'all')
                    }
                    filterState={stateFilter}
                    onStateChange={(option: any) =>
                        setStateFilter(option?.value || 'all')
                    }
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
