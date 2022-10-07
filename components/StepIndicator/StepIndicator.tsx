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
}
export const StepIndicator = ({
    currentStep,
    steps,
    fluid,
}: StepIndicatorProps) => {
    const stepIndex = steps.findIndex(
        (step) => step.label === currentStep.label
    )

    return (
        <div className={`w-full flex gap-x-2 py-4 mt-2`}>
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
