import { useAlert, useContextBar } from '@hooks'
import React, { useEffect, useState } from 'react'
import { IndustryProfileCB } from './IndustryProfileCB'
import { Industry, UserStatus } from '@types'
import { MailsCommunication, Notes } from '../StudentProfileDetail/components'
import {
    IndustryHistory,
    IndustryLocations,
    IndustryRequiredDocuments,
    IndustryShiftingHours,
    IndustryStudents,
    IndustrySupervisor,
} from './components'
import { ProfileAppointments } from '../ProfileAppointments'
import { PageTitle } from '@components'

export const IndustryProfileDetail = ({ industry }: { industry: Industry }) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

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
    }, [])

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

    return (
        <div>
            <div className="flex flex-col gap-y-5 mb-20 px-2">
                <PageTitle title="Industry Profile" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3 h-[540px]">
                    <IndustryShiftingHours />
                    <div className="h-full">
                        <Notes userId={industry?.user?.id} />
                    </div>
                </div>

                {/*  */}
                <div>
                    <IndustryStudents industry={industry} />
                </div>

                <div>
                    {/*  */}
                    <IndustrySupervisor industry={industry} />
                </div>

                {/*  */}
                <div>
                    <IndustryLocations industry={industry} />
                </div>

                {/*  */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3 h-[470px]">
                    {/* Required Docs */}
                    <IndustryRequiredDocuments industry={industry} />
                    <div className="h-full">
                        <ProfileAppointments
                            link={{
                                pathname:
                                    '/portals/admin/appointment-type/create-appointment',
                                query: {
                                    industry: industry?.user?.id,
                                },
                            }}
                            userId={industry?.user?.id}
                        />
                    </div>
                </div>

                {/* Students */}

                {/* History */}
                <IndustryHistory industry={industry} />

                {/*  */}
                <div className="h-[640px] px-2  grid grid-cols-2 gap-x-3">
                    <div className={`!h-[99%] col-span-2`}>
                        <MailsCommunication user={industry?.user} />
                    </div>
                </div>
            </div>
        </div>
    )
}
