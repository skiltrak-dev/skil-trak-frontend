import { useNotification } from '@hooks'
import React from 'react'
import { FaRegCopy } from 'react-icons/fa'

export const CopyData = ({ text, type }: { type: string; text: string }) => {
    const { notification } = useNotification()

    const handleCopy = (event: React.MouseEvent) => {
        event.stopPropagation() // Prevent event bubbling
        navigator.clipboard.writeText(text)
        notification.success({
            title: 'Copied',
            description: `${type} Copied`,
        })
    }

    return (
        <div className="hidden group-hover:block relative">
            <FaRegCopy
                onClick={handleCopy}
                className="text-gray-500 cursor-pointer"
                size={18}
            />
        </div>
    )
}
