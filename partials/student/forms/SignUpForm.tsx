import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useState } from 'react'
import 'react-phone-number-input/style.css'

import _debounce from 'lodash/debounce'
import * as yup from 'yup'

import { useNotification } from '@hooks'
import { AuthApi } from '@queries'
import {
    courseOptionsWhenSectorChange,
    CourseSelectOption,
    formatOptionLabel,
    getSectorsDetail,
    isEmailValid,
    onlyAlphabets,
    SignUpUtils,
} from '@utils'

import {
    Button,
    Checkbox,
    PhoneInputWithCountry,
    Select,
    SelectOption,
    TextInput,
    Typography,
} from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { StudentFormType } from '@types'
import debounce from 'lodash/debounce'
import { fromAddress, geocode, GeocodeOptions, setKey } from 'react-geocode'
import { FormProvider, useForm } from 'react-hook-form'

export const StudentSignUpForm = ({
    onSubmit,
}: {
    onSubmit: (values: StudentFormType) => void
}) => {
    const router = useRouter()

    const { notification } = useNotification()

    const [onSuburbClicked, setOnSuburbClicked] = useState<boolean>(true)
    const [searchRto, setSearchRto] = useState<string>('')
    const [selectedRto, setSelectedRto] = useState<number | null>(null)
    const [selectedSector, setSelectedSector] = useState<any>(null)
    const [removedCourses, setRemovedCourses] = useState<number[] | null>(null)
    const [courseOptions, setCourseOptions] = useState<SelectOption[]>([])
    const [courseLoading, setCourseLoading] = useState(false)
    const [courseValues, setCourseValues] = useState<number[]>([])

    const rtoResponse = AuthApi.useSearchRtos(
        { search: searchRto },
        {
            skip: !searchRto,
        }
    )

    const sectorResponse = AuthApi.useSectorsByRto(Number(selectedRto), {
        skip: !selectedRto,
    })

    const hader = router?.pathname?.split('/')?.[4]

    useEffect(() => {
        if (hader) {
            setSearchRto(hader)
        }
    }, [hader])

    useEffect(() => {
        if (hader) {
            setSelectedRto(rtoResponse?.data?.[0]?.id)
        }
    }, [hader, rtoResponse?.data])

    const sectorsDetails = getSectorsDetail(sectorResponse?.data)

    const [checkEmailExists, emailCheckResult] = AuthApi.useEmailCheck()

    const sectorOptions = sectorsDetails?.length
        ? sectorsDetails?.map((sector: any) => ({
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

    // const {
    //     courseLoading,
    //     courseOptions,
    //     onCourseChange,
    //     onSectorChanged,
    //     sectorOptions,
    //     courseValues,
    //     setCourseOptions,
    //     sectorLoading,
    // } = useSectorsAndCoursesOptions()

    const onSectorChanged = (sectors: any) => {
        setSelectedSector(sectors)
        setCourseLoading(true)

        const newCourseOptions = sectorResponse?.data
            ?.filter((course: any) =>
                sectors?.map((s: any) => s?.value)?.includes(course?.sector?.id)
            )
            ?.map((course: any) => ({
                label: course?.title,
                value: course?.id,
                item: course,
            }))

        // const newCourseOptions = sectorsCoursesOptions(sectors, sectorsDetails)
        setCourseOptions(newCourseOptions)

        const newSelectedCoursesOptions = courseOptionsWhenSectorChange(
            newCourseOptions,
            removedCourses as number[]
        )
        setCourseValues(newCourseOptions)
        setCourseLoading(false)
    }

    const onCourseChange = (e: number[]) => {
        setCourseValues(e)
        // const removedValue = getRemovedCoursesFromList(courseOptions, e)
        // setRemovedCourses(removedValue)
    }
    // const onRtoChange = (rto: any) => {
    //    const filteredCourses = rto.map((selectedRto: any) => {
    //       const rtoExisting = rtoResponse.data?.find(
    //          (rto: any) => rto.id === selectedRto.value
    //       )
    //       if (rtoExisting && rtoExisting?.courses?.length) {
    //          return rtoExisting.courses
    //       }
    //    })
    // }

    const validationSchema = yup.object({
        // Profile Information
        name: yup
            .string()
            // .matches(onlyAlphabets(), 'Please enter valid name')
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
        emergencyPerson: yup.string().required('Must provide Emergency Person'),
        emergencyPersonPhone: yup
            .string()
            .required('Must provide Emergency Person Phone'),

        rto: yup.number().required('Must provide RTO'),
        // dob: yup.date().nullable(true).required('Must provide Date of Birth'),
        age: yup.string().nullable().required('Must Select age'),

        phone: yup
            .string()
            .nullable(true)
            .min(12, 'Phone Number must be 9 number')
            .required('Must provide phone number'),

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
        // state: yup.string().required('Must provide name of state'),
        // suburb: yup.string().required('Must provide suburb name'),
        zipCode: yup.string().required('Must provide zip code for your state'),

        agreedWithPrivacyPolicy: yup
            .boolean()
            .oneOf(
                [true],
                'Please check if you agree with our terms & policies'
            ),
    })

    useEffect(() => {
        if (SignUpUtils.getEditingMode()) {
            const values = SignUpUtils.getValuesFromStorage()
            setStoredData(values)
            setCourseOptions(values?.courses)
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
        router.push({ query: { step: 'review-info' } })
    }
    useEffect(() => {
        setKey(process.env.NEXT_PUBLIC_MAP_KEY as string)
    }, [])

    const formMethods = useForm({
        mode: 'all',
        defaultValues: SignUpUtils.getEditingMode()
            ? SignUpUtils.getValuesFromStorage()
            : {},
        resolver: yupResolver(validationSchema),
    })

    // useEffect(() => {
    //     if (courseOptions && courseOptions?.length > 0) {
    //         formMethods.setValue('courses', courseOptions)
    //     }
    // }, [courseOptions])

    const onHandleSubmit = (values: any) => {
        if (!onSuburbClicked) {
            notification.error({
                title: 'You must select on Address Dropdown',
                description: 'You must select on Address Dropdown',
            })
        } else if (onSuburbClicked) {
            onSubmit({ ...values, suburb: 'N/A' })
        }
    }
    const ageOptions = [
        {
            label: '16-25',
            value: '16-25',
        },
        {
            label: '27-36',
            value: '27-36',
        },
        {
            label: '37-46',
            value: '37-46',
        },
        {
            label: '47-56',
            value: '47-56',
        },
    ]

    const debounceValue = useCallback(
        debounce((query) => setSearchRto(query), 700),
        []
    )

    const addressValue = formMethods.watch('addressLine1')
    useEffect(() => {
        if (addressValue) {
            formMethods.setValue('addressLine1', addressValue, {
                shouldValidate: true,
                shouldDirty: true,
            })
            if (!onSuburbClicked) {
                formMethods.setError('addressLine1', {
                    type: 'manual',
                    message: 'Please select an address from the dropdown',
                })
            } else {
                formMethods.clearErrors('addressLine1')
            }
        }
    }, [onSuburbClicked, addressValue])

    const handleAddressChange = (e: any) => {
        setOnSuburbClicked(false)
        // formMethods.setValue('addressLine1', e?.target?.value)

        // if (!onSuburbClicked) {
        //     formMethods.setError('addressLine1', {
        //         type: 'manual',
        //         message: 'Please select an address from the dropdown',
        //     })
        // }
        if (e?.target?.value?.length > 4) {
            fromAddress(e?.target?.value)
                .then(({ results }: any) => {
                    const { lat, lng } = results[0].geometry.location
                    geocode('latlng', `${lat},${lng}`, {
                        key: process.env.NEXT_PUBLIC_MAP_KEY,
                    } as GeocodeOptions)
                        .then((response) => {
                            const addressComponents =
                                response.results[0].address_components

                            const state = addressComponents.find(
                                (component: any) =>
                                    component.types.includes(
                                        'administrative_area_level_1'
                                    )
                            )?.long_name

                            formMethods.setValue('state', state || 'N/A')

                            for (let component of addressComponents) {
                                if (component.types.includes('postal_code')) {
                                    formMethods.setValue(
                                        'zipCode',
                                        component.long_name
                                    )

                                    break
                                }
                            }
                        })
                        .catch((error) => {
                            console.error({
                                error,
                            })
                        })
                })
                .catch(console.error)
        }
    }

    return (
        <FormProvider {...formMethods}>
            <form
                className="flex flex-col gap-y-4"
                onSubmit={formMethods.handleSubmit(onHandleSubmit)}
            >
                {/* Personal Information */}
                <div className="w-full">
                    <Typography variant={'subtitle'} color={'text-gray-500'}>
                        Student Information
                    </Typography>
                    <p className="text-gray-400 text-sm leading-6">
                        Your information is required to make things clear and
                        transparent
                    </p>
                </div>
                <div className="flex flex-col lg:flex-row gap-x-16 border-t py-4">
                    <div className="w-full">
                        <TextInput
                            label={'Name'}
                            name={'name'}
                            placeholder={'Student Name...'}
                            validationIcons
                            required
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                            <TextInput
                                label={'Family Name'}
                                name={'familyName'}
                                placeholder={'Family Name...'}
                                validationIcons
                                required
                            />
                            {/* <TextInput
                                label={'Phone Number'}
                                name={'phone'}
                                placeholder={'Your phone number...'}
                                validationIcons
                                required
                            /> */}
                            <PhoneInputWithCountry
                                label={'Phone'}
                                required
                                name={'phone'}
                                validationIcons
                                countries={['AU']}
                                defaultCountry={'AU'}
                                placeholder={'Enter your number'}
                            />

                            <TextInput
                                label={'Student ID'}
                                name={'studentId'}
                                placeholder={'Student ID...'}
                                validationIcons
                                required
                            />
                            {/* <TextInput
                                label={'Date of Birth'}
                                name={'dob'}
                                type="date"
                                max={getDate()}
                                placeholder={'Date of Birth...'}
                                validationIcons
                                required
                            /> */}
                            <Select
                                {...(storedData
                                    ? { defaultValue: storedData?.age }
                                    : {})}
                                label={'Select Age'}
                                name={'age'}
                                options={ageOptions}
                                placeholder={'Select Age...'}
                                validationIcons
                                onlyValue
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
                            {/* <TextInput
                        label={'RTO'}
                        name={'rto'}
                        placeholder={'RTO...'}
                        validationIcons
                        required
                     /> */}
                            <Select
                                label={'Search RTOs'}
                                {...(storedData
                                    ? {
                                          defaultValue: storedData.sectors,
                                      }
                                    : {})}
                                onInputChange={(e: any) => {
                                    debounceValue(e)
                                }}
                                name={'rto'}
                                options={rtoOptions}
                                placeholder={'Search Rtos...'}
                                loading={rtoResponse.isLoading}
                                onChange={(e: any) => {
                                    setSelectedRto(e)
                                }}
                                validationIcons
                                onlyValue
                                {...(hader ? { value: rtoOptions?.[0] } : {})}
                            />
                        </div>
                    </div>
                </div>

                {/* Sector Information */}
                <div className="w-full">
                    <Typography variant={'subtitle'} color={'text-gray-500'}>
                        Sector Information
                    </Typography>
                    <p className="text-gray-400 text-sm leading-6">
                        Select your eligible sectors, and related courses.
                    </p>
                </div>
                <div className="flex flex-col lg:flex-row gap-x-16 border-t py-4">
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
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
                                loading={sectorResponse?.isLoading}
                                onChange={onSectorChanged}
                                validationIcons
                            />
                        </div>
                        <div>
                            <Select
                                label={'Courses'}
                                name={'courses'}
                                defaultValue={courseOptions}
                                // value={courseOptions?.filter(
                                //     (course: OptionType) =>
                                //         courseValues?.includes(
                                //             course?.value as number
                                //         )
                                // )}
                                value={courseValues}
                                options={courseOptions}
                                loading={courseLoading}
                                disabled={
                                    storedData
                                        ? storedData?.courses?.length === 0
                                        : courseOptions?.length === 0
                                }
                                onChange={(e: any) => {
                                    onCourseChange(e)
                                }}
                                multi
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
                <div className="w-full">
                    <Typography variant={'subtitle'} color={'text-gray-500'}>
                        Profile Information
                    </Typography>
                    <p className="text-gray-400 text-sm leading-6">
                        This will be your information used as account login.
                    </p>
                </div>
                <div className="flex flex-col lg:flex-row gap-x-16 border-t py-4">
                    <div className="w-full">
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
                <div className="w-full">
                    <Typography variant={'subtitle'} color={'text-gray-500'}>
                        Address Information
                    </Typography>
                    <p className="text-gray-400 text-sm leading-6">
                        This will help us to find out about your nearby sites
                    </p>
                </div>
                <div className="flex flex-col lg:flex-row gap-x-16 border-t lg:py-4 pt-4 lg:pt-0">
                    <div className="w-full">
                        <div className="grid grid-cols-4 gap-x-3">
                            <div className="col-span-3">
                                <TextInput
                                    label={'Primary Address'}
                                    name={'addressLine1'}
                                    placeholder={'Your Primary Address...'}
                                    validationIcons
                                    placesSuggetions
                                    onChange={(e: any) =>
                                        handleAddressChange(e)
                                    }
                                    // onChange={async (e: any) => {
                                    //     setOnSuburbClicked(false)
                                    //     if (e?.target?.value?.length > 4) {
                                    //         try {
                                    //             const { state } =
                                    //                 await getAddressData(
                                    //                     e?.target?.value
                                    //                 )
                                    //             const latLng = await getLatLng(
                                    //                 e?.target?.value
                                    //             )
                                    //             const postalCode =
                                    //                 await getPostalCode(latLng)

                                    //             if (postalCode) {
                                    //                 formMethods.setValue(
                                    //                     'zipCode',
                                    //                     postalCode
                                    //                 )
                                    //             }
                                    //             if (state) {
                                    //                 formMethods.setValue(
                                    //                     'state',
                                    //                     state
                                    //                 )
                                    //             }
                                    //         } catch (error) {
                                    //             console.error(
                                    //                 'Error fetching postal code:',
                                    //                 error
                                    //             )
                                    //         }
                                    //     }
                                    // }}
                                    onPlaceSuggetions={{
                                        placesSuggetions: onSuburbClicked,
                                        setIsPlaceSelected: setOnSuburbClicked,
                                    }}
                                />
                            </div>
                            <TextInput
                                label={'Zip Code'}
                                name={'zipCode'}
                                placeholder={'Zip Code...'}
                                validationIcons
                            />
                            <div className="col-span-3">
                                <TextInput
                                    label={'Secondary Address (optional)'}
                                    name={'addressLine2'}
                                    placeholder={'Your Secondary Address...'}
                                    validationIcons
                                    placesSuggetions
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8">
                            {/* <TextInput
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
                            /> */}

                            {/* <Select
                                options={stateOptions}
                                label={'State'}
                                name={'state'}
                                validationIcons
                                onlyValue
                            /> */}

                            {/* <TextInput
                                label={'State'}
                                name={'state'}
                                placeholder={'State...'}
                                validationIcons
                            /> */}
                        </div>
                    </div>
                </div>

                <div className="w-full">
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
