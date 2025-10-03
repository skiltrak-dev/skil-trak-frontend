import { ActionButton, Button, TextInput } from '@components'
import { FiMinus, FiPlus } from 'react-icons/fi'

interface CapacityStepperProps {
    value: number
    onChange: (value: number) => void
    max: number
    disabled?: boolean
}

export function CapacityStepper({
    value,
    onChange,
    max,
    disabled,
}: CapacityStepperProps) {
    const increment = () => {
        if (value < max) {
            onChange(value + 1)
        }
    }

    const decrement = () => {
        if (value > 0) {
            onChange(value - 1)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(e.target.value) || 0
        if (newValue >= 0 && newValue <= max) {
            onChange(newValue)
        }
    }

    return (
        <div className="flex items-center justify-center gap-6">
            <div className="hover-scale">
                <ActionButton
                    variant="dark"
                    onClick={decrement}
                    disabled={disabled || value <= 0}
                    aria-label="Decrease capacity"
                    Icon={FiMinus}
                />
            </div>

            <div className="flex flex-col items-cente mt-4">
                <div className="relative">
                    <TextInput
                        name="capacity"
                        onChange={handleInputChange}
                        min="0"
                        max={max}
                        disabled={disabled}
                        type="number"
                        value={value}
                        showError={false}
                    />

                    {/* Value indicator dots */}
                    <div className="flex justify-center gap-1 mt-2">
                        {[...Array(Math.min(max, 5))].map((_, i) => (
                            <div
                                key={i}
                                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                                    i < value
                                        ? 'bg-primary'
                                        : i === value && value > 0
                                        ? 'bg-primaryNew animate-pulse'
                                        : 'bg-muted'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="hover-scale">
                <ActionButton
                    onClick={increment}
                    disabled={disabled || value >= max}
                    aria-label="Increase capacity"
                    Icon={FiPlus}
                    mini
                    variant="dark"
                />
            </div>
        </div>
    )
}
