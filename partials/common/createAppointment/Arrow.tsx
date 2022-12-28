import React from 'react'

// Icons
import { BiMinus } from 'react-icons/bi'
import { FiArrowRight } from 'react-icons/fi'

export const Arrow = () => {
    return (
        <div className="flex items-center justify-center gap-x-0.5 col-span-1">
            <BiMinus className="text-gray-400" />
            <BiMinus className="text-gray-400" />
            <BiMinus className="text-gray-400" />
            <FiArrowRight className="text-gray-400" />
        </div>
    )
}
