import React, { useCallback, useState, useEffect } from 'react'
import {
    Marker,
    InfoBox,
    GoogleMap,
    useJsApiLoader,
    DirectionsRenderer,
} from '@react-google-maps/api'
import { Typography } from '@components'
import { RxCross2 } from 'react-icons/rx'

const center = {
    lat: -37.81374,
    lng: 144.963033,
}

const containerStyle = {
    width: '100%',
    height: '230px',
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

interface TravelInfo {
    mode: google.maps.TravelMode
    duration: string | null
    distance: string | null
}

export const WorkplaceMapView = ({
    industryLocation,
    studentLocation,
}: {
    industryLocation: string[]
    studentLocation: string[]
}) => {
    const [map, setMap] = useState<google.maps.Map | null>(null)
    const [directions, setDirections] =
        useState<google.maps.DirectionsResult | null>(null)
    const [travelInfo, setTravelInfo] = useState<TravelInfo[]>([])
    const [showInfoBox, setShowInfoBox] = useState<boolean>(true)

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyApOsp5NyUUJyW3vlZtvQ4IYf8urG7rrKA', // places api
        libraries: ['places'],
    })

    const industryLocationCoordinates = {
        lat: +industryLocation?.[0],
        lng: +industryLocation?.[1],
    }

    const studentLocationCoordinates = {
        lat: +studentLocation?.[0],
        lng: +studentLocation?.[1],
    }

    const fetchDirections = useCallback(
        (travelMode: google.maps.TravelMode) => {
            if (!map) return

            const directionsService = new google.maps.DirectionsService()
            directionsService.route(
                {
                    origin: studentLocationCoordinates,
                    destination: industryLocationCoordinates,
                    travelMode: travelMode,
                },
                (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK && result) {
                        if (travelMode === google.maps.TravelMode.DRIVING) {
                            setDirections(result)
                            console.log({ result })
                        }
                        setTravelInfo((prevInfo) => [
                            ...prevInfo.filter(
                                (info) => info.mode !== travelMode
                            ),
                            {
                                mode: travelMode,
                                duration:
                                    result.routes[0].legs[0].duration?.text ||
                                    null,
                                distance:
                                    result.routes[0].legs[0].distance?.text ||
                                    null,
                            },
                        ])
                    }
                }
            )
        },
        [map]
    )

    useEffect(() => {
        if (map) {
            fetchDirections(google.maps.TravelMode.DRIVING)
            fetchDirections(google.maps.TravelMode.TRANSIT)
            fetchDirections(google.maps.TravelMode.WALKING)
        }
    }, [map, fetchDirections])

    const onMapLoad = useCallback((map: google.maps.Map) => {
        setMap(map)
    }, [])

    const toggleInfoBox = () => {
        setShowInfoBox(!showInfoBox)
    }

    if (!isLoaded) return <div>Loading...</div>

    const infoBoxOptions: any = {
        closeBoxURL: '',
        enableEventPropagation: true,
        boxStyle: {
            opacity: 1,
            width: 'auto',
        },
        pixelOffset: new google.maps.Size(-140, -42),
        alignBottom: true,
    }

    return (
        <div className="w-full">
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={11}
                onLoad={onMapLoad}
                options={{ styles: customMapStyles }}
            >
                {directions ? (
                    <DirectionsRenderer
                        directions={directions}
                        options={{
                            suppressMarkers: true,
                            polylineOptions: {
                                strokeColor: '#1a73e8',
                                strokeWeight: 4,
                            },
                        }}
                    />
                ) : null}
                <Marker
                    icon={{
                        url: '/images/icons/student-red-map-pin.png',
                        scaledSize: new google.maps.Size(29, 38),
                    }}
                    position={studentLocationCoordinates}
                />
                <Marker
                    icon={{
                        url: '/images/icons/industry-pin-map-pin.png',
                        scaledSize: new google.maps.Size(29, 38),
                    }}
                    position={industryLocationCoordinates}
                    onClick={toggleInfoBox}
                />
                {showInfoBox && (
                    <InfoBox
                        position={
                            new google.maps.LatLng(
                                industryLocationCoordinates.lat,
                                industryLocationCoordinates.lng
                            )
                        }
                        options={infoBoxOptions}
                    >
                        <div
                            className="relative bg-white rounded-md shadow-md"
                            style={{
                                width: '280px',
                                padding: '10px',
                                overflow: 'hidden',
                            }}
                        >
                            <RxCross2
                                className="absolute top-2 right-2 cursor-pointer"
                                onClick={toggleInfoBox}
                            />
                            <div className="mb-2">
                                <Typography variant="xs" semibold>
                                    Workplace Name Here
                                </Typography>
                                <Typography variant="xxs" bold>
                                    Distance From Student Location
                                </Typography>
                            </div>

                            <div className="flex  gap-x-4">
                                {travelInfo.map((info, index) => (
                                    <div
                                        key={index}
                                        className="overflow-hidden"
                                    >
                                        <Typography variant="xxs">
                                            {info.mode.charAt(0).toUpperCase() +
                                                info.mode.slice(1)}
                                        </Typography>
                                        <Typography medium variant="xs">
                                            {info.duration}
                                        </Typography>
                                        <Typography medium variant="xxs">
                                            ({info.distance})
                                        </Typography>
                                    </div>
                                ))}
                            </div>
                            <div
                                className="absolute left-1/2 -bottom-2 w-0 h-0"
                                style={{
                                    borderLeft: '8px solid transparent',
                                    borderRight: '8px solid transparent',
                                    borderTop: '8px solid white',
                                    transform: 'translateX(-50%)',
                                }}
                            />
                        </div>
                    </InfoBox>
                )}
            </GoogleMap>
        </div>
    )
}
