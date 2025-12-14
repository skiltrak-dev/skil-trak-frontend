import { Button, TextInput } from '@components'
import { Plus, Trash2 } from 'lucide-react'
import { ChangeEvent } from 'react'

export type Shift = {
    start: string
    end: string
    break?: string
}

interface FreeShiftsManagerProps {
    shifts: Shift[]
    onAddShift: () => void
    onRemoveShift: (index: number) => void
    onUpdateShift: (index: number, field: keyof Shift, value: string) => void
}

export function FreeShiftsManager({
    shifts,
    onAddShift,
    onRemoveShift,
    onUpdateShift,
}: FreeShiftsManagerProps) {
    return (
        <div className="w-full space-y-1.5">
            {/* Free Shifts List */}
            {shifts.map((shift, index) => (
                <div
                    key={index}
                    className="flex items-center gap-1.5 bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] p-2 rounded-lg border border-[#10B981]/20"
                >
                    <span className="text-[10px] font-bold text-[#10B981] w-12">
                        Shift {index + 1}
                    </span>
                    <TextInput
                        name="start"
                        type="time"
                        showError={false}
                        value={shift.start}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            onUpdateShift(index, 'start', e.target.value)
                        }
                    />
                    <span className="text-[10px] text-[#64748B] font-medium">
                        to
                    </span>
                    <TextInput
                        name="end"
                        type="time"
                        showError={false}
                        value={shift.end}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            onUpdateShift(index, 'end', e.target.value)
                        }
                    />
                    <div className="flex items-center gap-1.5 ml-1">
                        <span className="text-[10px] font-medium text-[#64748B]">
                            Break:
                        </span>
                        <TextInput
                            name="break"
                            type="text"
                            showError={false}
                            placeholder="12:00-13:00"
                            value={shift.break || ''}
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                onUpdateShift(index, 'break', e.target.value)
                            }
                            className="px-1.5 py-1 bg-white text-[10px] w-24"
                        />
                    </div>
                    <Button
                        variant="error"
                        onClick={() => onRemoveShift(index)}
                        className="ml-auto text-[10px] font-medium text-[#EF4444] hover:bg-[#FEE2E2]"
                    >
                        <Trash2 className="w-3 h-3" />
                    </Button>
                </div>
            ))}

            {/* Add Shift Button */}
            <Button
                onClick={onAddShift}
                variant={'success'}
                outline
                fullWidth
                className="border-dashed border-[#10B981]/30"
            >
                <Plus className="w-3.5 h-3.5 mr-1.5" />
                Add New Shift
            </Button>

            {shifts.length === 0 && (
                <div className="text-center py-3 text-[10px] text-[#64748B] italic">
                    No shifts added yet. Click above to add your first shift.
                </div>
            )}
        </div>
    )
}
