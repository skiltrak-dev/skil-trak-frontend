import { Button, Typography } from '@components'
import Image from 'next/image'

type AppointmentCardProps = {
    date?: string
    time?: string
    totalMinutes?: string
    address?: string
    name?: string
    imageUrl?: string // imageUrl
    post?: string // REactElement ReactNode
}

export const UpcomingAppointmentCard = ({
    date,
    time,
    totalMinutes,
    address,
    name,
    imageUrl,
    post,
}: AppointmentCardProps) => {
    return (
        <>
            <div className="w-full bg-gradient-to-r from-[#3883F3] to-[#5D1BE0] rounded-2xl p-4">
                <div className="flex justify-between gap-x-4">
                    <div className="">
                        <Typography variant={'label'} color={'text-[#BCDEFF]'}>
                            {date}
                        </Typography>
                        <div className="flex gap-x-2 items-center">
                            <Typography variant={'body'} color={'text-white'}>
                                {time}
                            </Typography>
                            <Typography
                                variant={'muted'}
                                color={'text-[#BCDEFF]'}
                            >
                                {totalMinutes}
                            </Typography>
                        </div>
                        <Typography variant={'label'} color={'text-[#BCDEFF]'}>
                            {address}
                        </Typography>
                    </div>
                    <div>
                        <Button text="Upcoming" variant="action" />
                    </div>
                </div>
                <div className="w-full flex justify-between items-center mt-8">
                    <div>
                        <h1 className="font-medium text-[16px] text-white">
                            {name}
                        </h1>
                        <p className="text-[#BCDEFF]">{post}</p>
                    </div>
                    <div>
                        <Image src={imageUrl || ''} width={50} height={50} />
                    </div>
                </div>
            </div>
        </>
    )
}
