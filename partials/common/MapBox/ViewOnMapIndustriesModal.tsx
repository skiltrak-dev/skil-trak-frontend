// MapPanel.refactor.tsx
// Full refactor: component + hooks + utils + config in a single file for easy copy-paste.
// NOTE: This file is organized into sections — Utilities, Config, Hooks, and the Presentational Component.

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Checkbox, NoData } from '@components'
import { UserRoles } from '@constants'
import { useGoogleMaps } from '@hooks'
import { SubAdminApi } from '@queries'
import {
    Circle,
    GoogleMap,
    InfoBox,
    Marker,
    MarkerClusterer,
} from '@react-google-maps/api'
import { getThemeColors } from '@theme'
import { useRouter } from 'next/router'
import { MdCancel } from 'react-icons/md'
import { IndustryPlacementStatus } from '../IndustryProfileDetail'
import { IndustryInfoBoxCard, StudentInfoBoxCard } from './components'

// -------------------------
// CONFIG & THEME
// -------------------------
const colors = getThemeColors()

const containerStyle = { width: '780px', height: '500px' }
const center = { lat: -37.81374, lng: 144.963033 }

const customMapStyles = [
    { featureType: 'water', elementType: 'geometry.fill', stylers: [{ color: '#cde2e8' }] },
    { featureType: 'landscape', elementType: 'geometry.fill', stylers: [{ color: '#f6f6f6' }] },
]

const studentClusterStyles = [{ textColor: 'white', url: '/images/icons/student-clusters.svg', height: 50, width: 50 }]
const industryClusterStyles = [{ textColor: 'white', url: '/images/icons/industry-clusters.svg', height: 50, width: 50 }]
const industryBranchesClusterStyles = [{ textColor: 'white', url: '/images/icons/branches-cluster.svg', height: 50, width: 50 }]
const partnerIndustryClusterStyles = [{ textColor: 'white', url: '/images/icons/partnered-industry-cluster.svg', height: 50, width: 50 }]
const futureIndustryClusterStyles = [{ textColor: 'white', url: '/images/icons/industry-cluster.svg', height: 50, width: 50 }]

// -------------------------
// UTILITIES
// -------------------------
function parseLocation(location?: string) {
    if (!location || location === 'NA') return null
    const parts = location.split(',').map((p) => Number(p.trim()))
    if (parts.length < 2 || Number.isNaN(parts[0]) || Number.isNaN(parts[1])) return null
    return { lat: parts[0], lng: parts[1] }
}

function transformIndustryWithLocation(ind: any) {
    const loc = parseLocation(ind?.location)
    if (!loc) return null
    return { ...ind, location: loc }
}

function transformBranchLocation(branch: any) {
    const loc = parseLocation(branch?.location)
    if (!loc) return null
    return { ...branch, location: loc }
}

function getMarkerIconUrl(marker: any, indind?: any[]) {
    // Replicates original selection logic but centralised
    if (marker?.user?.role === 'student') return '/images/icons/student-red-map-pin.png'

    if (indind?.includes?.(marker?.id)) {
        return marker?.isPartner ? '/images/icons/partnerIndustryContacted.png' : '/images/icons/industryContacted.png'
    }

    if (marker?.placementStatus === IndustryPlacementStatus.ACCEPTING_STUDENTS) {
        return marker?.isPartner
            ? '/images/icons/partnered-industry-marker-check.png'
            : '/images/icons/industry-pin-map-pin-check.png'
    }

    if (marker?.placementStatus === IndustryPlacementStatus.NOT_ACCEPTING_STUDENTS) {
        return marker?.isPartner
            ? '/images/icons/partnered-industry-marker-uncheck.png'
            : '/images/icons/industry-pin-map-pin-uncheck.png'
    }

    if (marker?.department && !marker?.user) return '/images/icons/future-industry-pin.png'
    if (marker?.contactPersonEmail) return '/images/icons/branch-marker.png'
    return marker?.isPartner ? '/images/icons/partnered-industry-marker.png' : '/images/icons/industry-pin-map-pin.png'
}

