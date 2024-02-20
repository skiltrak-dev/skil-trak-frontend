import { AssessmentFolderFileCard, NoData, Typography } from '@components'
import { FolderFilesUpload, ShowSubmittionButton } from '@partials/sub-admin'
import {
    SubAdminApi,
    useGetAssessmentResponseQuery,
    useGetSubAdminStudentDetailQuery,
} from '@queries'
import { AssessmentEvidenceDetailType, Course, Student } from '@types'
import { getCourseResult } from '@utils'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { AssessmentFilesUpload } from './AssessmentFilesUpload'
import { DocumentsView } from '@hooks'
import { PulseLoader } from 'react-spinners'
import { AiFillDelete } from 'react-icons/ai'
import { RiDeleteBinLine } from 'react-icons/ri'
import { InitiateSign } from './InitiateSign'

export const AssessmentFiles = ({
    course,
    selectedFolder,
    student,
}: {
    student: Student
    course: Course | null
    selectedFolder: AssessmentEvidenceDetailType | null
}) => {
    const [selected, setSelected] = useState<any>(null)
    const { onFileClicked, documentsViewModal } = DocumentsView()

    const router = useRouter()

    const profile = useGetSubAdminStudentDetailQuery(Number(router.query?.id), {
        skip: !router.query?.id,
        refetchOnMountOrArgChange: true,
    })

    const results = getCourseResult(course?.results)

    const getAssessmentResponse = useGetAssessmentResponseQuery(
        {
            selectedFolder: Number(selectedFolder?.id),
            student: Number(student?.user?.id),
        },
        {
            skip: !selectedFolder || !student,
        }
    )
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
                <AssessmentFilesUpload
                    results={results}
                    studentId={Number(router.query?.id)}
                    selectedFolder={selectedFolder}
                />
            </div>

            {/*  */}

            <div className="h-[65%] overflow-auto custom-scrollbar px-5 py-3">
                {filteredFiles && filteredFiles?.length > 0 ? (
                    <div className=" grid grid-cols-6 gap-1.5">
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
                {getAssessmentResponse?.isSuccess ? (
                    <InitiateSign
                        student={student}
                        courseId={course?.id}
                        folder={selectedFolder}
                    />
                ) : null}
            </div>
            <ShowSubmittionButton
                results={results}
                getFolders={getFolders}
                selectedCourse={course}
                studentProfile={student}
                isFilesUploaded={isFilesUploaded}
                isResubmittedFiles={isResubmittedFiles}
            />
        </div>
    )
}
