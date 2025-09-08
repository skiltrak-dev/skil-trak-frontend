// src/components/MapComponent.tsx
import { Button, Card, LoadingAnimation, NoData } from '@components'
import { AdminApi, CommonApi, SubAdminApi } from '@queries'
import {
    GoogleMap,
    InfoBox,
    Marker,
    MarkerClusterer,
    useJsApiLoader,
} from '@react-google-maps/api'
import { ellipsisText, isBrowser, removeEmptyValues } from '@utils'
import { useCallback, useEffect, useState } from 'react'
import {
    StudentInfoBoxCard,
    IndustryInfoBoxCard,
    FutureIndustryInfoBoxCard,
} from './components'
import { Industry } from '@types'
import { IndustryPlacementStatus } from '@partials/common'
import { useRouter } from 'next/router'
import { useGoogleMaps } from '@hooks'

const containerStyle = {
    width: '100%',
    height: '389px',
}

const center = {
    lat: -37.81374,
    lng: 144.963033,
}

const customMapStyles = [
    {
        featureType: 'water',

        elementType: 'geometry.fill',

        stylers: [{ color: '#cde2e8' }],
    },

    {
        featureType: 'landscape',

        elementType: 'geometry.fill',

        stylers: [{ color: '#f6f6f6' }],
    },
]

const studentClusterStyles = [
    {
        textColor: 'white',
        url: '/images/icons/student-clusters.svg',
        height: 50,
        width: 50,
    },
]

const industryClusterStyles = [
    {
        textColor: 'white',
        url: '/images/icons/industry-clusters.svg',
        height: 50,
        width: 50,
    },
]
const partnerIndustryClusterStyles = [
    {
        textColor: 'white',
        url: '/images/icons/partnered-industry-cluster.svg',
        height: 50,
        width: 50,
    },
]
const futureIndustryClusterStyles = [
    {
        textColor: 'white',
        url: '/images/icons/industry-cluster.svg',
        height: 50,
        width: 50,
    },
]

const australiaCenter = { lat: -25.274398, lng: 133.775136 }
const victoriaCenter = { lat: -37.8136, lng: 144.9631 }

