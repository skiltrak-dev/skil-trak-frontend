import { EmptyData } from '@components/ActionAnimations'
import { FieldsTypeEnum } from '@components/Esign/components/SidebarData'
import { LoadingAnimation } from '@components/LoadingAnimation'
import { CommonApi } from '@queries'
import { useEffect, useRef, useState } from 'react'
import { uuid } from 'uuidv4'
import { LoogbookSidebar, LoogBookSVGLoader } from './components'

export const LoogbookEditor = () => {
    const [draggableData, setDraggableData] = useState<any>()
    const [tabDropCoordinates, setTabDropCoordinates] = useState<any>(null)
    const [currentPage, setCurrentPage] = useState<any>(0)
    const [currentPageY, setCurrentPageY] = useState<number>(0)
    const [pageVisiblePercentages, setPageVisiblePercentages] = useState<{
        [key: number]: number
    }>({})
    const [pageTopOffsets, setPageTopOffsets] = useState<{
        [key: number]: number
    }>({})

    const scrollContainerRef = useRef<HTMLDivElement>(null)

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

    const pagesCount = CommonApi.ESign.useTamplatePagesCount(242)

    // const handleScroll = () => {
    //     const container = scrollContainerRef.current
    //     if (container && pagesCount.data) {
    //         const scrollTop = container.scrollTop
    //         let accumulatedHeight = 0
    //         let currentPageIndex = 0

    //         for (let i = 0; i < pagesCount.data.size.length; i++) {
    //             const pageHeight = pagesCount.data.size[i].height
    //             if (scrollTop < accumulatedHeight + pageHeight) {
    //                 currentPageIndex = i
    //                 break
    //             }
    //             accumulatedHeight += pageHeight
    //         }

    //         const currentPageTop = scrollTop - accumulatedHeight
    //         setCurrentPage(currentPageIndex)
    //         setCurrentPageY(currentPageTop)
    //         console.log({
    //             currentPageIndex,
    //             currentPageTopcurrentPageTopcurrentPageTopcurrentPageTop:
    //                 currentPageTop,
    //         })
    //     }
    // }

    // const handleScroll = () => {
    //     const container = scrollContainerRef.current
    //     if (container && pagesCount.data) {
    //         const scrollTop = container.scrollTop
    //         const containerHeight = container.clientHeight
    //         let accumulatedHeight = 0
    //         let currentPageIndex = 0

    //         for (let i = 0; i < pagesCount.data.size.length; i++) {
    //             const pageHeight = pagesCount.data.size[i].height
    //             accumulatedHeight += pageHeight

    //             const nextPageThreshold = accumulatedHeight - pageHeight * 0.5 // 50% of the page height

    //             // Check if the scrollTop has reached the threshold for the next page
    //             if (
    //                 scrollTop < nextPageThreshold ||
    //                 i === pagesCount.data.size.length - 1
    //             ) {
    //                 currentPageIndex = i
    //                 break
    //             }
    //         }

    //         const previousPagesHeight =
    //             accumulatedHeight -
    //             pagesCount.data.size[currentPageIndex].height

    //         // Calculate the currentPageTop correctly
    //         const currentPageTop = Math.max(0, scrollTop - previousPagesHeight) // Ensure non-negative value

    //         setCurrentPage(currentPageIndex)
    //         setCurrentPageY(currentPageTop)

    //         console.log({
    //             currentPageIndex,
    //             currentPageTop,
    //             scrollTop,
    //             accumulatedHeight,
    //             containerHeight,
    //             previousPagesHeight,
    //         })
    //     }
    // }

    useEffect(() => {
        const container = scrollContainerRef.current
        if (container) {
            container.addEventListener('scroll', handleScroll)
            return () => container.removeEventListener('scroll', handleScroll)
        }
    }, [scrollContainerRef.current, pagesCount.data])

    const handleScroll = () => {
        const container = scrollContainerRef.current
        if (container && pagesCount.data) {
            const scrollTop = container.scrollTop
            let accumulatedHeight = 0
            let currentPageIndex = 0

            // Loop through each page to find the current page index
            for (let i = 0; i < pagesCount.data.size.length; i++) {
                const pageHeight = (pagesCount.data.size[i].height * 96) / 100
                accumulatedHeight += pageHeight

                // Check if the scrollTop is within the current accumulated height range
                if (scrollTop < accumulatedHeight) {
                    currentPageIndex = i
                    break
                }

                // Ensure we capture the last page if we're at the end of the loop
                if (i === pagesCount.data.size.length - 1) {
                    currentPageIndex = i // Set to the last page index
                }
            }

            // Calculate the total height of all previous pages
            const previousPagesHeight =
                accumulatedHeight -
                pagesCount.data.size[currentPageIndex].height

            // Calculate the current Y position relative to the top of the current page
            const currentPageTop = scrollTop - previousPagesHeight

            // Set states
            setCurrentPage(currentPageIndex)
            setCurrentPageY(currentPageTop)

            // Debugging information
        }
    }

    // const handleScroll = () => {
    //     const container = scrollContainerRef.current
    //     if (container && pagesCount.data) {
    //         const scrollTop = container.scrollTop
    //         const containerHeight = container.clientHeight

    //         let accumulatedHeight = 0
    //         let currentPageIndex = 0

    //         for (let i = 0; i < pagesCount.data.size.length; i++) {
    //             const pageHeight = pagesCount.data.size[i].height
    //             accumulatedHeight += pageHeight

    //             const nextPageThreshold = accumulatedHeight - pageHeight * 0.5 // 50% of the page height

    //             // Check if the scrollTop has reached the threshold for the next page
    //             if (
    //                 scrollTop < nextPageThreshold ||
    //                 i === pagesCount.data.size.length - 1
    //             ) {
    //                 currentPageIndex = i
    //                 break
    //             }
    //         }

    //         const previousPagesHeight =
    //             accumulatedHeight -
    //             pagesCount.data.size[currentPageIndex].height
    //         const currentPageTop = scrollTop - previousPagesHeight

    //         console.log({ scrollTop, currentPageIndex })

    //         setCurrentPage(currentPageIndex)
    //         setCurrentPageY(currentPageTop)

    //         console.log({
    //             currentPageIndex,
    //             currentPageTop,
    //             scrollTop,
    //             accumulatedHeight,
    //             containerHeight,
    //         })
    //     }
    // }

    // useEffect(() => {
    //     const container = scrollContainerRef.current
    //     if (container) {
    //         container.addEventListener('scroll', handleScroll)
    //         return () => container.removeEventListener('scroll', handleScroll)
    //     }
    // }, [scrollContainerRef.current, pagesCount.data])

    // const handleScroll = () => {
    //     const container = scrollContainerRef.current
    //     if (container && pagesCount.data) {
    //         const scrollTop = container.scrollTop
    //         let accumulatedHeight = 0
    //         let currentPageIndex = 0
    //         const tolerance = 5 // A small buffer to handle minor discrepancies

    //         for (let i = 0; i < pagesCount.data.size.length; i++) {
    //             const pageHeight = pagesCount.data.size[i].height
    //             accumulatedHeight += pageHeight

    //             if (
    //                 scrollTop + tolerance < accumulatedHeight ||
    //                 i === pagesCount.data.size.length - 1
    //             ) {
    //                 currentPageIndex = i
    //                 break
    //             }
    //         }

    //         const previousPagesHeight =
    //             accumulatedHeight -
    //             pagesCount.data.size[currentPageIndex].height
    //         const currentPageTop = scrollTop - previousPagesHeight

    //         setCurrentPage(currentPageIndex)
    //         setCurrentPageY(currentPageTop)

    //         console.log({
    //             currentPageIndex,
    //             currentPageTop,
    //             scrollTop,
    //             accumulatedHeight,
    //         })
    //     }
    // }

    // useEffect(() => {
    //     const container = scrollContainerRef.current
    //     if (container) {
    //         container.addEventListener('scroll', handleScroll)
    //         return () => container.removeEventListener('scroll', handleScroll)
    //     }
    // }, [scrollContainerRef.current, pagesCount.data])

    // const handleScroll = () => {
    //     const container = scrollContainerRef.current
    //     if (container && pagesCount.data) {
    //         const scrollTop = container.scrollTop
    //         let accumulatedHeight = 0
    //         let currentPageIndex = 0

    //         for (let i = 0; i < pagesCount.data.size.length; i++) {
    //             const pageHeight = pagesCount.data.size[i].height
    //             accumulatedHeight += pageHeight
    //             if (
    //                 scrollTop < accumulatedHeight ||
    //                 i === pagesCount.data.size.length - 1
    //             ) {
    //                 currentPageIndex = i
    //                 break
    //             }
    //         }

    //         const previousPagesHeight =
    //             accumulatedHeight -
    //             pagesCount.data.size[currentPageIndex].height
    //         const currentPageTop = scrollTop - previousPagesHeight
    //         setCurrentPage(currentPageIndex)
    //         setCurrentPageY(currentPageTop)
    //         console.log({
    //             currentPageIndex,
    //             currentPageTop,
    //             scrollTop,
    //             accumulatedHeight,
    //         })
    //     }
    // }

    // useEffect(() => {
    //     const container = scrollContainerRef.current
    //     if (container) {
    //         container.addEventListener('scroll', handleScroll)
    //         return () => container.removeEventListener('scroll', handleScroll)
    //     }
    // }, [scrollContainerRef.current, pagesCount.data])

    // const handleScroll = () => {
    //     const container = scrollContainerRef.current
    //     if (container) {
    //         const scrollTop = container.scrollTop
    //         const containerHeight = container.clientHeight
    //         const totalHeight = container.scrollHeight

    //         // Calculate visible percentages for all pages
    //         const newPageVisiblePercentages: { [key: number]: number } = {}
    //         pagesCount.data.size.forEach((item: any, index: number) => {
    //             const pageStart = index * containerHeight
    //             const pageEnd = pageStart + containerHeight
    //             const visibleStart = Math.max(pageStart, scrollTop)
    //             const visibleEnd = Math.min(
    //                 pageEnd,
    //                 scrollTop + containerHeight
    //             )
    //             const visibleHeight = Math.max(0, visibleEnd - visibleStart)
    //             const visiblePercentage =
    //                 (visibleHeight / containerHeight) * 100
    //             newPageVisiblePercentages[index] = visiblePercentage
    //         })

    //         setPageVisiblePercentages(newPageVisiblePercentages)
    //     }
    // }

    // const handleScroll = () => {
    //     const container = scrollContainerRef.current
    //     if (container) {
    //         const scrollTop = container.scrollTop
    //         const containerHeight = container.clientHeight

    //         // Calculate top offsets for all pages
    //         const newPageTopOffsets: { [key: number]: number } = {}
    //         pagesCount.data.size.forEach((item: any, index: number) => {
    //             const pageStart = index * containerHeight
    //             const pageTopOffset = Math.max(0, scrollTop - pageStart)
    //             newPageTopOffsets[index] = pageTopOffset
    //         })

    //         setPageTopOffsets(newPageTopOffsets)
    //     }
    // }

    // useEffect(() => {
    //     const container = scrollContainerRef.current
    //     if (container) {
    //         container.addEventListener('scroll', handleScroll)
    //         return () => container.removeEventListener('scroll', handleScroll)
    //     }
    // }, [scrollContainerRef.current, pagesCount.data])

    // const getPageTopOffset = (pageNumber: number) => {
    //     const visiblePercentage = pageVisiblePercentages[pageNumber] || 0
    //     return 100 - visiblePercentage
    // }

    const getPageTopOffset = (pageNumber: number) =>
        pageTopOffsets[pageNumber] || 0

    // useEffect(() => {
    //     const container = scrollContainerRef.current
    //     if (container) {
    //         container.addEventListener('scroll', handleScroll)
    //         return () => container.removeEventListener('scroll', handleScroll)
    //     }
    // }, [scrollContainerRef.current])

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

    const onChangedLocation = (item: any) => {
        const existingItem = items?.find((x: any) => x?.id === item?.id)
        const updatedList = items.filter((x: any) => x?.id !== item?.id)
        if (existingItem) {
            setItems([...updatedList, item])
        }
    }

    const onItemRemove = (item: any) => {
        setContextBar(null)
        const existingItem = items.find((x: any) => x.id === item?.id)
        if (existingItem) {
            const updatedList = items.filter((x: any) => x.id !== item?.id)
            setItems(updatedList)
        }
    }

    const checkPageIndexY =
        pagesCount?.isSuccess && pagesCount?.data
            ? (currentPageY * 100) / pagesCount?.data?.size?.[0]?.height > 88
            : false

    return (
        <div className="bg-gray-300 flex justify-center w-full h-screen">
            <div>
                <p>{`currentPage ${currentPage}`}</p>{' '}
                <p>{`currentPageY ${currentPageY}`}</p>
                <LoogbookSidebar
                    setData={(e: any) => {
                        const newId = uuid()
                        setDraggableData(e)
                        setItems([
                            ...items,
                            {
                                id: newId,
                                page: checkPageIndexY
                                    ? currentPage + 1
                                    : currentPage,
                                location: {
                                    x: 0,
                                    page: checkPageIndexY
                                        ? currentPage + 1
                                        : currentPage,
                                    y: checkPageIndexY
                                        ? 30
                                        : (currentPageY * 96) / 100,
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
                                saved: false,
                            },
                        ])
                    }}
                    setDraggableData={setDraggableData}
                />
            </div>
            {pagesCount?.isLoading ? (
                <LoadingAnimation />
            ) : pagesCount?.data ? (
                <div
                    ref={scrollContainerRef}
                    className="w-[600px] h-[85vh] border-4 border-blue-400 rounded-lg overflow-auto custom-scrollbar flex flex-col gap-y-2"
                >
                    {pagesCount?.data?.size?.map((item: any, i: number) => (
                        <div key={i} className="bg-white">
                            <LoogBookSVGLoader
                                pageTopOffset={getPageTopOffset(i)}
                                onPageCoordinatesUpdate={(
                                    page: number,
                                    yPosition: number
                                ) => {
                                    // setCurrentPageY(yPosition)
                                }}
                                setCurrentPage={() => {
                                    // setCurrentPage()
                                }}
                                onItemLocationChanged={onItemLocationChanged}
                                onChangedLocation={onChangedLocation}
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
                                currentPageY={currentPageY}
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
        </div>
    )
}
