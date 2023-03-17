import { TextInput, ShowErrorNotifications, TextArea } from '@components'
import { Modal } from '@components/Modal'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// queries
import { CommonApi } from '@queries'
import { useNotification } from '@hooks'
import { getDate } from '@utils'

export const EditTimer = ({
    studentId,
    onCancel,
    date,
    changeExpiryData,
}: {
    studentId: number | undefined
    date: any
    onCancel: Function
    changeExpiryData?: any
}) => {
    const { notification } = useNotification()

    const [updateExpiryDate, updateExpiryDateResult] =
        CommonApi.Expiry.useExpiryDate()

    useEffect(() => {
        if (updateExpiryDateResult.isSuccess) {
            notification.success({
                title: 'Expiry Date Updated',
                description: 'Expiry Date Updated Successfully',
            })
            onCancel()
            changeExpiryData(updateExpiryDateResult.isSuccess)
        }
    }, [updateExpiryDateResult])

    const validationSchema = Yup.object({
        expiryDate: Yup.string().required('Expiry Date is required'),
        comment: Yup.string().required('Comment is required'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    const onSubmit = (values: any) => {
        updateExpiryDate({ id: studentId, body: values })
    }
    return (
        <div>
            <ShowErrorNotifications result={updateExpiryDateResult} />
            <Modal
                title={'Edit Expiry Date'}
                subtitle={'Edit Expiry Date'}
                onConfirmClick={methods.handleSubmit(onSubmit)}
                onCancelClick={onCancel}
                loading={updateExpiryDateResult.isLoading}
            >
                <FormProvider {...methods}>
                    <form className="mt-2 w-full">
                        <TextInput
                            label={'Edit Date'}
                            name={'expiryDate'}
                            type={'date'}
                            placeholder={'Password'}
                            min={getDate()}
                        />
                        <TextArea
                            name={'comment'}
                            label={'Comment'}
                            placeholder={'Add Comment'}
                        />
                    </form>
                </FormProvider>
            </Modal>
        </div>
    )
}
