import { ProgressStep } from '@components'
import { PinnedNotes } from '@components/sections/subAdmin'

import { Courses } from '../../components/Courses'
import { MyRto } from '../../components/MyRto'
import { MyWorkplace } from '../../components/MyWorkplace'

import { useGetSubAdminStudentWorkplaceQuery } from '@queries'

//
import { RecentAppointment } from '@partials/common'
import { Student } from '@types'
import { useRouter } from 'next/router'

type StudentsProfileOverviewProps = {
    student: Student
}

export const OverViewTab = ({ student }: StudentsProfileOverviewProps) => {
    const workplace = useGetSubAdminStudentWorkplaceQuery(student?.id, {
        skip: !student?.id,
    })

    const router = useRouter()
    return (
        <div className="w-full mt-6">
            {/* pinned Notes */}
            <PinnedNotes
                id={student?.user?.id}
                link={`/portals/sub-admin/students/${router?.query?.id}?tab=notes`}
            />

            {/* Progress */}
            {/* {student?.workplace?.length > 0 && ( */}
            <div className="my-4">
                <ProgressStep
                    status={
                        student?.industries?.length > 0
                            ? 'placementStarted'
                            : workplace?.data && workplace?.data?.length > 0
                            ? workplace?.data[0]?.currentStatus
                            : 'industryCheck'
                    }
                />
            </div>
            {/* )} */}

            <div className="my-4">
                <Courses id={student?.id} />
            </div>

            <div className="w-full flex justify-between items-stretch gap-x-6 my-4">
                <div className="w-full">
                    <MyRto />
                </div>
                <div className="w-full">
                    <MyWorkplace student={student} />
                </div>
            </div>

            <div className="w-full flex flex-col gap-y-4">
                <RecentAppointment
                    userId={student?.user?.id}
                    link={`/portals/admin/student/${student?.id}?tab=appointments`}
                />
            </div>
        </div>
    )
}
