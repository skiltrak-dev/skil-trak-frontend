import { Typography } from '@components'
import moment from 'moment'
import React from 'react'
import { GoClock } from 'react-icons/go'
import { HiOutlineCalendarDays } from 'react-icons/hi2'
import { AvailabelMeetingDate } from './AvailabelMeetingDate'

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
                                <AvailabelMeetingDate date={value} />
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
