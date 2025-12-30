import { XCircle } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from '@components/ui/dialog'
import { Button, TextInput } from '@components'

interface CapacityDatePickerDialogProps {
    open: boolean
    capacityAvailableDate: string
    onOpenChange: (open: boolean) => void
    onDateChange: (date: string) => void
    onConfirm: () => void
}

export function CapacityDatePickerDialog({
    open,
    capacityAvailableDate,
    onOpenChange,
    onDateChange,
    onConfirm,
}: CapacityDatePickerDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden p-0">
                <DialogHeader className="bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                            <XCircle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <DialogTitle className="text-white font-bold">
                                No Capacity - Set Available Date
                            </DialogTitle>
                            <DialogDescription className="text-white/80 text-xs">
                                When will capacity be available again?
                            </DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="p-6">
                    <div className="bg-gradient-to-br from-[#F3E8FF] to-[#E9D5FF] rounded-xl p-4 border border-[#D8B4FE] mb-4">
                        <p className="text-sm text-[#1A2332] mb-2 font-medium">
                            📅 Capacity Expected Date
                        </p>
                        <p className="text-xs text-[#64748B]">
                            Select the date when you expect capacity to become
                            available. This will be displayed to students and
                            coordinators.
                        </p>
                    </div>

                    <div className="mb-6">
                        <TextInput
                            label={'Capacity Available Date'}
                            name="capacityDate"
                            type="date"
                            value={capacityAvailableDate}
                            onChange={(e: any) => onDateChange(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full px-4 py-3 bg-gradient-to-br from-[#F8FAFB] to-[#E8F4F8] border border-[#E2E8F0] rounded-xl text-sm text-[#1A2332] placeholder-[#94A3B8] hover:border-[#8B5CF6]/30 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6]/20 focus:border-[#8B5CF6] transition-all"
                        />
                    </div>

                    <div className="flex gap-3">
                        <Button
                            onClick={onConfirm}
                            className="flex-1 px-4 py-3 bg-gradient-to-br from-[#8B5CF6] to-[#7C3AED] hover:shadow-lg text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 h-auto disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={!capacityAvailableDate}
                        >
                            <XCircle className="w-4 h-4" />
                            Set No Capacity
                        </Button>
                        <Button
                            onClick={() => onOpenChange(false)}
                            variant="action"
                            className="px-4 py-3 bg-white hover:bg-[#F8FAFB] border border-[#E2E8F0] text-[#64748B] rounded-xl font-medium transition-all duration-300 h-auto"
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
