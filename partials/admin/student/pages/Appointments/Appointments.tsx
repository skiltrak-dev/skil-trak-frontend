import { Card, Typography, LoadingAnimation } from '@components'
import React from 'react'
import { AiFillClockCircle } from 'react-icons/ai'
import { BiCalendar } from 'react-icons/bi'
import { FaCalendarAlt } from 'react-icons/fa'
import { IoLocationSharp } from 'react-icons/io5'

// query
import { AdminApi, useGetStudentUpcomingAppointmentsQuery } from '@queries'

export const Appointments = ({ userId }: any) => {
    const { data, isLoading, isFetching } =
        useGetStudentUpcomingAppointmentsQuery(userId, {
            skip: !userId,
        })
    return isLoading || isFetching ? (
        <LoadingAnimation />
    ) : (
        <Card>
            {data && data.length > 0 ? (
                <>
                    <div className="flex justify-between items-center mb-0.5">
                        <div className="flex items-center gap-x-2">
                            <BiCalendar className="text-info-dark" />
                            <Typography
                                variant={'body'}
                                color={'text-info-dark'}
                            >
                                Appointment
                            </Typography>
                        </div>
                        <Typography variant={'xs'} color={'text-success'}>
                            View All
                        </Typography>
                    </div>

                    {/*  */}
                    <div className="flex justify-between items-center mt-4">
                        <div>
                            <Typography variant={'body'} color={'text-black'}>
                                Workplace Visit
                            </Typography>
                            <Typography
                                variant={'small'}
                                color={'text-gray-700'}
                            >
                                Julie Clark
                            </Typography>
                        </div>
                        <Typography variant={'xs'} color={'text-white'}>
                            <span className="bg-info px-1.5 py-1">
                                Upcoming
                            </span>
                        </Typography>
                    </div>

                    {/*  */}
                    <div className="flex flex-col gap-y-1.5 mt-5">
                        <div className="flex items-center gap-x-2">
                            <IoLocationSharp />
                            <Typography variant={'xs'} color={'text-gray-500'}>
                                225 Heaths Rd, Weribee VIC 3030, Australia
                            </Typography>
                        </div>
                        <div className="flex items-center gap-x-2">
                            <FaCalendarAlt />
                            <Typography variant={'xs'} color={'text-gray-500'}>
                                Wednesday, October 21, 2022
                            </Typography>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-x-2">
                                <AiFillClockCircle />
                                <Typography
                                    variant={'xs'}
                                    color={'text-gray-500'}
                                >
                                    11:30 - 12:30 (1 Hour)
                                </Typography>
                            </div>

                            {/*  */}
                            <Typography variant={'xs'} color={'text-info'}>
                                View Full Info
                            </Typography>
                        </div>
                    </div>
                </>
            ) : (
                <div className="w-full h-full flex justify-center items-center">
                    <Typography variant={'label'} color={'text-black'}>
                        No Upcoming Appointment Found
                    </Typography>
                </div>
            )}
        </Card>
    )
}
