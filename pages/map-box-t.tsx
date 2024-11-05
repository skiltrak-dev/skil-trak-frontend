import React, { useState, useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'

interface Marker {
    lng: number
    lat: number
    title?: string
    description?: string
    color?: string
}

interface MapBoxTestingProps {
    initialLng?: number
    initialLat?: number
    initialZoom?: number
    height?: string
}

const MapBoxTesting: React.FC<MapBoxTestingProps> = ({
    initialLng = -70.9,
    initialLat = 42.35,
    initialZoom = 9,
    height = '400px',
}) => {
    const markers = [
        {
            lng: -70.9,
            lat: 42.35,
            title: 'Boston',
            description: 'The capital of Massachusetts',
            color: '#FF0000',
        },
        {
            lng: -71.0589,
            lat: 42.3601,
            title: 'Downtown',
            description: 'City center',
            color: '#00FF00',
        },
    ]

    const handleMarkerClick = (marker: Marker) => {
        console.log(`Clicked marker: ${marker.title}`)
    }

    const mapContainer = useRef<HTMLDivElement | null>(null)
    const map = useRef<mapboxgl.Map | null>(null)
    const markerRefs = useRef<mapboxgl.Marker[]>([])

    const [lng] = useState<number>(initialLng)
    const [lat] = useState<number>(initialLat)
    const [zoom] = useState<number>(initialZoom)

    // Function to create popup content
    const createPopupContent = (marker: Marker): string => {
        return `
      <div>
        <h3 style="margin: 0 0 5px 0;">${marker.title || 'Location'}</h3>
        ${
            marker.description
                ? `<p style="margin: 0;">${marker.description}</p>`
                : ''
        }
      </div>
    `
    }

    // Function to add markers to the map
    const addMarkers = () => {
        if (!map.current) return

        // Clear existing markers
        markerRefs.current.forEach((marker) => marker.remove())
        markerRefs.current = []

        markers.forEach((marker) => {
            // Create popup
            const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
                createPopupContent(marker)
            )

            // Create marker element
            const el = document.createElement('div')
            el.className = 'marker'
            el.style.width = '24px'
            el.style.height = '24px'
            el.style.borderRadius = '50%'
            el.style.background = marker.color || '#FF0000'
            el.style.cursor = 'pointer'
            el.style.border = '2px solid white'

            // Create and add the marker
            const mapboxMarker = new mapboxgl.Marker(el)
                .setLngLat([marker.lng, marker.lat])
                .setPopup(popup)
                .addTo(map.current as any)

            // Add click event if callback provided
            if (handleMarkerClick) {
                el.addEventListener('click', () => {
                    handleMarkerClick(marker)
                })
            }

            markerRefs.current.push(mapboxMarker)
        })
    }

    useEffect(() => {
        if (map.current) return
        if (!mapContainer.current) return

        const accessToken = process.env.mapBoxApi
        if (!accessToken) {
            console.error('Mapbox access token is required')
            return
        }

        mapboxgl.accessToken = accessToken

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom,
        })

        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

        // Add markers when map loads
        map.current.on('load', () => {
            addMarkers()
        })

        return () => {
            if (map.current) {
                map.current.remove()
            }
        }
    }, [lng, lat, zoom])

    // Update markers when markers prop changes
    useEffect(() => {
        addMarkers()
    }, [markers])

    return (
        <div>
            <div
                ref={mapContainer}
                className="map-container"
                style={{ height }}
            />
        </div>
    )
}

export default MapBoxTesting
