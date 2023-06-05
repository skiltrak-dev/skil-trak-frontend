import { InitialAvatar } from '@components'
import React from 'react'
import { MdEmail, MdPhone } from 'react-icons/md'

export const TicketUser = ({ ticket }: { ticket: any }) => {
    return (
        <div className="flex items-center gap-x-2">
            <div className="shadow-inner-image rounded-full">
                {ticket?.user?.name && (
                    <InitialAvatar
                        name={ticket?.user?.name}
                        imageUrl={ticket?.user?.avatar}
                    />
                )}
            </div>
            <div>
                <p className="font-semibold">{ticket?.user?.name}</p>
                <div className="font-medium text-xs text-gray-500">
                    <p className="flex items-center gap-x-1">
                        <span>
                            <MdEmail />
                        </span>
                        {ticket?.user?.email}
                    </p>
                </div>
                <div className="font-medium text-xs text-gray-500">
                    <p className="flex items-center gap-x-1">
                        <span>
                            <MdPhone />
                        </span>
                        {ticket?.phone}
                    </p>
                </div>
            </div>
        </div>
    )
}
