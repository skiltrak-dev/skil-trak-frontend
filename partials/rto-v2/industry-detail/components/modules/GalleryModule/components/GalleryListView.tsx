import { motion } from 'framer-motion'
import {
    Image as ImageIcon,
    FileText,
    Eye,
    Download,
    Trash2,
} from 'lucide-react'
import { IndustryGalleryItem } from '@types'

interface GalleryListViewProps {
    items: IndustryGalleryItem[]
    onPreview: (item: IndustryGalleryItem) => void
    onDelete: (id: number) => void
}

export function GalleryListView({
    items,
    onPreview,
    onDelete,
}: GalleryListViewProps) {
    const getMediaType = (fileUrl: string) => {
        if (!fileUrl) return 'photo'
        const extension = fileUrl.split('.').pop()?.toLowerCase()
        return extension === 'pdf' ? 'pdf' : 'photo'
    }

    return (
        <div className="space-y-1.5">
            {items.map((item, index) => {
                const type = getMediaType(item.file)

                return (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className="bg-white rounded-lg border border-[#E2E8F0] p-2.5 hover:shadow-md transition-all flex items-center gap-2.5"
                    >
                        {/* Icon/Thumbnail */}
                        <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                type === 'photo'
                                    ? 'bg-gradient-to-br from-[#10B981] to-[#059669]'
                                    : 'bg-gradient-to-br from-[#F7A619] to-[#EA580C]'
                            }`}
                        >
                            {type === 'photo' ? (
                                <ImageIcon className="w-5 h-5 text-white" />
                            ) : (
                                <FileText className="w-5 h-5 text-white" />
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-[#1A2332] truncate">
                                {item.title}
                            </h4>
                            <p className="text-[9px] text-[#64748B]">
                                {item.fileSize}MB •{' '}
                                {new Date(item.createdAt).toLocaleDateString(
                                    'en-AU',
                                    {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric',
                                    }
                                )}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1">
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => onPreview(item)}
                                className="p-1.5 bg-[#F8FAFB] hover:bg-[#E8F4F8] rounded-md transition-all"
                            >
                                <Eye className="w-3.5 h-3.5 text-[#044866]" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-1.5 bg-[#F8FAFB] hover:bg-[#E8F4F8] rounded-md transition-all"
                            >
                                <Download className="w-3.5 h-3.5 text-[#044866]" />
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => onDelete(item.id)}
                                className="p-1.5 bg-[#FEE2E2] hover:bg-[#FECACA] rounded-md transition-all"
                            >
                                <Trash2 className="w-3.5 h-3.5 text-[#EF4444]" />
                            </motion.button>
                        </div>
                    </motion.div>
                )
            })}
        </div>
    )
}
