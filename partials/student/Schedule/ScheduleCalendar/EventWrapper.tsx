import { AppointmentViewModal } from '@components/Appointment/AppointmentModal'
import { Portal } from '@components/Portal'
import { Appointment } from '@types'
import classNames from 'classnames'
import moment from 'moment'
import { ReactElement, useState } from 'react'

// export const EventWrapper = <T extends object>(event: EventWrapperProps<T>) => {
export const EventWrapper = <T extends object>(event: any) => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const classes = classNames({
        'bg-blue-200/50 border-blue-400 absolute max-h-full min-h-[20px] hover:min-h-[80px] border-l-2 px-1 py-1 overflow-hidden transition-all cursor-pointer':
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

    const onClicked = (appointment: Appointment) => {
        setModal(
            <Portal>
                <AppointmentViewModal
                    id={appointment?.id}
                    onCancel={onModalCancelled}
                />
            </Portal>
        )
    }

    console.log({
        event,
    })

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
                // onClick={() => {
                //     onClicked(event.event?.appointment)
                // }}
            >
                <p className={labelClasses}>
                    Start Time:
                    {moment(event?.event?.start).format('DD MMM YYYY')}
                </p>
                <p className={labelClasses}>
                    {moment(event?.event?.start).format('h:mm a')} -{' '}
                    {moment(event?.event?.end).format('h:mm a')}
                </p>
                <p className={labelClasses}></p>

                <p className={textClasses}>
                    Course:{event.event?.course?.title}
                </p>
            </div>
        </>
    )
}
