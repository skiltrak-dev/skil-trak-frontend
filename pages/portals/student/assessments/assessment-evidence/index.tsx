import { ReactElement, useEffect, useState } from 'react'

import {
    LoadingAnimation,
    NoData,
    PageTitle,
    Typography,
    Desktop,
    Mobile,
} from '@components'
import { AssessmentCourseCard } from '@components/sections/student/AssessmentsContainer'
import {
    AssessmentsEvidence,
    TitleAndMessages,
} from '@components/sections/student/AssessmentsContainer/AssessmentsEvidence'
import { StudentLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

// query
import { NotificationMessage } from '@components/NotificationMessage'
import { Actions } from '@components/sections/student/AssessmentsContainer/AssessmentsEvidence/components/Actions'
import { useNotification } from '@hooks'
import {
    useGetAssessmentsCoursesQuery,
    useGetAssessmentsFoldersQuery,
} from '@queries'
import { DesktopAssessment, MobileAssessment } from '@partials/student'
import { useMediaQuery } from 'react-responsive'
import { MediaQueries } from '@constants'

type Props = {}

const AssessmentEvidence: NextPageWithLayout = (props: Props) => {
    const isMobile = useMediaQuery(MediaQueries.Mobile)

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
                    : !isMobile
                    ? assessmentsCourses?.data[0]
                    : null
            )
        }
    }, [assessmentsCourses])

    useEffect(() => {
        if (assessmentsFolders.isSuccess) {
            !isMobile && setSelectedFolder(assessmentsFolders?.data[0])
        }
    }, [assessmentsFolders])

    const isFilesUploaded = assessmentsFolders?.data?.every(
        (f: any) => f?.studentResponse[0]?.files?.length > 0
    )


    return (
        <>
            {/* <AssessmentsEvidence /> */}
            <TitleAndMessages results={results} />
            <Desktop>
                <DesktopAssessment
                    results={results}
                    selectedFolder={selectedFolder}
                    selectedCourse={selectedCourse}
                    setSelectedCourse={setSelectedCourse}
                    setSelectedFolder={setSelectedFolder}
                    assessmentsFolders={assessmentsFolders}
                    assessmentsCourses={assessmentsCourses}
                    isFilesUploaded={isFilesUploaded}
                />
            </Desktop>
            <Mobile>
                <MobileAssessment
                    results={results}
                    selectedFolder={selectedFolder}
                    selectedCourse={selectedCourse}
                    setSelectedCourse={setSelectedCourse}
                    setSelectedFolder={setSelectedFolder}
                    assessmentsFolders={assessmentsFolders}
                    assessmentsCourses={assessmentsCourses}
                    isFilesUploaded={isFilesUploaded}
                />
            </Mobile>
        </>
    )
}
AssessmentEvidence.getLayout = (page: ReactElement) => {
    return <StudentLayout>{page}</StudentLayout>
}

export default AssessmentEvidence
