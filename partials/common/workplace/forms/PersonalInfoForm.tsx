import {
    Button,
    RadioGroup,
    Select,
    SelectOption,
    TextInput,
} from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

// components

import { Card, Typography } from '@components'
import { useNotification } from '@hooks'
import { Course } from '@types'
import { getUserCredentials } from '@utils'
import { WorkplaceQuestionCard } from '../components'
import { InputErrorMessage } from '@components/inputs/components'
import { WorkplaceQuestionType } from 'redux/queryTypes'

type PersonalInfoProps = {
    onSubmit: any
    courses: any
    personalInfoData: any
}

const placesLibrary = ['places'] as any

export const workplaceQuestions = {
    location:
        'Are you familiar with the location and commute requirements for this workplace?',
    researched:
        "Have you researched the workplace's industry and any relevant regulations or standards?",
    responsibilities:
        'Do you understand the specific duties and responsibilities associated with this placement?',
    scheduling:
        'Are you aware of the work hours and scheduling expectations for this placement?',
    placement:
        'Have you considered how this placement aligns with your academic and career goals?',
    instructions:
        'Have you read and understood any additional instructions or requirements provided by the employer?',
    interviews:
        'Are you prepared to attend any interviews or orientation sessions required by the employer?',
}

export const PersonalInfoForm = ({
    onSubmit,
    courses,
    personalInfoData,
}: PersonalInfoProps) => {
    const [selectedCourse, setSelectedCourse] = useState<any>(null)
    const [questionsData, setQuestionsData] = useState<any>(
        Object.entries(workplaceQuestions).map(([key, value]: any) => ({
            question: value,
            answer: '',
            type: key,
        }))
    )

    const [work, setWork] = useState<string>('')
    const [qualification, setQualification] = useState<string>('')
    const [onLocationClicked, setOnLocationClicked] = useState<boolean>(true)

    const { notification } = useNotification()

    console.log({ personalInfoData })

    useEffect(() => {
        if (
            personalInfoData &&
            personalInfoData?.questions &&
            personalInfoData?.questions?.length > 0
        ) {
            setQuestionsData(personalInfoData?.questions)
        }
    }, [personalInfoData])

    const role = getUserCredentials()?.role
    useEffect(() => {
        if (
            personalInfoData?.courses ||
            (courses?.data && courses?.data?.length > 0)
        ) {
            const courseData = courses?.data?.find(
                (course: Course) =>
                    course?.id === Number(personalInfoData?.courses)
            )

            const course = courseData || courses?.data?.[0]
            setSelectedCourse({
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
        location: yup.string().nullable(true).required('Must provide location'),
        researched: yup
            .string()
            .nullable(true)
            .required('Must provide researched'),
        responsibilities: yup
            .string()
            .nullable(true)
            .required('Must provide responsibilities'),
        scheduling: yup
            .string()
            .nullable(true)
            .required('Must provide scheduling'),
        placement: yup
            .string()
            .nullable(true)
            .required('Must provide placement'),
        instructions: yup
            .string()
            .nullable(true)
            .required('Must provide instructions'),
        interviews: yup
            .string()
            .nullable(true)
            .required('Must provide interviews'),
        // qualification: yup
        //     .string()
        //     .nullable(true)
        //     .required('Must provide currentQualification'),
        // currentQualification: yup.string().when('qualification', {
        //     is: 'yes',
        //     then: yup.string().required(),
        // }),
        // work: yup.string().nullable(true).required('Must provide currentWork'),
        // currentWork: yup.string().when('work', {
        //     is: 'yes',
        //     then: yup.string().required(),
        // }),
        // haveTransport: yup
        //     .string()
        //     .nullable(true)
        //     .required('Must provide Transport Option'),
        // haveDrivingLicense: yup
        //     .string()
        //     .nullable(true)
        //     .required('Must provide Driving License Option'),
        preferableLocation: yup
            .string()
            .required('Must provide preferableLocation'),
    })

    const questionsDefaultValues = () => {
        let questions: any = {}
        personalInfoData?.questions?.forEach((question: any) => {
            questions[question?.type] = question?.answer
        })
        return questions
    }

    const formMethods = useForm({
        mode: 'all',
        resolver: yupResolver(validationSchema),
        defaultValues: {
            ...personalInfoData,
            ...questionsDefaultValues(),
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

    const onHandleSubmit = (values: any) => {
        onSubmit(values)
        // if (!onLocationClicked) {
        //     notification.error({
        //         title: 'You must select on Address Dropdown',
        //         description: 'You must select on Address Dropdown',
        //     })
        // } else if (onLocationClicked) {
        //     onSubmit(values)
        // }
    }

    return (
        <div>
            <Typography variant={'label'} capitalize>
                Please provide following information
            </Typography>

            <Card>
                <FormProvider {...formMethods}>
                    <form onSubmit={formMethods.handleSubmit(onHandleSubmit)}>
                        <div>
                            <Select
                                id="courses"
                                placeholder="Select Your Choice"
                                name="courses"
                                label="Course"
                                value={selectedCourse}
                                onChange={(e: any) => {
                                    setSelectedCourse(e)
                                }}
                                options={coursesOptions}
                                loading={courses.isLoading}
                                disabled={courses.isLoading}
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 mt-4">
                            {/*
                             */}
                            {/* <div>
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
                            </div> */}
                            {questionsData?.map(
                                (data: WorkplaceQuestionType, i: number) => (
                                    <div>
                                        <WorkplaceQuestionCard
                                            title={data?.question}
                                            index={i}
                                            data={data}
                                            onClick={(text) => {
                                                formMethods.setValue(
                                                    data?.type,
                                                    text
                                                )
                                            }}
                                        />
                                        <InputErrorMessage name={data?.type} />
                                    </div>
                                )
                            )}

                            {/* <div>
                                <RadioGroup
                                    gridColumns="2"
                                    layout="grid"
                                    name="researched"
                                    label={workplaceQuestions.researched}
                                    options={[
                                        { value: 'yes', label: 'Yes' },
                                        { value: 'no', label: 'No' },
                                    ]}
                                />
                            </div>
                            <div>
                                <RadioGroup
                                    gridColumns="2"
                                    layout="grid"
                                    name="responsibilities"
                                    label={workplaceQuestions.responsibilities}
                                    options={[
                                        { value: 'yes', label: 'Yes' },
                                        { value: 'no', label: 'No' },
                                    ]}
                                />
                            </div>
                            <div>
                                <RadioGroup
                                    gridColumns="2"
                                    layout="grid"
                                    name="scheduling"
                                    label={workplaceQuestions.scheduling}
                                    options={[
                                        { value: 'yes', label: 'Yes' },
                                        { value: 'no', label: 'No' },
                                    ]}
                                />
                            </div>
                            <div>
                                <RadioGroup
                                    gridColumns="2"
                                    layout="grid"
                                    name="placement"
                                    label={workplaceQuestions.placement}
                                    options={[
                                        { value: 'yes', label: 'Yes' },
                                        { value: 'no', label: 'No' },
                                    ]}
                                />
                            </div>
                            <div>
                                <RadioGroup
                                    gridColumns="2"
                                    layout="grid"
                                    name="instructions"
                                    label={workplaceQuestions.instructions}
                                    options={[
                                        { value: 'yes', label: 'Yes' },
                                        { value: 'no', label: 'No' },
                                    ]}
                                />
                            </div>
                            <div>
                                <RadioGroup
                                    gridColumns="2"
                                    layout="grid"
                                    name="interviews"
                                    label={workplaceQuestions.interviews}
                                    options={[
                                        { value: 'yes', label: 'Yes' },
                                        { value: 'no', label: 'No' },
                                    ]}
                                />
                            </div> */}
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
                                placesSuggetions
                                onChange={() => {
                                    setOnLocationClicked(false)
                                }}
                                onPlaceSuggetions={{
                                    placesSuggetions: onLocationClicked,
                                    setIsPlaceSelected: setOnLocationClicked,
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
