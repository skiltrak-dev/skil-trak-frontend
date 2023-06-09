import { NoData } from '@components/ActionAnimations'
import { Card } from '@components/cards'
import { LoadingAnimation } from '@components/LoadingAnimation'
import { Typography } from '@components/Typography'
import React from 'react'
import { HiVideoCamera } from 'react-icons/hi'
import { MdLocationOn } from 'react-icons/md'

type RecentAppointmentProps = {
    rtoRecentAppointment: any
}

export const RecentAppointment = ({
    rtoRecentAppointment
}: RecentAppointmentProps) => {
    return (
        <div>
            <Card>
                {rtoRecentAppointment?.isLoading ? (
                    <LoadingAnimation />
                ) : rtoRecentAppointment?.data?.length ? (
                    <>
                        <div className="flex items-center gap-x-1 mb-1">
                            <div className={`bg-blue-400 w-3 h-3 rounded-full`}></div>
                            <Typography variant={'label'} color={'black'}>
                                Wed, Jun 29, 2022
                            </Typography>
                            <div className="bg-gray-600 p-[2px] rounded-full">
                                <HiVideoCamera className="text-white text-xs" />
                            </div>
                        </div>
                        <div className="ml-5">
                            <Typography variant="small" color="text-gray-400">
                                02:30 pm - 04:00 pm
                            </Typography>

                            <div className="flex items-center gap-x-2 ">
                                <Typography variant="title" color="text-gray-800">
                                    Staff Training
                                </Typography>
                                <div className="flex items-center gap-x-2 ">
                                    <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                                    <Typography variant="muted" color="text-gray-400">
                                        Yaseen Khan
                                    </Typography>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <MdLocationOn className="text-gray-400" />
                                <Typography variant="muted" color="text-gray-400">
                                    Address/Link goes here
                                </Typography>
                            </div>
                        </div>
                    </>
                ) : (<NoData text={'No data found'} />)}
            </Card>
        </div>
    )
}
