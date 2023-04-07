import { Typography } from '@components'
import React, { useState } from 'react'
import { HiOutlineMinus, HiPlus } from 'react-icons/hi'

export const ListToggle = ({
    list,
}: {
    list: { title: string; description: string }
}) => {
    const [isDescription, setIsDescription] = useState<boolean>(false)
    return (
        <div>
            <div
                onClick={() => {
                    setIsDescription(!isDescription)
                }}
                className={`${
                    isDescription ? 'border-info' : 'border-transparent'
                } transition-all duration-500 border-t-[3px] w-full h-24 px-10 py-4 flex justify-between items-center bg-white cursor-pointer`}
            >
                <Typography variant={'title'}>{list.title}</Typography>
                {isDescription ? (
                    <HiOutlineMinus className="text-2xl text-info" />
                ) : (
                    <HiPlus className="text-2xl" />
                )}
            </div>

            <div
                className={`${
                    isDescription
                        ? 'max-h-[1000px] pb-9 overflow-hidden'
                        : 'max-h-0 overflow-hidden'
                } px-10 duration-700 transition-all bg-white `}
            >
                {list.description}
            </div>
        </div>
    )
}
