import { Button, Select, SelectOption, TextArea, TextInput } from '@components'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { Card, Typography } from '@components'
import { RequiredStar } from '@components/inputs/components'
import { useNotification } from '@hooks'
import { Course } from '@types'
import { getUserCredentials } from '@utils'
import { WorkplaceQuestionCard } from '../components'

type PersonalInfoProps = {
    onSubmit: any
    courses: any
    personalInfoData: any
}

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
                    .required()
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
        preferableLocation: yup
            .string()
            .required('Must provide preferableLocation!'),
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

    const questionList = [
        {
            name: workplaceQuestionsKeys.suburb,
            index: 1,
            title: 'Preferred Work Location: Suburb',
            required: true,
            type: 'text',
            inputValues: [
                {
                    name: 'suburb',
                    label: 'Suburb',
                    type: 'text',
                    placeholder:
                        'Where would you want to locate your self? (Suburb)',
                },
                {
                    name: 'zip',
                    label: 'Post Code',
                    type: 'text',
                    placeholder:
                        'Where would you want to locate your self? (Suburb)',
                },
            ],
            fullWidth: true,
        },
        {
            name: workplaceQuestionsKeys.supervisorMeeting,
            index: 2,
            type: 'text',
            title: 'Availability for Supervisor Meeting:',
            fullWidth: true,
            inputValues: [
                {
                    name: 'supervisorMeetingDate1',
                    type: 'date',
                    label: 'Option 1',
                    placeholder:
                        'Where would you want to locate your self? (Suburb)',
                },
                {
                    name: 'supervisorMeetingDate2',
                    type: 'date',
                    label: 'Option 2',
                    placeholder:
                        'Where would you want to locate your self? (Suburb)',
                },
            ],
        },
        {
            name: workplaceQuestionsKeys.placementStartDate,
            index: 3,
            title: 'Placement Start Date:',
            required: true,
            type: 'text',
            inputKey: 'Estimated Date',
            inputValues: [
                {
                    name: 'placementStartDate',
                    type: 'date',
                    label: 'Estimated Date',
                    placeholder:
                        'Where would you want to locate your self? (Suburb)',
                },
            ],
        },
        {
            name: workplaceQuestionsKeys.placementPreferences,
            index: 4,
            title: 'Specific Placement Preferences:',
            required: true,
            type: 'textarea',
        },
        {
            name: workplaceQuestionsKeys.preferredContactTime,
            index: 5,
            title: 'Preferred Contact Time',
            required: true,
            type: 'textarea',
        },
        {
            name: workplaceQuestionsKeys.possession,
            index: 6,
            title: 'Possession of Documents:',
            required: true,
            multipleSelection: true,
            fullWidth: true,
            customAnswers: [
                'CV',
                'Cover letter',
                'Police check',
                'COVID-19 vaccine certificate',
                'working with children check',
                'NDIS screening check',
                'First aid certification',
                'driving license',
            ],
        },
        {
            name: workplaceQuestionsKeys.currentEmploymentStatus,
            index: 7,
            title: 'Current Employment Status:',
            required: true,
        },
        {
            name: workplaceQuestionsKeys.relaventExperience,
            index: 8,
            title: 'Relevant Experience:',
            required: false,
        },
        {
            name: workplaceQuestionsKeys.placementGoals,
            index: 9,
            title: 'Placement Goals:',
            customAnswers: [
                'a job',
                'completing your course',
                'gaining experience',
                'Others',
            ],
            required: true,
        },
        {
            name: workplaceQuestionsKeys.medicalCondition,
            index: 10,
            title: 'Medical Conditions:',
            required: true,
        },
        {
            name: workplaceQuestionsKeys.workPreference,
            index: 11,
            title: 'Work Preference:',
            customAnswers: ['Team', 'Independently'],
            required: false,
        },
        {
            name: workplaceQuestionsKeys.commutePlan,
            index: 12,
            title: 'Commute Plan:',
            customAnswers: ['My Own', 'Public transportation?'],
            required: true,
        },
        {
            name: workplaceQuestionsKeys.awarenessOfUnpaidPlacement,
            index: 13,
            title: 'Awareness of Unpaid Placement:',
            required: true,
        },
        {
            name: workplaceQuestionsKeys.understandingOfDocumentation,
            index: 14,
            title: 'Understanding of Documentation:',
            required: true,
        },
    ]

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

                        {/*  */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-7">
                            {questionList?.map((ques, i, list) => {
                                const textTypeLength = list?.filter(
                                    (l) => l?.type === 'text'
                                )?.length
                                if (ques?.type === 'text') {
                                    return (
                                        <>
                                            <div
                                                className={`${
                                                    ques?.fullWidth
                                                        ? 'col-span-2'
                                                        : ''
                                                } flex flex-col gap-y-1`}
                                            >
                                                <div>
                                                    <Typography
                                                        variant="label"
                                                        semibold
                                                        block
                                                    >
                                                        {ques?.index}.{' '}
                                                        {ques?.title}
                                                    </Typography>

                                                    <Typography
                                                        variant="label"
                                                        block
                                                    >
                                                        {
                                                            workplaceQuestions[
                                                                ques?.name
                                                            ]
                                                        }
                                                    </Typography>
                                                </div>
                                                {ques?.inputValues &&
                                                ques?.inputValues?.length >
                                                    0 ? (
                                                    <div
                                                        className={`grid grid-cols-1 ${
                                                            ques?.inputValues
                                                                ?.length > 1
                                                                ? 'lg:grid-cols-2'
                                                                : 'lg:grid-cols-1'
                                                        }  gap-3`}
                                                    >
                                                        {ques?.inputValues?.map(
                                                            (inp) => (
                                                                <TextInput
                                                                    name={
                                                                        inp?.name
                                                                    }
                                                                    label={
                                                                        inp?.label
                                                                    }
                                                                    placeholder={
                                                                        inp?.placeholder
                                                                    }
                                                                    required
                                                                    type={
                                                                        inp?.type as any
                                                                    }
                                                                />
                                                            )
                                                        )}
                                                    </div>
                                                ) : null}
                                            </div>
                                            {textTypeLength % 2 === 1 &&
                                            i === textTypeLength - 1 ? (
                                                <div />
                                            ) : null}
                                        </>
                                    )
                                }

                                if (ques?.type === 'textarea') {
                                    return (
                                        <div className="flex flex-col gap-y-1">
                                            <Typography
                                                variant="label"
                                                semibold
                                                block
                                            >
                                                {ques?.index}. {ques?.title}
                                            </Typography>
                                            <Typography variant="label">
                                                {workplaceQuestions[ques?.name]}
                                            </Typography>
                                            <div className="mt-1">
                                                <TextArea
                                                    rows={4}
                                                    name={ques?.name}
                                                    required
                                                    placeholder={
                                                        workplaceQuestions[
                                                            ques?.name
                                                        ]
                                                    }
                                                />
                                            </div>
                                        </div>
                                    )
                                }
                                return (
                                    <div
                                        className={`${
                                            ques?.fullWidth ? 'col-span-2' : ''
                                        } flex flex-col gap-y-2`}
                                    >
                                        <div className="flex gap-x-1">
                                            <Typography
                                                variant="label"
                                                semibold
                                                block
                                            >
                                                {ques?.index}. {ques?.title}
                                            </Typography>
                                            {ques?.required ? (
                                                <RequiredStar />
                                            ) : null}
                                        </div>
                                        <div>
                                            <WorkplaceQuestionCard
                                                customAnswers={
                                                    ques?.customAnswers
                                                }
                                                multipleSelection={
                                                    ques?.multipleSelection
                                                }
                                                height="lg:h-28"
                                                title={
                                                    workplaceQuestions[
                                                        ques?.name
                                                    ]
                                                }
                                                onClick={(answer: string) => {
                                                    formMethods.setValue(
                                                        ques?.name,
                                                        answer
                                                    )
                                                }}
                                                index={ques?.index - 1}
                                                data={updateQuestionData(
                                                    ques?.name
                                                )}
                                                name={ques?.name}
                                            />
                                        </div>
                                    </div>
                                )
                            })}
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
