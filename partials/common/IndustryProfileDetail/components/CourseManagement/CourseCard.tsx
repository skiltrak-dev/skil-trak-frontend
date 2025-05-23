import {
    ActionButton,
    AuthorizedUserComponent,
    Tooltip,
    Typography,
} from '@components'
import { UserRoles } from '@constants'
import { FileUpload } from '@hoc'
import Modal from '@modals/Modal'
import { Pencil, Trash2 } from 'lucide-react'
import { FaCloudUploadAlt, FaEye, FaRegEdit } from 'react-icons/fa'
import { IoCheckmarkDoneOutline } from 'react-icons/io5'
import {
    AddPrevCourseDescription,
    DeleteCourseModal,
    EditCourseModal,
} from './modal'
import { SubAdminApi } from '@queries'
import { useNotification } from '@hooks'
import { useAssessmentDocumentsView } from '@partials/common/StudentProfileDetail/components'

export const CourseCard = ({ data, isPreviousCourses = false }: any) => {
    const [uploadFile, uploadFileResult] =
        SubAdminApi.Industry.uploadCourseDocForIndustry()

    const { notification } = useNotification()

    const onUploadCourseFile = async (id: number, doc: File) => {
        const formData = new FormData()
        formData.append('file', doc)
        const res: any = await uploadFile({ id, body: formData })

        if (res?.data) {
            notification.success({
                title: 'File Uploaded',
                description: 'File Uploaded Successfully',
            })
        }
    }

    const approvals = isPreviousCourses
        ? data?.courses || []
        : data?.industryCourseApprovals || []

    const isValidUrl = (url: any): boolean => {
        if (!url || typeof url !== 'string') return false

        try {
            // More comprehensive URL validation
            const parsedUrl = new URL(
                url.startsWith('http') ? url : `https://${url}`
            )

            // Additional checks
            return (
                parsedUrl.protocol === 'https:' ||
                parsedUrl.protocol === 'http:'
            )
        } catch {
            return false
        }
    }

    const getCleanExternalUrl = (url: string | undefined | null): string => {
        if (!url) return '#'

        // Trim whitespace
        url = url.trim()

        // Handle common prefixes and domains
        const cleanUrl = url
            .replace(/^(https?:\/\/)?(www\.)?(skiltrak\.com\.au\/)?/i, '')
            .replace(/\s+/g, '') // Remove any whitespace

        // If empty after cleaning, return fallback
        if (!cleanUrl) return '#'

        // Add protocol if missing
        return cleanUrl.startsWith('http') ? cleanUrl : `https://${cleanUrl}`
    }

    const onFileUpload = ({
        name,
        fileList,
    }: {
        name: string
        fileList: any
    }) => {
        return (
            <ActionButton
                variant="info"
                loading={uploadFileResult?.isLoading}
                disabled={uploadFileResult?.isLoading}
            >
                <label htmlFor={`file_id_${name}`} className="cursor-pointer">
                    <div className="relative group">
                        <FaCloudUploadAlt />
                        <Tooltip>Upload File</Tooltip>
                    </div>
                </label>
            </ActionButton>
        )
    }

    const { onFileClicked, documentsViewModal } = useAssessmentDocumentsView()

    const extension = (fileName: string) =>
        fileName
            ?.replaceAll('{"', '')
            .replaceAll('"}', '')
            ?.split('.')
            .reverse()[0]

    return (
        <>
            {documentsViewModal}
            <div className="flex flex-col gap-4 mt-4">
                {approvals?.map((approval: any, index: any) => (
                    <div
                        key={approval.id}
                        className="overflow-auto custom-scrollbar"
                    >
                        <div className="p-4 bg-gray-50 flex items-center gap-x-2 justify-between">
                            {/* <ApprovedSectorTooltip
                            courses={approval?.courses || []}
                        /> */}
                            <div className="flex items-center gap-x-2">
                                <Typography variant="subtitle">
                                    {approval?.course?.sector?.name ??
                                        approval?.sector?.name}
                                </Typography>

                                {!isPreviousCourses && (
                                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-md text-sm">
                                        Approved
                                    </span>
                                )}
                                <AuthorizedUserComponent
                                    roles={[
                                        UserRoles.ADMIN,
                                        UserRoles.SUBADMIN,
                                    ]}
                                >
                                    {!isPreviousCourses &&
                                        approval?.actionBy && (
                                            <div className="flex gap-x-1">
                                                <Typography
                                                    variant="xxs"
                                                    color="text-emerald-500"
                                                >
                                                    Approved by:{' '}
                                                    {approval?.actionBy?.name}
                                                </Typography>
                                            </div>
                                        )}
                                </AuthorizedUserComponent>
                            </div>

                            {!isPreviousCourses && (
                                <AuthorizedUserComponent
                                    roles={[UserRoles.ADMIN]}
                                >
                                    <div className="flex items-center gap-x-2">
                                        <Modal>
                                            <Modal.Open opens="editCourse">
                                                <Pencil className="cursor-pointer bg-[#047857] text-white rounded-lg p-1" />
                                            </Modal.Open>
                                            <Modal.Window name="editCourse">
                                                <EditCourseModal
                                                    course={approval}
                                                    courseRequestId={
                                                        approval?.id
                                                    }
                                                />
                                            </Modal.Window>
                                        </Modal>
                                        <Modal>
                                            <Modal.Open opens="updateCourseDescription">
                                                <Trash2 className="cursor-pointer bg-red-500 text-white rounded-lg p-1" />
                                            </Modal.Open>
                                            <Modal.Window name="updateCourseDescription">
                                                <DeleteCourseModal
                                                    // courseId={approval?.course?.id}
                                                    course={approval}
                                                />
                                            </Modal.Window>
                                        </Modal>
                                    </div>
                                </AuthorizedUserComponent>
                            )}
                        </div>
                        <div className="p-4 border rounded-md bg-[#95C6FB26] bg-opacity-15">
                            <div className="flex justify-between gap-x-12 w-full items-center mb-4">
                                <div className="flex items-center gap-x-1">
                                    <Typography
                                        variant="small"
                                        color="text-gray-600"
                                    >
                                        COURSES -{' '}
                                    </Typography>

                                    <Typography variant="muted">
                                        {approval?.course?.title ??
                                            approval?.title}{' '}
                                        -{' '}
                                        {approval?.course?.code ??
                                            approval?.code}
                                    </Typography>
                                </div>
                                <div>
                                    <div className="text-right">
                                        <Typography
                                            variant="small"
                                            color="text-gray-600"
                                        >
                                            Course Hours
                                        </Typography>
                                        <Typography variant="muted" center>
                                            {approval?.course?.hours ??
                                                approval?.hours}
                                        </Typography>
                                    </div>
                                </div>

                                {!isPreviousCourses &&
                                    !approval?.isPreviousCourse &&
                                    approval?.isCoordinatorAdded && (
                                        <div>
                                            <IoCheckmarkDoneOutline
                                                size={25}
                                                className="text-emerald-500"
                                            />
                                        </div>
                                    )}
                            </div>
                            <div
                                className={`${
                                    isPreviousCourses
                                        ? 'bg-red-500'
                                        : 'bg-emerald-700'
                                } relative text-white p-4 rounded-md w-full mb-4 flex gap-x-5 items-start`}
                            >
                                <div className="mb-2 whitespace-nowrap flex flex-col">
                                    <Typography variant="small" color="white">
                                        Action Perform
                                    </Typography>
                                    <Typography variant="label" color="white">
                                        Course Added
                                    </Typography>
                                </div>
                                <div>
                                    <Typography variant="label" color="white">
                                        Description
                                    </Typography>
                                    <div
                                        title={approval?.description}
                                        className="w-full"
                                    >
                                        <Typography
                                            variant="xs"
                                            color="text-white"
                                        >
                                            {approval?.description ||
                                                'No description available'}
                                        </Typography>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-x-2 w-full">
                                    {!isPreviousCourses && (
                                        <div className=" bottom-0 right-2">
                                            {approval?.file ? (
                                                <ActionButton
                                                    Icon={FaEye}
                                                    onClick={() => {
                                                        onFileClicked({
                                                            ...approval,
                                                            extension:
                                                                extension(
                                                                    approval?.file
                                                                ),
                                                            file: approval?.file
                                                                .replaceAll(
                                                                    '{"',
                                                                    ''
                                                                )
                                                                .replaceAll(
                                                                    '"}',
                                                                    ''
                                                                ),
                                                            type: 'all',
                                                            showEdit: false,
                                                        })
                                                    }}
                                                />
                                            ) : (
                                                <FileUpload
                                                    onChange={(doc: File) => {
                                                        onUploadCourseFile(
                                                            approval?.id,
                                                            doc
                                                        )
                                                    }}
                                                    name={'attachments'}
                                                    component={onFileUpload}
                                                    limit={Number(1111111111)}
                                                />
                                            )}
                                        </div>
                                    )}
                                    {isPreviousCourses && (
                                        <AuthorizedUserComponent
                                            roles={[UserRoles.SUBADMIN]}
                                        >
                                            <Modal>
                                                <Modal.Open opens="addCourseDescription">
                                                    <FaRegEdit
                                                        className="text-white cursor-pointer"
                                                        size={20}
                                                    />
                                                </Modal.Open>
                                                <Modal.Window name="addCourseDescription">
                                                    <AddPrevCourseDescription
                                                        courseId={approval?.id}
                                                    />
                                                </Modal.Window>
                                            </Modal>
                                        </AuthorizedUserComponent>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-between text-[10px]">
                                <AuthorizedUserComponent
                                    roles={[
                                        UserRoles.SUBADMIN,
                                        UserRoles.ADMIN,
                                    ]}
                                >
                                    <div>
                                        <span className="text-gray-600">
                                            Requested by:{' '}
                                        </span>
                                        <span>
                                            {approval?.addedBy?.name || 'N/A'}
                                        </span>
                                    </div>
                                </AuthorizedUserComponent>
                                {/* <div>
                                <span className="text-gray-600">
                                    Reference URL:{' '}
                                </span>
                                <span>{approval?.reference?.[0] || 'N/A'}</span>
                            </div> */}
                                <div>
                                    <span className="text-gray-600">
                                        Reference URL:{' '}
                                    </span>

                                    {isValidUrl(approval?.reference?.[0]) ? (
                                        <a
                                            href={getCleanExternalUrl(
                                                approval?.reference?.[0]
                                            )}
                                            className="text-blue-500 hover:underline"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {getCleanExternalUrl(
                                                approval?.reference?.[0]
                                            ) || 'N/A'}
                                        </a>
                                    ) : (
                                        <span>
                                            {approval?.reference?.[0] ?? 'N/A'}
                                        </span>
                                    )}
                                </div>
                                <div>
                                    <span className="text-gray-600">
                                        DATE:{' '}
                                    </span>
                                    <span>
                                        {approval?.updatedAt
                                            ? approval?.updatedAt?.slice(0, 10)
                                            : 'N/A'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
