import { Card, Typography } from '@components'
import { Course, User } from '@types'
import { useCallback, useEffect, useState } from 'react'
import { AssessmentCourses } from './AssessmentCourses'
import { AssessmentFiles } from './AssessmentFiles'

export const RtoAssessmentTools = ({
    courses,
    rtoUser,
}: {
    rtoUser: User
    courses: Course[]
}) => {
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)

    useEffect(() => {
        if (courses && courses?.length > 0) {
            const course = courses?.find(
                (c: any) => c?.id === Number(selectedCourse?.id)
            )
            setSelectedCourse(course || courses?.[0])
        }
    }, [courses])

    const onSelectedCourse = useCallback((course: Course) => {
        setSelectedCourse(course)
    }, [])

    return (
        <Card fullHeight shadowType="profile" noPadding>
            <div className="h-full overflow-hidden">
                <div className="px-4 py-3.5 border-b border-secondary-dark">
                    <Typography semibold>
                        <span className="text-[15px]">Assessments Tools</span>
                    </Typography>
                </div>

                {/*  */}
                <div className="grid grid-cols-5 h-full">
                    <div className="col-span-2 border-r border-secondary-dark h-full">
                        <AssessmentCourses
                            courses={courses}
                            onSelectedCourse={onSelectedCourse}
                            selectedCourseId={selectedCourse?.id as number}
                        />
                    </div>
                    <div className="col-span-3 h-full">
                        <AssessmentFiles
                            selectedCourse={selectedCourse as Course}
                            rtoUser={rtoUser}
                        />
                    </div>
                </div>
            </div>
        </Card>
    )
}
