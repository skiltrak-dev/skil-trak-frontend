import {
    HelpText,
    LoadingSpinner,
    RequiredStar,
    Tooltip,
    ValidationIcon,
} from './components'
import { Typography } from '@components'

import { getMethodsForInput } from '@utils'
import { useFormContext } from 'react-hook-form'
import { InputErrorMessage } from './components/InputErrorMessage'
import { InputProps } from './InputPropType'
import { getTextInputClasses } from './inputStyleClasses'
import { ReactElement } from 'react'

export type TextAreaProps = InputProps & {
    placeholder?: string
    rows?: number
    color?: string
    showError?: boolean
    recomendedText?: string
    textInfo?: ReactElement
}

export const TextArea = ({
    id,
    label,
    name,

    placeholder,
    color,

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
    showError = true,
    recomendedText,
    textInfo,
    rows,
}: TextAreaProps) => {
    const formContext = useFormContext()

    const inputFieldClasses = getTextInputClasses(
        formContext && formContext.getFieldState(name).error !== undefined,
        disabled
    )

    return (
        <div className="w-full">
            {label && (
                <div className="flex justify-between items-center">
                    <div>
                        <Typography variant={'label'}>{label}</Typography>
                        {required && <RequiredStar />}
                    </div>
                    {tooltip && <Tooltip text={tooltip} />}
                </div>
            )}

            <div className="w-full flex items-center relative">
                <textarea
                    className={`${inputFieldClasses} ${
                        color ? color : 'bg-white'
                    }`}
                    {...(id ? { id } : {})}
                    placeholder={placeholder || ''}
                    disabled={disabled}
                    name={name}
                    {...getMethodsForInput(
                        name,
                        formContext,
                        rules,
                        onChange,
                        onBlur
                    )}
                    {...(value ? { value } : {})}
                    {...(rows ? { rows } : {})}
                ></textarea>

                {!loading && validationIcons && <ValidationIcon name={name} />}
                <LoadingSpinner loading={loading} />
            </div>
            <div className="flex items-center justify-between text-xs">
                <p className="text-muted-foreground">{recomendedText}</p>
                {textInfo}
            </div>

            <HelpText text={helpText} />
            {showError ? <InputErrorMessage name={name} /> : null}
        </div>
    )
}
