import { DisplayAlerts, PageTitle, StudentNavbar } from '@components'
import { ReactNode, useEffect } from 'react'
import { UserLayout } from './UserLayout'
import { useAlert } from '@hooks'
import { getUserCredentials } from '@utils'
import { useRouter } from 'next/router'

interface StudentLayoutProps {
    title?: string
    children: ReactNode
}
export const StudentLayout = ({ title, children }: StudentLayoutProps) => {
    const { pathname } = useRouter()
    const { alert } = useAlert()
    const userData = getUserCredentials()
    useEffect(() => {
        if (userData.status === 'pending') {
            alert.warning({
                title: `${userData?.name} is Pending`,
                description: 'Please wait for admin approval',
                autoDismiss: false,
            })
        }
    }, [])
    return (
        <UserLayout>
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
        </UserLayout>
    )
}
