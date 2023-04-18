import { ActionButton } from '@components'
import { useContextBar } from '@hooks'
import { CourseDot } from '@partials/rto/student/components'
import { Course, Rto, Student, SubAdmin } from '@types'
import { ViewCoursesCB } from '../contextBar'

export const CoursesCell = ({ coordinator }: { coordinator: any }) => {
    const contextBar = useContextBar()

    const onViewSectorClicked = (subAdmin: SubAdmin) => {
        contextBar.setTitle('Courses')
        contextBar.setContent(<ViewCoursesCB subAdmin={subAdmin} />)
        contextBar.show()
    }

    return (
        <div className="w-fit">
            <div className="flex flex-col items-center">
                <ActionButton
                    variant="link"
                    onClick={() => onViewSectorClicked(coordinator)}
                    simple
                >
                    View / Edit
                </ActionButton>
                <div className="flex gap-x-1">
                    {coordinator.courses.map((c: Course) => (
                        <CourseDot key={c?.id} course={c} />
                    ))}
                </div>
            </div>
        </div>
    )
}
