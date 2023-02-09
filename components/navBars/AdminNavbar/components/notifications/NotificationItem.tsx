import { Typography } from '@components'
import { trimString } from '@utils'
import moment from 'moment'
import { MouseEventHandler } from 'react'
import { AiFillBell, AiOutlineMail } from 'react-icons/ai'
import { HiOutlineMailOpen } from 'react-icons/hi'

interface NotificationItemProps {
    title: string
    description: string
    timestamp: string
    icon?: any
    avatar?: string
    isRead: boolean
    onClick?: MouseEventHandler
    resultIsReadNotification: any
}

export const NotificationItem = ({
    title,
    description,
    timestamp,
    icon,
    avatar,
    isRead,
    onClick,
    resultIsReadNotification,
}: NotificationItemProps) => {
    const Icon = icon
    // console.log("resultIsReadNotification", resultIsReadNotification)
    return (
        <div
            onClick={onClick}
            className="flex items-center border-b py-2 px-4 hover:bg-secondary cursor-pointer"
        >
            {icon ? (
                <div className={`${!resultIsReadNotification.isSuccess && !isRead ? "text-blue-400" : "text-gray-500"} bg-gray-300 h-8 w-8 rounded-md flex items-center justify-center text-2xl mr-2`}>
                    <Icon />
                </div>
            ) : avatar ? (
                <img
                    className="h-8 w-8 rounded-md flex items-center justify-center mr-2"
                    src="https://picsum.photos/128/128"
                    alt=""
                />
            ) : (
                <div className={`${!resultIsReadNotification.isSuccess && !isRead ? "text-blue-400" : "text-gray-500"} bg-gray-300 h-8 w-8 rounded-md flex items-center justify-center text-2xl mr-2`}>
                    <AiFillBell />
                </div>
            )}

            <div className="flex-grow">
                <Typography variant={'subtitle'} color={`${!resultIsReadNotification.isSuccess && !isRead ? "text-blue-400" : 'text-muted'}`}>{title.substring(0, 10)}...</Typography>
                <Typography variant={'muted'} color={`${!resultIsReadNotification.isSuccess && !isRead ? "text-blue-100" : 'text-muted'}`}>
                    {description.substring(0, 10)}
                </Typography>
            </div>
            <div className="flex flex-col items-end">
                <Typography variant={'small'} color={'text-muted'}>
                    {moment(new Date(timestamp)).format(
                        'dddd, MMMM'
                    )}
                </Typography>
                {!resultIsReadNotification.isSuccess && !isRead ? (<><AiOutlineMail className='text-blue-400' /></>) : (<><HiOutlineMailOpen /></>)}
            </div>
        </div>
    )
}
