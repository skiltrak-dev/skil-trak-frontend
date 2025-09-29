import React, { memo, useMemo, useState } from 'react'
import {
    MdLocationOn,
    MdNavigation,
    MdFullscreen,
    MdFullscreenExit,
} from 'react-icons/md'
import { THEME_COLORS } from './utils/theme'
import { Badge, Button, Typography } from '@components'

interface MapLocation {
    id: string
    name: string
    type: string
    address: string
    lat: number
    lng: number
    distance: string
}

interface MapViewProps {
    locations: MapLocation[]
    selectedLocationId?: string
    onLocationSelect?: (locationId: string) => void
}

const MapMarker = memo<{
    location: MapLocation
    isSelected: boolean
    onClick: () => void
    style: React.CSSProperties
}>(({ location, isSelected, onClick, style }) => (
    <div
        className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-full z-10 hover:scale-110 active:scale-95 transition-transform duration-200 ${
            isSelected ? 'z-20' : ''
        }`}
        style={style}
        onClick={onClick}
    >
        <style>{`
      @keyframes tooltip-appear {
        from {
          opacity: 0;
          transform: translate(-50%, -10px);
        }
        to {
          opacity: 1;
          transform: translate(-50%, -5px);
        }
      }
      .animate-tooltip-appear {
        animation: tooltip-appear 0.3s ease-out;
      }
    `}</style>
        <div className="relative">
            <div
                className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-all duration-300 ${
                    isSelected ? 'animate-pulse' : ''
                }`}
                style={{
                    backgroundColor: isSelected
                        ? THEME_COLORS.accent
                        : THEME_COLORS.primary,
                }}
            >
                <MdLocationOn className="w-4 h-4 text-white" />
            </div>
            {isSelected && (
                <div className="absolute bottom-full left-1/2 mb-2 bg-white rounded-lg shadow-lg border p-2 min-w-48 animate-tooltip-appear">
                    <div className="text-xs space-y-1">
                        <Typography variant="xs" color="text-gray-900" medium>
                            <div className="truncate">{location.name}</div>
                        </Typography>
                        <Typography variant="xs" color="text-gray-600">
                            <div className="truncate">{location.address}</div>
                        </Typography>
                        <Badge variant="primaryNew" text={location.type} />
                    </div>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-white"></div>
                </div>
            )}
        </div>
    </div>
))

MapMarker.displayName = 'MapMarker'

