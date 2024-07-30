// src/components/MapComponent.tsx
import { Button, Card, LoadingAnimation, NoData } from '@components'
import { CommonApi, commonApi, SubAdminApi } from '@queries'
import {
    GoogleMap,
    InfoBox,
    Marker,
    MarkerClusterer,
    useJsApiLoader,
} from '@react-google-maps/api'
import { ellipsisText, removeEmptyValues } from '@utils'
import { useCallback, useEffect, useState } from 'react'

const containerStyle = {
    width: '100%',
    height: '389px',
}

const center = { lat: -25.274398, lng: 133.775136 }

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

//
export const MapView = ({
    sector,
    suburbLocation,
    searchInitiated,
    setSearchInitiated,
    showFutureIndustries,
}: {
    sector: any
    searchInitiated: any
    suburbLocation: any
    setSearchInitiated: any
    showFutureIndustries?: any
}) => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_MAP_KEY as string,
    })
    // Select fields states
    const [location, setLocation] = useState('')

    const [visibleMarkers, setVisibleMarkers] = useState<any>([])
    const [map, setMap] = useState<google.maps.Map | null>(null)
    const [onSuburbClicked, setOnSuburbClicked] = useState<boolean>(true)

    // bounds
    const [mapCenter, setMapCenter] = useState(center)
    const [mapZoom, setMapZoom] = useState(5)
    // useSubAdminMapStudents

    const [saveCoordinates] = SubAdminApi.SubAdmin.useSaveCoordinatesForMap()
    const savedCoordinates = SubAdminApi.SubAdmin.useSavedCoordinates()

    const industriesList = commonApi.useGetSiteMapIndustriesQuery(
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
        if (industriesList?.data) {
            const markers = []
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
    }, [industriesList?.data])
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
        if (map && suburbLocation && industriesList.isSuccess) {
            setTimeout(() => {
                map.setCenter(suburbLocation)
                map.setZoom(12)
            }, 400)
        }
    }, [suburbLocation, map, industriesList.isSuccess])

    const handleCountryView = () => {
        if (map) {
            map.setCenter(australiaCenter)
            map.setZoom(3)
        }
    }

    const handleVictoriaView = () => {
        if (map) {
            map.setCenter(victoriaCenter)
            map.setZoom(8)
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
        },
        [mapCenter, mapZoom]
    )

    const onMapUnmount = useCallback(() => {
        setMap(null)
    }, [])

    const industryClusterOptions = {
        styles: industryClusterStyles,
        grid: 20,
        maxZoom: 15,
    }

    return (
        <div className="w-full flex flex-col gap-y-2.5">
            {industriesList.isError && (
                <NoData text={'Something went Wrong...!'} />
            )}
            {industriesList.isLoading ? (
                <LoadingAnimation />
            ) : visibleMarkers?.length > 0 &&
              !industriesList.isError &&
              isLoaded ? (
                <Card>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={
                            map?.getCenter()?.lat() && map?.getCenter()?.lng()
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
                        {/* Industries */}
                        <MarkerClusterer options={industryClusterOptions}>
                            {(clusterer) => (
                                <>
                                    {visibleMarkers?.map((marker: any) => (
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
                                            />
                                        </div>
                                    ))}
                                </>
                            )}
                        </MarkerClusterer>
                    </GoogleMap>
                </Card>
            ) : (
                !industriesList.isError && (
                    <NoData text="No industry location data found to display on the map." />
                )
            )}
        </div>
    )
}
