import { Badge } from '@components'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@components/ui'
import { Course } from '@types'
import { CourseCard } from '../card'
import { useDispatch } from 'react-redux'
import { setSelectedCourse } from 'redux'

interface ViewAllCourseModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    courses: Course[]
    isLoading?: boolean
}

export const ViewAllCourseModal = ({
    open,
    courses,
    onOpenChange,
    isLoading = false,
}: ViewAllCourseModalProps) => {
    const dispatch = useDispatch()

    const onSelectCourse = (course: Course) => {
        dispatch(setSelectedCourse(course))
        onOpenChange(false)
    }
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl">
                <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <DialogTitle className="text-xl font-semibold">
                        All Courses ({courses?.length || 0})
                    </DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-1 gap-3 max-h-[60vh] overflow-auto pr-4">
                    {courses && courses.length > 0 ? (
                        courses.map((course) => (
                            <CourseCard
                                selectedCourse={course}
                                onClick={() => {
                                    onSelectCourse(course)
                                }}
                                key={course.id}
                            />
                        ))
                    ) : (
                        <div className="col-span-2 flex items-center justify-center py-8 text-slate-500">
                            No courses available
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
