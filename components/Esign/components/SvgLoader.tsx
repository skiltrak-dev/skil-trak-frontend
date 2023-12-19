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

const DynamicSvgLoader = ({
    items,
    path,
    page,
    onItemSelected,
    onItemMove,
    onItemLocationChanged,
    onItemResize,
    onItemResized,
    onItemRemove,
    setTabDropCoordinates,
}: {
    setTabDropCoordinates: (coordinates: { x: number; y: number }) => void
    items: any
    path: string
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

    const { notification } = useNotification()

    const [saveEsignTemplate, saveEsignTemplateResult] =
        AdminApi.ESign.useSaveTemplate()

    const pageItems = items.filter((item: any) => item.page === page)

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
                number: item?.page,
                size: item?.size?.width + ',' + item?.size?.height,
                colour: item?.data?.color,
                placeholder: item?.data?.placeholder,
                option: item?.data?.option,
                type: item?.data?.type,
                columnName: item?.data?.column,
                role: item?.data?.role,
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

    const id = `drop-target-${page}`
    const { setNodeRef } = useDroppable({
        id: page,
    })

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { delay: 5, tolerance: 5 },
        }),
        useSensor(KeyboardSensor, {})
    )

    const dimensionRef = useRef<any>()

    return (
        <>
            {submitError && (
                <ShowErrorNotifications
                    result={{
                        isError: true,
                        error: submitError,
                    }}
                />
            )}
            <div className="fixed w-full left-0 bottom-0 p-4 bg-white flex justify-end">
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
                        setTabDropCoordinates={setTabDropCoordinates}
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
                    <div ref={setNodeRef} className="w-full mx-auto">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            // width="596"
                            width="100%"
                            // height="842"
                            height="100%"
                            viewBox={viewport || '0 0 596 842'}
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
                                    pageItems.map((item: any, i: number) => (
                                        <DraggableTab
                                            item={item}
                                            key={i}
                                            onResize={onItemResize}
                                            onResized={onItemResized}
                                            onItemSelected={onItemSelected}
                                            onRemove={onItemRemove}
                                        ></DraggableTab>
                                    ))}
                            </g>
                        </svg>
                    </div>
                </DndContext>
            </div>
        </>
    )
}

export default DynamicSvgLoader
