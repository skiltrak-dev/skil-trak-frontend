import { Typography } from '@components'
import React from 'react'
import { FreeShifts } from '../components'

export const FreeHoursCard = ({
    workingHoursTime,
}: {
    workingHoursTime: any
}) => {
    return (
        <div className="bg-[#384151] p-3.5 rounded-[10px]">
            <div className="flex justify-between items-center">
                <Typography capitalize color={'text-white'}>
                    placements shifts{' '}
                </Typography>
            </div>

            {/*  */}
            <div className="pt-3">
                <div className="h-40 overflow-auto custom-scrollbar bg-[#FFFFFFCC] rounded border border-white grid grid-cols-7">
                    {workingHoursTime?.map((timing: any) => (
                        <div>
                            <div className="py-2.5 flex justify-center border-r border-b border-white">
                                <Typography variant="small" capitalize>
                                    {timing?.day?.substring(0, 3)}
                                </Typography>
                            </div>
                            <div
                                key={timing?.day}
                                className="w-full flex justify-center items-center"
                            >
                                <FreeShifts timing={timing} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
