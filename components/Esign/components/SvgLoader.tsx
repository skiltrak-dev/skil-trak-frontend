'use client'

import { useEffect, useState } from 'react'
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
}: {
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
    const [svgContent, setSvgContent] = useState('')

    const [saveEsign, saveEsignResult] = AdminApi.ESign.useSaveEsign()

    const pageItems = items.filter((item: any) => item.page === page)

    useEffect(() => {
        const fetchSvg = async () => {
            try {
                const response = await fetch(path) // Adjust the path based on your setup
                const svgText = await response.text()
                setSvgContent(svgText)
                // console.log("::: SVG TEXT", svgText);
            } catch (error) {
                console.error('Error fetching SVG:', error)
            }
        }

        if (!svgContent) {
            fetchSvg()
        }
    }, [path])

    const handleSvgClick = (event: any) => {
        const dataViewName = event.target.getAttribute('data-view-name')
        if (dataViewName !== 'tab') onItemSelected(null, false)
    }

    const onSaveClick = () => {
        saveEsign(JSON.stringify(items))
            .then((res) => {
                console.log('::: RES', res)
            })
            .catch((err) => {
                console.log(err)
            })
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

    return (
        <DndContext
            sensors={sensors}
            onDragEnd={(data) => {
                onItemLocationChanged(data)
            }}
            onDragMove={(data) => {
                onItemMove(data)
            }}
        >
            {/* <div ref={setNodeRef} className="w-fit"> */}
            <div ref={setNodeRef} className="w-[80%] mx-auto">
                <div className="fixed w-full left-0 bottom-0 p-4 bg-white flex justify-end">
                    <button
                        className="bg-blue-500 text-white px-8 py-2"
                        onClick={onSaveClick}
                    >
                        Save
                    </button>
                </div>
                {/* <div style={style} className="absolute w-full h-full z-10" /> */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    // width="596"
                    width="100%"
                    // height="842"
                    height="100%"
                    viewBox="0 0 596 842"
                    // dangerouslySetInnerHTML={{ __html: svgContent }}
                    onClick={handleSvgClick}
                >
                    <g>
                        <g
                            dangerouslySetInnerHTML={{
                                __html: svgContent,
                            }}
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
    )
}

export default DynamicSvgLoader
