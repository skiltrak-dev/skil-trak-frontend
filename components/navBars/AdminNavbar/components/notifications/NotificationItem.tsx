import { Typography } from '@components'
import { ellipsisText, trimString } from '@utils'
import { Bell } from 'lucide-react'
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
    console.log('title', title)
    return (
        <div
            onClick={onClick}
            className="flex items-center bg-white shadow-lg py-2 px-4 hover:bg-secondary cursor-pointer rounded-lg m-2"
        >
            {icon ? (
                <div
                    className={`${
                        !resultIsReadNotification.isSuccess && !isRead
                            ? 'text-blue-400'
                            : 'text-gray-500'
                    } bg-gray-300 h-8 w-8 rounded-md flex items-center justify-center text-xl mr-2`}
                >
                    <Icon />
                </div>
            ) : avatar ? (
                <img
                    className="h-8 w-8 rounded-md flex items-center justify-center mr-2"
                    src={avatar}
                    alt=""
                />
            ) : (
                <div
                    // ${
                    //         !resultIsReadNotification.isSuccess && !isRead
                    //         ? 'text-blue-400'
                    //         : 'text-gray-500'
                    // }
                    className={` h-5 w-5 rounded-md flex items-center justify-center text-xl mr-2`}
                >
                    <Bell className="text-[#374151]" />
                </div>
            )}

            <div className="flex-grow">
                {/* <Typography variant={'subtitle'} color={`${!resultIsReadNotification.isSuccess && !isRead ? "text-blue-400" : 'text-muted'}`}>{title.substring(0, 10)}...</Typography> */}
                <div
                    className={`${
                        !resultIsReadNotification.isSuccess && !isRead
                            ? 'text-black'
                            : 'text-gray-300'
                    } text-xs font-semibold`}
                    dangerouslySetInnerHTML={{
                        __html: title.substring(0, 10),
                    }}
                />

                {/* <Typography variant={'muted'} color={`${!resultIsReadNotification.isSuccess && !isRead ? "text-blue-100" : 'text-muted'}`}>
                    {description.substring(0, 10)}
                </Typography> */}
                <div
                    className={`${
                        !resultIsReadNotification.isSuccess && !isRead
                            ? 'text-black'
                            : 'text-gray-300'
                    } text-[10px]`}
                    dangerouslySetInnerHTML={{
                        __html: ellipsisText(description, 10),
                    }}
                />
            </div>
            <div className="flex flex-col items-end">
                <Typography variant={'small'} color={'text-muted'}>
                    {moment(new Date(timestamp)).format('dddd, MMMM')}
                </Typography>
                {!resultIsReadNotification.isSuccess && !isRead ? (
                    <>
                        <AiOutlineMail className="text-blue-400" />
                    </>
                ) : (
                    <>
                        <HiOutlineMailOpen />
                    </>
                )}
            </div>
        </div>
    )
}
