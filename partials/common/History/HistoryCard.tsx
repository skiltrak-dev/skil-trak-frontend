import { Timeline, Typography, UserCreatedAt } from '@components'
import React from 'react'

export const HistoryCard = ({ history }: { history: any }) => {
    return (
        <Timeline key={history?.id} updatedAt={history?.updatedAt}>
            <div className="grid grid-cols-3 items-center bg-white rounded-md px-3 py-1 w-full">
                <Typography>
                    <span className="text-[11px] block">Task</span>
                    {history?.title}
                </Typography>
                <Typography>
                    <span className="text-[11px] block">Description</span>
                    {history?.description}
                </Typography>
                <div className="ml-auto">
                    <span className="text-[11px] block">Date</span>
                    <UserCreatedAt createdAt={history?.createdAt} />
                </div>
            </div>
        </Timeline>
    )
}
