import { RtoV2Api } from '@queries'
import {
    ApplyWorkplaceOverview,
    CourseOverview,
    CurrentStatus,
    PlacementRequest,
    WorkplaceBio,
} from './components'
import { useAppSelector } from '@redux/hooks'

export const StudentOverview = () => {
    const { selectedCourse, studentDetail, selectedWorkplace } = useAppSelector(
        (state) => state?.student
    )

    const studentWorkplaces =
        RtoV2Api.StudentsWorkplace.getStudentWorkplacesByCourse(
            {
                id: studentDetail?.id ?? 0,
                courseId: selectedCourse?.id ?? 0,
            },
            {
                skip: !selectedCourse?.id || !studentDetail?.id,
            }
        )

    const firstWorkplace = selectedWorkplace || studentWorkplaces?.data?.[0]

    return (
        <div className="space-y-4">
            <CourseOverview />
            <PlacementRequest studentWorkplaces={studentWorkplaces} />
            {firstWorkplace ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <WorkplaceBio workplace={firstWorkplace} />
                    <CurrentStatus workplace={firstWorkplace} />
                </div>
            ) : (
                <ApplyWorkplaceOverview />
            )}
        </div>
    )
}
