
import classNames from 'classnames'
import { Step } from './Step'

export interface IndicatorStep {
    label: string
    visited?: boolean
    last?: boolean
}

interface StepIndicatorProps {
    currentStep: IndicatorStep
    steps: IndicatorStep[]
    fluid?: boolean
    center?: boolean
}
export const StepIndicator = ({
    currentStep,
    steps,
    fluid,
    center,
}: StepIndicatorProps) => {
    const stepIndex = steps.findIndex(
        (step) => step.label === currentStep.label
    )

    const stepIndicatorClasses = classNames({
        'w-full flex flex-col gap-y-2 py-4 mt-2': true,
        'justify-center': center,
    })

    return (
        <div className={stepIndicatorClasses}>
            {steps.map((step, index: number) => (
                <Step
                    key={step.label}
                    label={step.label}
                    visited={stepIndex >= index}
                    last={step.last}
                    fluid={fluid}
                />
            ))}
        </div>
    )
}
