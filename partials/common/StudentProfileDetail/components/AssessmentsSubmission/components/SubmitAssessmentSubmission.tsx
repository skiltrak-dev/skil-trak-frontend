import { Button } from '@components'
import { Result } from '@constants'
import { useNotification } from '@hooks'
import { useSubmitStudentAssessmentMutation } from '@queries'
import { Student } from '@types'
import { getCourseResult } from '@utils'
import React, { useEffect } from 'react'

export const SubmitAssessmentSubmission = ({
    selectedCourseId,
    student,
    isFilesUploaded,
    results,
    isResubmittedFiles,
}: {
    selectedCourseId: number
    student: Student | undefined
    isFilesUploaded: boolean | undefined
    results: any
    isResubmittedFiles?: boolean
}) => {
    const { notification } = useNotification()
    const [submitAssessment, submitAssessmentResult] =
        useSubmitStudentAssessmentMutation()

    useEffect(() => {
        if (submitAssessmentResult.isSuccess) {
            notification.success({
                title: 'Assessment Submitted Successfully',
                description: 'Assessment Submitted Successfully',
            })
        }
    }, [submitAssessmentResult])

    const result = getCourseResult(results)

    const onSubmitAssessment = () => {
        submitAssessment({
            body: {
                notifyCoordinator: false,
                notifyRto: false,
            },
            student: student?.user?.id,
            id: selectedCourseId,
        })
    }

    useEffect(() => {
        if (
            isFilesUploaded &&
            !results?.length &&
            result?.result === Result.NotSubmitted &&
            !submitAssessmentResult.isLoading
        ) {
            console.log('AAA')
            onSubmitAssessment()
        }
    }, [isFilesUploaded, submitAssessmentResult, results, result])

    console.log({ isResubmittedFiles })

    useEffect(() => {
        if (
            isResubmittedFiles &&
            results?.length > 0 &&
            result?.status !== Result.Pending &&
            !submitAssessmentResult.isLoading
        ) {
            console.log('BBB')
            onSubmitAssessment()
        }
    }, [result, results, isResubmittedFiles, submitAssessmentResult])

    const onSubmit = (values: any) => {
        onSubmitAssessment()
    }
    return (
        <div>
            <Button
                text="Submit Assessment"
                onClick={onSubmit}
                variant="info"
                loading={submitAssessmentResult.isLoading}
                disabled={submitAssessmentResult.isLoading}
            />
        </div>
    )
}
