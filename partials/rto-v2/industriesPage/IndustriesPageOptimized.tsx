import { useState, useMemo } from 'react'
import { ConfigTabs } from '../../../components/ConfigTabs'
import { useNotification } from '../../../hooks/useNotification'

// Types
import {
    Industry,
    NetworkType,
    SharedNetworkRadius,
    TabValue,
    IndustryStats,
} from './types/industry.types'

// Data
import {
    yourIndustriesData,
    pendingIndustriesData,
    listedIndustriesData,
    industryReadinessData,
    partnersData,
} from './data/industriesData'

// Components
import { NetworkSelectionScreen } from './components/NetworkSelectionScreen'
import { PageHeader } from './components/PageHeader'
import { StatsCards } from './cards/StatsCards'
import { SearchFilters } from './components/SearchFilters'
import { IndustryListView } from './components/IndustryListView'

// Modals
import { IndustryDetailsDialog } from './modals/IndustryDetailsDialog'
import { TermsConditionsDialog } from './modals/TermsConditionsDialog'
import { CreditPurchaseDialog } from './modals/CreditPurchaseDialog'
import { AddIndustryDialog } from './modals/AddIndustryDialog'

export const IndustriesPageOptimized = () => {
    // Network & Credit System
    const [networkType, setNetworkType] = useState<NetworkType>(null)
    const [sharedNetworkRadius, setSharedNetworkRadius] =
        useState<SharedNetworkRadius>(null)
    const [workplaceCredits, setWorkplaceCredits] = useState(10)
    const [termsAccepted, setTermsAccepted] = useState(false)
    const [showTermsDialog, setShowTermsDialog] = useState(false)
    const [showCreditPurchaseDialog, setShowCreditPurchaseDialog] =
        useState(false)

    // UI State
    const [activeTab, setActiveTab] = useState<string>('industry-readiness')
    const [addIndustryOpen, setAddIndustryOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [filterSector, setFilterSector] = useState('all')
    const [filterStatus, setFilterStatus] = useState('all')
    const [filterLocation, setFilterLocation] = useState('all')
    const [filterCapacity, setFilterCapacity] = useState('all')
    const [archivedIndustries, setArchivedIndustries] = useState<string[]>([])

    // Selected industry for details view
    const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(
        null
    )
    const [showDetailsDialog, setShowDetailsDialog] = useState(false)

    const { notification } = useNotification()

    // Archive handlers
    const handleArchiveIndustry = (id: string) => {
        setArchivedIndustries((prev) => [...prev, id])
        notification.success({
            title: 'Archived',
            description: 'Industry archived successfully',
        })
    }

    const handleUnarchiveIndustry = (id: string) => {
        setArchivedIndustries((prev) => prev.filter((archId) => archId !== id))
        notification.success({
            title: 'Restored',
            description: 'Industry restored successfully',
        })
    }

    // Network selection handler
    const handleNetworkSelect = (
        type: NetworkType,
        radius: SharedNetworkRadius
    ) => {
        if (type === 'shared' && !termsAccepted) {
            setNetworkType(type)
            setSharedNetworkRadius(radius)
            setShowTermsDialog(true)
        } else {
            setNetworkType(type)
            setSharedNetworkRadius(radius)
            notification.success({
                title:
                    type === 'private'
                        ? 'Private Network activated!'
                        : 'Shared Network activated!',
                description:
                    type === 'private'
                        ? 'You can now add your industry partners.'
                        : 'Access to thousands of verified industries.',
            })
        }
    }

    // Terms acceptance handler
    const handleTermsAcceptAndContinue = () => {
        setShowTermsDialog(false)
        notification.success({
            title: 'Terms Accepted',
            description: 'Shared Network is now active.',
        })
    }

    // Credit purchase handler
    const handleCreditPurchase = (amount: number) => {
        setWorkplaceCredits((prev) => prev + amount)
    }

    // Get unique locations (memoized)
    const allLocations = useMemo(
        () =>
            Array.from(
                new Set(
                    yourIndustriesData.map(
                        (ind) => ind.location.split(', ')[1] || ind.location
                    )
                )
            ),
        []
    )

    // Filter industries (excluding archived) - memoized
    const activeIndustries = useMemo(
        () =>
            yourIndustriesData.filter(
                (ind) => !archivedIndustries.includes(ind.id)
            ),
        [archivedIndustries]
    )

    const archived = useMemo(
        () =>
            yourIndustriesData.filter((ind) =>
                archivedIndustries.includes(ind.id)
            ),
        [archivedIndustries]
    )

    const filteredIndustries = useMemo(() => {
        return activeIndustries.filter((industry) => {
            const matchesSearch =
                industry.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                industry.location
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                industry.sector.toLowerCase().includes(searchTerm.toLowerCase())

            const matchesSector =
                filterSector === 'all' || industry.sector === filterSector

            const matchesStatus =
                filterStatus === 'all' ||
                (filterStatus === 'ready' && industry.placementReady) ||
                (filterStatus === 'not-ready' && !industry.placementReady)

            const matchesLocation =
                filterLocation === 'all' ||
                industry.location.includes(filterLocation)

            const capacityPercentage =
                industry.placementsTotal > 0
                    ? (industry.placementsActive / industry.placementsTotal) *
                      100
                    : 0
            const matchesCapacity =
                filterCapacity === 'all' ||
                (filterCapacity === 'high' && capacityPercentage >= 80) ||
                (filterCapacity === 'medium' &&
                    capacityPercentage >= 50 &&
                    capacityPercentage < 80) ||
                (filterCapacity === 'low' && capacityPercentage < 50)

            return (
                matchesSearch &&
                matchesSector &&
                matchesStatus &&
                matchesLocation &&
                matchesCapacity
            )
        })
    }, [
        activeIndustries,
        searchTerm,
        filterSector,
        filterStatus,
        filterLocation,
        filterCapacity,
    ])

    const filteredArchived = useMemo(() => {
        return archived.filter((industry) => {
            const matchesSearch =
                industry.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                industry.location
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                industry.sector.toLowerCase().includes(searchTerm.toLowerCase())
            return matchesSearch
        })
    }, [archived, searchTerm])

    // Filtered data for other tabs
    const filteredListedIndustries = useMemo(() => {
        return listedIndustriesData.filter((industry) => {
            const matchesSearch =
                industry.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                industry.location
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                industry.sector.toLowerCase().includes(searchTerm.toLowerCase())
            return matchesSearch
        })
    }, [searchTerm])

    const filteredIndustryReadiness = useMemo(() => {
        return industryReadinessData.filter((industry) => {
            const matchesSearch =
                industry.name
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                industry.location
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                industry.sector.toLowerCase().includes(searchTerm.toLowerCase())
            return matchesSearch
        })
    }, [searchTerm])

    const stats: IndustryStats = useMemo(
        () => ({
            total: activeIndustries.length,
            ready: activeIndustries.filter((i) => i.placementReady).length,
            pending: pendingIndustriesData.length,
            archived: archivedIndustries.length,
            totalPlacements: activeIndustries.reduce(
                (acc, i) => acc + i.placementsActive,
                0
            ),
            capacity:
                Math.round(
                    (activeIndustries.reduce(
                        (acc, i) => acc + i.placementsActive,
                        0
                    ) /
                        activeIndustries.reduce(
                            (acc, i) => acc + i.placementsTotal,
                            0
                        )) *
                        100
                ) || 0,
            listedNotSignedUp: listedIndustriesData.length,
            industryReadiness: industryReadinessData.length,
            partners: partnersData.length,
        }),
        [activeIndustries, archivedIndustries.length]
    )

    const handleViewDetails = (industry: Industry) => {
        setSelectedIndustry(industry)
        setShowDetailsDialog(true)
    }

    const handleClearFilters = () => {
        setFilterSector('all')
        setFilterStatus('all')
        setFilterLocation('all')
        setFilterCapacity('all')
    }

    // Show network selection if not selected
    if (!networkType) {
        return <NetworkSelectionScreen onNetworkSelect={handleNetworkSelect} />
    }

    const renderFilters = () => (
        <div className="mt-5 mb-5">
            <SearchFilters
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                filterSector={filterSector}
                onFilterSectorChange={setFilterSector}
                filterStatus={filterStatus}
                onFilterStatusChange={setFilterStatus}
                filterLocation={filterLocation}
                onFilterLocationChange={setFilterLocation}
                filterCapacity={filterCapacity}
                onFilterCapacityChange={setFilterCapacity}
                allLocations={allLocations}
                onClearFilters={handleClearFilters}
            />
        </div>
    )

    const tabs = [
        {
            value: 'listed-not-signed-up',
            label: 'Listed Industries',
            count: stats.listedNotSignedUp,
            component: () => (
                <div>
                    {renderFilters()}
                    <IndustryListView
                        industries={filteredListedIndustries}
                        onViewDetails={handleViewDetails}
                        emptyMessage="No listed industries at this time. These are industries that clicked 'Recruit Now' from your Industry Readiness Table."
                    />
                </div>
            ),
        },
        {
            value: 'industry-readiness',
            label: 'Non Partner',
            count: stats.industryReadiness,
            component: () => (
                <div>
                    {renderFilters()}
                    <IndustryListView
                        industries={filteredIndustryReadiness}
                        onViewDetails={handleViewDetails}
                        emptyMessage="No non-partner industries found. These are signed-up industries working towards becoming partners."
                    />
                </div>
            ),
        },
        {
            value: 'your-industries',
            label: 'Your Industries',
            count: stats.total,
            component: () => (
                <div>
                    {renderFilters()}
                    <IndustryListView
                        industries={filteredIndustries}
                        onViewDetails={handleViewDetails}
                        onArchive={handleArchiveIndustry}
                        emptyMessage="No industries found matching your filters. Try adjusting your search criteria or add new industries."
                    />
                </div>
            ),
        },
        {
            value: 'pending',
            label: 'Pending',
            count: stats.pending,
            component: () => (
                <div>
                    {/* Pending probably doesn't strictly need search filters as per original code, but keeping consistency if desired. Original had filters outside, so they applied. */}
                    {renderFilters()}
                    <IndustryListView
                        industries={pendingIndustriesData}
                        onViewDetails={handleViewDetails}
                        emptyMessage="No pending industries. Industries appear here when they're awaiting verification."
                    />
                </div>
            ),
        },
        {
            value: 'shared-network',
            label: 'Shared Network',
            component: () => (
                <div>
                    {renderFilters()}
                    <div className="text-center py-16">
                        <p className="text-muted-foreground">
                            Shared Network integration coming soon. Use credits
                            to access verified industries across Australia.
                        </p>
                    </div>
                </div>
            ),
        },
        {
            value: 'archived',
            label: 'Archived',
            count: stats.archived,
            component: () => (
                <div>
                    {renderFilters()}
                    <IndustryListView
                        industries={filteredArchived}
                        onViewDetails={handleViewDetails}
                        onUnarchive={handleUnarchiveIndustry}
                        isArchived={true}
                        emptyMessage="No archived industries. Industries you archive will appear here."
                    />
                </div>
            ),
        },
    ]

    return (
        <div className="space-y-5 p-5">
            <PageHeader
                networkType={networkType}
                workplaceCredits={workplaceCredits}
                onAddIndustry={() => setAddIndustryOpen(true)}
                onPurchaseCredits={() => setShowCreditPurchaseDialog(true)}
            />

            <StatsCards stats={stats} />

            <ConfigTabs
                value={activeTab}
                onValueChange={(value) => setActiveTab(value)}
                tabs={tabs}
            />

            {/* Dialogs */}
            <AddIndustryDialog
                open={addIndustryOpen}
                onClose={() => setAddIndustryOpen(false)}
            />

            <IndustryDetailsDialog
                open={showDetailsDialog}
                onOpenChange={setShowDetailsDialog}
                industry={selectedIndustry}
            />

            <TermsConditionsDialog
                open={showTermsDialog}
                onOpenChange={setShowTermsDialog}
                termsAccepted={termsAccepted}
                onTermsAccept={setTermsAccepted}
                onAcceptAndContinue={handleTermsAcceptAndContinue}
            />

            <CreditPurchaseDialog
                open={showCreditPurchaseDialog}
                onOpenChange={setShowCreditPurchaseDialog}
                onPurchase={handleCreditPurchase}
            />
        </div>
    )
}
