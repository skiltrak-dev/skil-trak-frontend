import { Button, ShowErrorNotifications, Typography } from '@components'
import React, { useEffect } from 'react'
import { SubAdminApi } from '@queries'
import { useNotification } from '@hooks'

export const ApproveCourseModal = ({ onCloseModal, request }: any) => {
    const [courseRequest, courseRequestResult] =
        SubAdminApi.SubAdmin.useDepartmentCourseRequest()

    const { notification } = useNotification()

    useEffect(() => {
        if (courseRequestResult.isSuccess) {
            notification.success({
                title: 'Course Request Approved',
                description:
                    'Add Course request for industry has been approved.',
            })
            onCloseModal()
        }
    }, [courseRequestResult.isSuccess])
    const onClickApprove = () => {
        courseRequest({
            params: {
                id: request.id,
                status: 'approved',
            },
        })
    }
    return (
        <>
            <ShowErrorNotifications result={courseRequestResult} />
            <div className="flex justify-center flex-col items-center gap-4 px-8 py-4">
                <Typography variant="h4">Approve Course</Typography>
                <Typography variant="body">
                    Are you sure you want to approve this course?
                </Typography>
                <div className="flex justify-center gap-x-4 mt-4">
                    <Button
                        variant="success"
                        onClick={onClickApprove}
                        text="Approve"
                        loading={courseRequestResult.isLoading}
                        disabled={courseRequestResult.isLoading}
                    />
                </div>
            </div>
        </>
    )
}
