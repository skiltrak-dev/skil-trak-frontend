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
    return (
        <div className="w-full mt-6">
            {/* pinned Notes */}
            <PinnedNotes id={student?.user?.id} />

            {/* Progress */}
            {/* {student?.workplace?.length > 0 && ( */}
            {student?.industries[0]?.currentStatus}
            <div className="my-4  overflow-x-auto  custom-scrollbar">
                <ProgressStep status={student?.industries[0]?.currentStatus} />
            </div>
            {/* )} */}

            <div className="my-4">
                <Courses id={student?.id} />
            </div>

            <div className="w-full flex justify-between items-stretch gap-x-6 my-4">
                <div className="w-full">
                    <MyRto myRto={student?.rto} />
                </div>
                <div className="w-full">
                    <MyWorkplace
                        id={student?.id}
                        industries={student?.industries}
                    />
                </div>
            </div>

            <div className="w-full flex flex-col gap-y-4">
                <RecentAppointment userId={student?.user?.id} />
            </div>
        </div>
    )
}
