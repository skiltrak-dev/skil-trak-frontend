import { HelpText, InputErrorMessage, RequiredStar, Tooltip } from '@components'
import { getMethodsForInput } from '@utils'
import { useFormContext } from 'react-hook-form'
import { ClipLoader } from 'react-spinners'
import { InputProps } from './InputPropType'

export type RadioButtonProps = InputProps & {
    defaultChecked?: boolean
    group?: boolean
}

export const RadioButton = (
    {
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
    }: RadioButtonProps,
    ref: any
) => {
    const formContext = useFormContext()

    return (
        <>
            <label
                htmlFor={`id_${name}`}
                className="flex items-center gap-x-2.5 text-sm"
            >
                {!loading ? (
                    <input
                        {...(id ? { id } : {})}
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
                        checked={defaultChecked}
                        // defaultChecked={defaultChecked}
                    />
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
