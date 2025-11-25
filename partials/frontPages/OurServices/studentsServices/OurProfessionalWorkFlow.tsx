import { Typography } from '@components'
import { Percent } from 'lucide-react'
import React from 'react'

export const OurProfessionalWorkFlow = () => {
    const workFlow = [
        {
            title: 'Interview',
            percent: 25,
        },
        {
            title: 'Appointment',
            percent: 50,
        },
        {
            title: 'Documentation',
            percent: 75,
        },
        {
            title: 'Placement Started',
            percent: 100,
        },
    ]

    const getStepCircleClasses = (index: number) => {
        const baseClasses =
            'rounded-full px-4 py-2 flex flex-col items-center justify-center text-xs'

        if (index === 1) {
            return `${baseClasses} bg-primary text-white`
        }

        if (index === 0) {
            return `${baseClasses} text-primary border-primary border`
        }

        if (index === 2) {
            return `${baseClasses} text-primary border-indigo-500 border`
        }

        return `${baseClasses} text-primary`
    }

    const getConnectorLineClasses = (index: number) => {
        const baseClasses = 'w-px h-14'
        const activeColor = 'bg-[#635AD9]'
        const defaultColor = 'bg-primary'

        return `${baseClasses} ${index >= 1 && index <= 3 ? activeColor : defaultColor
            }`
    }

    const getStepTitleClasses = (index: number) => {
        const baseClasses = 'relative px-6 py-2 rounded-full'

        if (index === 1) {
            return `${baseClasses} bg-primary text-white`
        }

        if (index === 0) {
            return `${baseClasses} border-2 border-dashed`
        }

        return `${baseClasses} border-2 border-dashed border-primary`
    }

    const getOverlayClasses = (index: number) => {
        const baseClasses = 'absolute top-0 -right-2 h-full w-6 rounded-full'
        return `${baseClasses} ${index === 1 ? 'bg-transparent' : 'bg-white/90'
            }`
    }

    const renderFinalStepDecorations = () => (
        <>
            <div
                className="absolute bottom-0 -right-5 md:-right-10 size-48 md:size-56 rounded-full"
                style={{
                    background:
                        'linear-gradient(180deg, rgba(247, 166, 25, 0.50) 0%, rgba(255, 255, 255, 0) 100%)',
                    filter: 'blur(25px)',
                    borderRadius: '292px',
                }}
            />
            <div className="absolute bottom-40 md:bottom-32 right-0 md:-right-10">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute right-0 top-0"
                    width="133"
                    height="197"
                    viewBox="0 0 133 197"
                    fill="none"
                >
                    <path
                        d="M91.1025 1.00002L81.1025 1.00002C36.9198 1.00001 1.10253 36.8172 1.10253 81L1.10253 116C1.10254 160.183 36.9198 196 81.1025 196L132.103 196"
                        stroke="#635AD9"
                        strokeDasharray="8 8"
                    />
                </svg>
            </div>
        </>
    )

    return (
        <div className="md:mx-auto md:max-w-7xl md:px-0 px-4 py-6 md:py-10">
            <Typography variant="body" color="text-primary" medium>
                Work Process
            </Typography>
            <Typography variant="h1" bold>
                Our Professional <br /> Work Flow
            </Typography>

            <div className="grid md:grid-cols-4 grid-cols-2 gap-8 w-full mt-10 md:mt-20">
                {workFlow.map((item, index) => (
                    <div
                        key={`workflow-step-${index}`}
                        className="flex flex-col gap-4 w-full"
                    >
                        <div className="flex justify-end items-center">
                            <div className="flex flex-col justify-center items-center gap-4">
                                <div className={getStepCircleClasses(index)}>
                                    <span>{item.percent}</span>
                                    <span>%</span>
                                </div>
                                <div
                                    className={getConnectorLineClasses(index)}
                                />
                            </div>
                        </div>

                        <div className={getStepTitleClasses(index)}>
                            {item.title}

                            <div className={getOverlayClasses(index)} />

                            {index === 3 && renderFinalStepDecorations()}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
