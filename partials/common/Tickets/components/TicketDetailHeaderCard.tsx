import { Card, Typography } from '@components'
import React from 'react'
import { BsDot } from 'react-icons/bs'
import { TicketUser } from './TicketUser'
import { ellipsisText, getUserCredentials } from '@utils'
import moment from 'moment'
import { TicketStatus } from 'pages/portals/admin/tickets'
import { UserRoles } from '@constants'

export const TicketDetailHeaderCard = ({ ticket }: { ticket: any }) => {
    const role = getUserCredentials()?.role
    return (
        <Card noPadding>
            <div className="flex justify-between px-4 py-2">
                <div>
                    <Typography variant={'subtitle'}>
                        <span className="font-bold cursor-pointer">
                            [#{String(ticket?.id)?.padStart(5, '0')}]{' '}
                            {ellipsisText(ticket?.subject, 28)}
                        </span>
                    </Typography>
                    <div className="flex items-center gap-x-1 mt-1">
                        <div
                            className={`rounded-full text-xs ${
                                ticket?.status === TicketStatus.OPEN
                                    ? 'bg-success'
                                    : ticket?.status === TicketStatus.CLOSED
                                    ? 'bg-red-700'
                                    : 'bg-error'
                            } uppercase text-[11px] text-white px-1.5 whitespace-pre`}
                        >
                            {ticket?.status}
                        </div>
                        <BsDot />
                        <Typography variant={'xs'} color={'text-[#6B7280]'}>
                            Ticket was{' '}
                            {ticket?.status === TicketStatus.OPEN ||
                            ticket?.status === TicketStatus.REOPENED
                                ? 'opened'
                                : 'closed'}{' '}
                            by
                        </Typography>
                        <div className="rounded-full bg-gray-200 uppercase text-black px-2 whitespace-pre text-xs">
                            {ticket?.status === TicketStatus.OPEN
                                ? ticket?.createdBy?.role === UserRoles.ADMIN
                                    ? 'Admin'
                                    : ticket?.createdBy?.name
                                : ticket?.closedBy?.role === UserRoles.ADMIN
                                ? 'Admin'
                                : ticket?.closedBy?.name}
                        </div>
                        <Typography variant={'xs'} color={'text-[#6B7280]'}>
                            On{' '}
                            {moment(
                                ticket?.status === TicketStatus.OPEN
                                    ? ticket?.createdAt
                                    : ticket?.closedAt
                            ).format('dddd, DD MMMM, YYYY [at] hh:mm a')}
                        </Typography>
                    </div>
                </div>
                <div className="flex gap-x-12">
                    <div>
                        <Typography color={'text-gray-400'} variant={'xs'}>
                            Created By:
                        </Typography>
                        <TicketUser small ticket={ticket?.createdBy} />
                    </div>
                    <div>
                        <Typography color={'text-gray-400'} variant={'xs'}>
                            Assigned To:
                        </Typography>
                        <TicketUser small ticket={ticket?.assignedTo} />
                    </div>
                </div>
            </div>
        </Card>
    )
}
