import { Button, Select, ShowErrorNotifications, TextInput } from '@components'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import _debounce from 'lodash/debounce'
import { CourseSelectOption, isEmailValid } from '@utils'

import { AuthApi, SubAdminApi } from '@queries'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNotification } from '@hooks'
import { UserRoles } from '@constants'

export const AddSecondWorkplaceForm = ({
    studentId,
    studentUserId,
}: {
    studentId: number
    studentUserId: number
}) => {
    const [lastEnteredEmail, setLastEnteredEmail] = useState('')
    const [sectorOptions, setSectorOptions] = useState([])
    const [courseOptions, setCourseOptions] = useState([])
    const [courseLoading, setCourseLoading] = useState(false)

    const { notification } = useNotification()

    const [checkEmailExists, emailCheckResult] = AuthApi.useEmailCheck()
    const sectorResponse = AuthApi.useSectors({})
    const [addWorkplaceIndustry, addWorkplaceIndustryResult] =
        SubAdminApi.Student.useAddCustomWorkplace()

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

    useEffect(() => {
        if (addWorkplaceIndustryResult.isSuccess) {
            notification.success({
                title: 'Workplace Industry Added',
                description: 'Workplace Indiustry Added Successfully',
            })
        }
    }, [addWorkplaceIndustryResult])

    useEffect(() => {
        if (sectorResponse.data?.length) {
            const options = sectorResponse.data?.map((sector: any) => ({
                label: sector.name,
                value: sector.id,
            }))
            setSectorOptions(options)
        }
    }, [sectorResponse?.data])

    const onSectorChanged = (sectors: any) => {
        setCourseLoading(true)

        const sectorExisting = sectorResponse?.data?.find(
            (sector: any) => sector.id === sectors?.value
        )
        const newCourseOptions: any = []
        sectorExisting?.courses?.map((course: any) =>
            newCourseOptions.push({
                item: course,
                value: course.id,
                label: course.title,
            })
        )
        setCourseOptions(newCourseOptions)
        setCourseLoading(false)
    }

    const validationSchema = yup.object({
        // Profile Information
        name: yup.string().required('Must provide your name'),

        email: yup
            .string()
            .email('Invalid Email')
            .required('Must provide email'),

        // Business Information
        abn: yup.string().required('Must provide ABN'),
        phoneNumber: yup.string().required('Must provide phone number'),

        // Sector Information
        // sectors: yup.object().nullable(true).required(),
        course: yup.number().required(),

        // Contact Person Information
        contactPersonName: yup.string().required(),
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

    const onSubmit = (values: any) => {
        addWorkplaceIndustry({
            ...values,
            courses: [values?.course],
            role: UserRoles.INDUSTRY,
            studentId: studentUserId,
            password: 'N/A',
        })
    }
    return (
        <div>
            <ShowErrorNotifications result={addWorkplaceIndustryResult} />
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
                        name={'sectors'}
                        options={sectorOptions}
                        placeholder={'Select Sectors...'}
                        loading={sectorResponse.isLoading}
                        onChange={onSectorChanged}
                        validationIcons
                    />

                    <Select
                        label={'Courses'}
                        name={'course'}
                        defaultValue={courseOptions}
                        options={courseOptions}
                        loading={courseLoading}
                        onlyValue
                        components={{
                            Option: CourseSelectOption,
                        }}
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

                    {/* Address Information */}
                    <TextInput
                        label={'Address Line 1'}
                        name={'addressLine1'}
                        placeholder={'Your Address Line 1...'}
                        validationIcons
                        placesSuggetions
                    />

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

                    <div className="flex gap-x-4">
                        <Button
                            text={'Continue'}
                            submit
                            loading={addWorkplaceIndustryResult?.isLoading}
                            disabled={addWorkplaceIndustryResult?.isLoading}
                        />
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
