import { useEffect, useState } from 'react'

//components
import {
    CourseCard,
    LoadingAnimation,
    NoData,
    Typography,
    AssessmentFolderCard,
    AssessmentResponse,
} from '@components'

// queries
import { useNotification } from '@hooks'

import {
    useGetAssessmentEvidenceDetailQuery,
    IndustryApi,
    useGetAssessmentResponseQuery,
    useStudentAssessmentCoursesQuery,
} from '@queries'
import { getUserCredentials } from '@utils'
import { Course } from '@types'

export const RequiredDocs = ({
    studentId,
    studentUserId,
    courses,
}: {
    studentId: string | string[] | undefined
    studentUserId: string | string[] | undefined
    courses: Course[]
}) => {
    const [selectedCourse, setSelectedCourse] = useState<any | null>(null)
    const [selectedFolder, setSelectedFolder] = useState<any | null>(null)

    const getRequiredDocs = IndustryApi.Workplace.useRequiredDocs(
        { courseId: Number(selectedCourse?.id) },
        {
            skip: !selectedCourse,
        }
    )

    const getDocsResponse = IndustryApi.Workplace.useResponse(
        {
            selectedFolderId: Number(selectedFolder?.id),
            studentId: Number(studentUserId),
        },
        { skip: !selectedFolder || !studentUserId }
    )

    useEffect(() => {
        if (courses && courses?.length > 0) {
            setSelectedCourse(
                selectedCourse
                    ? courses?.find((c: any) => c?.id === selectedCourse?.id)
                    : courses[0]
            )
        }
    }, [courses])

    useEffect(() => {
        if (getRequiredDocs.isSuccess && getRequiredDocs.data) {
            setSelectedFolder(selectedFolder || getRequiredDocs?.data[0])
        }
    }, [getRequiredDocs])

    return (
        <div className="mb-10 mt-5">
            {courses && courses?.length > 0 ? (
                <div className="mb-3 grid grid-cols-3 gap-2">
                    {courses?.map((course: any) => (
                        <CourseCard
                            key={course.id}
                            id={course.id}
                            code={course.code}
                            title={course.title}
                            isActive={course.isActive}
                            coordinator={getUserCredentials()?.name}
                            selectedCourseId={selectedCourse?.id}
                            onClick={() => {
                                setSelectedCourse(course)
                            }}
                        />
                    ))}
                </div>
            ) : (
                <NoData
                    text={
                        'No Required Docs Were Found or No Submission from Student recived yet'
                    }
                />
            )}

            {/* Assessment Evidence Folders */}
            {courses && courses?.length > 0 && (
                <div>
                    {/*  */}
                    <div className="grid grid-cols-3 h-[450px]">
                        <div className="border border-gray-300 border-r-transparent h-full overflow-hidden">
                            <div className="p-2">
                                <Typography
                                    variant={'small'}
                                    color={'text-gray-700'}
                                >
                                    Selected Folder
                                </Typography>
                                <Typography variant={'label'}>
                                    {selectedFolder?.folder?.name ||
                                        'No Folder Selected'}
                                </Typography>
                            </div>

                            <div className="bg-white h-full overflow-auto">
                                {getRequiredDocs?.isLoading ||
                                getRequiredDocs.isFetching ? (
                                    <div className="flex flex-col justify-center items-center gap-y-2 py-5">
                                        <LoadingAnimation size={50} />
                                        <Typography variant={'label'}>
                                            Folders Loading
                                        </Typography>
                                    </div>
                                ) : getRequiredDocs?.data &&
                                  getRequiredDocs?.data?.length > 0 ? (
                                    getRequiredDocs?.data?.map(
                                        (assessment: any) => (
                                            <AssessmentFolderCard
                                                key={assessment?.id}
                                                id={assessment?.id}
                                                name={assessment?.folder?.name}
                                                // isActive={folder.isActive}
                                                selectedFolderId={
                                                    selectedFolder?.id
                                                }
                                                onClick={() => {
                                                    setSelectedFolder(
                                                        assessment
                                                    )
                                                }}
                                            />
                                        )
                                    )
                                ) : (
                                    <NoData text={'No Assessment were found'} />
                                )}
                            </div>
                        </div>

                        {/* Assessment Response */}
                        <div className="col-span-2 border border-gray-300 overflow-hidden">
                            <AssessmentResponse
                                getAssessmentResponse={getDocsResponse}
                                folder={selectedFolder?.folder}
                                studentId={studentId}
                                assessmentEvidenceView={false}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
