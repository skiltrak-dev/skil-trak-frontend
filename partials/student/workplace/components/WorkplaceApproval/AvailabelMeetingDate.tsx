import { Typography } from '@components'
import moment from 'moment'
import React from 'react'
import { GoClock } from 'react-icons/go'
import { HiOutlineCalendarDays } from 'react-icons/hi2'

export const AvailabelMeetingDate = ({ date }: { date: string }) => {
    return (
        <div className="flex flex-col gap-y-1 bg-primaryNew-dark rounded px-2 py-1.5 w-full">
            <div className="flex items-center gap-x-3">
                <div className="bg-primary rounded-sm p-0.5">
                    <HiOutlineCalendarDays className="text-white" />
                </div>
                <Typography variant="small" color="text-white">
                    {moment(date).format('ddd, MMM DD, YYYY')}
                </Typography>
            </div>
            <div className="flex items-center gap-x-3">
                <div className="bg-primary rounded-sm p-0.5">
                    <GoClock className="text-white" />
                </div>
                <Typography variant="small" color="text-white">
                    {moment(date).format('h:mm a')}
                </Typography>
            </div>

            {/* <Typography
        variant="small"
        semibold
        color="text-white"
    >
        {moment(value).format(
            'DD MMM, YYYY [at] h:mm'
        )}
    </Typography> */}
        </div>
    )
}