// -------------------------
// CUSTOM HOOKS
// -------------------------

/**
 * useWorkplaceMapData
 * - wraps your SubAdminApi calls and prepares the raw datasets used by the map
 * - returns the same shape the original component expected (workplaceCourseIndustries, futureIndustries, studentDetails)
 */
export function useWorkplaceMapData(workplace: any) {
    const router = useRouter()

    const workplaceCourseId = workplace?.courses?.[0]?.id

    const industryDetails =
        SubAdminApi.Workplace.useSubAdminMapSuggestedIndustryDetail(
            { industryId: Number('' /* placeholder, actual id is set by UI state */), workplaceId: workplace?.id },
            { skip: true }
        )

    const futureIndustries = SubAdminApi.Workplace.useWorkplaceListedIndustries(
        { id: workplaceCourseId, wpId: workplace?.id },
        { skip: !workplaceCourseId && !workplace?.id }
    )

    const workplaceCourseIndustries = SubAdminApi.Workplace.useWorkplaceCourseIndustries(
        { id: workplaceCourseId, wpId: workplace?.id },
        { skip: !workplaceCourseId && !workplace?.id }
    )

    const studentDetails = SubAdminApi.SubAdmin.useSubAdminMapStudentDetail(router?.query?.id, { skip: !router?.query?.id })

    return { industryDetails, futureIndustries, workplaceCourseIndustries, studentDetails }
}

/**
 * useMapMarkers
 * - main business logic extracted: building visibleMarkers, visibleIndustries and map handlers
 * - keeps the same API as the original component but is reusable
 */
export function useMapMarkers({
    workplace,
    workplaceCourseIndustries,
    futureIndustries,
    studentDetails,
}: {
    workplace: any
    workplaceCourseIndustries: any
    futureIndustries: any
    studentDetails: any
}) {
    const { isLoaded } = useGoogleMaps()
    const [map, setMap] = useState<google.maps.Map | null>(null)
    const [visibleMarkers, setVisibleMarkers] = useState<any[]>([])
    const [visibleIndustries, setVisibleIndustries] = useState<any[]>([])
    const [selectedMarker, setSelectedMarker] = useState<any>(null)

    useEffect(() => {
        // Build markers array (students, industries, futureIndustries, branches)
        const markers: any[] = []

        // workplaceCourseIndustries -> industries with location
        const industries = workplaceCourseIndustries?.data?.data ?? []
        const transformedIndustries = industries
            .filter((ind: any) => ind?.location && ind.location !== 'NA')
            .map((ind: any) => transformIndustryWithLocation(ind))
            .filter(Boolean)

        markers.push(...transformedIndustries)

        // student primary/secondary
        if (workplace?.student?.location) {
            const studentLoc = parseLocation(workplace.student.location)
            const studentLoc2 = parseLocation(workplace.student.location2)
            const studentMarker = {
                ...workplace.student,
                location: studentLoc,
                location2: studentLoc2,
            }
            markers.push(studentMarker)
        }

        // future industries
        const fut = futureIndustries?.data?.data ?? []
        const transformedFuture = fut
            .map((ind: any) => transformIndustryWithLocation(ind))
            .filter(Boolean)
        markers.push(...transformedFuture)

        // branches from industries (flatMap earlier)
        const industryBranches = (workplaceCourseIndustries?.data?.data ?? []).flatMap((i: any) => i?.locations || [])
        const transformedBranches = industryBranches
            .filter((b: any) => b?.location && b.location !== 'NA')
            .map((b: any) => transformBranchLocation(b))
            .filter(Boolean)
        markers.push(...transformedBranches)

        setVisibleMarkers(markers)
    }, [workplaceCourseIndustries, futureIndustries, workplace])

    const onBoundChange = useCallback(() => {
        setSelectedMarker(null)
        if (!map) return
        const bounds = map.getBounds()
        if (!bounds) return
        const filtered = visibleMarkers.filter((marker: any) => {
            if (!marker?.location) return false
            try {
                const latLng = new google.maps.LatLng(marker.location.lat, marker.location.lng)
                return bounds.contains(latLng)
            } catch (e) {
                return false
            }
        })
        setVisibleIndustries(filtered)
    }, [map, visibleMarkers])

    const onMapLoad = useCallback(
        (m: google.maps.Map) => {
            setMap(m)
            m.addListener('bounds_changed', onBoundChange)
        },
        [onBoundChange]
    )

    const onMapUnmount = useCallback(() => setMap(null), [])

    const studentCenter = useMemo(
        () => visibleMarkers.find((m) => m?.user && m?.user?.role === UserRoles.STUDENT),
        [visibleMarkers]
    )

    return {
        isLoaded,
        map,
        visibleMarkers,
        visibleIndustries,
        selectedMarker,
        setSelectedMarker,
        onMapLoad,
        onMapUnmount,
        studentCenter,
    }
}

