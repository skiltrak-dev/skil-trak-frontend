import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import _debounce from 'lodash/debounce'
import * as yup from 'yup'

import { useNotification } from '@hooks'
import { AuthApi } from '@queries'
import { getDate, isEmailValid, onlyAlphabets, SignUpUtils } from '@utils'

import { Button, Card, Select, TextInput, Typography } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'

// queries
import { useGetSubAdminStudentDetailQuery } from '@queries'

export const UpdateDetails = ({
    onSubmit,
    result,
}: {
    onSubmit: any
    result: any
}) => {
    const router = useRouter()
    const { id } = router.query

    const [onAddressClicked, setOnAddressClicked] = useState<boolean>(true)
    const [onSuburbClicked, setOnSuburbClicked] = useState<boolean>(true)

    const { data, isLoading, isError, isSuccess } =
        useGetSubAdminStudentDetailQuery(Number(id), {
            skip: !id,
        })

    const { notification } = useNotification()

    const [checkEmailExists, emailCheckResult] = AuthApi.useEmailCheck()

    const [lastEnteredEmail, setLastEnteredEmail] = useState('')

    const onEmailChange = (e: any) => {
        _debounce(() => {
            // Regex for email, only valid mail should be sent
            const email = e.target.value
            if (isEmailValid(email)) {
                checkEmailExists({ email })
                setLastEnteredEmail(email)
            }
        }, 300)()
    }

    const validationSchema = yup.object({
        // Profile Information
        name: yup
            .string()
            .matches(onlyAlphabets(), 'Please enter valid name')
            .required('Must provide your name'),

        dob: yup.date().required('Must provide Date of Birth'),

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

    // useEffect For Email
    useEffect(() => {
        if (emailCheckResult.isError) {
            notification.error({
                title: 'Email Exist',
                description: `'${lastEnteredEmail}' is already being used.`,
            })
        }
    }, [emailCheckResult])

    const formMethods = useForm({
        mode: 'all',
        // defaultValues: isSuccess ? data : {},
        resolver: yupResolver(validationSchema),
    })

    useEffect(() => {
        const {
            id,
            user,
            rto,
            courses,
            workplace,
            assessmentEvidence,
            updatedAt,
            createdAt,
            ...rest
        } = data || {}
        const values = {
            ...rest,
            ...user,
        }
        for (const key in values) {
            formMethods.setValue(key, values[key as keyof typeof values])
        }
    }, [data])

    const onHandleSubmit = (values: any) => {
        if (!onAddressClicked) {
            notification.error({
                title: 'You must select on Address Dropdown',
                description: 'You must select on Address Dropdown',
            })
        } else if (!onSuburbClicked) {
            notification.error({
                title: 'You must select on Suburb Dropdown',
                description: 'You must select on Suburb Dropdown',
            })
        } else if (onAddressClicked && onSuburbClicked) {
            onSubmit(values)
        }
    }

    return (
        <Card>
            <FormProvider {...formMethods}>
                <form
                    className="flex flex-col gap-y-4"
                    onSubmit={formMethods.handleSubmit(onHandleSubmit)}
                >
                    {/* Personal Information */}
                    <div className="flex gap-x-16 py-4">
                        <div className="w-4/6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                                <TextInput
                                    label={'Name'}
                                    name={'name'}
                                    placeholder={'Student Name...'}
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
                                <TextInput
                                    label={'Family Name'}
                                    name={'familyName'}
                                    placeholder={'Family Name...'}
                                    validationIcons
                                    required
                                />
                                <TextInput
                                    label={'Student ID'}
                                    name={'studentId'}
                                    placeholder={'Student ID...'}
                                    validationIcons
                                    disabled
                                    required
                                />
                                <TextInput
                                    label={'Date of Birth'}
                                    name={'dob'}
                                    type="date"
                                    max={getDate()}
                                    placeholder={'Date of Birth...'}
                                    validationIcons
                                    required
                                />
                                <TextInput
                                    label={'Emergency Person'}
                                    name={'emergencyPerson'}
                                    placeholder={'Emergency Person...'}
                                    validationIcons
                                    required
                                />
                                <TextInput
                                    label={'Emergency Person Phone'}
                                    name={'emergencyPersonPhone'}
                                    placeholder={'emergencyPersonPhone...'}
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
                                    onBlur={onEmailChange}
                                    loading={emailCheckResult.isLoading}
                                />

                                <TextInput
                                    label={'Address Line 1'}
                                    name={'addressLine1'}
                                    placeholder={'Your Address Line 1...'}
                                    validationIcons
                                    placesSuggetions
                                    onChange={() => {
                                        setOnAddressClicked(false)
                                    }}
                                    onPlaceSuggetions={{
                                        placesSuggetions: onAddressClicked,
                                        setIsPlaceSelected: setOnAddressClicked,
                                    }}
                                />
                                <TextInput
                                    label={'Suburb'}
                                    name={'suburb'}
                                    placeholder={'Suburb...'}
                                    validationIcons
                                    placesSuggetions
                                    onChange={() => {
                                        setOnSuburbClicked(false)
                                    }}
                                    onPlaceSuggetions={{
                                        placesSuggetions: onSuburbClicked,
                                        setIsPlaceSelected: setOnSuburbClicked,
                                    }}
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
                            <div className="flex justify-end">
                                <Button
                                    submit
                                    text={'Continue'}
                                    loading={result.isLoading}
                                    disabled={result.isLoading}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </Card>
    )
}
