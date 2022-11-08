import { ReactElement } from 'react'
import Link from 'next/link'
//Layouts
import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { TabsView } from '@components/sections/rto'
//components
import { AssessmentsTools, ReactTable, TabNavigation, TabProps, Typography } from '@components'
import Image from 'next/image'
import { AppointmentProfile, FigureCard, IndustryProfileOverview, RtoProfileOverview, SubAdminProfileTabsView } from '@components/sections'
import { FaEdit } from 'react-icons/fa'
import { useUpdateAssessmentToolArchiveMutation } from '@queries'
import { useRouter } from 'next/router'

type Props = {}

const IndustriesProfile: NextPageWithLayout = (props: Props) => {
  const pathname = useRouter()
  const profileId = pathname.query.profileId;

  const [archiveAssessmentTool, archiveAssessmentToolResult] = useUpdateAssessmentToolArchiveMutation()
  const actions = (id: any) => {
    return (
      <div className="flex gap-x-2 ">
        <a href={`${process.env.NEXT_PUBLIC_END_POINT}/rtos/course/content/${id}`} target="blank" rel="noreferrer">
          <Typography variant="tableCell" color="text-blue-600">
            Download
          </Typography>
        </a>

        <div className='cursor-pointer' onClick={() => { archiveAssessmentTool(id) }}>
          <Typography variant="tableCell" color="text-[#7081A0]">
            Archive
          </Typography>
        </div>
        <div onClick={() => { console.log("Edit") }}>
          <FaEdit className="text-[#686DE0] cursor-pointer" />
        </div>
      </div>
    )
  }
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
