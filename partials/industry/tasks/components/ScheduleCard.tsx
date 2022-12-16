import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

// components
import { Typography, LoadingAnimation } from '@components'
import { ScheduleCardAction } from './ScheduleCardAction'

// utills
import { ellipsisText } from '@utils'

// query
import {
    useDeleteEmployeeTaskMutation,
    useChangeEmployeeTaskPriorityMutation,
} from '@queries'

export const SchedulePriority = {
    high: 'bg-error',
    medium: 'bg-info',
    low: 'bg-success',
    none: 'bg-secondary-dark',
    draft: 'bg-transparent',
}

export const ScheduleCard = ({
    type,
    note,
    items,
    empty,
    endTime,
    priority,
    startTime,
    employee,
    outerIndex,
    innerIndex,
    moveCardHandler,
    employeeTaskLoading,
}: any) => {
    // Actions
    const [deleteTask, deleteTaskResult] = useDeleteEmployeeTaskMutation()
    const [changePriority, changePriorityResult] =
        useChangeEmployeeTaskPriorityMutation()

    const ref = useRef<HTMLInputElement>(null)

    const [{ opacity }, dragRef] = useDrag(
        () => ({
            type,
            item: () => {
                return { ...items, innerIndex }
            },
            end: (item, monitor) => {
                const dropResult = monitor.getDropResult()
                if (item && dropResult) {
                    // setCard({
                    //   ...item,
                    //   empty: true,
                    // });
                    // alert(`You dropped ${item.note} into ${dropResult}!`);
                }
            },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
                handlerId: monitor.getHandlerId(),
                opacity: monitor.isDragging() ? 0 : 1,
            }),
        }),
        [items]
    )

    const [{ canDrop, isOver }, drop] = useDrop(
        () => ({
            accept: type,
            hover(item: any, monitor: any) {
                if (!ref.current) {
                    return
                }
                const dragIndex = item.innerIndex
                const hoverIndex = innerIndex
                // Don't replace items with themselves
                if (dragIndex === hoverIndex) {
                    return
                }
                // Determine rectangle on screen
                const hoverBoundingRect = ref.current?.getBoundingClientRect()
                // Get vertical middle
                const hoverMiddleY =
                    (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
                // Determine mouse position
                const clientOffset = monitor.getClientOffset()
                // Get pixels to the top
                const hoverClientY = clientOffset.y - hoverBoundingRect.top
                // Only perform the move when the mouse has crossed half of the items height
                // When dragging downwards, only move when the cursor is below 50%
                // When dragging upwards, only move when the cursor is above 50%
                // Dragging downwards
                if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                    return
                }
                // Dragging upwards
                if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                    return
                }
                // Time to actually perform the action
                moveCardHandler(outerIndex, dragIndex, hoverIndex, innerIndex)
                // Note: we're mutating the monitor item here!
                // Generally it's better to avoid mutations,
                // but it's good here for the sake of performance
                // to avoid expensive index searches.
                item.innerIndex = hoverIndex
            },
            drop: (itemx, monitor) => {
                // Console('Recieved itemx: ', itemx)
                // setCard({ ...itemx, empty: false });
                // return { item };
            },
            collect: (monitor) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
            }),
        }),
        [items]
    )

    const isActive = canDrop && isOver

    dragRef(drop(ref))

    const loading = deleteTaskResult.isLoading || changePriorityResult.isLoading

    return (
        <div
            className={`rounded-lg w-[75px] h-10 p-1 cursor-pointer ${
                !empty && (SchedulePriority as any)[priority]
            } ${isActive ? 'border border-success' : ''} ${
                empty ? 'border border-dashed' : ''
            }`}
            ref={ref}
            style={{ opacity }}
        >
            {loading ? (
                <LoadingAnimation size={28} />
            ) : !empty ? (
                employeeTaskLoading ? (
                    <LoadingAnimation size={28} />
                ) : (
                    <div className="w-full relative">
                        {/* Action */}
                        <ScheduleCardAction
                            items={items}
                            deleteTask={deleteTask}
                            deleteTaskResult={deleteTaskResult}
                            changePriority={changePriority}
                        />
                        <Typography variant={'small'} color={'black'}>
                            {/* {startTime || "NA"} - {endTime || "NA"} */}
                            {startTime.substring(0, 2) || 'NA'} -{' '}
                            {endTime.substring(0, 2) || 'NA'}
                        </Typography>
                        <Typography variant={'small'} color={'black'}>
                            {ellipsisText(note, 8) || '-'}
                        </Typography>
                    </div>
                )
            ) : (
                <></>
            )}
        </div>
    )
}
