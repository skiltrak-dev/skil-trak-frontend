import Link from 'next/link'
import { Tabs } from './components'

type Props = {}

export const TabsView = (props: Props) => {
    const tabs = [
        {
            tab: 'Pending',
            url: '/rto/users/students',
        },
        {
            tab: 'Approved',
            url: '/rto/users/students/approved',
        },
        {
            tab: 'Rejected',
            url: '/rto/users/students/rejected',
        },
        {
            tab: 'Blocked',
            url: '/rto/users/students/blocked',
        },
        {
            tab: 'Archived',
            url: '/rto/users/students/archived',
        },
    ]
    console.log('TabsView')

    return (
        <div>
            <Tabs tabs={tabs} />
        </div>
    )
}
