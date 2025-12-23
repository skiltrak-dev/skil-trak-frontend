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
import { Button } from '@components'
import { TextInput } from '@components'
import { IndustrySectorGroup } from '../../_courses/hooks/useCoursesData'

interface EditSectorMetricsDialogProps {
    open: boolean
    sector: IndustrySectorGroup | null
    onOpenChange: (open: boolean) => void
    onSave: (
        sectorId: number,
        values: { students: number; capacity: number; duration: string }
    ) => void
}

export function EditSectorMetricsDialog({
    open,
    sector,
    onOpenChange,
    onSave,
}: EditSectorMetricsDialogProps) {
    const [values, setValues] = useState({
        students: 0,
        capacity: 0,
        duration: '12 months',
    })

    useEffect(() => {
        if (sector) {
            const sectorStudents = sector.approvalCourses.reduce(
                (sum, approval) => sum + ((approval.course as any).students || 0),
                0
            )
            const sectorCapacity = sector.approvalCourses.reduce(
                (sum, approval) => sum + ((approval.course as any).capacity || 0),
                0
            )
            const duration =
                sector.approvalCourses.length > 0 && (sector.approvalCourses[0].course as any).duration
                    ? (sector.approvalCourses[0].course as any).duration
                    : '12 months'

            setValues({
                students: sectorStudents,
                capacity: sectorCapacity,
                duration,
            })
        }
    }, [sector])

    const handleSave = () => {
        if (sector) {
            onSave(sector.sector.id, values)
            onOpenChange(false)
        }
    }

    if (!sector) return null

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] bg-white border-[#E2E8F0] shadow-2xl">
                <DialogHeader>
                    <DialogTitle className="text-lg font-bold text-[#1A2332] flex items-center gap-2">
                        <div
                            className={`w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-lg shadow-md`}
                        >
                            📚
                        </div>
                        Edit Sector Metrics
                    </DialogTitle>
                    <DialogDescription className="text-sm text-[#64748B]">
                        Update the metrics for {sector.sector.name} sector
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {/* Students Input */}
                    <div className="space-y-2">
                        <TextInput
                            label={'Active Students'}
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
                            label={'Total Capacity'}
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

                    {/* Duration Input */}
                    <div className="space-y-2">
                        <TextInput
                            label={'Duration'}
                            name="duration"
                            type="text"
                            value={values.duration}
                            onChange={(e: any) =>
                                setValues({
                                    ...values,
                                    duration: e.target.value,
                                })
                            }
                            placeholder="e.g., 12 months"
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
                                    className={`h-full rounded-full ${(values.students / values.capacity) *
                                        100 >=
                                        80
                                        ? 'bg-gradient-to-r from-[#DC2626] to-[#EF4444]'
                                        : 'bg-gradient-to-r from-[#10B981] to-[#059669]'
                                        }`}
                                />
                            </div>
                            <span
                                className={`text-sm font-bold ${(values.students / values.capacity) * 100 >=
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
