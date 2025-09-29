import React, {
    useState,
    useEffect,
    useCallback,
    useMemo,
    ReactElement,
} from 'react'

import {
    MdArrowBack,
    MdLocationOn,
    MdBusiness,
    MdOpenInNew,
    MdWarning,
    MdClose,
    MdCheckCircle,
    MdDescription,
    MdSearch,
    MdLanguage,
    MdVisibility,
    MdVpnKey,
    MdStorage,
    MdBlock,
    MdExpandMore,
    MdExpandLess,
} from 'react-icons/md'

import { MapView } from './MapView'
import { THEME_COLORS, getTypeColor, getTypeStyle } from './utils/theme'
import {
    findKeywordMatches,
    hasSignificantKeywordMatch,
    type KeywordMatch,
} from './utils/keywordMatcher'
import {
    checkSkilTrakMatch,
    type SkilTrakMatch,
} from './utils/skilTrakDatabase'
import { formatAddressWithCode, getRegionInfo } from './utils/addressCodes'
import { Alert, Badge, Button, Typography } from '@components'
import {
    BlacklistWarningModal,
    CompanyProfileModal,
    ConfirmationModal,
} from '../../modal'

interface ResultsDisplayProps {
    onBack: () => void
    onClose?: () => void
    selectedSector?: number
}

interface CompanyAnalysis {
    keywordMatches: KeywordMatch[]
    skilTrakMatch: SkilTrakMatch | null
    addressCode: string
    regionInfo: { region: string; postcode: string }
    hasKeywordMatch: boolean
    hasSkilTrakMatch: boolean
}

const mockResults = [
    {
        distance: '≤ 2 km',
        companies: [
            {
                id: 'comp-1',
                name: 'Sunset Gardens Aged Care',
                type: 'Private',
                address: '123 Collins Street, Melbourne VIC',
                website: 'https://sunsetgardens.com.au',
                lat: -37.8136,
                lng: 144.9631,
            },
            {
                id: 'comp-2',
                name: 'Melbourne Central Care',
                type: 'Not-for-profit',
                address: '456 Bourke Street, Melbourne VIC',
                website: 'https://melbournecentralcare.org.au',
                lat: -37.8102,
                lng: 144.9628,
            },
        ],
    },
    {
        distance: '≤ 5 km',
        companies: [
            {
                id: 'comp-3',
                name: 'Richmond Care Facility',
                type: 'Public',
                address: '789 Swan Street, Richmond VIC',
                website: 'https://richmondcare.vic.gov.au',
                lat: -37.8197,
                lng: 144.9967,
            },
            {
                id: 'comp-4',
                name: 'Hawthorn Health Services',
                type: 'Private',
                address: '321 Burke Road, Hawthorn VIC',
                website: 'https://hawthornhealth.com.au',
                lat: -37.822,
                lng: 145.0362,
            },
            {
                id: 'comp-5',
                name: 'Prahran Community Care Centre',
                type: 'Government',
                address: '654 Chapel Street, Prahran VIC',
                website: 'https://prahrancare.vic.gov.au',
                lat: -37.8467,
                lng: 144.9961,
            },
        ],
    },
    {
        distance: '≤ 10 km',
        companies: [
            {
                id: 'comp-6',
                name: 'Springvale Aged Living Centre',
                type: 'Private',
                address: '987 Springvale Road, Springvale VIC',
                website: 'https://springvaleaging.com.au',
                lat: -37.9505,
                lng: 145.1508,
            },
        ],
    },
]

// Mock existing database entries for duplicate checking
const existingDatabase = [
    {
        name: 'Sunset Gardens Aged Care',
        address: '123 Collins Street, Melbourne VIC',
    },
    {
        name: 'Melbourne Central Care Facility', // Similar name
        address: '456 Bourke Street, Melbourne VIC',
    },
    {
        name: 'Richmond Community Care',
        address: '789 Swan Street, Richmond VIC', // Same address, different name
    },
]

