import { Save, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@components/ui/dialog'
import { Button, TextInput } from '@components'
import { Course } from '../types'

interface EditCourseCapacityDialogProps {
    open: boolean
    course: Course | null
    onOpenChange: (open: boolean) => void
    onSave: (
        courseId: number,
        values: { students: number; capacity: number }
    ) => void
}

export function EditCourseCapacityDialog({
    open,
    course,
    onOpenChange,
    onSave,
}: EditCourseCapacityDialogProps) {
    const [values, setValues] = useState({
        students: 0,
        capacity: 0,
    })

    useEffect(() => {
        if (course) {
            setValues({
                students: course.students,
                capacity: course.capacity,
            })
        }
    }, [course])

    const handleSave = () => {
        if (course) {
            onSave(course.id, values)
            onOpenChange(false)
        }
    }

    if (!course) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] bg-white border-[#E2E8F0] shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-lg font-bold text-[#1A2332] flex items-center gap-2">
                        <div className="px-3 py-1.5 bg-gradient-to-br from-[#044866] to-[#0D5468] text-white rounded-md text-sm font-mono shadow-md">
                            {course.code}
                        </div>
                        Edit Course Capacity
                    </DialogTitle>
                    <DialogDescription className="text-sm text-[#64748B]">
                        Update the student capacity for {course.name}
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {/* Students Input */}
                    <div className="space-y-2">
                        <TextInput
                            label={'Current Students'}
                            name="students"
                            type="number"
                            value={values.students}
                            onChange={(e: any) =>
                                setValues({
                                    ...values,
                                    students: parseInt(e.target.value) || 0,
                                })
                            }
                            className="w-full border-[#E2E8F0] focus-visible:border-[#044866] focus-visible:ring-[#044866]"
                        />
                    </div>

                    {/* Capacity Input */}
                    <div className="space-y-2">
                        <TextInput
                            label={'Maximum Capacity'}
                            name="capacity"
                            type="number"
                            value={values.capacity}
                            onChange={(e: any) =>
                                setValues({
                                    ...values,
                                    capacity: parseInt(e.target.value) || 0,
                                })
                            }
                            className="w-full border-[#E2E8F0] focus-visible:border-[#044866] focus-visible:ring-[#044866]"
                        />
                    </div>

                    {/* Capacity Preview */}
                    <div className="bg-gradient-to-br from-[#F8FAFB] to-[#E8F4F8] rounded-lg p-3 border border-[#E2E8F0]">
                        <p className="text-xs text-[#64748B] mb-1">
                            Capacity Preview
                        </p>
                        <div className="flex items-center gap-2">
                            <div className="flex-1 bg-[#E2E8F0] rounded-full h-2 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{
                                        width: `${Math.min(
                                            (values.students /
                                                values.capacity) *
                                                100,
                                            100
                                        )}%`,
                                    }}
                                    className={`h-full rounded-full ${
                                        (values.students / values.capacity) *
                                            100 >=
                                        80
                                            ? 'bg-gradient-to-r from-[#DC2626] to-[#EF4444]'
                                            : 'bg-gradient-to-r from-[#10B981] to-[#059669]'
                                    }`}
                                />
                            </div>
                            <span
                                className={`text-sm font-bold ${
                                    (values.students / values.capacity) * 100 >=
                                    80
                                        ? 'text-[#DC2626]'
                                        : 'text-[#10B981]'
                                }`}
                            >
                                {Math.round(
                                    (values.students / values.capacity) * 100
                                )}
                                %
                            </span>
                        </div>
                        <div className="flex items-center justify-between mt-2 text-xs">
                            <span className="text-[#64748B]">
                                {values.students} / {values.capacity} students
                            </span>
                            <span className="text-[#64748B]">
                                {values.capacity - values.students} spots
                                available
                            </span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 justify-end pt-4 border-t border-[#E2E8F0]">
                    <Button
                        variant="secondary"
                        onClick={() => onOpenChange(false)}
                        className="px-4 py-2 text-sm text-[#64748B] hover:bg-[#F8FAFB] hover:text-[#1A2332] transition-all"
                    >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                    </Button>
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Button
                            onClick={handleSave}
                            className="px-4 py-2 bg-gradient-to-r from-[#044866] to-[#0D5468] text-white hover:shadow-lg transition-all"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                        </Button>
                    </motion.div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
