// src/components/MapComponent.tsx
import React, { useState, useCallback, useEffect, useRef } from 'react'
import {
    Button,
    LoadingAnimation,
    NoData,
    Select,
    TextInput,
} from '@components'
import {
    GoogleMap,
    LoadScript,
    Marker,
    MarkerClusterer,
    Polyline,
    DirectionsService,
    InfoWindow,
    useJsApiLoader,
    InfoBox,
    OverlayView,
} from '@react-google-maps/api'
import { ellipsisText } from '@utils'
import { SubAdminApi } from '@queries'
import { InfoBoxCard } from '../FindWorkplaces'
import { StudentInfoBoxCard } from './StudentInfoBoxCard'
import { removeEmptyValues } from '@utils'
import { IndustryInfoBoxCard } from './IndustryInfoBoxCard'

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

const australiaCenter = { lat: -25.274398, lng: 133.775136 }
const victoriaCenter = { lat: -37.8136, lng: 144.9631 }
export const SubAdminDashboardMap = ({ sectorsOptions }: any) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyCMEGspm5WHyXte3TN4Lfrkcg9DchsbYEk',
    })
    // Select fields states
    const [location, setLocation] = useState('')
    const [rto, setRto] = useState('')
    const [sector, setSector] = useState('')
    const [workplaceType, setWorkplaceType] = useState('')

    const [selectedBox, setSelectedBox] = useState<any>(null)
    const [studentId, setStudentId] = useState<any>(null)
    const [industryId, setIndustryId] = useState<any>(null)
    const [showInfoBox, setShowInfoBox] = useState<any>(false)
    const [visibleMarkers, setVisibleMarkers] = useState<any>([])
    const [map, setMap] = useState<google.maps.Map | null>(null)
    // bounds
    const [mapCenter, setMapCenter] = useState(center)
    const [mapZoom, setMapZoom] = useState(5)

    // useSubAdminMapStudents
    const industryDetails =
        SubAdminApi.Workplace.useSubAdminMapSuggestedIndustryDetail(
            industryId,
            {
                skip: !industryId,
            }
        )
    const { data, isLoading, isError, isFetching } =
        SubAdminApi.SubAdmin.useSubAdminMapStudents(
            {
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
            },
            {
                refetchOnMountOrArgChange: true,
            }
        )
    const industriesList = SubAdminApi.SubAdmin.useSubAdminMapIndustries(
        {
            search: `${JSON.stringify(
                removeEmptyValues({
                    sectorId: sector,
                    // rtoId: rto,
                    // suburb: location,
                    // currentStatus: workplaceType,
                })
            )
                .replaceAll('{', '')
                .replaceAll('}', '')
                .replaceAll('"', '')
                .trim()}`,
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
        ?.filter((suburb: any) => suburb?.suburb !== 'NA')
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
        if (data || industriesList?.data) {
            const markers = []

            if (data) {
                const filteredStudents = data.filter(
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

            setVisibleMarkers(markers)
        }
    }, [data, industriesList?.data])

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
        }
    }, [map, visibleMarkers])

    const handleCountryView = () => {
        if (map) {
            map.setCenter(australiaCenter)
            map.setZoom(4) // Adjust the zoom level as needed
        }
    }

    const handleVictoriaView = () => {
        if (map) {
            map.setCenter(victoriaCenter)
            map.setZoom(8) // Adjust the zoom level as needed
        }
    }

    // const onBoundChange = useCallback(() => {
    //     setSelectedBox(null)
    //     setIndustryId(null)
    //     setShowInfoBox(false)
    //     setStudentId('')
    //     if (!map) return

    //     const bounds = map.getBounds()
    //     if (!bounds) return

    //     const updatedVisibleMarkers = visibleMarkers.filter((marker: any) => {
    //         const latLng = new google.maps.LatLng(
    //             marker.location.lat,
    //             marker.location.lng
    //         )
    //         return bounds.contains(latLng)
    //     })

    //     setVisibleMarkers(updatedVisibleMarkers)
    // }, [map])
    const onBoundChange = useCallback(() => {
        if (map) {
            const newCenter = map.getCenter()
            const newZoom = map.getZoom()
            if (newZoom !== undefined && newCenter !== undefined) {
                setMapCenter({
                    lat: newCenter.lat(),
                    lng: newCenter.lng(),
                })
            }
            if (newZoom !== undefined) {
                setMapZoom(newZoom)
            }
        }
    }, [map])
    console.log('MapCenter', mapCenter)

    const onMapLoad = useCallback(
        (map: any) => {
            setMap(map)
            map.addListener('bounds_changed', onBoundChange)
        },
        [onBoundChange]
    )

    const onMapUnmount = useCallback(() => {
        setMap(null)
    }, [])

    const options = {
        imagePath:
            'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m',
        grid: 20,
        maxZoom: 15,
    }

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

    return (
        <div className="w-full">
            <div className="grid grid-cols-4 items-center gap-x-2 w-full">
                <Select
                    name="suburb"
                    options={suburbOptions}
                    label={'Suburb'}
                    loading={suburbsList?.isLoading || suburbsList?.isFetching}
                    onChange={(e: any) => {
                        setLocation(e?.value)
                    }}
                    placeholder="Select Suburb"
                />
                <Select
                    name="rto"
                    options={rtoOptions}
                    label={'RTO'}
                    loading={rtosList?.isLoading || rtosList?.isFetching}
                    onChange={(e: any) => {
                        setRto(e?.value)
                    }}
                    placeholder="Select RTO"
                />
                <Select
                    name="sector"
                    options={sectorsOptions}
                    label={'Sector'}
                    onChange={(e: any) => {
                        setSector(e?.value)
                    }}
                    placeholder="Select Sector"
                />
                <Select
                    name="workplaceType"
                    options={[
                        {
                            label: 'Placement Started',
                            value: 'placementStarted',
                        },
                        // {
                        //     label: 'Student Provided',
                        //     value: 'studentProvided',
                        // },
                        {
                            label: 'Placement Completed',
                            value: 'completed',
                        },
                        {
                            label: 'Placement Terminated',
                            value: 'terminated',
                        },
                    ]}
                    label={'Workplace Type'}
                    onChange={(e: any) => {
                        setWorkplaceType(e?.value)
                    }}
                    placeholder="Workplace Type"
                />
            </div>

            {isError && <NoData text={'Something went Wrong...!'} />}
            {isLoading || isFetching ? (
                <LoadingAnimation />
            ) : visibleMarkers?.length > 0 && !isError && isLoaded ? (
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={5}
                    onLoad={onMapLoad}
                    onUnmount={onMapUnmount}
                    onBoundsChanged={onBoundChange}
                    options={{ styles: customMapStyles }}
                >
                    <MarkerClusterer options={studentClusterOptions}>
                        {(clusterer) => (
                            <>
                                {visibleMarkers
                                    ?.filter((marker: any) => !marker?.user)
                                    ?.map((marker: any) => (
                                        <div key={marker?.id}>
                                            <Marker
                                                icon={{
                                                    url:
                                                        marker?.user?.role &&
                                                        marker?.user?.role ===
                                                            'industry'
                                                            ? '/images/icons/industry-pin-map-pin.png'
                                                            : '/images/icons/student-red-map-pin.png',
                                                    scaledSize:
                                                        new google.maps.Size(
                                                            29,
                                                            38
                                                        ),
                                                }}
                                                position={marker?.location}
                                                // label={marker.name}
                                                clusterer={clusterer}
                                                onMouseOver={(e: any) => {
                                                    // handleMarkerClick(marker)
                                                    setStudentId(marker?.id)
                                                    setIndustryId(marker?.id)
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
                                                    setSelectedMarker(null)
                                                }
                                                onClick={(e: any) => {
                                                    // handleMarkerClick(marker)
                                                    setStudentId(marker?.id)
                                                    setIndustryId(marker?.id)
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
                                                            setSelectedBox(null)
                                                            setShowInfoBox(
                                                                false
                                                            )
                                                            setStudentId('')
                                                            setIndustryId(null)
                                                        }}
                                                        options={{
                                                            closeBoxURL: ``,
                                                            enableEventPropagation:
                                                                true,
                                                        }}
                                                    >
                                                        {marker?.user?.role &&
                                                        marker?.user?.role ===
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
                                            marker?.user &&
                                            marker?.user?.role === 'industry'
                                    )
                                    .map((marker: any) => (
                                        <div key={marker?.id}>
                                            <Marker
                                                icon={{
                                                    url:
                                                        marker?.user?.role &&
                                                        marker?.user?.role ===
                                                            'industry'
                                                            ? '/images/icons/industry-pin-map-pin.png'
                                                            : '/images/icons/student-red-map-pin.png',
                                                    scaledSize:
                                                        new google.maps.Size(
                                                            29,
                                                            38
                                                        ),
                                                }}
                                                position={marker.location}
                                                // label={marker.name}
                                                clusterer={clusterer}
                                                onMouseOver={(e: any) => {
                                                    // handleMarkerClick(marker)
                                                    setStudentId(marker?.id)
                                                    setIndustryId(marker?.id)
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
                                                    setSelectedMarker(null)
                                                }
                                                onClick={(e: any) => {
                                                    // handleMarkerClick(marker)
                                                    setStudentId(marker?.id)
                                                    setIndustryId(marker?.id)
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
                                                            setSelectedBox(null)
                                                            setShowInfoBox(
                                                                false
                                                            )
                                                            setStudentId('')
                                                            setIndustryId(null)
                                                        }}
                                                        options={{
                                                            closeBoxURL: ``,
                                                            enableEventPropagation:
                                                                true,
                                                        }}
                                                    >
                                                        {marker?.user?.role &&
                                                        marker?.user?.role ===
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
                    <div className="absolute right-2 top-1/3 flex flex-col gap-y-2">
                        <Button
                            text="Reset"
                            variant="info"
                            onClick={handleCountryView}
                        />
                        <Button
                            text="Save Location"
                            onClick={handleVictoriaView}
                        />
                    </div>
                    {/* {directions && renderPolyline()}
                    {renderDirections()} */}
                </GoogleMap>
            ) : (
                !isError && (
                    <NoData text="No students with available location data found to display on the map." />
                )
            )}
        </div>
    )
}
