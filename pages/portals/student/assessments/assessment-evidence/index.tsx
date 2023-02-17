import { ReactElement, useEffect, useState } from 'react'

import { Desktop, Mobile } from '@components'
import { TitleAndMessages } from '@components/sections/student/AssessmentsContainer/AssessmentsEvidence'
import { StudentLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

// query
import { MediaQueries } from '@constants'
import { useNotification } from '@hooks'
import { DesktopAssessment, MobileAssessment } from '@partials/student'
import {
    useGetAssessmentsCoursesQuery,
    useGetAssessmentsFoldersQuery,
} from '@queries'
import { useMediaQuery } from 'react-responsive'
import { getCourseResult } from '@utils'

type Props = {}

const AssessmentEvidence: NextPageWithLayout = (props: Props) => {
    const isMobile = useMediaQuery(MediaQueries.Mobile)

    const [selectedCourse, setSelectedCourse] = useState<any | null>(null)
    const [selectedFolder, setSelectedFolder] = useState<any | null>(null)

    const result = getCourseResult(selectedCourse?.results)

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
            <TitleAndMessages result={result} />
            <Desktop>
                <DesktopAssessment
                    result={result}
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
                    results={result}
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
