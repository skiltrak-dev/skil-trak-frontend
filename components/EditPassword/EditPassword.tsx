import { TextInput, ShowErrorNotifications } from '@components'
import { Modal } from '@components/Modal'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// queries
import { SubAdminApi } from '@queries'
import { useNotification } from '@hooks'

export const EditPassword = ({
    onCancel,
    item,
}: {
    item: any
    onCancel: Function
}) => {
    const { notification } = useNotification()

    const [changePassword, changePasswordResult] =
        SubAdminApi.Student.useChangePassword()

    useEffect(() => {
        if (changePasswordResult.isSuccess) {
            notification.success({
                title: 'Password Updated',
                description: 'Password Updated Successfully',
            })
            onCancel()
        }
    }, [changePasswordResult])

    const validationSchema = Yup.object({
        password: Yup.string().required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    })

    const methods = useForm({
        resolver: yupResolver(validationSchema),
        mode: 'all',
    })

    const onSubmit = (values: any) => {
        changePassword({ ...values, email: item?.user?.email })
    }
    return (
        <div>
            <ShowErrorNotifications result={changePasswordResult} />
            <Modal
                title={'Edit PassWord'}
                subtitle={'Edit Password'}
                onConfirmClick={methods.handleSubmit(onSubmit)}
                onCancelClick={onCancel}
                loading={changePasswordResult.isLoading}
                // disabled={
                //     !password.password ||
                //     !password.confirmPassword ||
                //     password.password !== password.confirmPassword
                // }
            >
                <FormProvider {...methods}>
                    <form className="mt-2 w-full">
                        <TextInput
                            label={'Password'}
                            name={'password'}
                            type={'password'}
                            placeholder={'Password'}
                        />
                        <TextInput
                            label={'Confirm Password'}
                            name={'confirmPassword'}
                            type={'password'}
                            placeholder={'Confirm Password'}
                        />
                    </form>
                </FormProvider>
            </Modal>
        </div>
    )
}
