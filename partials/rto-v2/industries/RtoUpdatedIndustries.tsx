import { useState } from 'react'
import { TabNavigation } from '@components'
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

export function RtoUpdatedIndustries() {
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

    const tabs = [
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
            element: (
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

            <TabNavigation tabs={tabs}>
                {({ header, element }: any) => (
                    <div>
                        <div>{header}</div>
                        <div className="mt-4">{element}</div>
                    </div>
                )}
            </TabNavigation>

            {addIndustryOpen && (
                <AddIndustryModal onClose={() => setAddIndustryOpen(false)} />
            )}
        </div>
    )
}
