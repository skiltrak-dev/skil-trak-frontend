import { Button } from '@components'
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
                <Button
                    outline
                    onClick={decrement}
                    disabled={disabled || value <= 0}
                    aria-label="Decrease capacity"
                    Icon={FiMinus}
                />
            </div>

            <div className="flex flex-col items-center">
                <div className="relative">
                    <input
                        type="number"
                        value={value}
                        onChange={handleInputChange}
                        min="0"
                        max={max}
                        disabled={disabled}
                        className="w-20 h-14 text-center text-xl font-semibold border-2 border-border rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 disabled:opacity-50 animate-value-pulse"
                        aria-label="Capacity value"
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
                                        ? 'bg-accent animate-pulse'
                                        : 'bg-muted'
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="hover-scale">
                <Button
                    outline
                    onClick={increment}
                    disabled={disabled || value >= max}
                    aria-label="Increase capacity"
                    Icon={FiPlus}
                />
            </div>
        </div>
    )
}
