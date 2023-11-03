import { AppointmentViewModal } from '@components/Appointment/AppointmentModal'
import { Portal } from '@components/Portal'
import { Appointment } from '@types'
import classNames from 'classnames'
import moment from 'moment'
import { ReactElement, useState } from 'react'
import { UpdateScheduleModal } from '../modal'

// export const EventWrapper = <T extends object>(event: EventWrapperProps<T>) => {
export const EventWrapper = <T extends object>(event: any) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const classes = classNames({
        'bg-/50 border-blue-400 absolute max-h-full min-h-[20px] hover:min-h-[80px] border-l-2 px-1 py-1 overflow-hidden transition-all cursor-pointer':
            true,
        'bg-red-600/50 border-indigo-400': event?.event?.schedule?.isCancelled,
        'bg-indigo-200/50 border-indigo-400':
            !event?.event?.schedule?.isCancelled &&
            !event.event?.schedule?.reScheduled,
        'bg-green-400/50 border-green-400': event.event?.schedule?.reScheduled,
        'bg-success border-green-600': event.event?.schedule?.note,
        // 'bg-red-600 border-green-600': event.event?.appointment?.isCancelled,
    })

    const labelClasses = classNames({
        'text-xs font-medium': true,
        'text-indigo-600':
            event.event.priority === 'high' &&
            !event.event?.appointment?.isCancelled,
        'text-blue-500':
            event.event.priority === 'medium' &&
            !event.event?.appointment?.isCancelled,
        'text-green-600':
            event.event.priority === 'low' &&
            !event.event?.appointment?.isCancelled,
        'text-white': event.event?.appointment?.isCancelled,
    })

    const textClasses = classNames({
        'text-[11px] font-semibold': true,
        'text-indigo-800':
            event.event.priority === 'high' &&
            !event.event?.appointment?.isCancelled,
        'text-blue-800':
            event.event.priority === 'medium' &&
            !event.event?.appointment?.isCancelled,
        'text-green-800':
            event.event.priority === 'low' &&
            !event.event?.appointment?.isCancelled,
        'text-white': event.event?.appointment?.isCancelled,
    })


    const subtitleClasses = classNames({
        'text-[11px]': true,
        'text-indigo-800':
            event.event.priority === 'high' &&
            !event.event?.appointment?.isCancelled,
        'text-blue-800':
            event.event.priority === 'medium' &&
            !event.event?.appointment?.isCancelled,
        'text-green-800':
            event.event.priority === 'low' &&
            !event.event?.appointment?.isCancelled,
        'text-white': event.event?.appointment?.isCancelled,
    })

    const onModalCancelled = () => {
        setModal(null)
    }

    const onClicked = (schedule: any) => {
        setModal(
            <Portal>
                <UpdateScheduleModal
                    schedule={schedule}
                    onCancel={onModalCancelled}
                />
            </Portal>
        )
    }

    return (
        <>
            {modal}
            <div
                style={{
                    top: `${event.style?.top}%`,
                    height: `${event.style?.height}%`,
                    width: `${event.style?.width}%`,
                    left: `${event.style?.xOffset}%`,
                }}
                className={`${classes} `}
                onClick={() => {
                    onClicked(event.event?.schedule)
                }}
            >
                <p className={labelClasses}>
                    {moment(event?.event?.start).format('h:mm a')} -{' '}
                    {moment(event?.event?.end).format('h:mm a')}
                </p>
            </div>
        </>
    )
}
