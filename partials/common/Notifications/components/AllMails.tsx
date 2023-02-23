import { InitialAvatar, Typography } from '@components'
import moment from 'moment'
import Image from 'next/image'
import { MouseEventHandler } from 'react'
import { AiOutlineMail } from 'react-icons/ai'
import { HiOutlineMailOpen } from 'react-icons/hi'
type AllMailsProps = {
  title: string
  description: string
  timestamp: string
  icon?: any
  avatar?: string
  onClick?: MouseEventHandler
  id: any
  selectedMessageId: any
  resultSeenMessage: any
  seenMessage: any
}

export const AllMails = ({
  title,
  description,
  timestamp,
  icon,
  avatar,
  onClick,
  id,
  selectedMessageId,
  resultSeenMessage,
  seenMessage,
}: AllMailsProps) => {
  return (
    <div
      onClick={onClick}
      className={`${selectedMessageId === id && 'bg-blue-100'
        } flex items-center border-b py-2 px-4 cursor-pointer`}
    >
      <div>
        {icon ? (
          <Image
            className="rounded-full w-7 h-7"
            src={'https://picsum.photos/128/128'}
            alt={''}
            width={50}
            height={50}
          />
        ) : (
          <InitialAvatar name={title} />
        )}
      </div>

      <div className="flex-grow pl-2 ">
        <Typography variant={'subtitle'}>{title}</Typography>
        <Typography variant={'muted'} color={'text-muted'}>
          {description}
        </Typography>
      </div>
      <div className="flex flex-col items-end">
        <Typography variant={'small'} color={'text-muted'}>
          {moment(new Date(timestamp)).format(
            'LL'
          )}
        </Typography>
        {!resultSeenMessage.isSuccess ? (
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
