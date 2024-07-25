import { Modal, ShowErrorNotifications } from '@components'
import React from 'react'
import { useAddDocumentMutation } from '@queries'
import { CustomRequirementForm } from '../forms'
import { useNotification } from '@hooks'

export const AddCustomRequirementModal = ({
    onCancel,
    courseId,
}: {
    onCancel: () => void
    courseId: number
}) => {
    const [addDocument, addDocumentResult] = useAddDocumentMutation()

    const { notification } = useNotification()

    const onSubmit = async (values: any) => {
        addDocument({
            ...values,
            courseId,
            isCustom: true,
        }).then((res: any) => {
            if (res?.data) {
                notification.success({
                    title: 'Custom Folder Added',
                    description: 'Custom Folder Added Sucessfully',
                })
                onCancel()
            }
        })
    }
    return (
        <>
            <ShowErrorNotifications result={addDocumentResult} />

            <Modal
                onCancelClick={onCancel}
                showActions={false}
                title={'Add Custom Requirements'}
                subtitle="Add Custom Requirements Detail"
            >
                <CustomRequirementForm
                    onSubmit={onSubmit}
                    result={addDocumentResult}
                />
            </Modal>
        </>
    )
}
