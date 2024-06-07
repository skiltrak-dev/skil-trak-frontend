import { Typography } from '@components'
import moment from 'moment'
import React from 'react'

export const TimingCard = ({ timing }: { timing: any }) => {
    return (
        <div
            className={`${
                timing?.dayOn
                    ? 'border-[#337E8980] bg-[#337e8910]'
                    : 'border-[#BF000080] bg-[#BF00001A]'
            } border rounded h-full w-full `}
        >
            {timing?.dayOn ? (
                <>
                    <div className="flex flex-col justify-center items-center h-1/2 border-b border-secondary-dark">
                        <Typography
                            bold
                            center
                            color="text-[#128C7E]"
                            variant={'xxs'}
                        >
                            {moment(timing?.openingTime, 'h:mm').format(
                                'hh:mm a'
                            )}
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
                            {moment(timing?.closingTime, 'h:mm').format(
                                'hh:mm a'
                            )}
                        </Typography>
                    </div>
                    <div className="flex flex-col justify-center items-center h-1/2">
                        <Typography
                            center
                            color="text-[#7A7C7E]"
                            variant={'xxs'}
                        >
                            Break
                        </Typography>
                        <Typography
                            center
                            color="text-[#7A7C7E]"
                            variant={'xxs'}
                        >
                            {timing?.breakStart
                                ? moment(timing?.breakStart, 'hh:mm').format(
                                      'hh:mm a'
                                  )
                                : '--'}
                        </Typography>
                        <Typography
                            center
                            color="text-[#7A7C7E]"
                            variant={'xxs'}
                        >
                            /
                        </Typography>
                        <Typography
                            center
                            color="text-[#7A7C7E]"
                            variant={'xxs'}
                        >
                            {timing?.breakEnd
                                ? moment(timing?.breakEnd, 'hh:mm').format(
                                      'hh:mm a'
                                  )
                                : '--'}
                        </Typography>
                    </div>
                </>
            ) : (
                <div className="flex flex-col h-full justify-center items-center">
                    <Typography bold center variant="xs" color="text-[#BF0000]">
                        Closed
                    </Typography>
                    <Typography center variant="xxs" color="text-[#7A7C7E]">
                        Not Applicable
                    </Typography>
                </div>
            )}
        </div>
    )
}
