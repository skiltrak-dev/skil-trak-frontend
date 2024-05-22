import { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN'

const students = [
    { id: 1, name: 'Student 1', lat: 37.7749, lng: -122.4194 },
    { id: 2, name: 'Student 2', lat: 34.0522, lng: -118.2437 },
]

const industries = [
    { id: 1, name: 'Industry 1', lat: 40.7128, lng: -74.006 },
    { id: 2, name: 'Industry 2', lat: 47.6062, lng: -122.3321 },
]

export const Map = () => {
    const mapContainer = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current!,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-98.5795, 39.8283], // Center of the US
            zoom: 4,
        })

        students.forEach((student) => {
            const el = document.createElement('div')
            el.className = 'marker marker-student'
            new mapboxgl.Marker(el)
                .setLngLat([student.lng, student.lat])
                .setPopup(
                    new mapboxgl.Popup({ offset: 25 }).setText(student.name)
                )
                .addTo(map)
        })

        industries.forEach((industry) => {
            const el = document.createElement('div')
            el.className = 'marker marker-industry'
            new mapboxgl.Marker(el)
                .setLngLat([industry.lng, industry.lat])
                .setPopup(
                    new mapboxgl.Popup({ offset: 25 }).setText(industry.name)
                )
                .addTo(map)
        })

        return () => map.remove()
    }, [])

    return <div ref={mapContainer} className="w-full h-full" />
}

