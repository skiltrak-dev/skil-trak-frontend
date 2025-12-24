import { DocumentsView } from '@hooks'
import { motion } from 'framer-motion'
import { getFileExtensionByUrl } from '@utils'
import { AlertCircle, Check, Download, Eye, FileText } from 'lucide-react'

interface ChecklistItemCardProps {
    item: {
        isExist: boolean
        documentName: string
        initiatedBy: string
        rtoName: string
        dueDate: string
        url: string
        status: 'completed' | 'pending' | 'required'
    }
    index?: number
}

export function ChecklistItemCard({ item, index = 0 }: ChecklistItemCardProps) {
    const { onFileClicked, documentsViewModal } = DocumentsView()

    const getStatusColor = (status: 'completed' | 'pending' | 'required') => {
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

    const getStatusIcon = (status: 'completed' | 'pending' | 'required') => {
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

    console.log({ item })

    if (!item?.isExist) {
        return (
            <div className="bg-white rounded-lg border border-[#E2E8F0] hover:shadow-lg transition-all overflow-hidden">
                <div className="p-3">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#64748B] to-[#475569] rounded-lg flex items-center justify-center flex-shrink-0 text-white shadow-md">
                            <FileText className="w-3 h-3" />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-xs font-bold text-[#1A2332] mb-0.5">
                                No Checklist Found
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {documentsViewModal}
            <motion.div
                animate={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -20 }}
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
                                        {item?.documentName}
                                    </h4>

                                    <p className="text-[10px] text-[#64748B]">
                                        Initiated by:{' '}
                                        <strong>{item?.initiatedBy}</strong>
                                    </p>
                                </div>
                                {/* <div className="flex items-center gap-1">
                                <span
                                    className={`px-2 py-0.5 rounded-full text-[9px] font-medium ${
                                        item.status === 'completed'
                                            ? 'bg-[#10B981]/10 text-[#10B981]'
                                            : item.status === 'pending'
                                            ? 'bg-[#F7A619]/10 text-[#F7A619]'
                                            : 'bg-[#EF4444]/10 text-[#EF4444]'
                                    }`}
                                >
                                    {item.status}Saad
                                </span>
                            </div> */}
                            </div>

                            {/* Category & Due Date */}
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-[9px] px-1.5 py-0.5 bg-[#E8F4F8] text-[#044866] rounded-md font-medium">
                                    {item?.rtoName}
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
                                        onFileClicked({
                                            file: item?.url,
                                            extension: getFileExtensionByUrl(
                                                item?.url
                                            ),
                                        })
                                    }
                                    className="cursor-pointer flex items-center gap-1 px-2.5 py-1 bg-[#F8FAFB] hover:bg-[#E8F4F8] text-[#044866] rounded-md text-[9px] font-medium transition-all border border-[#E2E8F0]"
                                >
                                    <Eye className="w-2.5 h-2.5" />
                                    View
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() =>
                                        window.open(item?.url, '_blank')
                                    }
                                    className="cursor-pointer flex items-center gap-1 px-2.5 py-1 bg-[#F8FAFB] hover:bg-[#E8F4F8] text-[#044866] rounded-md text-[9px] font-medium transition-all border border-[#E2E8F0]"
                                >
                                    <Download className="w-2.5 h-2.5" />
                                    Download
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    )
}