export const MapView: React.FC<MapViewProps> = memo(
    ({ locations, selectedLocationId, onLocationSelect }) => {
        const [isExpanded, setIsExpanded] = useState(false)

        // Mock map bounds and positioning
        const mapBounds = useMemo(
            () => ({
                minLat: -37.85,
                maxLat: -37.78,
                minLng: 144.9,
                maxLng: 145.1,
                width: 100,
                height: isExpanded ? 400 : 200,
            }),
            [isExpanded]
        )

        // Position markers based on mock coordinates
        const positionedLocations = useMemo(
            () =>
                locations.map((location) => {
                    const x =
                        ((location.lng - mapBounds.minLng) /
                            (mapBounds.maxLng - mapBounds.minLng)) *
                        mapBounds.width
                    const y =
                        ((mapBounds.maxLat - location.lat) /
                            (mapBounds.maxLat - mapBounds.minLat)) *
                        mapBounds.height

                    return {
                        ...location,
                        style: {
                            left: `${Math.max(5, Math.min(95, x))}%`,
                            top: `${Math.max(10, Math.min(90, y))}%`,
                        },
                    }
                }),
            [locations, mapBounds]
        )

        const handleLocationClick = (locationId: string) => {
            onLocationSelect?.(locationId)
        }

        const toggleExpanded = () => {
            setIsExpanded(!isExpanded)
        }

        return (
            <div className="animate-in fade-in-0 slide-in-from-top-5 duration-500">
                <div className="overflow-hidden border rounded-lg bg-white shadow-sm">
                    <div className="p-0">
                        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-gray-50 to-gray-100">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-8 h-8 rounded-full flex items-center justify-center"
                                    style={{
                                        backgroundColor: THEME_COLORS.primary,
                                    }}
                                >
                                    <MdLocationOn className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <Typography
                                        variant="title"
                                        color="text-gray-900"
                                    >
                                        Workplace Locations
                                    </Typography>
                                    <Typography
                                        variant="small"
                                        color="text-gray-600"
                                    >
                                        {locations.length} companies mapped
                                    </Typography>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Badge
                                    variant="secondary"
                                    text={'Melbourne, VIC'}
                                />
                                <Button outline onClick={toggleExpanded}>
                                    {isExpanded ? (
                                        <MdFullscreenExit className="w-4 h-4" />
                                    ) : (
                                        <MdFullscreen className="w-4 h-4" />
                                    )}
                                </Button>
                            </div>
                        </div>

                        {/* Mock Map Display */}
                        <div
                            className="relative bg-gradient-to-br from-teal-50 via-blue-50 to-green-50 overflow-hidden transition-all duration-300"
                            style={{ height: mapBounds.height }}
                        >
                            {/* Mock map background pattern */}
                            <div className="absolute inset-0">
                                <svg
                                    className="w-full h-full opacity-20"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="none"
                                >
                                    <defs>
                                        <pattern
                                            id="grid"
                                            width="10"
                                            height="10"
                                            patternUnits="userSpaceOnUse"
                                        >
                                            <path
                                                d="M 10 0 L 0 0 0 10"
                                                fill="none"
                                                stroke="#94a3b8"
                                                strokeWidth="0.5"
                                            />
                                        </pattern>
                                    </defs>
                                    <rect
                                        width="100"
                                        height="100"
                                        fill="url(#grid)"
                                    />
                                    {/* Mock roads */}
                                    <path
                                        d="M0 30 Q25 25 50 30 T100 35"
                                        stroke="#6b7280"
                                        strokeWidth="1"
                                        fill="none"
                                        opacity="0.6"
                                    />
                                    <path
                                        d="M0 60 Q30 55 60 60 T100 65"
                                        stroke="#6b7280"
                                        strokeWidth="1"
                                        fill="none"
                                        opacity="0.6"
                                    />
                                    <path
                                        d="M20 0 Q25 40 30 100"
                                        stroke="#6b7280"
                                        strokeWidth="1"
                                        fill="none"
                                        opacity="0.6"
                                    />
                                    <path
                                        d="M70 0 Q75 50 80 100"
                                        stroke="#6b7280"
                                        strokeWidth="1"
                                        fill="none"
                                        opacity="0.6"
                                    />
                                </svg>
                            </div>

                            {/* Location markers */}
                            {positionedLocations.map((location) => (
                                <MapMarker
                                    key={location.id}
                                    location={location}
                                    isSelected={
                                        selectedLocationId === location.id
                                    }
                                    onClick={() =>
                                        handleLocationClick(location.id)
                                    }
                                    style={location.style}
                                />
                            ))}

                            {/* Map controls overlay */}
                            <div className="absolute top-2 left-2 flex flex-col gap-1">
                                <Button outline>
                                    <MdNavigation className="w-4 h-4" />
                                </Button>
                            </div>

                            {/* Distance legend */}
                            <div className="absolute bottom-2 right-2 bg-white/90 rounded-lg p-2 text-xs">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{
                                                backgroundColor:
                                                    THEME_COLORS.primary,
                                            }}
                                        ></div>
                                        <Typography variant="xs">
                                            ≤ 5km
                                        </Typography>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{
                                                backgroundColor:
                                                    THEME_COLORS.accent,
                                            }}
                                        ></div>
                                        <Typography variant="xs">
                                            Selected
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
)

MapView.displayName = 'MapView'
