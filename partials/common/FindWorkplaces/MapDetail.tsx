import { FindWorkplace } from '@components/sections'
import {
    GoogleMap,
    InfoBox,
    Marker,
    MarkerClusterer,
    useJsApiLoader,
} from '@react-google-maps/api'

import { debounce } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { InfoBoxCard } from './InfoBoxCard'
import { useGoogleMaps } from '@hooks'

const containerStyle = {
    width: '100%',
    height: '100%',
}

const center = {
    lat: -37.81374,
    lng: 144.963033,
}

export const MapDetail = ({
    resultList,
    selectedBox,
    setSelectedBox,
    selectedLocation,
    setVisibleMarkers,
    visibleMarkers,
}: any) => {
    const [map, setMap] = useState<any>(null)
    const [showInfoBox, setShowInfoBox] = useState<any>(false)
    // const [visibleMarkers, setVisibleMarkers] = useState<any[]>([])

    const { isLoaded } = useGoogleMaps()
    const latLngLocation = resultList?.map((industry: any) => {
        const lat = industry?.geometry?.location.lat()
        const lng = industry?.geometry?.location.lng()
        return {
            ...industry,
            lat: lat,
            lng: lng,
        }
    })
    useEffect(() => {
        if (map && selectedLocation) {
            const { lat, lng } = selectedLocation.geometry.location
            map.panTo({ lat: lat(), lng: lng() })
            setShowInfoBox(true)
        }
    }, [map, selectedLocation])

    // const debounceValue = useCallback(
    //     debounce((properties) => setAllVisibleIndustries(properties), 700),
    //     []
    // )

    // const onBoundChange = () => {
    //     setSelectedBox(null)
    //     setShowInfoBox(false)
    //     let industries: any = []
    //     latLngLocation?.forEach((location: any) => {
    //         const bound = map?.getBounds()?.contains({
    //             lat: Number(location?.lat),
    //             lng: Number(location?.lng),
    //         })
    //         if (bound) {
    //             industries.push(location?.place_id)
    //         }
    //     })
    //     // debounceValue(industries)
    //     industries = []
    // }
    const onBoundChange = () => {
        setSelectedBox(null)
        setShowInfoBox(false)
        let industries: any = []
        latLngLocation?.forEach((location: any) => {
            const bound = map?.getBounds()?.contains({
                lat: Number(location?.lat),
                lng: Number(location?.lng),
            })
            if (bound) {
                industries.push(location)
            }
        })
        setVisibleMarkers(industries)
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
                    visibleMarkers?.map((location: any, i: any) => {
                        return (
                            <div className="relative">
                                <Marker
                                    icon={{
                                        url: '/images/location-icon.png',
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
                                        setShowInfoBox(true)
                                        // setAllVisibleIndustries([location.id])
                                    }}
                                />
                                {selectedBox && showInfoBox && (
                                    <InfoBox
                                        position={selectedBox?.position}
                                        onCloseClick={() => {
                                            setSelectedBox(null)
                                            setShowInfoBox(false)
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
