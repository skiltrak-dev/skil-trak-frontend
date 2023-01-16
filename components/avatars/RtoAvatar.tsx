import Image from 'next/image'
import { FaSchool } from 'react-icons/fa'

export const RtoAvatar = ({ imageUrl }: { imageUrl?: string }) => {
    return (
        <div className="relative flex items-center justify-center bg-transparent rounded-full shadow-inner-image p-2">
            {imageUrl ? (
                <Image
                    src={imageUrl || ''}
                    width={80}
                    height={80}
                    className="rounded-full"
                    alt=""
                />
            ) : (
                <div className="h-24 w-24 flex items-center justify-center bg-gray-100 rounded-full">
                    <span className="text-4xl text-gray-300">
                        <FaSchool />
                    </span>
                </div>
            )}
        </div>
    )
}
