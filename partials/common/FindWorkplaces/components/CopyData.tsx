import { useNotification } from '@hooks'
import React from 'react'
import { FaRegCopy } from 'react-icons/fa'

export const CopyData = ({ text, type }: { type: string; text: string }) => {
    const { notification } = useNotification()
    return (
        <div className="hidden group-hover:block relative">
            <FaRegCopy
                onClick={() => {
                    navigator.clipboard.writeText(text)
                    notification.success({
                        title: 'Copies',
                        description: `${type} Copied`,
                    })
                }}
                className="text-gray-500 cursor-pointer"
                size={18}
            />
        </div>
    )
}
