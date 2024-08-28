import { EmptyData } from '@components/ActionAnimations'
import { LoadingAnimation } from '@components/LoadingAnimation'
import { CommonApi } from '@queries'
import React, { useState } from 'react'
import { LoogBookSVGLoader } from './components'
import { DndContext, DragOverlay } from '@dnd-kit/core'
import { restrictToWindowEdges } from '@dnd-kit/modifiers'
import { LoogbookSidebar } from './components'
import { uuid } from 'uuidv4'
import { FieldsTypeEnum } from '@components/Esign/components/SidebarData'

export const LoogbookEditor = () => {
    const [draggableData, setDraggableData] = useState<any>()
    const [tabDropCoordinates, setTabDropCoordinates] = useState<any>(null)
    const [items, setItems] = useState<any>([
        {
            id: 4350,
            page: 0,
            location: {
                x: 264.6262127436466,
                y: 395.4725564326463,
                page: 0,
            },
            size: {
                width: 200,
                height: 200,
            },
            data: {
                role: 'industry',
                type: 'text',
                color: '#10b981',
                dataLabel: 'input-industry-name',
                column: 'name',
                isCustom: false,
                placeholder: 'Industry Name',
                option: '',
                isRequired: false,
            },
            saved: true,
        },
        {
            id: 4351,
            page: 0,
            location: {
                x: 262.56207943318026,
                y: 414.0110675599251,
                page: 0,
            },
            size: {
                width: 200,
                height: 200,
            },
            data: {
                role: 'industry',
                type: 'text',
                color: '#10b981',
                dataLabel: 'input-industry-abn',
                column: 'abn',
                isCustom: false,
                placeholder: 'Industry ABN',
                option: '',
                isRequired: false,
            },
            saved: true,
        },
        {
            id: 4352,
            page: 0,
            location: {
                x: 161.01742751560886,
                y: 230.9861109673488,
                page: 0,
            },
            size: {
                width: 200,
                height: 200,
            },
            data: {
                role: 'industry',
                type: 'text',
                color: '#10b981',
                dataLabel: 'input-industry-address',
                column: 'addressLine1',
                isCustom: false,
                placeholder: 'Industry Address',
                option: '',
                isRequired: false,
            },
            saved: true,
        },
    ])
    const [contextBar, setContextBar] = useState<any>()
    const [lastSelectedItem, setLastSelectedItem] = useState<any>()
    const [tabsError, setTabsError] = useState<any>(null)

    const pagesCount = CommonApi.ESign.useTamplatePagesCount(119)

    const handleDragEnd = (data: any) => {
        const newLocX = tabDropCoordinates?.x
        const newLocY = tabDropCoordinates?.y

        if (data) {
            const isCheckBox =
                data.active.data.current?.type === FieldsTypeEnum.Checkbox

            const [a, b, width, height] = tabDropCoordinates?.viewPortData

            const newId = uuid()

            const yValue = isCheckBox
                ? newLocY > 0
                    ? newLocY - 3
                    : 0
                : newLocY - 12 < 0
                ? 0
                : newLocY - 12

            const xValue = isCheckBox
                ? newLocX > 0
                    ? newLocX - 3
                    : 0
                : newLocX - 60 < 0
                ? 1
                : newLocX - 60
            const tab = {
                id: newId,
                page: data?.over?.id,
                selected: true,
                location: {
                    x: width
                        ? newLocX > Number(width)
                            ? Number(width) - 50
                            : xValue
                        : xValue,
                    y: height
                        ? newLocY > Number(height)
                            ? Number(height) - 25
                            : yValue
                        : yValue,
                    page: data?.over?.id,
                },
                size: { width: 120, height: 24 },
                data: {
                    ...data.active.data.current,
                    dataLabel: data.active.id,
                    ...(data.active.data.current?.isCustom && !isCheckBox
                        ? { isRequired: true }
                        : {}),
                },
                parent: {
                    width: data?.over?.rect.width,
                    height: data?.over?.rect.height,
                    left: data?.over?.rect.left,
                    right: data?.over?.rect.right,
                    top: data?.over?.rect.top,
                    bottom: data?.over?.rect.bottom,
                },
                moving: false,
                resizing: false,
            }

            if (tab?.page || tab?.page === 0) {
                setItems((prevState: any) => [
                    ...prevState?.map((item: any) => ({
                        ...item,
                        selected: false,
                    })),
                    tab,
                ])
                // setContextBar(tab)
                // setLastSelectedItem(tab)
            }
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
        if (
            existingItem?.size?.height > 42 &&
            existingItem?.data?.type === FieldsTypeEnum.Text &&
            existingItem?.data?.isCustom
        ) {
            existingItem.data.type = FieldsTypeEnum.TextArea
        } else {
            existingItem.data.type = FieldsTypeEnum.Text
        }
        if (existingItem) {
            const updatedList = items.filter((x: any) => x.id !== data.item.id)
            existingItem.resizing = false
            updatedList.push(existingItem)

            setItems(updatedList)
        }
    }

    const onItemMove = (eventData: any) => {
        console.log('Heee aaaa')

        const [a, b, width, height] = tabDropCoordinates?.viewPortData

        const item = eventData.active.data.current
        if (!item.moving && !item.resizing) {
            const existingItem = items.find((x: any) => x.id === contextBar?.id)
            if (existingItem) {
                const updatedList = items.filter(
                    (x: any) => x.id !== contextBar?.id
                )
                existingItem.moving = true
                updatedList.push({
                    ...existingItem,
                    location: {
                        ...existingItem?.location,
                        x:
                            existingItem?.location?.x < 0
                                ? 1
                                : existingItem?.location?.x > Number(width)
                                ? Number(width) - existingItem?.size?.width
                                : existingItem?.location?.x,
                        y:
                            existingItem?.location?.y < 0
                                ? 1
                                : existingItem?.location?.y > Number(height)
                                ? Number(height) - existingItem?.size?.height
                                : existingItem?.location?.y,
                    },
                })

                setItems(updatedList)
            }
        }
    }

    const onItemSelected = (item: any, selected: boolean) => {
        setContextBar(item)
        // Deselect Previous Item
        if (lastSelectedItem) {
            const oldItem = items.find((x: any) => x.id === lastSelectedItem.id)
            const updatedList = items.filter(
                (x: any) => x.id !== lastSelectedItem.id
            )
            if (oldItem) {
                oldItem.selected = false
            }
            updatedList.push(oldItem)
        }

        if (selected) {
            setLastSelectedItem(item)
        } else {
            setContextBar(null)
            setLastSelectedItem(null)
        }

        if (item) {
            const existingItem = items.find((x: any) => x.id === item.id)

            // Select Item
            if (existingItem) {
                const updatedList = items.filter((x: any) => x.id !== item.id)
                let abc = false

                existingItem.selected = selected
                updatedList.push(existingItem)
            }
        }
    }

    const onItemLocationChanged = (eventData: any) => {
        const item = eventData.active.data.current
        const delta = eventData.delta

        const [a, b, width, height] = tabDropCoordinates?.viewPortData

        const existingItem = items.find((x: any) => x.id === item.id)
        if (existingItem && !existingItem.resizing) {
            const updatedList = items.filter((x: any) => x.id !== item.id)
            existingItem.location.x = existingItem.location.x + delta.x
            existingItem.location.y = existingItem.location.y + delta.y
            existingItem.moving = false
            updatedList.push({
                ...existingItem,
                location: {
                    ...existingItem?.location,
                    x:
                        existingItem?.location?.x < 0
                            ? 1
                            : existingItem?.location?.x > Number(width)
                            ? Number(width) - existingItem?.size?.width
                            : existingItem?.location?.x,
                    y:
                        existingItem?.location?.y < 0
                            ? 1
                            : existingItem?.location?.y > Number(height)
                            ? Number(height) - existingItem?.size?.height
                            : existingItem?.location?.y,
                },
            })

            setItems(updatedList)
        }
    }

    const onItemRemove = (item: any) => {
        setContextBar(null)
        const existingItem = items.find((x: any) => x.id === contextBar?.id)
        if (existingItem) {
            const updatedList = items.filter(
                (x: any) => x.id !== contextBar?.id
            )
            setItems(updatedList)
        }
    }

    return (
        <div className="bg-gray-300 flex justify-center w-full h-screen">
            <DndContext
                modifiers={[restrictToWindowEdges]}
                onDragEnd={handleDragEnd}
            >
                <DragOverlay>
                    {draggableData ? (
                        <div>
                            <button className="flex items-center gap-2 p-2 hover:bg-gray-100 w-full rounded-md">
                                <span
                                    className="text-xs p-2 rounded-md border"
                                    style={{
                                        backgroundColor: `${draggableData?.color}26`,
                                        borderColor: draggableData?.color,
                                        color: draggableData?.color,
                                    }}
                                >
                                    <draggableData.Icon />
                                </span>
                                <p className="text-sm">{draggableData?.text}</p>
                            </button>
                        </div>
                    ) : null}
                </DragOverlay>
                <div>
                    <LoogbookSidebar setDraggableData={setDraggableData} />
                </div>
                {pagesCount?.isLoading ? (
                    <LoadingAnimation />
                ) : pagesCount?.data ? (
                    <div className=" w-[600px] h-[85vh] border-4 border-blue-400 rounded-lg overflow-auto custom-scrollbar flex flex-col gap-y-2">
                        {pagesCount?.data?.size?.map((item: any, i: number) => (
                            <div key={i} className="bg-white">
                                <LoogBookSVGLoader
                                    onItemLocationChanged={
                                        onItemLocationChanged
                                    }
                                    onItemMove={onItemMove}
                                    tabsError={tabsError}
                                    setTabDropCoordinates={(coordinates: {
                                        x: number
                                        y: number
                                    }) => {
                                        setTabDropCoordinates(coordinates)
                                    }}
                                    size={item}
                                    items={items.filter(
                                        (item: any) => item?.page === i
                                    )}
                                    pageNumber={i + 1}
                                    onItemRemove={onItemRemove}
                                    onItemResize={onItemResize}
                                    onItemResized={onItemResized}
                                    onItemSelected={onItemSelected}
                                />
                            </div>
                        ))}
                    </div>
                ) : pagesCount?.isSuccess ? (
                    <EmptyData />
                ) : null}
            </DndContext>
        </div>
    )
}
