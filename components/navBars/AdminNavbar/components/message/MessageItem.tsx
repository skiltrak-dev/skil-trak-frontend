import { Typography } from '@components'
import moment from 'moment'
import { MouseEventHandler } from 'react'
import { AiFillBell, AiOutlineMail } from 'react-icons/ai'
import { HiOutlineMailOpen } from 'react-icons/hi'

interface MessageItemProps {
    title: string
    description: string
    timestamp: string
    icon?: any
    avatar?: string
    onClick?: MouseEventHandler
    isSeen: boolean
    resultSeenMessage: any
}

export const MessageItem = ({
    title,
    description,
    timestamp,
    icon,
    avatar,
    onClick,
    isSeen,

    resultSeenMessage,

}: MessageItemProps) => {
    const Icon = icon

    return (
        <div
            onClick={onClick}
            className="flex items-center border-b py-2 px-4 hover:bg-secondary cursor-pointer"
        >
            {icon ? (
                <div className={`${!resultSeenMessage.isSuccess && !isSeen ? "text-blue-400" : "text-gray-500"}  bg-gray-300 h-8 w-8 rounded-md flex items-center justify-center text-2xl mr-2`}>
                    <Icon />
                </div>
            ) : avatar ? (
                <img
                    className="h-8 w-8 rounded-md flex items-center justify-center mr-2"
                    src="https://picsum.photos/128/128"
                    alt=""
                />
            ) : (
                <div className={`${!resultSeenMessage.isSuccess && !isSeen ? "text-blue-400 bg-blue-200" : "text-gray-500 bg-gray-300"} h-8 w-8 rounded-md flex items-center justify-center text-2xl mr-2`}>
                    <AiFillBell />
                </div>
            )}

            <div className="flex-grow">
                <Typography variant={'subtitle'} color={`${!resultSeenMessage.isSuccess && !isSeen ? "text-blue-400" : 'text-muted'}`} >{title.substring(0, 10)}...</Typography>
                <Typography variant={'muted'} color={'text-muted'}>
                    {description.substring(0, 10)}...
                </Typography>
            </div>
            <div className="flex flex-col items-end">
                <Typography variant={'small'} color={'text-muted'}>
                    {moment(new Date(timestamp)).format(
                        'dddd, MMMM'
                    )}
                </Typography>
                {!resultSeenMessage.isSuccess && !isSeen ? (<><AiOutlineMail className='text-blue-400' /></>) : (<><HiOutlineMailOpen /></>)}
            </div>
        </div>
    )
}
