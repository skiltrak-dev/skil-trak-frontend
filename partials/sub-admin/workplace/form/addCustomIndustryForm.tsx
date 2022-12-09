import Link from 'next/link'
import { useEffect, useState } from 'react'
import { UserRoles } from '@constants'

import _debounce from 'lodash/debounce'
import * as yup from 'yup'

import { useNotification } from '@hooks'
import { AuthApi, useAddCustomIndustryMutation } from '@queries'
import { isEmailValid, onlyAlphabets, SignUpUtils } from '@utils'

import { Button, Checkbox, Select, TextInput } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'

export const AddCustomIndustryForm = ({ workplaceId }: any) => {
    const { notification } = useNotification()
    const { hide } = useContextBar()

    const sectorResponse = AuthApi.useSectors({})
    const [checkEmailExists, emailCheckResult] = AuthApi.useEmailCheck()
    const [addCustomIndustry, addCustomIndustryResult] =
        useAddCustomIndustryMutation()

    const [sectorOptions, setSectorOptions] = useState([])
    const [courseOptions, setCourseOptions] = useState([])
    const [courseLoading, setCourseLoading] = useState(false)

    const [storedData, setStoredData] = useState<any>(null)

    const [lastEnteredEmail, setLastEnteredEmail] = useState('')

    useEffect(() => {
        if (addCustomIndustryResult.isSuccess) {
            notification.success({
                title: 'Industry Added Successfully',
                description: 'Industry Added Successfully',
            })
            hide()
        }
    }, [addCustomIndustryResult])

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
            const sectorExisting = sectorResponse?.data?.find(
                (sector: any) => sector.id === selectedSector.value
            )
            if (sectorExisting && sectorExisting?.courses?.length) {
                return sectorExisting.courses
            }
        })

        const newCourseOptions: any = []
        filteredCourses.map((courseList: any) => {
            if (courseList && courseList.length) {
                return courseList.map((course: any) =>
                    newCourseOptions.push({
                        label: course.title,
                        value: course.id,
                    })
                )
            }
        })

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
        phoneNumber: yup.string().required('Must provide phone number'),

        // Sector Information
        sectors: yup.array().min(1, 'Must select at least 1 sector'),
        courses: yup.array().min(1, 'Must select at least 1 course'),

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

    const formMethods = useForm({
        mode: 'all',
        resolver: yupResolver(validationSchema),
    })

    const onSubmit = (values: any) => {
        addCustomIndustry({
            id: workplaceId,
            body: {
                ...values,
                courses: values.courses?.map((c: any) => c.value),
                sectors: values.sectors?.map((s: any) => s.value),
                // package: formData.package.id,
                role: UserRoles.INDUSTRY,
            },
        })
    }

    return (
        <>
            <FormProvider {...formMethods}>
                <form onSubmit={formMethods.handleSubmit(onSubmit)}>
                    {/* Personal Information */}
                    <TextInput
                        label={'Name'}
                        name={'name'}
                        placeholder={'Industry Name...'}
                        validationIcons
                        required
                    />

                    <TextInput
                        label={'ABN'}
                        name={'abn'}
                        placeholder={'ABN...'}
                        validationIcons
                        required
                    />

                    <TextInput
                        label={'Website (Optional)'}
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

                    {/* Business Information */}
                    <TextInput
                        label={'Business Name'}
                        name={'businessName'}
                        placeholder={'Industry Name...'}
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
                    <TextInput
                        label={'Contact Person Name'}
                        name={'contactPersonName'}
                        placeholder={'Contact Person Name...'}
                        validationIcons
                        required
                    />

                    {/* Sector Information */}
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

                    <Select
                        label={'Courses'}
                        name={'courses'}
                        defaultValue={courseOptions}
                        options={courseOptions}
                        multi
                        loading={courseLoading}
                        disabled={
                            storedData
                                ? storedData?.courses?.length === 0
                                : courseOptions?.length === 0
                        }
                        validationIcons
                    />

                    {/* Profile Information */}
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

                    {/* Address Information */}
                    <TextInput
                        label={'Address Line 1'}
                        name={'addressLine1'}
                        placeholder={'Your Address Line 1...'}
                        validationIcons
                    />

                    <TextInput
                        label={'Address Line 2'}
                        name={'addressLine2'}
                        placeholder={'Your Address Line 2...'}
                        validationIcons
                    />

                    <TextInput
                        label={'State'}
                        name={'state'}
                        placeholder={'State...'}
                        validationIcons
                    />

                    <TextInput
                        label={'Suburb'}
                        name={'suburb'}
                        placeholder={'Suburb...'}
                        validationIcons
                    />

                    <TextInput
                        label={'Zip Code'}
                        name={'zipCode'}
                        placeholder={'Zip Code...'}
                        validationIcons
                    />

                    <div className="mb-6">
                        <Checkbox
                            name={'agreedWithPrivacyPolicy'}
                            label={
                                <>
                                    I agree with{' '}
                                    <Link href="/terms-and-conditions">
                                        <a className="text-link">Terms</a>
                                    </Link>{' '}
                                    {'&'}{' '}
                                    <Link href="/privacy-policy">
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
                            loading={addCustomIndustryResult?.isLoading}
                            disabled={addCustomIndustryResult?.isLoading}
                        />
                    </div>
                </form>
            </FormProvider>
        </>
    )
}
