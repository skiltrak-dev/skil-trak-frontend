import { UserRoles } from '@constants'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Waypoint } from 'react-waypoint'
import { ProfilePastAppointments } from './ProfilePastAppointments'
import { ProfileUpcommingAppointments } from './ProfileUpcommingAppointments'
import { ProfileCancelledAppointments } from './ProfileCancelledAppointments'
import { AuthorizedUserComponent, Button, Card, Typography } from '@components'

export const ProfileAppointments = ({
    userId,
    fullWidth,
    link,
}: {
    fullWidth?: boolean
    userId: number
    link:
        | string
        | {
              pathname: string
              query: {
                  [key: string]: string | number
              }
          }
        | null
}) => {
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
            <div className="h-full">
                <Card fullHeight shadowType="profile" noPadding>
                    <div className="px-4 py-3.5 border-b border-secondary-dark flex justify-between items-center">
                        <Typography semibold>
                            <span className="text-[15px]">Appointment</span>
                        </Typography>
                        <AuthorizedUserComponent
                            roles={[UserRoles.ADMIN, UserRoles.SUBADMIN]}
                        >
                            <Button
                                text="Book Appointment"
                                onClick={() => {
                                    if (link) {
                                        router.push(link)
                                    }
                                }}
                            />
                        </AuthorizedUserComponent>
                    </div>

                    {/*  */}
                    <div className="py-2 flex flex-col h-[500px] overflow-auto custom-scrollbar">
                        <div className="px-3.5 border-b border-secondary-dark pb-3">
                            <ProfileUpcommingAppointments
                                isEntered={isEntered}
                                userId={userId}
                                fullWidth={fullWidth}
                            />
                        </div>
                        <div className="px-3.5 border-b border-secondary-dark py-3">
                            <ProfilePastAppointments
                                userId={userId}
                                isEntered={isEntered}
                                fullWidth={fullWidth}
                            />
                        </div>
                        <div className="px-3.5 py-3">
                            <ProfileCancelledAppointments
                                userId={userId}
                                fullWidth={fullWidth}
                                isEntered={isEntered}
                            />
                        </div>
                    </div>
                </Card>
            </div>
        </Waypoint>
    )
}
