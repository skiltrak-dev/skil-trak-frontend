import { Typography } from '@components'
import { UserRoles } from '@constants'
import { ellipsisText, getUserCredentials } from '@utils'
import moment from 'moment'
import Link from 'next/link'
import { TicketStatus } from 'pages/portals/admin/tickets'
import React from 'react'

export const TicketSubject = ({ ticket }: { ticket: any }) => {
    const role = getUserCredentials()?.role

    return (
        <Link
            href={
                role === UserRoles.ADMIN
                    ? `/portals/admin/tickets/detail/${ticket?.id}`
                    : role === UserRoles.SUBADMIN
                    ? `/portals/sub-admin/tickets/detail/${ticket?.id}`
                    : ''
            }
        >
            <div className="flex items-center gap-x-2 mb-1 w-[320px]">
                <div
                    className={`rounded-full ${
                        ticket?.status === TicketStatus.OPEN
                            ? 'bg-success'
                            : ticket?.status === TicketStatus.CLOSED
                            ? 'bg-red-700'
                            : 'bg-success'
                    } uppercase text-[11px] text-white px-1.5 whitespace-pre`}
                >
                    {ticket?.status}
                </div>
                <div className="rounded-full bg-info uppercase text-[11px] text-white px-1.5 whitespace-pre">
                    {ticket?.replies} New Replies
                </div>
            </div>
            <Typography variant={'label'}>
                <span className="font-bold cursor-pointer">
                    [#{String(ticket?.id)?.padStart(5, '0')}]{' '}
                    {ellipsisText(ticket?.subject, 28)}
                </span>
            </Typography>
            <Typography variant={'xs'} capitalize>
                <span className="whitespace-pre">
                    {moment(ticket?.createdAt).fromNow()}
                </span>
            </Typography>
        </Link>
    )
}
