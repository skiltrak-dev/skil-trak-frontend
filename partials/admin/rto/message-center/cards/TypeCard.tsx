import React from 'react'
import { RecipientOption } from '../components'
import { useFormContext } from 'react-hook-form'
import { RadioButton } from '@components'

export const TypeCard = ({
    onClick,
    recipient,
}: {
    onClick: () => void
    recipient: RecipientOption
}) => {
    const formMethod = useFormContext()

    const type = formMethod.watch('type')

    return (
        <div
            className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-all cursor-pointer ${
                type === recipient?.type
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
            onClick={onClick}
        >
            <RadioButton
                name="type"
                value={recipient?.type}
                defaultChecked={type === recipient?.type}
            />
            <div className="cursor-pointer flex-1">
                <div>
                    <div className="text-sm text-gray-900">
                        {recipient?.title}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                        {recipient?.description}
                    </div>
                </div>
            </div>
        </div>
    )
}
