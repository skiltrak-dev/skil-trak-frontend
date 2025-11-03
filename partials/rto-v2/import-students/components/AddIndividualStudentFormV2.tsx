import {
    ActionAlert,
    Button,
    Select,
    ShowErrorNotifications,
    TextInput,
    Typography,
} from '@components'
import { UserRoles } from '@constants'
import { yupResolver } from '@hookform/resolvers/yup'
import { AuthApi, RtoApi } from '@queries'
import { Course } from '@types'
import {
    CourseSelectOption,
    ageOptions,
    formatOptionLabel,
    onlyAlphabets,
} from '@utils'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

export const AddIndividualStudentFormV2 = () => {
    const [placementType, setPlacementType] = useState<'flexible' | 'block'>(
        'flexible'
    )

    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const router = useRouter()

    const [addStudent, addStudentResult] = RtoApi.Students.useAddStudent()
    // auth api to get sectors
    const sectorResponse = AuthApi.useSectors({})

    const rto = RtoApi.Rto.useProfile()

    const rtoCoursesOptions =
        rto.isSuccess && rto?.data?.courses && rto?.data?.courses?.length > 0
            ? rto?.data?.courses?.map((course: Course) => ({
                label: course?.title,
                value: course?.id,
                item: course,
            }))
            : []

    useEffect(() => {
        if (addStudentResult.isSuccess) {
            setIsSuccess(addStudentResult.isSuccess)
        }
    }, [addStudentResult.isSuccess])
    // get sectors

    const validationSchema = yup.object({
        // Profile Information
        name: yup
            .string()
            .matches(onlyAlphabets(), 'Please enter valid name')
            .required('Must provide your name'),
        studentId: yup.string().required('Must provide your student Id'),
        batch: yup.string().required('Must provide your Batch'),
        phone: yup.string().required('Must provide your phone number'),
        age: yup.string().nullable().required('Must Select age'),
        email: yup.string().email('Invalid Email').required('Must provide email'),

        // Conditional validation for dates
        expiryDate: yup
            .date()
            .when('$placementType', {
                is: 'flexible',
                then: (schema) => schema.required('Must provide Expiry Date'),
                otherwise: (schema) => schema.notRequired().nullable(),
            }),

        startDate: yup
            .date()
            .when('$placementType', {
                is: 'block',
                then: (schema) => schema.required('Must provide Start Date'),
                otherwise: (schema) => schema.notRequired().nullable(),
            }),

        endDate: yup
            .date()
            .when('$placementType', {
                is: 'block',
                then: (schema) => schema.required('Must provide End Date'),
                otherwise: (schema) => schema.notRequired().nullable(),
            }),

        // sector and courses
        courses: yup.array().min(1, 'Must select at least 1 course').required(),
    })


    const formMethods = useForm({
        mode: 'all',
        resolver: yupResolver(validationSchema),
        context: { placementType },
    })

    const onSubmitForm = (values: any) => {
        const filteredValues = { ...values }

        if (placementType === 'flexible') {
            delete filteredValues.startDate
            delete filteredValues.endDate
        } else if (placementType === 'block') {
            delete filteredValues.expiryDate
        }

        addStudent({
            ...filteredValues,
            courses: filteredValues.courses.map((course: any) => course.value),
            role: UserRoles.STUDENT,
            age: 'N/A',
            familyName: 'N/A',
            emergencyPerson: 'N/A',
            emergencyPersonPhone: 'N/A',
            gender: 'N/A',
            addressLine1: 'N/A',
            state: 'N/A',
            suburb: 'N/A',
            zipCode: 'N/A',
            password: 'N/A',
        })
    }


    const getMinExpiryDate = () => {
        const date = new Date()
        date.setMonth(date.getMonth() + 3)
        return date.toISOString().split('T')[0]
    }

    return (
        <>
            <ShowErrorNotifications result={addStudentResult} />
            {isSuccess && (
                <ActionAlert
                    title={'Student Added Successfully!'}
                    description={
                        'You will be redirected to student list in a moment.'
                    }
                    variant={'primary'}
                    primaryAction={{
                        text: 'Back To List',
                        onClick: () => {
                            router.push({
                                pathname: '/portals/rto/students',
                                query: { tab: 'active' },
                            })
                        },
                    }}
                    secondaryAction={{
                        text: 'Add New',
                        onClick: () => {
                            setIsSuccess(false)
                        },
                    }}
                />
            )}
            {!isSuccess && (
                <FormProvider {...formMethods}>
                    <form onSubmit={formMethods.handleSubmit(onSubmitForm)}>
                        <div className="border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-4 rounded-lg">
                            <Typography variant="label" className="mb-2 block">
                                Placement Type
                            </Typography>

                            <div className="flex flex-col gap-3">
                                <div
                                    className={`flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${placementType === 'flexible'
                                        ? 'border-primaryNew bg-primaryNew/5'
                                        : 'border-gray-300 hover:border-primaryNew/30'
                                        }`}
                                    onClick={() => setPlacementType('flexible')}
                                >
                                    <input
                                        type="radio"
                                        id="flexible"
                                        name="placementType"
                                        checked={placementType === 'flexible'}
                                        onChange={() =>
                                            setPlacementType('flexible')
                                        }
                                        className="mt-1 accent-primaryNew cursor-pointer"
                                    />
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <Typography
                                                variant="body"
                                                className="font-semibold cursor-pointer"
                                            >
                                                Flexible Placement
                                            </Typography>
                                            <div className="inline-flex items-center justify-center rounded-full border border-primary/30 bg-primary/20 px-2.5 py-0.5 text-xs font-medium text-primary text-center">
                                                Flexible
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Student can be placed any time before
                                            the expiry date
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className={`flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${placementType === 'block'
                                        ? 'border-primaryNew bg-primaryNew/5'
                                        : 'border-gray-300 hover:border-primaryNew/30'
                                        }`}
                                    onClick={() => setPlacementType('block')}
                                >
                                    <input
                                        type="radio"
                                        id="block"
                                        name="placementType"
                                        checked={placementType === 'block'}
                                        onChange={() => setPlacementType('block')}
                                        className="mt-1 accent-primaryNew cursor-pointer"
                                    />
                                    <div className="flex-1">
                                        <div className="flex justify-between">
                                            <Typography
                                                variant="body"
                                                className="font-semibold cursor-pointer"
                                            >
                                                Block Placement
                                            </Typography>
                                            <div className="inline-flex items-center justify-center rounded-full border border-primaryNew/30 bg-primaryNew/20 px-2.5 py-0.5 text-xs font-medium text-primaryNew text-center">
                                                Scheduled
                                            </div>
                                        </div>

                                        <p className="text-sm text-gray-500 mt-1">
                                            Student must be placed before the start
                                            date and will have an end date
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                            <TextInput
                                label={'Full Name'}
                                name={'name'}
                                placeholder={'Your Full Name...'}
                                validationIcons
                                required
                            />

                            <TextInput
                                label={'Student Id'}
                                name={'studentId'}
                                placeholder={'Student Id...'}
                                validationIcons
                                required
                            />

                            <Select
                                label={'Select Age'}
                                name={'age'}
                                options={ageOptions}
                                placeholder={'Select Age...'}
                                // loading={rtoResponse.isLoading}
                                // onChange={}
                                validationIcons
                                onlyValue
                            />

                            <TextInput
                                label={'Email'}
                                type={'email'}
                                name={'email'}
                                placeholder={'Email...'}
                                validationIcons
                                required
                            />

                            <TextInput
                                label={'Batch'}
                                name={'batch'}
                                placeholder={'Batch...'}
                                validationIcons
                                required
                            />

                            <TextInput
                                label={'Phone No'}
                                name={'phone'}
                                placeholder={'Phone No...'}
                                validationIcons
                                required
                            />

                            <Select
                                label={'Courses'}
                                name={'courses'}
                                options={rtoCoursesOptions}
                                multi
                                validationIcons
                                components={{ Option: CourseSelectOption }}
                                formatOptionLabel={formatOptionLabel}
                            />
                        </div>

                        <div className="flex items-center gap-x-2 justify-between">
                            {placementType === 'block' ? (
                                <>
                                    <TextInput
                                        label="Start Date"
                                        name="startDate"
                                        type="date"
                                    // min={getDate()}
                                    />
                                    <TextInput
                                        label="End Date"
                                        name="endDate"
                                        type="date"
                                    // min={getDate()}
                                    />
                                </>
                            ) : (
                                <TextInput
                                    label={'Expiry Date'}
                                    name={'expiryDate'}
                                    placeholder={'Expiry Date...'}
                                    validationIcons
                                    required
                                    type="date"
                                    min={getMinExpiryDate()}
                                />
                            )}
                        </div>

                        <Button
                            submit
                            text={'Add'}
                            variant={'primary'}
                            loading={addStudentResult.isLoading}
                            disabled={addStudentResult.isLoading}
                        />
                    </form>
                </FormProvider>
            )}
        </>
    )
}
