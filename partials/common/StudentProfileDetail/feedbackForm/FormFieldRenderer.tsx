import { Sparkles } from 'lucide-react'
import React from 'react'
import { Controller, FieldErrors } from 'react-hook-form'
import { AnimatedTextarea } from './form-fields/AnimatedTextarea'
import { CompactRadioGroup } from './form-fields/CompactRadioGroup'
import { StarRating } from './form-fields/StarRating'
import { FormData } from './types'

interface FormFieldRendererProps {
    stepIndex: number
    control: any
    errors: FieldErrors<FormData>
    stepsConfig: any[]
}

export const FormFieldRenderer: React.FC<FormFieldRendererProps> = ({
    stepIndex,
    control,
    errors,
    stepsConfig,
}) => {
    const step = stepsConfig[stepIndex]
    if (!step) return null

    const renderField = (field: any) => {
        const fieldName = field.key as keyof FormData
        const error = errors[fieldName]

        return (
            <Controller
                key={String(field.key)}
                name={fieldName}
                control={control}
                render={({ field: formField }) => {
                    switch (field.type) {
                        case 'radio':
                            return (
                                <CompactRadioGroup
                                    value={formField.value as string}
                                    onValueChange={formField.onChange}
                                    options={field.options}
                                    name={formField.name}
                                    validation={
                                        error
                                            ? {
                                                  isValid: false,
                                                  message: error.message,
                                              }
                                            : undefined
                                    }
                                />
                            )

                        case 'textarea':
                            return (
                                <AnimatedTextarea
                                    id={formField.name}
                                    label={field.label}
                                    value={formField.value as string}
                                    onChange={(
                                        e: React.ChangeEvent<HTMLTextAreaElement>
                                    ) => formField.onChange(e.target.value)}
                                    onBlur={formField.onBlur}
                                    placeholder={field.placeholder || ''}
                                    color={field.color}
                                    validation={
                                        error
                                            ? {
                                                  isValid: false,
                                                  message: error.message,
                                              }
                                            : undefined
                                    }
                                    helpText={field.helpText}
                                    rows={field.rows || 4}
                                />
                            )

                        case 'star':
                            return (
                                <StarRating
                                    name={formField.name}
                                    label={field.label}
                                    description={field.placeholder}
                                    value={formField.value as number}
                                    onChange={(value: number) => {
                                        formField.onChange(value)
                                        formField.onBlur()
                                    }}
                                    validation={
                                        error
                                            ? {
                                                  isValid: false,
                                                  message: error.message,
                                              }
                                            : undefined
                                    }
                                />
                            )

                        default:
                            return <></>
                    }
                }}
            />
        )
    }
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-2 gap-6">
                {step?.fields
                    ?.filter((field: any) => field.type === 'star')
                    ?.map((field: any) => (
                        <div key={String(field?.key)} className="flex flex-col">
                            <h3 className="text-lg font-semibold text-primaryNew mb-6 flex items-center gap-2">
                                <Sparkles className="w-5 h-5" />
                                {field?.label}
                            </h3>
                            {renderField(field)}
                        </div>
                    ))}
            </div>
            {step?.fields?.map((field: any) => (
                <div key={String(field?.key)}>
                    {field?.type === 'radio' && (
                        <div>
                            <label
                                className={`mb-4 block text-${step?.color} text-lg`}
                            >
                                {field?.label}
                            </label>
                            {renderField(field)}
                        </div>
                    )}

                    {field?.type === 'textarea' && renderField(field)}
                </div>
            ))}
        </div>
    )
}
