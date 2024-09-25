import { Typography } from '@components'
import { Course } from '@types'

export const CourseWorkplaceCell = ({ course }: { course: Course }) => {
    return (
        <div
            title={course?.title}
            className="flex flex-col items-center gap-x-2 cursor-pointer"
        >
            <Typography variant="xs" color="text-gray-500" semibold>
                {course?.code ?? 'N/A'}
            </Typography>
            <Typography variant="small" semibold>
                {course?.title ?? 'N/A'}
            </Typography>
        </div>
    )
}
