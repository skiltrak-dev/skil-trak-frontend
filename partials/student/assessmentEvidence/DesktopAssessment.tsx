import { Typography, NoData, LoadingAnimation } from '@components'
import {
    AssessmentCourseCard,
    AssessmentsEvidence,
} from '@components/sections/student/AssessmentsContainer'
import { Actions } from '@components/sections/student/AssessmentsContainer/AssessmentsEvidence/components/Actions'
import React from 'react'

export const DesktopAssessment = ({
    results,
    selectedFolder,
    selectedCourse,
    setSelectedCourse,
    setSelectedFolder,
    assessmentsFolders,
    assessmentsCourses,
    isFilesUploaded,
}: {
    results: any
    selectedFolder: any
    selectedCourse: any
    assessmentsCourses: any
    assessmentsFolders: any
    setSelectedCourse: Function
    setSelectedFolder: Function
    isFilesUploaded: any
}) => {
    console.log('isFilesUploaded', isFilesUploaded)
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
                            submission={results?.totalSubmission}
                        />
                        {isFilesUploaded ? (
                            selectedCourse?.results?.length > 0 ? (
                                (results?.totalSubmission < 3 ||
                                    results?.isManualSubmission) &&
                                (results?.result === 'reOpened' ||
                                    results?.result === 'notCompetent') ? (
                                    <Actions
                                        selectedCourseId={selectedCourse?.id}
                                    />
                                ) : null
                            ) : (
                                <Actions
                                    selectedCourseId={selectedCourse?.id}
                                />
                            )
                        ) : null}

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
