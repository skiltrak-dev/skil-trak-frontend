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
                <div
                    className={`${!resultSeenMessage.isSuccess && !isSeen
                            ? 'text-blue-400'
                            : 'text-gray-500'
                        }  bg-gray-300 h-8 w-8 rounded-md flex items-center justify-center text-2xl mr-2`}
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
                    className={`${!resultSeenMessage.isSuccess && !isSeen
                            ? 'text-blue-400 bg-blue-200'
                            : 'text-gray-500 bg-gray-300'
                        } h-8 w-8 rounded-md flex items-center justify-center text-2xl mr-2`}
                >
                    <AiFillBell />
                </div>
            )}

            <div className="flex-grow">
                <div
                    className={`text-gray-400 text-xs`}
                    dangerouslySetInnerHTML={{
                        __html: title.substring(0, 10),
                    }}
                />
                <div
                    className={`text-gray-400 text-xs`}
                    dangerouslySetInnerHTML={{
                        __html: description.substring(0, 80),
                    }}
                />

            </div>
            <div className="flex flex-col items-end">
                <p className="text-[11px] text-gray-400">
                    {moment(new Date(timestamp)).format('ddd, MMM')}
                </p>
                {!resultSeenMessage.isSuccess && !isSeen ? (
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
