import { ProgressStep } from '@components'
import { PinnedNotes } from '@partials'
import { Courses } from '../../components/Courses'
import { MyRto } from '../../components/MyRto'
import { MyWorkplace } from '../../components/MyWorkplace'
import { RecentAppointment } from '../../components/RecentAppointment'

type StudentsProfileOverviewProps = {
    student: any
}

export const OverViewTab = ({ student }: StudentsProfileOverviewProps) => {
    // const {data} = useGetSubAdminMyRtoQuery(studentId)

    return (
        <div className="w-full mt-6">
            <PinnedNotes id={student?.user?.id} />
            <div className="w-full flex justify-between gap-x-6 mt-4">
                <div className="w-full flex flex-col gap-y-4">
                    <MyRto myRto={student} />
                    <RecentAppointment />
                </div>
                <MyWorkplace myWorkplace={student} />
            </div>
            <div className="my-4">
                <Courses courses={student?.courses} />
            </div>
            {/* Progress */}
            {student?.workplace?.length > 0 && (
                <div className="my-4">
                    <ProgressStep status />
                </div>
            )}
            {/* pinned Notes */}
        </div>
    )
}
