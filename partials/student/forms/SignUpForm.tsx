import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import 'react-phone-number-input/style.css'

import _debounce from 'lodash/debounce'
import * as yup from 'yup'

import { useNotification } from '@hooks'
import { AuthApi } from '@queries'
import {
    ageOptions,
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

interface RtoOption {
    label: string
    value: number
}
type CustomRtoSelectType = RtoOption | { value: null; customText: string }
interface CustomRtoSearchProps {
    label: string
    onSearch: (query: string) => void
    options: { label: string; value: number }[]
    loading?: boolean
    onSelect: (option: CustomRtoSelectType) => void
    value?: any
    formMethods?: any
}

export const CustomRtoSearch = ({
    label,
    onSearch,
    options,
    loading,
    onSelect,
    value,
    formMethods,
}: CustomRtoSearchProps) => {
    const [input, setInput] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<any>(null)

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current?.contains(event.target)
            ) {
                setIsOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    useEffect(() => {
        if (value?.value) {
            setInput(value?.label)
            formMethods.setValue('rto', value?.value)
            formMethods.setValue('rtoInfo', '')
        }
    }, [value])

    const handleInputChange = (e: any) => {
        const value = e?.target?.value
        setInput(value)
        setIsOpen(true)
        onSearch(value)
    }

    const handleSelect = (option: any) => {
        if (option === 'other') {
            onSelect({ value: null, customText: input })
        } else {
            setInput(option.label)
            onSelect({ value: option.value, label: option.label })
        }
        setIsOpen(false)
    }

    const hasMatch = options?.some(
        (opt) => opt?.label?.toLowerCase() === input?.toLowerCase()
    )

    return (
        <div ref={dropdownRef} className="relative w-full">
            <label className="block mb-1 text-sm text-gray-700">{label}</label>
            <input {...formMethods.register('rto')} type="hidden" />
            <input {...formMethods.register('rtoInfo')} type="hidden" />
            <input
                type="text"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                value={input}
                onChange={handleInputChange}
                onFocus={() => setIsOpen(true)}
                placeholder="Search or type RTO..."
            />

            {isOpen && (
                <ul className="absolute z-10 bg-white border w-full shadow mt-1 max-h-60 overflow-auto rounded">
                    {loading ? (
                        <li className="px-4 py-2 text-sm text-gray-500">
                            Loading...
                        </li>
                    ) : options.length ? (
                        options.map((option) => (
                            <li
                                key={option.value}
                                onClick={() => handleSelect(option)}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                            >
                                {option.label}
                            </li>
                        ))
                    ) : (
                        <li className="px-4 py-2 text-sm text-gray-500">
                            No RTO found.
                        </li>
                    )}
                    {!hasMatch && input?.length > 2 && (
                        <li
                            onClick={() => handleSelect('other')}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-blue-600"
                        >
                            Add Custom RTO: "{input}"
                        </li>
                    )}
                </ul>
            )}
        </div>
    )
}

export const StudentSignUpForm = ({
    onSubmit,
}: {
    onSubmit: (values: StudentFormType) => void
}) => {
    const router = useRouter()

    const { notification } = useNotification()

    const [onSuburbClicked, setOnSuburbClicked] = useState<boolean>(true)
    const [searchRto, setSearchRto] = useState<string>('')
    const [selectedRto, setSelectedRto] = useState<number | null | undefined>(
        undefined
    )
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

        // rto: yup.number().required('Must provide RTO'),
        rto: yup.mixed().nullable(), // optional if 'other' is selected
        rtoInfo: yup.string().when('rto', {
            is: (val: any) => !val || val === 'other',
            then: (schema) => schema.required('Must provide custom RTO'),
            otherwise: (schema) => schema.notRequired(),
        }),
        // dob: yup.date().nullable(true).required('Must provide Date of Birth'),

        phone: yup
            .string()
            .nullable(true)
            .min(12, 'Phone Number must be 9 number')
            .required('Must provide phone number'),

        // Sector Information
        // sectors: yup.array().min(1, 'Must select at least 1 sector'),
        // courses: yup.array().min(1, 'Must select at least 1 course'),
        courseDescription: yup
            .string()
            .required('Must list at least one course'),

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
        // resolver: yupResolver(validationSchema),
    })

    // useEffect(() => {
    //     if (courseOptions && courseOptions?.length > 0) {
    //         formMethods.setValue('courses', courseOptions)
    //     }
    // }, [courseOptions])

    // const onHandleSubmit = (values: any) => {
    //     if (!onSuburbClicked) {
    //         notification.error({
    //             title: 'You must select on Address Dropdown',
    //             description: 'You must select on Address Dropdown',
    //         })
    //     } else if (onSuburbClicked) {
    //         onSubmit({ ...values, suburb: 'N/A' })
    //     }
    // }
    const onHandleSubmit = (values: any) => {
        if (!values.addressLine1 || values.addressLine1.trim().length < 5) {
            notification.error({
                title: 'Invalid Address',
                description: 'Please enter a valid address',
            })
            return
        }
        if (values?.courseDescription?.trim().length < 5) {
            notification.error({
                title: 'Enter Course Description',
                description: 'Please enter a course description',
            })
            return
        }

        // Continue with the submission
        onSubmit({ ...values, suburb: 'N/A' })
    }

    const debounceValue = useCallback(
        debounce((query) => setSearchRto(query), 700),
        []
    )

    const addressValue = formMethods.watch('addressLine1')
    // useEffect(() => {
    //     if (addressValue) {
    //         formMethods.setValue('addressLine1', addressValue, {
    //             shouldValidate: true,
    //             shouldDirty: true,
    //         })
    //         if (!onSuburbClicked) {
    //             formMethods.setError('addressLine1', {
    //                 type: 'manual',
    //                 message: 'Please select an address from the dropdown',
    //             })
    //         } else {
    //             formMethods.clearErrors('addressLine1')
    //         }
    //     }
    // }, [onSuburbClicked, addressValue])
    useEffect(() => {
        if (addressValue !== undefined) {
            formMethods.setValue('addressLine1', addressValue, {
                shouldValidate: true,
                shouldDirty: true,
            })

            if (!addressValue || addressValue.trim().length < 5) {
                formMethods.setError('addressLine1', {
                    type: 'manual',
                    message: 'Please enter a valid address',
                })
            } else {
                formMethods.clearErrors('addressLine1')
            }
        }
    }, [addressValue])

    const handleAddressChange = (e: any) => {
        setOnSuburbClicked(false) // optional, you can remove this entirely
        const value = e?.target?.value

        if (value?.length > 4) {
            fromAddress(value)
                .then(({ results }: any) => {
                    const { lat, lng } = results[0].geometry.location
                    geocode('latlng', `${lat},${lng}`, {
                        key: process.env.NEXT_PUBLIC_MAP_KEY,
                    } as GeocodeOptions)
                        .then((response) => {
                            const addressComponents =
                                response.results[0]?.address_components || []

                            const state = addressComponents.find((c: any) =>
                                c.types.includes('administrative_area_level_1')
                            )?.long_name

                            const zipCode = addressComponents.find((c: any) =>
                                c.types.includes('postal_code')
                            )?.long_name

                            formMethods.setValue('state', state || 'N/A')
                            formMethods.setValue('zipCode', zipCode || '')
                        })
                        .catch(console.error)
                })
                .catch(console.error)
        }
    }

    // const handleAddressChange = (e: any) => {
    //     setOnSuburbClicked(false)
    //     // formMethods.setValue('addressLine1', e?.target?.value)

    //     // if (!onSuburbClicked) {
    //     //     formMethods.setError('addressLine1', {
    //     //         type: 'manual',
    //     //         message: 'Please select an address from the dropdown',
    //     //     })
    //     // }
    //     if (e?.target?.value?.length > 4) {
    //         fromAddress(e?.target?.value)
    //             .then(({ results }: any) => {
    //                 const { lat, lng } = results[0].geometry.location
    //                 geocode('latlng', `${lat},${lng}`, {
    //                     key: process.env.NEXT_PUBLIC_MAP_KEY,
    //                 } as GeocodeOptions)
    //                     .then((response) => {
    //                         const addressComponents =
    //                             response.results[0].address_components

    //                         const state = addressComponents.find(
    //                             (component: any) =>
    //                                 component.types.includes(
    //                                     'administrative_area_level_1'
    //                                 )
    //                         )?.long_name

    //                         formMethods.setValue('state', state || 'N/A')

    //                         for (let component of addressComponents) {
    //                             if (component.types.includes('postal_code')) {
    //                                 formMethods.setValue(
    //                                     'zipCode',
    //                                     component.long_name
    //                                 )

    //                                 break
    //                             }
    //                         }
    //                     })
    //                     .catch((error) => {
    //                         console.error({
    //                             error,
    //                         })
    //                     })
    //             })
    //             .catch(console.error)
    //     }
    // }

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
                            {/* <TextInput
                                label={'Family Name'}
                                name={'familyName'}
                                placeholder={'Family Name...'}
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

                            {/* <Select
                                label={'Search Training Organization'}
                                {...(storedData
                                    ? {
                                          defaultValue: storedData.sectors,
                                      }
                                    : {})}
                                onInputChange={(e: any) => {
                                    debounceValue(e)
                                }}
                                name={'rto'}
                                placeholder={'Search Rtos...'}
                                loading={rtoResponse.isLoading}
                                options={[
                                    ...rtoOptions,
                                    { label: 'Other', value: 'other' },
                                ]}
                                onChange={(e: any) => {
                                    if (e === 'other') {
                                        setSelectedRto(null)
                                    } else {
                                        setSelectedRto(e)
                                    }
                                }}
                                validationIcons
                                onlyValue
                                {...(hader ? { value: rtoOptions?.[0] } : {})}
                            />
                            {selectedRto === null && (
                                <TextInput
                                    label="RTO Info"
                                    name="rto"
                                    placeholder="Enter custom RTO name"
                                    required
                                    validationIcons
                                />
                            )} */}
                            <CustomRtoSearch
                                label="Search Training Organization"
                                onSearch={(val) => debounceValue(val)}
                                options={rtoOptions}
                                loading={rtoResponse.isLoading}
                                onSelect={(selected: any) => {
                                    if (selected.value === null) {
                                        // It's a custom RTO
                                        setSelectedRto(null)
                                        formMethods.setValue('rto', null)
                                        formMethods.setValue(
                                            'rtoInfo',
                                            selected.customText
                                        ) // ✅ Set rtoInfo
                                    } else {
                                        setSelectedRto(selected.value)
                                        formMethods.setValue(
                                            'rto',
                                            selected.value
                                        )
                                        formMethods.setValue('rtoInfo', '') // Clear custom RTO field
                                    }
                                }}
                                formMethods={formMethods}
                                value={
                                    hader && selectedRto
                                        ? {
                                              value: selectedRto,
                                              label:
                                                  rtoOptions.find(
                                                      (opt: any) =>
                                                          opt?.value ===
                                                          selectedRto
                                                  )?.label || '',
                                          }
                                        : undefined
                                }
                            />

                            {selectedRto === null && (
                                <TextInput
                                    label="RTO Info"
                                    name="rtoInfo"
                                    placeholder="Enter custom RTO name"
                                    required
                                    validationIcons
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* Sector Information */}
                {selectedRto !== null && selectedRto !== undefined && (
                    <div className="w-full">
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
                )}
                <div className="flex flex-col lg:flex-row gap-x-16 border-t py-4">
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                        <div>
                            {selectedRto !== null &&
                            selectedRto !== undefined ? (
                                <>
                                    <Select
                                        label={'Sector'}
                                        {...(storedData
                                            ? {
                                                  defaultValue:
                                                      storedData.sectors,
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
                                                ? storedData?.courses
                                                      ?.length === 0
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
                                </>
                            ) : (
                                selectedRto === null && (
                                    <TextInput
                                        label="Course Info"
                                        name="courseDescription"
                                        placeholder="Enter course information..."
                                        required
                                        validationIcons
                                    />
                                )
                            )}
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
                        <div className="grid grid-cols-4 gap-x-3 mt-5">
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
