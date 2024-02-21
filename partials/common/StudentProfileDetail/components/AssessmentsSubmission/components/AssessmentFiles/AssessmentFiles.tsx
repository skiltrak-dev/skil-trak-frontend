import { AssessmentFolderFileCard, NoData, Typography } from '@components'
import { DocumentsView } from '@hooks'
import { SubAdminApi } from '@queries'
import { AssessmentEvidenceDetailType, Course } from '@types'
import { getCourseResult } from '@utils'
import { useRouter } from 'next/router'
import { ReactNode, useState } from 'react'
import { RiDeleteBinLine } from 'react-icons/ri'
import { PulseLoader } from 'react-spinners'
import { AssessmentFilesUpload } from './AssessmentFilesUpload'

export const AssessmentFiles = ({
    course,
    children,
    selectedFolder,
    uploadAssessment = true,
    getAssessmentResponse,
}: {
    course: Course | null
    children?: ReactNode
    getAssessmentResponse: any
    uploadAssessment?: boolean
    selectedFolder: AssessmentEvidenceDetailType | null
}) => {
    const [selected, setSelected] = useState<any>(null)
    const { onFileClicked, documentsViewModal } = DocumentsView()

    const router = useRouter()

    const result = getCourseResult(course?.results)

    const [archiveFile, archiveFileResult] =
        SubAdminApi.AssessmentEvidence.archiveUploadedFile()

    const filteredFiles = getAssessmentResponse?.data?.files?.filter(
        (file: any) => file
    )

    const deleteUploadedFileAction = (fileId: number) => {
        return (
            <div
                className="bg-white p-1 rounded-md shadow-md cursor-pointer"
                onClick={() => {
                    archiveFile(fileId)
                }}
            >
                {archiveFileResult?.isLoading &&
                archiveFileResult?.originalArgs === fileId ? (
                    <PulseLoader size={3} />
                ) : (
                    <RiDeleteBinLine className="text-red-500 text-sm" />
                )}
            </div>
        )
    }
    return (
        <div className="h-[inherit]">
            {documentsViewModal}
            <div className="py-3 px-4 flex items-center justify-between border-b border-secondary-dark">
                <div>
                    <Typography variant="label" medium>
                        {selectedFolder?.name}
                    </Typography>
                    <Typography variant="xxs">
                        Uploaded 
                        {getAssessmentResponse?.data?.files?.length || 0}/
                        {selectedFolder?.capacity || 10}
                    </Typography>
                </div>
                {uploadAssessment ? (
                    <AssessmentFilesUpload
                        results={result}
                        studentId={Number(router.query?.id)}
                        selectedFolder={selectedFolder}
                    />
                ) : null}
            </div>

            <div className="h-[inherit] overflow-auto custom-scrollbar px-5 py-3">
                {getAssessmentResponse.isError && (
                    <NoData text="There is some technical issue!" />
                )}
                {filteredFiles && filteredFiles?.length > 0 ? (
                    <div className="grid grid-cols-6 gap-1.5">
                        {filteredFiles?.map((file: any, i: number) => (
                            <AssessmentFolderFileCard
                                key={file?.id}
                                file={file}
                                index={i}
                                filename={file?.filename}
                                fileUrl={file?.file}
                                type={file?.type}
                                selected={selected?.id === file?.id}
                                onClick={onFileClicked}
                                deleteAction={deleteUploadedFileAction}
                            />
                        ))}
                    </div>
                ) : (
                    getAssessmentResponse.isSuccess && (
                        <NoData text="There is no Assessment Files!" />
                    )
                )}
                {children}
            </div>
        </div>
    )
}
