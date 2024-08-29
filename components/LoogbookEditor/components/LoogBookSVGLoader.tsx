import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Waypoint } from 'react-waypoint'
import {
    DndContext,
    useDroppable,
    useSensors,
    useSensor,
    PointerSensor,
    KeyboardSensor,
} from '@dnd-kit/core'
import { LogbookDraggableTab } from './LogbookDraggableTab'
import { CursorCoordinates } from '@components/Esign'
import debounce from 'lodash/debounce'
import { CommonApi } from '@queries'
import Skeleton from 'react-loading-skeleton'

export const LoogBookSVGLoader = ({
    size,
    items,
    tabsError,
    pageNumber,
    setCurrentPage,
    onItemLocationChanged,
    onChangedLocation,
    onItemResize,
    onItemResized,
    onItemSelected,
    setTabDropCoordinates,
    onItemMove,
    onItemRemove,
    onPageCoordinatesUpdate,
}: {
    size: any
    items: any[]
    tabsError: any
    pageNumber: number
    setCurrentPage: (page: number) => void
    onItemLocationChanged: (eventData: any) => void
    onChangedLocation: (item: any) => void
    onItemResize: (item: any) => void
    onItemResized: (item: any) => void
    onItemSelected: (item: any, selected: boolean) => void
    setTabDropCoordinates: (coordinates: { x: number; y: number }) => void
    onItemMove: (eventData: any) => void
    onItemRemove: (item: any) => void
    onPageCoordinatesUpdate: (pageNumber: number, coordinates: any) => void
}) => {
    const [svgContent, setSvgContent] = useState('')
    const [viewport, setViewport] = useState<string | null>('')
    const dimensionRef = useRef<HTMLDivElement>(null)
    const pageRef = useRef<HTMLDivElement>(null) // Ref for the page container
    const [pageCoordinates, setPageCoordinates] = useState<any>({})
    const [currentPage, setCurrentPageState] = useState<number | null>(null)

    const template = CommonApi.ESign.useEsignTemplate({
        id: 119,
        pageNumber: pageNumber - 1,
    })

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { delay: 5, tolerance: 5 },
        }),
        useSensor(KeyboardSensor, {})
    )

    const { setNodeRef } = useDroppable({
        id: pageNumber - 1,
    })

    useEffect(() => {
        const path = template?.data?.data?.[0]
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(path, 'image/svg+xml')
        const root = xmlDoc.documentElement
        const svgViewport = root.getAttribute('viewBox')
        setViewport(svgViewport)

        if (path) {
            setSvgContent(
                path
                    ?.replace(/width="([\d.]+)pt"/, 'width="$1"')
                    .replace(/height="([\d.]+)pt"/, 'height="$1"')
            )
        }
    }, [template?.data?.data, pageNumber])

    useEffect(() => {
        // Calculate the coordinates of items on the current page
        const coordinates = items.map((item) => ({
            id: item.id,
            x: item.location.x,
            y: item.location.y,
            width: item.size.width,
            height: item.size.height,
        }))

        setPageCoordinates(coordinates)
        onPageCoordinatesUpdate(pageNumber, coordinates) // Notify parent with the coordinates
    }, [items, pageNumber])

    const handleVisibilityChange = useCallback(
        (entries: any) => {
            entries.forEach((entry: any) => {
                if (entry.isIntersecting) {
                    // Determine the page index from data attribute
                    const pageIndex = parseInt(
                        entry.target.getAttribute('data-page-index') || '0',
                        10
                    )
                    setCurrentPage(pageIndex)
                }
            })
        },
        [setCurrentPage]
    )

    useEffect(() => {
        const observer = new IntersectionObserver(handleVisibilityChange, {
            threshold: [0.5], // Adjust threshold as needed
        })

        if (pageRef.current) {
            observer.observe(pageRef.current)
        }

        return () => {
            if (pageRef.current) {
                observer.unobserve(pageRef.current)
            }
        }
    }, [handleVisibilityChange])

    // useEffect(() => {
    //     // Log current page
    //     console.log(
    //         `Current Page: ${
    //             currentPage !== null ? `Page ${currentPage + 1}` : 'None'
    //         }`
    //     )
    //     setCurrentPage(pageNumber - 1) // Adjust to zero-based index
    // }, [currentPage, pageNumber])

    const handleEnter = () => {
        // setCurrentPage(pageNumber - 1)
    }

    return (
        <div
            ref={pageRef}
            className="page-container"
            data-page-index={pageNumber - 1}
        >
            <Waypoint
                onEnter={handleEnter}
                onLeave={() => {
                    // setCurrentPage(pageNumber - 1)
                }}
            >
                <div>
                    {template?.data ? (
                        <div ref={dimensionRef} className="relative">
                            {dimensionRef.current && (
                                <CursorCoordinates
                                    viewport={viewport}
                                    element={dimensionRef.current}
                                    setTabDropCoordinates={
                                        setTabDropCoordinates
                                    }
                                />
                            )}
                            <DndContext
                                sensors={sensors}
                                onDragEnd={(eventData) =>
                                    onItemLocationChanged(eventData)
                                }
                                onDragMove={(eventData) =>
                                    onItemMove(eventData)
                                }
                            >
                                <div
                                    ref={setNodeRef}
                                    className="w-full mx-auto"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="100%"
                                        height="100%"
                                        viewBox={String(viewport)}
                                    >
                                        <g>
                                            <image
                                                href={`data:image/svg+xml,${encodeURIComponent(
                                                    svgContent
                                                )}`}
                                            />
                                            {items.map(
                                                (item: any, i: number) => (
                                                    <LogbookDraggableTab
                                                        item={item}
                                                        key={i}
                                                        onChangedLocation={
                                                            onChangedLocation
                                                        }
                                                        viewport={viewport}
                                                        onResize={onItemResize}
                                                        onResized={
                                                            onItemResized
                                                        }
                                                        onItemSelected={
                                                            onItemSelected
                                                        }
                                                        onRemove={onItemRemove}
                                                        tabsError={tabsError}
                                                    />
                                                )
                                            )}
                                        </g>
                                    </svg>
                                </div>
                            </DndContext>
                        </div>
                    ) : (
                        <Skeleton
                            className="w-full rounded-lg z-10"
                            style={{ height: `${size?.height}px` }}
                        />
                    )}
                </div>
            </Waypoint>
        </div>
    )
}
