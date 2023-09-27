import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import _debounce from 'lodash/debounce'
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

import {
    Button,
    Checkbox,
    Select,
    SelectOption,
    TextInput,
    Typography,
} from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { RtoFormData } from '@types'

export const RtoSignUpForm = ({
    onSubmit,
}: {
    onSubmit: (values: RtoFormData) => void
}) => {
    const router = useRouter()

    const { notification } = useNotification()

    const sectorResponse = AuthApi.useSectors({})
    const [checkEmailExists, emailCheckResult] = AuthApi.useEmailCheck()

    const [sectorOptions, setSectorOptions] = useState([])
    const [courseOptions, setCourseOptions] = useState([])
    const [courseLoading, setCourseLoading] = useState(false)

    const [courseValues, setCourseValues] = useState<SelectOption[]>([])

    const [storedData, setStoredData] = useState<any>(null)

    const [onAddressClicked, setOnAddressClicked] = useState<boolean>(false)
    const [onSuburbClicked, setOnSuburbClicked] = useState<boolean>(false)

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
        const filteredCourses = sectors.map((selectedSector: any) => {
            const sectorExisting = sectorResponse.data.find(
                (sector: any) => sector.id === selectedSector.value
            )
            if (sectorExisting && sectorExisting?.courses?.length) {
                return sectorExisting.courses
            }
        })

        const abc =
            sectors?.length > 0
                ? sectorResponse.data
                      .find(
                          (sector: any) =>
                              sector.id === sectors[sectors?.length - 1].value
                      )
                      ?.courses?.map((c: any) => ({
                          label: c?.title,
                          value: c?.id,
                      }))
                : []
        const abcIds = abc?.map((a: any) => a?.value)

        // setCourseValues((preVal: any) => [
        //     ...preVal?.filter((p: any) => !abcIds?.includes(p?.id)),
        //     ...abc,
        // ])

        const newCourseOptions: any = []
        filteredCourses.map((courseList: any) => {
            if (courseList && courseList.length) {
                return courseList.map((course: any) =>
                    newCourseOptions.push({
                        item: course,
                        value: course.id,
                        label: course.title,
                    })
                )
            }
        })

        setCourseOptions(newCourseOptions)
        setCourseValues(newCourseOptions)
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
        password: yup
            .string()
            // .matches(
            // 	strongPassword(),
            // 	"Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
            // )
            .required('Must provide password'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required('Must confirm entered password'),

        // Business Information
        abn: yup.string().required('Must provide ABN'),
        phone: yup.string().required('Must provide phone number'),

        // Sector Information
        // sectors: yup.array().min(1, 'Must select at least 1 sector'),
        // courses: yup.array().min(1, 'Must select at least 1 course'),

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

        agreedWithPrivacyPolicy: yup
            .boolean()
            .oneOf(
                [true],
                'Please check if you agree with our terms & policies'
            ),
    })

    useEffect(() => {
        if (sectorResponse.data?.length) {
            const options = sectorResponse.data?.map((sector: any) => ({
                label: sector.name,
                value: sector.id,
            }))
            setSectorOptions(options)
        }
    }, [sectorResponse.data])

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

    const formMethods = useForm<RtoFormData>({
        mode: 'all',
        resolver: yupResolver(validationSchema),
    })

    useEffect(() => {
        if (courseValues && courseValues?.length > 0) {
            formMethods.setValue('courses', courseValues)
        }
    }, [courseValues])

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
        <FormProvider {...formMethods}>
            <form
                className="flex flex-col gap-y-4"
                onSubmit={formMethods.handleSubmit(onHandleSubmit)}
            >
                {/* Personal Information */}
                <div className="flex flex-col lg:flex-row gap-x-16 border-t py-4">
                    <div className="w-full lg:w-2/6">
                        <Typography
                            variant={'subtitle'}
                            color={'text-gray-500'}
                        >
                            RTO Information
                        </Typography>
                        <p className="text-gray-400 text-sm leading-6">
                            Your information is required to make things clear
                            and transparent
                        </p>
                    </div>

                    <div className="w-full lg:w-4/6">
                        <TextInput
                            label={'Name'}
                            name={'name'}
                            placeholder={'RTO Name...'}
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

                {/* Sector Information */}
                <div className="flex flex-col lg:flex-row gap-x-16 border-t py-4">
                    <div className="w-full lg:w-2/6">
                        <Typography
                            variant={'subtitle'}
                            color={'text-gray-500'}
                        >
                            Sector Information
                        </Typography>
                        <p className="text-gray-400 text-sm leading-6">
                            Select your eligible sectors, and related courses.
                        </p>
                    </div>

                    <div className="w-full lg:w-4/6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2 gap-4">
                        <div>
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
                                multi
                                loading={sectorResponse.isLoading}
                                onChange={onSectorChanged}
                                validationIcons
                            />
                        </div>
                        <div>
                            <Select
                                label={'Courses'}
                                name={'courses'}
                                defaultValue={courseOptions}
                                value={courseValues}
                                options={courseOptions}
                                multi
                                loading={courseLoading}
                                onChange={(e: any) => {
                                    setCourseValues(e)
                                }}
                                disabled={
                                    storedData
                                        ? storedData?.courses?.length === 0
                                        : courseOptions?.length === 0
                                }
                                validationIcons
                                components={{
                                    Option: CourseSelectOption,
                                }}
                                formatOptionLabel={formatOptionLabel}
                            />
                        </div>
                    </div>
                </div>

                {/* Profile Information */}
                <div className="flex flex-col lg:flex-row gap-x-16 border-t py-4">
                    <div className="w-full lg:w-2/6">
                        <Typography
                            variant={'subtitle'}
                            color={'text-gray-500'}
                        >
                            Profile Information
                        </Typography>
                        <p className="text-gray-400 text-sm leading-6">
                            This will be your information used as account login.
                        </p>
                    </div>

                    <div className="w-full lg:w-4/6">
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

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                            <TextInput
                                label={'Password'}
                                name={'password'}
                                type={'password'}
                                placeholder={'Password...'}
                                validationIcons
                                required
                            />

                            <TextInput
                                label={'Confirm Password'}
                                name={'confirmPassword'}
                                type={'password'}
                                placeholder={'Confirm Password...'}
                                validationIcons
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Address Information */}
                <div className="flex flex-col lg:flex-row gap-x-16 border-t lg:py-4 pt-4 lg:pt-0">
                    <div className="w-full lg:w-2/6">
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

                    <div className="w-full lg:w-4/6">
                        <div className="grid grid-cols-1 gap-x-8">
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
                </div>

                <div className="w-full lg:w-4/6 lg:ml-auto lg:pl-12">
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
                                        <a className="text-link">Terms</a>
                                    </Link>{' '}
                                    {'&'}{' '}
                                    <Link legacyBehavior href="/privacy-policy">
                                        <a className="text-link">
                                            Privacy Policy
                                        </a>
                                    </Link>
                                </>
                            }
                        />
                    </div>

                    <div className="flex gap-x-4">
                        <Button text={'Continue'} submit />
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
    )
}
