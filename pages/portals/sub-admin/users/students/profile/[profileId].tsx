import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import Link from 'next/link'
//Layouts
import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { TabsView } from '@components/sections/rto'
//components
import { AssessmentsTools, ReactTable, TabNavigation, TabProps, Typography, IndustryProfile, SubAdminStudentProfile } from '@components'
import { AppointmentProfile, FigureCard, RtoProfileOverview, StudentsProfileOverview, SubAdminProfileTabsView } from '@components/sections'
// icons
import { FaEdit } from 'react-icons/fa'
// queries
import { useUpdateAssessmentToolArchiveMutation } from '@queries'
import { AssessmentsEvidence } from '@components/sections/student/AssessmentsContainer'

// hooks
import { useContextBar } from '@hooks'

type Props = {}

const StudentsProfile: NextPageWithLayout = (props: Props) => {
  const { setContent } = useContextBar()
  useEffect(() => {
    setContent(
      <>
        <SubAdminStudentProfile />
      </>
    )
  }, [setContent])
  const pathname = useRouter()
  const profileId = pathname.query.profileId;



 
  const tabs: TabProps[] = [
    {
      label: 'Overview',
      href: { pathname: String(profileId), query: { tab: 'overview' } },
      badge: { text: '05', color: 'text-blue-500' },
      element: <StudentsProfileOverview />,
    },
    {
      label: 'Assessments',
      href: { pathname: 'profile', query: { tab: 'assessments' } },
      badge: { text: '99+', color: 'text-error-500' },
      element: <AssessmentsEvidence />,
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
StudentsProfile.getLayout = (page: ReactElement) => {
  return <SubAdminLayout title="Student Profile">{page}</SubAdminLayout>
}

export default StudentsProfile
