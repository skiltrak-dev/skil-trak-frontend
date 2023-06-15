import { FindWorkplace } from '@components/sections'
import {
    GoogleMap,
    InfoBox,
    Marker,
    MarkerClusterer,
    useJsApiLoader,
} from '@react-google-maps/api'

import { debounce } from 'lodash'
import { useCallback, useState } from 'react'
import { InfoBoxCard } from './InfoBoxCard'

const containerStyle = {
    width: '100%',
    height: '100%',
}

const center = {
    lat: -37.81374,
    lng: 144.963033,
}

export const MapDetail = ({ resultList, selectedBox, setSelectedBox }: any) => {
    const [map, setMap] = useState<any>(null)

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyCMEGspm5WHyXte3TN4Lfrkcg9DchsbYEk',
    })
    const latLngLocation = resultList?.map((industry: any) => {
        const lat = industry?.geometry?.location.lat()
        const lng = industry?.geometry?.location.lng()
        return {
            ...industry,
            lat: lat,
            lng: lng,
        }
    })

    // const debounceValue = useCallback(
    //     debounce((properties) => setAllVisibleIndustries(properties), 700),
    //     []
    // )

    const onBoundChange = () => {
        setSelectedBox(null)
        let industries: any = []
        latLngLocation?.forEach((location: any) => {
            const bound = map?.getBounds()?.contains({
                lat: Number(location?.lat),
                lng: Number(location?.lng),
            })
            if (bound) {
                industries.push(location?.place_id)
            }
        })
        // debounceValue(industries)
        industries = []
    }

    const onLoad = useCallback(function callback(map: any) {
        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map: any) {
        setMap(null)
    }, [])

    const clusterOptions = {
        imagePath:
            'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', // so you must have m1.png, m2.png, m3.png, m4.png, m5.png and m6.png in that folder
    }

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onBoundsChanged={onBoundChange}
        >
            <MarkerClusterer options={clusterOptions}>
                {(clusterer) =>
                    latLngLocation?.map((location: any, i: any) => {
                        return (
                            <div className="relative">
                                <Marker
                                    icon={{
                                        url: '/images/icons/industry.png',
                                        scaledSize: new google.maps.Size(
                                            29,
                                            38
                                        ),
                                    }}
                                    key={location?.id}
                                    position={{
                                        lat: Number(location?.lat),
                                        lng: Number(location?.lng),
                                    }}
                                    clusterer={clusterer}
                                    onClick={(e: any) => {
                                        setSelectedBox({
                                            ...location,
                                            position: {
                                                lat: e.latLng.lat(),
                                                lng: e.latLng.lng(),
                                            },
                                        })

                                        // setAllVisibleIndustries([location.id])
                                    }}
                                />
                                {selectedBox && (
                                    <InfoBox
                                        position={selectedBox?.position}
                                        onCloseClick={() => {
                                            setSelectedBox(null)
                                        }}
                                        options={{
                                            closeBoxURL: ``,
                                            enableEventPropagation: true,
                                        }}
                                    >
                                        <InfoBoxCard
                                            item={resultList}
                                            selectedBox={selectedBox}
                                            setSelectedBox={setSelectedBox}
                                        />
                                    </InfoBox>
                                )}
                            </div>
                        )
                    })
                }
            </MarkerClusterer>
        </GoogleMap>
    ) : (
        <></>
    )
}
