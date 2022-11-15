import { ReactElement, useEffect } from 'react'
import { useRouter } from 'next/router'

//Layouts
import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

// hooks
import { useContextBar } from '@hooks'
//components
import { TabNavigation, TabProps } from '@components'
import { IndustryProfile } from '@components/IndustryProfile'
import { AppointmentProfile, IndustryProfileOverview } from '@components/sections'
// icons
// import { FaEdit } from 'react-icons/fa'
// queries
// import { useGetSubAdminIndustriesProfileQuery } from '@queries'

type Props = {}

const IndustriesProfile: NextPageWithLayout = (props: Props) => {
  const { setContent } = useContextBar()
  useEffect(() => {
    setContent(
      <>
        <IndustryProfile />
      </>
    )
  }, [setContent])
  const pathname = useRouter()
  const profileId = pathname.query.profileId;

  // const {data} = useGetSubAdminIndustriesProfileQuery(String(profileId))

  const tabs: TabProps[] = [
    {
      label: 'Overview',
      href: { pathname: String(profileId), query: { tab: 'overview' } },
      badge: { text: '05', color: 'text-blue-500' },
      element: <IndustryProfileOverview />,
    },
    {
      label: 'Students',
      href: { pathname: 'profile', query: { tab: 'students' } },
      badge: { text: '99+', color: 'text-error-500' },
      element: <div>Students</div>,
    },
    {
      label: 'Appointments',
      href: { pathname: 'profile', query: { tab: 'appointments' } },
      element: <AppointmentProfile />,
    },
    {
      label: 'Schedule',
      href: { pathname: 'profile', query: { tab: 'schedule' } },
      element: <div>schedule</div>,
    },
    {
      label: 'Mails',
      href: { pathname: 'profile', query: { tab: 'mails' } },
      element: <div>Mails</div>,
    },
    {
      label: 'Notes',
      href: { pathname: 'profile', query: { tab: 'notes' } },
      element: <div>Notes</div>,
    },
  ]

  return (
    <>
      <TabNavigation tabs={tabs}>
        {({ header, element }: any) => {
          return (
            <div>
              <div>{header}</div>
              <div>{element}</div>
            </div>
          )
        }}
      </TabNavigation>
    </>
  )
}
IndustriesProfile.getLayout = (page: ReactElement) => {
  return <SubAdminLayout title="Industries Profile">{page}</SubAdminLayout>
}

export default IndustriesProfile
