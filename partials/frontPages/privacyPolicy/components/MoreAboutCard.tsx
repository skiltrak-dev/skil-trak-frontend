import { Typography } from '@components'
import React from 'react'
import {
    MdOutlineArrowForwardIos,
    MdOutlineKeyboardArrowRight,
} from 'react-icons/md'

export const MoreAboutCard = ({ variant = 'dark' }: { variant?: string }) => {
    const variantColors = {
        dark: {
            background: 'bg-purple-900',
            text: 'text-blue-200',
        },
        light: {
            background: 'bg-blue-300',
            text: 'text-purple-900',
        },
    }
    return (
        <div
            className={`w-full p-10  ${
                (variantColors as any)[variant].background
            }`}
        >
            <Typography
                variant={'h2'}
                color={(variantColors as any)[variant].text}
            >
                General Data Protection Regulation
            </Typography>
            <p
                className={`text-base lg:text-lg text-blue-200 mt-5 leading-6 ${
                    (variantColors as any)[variant].text
                }`}
            >
                The General Data Protection Regulation (GDPR) is a comprehensive
                update to existing EU laws that becomes enforceable on May 25,
                2018. It is meant to strengthen the protections placed on
                personal data by introducing robust requirements that will raise
                and harmonize standards for data protection, security and
                compliance.
            </p>

            <div className="mt-10 flex items-center">
                <Typography
                    variant={'label'}
                    color={(variantColors as any)[variant].text}
                >
                    Learn more
                </Typography>
                <MdOutlineArrowForwardIos
                    className={`text-xl ${
                        (variantColors as any)[variant].text
                    }`}
                />
            </div>
        </div>
    )
}
