import { Typography } from '@components'
import { Appointment, appointmentWithUser } from '@types'
import moment from 'moment'
import Image from 'next/image'
import React, { ReactNode, useState } from 'react'
import { LuClock } from 'react-icons/lu'
import { RxCalendar } from 'react-icons/rx'
import { GrLocation } from 'react-icons/gr'
import { UserRoles } from '@constants'
import { getUserCredentials } from '@utils'
import { AppointmentViewModal } from '@components/Appointment/AppointmentModal'

export const AppointmentCard = ({
    type,
    appointment,
}: {
    type: string
    appointment: Appointment
}) => {
    const [modal, setModal] = useState<ReactNode | null>(null)

    const id = getUserCredentials()?.id
    const appointmentWith =
        appointment?.appointmentBy?.id === id
            ? 'appointmentFor'
            : 'appointmentBy'

    const appointmentUser: appointmentWithUser = appointment[appointmentWith]

    const appointmentWithUser = appointmentUser
        ? appointmentUser[
              appointmentUser?.role === UserRoles.SUBADMIN
                  ? ('coordinator' as keyof typeof appointmentUser)
                  : (appointmentUser?.role as keyof typeof appointmentUser)
          ]
        : {}

    const appointmentWithUserProfile = appointmentUser
        ? appointmentUser?.role === UserRoles.SUBADMIN
            ? appointmentWithUser[0]
            : appointmentWithUser
        : appointment?.coordinator

    const onAppointmentClicked = () => {
        setModal(
            <AppointmentViewModal
                id={appointment?.id}
                onCancel={() => setModal(null)}
            />
        )
    }
    return (
        <>
            {modal}
            <div className="h-full bg-primaryNew-dark rounded-lg overflow-hidden px-4 py-2.5 relative">
                {/* Type */}
                <div className="w-24 h-6 bg-primary flex justify-center items-center absolute top-0 right-0">
                    <Typography bold variant="xxs" color="text-white">
                        {type}
                    </Typography>
                </div>

                <div className="flex justify-between items-center">
                    <div>
                        <div className="flex flex-col gap-y-2">
                            <div className="flex items-center gap-x-2">
                                <div className="w-[30px] h-[30px] rounded-lg bg-primary flex justify-center items-center">
                                    <RxCalendar className="text-white" />
                                </div>
                                <Typography variant="small" color="text-white">
                                    {moment(new Date(appointment?.date)).format(
                                        'dddd, MMMM DD YYYY'
                                    )}{' '}
                                </Typography>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <div className="w-[30px] h-[30px] rounded-lg bg-primary flex justify-center items-center">
                                    <LuClock className="text-white" />
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <Typography
                                        variant="small"
                                        color="text-white"
                                    >
                                        {moment(
                                            appointment?.startTime,
                                            'hh:mm'
                                        ).format('hh:mm a')}{' '}
                                        -{' '}
                                        {moment(
                                            appointment?.endTime,
                                            'hh:mm'
                                        ).format('hh:mm a')}
                                    </Typography>
                                    <Typography
                                        variant="badge"
                                        normal
                                        color="text-white"
                                    >
                                        ~ {appointment?.type?.breakDuration} Min
                                        Break
                                    </Typography>
                                </div>
                            </div>
                            <div className="flex items-center gap-x-2">
                                <div className="w-[30px] h-[30px] rounded-lg bg-primary flex justify-center items-center">
                                    <GrLocation className="text-white" />
                                </div>
                                <Typography variant="small" color="text-white">
                                    {`${
                                        appointmentWithUserProfile?.addressLine1 ||
                                        'Address Not Provided'
                                    }`}
                                </Typography>
                            </div>
                        </div>

                        {/*  */}

                        <div className="flex items-center gap-x-5 mt-3">
                            <div>
                                <Typography
                                    variant="badge"
                                    normal
                                    color="text-white"
                                    capitalize
                                >
                                    {appointment?.appointmentFor?.role ===
                                    UserRoles.SUBADMIN
                                        ? 'Coordinator'
                                        : appointment?.appointmentFor?.role}
                                </Typography>
                                <Typography normal color="text-white">
                                    {appointment?.appointmentFor?.name}
                                </Typography>
                            </div>
                            <Typography
                                variant="badge"
                                normal
                                color="text-white"
                            >
                                &
                            </Typography>
                            <div>
                                <Typography
                                    variant="badge"
                                    normal
                                    color="text-white"
                                    capitalize
                                >
                                    {appointment?.appointmentBy?.role ===
                                    UserRoles.SUBADMIN
                                        ? 'Coordinator'
                                        : appointment?.appointmentBy?.role}
                                </Typography>
                                <Typography normal color="text-white">
                                    {appointment?.appointmentBy?.name}
                                </Typography>
                            </div>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="flex flex-col gap-y-4 pr-3">
                        <div className="flex flex-col items-center gap-y-2.5">
                            <Image
                                src={'/images/appointments/VideoConference.png'}
                                alt={'Upcoming Appointments'}
                                width={40}
                                height={40}
                            />
                            <Typography
                                variant="badge"
                                color="text-white"
                                normal
                                capitalize
                            >
                                {appointment?.type?.title}
                            </Typography>
                        </div>

                        {/* View Detail */}
                        <div
                            onClick={() => {
                                onAppointmentClicked()
                            }}
                            className="absolute bottom-6 right-8"
                        >
                            <Typography
                                underline
                                variant="xs"
                                bold
                                color="text-[#F67F1E]"
                                cursorPointer
                            >
                                VIEW DETAILS
                            </Typography>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
