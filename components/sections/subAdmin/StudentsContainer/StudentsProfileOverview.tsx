import { Card } from '@components/cards'
import {
  InitialAvatar,
  InitialAvatarContainer,
} from '@components/InitialAvatar'
import { Typography } from '@components/Typography'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaSchool } from 'react-icons/fa'
import { MdPermContactCalendar, MdPhone } from 'react-icons/md'
import { NotesCard, StudentProfileCoursesCard } from '../components'
import {
  MyRtoInfoCard,
  ProgressStep,
  StudentRecentAppointmentCard,
  WorkplaceInfoCard,
} from './components'
import { PinnedNotes } from '../components'
type StudentsProfileOverviewProps = {
  data: any
}

export const StudentsProfileOverview = ({
  data,
}: StudentsProfileOverviewProps) => {
  // const {data} = useGetSubAdminMyRtoQuery(studentId)
  // console.log("useGetSubAdminMyRtoQuery", data);

  return (
    <div className="mt-6">
      {/* pinned Notes */}
      <PinnedNotes id={studentDetail?.user?.id} />

      {/* Progress */}
      <ProgressStep />
      
      <StudentProfileCoursesCard courses={data?.courses}/>
      <div className='w-full flex justify-between gap-x-6 mt-4'>
        <div className='w-full flex flex-col gap-y-4'>
          <MyRtoInfoCard />
          <WorkplaceInfoCard />
        </div>
        <StudentRecentAppointmentCard />
      </div>
    </div>
  )
}

// <Link href="#">
// <a className="inline-block uppercase text-xs font-medium bg-orange-100 text-orange-600 px-4 py-2 rounded">
//   See Details
// </a>
// </Link>
