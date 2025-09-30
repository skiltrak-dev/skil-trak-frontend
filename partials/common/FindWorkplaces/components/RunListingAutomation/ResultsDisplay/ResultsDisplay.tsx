import React, {
    ReactElement,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react'

import { MdArrowBack, MdCheckCircle, MdLocationOn } from 'react-icons/md'

import { Alert, Badge, Button, Typography } from '@components'
import { ConfirmationModal } from '@partials/common/FindWorkplaces/modal'
import { MapView } from '../MapView'
import { formatAddressWithCode, getRegionInfo } from '../utils/addressCodes'
import {
    findKeywordMatches,
    hasSignificantKeywordMatch,
    KeywordMatch,
} from '../utils/keywordMatcher'
import {
    checkSkilTrakMatch,
    type SkilTrakMatch,
} from '../utils/skilTrakDatabase'
import { ResultDisplayCard } from './ResultDisplayCard'

interface ResultsDisplayProps {
    onBack: () => void
    onClose?: () => void
    selectedSector?: number
    listingResults?: any
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
    selectedSector,
    listingResults,
}) => {
    const [duplicates, setDuplicates] = useState<Set<string>>(new Set())
    const [removedItems, setRemovedItems] = useState<Set<string>>(new Set())

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [modal, setModal] = useState<ReactElement | null>(null)

    const [selectedLocationId, setSelectedLocationId] = useState<string>('')
    const [isMapExpanded, setIsMapExpanded] = useState(false)
    const [companyAnalyses, setCompanyAnalyses] = useState<
        Map<string, CompanyAnalysis>
    >(new Map())

    const filteredCompanies = (companies: any) =>
        companies?.filter((company: any) => !removedItems.has(company?.placeId))

    // Transform companies for map display
    const mapLocations = useMemo(
        () =>
            mockResults.flatMap((group) =>
                filteredCompanies(group.companies)?.map((company: any) => ({
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

    const toggleMapExpanded = useCallback(() => {
        setIsMapExpanded((prev) => !prev)
    }, [])

    const handleLocationSelect = useCallback((locationId: string) => {
        setSelectedLocationId(locationId)
    }, [])

    const total = useMemo(
        () => filteredCompanies(Object.values(listingResults)?.flat())?.length,
        [filteredCompanies, removedItems]
    )
    const activeItems = total - removedItems.size

    const handleSubmit = () => {
        setModal(
            <ConfirmationModal
                onCancel={() => {
                    onCancel()
                    onClose && onClose()
                }}
                selectedSector={Number(selectedSector)}
                listingResults={filteredCompanies(
                    Object.values(listingResults)?.flat()
                )?.map((l: any) => l?.placeId)}
            />
        )
    }

    const duplicateCount = Object.values(listingResults)
        ?.flat()
        ?.filter((a: any) => a?.duplicated)?.length

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
                            {total} companies found
                        </Typography>
                    </div>
                </div>
            </div>

            {/* Map Toggle Button */}
            <div className="flex items-center justify-between">
                {/* <Button
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
                </Button> */}
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
                        {total}
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
                {Object.entries(listingResults)?.map(
                    ([key, companies]: any, groupIndex: number) => {
                        return (
                            filteredCompanies(companies) &&
                            filteredCompanies(companies)?.length > 0 && (
                                <div
                                    key={key}
                                    className="space-y-2 animate-slide-down-fade"
                                    style={{
                                        animationDelay: `${groupIndex * 0.1}s`,
                                    }}
                                >
                                    <div className="flex items-center gap-3">
                                        <MdLocationOn
                                            className="w-5 h-5"
                                            style={{ color: '#044866' }}
                                        />
                                        <Typography variant="title">
                                            {key} KM
                                        </Typography>
                                        <div className="ml-auto">
                                            <Badge
                                                variant="secondary"
                                                text={`${
                                                    filteredCompanies(companies)
                                                        ?.length
                                                } companies`}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1.5 pl-6">
                                        {filteredCompanies(companies)?.map(
                                            (
                                                company: any,
                                                companyIndex: any
                                            ) => (
                                                <ResultDisplayCard
                                                    key={company?.placeId}
                                                    setRemovedItems={
                                                        setRemovedItems
                                                    }
                                                    removedItems={removedItems}
                                                    company={company}
                                                    companyAnalyses={
                                                        companyAnalyses
                                                    }
                                                    companyIndex={companyIndex}
                                                    groupIndex={groupIndex}
                                                    selectedLocationId={
                                                        selectedLocationId
                                                    }
                                                    handleLocationSelect={
                                                        handleLocationSelect
                                                    }
                                                />
                                            )
                                        )}
                                    </div>
                                </div>
                            )
                        )
                    }
                )}
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
        </div>
    )
}
