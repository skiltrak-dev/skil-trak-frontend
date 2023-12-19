import React from 'react'
import { SubmitSubmissionForAssessment } from './SubmitSubmissionForAssessment'
import { Result } from '@constants'

export const ShowSubmittionButton = ({
    getFolders,
    selectedCourse,
    results,
    isFilesUploaded,
    isResubmittedFiles,
    studentProfile,
}: {
    selectedCourse: any
    isFilesUploaded: boolean
    isResubmittedFiles: boolean
    results: any
    getFolders: any
    studentProfile: any
}) => {
    return (
        <div>
            {/* <SubmitSubmissionForAssessment
                                student={studentProfile?.data}
                                selectedCourseId={selectedCourse?.id}
                            /> */}
            {!getFolders.isLoading &&
            !getFolders.isFetching &&
            getFolders.isSuccess &&
            getFolders?.data &&
            getFolders?.data?.length > 0
                ? selectedCourse?.results?.length > 0
                    ? results?.totalSubmission < 3
                        ? (results?.result === Result.ReOpened ||
                              results?.result === Result.ReOpened ||
                              results?.result === Result.NotCompetent) && (
                              <SubmitSubmissionForAssessment
                                  selectedCourseId={selectedCourse?.id}
                                  student={studentProfile?.data}
                                  isFilesUploaded={isFilesUploaded}
                                  results={selectedCourse?.results}
                                  isResubmittedFiles={isResubmittedFiles}
                              />
                          )
                        : !getFolders.isLoading &&
                          !getFolders.isFetching &&
                          getFolders.isSuccess &&
                          results?.isManualSubmission && (
                              <SubmitSubmissionForAssessment
                                  selectedCourseId={selectedCourse?.id}
                                  student={studentProfile?.data}
                                  isFilesUploaded={isFilesUploaded}
                                  results={selectedCourse?.results}
                                  isResubmittedFiles={isResubmittedFiles}
                              />
                          )
                    : !getFolders.isLoading &&
                      !getFolders.isFetching &&
                      getFolders.isSuccess &&
                      selectedCourse && (
                          <SubmitSubmissionForAssessment
                              selectedCourseId={selectedCourse?.id}
                              student={studentProfile?.data}
                              isFilesUploaded={isFilesUploaded}
                              results={selectedCourse?.results}
                              isResubmittedFiles={isResubmittedFiles}
                          />
                      )
                : null}
        </div>
    )
}
