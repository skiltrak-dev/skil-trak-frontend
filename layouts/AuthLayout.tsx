import { AuthNavbar, Footer, DisplayNotifications } from '@components'

export const AuthTypeOptions = ['sign-up', 'log-in', 'logged-in'] as const

interface AuthLayoutProps {
    children: React.ReactNode
    type: typeof AuthTypeOptions[number]
}
export const AuthLayout = ({ children, type }: AuthLayoutProps) => {
    return (
        <>
            <div className="w-full">
                <AuthNavbar type={type} />
                <div className="h-full flex-grow border-b-[32px] border-transparent remove-scrollbar pb-6">
                    <div className="max-w-screen-xl mx-auto h-full">
                        {children}
                    </div>
                </div>
                <div className="w-full fixed bottom-0 left-0">
                    <Footer />
                </div>
                <DisplayNotifications />
            </div>
        </>
    )
}
