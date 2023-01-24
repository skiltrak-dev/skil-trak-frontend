import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

// components
import {
    Button,
    Card,
    Select,
    ShowErrorNotifications,
    TextInput,
    Typography,
} from '@components'

// hooks
import { useActionModal, useContextBar, useNotification } from '@hooks'

// utills
import { AuthApi } from '@queries'
import { Course } from '@types'
import { onlyAlphabets } from '@utils'

export const IndustryProfileFrom = ({
    result,
    profile,
    onSubmit,
}: {
    result: any
    profile: any
    onSubmit: any
}) => {
    const { notification } = useNotification()
    const contextBar = useContextBar()

    const sectorResponse = AuthApi.useSectors({})
    const [sectorDefaultOptions, setSectorDefaultOptions] = useState<
        any | null
    >(null)
    const [sectors, setSectors] = useState<any | null>(null)
    const [courseOptions, setCourseOptions] = useState([])
    const [courseDefaultOptions, setCourseDefaultOptions] = useState([])

    const { onUpdatePassword, passwordModal } = useActionModal()

    const sectorOptions = sectorResponse?.data
        ? sectorResponse.data?.map((sector: any) => ({
              label: sector.name,
              value: sector.id,
          }))
        : []

    // remove duplicate Sectors
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

    useEffect(() => {
        contextBar.setContent(null)
        contextBar.hide()
    }, [])

    useEffect(() => {
        if (result.isSuccess) {
            notification.success({
                title: 'Profile Updated',
                description: 'Profile Updated Successfully',
            })
        }
    }, [result])

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
                id,
                courses,
                user,
                isActive,
                skiltrakId,
                updatedAt,
                createdAt,
                ...rest
            } = profile?.data
            const {
                socketId,
                avatar,
                createdAt: userCreatedAt,
                updatedAt: userUpdatedAt,
                messageCount,
                notificationViaEmail,
                notificationViaSms,
                password,
                refreshToken,
                skiltrakId: userSkiltrakId,
                id: { userId },
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
        }
    }, [profile])
    return (
        <Card>
            {passwordModal && passwordModal}
            <ShowErrorNotifications result={result} />
            <div className="mb-3 flex justify-end">
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
                                Industry Information
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
                            </div>
                        </div>
                    </div>
                    {/* Business Information */}
                    <div className="flex gap-x-16 border-t py-4">
                        <div className="w-2/6">
                            <Typography
                                variant={'subtitle'}
                                color={'text-gray-500'}
                            >
                                Business Information
                            </Typography>
                            <p className="text-gray-400 text-sm leading-6">
                                Your information is required to make things
                                clear and transparent
                            </p>
                        </div>

                        <div className="w-4/6">
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
                    </div>

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
                                    defaultValue={courseDefaultOptions}
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
                            text={'Update'}
                            loading={result.isLoading}
                            disabled={result.isLoading}
                        />
                    </div>
                </form>
            </FormProvider>
        </Card>
    )
}
