import {
    AutoCompleteTextInput,
    RadioGroup,
    Select,
    SelectOption,
    TextInput,
} from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from 'components/buttons/Button'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

// components
import { usePlacesWidget } from 'react-google-autocomplete'

import { InputErrorMessage, RequiredStar } from '@components/inputs/components'
import { Course } from '@types'
import { Card, Typography } from 'components'
import { useNotification } from '@hooks'

type PersonalInfoProps = {
    onSubmit: any
    courses: any
    personalInfoData: any
}

const placesLibrary = ['places'] as any

export const PersonalInfoForm = ({
    onSubmit,
    courses,
    personalInfoData,
}: PersonalInfoProps) => {
    const [selectedCourse, setselectedCourse] = useState<any>(null)

    const [work, setWork] = useState<string>('')
    const [qualification, setQualification] = useState<string>('')
    const [isPlaceSelected, setIsPlaceSelected] = useState<boolean>(false)

    const { notification } = useNotification()

    useEffect(() => {
        if (
            personalInfoData?.courses &&
            courses?.data &&
            courses?.data?.length > 0
        ) {
            const course = courses?.data?.find(
                (course: Course) =>
                    course?.id === Number(personalInfoData?.courses)
            )
            setselectedCourse({
                label: course?.title,
                value: course?.id,
            })
        }
        if (personalInfoData?.work) {
            setWork(personalInfoData?.work)
        }
        if (personalInfoData?.qualification) {
            setQualification(personalInfoData?.qualification)
        }
    }, [personalInfoData, courses?.data])

    const coursesOptions = courses?.data?.map((course: Course) => ({
        label: course.title,
        value: course.id,
    }))

    // function getCurrentWeek() {
    //     var currentDate = moment()

    //     var weekStart = currentDate.clone().startOf('week')
    //     var weekEnd = currentDate.clone().endOf('week')

    //     var days = []

    //     for (var i = 0; i <= 6; i++) {
    //         days.push(moment(weekStart).add(i, 'days').format('DD'))
    //     }
    //     return days
    // }

    // const date = [...Array(7)].map((_, i) => ({
    //     date: getCurrentWeek()[i],
    //     day: moment.weekdaysShort()[i],
    // }))

    const validationSchema = yup.object({
        courses: yup
            .object()
            .shape({
                label: yup.string().required(),
                value: yup.string().required(),
            })
            .nullable(true)
            .test(
                (
                    course: SelectOption,
                    { createError }: { createError: any }
                ) => {
                    if (!course?.value) {
                        return createError({ message: 'Course is Required' })
                    }
                    return true
                }
            ),
        qualification: yup
            .string()
            .nullable(true)
            .required('Must provide currentQualification'),
        currentQualification: yup.string().when('qualification', {
            is: 'yes',
            then: yup.string().required(),
        }),
        work: yup.string().nullable(true).required('Must provide currentWork'),
        currentWork: yup.string().when('work', {
            is: 'yes',
            then: yup.string().required(),
        }),
        haveTransport: yup
            .string()
            .nullable(true)
            .required('Must provide Transport Option'),
        haveDrivingLicense: yup
            .string()
            .nullable(true)
            .required('Must provide Driving License Option'),
        // preferableLocation: yup
        //     .string()
        //     .required('Must provide preferableLocation'),
    })

    const formMethods = useForm({
        mode: 'all',
        resolver: yupResolver(validationSchema),
        defaultValues: {
            ...personalInfoData,
            haveDrivingLicense: personalInfoData?.haveDrivingLicense
                ? 'yes'
                : personalInfoData?.haveDrivingLicense === false
                ? 'no'
                : '',
            haveTransport: personalInfoData?.haveTransport
                ? 'yes'
                : personalInfoData?.haveTransport === false
                ? 'no'
                : '',
        },
    })

    useEffect(() => {
        if (selectedCourse) {
            formMethods.setValue('courses', selectedCourse)
        }
    }, [selectedCourse])

    const onPlaceChanged = () => {}

    // const { ref }: any = usePlacesWidget({
    //     apiKey: process.env.NEXT_PUBLIC_MAP_KEY,
    //     onPlaceSelected: (place) => {},
    //     options: {
    //         // types: ['(suburbs)'],
    //         componentRestrictions: {
    //             country: 'au',
    //         },
    //     },
    // })

    // const { ref: preferableLocationRef, ...rest } =
    //     formMethods.register('preferableLocation')

    const handleSubmit = (values: any) => {
        // if (isPlaceSelected) {
        //     onSubmit(values)
        // } else {
        //     notification.warning({
        //         title: 'Select on the suggested locations',
        //         description: 'Select on the suggestions below location',
        //     })
        // }
        onSubmit(values)
    }

    return (
        <div>
            <Typography variant={'label'} capitalize>
                Please provide following information
            </Typography>

            <Card>
                <FormProvider {...formMethods}>
                    <form onSubmit={formMethods.handleSubmit(handleSubmit)}>
                        <div>
                            <Select
                                id="courses"
                                placeholder="Select Your Choice"
                                name="courses"
                                label="Course"
                                value={selectedCourse}
                                onChange={(e: any) => {
                                    setselectedCourse(e)
                                }}
                                options={coursesOptions}
                                loading={courses.isLoading}
                                disabled={courses.isLoading}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-2 mt-4">
                            {/*
                             */}
                            <div>
                                <RadioGroup
                                    gridColumns="2"
                                    layout="grid"
                                    // value={'yes'}
                                    name="qualification"
                                    label="Have you completed any qualification?"
                                    options={[
                                        { value: 'yes', label: 'Yes' },
                                        { value: 'no', label: 'No' },
                                    ]}
                                    onChange={(e: any) => {
                                        setQualification(e?.target?.value)
                                    }}
                                />
                                {qualification === 'yes' && (
                                    <TextInput
                                        name="currentQualification"
                                        // label="Current Qualification"
                                        placeholder="Provide detail"
                                    />
                                )}
                            </div>
                            <div>
                                <RadioGroup
                                    gridColumns="2"
                                    layout="grid"
                                    name="work"
                                    label="Are you currently working?"
                                    options={[
                                        { value: 'yes', label: 'Yes' },
                                        { value: 'no', label: 'No' },
                                    ]}
                                    onChange={(e: any) => {
                                        setWork(e?.target?.value)
                                    }}
                                />
                                {work === 'yes' && (
                                    <TextInput
                                        name="currentWork"
                                        // label="Current Work"
                                        placeholder="Provide Detail"
                                    />
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-y-3 mb-5">
                            <RadioGroup
                                gridColumns="2"
                                layout="grid"
                                name="haveTransport"
                                label="Do you have your own transport?"
                                options={[
                                    { value: 'yes', label: 'Yes' },
                                    { value: 'no', label: 'No' },
                                ]}
                            />
                            <RadioGroup
                                gridColumns="2"
                                layout="grid"
                                // value={'yes'}
                                name="haveDrivingLicense"
                                label="Do you have Australian driving license?"
                                options={[
                                    { value: 'yes', label: 'Yes' },
                                    { value: 'no', label: 'No' },
                                ]}
                            />
                        </div>
                        <div>
                            <TextInput
                                name={'preferableLocation'}
                                label={
                                    'Where would you want to locate yourself? (Suburb)'
                                }
                                id={'map'}
                                required
                                placeholder="Where would you want to locate your self? (Suburb)"
                                onBlur={() => {
                                    setIsPlaceSelected(false)
                                }}
                                onPlaceSuggetions={{
                                    placesSuggetions: true,
                                    setIsPlaceSelected,
                                }}
                            />

                            {/* <div className="flex justify-between items-center mb-1">
                                <div>
                                    <Typography
                                        variant={'label'}
                                        htmlFor={'map'}
                                    >
                                        Where would you want to locate your
                                        self? (Suburb)
                                    </Typography>
                                    <RequiredStar />
                                </div>
                            </div> */}

                            {/* <input
                                className="border text-black w-full rounded-md outline-none px-4 py-2 placeholder-gray text-sm"
                                ref={(e: any) => {
                                    preferableLocationRef(e)
                                    ref.current = e
                                }}
                                {...rest}
                                id={'map'}
                                placeholder="Where would you want to locate your self? (Suburb)"
                            />
                            <InputErrorMessage name={'preferableLocation'} /> */}
                        </div>
                        <Button text={'Continue'} submit />
                    </form>
                </FormProvider>
            </Card>
        </div>
    )
}
