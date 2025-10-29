import React from 'react'
import { SubmitFolderCommentForm } from '../../forms'
import { useAddCommentOnAssessmentMutation } from '@queries'
import { AddCommentEnum } from '@types'
import { ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'

export const AddComment = ({
    comment,
    resultId,
    studentId,
    assessmentFolder,
    assessmentResponseId,
    folderStatus,
}: {
    comment: string
    resultId: number
    studentId: number
    assessmentFolder: any
    assessmentResponseId: number
    folderStatus: AddCommentEnum
}) => {
    console.log({ assessmentResponseId })

    const { notification } = useNotification()

    const [addComment, addCommentResult] = useAddCommentOnAssessmentMutation()

    const onSubmit = (values: any) => {
        addComment({
            resultId,
            std: Number(studentId),
            comment: values.comment,
            folderId: assessmentResponseId,
            status: values?.type as AddCommentEnum,
            assessmentFolderId: assessmentFolder?.id,
        }).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: 'Comment Added',
                    description: 'Comment Added Successfully',
                })
            }
        })
    }
    return (
        <div>
            <ShowErrorNotifications result={addCommentResult} />
            <SubmitFolderCommentForm
                comment={comment}
                onSubmit={onSubmit}
                result={addCommentResult}
                folderStatus={folderStatus}
                assessmentFolder={assessmentFolder}
            />
        </div>
    )
}
