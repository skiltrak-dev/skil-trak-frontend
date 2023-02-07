import {
    Alert,
    DisplayAlerts,
    PageTitle,
    PageTitleProps,
    StudentNavbar,
} from '@components'
import { ReactNode, useEffect, useState } from 'react'
import { UserLayout } from './UserLayout'
import { useAlert, useJoyRide } from '@hooks'
import { AuthUtils, getUserCredentials } from '@utils'
import { useRouter } from 'next/router'
import Joyride, { CallBackProps } from 'react-joyride'
import { UserStatus } from '@types'

interface StudentLayoutProps {
    pageTitle?: PageTitleProps
    children: ReactNode
}

const getRoutePath = `/portals/student`
const redirectUrls = [
    `${getRoutePath}/my-workplace`,
    `${getRoutePath}/have-workplace`,
    `${getRoutePath}/dont-have-workplace`,
    `${getRoutePath}/appointments`,
    `${getRoutePath}/book-appointment`,
    `${getRoutePath}/assessment-evidence`,
    `${getRoutePath}/assessment-tools`,
    `${getRoutePath}/schedule`,
    `${getRoutePath}/jobs`,
]

export const StudentLayout = ({ pageTitle, children }: StudentLayoutProps) => {
    const [mounted, setMounted] = useState(false)
    const router = useRouter()

    const { alert } = useAlert()
    const userData = getUserCredentials()
    const token = AuthUtils.getToken()

    const joyride = useJoyRide()

    const path = router.pathname?.split('/')?.reverse()[0]

    useEffect(() => {
        if (
            token &&
            redirectUrls.includes(router.pathname) &&
            userData?.status !== UserStatus.Approved
        ) {
            router.push(getRoutePath)
        }
    }, [router])
    useEffect(() => {
        if (userData?.status === 'pending') {
            alert.warning({
                title: `${userData?.name} is Pending`,
                description: 'Please wait for admin approval',
                autoDismiss: false,
            })
        }
    }, [])

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <UserLayout>
            <>
                <div className="px-4 mb-32 md:px-16">
                    <div className="mb-6">
                        <StudentNavbar />
                        <DisplayAlerts />
                    </div>
                    {pageTitle && pageTitle.title && (
                        <div className="mb-6">
                            <PageTitle
                                title={pageTitle.title}
                                navigateBack={pageTitle?.navigateBack}
                                backTitle={pageTitle?.backTitle}
                            />
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
                        showSkipButton={true}
                        // hideCloseButton={true}
                        disableOverlayClose={true}
                        hideBackButton={true}
                        locale={{
                            skip: "Close Tour"
                        }}
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
