import { InitialAvatar, Typography } from '@components'
import { UserRoles } from '@constants'
import React from 'react'
import { MdEmail, MdPhone } from 'react-icons/md'
import { StatusEnum } from './TicketMessageCard'

export const TicketUser = ({
    ticket,
    small,
    forwarded,
}: {
    ticket: any
    small?: boolean
    forwarded?: any
}) => {
    // const forwardedLen = Object?.keys(forwarded).length
    return (
        <div className="flex items-center gap-x-2">
            <div className="shadow-inner-image rounded-full">
                {forwarded?.action === StatusEnum.FORWARDED &&
                forwarded?.actionOn ? (
                    <InitialAvatar
                        name={forwarded?.actionOn?.name}
                        imageUrl={forwarded?.actionOn?.avatar}
                    />
                ) : (
                    ticket?.name && (
                        <InitialAvatar
                            name={ticket?.name}
                            imageUrl={ticket?.avatar}
                        />
                    )
                )}
            </div>
            <div>
                <Typography variant={'label'}>
                    {forwarded?.action === StatusEnum.FORWARDED &&
                    forwarded?.actionOn
                        ? forwarded?.actionOn?.name
                        : ticket?.role === UserRoles.ADMIN
                        ? 'Admin'
                        : ticket?.name}
                </Typography>
                {!small && (
                    <>
                        {forwarded?.action === StatusEnum.FORWARDED &&
                        forwarded?.actionOn ? (
                            <div className="font-medium text-xs text-gray-500">
                                <p className="flex items-center gap-x-1">
                                    {forwarded?.actionOn?.email && (
                                        <span>
                                            <MdEmail />
                                        </span>
                                    )}
                                    {forwarded?.actionOn?.email}
                                </p>
                            </div>
                        ) : (
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
                        )}
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
