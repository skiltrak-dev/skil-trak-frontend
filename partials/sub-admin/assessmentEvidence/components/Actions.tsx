import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { FormProvider, useForm } from 'react-hook-form'

// components
import {
    Button,
    Checkbox,
    Select,
    ShowErrorNotifications,
    TextArea,
} from '@components'

// query
import { useSubmitAssessmentEvidenceMutation } from '@queries'
import { useNotification } from '@hooks'
import { getUserCredentials } from '@utils'

export const Actions = ({ result }: any) => {
    const [selectedResult, setSelectedResult] = useState<string>('')
    const pathname = useRouter()
    const studentId = pathname.query.id
    const { notification } = useNotification()

    // query
    const [submitAssessmentEvidence, submitAssessmentEvidenceResult] =
        useSubmitAssessmentEvidenceMutation()

    const methods = useForm({
        mode: 'all',
    })

    const role = getUserCredentials()?.role

    useEffect(() => {
        if (submitAssessmentEvidenceResult.isSuccess) {
            notification.success({
                title: 'Result Submitted Successfully',
                description: 'Result Submitted Successfully',
            })
            switch (selectedResult) {
                case 'competent':
                    pathname.push(
                        role === 'admin'
                            ? {
                                  pathname: `/portals/admin/student/${studentId}`,
                                  query: { tab: 'assessments' },
                              }
                            : {
                                  pathname:
                                      '/portals/sub-admin/tasks/assessment-evidence',
                                  query: { tab: 'competent' },
                              }
                    )
                    break
                case 'notCompetent':
                    pathname.push(
                        role === 'admin'
                            ? {
                                  pathname: `/portals/admin/student/${studentId}`,
                                  query: { tab: 'assessments' },
                              }
                            : {
                                  pathname:
                                      '/portals/sub-admin/tasks/assessment-evidence',
                                  query: { tab: 'non-competent' },
                              }
                    )
                    break
                case 'reOpened':
                    pathname.push(
                        role === 'admin'
                            ? {
                                  pathname: `/portals/admin/student/${studentId}`,
                                  query: { tab: 'assessments' },
                              }
                            : {
                                  pathname:
                                      '/portals/sub-admin/tasks/assessment-evidence',
                                  query: { tab: 're-opened' },
                              }
                    )
                    break

                default:
                    pathname.push(
                        role === 'admin'
                            ? {
                                  pathname: `/portals/admin/student/${studentId}`,
                                  query: { tab: 'assessments' },
                              }
                            : {
                                  pathname:
                                      '/portals/sub-admin/tasks/assessment-evidence',
                                  query: { tab: 'pending' },
                              }
                    )
                    break
            }
            // pathname.push('/portals/sub-admin/tasks/assessment-evidence')
        }
    }, [submitAssessmentEvidenceResult])

    const onSubmit = (values: any) => {
        submitAssessmentEvidence({ id: result?.id, body: values })
    }

    const ResultOptions = [
        { label: 'Competent', value: 'competent' },
        { label: 'Not Competent', value: 'notCompetent' },
        { label: 'Re-Open', value: 'reOpened' },
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
                    <div className="grid grid-cols-3 gap-x-2 mt-2">
                        <div>
                            <Select
                                label={'Result'}
                                name={'result'}
                                onChange={(e: any) => {
                                    setSelectedResult(e?.value)
                                }}
                                options={ResultOptions}
                                menuPlacement={'top'}
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
                                loading={
                                    submitAssessmentEvidenceResult?.isLoading
                                }
                                disabled={
                                    submitAssessmentEvidenceResult?.isLoading
                                }
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
        </>
    )
}
