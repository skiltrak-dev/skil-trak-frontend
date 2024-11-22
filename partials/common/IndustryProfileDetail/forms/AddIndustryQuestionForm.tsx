import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { industryQuestions } from '@partials/admin/industry/components'
import { Select, TextArea, TextInput, Typography } from '@components'
import { IndustryQuestionsEnum } from '@partials/admin/industry/enum'

export const AddIndustryQuestionForm = ({
    methods,
    capacityDisabled,
}: {
    capacityDisabled?: boolean
    methods: any
}) => {
    return (
        <div>
            {' '}
            <FormProvider {...methods}>
                <form className="mt-2 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {Object.entries(industryQuestions)?.map(
                            ([key, value]: any, i: number) => {
                                const isCapacity =
                                    key === IndustryQuestionsEnum.CAPACITY
                                return (
                                    <div className="border-2 border-[#A5A3A9] border-dashed rounded-md  p-2 flex flex-col justify-between gap-y-3">
                                        <Typography variant="small" medium>{`${
                                            i + 1
                                        }. ${value}`}</Typography>
                                        {key ===
                                        IndustryQuestionsEnum.APPLICATIONS ? (
                                            <Select
                                                name={key}
                                                showError={false}
                                                placeholder={key}
                                                onlyValue
                                                options={[
                                                    {
                                                        label: 'Through Skiltrak Platform/Email',
                                                        value: 'Through Skiltrak Platform/Email',
                                                    },
                                                    {
                                                        label: 'Through Follow Up Phone Call/Email',
                                                        value: 'Through Follow Up Phone Call/Email',
                                                    },
                                                ]}
                                                menuPlacement="top"
                                            />
                                        ) : key ===
                                          IndustryQuestionsEnum.SECTOR ? (
                                            <TextArea
                                                name={key}
                                                // label={`${i + 1}. ${value}`}
                                                showError={false}
                                                placeholder={key}
                                                rows={3}
                                                // rows={
                                                //     methods?.watch()?.[
                                                //         IndustryQuestionsEnum
                                                //             .SECTOR
                                                //     ]?.length > 200
                                                //         ? 3
                                                //         : 2
                                                // }
                                                disabled
                                            />
                                        ) : (
                                            <TextInput
                                                name={key}
                                                // label={`${i + 1}. ${value}`}
                                                showError={false}
                                                placeholder={key}
                                                type={
                                                    isCapacity
                                                        ? 'number'
                                                        : 'text'
                                                }
                                                disabled={
                                                    isCapacity &&
                                                    capacityDisabled
                                                }
                                                min={1}
                                                max={9}
                                                // {...(key ===
                                                //     IndustryQuestionsEnum.CAPACITY &&
                                                // capacityDisabled
                                                //     ? { value: 1 }
                                                //     : {})}
                                            />
                                        )}
                                    </div>
                                )
                            }
                        )}
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
