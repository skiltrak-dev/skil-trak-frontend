import { RtoV2Api } from '@queries'
import {
    CourseOverview,
    CurrentStatus,
    PlacementRequest,
    WorkplaceBio,
} from './components'
import { useSelector } from 'react-redux'

export const StudentOverview = () => {
    const { selectedCourse, studentDetail, selectedWorkplace } = useSelector(
        (state: any) => state.student
    )

    const studentWorkplaces =
        RtoV2Api.StudentsWorkplace.getStudentWorkplacesByCourse(
            {
                id: studentDetail?.id,
                courseId: selectedCourse?.id,
            },
            {
                skip: !selectedCourse?.id || !studentDetail?.id,
            }
        )

    const firstWorkplace = selectedWorkplace || studentWorkplaces?.data?.[0]

    console.log({ firstWorkplace })

    return (
        <div className="space-y-4">
            <CourseOverview />
            <PlacementRequest studentWorkplaces={studentWorkplaces} />
            {firstWorkplace && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[19.87px]">
                    <WorkplaceBio workplace={firstWorkplace} />
                    <CurrentStatus workplace={firstWorkplace} />
                </div>
            )}
        </div>
    )
}
