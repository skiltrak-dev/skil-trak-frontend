import { CourseDot } from '@partials/admin/student/components'
import { Course } from '@types'

export const SectorCell = ({ courses }: { courses: Course[] }) => {
    return (
        <div className="flex gap-x-1">
            {courses?.map((c: Course) => (
                <CourseDot key={c?.id} course={c} />
            ))}
        </div>
    )
}
