import React, { useEffect, useState } from 'react'

import { FileUpload } from '@hoc'
import { AdminApi } from '@queries'
import { Button, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'

export const UploadDoc = ({ text, item }: { text: string; item: any }) => {
    const { notification } = useNotification()

    const [addDocument, addDocumentResult] = AdminApi.Documents.addDocuments()

    useEffect(() => {
        if (addDocumentResult.isSuccess) {
            notification.success({
                title: 'Document Added',
                description: 'Document Added Successfully',
            })
        }
    }, [addDocumentResult])

    const onFileUpload = (file: File) => {
        const formData = new FormData()

        formData.append('file', file),
            formData.append('for', item.role),
            formData.append('fileType', item.type),
            formData.append('docType', item.docType),
            addDocument(formData)
    }

    const UploadButton = ({ name }: { name: string }) => {
        return (
            <Button
                outline
                loading={addDocumentResult.isLoading}
                disabled={addDocumentResult.isLoading}
            >
                <label htmlFor={`file_id_${name}`} className="cursor-pointer">
                    {item?.file ? 'Change' : 'Upload'}
                </label>
            </Button>
        )
    }

    return (
        <div>
            <ShowErrorNotifications result={addDocumentResult} />
            <FileUpload
                onChange={(doc: any) => {
                    onFileUpload(doc)
                }}
                name={item.name + item.docType}
                component={UploadButton}
                acceptTypes={['jpg', 'jpeg', 'png']}
            />
        </div>
    )
}
