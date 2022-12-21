import React from 'react'
import { Typography } from '@components'

export const Footer = () => {
    const year = new Date().getFullYear()

    return (
        <div className="w-full bg-white border-t border-secondary-dark py-1">
            <div className="flex justify-center items-center">
                <p className="text-[9px]">
                    {`SkilTrak © ${year} - All Rights Reserved`}
                </p>
            </div>
        </div>
    )
}
