import { Typography } from '@components'
import React from 'react'
import { TicketUser } from './TicketUser'
import moment from 'moment'
import { getUserCredentials } from '@utils'

export const TicketMessageCard = ({ message }: { message: any }) => {
    const id = getUserCredentials()?.id
    return (
        <div
            className={`${
                id === message?.author?.id ? 'bg-gray-200' : 'bg-white'
            } border-2 border-dashed border-gray-400 shadow px-4 py-2`}
        >
            <div className="flex justify-between items-center ">
                <TicketUser ticket={message?.author} />
                <Typography variant={'small'} color={'text-gray-500'}>
                    {moment(message?.createdAt).format(
                        'dddd DD MMMM, YYYY - hh:mm a'
                    )}
                </Typography>
            </div>
            <div
                className="text-sm text-gray-500 mt-1 py-1"
                dangerouslySetInnerHTML={{
                    __html: message?.message,
                }}
            />
        </div>
    )
}
