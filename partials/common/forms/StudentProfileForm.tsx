import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'

// components
import {
    Button,
    Card,
    TextInput,
    Typography,
    Select,
    Avatar,
} from '@components'

// utils
import { getDate, onlyAlphabets } from '@utils'
import { AuthApi } from '@queries'
import { Course, Sector } from '@types'
import { useActionModal, useNotification } from '@hooks'

export const StudentProfileForm = ({
    profile,
    result,
    onSubmit,
}: {
    profile: any
    result: any
    onSubmit: any
}) => {
    const { notification } = useNotification()

    const sectorResponse = AuthApi.useSectors({})
    const rtoResponse = AuthApi.useRtos({})
    const [sectorDefaultOptions, setSectorDefaultOptions] = useState<
        any | null
    >(null)
    const [sectors, setSectors] = useState<any | null>(null)
    const [courseOptions, setCourseOptions] = useState([])
    const [courseDefaultOptions, setCourseDefaultOptions] = useState([])

    const { onUpdatePassword, passwordModal } = useActionModal()

    useEffect(() => {
        if (result.isSuccess) {
            notification.success({
                title: 'Profile Updated',
                description: 'Profile Updated Successfully',
            })
        }
    }, [result])

    const sectorOptions = sectorResponse?.data
        ? sectorResponse.data?.map((sector: any) => ({
              label: sector.name,
              value: sector.id,
          }))
        : []

    const rtoOptions = rtoResponse.data?.length
        ? rtoResponse?.data?.map((rto: any) => ({
              label: rto.user.name,
              value: rto.id,
          }))
        : []
    const rtoDefaultOptions = profile?.data?.rto
        ? {
              label: profile?.data?.rto?.user?.name,
              value: profile?.data?.rto?.id,
          }
        : {}

    useEffect(() => {
        if (profile?.data) {
            setSectors([
                ...new Map(
                    profile?.data?.courses
                        ?.map((c: any) => c.sector)
                        ?.map((v: any) => [v.id, v])
                ).values(),
            ])
        }
    }, [profile?.data])

    useEffect(() => {
        if (sectors && sectors?.length > 0) {
            setSectorDefaultOptions(
                sectors?.map((sector: any) => ({
                    label: sector?.name,
                    value: sector?.id,
                }))
            )
        }
    }, [sectors])

    useEffect(() => {
        if (sectorDefaultOptions && sectorDefaultOptions?.length > 0) {
            onSectorChanged(sectorDefaultOptions, true)
        }
    }, [sectorDefaultOptions, sectorResponse])

    const onSectorChanged = (sectors: any, chkDefaultOptions?: boolean) => {
        const filteredCourses = sectors.map((selectedSector: any) => {
            const sectorExisting = sectorResponse.data?.find(
                (sector: any) => sector?.id === selectedSector?.value
            )
            if (sectorExisting && sectorExisting?.courses?.length) {
                return sectorExisting?.courses
            }
        })

        let newCourseOptions: any = []
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

        // if (chkDefaultOptions) {
        //     newCourseOptions = newCourseOptions?.filter((s: any) =>
        //         courses.includes(s.label)
        //     )
        // }
        const courses = profile?.data?.courses?.map((c: Course) => c.title)
        setCourseDefaultOptions(
            newCourseOptions?.filter((s: any) => courses?.includes(s.label))
        )
        setCourseOptions(newCourseOptions)
    }
    const validationSchema = yup.object({
        // Profile Information
        name: yup.string().required('Must provide your name'),

        email: yup
            .string()
            .email('Invalid Email')
            .required('Must provide email'),

        dob: yup.date().required('Must provide Date of Birth'),

        phone: yup.string().required('Must provide phone number'),

        // Contact Person Information
        emergencyPerson: yup
            .string()
            .matches(onlyAlphabets(), 'Must be a valid name'),
        emergencyPersonPhone: yup.string(),

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
                result,
                rto,
                savedJobs,
                user,
                workplace,
                updatedAt,
                createdAt,
                ...rest
            } = profile?.data
            const values = {
                courses: courses?.map((c: Course) => c.id),
                rto: rto?.id,
                ...rest,
                ...user,
            }
            for (const key in values) {
                formMethods.setValue(key, values[key])
            }
        }
    }, [profile])
    return (
        <>
            <Avatar
                avatar={profile?.data?.user?.avatar}
                user={profile?.data?.user?.id}
            />
            <Card>
                {passwordModal && passwordModal}
                <div className="flex justify-end mb-3">
                    <Button
                        text={'Update Password'}
                        onClick={() => onUpdatePassword(profile?.data)}
                    />
                </div>
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
                                    Student Information
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
                                        required
                                        disabled
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
                                </div>
                            </div>
                        </div>

                        {Object.values(rtoDefaultOptions)?.filter(
                            (f) => f !== undefined
                        )?.length > 0 && (
                            <Select
                                label={'RTO'}
                                {...(Object.values(rtoDefaultOptions)?.filter(
                                    (f) => f !== undefined
                                )?.length > 0 && {
                                    defaultValue: rtoDefaultOptions,
                                })}
                                name={'rto'}
                                options={rtoOptions}
                                placeholder={'Select RTO...'}
                                onlyValue
                                loading={rtoResponse.isLoading}
                                validationIcons
                            />
                        )}
                        {!Object.keys(rtoDefaultOptions)?.length && (
                            <Select
                                label={'RTO'}
                                name={'rto'}
                                options={rtoOptions}
                                placeholder={'Select RTO...'}
                                onlyValue
                                loading={rtoResponse.isLoading}
                                validationIcons
                            />
                        )}

                        <div className="w-4/6 grid grid-cols-1 gap-y-4">
                            <div>
                                {sectorDefaultOptions &&
                                    sectorDefaultOptions?.length > 0 && (
                                        <Select
                                            label={'Sector'}
                                            {...(sectorDefaultOptions &&
                                                sectorDefaultOptions?.length >
                                                    0 && {
                                                    defaultValue:
                                                        sectorDefaultOptions,
                                                })}
                                            name={'sectors'}
                                            options={sectorOptions}
                                            placeholder={'Select Sectors...'}
                                            multi
                                            loading={sectorResponse.isLoading}
                                            onChange={onSectorChanged}
                                            validationIcons
                                        />
                                    )}
                                {!sectorDefaultOptions?.length && (
                                    <Select
                                        label={'Sector'}
                                        name={'sectors'}
                                        options={sectorOptions}
                                        placeholder={'Select Sectors...'}
                                        multi
                                        loading={sectorResponse.isLoading}
                                        onChange={onSectorChanged}
                                        validationIcons
                                    />
                                )}
                            </div>
                            <div>
                                {courseOptions && courseOptions?.length > 0 && (
                                    <Select
                                        label={'Courses'}
                                        name={'courses'}
                                        defaultValue={
                                            courseOptions ||
                                            courseDefaultOptions
                                        }
                                        options={courseOptions}
                                        multi
                                        disabled={courseOptions?.length === 0}
                                        validationIcons
                                        onlyValue
                                    />
                                )}
                                {!courseOptions?.length && (
                                    <Select
                                        label={'Courses'}
                                        name={'courses'}
                                        defaultValue={courseOptions}
                                        options={courseOptions}
                                        multi
                                        disabled={courseOptions?.length === 0}
                                        validationIcons
                                        onlyValue
                                    />
                                )}
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
                                    This will be your information used as
                                    account login.
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
                                    This will help us to find out about your
                                    nearby sites
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
                                text={'Update'}
                                submit
                                loading={result.isLoading}
                                disabled={result.isLoading}
                            />
                        </div>
                    </form>
                </FormProvider>
            </Card>
        </>
    )
}
