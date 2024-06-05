import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { industryQuestions } from '@partials/admin/industry/components'
import { TextInput, Typography } from '@components'

export const AddIndustryQuestionForm = ({ methods }: { methods: any }) => {
    return (
        <div>
            {' '}
            <FormProvider {...methods}>
                <form className="mt-2 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {Object.entries(industryQuestions)?.map(
                            ([key, value]: any, i: number) => (
                                <div className="border-2 border-[#A5A3A9] border-dashed rounded-md  p-2 flex flex-col justify-between gap-y-3">
                                    <Typography variant="small" medium>{`${
                                        i + 1
                                    }. ${value}`}</Typography>
                                    <TextInput
                                        name={key}
                                        // label={`${i + 1}. ${value}`}
                                        showError={false}
                                        placeholder={key}
                                    />
                                </div>
                            )
                        )}
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}
