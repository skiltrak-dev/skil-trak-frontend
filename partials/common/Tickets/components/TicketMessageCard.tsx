import { Typography } from '@components'
import React from 'react'
import { TicketUser } from './TicketUser'
import moment from 'moment'
import { ellipsisText, getUserCredentials } from '@utils'
import { ForwardTicket } from '@partials/sub-admin/Tickets'
import { TiArrowForward } from 'react-icons/ti'
import { UserRoles } from '@constants'
import { FaLongArrowAltLeft } from 'react-icons/fa'
import { useRouter } from 'next/router'

export const StatusEnum = {
    FORWARDED: 'forwarded',
    REPLY: 'reply',
    CLOSED: 'closed',
}
export const TicketMessageCard = ({
    message,
    ticketDetail,
}: {
    message: any
    ticketDetail?: any
}) => {
    const id = getUserCredentials()?.id
    const forwarded = message?.action
    const router = useRouter()
    const role = getUserCredentials()?.role
   
    return (
        <>
            
            <div
                className={`${
                    id === message?.author?.id ? 'bg-gray-200' : 'bg-white'
                } border-2 border-dashed border-gray-400 shadow px-4 py-2`}
            >
                {forwarded?.action === StatusEnum.FORWARDED && (
                    <div className="flex justify-end">
                        <span className="text-gray-400 font-medium text-xs">
                            Forwarded by: {forwarded.actionBy?.name}
                        </span>

                        <TiArrowForward className="text-gray-500" />
                    </div>
                )}
                <div className="flex justify-between items-center ">
                    <TicketUser ticket={message.author} forwarded={forwarded} />
                    <div>
                        <Typography variant={'small'} color={'text-gray-500'}>
                            {moment(message?.createdAt).format(
                                'dddd DD MMMM, YYYY - hh:mm a'
                            )}
                        </Typography>
                        {/* {ticketDetail.assignedTo.id === id ||
                        (ticketDetail.createdBy.id === id && (
                            <ForwardTicket ticketDetail={ticketDetail} />
                        ))} */}
                    </div>
                </div>
                <div
                    className="text-sm text-gray-500 mt-1 py-1"
                    dangerouslySetInnerHTML={{
                        __html: message?.message,
                    }}
                />
            </div>
        </>
    )
}
