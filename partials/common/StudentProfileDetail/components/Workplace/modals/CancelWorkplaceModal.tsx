import { TextInput, ShowErrorNotifications, TextArea } from '@components'
import { Modal } from '@components/Modal'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// queries
import { SubAdminApi, useCancelWorkplaceStatusMutation } from '@queries'
import { useNotification } from '@hooks'

interface onSubmitType {
    note: string
}

export const CancelWorkplaceModal = ({
    onCancel,
    workplaceId,
}: {
    workplaceId: number
    onCancel: () => void
}) => {
    const { notification } = useNotification()

    const [cancelWorkplace, cancelWorkplaceResult] =
        useCancelWorkplaceStatusMutation()

    useEffect(() => {
        if (cancelWorkplaceResult.isSuccess) {
            notification.success({
                title: 'Workplace Cancelled',
                description: 'Workplace Cancelled Successfully',
            })
            onCancel()
        }
    }, [cancelWorkplaceResult])

    const validationSchema = Yup.object({
        note: Yup.string().required('Note is required'),
    })

    const methods = useForm<onSubmitType>({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    const onSubmit = (values: onSubmitType) => {
        cancelWorkplace({
            id: Number(workplaceId),
            comment: values?.note,
        })
    }
    return (
        <div>
            <ShowErrorNotifications result={cancelWorkplaceResult} />
            <Modal
                title={'Cancel Workplace'}
                subtitle={'Cancel Workplace'}
                onConfirmClick={methods.handleSubmit(onSubmit)}
                onCancelClick={onCancel}
                loading={cancelWorkplaceResult.isLoading}
                // disabled={
                //     !password.password ||
                //     !password.confirmPassword ||
                //     password.password !== password.confirmPassword
                // }
            >
                <FormProvider {...methods}>
                    <form className="mt-2 w-full">
                        <TextArea
                            label={'Add Note'}
                            name={'note'}
                            placeholder={'Add Note'}
                            showError={false}
                            rows={7}
                        />
                    </form>
                </FormProvider>
            </Modal>
        </div>
    )
}
