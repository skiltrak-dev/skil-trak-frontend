import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { FormProvider, useForm } from 'react-hook-form'
import _debounce from 'lodash/debounce'
import * as yup from 'yup'

import { useNotification } from '@hooks'
import { AuthApi } from '@queries'
import { isEmailValid, onlyAlphabets, SignUpUtils } from '@utils'

import { Button, Checkbox, Select, TextInput, Card } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { IoIosArrowRoundBack } from 'react-icons/io'

export const AddCustomIndustryForm = ({
    setWorkplaceData,
    result,
    industryABN,
    onSubmit,
    setActive,
}: {
    setWorkplaceData?: any
    result: any
    industryABN: string | null
    onSubmit: any
    setActive: any
}) => {
    const router = useRouter()

    const { notification } = useNotification()

    const sectorResponse = AuthApi.useSectors({})
    const [checkEmailExists, emailCheckResult] = AuthApi.useEmailCheck()

    const [sectorOptions, setSectorOptions] = useState([])
    const [courseOptions, setCourseOptions] = useState([])
    const [courseLoading, setCourseLoading] = useState(false)

    const [storedData, setStoredData] = useState<any>(null)

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

    const onSectorChanged = (sectors: any) => {
        setCourseLoading(true)

        const sectorExisting = sectorResponse?.data?.find(
            (sector: any) => sector.id === sectors?.value
        )
        const newCourseOptions: any = []
        sectorExisting?.courses?.map((course: any) =>
            newCourseOptions.push({
                label: course.title,
                value: course.id,
            })
        )
        setCourseOptions(newCourseOptions)
        setCourseLoading(false)
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
        contactPersonName: yup.string(),
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
        sectors: yup.object().required(),
        courses: yup.object().required(),
    })

    useEffect(() => {
        if (sectorResponse.data?.length) {
            const options = sectorResponse.data?.map((sector: any) => ({
                label: sector.name,
                value: sector.id,
            }))
            setSectorOptions(options)
        }
    }, [sectorResponse?.data])

    useEffect(() => {
        if (SignUpUtils.getEditingMode()) {
            const values = SignUpUtils.getValuesFromStorage()
            setStoredData(values)
            setCourseOptions(values.courses)
        }
    }, [])

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
                        onSubmit={formMethods.handleSubmit(onSubmit)}
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
                                    label={'Contact Person Number'}
                                    name={'contactPersonNumber'}
                                    placeholder={'Contact Person Number ...'}
                                    validationIcons
                                    required
                                />
                                <TextInput
                                    label={'Contact Person Name'}
                                    name={'contactPersonName'}
                                    placeholder={'Contact Person Name...'}
                                    validationIcons
                                    required
                                />
                            </div>
                        </div>

                        {/* Sector Information */}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-3">
                            <Select
                                label={'Sector'}
                                {...(storedData
                                    ? {
                                          defaultValue: storedData.sectors,
                                      }
                                    : {})}
                                name={'sectors'}
                                options={sectorOptions}
                                placeholder={'Select Sectors...'}
                                loading={sectorResponse.isLoading}
                                onChange={onSectorChanged}
                                validationIcons
                            />

                            <Select
                                label={'Courses'}
                                name={'courses'}
                                defaultValue={courseOptions}
                                options={courseOptions}
                                loading={courseLoading}
                                disabled={
                                    storedData
                                        ? storedData?.courses?.length === 0
                                        : courseOptions?.length === 0
                                }
                                validationIcons
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
