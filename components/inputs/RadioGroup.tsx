import {
    HelpText,
    InputErrorMessage,
    RequiredStar,
    Tooltip,
} from './components'
import { Typography } from '@components'

import { OptionType } from '@types'
import { InputProps } from './InputPropType'
import { RadioButton } from './RadioButton'

export type RadioGroupOption = {
    checked?: boolean
} & OptionType

export type RadioGroupType = InputProps & {
    options: RadioGroupOption[]
    layout?: 'row' | 'column' | 'grid'
    gridColumns?: '1' | '2' | '3' | '4' | '5'
}

const GridColumns = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
}

const OptionLayout = {
    row: `flex flex-wrap gap-x-4 items-center`,
    column: `flex flex-col gap-y-2`,
    grid: `grid gap-x-4 gap-y-2`,
}

export const RadioGroup = ({
    id,
    name,
    label,

    options,

    value,
    rules,
    onChange,
    onBlur,

    helpText,
    tooltip,

    required,
    disabled,
    loading,

    layout = 'row',
    gridColumns = '3',
    showError = true,
}: RadioGroupType) => {
    const getOptionsLayout = () => {
        let currentLayout = OptionLayout[layout]
        if (layout === 'grid') {
            currentLayout = `${currentLayout} ${GridColumns[gridColumns]}`
        }
        return currentLayout
    }

    return (
        <div className="w-full flex flex-col gap-y-1">
            {label && (
                <div className="flex justify-between ">
                    <div>
                        <Typography variant={'label'}>{label}</Typography>
                        {required && <RequiredStar />}
                    </div>
                    {tooltip && <Tooltip text={tooltip} />}
                </div>
            )}

            <div className={`w-full ${getOptionsLayout()}`}>
                {options.map((option: RadioGroupOption, i) => (
                    <RadioButton
                        key={i}
                        name={name}
                        label={option.label}
                        value={option.value}
                        defaultChecked={option.value === value}
                        // value={option.value === value}
                        group
                        onChange={(e: any) => {
                            onChange && onChange(e)
                        }}
                        disabled={disabled}
                    />
                ))}
            </div>

            {showError ? <InputErrorMessage name={name} /> : null}

            <HelpText text={helpText} />
        </div>
    )
}
