import { AuthorizedUserComponent, Button, Card, Typography } from '@components'
import { UserRoles } from '@constants'
import { User } from '@types'
import { getUserCredentials } from '@utils'
import { useRouter } from 'next/router'
import {
    CancelledAppointments,
    PastAppointments,
    UpcomingAppointments,
} from './components'
import { useState } from 'react'
import { Waypoint } from 'react-waypoint'

export const Appointments = ({ user }: { user: User }) => {
    const [isEntered, setIsEntered] = useState<boolean>(false)

    const router = useRouter()
    const role = getUserCredentials()?.role

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
                <Card noPadding fullHeight>
                    <div className="px-4 py-3.5 flex justify-between items-center border-b border-secondary-dark">
                        <Typography variant="label" semibold>
                            Appointments
                        </Typography>
                        <AuthorizedUserComponent
                            roles={[UserRoles.ADMIN, UserRoles.SUBADMIN]}
                        >
                            <Button
                                onClick={() => {
                                    role === UserRoles.ADMIN
                                        ? router.push({
                                              pathname:
                                                  '/portals/admin/appointment-type/create-appointment',
                                              query: { student: user?.id },
                                          })
                                        : role === UserRoles.SUBADMIN
                                        ? router.push({
                                              pathname: `/portals/sub-admin/tasks/appointments/create-appointment`,
                                              query: { student: user?.id },
                                          })
                                        : ''
                                }}
                            >
                                Book Appointment
                            </Button>
                        </AuthorizedUserComponent>
                    </div>
                    <div className="h-[calc(100%-70px)] py-2.5 overflow-auto custom-scrollbar flex flex-col ">
                        <div className="px-3 border-b border-secondary-dark py-2">
                            <UpcomingAppointments
                                userId={user?.id}
                                isEntered={isEntered}
                            />
                        </div>
                        <div className="px-3 border-b border-secondary-dark py-2">
                            <PastAppointments
                                userId={user?.id}
                                isEntered={isEntered}
                            />
                        </div>
                        <div className="px-3 border-b border-secondary-dark py-2">
                            <CancelledAppointments
                                userId={user?.id}
                                isEntered={isEntered}
                            />
                        </div>
                    </div>
                    {/* <Tabs tabs={tabs} defaultTabSelected={0}>
                {({ header, element }: any) => {
                    return (
                        <div>
                            <div className="border-b border-secondary-dark py-1">
                                {header}
                            </div>
                            <div className="p-4 h-full">{element}</div>
                        </div>
                    )
                }}
            </Tabs> */}
                </Card>
            </div>
        </Waypoint>
    )
}
