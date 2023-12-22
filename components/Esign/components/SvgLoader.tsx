'use client'

import { useEffect, useRef, useState } from 'react'
import { DraggableTab } from './DraggableTab'

import {
    DndContext,
    KeyboardSensor,
    PointerSensor,
    useDroppable,
    useSensor,
    useSensors,
} from '@dnd-kit/core'
import { AdminApi } from '@queries'
import { useRouter } from 'next/router'
import { ShowErrorNotifications } from '@components/ShowErrorNotifications'
import { Button } from '@components/buttons'
import { CursorCoordinates } from './CursorCoordinates'
import { useNotification } from '@hooks'
import { Waypoint } from 'react-waypoint'
import Skeleton from 'react-loading-skeleton'

const DynamicSvgLoader = ({
    items,
    // path,
    size,
    page,
    onItemSelected,
    onItemMove,
    onItemLocationChanged,
    onItemResize,
    onItemResized,
    onItemRemove,
    pageNumber,
    setTabDropCoordinates,
}: {
    size: any
    pageNumber: number
    setTabDropCoordinates: (coordinates: { x: number; y: number }) => void
    items: any
    // path: string
    page: number
    onItemSelected: any
    onItemMove: any
    onItemLocationChanged: any
    onItemResize: any
    onItemResized: any
    onItemRemove: any
}) => {
    const router = useRouter()

    const [svgContent, setSvgContent] = useState('')
    const [submitError, setSubmitError] = useState<any>(null)
    const [viewport, setViewport] = useState<string | null>('')
    const [width, setWidth] = useState<string | null>('')
    const [height, setHeight] = useState<string | null>('')
    const [timerId, setTimerId] = useState<any>(null)
    const [loadSvg, setLoadSvg] = useState(false)

    const { notification } = useNotification()

    const [saveEsignTemplate, saveEsignTemplateResult] =
        AdminApi.ESign.useSaveTemplate()
    const template = AdminApi.ESign.useEsignTemplate(
        { id: Number(router.query?.id), pageNumber: pageNumber - 1 },
        {
            skip: !router.query?.id || !loadSvg,
            // refetchOnMountOrArgChange: true,
        }
    )

    const path = template?.data?.data?.[0]

    const pageItems = items.filter((item: any) => item.page === pageNumber - 1)

    useEffect(() => {
        // Clear the timeout when the component unmounts or when currentPage changes
        return () => {
            if (timerId) {
                clearTimeout(timerId)
            }
        }
    }, [timerId])

    useEffect(() => {
        const fetchSvg = async () => {
            try {
                const response = await fetch(path) // Adjust the path based on your setup
                const svgText = await response.text()
                setSvgContent(svgText)
            } catch (error) {
                console.error('Error fetching SVG:', error)
            }
        }

        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(path, 'image/svg+xml')

        const root = xmlDoc.documentElement
        const svgViewport = root.getAttribute('viewBox')
        const svgWidth = root.getAttribute('width')
        const svgHeight = root.getAttribute('height')

        setViewport(svgViewport)
        setWidth(svgWidth)
        setHeight(svgHeight)

        if (!svgContent) {
            setSvgContent(
                path
                    ?.replace(/width="([\d.]+)pt"/, 'width="$1"')
                    .replace(/height="([\d.]+)pt"/, 'height="$1"')
            )
        }
    }, [path])

    console.log({ pageItems, pageNumber, viewport })

    const handleSvgClick = (event: any) => {
        const dataViewName = event.target.getAttribute('data-view-name')
        if (dataViewName !== 'tab') onItemSelected(null, false)
    }

    const onSaveClick = () => {
        const notRoles = items.filter((item: any) => !item?.data?.role)
        if (notRoles && notRoles?.length > 0) {
            console.log({ notRoles })
            notRoles?.forEach((item: any) => {
                notification.error({
                    title: 'Add Role',
                    description: `${item?.data?.type} Field role should not be empty`,
                    dissmissTimer: 5500,
                })
            })
        } else {
            const updatedItems = items.map((item: any) => ({
                label: item?.data?.dataLabel,
                position: item?.location?.x + ',' + item?.location?.y,
                isCustom: item?.data?.isCustom,
                number: item?.page + 1,
                size: item?.size?.width + ',' + item?.size?.height,
                colour: item?.data?.color,
                placeholder: item?.data?.placeholder,
                option: item?.data?.option,
                type: item?.data?.type,
                columnName: item?.data?.column,
                role: item?.data?.role,
                required: item?.data?.isRequired,
                ...(item?.saved ? { id: item?.id } : {}),
            }))

            // return null

            saveEsignTemplate({ tabs: updatedItems, id: router?.query?.id })
                .unwrap()
                .then((res: any) => {
                    if (res) {
                        notification.success({
                            title: `Tabs Saved`,
                            description: `Templates Tabs Saved Successfully`,
                            dissmissTimer: 5500,
                        })
                    }
                })
                .catch((error: any) => {
                    if (error) {
                        const errorTitle = error?.data?.error
                        if (errorTitle && Array.isArray(error?.data?.message)) {
                            error?.data?.message?.forEach((err: any) => {
                                const tab = err?.split(' ')
                                const itemIndex = tab?.[0]?.split('.')
                                const tabField = updatedItems[itemIndex?.[1]]
                                notification.error({
                                    title: `${itemIndex?.[2]} Error`,
                                    description: `${tabField?.columnName} ${
                                        tabField?.type
                                    } ${itemIndex?.[2]} ${tab
                                        ?.slice(1)
                                        ?.join(' ')}`,
                                    dissmissTimer: 5500,
                                })
                            })
                        } else {
                            notification.error({
                                title: errorTitle || 'Some thing is not right',
                                description:
                                    error?.data?.message ||
                                    'Please check your network connection',
                                autoDismiss: true,
                            })
                        }
                    }
                })
        }
    }

    const id = `drop-target-${pageNumber}`
    const { setNodeRef } = useDroppable({
        id: pageNumber - 1,
    })

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { delay: 5, tolerance: 5 },
        }),
        useSensor(KeyboardSensor, {})
    )

    const dimensionRef = useRef<any>()

    const handleEnter = () => {
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
        <>
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
                            {submitError && (
                                <ShowErrorNotifications
                                    result={{
                                        isError: true,
                                        error: submitError,
                                    }}
                                />
                            )}
                            <div className="z-20 fixed w-full left-0 bottom-0 p-4 bg-white flex justify-end">
                                <Button
                                    variant="info"
                                    text={'Save'}
                                    loading={saveEsignTemplateResult.isLoading}
                                    disabled={saveEsignTemplateResult.isLoading}
                                    onClick={onSaveClick}
                                />
                            </div>
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
                                    onDragEnd={(data) => {
                                        onItemLocationChanged(data)
                                    }}
                                    onDragMove={(data) => {
                                        onItemMove(data)
                                    }}
                                >
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
                                            onClick={handleSvgClick}
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

                                                {pageItems &&
                                                    pageItems.map(
                                                        (
                                                            item: any,
                                                            i: number
                                                        ) => (
                                                            <DraggableTab
                                                                item={item}
                                                                key={i}
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
                                                            ></DraggableTab>
                                                        )
                                                    )}
                                            </g>
                                        </svg>
                                    </div>
                                </DndContext>
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
        </>
    )
}

export default DynamicSvgLoader
