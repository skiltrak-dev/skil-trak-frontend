import { Typography } from '@components'
import moment from 'moment'
import React from 'react'

export const FreeShiftCard = ({
    shift,
    timing,
}: {
    shift?: any
    timing: any
}) => {
    return (
        <div
            className={`${
                shift
                    ? 'border-[#337E8980] bg-[#337e8910]'
                    : 'border-[#BF000080] bg-[#BF00001A]'
            } border rounded h-full w-full `}
        >
            {shift ? (
                <div className="flex flex-col justify-center items-center h-full border-b border-secondary-dark">
                    <Typography
                        bold
                        center
                        color="text-[#128C7E]"
                        variant={'xxs'}
                    >
                        {moment(shift?.openingTime, 'hh:mm').format('hh:mm a')}
                    </Typography>
                    <Typography
                        bold
                        center
                        color="text-[#128C7E]"
                        variant={'xxs'}
                    >
                        /
                    </Typography>
                    <Typography
                        bold
                        center
                        color="text-[#128C7E]"
                        variant={'xxs'}
                    >
                        {moment(shift?.closingTime, 'hh:mm').format('hh:mm a')}
                    </Typography>
                </div>
            ) : (
                <div className="flex flex-col h-full justify-center items-center">
                    <Typography center variant="badge" color="text-[#7A7C7E]">
                        Not Available
                    </Typography>
                </div>
            )}
        </div>
    )
}
