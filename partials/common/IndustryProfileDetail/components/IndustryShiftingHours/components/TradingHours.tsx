import { Typography } from '@components'
import React from 'react'
import { TimingCard } from '../cards'

export const TradingHours = () => {
    const officeTimings = [
        {
            timings: '12:00 PM - 1:00 PM',
            days: 'Mon',
            break: 'Break (9 am - 5 pm)',
        },
        {
            timings: '12:00 PM - 1:00 PM',
            days: 'Tue',
            break: 'Break (9 am - 5 pm)',
        },
        {
            timings: '12:00 PM - 1:00 PM',
            days: 'Wed',
            break: 'Break (9 am - 5 pm)',
        },
        {
            timings: '12:00 PM - 1:00 PM',
            days: 'Thu',
            break: 'Break (9 am - 5 pm)',
        },
        {
            timings: '12:00 PM - 1:00 PM',
            days: 'Fri',
            break: 'Break (9 am - 5 pm)',
        },
        {
            timings: 'Close',
            days: 'Sat',
            break: 'Not Applicable',
        },
        {
            timings: 'Close',
            days: 'Sun',
            break: 'Not Applicable',
        },
    ]
    return (
        <div>
            {' '}
            <div className="px-4 py-3.5 border-b border-secondary-dark">
                <Typography semibold>
                    <span className="text-[15px]">Trading Hours</span>
                </Typography>
            </div>
            {/*  */}
            <div className="flex justify-between border-b border-secondary-dark">
                {officeTimings?.map((timing) => (
                    <div className="w-full h-10 border-r border-secondary-dark flex justify-center items-center">
                        <Typography variant="small">{timing?.days}</Typography>
                    </div>
                ))}
            </div>
            {/*  */}
            <div className="flex justify-between border-b border-secondary-dark py-2.5">
                {officeTimings?.map((timing) => (
                    <div className="w-full h-32 flex justify-center items-center px-1">
                        <TimingCard timing={timing} />
                    </div>
                ))}
            </div>
        </div>
    )
}
