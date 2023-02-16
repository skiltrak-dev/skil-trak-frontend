import React from 'react'
import { useRouter } from 'next/router'
import { ReactElement, useEffect, useState } from 'react'

//components
import {
    CourseCard,
    LoadingAnimation,
    NoData,
    PageTitle,
    Typography,
    Checkbox,
    Card,
} from '@components'
import {
    Actions,
    AssessmentFolderCard,
    AssessmentResponse,
    FinalResult,
} from './components'

// queries
import {
    useStudentAssessmentCoursesQuery,
    useGetAssessmentResponseQuery,
    useGetAssessmentEvidenceDetailQuery,
    useMaulallyReopenSubmissionRequestMutation,
} from '@queries'
import { getUserCredentials } from '@utils'
import { useAlert, useNotification } from '@hooks'
import { NotificationMessage } from '@components/NotificationMessage'
import moment from 'moment'

export const Detail = ({
    studentId,
    studentUserId,
}: {
    studentId: string | string[] | undefined
    studentUserId: string | string[] | undefined
}) => {
    const [selectedCourse, setSelectedCourse] = useState<any | null>(null)
    const [selectedFolder, setSelectedFolder] = useState<any | null>(null)
    const [manualReOpen, setManualReOpen] = useState<boolean>(false)

    const results = selectedCourse?.results?.reduce(
        (a: any, b: any) => (a.totalSubmission > b.totalSubmission ? a : b),
        1
    )

    const { notification } = useNotification()

    // query
    const studentCourses = useStudentAssessmentCoursesQuery(Number(studentId), {
        skip: !studentId,
    })
    const getFolders = useGetAssessmentEvidenceDetailQuery(
        { courseId: Number(selectedCourse?.id), studentId: Number(studentId) },
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
    const [manullyReopenSubmission, manuallyReopenSubmissionResult] =
        useMaulallyReopenSubmissionRequestMutation()

    useEffect(() => {
        if (
            studentCourses.isSuccess ||
            manuallyReopenSubmissionResult.isSuccess
        ) {
            setSelectedCourse(
                selectedCourse
                    ? studentCourses?.data?.find(
                          (c: any) => c?.id === selectedCourse?.id
                      )
                    : studentCourses?.data[0]
            )
        }
    }, [studentCourses, manuallyReopenSubmissionResult])

    useEffect(() => {
        if (getFolders.isSuccess) {
            setSelectedFolder(selectedFolder || getFolders?.data[0])
        }
    }, [getFolders])

    useEffect(() => {
        if (manuallyReopenSubmissionResult.isSuccess) {
            notification.success({
                title: 'Successfully Opened Request Manullay',
                description: 'Successfully Opened Request Manullay',
            })
        }
    }, [manuallyReopenSubmissionResult])

    const allCommentsAdded = getFolders?.data?.every(
        (f: any) => f?.studentResponse[0]?.comment
    )

    const onManuallyReopen = (event: any) => {
        manullyReopenSubmission(results?.id)
    }

    return (
        <div className="mb-10">
            <div className="flex justify-between items-center mb-6">
                <PageTitle
                    title="Assessment Evidence Detail"
                    backTitle="Assessment"
                />
                {/* <div>
                    {!selectedCourse?.results?.length && (
                        <NotificationMessage
                            title={`No Submission For ${selectedCourse?.title}`}
                            subtitle={
                                'Student didn,t Submitted an assessment request'
                            }
                        />
                    )}
                    {selectedCourse?.results[0]?.result === 'pending' &&
                        results?.totalSubmission === 1 &&
                        !results?.isManualSubmission && (
                            <NotificationMessage
                                title={`New Request For ${selectedCourse?.title}`}
                                subtitle={
                                    'Student Submitted a assessment request'
                                }
                            />
                        )}
                    {selectedCourse?.results[0]?.result === 'pending' &&
                        results?.totalSubmission > 1 &&
                        !results?.isManualSubmission && (
                            <NotificationMessage
                                title={`Request Resubmitted For ${selectedCourse?.title}`}
                                subtitle={
                                    'Student Re-Submitted a assessment request'
                                }
                            />
                        )}
                    {selectedCourse?.results[0]?.result === 'reOpened' &&
                        !results?.isManualSubmission && (
                            <NotificationMessage
                                title={`Student Request Reopened for ${selectedCourse?.title}`}
                                subtitle={
                                    'You hve reopened the student request'
                                }
                            />
                        )}
                    {selectedCourse?.results[0]?.result === 'competent' &&
                        !results?.isManualSubmission && (
                            <NotificationMessage
                                title={`Student is Competent for ${selectedCourse?.title}`}
                                subtitle={
                                    'Student has successfully passed the Assessment'
                                }
                            />
                        )}
                    {selectedCourse?.results[0]?.result === 'notCompetent' &&
                        !results?.isManualSubmission && (
                            <NotificationMessage
                                title={`Student has failed in ${selectedCourse?.title}`}
                                subtitle={
                                    'Student has failed the assessment on this course'
                                }
                            />
                        )}
                    {results?.isManualSubmission && (
                        <NotificationMessage
                            title={`You have manually reopend the student request on ${selectedCourse?.title}`}
                            subtitle={`You have manually reopend the student request on ${selectedCourse?.title}`}
                        />
                    )}
                </div> */}
            </div>
            {studentCourses?.isLoading ? (
                <div className="flex flex-col justify-center items-center gap-y-2">
                    <LoadingAnimation size={60} />
                    <Typography variant={'label'}>
                        Student Assessment Course Loading
                    </Typography>
                </div>
            ) : studentCourses?.data && studentCourses?.data?.length > 0 ? (
                <div className="mb-3 grid grid-cols-3 gap-2">
                    {studentCourses?.data?.map((course: any) => (
                        <CourseCard
                            key={course.id}
                            id={course.id}
                            code={course.code}
                            title={course.title}
                            isActive={course.isActive}
                            coordinator={getUserCredentials()?.name}
                            selectedCourseId={selectedCourse?.id}
                            course={course}
                            result={course?.results[0] || 'Not Submitted'}
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
            {studentCourses?.data && studentCourses?.data?.length > 0 && (
                <div>
                    <div className="flex justify-between items-center">
                        <Typography variant={'label'} color={'text-gray-700'}>
                            <span className="font-bold text-black">
                                Assessment Submission
                            </span>{' '}
                            - Submission #{results?.totalSubmission}
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
                                getAssessmentResponse={getAssessmentResponse}
                                folder={selectedFolder}
                                studentId={studentId}
                                assessmentEvidenceView={true}
                            />
                        </div>
                    </div>
                    {/* {selectedCourse?.results
                        ?.map((result: any) => result.result)
                        .includes('pending') && (
                            )} */}

                    {/* {results?.finalComment && ( */}
                    <FinalResult
                        results={selectedCourse?.results}
                        folders={getFolders?.data}
                        courseName={selectedCourse?.title}
                    />
                    {/* )} */}
                    {allCommentsAdded &&
                        (results?.isSubmitted || manualReOpen) && (
                            <Actions result={results} />
                        )}
                    {results?.totalSubmission >= 3 &&
                        results?.result !== 'pending' &&
                        !results?.isManualSubmission && (
                            <div className="mt-5 flex flex-col gap-y-1">
                                <Typography variant={'small'}>
                                    Student Has Subitted 3 times, now you can
                                    manually reopen the submit request on
                                    request on Student
                                </Typography>
                                <Checkbox
                                    label={'Manual Re Open'}
                                    name={'manualReOpen'}
                                    loading={
                                        manuallyReopenSubmissionResult?.isLoading
                                    }
                                    onChange={(e: any) => {
                                        onManuallyReopen(e)
                                        // setManualReOpen(e.target.checked)
                                    }}
                                />
                            </div>
                        )}

                    {!results?.isSubmitted && (
                        <div className="mt-4">
                            <Typography
                                variant="muted"
                                color="text-neutral-500"
                            >
                                *You will be able to submit assessment evedence
                                result after you add a comment to each folder
                                mentioned above.
                            </Typography>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
