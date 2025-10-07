import { Typography } from '@components'
import Image from 'next/image'
import React from 'react'

// types
type ContentSectionProps = {
    title: string
    content: string[]
    iconUrl: string
    imageUrl: string
    variant: 'red' | 'yellow' | 'blue'
    direction?: 'left' | 'right'
}

export const ContentSection = ({
    title,
    content,
    iconUrl,
    imageUrl,
    variant,
    direction = 'left',
}: ContentSectionProps) => {
    // Color definitions
    const colors = {
        red: '#9B2000',
        yellow: '#F7A619',
        blue: '#044866',
    }

    // Determine each color based on variant
    const colorScheme = {
        red: {
            circle: colors.red,
            title: colors.yellow,
            dots: colors.blue,
        },
        yellow: {
            circle: colors.yellow,
            title: colors.blue,
            dots: colors.red,
        },
        blue: {
            circle: colors.blue,
            title: colors.red,
            dots: colors.yellow,
        },
    }[variant]

    const firstContent = content.slice(0, 15)
    const remainingContent = content.slice(15)

    return (
        <div
            className={`flex flex-col gap-y-10 md:gap-y-0 md:flex-row max-w-7xl mx-auto px-10 md:px-0 my-12 md:my-20
      ${direction === 'left' ? 'md:flex-row-reverse' : ''}
    `}
        >
            {/* Content Section */}
            <div className="md:w-1/2 space-y-5">
                {/* Title & Icon */}
                <div className="flex items-center gap-x-4 relative mb-5">
                    <div
                        className="size-16 rounded-full -z-10 absolute -left-7 -top-2"
                        style={{ backgroundColor: colorScheme.circle }}
                    ></div>
                    <p
                        className="md:text-4xl text-2xl md:whitespace-nowrap font-semibold"
                        style={{ color: colorScheme.title }}
                    >
                        {title}
                    </p>
                    <div>
                        <Image
                            src={`/images/site/sectors/${iconUrl}`}
                            alt="Icon"
                            width={60}
                            height={60}
                        />
                    </div>
                </div>

                {/* First 15 content items */}
                <ul className="space-y-2">
                    {firstContent.map((item, index) => (
                        <li key={index} className="flex items-center gap-x-2">
                            <span
                                className="rounded-full w-2 h-2"
                                style={{ backgroundColor: colorScheme.dots }}
                            ></span>
                            <span className="text-[#044866]">{item}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Image Section */}
            <div className="md:w-1/2">
                <div className="relative">
                    <Image
                        src={`/images/site/sectors/${imageUrl}`}
                        alt="Cover photo"
                        width={567}
                        height={300}
                    />

                    {/* Top block (same as circle color) */}
                    <div
                        className="w-28 h-20 absolute -top-2 -left-3 -z-10 rounded-2xl"
                        style={{ backgroundColor: colorScheme.circle }}
                    ></div>

                    {/* Bottom block (same as dots color) */}
                    <div
                        className="w-28 h-20 absolute -bottom-2.5 -right-2 md:right-16 -z-10 rounded-2xl"
                        style={{ backgroundColor: colorScheme.dots }}
                    ></div>
                </div>

                {/* Remaining items below image (if >15) */}
                {remainingContent.length > 0 && (
                    <div className="w-full mt-8 md:mt-10">
                        <ul className="space-y-2 max-w-4xl mx-auto">
                            {remainingContent.map((item, index) => (
                                <li
                                    key={index + 15}
                                    className="flex items-center gap-x-2 justify-start"
                                >
                                    <span
                                        className="rounded-full w-2 h-2"
                                        style={{
                                            backgroundColor: colorScheme.dots,
                                        }}
                                    ></span>
                                    <span className="text-[#044866]">
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}
