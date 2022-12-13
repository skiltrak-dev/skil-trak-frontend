import { useState } from 'react'
import { useRouter } from 'next/router'
import { FormProvider, useForm } from 'react-hook-form'

// components
import { Button, Checkbox, Select, TextArea } from '@components'

// query
import { useSubmitAssessmentEvidenceMutation } from '@queries'

export const Actions = () => {
    const pathname = useRouter()
    const studentId = pathname.query.studentId

    // query
    const [submitAssessmentEvidence, submitAssessmentEvidenceResult] =
        useSubmitAssessmentEvidenceMutation()

    const methods = useForm({
        mode: 'all',
    })

    const onSubmit = (values: any) => {
        submitAssessmentEvidence({ id: studentId, body: values })
    }

    const ResultOptions = [
        { label: 'Competent', value: 'competent' },
        { label: 'Not Competent', value: 'notCompetent' },
        { label: 'Re-Open', value: 'reOpened' },
    ]
    return (
        <FormProvider {...methods}>
            <form
                className="mt-2 w-full"
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                {/*  */}
                <div className="grid grid-cols-3 gap-x-2 mt-2">
                    <div>
                        <Select
                            label={'Result'}
                            name={'result'}
                            options={ResultOptions}
                            onlyValue
                        />
                    </div>
                    <div className="col-span-2">
                        <TextArea
                            label={'Comment'}
                            name={'finalComment'}
                            placeholder={'Write Your Comment'}
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-x-2 mt-2">
                    <div>
                        <Button
                            text="SUBMIT"
                            submit
                            loading={submitAssessmentEvidenceResult?.isLoading}
                            disabled={submitAssessmentEvidenceResult?.isLoading}
                        />
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
            </form>
        </FormProvider>
    )
}
