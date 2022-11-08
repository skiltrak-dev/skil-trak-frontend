import classNames from 'classnames'

interface StepProps {
    visited?: boolean
    label: string
    last?: boolean
    fluid?: boolean
    vertical?: boolean
    horizontal?: boolean
}
export const Step = ({
    label,
    visited,
    last,
    fluid,
    vertical,
    horizontal,
}: StepProps) => {
    const stepCircleClasses = {
        border: classNames({
            'border-2 h-9 w-9 rounded-full flex justify-center items-center flex-shrink-0':
                true,
            'border-indigo-500': visited,
            'border-gray-400': !visited,
        }),
        inner: classNames({
            'h-6 w-6 rounded-full flex items-center justify-center': true,
            'bg-indigo-200': visited,
            'bg-gray-200': !visited,
        }),
        dot: classNames({
            'h-3 w-3 rounded-full': true,
            'bg-indigo-500': visited,
            'bg-gray-400': !visited,
        }),
    }

    const stepLabelClasses = classNames({
        'text-sm flex-shrink-0': true,
        'text-indigo-500': visited,
        'text-gray-400': !visited,
    })

    const stepLineClasses = classNames({
        'h-10 w-0.5': vertical,
        'w-14 h-0.5': horizontal,
        'ml-4 ': vertical,
        // 'w-0.5': !fluid,
        'bg-indigo-500': visited,
        'bg-gray-400': !visited,
    })

    const stepContainerClasses = classNames({
        'flex flex-col gap-y-2': vertical,
        'flex items-center gap-x-2': horizontal,
        'w-full': fluid,
    })

    return (
        <div className={stepContainerClasses}>
            {/* Step Circle */}
            <div className="flex items-center gap-x-2">
                <div className={stepCircleClasses.border}>
                    <div className={stepCircleClasses.inner}>
                        <div className={stepCircleClasses.dot}></div>
                    </div>
                </div>

                {/* Step Label */}
                <div className={stepLabelClasses}>{label}</div>
            </div>

            {/* Step Line */}
            {!last && <div className={stepLineClasses}></div>}
        </div>
    )
}
