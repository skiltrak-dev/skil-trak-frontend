import { Button } from '@components/buttons'
import { FieldsTypeEnum } from '@components/Esign/components/SidebarData'
import { Typography } from '@components/Typography'
import { UserRoles } from '@constants'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { CiSquareCheck } from 'react-icons/ci'
import { RiDeleteBinLine, RiFileCopy2Line } from 'react-icons/ri'
import { LogbookCheckBox, LogBookDateField, LogbookTextField } from './Fields'

export const LogbookDraggableTab = ({
    item,
    viewport,
    onResize,
    onPasteTab,
    onRemove,
    tabsError,
    onResized,
    onItemSelected,
    onChangedLocation,
}: any) => {
    const [selectedIIII, setSelectedIIII] = useState<any>({})

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
            style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
            }}
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
                    <div
                        style={{ pointerEvents: 'auto' }} // Ensure this div can receive pointer events
                        className="bg-white rounded shadow-xl border border-gray-200 absolute -top-0 left-0 cursor-pointer flex items-center"
                    >
                        <div className="p-1.5 border-l border-secondary-dark flex items-center gap-x-2">
                            <Typography variant="badge" color="text-black">
                                12 px
                            </Typography>
                            <div className="flex flex-col gap-y-0.5">
                                <div>
                                    <Image
                                        width={8}
                                        height={8}
                                        alt="Up Arrow"
                                        src={'/images/logbook/up-arrow.svg'}
                                    />
                                </div>
                                <div>
                                    <Image
                                        width={8}
                                        height={8}
                                        alt="Up Arrow"
                                        src={'/images/logbook/down-arrow.svg'}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="p-1.5 border-l border-secondary-dark">
                            <RiFileCopy2Line
                                onClick={(e: any) => {
                                    e.stopPropagation() // Stop the click from propagating to parent elements
                                    onPasteTab(item)
                                }}
                                className="text-black"
                                size={19}
                            />
                        </div>
                        <div className="p-1.5 border-l border-secondary-dark">
                            <RiDeleteBinLine
                                onClick={(e: any) => {
                                    e.stopPropagation() // Stop the click from propagating to parent elements
                                    onRemove(item)
                                }}
                                className="text-black"
                                size={19}
                            />
                        </div>
                        <div className="p-1.5 border-l border-secondary-dark">
                            <CiSquareCheck
                                onClick={(e: any) => {}}
                                className="text-black"
                                size={19}
                            />
                        </div>
                    </div>
                    {item?.data?.type === FieldsTypeEnum.Text ? (
                        <div className="mt-10 relative  top-0 left-0 z-50 bg-white w-full">
                            <LogbookTextField />
                        </div>
                    ) : null}
                    {item?.data?.type === FieldsTypeEnum.Date ? (
                        <div className="mt-10 relative  top-0 left-0 z-50 bg-white w-full ">
                            <LogBookDateField />
                        </div>
                    ) : null}
                    {item?.data?.type === FieldsTypeEnum.Checkbox ? (
                        <div className="mt-10 relative  top-0 left-0 z-50 w-10 ml-1 pb-1">
                            <LogbookCheckBox />
                        </div>
                    ) : null}
                    {item?.data?.type === FieldsTypeEnum.Signature ? (
                        <div className="mt-10 relative  top-0 left-0 z-50 w-full h-full ">
                            <Image
                                src={item?.data?.fieldValue}
                                alt={''}
                                width={200}
                                height={100}
                                className="border rounded-md border-secondary-dark bg-white"
                            />
                        </div>
                    ) : null}
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
                            <div className="bg-black">Saad</div>
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
                            <div className="bg-black relative -top-10 -left-10">
                                Saad
                            </div>

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
