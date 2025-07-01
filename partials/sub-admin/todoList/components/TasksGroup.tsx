import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

type TasksGroupProps = {
    label: string
    count: number
    children?: React.ReactNode
    depth?: number
}

export const TasksGroup = ({
    label,
    count,
    children,
    depth = 0,
}: TasksGroupProps) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <div className="w-full max-w-sm border rounded-lg py-4 px-3">
            <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-sm text-gray-600">{label}</span>
                <div className="flex items-center gap-2">
                    <span className="font-bold text-black text-base">
                        {count}
                    </span>
                    <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                        }`}
                    />
                </div>
            </div>

            {isOpen && children && (
                <div className="mt-3 text-sm text-gray-700">{children}</div>
            )}
        </div>
    )
}
