import { Card, Typography } from '@components'
import React from 'react'
import { BsDot } from 'react-icons/bs'
import { TicketUser } from './TicketUser'

export const TicketDetailHeaderCard = () => {
    return (
        <Card>
            <div className="flex justify-between">
                <div>
                    <Typography variant={'h3'}>
                        <span className="font-bold cursor-pointer">
                            [#0123] Subject of Ticket
                        </span>
                    </Typography>
                    <div className="flex items-center gap-x-1 mt-1">
                        <div className="rounded-full bg-success uppercase text-[11px] text-white px-1.5 whitespace-pre">
                            OPEN
                        </div>
                        <BsDot />
                        <Typography variant={'label'} color={'text-[#6B7280]'}>
                            Ticket was opened by
                        </Typography>
                        <div className="rounded-full bg-secondary uppercase text-sm text-black px-1.5 whitespace-pre">
                            Admin
                        </div>
                        <Typography variant={'label'} color={'text-[#6B7280]'}>
                            On Monday, 5 June, 2023 at 11:00 am
                        </Typography>
                    </div>
                </div>
                <div className="flex gap-x-12">
                    <div>
                        <Typography color={'text-gray-400'} variant={'xs'}>
                            Created By:
                        </Typography>
                        <TicketUser small ticket={{ user: { name: 'Saad' } }} />
                    </div>
                    <div>
                        <Typography color={'text-gray-400'} variant={'xs'}>
                            Created By:
                        </Typography>
                        <TicketUser small ticket={{ user: { name: 'Saad' } }} />
                    </div>
                </div>
            </div>
        </Card>
    )
}
