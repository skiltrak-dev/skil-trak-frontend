import { RtoApi } from '@queries'
import { ReactElement, useEffect, useMemo, useState } from 'react'
import { ViewProgressByCourseChart } from './ViewProgressByCourseChart'
import { EyeIcon, GraduationCap } from 'lucide-react'
import { Button, Select } from '@components'
import { ViewAllCourseChartModal } from '../modal'

export const CourseOverViewChart = () => {
    const [modal, setModal] = useState<ReactElement | null>(null)
    const [selectedCourse, setSelectedCourse] = useState<any>()

    const { data: rto } = RtoApi.Rto.useProfile()

    const rtoCourses = rto?.courses
    const rtoCourseOptions: any = useMemo(
        () =>
            rtoCourses?.map((course: any) => ({
                label: `${course?.code} - ${course?.title}`,
                value: course?.id,
            })),
        [rtoCourses]
    )

    useEffect(() => {
        setSelectedCourse(rtoCourseOptions?.[0]?.value)
    }, [rtoCourseOptions])

    const onCancel = () => setModal(null)

    const handleViewAllCourses = () => {
        setModal(
            <ViewAllCourseChartModal
                rtoCourses={rtoCourses}
                onCancel={onCancel}
            />
        )
    }

    return (
        <div>
            {modal}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 mb-2">
                    <div className="h-10 w-10 rounded-xl bg-primaryNew flex items-center justify-center shadow-premium">
                        <GraduationCap className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold">
                            Course Overview Chart
                        </h3>
                        <p className="text-xs text-muted-foreground">
                            Total student metrics per course
                        </p>
                    </div>
                </div>

                {/*  */}
                <Button
                    text="View All Courses"
                    Icon={EyeIcon}
                    variant="primaryNew"
                    onClick={handleViewAllCourses}
                />
            </div>

            <div className="flex items-center gap-4 justify-between">
                <div className="w-full">
                    <Select
                        onlyValue
                        name="courses"
                        options={rtoCourseOptions}
                        showError={false}
                        label={'Filter by course'}
                        defaultValue={selectedCourse}
                        placeholder="Filter by Course..."
                        onChange={(e: any) => setSelectedCourse(e)}
                    />
                </div>
            </div>

            <ViewProgressByCourseChart selectedCourse={selectedCourse} />
        </div>
    )
}
