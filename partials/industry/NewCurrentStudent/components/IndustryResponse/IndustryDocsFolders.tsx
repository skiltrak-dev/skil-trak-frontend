import { LoadingAnimation, NoData, Typography } from '@components'
import { FolderCard } from '@partials/common/StudentProfileDetail/components/AssessmentsSubmission/Cards'
import { AssessmentEvidenceDetailType, Course, Student } from '@types'

export const IndustryDocsFolders = ({
    getFolders,
    student,
    course,
    selectedFolder,
    onSelectFolder,
}: {
    student: Student
    getFolders: any
    course: Course | null
    selectedFolder: AssessmentEvidenceDetailType | null
    onSelectFolder: (folder: AssessmentEvidenceDetailType) => void
}) => {
    return (
        <div className="px-4 h-[inherit]">
            <Typography variant="small" medium>
                Student Submissions
            </Typography>

            <div className="mt-4 h-[inherit]">
                {getFolders.isError && (
                    <NoData text="There is some technical issue!" isError />
                )}
                {getFolders?.isLoading ? (
                    <div className="flex flex-col items-center justify-center h-60">
                        <LoadingAnimation size={60} />
                        <Typography variant="label">
                            Notes Loading...
                        </Typography>
                    </div>
                ) : getFolders?.data && getFolders?.data?.length > 0 ? (
                    <div className="flex flex-col gap-y-2.5 h-[80%] overflow-auto custom-scrollbar pb-2">
                        {getFolders?.data?.map((folder: any) => (
                            <FolderCard
                                folder={folder?.folder}
                                key={folder?.id}
                                active={
                                    selectedFolder?.id === folder?.folder?.id
                                }
                                onClick={() => onSelectFolder(folder?.folder)}
                            />
                        ))}
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
