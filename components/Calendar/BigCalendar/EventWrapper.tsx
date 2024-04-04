import { AppointmentViewModal } from '@components/Appointment/AppointmentModal'
import { Portal } from '@components/Portal'
import { UserRoles } from '@constants'
import { ReOpenedAssessment } from '@partials/sub-admin'
import { Appointment } from '@types'
import classNames from 'classnames'
import { ReactElement, useState } from 'react'
import { GoKebabHorizontal } from 'react-icons/go'

export const EventWrapper = <T extends object>(event: any) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const roles = [
        event?.event?.appointment?.appointmentBy?.role,
        event?.event?.appointment?.appointmentFor?.role,
    ]

    const rto = roles.includes(UserRoles.RTO)

    console.log({ event: event?.event })

    const classes = classNames({
        'absolute max-h-full min-h-[20px] hover:min-h-[80px] border-l-2 px-1 py-1 overflow-hidden transition-all cursor-pointer':
            true,
        'bg-success': rto,
        'bg-primary': !event.event?.appointment?.isApproved,
        'bg-indigo-200/50 border-indigo-400':
            event.event.priority === 'high' &&
            !event.event?.appointment?.isCancelled &&
            !rto &&
            event.event?.appointment?.isApproved,
        'bg-blue-200/50 border-blue-400':
            event.event.priority === 'medium' &&
            !event.event?.appointment?.isCancelled &&
            !rto &&
            event.event?.appointment?.isApproved,
        'bg-green-200/50 border-green-600':
            event.event.priority === 'low' &&
            !event.event?.appointment?.isCancelled &&
            !rto &&
            event.event?.appointment?.isApproved,
        'bg-red-600 border-green-600':
            event.event?.appointment?.isCancelled &&
            !rto &&
            event.event?.appointment?.isApproved,
    })

    const labelClasses = classNames({
        'text-xs font-medium': true,
        'text-gray-100': rto,
        'text-indigo-600':
            event.event.priority === 'high' &&
            !event.event?.appointment?.isCancelled &&
            !rto,
        'text-blue-500':
            event.event.priority === 'medium' &&
            !event.event?.appointment?.isCancelled &&
            !rto,
        'text-green-600':
            event.event.priority === 'low' &&
            !event.event?.appointment?.isCancelled &&
            !rto,
        'text-white': event.event?.appointment?.isCancelled && !rto,
    })

    const textClasses = classNames({
        'text-[11px] font-semibold': true,
        'text-gray-100': rto,
        'text-indigo-800':
            event.event.priority === 'high' &&
            !event.event?.appointment?.isCancelled &&
            !rto,
        'text-blue-800':
            event.event.priority === 'medium' &&
            !event.event?.appointment?.isCancelled &&
            !rto,
        'text-green-800':
            event.event.priority === 'low' &&
            !event.event?.appointment?.isCancelled &&
            !rto,
        'text-white': event.event?.appointment?.isCancelled && !rto,
    })

    const subtitleClasses = classNames({
        'text-[11px]': true,
        'text-gray-100': rto,
        'text-indigo-800':
            event.event.priority === 'high' &&
            !event.event?.appointment?.isCancelled &&
            !rto,
        'text-blue-800':
            event.event.priority === 'medium' &&
            !event.event?.appointment?.isCancelled &&
            !rto,
        'text-green-800':
            event.event.priority === 'low' &&
            !event.event?.appointment?.isCancelled,
        'text-white': event.event?.appointment?.isCancelled && !rto,
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

    const onMenuClicked = (appointment: Appointment) => {
        setModal(
            <Portal>
                {/* <AppointmentViewModal
                    id={appointment?.id}
                    onCancel={onModalCancelled}
                /> */}
                Add Note here
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
                {event.event?.appointment?.isCancelled ? (
                    <p className={subtitleClasses}>(Cancelled)</p>
                ) : null}
            </div>
        </>
    )
}
