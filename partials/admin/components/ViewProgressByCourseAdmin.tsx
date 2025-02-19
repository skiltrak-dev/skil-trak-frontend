import Modal from '@modals/Modal'
import { ViewProgressByCourseChart } from '@partials/common'
import { AdminApi, CommonApi, RtoApi } from '@queries'
import React, { useState } from 'react'

export const ViewProgressByCourseAdmin = () => {
    const [selectedRto, setSelectedRto] = useState<any>(null)
    const getCourses = CommonApi.Filter.useCourses()
    const rtoCourseOptions = getCourses?.data?.map((course: any) => ({
        label: `${course?.code} - ${course?.title}`,
        value: course?.id,
    }))

    const [selectedCourse, setSelectedCourse] = useState<any>(
        rtoCourseOptions?.length > 0 && rtoCourseOptions[0]
    )

    const { data, isLoading, isError, isSuccess } =
        AdminApi.Admin.useAdminProgressByCourse(
            {
                courseId: selectedCourse?.value ?? selectedCourse,
            }
            // {
            //     refetchOnMountOrArgChange: true,
            // }
        )

    const initialData = [
        // avgTimelineData,
        { name: 'Total Students', value: data?.totalStudent ?? 0 },
        { name: 'Flagged Students', value: data?.flaggedStudent ?? 0 },
        { name: 'Snoozed Students', value: data?.snoozed ?? 0 },
        { name: 'Not Contactable', value: data?.notContactable ?? 0 },
        {
            name: 'Workplace Requests',
            value: data?.workplaceRequestCreated ?? 0,
        },
        // { name: 'Searching for Workplace', value: 30 },
        {
            name: 'Placed (Options Available)',
            value: data?.placedStudents ?? 0,
        },
    ]
    return (
        <div className="flex justify-end">
            <Modal>
                <Modal.Open opens="viewProgressByCourse">
                    <span className="text-sm text-link mb-1 underline cursor-pointer">
                        View Progress by Course
                    </span>
                </Modal.Open>
                <Modal.Window name="viewProgressByCourse">
                    <ViewProgressByCourseChart
                        selectedCourse={selectedCourse}
                        initialData={initialData}
                        courses={rtoCourseOptions}
                        setSelectedCourse={setSelectedCourse}
                        isLoading={isLoading}
                        isError={isError}
                        isSuccess={isSuccess}
                        setSelectedRto={setSelectedRto}
                        selectedRto={selectedRto}
                    />
                </Modal.Window>
            </Modal>
        </div>
    )
}
