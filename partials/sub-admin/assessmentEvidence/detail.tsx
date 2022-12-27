import React from 'react'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

//components
import { CourseCard, LoadingAnimation, NoData, Typography } from '@components'
import { Actions, AssessmentFolderCard, AssessmentResponse } from './components'

// queries
import {
    useStudentCoursesQuery,
    useGetAssessmentResponseQuery,
    useGetAssessmentEvidenceDetailQuery,
} from '@queries'
import { getUserCredentials } from '@utils'

export const Detail = ({ studentId, studentUserId }: any) => {
    const [selectedCourse, setSelectedCourse] = useState<any | null>(null)
    const [selectedFolder, setSelectedFolder] = useState<any | null>(null)

    const pathname = useRouter()

    // query
    const studentCourses = useStudentCoursesQuery(Number(studentId), {
        skip: !studentId,
    })
    const getAssessmentDetails = useGetAssessmentEvidenceDetailQuery(
        String(selectedCourse?.id),
        {
            skip: !selectedCourse,
        }
    )

    const getAssessmentResponse = useGetAssessmentResponseQuery(
        {
            selectedFolder: Number(selectedFolder?.id),
            student: Number(studentUserId),
        },
        { skip: !selectedFolder || !studentUserId }
    )

    useEffect(() => {
        if (studentCourses.isSuccess) {
            setSelectedCourse(selectedCourse || studentCourses?.data[0])
        }
    }, [studentCourses])

    useEffect(() => {
        if (getAssessmentDetails.isSuccess) {
            setSelectedFolder(selectedFolder || getAssessmentDetails?.data[0])
        }
    }, [getAssessmentDetails])
    return (
        <div>
            {studentCourses?.isLoading ? (
                <div className="flex flex-col justify-center items-center gap-y-2">
                    <LoadingAnimation size={60} />
                    <Typography variant={'label'}>
                        Student Assessment Course Loading
                    </Typography>
                </div>
            ) : studentCourses?.data && studentCourses?.data?.length > 0 ? (
                <div className="mb-3 grid grid-cols-3 gap-x-2">
                    {studentCourses?.data?.map((course: any) => (
                        <CourseCard
                            key={course.id}
                            id={course.id}
                            code={course.code}
                            title={course.title}
                            isActive={course.isActive}
                            coordinator={'Saad'}
                            selectedCourseId={selectedCourse?.id}
                            onClick={() => {
                                setSelectedCourse(course)
                            }}
                        />
                    ))}
                </div>
            ) : (
                <NoData text={'No Assessment Courses Were Found'} />
            )}

            {/* Assessment Evidence Folders */}
            {studentCourses?.data && studentCourses?.data?.length > 0 && (
                <div>
                    <div className="flex justify-between items-center">
                        <Typography variant={'label'} color={'text-gray-700'}>
                            <span className="font-bold text-black">
                                Assessment Submission
                            </span>{' '}
                            - Submission #
                            {selectedCourse?.results[0]?.totalSubmission}
                        </Typography>
                        <Typography variant={'label'} color={'text-gray-500'}>
                            Assessor:{' '}
                            <span className="font-semibold text-black">
                                {getUserCredentials()?.name}
                            </span>
                        </Typography>
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
                                {getAssessmentDetails?.isLoading ||
                                getAssessmentDetails.isFetching ? (
                                    <div className="flex flex-col justify-center items-center gap-y-2 py-5">
                                        <LoadingAnimation size={50} />
                                        <Typography variant={'label'}>
                                            Folders Loading
                                        </Typography>
                                    </div>
                                ) : getAssessmentDetails?.data &&
                                  getAssessmentDetails?.data?.length > 0 ? (
                                    getAssessmentDetails?.data?.map(
                                        (assessment: any) => (
                                            <AssessmentFolderCard
                                                key={assessment?.id}
                                                id={assessment?.id}
                                                name={assessment?.name}
                                                // isActive={folder.isActive}
                                                selectedFolderId={
                                                    selectedFolder?.id
                                                }
                                                response={
                                                    assessment?.studentResponse
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
                        <div className="col-span-2 border border-gray-300">
                            <AssessmentResponse
                                getAssessmentResponse={getAssessmentResponse}
                                folder={selectedFolder}
                            />
                        </div>
                    </div>
                    <Actions />
                </div>
            )}
        </div>
    )
}