// -------------------------
// PRESENTATIONAL COMPONENT
// -------------------------

type MapPanelProps = {
    workplace: any
    appliedIndustry?: any
    courseId?: any
    setSelectedBox: any
    selectedBox: any
    onCancel?: any
}

export const ViewOnMapIndustriesModal = ({ workplace, appliedIndustry, courseId, setSelectedBox, selectedBox, onCancel }: MapPanelProps) => {
    // Data fetching hook (keeps same behaviour as original file)
    const { industryDetails, futureIndustries, workplaceCourseIndustries, studentDetails } = useWorkplaceMapData(workplace)
    const router = useRouter()

    // Business logic hook
    const {
        isLoaded,
        map,
        visibleMarkers,
        visibleIndustries,
        selectedMarker,
        setSelectedMarker,
        onMapLoad,
        onMapUnmount,
        studentCenter,
    } = useMapMarkers({ workplace, workplaceCourseIndustries, futureIndustries, studentDetails })

    const [industryId, setIndustryId] = useState('')
    const [futureIndustryId, setFutureIndustryId] = useState<any>(null)
    const [branchId, setBranchId] = useState<any>(null)
    const [showInfoBox, setShowInfoBox] = useState(false)
    const [showSecondaryLocation, setShowSecondaryLocation] = useState(false)
    const [showFutureIndustries, setShowFutureIndustries] = useState(false)

    // list of contacted industry ids (original: studentDetails?.data?.student?.industryContacts?.map(i => i?.industry?.id))
    const indind = studentDetails?.data?.student?.industryContacts?.map((i: any) => i?.industry?.id)

    // toggle show secondary location and pan map
    const handleSecondaryLocationToggle = () => {
        if (!workplace?.student) return
        const [lat, lng] = workplace?.student?.location ? workplace?.student?.location.split(',').map(Number) : []
        const [lat2, lng2] = workplace?.student?.location2 ? workplace?.student?.location2.split(',').map(Number) : []
        if (map) {
            if (showSecondaryLocation) map.panTo({ lat, lng })
            else map.panTo({ lat: lat2, lng: lng2 })
        }
        setShowSecondaryLocation(!showSecondaryLocation)
    }

    // early return if no markers
    if (!visibleMarkers || visibleMarkers.length === 0) {
        return (
            <div className="w-full h-[80vh] lg:h-full overflow-hidden">
                <div className="flex justify-between cursor-pointer border-b py-0.5 px-2 mb-2">
                    <div />
                    <MdCancel onClick={onCancel} className="transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90" />
                </div>
                <NoData text="No Data found" />
            </div>
        )
    }

    return (
        <div className="w-full h-[80vh] lg:h-full overflow-hidden">
            <div className="flex justify-between cursor-pointer border-b py-0.5 px-2 mb-2">
                <div className="flex items-center gap-x-2">
                    {workplace?.student?.location2 && (
                        <Checkbox name={'secondaryLocation'} onChange={handleSecondaryLocationToggle} defaultChecked={showSecondaryLocation} label={'Show Student Secondary Location'} showError={false} />
                    )}
                </div>
                <MdCancel onClick={onCancel} className="transition-all duration-500 text-gray-400 hover:text-black text-3xl cursor-pointer hover:rotate-90" />
            </div>

            <div className="flex gap-x-3 w-full">
                {isLoaded && (
                    <div className="w-3/4">
                        <GoogleMap mapContainerStyle={containerStyle} center={studentCenter && studentCenter?.location && isFinite(studentCenter?.location?.lat) && isFinite(studentCenter?.location?.lng) ? studentCenter?.location : center} zoom={9} onLoad={onMapLoad} onUnmount={onMapUnmount} options={{ styles: customMapStyles }}>

                            {/* Students cluster */}
                            <MarkerClusterer options={{ styles: studentClusterStyles, maxZoom: 15 }}>
                                {(clusterer: any) => (
                                    <>
                                        {visibleMarkers
                                            ?.filter((marker: any) => marker?.user && marker?.user?.role === UserRoles.STUDENT && !marker?.department)
                                            .map((marker: any) => (
                                                <React.Fragment key={marker.id}>
                                                    <Marker
                                                        icon={{ url: getMarkerIconUrl(marker, indind), scaledSize: new google.maps.Size(31, 41) }}
                                                        position={marker.location2 && showSecondaryLocation ? marker.location2 : marker.location}
                                                        clusterer={clusterer}
                                                        onMouseOut={() => setSelectedMarker(null)}
                                                        onClick={(e: any) => {
                                                            setIndustryId(marker?.id)
                                                            setSelectedBox({ ...marker, position: { lat: e.latLng.lat(), lng: e.latLng.lng() } })
                                                            setShowInfoBox(true)
                                                        }}
                                                    />

                                                    <Circle center={marker.location2 && showSecondaryLocation ? marker.location2 : marker.location} radius={20000} options={{ fillColor: colors.success.dark, fillOpacity: 0.2, strokeColor: '#AA0000', strokeOpacity: 0.7, strokeWeight: 1, clickable: false, draggable: false, editable: false, visible: true, zIndex: 1 }} />

                                                    {selectedBox && showInfoBox && selectedBox.id === marker.id && !marker?.department && (
                                                        <InfoBox position={selectedBox?.position} onCloseClick={() => { setSelectedBox(null); setShowInfoBox(false); setIndustryId('') }} options={{ closeBoxURL: ``, enableEventPropagation: true }}>
                                                            {marker?.user?.role === 'student' ? (
                                                                <StudentInfoBoxCard item={studentDetails} selectedBox={selectedBox} studentId={router?.query?.id} setSelectedBox={setSelectedBox} />
                                                            ) : (
                                                                <IndustryInfoBoxCard item={industryDetails} selectedBox={selectedBox} industryId={industryId} setSelectedBox={setSelectedBox} workplace={workplace} appliedIndustry={appliedIndustry} workplaceMapCard={true} onCancel={onCancel} industryContacted />
                                                            )}
                                                        </InfoBox>
                                                    )}
                                                </React.Fragment>
                                            ))}
                                    </>
                                )}
                            </MarkerClusterer>

                            {/* Industries (non-partner) */}
                            <MarkerClusterer options={{ styles: industryClusterStyles, maxZoom: 15 }}>
                                {(clusterer: any) => (
                                    <>
                                        {visibleMarkers
                                            ?.filter((marker: any) => !marker?.isPartner && marker?.user && marker?.user?.role !== 'student' && !marker?.department)
                                            .map((marker: any) => (
                                                <React.Fragment key={marker.id}>
                                                    <Marker
                                                        icon={{ url: getMarkerIconUrl(marker, indind), scaledSize: new google.maps.Size(31, 41) }}
                                                        position={marker.location}
                                                        clusterer={clusterer}
                                                        onMouseOut={() => setSelectedMarker(null)}
                                                        onClick={(e: any) => {
                                                            setIndustryId(marker?.id)
                                                            setSelectedBox({ ...marker, type: 'industry', position: { lat: e.latLng.lat(), lng: e.latLng.lng() } })
                                                            setShowInfoBox(true)
                                                        }}
                                                    />
                                                </React.Fragment>
                                            ))}
                                    </>
                                )}
                            </MarkerClusterer>

                            {/* Branches */}
                            <MarkerClusterer options={{ styles: industryBranchesClusterStyles, maxZoom: 15 }}>
                                {(clusterer: any) => (
                                    <>
                                        {visibleMarkers
                                            ?.filter((marker: any) => marker?.contactPersonEmail)
                                            .map((marker: any) => (
                                                <div key={marker?.id}>
                                                    <Marker
                                                        icon={{ url: getMarkerIconUrl(marker, indind), scaledSize: new google.maps.Size(29, 38) }}
                                                        position={marker?.location}
                                                        clusterer={clusterer}
                                                        onMouseOut={() => setSelectedMarker(null)}
                                                        onClick={(e: any) => {
                                                            setBranchId(marker?.id)
                                                            setSelectedBox({ ...marker, type: 'branch', position: { lat: e.latLng.lat(), lng: e.latLng.lng() } })
                                                            setShowInfoBox(true)
                                                        }}
                                                        title={marker?.businessName}
                                                    />
                                                </div>
                                            ))}
                                    </>
                                )}
                            </MarkerClusterer>

                            {/* Partner Industries */}
                            <MarkerClusterer options={{ styles: partnerIndustryClusterStyles, maxZoom: 15 }}>
                                {(clusterer: any) => (
                                    <>
                                        {visibleMarkers
                                            ?.filter((marker: any) => marker?.isPartner && marker?.user && marker?.user?.role !== 'student' && !marker?.department)
                                            .map((marker: any) => (
                                                <React.Fragment key={marker.id}>
                                                    <Marker
                                                        icon={{ url: getMarkerIconUrl(marker, indind), scaledSize: new google.maps.Size(29, 38) }}
                                                        position={marker.location}
                                                        clusterer={clusterer}
                                                        onMouseOut={() => setSelectedMarker(null)}
                                                        onClick={(e: any) => {
                                                            setIndustryId(marker?.id)
                                                            setSelectedBox({ ...marker, type: 'industry', position: { lat: e.latLng.lat(), lng: e.latLng.lng() } })
                                                            setShowInfoBox(true)
                                                        }}
                                                        title={marker?.user?.name}
                                                    />
                                                </React.Fragment>
                                            ))}
                                    </>
                                )}
                            </MarkerClusterer>

                            {/* Future Industries */}
                            <MarkerClusterer options={{ styles: futureIndustryClusterStyles, maxZoom: 15 }}>
                                {(clusterer: any) => (
                                    <>
                                        {visibleMarkers
                                            ?.filter((marker: any) => marker?.department && !marker?.user && !marker?.courses)
                                            .map((marker: any) => (
                                                <div key={marker?.id}>
                                                    <Marker
                                                        icon={{ url: getMarkerIconUrl(marker, indind), scaledSize: new google.maps.Size(29, 38) }}
                                                        position={marker.location}
                                                        clusterer={clusterer}
                                                        onMouseOver={(e: any) => {
                                                            setFutureIndustryId(marker?.id)
                                                            setShowInfoBox(true)
                                                        }}
                                                        onMouseOut={() => setSelectedMarker(null)}
                                                        onClick={(e: any) => {
                                                            setFutureIndustryId(marker?.id)
                                                            setSelectedBox({ ...marker, type: 'futureIndustry', position: { lat: e.latLng.lat(), lng: e.latLng.lng() } })
                                                            setShowInfoBox(true)
                                                        }}
                                                        title={marker?.businessName}
                                                    />
                                                </div>
                                            ))}
                                    </>
                                )}
                            </MarkerClusterer>

                        </GoogleMap>
                    </div>
                )}
            </div>

            <div className="flex justify-end cursor-pointer border-t p-4 mt-2"></div>
        </div>
    )
}