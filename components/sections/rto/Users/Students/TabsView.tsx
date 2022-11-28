import Link from 'next/link'
import { Tabs } from './components'

type Props = {}

export const TabsView = (props: Props) => {
    const tabs = [
        {
            tab: 'Pending',
            url: '/portals/rto/users/students',
        },
        {
            tab: 'Approved',
            url: '/portals/rto/users/students/approved',
        },
        {
            tab: 'Rejected',
            url: '/portals/rto/users/students/rejected',
        },
        {
            tab: 'Blocked',
            url: '/portals/rto/users/students/blocked',
        },
        {
            tab: 'Archived',
            url: '/portals/rto/users/students/archived',
        },
    ]
    // console.log('TabsView')

    return (
        <div>
            <Tabs tabs={tabs} />
        </div>
    )
}
