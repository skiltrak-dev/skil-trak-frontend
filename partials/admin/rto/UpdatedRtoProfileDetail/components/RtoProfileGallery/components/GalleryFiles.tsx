import React from 'react'
import { CommonApi } from '@queries'
import { DocumentsView } from '@hooks'
import { GalleryFileCard } from './GalleryFileCard'
import { LoadingAnimation, NoData } from '@components'

export const GalleryFiles = ({
    selectedStudent,
}: {
    selectedStudent: number | null
}) => {
    const studentAllAssessmentFiles =
        CommonApi.StudentAssessmentFiles.useAllStudentAssessmentFiles(
            Number(selectedStudent),
            { skip: !selectedStudent }
        )

    const { onFileClicked, documentsViewModal } = DocumentsView()

    return (
        <div className="h-[370px] overflow-auto custom-scrollbar">
            {documentsViewModal}
            {studentAllAssessmentFiles.isError && (
                <NoData text={'Some Technical Issue'} isError />
            )}
            {studentAllAssessmentFiles.isLoading ||
            studentAllAssessmentFiles.isFetching ? (
                <LoadingAnimation size={60} />
            ) : studentAllAssessmentFiles.data &&
              studentAllAssessmentFiles.data?.length > 0 ? (
                <div className="grid grid-cols-6 gap-1">
                    {studentAllAssessmentFiles?.data.map(
                        (file: any, i: number) => (
                            <GalleryFileCard
                                key={file?.id}
                                file={file}
                                index={i}
                                filename={file?.filename}
                                fileUrl={file?.file}
                                selected={selectedStudent === file?.id}
                                type={file?.type}
                                onClick={(e: any) => onFileClicked(e)}
                            />
                        )
                    )}
                </div>
            ) : (
                !studentAllAssessmentFiles.isError && (
                    <NoData text={'No Files'} />
                )
            )}
        </div>
    )
}
