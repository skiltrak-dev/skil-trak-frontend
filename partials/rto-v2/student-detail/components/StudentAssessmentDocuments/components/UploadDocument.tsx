import { Button, ShowErrorNotifications } from '@components'
import { useNotification } from '@hooks'
import { RtoV2Api } from '@queries'
import { Folder } from '@types'
import { Upload } from 'lucide-react'
import React, { useRef } from 'react'
import { useAppSelector } from '@redux/hooks'

export const UploadDocument = ({ folder }: { folder: Folder }) => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [uploadDocument, uploadDocumentResult] =
        RtoV2Api.StudentDocuments.uploadStudentDocumentFile()

    const studentId = useAppSelector(
        (state) => state?.student?.studentDetail?.id ?? 0
    )

    const { notification } = useNotification()

    const handleButtonClick = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0]
        if (file) {
            const formData = new FormData()
            formData.append('file', file)
            const res: any = await uploadDocument({
                stdId: Number(studentId),
                folderId: folder?.id ?? 0,
                body: formData,
            })

            if (res?.data) {
                notification.success({
                    title: 'Document Uploaded',
                    description: 'Document Uploaded Successfully',
                })
            }
            // TODO: Call upload API with file
            // uploadDocument({ file, folderId: folder.id })
        }
    }

    return (
        <>
            <ShowErrorNotifications result={uploadDocumentResult} />
            <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileChange}
                className="hidden"
                accept="*/*"
            />
            <Button
                onClick={handleButtonClick}
                className="!py-1 !rounded-sm"
                variant="primaryNew"
                loading={uploadDocumentResult.isLoading}
                disabled={uploadDocumentResult.isLoading}
            >
                <Upload className="w-4 h-4 mr-2" />
                Add File
            </Button>
        </>
    )
}
