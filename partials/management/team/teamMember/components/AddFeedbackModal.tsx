import React, { useEffect, useState } from 'react'
import {
    Button,
    Typography,
    TextArea,
    ShowErrorNotifications,
} from '@components'
import { ManagementApi } from '@queries'
import { useRouter } from 'next/router'
import { useNotification } from '@hooks'
import { FormProvider, useForm } from 'react-hook-form'
export const AddFeedbackModal = ({ onCancel }: any) => {
    const { notification } = useNotification()
    const router = useRouter()
    const reportId = router.query.reportId
    const memberId = router.query.memberId
    const [addFeedback, addFeedbackResult] =
        ManagementApi.CheckKpi.useAddFeedbackOnKpiReport()

    const methods = useForm({
        // resolver: yupResolver(validationSchema),
        // defaultValues: initialValues,
        mode: 'all',
    })
    const onSubmit = async (values: any) => {
        const data = {
            id: reportId,
            body: { member: Number(memberId), comment: values.feedback },
        }
        addFeedback(data)
    }

    useEffect(() => {
        if (addFeedbackResult.isSuccess) {
            notification.success({
                title: 'Feedback added successfully',
                description: 'Feedback has been added successfully',
            })
            onCancel()
        }
    }, [addFeedbackResult])
    return (
        <>
            <ShowErrorNotifications result={addFeedbackResult} />

            <div className="px-12 py-10 overflow-auto remove-scrollbar">
                <FormProvider {...methods}>
                    <form
                        className="w-full"
                        onSubmit={methods.handleSubmit(onSubmit)}
                    >
                        <div className="flex justify-center">
                            <Typography
                                variant={'title'}
                                color={'text-primaryNew'}
                                semibold
                            >
                                FEEDBACK
                            </Typography>
                        </div>
                        <TextArea
                            placeholder="Feedback..."
                            name="feedback"
                            rows={10}
                        />
                        <div className="flex items-center justify-center gap-x-3">
                            <Button
                                variant="primaryNew"
                                text="Add feedback"
                                loading={addFeedbackResult?.isLoading}
                                disabled={addFeedbackResult?.isLoading}
                                submit
                            />
                            <Button
                                variant="error"
                                text="cancel"
                                onClick={onCancel}
                            />
                        </div>
                    </form>
                </FormProvider>
            </div>
        </>
    )
}
