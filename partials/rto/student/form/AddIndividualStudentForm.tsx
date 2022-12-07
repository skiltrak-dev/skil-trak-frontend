import { Button, TextArea, TextInput, ActionAlert, ShowErrorNotifications, Select } from '@components'
import { useRouter } from 'next/router'
import { UserRoles } from '@constants'
import { yupResolver } from '@hookform/resolvers/yup'
import { RtoApi, AuthApi } from '@queries'
import { onlyAlphabets, SignUpUtils } from '@utils'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useState, useEffect } from 'react'



export const AddIndividualStudentForm = () => {
    const router = useRouter()
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const [sectorOptions, setSectorOptions] = useState([])
    const [courseOptions, setCourseOptions] = useState([])
    const [courseLoading, setCourseLoading] = useState(false)
    const [storedData, setStoredData] = useState<any>(null)
    const [addStudent, addStudentResult] =
        RtoApi.Students.useAddStudent()
    // auth api to get sectors
    const sectorResponse = AuthApi.useSectors({})

    useEffect(() => {
        if (addStudentResult.isSuccess) {
            setIsSuccess(addStudentResult.isSuccess)
        }
    }, [addStudentResult.isSuccess])
    // get sectors
    const onSectorChanged = (sectors: any) => {
        setCourseLoading(true)
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

        setCourseOptions(newCourseOptions)
        setCourseLoading(false)
    }
    useEffect(() => {
        if (sectorResponse.data?.length) {
            const options = sectorResponse.data?.map((sector: any) => ({
                label: sector.name,
                value: sector.id,
            }))
            setSectorOptions(options)
        }
    }, [sectorResponse.data])
    useEffect(() => {
        if (SignUpUtils.getEditingMode()) {
            const values = SignUpUtils.getValuesFromStorage()
            setStoredData(values)
            setCourseOptions(values.courses)
        }
    }, [])

    const validationSchema = yup.object({
        // Profile Information
        name: yup
            .string()
            .matches(onlyAlphabets(), 'Please enter valid name')
            .required('Must provide your name'),
        studentId: yup.string().required('Must provide your student Id'),
        phone: yup.string().required('Must provide your phone number'),

        email: yup
            .string()
            .email('Invalid Email')
            .required('Must provide email'),
        expiryDate: yup.date().required('Must provide Expiry Date'),
        // sector and courses
        sectors: yup.array().min(1, 'Must select at least 1 sector'),
        courses: yup.array().min(1, 'Must select at least 1 course'),

        // Address Information
        addressLine1: yup.string().required('Must provide address'),
        state: yup.string().required('Must provide name of state'),
        suburb: yup.string().required('Must provide suburb name'),
        zipCode: yup.string().required('Must provide zip code for your state'),
    })

    const formMethods = useForm({
        mode: 'all',
        // resolver: yupResolver(validationSchema),
    })

    const onSubmitForm = (values: any) => {
        // if (onSubmit) {
        //     onSubmit(values)
        // } else
        addStudent({
            ...values,
            courses: values.courses.map((course: any) => course.value),
            sectors: values.sectors.map((sector: any) => sector.value),
        })
    }

    return (
        <>
            <ShowErrorNotifications result={addStudentResult} />
            {isSuccess && (
                <ActionAlert
                    title={'Student Added Successfully!'}
                    description={'You will be redirected to student list in a moment.'}
                    variant={'primary'}
                    primaryAction={{
                        text: 'Back To List',
                        onClick: () => {
                            router.push(`/portals/rto/students?tab=approved`)
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

                            <TextInput
                                label={'Phone No'}
                                name={'phone'}
                                placeholder={'Phone No...'}
                                validationIcons
                                required
                            />

                            <TextInput
                                label={'Password'}
                                name={'password'}
                                type={'password'}
                                placeholder={'Password...'}
                                validationIcons
                                required
                            />
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
                            <TextInput
                                label={'Expiry Date'}
                                name={'expiryDate'}
                                placeholder={'Expiry Date...'}
                                validationIcons
                                required
                                type="date"
                            />
                        </div>
                        <div className="w-full grid grid-cols-1 gap-x-8">
                            <TextInput
                                label={'Email'}
                                type={'email'}
                                name={'email'}
                                placeholder={'Email...'}
                                validationIcons
                                required
                            />
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
                        <Button
                            submit
                            text={'Add'}
                            variant={'primary'}
                            loading={addStudentResult.isLoading}
                            disabled={addStudentResult.isLoading}
                        />

                        {/* <Button text={'Update'} submit /> */}
                    </form>
                </FormProvider>
            )}
        </>
    )
}
