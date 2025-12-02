import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useReducer } from 'react'
import 'react-phone-number-input/style.css'

import debounce from 'lodash/debounce'
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
import { Course, OptionType, StudentFormType } from '@types'
import { fromAddress, geocode, GeocodeOptions, setKey } from 'react-geocode'
import { FormProvider, useForm } from 'react-hook-form'
import { CustomRtoSearch } from './components/CustomRtoSearch'

interface RtoOption {
    label: string
    value: number
}

type CustomRtoSelectType = RtoOption | { value: null; customText: string }

// Form State Interface
interface FormState {
    searchRto: string
    selectedRto: number | null | undefined
    selectedSector: any
    removedCourses: number[] | null
    courseOptions: SelectOption[]
    courseLoading: boolean
    courseValues: number[]
    storedData: any
    lastEnteredEmail: string
}

// Action Types
type FormAction =
    | { type: 'SET_SEARCH_RTO'; payload: string }
    | { type: 'SET_SELECTED_RTO'; payload: number | null | undefined }
    | { type: 'SET_SELECTED_SECTOR'; payload: any }
    | { type: 'SET_REMOVED_COURSES'; payload: number[] | null }
    | { type: 'SET_COURSE_OPTIONS'; payload: SelectOption[] }
    | { type: 'SET_COURSE_LOADING'; payload: boolean }
    | { type: 'SET_COURSE_VALUES'; payload: number[] }
    | { type: 'SET_STORED_DATA'; payload: any }
    | { type: 'SET_LAST_ENTERED_EMAIL'; payload: string }
    | {
          type: 'INITIALIZE_STORED_DATA'
          payload: { storedData: any; courseOptions: SelectOption[] }
      }

// Initial State
const initialState: FormState = {
    searchRto: '',
    selectedRto: undefined,
    selectedSector: null,
    removedCourses: null,
    courseOptions: [],
    courseLoading: false,
    courseValues: [],
    storedData: null,
    lastEnteredEmail: '',
}

// Reducer Function
const formReducer = (state: FormState, action: FormAction): FormState => {
    switch (action.type) {
        case 'SET_SEARCH_RTO':
            return { ...state, searchRto: action.payload }
        case 'SET_SELECTED_RTO':
            return { ...state, selectedRto: action.payload }
        case 'SET_SELECTED_SECTOR':
            return { ...state, selectedSector: action.payload }
        case 'SET_REMOVED_COURSES':
            return { ...state, removedCourses: action.payload }
        case 'SET_COURSE_OPTIONS':
            return { ...state, courseOptions: action.payload }
        case 'SET_COURSE_LOADING':
            return { ...state, courseLoading: action.payload }
        case 'SET_COURSE_VALUES':
            return { ...state, courseValues: action.payload }
        case 'SET_STORED_DATA':
            return { ...state, storedData: action.payload }
        case 'SET_LAST_ENTERED_EMAIL':
            return { ...state, lastEnteredEmail: action.payload }
        case 'INITIALIZE_STORED_DATA':
            return {
                ...state,
                storedData: action.payload.storedData,
                courseOptions: action.payload.courseOptions,
            }
        default:
            return state
    }
}

