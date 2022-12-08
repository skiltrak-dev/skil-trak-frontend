import Image from 'next/image'
import { FaUserGraduate } from 'react-icons/fa'

export const StudentAvatar = ({
    name,
    imageUrl,
    gender,
}: {
    name: string
    imageUrl?: string
    gender?: string
}) => {
    const getImageUrl = () => {
        if (imageUrl) return imageUrl
        if (
            (gender && gender?.toLocaleLowerCase() === 'male') ||
            gender?.toLocaleLowerCase() === 'm'
        )
            return '/images/icons/avatars/std-boy.png'
        if (
            (gender && gender?.toLocaleLowerCase() === 'female') ||
            gender?.toLocaleLowerCase() === 'f'
        )
            return '/images/icons/avatars/std-girl.png'
        return null
    }
    return (
        <div className="relative flex items-center justify-center bg-transparent rounded-full shadow-inner-image p-2">
            {getImageUrl() ? (
                <Image
                    src={getImageUrl() || ''}
                    width={80}
                    height={80}
                    className="rounded-full"
                />
            ) : (
                <div className="h-24 w-24 flex items-center justify-center bg-gray-100 rounded-full">
                    <span className="text-4xl text-gray-300">
                        <FaUserGraduate />
                    </span>
                </div>
            )}
            {/* <div
                className={`${
                    getImageUrl() ? 'w-[100px] h-[100px]' : 'w-24 h-24'
                } absolute top-0 left-0 `}
            ></div> */}
        </div>
    )
}
