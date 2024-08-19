import {
    HelpText,
    InputErrorMessage,
    RequiredStar,
    Tooltip,
} from './components'

import { getMethodsForInput } from '@utils'
import { useFormContext } from 'react-hook-form'
import { ClipLoader } from 'react-spinners'
import { InputProps } from './InputPropType'

export type RadioButtonProps = InputProps & {
    defaultChecked?: boolean
    group?: boolean
}

export const RadioButton = ({
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

    group,
}: RadioButtonProps) => {
    const formContext = useFormContext()

    return (
        <>
            <label
                htmlFor={`id_${name}${value}`}
                className="flex items-center gap-x-2.5 text-sm"
            >
                {!loading ? (
                    <div className="relative">
                        <input
                            // {...(id ? { id } : {})}
                            id={`id_${name}${value}`}
                            name={name}
                            type={'radio'}
                            disabled={disabled}
                            {...getMethodsForInput(
                                name,
                                formContext,
                                rules,
                                onChange,
                                onBlur
                            )}
                            {...(value ? { value } : {})}
                            {...(defaultChecked
                                ? { checked: defaultChecked }
                                : {})}
                            // defaultChecked={defaultChecked}
                        />
                        {disabled && (
                            <div className="absolute top-0 left-0 w-full h-full rounded-full bg-[#e9ecef]"></div>
                        )}
                    </div>
                ) : (
                    <div className="w-[22px] h-[22px] flex items-center justify-center">
                        <ClipLoader size={16} />
                    </div>
                )}

                <div className="flex">
                    <p className="text-sm">{label}</p>
                    {required && <RequiredStar />}
                </div>

                <Tooltip text={tooltip} />
            </label>
            {!group && <InputErrorMessage name={name} />}

            <HelpText text={helpText} />
        </>
    )
}
