import React, { useEffect, useState } from 'react'

import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    Button,
    Checkbox,
    ShowErrorNotifications,
    TextArea,
    Typography,
} from '@components'
import { commonApi } from '@queries'
import { useNotification } from '@hooks'

export const VerifyEmailModal = ({
    onCloseModal,
    userId,
    userName,
}: {
    onCloseModal?: () => void
    userId: number
    userName: string
}) => {
    const [checked, setChecked] = useState(false)
    const { notification } = useNotification()
    const [verifyEmail, verifyEmailResult] =
        commonApi.useVerifyUserEmailMutation()
    const validationSchema = Yup.object({
        note: Yup.string().required('Note is required'),
    })
    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })
    useEffect(() => {
        if (verifyEmailResult.isSuccess) {
            notification.success({
                title: 'User Email Verified',
                description: 'User Email Verified Successfully',
            })
            onCloseModal()
        }
    }, [verifyEmailResult.isSuccess])

    const onCheckboxChange = () => {
        setChecked(!checked)
    }
    const onSubmit = async (body: any) => {
        await verifyEmail({
            userId,
            body,
        })
    }

    return (
        <>
            <ShowErrorNotifications result={verifyEmailResult} />
            <div className="min-w-[40rem] mt-5">
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        {/* <Typography variant={'title'} color="text-gray-700">
                            Verify User Email
                        </Typography> */}
                        <TextArea
                            label={'Add Note'}
                            name={'note'}
                            required
                            placeholder={'Add Note'}
                            rows={7}
                        />
                        <div className="mt-2">
                            <Checkbox
                                label={
                                    <span>
                                        I confirm that the email for{' '}
                                        <strong>{userName}</strong> has been
                                        verified
                                    </span>
                                }
                                name={'sendEmail'}
                                onChange={onCheckboxChange}
                                value={checked}
                            />
                        </div>
                        <div className="flex justify-end mt-4">
                            <Button
                                submit
                                text={'Verify'}
                                loading={verifyEmailResult.isLoading}
                                disabled={
                                    !checked || verifyEmailResult.isLoading
                                }
                            />
                        </div>
                    </form>
                </FormProvider>
            </div>
        </>
    )
}
