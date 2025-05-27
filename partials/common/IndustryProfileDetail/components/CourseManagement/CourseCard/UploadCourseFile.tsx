import { ActionButton, AuthorizedUserComponent, Tooltip } from '@components'
import { UserRoles } from '@constants'
import { useAssessmentDocumentsView } from '@partials/common/StudentProfileDetail/components'
import { ReactElement, useState } from 'react'
import { FaCloudUploadAlt, FaEye } from 'react-icons/fa'
import { UploadCourseFileModal } from '../modal'

const UploadCourseFile = ({ approval }: { approval: any }) => {
    const { onFileClicked, documentsViewModal } = useAssessmentDocumentsView()

    const [modal, setModal] = useState<ReactElement | null>(null)

    const onCancel = () => setModal(null)

    const onUploadFile = () => {
        setModal(
            <UploadCourseFileModal onCancel={onCancel} approval={approval} />
        )
    }

    const extension = (fileName: string) =>
        fileName
            ?.replaceAll('{"', '')
            .replaceAll('"}', '')
            ?.split('.')
            .reverse()[0]
    return (
        <div className=" bottom-0 right-2">
            {documentsViewModal}
            {modal}

            {approval?.file ? (
                <div className="flex items-start gap-x-1">
                    <div className="relative group">
                        <ActionButton
                            Icon={FaEye}
                            onClick={() => {
                                onFileClicked({
                                    ...approval,
                                    extension: extension(approval?.file),
                                    file: approval?.file
                                        .replaceAll('{"', '')
                                        .replaceAll('"}', ''),
                                    type: 'all',
                                    showEdit: false,
                                    showDownload: false,
                                })
                            }}
                        />

                        <Tooltip>View Checklist</Tooltip>
                    </div>
                    <AuthorizedUserComponent
                        roles={[UserRoles.ADMIN, UserRoles.SUBADMIN]}
                        isAssociatedWithRto={false}
                    >
                        <div className="relative group">
                            {/* <FileUpload
                                onChange={(doc: File) => {
                                    onUploadCourseFile({
                                        id: approval?.id,
                                        doc,
                                    })
                                }}
                                name={'attachmentsssss'}
                                component={FileUploadAction}
                                limit={Number(1111111111)}
                                showError={false}
                            /> */}
                            <ActionButton
                                Icon={FaCloudUploadAlt}
                                onClick={onUploadFile}
                            />
                            <Tooltip>Edit Checklist File</Tooltip>
                        </div>
                    </AuthorizedUserComponent>
                </div>
            ) : (
                <AuthorizedUserComponent
                    roles={[UserRoles.ADMIN, UserRoles.SUBADMIN]}
                    isAssociatedWithRto={false}
                >
                    <div className="relative group">
                        {/* <FileUpload
                            onChange={(doc: File) => {
                                onUploadCourseFile({ id: approval?.id, doc })
                            }}
                            showError={false}
                            name={'attachmentssss'}
                            component={FileUploadAction}
                            limit={Number(1111111111)}
                        /> */}
                        <ActionButton
                            Icon={FaCloudUploadAlt}
                            onClick={onUploadFile}
                        />
                        <Tooltip>Upload Checklist File</Tooltip>
                    </div>
                </AuthorizedUserComponent>
            )}
        </div>
    )
}

export default UploadCourseFile
