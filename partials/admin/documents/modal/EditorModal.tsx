import { ContentEditor, Modal, ShowErrorNotifications } from '@components'
import React, { useEffect, useState } from 'react'

// queries
import { AdminApi } from '@queries'
import { useNotification } from '@hooks'
import { useEditor } from '../hooks'

export const EditorModal = ({
    onCancel,
    // content,
    // setContent,
    item,
}: {
    onCancel: Function
    // content: string
    // setContent: Function
    item: any
}) => {
    const [content, setContent] = useState('')

    const { notification } = useNotification()

    const [addDocument, addDocumentResult] = AdminApi.Documents.addDocuments()

    useEffect(() => {
        if (addDocumentResult.isSuccess) {
            notification.success({
                title: 'Document Added',
                description: 'Document Added Successfully',
            })
            onCancel()
        }
    }, [addDocumentResult])

    const onConfirmClick = () => {
        const formData = new FormData()

        formData.append('content', content),
            formData.append('for', item.role),
            formData.append('fileType', item.type),
            formData.append('docType', item.docType),
            addDocument(formData)
    }

    return (
        <div>
            <ShowErrorNotifications result={addDocumentResult} />
            <Modal
                title={'Add Content'}
                subtitle={'Add Content'}
                onCancelClick={onCancel}
                loading={addDocumentResult.isLoading}
                onConfirmClick={onConfirmClick}
            >
                <ContentEditor content={content} setContent={setContent} />
            </Modal>
        </div>
    )
}
