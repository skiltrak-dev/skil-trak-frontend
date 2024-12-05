import Map, { Marker, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import { Button, Card, LoadingAnimation, NoData } from '@components'
import { useGoogleMaps } from '@hooks'
import { CommonApi, SubAdminApi } from '@queries'

import { ellipsisText, removeEmptyValues } from '@utils'
import { useCallback, useEffect, useState } from 'react'
import { IndustryInfoBoxCard } from './IndustryInfoBoxCard'
import { StudentInfoBoxCard } from './StudentInfoBoxCard'
import { IndustryPlacementStatus } from '@partials/common/IndustryProfileDetail'
import Image from 'next/image'

const australiaCenter = {
    latitude: -25.2744,
    longitude: 133.7751,
    zoom: 3,
}

const center = {
    latitude: -37.8136,
    longitude: 144.9631,
    zoom: 5,
}

export const MapBoxDetails = ({
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
    // State management
    const [viewState, setViewState] = useState(center)
    const [location, setLocation] = useState('')
    const [selectedBox, setSelectedBox] = useState<any>(null)
    const [studentId, setStudentId] = useState<any>(null)
    const [industryId, setIndustryId] = useState(null)
    const [futureIndustryId, setFutureIndustryId] = useState(null)
    const [showInfoBox, setShowInfoBox] = useState(false)
    const [visibleMarkers, setVisibleMarkers] = useState([])

    // API calls using the same hooks as provided
    const industryDetails =
        SubAdminApi.Workplace.useSubAdminMapSuggestedIndustryDetail(
            industryId,
            { skip: !industryId }
        )

    const [saveCoordinates, saveCoordinatesResults] =
        SubAdminApi.SubAdmin.useSaveCoordinatesForMap()
    const savedCoordinates = SubAdminApi.SubAdmin.useSavedCoordinates()

    const { data, isLoading, isSuccess, isError, isFetching } =
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
                    suburb: location,
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

    const futureIndustries = CommonApi.FindWorkplace.mapFutureIndustries(
        {
            search: `${JSON.stringify(
                removeEmptyValues({
                    sectorId: sector,
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

    // Student details fetch
    const studentDetails = SubAdminApi.SubAdmin.useSubAdminMapStudentDetail(
        studentId,
        { skip: !studentId }
    )

    useEffect(() => {
        if (data || industriesList?.data || futureIndustries?.data) {
            const markers: any = []

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
                        return {
                            ...student,
                            location: { latitude: lat, longitude: lng },
                        }
                    }
                )
                markers.push(...transformedStudents)
            }

            if (industriesList?.data) {
                const filteredIndustries = industriesList?.data?.filter(
                    (industry: any) =>
                        industry?.location && industry?.location !== 'NA'
                )
                const transformedIndustries = filteredIndustries?.map(
                    (industry: any) => {
                        const [lat, lng] = industry?.location
                            .split(',')
                            .map(Number)
                        return {
                            ...industry,
                            location: { latitude: lat, longitude: lng },
                        }
                    }
                )
                markers.push(...transformedIndustries)
            }

            if (futureIndustries?.data?.length) {
                const filteredIndustries = futureIndustries?.data?.filter(
                    (industry: any) =>
                        industry?.location && industry?.location !== 'NA'
                )
                const transformedFutureIndustries = filteredIndustries?.map(
                    (industry: any) => {
                        const [lat, lng] = industry?.location
                            .split(',')
                            .map(Number)
                        return {
                            ...industry,
                            location: { latitude: lat, longitude: lng },
                        }
                    }
                )
                markers.push(...transformedFutureIndustries)
            }

            setVisibleMarkers(markers)
        }
    }, [data, industriesList?.data, futureIndustries?.data])

    useEffect(() => {
        if (suburbLocation && isSuccess) {
            setViewState({
                latitude: suburbLocation?.lat,
                longitude: suburbLocation?.lng,
                zoom: 12,
            })
        }
    }, [suburbLocation, isSuccess])

    const handleCountryView = () => {
        setViewState(australiaCenter)
    }

    const saveMapView = () => {
        const coordinates = {
            lat: viewState.latitude,
            lng: viewState.longitude,
            zoom: viewState.zoom,
        }
        saveCoordinates(coordinates)
    }

    useEffect(() => {
        if (savedCoordinates?.data && !searchInitiated) {
            setViewState({
                latitude: Number(savedCoordinates.data.lat),
                longitude: Number(savedCoordinates.data.lng),
                zoom: Number(savedCoordinates.data.zoom),
            })
        }
    }, [savedCoordinates, searchInitiated])

    const handleMarkerClick = (marker: any) => {
        setStudentId(marker.id)
        setIndustryId(marker.id)
        setSelectedBox({
            ...marker,
            position: {
                latitude: marker?.location?.latitude,
                longitude: marker?.location?.longitude,
            },
        })
        setShowInfoBox(true)
        localStorage.setItem('pinnedStudentId', marker.id)
    }

    return (
        <div className="w-full flex flex-col gap-y-2.5">
            {isError && <NoData text={'Something went Wrong...!'} />}
            {isLoading ? (
                <LoadingAnimation />
            ) : visibleMarkers?.length > 0 && !isError ? (
                <Card>
                    <Map
                        mapboxAccessToken={process.env.mapBoxApi as string}
                        {...viewState}
                        onMove={(evt: any) => setViewState(evt?.viewState)}
                        style={{ width: '100%', height: '600px' }}
                        mapStyle="mapbox://styles/mapbox/streets-v11"
                    >
                        {visibleMarkers
                            ?.filter(
                                (marker: any) =>
                                    !marker?.user &&
                                    !marker?.department &&
                                    marker?.courses
                            )
                            ?.map((marker: any) => (
                                <Marker
                                    key={marker.id}
                                    latitude={marker?.location?.latitude}
                                    longitude={marker?.location?.longitude}
                                    onClick={() => handleMarkerClick(marker)}
                                >
                                    <img
                                        src={
                                            marker?.user?.role &&
                                            marker?.user?.role === 'industry'
                                                ? marker?.placementStatus ===
                                                  IndustryPlacementStatus.ACCEPTING_STUDENTS
                                                    ? '/images/icons/industry-pin-map-pin-check.png'
                                                    : marker?.placementStatus ===
                                                      IndustryPlacementStatus.NOT_ACCEPTING_STUDENTS
                                                    ? '/images/icons/industry-pin-map-pin-uncheck.png'
                                                    : '/images/icons/industry-pin-map-pin.png'
                                                : '/images/icons/student-red-map-pin.png'
                                        }
                                        alt="marker"
                                        className="w-8 h-10"
                                    />
                                </Marker>
                            ))}

                        {/* Industries */}

                        {visibleMarkers
                            ?.filter(
                                (marker: any) =>
                                    !marker?.isPartner &&
                                    marker?.user &&
                                    !marker?.department &&
                                    marker?.user?.role === 'industry'
                            )
                            .map((marker: any) => (
                                <div key={marker?.id}>
                                    <Marker
                                        key={marker?.id}
                                        latitude={marker?.location?.latitude}
                                        longitude={marker?.location?.longitude}
                                        onClick={() =>
                                            handleMarkerClick(marker)
                                        }
                                    >
                                        {' '}
                                        <Image
                                            src={
                                                marker?.user?.role &&
                                                marker?.user?.role ===
                                                    'industry'
                                                    ? marker?.placementStatus ===
                                                      IndustryPlacementStatus.ACCEPTING_STUDENTS
                                                        ? '/images/icons/partnered-industry-marker-check.png'
                                                        : marker?.placementStatus ===
                                                          IndustryPlacementStatus.NOT_ACCEPTING_STUDENTS
                                                        ? '/images/icons/partnered-industry-marker-uncheck.png'
                                                        : '/images/icons/partnered-industry-marker.png'
                                                    : '/images/icons/student-red-map-pin.png'
                                            }
                                            alt="marker"
                                            width={100}
                                            height={100}
                                            className="w-8 h-10"
                                        />
                                    </Marker>
                                </div>
                            ))}
                        {/* isPartner Industries */}
                        {/* {visibleMarkers
                            ?.filter(
                                (marker: any) =>
                                    marker?.user &&
                                    !marker?.department &&
                                    marker?.user?.role === 'industry' &&
                                    marker?.isPartner
                            )
                            .map((marker: any) => (
                                <div key={marker?.id}>
                                    <Marker
                                        key={marker.id}
                                        latitude={marker.location.latitude}
                                        longitude={marker.location.longitude}
                                        onClick={() =>
                                            handleMarkerClick(marker)
                                        }
                                    >
                                        <img
                                            src={
                                                marker?.user?.role ===
                                                'industry'
                                                    ? marker?.placementStatus ===
                                                      IndustryPlacementStatus.ACCEPTING_STUDENTS
                                                        ? '/images/icons/industry-pin-map-pin-check.png'
                                                        : marker?.placementStatus ===
                                                          IndustryPlacementStatus.NOT_ACCEPTING_STUDENTS
                                                        ? '/images/icons/industry-pin-map-pin-uncheck.png'
                                                        : '/images/icons/industry-pin-map-pin.png'
                                                    : '/images/icons/student-red-map-pin.png'
                                            }
                                            alt="marker"
                                            className="w-8 h-10"
                                        />
                                    </Marker>
                                </div>
                            ))} */}
                        {/* Future Industries */}
                        {showFutureIndustries && (
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
                                                key={marker.id}
                                                latitude={
                                                    marker?.location?.latitude
                                                }
                                                longitude={
                                                    marker?.location?.longitude
                                                }
                                                onClick={() => {
                                                    handleMarkerClick(marker)
                                                    setFutureIndustryId(
                                                        marker?.id
                                                    )
                                                }}
                                            >
                                                {' '}
                                                <Image
                                                    src={
                                                        '/images/icons/future-industry-pin.png'
                                                    }
                                                    alt="marker"
                                                    width={100}
                                                    height={100}
                                                    className="w-8 h-10"
                                                />
                                            </Marker>
                                        </div>
                                    ))}
                            </>
                        )}
                        {selectedBox && showInfoBox && (
                            <Popup
                                latitude={selectedBox?.position?.latitude}
                                longitude={selectedBox?.position?.longitude}
                                onClose={() => {
                                    setSelectedBox(null)
                                    setShowInfoBox(false)
                                    setStudentId('')
                                    setIndustryId(null)
                                }}
                                closeOnClick={false}
                            >
                                {selectedBox?.user?.role === 'industry' ? (
                                    <IndustryInfoBoxCard
                                        item={industryDetails}
                                        selectedBox={selectedBox}
                                        industryId={industryId}
                                        setSelectedBox={setSelectedBox}
                                    />
                                ) : (
                                    <StudentInfoBoxCard
                                        item={studentDetails}
                                        selectedBox={selectedBox}
                                        studentId={studentId}
                                        setSelectedBox={setSelectedBox}
                                    />
                                )}
                            </Popup>
                        )}

                        <div className="absolute right-2 top-1/3 flex flex-col gap-y-2">
                            <Button variant="info" onClick={handleCountryView}>
                                Reset
                            </Button>
                            <Button onClick={saveMapView}>Save Location</Button>
                        </div>
                    </Map>
                </Card>
            ) : (
                !isError && (
                    <NoData text="No students with available location data found to display on the map." />
                )
            )}
        </div>
    )
}
