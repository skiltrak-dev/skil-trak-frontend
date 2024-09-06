import { Select } from '@components'
import React from 'react'
import { TicketCreator } from '../enum'
import { OptionType } from '@types'

export const UniqueIdSelect = ({
    onChange,
}: {
    onChange?: (e: any) => void
}) => {
    const uniqueIds: OptionType[] = [
        {
            label: 'YASEEN KHAN',
            value: TicketCreator.YASEEN_KHAN,
            item: { color: 'bg-blue-200' },
        },
        {
            label: 'JULIE CLARKE',
            value: TicketCreator.JULIE_CLARKE,
            item: { color: 'bg-gray-300' },
        },
        {
            label: 'QANDEEL TANOLI',
            value: TicketCreator.QANDEEL_TANOLI,
            item: { color: 'bg-green-300' },
        },
    ]
    return (
        <Select
            {...(onChange ? {} : { label: 'Select Unique Id' })}
            name={'uniqueId'}
            placeholder={'Select Unique Id'}
            options={uniqueIds}
            onlyValue
            onChange={(e: string) => {
                if (onChange) {
                    onChange(e)
                }
            }}
            showError={false}
            components={{
                Option: (optionItem: any) => (
                    <div
                        ref={optionItem.innerRef}
                        {...optionItem.innerProps}
                        className="cursor-pointer flex items-center justify-between text-sm px-2 py-2 hover:bg-gray-100 border-b border-secondary-dark"
                    >
                        <p>{optionItem.data?.label}</p>
                        <p
                            className={`py-0.5 px-1.5 rounded text-[10px] text-gray-600 ${optionItem.data?.item?.color}`}
                        >
                            {optionItem.data?.value}
                        </p>
                    </div>
                ),
            }}
        />
    )
}
