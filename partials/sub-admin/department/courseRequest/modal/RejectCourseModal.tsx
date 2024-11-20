import {
    Button,
    ShowErrorNotifications,
    TextArea,
    Typography,
} from '@components'
import React, { useEffect, useState } from 'react'
import { SubAdminApi } from '@queries'
import { useNotification } from '@hooks'

export const RejectCourseModal = ({ request, onCloseModal }: any) => {
    const [rejectionNote, setRejectionNote] = useState('')
    const [courseRequest, courseRequestResult] =
        SubAdminApi.SubAdmin.useDepartmentCourseRequest()

    const { notification } = useNotification()

    useEffect(() => {
        if (courseRequestResult.isSuccess) {
            notification.error({
                title: 'Course Request Rejected',
                description:
                    'Add Course request for the industry has been reject.',
            })
            onCloseModal()
        }
    }, [courseRequestResult.isSuccess])

    const onConfirmReject = () => {
        if (rejectionNote.trim()) {
            console.log('Rejecting course request', rejectionNote)
            courseRequest({
                params: {
                    id: request.id,
                    status: 'rejected',
                },
                body: { note: rejectionNote?.replace(/[\r\n]+/g, ' ') },
            })
        }
    }

    return (
        <>
            <ShowErrorNotifications result={courseRequestResult} />
            <Typography variant="h4">Reject Course Request</Typography>
            <Typography variant="body">
                Please provide a reason for rejecting this course request.
            </Typography>
            <TextArea
                name="note"
                placeholder="Enter rejection reason..."
                value={rejectionNote}
                onChange={(e: any) => setRejectionNote(e.target.value)}
                required
                rows={3}
            />
            <Button
                variant="error"
                text={'Confirm Reject'}
                onClick={onConfirmReject}
                loading={courseRequestResult.isLoading}
                disabled={
                    courseRequestResult.isLoading || !rejectionNote.trim()
                }
            />
        </>
    )
}
