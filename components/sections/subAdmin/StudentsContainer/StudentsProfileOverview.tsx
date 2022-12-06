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
    subAdminStudentDetail: any
}

export const StudentsProfileOverview = ({
    subAdminStudentDetail,
}: StudentsProfileOverviewProps) => {
    // const {data} = useGetSubAdminMyRtoQuery(studentId)

    return (
        <div className="w-full mt-6">
            <div className="w-full flex justify-between gap-x-6 mt-4">
                <div className="w-full flex flex-col gap-y-4">
                    <MyRtoInfoCard myRto={subAdminStudentDetail} />
                    <StudentRecentAppointmentCard />
                </div>
                <WorkplaceInfoCard myWorkplace={subAdminStudentDetail} />
            </div>
            <div className='my-4'>
                <StudentProfileCoursesCard
                    courses={subAdminStudentDetail?.courses}
                />
            </div>
            {/* Progress */}
            {subAdminStudentDetail?.workplace?.length > 0 && (
                <div className="my-4">
                    <ProgressStep status />
                </div>
            )}
            {/* pinned Notes */}
            <PinnedNotes id={subAdminStudentDetail?.user?.id} />
        </div>
    )
}

// <Link href="#">
// <a className="inline-block uppercase text-xs font-medium bg-orange-100 text-orange-600 px-4 py-2 rounded">
//   See Details
// </a>
// </Link>
