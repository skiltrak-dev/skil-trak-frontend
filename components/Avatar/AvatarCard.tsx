import React, { useEffect, useState } from 'react'

// components
import { ActionButton } from '@components'

// components
import { Typography } from 'components'
import { useNotification } from '@hooks'
import { ellipsisText } from '@utils'

export const AvatarCard = ({
    name,
    capacity,
    onChange,
    uploadedDocs,
    requiredDoc,
    result,
}: any) => {
    const [file, setfile] = useState<any | null>(null)

    useEffect(() => {
        if (result.isError) {
            setfile(null)
        }
    }, [result])

    const handleChange = (event: any) => {
        // Getting file Data
        const fileData: File = event.target.files[0]
        setfile(URL.createObjectURL(fileData))
        fileData && onChange && onChange(fileData)
    }

    console.log('filefilefile', file)

    const isNotUploadedDocs = uploadedDocs < capacity
    return (
        <div className="w-48">
            <img
                className="w-full h-48 rounded-md border object-cover"
                src={file || 'https://picsum.photos/200/200'}
                alt=""
            />
            <div className="mt-2 flex justify-between items-center">
                <ActionButton
                    simple
                    loading={result.isLoading}
                    disabled={result.isLoading}
                >
                    <label
                        {...(!result.isLoading
                            ? { htmlFor: `file_id_${name}` }
                            : {})}
                        className="cursor-pointer"
                    >
                        Change
                    </label>
                </ActionButton>
                <ActionButton variant={'error'} simple>
                    Remove
                </ActionButton>
            </div>
            <input
                type="file"
                id={`file_id_${name}`}
                name={name}
                className="hidden"
                onChange={(e: any) => {
                    handleChange(e)
                }}
                accept={'pdf/*'}
                multiple
            />
        </div>
    )
}
