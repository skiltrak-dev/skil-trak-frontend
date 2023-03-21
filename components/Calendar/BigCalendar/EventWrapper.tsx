import { AppointmentViewModal } from '@components/Appointment/AppointmentModal'
import { Portal } from '@components/Portal'
import classNames from 'classnames'
import { ReactElement, useState } from 'react'
import { EventWrapperProps } from 'react-big-calendar'

// export const EventWrapper = <T extends object>(event: EventWrapperProps<T>) => {
export const EventWrapper = <T extends object>(event: any) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const classes = classNames({
        'absolute max-h-full min-h-[20px] hover:min-h-[80px] border-l-2 px-1 py-1 overflow-hidden transition-all cursor-pointer':
            true,
        'bg-indigo-200/50 border-indigo-400':
            event.event.priority === 'high' &&
            !event.event?.appointment?.isCancelled,
        'bg-blue-200/50 border-blue-400':
            event.event.priority === 'medium' &&
            !event.event?.appointment?.isCancelled,
        'bg-green-200/50 border-green-600':
            event.event.priority === 'low' &&
            !event.event?.appointment?.isCancelled,
        'bg-red-600 border-green-600': event.event?.appointment?.isCancelled,
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

    const onClicked = (appointment: any) => {
        setModal(
            <Portal>
                <AppointmentViewModal
                    id={appointment?.id}
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
                className={classes}
                onClick={() => {
                    onClicked(event.event?.appointment)
                }}
            >
                <p className={labelClasses}>{event.label}</p>
                <p className={textClasses}>{event.event.title}</p>
                <p className={subtitleClasses}>
                    {event.event.subTitle || 'Unknown'}
                </p>
            </div>
        </>
    )
}
