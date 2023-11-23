'use client'
import {
    AdminNavbar,
    EmptyData,
    LoadingAnimation,
    TechnicalError,
} from '@components'
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
import { AdminApi } from '@queries'
import axios from 'axios'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'

export default function ESign() {
    const [mounted, setMounted] = useState(false)

    const navBar = useNavbar()

    const router = useRouter()

    const template = AdminApi.ESign.useEsignTemplate(Number(router.query?.id), {
        skip: !router.query?.id,
    })

    // const [template, settemplate] = useState<any>('')

    // useEffect(() => {
    //      if (router.query?.id && !template && !template?.length) {
    //     const test = async () => {
    //         const abc = await axios.get(
    //             `http://192.168.1.51:3001/esign/template/get/${router.query?.id}`
    //         )
    //         settemplate(abc.data)
    //     }
    //     test()
    //     }
    // }, [])

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
        setContextBar(item)
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

    const onSetContextBar = ({ content, e }: any) => {
        if (content) {
            const updatedContent = {
                ...content,
                data: { ...content?.data, dataLabel: e.target?.value },
            }
            setItems((items: any) =>
                items?.map((item: any) =>
                    item.id === content?.id ? updatedContent : item
                )
            )
            setContextBar(updatedContent)
        }
    }

    const onSetCoordinates = (content: any, e: any, key: string) => {
        // setContextBar({
        //     ...content,
        //     location: { ...content?.location, [key]: e.target?.value },
        // })
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

    const SvgData = () => {
        const arr = []
        for (let i = 0; i < template?.data?.length; i++) {
            arr.push(
                <DynamicSvgLoader
                    page={i + 1}
                    items={items}
                    onItemMove={onItemMove}
                    path={template?.data?.[i]}
                    onItemResize={onItemResize}
                    onItemRemove={onItemRemove}
                    onItemResized={onItemResized}
                    onItemSelected={onItemSelected}
                    onItemLocationChanged={onItemLocationChanged}
                />
            )
        }
        return arr
    }

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

                            {template.isError && (
                                <TechnicalError height="bg-white" />
                            )}
                            {/* {SvgData()} */}
                            {/* {template && (
                                <DynamicSvgLoader
                                    items={items}
                                    path={template}
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
                            )} */}
                            {template.isLoading ? (
                                <LoadingAnimation height="h-[70vh]" />
                            ) : mounted &&
                              template?.data &&
                              template?.data?.length > 0 ? (
                                <div className="p-5">
                                    {template?.data?.map(
                                        (item: any, i: number) => (
                                            <Fragment key={i}>
                                                <div className="bg-white">
                                                    <DynamicSvgLoader
                                                        items={items}
                                                        path={item}
                                                        page={i + 1}
                                                        onItemSelected={
                                                            onItemSelected
                                                        }
                                                        onItemMove={onItemMove}
                                                        onItemLocationChanged={
                                                            onItemLocationChanged
                                                        }
                                                        onItemResize={
                                                            onItemResize
                                                        }
                                                        onItemResized={
                                                            onItemResized
                                                        }
                                                        onItemRemove={
                                                            onItemRemove
                                                        }
                                                    />
                                                </div>
                                                <div className="my-8" />
                                            </Fragment>
                                        )
                                    )}
                                    {/* <DynamicSvgLoader
                                        items={items}
                                        path={template?.data[2]}
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
                                        path={template?.data[3]}
                                        page={4}
                                        onItemSelected={onItemSelected}
                                        onItemMove={onItemMove}
                                        onItemLocationChanged={
                                            onItemLocationChanged
                                        }
                                        onItemResize={onItemResize}
                                        onItemResized={onItemResized}
                                        onItemRemove={onItemRemove}
                                    /> */}
                                </div>
                            ) : (
                                template.isSuccess && <EmptyData />
                            )}
                        </div>
                        <Contextbar
                            content={contextBar}
                            onSetContextBar={(e: any) => {
                                onSetContextBar(e)
                            }}
                            onSetCoordinates={(
                                content: any,
                                e: any,
                                key: string
                            ) => {
                                onSetCoordinates(content, e, key)
                            }}
                        />
                    </div>
                </div>
            </DndContext>
        </div>
    )
}
