import { Button, TextInput } from '@components'
import { Plus, Trash2 } from 'lucide-react'
import { useFieldArray, useFormContext } from 'react-hook-form'

export type Shift = {
    shiftId?: number
    start: string
    end: string
    studentCapacity: string
}

interface FreeShiftsManagerProps {
    name: string
    onDeleteShift: (id: number) => Promise<boolean>
}

export function FreeShiftsManager({
    name,
    onDeleteShift,
}: FreeShiftsManagerProps) {
    const { control } = useFormContext()
    const { fields, append, remove } = useFieldArray({
        control,
        name,
    })

    const handleRemove = async (index: number) => {
        const shiftToDelete = fields[index] as unknown as Shift
        if (shiftToDelete.shiftId) {
            const success = await onDeleteShift(shiftToDelete.shiftId)
            if (success) {
                remove(index)
            }
        } else {
            remove(index)
        }
    }

    return (
        <div className="w-full space-y-1.5">
            {/* Free Shifts List */}
            {fields.map((field, index) => (
                <div
                    key={field.id}
                    className="grid grid-cols-3 gap-1.5 bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] p-2 rounded-lg border border-[#10B981]/20"
                >
                    <div>
                        <span className="text-[10px] font-bold text-[#10B981] w-12">
                            Shift {index + 1}
                        </span>
                        <TextInput
                            label={``}
                            type="time"
                            name={`${name}.${index}.start`}
                        />
                    </div>
                    <div>
                        <span className="text-[10px] text-[#64748B] font-medium">
                            to
                        </span>
                        <TextInput
                            type="time"
                            name={`${name}.${index}.end`}
                        />
                    </div>
                    <div className="flex gap-1.5">
                        <div className="w-full">
                            <span className="text-[10px] font-medium text-[#64748B]">
                                Student Capacity:
                            </span>
                            <TextInput
                                type="number"
                                placeholder="0"
                                className="px-1.5 py-1 bg-white text-[10px] w-16"
                                name={`${name}.${index}.studentCapacity`}
                            />
                        </div>
                        <Button
                            variant="error"
                            mini
                            Icon={Trash2}
                            onClick={() => handleRemove(index)}
                        ></Button>
                    </div>
                </div>
            ))}

            {/* Add Shift Button */}
            <Button
                onClick={() =>
                    append({
                        start: '09:00',
                        end: '17:00',
                        studentCapacity: '0',
                    })
                }
                variant={'success'}
                outline
                fullWidth
                className="border-dashed border-[#10B981]/30"
            >
                <Plus className="w-3.5 h-3.5 mr-1.5" />
                Add New Shift
            </Button>

            {fields.length === 0 && (
                <div className="text-center py-3 text-[10px] text-[#64748B] italic">
                    No shifts added yet. Click above to add your first shift.
                </div>
            )}
        </div>
    )
}
