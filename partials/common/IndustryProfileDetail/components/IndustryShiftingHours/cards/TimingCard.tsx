import { Typography } from '@components'
import React from 'react'

export const TimingCard = ({ timing }: { timing: any }) => {
    return (
        <div className="border border-[#337E8980] rounded h-full w-full bg-[#337e8910]">
            <div className="flex flex-col justify-center items-center h-1/2 border-b border-secondary-dark">
                <Typography bold center color="text-[#128C7E]" variant={'xxs'}>
                    8:00 AM
                </Typography>
                <Typography bold center color="text-[#128C7E]" variant={'xxs'}>
                    /
                </Typography>
                <Typography bold center color="text-[#128C7E]" variant={'xxs'}>
                    1:00 PM{' '}
                </Typography>
            </div>
            <div className="flex flex-col justify-center items-center h-1/2">
                <Typography center color="text-[#7A7C7E]" variant={'xxs'}>
                    Break
                </Typography>
                <Typography center color="text-[#7A7C7E]" variant={'xxs'}>
                    8:00 AM
                </Typography>
                <Typography center color="text-[#7A7C7E]" variant={'xxs'}>
                    /
                </Typography>
                <Typography center color="text-[#7A7C7E]" variant={'xxs'}>
                    1:00 PM{' '}
                </Typography>
            </div>
        </div>
    )
}
