import { ConfigTabs, TabConfig } from '@components'
import { Building2 } from 'lucide-react'
import { useState } from 'react'
import { IndustryHeader } from './component'
import { yourIndustriesData } from './data/mockData'
import { AddIndustryModal } from './modals'
import {
    ArchivedIndustries,
    NonPartnerIndustries,
    PendingIndustriesTab,
    SkiltrakNetwork,
    YourIndustriesTab,
    YourPartnerIndustries,
} from './tabs'
import { BlacklistedIndustry, Industry } from './types'

export const RtoUpdatedIndustries = () => {
    const [addIndustryOpen, setAddIndustryOpen] = useState(false)

    // Helper functions
    const getTotalCapacity = (industry: any) =>
        (
            industry.sectorCapacities ||
            industry.industrySectorCapacity ||
            []
        ).reduce((sum: number, sc: any) => sum + (Number(sc.capacity) || 0), 0)

    const getTotalPlacements = (industry: any) =>
        (
            industry.sectorCapacities ||
            industry.industrySectorCapacity ||
            []
        ).reduce(
            (sum: number, sc: any) =>
                sum + (Number(sc.currentPlacements || sc.enrolled) || 0),
            0
        )

    const getAvailablePositions = (industry: any) =>
        getTotalCapacity(industry) - getTotalPlacements(industry)

    // Calculate header stats
    const calculateHeaderStats = (data: any[]) => {
        const totalIndustries = data.length
        const verifiedIndustries = data.filter(
            (i) => i.status === 'verified' || i.user?.status === 'approved'
        ).length
        const pendingIndustries = data.filter(
            (i) => i.status === 'pending' || i.user?.status === 'pending'
        ).length

        return {
            totalIndustries,
            verifiedIndustries,
            pendingIndustries,
        }
    }

    // Action handlers
    const handleViewIndustry = (industry: any) => {
        console.log('View industry:', industry)
    }

    const handleViewBlacklisted = (industry: BlacklistedIndustry) => {
        console.log('View blacklisted industry:', industry)
    }

    const handleUnblock = (industry: BlacklistedIndustry) => {
        console.log('Unblock industry:', industry)
    }

    const handleExport = () => {
        console.log('Export industries')
    }

    const tabs: TabConfig[] = [
        {
            value: 'non-partner-industries',
            label: 'Non-Partner Industries',
            icon: Building2,
            component: () => <NonPartnerIndustries />,
        },
        {
            value: 'partner-industries',
            label: 'Your Partner Industries',
            icon: Building2,
            component: () => <YourPartnerIndustries />,
        },
        {
            value: 'pending-industries',
            label: 'Pending Industries',
            icon: Building2,
            component: () => <PendingIndustriesTab />,
        },
        {
            value: 'skiltrak-network',
            label: 'Skiltrak Network',
            icon: Building2,
            component: () => <SkiltrakNetwork />,
        },
        {
            value: 'archived-industries',
            label: 'Archived Industries',
            icon: Building2,
            component: () => <ArchivedIndustries />,
        },
    ]
    const stats = calculateHeaderStats(yourIndustriesData)

    return (
        <div className="space-y-4 animate-fade-in">
            <IndustryHeader
                totalIndustries={stats.totalIndustries}
                verifiedIndustries={stats.verifiedIndustries}
                pendingIndustries={stats.pendingIndustries}
                onAddIndustry={() => setAddIndustryOpen(true)}
                onExport={handleExport}
            />

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
