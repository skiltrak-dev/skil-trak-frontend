'use client'
import {
    AdminNavbar,
    DisplayNotifications,
    EmptyData,
    LoadingAnimation,
    TechnicalError,
    Typography,
} from '@components'
import { Contextbar, Sidebar } from '@components/Esign'
import DynamicSvgLoader from '@components/Esign/components/SvgLoader'
import { DndContext, DragOverlay } from '@dnd-kit/core'
import { restrictToWindowEdges } from '@dnd-kit/modifiers'
import { useNavbar } from '@hooks'
import { AdminApi } from '@queries'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { uuid } from 'uuidv4'

export default function ESign() {
    const [mounted, setMounted] = useState(false)
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [activeItem, setActiveItem] = useState(true)

    const navBar = useNavbar()

    const router = useRouter()

    const template = AdminApi.ESign.useEsignTemplate(
        { id: Number(router.query?.id), pageNumber: currentPage },
        {
            skip: !router.query?.id,
            refetchOnMountOrArgChange: true,
        }
    )
    const [tabDropCoordinates, setTabDropCoordinates] = useState<any>(null)

    // const [template, settemplate] = useState<any>('')

    const tabs = AdminApi.ESign.useGetEsignTemplateTabs(
        Number(router.query?.id),
        {
            skip:
                !router.query?.id ||
                !template?.data ||
                template?.isLoading ||
                template?.isFetching ||
                !template?.isSuccess,
            refetchOnMountOrArgChange: true,
        }
    )

    useEffect(() => {
        navBar.setTitle('E-Sign')
        if (!mounted) {
            setMounted(true)
        }
    }, [])

    const [contextBar, setContextBar] = useState<any>()

    const [lastId, setLastId] = useState<any>('')
    const [items, setItems] = useState<any>([])
    const [lastSelectedItem, setLastSelectedItem] = useState<any>()

    console.log({ items })

    useEffect(() => {
        if (tabs?.data && tabs?.data?.length > 0 && tabs?.isSuccess) {
            const updatedItems = tabs?.data?.map((tab: any) => {
                const location = tab?.position?.split(',')
                const size = tab?.size?.split(',')
                return {
                    id: tab?.id,
                    page: tab?.number,
                    location: {
                        x: Number(location?.[0]),
                        y: Number(location?.[1]),
                        page: tab?.number,
                    },
                    size: {
                        width: Number(size?.[0]),
                        height: Number(size?.[1]),
                    },
                    data: {
                        role: tab?.role,
                        type: tab?.type,
                        color: tab?.colour,
                        dataLabel: tab?.label,
                        column: tab?.columnName,
                        isCustom: tab?.isCustom,
                        placeholder: tab?.placeholder,
                        option: tab?.option,
                    },
                    saved: true,
                }
            })
            setItems(updatedItems)
        }
    }, [tabs])

    const onItemMove = (eventData: any) => {
        setActiveItem(true)

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
        console.log({ data })
        setActiveItem(false)

        // const newLocX = Math.abs(
        //     data?.delta?.x * (842.04 / data?.over?.rect?.width) -
        //         data?.over?.rect?.left
        // )
        // const newLocY = Math.abs(
        //     Math.abs(data?.delta?.y * (594.96 / data?.over?.rect?.height))
        // )

        const newLocX = tabDropCoordinates?.x
        const newLocY = tabDropCoordinates?.y

        // const newLocY = Math.abs(
        //     data.delta.y - data.active.data.current.clientY / 2
        // )

        if (data) {
            // const delta_x = (() => {
            //     console.log('::: WAS GREATER', data)
            //     if (data.delta.x <= data.over.rect.left) {
            //         return 0
            //     } else if (data.delta.x > data.over.rect.left) {
            //         return data.delta.x - data.over.rect.left
            //     }
            //     return data.over.rect.left - data.delta.x
            // })()

            // const delta_y = (() => {
            //     const calDeltaY = data.delta.y % data.over.rect.height
            //     if (data.delta.y > data.over.rect.bottom) {
            //         const percent =
            //             (data.delta.y - data.over.rect.height) /
            //             data.over.rect.height
            //         console.log('::: PERCENT', percent)
            //         return percent * 842
            //     }
            //     return data.delta.y
            // })()

            const newId = uuid()
            const tab = {
                id: newId,
                page: data?.over?.id,
                location: { x: newLocX, y: newLocY, page: data?.over?.id },
                size: { width: 120, height: 24 },
                data: {
                    ...data.active.data.current,
                    dataLabel: data.active.id,
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

            console.log({ tab })

            setLastId(newId)
            setItems((prevState: any) => [...prevState, tab])
        }
    }

    const onItemRemove = (item: any) => {
        console.log('Banka', item, items)
        setContextBar(null)
        const existingItem = items.find((x: any) => x.id === contextBar?.id)
        if (existingItem) {
            const updatedList = items.filter(
                (x: any) => x.id !== contextBar?.id
            )
            setItems(updatedList)
        }
        setLastSelectedItem(null)
    }

    // const onSetContextBar = ({ content, e }: any) => {
    //     if (content) {
    //         const updatedContent = {
    //             ...content,
    //             data: { ...content?.data, dataLabel: e.target?.value },
    //         }
    //         setItems((items: any) =>
    //             items?.map((item: any) =>
    //                 item.id === content?.id ? updatedContent : item
    //             )
    //         )
    //         setContextBar(updatedContent)
    //     }
    // }
    const onSetContextBar = ({ content, e }: any, key: string) => {
        console.log({ key })
        if (content) {
            const updatedContent = {
                ...content,
                data: { ...content?.data, [key]: e.target?.value },
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

    return (
        <div className="h-screen overflow-hidden">
            <DisplayNotifications />

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
                            <DragOverlay>
                                {activeItem ? <div>Test Drag</div> : null}
                            </DragOverlay>

                            {template.isError && (
                                <TechnicalError height="bg-white" />
                            )}

                            {template.isLoading || template.isFetching ? (
                                <LoadingAnimation height="h-[70vh]" />
                            ) : mounted &&
                              template?.data &&
                              template?.data?.data?.length > 0 ? (
                                <div className="p-5">
                                    <div className="px-4 flex justify-end gap-x-5">
                                        <button
                                            className={`flex items-center gap-x-1 text-xs font-semibold text-gray-500 hover:text-black disabled:text-gray-300 disabled:cursor-not-allowed`}
                                            onClick={() => {
                                                setCurrentPage((currentPage) =>
                                                    currentPage > 0
                                                        ? currentPage - 1
                                                        : 1
                                                )
                                            }}
                                            disabled={currentPage <= 0}
                                        >
                                            <FaChevronLeft />
                                            Previous
                                        </button>
                                        <button
                                            onClick={() => {
                                                setCurrentPage((currentPage) =>
                                                    currentPage <
                                                    template?.data?.totalPages
                                                        ? currentPage + 1
                                                        : template?.data
                                                              ?.totalPages
                                                )
                                            }}
                                            className={`flex items-center gap-x-1 text-xs font-semibold text-gray-500 hover:text-black disabled:text-gray-300 disabled:cursor-not-allowed`}
                                            disabled={
                                                currentPage + 1 ===
                                                template?.data?.totalPages
                                            }
                                        >
                                            Next
                                            <FaChevronRight />
                                        </button>
                                    </div>

                                    {template?.data?.data?.map(
                                        (item: any, i: number) => (
                                            <Fragment key={i}>
                                                <div className="bg-white w-full">
                                                    <div className="flex justify-center">
                                                        <Typography variant="label">
                                                            {currentPage + 1}
                                                        </Typography>
                                                    </div>
                                                    <DynamicSvgLoader
                                                        setTabDropCoordinates={(coordinates: {
                                                            x: number
                                                            y: number
                                                        }) => {
                                                            setTabDropCoordinates(
                                                                coordinates
                                                            )
                                                        }}
                                                        items={items}
                                                        path={item}
                                                        page={currentPage + 1}
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
                                </div>
                            ) : (
                                template.isSuccess && <EmptyData />
                            )}
                        </div>
                        <Contextbar
                            content={contextBar}
                            onSetContextBar={(e: any, key: string) => {
                                onSetContextBar(e, key)
                            }}
                            onSetCoordinates={(
                                content: any,
                                e: any,
                                key: string
                            ) => {
                                onSetCoordinates(content, e, key)
                            }}
                            setCurrentPage={(currentPage: number) => {
                                setCurrentPage(currentPage)
                            }}
                            items={items}
                            totalPages={template?.data?.totalPages}
                        />
                    </div>
                </div>
            </DndContext>
        </div>
    )
}
