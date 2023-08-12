import { Button } from '@components'
import { useNotification } from '@hooks'
import { useSubmitStudentAssessmentMutation } from '@queries'
import { Student } from '@types'
import React, { useEffect } from 'react'

export const SubmitSubmissionForAssessment = ({
    selectedCourseId,
    student,
}: {
    selectedCourseId: number
    student: Student | undefined
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

    const onSubmit = (values: any) => {
        submitAssessment({
            body: {
                notifyCoordinator: false,
                notifyRto: false,
            },
            student: student?.user?.id,
            id: selectedCourseId,
        })
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
