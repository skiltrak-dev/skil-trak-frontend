import Image from 'next/image'
import React from 'react'

export const Avatar = ({
    avatar,
    name,
}: {
    avatar: string | null | undefined
    name: string
}) => {
    console.log({ avatar })
    return (
        <div className="w-[70px] h-[70px] rounded-full overflow-hidden shadow-[0_1px_2px_0px_rgba(0,0,0,0.25)]">
            <Image
                src={avatar ? avatar : '/images/icons/avatars/std-girl.png'}
                alt={name}
                width={0}
                height={0}
                sizes="100vh 100vw"
                className="w-full h-full"
            />
        </div>
    )
}
