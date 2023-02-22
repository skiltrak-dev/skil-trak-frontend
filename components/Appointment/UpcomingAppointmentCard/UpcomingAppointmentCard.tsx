import { Button, Typography } from '@components'
import { User } from '@types'
import { getUserCredentials } from '@utils'
import moment from 'moment'
import Image from 'next/image'

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
}

export const UpcomingAppointmentCard = ({
    date,
    time,
    totalMinutes,
    address,
    name,
    imageUrl,
    type,
    role,
    appointment,
    coordinator,
}: AppointmentCardProps) => {
    const id = getUserCredentials()?.id
    const appointmentWith =
        appointment?.appointmentBy?.id === id
            ? 'appointmentFor'
            : 'appointmentBy'

    const appointmentUser = appointment[appointmentWith]

    const appointmentWithUser =
        appointmentUser[
            appointmentUser['role'] === 'subadmin'
                ? 'coordinator'
                : appointmentUser['role']
        ]

    const checkrole =
        appointmentUser['role'] === 'subadmin'
            ? appointmentWithUser[0]
            : appointmentWithUser

    return (
        <>
            <div className="w-full bg-gradient-to-r from-[#3883F3] to-[#5D1BE0] rounded-2xl p-4">
                <div className="flex justify-between gap-x-4">
                    <div className="">
                        <Typography variant={'label'} color={'text-[#BCDEFF]'}>
                            {moment(appointment?.date).format(
                                'dddd, Do MMMM, YYYY'
                            )}
                        </Typography>
                        <div className="flex gap-x-2 items-center">
                            <Typography variant={'body'} color={'text-white'}>
                                {moment(
                                    appointment?.startTime,
                                    'hh:mm:ss'
                                ).format('hh:mm a')}{' '}
                                -{' '}
                                {moment(
                                    appointment?.endTime,
                                    'hh:mm:ss'
                                ).format('hh:mm a')}
                            </Typography>
                            <Typography
                                variant={'muted'}
                                color={'text-[#BCDEFF]'}
                            >
                                {totalMinutes} Minutes
                            </Typography>
                        </div>
                        <Typography variant={'label'} color={'text-[#BCDEFF]'}>
                            {checkrole?.addressLine1},{' '}
                            {checkrole?.addressLine2 || ''}
                        </Typography>
                    </div>
                    <div>
                        <Button text="Upcoming" variant="action" />
                    </div>
                </div>
                <div className="w-full flex justify-between items-center mt-8">
                    <div>
                        {coordinator ? (
                            <div>
                                <Typography
                                    variant={'muted'}
                                    color={'text-white'}
                                >
                                    Between
                                </Typography>
                                <div className="flex items-center flex-wrap gap-x-1">
                                    <h1 className="font-medium text-[16px] text-white whitespace-pre">
                                        {appointment?.appointmentFor?.name} (
                                        {appointment?.appointmentFor?.role})
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
                                {appointmentUser?.name} ({appointmentUser?.role}
                                )
                            </h1>
                        )}
                        <p className="text-[#BCDEFF]">{type}</p>
                    </div>
                    <div>
                        <Image
                            src={imageUrl || ''}
                            width={50}
                            height={50}
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </>
    )
}
