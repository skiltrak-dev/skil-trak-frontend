import { Button, Card, Typography } from '@components'
import { ProfileCancelledAppointments } from '@partials/common/ProfileAppointments/ProfileCancelledAppointments'
import { ProfilePastAppointments } from '@partials/common/ProfileAppointments/ProfilePastAppointments'
import { ProfileUpcommingAppointments } from '@partials/common/ProfileAppointments/ProfileUpcommingAppointments'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Waypoint } from 'react-waypoint'

export const IndustryDashboardAppointments = () => {
    const [isEntered, setIsEntered] = useState<boolean>(false)

    const router = useRouter()
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

                        <button
                            onClick={() => {
                                router.push(
                                    `/portals/industry/students/appointments/book-appointments`
                                )
                            }}
                            className="text-xs bg-primary hover:bg-primary-dark transition-all rounded px-2 py-1 font-medium text-white"
                        >
                            Book Appointment
                        </button>
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
