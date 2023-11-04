import { InitialAvatar, Typography } from '@components'
import { UserRoles } from '@constants'
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
                <Typography variant={'label'}>
                    {ticket?.role === UserRoles.ADMIN ? 'Admin' : ticket?.name}
                </Typography>
                {!small && (
                    <>
                        <div className="font-medium text-xs text-gray-500">
                            <p className="flex items-center gap-x-1">
                                {ticket?.email && (
                                    <span>
                                        <MdEmail />
                                    </span>
                                )}
                                {ticket?.email || 'N/A'}
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
