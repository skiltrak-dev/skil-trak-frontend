import { CursorCoordinates } from '@components/Esign'
import { CommonApi } from '@queries'
import { useCallback, useEffect, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { Waypoint } from 'react-waypoint'
import { LogbookDraggableTab } from './LogbookDraggableTab'

export const LoogBookSVGLoader = ({
    size,
    items,
    tabsError,
    pageNumber,
    setCurrentPage,
    onItemLocationChanged,
    onChangedLocation,
    onItemResize,
    onItemResized,
    onItemSelected,
    setTabDropCoordinates,
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
    setRenderedPagesHeight: any
    isPageScrolled: boolean
    pageTopOffset: number
    currentPageY: number
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
}) => {
    const [svgContent, setSvgContent] = useState('')
    const [viewport, setViewport] = useState<string | null>('')
    const dimensionRef = useRef<HTMLDivElement>(null)
    const pageRef = useRef<HTMLDivElement>(null) // Ref for the page container

    // const onPageCoordinatesUpdate = (pageIndex: number, yPosition: number) => {
    //     setCurrentPageY(yPosition) // Update the Y position of the current page
    // }

    const template = CommonApi.ESign.useEsignTemplate({
        id: 160,
        pageNumber: pageNumber - 1,
    })

    useEffect(() => {
        const path = template?.data?.data?.[0]
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
        if (
            pageRef.current &&
            isPageScrolled &&
            template?.isSuccess &&
            svgContent
        ) {
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
                    // console.log(
                    //     `Page ${pageNumber} top offset: ${pageTopOffset}%`
                    // )
                    onPageCoordinatesUpdate(pageIndex, pageTopOffset)
                    if (
                        entry.intersectionRatio < 1 &&
                        entry.intersectionRatio > 0
                    ) {
                        console.log('Component is partially scrolled into view')
                    }
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

    const handleEnter = () => {}

    return (
        <div
            ref={pageRef}
            className="page-container"
            data-page-index={pageNumber - 1}
        >
            <Waypoint onEnter={handleEnter} onLeave={() => {}}>
                <div>
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
                                                viewport={viewport}
                                                onResize={onItemResize}
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
                    ) : (
                        <Skeleton
                            className="w-full rounded-lg z-10"
                            style={{ height: `${size?.height}px` }}
                        />
                    )}
                </div>
            </Waypoint>
        </div>
    )
}
