import { motion } from 'framer-motion'
import { FileText, Eye, Download, Trash2 } from 'lucide-react'
import { IndustryGalleryItem } from '@types'

interface GalleryGridViewProps {
    items: IndustryGalleryItem[]
    onPreview: (item: IndustryGalleryItem) => void
    onDelete: (id: number) => void
}

export function GalleryGridView({
    items,
    onPreview,
    onDelete,
}: GalleryGridViewProps) {
    const getMediaType = (fileUrl: string) => {
        if (!fileUrl) return 'photo'
        const extension = fileUrl.split('.').pop()?.toLowerCase()
        return extension === 'pdf' ? 'pdf' : 'photo'
    }

    const handleDownload = (item: IndustryGalleryItem) => {
        window.open(item?.file)
    }

    return (
        <div className="grid grid-cols-4 gap-2.5">
            {items?.map((item, index) => {
                const type = getMediaType(item.file)
                return (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="bg-white rounded-lg border border-[#E2E8F0] overflow-hidden hover:shadow-lg transition-all group"
                    >
                        {/* Thumbnail/Preview */}
                        {type === 'photo' ? (
                            <div className="aspect-video bg-[#F8FAFB] relative overflow-hidden">
                                <img
                                    src={item?.file}
                                    alt={item?.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => onPreview(item)}
                                            className="p-1 bg-white/90 hover:bg-white rounded-md transition-all"
                                        >
                                            <Eye className="w-3 h-3 text-[#044866]" />
                                        </button>
                                        <button
                                            onClick={() => handleDownload(item)}
                                            className="p-1 bg-white/90 hover:bg-white rounded-md transition-all"
                                        >
                                            <Download className="w-3 h-3 text-[#044866]" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(item.id)}
                                            className="p-1 bg-white/90 hover:bg-white rounded-md transition-all"
                                        >
                                            <Trash2 className="w-3 h-3 text-[#EF4444]" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="aspect-video bg-gradient-to-br from-[#F7A619]/10 to-[#EA580C]/10 flex items-center justify-center relative group">
                                <FileText className="w-12 h-12 text-[#F7A619]" />
                                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2 justify-center">
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => onPreview(item)}
                                            className="p-1 bg-white/90 hover:bg-white rounded-md transition-all"
                                        >
                                            <Eye className="w-3 h-3 text-[#044866]" />
                                        </button>
                                        <button
                                            onClick={() => handleDownload(item)}
                                            className="p-1 bg-white/90 hover:bg-white rounded-md transition-all"
                                        >
                                            <Download className="w-3 h-3 text-[#044866]" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(item.id)}
                                            className="p-1 bg-white/90 hover:bg-white rounded-md transition-all"
                                        >
                                            <Trash2 className="w-3 h-3 text-[#EF4444]" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Info */}
                        <div className="p-2">
                            <h4 className="text-[10px] font-bold text-[#1A2332] truncate mb-0.5">
                                {item?.title}
                            </h4>
                            <div className="flex items-center justify-between text-[9px] text-[#64748B]">
                                <span>{item?.fileSize} MB</span>
                                <span>
                                    {new Date(
                                        item?.createdAt
                                    ).toLocaleDateString('en-AU', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric',
                                    })}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                )
            })}
        </div>
    )
}
