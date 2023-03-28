import { ActionButton, Button, Portal, Typography } from '@components'
import { User } from '@types'
import { getUserCredentials } from '@utils'
import moment from 'moment'
import { ReactElement, useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'

// query
import { CommonApi } from '@queries'
import { useNotification } from '@hooks'
import { TbCalendarTime } from 'react-icons/tb'
import { RescheduleAppointmentModal } from './RescheduleAppointmentModal'

type AppointmentCardProps = {
    date?: string
    time?: string
    totalMinutes?: string
    address?: string
    name?: string
    imageUrl?: string // imageUrl
    type?: string // REactElement ReactNode
    role: string
    appointment: any
    coordinator: User
    onAppointmentClicked: any
}

export const UpcomingAppointmentCard = ({
    totalMinutes,
    type,
    appointment,
    coordinator,
    onAppointmentClicked,
}: AppointmentCardProps) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const { notification } = useNotification()

    const [cancellAppointment, cancellAppointmentResult] =
        CommonApi.Appointments.cancellAppointment()

    const id = getUserCredentials()?.id
    const appointmentWith =
        appointment?.appointmentBy?.id === id
            ? 'appointmentFor'
            : 'appointmentBy'

    const appointmentUser = appointment[appointmentWith]

    const appointmentWithUser = appointmentUser
        ? appointmentUser[
              appointmentUser['role'] === 'subadmin'
                  ? 'coordinator'
                  : appointmentUser['role']
          ]
        : {}

    const appointmentWithUserProfile = appointmentUser
        ? appointmentUser['role'] === 'subadmin'
            ? appointmentWithUser[0]
            : appointmentWithUser
        : appointment?.coordinator

    useEffect(() => {
        if (cancellAppointmentResult.isSuccess) {
            notification.error({
                title: 'Appointment Cancelled',
                description: 'Appointment Cancelled Successfully',
            })
        }
    }, [cancellAppointmentResult])

    const onCancelClicked = () => {
        setModal(null)
    }

    const onRescheduleClicked = () => {
        setModal(
            <Portal>
                <RescheduleAppointmentModal onCancel={onCancelClicked} appointment={appointment} />
            </Portal>
        )
    }

    return (
        <>
            {modal && modal}
            <div className={'relative'}>
                <div className="absolute top-3 right-3 flex items-center gap-x-1">
                    <ActionButton
                        Icon={TbCalendarTime}
                        mini
                        title={'Reschedule Appointment'}
                        variant={'info'}
                        onClick={(e: any) => {
                            onRescheduleClicked()
                        }}
                        loading={cancellAppointmentResult?.isLoading}
                        disabled={cancellAppointmentResult?.isLoading}
                    />
                    <ActionButton
                        Icon={FaTimes}
                        mini
                        title={'Cancell Appointment'}
                        variant={'error'}
                        onClick={(e: any) => {
                            e?.stopPropagation()
                            cancellAppointment(appointment?.id)
                        }}
                        loading={cancellAppointmentResult?.isLoading}
                        disabled={cancellAppointmentResult?.isLoading}
                    />
                </div>
                <div
                    className="w-full bg-gradient-to-r from-[#3883F3] to-[#5D1BE0] rounded-2xl p-4"
                    onClick={(e) => {
                        e?.stopPropagation()
                        onAppointmentClicked(appointment)
                    }}
                >
                    <div className="flex justify-between gap-x-4">
                        <div className="">
                            <Typography
                                variant={'label'}
                                color={'text-blue-100'}
                            >
                                {moment(appointment?.date).format(
                                    'dddd, Do MMMM, YYYY'
                                )}
                            </Typography>
                            <div className="flex gap-x-2 items-center">
                                <p className="text-xl font-bold text-white">
                                    {moment(
                                        appointment?.startTime,
                                        'hh:mm:ss'
                                    ).format('hh:mm a')}{' '}
                                    -{' '}
                                    {moment(
                                        appointment?.endTime,
                                        'hh:mm:ss'
                                    ).format('hh:mm a')}
                                </p>
                                <Typography
                                    variant={'muted'}
                                    color={'text-blue-300'}
                                >
                                    ~{totalMinutes} Minutes
                                </Typography>
                            </div>
                            {appointmentWithUserProfile && (
                                <Typography
                                    variant={'label'}
                                    color={'text-blue-200'}
                                >
                                    {`${
                                        appointmentWithUserProfile?.addressLine1 ||
                                        'Address Not Provided'
                                    }`}
                                </Typography>
                            )}
                        </div>
                        <div className="flex items-start gap-x-2">
                            {/* <ActionButton
                            Icon={FaTimes}
                            mini
                            title={'Cancell Appointment'}
                            variant={'error'}
                            onClick={(e: any) => {
                                e?.stopPropagation()
                                cancellAppointment(appointment?.id)
                            }}
                            loading={cancellAppointmentResult?.isLoading}
                            disabled={cancellAppointmentResult?.isLoading}
                        /> */}
                            {/* <Button text="Upcoming" variant="action" /> */}
                        </div>
                    </div>
                    <div className="w-full flex justify-between items-center mt-8">
                        <div>
                            {coordinator && appointment?.appointmentFor ? (
                                <div>
                                    <Typography
                                        variant={'muted'}
                                        color={'text-white'}
                                    >
                                        Between
                                    </Typography>
                                    <div className="flex items-center flex-wrap gap-x-1">
                                        <h1 className="font-medium text-[16px] text-white whitespace-pre">
                                            {appointment?.appointmentFor?.name}{' '}
                                            ({appointment?.appointmentFor?.role}
                                            )
                                        </h1>
                                        <Typography
                                            variant={'muted'}
                                            color={'text-white'}
                                        >
                                            And
                                        </Typography>
                                        <h1 className="font-medium text-[16px] text-white whitespace-pre">
                                            {appointment?.appointmentBy?.name} (
                                            {appointment?.appointmentBy?.role})
                                        </h1>
                                    </div>
                                </div>
                            ) : (
                                <h1 className="font-medium text-[16px] text-white">
                                    {appointmentUser?.name} (
                                    {appointmentUser?.role})
                                </h1>
                            )}
                            <p className="text-[#BCDEFF]">{type}</p>
                        </div>
                        <div>
                            {/* <Image
                            src={imageUrl || ''}
                            width={50}
                            height={50}
                            alt=""
                        /> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
