import { NoData } from '@components/ActionAnimations'
import { CursorCoordinates } from '@components/Esign'
import { SubAdminApi } from '@queries'
import { useCallback, useEffect, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Waypoint } from 'react-waypoint'
import { LogbookDraggableTab } from './LogbookDraggableTab'

export const LoogBookSVGLoader = ({
    size,
    items,
    tabsError,
    logbookId,
    pageNumber,
    setCurrentPage,
    onItemLocationChanged,
    onEditingClicked,
    onChangedLocation,
    onItemResize,
    onItemResized,
    onItemSelected,
    setTabDropCoordinates,
    onChangeItemsData,
    onItemMove,
    onItemRemove,
    isPageScrolled,
    onPageCoordinatesUpdate,
    pageTopOffset,
    currentPageY,
    setRenderedPagesHeight,
    onPasteTab,
}: {
    onPasteTab: (item: any) => void
    onEditingClicked: (item: any) => void
    setRenderedPagesHeight: any
    isPageScrolled: boolean
    pageTopOffset: number
    currentPageY: number
    logbookId: number
    size: any
    items: any[]
    tabsError: any
    pageNumber: number
    setCurrentPage: (page: number) => void
    onItemLocationChanged: (eventData: any) => void
    onChangedLocation: (item: any) => void
    onItemResize: (item: any) => void
    onItemResized: (item: any) => void
    onItemSelected: (item: any, selected: boolean) => void
    setTabDropCoordinates: (coordinates: { x: number; y: number }) => void
    onItemMove: (eventData: any) => void
    onItemRemove: (item: any) => void
    onPageCoordinatesUpdate: (pageNumber: number, coordinates: any) => void
    onChangeItemsData: (val: any) => void
}) => {
    const [svgContent, setSvgContent] = useState('')
    const [viewport, setViewport] = useState<string | null>('')
    const dimensionRef = useRef<HTMLDivElement>(null)
    const [loadSvg, setLoadSvg] = useState(false)
    const pageRef = useRef<HTMLDivElement>(null) // Ref for the page container

    // const onPageCoordinatesUpdate = (pageIndex: number, yPosition: number) => {
    //     setCurrentPageY(yPosition) // Update the Y position of the current page
    // }

    const template = SubAdminApi.LogBook.useStudentLogbook(
        {
            id: logbookId,
            pageNumber: pageNumber - 1,
        },
        { skip: !logbookId || !loadSvg }
    )

    useEffect(() => {
        const path = template?.data?.data
        const parser = new DOMParser()
        const xmlDoc = parser.parseFromString(path, 'image/svg+xml')
        const root = xmlDoc.documentElement
        const svgViewport = root.getAttribute('viewBox')
        setViewport(svgViewport)

        if (path) {
            setSvgContent(
                path
                    ?.replace(/width="([\d.]+)pt"/, 'width="$1"')
                    .replace(/height="([\d.]+)pt"/, 'height="$1"')
            )
        }
    }, [template?.data?.data, pageNumber])

    useEffect(() => {
        if (pageRef.current && isPageScrolled) {
            const pageHeight = pageRef.current.getBoundingClientRect().height
            setRenderedPagesHeight((prevVal: number[]) => {
                let updatedVal = [...prevVal]
                updatedVal[template?.data?.currentPage] = pageHeight

                return updatedVal
            })
        }
    }, [currentPageY, template, isPageScrolled, svgContent])

    const handleVisibilityChange = useCallback(
        (entries: any) => {
            entries.forEach((entry: any) => {
                if (entry.isIntersecting) {
                    const pageIndex = parseInt(
                        entry.target.getAttribute('data-page-index') || '0',
                        10
                    )
                    setCurrentPage(pageIndex) // Update parent state

                    onPageCoordinatesUpdate(pageIndex, pageTopOffset)
                }
            })
        },
        [pageNumber, setCurrentPage, pageTopOffset] // Add dependency here
    )

    useEffect(() => {
        const observer = new IntersectionObserver(handleVisibilityChange, {
            threshold: [0.5],
        })

        if (pageRef.current) {
            observer.observe(pageRef.current)
        }

        return () => {
            if (pageRef.current) {
                observer.unobserve(pageRef.current)
            }
        }
    }, [handleVisibilityChange])

    const handleEnter = () => {
        // Set a timeout to make the API call after 1 second of inactivity
        setTimeout(() => {
            setLoadSvg(true)
        }, 400)
    }

    return (
        <div
            ref={pageRef}
            className="page-container"
            data-page-index={pageNumber - 1}
        >
            <Waypoint
                onEnter={handleEnter}
                onLeave={() => {
                    setLoadSvg(false)
                }}
            >
                <div>
                    {template.isError ? (
                        <NoData text="There is some technical issue!" isError />
                    ) : null}
                    {template?.data ? (
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

                            <div className="w-full mx-auto">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="100%"
                                    height="100%"
                                    viewBox={String(viewport)}
                                >
                                    <g>
                                        <image
                                            href={`data:image/svg+xml,${encodeURIComponent(
                                                svgContent
                                            )}`}
                                        />
                                        {items.map((item: any, i: number) => (
                                            <LogbookDraggableTab
                                                key={item?.id}
                                                item={item}
                                                onPasteTab={onPasteTab}
                                                onChangedLocation={
                                                    onChangedLocation
                                                }
                                                onChangeItemsData={
                                                    onChangeItemsData
                                                }
                                                viewport={viewport}
                                                onResize={onItemResize}
                                                onEditingClicked={() => {
                                                    onEditingClicked(item)
                                                }}
                                                onResized={onItemResized}
                                                onItemSelected={onItemSelected}
                                                onRemove={onItemRemove}
                                                tabsError={tabsError}
                                            />
                                        ))}
                                    </g>
                                </svg>
                            </div>
                        </div>
                    ) : template?.isLoading ? (
                        <Skeleton
                            className="w-full rounded-lg z-10"
                            style={{ height: `${size?.height}px` }}
                        />
                    ) : null}
                </div>
            </Waypoint>
        </div>
    )
}
