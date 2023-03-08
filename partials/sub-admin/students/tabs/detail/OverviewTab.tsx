import { ProgressStep } from '@components'
import { PinnedNotes } from '@components/sections/subAdmin'

import { Courses } from '../../components/Courses'
import { MyRto } from '../../components/MyRto'
import { MyWorkplace } from '../../components/MyWorkplace'

import { CommonApi, useGetSubAdminStudentWorkplaceQuery } from '@queries'

//
import { RecentAppointment } from '@partials/common'

type StudentsProfileOverviewProps = {
    student: any
}

export const OverViewTab = ({ student }: StudentsProfileOverviewProps) => {
    const workplace = useGetSubAdminStudentWorkplaceQuery(student?.id, {
        skip: !student?.id,
    })
    return (
        <div className="w-full mt-6">
            {/* pinned Notes */}
            <PinnedNotes id={student?.user?.id} />

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
