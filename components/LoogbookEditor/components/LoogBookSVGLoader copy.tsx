import { CommonApi } from '@queries'
import React, { useEffect, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Waypoint } from 'react-waypoint'
import {
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useDroppable,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import { LogbookDraggableTab } from './LogbookDraggableTab'
import { CursorCoordinates } from '@components/Esign'
export const LoogBookSVGLoader = ({
    size,
    items,
    tabsError,
    pageNumber,
    onItemMove,
    onItemRemove,
    onItemResize,
    onItemResized,
    setCurrentPage,
    onItemSelected,
    setTabDropCoordinates,
    onItemLocationChanged,
    onChangedLocation,
}: {
    size: any
    items: any
    tabsError: any
    onItemMove: any
    pageNumber: number
    setCurrentPage: any
    onItemLocationChanged: any
    onChangedLocation: any
    onItemResize: (item: any) => void
    onItemRemove: (item: any) => void
    onItemResized: (item: any) => void
    onItemSelected: (item: any, selected: boolean) => void
    setTabDropCoordinates: (coordinates: { x: number; y: number }) => void
}) => {
    const [loadSvg, setLoadSvg] = useState(false)
    const [timerId, setTimerId] = useState<any>(null)
    const [viewport, setViewport] = useState<string | null>('')
    const [svgContent, setSvgContent] = useState('')

    const dimensionRef = useRef<any>(null)

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
        return () => {
            if (timerId) {
                clearTimeout(timerId)
            }
        }
    }, [timerId])

    const path = template?.data?.data?.[0]

    useEffect(() => {
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(path, 'image/svg+xml')

        const root = xmlDoc.documentElement
        const svgViewport = root.getAttribute('viewBox')

        setViewport(svgViewport)

        if (!svgContent) {
            setSvgContent(
                path
                    ?.replace(/width="([\d.]+)pt"/, 'width="$1"')
                    .replace(/height="([\d.]+)pt"/, 'height="$1"')
            )
        }
    }, [path])

    const handleEnter = () => {
        setCurrentPage(pageNumber - 1)
        if (timerId) {
            clearTimeout(timerId)
        }

        // Set a timeout to make the API call after 1 second of inactivity
        const id = setTimeout(() => {
            setLoadSvg(true)
        }, 1000)

        setTimerId(id)
    }
    return (
        <div>
            <Waypoint
                onEnter={handleEnter}
                onLeave={() => {
                    setLoadSvg(false)
                    if (timerId) {
                        clearTimeout(timerId)
                    }
                }}
            >
                <div>
                    {template?.data ? (
                        <div>
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
                                {/* <DndContext
                                    sensors={sensors}
                                    onDragEnd={(data) => {
                                        onItemLocationChanged(data)
                                    }}
                                    onDragMove={(data) => {
                                        onItemMove(data)
                                    }}
                                > */}
                                <div
                                    ref={setNodeRef}
                                    className="w-full mx-auto"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        // width="596"
                                        width="100%"
                                        // height="842"
                                        height="100%"
                                        viewBox={String(viewport)}
                                        // dangerouslySetInnerHTML={{ __html: svgContent }}
                                        onClick={() => {}}
                                    >
                                        <g>
                                            {/* <g
                dangerouslySetInnerHTML={{
                    __html: svgContent,
                }}
            /> */}

                                            <image
                                                href={`data:image/svg+xml,${encodeURIComponent(
                                                    svgContent
                                                )}`}
                                            />

                                            {items &&
                                                items.map(
                                                    (item: any, i: number) => (
                                                        <LogbookDraggableTab
                                                            item={item}
                                                            key={i}
                                                            onChangedLocation={
                                                                onChangedLocation
                                                            }
                                                            viewport={viewport}
                                                            onResize={
                                                                onItemResize
                                                            }
                                                            onResized={
                                                                onItemResized
                                                            }
                                                            onItemSelected={
                                                                onItemSelected
                                                            }
                                                            onRemove={
                                                                onItemRemove
                                                            }
                                                            tabsError={
                                                                tabsError
                                                            }
                                                        ></LogbookDraggableTab>
                                                    )
                                                )}
                                        </g>
                                    </svg>
                                </div>
                                {/* </DndContext> */}
                            </div>
                        </div>
                    ) : (
                        <Skeleton
                            className="w-full rounded-lg z-10"
                            style={{
                                height: `${size?.height}px`,
                            }}
                        />
                    )}
                </div>
            </Waypoint>
        </div>
    )
}
