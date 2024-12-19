import classNames from 'classnames'
import { Step } from './Step'
import { ReactElement, ReactNode } from 'react'
import { UpdatedStep } from './UpdatedStep'
import { StepNumber } from './StepNumber'

export interface IndicatorStep {
    label: string
    visited?: boolean
    last?: boolean
    query?: string
    element?: any
}

export interface IndicatorChildrenPropType {
    steps: ReactNode
    element: ReactNode
}

interface StepIndicatorProps {
    children?: ({ steps, element }: IndicatorChildrenPropType) => ReactElement
    currentStep: IndicatorStep
    steps: IndicatorStep[]
    fluid?: boolean
    center?: boolean
    vertical?: boolean
    horizontal?: boolean
}
export const StepIndicator = ({
    children,
    steps,
    fluid,
    center,
    vertical,
    horizontal,
    currentStep,
}: StepIndicatorProps) => {
    const stepIndex = steps.findIndex(
        (step) => step.label === currentStep.label
    )

    const stepIndicatorClasses = classNames({
        'w-full flex gap-x-2 py-4 mt-2 overflow-scroll remove-scrollbar': true,
        'flex-col gap-y-2': vertical,
        'justify-center': center,
    })

    return children ? (
        children({
            steps: (
                <div className="flex flex-col gap-y-4 md:flex-row gap-x-4 items-center">
                    <div className="flex flex-grow md:flex-col gap-x-20 md:gap-y-14 rounded-full  py-2 px-3 md:px-1 bg-[#D9D9D970] bg-opacity-45 justify-center">
                        {steps.map((step, index: number) => (
                            <StepNumber
                                key={step.label}
                                label={step.label}
                                visited={stepIndex >= index}
                                index={index}
                                stepIndex={stepIndex}
                            />
                        ))}
                    </div>
                    <div
                        className={`w-full flex flex-row md:flex-col gap-x-4 md:gap-y-14 justify-center`}
                    >
                        {steps.map((step, index: number) => (
                            <UpdatedStep
                                key={step.label}
                                label={step.label}
                                visited={stepIndex >= index}
                                last={step.last}
                                fluid={fluid}
                                vertical={vertical}
                                horizontal={horizontal}
                            />
                        ))}
                    </div>
                </div>
            ),
            element: currentStep.element,
        })
    ) : (
        <div className="flex flex-col gap-y-4 md:flex-row gap-x-4 items-center">
            <div className="flex flex-col gap-y-14 rounded-full py-2 px-1 bg-[#D9D9D970] bg-opacity-45 justify-center">
                {steps.map((step, index: number) => (
                    <StepNumber
                        key={step.label}
                        label={step.label}
                        visited={stepIndex >= index}
                        index={index}
                        stepIndex={stepIndex}
                    />
                ))}
            </div>
            <div className={`w-full flex flex-col gap-y-14 justify-center`}>
                {steps.map((step, index: number) => (
                    <UpdatedStep
                        key={step.label}
                        label={step.label}
                        visited={stepIndex >= index}
                        last={step.last}
                        fluid={fluid}
                        vertical={vertical}
                        horizontal={horizontal}
                    />
                ))}
            </div>
        </div>
    )
}
