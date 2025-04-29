import { Select, SelectOption, Typography } from '@components'
import { workplaceQuestionsKeys } from '@partials/common/workplace/enum'
import { SubAdminApi } from '@queries'
import { WorkplaceTypes } from '@types'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { questionList, workplaceQuestions } from '../questionListData'
import { AvailabilitySelector } from './AvailabilitySelector'
import { DaysQuestions } from './DaysQuestions'
import { DefaultQuestions } from './DefaultQuestions'
import { TextAreaQuestions } from './TextAreaQuestions'
import { TextTypeQuestions } from './TextTypeQuestions'

export const PersonalInfoQuestions = ({
    formMethods,
    selectedCourse,
    personalInfoData,
}: {
    formMethods: any
    personalInfoData: any
    selectedCourse: number
}) => {
    const router = useRouter()
    const formValues = formMethods.watch()

    const wpType = SubAdminApi.Student.getWpTypeByRtoAndCourse(
        {
            courseId: selectedCourse,
            stdId: Number(router?.query?.id),
        },
        {
            skip: !router?.query?.id || !selectedCourse,
        }
    )

    const wpTypesOptions =
        wpType?.data?.map((wpType: WorkplaceTypes) => ({
            label: wpType?.workplaceType?.name,
            value: wpType?.workplaceType?.name,
        })) || []

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-7">
            {questionList?.map((ques, i, list) => {
                const textTypeLength = list?.filter(
                    (l) => l?.type === 'text'
                )?.length
                if (ques?.type === 'text') {
                    return (
                        <TextTypeQuestions
                            key={i}
                            index={i}
                            ques={ques}
                            textTypeLength={textTypeLength}
                            formMethods={formMethods}
                        />
                    )
                }
                if (ques?.type === 'days') {
                    return (
                        <DaysQuestions
                            key={i}
                            index={i}
                            ques={ques}
                            textTypeLength={textTypeLength}
                        />
                    )
                }

                if (ques?.type === 'textarea') {
                    if (ques.name === 'preferredContactTime') {
                        return (
                            <div className="flex flex-col gap-y-2">
                                <Typography variant="label" semibold block>
                                    {ques?.index}. {ques?.title}
                                </Typography>

                                <Typography variant="label">
                                    {
                                        workplaceQuestions[
                                            ques?.name as keyof typeof workplaceQuestions
                                        ]
                                    }
                                </Typography>
                                <AvailabilitySelector />
                            </div>
                        )
                    } else if (
                        ques.name ===
                        workplaceQuestionsKeys.placementPreferences
                    ) {
                        return (
                            <div className="flex flex-col gap-y-1">
                                <Typography variant="label" semibold block>
                                    {ques?.index}. {ques?.title}
                                </Typography>
                                <Typography variant="label">
                                    {
                                        workplaceQuestions[
                                            ques?.name as keyof typeof workplaceQuestions
                                        ]
                                    }
                                </Typography>
                                <Select
                                    multi
                                    name={ques?.name}
                                    options={[
                                        { label: 'Default', value: 'Default' },
                                        ...wpTypesOptions,
                                    ]}
                                    loading={wpType?.isLoading}
                                    disabled={wpType?.isLoading}
                                    onlyValue
                                    onChange={(e: SelectOption[]) => {
                                        formMethods.setValue(
                                            ques?.name,
                                            e?.join(', ')
                                        )
                                    }}
                                />
                            </div>
                        )
                        return <TextAreaQuestions key={i} ques={ques} />
                    }
                }
                return (
                    <DefaultQuestions
                        key={i}
                        ques={ques}
                        personalInfoData={personalInfoData}
                        value={formValues?.[ques?.name]}
                    />
                )
            })}
        </div>
    )
}
