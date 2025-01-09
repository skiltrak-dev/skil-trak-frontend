import { NoData, Typography } from '@components'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Map, {
    Marker,
    Popup,
    Source,
    Layer,
    NavigationControl,
} from 'react-map-gl'
import { RxCross2 } from 'react-icons/rx'
import 'mapbox-gl/dist/mapbox-gl.css'

const MAPBOX_TOKEN = process.env.mapBoxApi as string

const center = {
    latitude: -37.81374,
    longitude: 144.963033,
}

interface TravelInfo {
    mode: 'driving' | 'walking' | 'transit'
    duration: string | null
    distance: string | null
}

export const WorkplaceMapBoxView = ({
    studentLocation,
    industryLocation,
    workplaceName,
    showMap,
}: {
    workplaceName: string
    studentLocation: string[]
    industryLocation: string[]
    showMap: boolean
}) => {
    const [directions, setDirections] = useState<any>(null)
    const [travelInfo, setTravelInfo] = useState<TravelInfo[]>([])
    const [showPopup, setShowPopup] = useState<boolean>(true)

    const industryLocationCoordinates = useMemo(
        () => ({
            latitude: +industryLocation?.[0],
            longitude: +industryLocation?.[1],
        }),
        [industryLocation]
    )

    const studentLocationCoordinates = useMemo(
        () => ({
            latitude: +studentLocation?.[0],
            longitude: +studentLocation?.[1],
        }),
        [studentLocation]
    )

    const midpoint = useMemo(() => {
        return {
            latitude:
                (studentLocationCoordinates.latitude +
                    industryLocationCoordinates.latitude) /
                2,
            longitude:
                (studentLocationCoordinates.longitude +
                    industryLocationCoordinates.longitude) /
                2,
        }
    }, [studentLocationCoordinates, industryLocationCoordinates])

    const fetchDirections = useCallback(
        async (mode: 'driving' | 'walking' | 'transit') => {
            try {
                const profile = mode === 'transit' ? 'driving' : mode // Mapbox doesn't support transit routing
                const response = await fetch(
                    `https://api.mapbox.com/directions/v5/mapbox/${profile}/` +
                        `${studentLocationCoordinates.longitude},${studentLocationCoordinates.latitude};` +
                        `${industryLocationCoordinates.longitude},${industryLocationCoordinates.latitude}` +
                        `?geometries=geojson&access_token=${MAPBOX_TOKEN}`
                )

                const data = await response.json()

                if (data.routes && data.routes[0]) {
                    if (mode === 'driving') {
                        setDirections({
                            type: 'Feature',
                            properties: {},
                            geometry: data.routes[0].geometry,
                        })
                    }

                    // Convert duration from seconds to readable format
                    const duration = Math.round(data.routes[0].duration / 60)
                    const durationText =
                        duration > 60
                            ? `${Math.floor(duration / 60)} hr ${
                                  duration % 60
                              } min`
                            : `${duration} min`

                    // Convert distance from meters to kilometers
                    const distance =
                        Math.round(data.routes[0].distance / 100) / 10
                    const distanceText = `${distance} km`

                    setTravelInfo((prevInfo) => [
                        ...prevInfo.filter((info) => info.mode !== mode),
                        {
                            mode,
                            duration: durationText,
                            distance: distanceText,
                        },
                    ])
                }
            } catch (error) {
                console.error('Error fetching directions:', error)
            }
        },
        [industryLocationCoordinates, studentLocationCoordinates]
    )

    useEffect(() => {
        const travelModes: ('driving' | 'walking' | 'transit')[] = [
            'driving',
            'walking',
            'transit',
        ]
        travelModes.forEach((mode) => fetchDirections(mode))
    }, [fetchDirections])

    if (!showMap)
        return (
            <NoData text="No Inustry location or Student Location available for map view" />
        )

    return (
        <div className="w-full">
            <Map
                mapboxAccessToken={MAPBOX_TOKEN}
                initialViewState={{
                    ...midpoint,
                    zoom: 8,
                }}
                style={{ width: '100%', height: '280px' }}
                mapStyle="mapbox://styles/mapbox/streets-v11"
            >
                {showPopup && (
                    <Popup
                        longitude={industryLocationCoordinates?.longitude}
                        latitude={industryLocationCoordinates?.latitude}
                        closeButton={false}
                        className="workplace-popup"
                        closeOnClick={false}
                        style={{
                            width: '280px',
                            // height: '100%',
                        }}
                    >
                        <RxCross2
                            className="absolute top-2 right-2 cursor-pointer"
                            onClick={() => setShowPopup(false)}
                        />
                        {/* <div className="mb-2">
                            <Typography variant="xs" semibold>
                                {workplaceName}
                            </Typography>
                            <Typography variant="xxs" bold>
                                Distance From Student Location
                            </Typography>
                        </div>

                        <div className="flex gap-x-4">
                            {travelInfo?.map((info, index) => (
                                <div key={index} className="overflow-hidden">
                                    <Typography variant="xxs">
                                        {info?.mode?.charAt(0).toUpperCase() +
                                            info?.mode?.slice(1)}
                                    </Typography>
                                    <Typography medium variant="xs">
                                        {info?.duration}
                                    </Typography>
                                    <Typography medium variant="xxs">
                                        ({info?.distance})
                                    </Typography>
                                </div>
                            ))}
                        </div> */}
                        <div
                            // className="relative bg-white rounded-md shadow-md"
                            style={{
                                width: '280px',
                                padding: '10px',
                                overflow: 'hidden',
                            }}
                        >
                            <div className="mb-2">
                                <Typography variant="xs" semibold>
                                    {workplaceName}
                                </Typography>
                                <Typography variant="xxs" bold>
                                    Distance From Student Location
                                </Typography>
                            </div>

                            <div className="flex gap-x-4">
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
                    </Popup>
                )}
                <NavigationControl />

                {directions && (
                    <Source type="geojson" data={directions}>
                        <Layer
                            id="route"
                            type="line"
                            paint={{
                                'line-color': '#1a73e8',
                                'line-width': 4,
                            }}
                        />
                    </Source>
                )}

                <Marker
                    longitude={studentLocationCoordinates.longitude}
                    latitude={studentLocationCoordinates.latitude}
                >
                    <img
                        src="/images/icons/student-red-map-pin.png"
                        alt="Student Location"
                        style={{ width: '29px', height: '38px' }}
                    />
                </Marker>

                <Marker
                    longitude={industryLocationCoordinates.longitude}
                    latitude={industryLocationCoordinates.latitude}
                    onClick={() => setShowPopup(true)}
                >
                    <img
                        src="/images/icons/industry-pin-map-pin.png"
                        alt="Industry Location"
                        style={{
                            width: '29px',
                            height: '38px',
                            cursor: 'pointer',
                        }}
                    />
                </Marker>
            </Map>
        </div>
    )
}
