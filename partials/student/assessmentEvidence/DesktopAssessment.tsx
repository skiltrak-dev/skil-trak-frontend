import { Typography, NoData, LoadingAnimation } from '@components'
import {
    AssessmentCourseCard,
    AssessmentsEvidence,
} from '@components/sections/student/AssessmentsContainer'
import { Actions } from '@components/sections/student/AssessmentsContainer/AssessmentsEvidence/components/Actions'
import React from 'react'

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
                            <AssessmentCourseCard
                                key={course?.id}
                                id={course?.id}
                                code={course?.code}
                                title={course?.title}
                                result={
                                    course?.results?.length > 0
                                        ? course?.results[
                                              course?.results?.length - 1
                                          ]
                                        : { result: 'Not Assessesd' }
                                }
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
                            submission={result?.totalSubmission}
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

                        <div className="my-2">
                            <Typography
                                variant="muted"
                                color="text-neutral-500"
                            >
                                *You will be able to submit assessment request
                                after you upload at least one attachment to each
                                folder mentioned above.
                            </Typography>
                        </div>
                    </>
                )}
        </div>
    )
}
