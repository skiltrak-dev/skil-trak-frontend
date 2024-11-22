import React, { useEffect } from 'react'
import { Industry } from '@types'
import { AdminApi } from '@queries'
import { useChangeStatus } from '../hooks'
import { FormProvider, useForm } from 'react-hook-form'
import {
    Button,
    Modal,
    ShowErrorNotifications,
    TextInput,
    Typography,
} from '@components'
import { useNotification } from '@hooks'
import { industryQuestions } from '@partials/admin/industry/components'

export const AcceptModal = ({
    industry,
    onCancel,
}: {
    industry: Industry
    onCancel: () => void
}) => {
    const [saveQuestions, saveQuestionsResult] =
        AdminApi.Industries.saveIndustryQuestions()

    const { onAccept, changeStatusResult } = useChangeStatus()

    const { notification } = useNotification()

    const methods = useForm({
        mode: 'all',
    })

    useEffect(() => {
        if (changeStatusResult.isSuccess) {
            notification.success({
                title: `Industry Approved`,
                description: `Industry "${industry?.user?.name}" has been accepted.`,
            })
            onCancel()
        }
    }, [changeStatusResult])

    const onSubmit = (values: any) => {
        let questions: {
            [key: string]: string
        }[] = []
        Object.entries(industryQuestions).forEach(([key, value]: any) => {
            questions.push({
                question: value,
                answer: values?.[key],
            })
        })
        saveQuestions({ id: industry?.id, questions }).then((res: any) => {
            if (res?.data) {
                onAccept(industry)
            }
        })
    }
    return (
        <div>
            <ShowErrorNotifications result={changeStatusResult} />
            <ShowErrorNotifications result={saveQuestionsResult} />
            <Modal
                title="Provide Answers"
                subtitle="We kindly request you to provide detailed responses to the following questions to help us better understand your organization's requirements and preferences for student placements."
                onConfirmClick={methods.handleSubmit(onSubmit)}
                onCancelClick={onCancel}
                loading={
                    saveQuestionsResult.isLoading ||
                    changeStatusResult.isLoading
                }
            >
                <div className="w-full px-3 lg:max-w-[950px] max-h-[80vh] lg:max-h-[70vh] overflow-auto custom-scrollbar">
                    <FormProvider {...methods}>
                        <form
                            className="mt-2 w-full"
                            onSubmit={methods.handleSubmit(onSubmit)}
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {Object.entries(industryQuestions)?.map(
                                    ([key, value]: any, i: number) => (
                                        <div className="border-2 border-[#A5A3A9] border-dashed rounded-md  p-2 flex flex-col justify-between gap-y-3">
                                            <Typography
                                                variant="small"
                                                medium
                                            >{`${i + 1}. ${value}`}</Typography>
                                            <TextInput
                                                name={key}
                                                // label={`${i + 1}. ${value}`}
                                                showError={false}
                                                placeholder={key}
                                            />
                                        </div>
                                    )
                                )}
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </Modal>
        </div>
    )
}
