import { Check } from 'lucide-react'

interface ProgressIndicatorProps {
    currentStep: number
}

export function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
    const steps = [
        { id: 1, label: 'Student Uploaded' },
        { id: 2, label: 'Interview' },
        { id: 3, label: 'Request Generated' },
        { id: 4, label: 'Capacity Verified' },
        { id: 5, label: 'Student Review' },
        { id: 6, label: 'RTO Review' },
        { id: 7, label: 'Industry Confirmation' },
    ]

    return (
        <div className="w-full">
            <div className="flex items-center justify-between">
                {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center flex-1">
                        <div className="flex flex-col items-center flex-1">
                            <div className="relative flex items-center justify-center">
                                <div
                                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-500 ${
                                        step.id < currentStep
                                            ? 'bg-[#F7A619] text-white shadow-lg shadow-[#F7A619]/30'
                                            : step.id === currentStep
                                            ? 'bg-white text-[#044866] ring-4 ring-[#F7A619]/30 shadow-lg scale-110'
                                            : 'bg-white/20 text-white/60'
                                    }`}
                                >
                                    {step.id < currentStep ? (
                                        <Check className="w-3 h-3" />
                                    ) : (
                                        <span className="text-xs">
                                            {step.id}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div
                                className={`mt-2 text-xs text-center transition-all duration-500 ${
                                    step.id === currentStep
                                        ? 'text-[#F7A619] scale-105'
                                        : step.id < currentStep
                                        ? 'text-white/90'
                                        : 'text-white/50'
                                }`}
                            >
                                {step.label}
                            </div>
                        </div>
                        {index < steps.length - 1 && (
                            <div
                                className={`h-0.5 flex-1 transition-all duration-500 ${
                                    step.id < currentStep
                                        ? 'bg-[#F7A619] shadow-sm'
                                        : 'bg-white/20'
                                }`}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
