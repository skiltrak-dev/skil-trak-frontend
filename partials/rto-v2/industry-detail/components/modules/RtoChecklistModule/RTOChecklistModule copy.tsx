import { motion } from 'framer-motion'
import {
    AlertCircle,
    Check,
    Download,
    Eye,
    FileText,
    Lock,
    Upload,
} from 'lucide-react'
import { useState } from 'react'

interface ChecklistItem {
    id: string
    title: string
    category: string
    status: 'completed' | 'pending' | 'required'
    dueDate?: string
    description: string
}

const checklistItems: ChecklistItem[] = [
    {
        id: '1',
        title: 'Public Liability Insurance',
        category: 'Insurance & Compliance',
        status: 'completed',
        dueDate: '2024-12-15',
        description: 'Current certificate of currency uploaded',
    },
    {
        id: '2',
        title: 'Workers Compensation',
        category: 'Insurance & Compliance',
        status: 'completed',
        dueDate: '2024-12-20',
        description: 'Active policy confirmation',
    },
    {
        id: '3',
        title: 'Supervisor Qualifications',
        category: 'Workplace Requirements',
        status: 'pending',
        dueDate: '2024-12-25',
        description: 'Verification of supervisor credentials',
    },
    {
        id: '4',
        title: 'Safety Induction Materials',
        category: 'Workplace Requirements',
        status: 'completed',
        description: 'Workplace safety procedures documented',
    },
    {
        id: '5',
        title: 'Placement Agreement',
        category: 'Documentation',
        status: 'required',
        dueDate: '2024-12-18',
        description: 'Signed placement agreement required',
    },
    {
        id: '6',
        title: 'Student Assessment Forms',
        category: 'Documentation',
        status: 'pending',
        dueDate: '2024-12-30',
        description: 'Templates for student evaluation',
    },
]

