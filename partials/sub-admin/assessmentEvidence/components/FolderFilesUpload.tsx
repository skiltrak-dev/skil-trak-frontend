import { Result } from '@constants'
import { SignAgreement } from '@partials/sub-admin/workplace/components/Industries/components/Actions/components'
import React, { useEffect } from 'react'
import { FileUpload } from '@hoc'
import { getDocType } from '@components/sections/student/AssessmentsContainer'
import { UploadFile } from '@components/sections/student/AssessmentsContainer/AssessmentsEvidence/AssessmentFolderDetailX/UploadFile'
import { SubAdminApi } from '@queries'
import { useNotification } from '@hooks'
import { ShowErrorNotifications } from '@components'

export const FolderFilesUpload = ({
    results,
    AgreementFile,
    selectedFolder,
    studentId,
    studentProfile,
    appliedIndustry,
    latestWorkplace,
}: {
    appliedIndustry: any
    studentProfile: any
    results: any
    studentId: number
    selectedFolder: any
    AgreementFile: string
    latestWorkplace: any
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
            formData.append(
                selectedFolder?.id === AgreementFile
                    ? 'file'
                    : `${selectedFolder?.name}`,
                doc
            )
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

            {/* <FileUpload
                onChange={onUploadDocs}
                name={'folder?.name'}
                component={AddFileButton}
                multiple
                limit={
                    selectedFolder?.id === AgreementFile
                        ? 10
                        : Number(selectedFolder?.capacity) -
                          Number(
                              selectedFolder?.studentResponse?.length > 0
                                  ? selectedFolder?.studentResponse[0]?.files
                                        ?.length
                                  : 0
                          )
                }
                acceptTypes={getDocType(selectedFolder?.type)}
            /> */}
            {results?.result !== Result.Competent && (
                <div className="flex items-center gap-x-2 mb-1">
                    <div>
                        {selectedFolder &&
                            results !== Result.NotSubmitted &&
                            (selectedFolder?.id === AgreementFile ? (
                                <SignAgreement
                                    studentId={Number(studentProfile?.data?.id)}
                                    appliedIndustryId={appliedIndustry?.id}
                                    student={studentProfile?.data}
                                    courses={latestWorkplace?.courses}
                                />
                            ) : selectedFolder ? (
                                <FileUpload
                                    onChange={onUploadDocs}
                                    name={'folder?.name'}
                                    component={AddFileButton}
                                    multiple
                                    limit={
                                        selectedFolder?.id === AgreementFile
                                            ? 10
                                            : Number(selectedFolder?.capacity) -
                                              Number(
                                                  selectedFolder
                                                      ?.studentResponse
                                                      ?.length > 0
                                                      ? selectedFolder
                                                            ?.studentResponse[0]
                                                            ?.files?.length
                                                      : 0
                                              )
                                    }
                                    acceptTypes={getDocType(
                                        selectedFolder?.type
                                    )}
                                />
                            ) : null)}
                    </div>
                </div>
            )}
        </div>
    )
}
