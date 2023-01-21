import { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

// queries
import { AuthApi } from '@queries'

// components
import { Avatar, Button, Card, TextInput, Typography } from '@components'

// utils
import { onlyAlphabets } from '@utils'

// hooks
import { useContextBar, useNotification } from '@hooks'

export const SubAdminProfileForm = ({
    result,
    profile,
    onSubmit,
}: {
    result: any
    profile: any
    onSubmit: any
}) => {
    const contextBar = useContextBar()
    const { notification } = useNotification()

    useEffect(() => {
        contextBar.setContent(null)
        contextBar.hide()
    }, [])

    useEffect(() => {
        if (result.isSuccess) {
            notification.success({
                title: 'Profile Updated',
                description: 'Profile Updated Successfully',
            })
        }
    }, [result])

    const validationSchema = yup.object({
        // Profile Information
        name: yup
            .string()
            .matches(onlyAlphabets(), 'Please enter valid name')
            .required('Must provide your name'),

        email: yup
            .string()
            .email('Invalid Email')
            .required('Must provide email'),

        phone: yup.string().required('Must provide phone number'),

        // Contact Person Information

        // Address Information
        address: yup.string().required('Must provide address'),
    })

    const formMethods = useForm({
        mode: 'all',
        resolver: yupResolver(validationSchema),
    })

    useEffect(() => {
        if (profile?.data && profile.isSuccess) {
            const {
                courses,
                createdBy,
                rtos,
                user,
                updatedAt,
                createdAt,
                ...rest
            } = profile?.data
            const { skiltrakId, ...userRest } = user
            const values = {
                ...rest,
                ...userRest,
            }
            for (const key in values) {
                formMethods.setValue(key, values[key])
            }
        }
    }, [profile])
    return (
        <Card>
            <div className="flex justify-between gap-x-16 border-t py-4">
                <div className="w-4/6">
                    <FormProvider {...formMethods}>
                        <form
                            className="flex flex-col gap-y-4"
                            onSubmit={formMethods.handleSubmit(onSubmit)}
                        >
                            {/* Personal Information */}
                            <TextInput
                                label={'Name'}
                                name={'name'}
                                placeholder={'Student Name...'}
                                validationIcons
                                required
                            />
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                                <TextInput
                                    label={'Phone Number'}
                                    name={'phone'}
                                    placeholder={'Your phone number...'}
                                    validationIcons
                                    required
                                />
                                <TextInput
                                    label={'Email'}
                                    name={'email'}
                                    type={'email'}
                                    placeholder={'Your Email...'}
                                    validationIcons
                                    required
                                    disabled
                                />
                            </div>
                            <TextInput
                                label={'Address'}
                                name={'address'}
                                placeholder={'Your Address ...'}
                                validationIcons
                            />
                            Khan babababa
                            <div>
                                <Button
                                    text={'Update'}
                                    submit
                                    loading={result.isLoading}
                                    disabled={result.isLoading}
                                />
                            </div>
                        </form>
                    </FormProvider>
                </div>
                <Avatar avatar={profile?.data?.user?.avatar} />
            </div>
        </Card>
    )
}
