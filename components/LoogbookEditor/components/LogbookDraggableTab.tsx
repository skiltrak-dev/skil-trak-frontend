import { UserRoles } from '@constants'
import { Button } from '@components/buttons'
import { TextInput } from '@components/inputs'
import { useEffect, useRef, useState } from 'react'
import { FieldsTypeEnum } from '@components/Esign/components/SidebarData'

export const LogbookDraggableTab = ({
    item,
    viewport,
    onResize,
    onRemove,
    tabsError,
    onResized,
    onItemSelected,
    onChangedLocation,
}: any) => {
    const [selectedIIII, setSelectedIIII] = useState<any>({})
    const [show, setShow] = useState<boolean>(false)

    const handleClick = (e: any) => {
        e?.stopPropagation()
        setSelectedIIII({
            ...selectedIIII,
            selected: false,
        })
    }

    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [dragging, setDragging] = useState(false)
    const offset = useRef({ x: 0, y: 0 })

    useEffect(() => {
        setPosition({ x: item?.location?.x, y: item?.location?.y })
    }, [item])

    const handleMouseDown = (e: any) => {
        setShow(true)
        e?.stopPropagation()
        setDragging(true)

        offset.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        }

        setSelectedIIII(item)
        onItemSelected(item, !item.selected, true)
    }

    useEffect(() => {
        const handleMouseMove = (e: any) => {
            e?.stopPropagation()
            e.preventDefault()
            if (dragging) {
                const newPosition = {
                    x: e.clientX - offset.current.x,
                    y: e.clientY - offset.current.y,
                }
                requestAnimationFrame(() => setPosition(newPosition))
            }
        }

        const handleMouseUp = (e: any) => {
            e?.stopPropagation()
            e.preventDefault()
            if (dragging) {
                onChangedLocation({
                    ...item,
                    location: { ...item?.location, ...position },
                })
                setDragging(false)
            }
        }

        if (dragging) {
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
        } else {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }
    }, [dragging, item, position, onChangedLocation])

    const [isTabError, setIsTabError] = useState(false)

    useEffect(() => {
        if (
            tabsError &&
            tabsError?.map((tab: any) => tab.id).includes(item?.id)
        ) {
            setIsTabError(true)
        }
        if (item?.data?.role) {
            setIsTabError(false)
        }
    }, [item?.data?.role, tabsError])

    return (
        <g
            id={item?.id}
            data-view-name="tab"
            data-view-id=""
            cursor={'grab'}
            className="outline-none z-50"
            onKeyDown={(e: any) => {
                var key = e.which || e.keyCode || e.charCode
                if (key == 8 || key == 46) {
                    onRemove(item)
                }
            }}
            style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
            onMouseDown={handleMouseDown}
        >
            <foreignObject
                x="2"
                y="5"
                width={item.size?.width}
                height={item.size?.height}
                style={{ background: 'transparent', pointerEvents: 'auto' }} // Ensure it's visible and clickable
            >
                <div
                    style={{
                        position: 'relative',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        fontSize: '10px',
                        color: item.data?.color,
                        background: 'transparent', // Ensure it's visible and clickable
                        pointerEvents: 'auto', // Allow pointer events on this div
                    }}
                    id={`tabs-view-${item?.id}`}
                    className="flex flex-col justify-center gap-x-1"
                >
                    {show ? (
                        <div
                            onClick={(e: any) => {
                                e.stopPropagation() // Stop the click from propagating to parent elements

                                onRemove(item)
                            }}
                            style={{ pointerEvents: 'auto' }} // Ensure this div can receive pointer events
                            className="bg-black w-full absolute top-0 left-0 cursor-pointer"
                        >
                            Saad
                        </div>
                    ) : null}
                    <div className="mt-4 relative top-0 left-0 z-50 px-4 bg-white">
                        <Button onClick={handleClick}>Sign</Button>
                    </div>
                    <div className="relative top-0 left-0 z-50 px-4 bg-white">
                        <TextInput name="Saad" showError={false} />
                    </div>
                </div>
            </foreignObject>
        </g>
    )

    return (
        <g
            id={item?.id}
            data-view-name="tab"
            data-view-id=""
            cursor={'grab'}
            className="outline-none z-50"
            onKeyDown={(e: any) => {
                var key = e.which || e.keyCode || e.charCode
                if (key == 8 || key == 46) {
                    onRemove(item)
                }
            }}
            style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
            onMouseDown={handleMouseDown}
        >
            {item?.data?.type === FieldsTypeEnum.Checkbox ? (
                <>
                    <rect
                        x="0"
                        y="0"
                        width="11"
                        height="11"
                        fill={
                            !item?.data?.role && isTabError
                                ? 'red'
                                : item.data?.color
                        }
                        stroke="black"
                        strokeWidth="1"
                    />
                    <text x="2" y="9" className="text-[9px]" fill={'white'}>
                        ✔
                    </text>
                </>
            ) : (
                <>
                    {!item?.data?.role && isTabError ? (
                        <>
                            <rect
                                x="0" // Adjust the x-coordinate to move the background closer to the text
                                y="-9" // Adjust the y-coordinate to move the background closer to the text
                                width={item.size?.width} // Adjust the width to reduce the size of the background
                                height="8" // Adjust the height to reduce the size of the background
                                fill="white" // Replace 'yellow' with the desired background color
                                fillOpacity="1"
                            />
                            <text
                                x="2"
                                y="-2"
                                className="text-[7px] "
                                fill={'red'}
                            >
                                Please Select the role
                            </text>
                        </>
                    ) : (
                        item?.data?.isCustom && (
                            <text
                                style={{
                                    backgroundColor: 'yellow',
                                    fontSize: '7px',
                                    color: item.data?.color,
                                }}
                                className="uppercase"
                                x="2"
                                y="-2"
                                // fill={item.data?.color}
                            >
                                {item?.data?.role === UserRoles.SUBADMIN
                                    ? 'Coordinator'
                                    : item?.data?.role}
                            </text>
                        )
                    )}

                    <rect
                        width={item.size?.width}
                        height={item.size?.height}
                        // fill="#F7910F"
                        fill={'transparent'}
                        // fill={
                        //     !item?.data?.role && isTabError
                        //         ? 'red'
                        //         : item.data?.color
                        // }
                        // stroke={item.data?.color}
                        fillOpacity="0.4"
                        strokeWidth={'0.5'}
                    />

                    <foreignObject
                        x="2"
                        y="5"
                        width={item.size?.width}
                        height={item.size?.height}
                        style={{ background: 'transparent' }} // Ensure it's visible and clickable
                    >
                        <div
                            style={{
                                position: 'relative',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                fontSize: '10px',
                                color: item.data?.color,
                                background: 'transparent', // Ensure it's visible and clickable
                            }}
                            id={`tabs-view-${item?.id}`}
                            className="flex flex-col justify-center gap-x-1"
                        >
                            {show ? <div className="bg-black">Saad</div> : null}
                            {/* <div className="relative top-0 left-0 z-50 p-4 bg-white">
                                <Button onClick={handleClick}>Sign</Button>
                            </div> */}
                        </div>
                    </foreignObject>
                    <foreignObject
                        x="2"
                        y="5"
                        width={item.size?.width}
                        height={item.size?.height}
                        style={{ background: 'transparent' }} // Ensure it's visible and clickable
                    >
                        <div
                            style={{
                                position: 'relative',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                fontSize: '10px',
                                color: item.data?.color,
                                background: 'transparent', // Ensure it's visible and clickable
                            }}
                            id={`tabs-view-${item?.id}`}
                            className="flex items-center gap-x-1"
                        >
                            {show ? (
                                <div className="bg-black relative -top-10 -left-10">
                                    Saad
                                </div>
                            ) : null}
                            <div className="relative top-0 left-0 z-50 p-4 bg-white">
                                <Button onClick={handleClick}>Sign</Button>
                            </div>
                        </div>
                    </foreignObject>
                </>
            )}
        </g>
    )
}
