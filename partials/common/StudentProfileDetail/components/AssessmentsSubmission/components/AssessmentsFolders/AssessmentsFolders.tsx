import { LoadingAnimation, NoData, Typography } from '@components'
import { AssessmentEvidenceDetailType } from '@types'
import { useEffect } from 'react'
import { FolderCard } from '../../Cards'

export const AssessmentsFolders = ({
    getFolders,
    courseId,
    selectedFolder,
    onSelectFolder,
}: {
    getFolders: any
    courseId: number | null | undefined
    selectedFolder: AssessmentEvidenceDetailType | null
    onSelectFolder: (folder: AssessmentEvidenceDetailType) => void
}) => {
    return (
        <div className="px-4 h-[inherit]">
            <Typography variant="small" medium>
                Assessment Submission  - Submission #0
            </Typography>

            <div className="mt-4 h-[inherit]">
                {getFolders.isError && (
                    <NoData text="There is some technical issue!" />
                )}
                {getFolders?.isLoading ? (
                    <div className="flex flex-col items-center justify-center h-60">
                        <LoadingAnimation size={60} />
                        <Typography variant="label">
                            Notes Loading...
                        </Typography>
                    </div>
                ) : getFolders?.data && getFolders?.data?.length > 0 ? (
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
                ) : (
                    getFolders.isSuccess && (
                        <NoData text="There is no Assessment Folders!" />
                    )
                )}
            </div>
        </div>
    )
}
