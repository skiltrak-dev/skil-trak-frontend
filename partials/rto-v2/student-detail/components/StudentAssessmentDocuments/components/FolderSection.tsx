import { RtoV2Api } from '@queries'
import { FolderCard, FolderHeaderCard } from '../cards'
import { getStatusConfig } from '../utils/getStatusConfig'
import { Course, Folder, Student } from '@types'
import { LoadingAnimation, NoData } from '@components'
import { useSelector } from 'react-redux'

interface FolderSectionProps {
    title: string
    description: string
    stats: any
    sectionType: 'industry' | 'course'

    course: Course
    filterKey: string
}

export const FolderSection = ({
    course,
    title,
    stats,
    filterKey,
    sectionType,
    description,
}: FolderSectionProps) => {
    const { id: studentId } = useSelector(
        (state: any) => state?.student?.studentDetail
    )

    const documents = RtoV2Api.StudentDocuments.getStudentDocumentsList(
        {
            search: `${filterKey}:true`,
            studentId,
            courseId: course?.id,
        },
        {
            skip: !studentId || !course.id,
        }
    )

    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
            <FolderHeaderCard
                title={title}
                description={description}
                courseStats={stats}
            />

            {documents.isError && (
                <NoData text={'There is some technical issue!'} isError />
            )}
            {documents.isLoading || documents.isFetching ? (
                <div className="min-h-[inherit] flex justify-center items-center">
                    <LoadingAnimation />
                </div>
            ) : documents?.isSuccess &&
              documents.data &&
              documents?.data?.length > 0 ? (
                <div
                    className={`p-3 space-y-${
                        sectionType === 'industry' ? '3' : '2'
                    }`}
                >
                    {documents?.data?.map((folder: Folder) => {
                        const config = getStatusConfig(
                            folder?.studentResponse?.[0]?.status
                        )

                        return (
                            <FolderCard
                                key={folder.id}
                                folder={folder}
                                config={config}
                            />
                        )
                    })}
                </div>
            ) : (
                documents.isSuccess && (
                    <NoData text="There is no document list" />
                )
            )}
        </div>
    )
}
