import { Button } from '@components'
import React from 'react'

// types
type SharedHeroSectionProps = {
    title: string
    description: string
    button?: boolean
    subheading?: string
}

export const SharedHeroSection = ({
    title,
    description,
    subheading,
    button,
}: SharedHeroSectionProps) => {
    return (
        <div
            className="h-[600px] "
            style={{
                backgroundImage:
                    'url(/images/site/sectors/bg-hero-section.png)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="flex flex-col justify-center items-center h-full max-w-7xl mx-auto px-4 md:px-0 gap-y-12">
                <h1 className="text-white text-center md:text-7xl text-3xl font-bold">
                    {title ?? 'Title here'}
                </h1>
                {subheading && (
                    <p className="text-primary font-semibold md:text-2xl text-xl">
                        {subheading ?? 'Subheading here'}
                    </p>
                )}
                <p className="text-white leading-8 md:w-[60rem] text-center">
                    {description ?? 'Description here'}
                </p>
                {button && <Button text="See More" />}
                {/* <Button text="See More" /> */}
            </div>
        </div>
    )
}
