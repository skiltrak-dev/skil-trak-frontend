import { DisplayAlerts, PageTitle, StudentNavbar } from '@components'
import { ReactNode, useEffect, useState } from 'react'
import { UserLayout } from './UserLayout'
import { useAlert, useJoyRide } from '@hooks'
import { getUserCredentials } from '@utils'
import { useRouter } from 'next/router'
import Joyride, { CallBackProps } from 'react-joyride'

interface StudentLayoutProps {
    title?: string
    children: ReactNode
}
export const StudentLayout = ({ title, children }: StudentLayoutProps) => {
    const { pathname } = useRouter()
    const { alert } = useAlert()
    const userData = getUserCredentials()
    useEffect(() => {
        if (userData?.status === 'pending') {
            alert.warning({
                title: `${userData?.name} is Pending`,
                description: 'Please wait for admin approval',
                autoDismiss: false,
            })
        }
    }, [])
    const [mounted, setMounted] = useState(false)
    const joyride = useJoyRide()

    useEffect(() => {
        setMounted(true)
    }, [])
    return (
        <UserLayout>
            <>
                <div className="px-16">
                    <div className="mb-6">
                        <StudentNavbar />
                        <DisplayAlerts />
                    </div>
                    {title && (
                        <div className="mb-6">
                            <PageTitle title={title} />
                        </div>
                    )}
                    <div>{children}</div>
                </div>
                {mounted && (
                    <Joyride
                        callback={joyride.state.callback}
                        continuous
                        run={joyride.state.run}
                        stepIndex={joyride.state.stepIndex}
                        steps={joyride.state.steps}
                        // styles={{
                        //     options: {
                        //         arrowColor: theme.black,
                        //         backgroundColor: theme.black,
                        //         primaryColor: theme.colors.purple,
                        //         textColor: theme.white,
                        //     },
                        // }}
                    />
                )}
            </>
        </UserLayout>
    )
}
