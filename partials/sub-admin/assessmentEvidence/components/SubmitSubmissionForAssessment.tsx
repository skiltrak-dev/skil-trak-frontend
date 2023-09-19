import { Button } from '@components'
import { useNotification } from '@hooks'
import { useSubmitStudentAssessmentMutation } from '@queries'
import { Student } from '@types'
import React, { useEffect } from 'react'

export const SubmitSubmissionForAssessment = ({
    selectedCourseId,
    student,
    isFilesUploaded,
    results,
}: {
    selectedCourseId: number
    student: Student | undefined
    isFilesUploaded: boolean | undefined
    results: any
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
        if (isFilesUploaded && !results?.length) {
            onSubmitAssessment()
        }
    }, [isFilesUploaded])

    const onSubmit = (values: any) => {
        onSubmitAssessment()
    }
    return (
        <div>
            <Button
                text="Submit Assessment"
                onClick={onSubmit}
                loading={submitAssessmentResult.isLoading}
                disabled={submitAssessmentResult.isLoading}
            />
        </div>
    )
}