export function RTOChecklistModule() {
    const [selectedCategory, setSelectedCategory] = useState<string>('all')
    const [uploadingId, setUploadingId] = useState<string | null>(null)

    const categories = [
        'all',
        ...Array.from(new Set(checklistItems.map((item) => item.category))),
    ]

    const filteredItems =
        selectedCategory === 'all'
            ? checklistItems
            : checklistItems.filter(
                  (item) => item.category === selectedCategory
              )

    const stats = {
        total: checklistItems.length,
        completed: checklistItems.filter((i) => i.status === 'completed')
            .length,
        pending: checklistItems.filter((i) => i.status === 'pending').length,
        required: checklistItems.filter((i) => i.status === 'required').length,
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'from-[#10B981] to-[#059669]'
            case 'pending':
                return 'from-[#F7A619] to-[#EA580C]'
            case 'required':
                return 'from-[#EF4444] to-[#DC2626]'
            default:
                return 'from-[#64748B] to-[#475569]'
        }
    }

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed':
                return <Check className="w-3 h-3" />
            case 'pending':
                return <AlertCircle className="w-3 h-3" />
            case 'required':
                return <AlertCircle className="w-3 h-3" />
            default:
                return <FileText className="w-3 h-3" />
        }
    }

    const handleFileUpload = (itemId: string) => {
        setUploadingId(itemId)
        // Simulate upload
        setTimeout(() => {
            setUploadingId(null)
        }, 1500)
    }

    return (
        <div className="space-y-4">
            {/* RTO Access Notice */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-[#044866]/10 to-[#0D5468]/10 border border-[#044866]/20 rounded-lg p-3 flex items-start gap-2"
            >
                <div className="w-7 h-7 bg-gradient-to-br from-[#044866] to-[#0D5468] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Lock className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                    <h4 className="text-xs font-bold text-[#044866] mb-0.5">
                        RTO-Only Access
                    </h4>
                    <p className="text-[10px] text-[#64748B] leading-relaxed">
                        This checklist is visible only to the associated RTO.
                        Industry partners cannot view or modify these
                        requirements.
                    </p>
                </div>
            </motion.div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-4 gap-2.5">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-br from-[#F8FAFB] to-white rounded-lg p-3 border border-[#E2E8F0] hover:shadow-md transition-all"
                >
                    <p className="text-[10px] font-medium text-[#64748B] mb-1">
                        Total Items
                    </p>
                    <p className="text-xl font-bold text-[#1A2332]">
                        {stats.total}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-br from-[#10B981]/10 to-[#059669]/10 rounded-lg p-3 border border-[#10B981]/20 hover:shadow-md transition-all"
                >
                    <p className="text-[10px] font-medium text-[#059669] mb-1">
                        Completed
                    </p>
                    <p className="text-xl font-bold text-[#10B981]">
                        {stats.completed}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-[#F7A619]/10 to-[#EA580C]/10 rounded-lg p-3 border border-[#F7A619]/20 hover:shadow-md transition-all"
                >
                    <p className="text-[10px] font-medium text-[#EA580C] mb-1">
                        Pending
                    </p>
                    <p className="text-xl font-bold text-[#F7A619]">
                        {stats.pending}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-br from-[#EF4444]/10 to-[#DC2626]/10 rounded-lg p-3 border border-[#EF4444]/20 hover:shadow-md transition-all"
                >
                    <p className="text-[10px] font-medium text-[#DC2626] mb-1">
                        Required
                    </p>
                    <p className="text-xl font-bold text-[#EF4444]">
                        {stats.required}
                    </p>
                </motion.div>
            </div>

            {/* Category Filter */}
            <div className="flex gap-1.5 overflow-x-auto pb-2">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                            selectedCategory === category
                                ? 'bg-gradient-to-br from-[#044866] to-[#0D5468] text-white shadow-md'
                                : 'bg-[#F8FAFB] text-[#64748B] hover:bg-[#E8F4F8] border border-[#E2E8F0]'
                        }`}
                    >
                        {category === 'all' ? 'All Items' : category}
                    </button>
                ))}
            </div>

            {/* Checklist Items */}
            <div className="space-y-2.5">
                {filteredItems.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white rounded-lg border border-[#E2E8F0] hover:shadow-lg transition-all overflow-hidden"
                    >
                        <div className="p-3">
                            <div className="flex items-start gap-2.5">
                                {/* Status Icon */}
                                <div
                                    className={`w-8 h-8 bg-gradient-to-br ${getStatusColor(
                                        item.status
                                    )} rounded-lg flex items-center justify-center flex-shrink-0 text-white shadow-md`}
                                >
                                    {getStatusIcon(item.status)}
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2 mb-1">
                                        <div className="flex-1">
                                            <h4 className="text-xs font-bold text-[#1A2332] mb-0.5">
                                                {item.title}
                                            </h4>
                                            <p className="text-[10px] text-[#64748B]">
                                                {item.description}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span
                                                className={`px-2 py-0.5 rounded-full text-[9px] font-medium ${
                                                    item.status === 'completed'
                                                        ? 'bg-[#10B981]/10 text-[#10B981]'
                                                        : item.status ===
                                                          'pending'
                                                        ? 'bg-[#F7A619]/10 text-[#F7A619]'
                                                        : 'bg-[#EF4444]/10 text-[#EF4444]'
                                                }`}
                                            >
                                                {item.status
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    item.status.slice(1)}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Category & Due Date */}
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-[9px] px-1.5 py-0.5 bg-[#E8F4F8] text-[#044866] rounded-md font-medium">
                                            {item.category}
                                        </span>
                                        {item.dueDate && (
                                            <span className="text-[9px] text-[#64748B]">
                                                Due:{' '}
                                                {new Date(
                                                    item.dueDate
                                                ).toLocaleDateString('en-AU', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                })}
                                            </span>
                                        )}
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex items-center gap-1.5">
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() =>
                                                handleFileUpload(item.id)
                                            }
                                            disabled={uploadingId === item.id}
                                            className="flex items-center gap-1 px-2.5 py-1 bg-[#044866] hover:bg-[#0D5468] text-white rounded-md text-[9px] font-medium transition-all disabled:opacity-50"
                                        >
                                            <Upload className="w-2.5 h-2.5" />
                                            {uploadingId === item.id
                                                ? 'Uploading...'
                                                : 'Upload'}
                                        </motion.button>

                                        {item.status === 'completed' && (
                                            <>
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className="flex items-center gap-1 px-2.5 py-1 bg-[#F8FAFB] hover:bg-[#E8F4F8] text-[#044866] rounded-md text-[9px] font-medium transition-all border border-[#E2E8F0]"
                                                >
                                                    <Eye className="w-2.5 h-2.5" />
                                                    View
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className="flex items-center gap-1 px-2.5 py-1 bg-[#F8FAFB] hover:bg-[#E8F4F8] text-[#044866] rounded-md text-[9px] font-medium transition-all border border-[#E2E8F0]"
                                                >
                                                    <Download className="w-2.5 h-2.5" />
                                                    Download
                                                </motion.button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
