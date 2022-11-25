import { useRouter } from 'next/router'
import { ReactElement, useEffect } from 'react'
import Link from 'next/link'
//Layouts
import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import { TabsView } from '@components/sections/rto'
//components
import {
  AssessmentsTools,
  ReactTable,
  TabNavigation,
  TabProps,
  Typography,
  IndustryProfile,
  SubAdminStudentProfile,
} from '@components'
import {
  AppointmentProfile,
  AssesmentEvidenceDetail,
  FigureCard,
  Notes,
  RtoProfileOverview,
  StudentsProfileOverview,
  SubAdminProfileTabsView,
} from '@components/sections'
// icons
import { FaEdit } from 'react-icons/fa'
// queries
import {
  useGetSubAdminStudentDetailQuery,
  useUpdateAssessmentToolArchiveMutation,
} from '@queries'
import { AssessmentsEvidence } from '@components/sections/student/AssessmentsContainer'

// hooks
import { useContextBar } from '@hooks'

type Props = {}

const StudentsProfile: NextPageWithLayout = (props: Props) => {
  const { setContent } = useContextBar()
  const pathname = useRouter()
  const profileId = pathname.query.profileId

  const { data, isLoading } = useGetSubAdminStudentDetailQuery(
    String(profileId),
    {
      skip: !profileId,
    }
  )
  useEffect(() => {
    setContent(
      <>
        <SubAdminStudentProfile data={data} />
      </>
    )
  }, [setContent, data])

  const [archiveAssessmentTool, archiveAssessmentToolResult] =
    useUpdateAssessmentToolArchiveMutation()
  const actions = (id: any) => {
    console.log(id)
    return (
      <div className="flex gap-x-2 ">
        <a
          href={`${process.env.NEXT_PUBLIC_END_POINT}/rtos/course/content/${id}`}
          target="blank"
          rel="noreferrer"
        >
          <Typography variant="tableCell" color="text-blue-600">
            Download
          </Typography>
        </a>

        <div
          className="cursor-pointer"
          onClick={() => {
            archiveAssessmentTool(id)
          }}
        >
          <Typography variant="tableCell" color="text-[#7081A0]">
            Archive
          </Typography>
        </div>
        <div
          onClick={() => {
            console.log('Edit')
          }}
        >
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
      element: <StudentsProfileOverview studentDetail={data} />,
    },
    {
      label: 'Assessments',
      href: { pathname: String(profileId), query: { tab: 'assessments' } },
      badge: { text: '99+', color: 'text-error-500' },
      element: <AssesmentEvidenceDetail courseId={data?.courses[0]?.id} />,
    },
    {
      label: 'Mails',
      href: { pathname: String(profileId), query: { tab: 'mails' } },
      element: <div>Mails</div>,
    },
    {
      label: 'Notes',
      href: { pathname: String(profileId), query: { tab: 'notes' } },
      element: <Notes id={data?.user?.id} />,
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
