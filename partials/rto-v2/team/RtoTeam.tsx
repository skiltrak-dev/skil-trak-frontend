import { Users } from 'lucide-react'
import { ActionRequiredHeader } from '../components'
import { TabNavigation, TabProps } from '@components'
import { MyCoordinators } from './MyCoordinators'
import { AssignedCoordinators } from './AssignedCoordinators'
import { useRouter } from 'next/router'

export const RtoTeam = () => {
    const router = useRouter()

    const tabs: TabProps[] = [
        {
            label: 'My Team',
            href: {
                pathname: 'team',
                query: { tab: 'my-team' },
            },
            element: <MyCoordinators />,
        },
        {
            label: 'Skiltrak Team',
            href: {
                pathname: 'team',
                query: { tab: 'skiltrak-team' },
            },
            element: <AssignedCoordinators />,
        },
    ]
    return (
        <div>
            <ActionRequiredHeader
                icon={Users}
                title="Team Management"
                description="Your RTO team and allocated Skiltrak support members"
                gradientFrom="primaryNew"
                gradientTo="primaryNew"
                iconGradient="from-primaryNew to-primaryNew"
                actionButton={{
                    label: 'Add Team Member',
                    icon: Users,
                    onClick: () => router.push('team/create'),
                }}
            />

            <TabNavigation tabs={tabs}>
                {({ header, element }: any) => (
                    <div>
                        <div>{header}</div>
                        <div className="mt-3">{element}</div>
                    </div>
                )}
            </TabNavigation>
        </div>
    )
}
