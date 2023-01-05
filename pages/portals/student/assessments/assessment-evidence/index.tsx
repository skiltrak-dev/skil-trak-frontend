import { ReactElement, useEffect, useState } from 'react'

import {
    LoadingAnimation, NoData, PageTitle, Typography
} from '@components'
import { AssessmentCourseCard } from '@components/sections/student/AssessmentsContainer'
import { AssessmentsEvidence } from '@components/sections/student/AssessmentsContainer/AssessmentsEvidence'
import { StudentLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

// query
import { NotificationMessage } from '@components/NotificationMessage'
import { Actions } from '@components/sections/student/AssessmentsContainer/AssessmentsEvidence/components/Actions'
import { useNotification } from '@hooks'
import {
    useGetAssessmentsCoursesQuery,
    useGetAssessmentsFoldersQuery
} from '@queries'

type Props = {}

const AssessmentEvidence: NextPageWithLayout = (props: Props) => {
    const [selectedCourse, setSelectedCourse] = useState<any | null>(null)
    const [selectedFolder, setSelectedFolder] = useState<any | null>(null)

    const results = selectedCourse?.results[0]

    const { notification } = useNotification()

    // query
    const assessmentsCourses = useGetAssessmentsCoursesQuery()
    const assessmentsFolders = useGetAssessmentsFoldersQuery(
        selectedCourse?.id,
        {
            skip: !selectedCourse,
        }
    )

    useEffect(() => {
        if (assessmentsCourses.isSuccess) {
            setSelectedCourse(
                selectedCourse
                    ? assessmentsCourses?.data?.find(
                          (c) => c?.id === selectedCourse?.id
                      )
                    : assessmentsCourses?.data[0]
            )
        }
    }, [assessmentsCourses])

    useEffect(() => {
        if (assessmentsFolders.isSuccess) {
            setSelectedFolder(assessmentsFolders?.data[0])
        }
    }, [assessmentsFolders])

    const isFilesUploaded = assessmentsFolders?.data?.every(
        (f: any) => f?.studentResponse[0]?.files?.length > 0
    )


    return (
        <>
            {/* <AssessmentsEvidence /> */}
            <div className="flex justify-between items-center mb-6">
                <PageTitle title="Assessment Evidence" backTitle="Assessment" />
                <div>
                    {results?.result === 'pending' &&
                        results?.totalSubmission < 3 && (
                            <NotificationMessage
                                title={'Submitted For Approval'}
                                subtitle={'Wait for Admin review'}
                            />
                        )}
                    {results?.result === 'reOpened' &&
                        results?.totalSubmission < 3 && (
                            <NotificationMessage
                                title={'Admin Reopened your request'}
                                subtitle={'You can resubmit your assessment'}
                            />
                        )}
                    {results?.result === 'competent' &&
                        results?.totalSubmission < 3 && (
                            <NotificationMessage
                                title={'Congratulations!'}
                                subtitle={
                                    'You have successfully passes the Assessment'
                                }
                            />
                        )}
                    {results?.result === 'notCompetent' &&
                        results?.totalSubmission < 3 && (
                            <NotificationMessage
                                title={'Failed'}
                                subtitle={
                                    'You have failed the assessment on this course, you can resubmit your assessment'
                                }
                            />
                        )}
                    {results?.totalSubmission >= 3 && (
                        <NotificationMessage
                            title={'Request manually for reopen'}
                            subtitle={
                                'You have failed the assessment on this course, you can request for admin to reopen manullay'
                            }
                        />
                    )}
                </div>
            </div>
            <div>
                <div></div>
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
                        <div className="mb-3 grid grid-cols-3 gap-2">
                            {assessmentsCourses?.data?.map((course: any) => (
                                <AssessmentCourseCard
                                    key={course?.id}
                                    id={course?.id}
                                    code={course?.code}
                                    title={course?.title}
                                    isActive={course?.isActive}
                                    coordinator={
                                        course?.subadmin[0]?.user?.name
                                    }
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
                                    results?.totalSubmission < 3 &&
                                    (results?.result === 'reOpened' ||
                                        results?.result === 'notCompetent') ? (
                                        <Actions
                                            selectedCourseId={
                                                selectedCourse?.id
                                            }
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
                                    *You will be able to submit assessment
                                    request after you upload at least one
                                    attachment to each folder mentioned above.
                                </Typography>
                            </div>
                        </>
                    )}
            </div>
        </>
    )
}
AssessmentEvidence.getLayout = (page: ReactElement) => {
    return (
        <StudentLayout pageTitle={{ title: 'Assessment Evidence' }}>
            {page}
        </StudentLayout>
    )
}

export default AssessmentEvidence
