import { InitialAvatar, Typography } from '@components'
import React from 'react'
import { MdEmail } from 'react-icons/md'

interface TicketTypes {
    avatar: string
    email: string
    id: number
    name: string
}

type TicketUserAssignedToProps = {
    ticket: TicketTypes
}
export const TicketUserAssignedTo = ({ ticket }: TicketUserAssignedToProps) => {
    return (
        <>
            <div className="flex items-center gap-x-1 relative z-10">
                {ticket?.name && (
                    <InitialAvatar
                        name={ticket?.name}
                        imageUrl={ticket?.avatar}
                    />
                )}
                <div>
                    <Typography variant={'label'}>{ticket?.name}</Typography>
                    <div className="font-medium text-xs text-gray-500">
                        <p className="flex items-center gap-x-1">
                            {ticket?.email && (
                                <span>
                                    <MdEmail />
                                </span>
                            )}
                            {ticket?.email}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}
