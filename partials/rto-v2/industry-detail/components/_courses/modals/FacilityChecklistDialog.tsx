import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    X,
    CheckCircle,
    XCircle,
    FileText,
    AlertCircle,
    Building2,
    Users,
    Shield,
    Clipboard,
} from 'lucide-react'
import { Button } from '@components'
import { Course } from '../types'

interface FacilityChecklistDialogProps {
    course: Course
    isOpen: boolean
    onClose: () => void
    onApprove: (courseId: number) => void
    onReject: (courseId: number) => void
}

const checklistItems = [
    {
        category: 'Facility Infrastructure',
        icon: Building2,
        items: [
            'Adequate physical space for student activities',
            'Appropriate equipment and resources available',
            'Safe and accessible work environment',
            'Compliance with health and safety regulations',
        ],
    },
    {
        category: 'Supervision & Support',
        icon: Users,
        items: [
            'Qualified supervisors available on-site',
            'Structured supervision and mentoring program',
            'Regular feedback and assessment processes',
            'Emergency support protocols in place',
        ],
    },
    {
        category: 'Quality & Compliance',
        icon: Shield,
        items: [
            'Current industry accreditations and licenses',
            'Adherence to relevant industry standards',
            'Insurance coverage for student placements',
            'Privacy and confidentiality protocols',
        ],
    },
    {
        category: 'Learning Opportunities',
        icon: Clipboard,
        items: [
            'Variety of tasks matching course requirements',
            'Opportunities to demonstrate competencies',
            'Exposure to real-world scenarios',
            'Alignment with vocational outcomes',
        ],
    },
]

