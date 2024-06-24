import { InitialAvatar, Typography } from '@components'
import moment from 'moment'
import Image from 'next/image'
import { MouseEventHandler } from 'react'
import { AiOutlineMail } from 'react-icons/ai'
import { HiOutlineMailOpen } from 'react-icons/hi'
type AllMailsProps = {
    message: any
    icon?: any
    onClick?: MouseEventHandler
    selectedMessageId?: any
}

export const AllMailsListCard = ({
    message,
    icon,
    onClick,
    selectedMessageId,
}: AllMailsProps) => {
    return (
        <div
            onClick={onClick}
            className={`${
                selectedMessageId === message?.id && 'bg-blue-100'
            } flex items-center border-b py-2 px-4 cursor-pointer`}
        >
            <div>
                <InitialAvatar
                    name={message?.sender?.name || ''}
                    imageUrl={message?.sender?.avatar || ''}
                />
            </div>

            <div className="flex-grow pl-2">
                <Typography variant={'subtitle'}>
                    {' '}
                    {/* <span
                        dangerouslySetInnerHTML={{
                            __html: message?.message,
                        }}
                    />{' '} */}
                    {message?.message.substring(0, 15)}
                </Typography>
                <Typography
                    variant={'muted'}
                    color={`${
                        !message?.isSeen ? 'text-blue-400' : 'text-muted'
                    }`}
                >
                    {message?.sender?.name}
                </Typography>
            </div>
            <div className="flex flex-col items-end">
                <Typography
                    variant={'small'}
                    color={`${
                        !message?.isSeen ? 'text-blue-400' : 'text-muted'
                    }`}
                >
                    {moment(new Date(message?.createdAt)).format('LL')}
                </Typography>
                {/* {!message?.isSeen ? (
                    <>
                        <AiOutlineMail className="text-blue-400" />
                    </>
                ) : (
                    <>
                        <HiOutlineMailOpen />
                    </>
                )} */}
            </div>
        </div>
    )
}
