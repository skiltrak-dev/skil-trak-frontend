'use client'
import { AdminNavbar } from '@components'
import { Contextbar, Sidebar } from '@components/Esign'
import DynamicSvgLoader from '@components/Esign/components/SvgLoader'
import {
    DndContext,
    DragOverlay,
    closestCorners,
    pointerWithin,
} from '@dnd-kit/core'
import { restrictToWindowEdges } from '@dnd-kit/modifiers'
import { useNavbar } from '@hooks'
import { useEffect, useState } from 'react'

export default function ESign() {
    const [mounted, setMounted] = useState(false)

    const navBar = useNavbar()

    useEffect(() => {
        navBar.setTitle('E-Sign')
        if (!mounted) {
            setMounted(true)
        }
    }, [])

    const [contextBar, setContextBar] = useState<any>()

    const [lastId, setLastId] = useState<number>(0)
    const [items, setItems] = useState<any>([])
    const [lastSelectedItem, setLastSelectedItem] = useState<any>()

    const onItemMove = (eventData: any) => {
        const item = eventData.active.data.current
        if (!item.moving && !item.resizing) {
            const existingItem = items.find((x: any) => x.id === item.id)
            if (existingItem) {
                const updatedList = items.filter((x: any) => x.id !== item.id)
                existingItem.moving = true
                updatedList.push(existingItem)

                setItems(updatedList)
            }
        }
    }

    const onItemLocationChanged = (eventData: any) => {
        const item = eventData.active.data.current
        const delta = eventData.delta

        const existingItem = items.find((x: any) => x.id === item.id)
        if (existingItem && !existingItem.resizing) {
            const updatedList = items.filter((x: any) => x.id !== item.id)
            existingItem.location.x = existingItem.location.x + delta.x
            existingItem.location.y = existingItem.location.y + delta.y
            existingItem.moving = false
            updatedList.push(existingItem)

            setItems(updatedList)
        }
    }

    const onItemResize = (data: any) => {
        const existingItem = items.find((x: any) => x.id === data.item.id)
        if (existingItem) {
            const updatedList = items.filter((x: any) => x.id !== data.item.id)
            existingItem.resizing = true
            existingItem.size.width = data.newSize.width
            existingItem.size.height = data.newSize.height
            updatedList.push(existingItem)

            setItems(updatedList)
        }
    }

    const onItemResized = (data: any) => {
        const existingItem = items.find((x: any) => x.id === data.item.id)
        if (existingItem) {
            const updatedList = items.filter((x: any) => x.id !== data.item.id)
            existingItem.resizing = false
            updatedList.push(existingItem)

            setItems(updatedList)
        }
    }

    // const onItemSelected = (item: any) => {
    // 	setContextBar(item);
    // };

    const onItemSelected = (item: any, selected: boolean) => {
        // Deselect Previous Item
        if (lastSelectedItem) {
            const oldItem = items.find((x: any) => x.id === lastSelectedItem.id)
            const updatedList = items.filter(
                (x: any) => x.id !== lastSelectedItem.id
            )
            oldItem.selected = false
            updatedList.push(oldItem)
        }

        if (selected) {
            setLastSelectedItem(item)
        } else {
            setLastSelectedItem(null)
        }

        if (item) {
            const existingItem = items.find((x: any) => x.id === item.id)

            // Select Item
            if (existingItem) {
                const updatedList = items.filter((x: any) => x.id !== item.id)
                existingItem.selected = selected
                updatedList.push(existingItem)
            }
        }
    }

    const handleDragEnd = (data: any) => {
        if (data.over) {
            const delta_x = (() => {
                console.log('::: WAS GREATER', data)
                if (data.delta.x <= data.over.rect.left) {
                    return 0
                } else if (data.delta.x > data.over.rect.left) {
                    return data.delta.x - data.over.rect.left
                }
                return data.over.rect.left - data.delta.x
            })()

            const delta_y = (() => {
                const calDeltaY = data.delta.y % data.over.rect.height
                if (data.delta.y > data.over.rect.bottom) {
                    const percent =
                        (data.delta.y - data.over.rect.height) /
                        data.over.rect.height
                    console.log('::: PERCENT', percent)
                    return percent * 842
                }
                return data.delta.y
            })()

            const newId = lastId + 1
            const tab = {
                id: newId,
                page: data.over.id,
                location: { x: delta_x, y: delta_y, page: data.over.id },
                size: { width: 120, height: 24 },
                data: data.active.data.current,
                parent: {
                    width: data.over?.rect.width,
                    height: data.over?.rect.height,
                    left: data.over.rect.left,
                    right: data.over.rect.right,
                    top: data.over.rect.top,
                    bottom: data.over.rect.bottom,
                },
                moving: false,
                resizing: false,
            }

            setLastId(newId)
            setItems((prevState: any) => [...prevState, tab])
        }
    }

    const onItemRemove = (item: any) => {
        const existingItem = items.find((x: any) => x.id === item.id)
        if (existingItem) {
            const updatedList = items.filter((x: any) => x.id !== item.id)
            setItems(updatedList)
        }
        setLastSelectedItem(null)
    }

    const [coords, setCoords] = useState({ x: 0, y: 0 })
    // useEffect(() => {
    // 	const handleWindowMouseMove = (event: any) => {
    // 		const tempCoords = {
    // 			x: event.clientX,
    // 			y: event.clientY,
    // 		};
    // 		setCoords(tempCoords);
    // 	};
    // 	window.addEventListener("mousemove", handleWindowMouseMove);

    // 	return () => {
    // 		window.removeEventListener("mousemove", handleWindowMouseMove);
    // 	};
    // }, []);

    return (
        <div className="h-screen overflow-hidden">
            <div className="border-b bg-white">
                <AdminNavbar />
            </div>
            <DndContext
                modifiers={[restrictToWindowEdges]}
                onDragEnd={handleDragEnd}
                // collisionDetection={pointerWithin}
            >
                <div className="bg-gray-200">
                    <div className="flex">
                        <Sidebar />
                        <div className="w-full h-screen overflow-y-scroll pb-24">
                            <DragOverlay></DragOverlay>
                            {mounted && (
                                <>
                                    <DynamicSvgLoader
                                        items={items}
                                        path="/pdf/dummy-6.svg"
                                        page={1}
                                        onItemSelected={onItemSelected}
                                        onItemMove={onItemMove}
                                        onItemLocationChanged={
                                            onItemLocationChanged
                                        }
                                        onItemResize={onItemResize}
                                        onItemResized={onItemResized}
                                        onItemRemove={onItemRemove}
                                    />
                                    <div className="my-8" />

                                    <DynamicSvgLoader
                                        items={items}
                                        path="/pdf/dummy-6.svg"
                                        page={2}
                                        onItemSelected={onItemSelected}
                                        onItemMove={onItemMove}
                                        onItemLocationChanged={
                                            onItemLocationChanged
                                        }
                                        onItemResize={onItemResize}
                                        onItemResized={onItemResized}
                                        onItemRemove={onItemRemove}
                                    />
                                </>
                            )}
                        </div>
                        <Contextbar content={contextBar} />
                    </div>
                </div>
            </DndContext>
        </div>
    )
}
