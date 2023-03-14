import { Typography } from '@components'
import { ellipsisText } from '@utils'
import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { HiLink } from 'react-icons/hi'

export const Attachment = ({
    file,
    name,
    dragging,
    fileList,
    fileObject,
    handleRemove,
    invalidSelection,
    onRemoveFile,
}: any) => {
    return (
        <div className="flex flex-wrap gap-2">
            <label htmlFor={`file_id_${name}`} className="cursor-pointer">
                <HiLink />
            </label>

            {fileList?.map((file: File) => (
                <div className="bg-gray-300 rounded-full px-2 py-0.5 flex items-center gap-x-2">
                    <Typography variant={'small'}>
                        {ellipsisText(file?.name, 12)}
                    </Typography>
                    <FaTimes
                        className="text-sm text-gray-600 cursor-pointer"
                        onClick={() => {
                            onRemoveFile(file?.lastModified)
                        }}
                    />
                </div>
            ))}
        </div>
    )
}
