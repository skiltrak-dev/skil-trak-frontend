//components
import { Button, Checkbox, ShowErrorNotifications } from '@components'

// hooks
import { useNotification } from '@hooks'

// query
import { useSubmitStudentAssessmentMutation } from '@queries'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

export const Actions = ({ selectedCourseId }: { selectedCourseId: number }) => {
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

    const methods = useForm({
        mode: 'all',
    })

    const onSubmit = (values: any) => {
        submitAssessment({ body: values, id: selectedCourseId })
    }
    return (
        <>
            <ShowErrorNotifications result={submitAssessmentResult} />
            <FormProvider {...methods}>
                <form
                    className="mt-2 w-full"
                    onSubmit={methods.handleSubmit(onSubmit)}
                >
                    <div className="flex items-center gap-x-2 mt-10">
                        <div>
                            <Button
                                text="SUBMIT"
                                // onClick={onSubmit}
                                submit
                                loading={submitAssessmentResult.isLoading}
                                disabled={submitAssessmentResult.isLoading}
                                // disabled={
                                //     submitAssessmentResult.isLoading ||
                                //     selectedCourse?.results[0]?.totalSubmission > 2
                                // }
                            />
                        </div>
                        <div className="flex items-center gap-x-2">
                            <Checkbox
                                name="notifyCoordinator"
                                label="Notify Coordinator"
                            />
                            <Checkbox name="notifyRto" label="Notify RTO" />
                        </div>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}
