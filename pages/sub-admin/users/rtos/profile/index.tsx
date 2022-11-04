import { ReactElement } from 'react'
import Link from 'next/link'
//Layouts
import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { TabsView } from '@components/sections/rto'
//components
import { AssessmentsTools, ReactTable, TabNavigation, TabProps, Typography } from '@components'
import Image from 'next/image'
import { AppointmentProfile, FigureCard, RtoProfileOverview, SubAdminProfileTabsView } from '@components/sections'
import { FaEdit } from 'react-icons/fa'
import { useUpdateAssessmentToolArchiveMutation } from '@queries'

type Props = {}

const RtoProfile: NextPageWithLayout = (props: Props) => {
  // const FigureCardData = [
  //   {
  //     count: 38,
  //     title: 'RTOs',
  //     imagUrl: '/images/figure-card/school.png'
  //   },
  //   {
  //     count: 97,
  //     title: 'Students',
  //     imagUrl: '/images/figure-card/school.png'
  //   },
  //   {
  //     count: 98,
  //     title: 'Industries',
  //     imagUrl: '/images/figure-card/school.png'
  //   },
  //   {
  //     count: 98,
  //     title: 'Pending Students',
  //     imageUrl: "/images/figure-card/school.png"
  //   },
  // ]
  const [archiveAssessmentTool, archiveAssessmentToolResult] = useUpdateAssessmentToolArchiveMutation()
  const actions = (id: any) => {
    console.log(id)
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
        href: { pathname: 'profile', query: { tab: 'overview' } },
        badge: { text: '05', color: 'text-blue-500' },
        element: <RtoProfileOverview />,
    },
    {
        label: 'Assessments',
        href: { pathname: 'profile', query: { tab: 'assessments' } },
        badge: { text: '99+', color: 'text-error-500' },
        element: <AssessmentsTools role={'RTO'} actions={actions}/>,
    },
    {
        label: 'Appointments',
        href: { pathname: 'profile', query: { tab: 'appointments' } },
        element: <AppointmentProfile />,
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
RtoProfile.getLayout = (page: ReactElement) => {
  return <SubAdminLayout title="RTO Profile">{page}</SubAdminLayout>
}

export default RtoProfile
