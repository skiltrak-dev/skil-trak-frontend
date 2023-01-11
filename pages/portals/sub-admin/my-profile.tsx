import { ReactElement, useEffect } from 'react'

import { SubAdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'

import * as yup from 'yup'

import { getDate, onlyAlphabets } from '@utils'

import { Button, Card, TextInput, Typography } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'

// hooks
import { useContextBar, useNotification } from '@hooks'

// query
import { useGetStudentProfileDetailQuery, SubAdminApi } from '@queries'

const MyProfile: NextPageWithLayout = () => {
    const contextBar = useContextBar()
    const { notification } = useNotification()

    const profile = SubAdminApi.SubAdmin.useProfile()
    const [updateProfile, updateProfileResult] =
        SubAdminApi.SubAdmin.useUpdateProfile()

    useEffect(() => {
        contextBar.setContent(null)
        contextBar.hide()
    }, [])

    useEffect(() => {
        if (updateProfileResult.isSuccess) {
            notification.success({
                title: 'Profile Updated',
                description: 'Profile Updated Successfully',
            })
        }
    }, [updateProfileResult])

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

    const onSubmit = (values: any) => {
        updateProfile(values)
    }

    return (
        <Card>
            <FormProvider {...formMethods}>
                <form
                    className="flex flex-col gap-y-4"
                    onSubmit={formMethods.handleSubmit(onSubmit)}
                >
                    {/* Personal Information */}
                    <div className="flex gap-x-16 border-t py-4">
                        <div className="w-2/6">
                            <Typography
                                variant={'subtitle'}
                                color={'text-gray-500'}
                            >
                                Sub Admin Information
                            </Typography>
                            <p className="text-gray-400 text-sm leading-6">
                                Your information is required to make things
                                clear and transparent
                            </p>
                        </div>

                        <div className="w-4/6">
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
                        </div>
                    </div>

                    <div className="w-4/6 ml-auto pl-12">
                        <Button
                            text={'Update'}
                            submit
                            loading={updateProfileResult.isLoading}
                            disabled={updateProfileResult.isLoading}
                        />
                    </div>
                </form>
            </FormProvider>
        </Card>
    )
}

MyProfile.getLayout = (page: ReactElement) => {
    return (
        <SubAdminLayout pageTitle={{ title: 'My Profile' }}>
            {page}
        </SubAdminLayout>
    )
}

export default MyProfile
