import { Typography } from '@components'
import moment from 'moment'
import React from 'react'

export const AvailableMeetingDates = ({ dates }: { dates: any }) => {
    return (
        <div>
            <div>
                <Typography variant="label">
                    Available Meeting Appointments
                </Typography>
            </div>
            <div className="border border-[#D5D5D5] rounded p-3 flex items-center gap-x-5">
                {dates &&
                Object.keys(dates)?.length > 0 &&
                Object.values(dates)?.some((date) => date) ? (
                    Object.values(dates)?.map((value: any, i: number) =>
                        value ? (
                            <div>
                                <Typography variant="small">
                                    Date {i + 1}
                                </Typography>
                                <div className="bg-success rounded px-1 py-0.5 w-fit">
                                    <Typography
                                        variant="small"
                                        semibold
                                        color="text-white"
                                    >
                                        {moment(value).format(
                                            'DD MMM, YYYY [at] h:mm'
                                        )}
                                    </Typography>
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
