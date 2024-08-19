import { DisplayNotifications } from '@components'

interface AuthLayoutProps {
    children: React.ReactNode
}
export const SimpleLayout = ({ children }: AuthLayoutProps) => {
    return (
        <div>
            {children}
            <DisplayNotifications />
        </div>
    )
}
