import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import _debounce from 'lodash/debounce'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { useNotification } from '@hooks'
import { AuthApi } from '@queries'
import {
    CourseSelectOption,
    formatOptionLabel,
    isEmailValid,
    onlyAlphabets,
    SignUpUtils,
} from '@utils'

import { Button, Card, Checkbox, Select, TextInput } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { Course } from '@types'
import { IoIosArrowRoundBack } from 'react-icons/io'

export const AddCustomIndustryForm = ({
    setWorkplaceData,
    result,
    industryABN,
    onSubmit,
    setActive,
    courses,
}: {
    setWorkplaceData?: any
    result: any
    industryABN: string | null
    onSubmit: any
    setActive: any
    courses: Course[]
}) => {
    const router = useRouter()

    const { notification } = useNotification()

    const [checkEmailExists, emailCheckResult] = AuthApi.useEmailCheck()

    const courseOptions = courses?.map((course: Course) => ({
        item: course,
        value: course?.id,
        label: course?.title,
    }))

    const [onSuburbClicked, setOnSuburbClicked] = useState<boolean>(true)

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

        email: yup
            .string()
            .email('Invalid Email')
            .required('Must provide email'),

        // Business Information
        abn: yup.string().required('Must provide ABN'),
        phoneNumber: yup.string().required('Must provide phone number'),

        // Contact Person Information
        contactPerson: yup
            .string()
            .matches(onlyAlphabets(), 'Please enter valid name'),
        contactPersonEmail: yup.string().email('Must be a valid email'),
        contactPersonNumber: yup.string(),

        // Address Information
        addressLine1: yup.string().required('Must provide address'),
        state: yup.string().required('Must provide name of state'),
        suburb: yup.string().required('Must provide suburb name'),
        zipCode: yup.string().required('Must provide zip code for your state'),

        agreedWithPrivacyPolicy: yup
            .boolean()
            .oneOf(
                [true],
                'Please check if you agree with our terms & policies'
            ),
        courses: yup.number().required(),
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

    const onBackToReview = () => {
        SignUpUtils.setEditingMode(false)
        router.push('/auth/signup/review-signup-info')
    }

    const formMethods = useForm({
        mode: 'all',
        defaultValues: { abn: industryABN },
        resolver: yupResolver(validationSchema),
    })

    const onHandleSubmit = (values: any) => {
        if (!onSuburbClicked) {
            notification.error({
                title: 'You must select on Suburb Dropdown',
                description: 'You must select on Suburb Dropdown',
            })
        } else if (onSuburbClicked) {
            onSubmit(values)
        }
    }

    return (
        <Card>
            <div
                className={
                    'group max-w-max transition-all text-xs flex justify-start items-center py-2.5 text-muted hover:text-muted-dark rounded-lg cursor-pointer'
                }
                onClick={() => {
                    setActive((active: number) => active - 1)
                }}
            >
                <IoIosArrowRoundBack className="transition-all inline-flex text-base group-hover:-translate-x-1" />
                <span className="ml-2">{'Back To Previous'}</span>
            </div>
            <div className="">
                <FormProvider {...formMethods}>
                    <form
                        className="flex flex-col gap-y-4"
                        onSubmit={formMethods.handleSubmit(onHandleSubmit)}
                    >
                        {/* Personal Information */}
                        <div>
                            <TextInput
                                label={'Business Name'}
                                name={'name'}
                                placeholder={'Industry Name...'}
                                validationIcons
                                required
                            />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                                <TextInput
                                    label={'ABN'}
                                    name={'abn'}
                                    placeholder={'ABN...'}
                                    validationIcons
                                    required
                                />

                                <TextInput
                                    label={'Website'}
                                    name={'website'}
                                    placeholder={'Website Url...'}
                                    validationIcons
                                />

                                <TextInput
                                    label={'Phone Number'}
                                    name={'phoneNumber'}
                                    placeholder={'Your phone number...'}
                                    validationIcons
                                    required
                                />
                            </div>
                        </div>
                        {/* Business Information */}
                        <div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                                <TextInput
                                    label={'Contact Person Name'}
                                    name={'contactPerson'}
                                    placeholder={'Contact Person Name...'}
                                    validationIcons
                                    required
                                />
                                <TextInput
                                    label={'Contact Person Number'}
                                    name={'contactPersonNumber'}
                                    placeholder={'Contact Person Number ...'}
                                    validationIcons
                                    required
                                />
                            </div>
                        </div>

                        {/* Sector Information */}

                        <div className="grid grid-cols-1 gap-x-3">
                            <Select
                                label={'Course'}
                                name={'courses'}
                                options={courseOptions}
                                validationIcons
                                onlyValue
                                components={{
                                    Option: CourseSelectOption,
                                }}
                                formatOptionLabel={formatOptionLabel}
                            />
                        </div>

                        {/* Profile Information */}

                        <div>
                            <TextInput
                                label={'Email'}
                                name={'email'}
                                type={'email'}
                                placeholder={'Your Email...'}
                                validationIcons
                                required
                                onBlur={onEmailChange}
                                loading={emailCheckResult.isLoading}
                            />
                        </div>

                        {/* Address Information */}

                        <div>
                            <div className="grid grid-cols-1 gap-x-8">
                                <TextInput
                                    label={'Address Line 1'}
                                    name={'addressLine1'}
                                    placeholder={'Your Address Line 1...'}
                                    validationIcons
                                    placesSuggetions
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8">
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
                        </div>

                        <div className="">
                            <div className="mb-6">
                                <Checkbox
                                    name={'agreedWithPrivacyPolicy'}
                                    label={
                                        <>
                                            I agree with{' '}
                                            <Link
                                                legacyBehavior
                                                href="/terms-and-conditions"
                                            >
                                                <a className="text-link">
                                                    Terms
                                                </a>
                                            </Link>{' '}
                                            {'&'}{' '}
                                            <Link
                                                legacyBehavior
                                                href="/privacy-policy"
                                            >
                                                <a className="text-link">
                                                    Privacy Policy
                                                </a>
                                            </Link>
                                        </>
                                    }
                                />
                            </div>

                            <div className="flex gap-x-4">
                                <Button
                                    text={'Continue'}
                                    submit
                                    loading={result.isLoading}
                                    disabled={result.isLoading}
                                />
                                {SignUpUtils.getEditingMode() && (
                                    <Button
                                        onClick={onBackToReview}
                                        text={'Back To Review'}
                                        variant={'secondary'}
                                    />
                                )}
                            </div>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </Card>
    )
}
