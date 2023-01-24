import { ProgressStep } from '@components'
import { PinnedNotes } from '@components/sections/subAdmin'

import { Courses } from '../../components/Courses'
import { MyRto } from '../../components/MyRto'
import { MyWorkplace } from '../../components/MyWorkplace'
import { RecentAppointment } from '../../components/RecentAppointment'

import { CommonApi } from '@queries'

type StudentsProfileOverviewProps = {
    student: any
}

export const OverViewTab = ({ student }: StudentsProfileOverviewProps) => {
    const upcommingAppointment = CommonApi.Appointments.useUpcommingAppointment(
        student?.user?.id,
        { skip: !student }
    )

    return (
        <div className="w-full mt-6">
            {/* pinned Notes */}
            {/* <PinnedNotes id={student?.user?.id} /> */}

            {/* Progress */}
            {student?.workplace?.length > 0 && (
                <div className="my-4 max-w-[768px] overflow-hidden overflow-x-auto">
                    <ProgressStep
                        status={student?.workplace[0]?.currentStatus}
                    />
                </div>
            )}

            <div className="my-4">
                <Courses results={student?.result} courses={student?.courses} />
            </div>

            <div className="w-full flex justify-between items-stretch gap-x-6 my-4">
                <div className="w-full">
                    <MyRto myRto={student} />
                </div>
                <div className="w-full">
                    <MyWorkplace myWorkplace={student} />
                </div>
            </div>

            <div className="w-full flex flex-col gap-y-4">
                <RecentAppointment appointment={upcommingAppointment?.data} />
            </div>
        </div>
    )
}

// <Link legacyBehavior href="#">
// <a className="inline-block uppercase text-xs font-medium bg-orange-100 text-orange-600 px-4 py-2 rounded">
//   See Details
// </a>
// </Link>