export const StudentSignUpForm = ({
    onSubmit,
}: {
    onSubmit: (values: StudentFormType) => void
}) => {
    const router = useRouter()
    const { notification } = useNotification()

    // Centralized state management
    const [formState, dispatch] = useReducer(formReducer, initialState)

    // API calls
    const rtoResponse = AuthApi.useSearchRtos(
        { search: formState.searchRto },
        { skip: !formState.searchRto }
    )

    const sectorResponse = AuthApi.useSectorsByRto(
        Number(formState.selectedRto),
        {
            skip: !formState.selectedRto,
        }
    )

    const [checkEmailExists, emailCheckResult] = AuthApi.useEmailCheck()

    // Extract header parameter from URL
    const rtoName = router?.query?.rtoName

    // Form setup
    const formMethods = useForm({
        mode: 'all',
        defaultValues: SignUpUtils.getEditingMode()
            ? SignUpUtils.getValuesFromStorage()
            : {},
    })

    // Initialize geocoding API
    useEffect(() => {
        setKey(process.env.NEXT_PUBLIC_MAP_KEY as string)
    }, [])

    // Load stored data on component mount
    useEffect(() => {
        if (SignUpUtils.getEditingMode()) {
            const values = SignUpUtils.getValuesFromStorage()
            dispatch({
                type: 'INITIALIZE_STORED_DATA',
                payload: {
                    storedData: values,
                    courseOptions: values?.courses,
                },
            })
        }
    }, [])

    // Auto-select RTO from header parameter
    useEffect(() => {
        if (rtoName) {
            dispatch({ type: 'SET_SEARCH_RTO', payload: rtoName + '' })
        }
    }, [rtoName])

    useEffect(() => {
        if (rtoName && rtoResponse?.data?.length) {
            dispatch({
                type: 'SET_SELECTED_RTO',
                payload: rtoResponse.data[0].id,
            })
        }
    }, [rtoName, rtoResponse?.data])

    // Handle email existence check
    useEffect(() => {
        if (emailCheckResult.isError) {
            notification.error({
                title: 'Email Exists',
                description: `'${formState.lastEnteredEmail}' is already being used.`,
            })
        }
    }, [emailCheckResult, formState.lastEnteredEmail, notification])

    // Prepare dropdown options
    const sectorsDetails = getSectorsDetail(sectorResponse?.data)
    const sectorOptions = sectorsDetails?.length
        ? sectorsDetails.map((sector: any) => ({
              label: sector.name,
              value: sector.id,
          }))
        : []

    const rtoOptions = rtoResponse.data?.length
        ? rtoResponse.data.map((rto: any) => ({
              label: rto.user.name,
              value: rto.id,
          }))
        : []

    // Handle email validation with debounce
    const onEmailChange = (e: any) => {
        const email = e.target.value
        if (isEmailValid(email)) {
            checkEmailExists({ email })
            dispatch({ type: 'SET_LAST_ENTERED_EMAIL', payload: email })
        }
    }

    // Handle sector change and update course options
    const onSectorChanged = (sectors: any) => {
        dispatch({ type: 'SET_SELECTED_SECTOR', payload: sectors })
        dispatch({ type: 'SET_COURSE_LOADING', payload: true })

        const newCourseOptions = sectorResponse?.data
            ?.filter((course: Course) =>
                sectors
                    ?.map((s: OptionType) => s?.value)
                    ?.includes(course?.sector?.id)
            )
            ?.map((course: Course) => ({
                label: course?.title,
                value: course?.id,
                item: course,
            }))

        dispatch({ type: 'SET_COURSE_OPTIONS', payload: newCourseOptions })

        const newSelectedCoursesOptions = courseOptionsWhenSectorChange(
            newCourseOptions,
            formState.removedCourses as number[]
        )
        dispatch({
            type: 'SET_COURSE_VALUES',
            payload: newSelectedCoursesOptions,
        })
        dispatch({ type: 'SET_COURSE_LOADING', payload: false })
    }

    // Handle course selection
    const onCourseChange = (e: number[]) => {
        dispatch({ type: 'SET_COURSE_VALUES', payload: e })
    }

    // Debounced RTO search
    const debounceRtoSearch = useCallback(
        debounce((query) => {
            dispatch({ type: 'SET_SEARCH_RTO', payload: query })
        }, 700),
        []
    )

    // Handle address change and geocoding
    const handleAddressChange = (e: any) => {
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

    // Form validation schema
    const validationSchema = yup.object({
        name: yup.string().required('Must provide your name'),
        email: yup
            .string()
            .email('Invalid Email')
            .required('Must provide email'),
        password: yup.string().required('Must provide password'),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password'), null], 'Passwords must match')
            .required('Must confirm entered password'),
        rto: yup.mixed().nullable(),
        rtoInfo: yup.string().when('rto', {
            is: (val: any) => !val || val === 'other',
            then: (schema) => schema.required('Must provide custom RTO'),
            otherwise: (schema) => schema.notRequired(),
        }),
        phone: yup
            .string()
            .nullable(true)
            .min(12, 'Phone Number must be 9 numbers')
            .required('Must provide phone number'),
        courseDescription: yup
            .string()
            .required('Must list at least one course'),
        contactPersonName: yup
            .string()
            .matches(onlyAlphabets(), 'Must be a valid name'),
        contactPersonEmail: yup.string().email('Must be a valid email'),
        contactPersonNumber: yup.string(),
        addressLine1: yup.string().required('Must provide address'),
        zipCode: yup.string().required('Must provide zip code for your state'),
        agreedWithPrivacyPolicy: yup
            .boolean()
            .oneOf(
                [true],
                'Please check if you agree with our terms & policies'
            ),
    })

    // Validation logic
    const validateSubmission = (values: any): boolean => {
        if (!values.addressLine1 || values.addressLine1.trim().length < 5) {
            notification.error({
                title: 'Invalid Address',
                description: 'Please enter a valid address',
            })
            return false
        }

        if (!values?.sectors && values?.courseDescription?.trim().length < 5) {
            notification.error({
                title: 'Enter Course Description',
                description: 'Please enter a course description',
            })
            return false
        }

        if (!values?.phone) {
            notification.error({
                title: 'Invalid Phone Number',
                description: 'Please enter a valid phone number',
            })
            return false
        }

        if (values?.rto && !values?.sectors) {
            notification.error({
                title: 'Select Sector',
                description: 'Please select at least one sector for the RTO',
            })
            return false
        }

        if (!values?.rto && !values?.rtoInfo?.trim()) {
            notification.error({
                title: 'RTO Required',
                description: 'Please select or enter a valid RTO',
            })
            return false
        }

        return true
    }

    // Form submission handler
    const onHandleSubmit = (values: any) => {
        if (!validateSubmission(values)) {
            return
        }
        onSubmit({ ...values, suburb: 'N/A' })
    }

    // Navigation handler
    const onBackToReview = () => {
        SignUpUtils.setEditingMode(false)
        router.push({ query: { step: 'review-info' } })
    }

    // Watch address value for validation
    const addressValue = formMethods.watch('addressLine1')
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
    }, [addressValue, formMethods])

    return (
        <FormProvider {...formMethods}>
            <form
                className="flex flex-col gap-y-4"
                onSubmit={formMethods.handleSubmit(onHandleSubmit)}
            >
                {/* Student Information Section */}
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
                            <PhoneInputWithCountry
                                label={'Phone'}
                                required
                                name={'phone'}
                                validationIcons
                                countries={['AU']}
                                defaultCountry={'AU'}
                                placeholder={'Enter your number'}
                            />

                            <CustomRtoSearch
                                label="Search Training Organization"
                                onSearch={(val) => debounceRtoSearch(val)}
                                options={rtoOptions}
                                loading={rtoResponse.isLoading}
                                onSelect={(selected: any) => {
                                    if (selected.value === null) {
                                        dispatch({
                                            type: 'SET_SELECTED_RTO',
                                            payload: null,
                                        })
                                        formMethods.setValue('rto', null)
                                        formMethods.setValue(
                                            'rtoInfo',
                                            selected.customText ?? ''
                                        )
                                    } else {
                                        dispatch({
                                            type: 'SET_SELECTED_RTO',
                                            payload: selected.value,
                                        })
                                        formMethods.setValue(
                                            'rto',
                                            selected.value
                                        )
                                        formMethods.setValue('rtoInfo', '')
                                    }
                                }}
                                formMethods={formMethods}
                                value={
                                    rtoName && formState.selectedRto
                                        ? {
                                              value: formState.selectedRto,
                                              label:
                                                  rtoOptions.find(
                                                      (opt: any) =>
                                                          opt?.value ===
                                                          formState.selectedRto
                                                  )?.label || '',
                                          }
                                        : undefined
                                }
                                selectedRto={formState.selectedRto}
                            />

                            {formState.selectedRto === null && (
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

                {/* Sector Information Section */}
                {formState.selectedRto !== null &&
                    formState.selectedRto !== undefined && (
                        <div className="w-full">
                            <Typography
                                variant={'subtitle'}
                                color={'text-gray-500'}
                            >
                                Sector Information
                            </Typography>
                            <p className="text-gray-400 text-sm leading-6">
                                Select your eligible sectors, and related
                                courses.
                            </p>
                        </div>
                    )}

                <div className="flex flex-col lg:flex-row gap-x-16 border-t py-4">
                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                        <div>
                            {formState.selectedRto !== null &&
                            formState.selectedRto !== undefined ? (
                                <>
                                    <Select
                                        label={'Sector'}
                                        {...(formState.storedData
                                            ? {
                                                  defaultValue:
                                                      formState.storedData
                                                          .sectors,
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
                                        defaultValue={formState.courseOptions}
                                        value={formState.courseValues}
                                        options={formState.courseOptions}
                                        loading={formState.courseLoading}
                                        disabled={
                                            formState.storedData
                                                ? formState.storedData?.courses
                                                      ?.length === 0
                                                : formState.courseOptions
                                                      ?.length === 0
                                        }
                                        onChange={onCourseChange}
                                        multi
                                        validationIcons
                                        components={{
                                            Option: CourseSelectOption,
                                        }}
                                        formatOptionLabel={formatOptionLabel}
                                    />
                                </>
                            ) : (
                                formState.selectedRto === null && (
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

                {/* Profile Information Section */}
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

                {/* Address Information Section */}
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
                                    onChange={handleAddressChange}
                                    onPlaceSuggetions={{
                                        placesSuggetions: true,
                                        setIsPlaceSelected: () => {},
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

                {/* Checkbox and Submit Buttons */}
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
