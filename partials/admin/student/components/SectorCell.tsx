import { ActionButton } from '@components'
import { useContextBar } from '@hooks'
import { Course, Rto, Student } from '@types'
import { ViewSectorsCB } from '../contextBar'
import { CourseDot } from './CourseDot'

export const SectorCell = ({ student }: { student: Student }) => {
    const contextBar = useContextBar()

    const onViewSectorClicked = (student: Student) => {
        contextBar.setTitle('Sectors & Courses')
        contextBar.setContent(<ViewSectorsCB student={student} />)
        contextBar.show()
    }

    return (
        <div className="w-fit">
            <div className="flex flex-col items-center">
                <ActionButton
                    variant="link"
                    onClick={() => onViewSectorClicked(student)}
                    simple
                >
                    View / Edit
                </ActionButton>
                <div className="flex gap-x-1">
                    {student.courses.map((c: Course) => (
                        <CourseDot key={c?.id} course={c} />
                    ))}
                </div>
            </div>
        </div>
    )
}
