import { Button, ShowErrorNotifications, Switch, Typography } from '@components'
import React, { useEffect } from 'react'
import { FaSuperpowers } from 'react-icons/fa6'
import { AdminApi } from '@queries'
import { useNotification } from '@hooks'

export const CourseSupersedeModal = ({ course, onCloseModal }: any) => {
    const { notification } = useNotification()
    const [supersedeCourse, supersedeCourseResult] =
        AdminApi.Courses.useCourseToggleSupersede()

    useEffect(() => {
        if (supersedeCourseResult.isSuccess) {
            notification.success({
                title: 'Course Superseded',
                description: 'Course superseded successfully',
            })

            onCloseModal()
        }
    }, [supersedeCourseResult.isSuccess])
    return (
        <>
            <ShowErrorNotifications result={supersedeCourseResult} />
            <div className="flex flex-col items-center gap-y-4 py-4">
                <div className={`text-green-500`}>
                    <FaSuperpowers size={48} />
                </div>

                <div className="flex flex-col items-center gap-y-2">
                    <p className="text-lg font-semibold">{course?.title}</p>
                </div>
                <div className="flex gap-x-2">
                    <div className="">
                        <Typography variant="label">
                            Are you sure you want to supersede this course?
                        </Typography>
                    </div>

                    <div>
                        <div className="pt-1.5">
                            <Switch
                                name="hasAllStudentAccess"
                                customStyleClass="profileSwitch"
                                onChange={(e: any) => {
                                    supersedeCourse(course?.id)
                                }}
                                isChecked={course?.isSuperseded}
                                loading={supersedeCourseResult.isLoading}
                                disabled={supersedeCourseResult.isLoading}
                            />
                        </div>
                    </div>
                </div>

                {/* <Button
                text="close"
                variant="error"
                onClick={() => {
                    onCloseModal && onCloseModal()
                }}
            /> */}
            </div>
        </>
    )
}
