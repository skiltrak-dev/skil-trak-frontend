import { useNotification } from '@hooks'
import React from 'react'
import { FaRegCopy } from 'react-icons/fa'

export const CopyInfoData = ({
    text,
    type,
}: {
    text: string
    type: string
}) => {
    const { notification } = useNotification()
    return (
        <div className="absolute w-full h-full left-0 top-0 hidden group-hover:block ">
            <div
                onClick={() => {
                    navigator.clipboard.writeText(text)
                    notification.success({
                        title: 'Copies',
                        description: `${type} Copied`,
                    })
                }}
                className="w-full h-full flex items-center justify-center cursor-pointer bg-blue-500/50"
            >
                <FaRegCopy className="text-white " size={14} />
            </div>
        </div>
    )
}
