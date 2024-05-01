import { MenuPlacement, default as ReactSelect } from 'react-select'

// components
import { Typography } from '@components'
import {
    HelpText,
    InputErrorMessage,
    RequiredStar,
    Tooltip,
    ValidationIcon,
} from './components'

// Colors

import { getThemeColors } from '@theme'
import { OptionType } from '@types'
import { Controller, useFormContext } from 'react-hook-form'
import { InputProps } from './InputPropType'
import { forwardRef, useEffect } from 'react'

const Colors = getThemeColors()

export type SelectProps = {
    options: OptionType[] | any
    value?: any
    defaultValue?: any
    multi?: boolean
    onlyValue?: boolean
    placeholder?: string
    inputRef?: any
    menuPlacement?: MenuPlacement
    components?: any
    formatOptionLabel?: any
    showError?: boolean
    shadow?: string
} & InputProps

export const Select = forwardRef(
    (
        {
            id,
            name,
            label,

            multi,
            options,
            defaultValue,
            placeholder,

            value,
            rules,
            onChange,
            onBlur,

            helpText,
            tooltip,

            required,
            loading,
            disabled,
            validationIcons,

            onlyValue,
            components,
            menuPlacement,
            formatOptionLabel,
            shadow,
            showError = true,
        }: SelectProps,
        ref: any
    ) => {
        const formContext = useFormContext()

        useEffect(() => {
            if (value && formContext) {
                formContext.setValue(name, value)
            }
        }, [value])

        const CustomStyle = {
            control: (
                base: any,
                state: { isFocused: boolean; isDisabled: boolean }
            ) => ({
                ...base,
                backgroundColor: state.isDisabled
                    ? Colors.secondary.dark
                    : 'white',
                color: 'white',
                boxShadow: state.isFocused ? '0.5px 0.5px #888888' : 'none',
                border: state.isFocused
                    ? `1px solid ${Colors.secondary.dark} !important`
                    : // formContext &&
                    //   formContext.formState.touchedFields[name] &&
                    formContext?.formState.errors[name]
                    ? `1px solid red !important`
                    : `1px solid ${Colors.secondary.dark} !important`,
                '&:hover': {
                    border: state.isFocused
                        ? `1px solid ${Colors.muted} !important`
                        : `1px solid ${Colors.muted} !important`,
                },
                // border: '1px solid blue',
            }),
            input: (base: any, state: any) => ({
                ...base,
                fontSize: '14px',
            }),
            placeholder: (
                base: any,
                state: {
                    selectProps: { menuIsOpen: boolean; isDisabled: boolean }
                }
            ) => ({
                ...base,
                color: state.selectProps.isDisabled
                    ? '#d0d0d0'
                    : state.selectProps.menuIsOpen
                    ? Colors.secondary.dark
                    : Colors.muted.dark,
                fontSize: '14px',
            }),
            option: (base: any, state: any) => ({
                ...base,
                borderBottom: '1px dotted #ccc',
                backgroundColor: state.isSelected ? '#00000010' : '#ffffff',
                color: 'black',
                fontSize: '14px',
                '&:hover': {
                    backgroundColor: Colors.secondary.DEFAULT,
                },
            }),
            menu: (provided: any, state: any) => ({
                ...provided,
                borderBottom: '1px dotted pink',
                color: 'black',
            }),
            dropdownIndicator: (style: any, state: any) => ({
                transform: state.selectProps.menuIsOpen
                    ? 'rotateX(-180deg)'
                    : 'rotateX(0)',
                transition: 'all 0.5s',
                color: state.isDisabled ? '#d0d0d0' : 'black',
                padding: '7px',
            }),
            singleValue: (provided: any, state: any) => {
                const color = state.selectProps.menuIsOpen
                    ? Colors.secondary.DEFAULT
                    : '#000000'
                const transition = 'opacity 300ms'
                const fontSize = '14px'

                return { ...provided, color, transition, fontSize }
            },
            noOptionsMessage: (provided: any, state: any) => ({
                ...provided,
                fontSize: '14px',
            }),
            multiValue: (styles: any, { data }: { data: any }) => {
                const color = 'transparent'
                return {
                    ...styles,
                    backgroundColor: color,
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                }
            },
            multiValueRemove: (styles: any, { data }: { data: any }) => ({
                ...styles,
                color: 'orange',
                ':hover': {
                    backgroundColor: 'orange',
                    color: 'white',
                },
            }),
        }

        const handleChange = (event: any) => {
            return Array.isArray(event)
                ? onlyValue
                    ? event.map((e) => e.value)
                    : event
                : onlyValue
                ? event?.value
                : event
        }

        const getSimpleSelect = (
            onChange: any,
            onBlur: any,
            defaultValue: any
        ) => {
            return (
                <ReactSelect
                    name={name}
                    isSearchable
                    value={value}
                    onBlur={onBlur}
                    isMulti={multi}
                    options={options}
                    onChange={onChange}
                    isLoading={loading}
                    styles={CustomStyle}
                    isDisabled={disabled}
                    classNamePrefix="select"
                    {...(ref ? { ref } : {})}
                    placeholder={placeholder}
                    isClearable={value !== ''}
                    defaultValue={defaultValue}
                    className={`basic-single w-full ${shadow}`}
                    formatOptionLabel={formatOptionLabel}
                    {...(components ? { components } : {})}
                    {...(menuPlacement ? { menuPlacement } : {})}
                />
            )
        }

        const getControlledSelect = () => {
            return (
                <Controller
                    control={formContext.control}
                    name={name}
                    render={({ field }) =>
                        getSimpleSelect(
                            (event: any) => {
                                const selectedData = handleChange(event)
                                field.onChange(selectedData)
                                onChange && onChange(selectedData)
                            },
                            onBlur,
                            defaultValue
                        )
                    }
                />
            )
        }

        return (
            <div className="">
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
                    {formContext
                        ? getControlledSelect()
                        : getSimpleSelect(
                              (event: any) =>
                                  onChange && onChange(handleChange(event)),
                              onBlur,
                              defaultValue
                          )}
                    {validationIcons && <ValidationIcon name={name} />}
                </div>

                {showError && <InputErrorMessage name={name} />}

                <HelpText text={helpText} />
            </div>
        )
    }
)

Select.displayName = 'Select'
