import { Typography } from '@components/Typography'
import moment from 'moment'
import Image from 'next/image'

type PastAppointmentProps = {
    name?: string
    post?: string
    imageUrl?: string
    status?: string
    time?: string
    date?: string
    address?: string
    totalMinutes?: string
    appointment: any
}

export const PastAppointmentCard = ({
    name,
    post,
    imageUrl,
    status,
    time,
    date,
    address,
    totalMinutes,
    appointment,
}: PastAppointmentProps) => {
    return (
        <>
            <div className="flex justify-between items-center bg-white border rounded-2xl py-2 px-4 mt-1">
                <div>
                    <div className="">
                        <p className="text-lg font-bold ">
                            {moment(
                                new Date(`01-01-2023 ${appointment.startTime}`)
                            ).format('hh:mm a')}{' '}
                            -{' '}
                            {moment(
                                new Date(`01-01-2023 ${appointment.endTime}`)
                            ).format('hh:mm a')}
                        </p>
                        <p className="font-medium -mt-1 text-gray-500">
                            {moment(new Date(appointment.date)).format(
                                'DD MMM, YYYY'
                            )}
                        </p>
                    </div>
                    
                    <div className="flex items-center gap-x-2">
                        <Typography variant="subtitle" color="text-gray-600">
                            {time}
                        </Typography>
                        <Typography variant="small" color="text-gray-400">
                            {totalMinutes}
                        </Typography>
                    </div>
                    <Typography variant="label" color="text-gray-400">
                        {address}
                    </Typography>
                </div>
                <div>
                    <Typography variant="subtitle" color="text-gray-500">
                        {name}
                    </Typography>
                    <Typography variant="small" color="text-gray-400">
                        {post}
                    </Typography>
                </div>
                <div>
                    <div className="flex flex-col items-center gap-y-2">
                        <div
                            className={`${
                                status === 'Completed'
                                    ? 'bg-[#D3F3C6]'
                                    : 'bg-[#FFD1D6]'
                            } py-1 px-2 rounded-lg`}
                        >
                            <Typography
                                variant="muted"
                                color={
                                    status === 'Completed'
                                        ? 'text-green-500'
                                        : 'text-red-500'
                                }
                            >
                                {status}
                            </Typography>
                        </div>
                        <div>
                            <Image
                                src={imageUrl || ''}
                                alt="Video Conference"
                                width={50}
                                height={50}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
