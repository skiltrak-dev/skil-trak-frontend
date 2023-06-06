import { Typography } from '@components'
import moment from 'moment'
import Link from 'next/link'
import React from 'react'

export const TicketSubject = ({ ticket }: { ticket: any }) => {
    return (
        <Link href={`/portals/admin/tickets/detail/${ticket?.id}`}>
            <div className="flex items-center gap-x-2 mb-1 w-[320px]">
                <div className="rounded-full bg-success uppercase text-[11px] text-white px-1.5 whitespace-pre">
                    OPEN
                </div>
                <div className="rounded-full bg-info uppercase text-[11px] text-white px-1.5 whitespace-pre">
                    2 New Replies
                </div>
            </div>
            <Typography variant={'label'}>
                <span className="font-bold cursor-pointer">
                    [#0123] Subject of Ticket Subject of Ticket
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
