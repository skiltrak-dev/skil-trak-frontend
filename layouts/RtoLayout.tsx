import { PageTitle, PageTitleProps } from '@components'
import { RtoNavbar } from '@components'
import { useAlert, useJoyRide } from '@hooks'
import { ReactNode, useEffect, useState } from 'react'
import { UserLayout } from './UserLayout'
import Joyride, { CallBackProps } from 'react-joyride'
import { AuthUtils, getUserCredentials } from '@utils'
import { useRouter } from 'next/router'
import { UserStatus } from '@types'
interface RtoLayoutProps {
    pageTitle?: PageTitleProps
    children: ReactNode
}

const getRoutePath = `/portals/rto`

// Redirect Urls When not approved
const redirectUrls = [
    `${getRoutePath}/create`,
    `${getRoutePath}/students`,
    `${getRoutePath}/coordinators`,
    `${getRoutePath}/students/[id]`,
    `${getRoutePath}/industries/mous`,
    `${getRoutePath}/coordinators/[id]`,
    `${getRoutePath}/tasks/appointments`,
    `${getRoutePath}/industries/workplaces`,
    `${getRoutePath}/admins/contact-person`,
    `${getRoutePath}/tasks/assessment-tools`,
    `${getRoutePath}/industries/mous/[mouDetail]`,
    `${getRoutePath}/tasks/appointments/create-appointments`,
]

export const RtoLayout = ({ pageTitle, children }: RtoLayoutProps) => {
    const [mounted, setMounted] = useState(false)
    const joyride = useJoyRide()
    const router = useRouter()
    const { alert } = useAlert()

    const token = AuthUtils.getToken()
    const status = AuthUtils.getUserCredentials()?.status

    useEffect(() => {
        if (
            token &&
            redirectUrls.includes(router.pathname) &&
            status !== UserStatus.Approved
        ) {
            router.push(getRoutePath)
        }
    }, [router])

    useEffect(() => {
        if (status === UserStatus.Pending) {
            alert.warning({
                title: `Your account is Pending`,
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
                <div className="px-16">
                    <div className="mb-4">
                        <RtoNavbar />
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
                        disableScrollParentFix
                        disableOverlayClose={true}
                        hideBackButton={true}
                        locale={{
                            skip: 'Close Tour',
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
