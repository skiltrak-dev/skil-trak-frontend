import React from 'react'

import { LoadingAnimation, ShowErrorNotifications } from '@components'
import { RequiredDocsCard } from '@partials/common'

// query
import { useUploadDocumentsMutation } from '@queries'

const Loading = () => {
    return (
        <div className="bg-gray-200 w-full py-1 rounded-md">
            <LoadingAnimation size={28} />
        </div>
    )
}

export const UploadDocs = ({ requiredDoc, workplaceId }: any) => {
    const [uploadDocs, uploadDocsResult] = useUploadDocumentsMutation()

    const onChange = (docs: any) => {
        const formData = new FormData()
        docs?.forEach((doc: any) => {
            formData.append(requiredDoc?.folder?.name, doc)
        })
        uploadDocs({
            workplaceId,
            id: requiredDoc.id,
            body: formData,
        })
    }

    return (
        <>
            <ShowErrorNotifications result={uploadDocsResult} />

            {uploadDocsResult.isLoading ? (
                <div className="bg-gray-200 w-full py-1 rounded-md">
                    <LoadingAnimation size={28} />
                </div>
            ) : (
                <RequiredDocsCard
                    onChange={(e: any) => {
                        onChange(e)
                    }}
                    requiredDoc={requiredDoc}
                    name={requiredDoc?.folder?.name}
                    capacity={requiredDoc?.folder?.capacity}
                    uploadedDocs={
                        requiredDoc?.uploaded
                            ? requiredDoc?.uploaded?.length
                            : 0
                    }
                />
            )}

            {/* <FileUpload
                onChange={(docs: any) => {
                    const formData = new FormData()
                    docs?.forEach((doc: any) => {
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
            /> */}
        </>
    )
}
