import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'

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
import { yupResolver } from '@hookform/resolvers/yup'
import { Result, UserRoles } from '@constants'

export const Actions = ({
    result,
    studentId,
    setEditAssessment,
}: {
    studentId: string | string[] | undefined
    result: any
    setEditAssessment: any
}) => {
    const [selectedResult, setSelectedResult] = useState<string>('')
    const pathname = useRouter()
    const { notification } = useNotification()

    // query
    const [submitAssessmentEvidence, submitAssessmentEvidenceResult] =
        useSubmitAssessmentEvidenceMutation()

    const validationSchema = Yup.object({
        result: Yup.string().required('Result is Required'),
        finalComment: Yup.string().required('Final Comment is Required'),
    })

    const methods = useForm({
        mode: 'all',
        resolver: yupResolver(validationSchema),
    })

    const role = getUserCredentials()?.role

    useEffect(() => {
        if (submitAssessmentEvidenceResult.isSuccess) {
            pathname.push(
                role === UserRoles.ADMIN
                    ? {
                          pathname: `/portals/admin/student/${studentId}`,
                          query: { tab: 'submissions' },
                      }
                    : role === UserRoles.SUBADMIN
                    ? {
                          pathname: `/portals/sub-admin/students/${studentId}`,
                          query: { tab: 'submissions' },
                      }
                    : '#'
            )
            setEditAssessment(false)
            notification.success({
                title: 'Result Added',
                description: 'Result Added Successfully',
            })
        }
    }, [submitAssessmentEvidenceResult])

    // useEffect(() => {
    //     if (submitAssessmentEvidenceResult.isSuccess) {
    //         notification.success({
    //             title: 'Result Submitted Successfully',
    //             description: 'Result Submitted Successfully',
    //         })
    //         switch (selectedResult) {
    //             case 'competent':
    //                 pathname.push(
    //                     role === 'admin'
    //                         ? {
    //                               pathname: `/portals/admin/student/${studentId}`,
    //                               query: { tab: 'submissions' },
    //                           }
    //                         : {
    //                               pathname:
    //                                   '/portals/sub-admin/tasks/assessment-evidence',
    //                               query: { tab: 'competent' },
    //                           }
    //                 )
    //                 break
    //             case 'notCompetent':
    //                 pathname.push(
    //                     role === 'admin'
    //                         ? {
    //                               pathname: `/portals/admin/student/${studentId}`,
    //                               query: { tab: 'submissions' },
    //                           }
    //                         : {
    //                               pathname:
    //                                   '/portals/sub-admin/tasks/assessment-evidence',
    //                               query: { tab: 'non-competent' },
    //                           }
    //                 )
    //                 break
    //             case 'reOpened':
    //                 pathname.push(
    //                     role === 'admin'
    //                         ? {
    //                               pathname: `/portals/admin/student/${studentId}`,
    //                               query: { tab: 'submissions' },
    //                           }
    //                         : {
    //                               pathname:
    //                                   '/portals/sub-admin/tasks/assessment-evidence',
    //                               query: { tab: 're-opened' },
    //                           }
    //                 )
    //                 break

    //             default:
    //                 pathname.push(
    //                     role === 'admin'
    //                         ? {
    //                               pathname: `/portals/admin/student/${studentId}`,
    //                               query: { tab: 'submissions' },
    //                           }
    //                         : {
    //                               pathname:
    //                                   '/portals/sub-admin/tasks/assessment-evidence',
    //                               query: { tab: 'pending' },
    //                           }
    //                 )
    //                 break
    //         }
    //         // pathname.push('/portals/sub-admin/tasks/assessment-evidence')
    //     }
    // }, [submitAssessmentEvidenceResult])

    const onSubmit = (values: any) => {
        submitAssessmentEvidence({ id: result?.id, body: values })
    }

    const ResultOptions = [
        { label: 'Competent', value: Result.Competent },
        { label: 'Not Competent', value: Result.NotCompetent },
        { label: 'Re-Open', value: Result.ReOpened },
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
                                name="notifyStudent"
                                label="Notify Student"
                            />
                            <Checkbox name="notifyRto" label="Notify RTO" />
                        </div>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}
