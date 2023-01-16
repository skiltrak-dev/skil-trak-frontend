import React, { useEffect, useState } from 'react'

// components
import { ActionButton } from '@components'

// query
import { CommonApi } from '@queries'

// hooks
import { useNotification } from '@hooks'

export const AvatarCard = ({
    name,
    capacity,
    onChange,
    uploadedDocs,
    requiredDoc,
    result,
    avatar,
}: any) => {
    const [file, setfile] = useState<any | null>(null)
    const [avatarImage, setAvatarImage] = useState(avatar)

    useEffect(() => {
        setAvatarImage(avatar)
    }, [avatar])

    const { notification } = useNotification()

    // query
    const [removeProfile, removeProfileResult] =
        CommonApi.Avatar.useRemoveProfile()

    useEffect(() => {
        if (result.isError) {
            setfile(null)
        }
        if (removeProfileResult.isSuccess) {
            setAvatarImage(null)
            setfile(null)
            notification.error({
                title: 'Profile Removed',
                description: 'Profile Removed Successfully',
            })
        }
    }, [result, removeProfileResult])

    const handleChange = (event: any) => {
        // Getting file Data
        const fileData: File = event.target.files[0]
        setfile(URL.createObjectURL(fileData))
        fileData && onChange && onChange(fileData)
    }

    const onRemove = () => {
        removeProfile()
    }

    // TODO: Make it rectangular
    return (
        <div className="border-t pt-2">
            <p className="text-sm font-medium text-gray-600">Your Avatar</p>
            <p className="text-xs font-medium text-gray-400">
                You can change your avatar from here
            </p>
            <div className="mt-2">
                <div className="w-40">
                    {/* <img
                className={`w-full h-48 rounded-full border object-cover transition-all ${
                    result.isLoading ? 'opacity-50' : ''
                }`}
                src={file || avatarImage || '/images/avatar.png'}
                alt=""
            /> */}
                    <div
                        className="w-full h-40 rounded-lg bg-gray-300 bg-center bg-no-repeat bg-cover"
                        style={{
                            backgroundImage: `url(${
                                file || avatarImage || '/images/avatar.png'
                            })`,
                        }}
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
                        <ActionButton
                            variant={'error'}
                            simple
                            onClick={onRemove}
                            loading={removeProfileResult.isLoading}
                            disabled={removeProfileResult.isLoading}
                        >
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
            </div>
        </div>
    )
}
