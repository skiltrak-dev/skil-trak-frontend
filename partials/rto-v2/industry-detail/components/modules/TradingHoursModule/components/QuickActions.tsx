import { Copy, RotateCcw } from 'lucide-react'
import { Button } from '@components'

interface QuickActionsProps {
    onCopyMonFri: () => void
    onReset: () => void
}

export function QuickActions({ onCopyMonFri, onReset }: QuickActionsProps) {
    return (
        <div className="flex items-center gap-1.5">
            <Button
                variant="primaryNew"
                className="text-[10px] font-medium text-[#044866] hover:bg-[#E8F4F8]"
                onClick={onCopyMonFri}
            >
                <Copy className="w-3 h-3 mr-1" />
                Copy Mon-Fri
            </Button>
            <Button
                variant="primaryNew"
                className="text-[10px] font-medium text-[#64748B] hover:bg-[#F8FAFB]"
                onClick={onReset}
            >
                <RotateCcw className="w-3 h-3 mr-1" />
                Reset
            </Button>
        </div>
    )
}
