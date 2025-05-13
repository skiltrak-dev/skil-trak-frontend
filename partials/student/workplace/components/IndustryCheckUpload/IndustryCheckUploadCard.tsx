import {
    Button,
    LoadingAnimation,
    ShowErrorNotifications,
    Typography,
} from '@components'
import { FileUpload } from '@hoc'
import { Course, Folder } from '@types'
import React, { ReactElement, useState } from 'react'
import { useNotification } from '@hooks'
import { useUploadFolderDocsMutation, SubAdminApi } from '@queries'
import { getDocType } from '@components/sections/student/AssessmentsContainer'
import { RequiredStar } from '@components/inputs/components'
import { IndustryChecksDescriptionModal } from '../../modal'

export const IndustryCheckUploadCard = ({
    otherDocs,
    folder,
    studentId,
}: {
    folder: Folder
    studentId?: number
    otherDocs?: boolean
}) => {
    const [modal, setModal] = useState<ReactElement | null>(null)

    const [uploadDocs, uploadDocsResult] = useUploadFolderDocsMutation()
    const [uploadOtherDocs, uploadOtherDocsResult] =
        SubAdminApi.AssessmentEvidence.uploadOtherDocs()

    const { notification } = useNotification()

    const Loading = () => {
        return <LoadingAnimation size={32} />
    }

    const Button1 = ({ name }: { name?: string }) => (
        <Button onClick={() => {}} variant="primaryNew">
            <label htmlFor={`file_id_${name}`} className="cursor-pointer">
                Change
            </label>
        </Button>
    )
    const Button2 = ({ name }: { name?: string }) => (
        <Button>
            <label htmlFor={`file_id_${name}`} className="cursor-pointer">
                Upload
            </label>
        </Button>
    )

    const formDataUpload = (docs: FileList) => {
        const formData = new FormData()

        const filteredDocs = [...docs]?.filter((doc) => {
            const docSize = doc?.size / 1024 / 1024
            return docSize <= 50
        })

        if (filteredDocs?.length < docs?.length) {
            notification.warning({
                title: 'Files Removed',
                description: `${docs?.length - filteredDocs?.length} ${
                    docs?.length - filteredDocs?.length === 1 ? 'File' : 'Files'
                } were Removed because its size was greater than 50mb, try to upload the file which has less then 50mb size`,
            })
        }
        filteredDocs.forEach((doc: any) => {
            formData.append(`file`, doc)
        })

        return { filteredDocs, formData }
    }

    const handleChange = async (docs: FileList) => {
        const { filteredDocs, formData } = formDataUpload(docs)

        if (filteredDocs?.length) {
            const res: any = await uploadDocs({
                id: folder?.id,
                body: formData,
            })
            if (res?.data) {
                notification.success({
                    title: 'Files Uploaded',
                    description: 'Files Uploaded Successfully!',
                })
            }
        }
    }

    const handleChangeOtherDocs = async (docs: FileList) => {
        const { filteredDocs, formData } = formDataUpload(docs)

        if (filteredDocs?.length) {
            const res: any = await uploadOtherDocs({
                studentId: Number(studentId),
                body: formData,
                folderId: Number(folder?.id),
            })
            if (res?.data) {
                notification.success({
                    title: 'Files Uploaded',
                    description: 'Files Uploaded Successfully!',
                })
            }
        }
    }

    const isLoading = otherDocs
        ? uploadOtherDocsResult.isLoading
        : uploadDocsResult.isLoading

    const onModalCancelClicked = () => setModal(null)

    const onViewRequirementClick = () => {
        setModal(
            <IndustryChecksDescriptionModal
                folder={folder}
                onCancel={onModalCancelClicked}
            />
        )
    }

    return (
        <>
            {modal}
            <ShowErrorNotifications result={uploadDocsResult} />
            <ShowErrorNotifications result={uploadOtherDocsResult} />
            <div className="bg-[#F2F2F2] rounded-md flex justify-between items-center px-5 py-1.5">
                <div className="flex items-start gap-x-1">
                    <Typography variant="small" medium>
                        {folder?.name}
                    </Typography>
                    {folder?.isRequired && (
                        <span className={`text-primary text-xl m-0 h-1 -mt-2`}>
                            *
                        </span>
                    )}
                </div>
                {folder?.studentResponse &&
                folder?.studentResponse?.length > 0 ? (
                    <div className="flex items-center gap-x-2">
                        <FileUpload
                            onChange={(docs: FileList) =>
                                otherDocs
                                    ? handleChangeOtherDocs(docs)
                                    : handleChange(docs)
                            }
                            name={folder?.name}
                            component={isLoading ? Loading : Button1}
                            multiple
                            limit={Number(1111111111)}
                            showError={false}
                        />
                        <Button text="Uploaded" disabled />
                    </div>
                ) : (
                    <div className="flex items-center gap-x-2">
                        {(folder?.description || folder?.link) && (
                            <div className="flex-shrink-0">
                                <Button
                                    text="Need Help"
                                    variant="primaryNew"
                                    onClick={() => {
                                        onViewRequirementClick()
                                    }}
                                />
                            </div>
                        )}
                        <FileUpload
                            onChange={(docs: any) =>
                                otherDocs
                                    ? handleChangeOtherDocs(docs)
                                    : handleChange(docs)
                            }
                            component={isLoading ? Loading : Button2}
                            name={folder?.name}
                            limit={11111}
                            acceptTypes={getDocType(folder?.type)}
                            multiple
                            showError={false}
                        />
                    </div>
                )}
            </div>
        </>
    )
}
