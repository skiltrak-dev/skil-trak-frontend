import { Typography } from '@components'
import React from 'react'

export const TicketSubject = ({ ticket }: { ticket: any }) => {
    return (
        <div>
            <div className="flex items-center gap-x-2 mb-1">
                <div className="rounded-full bg-success uppercase text-[11px] text-white px-1.5 whitespace-pre">
                    OPEN
                </div>
                <div className="rounded-full bg-info uppercase text-[11px] text-white px-1.5 whitespace-pre">
                    2 New Replies
                </div>
            </div>
            <Typography variant={'label'}>
                <span className="font-bold">[#0123] Subject of Ticket</span>
            </Typography>
        </div>
    )
}
