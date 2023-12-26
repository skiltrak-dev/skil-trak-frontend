import { CourseCard, LoadingAnimation, NoData, Typography } from '@components'
import { NotificationMessage } from '@components/NotificationMessage'
import { AssessmentsEvidence } from '@components/sections/student/AssessmentsContainer'
import { Actions } from '@components/sections/student/AssessmentsContainer/AssessmentsEvidence/components/Actions'
import { Result } from '@constants'
import { getCourseResult, getUserCredentials } from '@utils'

export const DesktopAssessment = ({
    result,
    results,
    selectedFolder,
    selectedCourse,
    setSelectedCourse,
    setSelectedFolder,
    assessmentsFolders,
    assessmentsCourses,
    isFilesUploaded,
}: {
    result: any
    results: any
    selectedFolder: any
    selectedCourse: any
    assessmentsCourses: any
    assessmentsFolders: any
    setSelectedCourse: Function
    setSelectedFolder: Function
    isFilesUploaded: any
}) => {
    const rejectedFolderes = assessmentsFolders?.data?.filter(
        (f: any) => f?.studentResponse?.[0]?.status === 'rejected'
    )?.length

    const resubmitFiles = assessmentsFolders?.data?.filter(
        (f: any) => f?.studentResponse?.[0]?.reSubmitted
    )?.length

    const isResubmittedFiles =
        !assessmentsFolders.isLoading &&
        !assessmentsFolders.isFetching &&
        assessmentsFolders.isSuccess &&
        rejectedFolderes === resubmitFiles
    const assessmentActions = () => (
        <Actions
            selectedCourseId={selectedCourse?.id}
            isFilesUploaded={isFilesUploaded}
            results={results}
            isResubmittedFiles={isResubmittedFiles}
        />
    )
    return (
        <div>
            <div className="mb-3">
                {assessmentsCourses.isLoading ? (
                    <div className="flex flex-col items-center">
                        <LoadingAnimation size={50} />
                        <Typography variant={'subtitle'}>
                            Course Loading
                        </Typography>
                    </div>
                ) : assessmentsCourses?.data &&
                  assessmentsCourses?.data?.length > 0 ? (
                    <div className="mb-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                        {assessmentsCourses?.data?.map((course: any) => (
                            <CourseCard
                                key={course?.id}
                                course={course}
                                result={getCourseResult(
                                    course?.results,
                                    'Not Assessed'
                                )}
                                selectedCourseId={selectedCourse?.id}
                                onClick={() => {
                                    setSelectedCourse(course)
                                }}
                            />
                        ))}
                    </div>
                ) : (
                    <NoData text={'No Course Were Found'} />
                )}
            </div>
            {assessmentsCourses?.data &&
                assessmentsCourses?.data?.length > 0 && (
                    <>
                        <AssessmentsEvidence
                            assessmentsFolders={assessmentsFolders}
                            selectedFolder={selectedFolder}
                            setSelectedFolder={setSelectedFolder}
                            result={result}
                        />
                        {/* {isFilesUploaded
                            ? selectedCourse?.results?.length > 0
                                ? result?.totalSubmission < 3 ||
                                  result?.isManualSubmission ||
                                  result?.result === 'reOpened' ||
                                  result?.result === 'notCompetent'
                                    ? assessmentActions()
                                    : null
                                : assessmentActions()
                            : null} */}
                        {isFilesUploaded &&
                        assessmentsFolders?.data &&
                        assessmentsFolders?.data?.length > 0
                            ? selectedCourse?.results?.length > 0
                                ? result?.totalSubmission < 3
                                    ? (result?.result === Result.ReOpened ||
                                          result?.result ===
                                              Result.NotCompetent) &&
                                      assessmentActions()
                                    : result?.isManualSubmission &&
                                      assessmentActions()
                                : assessmentActions()
                            : null}
                        {!isFilesUploaded && (
                            <div className="mt-4">
                                <p className="text-xs text-orange-500 bg-orange-200 py-2 px-4">
                                    *You will be able to submit assessment
                                    request after you upload at least one
                                    attachment to each folder mentioned above.
                                </p>
                            </div>
                        )}
                    </>
                )}
            <div className="mt-4">
                {result?.result === Result.Pending &&
                    result?.totalSubmission < 3 && (
                        <NotificationMessage
                            title={'Submitted For Approval'}
                            subtitle={`You have submitted assessment request, wait for the response from your coordinator. Thanku ${
                                getUserCredentials()?.name
                            }`}
                        />
                    )}
                {result?.result === Result.ReOpened &&
                    result?.totalSubmission < 3 && (
                        <NotificationMessage
                            title={'Admin Reopened your request'}
                            subtitle={'You can resubmit your assessment'}
                        />
                    )}
                {result?.result === Result.Competent && (
                    <NotificationMessage
                        title={'Congratulations!'}
                        subtitle={'You have successfully passes the Assessment'}
                    />
                )}
                {result?.result === Result.NotCompetent &&
                    result?.totalSubmission < 3 && (
                        <NotificationMessage
                            title={'Failed'}
                            subtitle={
                                'You have failed the assessment on this course, you can resubmit your assessment'
                            }
                        />
                    )}
                {result?.result !== Result.Competent &&
                    result?.totalSubmission >= 3 &&
                    !result?.isManualSubmission && (
                        <NotificationMessage
                            title={'Request manually for reopen'}
                            subtitle={
                                'You have failed the assessment on this course, you can request for admin to reopen manullay'
                            }
                        />
                    )}
                {result?.isManualSubmission && (
                    <NotificationMessage
                        title={'Request manually reOpened'}
                        subtitle={'Request manually reOpened'}
                    />
                )}
            </div>
        </div>
    )
}
