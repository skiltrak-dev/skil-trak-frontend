import { Button, Select, SelectOption, TextArea, TextInput } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

// components

import { Card, Typography } from '@components'
import { InputErrorMessage, RequiredStar } from '@components/inputs/components'
import { useNotification } from '@hooks'
import { Course } from '@types'
import { getUserCredentials } from '@utils'
import { WorkplaceQuestionCard } from '../components'

type PersonalInfoProps = {
    onSubmit: any
    courses: any
    personalInfoData: any
}

const placesLibrary = ['places'] as any

// export const workplaceQuestions = {
//     location:
//         'Are you familiar with the location and commute requirements for this workplace?',
//     researched:
//         "Have you researched the workplace's industry and any relevant regulations or standards?",
//     responsibilities:
//         'Do you understand the specific duties and responsibilities associated with this placement?',
//     scheduling:
//         'Are you aware of the work hours and scheduling expectations for this placement?',
//     placement:
//         'Have you considered how this placement aligns with your academic and career goals?',
//     instructions:
//         'Have you read and understood any additional instructions or requirements provided by the employer?',
//     interviews:
//         'Are you prepared to attend any interviews or orientation sessions required by the employer?',
// }

export enum workplaceQuestionsKeys {
    suburb = 'suburb',
    commutePlan = 'commutePlan',
    supervisorMeeting = 'supervisorMeeting',
    placementStartDate = 'placementStartDate',
    possession = 'possession',
    currentEmploymentStatus = 'currentEmploymentStatus',
    relaventExperience = 'relaventExperience',
    placementGoals = 'placementGoals',
    medicalCondition = 'medicalCondition',
    workPreference = 'workPreference',
    placementPreferences = 'placementPreferences',
    awarenessOfUnpaidPlacement = 'awarenessOfUnpaidPlacement',
    understandingOfDocumentation = 'understandingOfDocumentation',
    preferredContactTime = 'preferredContactTime',
}

export const workplaceQuestions = {
    [workplaceQuestionsKeys.suburb]:
        'In which suburb would you prefer to work? Please provide the suburb name and postcode.',
    [workplaceQuestionsKeys.supervisorMeeting]:
        'When would you be available to meet with workplace supervisors once a placement becomes available? Please provide two timing options',
    [workplaceQuestionsKeys.commutePlan]:
        'How do you plan to commute to the workplace',
    [workplaceQuestionsKeys.placementStartDate]:
        'When would you like to commence your placement? options',
    [workplaceQuestionsKeys.possession]:
        'Do you possess any of the following documents? Please ignore those that do not apply to you:',
    [workplaceQuestionsKeys.currentEmploymentStatus]:
        'Are you currently employed? Would you mint providing the details?',
    [workplaceQuestionsKeys.relaventExperience]:
        'Do you have any relevant experience in the field for which you are seeking placement?',
    [workplaceQuestionsKeys.placementGoals]:
        'What are your desired outcomes upon successfully completing the placement? Options include securing',
    [workplaceQuestionsKeys.medicalCondition]:
        'Do you have any medical conditions that may affect your ability to work?',
    [workplaceQuestionsKeys.workPreference]:
        'Do you prefer working in a team or independently?',
    [workplaceQuestionsKeys.placementPreferences]:
        'Is there any specific aspect you are seeking in a placement opportunity? (provide details) 100 words*',
    [workplaceQuestionsKeys.awarenessOfUnpaidPlacement]:
        'Are you aware that the placement is unpaid and forms a part of your studies?',
    [workplaceQuestionsKeys.understandingOfDocumentation]:
        'Do you understand the documentation and assessments required for the placement, such as the Agreement and workbook etc?',
    [workplaceQuestionsKeys.preferredContactTime]:
        'When would be the most convenient time for one of the SkilTrak coordinators to call you to discuss workplace details further*',
}

const requiredFields = [
    workplaceQuestionsKeys.suburb,
    workplaceQuestionsKeys.placementStartDate,
    workplaceQuestionsKeys.preferredContactTime,
    workplaceQuestionsKeys.possession,
    workplaceQuestionsKeys.medicalCondition,
    workplaceQuestionsKeys.commutePlan,
    workplaceQuestionsKeys.awarenessOfUnpaidPlacement,
    workplaceQuestionsKeys.understandingOfDocumentation,
]

