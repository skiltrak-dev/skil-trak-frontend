import { ReactElement, useState, useEffect } from 'react'

import { StudentLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { AssessmentsEvidence } from '@components/sections/student/AssessmentsContainer/AssessmentsEvidence'
import {
    NoData,
    Button,
    Checkbox,
    Typography,
    LoadingAnimation,
    ShowErrorNotifications,
} from '@components'
import { AssessmentCourseCard } from '@components/sections/student/AssessmentsContainer'

// query
import {
    useGetAssessmentsCoursesQuery,
    useGetAssessmentsFoldersQuery,
    useSubmitStudentAssessmentMutation,
} from '@queries'
import { useNotification } from '@hooks'
import { Actions } from '@components/sections/student/AssessmentsContainer/AssessmentsEvidence/components/Actions'

type Props = {}

const AssessmentEvidence: NextPageWithLayout = (props: Props) => {
    const [selectedCourse, setSelectedCourse] = useState<any | null>(null)
    const [selectedFolder, setSelectedFolder] = useState<any | null>(null)

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
            setSelectedFolder(selectedFolder || assessmentsFolders?.data[0])
        }
    }, [assessmentsFolders])

    const isFilesUploaded = assessmentsFolders?.data?.every(
        (f: any) => f?.studentResponse?.files?.length > 0
    )

    console.log('isFilesUploaded', selectedCourse?.results[0]?.totalSubmission)

    return (
        <>
            {/* <AssessmentsEvidence /> */}
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
                        <div className="mb-3 grid grid-cols-3 gap-x-2">
                            {assessmentsCourses?.data?.map((course: any) => (
                                <AssessmentCourseCard
                                    key={course.id}
                                    id={course.id}
                                    code={course.code}
                                    title={course.title}
                                    isActive={course.isActive}
                                    coordinator={course?.subadmin[0]?.user.name}
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
                                submission={
                                    selectedCourse?.results[0]?.totalSubmission
                                }
                            />
                            {isFilesUploaded &&
                                selectedCourse?.results[0]?.totalSubmission <
                                    3 &&
                                (selectedCourse?.results?.length > 0 ? (
                                    selectedCourse?.results
                                        ?.map((result: any) => result.result)
                                        .includes('reOpened') ? (
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
                                ))}

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
    return <StudentLayout title="Assessment Evidence">{page}</StudentLayout>
}

export default AssessmentEvidence
