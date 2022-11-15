import React from 'react'

import { LoadingAnimation } from '@components'

// hoc
import { FileUpload } from '@hoc'

// query
import { useUploadDocumentsMutation } from '@queries'
import { DocumentCard } from '../DocumentCard'

const Loading = () => {
    return (
        <div className="bg-gray-200 w-full py-1 rounded-md">
            <LoadingAnimation size={28} />
        </div>
    )
}

export const UploadDocs = ({ requiredDoc }: any) => {
    const [uploadDocs, uploadDocsResult] = useUploadDocumentsMutation()

    return (
        <FileUpload
            onChange={(docs: any) => {
                const formData = new FormData()
                docs.forEach((doc: any) => {
                    formData.append(requiredDoc?.folder?.name, doc)
                })
                uploadDocs({
                    id: requiredDoc.id,
                    body: formData,
                })
            }}
            name={requiredDoc?.folder?.name}
            component={uploadDocsResult?.isLoading ? Loading : DocumentCard}
            limit={requiredDoc?.folder?.capacity}
            acceptTypes={['pdf']}
            multiple={requiredDoc?.folder?.capacity > 1}
        />
    )
}
