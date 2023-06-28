import {
    CourseCard,
    LoadingAnimation,
    NoData,
    Typography,
    AssessmentFolderCard,
    AssessmentResponse,
} from '@components'
import { useNotification } from '@hooks'
import {
    useStudentAssessmentCoursesQuery,
    IndustryApi,
    useGetAssessmentResponseQuery,
} from '@queries'
import { getUserCredentials } from '@utils'
import React, { useEffect, useState } from 'react'

export const AssessmentsEvidence = ({
    studentId,
    studentUserId,
    courses,
}: {
    studentId: number
    studentUserId: number
    courses: any
}) => {
    const [selectedCourse, setSelectedCourse] = useState<any | null>(null)
    const [selectedFolder, setSelectedFolder] = useState<any | null>(null)

    const { notification } = useNotification()

    const getFolders = IndustryApi.Workplace.useAssessmentFolders(
        { courseId: Number(selectedCourse?.id), studentId: Number(studentId) },
        {
            skip: !selectedCourse,
        }
    )

    const getAssessmentResponse = IndustryApi.Workplace.useFoldersResponse(
        {
            selectedFolderId: Number(selectedFolder?.id),
            studentId: Number(studentUserId),
        },
        { skip: !selectedFolder || !studentUserId }
    )
    useEffect(() => {
        if (courses) {
            setSelectedCourse(
                selectedCourse
                    ? courses?.find((c: any) => c?.id === selectedCourse?.id)
                    : courses[0]
            )
        }
    }, [courses])

    useEffect(() => {
        if (getFolders.isSuccess) {
            setSelectedFolder(selectedFolder || getFolders?.data[0])
        }
    }, [getFolders])

    return (
        <div className="mt-5">
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
                        'No Assessment Courses Were Found or No Submission from Student recived yet'
                    }
                />
            )}

            {/* Assessment Evidence Folders */}
            {courses && courses?.length > 0 && (
                <div>
                    <div className="flex justify-between items-center">
                        <Typography variant={'label'} color={'text-gray-700'}>
                            <span className="font-bold text-black">
                                Assessment Submission
                            </span>{' '}
                            - Submission #
                            {/* {selectedCourse?.results[0]?.totalSubmission} */}
                        </Typography>
                        {/* <Typography variant={'label'} color={'text-gray-500'}>
                            Assessor:{' '}
                            <span className="font-semibold text-black">
                                {getUserCredentials()?.name}
                            </span>
                        </Typography> */}
                    </div>
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
                                    {selectedFolder?.name ||
                                        'No Folder Selected'}
                                </Typography>
                            </div>

                            <div className="bg-white h-full overflow-auto">
                                {getFolders?.isLoading ||
                                getFolders.isFetching ? (
                                    <div className="flex flex-col justify-center items-center gap-y-2 py-5">
                                        <LoadingAnimation size={50} />
                                        <Typography variant={'label'}>
                                            Folders Loading
                                        </Typography>
                                    </div>
                                ) : getFolders?.data &&
                                  getFolders?.data?.length > 0 ? (
                                    getFolders?.data?.map((assessment: any) => (
                                        <AssessmentFolderCard
                                            key={assessment?.id}
                                            id={assessment?.id}
                                            name={assessment?.name}
                                            // isActive={folder.isActive}
                                            selectedFolderId={
                                                selectedFolder?.id
                                            }
                                            response={
                                                assessment?.studentResponse[0]
                                            }
                                            onClick={() => {
                                                setSelectedFolder(assessment)
                                            }}
                                            assessment
                                        />
                                    ))
                                ) : (
                                    <NoData text={'No Assessment were found'} />
                                )}
                            </div>
                        </div>

                        {/* Assessment Response */}
                        <div className="col-span-2 border border-gray-300 overflow-hidden">
                            <AssessmentResponse
                                studentId={studentId}
                                folder={selectedFolder}
                                assessmentEvidenceView={false}
                                getAssessmentResponse={getAssessmentResponse}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
