import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'

// components
import {
    Button,
    Select,
    Checkbox,
    TextArea,
    ShowErrorNotifications,
} from '@components'

// query
import { Result, UserRoles } from '@constants'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNotification } from '@hooks'
import { useSubmitAssessmentEvidenceMutation } from '@queries'
import { AssessmentFinalCommentFormType, Course } from '@types'
import { getUserCredentials } from '@utils'

export const SubmitFinalResult = ({
    result,
    course,
    studentId,
    setEditAssessment,
}: {
    result: any
    course: Course
    studentId: number
    setEditAssessment: any
}) => {
    const pathname = useRouter()
    const { notification } = useNotification()

    // query
    const [submitAssessmentEvidence, submitAssessmentEvidenceResult] =
        useSubmitAssessmentEvidenceMutation()

    const validationSchema = Yup.object({
        result: Yup.string().required('Result is Required'),
        finalComment: Yup.string().required('Final Comment is Required'),
    })

    const methods = useForm<AssessmentFinalCommentFormType>({
        mode: 'all',
        resolver: yupResolver(validationSchema),
    })

    const handleUpdate = useCallback((e: Result) => {
        const finalComment = () => {
            switch (e) {
                case Result.Competent:
                    return `Well done on successfully completing your placement with SkilTrak! You have met all the requirements of your practical component for unit ${course?.code} ${course?.title}. We are pleased to provide you with a Satisfactory result. `

                case Result.NotCompetent:
                    return `Thank you for submitting your placement documents for unit ${course?.code} ${course?.title}. However, there are still some sections that have missing/incorrect information. Please review your work and follow my feedback provided to assist you with your second submission. If you need any assistance, please contact us to book a Coaching Call. `

                default:
                    return ''
            }
        }
        methods.setValue('finalComment', finalComment())
    }, [])

    const onSubmit = (values: AssessmentFinalCommentFormType) => {
        submitAssessmentEvidence({ id: result?.id, body: values }).then(
            (res: any) => {
                if (res?.data) {
                    setEditAssessment(false)
                    notification.success({
                        title: 'Result Added',
                        description: 'Result Added Successfully',
                    })
                }
            }
        )
    }

    const ResultOptions = [
        { label: 'Competent', value: Result.Competent },
        { label: 'Not Competent', value: Result.NotCompetent },
        { label: 'Re-Open', value: Result.ReOpened },
        {
            label: 'All Documents Submitted',
            value: Result.AllDocumentSubmitted,
        },
    ]
    return (
        <>
            <ShowErrorNotifications result={submitAssessmentEvidenceResult} />
            <FormProvider {...methods}>
                <form
                    className="mt-2 w-full"
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    {/*  */}
                    <div className="grid  gap-x-2 mt-2">
                        <div className="w-full md:w-96">
                            <Select
                                label={'Result'}
                                name={'result'}
                                onChange={handleUpdate}
                                options={ResultOptions}
                                menuPlacement={'top'}
                                onlyValue
                            />
                        </div>
                        <div className="col-span-2">
                            <TextArea
                                label={'Comment'}
                                rows={5}
                                name={'finalComment'}
                                placeholder={'Write Your Comment'}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-x-2 mb-3">
                        <Checkbox name="notifyStudent" label="Notify Student" />
                        <Checkbox name="notifyRto" label="Notify RTO" />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-x-2 mt-2">
                        <div>
                            <Button
                                text="SUBMIT"
                                submit
                                loading={
                                    submitAssessmentEvidenceResult?.isLoading
                                }
                                disabled={
                                    submitAssessmentEvidenceResult?.isLoading
                                }
                            />
                        </div>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}
