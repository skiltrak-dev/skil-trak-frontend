import {
    DisplayAlerts,
    PageTitle,
    PageTitleProps,
    SubAdminNavbar,
} from '@components'
import { useJoyRide } from '@hooks'
import React, { ReactNode, useEffect, useState } from 'react'
import Joyride from 'react-joyride'
import { UserLayout } from './UserLayout'

interface SubAdminLayoutProps {
    pageTitle?: PageTitleProps
    children: ReactNode
}
export const SubAdminLayout = ({
    pageTitle,
    children,
}: SubAdminLayoutProps) => {
    const [mounted, setMounted] = useState(false)
    const joyride = useJoyRide()

    useEffect(() => {
        setMounted(true)
    }, [])
    // const MemoNavbar = React.memo(SubAdminNavbar)
    return (
        <UserLayout>
            <>
                <div className="px-8">
                    <div className="mb-6">
                        <SubAdminNavbar />
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