export function FacilityChecklistDialog({
    course,
    isOpen,
    onClose,
    onApprove,
    onReject,
}: FacilityChecklistDialogProps) {
    const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set())

    const handleCheckItem = (category: string, item: string) => {
        const key = `${category}-${item}`
        const newChecked = new Set(checkedItems)
        if (newChecked.has(key)) {
            newChecked.delete(key)
        } else {
            newChecked.add(key)
        }
        setCheckedItems(newChecked)
    }

    const totalItems = checklistItems.reduce(
        (acc, cat) => acc + cat.items.length,
        0
    )
    const checkedCount = checkedItems.size
    const allChecked = checkedCount === totalItems
    const progress = (checkedCount / totalItems) * 100

    const handleApprove = () => {
        if (!allChecked) {
            return
        }
        onApprove(course.id)
        onClose()
    }

    const handleReject = () => {
        onReject(course.id)
        onClose()
    }

    if (!isOpen) return null

    return (
        <AnimatePresence>
            <div
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                role="dialog"
                aria-modal="true"
                aria-labelledby="facility-checklist-title"
                aria-describedby="facility-checklist-description"
            >
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    aria-hidden="true"
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
                >
                    {/* Header */}
                    <div className="relative bg-gradient-to-br from-[#044866] to-[#0D5468] px-6 py-5">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                        <div className="relative flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                                        <FileText className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h2
                                            id="facility-checklist-title"
                                            className="text-xl font-bold text-white"
                                        >
                                            Facility Checklist
                                        </h2>
                                        <p
                                            id="facility-checklist-description"
                                            className="text-sm text-white/80 mt-0.5"
                                        >
                                            {course.code} - {course.name}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-all"
                                aria-label="Close dialog"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Progress Bar */}
                        <div className="relative mt-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold text-white/90 uppercase tracking-wide">
                                    Progress
                                </span>
                                <span className="text-xs font-bold text-white">
                                    {checkedCount} / {totalItems} completed
                                </span>
                            </div>
                            <div className="h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 0.3 }}
                                    className={`h-full rounded-full ${
                                        allChecked
                                            ? 'bg-gradient-to-r from-[#10B981] to-[#059669]'
                                            : 'bg-gradient-to-r from-[#F7A619] to-[#EA580C]'
                                    }`}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="space-y-6">
                            {checklistItems.map((category, idx) => {
                                const CategoryIcon = category.icon
                                return (
                                    <motion.div
                                        key={category.category}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="bg-gradient-to-br from-[#FAFBFC] to-white rounded-xl p-5 border border-[#E2E8F0] shadow-sm"
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#044866] to-[#0D5468] flex items-center justify-center shadow-md">
                                                <CategoryIcon className="w-5 h-5 text-white" />
                                            </div>
                                            <h3 className="font-bold text-[#1A2332]">
                                                {category.category}
                                            </h3>
                                        </div>
                                        <div className="space-y-2">
                                            {category.items.map((item) => {
                                                const key = `${category.category}-${item}`
                                                const isChecked =
                                                    checkedItems.has(key)
                                                return (
                                                    <motion.div
                                                        key={item}
                                                        whileHover={{
                                                            scale: 1.01,
                                                            x: 4,
                                                        }}
                                                        onClick={() =>
                                                            handleCheckItem(
                                                                category.category,
                                                                item
                                                            )
                                                        }
                                                        className={`flex items-start gap-3 p-3 rounded-lg border-2 transition-all duration-300 cursor-pointer ${
                                                            isChecked
                                                                ? 'bg-gradient-to-br from-[#D1FAE5] to-[#A7F3D0] border-[#10B981] shadow-md'
                                                                : 'bg-white border-[#E2E8F0] hover:border-[#044866]/30 hover:shadow-sm'
                                                        }`}
                                                    >
                                                        <div
                                                            className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                                                                isChecked
                                                                    ? 'bg-[#10B981] border-[#10B981]'
                                                                    : 'bg-white border-[#CBD5E1]'
                                                            }`}
                                                        >
                                                            {isChecked && (
                                                                <CheckCircle
                                                                    className="w-4 h-4 text-white"
                                                                    fill="currentColor"
                                                                />
                                                            )}
                                                        </div>
                                                        <span
                                                            className={`text-sm flex-1 ${
                                                                isChecked
                                                                    ? 'text-[#065F46] font-medium'
                                                                    : 'text-[#64748B]'
                                                            }`}
                                                        >
                                                            {item}
                                                        </span>
                                                    </motion.div>
                                                )
                                            })}
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </div>

                        {/* Info Box */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="mt-6 bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] rounded-xl p-4 border border-[#BFDBFE]"
                        >
                            <div className="flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-[#2563EB] flex-shrink-0 mt-0.5" />
                                <div>
                                    <p className="text-sm text-[#1E40AF] font-medium mb-1">
                                        Approval Requirements
                                    </p>
                                    <p className="text-xs text-[#1E40AF]/80">
                                        All checklist items must be completed
                                        before approving this course. Ensure the
                                        facility meets all requirements for
                                        student placements.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Footer */}
                    <div className="border-t border-[#E2E8F0] bg-gradient-to-br from-[#FAFBFC] to-white px-6 py-4">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                                {allChecked ? (
                                    <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-br from-[#D1FAE5] to-[#A7F3D0] rounded-lg">
                                        <CheckCircle
                                            className="w-4 h-4 text-[#059669]"
                                            fill="currentColor"
                                        />
                                        <span className="text-sm font-bold text-[#065F46]">
                                            Ready to Approve
                                        </span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-br from-[#FEF3C7] to-[#FDE68A] rounded-lg">
                                        <AlertCircle className="w-4 h-4 text-[#F7A619]" />
                                        <span className="text-sm font-bold text-[#92400E]">
                                            {totalItems - checkedCount} items
                                            remaining
                                        </span>
                                    </div>
                                )}
                            </div>
                            <div className="flex items-center gap-3">
                                <Button
                                    onClick={handleReject}
                                    className="px-4 py-2 bg-white border-2 border-[#E2E8F0] text-[#DC2626] font-bold rounded-lg hover:bg-[#FEE2E2] hover:border-[#DC2626] transition-all"
                                >
                                    <XCircle className="w-4 h-4 mr-2" />
                                    Reject
                                </Button>
                                <Button
                                    onClick={handleApprove}
                                    disabled={!allChecked}
                                    className={`px-4 py-2 font-bold rounded-lg transition-all ${
                                        allChecked
                                            ? 'bg-gradient-to-br from-[#10B981] to-[#059669] text-white shadow-lg hover:shadow-xl'
                                            : 'bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed'
                                    }`}
                                >
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    Approve Course
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    )
}
