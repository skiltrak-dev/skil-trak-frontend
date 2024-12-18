import { Alert, Card, PageTitle } from '@components'
import { UserRoles } from '@constants'
import { useAlert, useContextBar } from '@hooks'
import { CommonApi } from '@queries'
import { Industry, UserStatus } from '@types'
import { getUserCredentials } from '@utils'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { ProfileAppointments } from '../ProfileAppointments'
import { MailsCommunication, Notes } from '../StudentProfileDetail/components'
import {
    IndustryHistory,
    IndustryRequiredDocuments,
    IndustryShiftingHours,
    IndustryStudents,
} from './components'
import { AuthorizedUserComponent } from '@components'
import { CourseManagement } from './components/CourseManagement'
import { StudentSchedule } from './components/StudentSchedule'
import { IndustryProfileCB } from './IndustryProfileCB'

export const IndustryProfileDetail = ({ industry }: { industry: Industry }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

    // its incresing the views of profile
    CommonApi.Industries.useAddProfileVisitor(industry?.user?.id, {
        skip: !industry,
    })

    const contextBar = useContextBar()

    const { alert, setAlerts } = useAlert()

    useEffect(() => {
        contextBar.show(false)
        contextBar.setContent(<IndustryProfileCB industry={industry} />)
        const showAlert = () => {
            switch (industry?.user?.status) {
                case UserStatus.Pending:
                    alert.warning({
                        title: 'Industry is Pending',
                        description: 'Industry is Pending',
                        autoDismiss: false,
                    })
                    break
                case UserStatus.Archived:
                    alert.warning({
                        title: 'Industry is Archived',
                        description: 'Industry is Archived',
                        autoDismiss: false,
                    })
                    break
                case UserStatus.Rejected:
                    alert.error({
                        title: 'Industry is Rejected',
                        description: 'Industry is Rejected',
                        autoDismiss: false,
                    })
                    break
                case UserStatus.Blocked:
                    alert.error({
                        title: 'Industry is Blocked',
                        description: 'Industry is Blocked',
                        autoDismiss: false,
                    })
                    break

                default:
                    break
            }
        }
        showAlert()

        return () => {
            setAlerts([])
            contextBar.setContent(null)
            contextBar.hide()
        }
    }, [mousePosition])

    const handleMouseMove = (event: any) => {
        if (!contextBar.content) {
            setMousePosition({ x: event.clientX, y: event.clientY })
        }
    }

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        }
    }, [contextBar])

    const role = getUserCredentials()?.role

    return (
        <div>
            <div className="flex flex-col gap-y-6 mb-20 px-2">
                <PageTitle title="Industry Profile" />
                {industry?.isSnoozed && (
                    <Alert
                        title="Industry Snoozed"
                        description={`Industry Snoozed till ${moment(
                            industry?.snoozedDate
                        ).format('MMM DD YYYY')}`}
                        variant="warning"
                        autoDismiss={false}
                    />
                )}
                <div className="flex gap-x-4 min-h-[500px]">
                    {/* <IndustryShiftingHours
                        industryUserId={industry?.user?.id}
                    /> */}
                    <div
                        className={`${
                            role === UserRoles.RTO ? 'w-full' : 'w-2/3 '
                        }`}
                    >
                        <Card noPadding>
                            <CourseManagement />
                        </Card>
                    </div>
                    <AuthorizedUserComponent
                        roles={[UserRoles.ADMIN, UserRoles.SUBADMIN]}
                    >
                        <div className=" w-1/3">
                            <Notes userId={industry?.user?.id} />
                        </div>
                    </AuthorizedUserComponent>
                </div>
                <div className="flex gap-x-4 min-h-[500px]">
                    <div className="w-2/3">
                        <IndustryShiftingHours
                            industryUserId={industry?.user?.id}
                        />
                    </div>
                    <div className="w-1/3">
                        <IndustryRequiredDocuments industry={industry} />
                    </div>
                </div>
                <div>
                    <IndustryStudents industry={industry} />
                </div>
                {/*  */}
                <AuthorizedUserComponent
                    roles={[UserRoles.ADMIN, UserRoles.SUBADMIN]}
                >
                    <div className=" h-[470px]">
                        <div className="h-full">
                            <ProfileAppointments
                                link={
                                    role === UserRoles.ADMIN
                                        ? {
                                              pathname:
                                                  '/portals/admin/appointment-type/create-appointment',
                                              query: {
                                                  industry: industry?.user?.id,
                                              },
                                          }
                                        : role === UserRoles.SUBADMIN
                                        ? {
                                              pathname:
                                                  '/portals/sub-admin/tasks/appointments/create-appointment',
                                              query: {
                                                  industry: industry?.user?.id,
                                              },
                                          }
                                        : null
                                }
                                userId={industry?.user?.id}
                            />
                        </div>
                    </div>

                    <IndustryHistory industry={industry} />
                    <StudentSchedule />
                    <div className="h-[640px] px-2  grid grid-cols-2 gap-x-3">
                        <div className={`!h-[99%] col-span-2`}>
                            <MailsCommunication user={industry?.user} />
                        </div>
                    </div>
                </AuthorizedUserComponent>
            </div>
        </div>
    )
}
