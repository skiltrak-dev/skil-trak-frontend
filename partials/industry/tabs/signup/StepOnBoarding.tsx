import { Animations } from '@animations'
import { Button, TextInput, Typography } from '@components'
import { industryQuestions } from '@partials/admin/industry/components'
import { IndustryQuestionsEnum } from '@partials/admin/industry/enum'
import { AddIndustryQuestionForm } from '@partials/common/IndustryProfileDetail/forms/AddIndustryQuestionForm'
import { OnBoardingLink } from '@partials/industry/components'
import { OptionType } from '@types'
import { SignUpUtils } from '@utils'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { MdOutlineTextsms } from 'react-icons/md'
import { RiMailSendLine } from 'react-icons/ri'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const UsageType = [
    {
        text: 'I want to use it once',
        Icon: RiMailSendLine,
        animation: '/images/auth/use-once-icon.svg',
        type: 'once',
    },
    {
        text: 'I want to be a partner',
        Icon: MdOutlineTextsms,
        animation: '/images/auth/partner-icon.svg',
        type: 'partner',
    },
]

export const StepOnBoarding = () => {
    const router = useRouter()
    const signUpValues = SignUpUtils.getValuesFromStorage()

    const [onceSelected, setOnceSelected] = useState(true)
    const [partner, setPartner] = useState(false)
    const [studentCapacityError, setStudentCapacityError] = useState(false)
    const [studentCapacity, setStudentCapacity] = useState()
    const [selected, setSelected] = useState<any>()

    // const schema = yup.object().shape({
    //     [IndustryQuestionsEnum.REQUIREMENTS]: yup
    //         .string()
    //         .required('Please specify your requirements for student placement'),
    //     [IndustryQuestionsEnum.TRAINING]: yup
    //         .string()
    //         .required('Please specify if training is provided'),
    //     // trainingDetails: yup.string().when(IndustryQuestionsEnum.TRAINING, {
    //     //     is: 'yes',
    //     //     then: yup.string().required('Please provide training details'),
    //     //     otherwise: yup.string(),
    //     // }),
    //     [IndustryQuestionsEnum.EMPLOYMENT]: yup
    //         .string()
    //         .required('Please specify employment opportunities'),
    //     [IndustryQuestionsEnum.HIRE]: yup
    //         .string()
    //         .required('Please specify if you want to hire students'),
    //     [IndustryQuestionsEnum.SAFETY]: yup
    //         .string()
    //         .required('Please specify safety protocols'),
    //     [IndustryQuestionsEnum.DOCUMENTS]: yup
    //         .string()
    //         .required('Please specify required documents'),
    //     [IndustryQuestionsEnum.APPLICATIONS]: yup
    //         .string()
    //         .required('Please specify application platform details'),
    //     sectorsBaseCap: yup.array().of(
    //         yup.object().shape({
    //             // sectorId: yup.string().required('Sector is required'),
    //             capacity: yup
    //                 .string()
    //                 .required('Capacity is required')
    //                 .matches(/^[1-9]$/, 'Capacity must be between 1 and 9'),
    //         })
    //     ),
    // })

    const methods = useForm({
        mode: 'all',
        // resolver: yupResolver(schema),
        // defaultValues: {
        //     // Initialize default values for the form
        //     [IndustryQuestionsEnum.REQUIREMENTS]: '',
        //     [IndustryQuestionsEnum.TRAINING]: '',
        //     [IndustryQuestionsEnum.EMPLOYMENT]: '',
        //     [IndustryQuestionsEnum.HIRE]: '',
        //     [IndustryQuestionsEnum.SAFETY]: '',
        //     [IndustryQuestionsEnum.DOCUMENTS]: '',
        //     [IndustryQuestionsEnum.APPLICATIONS]: '',
        //     sectorsBaseCap: [],
        //     trainingDetails: '',
        // },
    })

    const values = SignUpUtils.getValuesFromStorage()

    // useEffect(() => {
    //     if (values?.sectors && values?.sectors?.length > 0) {
    //         methods.setValue(
    //             IndustryQuestionsEnum.SECTOR,
    //             values?.sectors
    //                 ?.map((sector: OptionType) => sector?.label)
    //                 ?.join(', ')
    //         )
    //     }
    //     if (selected === UsageType[0].type) {
    //         methods.setValue(IndustryQuestionsEnum.CAPACITY, 1)
    //     }
    // }, [values])

    const onSubmit = (data: any) => {
        let questions: {
            [key: string]: any
        }[] = []
        const sectorBaseCapacity = data?.sectorsBaseCap

        Object.entries(industryQuestions).forEach(([key, value]: any) => {
            // Skip sectors base capacity as we'll handle it separately
            if (
                key !== IndustryQuestionsEnum.SECTORS_BASE_CAPACITY &&
                key !== IndustryQuestionsEnum.TRAINING
            ) {
                questions.push({
                    question: value,
                    answer: data?.[key],
                })
            }
        })

        if (data?.training === 'no') {
            questions.push({
                question: industryQuestions[IndustryQuestionsEnum.TRAINING],
                answer: data?.training,
            })
        } else if (data?.training === 'yes') {
            questions.push({
                question: industryQuestions[IndustryQuestionsEnum.TRAINING],
                answer: data?.trainingDetails,
            })
        }

        // Handle sectors base capacity
        if (data.sectorsBaseCap?.length) {
            questions.push({
                question:
                    industryQuestions[
                        IndustryQuestionsEnum.SECTORS_BASE_CAPACITY
                    ],
                answer: sectorBaseCapacity,
            })
        }

        if (values) {
            SignUpUtils.setValuesToStorage({
                ...values,
                isPartner: selected === UsageType[1].type,
                ...(studentCapacity ? { studentCapacity } : {}),
                questions,
            })
            if (UsageType[0].type || UsageType[1].type) {
                router.push({ query: { step: 'review-info' } })
            }
        }
    }

    const onSelect = (type: string) => {
        setSelected(type)
    }

    return (
        <div className="w-full md:px-0 px-4 flex justify-center items-center md:mt-6">
            <div>
                <div>
                    <p className="font-semibold text-lg">
                        How Would You Like to Collaborate with Skiltrak?
                    </p>
                    <p className="font-medium text-sm text-gray-400">
                        Choose your preferred way to use our platform:
                    </p>
                </div>
                <div className="flex flex-col gap-y-12 items-start mt-8">
                    <div className="flex flex-col md:flex-row gap-y-2 gap-x-8">
                        {UsageType.map((link) => (
                            <OnBoardingLink
                                key={link.type}
                                value={link.type}
                                text={link.text}
                                selected={selected === link.type}
                                onClick={onSelect}
                                animation={link.animation}
                                vertical
                            />
                        ))}
                    </div>
                    {selected === UsageType[1].type && (
                        // <div className="flex flex-col">
                        //     <TextInput
                        //         onChange={(e: any) => {
                        //             setStudentCapacity(e.target.value)
                        //             methods.setValue(
                        //                 IndustryQuestionsEnum.CAPACITY,
                        //                 e.target.value
                        //             )
                        //         }}
                        //         name={'studentCapacity'}
                        //         label={'Student Capacity'}
                        //         type={'number'}
                        //         min={1}
                        //         max={9}
                        //     />
                        // </div>
                        <div>
                            <Typography variant="title">
                                We kindly request you to provide detailed
                                responses to the following questions to help us
                                better understand your organization's
                                requirements and preferences for student
                                placements.
                            </Typography>
                            <AddIndustryQuestionForm
                                methods={methods}
                                capacityDisabled
                                signUpValues={signUpValues}
                            />
                        </div>
                    )}

                    <Button
                        variant={'primary'}
                        onClick={methods.handleSubmit(onSubmit)}
                        disabled={!selected}
                        text={'Continue'}
                    />
                </div>
            </div>
        </div>
    )
}
