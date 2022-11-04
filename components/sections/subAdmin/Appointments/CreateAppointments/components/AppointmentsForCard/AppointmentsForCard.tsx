import React from 'react'

// components
import { Typography } from '@components'

export const AppointmentsForCard = ({
    text,
    onClick,
    selected,
}: {
    selected: string | null
    text: string
    onClick: Function
}) => {
    return (
        <div
            className={`w-full flex flex-col justify-center items-center gap-y-1 border ${
                selected === text ? 'border-info' : 'border-gray-300'
            } rounded-lg px-6 py-3 cursor-pointer`}
            onClick={() => {
                onClick()
            }}
        >
            <img
                className="w-8 h-8"
                src="https://picsum.photos/100/100"
                alt=""
            />
            <Typography variant={'label'} center>
                {text}
            </Typography>
        </div>
    )
}
