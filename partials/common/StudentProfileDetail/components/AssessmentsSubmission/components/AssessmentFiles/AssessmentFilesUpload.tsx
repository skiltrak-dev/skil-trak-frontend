import { ShowErrorNotifications } from '@components'
import { getDocType } from '@components/sections/student/AssessmentsContainer'
import { UploadFile } from '@components/sections/student/AssessmentsContainer/AssessmentsEvidence/AssessmentFolderDetailX/UploadFile'
import { Result } from '@constants'
import { FileUpload } from '@hoc'
import { useNotification } from '@hooks'
import { SubAdminApi } from '@queries'
import { useEffect } from 'react'

export const AssessmentFilesUpload = ({
    results,
    selectedFolder,
    studentId,
}: {
    results: any
    studentId: number
    selectedFolder: any
}) => {
    const { notification } = useNotification()

    const [uploadDocs, uploadDocsResult] =
        SubAdminApi.AssessmentEvidence.uploadDocs()

    useEffect(() => {
        if (uploadDocsResult.isSuccess) {
            notification.success({
                title: 'Document Uploaded',
                description: 'Document Uploaded Successfully',
            })
        }
    }, [uploadDocsResult])

    const AddFileButton = ({ name }: { name: string }) => {
        return <UploadFile name={name} loading={uploadDocsResult.isLoading} />
    }

    const onUploadDocs = (docs: any) => {
        const formData = new FormData()

        const filteredDocs = [...docs]?.filter((doc) => {
            const docSize = doc?.size / 1024 / 1024
            return docSize <= 150
        })

        const fff = [...docs]?.filter((file: any) =>
            getDocType(selectedFolder?.type)?.includes(
                file?.type?.split('/')?.[1]
            )
        )

        if (filteredDocs?.length < docs?.length) {
            notification.warning({
                title: 'Files Removed',
                description: `${docs?.length - filteredDocs?.length} ${
                    docs?.length - filteredDocs?.length === 1
                        ? 'File was'
                        : 'Files were'
                } Removed because its size was greater than 50mb, try to upload the file which has less then 50mb size`,
            })
        }

        filteredDocs.forEach((doc: any) => {
            formData.append(`${selectedFolder?.name}`, doc)
        })

        if (filteredDocs?.length)
            uploadDocs({
                studentId,
                body: formData,
                folderId: selectedFolder?.id,
            })
    }

    return (
        <div>
            <ShowErrorNotifications result={uploadDocsResult} />
            {results?.result !== Result.Competent && (
                <div className="flex items-center gap-x-2 mb-1">
                    <div>
                        {selectedFolder &&
                        results !== Result.NotSubmitted &&
                        selectedFolder ? (
                            <FileUpload
                                onChange={onUploadDocs}
                                name={'folder?.name'}
                                component={AddFileButton}
                                multiple
                                limit={
                                    Number(selectedFolder?.capacity) -
                                    Number(
                                        selectedFolder?.studentResponse
                                            ?.length > 0
                                            ? selectedFolder?.studentResponse[0]
                                                  ?.files?.length
                                            : 0
                                    )
                                }
                                acceptTypes={getDocType(selectedFolder?.type)}
                                showError={false}
                            />
                        ) : null}
                    </div>
                </div>
            )}
        </div>
    )
}
