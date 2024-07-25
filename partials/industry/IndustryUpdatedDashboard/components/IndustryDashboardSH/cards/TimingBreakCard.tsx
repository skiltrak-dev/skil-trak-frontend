import { Typography } from '@components'
import moment from 'moment'
import React from 'react'

export const TimingBreakCard = ({ timing }: { timing: any }) => {
    return (
        <div className={`border-r border-white h-full w-full `}>
            {timing?.dayOn ? (
                <>
                    <div className="flex flex-col justify-center items-center h-full">
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
