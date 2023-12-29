'use client'
import {
    AdminNavbar,
    Button,
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
import { useNavbar, useNotification } from '@hooks'
import { AdminApi } from '@queries'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { uuid } from 'uuidv4'

export default function ESign() {
    const [mounted, setMounted] = useState(false)
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [activeItem, setActiveItem] = useState(true)
    const [contextBar, setContextBar] = useState<any>()
    const [lastId, setLastId] = useState<any>('')
    const [items, setItems] = useState<any>([])
    const [newAddedItems, setNewAddedItems] = useState<any>([])
    const [lastSelectedItem, setLastSelectedItem] = useState<any>()
    const [draggableData, setDraggableData] = useState<any>()

    const navBar = useNavbar()

    const router = useRouter()

    const { notification } = useNotification()

    const [saveEsignTemplate, saveEsignTemplateResult] =
        AdminApi.ESign.useSaveTemplate()
    const template = AdminApi.ESign.useEsignTemplate(
        { id: Number(router.query?.id), pageNumber: currentPage },
        {
            skip: !router.query?.id,
            // refetchOnMountOrArgChange: true,
        }
    )
    const pagesCount = AdminApi.ESign.useTamplatePagesCount(
        Number(router.query?.id),
        {
            skip: !router.query?.id,
            // refetchOnMountOrArgChange: true,
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

    useEffect(() => {
        if (tabs?.data && tabs?.data?.length > 0 && tabs?.isSuccess) {
            const updatedItems = tabs?.data?.map((tab: any) => {
                const location = tab?.position?.split(',')
                const size = tab?.size?.split(',')
                return {
                    id: tab?.id,
                    page: Number(tab?.number) - 1,
                    location: {
                        x: Number(location?.[0]),
                        y: Number(location?.[1]),
                        page: Number(tab?.number) - 1,
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
                        isRequired: tab?.required,
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
            const existingItem = items.find((x: any) => x.id === contextBar?.id)
            if (existingItem) {
                const updatedList = items.filter(
                    (x: any) => x.id !== contextBar?.id
                )
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
            if (oldItem) {
                oldItem.selected = false
            }
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
        setActiveItem(false)

        console.log({ data })

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

            setLastId(newId)
            setItems((prevState: any) => [...prevState, tab])
            setNewAddedItems((prevState: any) => [...prevState, tab.id])
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
        if (content) {
            const updatedContent = {
                ...content,
                data: {
                    ...content?.data,
                    [key]:
                        key === 'isRequired'
                            ? e.target.checked
                            : e.target?.value,
                },
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

    const onHandleScroll = (id: number) => {
        const detailItem = document.getElementById(`document-template-${id}`)
        if (detailItem) {
            detailItem.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const onSaveClick = () => {
        const notRoles = items.filter((item: any) => !item?.data?.role)
        if (notRoles && notRoles?.length > 0) {
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

    const onCancelTabs = () => {
        setItems(items.filter((i: any) => !newAddedItems.includes(i?.id)))
        setNewAddedItems([])
    }

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
                    <div className="z-20 fixed w-full left-0 bottom-0 p-4 bg-white flex justify-end gap-x-2">
                        <Button
                            variant="primary"
                            text={'Cancel'}
                            outline
                            loading={saveEsignTemplateResult.isLoading}
                            disabled={
                                saveEsignTemplateResult.isLoading ||
                                !newAddedItems?.length
                            }
                            onClick={onCancelTabs}
                        />
                        <Button
                            variant="info"
                            text={'Save'}
                            loading={saveEsignTemplateResult.isLoading}
                            disabled={
                                saveEsignTemplateResult.isLoading ||
                                !newAddedItems?.length
                            }
                            onClick={onSaveClick}
                        />
                    </div>
                    <div className="flex">
                        <Sidebar setDraggableData={setDraggableData} />
                        <div className="w-full h-screen overflow-y-scroll pb-24">
                            <DragOverlay>
                                {draggableData ? (
                                    <div>
                                        <button className="flex items-center gap-2 p-2 hover:bg-gray-100 w-full rounded-md">
                                            <span
                                                className="text-xs p-2 rounded-md border"
                                                style={{
                                                    backgroundColor: `${draggableData?.color}26`,
                                                    borderColor:
                                                        draggableData?.color,
                                                    color: draggableData?.color,
                                                }}
                                            >
                                                <draggableData.Icon />
                                            </span>
                                            <p className="text-sm">
                                                {draggableData?.text}
                                            </p>
                                        </button>
                                    </div>
                                ) : null}
                            </DragOverlay>

                            {pagesCount.isError && (
                                <TechnicalError height="bg-white" />
                            )}

                            {pagesCount.isLoading || pagesCount.isFetching ? (
                                <LoadingAnimation height="h-[70vh]" />
                            ) : mounted && pagesCount?.data ? (
                                <div className="p-5">
                                    {/* <div className="px-4 flex justify-end gap-x-5">
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
                                    </div> */}

                                    {pagesCount?.data?.size?.map(
                                        (item: any, i: number) => (
                                            <div
                                                id={`document-template-${i}`}
                                                key={i}
                                            >
                                                <div className="bg-white w-full rounded-lg overflow-hidden">
                                                    <div className="flex justify-center">
                                                        <Typography variant="label">
                                                            {i + 1}
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
                                                        size={item}
                                                        items={items}
                                                        pageNumber={i + 1}
                                                        // path={item}
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
                                            </div>
                                        )
                                    )}
                                </div>
                            ) : (
                                template.isSuccess && <EmptyData />
                            )}
                        </div>
                        <Contextbar
                            onHandleScroll={onHandleScroll}
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
                            totalPages={pagesCount?.data?.pageCount}
                        />
                    </div>
                </div>
            </DndContext>
        </div>
    )
}
