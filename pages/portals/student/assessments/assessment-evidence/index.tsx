import { ReactElement, useState, useEffect } from 'react'

import { StudentLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { AssessmentsEvidence } from '@components/sections/student/AssessmentsContainer/AssessmentsEvidence'
import { LoadingAnimation, Typography, Button, Checkbox } from '@components'
import { AssessmentCourseCard } from '@components/sections/student/AssessmentsContainer'

// query
import {
    useGetAssessmentsCoursesQuery,
    useGetAssessmentsFoldersQuery,
} from '@queries'

type Props = {}

const AssessmentEvidence: NextPageWithLayout = (props: Props) => {
    const [selectedCourseId, setSelectedCourseId] = useState(null)
    const [selectedFolder, setSelectedFolder] = useState<any | null>(null)

    // query
    const assessmentsCourses: any = useGetAssessmentsCoursesQuery()
    const assessmentsFolders: any = useGetAssessmentsFoldersQuery(
        selectedCourseId,
        {
            skip: !selectedCourseId,
        }
    )

    useEffect(() => {
        if (assessmentsCourses.isSuccess) {
            setSelectedCourseId(
                selectedCourseId || assessmentsCourses?.data[0]?.id
            )
        }
    }, [assessmentsCourses])

    useEffect(() => {
        if (assessmentsFolders.isSuccess) {
            setSelectedFolder(selectedFolder || assessmentsFolders?.data[0])
        }
    }, [assessmentsFolders])
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
                    ) : (
                        <div className="mb-3 grid grid-cols-3 gap-x-2">
                            {assessmentsCourses?.data?.map((course: any) => (
                                <AssessmentCourseCard
                                    key={course.id}
                                    id={course.id}
                                    code={course.code}
                                    title={course.title}
                                    isActive={course.isActive}
                                    coordinator={course?.subadmin[0]?.user.name}
                                    selectedCourseId={selectedCourseId}
                                    onClick={() => {
                                        setSelectedCourseId(course.id)
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>
                {assessmentsCourses?.data &&
                    assessmentsCourses?.data?.length > 0 && (
                        <>
                            <AssessmentsEvidence
                                assessmentsFolders={assessmentsFolders}
                                selectedFolder={selectedFolder}
                                setSelectedFolder={setSelectedFolder}
                            />
                            <div className="flex items-center gap-x-2 mt-10">
                                <div>
                                    <Button text="SUBMIT" submit />
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <Checkbox
                                        name="notifyCoordinator"
                                        label="Notify Coordinator"
                                    />
                                    <Checkbox
                                        name="notifyCoordinator"
                                        label="Notify Coordinator"
                                    />
                                </div>
                            </div>

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
