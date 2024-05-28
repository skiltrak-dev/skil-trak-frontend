import { useAlert, useContextBar } from '@hooks'
import React, { useEffect, useState } from 'react'
import { IndustryProfileCB } from './IndustryProfileCB'
import { Industry, UserStatus } from '@types'
import { MailsCommunication, Notes } from '../StudentProfileDetail/components'
import { IndustryHistory, IndustryStudents } from './components'
import { ProfileAppointments } from '../ProfileAppointments'

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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-3 mt-5 h-[506px]">
                <div className="h-full">
                    <Notes userId={industry?.user?.id} />
                </div>
            </div>

            {/* Students */}
            <div>
                <IndustryStudents industry={industry} />
            </div>

            <div className="mt-5 h-[480px]">
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

            {/* History */}
            <IndustryHistory industry={industry} />

            {/*  */}
            <div className="h-[640px] px-2  grid grid-cols-2 gap-x-3">
                <div className={`!h-[99%] col-span-2`}>
                    <MailsCommunication user={industry?.user} />
                </div>
            </div>
        </div>
    )
}
