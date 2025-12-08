import React from 'react'
import { CourseFolderForm } from '../../form'
import { AddFolderFormType, Course, Folder } from '@types'
import { AdminApi } from '@queries'
import { ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'

export const EditAssessmentFolder = ({
    folder,
    course,
    onCancel,
}: {
    folder: Folder
    course: Course
    onCancel: () => void
}) => {
    const [updateAssessment, updateAssessmentResult] =
        AdminApi.Folders.useAssessMentUpdate()

    const { notification } = useNotification()

    const onSubmit = async (values: AddFolderFormType) => {
        const res: any = await updateAssessment({
            id: Number(folder.id),
            ...values,
            course: course?.id,
        })
        if (res?.data) {
            notification.success({
                title: 'Assessment Folder Updated',
                description: 'Assessment Folder Updated Successfully',
            })
            onCancel()
        }
    }
    return (
        <div>
            <ShowErrorNotifications result={updateAssessmentResult} />
            <CourseFolderForm
                edit
                onSubmit={onSubmit}
                onCancel={onCancel}
                initialValues={folder}
            />
        </div>
    )
}
