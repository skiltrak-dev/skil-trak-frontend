import { CourseCard, LoadingAnimation, NoData, Typography } from '@components'
import { NotificationMessage } from '@components/NotificationMessage'
import { AssessmentsEvidence } from '@components/sections/student/AssessmentsContainer'
import { Actions } from '@components/sections/student/AssessmentsContainer/AssessmentsEvidence/components/Actions'
import { getCourseResult, getUserCredentials } from '@utils'

export const DesktopAssessment = ({
    result,
    selectedFolder,
    selectedCourse,
    setSelectedCourse,
    setSelectedFolder,
    assessmentsFolders,
    assessmentsCourses,
    isFilesUploaded,
}: {
    result: any
    selectedFolder: any
    selectedCourse: any
    assessmentsCourses: any
    assessmentsFolders: any
    setSelectedCourse: Function
    setSelectedFolder: Function
    isFilesUploaded: any
}) => {
    const assessmentActions = () => (
        <Actions selectedCourseId={selectedCourse?.id} />
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
                                id={course?.id}
                                code={course?.code}
                                title={course?.title}
                                result={getCourseResult(
                                    course?.results,
                                    'Not Assessed'
                                )}
                                isActive={course?.isActive}
                                coordinator={course?.subadmin[0]?.user?.name}
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
                                    ? (result?.result === 'reOpened' ||
                                          result?.result === 'notCompetent') &&
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
                {result?.result === 'pending' &&
                    result?.totalSubmission < 3 && (
                        <NotificationMessage
                            title={'Submitted For Approval'}
                            subtitle={`You have submitted assessment request, wait for the response from your coordinator. Thanku ${
                                getUserCredentials()?.name
                            }`}
                        />
                    )}
                {result?.result === 'reOpened' &&
                    result?.totalSubmission < 3 && (
                        <NotificationMessage
                            title={'Admin Reopened your request'}
                            subtitle={'You can resubmit your assessment'}
                        />
                    )}
                {result?.result === 'competent' && (
                    <NotificationMessage
                        title={'Congratulations!'}
                        subtitle={'You have successfully passes the Assessment'}
                    />
                )}
                {result?.result === 'notCompetent' &&
                    result?.totalSubmission < 3 && (
                        <NotificationMessage
                            title={'Failed'}
                            subtitle={
                                'You have failed the assessment on this course, you can resubmit your assessment'
                            }
                        />
                    )}
                {result?.result !== 'competent' &&
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
