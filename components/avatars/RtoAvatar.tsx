import { useNotification } from '@hooks'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FaSchool } from 'react-icons/fa'
import { HiPencil } from 'react-icons/hi'
import { PulseLoader } from 'react-spinners'

// query
import { CommonApi } from '@queries'
import { ShowErrorNotifications } from '@components/ShowErrorNotifications'

export const RtoAvatar = ({
    user,
    imageUrl,
    canEdit,
    setIsAvatarUpdated,
}: {
    user?: number
    imageUrl?: string
    canEdit?: boolean
    setIsAvatarUpdated?: any
}) => {
    const { notification } = useNotification()

    const [changeProfileImage, changeProfileImageResult] =
        CommonApi.Avatar.useChangeProfile()

    useEffect(() => {
        if (setIsAvatarUpdated && changeProfileImageResult.isSuccess) {
            setIsAvatarUpdated(changeProfileImageResult.isSuccess)
        }
    }, [changeProfileImageResult])

    useEffect(() => {
        if (changeProfileImageResult.isSuccess) {
            notification.success({
                title: 'Avatar Updated',
                description: 'Avatar Updated Successfully',
            })
        }
    }, [changeProfileImageResult])

    const handleOnChange = (e: any) => {
        const file = e.target.files[0]
        const filesType = ['image/png', 'image/jpg', 'image/jpeg']

        if (file && filesType.includes(file?.type)) {
            const formData = new FormData()
            formData.append('profile', file)
            changeProfileImage({ user, body: formData })
        } else {
            notification.error({
                title: 'Please select a valid image',
                description: 'only jpg, png and jpeg formats are accepted',
            })
        }
    }
    return (
        <>
            <ShowErrorNotifications result={changeProfileImageResult} />
            <div className="relative group overflow-hidden flex items-center justify-center bg-transparent rounded-full shadow-inner-image p-2">
                <div>
                    {imageUrl ? (
                        <div
                            className="relative w-20 h-20 overflow-hidden group rounded-full bg-cover bg-center bg-no-repeat"
                            style={{ backgroundImage: `url(${imageUrl})` }}
                        >
                            {/* {canEdit && (
                            <>
                                <div
                                    className={`${
                                        changeProfileImageResult.isLoading
                                            ? 'translate-x-0'
                                            : 'group-hover:translate-x-0 translate-x-full'
                                    } w-11 h-28 relative   transition-all duration-500 bg-[#00000085] float-right rotate-[25deg]`}
                                />
                                <div
                                    className={`${
                                        changeProfileImageResult.isLoading
                                            ? '-translate-x-[1.2px]'
                                            : '-ml-2 group-hover:-ml-0 -translate-x-full group-hover:-translate-x-[1.2px]'
                                    } w-11 h-28 relative  -translate-y-6 transition-all duration-500 bg-[#00000085] rotate-[25deg]`}
                                />
                                {!changeProfileImageResult.isLoading && (
                                    <label htmlFor="profile">
                                        <HiPencil
                                            className="cursor-pointer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-1000 text-white"
                                            size={20}
                                        />
                                    </label>
                                )}
                                {changeProfileImageResult.isLoading && (
                                    <PulseLoader
                                        color="white"
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
                                        size={8}
                                    />
                                )}
                            </>
                        )} */}
                        </div>
                    ) : (
                        <div className="h-24 w-24 flex items-center justify-center bg-gray-100 rounded-full">
                            <span className="text-4xl text-gray-300">
                                <FaSchool />
                            </span>
                        </div>
                    )}
                </div>
                <div className="absolute">
                    {canEdit && (
                        <>
                            <div
                                className={`${
                                    changeProfileImageResult.isLoading
                                        ? 'translate-x-9'
                                        : 'group-hover:translate-x-9 translate-x-28'
                                } w-16 h-40 absolute right-0 transition-all duration-500 bg-[#00000085] float-right rotate-[25deg]`}
                            />
                            <div
                                className={`${
                                    changeProfileImageResult.isLoading
                                        ? '-translate-x-[23.3px]'
                                        : '-ml-2 group-hover:-ml-0 -translate-x-28 group-hover:-translate-x-[23.3px]'
                                } w-16 h-40 relative -translate-y-6 transition-all duration-500 bg-[#00000085] rotate-[25deg]`}
                            />
                            {!changeProfileImageResult.isLoading && (
                                <label htmlFor="profile">
                                    <HiPencil
                                        className="cursor-pointer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-1000 text-white"
                                        size={20}
                                    />
                                </label>
                            )}
                            {changeProfileImageResult.isLoading && (
                                <PulseLoader
                                    color="white"
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
                                    size={6}
                                />
                            )}
                        </>
                    )}
                </div>
                <input
                    id="profile"
                    type="file"
                    accept="image/*"
                    onChange={handleOnChange}
                    className="hidden"
                />
            </div>
        </>
    )
}
