import Link from 'next/link'
import { Tabs } from '@components/sections/subAdmin/components/Tabs/Tabs'

type Props = {}

export const SubAdminProfileTabsView = (props: Props) => {
  const tabs = [
    {
      tab: 'Overview',
      url: '/sub-admin/users/rtos/profile',
    },
    {
      tab: 'Assessments',
      url: '/sub-admin/users/rtos/profile/assessments',
    },
    {
      tab: 'Appointments',
      url: '/sub-admin/users/rtos/profile/appointments',
    },
    {
      tab: 'Mails',
      url: '/sub-admin/users/rtos/profile/mails',
    },
    {
      tab: 'Notes',
      url: '/sub-admin/users/rtos/profile/notes',
    },
  ]

  return (
    <div>
      <Tabs tabs={tabs} />
    </div>
  )
}
