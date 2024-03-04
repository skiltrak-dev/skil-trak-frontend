import { Result } from '@constants'
import { SignAgreement } from '@partials/sub-admin/workplace/components/Industries/components/Actions/components'
import React, { useEffect } from 'react'
import { FileUpload } from '@hoc'
import { getDocType } from '@components/sections/student/AssessmentsContainer'
import { UploadFile } from '@components/sections/student/AssessmentsContainer/AssessmentsEvidence/AssessmentFolderDetailX/UploadFile'
import { StudentApi } from '@queries'
import { useNotification } from '@hooks'
import { ShowErrorNotifications } from '@components'

export const TalentPoolRequiredDocsFilesUpload = ({
    selectedFolder,
    // talentPoolProfile,
}: {
    // talentPoolProfile: any
    selectedFolder: any
}) => {
    const { notification } = useNotification()

    const [uploadDocs, uploadDocsResult] =
        StudentApi.TalentPool.useUploadTalentPoolRequiredDocs()

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
            formData.append(`file`, doc)
        })

        // formData.append("talentPoolProfile", talentPoolProfile)
           
            uploadDocs({
                body: formData,
                folderId: selectedFolder?.id,
            })
   
    }

    return (
        <div>
            <ShowErrorNotifications result={uploadDocsResult} />
            <div className="flex items-center gap-x-2 mb-1">
                <div>
                    {selectedFolder && selectedFolder ? (
                        <FileUpload
                            onChange={onUploadDocs}
                            name='file'
                            component={AddFileButton}
                            multiple
                            limit={
                                Number(selectedFolder?.capacity) -
                                Number(
                                    selectedFolder?.talentPoolDocumentResponses?.length > 0
                                        ? selectedFolder?.talentPoolDocumentResponses[0]
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
        </div>
    )
}