// Function to check for duplicates
const checkForDuplicates = (company: any) => {
    return existingDatabase.some((existing) => {
        // Exact address match
        const addressMatch =
            existing.address.toLowerCase() === company.address.toLowerCase()

        // Fuzzy name match (simple word overlap check)
        const companyWords = company.name.toLowerCase().split(' ')
        const existingWords = existing.name.toLowerCase().split(' ')
        const commonWords = companyWords.filter(
            (word: any) => existingWords.includes(word) && word.length > 3 // Ignore short words
        )
        const nameMatch = commonWords.length >= 2 // At least 2 common significant words

        return addressMatch || nameMatch
    })
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
    onBack,
    onClose,
    selectedSector = 'aged-care',
}) => {
    const [duplicates, setDuplicates] = useState<Set<string>>(new Set())
    const [removedItems, setRemovedItems] = useState<Set<string>>(new Set())
    const [blacklistedItems, setBlacklistedItems] = useState<Set<string>>(
        new Set()
    )
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [itemToRemove, setItemToRemove] = useState<string>('')
    const [removalReason, setRemovalReason] = useState<
        'duplicate' | 'not-eligible' | 'keyword-match'
    >('duplicate')
    const [selectedLocationId, setSelectedLocationId] = useState<string>('')
    const [isMapExpanded, setIsMapExpanded] = useState(false)
    const [companyAnalyses, setCompanyAnalyses] = useState<
        Map<string, CompanyAnalysis>
    >(new Map())
    const [selectedCompany, setSelectedCompany] = useState<any>(null)

    const totalCompanies = mockResults.reduce(
        (sum, group) => sum + group.companies.length,
        0
    )

    // Transform companies for map display
    const mapLocations = useMemo(
        () =>
            mockResults.flatMap((group) =>
                group.companies
                    .filter((company) => !removedItems.has(company.id))
                    .map((company) => ({
                        id: company.id,
                        name: company.name,
                        type: company.type,
                        address: company.address,
                        lat: company.lat,
                        lng: company.lng,
                        distance: group.distance,
                    }))
            ),
        [removedItems]
    )

    // Analyze companies on component mount
    useEffect(() => {
        const foundDuplicates = new Set<string>()
        const analyses = new Map<string, CompanyAnalysis>()

        mockResults.forEach((group) => {
            group.companies.forEach((company) => {
                // Check for duplicates
                if (checkForDuplicates(company)) {
                    foundDuplicates.add(company.id)
                }

                // Analyze company
                const keywordMatches = findKeywordMatches(
                    company.name,
                    company.address,
                    selectedSector as any
                )
                const skilTrakMatch = checkSkilTrakMatch(
                    company.name,
                    company.address
                )
                const addressCode = formatAddressWithCode(company.address)
                const regionInfo = getRegionInfo(company.address)

                analyses.set(company.id, {
                    keywordMatches,
                    skilTrakMatch,
                    addressCode,
                    regionInfo,
                    hasKeywordMatch: hasSignificantKeywordMatch(keywordMatches),
                    hasSkilTrakMatch: skilTrakMatch !== null,
                })
            })
        })

        setDuplicates(foundDuplicates)
        setCompanyAnalyses(analyses)
    }, [selectedSector])

    const onCancel = useCallback(() => setModal(null), [])

    const handleConfirmBlacklist = useCallback(() => {
        if (itemToRemove) {
            setRemovedItems((prev) => new Set([...prev, itemToRemove]))
            setBlacklistedItems((prev) => new Set([...prev, itemToRemove]))

            const reasonText =
                removalReason === 'duplicate'
                    ? 'duplicate'
                    : removalReason === 'not-eligible'
                    ? 'eligibility issue'
                    : 'keyword match'
            // toast.warning(`Company blacklisted due to ${reasonText}`, {
            //     duration: 3000,
            // })

            setModal(null)
            setItemToRemove('')
            setRemovalReason('duplicate')
        }
    }, [itemToRemove, removalReason])

    const handleRemoveItem = useCallback(
        (
            companyId: string,
            reason: 'duplicate' | 'not-eligible' | 'keyword-match'
        ) => {
            const analysis = companyAnalyses.get(companyId)

            // Check if company has significant matches that require blacklist warning
            if (
                analysis?.hasKeywordMatch ||
                analysis?.hasSkilTrakMatch ||
                reason === 'keyword-match'
            ) {
                setItemToRemove(companyId)
                setRemovalReason(reason)
                setModal(
                    <BlacklistWarningModal
                        onCancel={onCancel}
                        onConfirmBlacklist={handleConfirmBlacklist}
                        itemToRemove={companyId}
                        removalReason={reason}
                        mockResults={mockResults}
                        companyAnalyses={companyAnalyses}
                    />
                )
            } else {
                setRemovedItems((prev) => new Set([...prev, companyId]))
                // toast.success('Company removed from listing', {
                //     duration: 2000,
                // })
            }
        },
        [companyAnalyses, onCancel, handleConfirmBlacklist]
    )

    const toggleMapExpanded = useCallback(() => {
        setIsMapExpanded((prev) => !prev)
    }, [])

    const handleLocationSelect = useCallback((locationId: string) => {
        setSelectedLocationId(locationId)
    }, [])

    const handleViewProfile = useCallback(
        (company: any) => {
            setSelectedCompany(company)
            setModal(
                <CompanyProfileModal
                    onCancel={onCancel}
                    selectedCompany={company}
                />
            )
        },
        [onCancel]
    )

    const handleVisitWebsite = useCallback((company: any) => {
        // Open company website
        window.open(company.website, '_blank')

        // toast.success(`Opening website for ${company.name}`, {
        //     duration: 2000,
        // })
    }, [])

    const activeItems = totalCompanies - removedItems.size

    const handleConfirmSubmit = useCallback(async () => {
        setModal(null)
        setIsSubmitting(true)

        // Calculate submission stats
        const totalItems = totalCompanies
        const removedCount = removedItems.size
        const addedCount = totalItems - removedCount
        const skippedDuplicates = Array.from(duplicates).filter((id) =>
            removedItems.has(id)
        ).length

        // Simulate submission delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        setIsSubmitting(false)

        // Show success toast
        // toast.success(
        //     `Successfully added ${addedCount} companies to Industry Listing!`,
        //     {
        //         duration: 3000,
        //     }
        // )
    }, [totalCompanies, removedItems.size, duplicates])

    const handleClosePage = useCallback(() => {
        setModal(null)
        if (onClose) {
            onClose()
        }
    }, [onClose])

    const handleFindMoreIndustries = useCallback(() => {
        setModal(null)
        onBack()
    }, [onBack])

    const handleSubmit = useCallback(() => {
        setModal(
            <ConfirmationModal
                onCancel={onCancel}
                activeItems={activeItems}
                onConfirmSubmit={handleConfirmSubmit}
                onFindMoreIndustries={handleFindMoreIndustries}
            />
        )
    }, [onCancel, activeItems, handleConfirmSubmit, handleFindMoreIndustries])

    const duplicateCount = duplicates.size

    return (
        <div className="space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500 px-10 pb-10">
            {modal}

            <style>{`
        @keyframes slide-down-fade {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-up-fade {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-down-fade {
          animation: slide-down-fade 0.5s ease-out;
        }
        .animate-slide-up-fade {
          animation: slide-up-fade 0.3s ease-out;
        }
      `}</style>
            {/* Header */}
            <div className="flex items-center justify-between">
                <Button
                    outline
                    onClick={onBack}
                    variant="primaryNew"
                    Icon={MdArrowBack}
                    text="Back to Filters"
                />

                <div className="text-right">
                    <Typography variant="small" color="text-gray-500">
                        Discovery Complete
                    </Typography>
                    <div
                        className="bg-clip-text text-transparent"
                        style={{
                            backgroundImage:
                                'linear-gradient(to right, #044866, #0D5468)',
                        }}
                    >
                        <Typography
                            variant="title"
                            color="bg-clip-text text-transparent"
                        >
                            {totalCompanies} companies found
                        </Typography>
                    </div>
                </div>
            </div>

            {/* Map Toggle Button */}
            <div className="flex items-center justify-between">
                <Button
                    outline
                    variant="primaryNew"
                    onClick={toggleMapExpanded}
                >
                    <div className="flex items-center gap-x-1">
                        <MdLocationOn className="w-4 h-4" />
                        <span>Workplace Locations</span>
                        {isMapExpanded ? (
                            <MdExpandLess className="w-4 h-4" />
                        ) : (
                            <MdExpandMore className="w-4 h-4" />
                        )}
                    </div>
                </Button>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                        <MdVpnKey
                            className="w-4 h-4"
                            style={{ color: THEME_COLORS.accent }}
                        />
                        <Typography variant="small" color="text-gray-600">
                            {
                                Array.from(companyAnalyses.values()).filter(
                                    (a) => a.hasKeywordMatch
                                ).length
                            }{' '}
                            keyword matches
                        </Typography>
                    </div>
                    <div className="flex items-center gap-1">
                        <MdStorage
                            className="w-4 h-4"
                            style={{ color: '#ef4444' }}
                        />
                        <Typography variant="small" color="text-gray-600">
                            {
                                Array.from(companyAnalyses.values()).filter(
                                    (a) => a.hasSkilTrakMatch
                                ).length
                            }{' '}
                            maybe not eligible
                        </Typography>
                    </div>
                </div>
            </div>

            {/* Map View - Expandable */}
            {isMapExpanded && (
                <div className="animate-in fade-in-0 slide-in-from-top-2 duration-300">
                    <MapView
                        locations={mapLocations}
                        selectedLocationId={selectedLocationId}
                        onLocationSelect={handleLocationSelect}
                    />
                </div>
            )}

            {/* Duplicate Warning Banner */}
            {duplicateCount > 0 && (
                <Alert
                    variant="warning"
                    autoDismiss={false}
                    description="Review before submitting."
                    title={`${duplicateCount} possible duplicates found.`}
                />
            )}

            {/* Summary Stats */}
            <div
                className="grid grid-cols-3 gap-4 p-3 rounded-lg"
                style={{
                    background:
                        'linear-gradient(to right, rgba(4, 72, 102, 0.1), rgba(247, 166, 25, 0.1))',
                }}
            >
                <div className="text-center">
                    <div
                        className="text-xl bg-clip-text text-transparent"
                        style={{
                            backgroundImage:
                                'linear-gradient(to right, #044866, #0D5468)',
                        }}
                    >
                        {totalCompanies}
                    </div>
                    <Typography variant="small" color="text-gray-600">
                        Total Found
                    </Typography>
                </div>
                <div className="text-center">
                    <div
                        className="text-xl bg-clip-text text-transparent"
                        style={{
                            backgroundImage:
                                'linear-gradient(to right, #F7A619, #044866)',
                        }}
                    >
                        {activeItems}
                    </div>
                    <Typography variant="small" color="text-gray-600">
                        Ready to Add
                    </Typography>
                </div>
                <div className="text-center">
                    <div
                        className="text-xl bg-clip-text text-transparent"
                        style={{
                            backgroundImage:
                                'linear-gradient(to right, #F7A619, #0D5468)',
                        }}
                    >
                        {duplicateCount}
                    </div>
                    <Typography variant="small" color="text-gray-600">
                        Possible Duplicates
                    </Typography>
                </div>
            </div>

            {/* Results by Distance */}
            <div className="space-y-4">
                {mockResults.map((distanceGroup, groupIndex) => (
                    <div
                        key={distanceGroup.distance}
                        className="space-y-2 animate-slide-down-fade"
                        style={{ animationDelay: `${groupIndex * 0.1}s` }}
                    >
                        <div className="flex items-center gap-3">
                            <MdLocationOn
                                className="w-5 h-5"
                                style={{ color: '#044866' }}
                            />
                            <Typography variant="title">
                                {distanceGroup.distance}
                            </Typography>
                            <div className="ml-auto">
                                <Badge
                                    variant="secondary"
                                    text={`${distanceGroup.companies.length} companies`}
                                />
                            </div>
                        </div>

                        <div className="space-y-1 pl-6">
                            {distanceGroup.companies
                                .filter(
                                    (company) => !removedItems.has(company.id)
                                )
                                .map((company, companyIndex) => {
                                    const isDuplicate = duplicates.has(
                                        company.id
                                    )
                                    const analysis = companyAnalyses.get(
                                        company.id
                                    )
                                    const isBlacklisted = blacklistedItems.has(
                                        company.id
                                    )

                                    return (
                                        <div
                                            key={`${groupIndex}-${companyIndex}`}
                                            className="animate-slide-up-fade"
                                            style={{
                                                animationDelay: `${
                                                    groupIndex * 0.1 +
                                                    companyIndex * 0.05
                                                }s`,
                                            }}
                                        >
                                            <div
                                                className={`hover:shadow-md transition-all relative border rounded-lg bg-white shadow-sm cursor-pointer ${
                                                    selectedLocationId ===
                                                    company.id
                                                        ? 'ring-2 ring-opacity-50'
                                                        : ''
                                                }`}
                                                style={
                                                    isDuplicate
                                                        ? {
                                                              borderColor:
                                                                  'rgba(247, 166, 25, 0.3)',
                                                              backgroundColor:
                                                                  'rgba(247, 166, 25, 0.05)',
                                                          }
                                                        : selectedLocationId ===
                                                          company.id
                                                        ? {
                                                              borderColor:
                                                                  THEME_COLORS.accent,
                                                              backgroundColor:
                                                                  'rgba(247, 166, 25, 0.05)',
                                                              //   ringColor:
                                                              //       THEME_COLORS.accent,
                                                          }
                                                        : {}
                                                }
                                                onClick={() =>
                                                    handleLocationSelect(
                                                        company.id
                                                    )
                                                }
                                            >
                                                <div className="py-3 pb-1 px-4">
                                                    <div className="flex items-start justify-between gap-3">
                                                        <div className="space-y-1 flex-1 min-w-0">
                                                            <div className="flex items-center gap-2 flex-wrap">
                                                                <h3 className="text-sm truncate font-medium">
                                                                    {
                                                                        company.name
                                                                    }
                                                                </h3>

                                                                {/* Icons for different match types */}
                                                                <div className="flex items-center gap-1">
                                                                    {analysis?.hasKeywordMatch && (
                                                                        <div className="flex items-center gap-1">
                                                                            <MdVpnKey
                                                                                className="w-3 h-3"
                                                                                style={{
                                                                                    color: THEME_COLORS.accent,
                                                                                }}
                                                                            />
                                                                            <Typography variant="xxs">
                                                                                {' '}
                                                                                Keyword
                                                                                match
                                                                            </Typography>
                                                                        </div>
                                                                    )}

                                                                    {analysis?.hasSkilTrakMatch && (
                                                                        <div className="flex items-center gap-1">
                                                                            <MdStorage
                                                                                className="w-3 h-3"
                                                                                style={{
                                                                                    color: '#ef4444',
                                                                                }}
                                                                            />
                                                                            <Typography
                                                                                variant="xxs"
                                                                                color="text-[#ef4444]"
                                                                            >
                                                                                Maybe
                                                                                not
                                                                                eligible
                                                                            </Typography>
                                                                        </div>
                                                                    )}

                                                                    {isDuplicate && (
                                                                        <div className="flex items-center gap-1">
                                                                            <MdWarning
                                                                                className="w-3 h-3"
                                                                                style={{
                                                                                    color: THEME_COLORS.accent,
                                                                                }}
                                                                            />
                                                                            <Typography
                                                                                variant="xxs"
                                                                                color="text-primaryNew"
                                                                            >
                                                                                Possible
                                                                                duplicate
                                                                            </Typography>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <div className="flex items-center gap-1">
                                                                <MdLocationOn className="w-3 h-3 flex-shrink-0" />
                                                                <Typography
                                                                    variant="xs"
                                                                    color="text-gray-600"
                                                                >
                                                                    <span className="truncate">
                                                                        {analysis?.addressCode ||
                                                                            company.address}
                                                                    </span>
                                                                </Typography>
                                                                <Badge
                                                                    variant="primaryNew"
                                                                    text={
                                                                        analysis
                                                                            ?.regionInfo
                                                                            .postcode +
                                                                        ''
                                                                    }
                                                                />
                                                            </div>

                                                            <div className="flex items-center gap-1">
                                                                <MdLanguage className="w-3 h-3 flex-shrink-0" />
                                                                <Typography
                                                                    variant="xs"
                                                                    color="text-gray-500"
                                                                >
                                                                    <span className="truncate">
                                                                        {
                                                                            company.website
                                                                        }
                                                                    </span>
                                                                </Typography>
                                                            </div>

                                                            {/* Keyword matches display */}
                                                            {analysis?.keywordMatches &&
                                                                analysis
                                                                    .keywordMatches
                                                                    .length >
                                                                    0 && (
                                                                    <div className="flex flex-wrap gap-1 mt-1">
                                                                        {analysis.keywordMatches
                                                                            .slice(
                                                                                0,
                                                                                3
                                                                            )
                                                                            .map(
                                                                                (
                                                                                    match,
                                                                                    idx
                                                                                ) => (
                                                                                    <Badge
                                                                                        key={
                                                                                            idx
                                                                                        }
                                                                                        outline
                                                                                        variant="secondary"
                                                                                        text={
                                                                                            match.keyword
                                                                                        }
                                                                                    />
                                                                                )
                                                                            )}
                                                                        {analysis
                                                                            .keywordMatches
                                                                            .length >
                                                                            3 && (
                                                                            <Typography
                                                                                variant="xs"
                                                                                color="text-gray-400"
                                                                            >
                                                                                +
                                                                                {analysis
                                                                                    .keywordMatches
                                                                                    .length -
                                                                                    3}{' '}
                                                                                more
                                                                            </Typography>
                                                                        )}
                                                                    </div>
                                                                )}
                                                        </div>
                                                        <div className="flex items-center gap-1 flex-shrink-0">
                                                            {(isDuplicate ||
                                                                analysis?.hasSkilTrakMatch ||
                                                                analysis?.hasKeywordMatch) && (
                                                                <div className="flex flex-col gap-1">
                                                                    {isDuplicate && (
                                                                        <Badge
                                                                            outline
                                                                            onClick={(
                                                                                e
                                                                            ) => {
                                                                                e.stopPropagation()
                                                                                handleRemoveItem(
                                                                                    company.id,
                                                                                    'duplicate'
                                                                                )
                                                                            }}
                                                                            variant="primary"
                                                                            text={
                                                                                'Remove Duplicate'
                                                                            }
                                                                            Icon={
                                                                                MdClose
                                                                            }
                                                                        />
                                                                    )}
                                                                    {analysis?.hasSkilTrakMatch && (
                                                                        <Badge
                                                                            outline
                                                                            onClick={(
                                                                                e: any
                                                                            ) => {
                                                                                e.stopPropagation()
                                                                                handleRemoveItem(
                                                                                    company.id,
                                                                                    'not-eligible'
                                                                                )
                                                                            }}
                                                                            variant="error"
                                                                            text={
                                                                                'Remove Not Eligible'
                                                                            }
                                                                            Icon={
                                                                                MdClose
                                                                            }
                                                                        />
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="pt-0 pb-2 space-y-2 px-4">
                                                    <div className="flex items-center">
                                                        <Badge
                                                            variant="primary"
                                                            text={company.type}
                                                        />
                                                    </div>

                                                    {/* Action Buttons */}
                                                    <div className="flex items-center gap-2 pt-1">
                                                        <Button
                                                            outline
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                handleViewProfile(
                                                                    company
                                                                )
                                                            }}
                                                            fullWidth
                                                            variant="primaryNew"
                                                            text=" View Profile"
                                                            Icon={MdVisibility}
                                                        />

                                                        <Button
                                                            fullWidth
                                                            outline
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                handleVisitWebsite(
                                                                    company
                                                                )
                                                            }}
                                                            variant="primary"
                                                            Icon={MdOpenInNew}
                                                            text="Website"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer Actions */}
            <div className="flex justify-between items-center pt-6 border-t">
                <Button outline variant="primaryNew">
                    Refine Search
                </Button>

                <div className="flex items-center gap-4">
                    <Typography variant="small" color="text-gray-600">
                        {activeItems} items ready to submit
                    </Typography>
                    <button
                        onClick={handleSubmit}
                        disabled={activeItems === 0 || isSubmitting}
                        className="text-white px-8 py-3 flex items-center gap-x-1 rounded-md text-sm"
                        style={{
                            background:
                                'linear-gradient(to right, #F7A619, #044866)',
                        }}
                    >
                        {isSubmitting ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Submitting...
                            </>
                        ) : (
                            <>
                                <MdCheckCircle className="w-4 h-4 mr-2" />
                                Submit to Industry Listing
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Confirmation Dialog */}
            {/* <Dialog
                open={showConfirmDialog}
                onOpenChange={setShowConfirmDialog}
            >
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle
                            className="text-xl bg-clip-text text-transparent flex items-center gap-2"
                            style={{
                                backgroundImage:
                                    'linear-gradient(to right, #044866, #0D5468)',
                            }}
                        >
                            <MdCheckCircle
                                className="w-5 h-5"
                                style={{ color: '#F7A619' }}
                            />
                            Submit Complete!
                        </DialogTitle>
                        <DialogDescription className="text-gray-600 pt-2">
                            Your {activeItems} companies have been successfully
                            submitted to the Industry Listing. What would you
                            like to do next?
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col gap-3 pt-4">
                        <Button
                            onClick={handleConfirmSubmit}
                            className="w-full text-white py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                            style={{
                                background:
                                    'linear-gradient(to right, #044866, #0D5468)',
                                '&:hover': {
                                    background:
                                        'linear-gradient(to right, #033652, #0a4556)',
                                },
                            }}
                        >
                            <MdDescription className="w-4 h-4 mr-2" />
                            Close Page
                        </Button>

                        <Button
                            variant="outline"
                            onClick={handleFindMoreIndustries}
                            className="w-full py-3 border-2"
                            style={{ borderColor: '#F7A619', color: '#F7A619' }}
                        >
                            <MdSearch className="w-4 h-4 mr-2" />
                            Find More Industries
                        </Button>
                    </div>

                    <div
                        className="mt-4 p-3 rounded-lg border"
                        style={{
                            backgroundColor: 'rgba(4, 72, 102, 0.05)',
                            borderColor: 'rgba(4, 72, 102, 0.2)',
                        }}
                    >
                        <div
                            className="flex items-center gap-2 text-sm"
                            style={{ color: '#044866' }}
                        >
                            <MdCheckCircle className="w-4 h-4" />
                            <Typography variant="small" color="#044866">
                                Ready to submit {activeItems} companies to your
                                industry database
                            </Typography>
                        </div>
                    </div>
                </DialogContent>
            </Dialog> */}

            {/* Blacklist Warning Dialog */}
            {/* <Dialog
                open={showBlacklistDialog}
                onOpenChange={setShowBlacklistDialog}
            >
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle
                            className="text-xl flex items-center gap-2"
                            style={{ color: THEME_COLORS.primary }}
                        >
                            <MdBlock
                                className="w-5 h-5"
                                style={{ color: '#ef4444' }}
                            />
                            {removalReason === 'duplicate'
                                ? 'Remove Duplicate'
                                : removalReason === 'not-eligible'
                                ? 'Remove Not Eligible'
                                : 'Blacklist Warning'}
                        </DialogTitle>
                        <DialogDescription className="text-gray-600 pt-2">
                            {removalReason === 'duplicate' ? (
                                <>
                                    You are removing this company because it
                                    appears to be a{' '}
                                    <strong>possible duplicate</strong> of an
                                    existing entry.
                                    <br />
                                    <br />
                                    <strong>
                                        If you remove this company, it will be
                                        blacklisted
                                    </strong>{' '}
                                    and won't appear in future searches for this
                                    industry.
                                </>
                            ) : removalReason === 'not-eligible' ? (
                                <>
                                    You are removing this company because it may{' '}
                                    <strong>not be eligible</strong> based on
                                    SkilTrak database matching.
                                    <br />
                                    <br />
                                    <strong>
                                        If you remove this company, it will be
                                        blacklisted
                                    </strong>{' '}
                                    and won't appear in future searches for this
                                    industry.
                                </>
                            ) : (
                                <>
                                    This company has significant keyword matches
                                    with your selected industry sector.
                                    <br />
                                    <br />
                                    <strong>
                                        If you remove this company, it will be
                                        blacklisted
                                    </strong>{' '}
                                    and won't appear in future searches for this
                                    industry.
                                </>
                            )}
                        </DialogDescription>
                    </DialogHeader>

                    {itemToRemove && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 my-4">
                            <div className="flex items-start gap-2">
                                <MdWarning className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                <div className="text-sm">
                                    <div className="font-medium text-red-800">
                                        {
                                            mockResults
                                                .flatMap((g) => g.companies)
                                                .find(
                                                    (c) => c.id === itemToRemove
                                                )?.name
                                        }
                                    </div>
                                    <div className="text-red-600 text-xs mt-1">
                                        <strong>Reason for removal:</strong>{' '}
                                        {removalReason === 'duplicate'
                                            ? 'Possible duplicate entry'
                                            : removalReason === 'not-eligible'
                                            ? 'Maybe not eligible (SkilTrak match)'
                                            : `Keyword matches: ${companyAnalyses
                                                  .get(itemToRemove)
                                                  ?.keywordMatches.slice(0, 3)
                                                  .map((m) => m.keyword)
                                                  .join(', ')}`}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 my-4">
                        <div className="flex items-start gap-2">
                            <MdBlock className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                            <div className="text-sm text-yellow-800">
                                <div className="font-medium">
                                    Industry Blacklist Confirmation
                                </div>
                                <div className="text-xs mt-1">
                                    This industry will not come up in future
                                    listings. Can you confirm this action?
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 pt-4">
                        <Button
                            onClick={handleConfirmBlacklist}
                            className="w-full text-white py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                            style={{
                                backgroundColor: '#ef4444',
                                '&:hover': { backgroundColor: '#dc2626' },
                            }}
                        >
                            <MdBlock className="w-4 h-4 mr-2" />
                            Yes, Confirm Blacklist
                        </Button>

                        <Button
                            variant="outline"
                            onClick={handleCancelBlacklist}
                            className="w-full py-3 border-2"
                            style={{
                                borderColor: THEME_COLORS.primary,
                                color: THEME_COLORS.primary,
                            }}
                        >
                            Cancel - Keep in Results
                        </Button>
                    </div>

                    <div
                        className="mt-4 p-3 rounded-lg border"
                        style={{
                            backgroundColor: 'rgba(239, 68, 68, 0.05)',
                            borderColor: 'rgba(239, 68, 68, 0.2)',
                        }}
                    >
                        <div className="flex items-center gap-2 text-sm text-red-700">
                            <MdWarning className="w-4 h-4" />
                            <Typography variant="small" color="text-red-700">
                                Blacklisted companies are permanently excluded
                                from this industry sector
                            </Typography>
                        </div>
                    </div>
                </DialogContent>
            </Dialog> */}

            {/* Profile Dialog */}
            {/* <Dialog
                open={showProfileDialog}
                onOpenChange={setShowProfileDialog}
            >
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Company Profile</DialogTitle>
                        <DialogDescription>
                            Detailed information about the selected company
                        </DialogDescription>
                    </DialogHeader>
                    {selectedCompany && (
                        <div className="space-y-4">
                            <Typography variant="h4">
                                {selectedCompany.name}
                            </Typography>
                            <Typography variant="body" color="text-gray-600">
                                {selectedCompany.address}
                            </Typography>
                            <div className="flex items-center gap-2">
                                <Badge
                                    style={getTypeStyle(selectedCompany.type)}
                                >
                                    {selectedCompany.type}
                                </Badge>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog> */}
        </div>
    )
}
