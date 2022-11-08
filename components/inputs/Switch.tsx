import { useState } from 'react'
import { InputProps } from './InputPropType'

// components
import { getMethodsForInput } from '@utils'
import { Typography } from 'components'
import { useFormContext } from 'react-hook-form'
import { ClipLoader } from 'react-spinners'

export type SwitchProps = InputProps & {
    defaultChecked?: boolean
}

export const Switch = ({
    id,
    name,
    label,

    defaultChecked,

    helpText,
    tooltip,

    value,
    rules,
    onChange,
    onBlur,

    loading,
    required,
    disabled,
}: SwitchProps) => {
    const formContext = useFormContext()
    const [checked, setChecked] = useState(false)

    return (
        <div className="flex items-center justify-between gap-x-1">
            {label && (
                <Typography variant={'label'} htmlFor={id ? id : `id_${name}`}>
                    {label}
                </Typography>
            )}

            <div className="relative">
                <label className="switch">
                    <input
                        {...(id ? { id } : {})}
                        name={name}
                        type={'checkbox'}
                        // aria-label={label}
                        disabled={disabled}
                        {...getMethodsForInput(
                            name,
                            formContext,
                            rules,
                            (e: any) => {
                                setChecked(e.target.checked)
                                onChange && onChange(e)
                            },
                            onBlur
                        )}
                        {...(value ? { value } : {})}
                        defaultChecked={defaultChecked}
                    />
                    <span className="slider"></span>
                </label>

                {loading && (
                    <div
                        className={`w-[20px] h-[20px] flex items-center justify-center absolute top-[4px] ${
                            checked ? 'left-[4px]' : 'right-[4px]'
                        }`}
                    >
                        <ClipLoader
                            size={14}
                            color={checked ? 'white' : 'black'}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}
