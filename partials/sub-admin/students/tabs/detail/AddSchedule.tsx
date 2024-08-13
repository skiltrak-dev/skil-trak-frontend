import { AddScheduleContainer } from '@partials/common'
import { useStudentAssessmentCoursesQuery } from '@queries'
import { Course, User } from '@types'
import { IoIosArrowRoundBack } from 'react-icons/io'

export const AddSchedule = ({
    user,
    workplace,
    studentId,
    selectedCourse,
    onAddStudentCourse,
}: {
    user: User
    workplace: any
    studentId: number
    selectedCourse: number
    onAddStudentCourse: () => void
}) => {
    const courses = useStudentAssessmentCoursesQuery(Number(studentId), {
        skip: !studentId,
        refetchOnMountOrArgChange: true,
    })
    const course = courses?.data?.find(
        (c: Course) => c.id === Number(selectedCourse)
    )
    return (
        <>
            <div
                className={
                    'group max-w-max transition-all text-xs flex justify-start items-center py-2.5 text-muted hover:text-muted-dark rounded-lg cursor-pointer'
                }
                onClick={() => onAddStudentCourse()}
            >
                <IoIosArrowRoundBack className="transition-all inline-flex text-base group-hover:-translate-x-1" />
                <span className="ml-2">{'Back To Previous'}</span>
            </div>
            <AddScheduleContainer
                user={user}
                workplace={workplace}
                course={course as Course}
                onAddStudentCourse={() => onAddStudentCourse()}
            />
        </>
    )
}
