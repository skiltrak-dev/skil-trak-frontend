import { InitialAvatar, Typography } from '@components'
import { UserRoles } from '@constants'
import React from 'react'
import { MdEmail, MdPhone } from 'react-icons/md'
import { StatusEnum } from './TicketMessageCard'
import { TicketCreator } from '../enum'
import { OptionType } from '@types'

export const TicketUser = ({
    ticket,
    small,
    forwarded,
}: {
    ticket: any
    small?: boolean
    forwarded?: any
}) => {
    const uniqueIds: OptionType[] = [
        {
            label: 'YASEEN KHAN',
            value: TicketCreator.YASEEN_KHAN,
            item: { color: 'bg-blue-200' },
        },
        {
            label: 'JULIE CLARKE',
            value: TicketCreator.JULIE_CLARKE,
            item: { color: 'bg-gray-300' },
        },
        {
            label: 'QANDEEL TANOLI',
            value: TicketCreator.QANDEEL_TANOLI,
            item: { color: 'bg-green-300' },
        },
    ]
    const uniqueId = uniqueIds?.find((data) => data?.value === ticket?.uniqueId)
    return (
        <>
            {ticket?.isInternal && (
                <div
                    className={`${uniqueId?.item?.color} w-fit px-1 py-0.5 rounded`}
                >
                    <Typography variant={'xxs'}>{ticket?.uniqueId}</Typography>
                </div>
            )}
            <div className="flex items-center gap-x-2">
                <div className="shadow-inner-image rounded-full">
                    {forwarded?.action === StatusEnum.FORWARDED &&
                    forwarded?.actionOn ? (
                        <InitialAvatar
                            name={forwarded?.actionOn?.name}
                            imageUrl={forwarded?.actionOn?.avatar}
                        />
                    ) : (
                        ticket?.createdBy?.name && (
                            <InitialAvatar
                                name={ticket?.createdBy?.name}
                                imageUrl={ticket?.createdBy?.avatar}
                            />
                        )
                    )}
                </div>
                <div>
                    <Typography variant={'label'}>
                        {forwarded?.action === StatusEnum.FORWARDED &&
                        forwarded?.actionOn
                            ? forwarded?.actionOn?.name
                            : ticket?.createdBy?.role === UserRoles.ADMIN
                            ? 'Admin'
                            : ticket?.createdBy?.name}
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
                                        {ticket?.createdBy?.email && (
                                            <span>
                                                <MdEmail />
                                            </span>
                                        )}
                                        {ticket?.createdBy?.email}
                                    </p>
                                </div>
                            )}
                            {ticket?.createdBy?.phone && (
                                <div className="font-medium text-xs text-gray-500">
                                    <p className="flex items-center gap-x-1">
                                        <span>
                                            <MdPhone />
                                        </span>
                                        {ticket?.createdBy?.phone}
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
