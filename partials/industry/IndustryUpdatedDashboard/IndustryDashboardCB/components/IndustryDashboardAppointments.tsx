import { Card, Typography } from '@components'
import { ProfileCancelledAppointments } from '@partials/common/ProfileAppointments/ProfileCancelledAppointments'
import { ProfilePastAppointments } from '@partials/common/ProfileAppointments/ProfilePastAppointments'
import { ProfileUpcommingAppointments } from '@partials/common/ProfileAppointments/ProfileUpcommingAppointments'
import React, { useState } from 'react'
import { Waypoint } from 'react-waypoint'

export const IndustryDashboardAppointments = () => {
    const [isEntered, setIsEntered] = useState<boolean>(false)
    return (
        <Waypoint
            onEnter={() => {
                setIsEntered(true)
            }}
            onLeave={() => {
                setIsEntered(false)
            }}
        >
            <div>
                {' '}
                <Card fullHeight shadowType="profile" noPadding>
                    <div className="px-4 py-3.5 border-b border-secondary-dark flex justify-between items-center">
                        <Typography semibold>
                            <span className="text-[15px]">Appointment</span>
                        </Typography>
                    </div>

                    {/*  */}
                    <div className="py-2 flex flex-col h-[405px] overflow-auto custom-scrollbar">
                        <div className="px-3.5 border-b border-secondary-dark pb-3">
                            <ProfileUpcommingAppointments
                                isEntered={isEntered}
                                short
                            />
                        </div>
                        <div className="px-3.5 border-b border-secondary-dark py-3">
                            <ProfilePastAppointments
                                isEntered={isEntered}
                                short
                            />
                        </div>
                        <div className="px-3.5 py-3">
                            <ProfileCancelledAppointments
                                isEntered={isEntered}
                                short
                            />
                        </div>
                    </div>
                </Card>
            </div>
        </Waypoint>
    )
}
