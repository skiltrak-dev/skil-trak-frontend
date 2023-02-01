import { getMethodsForInput } from '@utils'
import { useFormContext } from 'react-hook-form'
import React from 'react'
import { default as PhoneInput } from 'react-phone-number-input/react-hook-form'
import 'react-phone-number-input/style.css'

// components
import { Typography } from '@components'

import {
    HelpText,
    InputErrorMessage,
    RequiredStar,
    Tooltip,
    ValidationIcon,
} from './components'

export const PhoneInputWithCountry = ({
    label,
    required,
    tooltip,
    name,
    rules,
    onChange,
    onBlur,
    validationIcons,
    placeholder,
    countries,
    defaultCountry,
    helpText,
    isInternational,
}: any) => {
    const formContext = useFormContext()
    return (
        <div className="w-full mb-2">
            {label && (
                <div className="flex justify-between items-center mb-1">
                    <div>
                        <Typography
                            variant={'label'}
                            htmlFor={`PhoneInputWithCountry_${label}`}
                        >
                            {label}
                        </Typography>
                        {required && <RequiredStar />}
                    </div>
                    {tooltip && <Tooltip text={tooltip} />}
                </div>
            )}

            <div className="w-full">
                <div className="relative">
                    <PhoneInput
                        className="phoneinputwithcountry h-10 border text-black w-full rounded-md outline-none px-4 placeholder-gray text-sm border-gray-200 bg-white"
                        name={name}
                        countries={countries}
                        defaultCountry={defaultCountry}
                        addInternationalOption={isInternational}
                        id={`PhoneInputWithCountry_${label}`}
                        control={formContext.control}
                        onChange={onChange}
                        limitMaxLength
                        onBlur={onBlur}
                        placeholder={placeholder}
                    />

                    {validationIcons && <ValidationIcon name={name} />}
                </div>

                <HelpText text={helpText} />
                <InputErrorMessage name={name} />
            </div>
        </div>
    )
}
