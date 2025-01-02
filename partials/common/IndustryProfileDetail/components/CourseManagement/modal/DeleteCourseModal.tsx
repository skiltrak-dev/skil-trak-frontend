import React, { useEffect } from 'react'
import { Button, ShowErrorNotifications, Typography } from '@components'
import { Trash2 } from 'lucide-react'
import { AdminApi } from '@queries'
import { useNotification } from '@hooks'

export const DeleteCourseModal = ({ course, onCloseModal }: any) => {
    const [deleteCourse, deleteCourseResult] =
        AdminApi.Industries.useDeleteIndustryProfileCourse()
    const { notification } = useNotification()
    useEffect(() => {
        if (deleteCourseResult.isSuccess) {
            notification.success({
                title: 'Course Deleted',
                description: 'Course deleted successfully',
            })
            onCloseModal()
        }
    }, [deleteCourseResult.isSuccess])
    return (
        <>
            <ShowErrorNotifications result={deleteCourseResult} />
            <div className="flex flex-col gap-y-4 items-center">
                <div className="flex justify-center mt-4">
                    <Trash2
                        size={45}
                        className="bg-red-400 rounded-full p-2 text-white"
                    />
                </div>
                <div className="px-5 py-1 flex flex-col gap-y-2 items-center">
                    <Typography variant="title">Are you sure?</Typography>
                    <Typography variant="body" italic>
                        You want to delete this{' '}
                        <span className="font-semibold">
                            {course?.course?.title ?? 'NA'}
                        </span>{' '}
                        course?
                    </Typography>
                </div>
                <Button
                    text={'Confirm'}
                    variant="error"
                    onClick={() => {
                        deleteCourse(course?.id)
                    }}
                />
            </div>
        </>
    )
}
