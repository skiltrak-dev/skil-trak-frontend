import { useFormContext } from 'react-hook-form'
import { useState } from 'react'

import {
    HelpText,
    LoadingSpinner,
    RequiredStar,
    Tooltip,
    ValidationIcon,
} from './components'
import { Typography } from '@components'

import { getMethodsForInput } from '@utils'

import { InputErrorMessage, PasswordView } from './components'
import { InputProps } from './InputPropType'
import { getTextInputClasses } from './inputStyleClasses'

export type InputType =
    | 'text'
    | 'number'
    | 'password'
    | 'email'
    | 'search'
    | 'tel'
    | 'date'
    | 'time'
    | 'url'
    | 'color'
    | 'file'

export type TextInputProps = InputProps & {
    type?: InputType
    placeholder?: string
    min?: string
    max?: string
    ref?: any
}

export const TextInput = ({
    id,
    name,
    label,
    ref,

    type,
    placeholder,

    helpText,
    tooltip,

    value,
    rules,
    onChange,
    onBlur,

    loading = false,
    required = false,
    disabled = false,
    validationIcons = false,

    min,
    max,
}: TextInputProps) => {
    const [passwordType, setPasswordType] = useState<string | null>(
        type || null
    )
    const formContext = useFormContext()

    const inputFieldClasses = getTextInputClasses(
        formContext && formContext.getFieldState(name).error !== undefined,
        disabled
    )

    return (
        <div className="w-full mb-2">
            {label && (
                <div className="flex justify-between items-center mb-1">
                    <div>
                        <Typography variant={'label'} htmlFor={id}>
                            {label}
                        </Typography>
                        {required && <RequiredStar />}
                    </div>
                    {tooltip && <Tooltip text={tooltip} />}
                </div>
            )}

            <div className="w-full">
                <div className="relative">
                    <input
                        className={inputFieldClasses}
                        {...(id ? { id } : {})}
                        type={passwordType || type}
                        placeholder={placeholder || ''}
                        disabled={disabled}
                        name={name}
                        min={min}
                        max={max}
                        {...getMethodsForInput(
                            name,
                            formContext,
                            rules,
                            onChange,
                            onBlur
                        )}
                        {...(value ? { value } : {})}
                        {...(ref ? { ref } : {})}
                    />

                    {type === 'password' && (
                        <PasswordView
                            onClick={() => {
                                setPasswordType(
                                    passwordType !== 'password'
                                        ? 'password'
                                        : 'text'
                                )
                            }}
                            passwordType={passwordType}
                        />
                    )}

                    {!loading && validationIcons && (
                        <ValidationIcon name={name} />
                    )}
                    {loading && <LoadingSpinner loading={loading} />}
                </div>

                <HelpText text={helpText} />
                <InputErrorMessage name={name} />
            </div>
        </div>
    )
}
