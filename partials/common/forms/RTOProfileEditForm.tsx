import { useEffect } from 'react'

import * as yup from 'yup'

import { onlyAlphabets } from '@utils'

import { Button, TextInput, Typography, Card } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'

export const RTOProfileEditForm = ({
    onSubmit,
    profile,
    result,
}: {
    onSubmit: any
    profile: any
    result: any
}) => {
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

        // Business Information
        phone: yup.string().required('Must provide phone number'),

        // Contact Person Information
        contactPersonName: yup
            .string()
            .matches(onlyAlphabets(), 'Must be a valid name'),
        contactPersonEmail: yup.string().email('Must be a valid email'),
        contactPersonNumber: yup.string(),

        // Address Information
        addressLine1: yup.string().required('Must provide address'),
        state: yup.string().required('Must provide name of state'),
        suburb: yup.string().required('Must provide suburb name'),
        zipCode: yup.string().required('Must provide zip code for your state'),
    })

    const formMethods = useForm({
        mode: 'all',
        resolver: yupResolver(validationSchema),
    })

    useEffect(() => {
        if (profile?.data && profile.isSuccess) {
            const {
                courses,
                package: RtoPackage,
                students,
                subadmin,
                user,

                id,
                updatedAt,
                createdAt,
                ...rest
            } = profile?.data
            const { id: userId, socketId, ...userRest } = user
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
                                RTO Information
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
                                placeholder={'RTO Name...'}
                                validationIcons
                                required
                            />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                                <TextInput
                                    label={'Code'}
                                    name={'rtoCode'}
                                    placeholder={'Code...'}
                                    validationIcons
                                    required
                                />

                                <TextInput
                                    label={'Phone Number'}
                                    name={'phone'}
                                    placeholder={'Your phone number...'}
                                    validationIcons
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Profile Information */}
                    <div className="flex gap-x-16 border-t py-4">
                        <div className="w-2/6">
                            <Typography
                                variant={'subtitle'}
                                color={'text-gray-500'}
                            >
                                Profile Information
                            </Typography>
                            <p className="text-gray-400 text-sm leading-6">
                                This will be your information used as account
                                login.
                            </p>
                        </div>

                        <div className="w-4/6">
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
                    </div>

                    {/* Address Information */}
                    <div className="flex gap-x-16 border-t py-4">
                        <div className="w-2/6">
                            <Typography
                                variant={'subtitle'}
                                color={'text-gray-500'}
                            >
                                Address Information
                            </Typography>
                            <p className="text-gray-400 text-sm leading-6">
                                This will help us to find out about your nearby
                                sites
                            </p>
                        </div>

                        <div className="w-4/6">
                            <div className="grid grid-cols-1 gap-x-8">
                                <TextInput
                                    label={'Address Line 1'}
                                    name={'addressLine1'}
                                    placeholder={'Your Address Line 1...'}
                                    validationIcons
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8">
                                <TextInput
                                    label={'Suburb'}
                                    name={'suburb'}
                                    placeholder={'Suburb...'}
                                    validationIcons
                                />

                                <TextInput
                                    label={'State'}
                                    name={'state'}
                                    placeholder={'State...'}
                                    validationIcons
                                />

                                <TextInput
                                    label={'Zip Code'}
                                    name={'zipCode'}
                                    placeholder={'Zip Code...'}
                                    validationIcons
                                />
                            </div>
                        </div>
                    </div>

                    <div className="w-4/6 ml-auto pl-12">
                        <Button
                            submit
                            text={'Continue'}
                            loading={result.isLoading}
                            disabled={result.isLoading}
                        />
                    </div>
                </form>
            </FormProvider>
        </Card>
    )
}
