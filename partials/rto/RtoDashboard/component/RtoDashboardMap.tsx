import { Typography } from '@components'
import { UserRoles } from '@constants'
import { useGoogleMaps } from '@hooks'
import { CommonApi, RtoApi } from '@queries'
import { GoogleMap, Marker, MarkerClusterer } from '@react-google-maps/api'
import { useCallback, useEffect, useState } from 'react'
import { fromAddress, setKey } from 'react-geocode'

const containerStyle = {
    width: '100%',
    height: '100%',
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

setKey(process.env.NEXT_PUBLIC_MAP_KEY as string)
export const RtoDashboardMap = ({ address }: { address: string }) => {
    const [map, setMap] = useState<google.maps.Map | null>(null)
    const [visibleMarkers, setVisibleMarkers] = useState<any>([])

    useEffect(() => {
        // Function to get latitude and longitude from address
        const getLatLngFromAddress = async () => {
            try {
                if (address) {
                    const response = await fromAddress(address)

                    const { lat, lng } = response.results[0]?.geometry?.location
                    if (map) {
                        map.setCenter({ lat, lng })
                        map.setZoom(13)
                    }
                }
            } catch (error) {
                console.error('Error getting lat/lng from address:', error)
            }
        }

        // Call the function to fetch lat/lng
        getLatLngFromAddress()
    }, [address, map])

    const { isLoaded } = useGoogleMaps()

    const industries = RtoApi.Rto.rtoMapIndustries()
    const futureIndustries = CommonApi.FindWorkplace.mapFutureIndustries(
        undefined,
        {
            refetchOnMountOrArgChange: true,
        }
    )

    const onBoundChange = useCallback(() => {}, [map])

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

    useEffect(() => {
        if (industries?.data || futureIndustries?.data) {
            const markers = []

            if (industries?.data) {
                const filteredIndustries = industries?.data?.filter(
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
    }, [industries, futureIndustries])
    return (
        <div className={'flex flex-col gap-y-1 h-full'}>
            {/* {JSON.stringify(abc())} */}
            <Typography center variant="label" semibold>
                Industries On Skiltrak Data Base According to Your Courses
            </Typography>
            <div className={'rounded-md overflow-hidden h-full'}>
                {isLoaded ? (
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={5}
                        onLoad={onMapLoad}
                        onUnmount={onMapUnmount}
                        // onBoundsChanged={onBoundChange}
                        options={{ styles: customMapStyles }}
                    >
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
                                                    UserRoles.INDUSTRY
                                        )
                                        .map((marker: any) => (
                                            <div key={marker?.id}>
                                                <Marker
                                                    icon={{
                                                        url: '/images/icons/industry-pin-map-pin.png',
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
                                                    UserRoles.INDUSTRY &&
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
                                                                UserRoles.INDUSTRY
                                                                ? '/images/icons/partnered-industry-marker.png'
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
                        {/* futureIndustryClusterOptions */}
                        <MarkerClusterer options={futureIndustryClusterOptions}>
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
                ) : (
                    ''
                )}
            </div>
        </div>
    )
}
