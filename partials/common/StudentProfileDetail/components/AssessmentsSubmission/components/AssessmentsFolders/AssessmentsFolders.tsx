import { LoadingAnimation, Typography } from '@components'
import React, { useEffect } from 'react'
import { FolderCard } from '../../Cards'
import { useGetAssessmentEvidenceDetailQuery } from '@queries'
import { useRouter } from 'next/router'
import { AssessmentEvidenceDetailType, Folder } from '@types'

export const AssessmentsFolders = ({
    courseId,
    selectedFolder,
    onSelectFolder,
}: {
    courseId: number | null | undefined
    selectedFolder: AssessmentEvidenceDetailType | null
    onSelectFolder: (folder: AssessmentEvidenceDetailType) => void
}) => {
    const router = useRouter()
    const getFolders = useGetAssessmentEvidenceDetailQuery(
        {
            courseId: Number(courseId),
            studentId: Number(router.query?.id),
        },
        {
            skip: !courseId || !router.query?.id,
        }
    )

    useEffect(() => {
        if (
            getFolders?.data &&
            getFolders?.isSuccess &&
            getFolders?.data?.length > 0
        ) {
            const folder = getFolders?.data?.find(
                (folder: any) => folder?.id === Number(selectedFolder?.id)
            )
            onSelectFolder(
                (selectedFolder && folder
                    ? folder
                    : getFolders?.data?.[0]) as AssessmentEvidenceDetailType
            )
        }
    }, [getFolders])

    return (
        <div className="px-4 h-[inherit]">
            <Typography variant="small" medium>
                Assessment Submission  - Submission #0
            </Typography>

            <div className="mt-4 h-[inherit]">
                {getFolders?.isLoading ? (
                    <div className="flex flex-col items-center justify-center h-60">
                        <LoadingAnimation size={60} />
                        <Typography variant="label">
                            Notes Loading...
                        </Typography>
                    </div>
                ) : (
                    <div className="flex flex-col gap-y-2.5 h-[inherit] overflow-auto custom-scrollbar pb-2">
                        {getFolders?.data?.map(
                            (folder: AssessmentEvidenceDetailType) => (
                                <FolderCard
                                    folder={folder}
                                    key={folder?.id}
                                    active={selectedFolder?.id === folder?.id}
                                    onClick={() => onSelectFolder(folder)}
                                />
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
