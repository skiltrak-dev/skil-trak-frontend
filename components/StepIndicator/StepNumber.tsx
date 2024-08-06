import React from 'react'
import { FaCheck } from 'react-icons/fa6'

interface StepProps {
    visited?: boolean
    label: string
    last?: boolean
    fluid?: boolean
    vertical?: boolean
    horizontal?: boolean
    index: number
    stepIndex: any
}
export const StepNumber = ({
    label,
    visited,
    last,
    fluid,
    vertical,
    horizontal,
    index,
    stepIndex,
}: StepProps) => {
    const checked = stepIndex === index

    return (
        <div>
            <div>
                <div
                    className={`${
                        visited && checked
                            ? 'bg-orange-400 text-white'
                            : visited && !checked
                            ? 'bg-green-400'
                            : 'bg-white'
                    } rounded-full size-6 flex justify-center items-center`}
                >
                    {visited && !checked ? (
                        <FaCheck className="text-white" />
                    ) : (
                        <p className="!m-0">{index + 1}</p>
                    )}
                </div>
            </div>
        </div>
    )
}
