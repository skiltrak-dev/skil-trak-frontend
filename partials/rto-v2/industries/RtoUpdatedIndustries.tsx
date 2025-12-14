import { useState } from 'react'
import { ConfigTabs, TabConfig, TabNavigation } from '@components'
import { IndustryHeader } from './component'
import { AddIndustryModal } from './modals'
import {
    YourIndustriesTab,
    GlobalDirectoryTab,
    PendingIndustriesTab,
    BlacklistedTab,
    FutureIndustriesTab,
} from './tabs'
import { Industry, PendingIndustryFull, BlacklistedIndustry } from './types'
import {
    yourIndustriesData,
    globalIndustriesData,
    blacklistedIndustriesData,
    futureIndustriesData,
    pendingIndustriesData,
} from './data/mockData'
import { Building2 } from 'lucide-react'

export const RtoUpdatedIndustries = () => {
    const [addIndustryOpen, setAddIndustryOpen] = useState(false)

    // Helper functions
    const getTotalCapacity = (industry: Industry) =>
        industry.sectorCapacities.reduce((sum, sc) => sum + sc.capacity, 0)

    const getTotalPlacements = (industry: Industry) =>
        industry.sectorCapacities.reduce(
            (sum, sc) => sum + sc.currentPlacements,
            0
        )

    const getAvailablePositions = (industry: Industry) =>
        getTotalCapacity(industry) - getTotalPlacements(industry)

    // Calculate header stats
    const calculateHeaderStats = (data: Industry[]) => {
        const totalIndustries = data.length
        const verifiedIndustries = data.filter(
            (i) => i.status === 'verified'
        ).length
        const pendingIndustries = data.filter(
            (i) => i.status === 'pending'
        ).length

        return {
            totalIndustries,
            verifiedIndustries,
            pendingIndustries,
        }
    }

    // Action handlers
    const handleViewIndustry = (industry: Industry) => {
        console.log('View industry:', industry)
    }

    const handleViewPending = (industry: PendingIndustryFull) => {
        console.log('View pending industry:', industry)
    }

    const handleViewBlacklisted = (industry: BlacklistedIndustry) => {
        console.log('View blacklisted industry:', industry)
    }

    const handleEdit = (industry: Industry) => {
        console.log('Edit industry:', industry)
    }

    const handleDelete = (industry: Industry) => {
        console.log('Delete industry:', industry)
    }

    const handleApproveCourses = (industry: PendingIndustryFull) => {
        console.log('Approve courses for:', industry)
    }

    const handleUnblock = (industry: BlacklistedIndustry) => {
        console.log('Unblock industry:', industry)
    }

    const handleExport = () => {
        console.log('Export industries')
    }

    const tabs: TabConfig[] = [
        {
            value: 'your-industries',
            label: 'Your Industries',
            icon: Building2,
            component: () => <YourIndustriesTab />,
        },
        {
            value: 'global-directory',
            label: 'Global Directory',
            icon: Building2,
            component: () => (
                <GlobalDirectoryTab
                    data={globalIndustriesData}
                    getTotalCapacity={getTotalCapacity}
                    getTotalPlacements={getTotalPlacements}
                    getAvailablePositions={getAvailablePositions}
                    onView={handleViewIndustry}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            ),
        },
        {
            label: 'Future Industries',
            value: 'future-industries',
            icon: Building2,
            component: () => <FutureIndustriesTab />,
        },
        {
            value: 'pending',
            label: 'Pending',
            icon: Building2,
            component: () => (
                <PendingIndustriesTab
                    data={pendingIndustriesData}
                    onView={handleViewPending}
                    onApproveCourses={handleApproveCourses}
                />
            ),
        },
        {
            label: 'Blacklisted',
            value: 'black-industries',
            icon: Building2,
            component: () => (
                <BlacklistedTab
                    data={blacklistedIndustriesData}
                    onView={handleViewBlacklisted}
                    onUnblock={handleUnblock}
                />
            ),
        },
    ]
    const tabss = [
        {
            label: 'Your Industries',
            href: { pathname: 'industries', query: { tab: 'your-industries' } },
            badge: { text: yourIndustriesData.length },
            element: (
                <YourIndustriesTab
                    data={yourIndustriesData}
                    getTotalCapacity={getTotalCapacity}
                    getTotalPlacements={getTotalPlacements}
                    getAvailablePositions={getAvailablePositions}
                    onView={handleViewIndustry}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            ),
        },
        {
            label: 'Global Directory',
            href: {
                pathname: 'industries',
                query: { tab: 'global-directory' },
            },
            badge: { text: globalIndustriesData.length },
            element: (
                <GlobalDirectoryTab
                    data={globalIndustriesData}
                    getTotalCapacity={getTotalCapacity}
                    getTotalPlacements={getTotalPlacements}
                    getAvailablePositions={getAvailablePositions}
                    onView={handleViewIndustry}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            ),
        },
        {
            label: 'Future Industries',
            href: {
                pathname: 'industries',
                query: { tab: 'future-industries' },
            },
            badge: { text: futureIndustriesData.length },
            element: <FutureIndustriesTab />,
        },
        {
            label: 'Pending',
            href: { pathname: 'industries', query: { tab: 'pending' } },
            badge: { text: pendingIndustriesData.length },
            element: () => (
                <PendingIndustriesTab
                    data={pendingIndustriesData}
                    onView={handleViewPending}
                    onApproveCourses={handleApproveCourses}
                />
            ),
        },
        {
            label: 'Blacklisted',
            href: { pathname: 'industries', query: { tab: 'blacklisted' } },
            badge: { text: blacklistedIndustriesData.length },
            element: (
                <BlacklistedTab
                    data={blacklistedIndustriesData}
                    onView={handleViewBlacklisted}
                    onUnblock={handleUnblock}
                />
            ),
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
