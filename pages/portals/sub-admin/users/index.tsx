import { ReactElement, useEffect } from 'react'

import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { Animations } from '@animations'
import {
  AssessmentResultCard,
  Button,
  DisplayPrimaryActions,
  HelpQuestionSet,
  ImportantDocument,
  PendingSignatureCard,
  PlacementProgressCard,
  RecentAppointmentCard,
  RtoContextBarData,
  SidebarCalendar,
} from '@components'
import { useContextBar } from '@hooks'
import { AppointmentCard, FigureCard } from '@components/sections'

const PrimaryLinks = [
  {
    title: 'RTOs',
    description: 'Manage Allocated RTOs',
    link: 'users/rtos',
    animation: Animations.Student.Workplace.Student,
  },
  {
    title: 'Students',
    description: 'Manage Allocated Students',
    link: 'users/students',
    animation: Animations.Student.Appointments.AssessmentTool,
  },
  {
    title: 'Industries',
    description: 'Manage Allocated Industries',
    link: 'users/industries',
    animation: Animations.Student.Workplace.Jobs,
  },
]

const RelatedQuestions = [
  {
    text: `I have a workplace. What next?`,
    link: '#',
  },
  {
    text: `I don't have a workplace. What should I do?`,
    link: '#',
  },
  {
    text: `I want to book an appointment`,
    link: '#',
  },
  {
    text: `I want to look for a job`,
    link: '#',
  },
]

const OtherQuestions = [
  {
    text: `I have a workplace. What next?`,
    link: '#',
  },
  {
    text: `I don't have a workplace. What should I do?`,
    link: '#',
  },
  {
    text: `I want to book an appointment`,
    link: '#',
  },
  {
    text: `I want to look for a job`,
    link: '#',
  },
]
const FigureCardData = [
  {
    count: 38,
    title: 'RTOs',
    imagUrl: '/images/figure-card/school.png'
  },
  {
    count: 97,
    title: 'Students',
    imagUrl: '/images/figure-card/school.png'
  },
  {
    count: 98,
    title: 'Industries',
    imagUrl: '/images/figure-card/school.png'
  },
  {
    count: 98,
    title: 'Pending Students',
    imageUrl: "/images/figure-card/school.png"
  },
]

const SubAdminUsers: NextPageWithLayout = () => {
  const { setContent } = useContextBar()
  useEffect(() => {
    setContent(
      <>
        <Button variant={'dark'} text={'My Schedule'} />
        <SidebarCalendar />
        <RtoContextBarData />
      </>
    )
  }, [setContent])
  return (
    <div className="flex flex-col">
      <div className="flex gap-x-6">
        {/* Primary Actions */}
        <div className="bg-white p-4 rounded-2xl shadow-xl flex-shrink-0">
          <DisplayPrimaryActions actions={PrimaryLinks} />
        </div>

        {/* Figure Cards */}

        <div className="flex gap-y-2 flex-col w-full">
          <div className='flex gap-x-2'>
            {FigureCardData.map((data, index) => (
              <FigureCard imageUrl={data.imageUrl} count={data.count} title={data.title} />
            ))}
          </div>

          <AppointmentCard />
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        {/* Related Questions */}
        <HelpQuestionSet
          title={'What you want to do here?'}
          questions={RelatedQuestions}
        />

        {/* Other Questions */}
        <HelpQuestionSet
          title={'What else you want to do?'}
          questions={OtherQuestions}
        />
      </div>
    </div>
  )
}

SubAdminUsers.getLayout = (page: ReactElement) => {
  return <SubAdminLayout title="Users">{page}</SubAdminLayout>
}

export default SubAdminUsers
