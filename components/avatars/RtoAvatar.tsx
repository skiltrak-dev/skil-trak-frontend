import { useNotification } from '@hooks'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { FaSchool } from 'react-icons/fa'
import { HiPencil } from 'react-icons/hi'
import { PulseLoader } from 'react-spinners'

export const RtoAvatar = ({
    imageUrl,
    canEdit,
}: {
    imageUrl?: string
    canEdit?: boolean
}) => {
    const [first, setfirst] = useState(false)
    const { notification } = useNotification()

    useEffect(() => {
        if (first) {
            setTimeout(() => {
                setfirst(false)
            }, 3000)
        }
    }, [first])

    const handleOnChange = (e: any) => {
        const file = e.target.files[0]
        const filesType = ['image/png', 'image/jpg', 'image/jpeg']

        if (file && filesType.includes(file?.type)) {
            setfirst(true)
            console.log('wwwww', e.target.files[0])
        } else {
            notification.error({
                title: 'Please select a valid image',
                description: 'only jpg, png and jpeg formats are accepted',
            })
        }
    }
    return (
        <div className="relative flex items-center justify-center bg-transparent rounded-full shadow-inner-image p-2">
            {imageUrl ? (
                // <Image
                //     src={imageUrl || ''}
                //     width={80}
                //     height={80}
                //     className="rounded-full flex-shrink-0"
                //     alt=""
                // />
                <>
                    <div
                        className="relative w-20 h-20 overflow-hidden group rounded-full bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${imageUrl})` }}
                    >
                        {canEdit && (
                            <>
                                <div
                                    className={`${
                                        first
                                            ? 'translate-x-0'
                                            : 'group-hover:translate-x-0 translate-x-full'
                                    } w-11 h-28 relative   transition-all duration-500 bg-[#00000085] float-right rotate-[25deg]`}
                                />
                                <div
                                    className={`${
                                        first
                                            ? '-translate-x-[1.2px]'
                                            : '-ml-2 group-hover:-ml-0 -translate-x-full group-hover:-translate-x-[1.2px]'
                                    } w-11 h-28 relative  -translate-y-6 transition-all duration-500 bg-[#00000085] rotate-[25deg]`}
                                />
                                {!first && (
                                    <label htmlFor="profile">
                                        <HiPencil
                                            className="cursor-pointer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-1000 text-white"
                                            size={20}
                                        />
                                    </label>
                                )}
                                {first && (
                                    <PulseLoader
                                        color="white"
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
                                        size={8}
                                    />
                                )}
                            </>
                        )}
                    </div>
                </>
            ) : (
                <div className="h-24 w-24 flex items-center justify-center bg-gray-100 rounded-full">
                    <span className="text-4xl text-gray-300">
                        <FaSchool />
                    </span>
                </div>
            )}
            <input
                id="profile"
                type="file"
                accept="image/jpg,image/png"
                onChange={handleOnChange}
                className="hidden"
            />
        </div>
    )
}
