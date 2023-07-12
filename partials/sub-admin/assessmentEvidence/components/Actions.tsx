import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
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
import { Result, UserRoles } from '@constants'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNotification } from '@hooks'
import { useSubmitAssessmentEvidenceMutation } from '@queries'
import { AssessmentFinalCommentFormType, Course } from '@types'
import { getUserCredentials } from '@utils'

export const Actions = ({
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

    const onSubmit = (values: AssessmentFinalCommentFormType) => {
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
