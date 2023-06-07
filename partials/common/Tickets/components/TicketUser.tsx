import { InitialAvatar, Typography } from '@components'
import React from 'react'
import { MdEmail, MdPhone } from 'react-icons/md'

export const TicketUser = ({
    ticket,
    small,
}: {
    ticket: any
    small?: boolean
}) => {
    return (
        <div className="flex items-center gap-x-2">
            <div className="shadow-inner-image rounded-full">
                {ticket?.name && (
                    <InitialAvatar
                        name={ticket?.name}
                        imageUrl={ticket?.avatar}
                    />
                )}
            </div>
            <div>
                <Typography variant={'label'}>{ticket?.name}</Typography>
                {!small && (
                    <>
                        <div className="font-medium text-xs text-gray-500">
                            <p className="flex items-center gap-x-1">
                                <span>
                                    <MdEmail />
                                </span>
                                {ticket?.email}
                            </p>
                        </div>
                        {ticket?.phone && (
                            <div className="font-medium text-xs text-gray-500">
                                <p className="flex items-center gap-x-1">
                                    <span>
                                        <MdPhone />
                                    </span>
                                    {ticket?.phone}
                                </p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}
