import { ProgressStep } from '@components'
import { PinnedNotes } from '@components/sections/subAdmin'

import { Courses } from '../../components/Courses'
import { MyRto } from '../../components/MyRto'
import { MyWorkplace } from '../../components/MyWorkplace'

import { CommonApi } from '@queries'

//
import { RecentAppointment } from '@partials/common'

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
                <RecentAppointment userId={student?.user?.id} />
            </div>
        </div>
    )
}
