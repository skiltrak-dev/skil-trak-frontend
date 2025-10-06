import {
    GoogleMap,
    InfoBox,
    Marker,
    MarkerClusterer,
} from '@react-google-maps/api'
import React, { useCallback, useState } from 'react'
import { useGoogleMaps } from '@hooks'
import { FutureIndustryInfoBoxCard } from './FutureIndustryInfoBoxCard'

export const MapView = ({ listingResults }: { listingResults: any }) => {
    const { isLoaded } = useGoogleMaps()
    const [map, setMap] = useState<google.maps.Map | null>(null)
    const [selectedBox, setSelectedBox] = useState<any>(null)

    const containerStyle = {
        width: '100%',
        height: '389px',
    }

    const center = {
        lat: -28.0, // slightly above Tasmania
        lng: 134.0, // middle of Australia
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

    const futureIndustryClusterStyles = [
        {
            textColor: 'white',
            url: '/images/icons/industry-cluster.svg',
            height: 50,
            width: 50,
        },
    ]

    const onBoundChange = useCallback(() => {
        const bounds = map?.getBounds()
        if (!bounds) return
    }, [map])

    const onMapLoad = useCallback(
        (map: any) => {
            setMap(map)
            map.addListener('bounds_changed', onBoundChange)
            map.addListener('idle', () => {})
        },
        [onBoundChange]
    )

    const onMapUnmount = useCallback(() => {
        setMap(null)
    }, [])

    const futureIndustryClusterOptions = {
        styles: futureIndustryClusterStyles,
        grid: 20,
        maxZoom: 15,
    }

    return (
        <div>
            {isLoaded && (
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
                    zoom={3.6}
                    onLoad={onMapLoad}
                    onUnmount={onMapUnmount}
                    options={{ styles: customMapStyles }}
                >
                    <MarkerClusterer options={futureIndustryClusterOptions}>
                        {(clusterer) => (
                            <>
                                {listingResults?.map((marker: any) => (
                                    <div key={marker?.id}>
                                        <Marker
                                            icon={{
                                                url: '/images/icons/future-industry-pin.png',
                                                scaledSize:
                                                    new google.maps.Size(
                                                        29,
                                                        38
                                                    ),
                                            }}
                                            position={marker?.location}
                                            clusterer={clusterer}
                                            onMouseOver={(e: any) => {
                                                setSelectedBox({
                                                    ...marker,
                                                    position: {
                                                        lat: e.latLng.lat(),
                                                        lng: e.latLng.lng(),
                                                    },
                                                })
                                            }}
                                            onClick={(e: any) => {
                                                setSelectedBox({
                                                    ...marker,
                                                    position: {
                                                        lat: e.latLng.lat(),
                                                        lng: e.latLng.lng(),
                                                    },
                                                })
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
                                                    enableEventPropagation:
                                                        true,
                                                }}
                                            >
                                                <FutureIndustryInfoBoxCard
                                                    selectedBox={selectedBox}
                                                    setSelectedBox={
                                                        setSelectedBox
                                                    }
                                                />
                                            </InfoBox>
                                        )}
                                    </div>
                                ))}
                            </>
                        )}
                    </MarkerClusterer>
                </GoogleMap>
            )}
        </div>
    )
}
