import { InitialAvatar, Typography } from '@components'
import Image from 'next/image'
import { MouseEventHandler } from 'react'
import { AiOutlineMail } from 'react-icons/ai'
type AllMailsProps = {

    title: string
    description: string
    timestamp: string
    icon?: any
    avatar?: string
    onClick?: MouseEventHandler
}

export const UnReadMails = ({
    title,
    description,
    timestamp,
    icon,
    avatar,
    onClick,
}: AllMailsProps) => {

    return (
        <div
            onClick={onClick}
            className="flex items-center border-b py-2 px-4 hover:bg-secondary cursor-pointer border-r"
        >
            <div>
                {icon ? (
                    <Image
                        className="rounded-full w-7 h-7"
                        src={"https://picsum.photos/128/128"}
                        alt={''}
                        width={50}
                        height={50}
                    />
                ) : (
                    <InitialAvatar name={"Sub Admin"} />
                )}
            </div>

            <div className="flex-grow">
                <Typography variant={'subtitle'}>{title}</Typography>
                <Typography variant={'muted'} color={'text-muted'}>
                    {description}
                </Typography>
            </div>
            <div className="flex flex-col items-end">
                <Typography variant={'small'} color={'text-muted'}>
                    {timestamp}
                </Typography>
                <AiOutlineMail />
            </div>
        </div>
    )
}
