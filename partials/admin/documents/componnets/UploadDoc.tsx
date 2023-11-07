import React, { useEffect, useState } from 'react'

import { FileUpload } from '@hoc'
import { AdminApi } from '@queries'
import { Button, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'

export const UploadDoc = ({
    loading,
    text,
    item,
    onAddDocument,
}: {
    loading: boolean
    onAddDocument: (val: any) => void
    text: string
    item: any
}) => {
    const onFileUpload = (file: File) => {
        const formData = new FormData()

        formData.append('file', file),
            formData.append('for', item.role),
            formData.append('fileType', item.type),
            formData.append('docType', item.docType),
            // addDocument(formData)
            // setIsLoading(item)

            onAddDocument(formData)
        // onFileSelected()
    }

    const UploadButton = ({ name }: { name: string }) => {
        return (
            <Button outline loading={loading} disabled={loading}>
                <label htmlFor={`file_id_${name}`} className="cursor-pointer">
                    {item?.file ? 'Change' : 'Upload'}
                </label>
            </Button>
        )
    }

    return (
        <div>
            <FileUpload
                onChange={onFileUpload}
                name={item.name + item.docType}
                component={UploadButton}
                acceptTypes={['jpg', 'jpeg', 'png']}
            />
        </div>
    )
}
