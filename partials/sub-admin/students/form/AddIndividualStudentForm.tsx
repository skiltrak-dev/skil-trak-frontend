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
import {
    AdminApi,
    AuthApi,
    useGetSubAdminRTOCoursesQuery,
    useGetSubAdminRTODetailQuery,
} from '@queries'
import { Course, OptionType, Sector } from '@types'
import {
    CourseSelectOption,
    SignUpUtils,
    formatOptionLabel,
    getDate,
    onlyAlphabets,
} from '@utils'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

export const AddIndividualStudentForm = () => {
    const router = useRouter()
    const [isSuccess, setIsSuccess] = useState<boolean>(false)

    const rtoDetail = useGetSubAdminRTODetailQuery(Number(router?.query?.id), {
        skip: !router?.query?.id,
        refetchOnMountOrArgChange: true,
    })
    const [addStudent, addStudentResult] = AdminApi.Rtos.useRtoAddStudent()
    // auth api to get sectors
    const rtoCourses = useGetSubAdminRTOCoursesQuery(
        Number(router?.query?.id),
        {
            skip: !router?.query?.id,
        }
    )

    // get sectors

    const courseOptions =
        rtoCourses.isSuccess && rtoCourses?.data && rtoCourses?.data?.length > 0
            ? rtoCourses?.data?.map((course: Course) => ({
                  item: course,
                  value: course?.id,
                  label: course?.title,
              }))
            : []

    const validationSchema = yup.object({
        // Profile Information
        name: yup
            .string()
            .matches(onlyAlphabets(), 'Please enter valid name')
            .required('Must provide your name'),
        studentId: yup.string().required('Must provide your student Id'),
        batch: yup.string().required('Must provide your Batch'),

        phone: yup.string().required('Must provide your phone number'),

        email: yup
            .string()
            .email('Invalid Email')
            .required('Must provide email'),
        expiryDate: yup.date().required('Must provide Expiry Date'),
        // sector and courses
        courses: yup.array().min(1, 'Must select at least 1 course'),
    })

    const formMethods = useForm({
        mode: 'all',
        resolver: yupResolver(validationSchema),
    })

    useEffect(() => {
        if (addStudentResult.isSuccess) {
            setIsSuccess(addStudentResult.isSuccess)
            formMethods.reset()
        }
    }, [addStudentResult.isSuccess])

    const onSubmitForm = (values: any) => {
        // if (onSubmit) {
        //     onSubmit(values)
        // } else
        addStudent({
            // ...values,
            id: Number(router.query.id),
            body: {
                ...values,
                courses: values?.courses?.map(
                    (course: OptionType) => course.value
                ),
                role: UserRoles.STUDENT,
                dob: 'N/A',
                familyName: 'N/A',
                emergencyPerson: 'N/A',
                emergencyPersonPhone: 'N/A',
                gender: 'N/A',
                addressLine1: 'N/A',
                state: 'N/A',
                suburb: 'N/A',
                zipCode: 'N/A',
                password: 'N/A',
            },
        })
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
                            router.push(`/portals/sub-admin/users/rtos`)
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

                            <div className="flex flex-col gap-y-2">
                                <Typography variant={'label'}>RTO</Typography>
                                <Typography variant={'subtitle'}>
                                    {rtoDetail?.data?.user?.name}
                                </Typography>
                            </div>

                            <Select
                                label={'Courses'}
                                name={'courses'}
                                options={courseOptions}
                                multi
                                loading={rtoCourses.isLoading}
                                disabled={rtoCourses.isLoading}
                                validationIcons
                                components={{
                                    Option: CourseSelectOption,
                                }}
                                formatOptionLabel={formatOptionLabel}
                            />
                            <TextInput
                                label={'Expiry Date'}
                                name={'expiryDate'}
                                placeholder={'Expiry Date...'}
                                validationIcons
                                required
                                type="date"
                                min={getDate()}
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
