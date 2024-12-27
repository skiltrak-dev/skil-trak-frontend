import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { industryQuestions } from '@partials/admin/industry/components'
import {
    RadioButton,
    Select,
    TextArea,
    TextInput,
    Typography,
} from '@components'
import { IndustryQuestionsEnum } from '@partials/admin/industry/enum'
import { useFieldArray } from 'react-hook-form'

export const AddIndustryQuestionForm = ({
    methods,
    capacityDisabled,
    signUpValues,
}: {
    capacityDisabled?: boolean
    methods: any
    signUpValues?: any
}) => {
    const sectors = signUpValues?.sectors

    React.useEffect(() => {
        if (sectors?.length) {
            // Update the form values with properly structured sector data
            sectors?.forEach((sector: any, index: number) => {
                methods.setValue(
                    `sectorsBaseCap[${index}].sectorId`,
                    sector.value
                )
            })
        }
    }, [sectors, methods])

    return (
        <div>
            <FormProvider {...methods}>
                <form className="mt-2 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {Object.entries(industryQuestions)?.map(
                            ([key, value]: any, i: number) => {
                                const isCapacity =
                                    key ===
                                    IndustryQuestionsEnum.SECTORS_BASE_CAPACITY
                                return (
                                    <div className="border-2 border-[#A5A3A9] border-dashed rounded-md  p-2 flex flex-col justify-between gap-y-3">
                                        <Typography variant="small" medium>{`${
                                            i + 1
                                        }. ${value}`}</Typography>
                                        {key ===
                                        IndustryQuestionsEnum.APPLICATIONS ? (
                                            <div className="flex items-center gap-x-4">
                                                <RadioButton
                                                    name={key}
                                                    showError={false}
                                                    label="Yes"
                                                    value="yes"
                                                />
                                                <RadioButton
                                                    name={key}
                                                    showError={false}
                                                    label="No"
                                                    value="no"
                                                    defaultChecked
                                                />
                                            </div>
                                        ) : (
                                            <>
                                                {isCapacity ? (
                                                    <>
                                                        {sectors?.map(
                                                            (
                                                                sector: any,
                                                                index: number
                                                            ) => {
                                                                return (
                                                                    <div
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="flex gap-2"
                                                                    >
                                                                        <TextInput
                                                                            name={`sectorsBaseCap[${index}].sectorId`}
                                                                            placeholder="Sector"
                                                                            showError={
                                                                                false
                                                                            }
                                                                            value={
                                                                                sector?.label
                                                                            }
                                                                            label={
                                                                                sector?.label
                                                                            }
                                                                            disabled
                                                                            onChange={(
                                                                                e: any
                                                                            ) => {
                                                                                methods.setValue(
                                                                                    `sectorsBaseCap[${index}].sector`,
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }}
                                                                        />
                                                                        <TextInput
                                                                            name={`sectorsBaseCap[${index}].capacity`}
                                                                            placeholder="Capacity"
                                                                            type="number"
                                                                            showError={
                                                                                false
                                                                            }
                                                                            label={`Cap for ${sector?.label}`}
                                                                            min={
                                                                                1
                                                                            }
                                                                            max={
                                                                                9
                                                                            }
                                                                        />
                                                                    </div>
                                                                )
                                                            }
                                                        )}
                                                    </>
                                                ) : key ===
                                                  IndustryQuestionsEnum.TRAINING ? (
                                                    <>
                                                        <div className="flex flex-col gap-2">
                                                            <div className="flex items-center gap-x-8">
                                                                <div className="flex items-center gap-2">
                                                                    <input
                                                                        type="radio"
                                                                        id="trainingYes"
                                                                        name="training"
                                                                        value="yes"
                                                                        onChange={() =>
                                                                            methods.setValue(
                                                                                'training',
                                                                                'yes'
                                                                            )
                                                                        }
                                                                    />
                                                                    <label
                                                                        className="text-sm"
                                                                        htmlFor="trainingYes"
                                                                    >
                                                                        Yes
                                                                    </label>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <input
                                                                        type="radio"
                                                                        id="trainingNo"
                                                                        name="training"
                                                                        value="no"
                                                                        onChange={() =>
                                                                            methods.setValue(
                                                                                'training',
                                                                                'no'
                                                                            )
                                                                        }
                                                                    />
                                                                    <label
                                                                        className="text-sm"
                                                                        htmlFor="trainingNo"
                                                                    >
                                                                        No
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            {methods.watch(
                                                                'training'
                                                            ) === 'yes' && (
                                                                <TextArea
                                                                    name="trainingDetails"
                                                                    placeholder="Please provide details"
                                                                    showError={
                                                                        false
                                                                    }
                                                                />
                                                            )}
                                                        </div>
                                                    </>
                                                ) : key ===
                                                  IndustryQuestionsEnum.HIRE ? (
                                                    <div className="flex items-center gap-4">
                                                        <RadioButton
                                                            name={key}
                                                            showError={false}
                                                            label="Yes"
                                                            value="yes"
                                                        />
                                                        <RadioButton
                                                            name={key}
                                                            showError={false}
                                                            label="No"
                                                            value="no"
                                                        />
                                                    </div>
                                                ) : (
                                                    <>
                                                        <TextInput
                                                            name={key}
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
                                                        />
                                                    </>
                                                )}
                                            </>
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
