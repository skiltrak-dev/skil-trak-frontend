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

export const MailListCard = ({
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
                    name={message?.name}
                    imageUrl={message?.avatar}
                />
            </div>

            <div className="flex-grow pl-2 ">
                <Typography variant={'subtitle'}>{message?.name}</Typography>
                <Typography variant={'muted'} color={'text-muted'}>
                    {message?.email}
                </Typography>
            </div>
            <div className="flex flex-col items-end">
                <Typography variant={'small'} color={'text-muted'}>
                    {moment(new Date(message?.createdAt)).format('LL')}
                </Typography>
                {/* {!resultSeenMessage.isSuccess ? (
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
