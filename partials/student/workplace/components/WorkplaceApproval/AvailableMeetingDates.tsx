import { Typography } from '@components'
import moment from 'moment'
import React from 'react'
import { GoClock } from 'react-icons/go'
import { HiOutlineCalendarDays } from 'react-icons/hi2'

export const AvailableMeetingDates = ({ dates }: { dates: any }) => {
    return (
        <div className="h-full">
            <div>
                <Typography variant="label">Meeting Appointments</Typography>
            </div>
            <div className="h-[calc(100%-25px)] w-full border border-[#D5D5D5] rounded px-3 py-2 flex flex-col gap-y-2 gap-x-5">
                {dates &&
                Object.keys(dates)?.length > 0 &&
                Object.values(dates)?.some((date) => date) ? (
                    Object.values(dates)?.map((value: any, i: number) =>
                        value ? (
                            <div className="w-full">
                                <Typography variant="small">
                                    Option {i + 1}
                                </Typography>
                                <div className="flex flex-col gap-y-1 bg-primaryNew-dark rounded px-2 py-1.5 w-full">
                                    <div className="flex items-center gap-x-3">
                                        <div className="bg-primary rounded-sm p-0.5">
                                            <HiOutlineCalendarDays className="text-white" />
                                        </div>
                                        <Typography
                                            variant="small"
                                            color="text-white"
                                        >
                                            {moment(value).format(
                                                'ddd, MMM DD, YYYY'
                                            )}
                                        </Typography>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <div className="bg-primary rounded-sm p-0.5">
                                            <GoClock className="text-white" />
                                        </div>
                                        <Typography
                                            variant="small"
                                            color="text-white"
                                        >
                                            {moment(value).format('h:mm a')}
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
                            </div>
                        ) : null
                    )
                ) : (
                    <div className="flex justify-center mx-auto">
                        <Typography variant={'small'} center>
                            Appointment dates discuss with the coordinator!
                        </Typography>
                    </div>
                )}
            </div>
        </div>
    )
}
