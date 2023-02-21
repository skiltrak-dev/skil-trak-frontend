import { useEffect, useState } from 'react'

import * as yup from 'yup'

import { onlyAlphabets } from '@utils'

import {
    Button,
    TextInput,
    Typography,
    Card,
    Avatar,
    ShowErrorNotifications,
    Select,
    LoadingAnimation,
    TechnicalError,
    EmptyData,
} from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProvider, useForm } from 'react-hook-form'
import { Course, Sector } from '@types'
import { AuthApi } from '@queries'

export const RTOProfileEditForm = ({
    onSubmit,
    profile,
    result,
}: {
    onSubmit: any
    profile: any
    result: any
}) => {
    const sectorResponse = AuthApi.useSectors({})
    const [sectorDefaultOptions, setSectorDefaultOptions] = useState<
        any | null
    >(null)
    const [sectors, setSectors] = useState<any | null>(null)
    const [courseOptions, setCourseOptions] = useState([])
    const [courseDefaultOptions, setCourseDefaultOptions] = useState([])

    const sectorOptions = sectorResponse?.data
        ? sectorResponse.data?.map((sector: any) => ({
              label: sector.name,
              value: sector.id,
          }))
        : []

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
            onSectorChanged(sectorDefaultOptions)
        }
    }, [sectorDefaultOptions, sectorResponse])

    const onSectorChanged = (sectors: any) => {
        const filteredCourses = sectors.map((selectedSector: any) => {
            const sectorExisting = sectorResponse.data?.find(
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

        const courses = profile?.data?.courses?.map((c: Course) => c.title)
        setCourseDefaultOptions(
            newCourseOptions?.filter((s: any) => courses.includes(s.label))
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
            const {
                id: userId,
                notes,
                notificationViaEmail,
                notificationViaSms,
                avatar,
                isActive,
                messageCount,
                skiltrakId,
                refreshToken,
                password,
                updatedAt: userUpdatedAt,
                createdAt: userCreatedAt,
                socketId,
                ...userRest
            } = user
            const values = {
                courses: courses?.map((c: Course) => c.id),
                ...rest,
                ...userRest,
            }
            for (const key in values) {
                formMethods.setValue(key, values[key])
            }
            // formMethods.setValue('sector', sectorDefaultOptions)
        }
    }, [profile, sectorResponse])

    return (
        <>
            {profile.isError && <TechnicalError />}
            {profile.isLoading ? (
                <LoadingAnimation height={'h-[50vh]'} />
            ) : profile?.data ? (
                <Card>
                    <ShowErrorNotifications result={result} />
                    <div className="flex justify-between gap-x-16 border-t py-4">
                        <div className="w-4/6">
                            <FormProvider {...formMethods}>
                                <form
                                    className="flex flex-col gap-y-4"
                                    onSubmit={formMethods.handleSubmit(
                                        onSubmit
                                    )}
                                >
                                    {/* Personal Information */}

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

                                    {/* Profile Information */}
                                    <div className="flex gap-x-16 border-t py-4">
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

                                    <div className="w-4/6 grid grid-cols-1 gap-y-4">
                                        <div>
                                            {sectorDefaultOptions &&
                                                sectorDefaultOptions?.length >
                                                    0 && (
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
                                                        placeholder={
                                                            'Select Sectors...'
                                                        }
                                                        multi
                                                        loading={
                                                            sectorResponse.isLoading
                                                        }
                                                        onChange={
                                                            onSectorChanged
                                                        }
                                                        validationIcons
                                                    />
                                                )}
                                            {!sectorDefaultOptions?.length && (
                                                <Select
                                                    label={'Sector'}
                                                    name={'sectors'}
                                                    options={sectorOptions}
                                                    placeholder={
                                                        'Select Sectors...'
                                                    }
                                                    multi
                                                    loading={
                                                        sectorResponse.isLoading
                                                    }
                                                    onChange={onSectorChanged}
                                                    validationIcons
                                                />
                                            )}
                                        </div>
                                        <div>
                                            {courseOptions &&
                                                courseOptions?.length > 0 && (
                                                    <Select
                                                        label={'Courses'}
                                                        name={'courses'}
                                                        defaultValue={
                                                            courseDefaultOptions
                                                        }
                                                        options={courseOptions}
                                                        multi
                                                        onlyValue
                                                        disabled={
                                                            courseOptions?.length ===
                                                            0
                                                        }
                                                        validationIcons
                                                    />
                                                )}
                                            {!courseOptions?.length && (
                                                <Select
                                                    label={'Courses'}
                                                    name={'courses'}
                                                    options={courseOptions}
                                                    multi
                                                    onlyValue
                                                    disabled={
                                                        courseOptions?.length ===
                                                        0
                                                    }
                                                    validationIcons
                                                />
                                            )}
                                        </div>
                                    </div>

                                    {/* Address Information */}
                                    <div className="flex flex-col gap-x-16 border-t py-4">
                                        <div className="grid grid-cols-1 gap-x-8">
                                            <TextInput
                                                label={'Address Line 1'}
                                                name={'addressLine1'}
                                                placeholder={
                                                    'Your Address Line 1...'
                                                }
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

                                    <div>
                                        <Button
                                            submit
                                            text={'Continue'}
                                            loading={result.isLoading}
                                            disabled={result.isLoading}
                                        />
                                    </div>
                                </form>
                            </FormProvider>
                        </div>
                        <Avatar avatar={profile?.data?.user?.avatar} />
                    </div>
                </Card>
            ) : (
                !profile.isError &&
                profile.isSuccess && (
                    <EmptyData
                        title={'RTO Not Found'}
                        description={
                            'RTO has been removed or it doesnot exist in our system'
                        }
                    />
                )
            )}
        </>
    )
}
