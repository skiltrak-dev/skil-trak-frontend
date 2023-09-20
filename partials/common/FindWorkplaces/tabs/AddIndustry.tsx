import Link from 'next/link'
import { AdminLayout } from '@layouts'
import { NextPageWithLayout } from '@types'
import { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import _debounce from 'lodash/debounce'
import * as yup from 'yup'

import { useNotification } from '@hooks'
import { AuthApi, commonApi } from '@queries'
import { isEmailValid, onlyAlphabets, SignUpUtils } from '@utils'

import {
    Button,
    Checkbox,
    Select,
    TextInput,
    Typography,
    ShowErrorNotifications,
    Card,
} from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { UserRoles } from '@constants'
export const AddIndustry = () => {
    const router = useRouter()

    const { notification } = useNotification()

    const sectorResponse = AuthApi.useSectors({})
    const [addIndustry, addIndustryResult] = commonApi.useAddIndustryMutation()

    const [checkEmailExists, emailCheckResult] = AuthApi.useEmailCheck()

    const [sectorOptions, setSectorOptions] = useState<any>([])
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
        businessName: yup
            .string()
            //    .matches(onlyAlphabets(), 'Please enter valid name')
            .required('Must provide your name'),

        email: yup
            .string()
            .email('Invalid Email')
            .required('Must provide email'),
        // password: yup
        //     .string()
        //     // .matches(
        //     // 	strongPassword(),
        //     // 	"Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        //     // )
        //     .required('Must provide password'),
        // confirmPassword: yup
        //     .string()
        //     .oneOf([yup.ref('password'), null], 'Passwords must match')
        //     .required('Must confirm entered password'),

        // Business Information
        // abn: yup.string().required('Must provide ABN'),
        phone: yup.string().required('Must provide phone number'),

        // Sector Information
        // sectors: yup.min(1, 'Must select at least 1 sector').required(),
        sector: yup.object().nullable(true).required(),
        // courses: yup.array().min(1, 'Must select at least 1 course').required(),

        // Contact Person Information
        // contactPerson: yup
        //     .string()
        //     .matches(onlyAlphabets(), 'Must be a valid name'),
        // contactPersonEmail: yup.string().email('Must be a valid email'),
        // contactPersonNumber: yup.string(),

        // Address Information
        address: yup.string().required('Must provide address'),
        // state: yup.string().required('Must provide name of state'),
        // suburb: yup.string().required('Must provide suburb name'),
        // zipCode: yup.string().required('Must provide zip code for your state'),

        // agreedWithPrivacyPolicy: yup
        //     .boolean()
        //     .oneOf(
        //         [true],
        //         'Please check if you agree with our terms & policies'
        //     ),
    })
    const formMethods = useForm({
        mode: 'all',
        resolver: yupResolver(validationSchema),
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
    useEffect(() => {
        if (addIndustryResult.isSuccess) {
            notification.success({
                title: 'Industry Added',
                description: `Industry  has been added successfully.`,
            })
            formMethods.reset()
        }
    }, [addIndustryResult.isSuccess])

    const onBackToReview = () => {
        SignUpUtils.setEditingMode(false)
        router.push('/auth/signup/review-signup-info')
    }

    const onSubmit = (values: any) => {
        const data = {
            ...values,
            // courses: values.courses.map((course: any) => course.value),
            sector: values.sector.value,
            // role: UserRoles.INDUSTRY,
        }
        SignUpUtils.setValuesToStorage(values)
        addIndustry(data)
        // router.push('/portals/admin/search-workplaces?tab=all&page=1&pageSize=50')
    }
    return (
        <>
            <ShowErrorNotifications result={addIndustryResult} />
            <FormProvider {...formMethods}>
                <form
                    className="flex flex-col"
                    onSubmit={formMethods.handleSubmit(onSubmit)}
                >
                    <div className="">
                        <div className="">
                            <div className="grid grid-cols-1  gap-y-2">
                                <TextInput
                                    label={'Name'}
                                    name={'businessName'}
                                    placeholder={'Industry Name...'}
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
                                    onBlur={onEmailChange}
                                    loading={emailCheckResult.isLoading}
                                />
                                <Select
                                    label={'Sector'}
                                    //  {...(storedData
                                    //      ? {
                                    //            defaultValue: storedData.sectors,
                                    //        }
                                    //      : {})}
                                    name={'sector'}
                                    options={sectorOptions}
                                    placeholder={'Select Sectors...'}
                                    loading={sectorResponse.isLoading}
                                    onChange={onSectorChanged}
                                    validationIcons
                                />
                            </div>
                        </div>
                    </div>

                    <div className="py-4 pr-8">
                        <div className="grid grid-cols-1 gap-y-2">
                            <TextInput
                                label={'Phone Number'}
                                name={'phone'}
                                placeholder={'Your phone number...'}
                                validationIcons
                                required
                            />

                            <TextInput
                                label={'Address'}
                                name={'address'}
                                placeholder={'Your Address Line 1...'}
                                validationIcons
                                placesSuggetions
                            />
                            <div>
                                <TextInput
                                    label={'Website (Optional)'}
                                    name={'website'}
                                    placeholder={'Website Url...'}
                                    validationIcons
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-4">
                        <div className="flex justify-start">
                            <Button
                                text={'Add Industry'}
                                submit
                                disabled={addIndustryResult?.isLoading}
                                loading={addIndustryResult?.isLoading}
                            />
                        </div>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}
