import { TextInput } from '@components'
import { ChangeEvent } from 'react'

interface FixedHoursInputProps {
    start: string
    end: string
    break: string
    onStartChange: (value: string) => void
    onEndChange: (value: string) => void
    onBreakChange: (value: string) => void
}

export function FixedHoursInput({
    start,
    end,
    break: breakTime,
    onStartChange,
    onEndChange,
    onBreakChange,
}: FixedHoursInputProps) {
    return (
        <>
            {/* Time Inputs */}
            <div className="flex items-center gap-2">
                <TextInput
                    name="start"
                    type="time"
                    showError={false}
                    value={start}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        onStartChange(e.target.value)
                    }
                    className="px-2 py-1.5 bg-gradient-to-br from-[#F8FAFB] to-[#E8F4F8] text-xs font-medium"
                />
                <span className="text-[10px] text-[#64748B] font-medium">
                    to
                </span>
                <TextInput
                    name="end"
                    type="time"
                    showError={false}
                    value={end}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        onEndChange(e.target.value)
                    }
                    className="px-2 py-1.5 bg-gradient-to-br from-[#F8FAFB] to-[#E8F4F8] text-xs font-medium"
                />
            </div>

            {/* Break Input */}
            <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-medium text-[#64748B] uppercase tracking-wide">
                    Break:
                </span>
                <TextInput
                    name="break"
                    type="text"
                    showError={false}
                    placeholder="e.g., 12:00-13:00"
                    value={breakTime}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        onBreakChange(e.target.value)
                    }
                    className="px-2 py-1.5 bg-gradient-to-br from-[#F8FAFB] to-[#E8F4F8] text-xs w-28"
                />
            </div>
        </>
    )
}
