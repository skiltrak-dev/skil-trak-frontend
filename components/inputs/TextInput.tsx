import { useState } from 'react'
import { usePlacesWidget } from 'react-google-autocomplete'
import { useFormContext } from 'react-hook-form'

import { Typography } from '@components'
import {
    HelpText,
    LoadingSpinner,
    RequiredStar,
    Tooltip,
    ValidationIcon,
} from './components'

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
    onPlaceSuggetions?: {
        placesSuggetions: boolean
        setIsPlaceSelected: any //(value: boolean) => void
    }
    placesSuggetions?: any
    onFocus?: any
    color?: string
    defaultValue?: string
    showError?: boolean
}

export const TextInput = ({
    id,
    name,
    label,

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
    placesSuggetions,
    color,

    min,
    max,
    onPlaceSuggetions,
    defaultValue,
    onFocus,
    showError = true,
}: TextInputProps) => {
    const [passwordType, setPasswordType] = useState<string | null>(
        type || null
    )
    const formContext = useFormContext()

    const inputFieldClasses = getTextInputClasses(
        formContext && formContext.getFieldState(name).error !== undefined,
        disabled
    )

    const { ref }: any = usePlacesWidget({
        apiKey: process.env.NEXT_PUBLIC_MAP_KEY,
        onPlaceSelected: (place) => {
            onPlaceSuggetions?.setIsPlaceSelected(true)
        },
        options: {
            // types: ['(suburbs)'],
            componentRestrictions: {
                country: 'au',
            },
        },
    })
    // const { ref: preferableLocationRef, ...rest } = formContext.register(name)

    const formRef = formContext && formContext.register(name)

    // useEffect(() => {
    //     formContext.setFocus(name)
    // }, [])

    return (
        <div className="w-full mb-2">
            {label && (
                <div className={`flex justify-between items-center mb-1`}>
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
                        className={`${inputFieldClasses}`}
                        {...(id ? { id } : {})}
                        {...formRef}
                        type={passwordType || type}
                        placeholder={placeholder || ''}
                        disabled={disabled}
                        name={name}
                        min={min}
                        max={max}
                        {...(defaultValue ? { defaultValue } : {})}
                        {...getMethodsForInput(
                            name,
                            formContext,
                            rules,
                            onChange,
                            onBlur
                            // onFocus
                        )}
                        onFocus={(e) => {
                            onFocus && onFocus(e)
                        }}
                        {...(value ? { value } : {})}
                        {...(onPlaceSuggetions?.placesSuggetions ||
                        placesSuggetions
                            ? {
                                  ref: (e: any) => {
                                      formRef && formRef.ref(e)
                                      ref.current = e
                                  },
                              }
                            : {})}
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
                {showError ? <InputErrorMessage name={name} /> : null}
            </div>
        </div>
    )
}
