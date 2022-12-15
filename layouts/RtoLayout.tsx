import { PageTitle, PageTitleProps } from '@components'
import { RtoNavbar } from '@components'
import { useJoyRide } from '@hooks'
import { ReactNode, useEffect, useState } from 'react'
import { UserLayout } from './UserLayout'
import Joyride, { CallBackProps } from 'react-joyride'
interface RtoLayoutProps {
    pageTitle?: PageTitleProps
    children: ReactNode
}
export const RtoLayout = ({ pageTitle, children }: RtoLayoutProps) => {
    const [mounted, setMounted] = useState(false)
    const joyride = useJoyRide()

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
