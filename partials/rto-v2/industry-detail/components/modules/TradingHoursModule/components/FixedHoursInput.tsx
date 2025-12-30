import { TextInput } from '@components'

interface FixedHoursInputProps {
    basePath: string
}

export function FixedHoursInput({ basePath }: FixedHoursInputProps) {
    return (
        <>
            {/* Time Inputs */}
            <div className="flex items-center gap-2">
                <TextInput
                    type="time"
                    className="px-2 py-1.5 bg-gradient-to-br from-[#F8FAFB] to-[#E8F4F8] text-xs font-medium"
                    name={`${basePath}.start`}
                />
                <span className="text-[10px] text-[#64748B] font-medium">
                    to
                </span>
                <TextInput
                    type="time"
                    className="px-2 py-1.5 bg-gradient-to-br from-[#F8FAFB] to-[#E8F4F8] text-xs font-medium"
                    name={`${basePath}.end`}
                />
            </div>

            {/* Break Input */}
            <div className="flex items-center gap-1.5 border-l border-slate-200 pl-2">
                <span className="text-[10px] font-medium text-[#64748B] uppercase tracking-wide">
                    Break:
                </span>
                <TextInput
                    type="time"
                    className="px-2 py-1.5 bg-gradient-to-br from-[#F8FAFB] to-[#E8F4F8] text-xs font-medium"
                    name={`${basePath}.breakStart`}
                />
                <span className="text-[10px] text-[#64748B] font-medium">
                    -
                </span>
                <TextInput
                    type="time"
                    className="px-2 py-1.5 bg-gradient-to-br from-[#F8FAFB] to-[#E8F4F8] text-xs font-medium"
                    name={`${basePath}.breakEnd`}
                />
            </div>
        </>
    )
}
