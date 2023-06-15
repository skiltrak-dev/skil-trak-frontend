import React from 'react'
import { InputErrorMessage, RequiredStar, Tooltip } from './components'
import { useFormContext } from 'react-hook-form'
import { Typography } from '@components/Typography'
import { usePlacesWidget } from 'react-google-autocomplete'

export const AutoCompleteTextInput = ({
    name,
    tooltip,
    label,
    id,
    required,
    placeholder,
}: {
    name: string
    tooltip?: string
    required?: boolean
    id?: string
    label?: string
    placeholder?: string
}) => {
    const formMethods = useFormContext()

    const { ref }: any = usePlacesWidget({
        apiKey: process.env.NEXT_PUBLIC_MAP_KEY,
        onPlaceSelected: (place) => {},
        options: {
            // types: ['(suburbs)'],
            componentRestrictions: {
                country: 'au',
            },
        },
    })

    const { ref: preferableLocationRef, ...rest } =
        formMethods.register('preferableLocation')
    return (
        <div>
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
            <input
                className="border text-black w-full rounded-md outline-none px-4 py-2 placeholder-gray text-sm"
                ref={(e: any) => {
                    preferableLocationRef(e)
                    ref.current = e
                }}
                {...rest}
                id={'map'}
                placeholder={placeholder}
            />
            <InputErrorMessage name={name} />
        </div>
    )
}
