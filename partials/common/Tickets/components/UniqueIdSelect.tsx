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
            {...(onChange ? { onChange } : {})}
            showError={false}
        />
    )
}