const DepartmentMapDetail = ({
    rto,
    sector,
    workplaceType,
    suburbLocation,
    searchInitiated,
    setSearchInitiated,
    showFutureIndustries,
}: {
    workplaceType: any
    sector: any
    rto: any
    searchInitiated: any
    suburbLocation: any
    setSearchInitiated: any
    showFutureIndustries?: any
}) => {
    const router = useRouter()
    const deptId = router.query.id
    const { isLoaded } = useGoogleMaps()
    // const { isLoaded } = useJsApiLoader({
    //     id: 'google-map-script',
    //     googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_KEY as string,
    // })
    // Select fields states
    const [location, setLocation] = useState('')

    const [selectedBox, setSelectedBox] = useState<any>(null)
    const [studentId, setStudentId] = useState<any>(null)
    const [industryId, setIndustryId] = useState<any>(null)
    const [futureIndustryId, setFutureIndustryId] = useState<any>(null)
    const [showInfoBox, setShowInfoBox] = useState<any>(false)
    const [visibleMarkers, setVisibleMarkers] = useState<any>([])
    const [map, setMap] = useState<google.maps.Map | null>(null)
    const [onSuburbClicked, setOnSuburbClicked] = useState<boolean>(true)

    // bounds
    const [mapCenter, setMapCenter] = useState(center)
    const [mapZoom, setMapZoom] = useState(5)
    // useSubAdminMapStudents
    const industryDetails =
        SubAdminApi.Workplace.useSubAdminMapSuggestedIndustryDetail(
            { industryId: industryId },
            {
                skip: !industryId,
            }
        )
    const [saveCoordinates, saveCoordinatesResults] =
        SubAdminApi.SubAdmin.useSaveCoordinatesForMap()
    const savedCoordinates = SubAdminApi.SubAdmin.useSavedCoordinates()
    const { data, isLoading, isSuccess, isError, isFetching } =
        AdminApi.Department.useDepartmentStudentsForMap(
            {
                id: deptId,
                params: {
                    search: `${JSON.stringify(
                        removeEmptyValues({
                            sectorId: sector,
                            rtoId: rto,
                            suburb: location,
                            currentStatus: workplaceType,
                        })
                    )
                        .replaceAll('{', '')
                        .replaceAll('}', '')
                        .replaceAll('"', '')
                        .trim()}`,
                    skip: !deptId,
                },
            },
            {
                refetchOnMountOrArgChange: true,
            }
        )

    const industriesList = AdminApi.Department.useDepartmentIndustriesForMap(
        {
            id: deptId,
            params: {
                search: `${JSON.stringify(
                    removeEmptyValues({
                        sectorId: sector,
                        suburb: location,
                        // rtoId: rto,
                        // currentStatus: workplaceType,
                    })
                )
                    .replaceAll('{', '')
                    .replaceAll('}', '')
                    .replaceAll('"', '')
                    .trim()}`,
                skip: !deptId,
            },
        },
        {
            refetchOnMountOrArgChange: true,
        }
    )

    const futureIndustries =
        AdminApi.Department.useDepartmentFutureIndustriesForMap(
            {
                id: deptId,
                params: {
                    search: `${JSON.stringify(
                        removeEmptyValues({
                            sectorId: sector,
                        })
                    )
                        .replaceAll('{', '')
                        .replaceAll('}', '')
                        .replaceAll('"', '')
                        .trim()}`,
                    skip: !deptId,
                },
            },
            {
                refetchOnMountOrArgChange: true,
            }
        )
    // useSubAdminMapStudentDetail
    const studentDetails = SubAdminApi.SubAdmin.useSubAdminMapStudentDetail(
        studentId,
        { skip: !studentId }
    )
    const rtosList = SubAdminApi.SubAdmin.useSubAdminRtosForMap()
    const suburbsList = SubAdminApi.SubAdmin.useSubAdminStudentSuburbsForMap()
    const rtoOptions = rtosList?.data?.map((rto: any) => ({
        label: rto?.user?.name,
        value: rto.id,
    }))
    const suburbOptions = suburbsList?.data
        ?.filter(
            (suburb: any) =>
                suburb?.suburb !== 'NA' &&
                suburb?.suburb !== 'na' &&
                suburb?.suburb !== 'n/a' &&
                suburb?.suburb !== 'N/A' &&
                suburb?.suburb !== ''
        )
        .map((suburb: any) => ({
            label: ellipsisText(suburb?.suburb, 15),
            value: suburb?.suburb,
        }))
    const [selectedMarker, setSelectedMarker] = useState<null | {
        lat: number
        lng: number
        name: string
    }>(null)

    const onMarkerHover = useCallback((marker: any) => {
        setSelectedMarker(marker)
    }, [])

    useEffect(() => {
        if (data || industriesList?.data || futureIndustries?.data) {
            const markers = []

            if (data) {
                const filteredStudents = data?.filter(
                    (student: any) =>
                        student.location && student.location !== 'NA'
                )
                const transformedStudents = filteredStudents.map(
                    (student: any) => {
                        const [lat, lng] = student.location
                            .split(',')
                            .map(Number)
                        return { ...student, location: { lat, lng } }
                    }
                )
                markers.push(...transformedStudents)
            }

            if (industriesList?.data) {
                const filteredIndustries = industriesList?.data?.filter(
                    (industry: any) =>
                        industry.location && industry.location !== 'NA'
                )
                const transformedIndustries = filteredIndustries?.map(
                    (industry: any) => {
                        const [lat, lng] = industry?.location
                            .split(',')
                            .map(Number)
                        return { ...industry, location: { lat, lng } }
                    }
                )
                markers.push(...transformedIndustries)
            }
            if (futureIndustries?.data && futureIndustries?.data?.length) {
                const filteredIndustries = futureIndustries?.data?.filter(
                    (industry: any) =>
                        industry.location && industry.location !== 'NA'
                )
                const transformedFutureIndustries = filteredIndustries?.map(
                    (industry: any) => {
                        const [lat, lng] = industry?.location
                            .split(',')
                            .map(Number)
                        return { ...industry, location: { lat, lng } }
                    }
                )
                markers.push(...transformedFutureIndustries)
            }

            setVisibleMarkers(markers)
        }
    }, [data, industriesList?.data, futureIndustries?.data])
    //Bounds changes when filter applied
    useEffect(() => {
        if (map && visibleMarkers.length > 0) {
            const bounds = new google.maps.LatLngBounds()
            visibleMarkers.forEach((marker: any) => {
                bounds.extend(
                    new google.maps.LatLng(
                        marker.location.lat,
                        marker.location.lng
                    )
                )
            })
            map.fitBounds(bounds)
            setSearchInitiated(true)
        }
    }, [map, visibleMarkers])
    const savedMap = {
        lat: Number(savedCoordinates?.data?.lat),
        lng: Number(savedCoordinates?.data?.lng),
        // zoom: savedCoordinates?.data?.zoom,
    }

    useEffect(() => {
        if (map && suburbLocation && isSuccess) {
            setTimeout(() => {
                map.setCenter(suburbLocation)
                map.setZoom(12)
            }, 400)
        }
    }, [suburbLocation, map, data, isSuccess])

    const handleCountryView = () => {
        if (map) {
            map.setCenter(australiaCenter)
            map.setZoom(3)
        }
    }

    const saveMapView = () => {
        if (map) {
            const currentCenter = map.getCenter()
            const currentZoom = map.getZoom()
            if (currentCenter && currentZoom !== undefined) {
                const coordinates = {
                    lat: currentCenter.lat(),
                    lng: currentCenter.lng(),
                    zoom: currentZoom,
                }
                saveCoordinates(coordinates)
            }
        }
    }

    useEffect(() => {
        if (savedCoordinates?.data && !searchInitiated) {
            setMapCenter(savedMap)
            setMapZoom(Number(savedCoordinates.data.zoom))
        }
    }, [savedCoordinates])

    useEffect(() => {
        if (map && !searchInitiated) {
            setTimeout(() => {
                map.setCenter(mapCenter)
                map.setZoom(mapZoom)
            }, 1200) // Adjust the delay as needed
        }
    }, [mapCenter, mapZoom, map])
    const onBoundChange = useCallback(() => {
        setSelectedBox(null)
        setIndustryId(null)
        setShowInfoBox(false)
        setStudentId('')
        setFutureIndustryId(null)
        if (!map) return

        const bounds = map.getBounds()
        if (!bounds) return

        const updatedVisibleMarkers = visibleMarkers.filter((marker: any) => {
            const latLng = new google.maps.LatLng(
                marker.location.lat,
                marker.location.lng
            )
            return bounds.contains(latLng)
        })

        setVisibleMarkers(updatedVisibleMarkers)
    }, [map])

    const onMapLoad = useCallback(
        (map: any) => {
            setMap(map)
            map.addListener('bounds_changed', onBoundChange)
            map.addListener('idle', () => {})
        },
        [onBoundChange]
    )
    const onMapLoadSavedCoordinates = useCallback(
        (map: any) => {
            setMap(map)
            setTimeout(() => {
                map.setCenter(mapCenter)
                map.setZoom(mapZoom)
            }, 3000) // Adjust the delay as needed

            map.addListener('idle', () => {})
        },
        [mapCenter, mapZoom]
    )

    const onMapUnmount = useCallback(() => {
        setMap(null)
    }, [])

    const studentClusterOptions = {
        styles: studentClusterStyles,
        grid: 20,
        maxZoom: 15,
    }
    const industryClusterOptions = {
        styles: industryClusterStyles,
        grid: 20,
        maxZoom: 15,
    }
    const partnerIndustryClusterOptions = {
        styles: partnerIndustryClusterStyles,
        grid: 20,
        maxZoom: 15,
    }
    const futureIndustryClusterOptions = {
        styles: futureIndustryClusterStyles,
        grid: 20,
        maxZoom: 15,
    }
    const pinnedStudentId = localStorage.getItem('pinnedStudentId')
    useEffect(() => {
        if (pinnedStudentId) {
            // Find the marker with the pinned student ID
            const pinnedMarker = visibleMarkers.find(
                (marker: any) => marker.id === pinnedStudentId
            )
            if (pinnedMarker) {
                setStudentId(pinnedMarker.id)
                setIndustryId(pinnedMarker.id)
                setSelectedBox(pinnedMarker)
                setShowInfoBox(true)
            }
        }
    }, [visibleMarkers])

    return (
        <div className="w-full flex flex-col gap-y-2.5">
            {isError && <NoData text={'Something went Wrong...!'} />}
            {isLoading ? (
                <LoadingAnimation />
            ) : visibleMarkers?.length > 0 && !isError && isLoaded ? (
                <Card>
                    <div className="relative">
                        <GoogleMap
                            mapContainerStyle={containerStyle}
                            center={
                                map?.getCenter()?.lat() &&
                                map?.getCenter()?.lng()
                                    ? {
                                          lat: Number(map?.getCenter()?.lat()),
                                          lng: Number(map?.getCenter()?.lng()),
                                      }
                                    : center
                            }
                            zoom={5}
                            onLoad={
                                !searchInitiated
                                    ? onMapLoadSavedCoordinates
                                    : onMapLoad
                            }
                            onUnmount={onMapUnmount}
                            // onBoundsChanged={onBoundChange}
                            options={{ styles: customMapStyles }}
                        >
                            <MarkerClusterer options={studentClusterOptions}>
                                {(clusterer) => (
                                    <>
                                        {visibleMarkers
                                            ?.filter(
                                                (marker: any) =>
                                                    !marker?.user &&
                                                    !marker?.department &&
                                                    marker?.courses
                                            )
                                            ?.map((marker: any) => (
                                                <div key={marker?.id}>
                                                    <Marker
                                                        icon={{
                                                            url:
                                                                marker?.user
                                                                    ?.role &&
                                                                marker?.user
                                                                    ?.role ===
                                                                    'industry'
                                                                    ? marker?.placementStatus ===
                                                                      IndustryPlacementStatus.ACCEPTING_STUDENTS
                                                                        ? '/images/icons/industry-pin-map-pin-check.png'
                                                                        : marker?.placementStatus ===
                                                                          IndustryPlacementStatus.NOT_ACCEPTING_STUDENTS
                                                                        ? '/images/icons/industry-pin-map-pin-uncheck.png'
                                                                        : '/images/icons/industry-pin-map-pin.png'
                                                                    : '/images/icons/student-red-map-pin.png',
                                                            scaledSize:
                                                                new google.maps.Size(
                                                                    29,
                                                                    38
                                                                ),
                                                        }}
                                                        position={
                                                            marker?.location
                                                        }
                                                        // label={marker.name}
                                                        clusterer={clusterer}
                                                        onMouseOver={(
                                                            e: any
                                                        ) => {
                                                            // handleMarkerClick(marker)
                                                            setStudentId(
                                                                marker?.id
                                                            )
                                                            setIndustryId(
                                                                marker?.id
                                                            )
                                                            setSelectedBox({
                                                                ...marker,
                                                                position: {
                                                                    lat: e.latLng.lat(),
                                                                    lng: e.latLng.lng(),
                                                                },
                                                            })
                                                            setShowInfoBox(true)
                                                        }}
                                                        onMouseOut={() =>
                                                            setSelectedMarker(
                                                                null
                                                            )
                                                        }
                                                        onClick={(e: any) => {
                                                            // handleMarkerClick(marker)
                                                            setStudentId(
                                                                marker?.id
                                                            )
                                                            setIndustryId(
                                                                marker?.id
                                                            )
                                                            setSelectedBox({
                                                                ...marker,
                                                                position: {
                                                                    lat: e.latLng.lat(),
                                                                    lng: e.latLng.lng(),
                                                                },
                                                            })
                                                            setShowInfoBox(true)
                                                            localStorage.setItem(
                                                                'pinnedStudentId',
                                                                marker?.id
                                                            )
                                                        }}
                                                    />
                                                    {selectedBox &&
                                                        showInfoBox &&
                                                        selectedBox.id ===
                                                            marker?.id &&
                                                        !marker?.department && (
                                                            <InfoBox
                                                                position={
                                                                    selectedBox?.position
                                                                }
                                                                onCloseClick={() => {
                                                                    setSelectedBox(
                                                                        null
                                                                    )
                                                                    setShowInfoBox(
                                                                        false
                                                                    )
                                                                    setStudentId(
                                                                        ''
                                                                    )
                                                                    setIndustryId(
                                                                        null
                                                                    )
                                                                }}
                                                                options={{
                                                                    closeBoxURL: ``,
                                                                    enableEventPropagation:
                                                                        true,
                                                                }}
                                                            >
                                                                {marker?.user
                                                                    ?.role &&
                                                                marker?.user
                                                                    ?.role ===
                                                                    'industry' ? (
                                                                    <IndustryInfoBoxCard
                                                                        item={
                                                                            industryDetails
                                                                        }
                                                                        selectedBox={
                                                                            selectedBox
                                                                        }
                                                                        industryId={
                                                                            industryId
                                                                        }
                                                                        setSelectedBox={
                                                                            setSelectedBox
                                                                        }
                                                                    />
                                                                ) : (
                                                                    <StudentInfoBoxCard
                                                                        item={
                                                                            studentDetails
                                                                        }
                                                                        selectedBox={
                                                                            selectedBox
                                                                        }
                                                                        studentId={
                                                                            studentId
                                                                        }
                                                                        setSelectedBox={
                                                                            setSelectedBox
                                                                        }
                                                                    />
                                                                )}
                                                            </InfoBox>
                                                        )}
                                                </div>
                                            ))}
                                    </>
                                )}
                            </MarkerClusterer>

                            {/* Industries */}
                            <MarkerClusterer options={industryClusterOptions}>
                                {(clusterer) => (
                                    <>
                                        {visibleMarkers
                                            ?.filter(
                                                (marker: any) =>
                                                    !marker?.isPartner &&
                                                    marker?.user &&
                                                    !marker?.department &&
                                                    marker?.user?.role ===
                                                        'industry'
                                            )
                                            .map((marker: any) => (
                                                <div key={marker?.id}>
                                                    <Marker
                                                        icon={{
                                                            url:
                                                                marker?.user
                                                                    ?.role &&
                                                                marker?.user
                                                                    ?.role ===
                                                                    'industry'
                                                                    ? marker?.placementStatus ===
                                                                      IndustryPlacementStatus.ACCEPTING_STUDENTS
                                                                        ? '/images/icons/industry-pin-map-pin-check.png'
                                                                        : marker?.placementStatus ===
                                                                          IndustryPlacementStatus.NOT_ACCEPTING_STUDENTS
                                                                        ? '/images/icons/industry-pin-map-pin-uncheck.png'
                                                                        : '/images/icons/industry-pin-map-pin.png'
                                                                    : '/images/icons/student-red-map-pin.png',
                                                            scaledSize:
                                                                new google.maps.Size(
                                                                    29,
                                                                    38
                                                                ),
                                                        }}
                                                        position={
                                                            marker.location
                                                        }
                                                        // label={marker.name}
                                                        clusterer={clusterer}
                                                        onMouseOver={(
                                                            e: any
                                                        ) => {
                                                            // handleMarkerClick(marker)
                                                            setStudentId(
                                                                marker?.id
                                                            )
                                                            setIndustryId(
                                                                marker?.id
                                                            )
                                                            setSelectedBox({
                                                                ...marker,
                                                                position: {
                                                                    lat: e.latLng.lat(),
                                                                    lng: e.latLng.lng(),
                                                                },
                                                            })
                                                            setShowInfoBox(true)
                                                        }}
                                                        onMouseOut={() =>
                                                            setSelectedMarker(
                                                                null
                                                            )
                                                        }
                                                        onClick={(e: any) => {
                                                            // handleMarkerClick(marker)
                                                            setStudentId(
                                                                marker?.id
                                                            )
                                                            setIndustryId(
                                                                marker?.id
                                                            )
                                                            setSelectedBox({
                                                                ...marker,
                                                                position: {
                                                                    lat: e.latLng.lat(),
                                                                    lng: e.latLng.lng(),
                                                                },
                                                            })
                                                            setShowInfoBox(true)
                                                        }}
                                                    />
                                                    {selectedBox &&
                                                        showInfoBox &&
                                                        selectedBox.id ===
                                                            marker?.id && (
                                                            <InfoBox
                                                                position={
                                                                    selectedBox?.position
                                                                }
                                                                onCloseClick={() => {
                                                                    setSelectedBox(
                                                                        null
                                                                    )
                                                                    setShowInfoBox(
                                                                        false
                                                                    )
                                                                    setStudentId(
                                                                        ''
                                                                    )
                                                                    setIndustryId(
                                                                        null
                                                                    )
                                                                }}
                                                                options={{
                                                                    closeBoxURL: ``,
                                                                    enableEventPropagation:
                                                                        true,
                                                                }}
                                                            >
                                                                {marker?.user
                                                                    ?.role &&
                                                                marker?.user
                                                                    ?.role ===
                                                                    'industry' ? (
                                                                    <IndustryInfoBoxCard
                                                                        item={
                                                                            industryDetails
                                                                        }
                                                                        selectedBox={
                                                                            selectedBox
                                                                        }
                                                                        industryId={
                                                                            industryId
                                                                        }
                                                                        setSelectedBox={
                                                                            setSelectedBox
                                                                        }
                                                                    />
                                                                ) : (
                                                                    <StudentInfoBoxCard
                                                                        item={
                                                                            studentDetails
                                                                        }
                                                                        selectedBox={
                                                                            selectedBox
                                                                        }
                                                                        studentId={
                                                                            studentId
                                                                        }
                                                                        setSelectedBox={
                                                                            setSelectedBox
                                                                        }
                                                                    />
                                                                )}
                                                            </InfoBox>
                                                        )}
                                                </div>
                                            ))}
                                    </>
                                )}
                            </MarkerClusterer>

                            {/* isPartner */}
                            <MarkerClusterer
                                options={partnerIndustryClusterOptions}
                            >
                                {(clusterer) => (
                                    <>
                                        {visibleMarkers
                                            ?.filter(
                                                (marker: any) =>
                                                    marker?.user &&
                                                    !marker?.department &&
                                                    marker?.user?.role ===
                                                        'industry' &&
                                                    marker?.isPartner
                                            )
                                            .map((marker: any) => (
                                                <div key={marker?.id}>
                                                    <Marker
                                                        icon={{
                                                            url:
                                                                marker?.user
                                                                    ?.role &&
                                                                marker?.user
                                                                    ?.role ===
                                                                    'industry'
                                                                    ? marker?.placementStatus ===
                                                                      IndustryPlacementStatus.ACCEPTING_STUDENTS
                                                                        ? '/images/icons/partnered-industry-marker-check.png'
                                                                        : marker?.placementStatus ===
                                                                          IndustryPlacementStatus.NOT_ACCEPTING_STUDENTS
                                                                        ? '/images/icons/partnered-industry-marker-uncheck.png'
                                                                        : '/images/icons/partnered-industry-marker.png'
                                                                    : '/images/icons/student-red-map-pin.png',
                                                            scaledSize:
                                                                new google.maps.Size(
                                                                    29,
                                                                    38
                                                                ),
                                                        }}
                                                        position={
                                                            marker.location
                                                        }
                                                        // label={marker.name}
                                                        clusterer={clusterer}
                                                        onMouseOver={(
                                                            e: any
                                                        ) => {
                                                            // handleMarkerClick(marker)
                                                            setStudentId(
                                                                marker?.id
                                                            )
                                                            setIndustryId(
                                                                marker?.id
                                                            )
                                                            setSelectedBox({
                                                                ...marker,
                                                                position: {
                                                                    lat: e.latLng.lat(),
                                                                    lng: e.latLng.lng(),
                                                                },
                                                            })
                                                            setShowInfoBox(true)
                                                        }}
                                                        onMouseOut={() =>
                                                            setSelectedMarker(
                                                                null
                                                            )
                                                        }
                                                        onClick={(e: any) => {
                                                            // handleMarkerClick(marker)
                                                            setStudentId(
                                                                marker?.id
                                                            )
                                                            setIndustryId(
                                                                marker?.id
                                                            )
                                                            setSelectedBox({
                                                                ...marker,
                                                                position: {
                                                                    lat: e.latLng.lat(),
                                                                    lng: e.latLng.lng(),
                                                                },
                                                            })
                                                            setShowInfoBox(true)
                                                        }}
                                                    />
                                                    {selectedBox &&
                                                        showInfoBox &&
                                                        selectedBox.id ===
                                                            marker?.id && (
                                                            <InfoBox
                                                                position={
                                                                    selectedBox?.position
                                                                }
                                                                onCloseClick={() => {
                                                                    setSelectedBox(
                                                                        null
                                                                    )
                                                                    setShowInfoBox(
                                                                        false
                                                                    )
                                                                    setStudentId(
                                                                        ''
                                                                    )
                                                                    setIndustryId(
                                                                        null
                                                                    )
                                                                }}
                                                                options={{
                                                                    closeBoxURL: ``,
                                                                    enableEventPropagation:
                                                                        true,
                                                                }}
                                                            >
                                                                {marker?.user
                                                                    ?.role &&
                                                                marker?.user
                                                                    ?.role ===
                                                                    'industry' ? (
                                                                    <IndustryInfoBoxCard
                                                                        item={
                                                                            industryDetails
                                                                        }
                                                                        selectedBox={
                                                                            selectedBox
                                                                        }
                                                                        industryId={
                                                                            industryId
                                                                        }
                                                                        setSelectedBox={
                                                                            setSelectedBox
                                                                        }
                                                                    />
                                                                ) : (
                                                                    <StudentInfoBoxCard
                                                                        item={
                                                                            studentDetails
                                                                        }
                                                                        selectedBox={
                                                                            selectedBox
                                                                        }
                                                                        studentId={
                                                                            studentId
                                                                        }
                                                                        setSelectedBox={
                                                                            setSelectedBox
                                                                        }
                                                                    />
                                                                )}
                                                            </InfoBox>
                                                        )}
                                                </div>
                                            ))}
                                    </>
                                )}
                            </MarkerClusterer>
                            {/* futureIndustryClusterOptions */}
                            {showFutureIndustries && (
                                <MarkerClusterer
                                    options={futureIndustryClusterOptions}
                                >
                                    {(clusterer) => (
                                        <>
                                            {visibleMarkers
                                                ?.filter(
                                                    (marker: any) =>
                                                        marker?.department &&
                                                        !marker?.user &&
                                                        !marker?.courses
                                                )
                                                .map((marker: any) => (
                                                    <div key={marker?.id}>
                                                        <Marker
                                                            icon={{
                                                                url:
                                                                    marker?.department &&
                                                                    '/images/icons/future-industry-pin.png',

                                                                scaledSize:
                                                                    new google.maps.Size(
                                                                        29,
                                                                        38
                                                                    ),
                                                            }}
                                                            position={
                                                                marker.location
                                                            }
                                                            // label={marker.name}
                                                            clusterer={
                                                                clusterer
                                                            }
                                                            onMouseOver={(
                                                                e: any
                                                            ) => {
                                                                // handleMarkerClick(marker)
                                                                // setStudentId(marker?.id)
                                                                // setIndustryId(
                                                                //     marker?.id
                                                                // )
                                                                setFutureIndustryId(
                                                                    marker?.id
                                                                )
                                                                setSelectedBox({
                                                                    ...marker,
                                                                    type: 'futureIndustry',
                                                                    position: {
                                                                        lat: e.latLng.lat(),
                                                                        lng: e.latLng.lng(),
                                                                    },
                                                                })
                                                                setShowInfoBox(
                                                                    true
                                                                )
                                                            }}
                                                            onMouseOut={() =>
                                                                setSelectedMarker(
                                                                    null
                                                                )
                                                            }
                                                            onClick={(
                                                                e: any
                                                            ) => {
                                                                // handleMarkerClick(marker)
                                                                // setStudentId(marker?.id)
                                                                setIndustryId(
                                                                    marker?.id
                                                                )
                                                                setFutureIndustryId(
                                                                    marker?.id
                                                                )
                                                                setSelectedBox({
                                                                    ...marker,
                                                                    type: 'futureIndustry',
                                                                    position: {
                                                                        lat: e.latLng.lat(),
                                                                        lng: e.latLng.lng(),
                                                                    },
                                                                })
                                                                setShowInfoBox(
                                                                    true
                                                                )
                                                            }}
                                                        />
                                                        {selectedBox &&
                                                            selectedBox?.type ===
                                                                'futureIndustry' &&
                                                            showInfoBox &&
                                                            selectedBox?.id ===
                                                                marker?.id &&
                                                            marker?.department &&
                                                            !marker?.courses && (
                                                                <InfoBox
                                                                    position={
                                                                        selectedBox?.position
                                                                    }
                                                                    onCloseClick={() => {
                                                                        setSelectedBox(
                                                                            null
                                                                        )
                                                                        setShowInfoBox(
                                                                            false
                                                                        )
                                                                        // setStudentId('')
                                                                        setIndustryId(
                                                                            null
                                                                        )
                                                                        setFutureIndustryId(
                                                                            null
                                                                        )
                                                                    }}
                                                                    options={{
                                                                        closeBoxURL: ``,
                                                                        enableEventPropagation:
                                                                            true,
                                                                    }}
                                                                >
                                                                    {marker?.department &&
                                                                        !marker?.courses && (
                                                                            <FutureIndustryInfoBoxCard
                                                                                item={
                                                                                    industryDetails
                                                                                }
                                                                                selectedBox={
                                                                                    selectedBox
                                                                                }
                                                                                industryId={
                                                                                    futureIndustryId
                                                                                }
                                                                                setSelectedBox={
                                                                                    setSelectedBox
                                                                                }
                                                                            />
                                                                        )}
                                                                </InfoBox>
                                                            )}
                                                    </div>
                                                ))}
                                        </>
                                    )}
                                </MarkerClusterer>
                            )}

                            <div className="absolute right-2 top-1/3 flex flex-col gap-y-2">
                                <Button
                                    text="Reset"
                                    variant="info"
                                    onClick={handleCountryView}
                                    // onClick={handleVictoriaView}
                                />
                                <Button
                                    text="Save Location"
                                    onClick={saveMapView}
                                />
                            </div>
                        </GoogleMap>
                    </div>
                </Card>
            ) : (
                !isError && (
                    <NoData text="No students with available location data found to display on the map." />
                )
            )}
        </div>
    )
}

export default DepartmentMapDetail
