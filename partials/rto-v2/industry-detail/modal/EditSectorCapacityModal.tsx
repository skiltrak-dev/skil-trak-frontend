import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Save, X, Users, Target, Clock } from 'lucide-react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@components/ui/dialog'
import { Button, TextInput } from '@components'

export default function EditSectorCapacityModal({
    open,
    setOpen,
}: {
    open: boolean
    setOpen: (open: boolean) => void
}) {
    const [sectorMetricValues, setSectorMetricValues] = useState({
        students: 0,
        capacity: 0,
        duration: '',
    })

    const saveSectorMetrics = (sectorId: number) => {
        console.log('Saving metrics for sector:', sectorId, sectorMetricValues)
        setOpen(false)
    }

    const cancelSectorMetrics = () => {
        console.log('Cancelled')
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[500px] bg-white border-2 border-[#044866] shadow-lg">
                <DialogHeader>
                    <DialogTitle className="text-sm font-bold text-[#1A2332]">
                        Edit Sector Metrics
                    </DialogTitle>
                </DialogHeader>

                <div className="w-full bg-white rounded-lg">
                    <div className="grid grid-cols-3 gap-2">
                        {/* Students Input */}
                        <div className="space-y-1">
                            <label className="text-[9px] font-bold text-[#044866] uppercase tracking-wide flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                Students
                            </label>
                            <TextInput
                                name="students"
                                type="number"
                                value={sectorMetricValues.students}
                                onChange={(e: any) =>
                                    setSectorMetricValues({
                                        ...sectorMetricValues,
                                        students: parseInt(e.target.value) || 0,
                                    })
                                }
                                className="w-full h-auto px-2 py-1.5 text-sm font-bold text-[#044866] bg-gradient-to-br from-[#E8F4F8] to-[#D1E7F0] border-2 border-[#044866] rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#044866]/50"
                            />
                        </div>
                        {/* Capacity Input */}
                        <div className="space-y-1">
                            <label className="text-[9px] font-bold text-[#044866] uppercase tracking-wide flex items-center gap-1">
                                <Target className="w-3 h-3" />
                                Capacity
                            </label>
                            <TextInput
                                name="capacity"
                                type="number"
                                placeholder="Capacity"
                                value={sectorMetricValues.capacity}
                                onChange={(e: any) =>
                                    setSectorMetricValues({
                                        ...sectorMetricValues,
                                        capacity: parseInt(e.target.value) || 0,
                                    })
                                }
                                className="w-full h-auto px-2 py-1.5 text-sm font-bold text-[#044866] bg-gradient-to-br from-[#E8F4F8] to-[#D1E7F0] border-2 border-[#044866] rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#044866]/50"
                            />
                        </div>
                        {/* Duration Input */}
                        <div className="space-y-1">
                            <label className="text-[9px] font-bold text-[#F7A619] uppercase tracking-wide flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                Duration
                            </label>
                            <TextInput
                                name="duration"
                                id="duration"
                                type="text"
                                value={sectorMetricValues.duration}
                                onChange={(e: any) =>
                                    setSectorMetricValues({
                                        ...sectorMetricValues,
                                        duration: e.target.value,
                                    })
                                }
                                placeholder="e.g., 12 months"
                                className="w-full h-auto px-2 py-1.5 text-sm font-bold text-[#92400E] bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] border-2 border-[#F7A619] rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F7A619]/50"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Button
                            variant="secondary"
                            onClick={(e: any) => {
                                e.stopPropagation()
                                saveSectorMetrics(sector.id)
                            }}
                            className="px-2 py-1 h-auto bg-gradient-to-br from-[#10B981] to-[#059669] text-white rounded-md text-[9px] font-medium hover:shadow-md hover:bg-gradient-to-br hover:from-[#10B981] hover:to-[#059669] transition-all flex items-center gap-1"
                        >
                            <motion.div
                                whileHover={{
                                    scale: 1.05,
                                }}
                                whileTap={{
                                    scale: 0.95,
                                }}
                                className="flex items-center gap-1"
                            >
                                <Save className="w-3 h-3" />
                                Save
                            </motion.div>
                        </Button>
                        <Button
                            variant="secondary"
                            onClick={(e: any) => {
                                e.stopPropagation()
                                cancelSectorMetrics()
                            }}
                            className="px-2 py-1 h-auto bg-white border border-[#E2E8F0] text-[#64748B] rounded-md text-[9px] font-medium hover:bg-[#F8FAFB] transition-all flex items-center gap-1"
                        >
                            <motion.div
                                whileHover={{
                                    scale: 1.05,
                                }}
                                whileTap={{
                                    scale: 0.95,
                                }}
                                className="flex items-center gap-1"
                            >
                                <X className="w-3 h-3" />
                                Cancel
                            </motion.div>
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
