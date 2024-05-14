import { Button, Card, Typography } from '@components'
import { useRouter } from 'next/router'
import React from 'react'
import { ProfileUpcommingAppointments } from './ProfileUpcommingAppointments'
import { ProfilePastAppointments } from './ProfilePastAppointments'
import { ProfileCancelledAppointments } from './ProfileCancelledAppointments'

export const ProfileAppointments = ({
    userId,
    link,
}: {
    userId: number
    link:
        | string
        | {
              pathname: string
              query: {
                  [key: string]: string | number
              }
          }
}) => {
    const router = useRouter()
    return (
        <Card fullHeight shadowType="profile" noPadding>
            <div className="px-4 py-3.5 border-b border-secondary-dark flex justify-between items-center">
                <Typography semibold>
                    <span className="text-[15px]">Appiontment</span>
                </Typography>
                <Button
                    text="Book Appointment"
                    onClick={() => {
                        if (link) {
                            router.push(link)
                        }
                    }}
                />
            </div>

            {/*  */}
            <div className="py-2 flex flex-col h-[405px] overflow-auto custom-scrollbar">
                <div className="px-3.5 border-b border-secondary-dark pb-3">
                    <ProfileUpcommingAppointments userId={userId} />
                </div>
                <div className="px-3.5 border-b border-secondary-dark py-3">
                    <ProfilePastAppointments userId={userId} isEntered={true} />
                </div>
                <div className="px-3.5 py-3">
                    <ProfileCancelledAppointments
                        userId={userId}
                        isEntered={true}
                    />
                </div>
            </div>
        </Card>
    )
}