export const PersonalInfoForm = ({
    onSubmit,
    courses,
    personalInfoData,
}: PersonalInfoProps) => {
    const [selectedCourse, setSelectedCourse] = useState<any>(null)
    const [possession, setPossession] = useState<any>([])
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

    useEffect(() => {
        if (personalInfoData) {
            if (
                personalInfoData?.questions &&
                personalInfoData?.questions?.length > 0
            ) {
                setQuestionsData(personalInfoData?.questions)
            }
            const possession = personalInfoData?.questions
                ?.find(
                    (q: any) => q?.type === workplaceQuestionsKeys.possession
                )
                ?.answer?.split(',')
            if (possession && possession?.length > 0) {
                setPossession(possession)
            }
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

    const requiredQuestion = () => {
        let fields: any = {}

        requiredFields?.forEach((field: workplaceQuestionsKeys) => {
            if (field === workplaceQuestionsKeys.possession) {
                fields[field] = yup
                    .array()
                    .of(
                        yup.string().required('Item must be a non-empty string')
                    )
                    .min(1, 'Array must contain at least one item')
            } else {
                fields[field] = yup
                    .string()
                    .nullable(true)
                    .required('Required!')
            }
        })
        return fields
    }

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
        ...requiredQuestion(),
        // location: yup.string().nullable(true).required('Must provide location'),
        // researched: yup
        //     .string()
        //     .nullable(true)
        //     .required('Must provide researched'),
        // responsibilities: yup
        //     .string()
        //     .nullable(true)
        //     .required('Must provide responsibilities'),
        // scheduling: yup
        //     .string()
        //     .nullable(true)
        //     .required('Must provide scheduling'),
        // placement: yup
        //     .string()
        //     .nullable(true)
        //     .required('Must provide placement'),
        // instructions: yup
        //     .string()
        //     .nullable(true)
        //     .required('Must provide instructions'),
        // interviews: yup
        //     .string()
        //     .nullable(true)
        //     .required('Must provide interviews'),

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
            if (question?.type === workplaceQuestionsKeys.suburb) {
                questions[workplaceQuestionsKeys.suburb] =
                    question?.answer?.suburb
                questions['zip'] = question?.answer?.zip
            } else if (
                question?.type === workplaceQuestionsKeys.supervisorMeeting
            ) {
                questions['supervisorMeetingDate1'] =
                    question?.answer?.supervisorMeetingDate1
                questions['supervisorMeetingDate2'] =
                    question?.answer?.supervisorMeetingDate2
            } else if (question?.type === workplaceQuestionsKeys.possession) {
                questions[question?.type] = question?.answer?.split(',')
            } else {
                questions[question?.type] = question?.answer
            }
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

    const updateQuestionData = (type: workplaceQuestionsKeys) =>
        personalInfoData?.questions?.find((q: any) => q?.type === type)

    return (
        <div className="flex flex-col gap-y-3">
            <Typography variant={'subtitle'} capitalize bold>
                Please provide following information
            </Typography>

            <Card>
                <FormProvider {...formMethods}>
                    <form
                        className="flex flex-col gap-y-7"
                        onSubmit={formMethods.handleSubmit(onHandleSubmit)}
                    >
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

                        <div>
                            <Typography variant="label" semibold block>
                                1. Preferred Work Location:
                            </Typography>
                            <Typography variant="label" block>
                                {
                                    workplaceQuestions[
                                        workplaceQuestionsKeys.suburb
                                    ]
                                }
                            </Typography>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                <TextInput
                                    name={'suburb'}
                                    label={'Suburb'}
                                    required
                                    placeholder="Where would you want to locate your self? (Suburb)"
                                    placesSuggetions
                                    showError={false}
                                />
                                <TextInput
                                    name={'zip'}
                                    label={'Postcode'}
                                    required
                                    placeholder="Where would you want to locate your self? (Suburb)"
                                    placesSuggetions
                                    showError={false}
                                />
                            </div>
                            <InputErrorMessage
                                name={workplaceQuestionsKeys.suburb}
                            />
                        </div>

                        {/*  */}
                        <div className="flex flex-col gap-y-2">
                            <div className="flex flex-col gap-y-1">
                                <Typography variant="label" semibold block>
                                    2. Availability for Supervisor Meeting:
                                </Typography>
                                <Typography variant="label" block>
                                    {
                                        workplaceQuestions[
                                            workplaceQuestionsKeys
                                                .supervisorMeeting
                                        ]
                                    }
                                </Typography>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                                <TextInput
                                    name={'supervisorMeetingDate1'}
                                    label={'Option1'}
                                    required
                                    type={'date'}
                                    placeholder="Where would you want to locate your self? (Suburb)"
                                    placesSuggetions
                                    showError={false}
                                />
                                <TextInput
                                    type={'date'}
                                    name={'supervisorMeetingDate2'}
                                    label={'Option2'}
                                    required
                                    placeholder="Where would you want to locate your self? (Suburb)"
                                    placesSuggetions
                                    showError={false}
                                />
                            </div>
                        </div>

                        {/*  */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                            <div className="flex flex-col gap-y-1">
                                <div>
                                    <Typography variant="label" semibold block>
                                        3. Placement Start Date:
                                    </Typography>

                                    <Typography variant="label" block>
                                        {
                                            workplaceQuestions[
                                                workplaceQuestionsKeys
                                                    .placementStartDate
                                            ]
                                        }
                                    </Typography>
                                </div>
                                <TextInput
                                    name={'placementStartDate'}
                                    label={'Estimated Date'}
                                    required
                                    type={'date'}
                                    placesSuggetions
                                />
                            </div>
                        </div>

                        {/*  */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-y-1">
                                <Typography variant="label" semibold block>
                                    4. Specific Placement Preferences:**
                                </Typography>
                                <Typography variant="label">
                                    {
                                        workplaceQuestions[
                                            workplaceQuestionsKeys
                                                .placementPreferences
                                        ]
                                    }
                                </Typography>
                                <div className="mt-1">
                                    <TextArea
                                        rows={4}
                                        name={
                                            workplaceQuestionsKeys.placementPreferences
                                        }
                                        required
                                        placeholder={
                                            workplaceQuestions[
                                                workplaceQuestionsKeys
                                                    .placementPreferences
                                            ]
                                        }
                                        showError={false}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-y-1">
                                <Typography variant="label" semibold block>
                                    5. Preferred Contact Time
                                </Typography>
                                <Typography variant="label">
                                    {
                                        workplaceQuestions[
                                            workplaceQuestionsKeys
                                                .preferredContactTime
                                        ]
                                    }
                                </Typography>
                                <div className="mt-1">
                                    <TextArea
                                        rows={4}
                                        name={
                                            workplaceQuestionsKeys.preferredContactTime
                                        }
                                        required
                                        placeholder={
                                            workplaceQuestions[
                                                workplaceQuestionsKeys
                                                    .preferredContactTime
                                            ]
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        {/*  */}
                        <div className="flex flex-col gap-y-2">
                            <div className="flex gap-x-1">
                                <Typography variant="label" semibold block>
                                    6. Possession of Documents:
                                </Typography>
                                <RequiredStar />
                            </div>
                            <div className="grid grid-cols-1 gap-3">
                                <WorkplaceQuestionCard
                                    height="lg:h-28"
                                    multipleSelection
                                    customAnswers={[
                                        'CV',
                                        'Cover letter',
                                        'Police check',
                                        'COVID-19 vaccine certificate',
                                        'working with children check',
                                        'NDIS screening check',
                                        'First aid certification',
                                        'driving license',
                                    ]}
                                    title={
                                        workplaceQuestions[
                                            workplaceQuestionsKeys.possession
                                        ]
                                    }
                                    name={workplaceQuestionsKeys.possession}
                                    onClick={(answer: string) => {
                                        formMethods.setValue(
                                            workplaceQuestionsKeys.possession,
                                            answer
                                        )
                                    }}
                                    index={0}
                                    data={updateQuestionData(
                                        workplaceQuestionsKeys.possession
                                    )}
                                />

                                {/* {[
                                    'CV',
                                    'Cover letter',
                                    'Police check',
                                    'COVID-19 vaccine certificate',
                                    'working with children check',
                                    'NDIS screening check',
                                    'First aid certification',
                                    'driving license',
                                ]?.map((text) => (
                                    <div>
                                        <Checkbox
                                            name={text}
                                            label={text}
                                            defaultChecked={possession?.includes(
                                                text
                                            )}
                                            showError={false}
                                            onChange={(e: any) => {
                                                setPossession((p: any) => {
                                                    const pos = p?.includes(
                                                        text
                                                    )
                                                        ? p?.filter(
                                                              (name: string) =>
                                                                  name !==
                                                                  e.target?.name
                                                          )
                                                        : [...p, e.target?.name]

                                                    formMethods.setValue(
                                                        'possession',
                                                        pos
                                                    )

                                                    return pos
                                                })
                                            }}
                                        />
                                    </div>
                                ))} */}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                            {/*  */}
                            <div className="flex flex-col gap-y-2">
                                <div className="flex flex-col gap-y-1">
                                    <Typography variant="label" semibold block>
                                        7. Current Employment Status:
                                    </Typography>
                                </div>
                                <div>
                                    <WorkplaceQuestionCard
                                        title={
                                            workplaceQuestions[
                                                workplaceQuestionsKeys
                                                    .currentEmploymentStatus
                                            ]
                                        }
                                        onClick={(answer: string) => {
                                            formMethods.setValue(
                                                workplaceQuestionsKeys.currentEmploymentStatus,
                                                answer
                                            )
                                        }}
                                        index={0}
                                        data={updateQuestionData(
                                            workplaceQuestionsKeys.currentEmploymentStatus
                                        )}
                                        name={
                                            workplaceQuestionsKeys.currentEmploymentStatus
                                        }
                                    />
                                </div>
                            </div>

                            {/*  */}
                            <div className="flex flex-col gap-y-2">
                                <div className="flex flex-col gap-y-1">
                                    <Typography variant="label" semibold block>
                                        8. Relevant Experience:
                                    </Typography>
                                </div>
                                <div>
                                    <WorkplaceQuestionCard
                                        title={
                                            workplaceQuestions[
                                                workplaceQuestionsKeys
                                                    .relaventExperience
                                            ]
                                        }
                                        onClick={(answer: string) => {
                                            formMethods.setValue(
                                                workplaceQuestionsKeys.relaventExperience,
                                                answer
                                            )
                                        }}
                                        index={0}
                                        data={updateQuestionData(
                                            workplaceQuestionsKeys.relaventExperience
                                        )}
                                        name={
                                            workplaceQuestionsKeys.relaventExperience
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        {/*  */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-y-2">
                                <Typography variant="label" semibold block>
                                    9. Placement Goals:
                                </Typography>

                                {/* <RadioGroup
                                    showError={false}
                                    gridColumns="2"
                                    layout="grid"
                                    name={workplaceQuestionsKeys.placementGoals}
                                    label={
                                        workplaceQuestions[
                                            workplaceQuestionsKeys
                                                .placementGoals
                                        ]
                                    }
                                    options={[
                                        {
                                            label: 'a job',
                                            value: 'aJob',
                                        },
                                        {
                                            label: 'completing your course',
                                            value: 'completingYourCourse',
                                        },
                                        {
                                            label: 'gaining experience',
                                            value: 'gainingExperience',
                                        },
                                        {
                                            label: 'Others',
                                            value: 'others',
                                        },
                                    ]}
                                /> */}
                                <WorkplaceQuestionCard
                                    height="lg:h-[125px] max-h-[125px]"
                                    customAnswers={[
                                        'a job',
                                        'completing your course ',
                                        'gaining experience',
                                        'Others',
                                    ]}
                                    title={
                                        workplaceQuestions[
                                            workplaceQuestionsKeys
                                                .placementGoals
                                        ]
                                    }
                                    onClick={(answer: string) => {
                                        formMethods.setValue(
                                            workplaceQuestionsKeys.placementGoals,
                                            answer
                                        )
                                    }}
                                    index={0}
                                    data={updateQuestionData(
                                        workplaceQuestionsKeys.placementGoals
                                    )}
                                />
                            </div>

                            {/*  */}
                            <div className="flex flex-col gap-y-2">
                                <div className="flex gap-x-1">
                                    <Typography variant="label" semibold block>
                                        10. Medical Conditions:
                                    </Typography>
                                    <RequiredStar />
                                </div>
                                <WorkplaceQuestionCard
                                    height="lg:h-[125px] max-h-[125px]"
                                    title={
                                        workplaceQuestions[
                                            workplaceQuestionsKeys
                                                .medicalCondition
                                        ]
                                    }
                                    onClick={(answer: string) => {
                                        formMethods.setValue(
                                            workplaceQuestionsKeys.medicalCondition,
                                            answer
                                        )
                                    }}
                                    index={0}
                                    data={updateQuestionData(
                                        workplaceQuestionsKeys.medicalCondition
                                    )}
                                    name={
                                        workplaceQuestionsKeys.medicalCondition
                                    }
                                />
                            </div>
                        </div>

                        {/*  */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-y-1">
                                <Typography variant="label" semibold block>
                                    11. Work Preference:
                                </Typography>

                                {/* <RadioGroup
                                name="workPreference"
                                label={
                                    workplaceQuestions[
                                        workplaceQuestionsKeys.workPreference
                                    ]
                                }
                                options={[
                                    {
                                        label: 'Team',
                                        value: 'team',
                                    },
                                    {
                                        label: 'Independently',
                                        value: 'independently',
                                    },
                                ]}
                            /> */}
                                <WorkplaceQuestionCard
                                    customAnswers={['Team', 'Independently']}
                                    title={
                                        workplaceQuestions[
                                            workplaceQuestionsKeys
                                                .workPreference
                                        ]
                                    }
                                    onClick={(answer: string) => {
                                        formMethods.setValue(
                                            workplaceQuestionsKeys.workPreference,
                                            answer
                                        )
                                    }}
                                    index={0}
                                    data={updateQuestionData(
                                        workplaceQuestionsKeys.workPreference
                                    )}
                                />
                            </div>

                            <div className="flex flex-col gap-y-1">
                                <div className="flex gap-x-1">
                                    <Typography variant="label" semibold block>
                                        12. Commute Plan:
                                    </Typography>
                                    <RequiredStar />
                                </div>

                                {/* <RadioGroup
                                    name="commutePlan"
                                    showError={false}
                                    label={
                                        workplaceQuestions[
                                            workplaceQuestionsKeys.commutePlan
                                        ]
                                    }
                                    options={[
                                        {
                                            label: 'My Own',
                                            value: 'myOwn',
                                        },
                                        {
                                            label: 'Public transportation?',
                                            value: 'publicTransportation',
                                        },
                                    ]}
                                /> */}
                                <WorkplaceQuestionCard
                                    customAnswers={[
                                        'My Own',
                                        'Public transportation?',
                                    ]}
                                    title={
                                        workplaceQuestions[
                                            workplaceQuestionsKeys.commutePlan
                                        ]
                                    }
                                    onClick={(answer: string) => {
                                        formMethods.setValue(
                                            workplaceQuestionsKeys.commutePlan,
                                            answer
                                        )
                                    }}
                                    index={0}
                                    data={updateQuestionData(
                                        workplaceQuestionsKeys.commutePlan
                                    )}
                                    name={workplaceQuestionsKeys.commutePlan}
                                />
                            </div>
                        </div>

                        {/*  */}

                        {/*  */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                            <div className="flex flex-col gap-y-2">
                                <div className="flex gap-x-1">
                                    <Typography variant="label" semibold block>
                                        13. Awareness of Unpaid Placement:
                                    </Typography>
                                    <RequiredStar />
                                </div>
                                <div>
                                    <WorkplaceQuestionCard
                                        height="lg:h-28"
                                        title={
                                            workplaceQuestions[
                                                workplaceQuestionsKeys
                                                    .awarenessOfUnpaidPlacement
                                            ]
                                        }
                                        onClick={(answer: string) => {
                                            formMethods.setValue(
                                                workplaceQuestionsKeys.awarenessOfUnpaidPlacement,
                                                answer
                                            )
                                        }}
                                        index={0}
                                        data={updateQuestionData(
                                            workplaceQuestionsKeys.awarenessOfUnpaidPlacement
                                        )}
                                        name={
                                            workplaceQuestionsKeys.awarenessOfUnpaidPlacement
                                        }
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <div className="flex gap-x-1">
                                    <Typography variant="label" semibold block>
                                        14. Understanding of Documentation:
                                    </Typography>
                                    <RequiredStar />
                                </div>
                                <div>
                                    <WorkplaceQuestionCard
                                        height="lg:h-28"
                                        title={
                                            workplaceQuestions[
                                                workplaceQuestionsKeys
                                                    .understandingOfDocumentation
                                            ]
                                        }
                                        onClick={(answer: string) => {
                                            formMethods.setValue(
                                                workplaceQuestionsKeys.understandingOfDocumentation,
                                                answer
                                            )
                                        }}
                                        index={0}
                                        data={updateQuestionData(
                                            workplaceQuestionsKeys.understandingOfDocumentation
                                        )}
                                        name={
                                            workplaceQuestionsKeys.understandingOfDocumentation
                                        }
                                    />
                                </div>
                            </div>
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

                            <Button text={'Continue'} submit />
                        </div>
                    </form>
                </FormProvider>
            </Card>
        </div>
    )
}
