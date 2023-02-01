import { ProgressStep } from '@components'
import { PinnedNotes } from '@partials/notes'
import { CommonApi } from '@queries'
import { MyRtoCard } from '../../components/MyRtoCard'
import { MyWorkPlaceCard } from '../../components/MyWorkPlaceCard'

//
import { RecentAppointment } from '@partials/common'

export const OverViewTab = ({ student }: any) => {
    return (
        <div className="w-full mt-6">
            <PinnedNotes id={student?.user?.id} />
            {student?.workplace?.length > 0 && (
                <div className="my-4">
                    <ProgressStep status />
                </div>
            )}
            {/* <Sectors data={{ data: student?.courses, isSuccess: student }} /> */}
            {/* <Workplaces workplaces={student?.workplace} /> */}
            <div className="w-full flex justify-between items-center gap-x-6 my-4">
                <div className="w-full">
                    <MyRtoCard data={student} />
                </div>
                <div className="w-full">
                    <MyWorkPlaceCard data={student} />
                </div>
            </div>

            <div className="w-full flex flex-col gap-y-4">
                <RecentAppointment userId={student?.user?.id} />
            </div>
        </div>
    )
}
